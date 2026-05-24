'use client';
import { FormEvent, useState } from 'react';
import { useAppState } from '../components/AppState';

export default function PredictPage() {
  const { addPrediction, admin } = useAppState();
  const [msg, setMsg] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const result = addPrediction({ fullName: String(form.get('fullName')), email: String(form.get('email')), winner: String(form.get('winner')), totalGoals: Number(form.get('totalGoals')), totalCards: Number(form.get('totalCards')) });
    setMsg(result.message);
    if (result.ok) e.currentTarget.reset();
  };

  return <main className="card space-y-3"><h2 className="text-xl font-semibold">Employee Prediction Form</h2><form className="space-y-3" onSubmit={onSubmit}><input required name="fullName" placeholder="Full name" className="w-full border rounded p-2" disabled={admin.locked} /><input required type="email" name="email" placeholder="Work email" className="w-full border rounded p-2" disabled={admin.locked} /><select required name="winner" className="w-full border rounded p-2" disabled={admin.locked}>{admin.teams.filter((t) => t.status === 'active').map((t) => <option key={t.name}>{t.name}</option>)}</select><input required type="number" name="totalGoals" placeholder="Total tournament goals" className="w-full border rounded p-2" disabled={admin.locked} /><input required type="number" name="totalCards" placeholder="Total tournament booking cards" className="w-full border rounded p-2" disabled={admin.locked} /><button className="bg-brand-teal text-white px-4 py-2 rounded disabled:opacity-50" disabled={admin.locked}>{admin.locked ? 'Predictions Locked' : 'Submit Prediction'}</button></form>{msg && <p className="text-sm">{msg}</p>}</main>;
}
