'use client';
import { useState } from 'react';
import { useAppState } from '../components/AppState';

type Tab = 'winner' | 'goals' | 'cards';

const tabs: { id: Tab; label: string; helper: string }[] = [
  { id: 'winner', label: 'World Cup Winner', helper: 'Picks by submission time' },
  { id: 'goals', label: 'Total Goals', helper: 'Closest to actual total' },
  { id: 'cards', label: 'Booking Cards', helper: 'Closest to actual total' }
];

export default function LeaderboardPage() {
  const [tab, setTab] = useState<Tab>('winner');
  const { predictions, admin } = useAppState();
  const byGoals = [...predictions].sort((a, b) => Math.abs(a.totalGoals - admin.actualGoals) - Math.abs(b.totalGoals - admin.actualGoals) || a.submittedAt.localeCompare(b.submittedAt));
  const byCards = [...predictions].sort((a, b) => Math.abs(a.totalCards - admin.actualCards) - Math.abs(b.totalCards - admin.actualCards) || a.submittedAt.localeCompare(b.submittedAt));
  const rows = tab === 'winner' ? predictions : tab === 'goals' ? byGoals : byCards;

  return (
    <main className="space-y-5">
      <section className="card flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">Live standings</p>
          <h1 className="mt-2 text-3xl font-bold">Leaderboard</h1>
          <p className="mt-2 text-sm text-slate-600">{predictions.length} entries submitted.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-lg bg-slate-100 p-3">
            <span className="block text-slate-500">Goals actual</span>
            <strong className="text-xl">{admin.actualGoals}</strong>
          </div>
          <div className="rounded-lg bg-slate-100 p-3">
            <span className="block text-slate-500">Cards actual</span>
            <strong className="text-xl">{admin.actualCards}</strong>
          </div>
          <div className="rounded-lg bg-slate-100 p-3">
            <span className="block text-slate-500">Status</span>
            <strong className="text-xl">{admin.locked ? 'Locked' : 'Open'}</strong>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="mb-4 grid gap-2 rounded-lg bg-slate-100 p-1 sm:grid-cols-3">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`rounded-md px-3 py-3 text-left transition ${tab === item.id ? 'bg-white text-brand-navy shadow-sm' : 'text-slate-600 hover:bg-white/60'}`}
            >
              <span className="block text-sm font-semibold">{item.label}</span>
              <span className="mt-0.5 block text-xs">{item.helper}</span>
            </button>
          ))}
        </div>
        <div className="overflow-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[620px] text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="table-cell">Rank</th>
                <th className="table-cell">Name</th>
                <th className="table-cell">{tab === 'winner' ? 'Pick' : 'Prediction'}</th>
                <th className="table-cell">{tab === 'winner' ? 'Submitted' : 'Difference'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((r, i) => (
                <tr key={r.id} className={i === 0 ? 'bg-brand-gold/15' : 'bg-white'}>
                  <td className="table-cell font-semibold">#{i + 1}</td>
                  <td className="table-cell">{r.fullName}</td>
                  <td className="table-cell font-medium">{tab === 'winner' ? r.winner : tab === 'goals' ? r.totalGoals : r.totalCards}</td>
                  <td className="table-cell text-slate-600">{tab === 'winner' ? new Date(r.submittedAt).toLocaleString() : tab === 'goals' ? Math.abs(r.totalGoals - admin.actualGoals) : Math.abs(r.totalCards - admin.actualCards)}</td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td className="table-cell text-slate-500" colSpan={4}>No predictions have been submitted yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
