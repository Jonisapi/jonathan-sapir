'use client';
import { defaultAdminState, seedPredictions } from './mock';
import { AdminState, Prediction } from './types';

const PREDICTIONS_KEY = 'wnb_predictions';
const ADMIN_KEY = 'wnb_admin';
const OLD_DEFAULT_PRIZES = new Set([
  'Voucher - £120',
  'Voucher - Â£120',
  'Restaurant tickets - £120',
  'Restaurant tickets - Â£120',
  'Restaurant value - £120',
  'Restaurant value - Â£120'
]);

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
  const saved = JSON.parse(raw) as AdminState;
  const savedTeamNames = new Set(saved.teams.map((team) => team.name));
  const missingDefaultTeams = defaultAdminState.teams.filter((team) => !savedTeamNames.has(team.name));
  const savedPrizes = saved.prizes ?? defaultAdminState.prizes;
  return {
    ...saved,
    teams: [...saved.teams, ...missingDefaultTeams],
    prizes: {
      teamWinner: OLD_DEFAULT_PRIZES.has(savedPrizes.teamWinner) ? defaultAdminState.prizes.teamWinner : savedPrizes.teamWinner,
      tickets: OLD_DEFAULT_PRIZES.has(savedPrizes.tickets) ? defaultAdminState.prizes.tickets : savedPrizes.tickets,
      goals: OLD_DEFAULT_PRIZES.has(savedPrizes.goals) ? defaultAdminState.prizes.goals : savedPrizes.goals
    }
  };
}

export function saveAdminState(data: AdminState) {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(data));
}
