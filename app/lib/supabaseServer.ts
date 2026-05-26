import { defaultAdminState } from './mock';
import { AdminState, Prediction } from './types';

type SupabasePredictionRow = {
  id: string;
  full_name: string;
  email: string;
  winner: string;
  total_goals: number;
  total_cards: number;
  submitted_at: string;
};

type SupabaseAdminRow = {
  id: string;
  locked: boolean;
  actual_goals: number;
  actual_cards: number;
  teams: AdminState['teams'];
  prizes: AdminState['prizes'];
};

const ADMIN_ROW_ID = 'admin';

function getSupabaseConfig() {
  const rawUrl = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!rawUrl || !key) {
    throw new Error('Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel environment variables.');
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(rawUrl);
  } catch {
    throw new Error('SUPABASE_URL is invalid. It must look like https://your-project-ref.supabase.co');
  }

  if (!parsedUrl.hostname.endsWith('.supabase.co')) {
    throw new Error('SUPABASE_URL should be the Supabase Project URL, not the project name or API key.');
  }

  if (key.length < 80) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY looks too short. Use the long service_role key from Supabase Project Settings > API.');
  }

  return { url: parsedUrl.origin, key };
}

async function supabaseRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { url, key } = getSupabaseConfig();
  let response: Response;
  try {
    response = await fetch(`${url}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        ...(init.headers ?? {})
      },
      cache: 'no-store'
    });
  } catch {
    throw new Error(`Could not reach Supabase at ${url}. Check SUPABASE_URL in Vercel and confirm the Supabase project is active.`);
  }

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Supabase request failed with ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

function toPrediction(row: SupabasePredictionRow): Prediction {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    winner: row.winner,
    totalGoals: row.total_goals,
    totalCards: row.total_cards,
    submittedAt: row.submitted_at
  };
}

function toPredictionRow(prediction: Omit<Prediction, 'id' | 'submittedAt'> | Partial<Omit<Prediction, 'id' | 'submittedAt'>>) {
  return {
    ...(prediction.fullName !== undefined ? { full_name: prediction.fullName } : {}),
    ...(prediction.email !== undefined ? { email: prediction.email } : {}),
    ...(prediction.winner !== undefined ? { winner: prediction.winner } : {}),
    ...(prediction.totalGoals !== undefined ? { total_goals: prediction.totalGoals } : {}),
    ...(prediction.totalCards !== undefined ? { total_cards: prediction.totalCards } : {})
  };
}

function mergeAdmin(row?: SupabaseAdminRow): AdminState {
  if (!row) return defaultAdminState;
  const savedTeamNames = new Set(row.teams.map((team) => team.name));
  const missingDefaultTeams = defaultAdminState.teams.filter((team) => !savedTeamNames.has(team.name));
  return {
    locked: row.locked,
    actualGoals: row.actual_goals,
    actualCards: row.actual_cards,
    teams: [...row.teams, ...missingDefaultTeams],
    prizes: row.prizes ?? defaultAdminState.prizes
  };
}

export async function getSharedState() {
  const [adminRows, predictionRows] = await Promise.all([
    supabaseRequest<SupabaseAdminRow[]>(`admin_state?id=eq.${ADMIN_ROW_ID}&select=*`),
    supabaseRequest<SupabasePredictionRow[]>('predictions?select=*&order=submitted_at.asc')
  ]);

  return {
    admin: mergeAdmin(adminRows[0]),
    predictions: predictionRows.map(toPrediction)
  };
}

export async function saveSharedAdmin(admin: AdminState) {
  const [row] = await supabaseRequest<SupabaseAdminRow[]>('admin_state?on_conflict=id', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify({
      id: ADMIN_ROW_ID,
      locked: admin.locked,
      actual_goals: admin.actualGoals,
      actual_cards: admin.actualCards,
      teams: admin.teams,
      prizes: admin.prizes
    })
  });
  return mergeAdmin(row);
}

export async function createSharedPrediction(prediction: Omit<Prediction, 'id' | 'submittedAt'>) {
  const [row] = await supabaseRequest<SupabasePredictionRow[]>('predictions', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(toPredictionRow(prediction))
  });
  return toPrediction(row);
}

export async function updateSharedPrediction(id: string, changes: Partial<Omit<Prediction, 'id' | 'submittedAt'>>) {
  const [row] = await supabaseRequest<SupabasePredictionRow[]>(`predictions?id=eq.${id}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(toPredictionRow(changes))
  });
  return row ? toPrediction(row) : null;
}

export async function deleteSharedPrediction(id: string) {
  await supabaseRequest<void>(`predictions?id=eq.${id}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' }
  });
}
