import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="space-y-4">
      <section className="card">
        <h2 className="text-xl font-semibold">Welcome to the Office Draw</h2>
        <p className="text-slate-600 mt-2">Predict winner, goals, and booking cards. Track office standings in real time.</p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link className="card hover:border-brand-teal" href="/predict">Submit Prediction</Link>
        <Link className="card hover:border-brand-teal" href="/leaderboard">View Leaderboard</Link>
        <Link className="card hover:border-brand-teal" href="/rules">Rules & Prizes</Link>
        <Link className="card hover:border-brand-teal" href="/admin">Admin Controls</Link>
      </section>
    </main>
  );
}
