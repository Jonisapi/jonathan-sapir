'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadAdminState, loadPredictions, saveAdminState, savePredictions } from '../lib/store';
import { AdminState, Prediction } from '../lib/types';

type PredictionInput = Omit<Prediction, 'id' | 'submittedAt'>;
type PredictionChanges = Partial<PredictionInput>;

type Ctx = {
  predictions: Prediction[];
  admin: AdminState;
  loading: boolean;
  error: string;
  addPrediction: (p: PredictionInput) => Promise<{ ok: boolean; message: string }>;
  updatePrediction: (id: string, changes: PredictionChanges) => Promise<void>;
  deletePrediction: (id: string) => Promise<void>;
  setAdmin: (a: AdminState) => Promise<void>;
};

const StateContext = createContext<Ctx | null>(null);

async function apiRequest<T>(url: string, init?: RequestInit): Promise<T> {
  const adminPasscode = typeof window === 'undefined' ? '' : sessionStorage.getItem('wnb_admin_passcode');
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(adminPasscode ? { 'x-admin-passcode': adminPasscode } : {}),
      ...(init?.headers ?? {})
    }
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Request failed.');
  }
  return data as T;
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [admin, setAdminState] = useState<AdminState | null>(null);
  const [loading, setLoading] = useState(true);
  const [useLocalFallback, setUseLocalFallback] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const canUseLocalFallback = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    const loadState = () => {
      apiRequest<{ predictions: Prediction[]; admin: AdminState }>('/api/state')
        .then((state) => {
          setUseLocalFallback(false);
          setError('');
          setPredictions(state.predictions);
          setAdminState(state.admin);
        })
        .catch((loadError) => {
          if (canUseLocalFallback) {
            setUseLocalFallback(true);
            setError('');
            setPredictions(loadPredictions());
            setAdminState(loadAdminState());
            return;
          }
          setError(loadError instanceof Error ? loadError.message : 'Unable to load shared data.');
          setPredictions([]);
          setAdminState(loadAdminState());
        })
        .finally(() => setLoading(false));
    };

    loadState();
    const intervalId = window.setInterval(() => {
      if (!useLocalFallback) loadState();
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [useLocalFallback]);

  const refreshState = async () => {
    if (useLocalFallback) return;
    try {
      const state = await apiRequest<{ predictions: Prediction[]; admin: AdminState }>('/api/state');
      setError('');
      setPredictions(state.predictions);
      setAdminState(state.admin);
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : 'Unable to refresh shared data.');
    }
  };

  const setAdmin = async (nextAdmin: AdminState) => {
    setAdminState(nextAdmin);
    if (useLocalFallback) {
      saveAdminState(nextAdmin);
      return;
    }
    try {
      const data = await apiRequest<{ admin: AdminState }>('/api/admin', {
        method: 'PUT',
        body: JSON.stringify(nextAdmin)
      });
      setAdminState(data.admin);
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized.') return;
      setUseLocalFallback(true);
      saveAdminState(nextAdmin);
    }
  };

  const addPrediction = async (prediction: PredictionInput) => {
    const currentAdmin = admin ?? loadAdminState();
    if (currentAdmin.locked) return { ok: false, message: 'Predictions are currently locked.' };
    if (predictions.some((item) => item.email.toLowerCase() === prediction.email.toLowerCase())) {
      return { ok: false, message: 'Only one entry per work email is allowed.' };
    }
    if (predictions.some((item) => item.winner === prediction.winner)) {
      return { ok: false, message: `${prediction.winner} has already been chosen. Please pick another team.` };
    }

    if (useLocalFallback) {
      const next = [...predictions, { ...prediction, id: crypto.randomUUID(), submittedAt: new Date().toISOString() }];
      setPredictions(next);
      savePredictions(next);
      return { ok: true, message: 'Prediction submitted!' };
    }

    try {
      const data = await apiRequest<{ ok: boolean; message: string; prediction: Prediction }>('/api/predictions', {
        method: 'POST',
        body: JSON.stringify(prediction)
      });
      await refreshState();
      return { ok: data.ok, message: data.message };
    } catch (error) {
      return { ok: false, message: error instanceof Error ? error.message : 'Unable to submit prediction.' };
    }
  };

  const updatePrediction = async (id: string, changes: PredictionChanges) => {
    const next = predictions.map((prediction) => prediction.id === id ? { ...prediction, ...changes } : prediction);
    setPredictions(next);
    if (useLocalFallback) {
      savePredictions(next);
      return;
    }
    try {
      await apiRequest<{ prediction: Prediction | null }>(`/api/predictions/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(changes)
      });
      await refreshState();
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized.') return;
      setUseLocalFallback(true);
      savePredictions(next);
    }
  };

  const deletePrediction = async (id: string) => {
    const next = predictions.filter((prediction) => prediction.id !== id);
    setPredictions(next);
    if (useLocalFallback) {
      savePredictions(next);
      return;
    }
    try {
      await apiRequest<{ ok: boolean }>(`/api/predictions/${id}`, { method: 'DELETE' });
      await refreshState();
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized.') return;
      setUseLocalFallback(true);
      savePredictions(next);
    }
  };

  const value = useMemo(() => ({
    predictions,
    admin: admin ?? loadAdminState(),
    loading,
    error,
    addPrediction,
    updatePrediction,
    deletePrediction,
    setAdmin
  }), [predictions, admin, loading, error, useLocalFallback]);

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error('useAppState must be used inside AppStateProvider');
  return ctx;
}
