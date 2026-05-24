'use client';
import { useAppState } from '../components/AppState';

export default function AdminPage() {
  const { predictions, admin, setAdmin } = useAppState();
  const winnerGoals = [...predictions].sort((a, b) => Math.abs(a.totalGoals - admin.actualGoals) - Math.abs(b.totalGoals - admin.actualGoals) || a.submittedAt.localeCompare(b.submittedAt))[0];
  const winnerCards = [...predictions].sort((a, b) => Math.abs(a.totalCards - admin.actualCards) - Math.abs(b.totalCards - admin.actualCards) || a.submittedAt.localeCompare(b.submittedAt))[0];
  const claimedTeams = new Set(predictions.map((prediction) => prediction.winner));
  const availableCount = admin.teams.filter((team) => team.status === 'active' && !claimedTeams.has(team.name)).length;

  return (
    <main className="space-y-5">
      <section className="football-lines card bg-brand-navy text-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Admin console</p>
            <h1 className="mt-2 text-3xl font-bold">Manage entries and tournament actuals.</h1>
            <p className="mt-2 text-sm text-slate-200">{predictions.length} predictions, {availableCount} teams still available.</p>
          </div>
          <button className={admin.locked ? 'btn-secondary' : 'btn-primary'} onClick={() => setAdmin({ ...admin, locked: !admin.locked })}>
            {admin.locked ? 'Unlock Entries' : 'Lock Entries'}
          </button>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="card space-y-4">
          <h2 className="text-xl font-semibold">Actual Totals</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <label className="text-sm font-medium text-slate-700">
              Actual total goals
              <input type="number" min="0" className="field mt-1.5" value={admin.actualGoals} onChange={(e) => setAdmin({ ...admin, actualGoals: Number(e.target.value) })} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Actual total booking cards
              <input type="number" min="0" className="field mt-1.5" value={admin.actualCards} onChange={(e) => setAdmin({ ...admin, actualCards: Number(e.target.value) })} />
            </label>
          </div>
          <div className="rounded-lg bg-slate-100 p-4 text-sm">
            <h3 className="font-semibold">Current category leaders</h3>
            <ul className="mt-2 space-y-1 text-slate-600">
              <li>Winner category: each team can be chosen once.</li>
              <li>Total goals leader: {winnerGoals ? winnerGoals.fullName : 'N/A'}</li>
              <li>Total booking cards leader: {winnerCards ? winnerCards.fullName : 'N/A'}</li>
            </ul>
          </div>
        </div>

        <section className="card">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Teams</h2>
              <p className="text-sm text-slate-600">Toggle team availability for the prediction form.</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{availableCount} available</span>
          </div>
          <div className="grid max-h-[31rem] grid-cols-2 gap-2 overflow-auto pr-1 sm:grid-cols-3 xl:grid-cols-4">
            {admin.teams.map((team) => (
              <button
                key={team.name}
                className={`rounded-md border p-2 text-left text-sm transition ${claimedTeams.has(team.name) ? 'border-red-200 bg-red-50 text-red-800' : team.status === 'active' ? 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100' : 'border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100'}`}
                onClick={() => setAdmin({ ...admin, teams: admin.teams.map((t) => t.name === team.name ? { ...t, status: t.status === 'active' ? 'eliminated' : 'active' } : t) })}
              >
                <span className="block font-semibold">{team.name}</span>
                <span className="text-xs capitalize">{claimedTeams.has(team.name) ? 'claimed' : team.status}</span>
              </button>
            ))}
          </div>
        </section>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold">Prizes</h2>
        <p className="mt-1 text-sm text-slate-600">These values appear on the Rules & Prizes page.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="text-sm font-medium text-slate-700">
            Team winner
            <input className="field mt-1.5" value={admin.prizes.teamWinner} onChange={(e) => setAdmin({ ...admin, prizes: { ...admin.prizes, teamWinner: e.target.value } })} />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Tickets
            <input className="field mt-1.5" value={admin.prizes.tickets} onChange={(e) => setAdmin({ ...admin, prizes: { ...admin.prizes, tickets: e.target.value } })} />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Goals
            <input className="field mt-1.5" value={admin.prizes.goals} onChange={(e) => setAdmin({ ...admin, prizes: { ...admin.prizes, goals: e.target.value } })} />
          </label>
        </div>
      </section>

      <section className="card">
        <h2 className="mb-4 text-xl font-semibold">All Predictions</h2>
        <div className="overflow-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="table-cell">Name</th>
                <th className="table-cell">Email</th>
                <th className="table-cell">Winner</th>
                <th className="table-cell">Goals</th>
                <th className="table-cell">Cards</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {predictions.map((p) => (
                <tr key={p.id}>
                  <td className="table-cell font-medium">{p.fullName}</td>
                  <td className="table-cell text-slate-600">{p.email}</td>
                  <td className="table-cell">{p.winner}</td>
                  <td className="table-cell">{p.totalGoals}</td>
                  <td className="table-cell">{p.totalCards}</td>
                </tr>
              ))}
              {!predictions.length && (
                <tr>
                  <td className="table-cell text-slate-500" colSpan={5}>No predictions have been submitted yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
