export type TeamStatus = 'active' | 'eliminated';

export interface Team {
  name: string;
  status: TeamStatus;
}

export interface Prediction {
  id: string;
  fullName: string;
  email: string;
  winner: string;
  totalGoals: number;
  totalCards: number;
  submittedAt: string;
}

export interface PrizeSettings {
  teamWinner: string;
  tickets: string;
  goals: string;
}

export interface AdminState {
  locked: boolean;
  actualGoals: number;
  actualCards: number;
  teams: Team[];
  prizes: PrizeSettings;
}
