import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plane,
  Home,
  Smartphone,
  ShieldCheck,
  GraduationCap,
  Target,
  Plus,
  Calendar,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/goals")({
  head: () => ({
    meta: [
      { title: "Goals — SBI OneAI" },
      { name: "description", content: "Track, fund, and forecast every life goal." },
    ],
  }),
  component: GoalsPage,
});

type Goal = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  target: number;
  saved: number;
  deadline: string;
  monthlyContribution: number;
  category: "Travel" | "Asset" | "Safety" | "Education" | "Lifestyle";
};

const initial: Goal[] = [
  {
    id: "g1",
    name: "Goa Trip",
    icon: Plane,
    target: 180000,
    saved: 122400,
    deadline: "Mar 2027",
    monthlyContribution: 8000,
    category: "Travel",
  },
  {
    id: "g2",
    name: "Emergency Fund",
    icon: ShieldCheck,
    target: 600000,
    saved: 420000,
    deadline: "Dec 2026",
    monthlyContribution: 12000,
    category: "Safety",
  },
  {
    id: "g3",
    name: "New iPhone",
    icon: Smartphone,
    target: 120000,
    saved: 42000,
    deadline: "Feb 2027",
    monthlyContribution: 6000,
    category: "Lifestyle",
  },
  {
    id: "g4",
    name: "Home Down Payment",
    icon: Home,
    target: 2500000,
    saved: 550000,
    deadline: "Jun 2029",
    monthlyContribution: 35000,
    category: "Asset",
  },
  {
    id: "g5",
    name: "MBA Fund",
    icon: GraduationCap,
    target: 1800000,
    saved: 280000,
    deadline: "Jul 2028",
    monthlyContribution: 18000,
    category: "Education",
  },
];

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

function GoalsPage() {
  const [goals] = useState<Goal[]>(initial);
  const totalTarget = goals.reduce((a, g) => a + g.target, 0);
  const totalSaved = goals.reduce((a, g) => a + g.saved, 0);
  const overall = Math.round((totalSaved / totalTarget) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-primary-glow">
            <Target className="h-3 w-3" /> Goal Banking
          </div>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Every rupee, tied to a purpose.
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
            {goals.length} active goals · {fmt(totalSaved)} funded of {fmt(totalTarget)} ({overall}
            %).
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> New goal
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {goals.map((g) => {
          const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
          const remaining = Math.max(0, g.target - g.saved);
          const monthsLeft = Math.ceil(remaining / g.monthlyContribution);
          return (
            <div key={g.id} className="card-elevated rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary-glow">
                    <g.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{g.name}</p>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {g.category}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-border bg-background/40 px-2 py-0.5 text-[10px] text-muted-foreground">
                  {g.deadline}
                </span>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <p className="text-xl font-semibold tracking-tight">{fmt(g.saved)}</p>
                <p className="text-xs text-muted-foreground">of {fmt(g.target)}</p>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-background/60">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-success">{pct}% funded</span>
                <span className="text-muted-foreground">
                  {monthsLeft} mo at {fmt(g.monthlyContribution)}/mo
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button className="rounded-md border border-border bg-background/40 py-1.5 text-xs hover:bg-surface">
                  Top up
                </button>
                <button className="rounded-md border border-border bg-background/40 py-1.5 text-xs hover:bg-surface">
                  Adjust SIP
                </button>
              </div>
            </div>
          );
        })}

        <button className="group flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface/20 p-5 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-surface/40 hover:text-foreground">
          <div className="grid h-12 w-12 place-items-center rounded-full border border-border bg-background/40">
            <Plus className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium">Add a new goal</p>
          <p className="text-xs">Your Twin will project the path for you.</p>
        </button>
      </div>

      <div className="card-elevated rounded-2xl p-5">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-semibold">Twin's recommended sequence</h3>
        </div>
        <ol className="mt-4 space-y-2 text-sm">
          {[
            { step: "1", text: "Top up Emergency Fund to 6 months of expenses first." },
            { step: "2", text: "Maintain Goa Trip pace — already 2 weeks ahead." },
            { step: "3", text: "Defer iPhone purchase by 2 months to protect Home Down Payment." },
            { step: "4", text: "Increase MBA Fund SIP by ₹2,500 once Emergency Fund completes." },
          ].map((s) => (
            <li
              key={s.step}
              className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-3"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary-glow">
                {s.step}
              </span>
              <span className="text-foreground/90">{s.text}</span>
              <TrendingUp className="ml-auto h-4 w-4 text-success" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
