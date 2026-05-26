import './globals.css';
import Link from 'next/link';
import { AppStateProvider } from './components/AppState';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppStateProvider>
          <div className="min-h-screen">
            <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-[#f8f3eb]/95 shadow-sm shadow-stone-900/10 backdrop-blur">
              <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <Link href="/" className="flex items-center gap-4">
                  <span className="flex h-24 w-24 items-center justify-center rounded-lg bg-white p-3 shadow-sm sm:h-28 sm:w-28">
                    <img src="/assets/wnb-logo.png" alt="WNB logo" className="h-full w-full object-contain" />
                  </span>
                  <span>
                    <span className="block text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">WNB World Cup Office Draw</span>
                    <span className="block text-base text-slate-700">Predictions, standings, prizes</span>
                  </span>
                </Link>
                <nav className="flex flex-wrap gap-6 text-sm font-medium text-slate-950 sm:text-base">
                  <Link className="nav-link" href="/">Home</Link>
                  <Link className="nav-link" href="/leaderboard">Leaderboard</Link>
                  <Link className="nav-link" href="/rules">Rules & Prizes</Link>
                  <Link className="nav-link" href="/admin">Admin</Link>
                </nav>
              </div>
            </header>
            <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
              {children}
            </div>
          </div>
        </AppStateProvider>
      </body>
    </html>
  );
}
