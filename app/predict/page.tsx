'use client';
import { FormEvent, useState } from 'react';
import { useAppState } from '../components/AppState';

export default function PredictPage() {
  const { addPrediction, admin, predictions } = useAppState();
  const [msg, setMsg] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formElement = e.currentTarget;
    const result = await addPrediction({
      fullName: String(form.get('fullName')),
      email: String(form.get('email')),
      winner: String(form.get('winner')),
      totalGoals: Number(form.get('totalGoals')),
      totalCards: Number(form.get('totalCards'))
    });
    setMsg(result.message);
    if (result.ok) formElement.reset();
  };

  const claimedTeams = new Set(predictions.map((prediction) => prediction.winner));
  const availableTeams = admin.teams.filter((t) => t.status === 'active' && !claimedTeams.has(t.name));
  const canSubmit = !admin.locked && availableTeams.length > 0;

  return (
    <main className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <section className="football-lines card bg-brand-navy text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Your entry</p>
        <h1 className="mt-3 text-3xl font-bold">Make the call before kick-off.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-200">
          One prediction is allowed per work email. Once admin locks entries, the form becomes read-only.
        </p>
        <div className="mt-6 grid gap-3 text-sm">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="block text-slate-300">Available teams</span>
            <strong className="mt-1 block text-2xl">{availableTeams.length}</strong>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="block text-slate-300">Entry status</span>
            <strong className="mt-1 block text-2xl">{admin.locked ? 'Locked' : 'Open'}</strong>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="mb-5 flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Employee Prediction Form</h2>
            <p className="mt-1 text-sm text-slate-600">Enter your details and tournament totals.</p>
          </div>
          <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${canSubmit ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {admin.locked ? 'Predictions locked' : availableTeams.length ? 'Predictions open' : 'No teams left'}
          </span>
        </div>

        <form className="grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Full name
              <input required name="fullName" placeholder="Jane Smith" className="field mt-1.5" disabled={admin.locked} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Work email
              <input required type="email" name="email" placeholder="jane@wnb.example" className="field mt-1.5" disabled={admin.locked} />
            </label>
          </div>
          <label className="text-sm font-medium text-slate-700">
            Tournament winner
            <select required name="winner" className="field mt-1.5" disabled={admin.locked}>
              {!availableTeams.length && <option value="">No teams available</option>}
              {availableTeams.map((t) => <option key={t.name}>{t.name}</option>)}
            </select>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Total tournament goals
              <input required type="number" min="0" name="totalGoals" placeholder="172" className="field mt-1.5" disabled={admin.locked} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Total booking cards
              <input required type="number" min="0" name="totalCards" placeholder="214" className="field mt-1.5" disabled={admin.locked} />
            </label>
          </div>
          <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <button className="btn-primary" disabled={!canSubmit}>{admin.locked ? 'Predictions Locked' : availableTeams.length ? 'Submit Prediction' : 'No Teams Left'}</button>
            {msg && <p className="text-sm font-medium text-slate-700">{msg}</p>}
          </div>
        </form>
      </section>
    </main>
  );
}
