import Link from 'next/link';

const featureCards = [
  { stat: '01', title: 'Pick the champion', text: 'Choose your tournament winner before entries close.' },
  { stat: '02', title: 'Predict totals', text: 'Call the goals and booking cards across the full tournament.' },
  { stat: '03', title: 'Track the table', text: 'Leaderboards sort the closest entries as results come in.' }
];

export default function HomePage() {
  return (
    <main className="space-y-8">
      <section className="relative -mx-4 overflow-hidden border-y border-stone-200/70 bg-[#f7f1e8] px-5 py-14 shadow-inner sm:px-8 lg:px-10">
        <img src="/assets/football.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-12" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbf6ee]/95 via-[#fbf6ee]/82 to-[#fbf6ee]/58" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-brand-gold">WNB office draw</p>
            <h1 className="mt-5 text-5xl font-black leading-[0.98] text-slate-900 sm:text-6xl">
              A sharper World Cup draw for the whole office.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-950">
              Submit one entry, follow the live office standings, and compete for company-funded prizes across winner, goals, and booking-card categories.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="btn-primary" href="/predict">Submit Prediction</Link>
              <Link className="btn-secondary" href="/leaderboard">View Leaderboard</Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-lg border border-stone-300/80 bg-white/45 p-5 shadow-2xl shadow-stone-900/15 backdrop-blur-md">
              <div className="mb-4 grid grid-cols-3 gap-2 text-center text-sm font-semibold text-slate-800">
                <span className="rounded-md bg-white py-3 shadow-sm">Winner</span>
                <span className="rounded-md bg-white/55 py-3">Goals</span>
                <span className="rounded-md bg-white/55 py-3">Cards</span>
              </div>
              <div className="overflow-hidden rounded-lg bg-white p-3 shadow-xl shadow-stone-900/15">
                <img src="/assets/football.png" alt="Football" className="aspect-[1.05/1] w-full rounded-md object-cover" />
              </div>
              <div className="mt-4 rounded-md bg-brand-gold px-5 py-4 text-sm font-bold text-white shadow-sm">One team per employee</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {featureCards.map((card) => (
          <article key={card.title} className="surface">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-brand-teal/10 text-sm font-black text-brand-teal">{card.stat}</div>
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link className="card group transition hover:-translate-y-0.5 hover:border-brand-teal hover:shadow-md" href="/predict">
          <span className="text-sm font-semibold text-brand-teal">Entry</span>
          <h3 className="mt-2 font-semibold">Submit Prediction</h3>
          <p className="mt-2 text-sm text-slate-600">Add your winner, goals, and cards picks.</p>
        </Link>
        <Link className="card transition hover:-translate-y-0.5 hover:border-brand-teal hover:shadow-md" href="/leaderboard">
          <span className="text-sm font-semibold text-brand-teal">Standings</span>
          <h3 className="mt-2 font-semibold">View Leaderboard</h3>
          <p className="mt-2 text-sm text-slate-600">See rankings across all prize categories.</p>
        </Link>
        <Link className="card transition hover:-translate-y-0.5 hover:border-brand-teal hover:shadow-md" href="/rules">
          <span className="text-sm font-semibold text-brand-teal">Game</span>
          <h3 className="mt-2 font-semibold">Rules & Prizes</h3>
          <p className="mt-2 text-sm text-slate-600">Check scoring, tie-breaks, and prize examples.</p>
        </Link>
        <Link className="card transition hover:-translate-y-0.5 hover:border-brand-teal hover:shadow-md" href="/admin">
          <span className="text-sm font-semibold text-brand-teal">Ops</span>
          <h3 className="mt-2 font-semibold">Admin Controls</h3>
          <p className="mt-2 text-sm text-slate-600">Lock entries and update actual totals.</p>
        </Link>
      </section>
    </main>
  );
}
