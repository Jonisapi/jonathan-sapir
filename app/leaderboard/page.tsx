'use client';
import { useState } from 'react';
import { useAppState } from '../components/AppState';

export default function LeaderboardPage() {
  const [tab, setTab] = useState<'winner' | 'goals' | 'cards'>('winner');
  const { predictions, admin } = useAppState();
  const byGoals = [...predictions].sort((a, b) => Math.abs(a.totalGoals - admin.actualGoals) - Math.abs(b.totalGoals - admin.actualGoals) || a.submittedAt.localeCompare(b.submittedAt));
  const byCards = [...predictions].sort((a, b) => Math.abs(a.totalCards - admin.actualCards) - Math.abs(b.totalCards - admin.actualCards) || a.submittedAt.localeCompare(b.submittedAt));

  const rows = tab === 'winner' ? predictions : tab === 'goals' ? byGoals : byCards;
  return <main className="card"><h2 className="text-xl font-semibold mb-3">Leaderboard</h2><div className="flex gap-2 mb-3">{['winner', 'goals', 'cards'].map((t) => <button key={t} onClick={() => setTab(t as 'winner'|'goals'|'cards')} className={`px-3 py-1 rounded ${tab===t ? 'bg-brand-navy text-white':'bg-slate-100'}`}>{t === 'winner' ? 'World Cup Winner' : t === 'goals' ? 'Total Goals' : 'Total Booking Cards'}</button>)}</div><table className="w-full text-sm"><thead><tr className="text-left border-b"><th>#</th><th>Name</th><th>{tab==='winner'?'Pick':'Prediction'}</th><th>{tab==='winner'?'Submitted':'Difference'}</th></tr></thead><tbody>{rows.map((r, i) => <tr key={r.id} className="border-b"><td>{i+1}</td><td>{r.fullName}</td><td>{tab==='winner'?r.winner:tab==='goals'?r.totalGoals:r.totalCards}</td><td>{tab==='winner'?new Date(r.submittedAt).toLocaleString():tab==='goals'?Math.abs(r.totalGoals-admin.actualGoals):Math.abs(r.totalCards-admin.actualCards)}</td></tr>)}</tbody></table></main>;
}
