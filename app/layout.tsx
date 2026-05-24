import './globals.css';
import Link from 'next/link';
import { AppStateProvider } from './components/AppState';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppStateProvider>
          <div className="max-w-4xl mx-auto p-4 space-y-4">
            <header className="card bg-brand-navy text-white">
              <h1 className="text-2xl font-bold">WNB World Cup Office Draw</h1>
              <p className="text-sm text-slate-200">Free internal prediction game — company-funded prizes.</p>
              <nav className="flex flex-wrap gap-3 mt-3 text-sm">
                <Link href="/">Home</Link><Link href="/predict">Predict</Link><Link href="/leaderboard">Leaderboard</Link><Link href="/rules">Rules & Prizes</Link><Link href="/admin">Admin</Link>
              </nav>
            </header>
            {children}
          </div>
        </AppStateProvider>
      </body>
    </html>
  );
}
