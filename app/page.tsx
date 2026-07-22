import Link from 'next/link';

const featureCards = [
  { stat: '01', title: 'Exclusive team draw', text: 'Every nation can be claimed once, keeping the office competition fair and tactical.' },
  { stat: '02', title: 'Tournament totals', text: 'Predict the final goals and booking-card totals for two extra ways to win.' },
  { stat: '03', title: 'Live standings', text: 'Watch the leaderboard update as admin records actual totals and locks the draw.' }
];

const timeline = ['Pick your team', 'Predict totals', 'Follow the table', 'Claim the bragging rights'];

export default function HomePage() {
  return (
    <main className="space-y-8">
      <section className="relative -mx-4 overflow-hidden border-y border-stone-200/70 bg-[#f7f1e8] px-5 py-14 shadow-inner sm:px-8 lg:px-10">
        <img src="/assets/football.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-12" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbf6ee]/95 via-[#fbf6ee]/82 to-[#fbf6ee]/58" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/25 bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-brand-gold shadow-sm">
              Bespoke office sweepstake
            </div>
            <h1 className="mt-5 text-5xl font-black leading-[0.98] text-slate-950 sm:text-6xl lg:text-7xl">
              A sharper World Cup draw for the whole office.
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-slate-700">
              Submit one entry, follow live office standings, and compete for company-funded prizes across winner, goals, and booking-card categories.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="btn-primary" href="/predict">Submit Prediction</Link>
              <Link className="btn-secondary" href="/leaderboard">View Leaderboard</Link>
            </div>
            <div className="mt-8 grid gap-2 text-sm font-semibold text-slate-700 sm:grid-cols-4">
              {timeline.map((item, index) => (
                <div key={item} className="rounded-lg border border-white/80 bg-white/65 p-3 shadow-sm backdrop-blur">
                  <span className="text-brand-gold">0{index + 1}</span>
                  <span className="mt-1 block">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-gold/20 blur-2xl" />
            <div className="rounded-2xl border border-stone-300/80 bg-white/45 p-5 shadow-2xl shadow-stone-900/15 backdrop-blur-md">
              <div className="mb-4 grid grid-cols-3 gap-2 text-center text-sm font-semibold text-slate-800">
                <span className="rounded-md bg-white py-3 shadow-sm">Winner</span>
                <span className="rounded-md bg-white/55 py-3">Goals</span>
                <span className="rounded-md bg-white/55 py-3">Cards</span>
              </div>
              <div className="overflow-hidden rounded-xl bg-white p-3 shadow-xl shadow-stone-900/15">
                <img src="/assets/football.png" alt="World Cup football artwork" className="aspect-[1.05/1] w-full rounded-lg object-cover" />
              </div>
              <div className="mt-4 rounded-lg bg-gradient-to-r from-brand-gold to-red-700 px-5 py-4 text-sm font-bold text-white shadow-sm">One team per employee</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {featureCards.map((card) => (
          <article key={card.title} className="surface">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-brand-teal/10 text-sm font-black text-brand-teal">{card.stat}</div>
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-800">{card.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
