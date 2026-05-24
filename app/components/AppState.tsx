'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadAdminState, loadPredictions, saveAdminState, savePredictions } from '../lib/store';
import { AdminState, Prediction } from '../lib/types';

type Ctx = {
  predictions: Prediction[];
  admin: AdminState;
  addPrediction: (p: Omit<Prediction, 'id' | 'submittedAt'>) => { ok: boolean; message: string };
  setAdmin: (a: AdminState) => void;
};

const StateContext = createContext<Ctx | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [admin, setAdminState] = useState<AdminState | null>(null);

  useEffect(() => {
    setPredictions(loadPredictions());
    setAdminState(loadAdminState());
  }, []);

  const setAdmin = (a: AdminState) => {
    setAdminState(a);
    saveAdminState(a);
  };

  const addPrediction = (p: Omit<Prediction, 'id' | 'submittedAt'>) => {
    if (!admin) return { ok: false, message: 'Loading...' };
    if (admin.locked) return { ok: false, message: 'Predictions are currently locked.' };
    if (predictions.some((x) => x.email.toLowerCase() === p.email.toLowerCase())) {
      return { ok: false, message: 'Only one entry per work email is allowed.' };
    }
    const next = [...predictions, { ...p, id: crypto.randomUUID(), submittedAt: new Date().toISOString() }];
    setPredictions(next);
    savePredictions(next);
    return { ok: true, message: 'Prediction submitted!' };
  };

  const value = useMemo(() => ({ predictions, admin: admin ?? loadAdminState(), addPrediction, setAdmin }), [predictions, admin]);

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error('useAppState must be used inside AppStateProvider');
  return ctx;
}
