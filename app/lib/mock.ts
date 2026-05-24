import { AdminState, Prediction } from './types';

export const initialTeams = [
  'Argentina','Brazil','France','Germany','Spain','England','Portugal','Netherlands'
];

export const defaultAdminState: AdminState = {
  locked: false,
  actualGoals: 0,
  actualCards: 0,
  teams: initialTeams.map((name) => ({ name, status: 'active' }))
};

export const seedPredictions: Prediction[] = [
  { id: '1', fullName: 'Alex Kim', email: 'alex@wnb.example', winner: 'Brazil', totalGoals: 168, totalCards: 220, submittedAt: new Date(Date.now()-5000000).toISOString() },
  { id: '2', fullName: 'Sam Rivera', email: 'sam@wnb.example', winner: 'France', totalGoals: 171, totalCards: 205, submittedAt: new Date(Date.now()-4000000).toISOString() }
];
