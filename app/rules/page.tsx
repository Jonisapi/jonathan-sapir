'use client';
import { useAppState } from '../components/AppState';

const rules = [
  'One entry per work email.',
  'Each team can be chosen by one employee only.',
  'Admin can lock or unlock entries.',
  'After lock, the employee form is read-only.',
  'Total Goals and Total Booking Cards are ranked by absolute difference to the current actual total.',
  'Tie-breaker: earliest submission wins.',
  'This is a free internal office game with company-funded prizes only.'
];

export default function RulesPage() {
  const { admin } = useAppState();
  const prizes = [
    { label: 'Team winner', value: admin.prizes.teamWinner },
    { label: 'Tickets', value: admin.prizes.tickets },
    { label: 'Goals', value: admin.prizes.goals }
  ];

  return (
    <main className="space-y-5">
      <section className="football-lines card bg-brand-navy text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Rules & prizes</p>
        <h1 className="mt-2 text-3xl font-bold">Simple scoring, one team per person.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
          The draw rewards the champion pick plus closest tournament totals. Admin updates actuals and prize details as the tournament progresses.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="card">
          <h2 className="text-xl font-semibold">Game Rules</h2>
          <div className="mt-4 grid gap-3">
            {rules.map((rule, index) => (
              <div key={rule} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">{index + 1}</span>
                <p className="text-sm leading-6 text-slate-700">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="card">
          <h2 className="text-xl font-semibold">Prizes</h2>
          <div className="mt-4 space-y-3">
            {prizes.map((prize) => (
              <div key={prize.label} className="rounded-lg border border-red-100 bg-red-50 p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-gold">{prize.label}</span>
                <p className="mt-1 text-sm font-semibold text-slate-900">{prize.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-lg border border-dashed border-slate-300 p-4 text-sm leading-6 text-slate-600">
            Edit these prize fields from the Admin page.
          </p>
        </aside>
      </section>
    </main>
  );
}
