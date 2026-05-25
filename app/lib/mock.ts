import { AdminState, Prediction } from './types';

export const initialTeams = [
  'Argentina',
  'Brazil',
  'France',
  'Germany',
  'Spain',
  'England',
  'Portugal',
  'Netherlands',
  'Belgium',
  'Croatia',
  'Italy',
  'Uruguay',
  'Colombia',
  'Mexico',
  'United States',
  'Canada',
  'Japan',
  'South Korea',
  'Australia',
  'Morocco',
  'Senegal',
  'Ghana',
  'Nigeria',
  'Cameroon',
  'Egypt',
  'South Africa',
  'Algeria',
  'Tunisia',
  'Switzerland',
  'Denmark',
  'Sweden',
  'Norway',
  'Poland',
  'Austria',
  'Serbia',
  'Czechia',
  'Scotland',
  'Wales',
  'Ireland',
  'Turkey',
  'Greece',
  'Ukraine',
  'Chile',
  'Peru',
  'Ecuador',
  'Paraguay',
  'Saudi Arabia',
  'Qatar'
];

export const defaultAdminState: AdminState = {
  locked: false,
  actualGoals: 0,
  actualCards: 0,
  teams: initialTeams.map((name) => ({ name, status: 'active' })),
  prizes: {
    teamWinner: 'Amazon voucher - 150 GBP',
    tickets: 'Restaurant cost - 120 GBP',
    goals: 'Restaurant cost - 120 GBP'
  }
};

export const seedPredictions: Prediction[] = [];
