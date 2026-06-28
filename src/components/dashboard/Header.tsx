import { Bell, Search, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function DashHeader() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", !dark);
    root.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-3.5 sm:flex sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Good evening
          </p>
          <h1 className="mt-0.5 truncate text-lg font-semibold tracking-tight sm:text-xl">
            Welcome back, Arjun
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search goals, products, or insights…"
              className="h-10 w-72 rounded-lg border border-border bg-surface/60 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary/60 focus:bg-surface"
            />
          </div>
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-surface/60 text-muted-foreground hover:text-foreground"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            aria-label="View notifications"
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-surface/60 text-muted-foreground hover:text-foreground"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>
          <div className="hidden h-10 items-center gap-2.5 rounded-lg border border-border bg-surface/60 px-2 pr-3 sm:flex">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-[11px] font-semibold text-primary-foreground">
              AR
            </div>
            <div className="leading-tight">
              <p className="text-xs font-medium">Arjun R.</p>
              <p className="text-[10px] text-muted-foreground">Premier</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
