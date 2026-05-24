'use client';
import { defaultAdminState, seedPredictions } from './mock';
import { AdminState, Prediction } from './types';

const PREDICTIONS_KEY = 'wnb_predictions';
const ADMIN_KEY = 'wnb_admin';

export function loadPredictions(): Prediction[] {
  if (typeof window === 'undefined') return seedPredictions;
  const raw = localStorage.getItem(PREDICTIONS_KEY);
  if (!raw) return seedPredictions;
  return JSON.parse(raw) as Prediction[];
}

export function savePredictions(data: Prediction[]) {
  localStorage.setItem(PREDICTIONS_KEY, JSON.stringify(data));
}

export function loadAdminState(): AdminState {
  if (typeof window === 'undefined') return defaultAdminState;
  const raw = localStorage.getItem(ADMIN_KEY);
  if (!raw) return defaultAdminState;
  return JSON.parse(raw) as AdminState;
}

export function saveAdminState(data: AdminState) {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(data));
}
