import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { insights } from "@/lib/mock";

const toneStyles = {
  success: { dot: "bg-success", border: "border-success/30", icon: CheckCircle2, accent: "text-success" },
  primary: { dot: "bg-primary-glow", border: "border-primary/30", icon: TrendingUp, accent: "text-primary-glow" },
  warning: { dot: "bg-warning", border: "border-warning/30", icon: AlertTriangle, accent: "text-warning" },
} as const;

export function Copilot() {
  return (
    <aside className="hidden w-[340px] shrink-0 border-l border-border bg-surface/40 xl:flex xl:flex-col">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">Financial Copilot</p>
            <p className="text-[11px] text-muted-foreground">Contextual · Live</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> Active
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Today's guidance</p>
        {insights.map((ins, i) => {
          const t = toneStyles[ins.tone];
          const Icon = t.icon;
          return (
            <div
              key={i}
              className={`group rounded-xl border ${t.border} bg-background/60 p-4 transition-colors hover:bg-background`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`mt-0.5 h-4 w-4 ${t.accent}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-snug text-foreground">{ins.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{ins.body}</p>
                  <button className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-foreground/80 hover:text-foreground">
                    Apply suggestion <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="rounded-xl border border-border bg-background/40 p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Reminder</p>
          <p className="mt-2 text-sm font-medium">SIP auto-debit · 28 Oct</p>
          <p className="mt-1 text-xs text-muted-foreground">₹15,000 — Bluechip Equity Fund</p>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="rounded-lg border border-border bg-background/60 p-3 text-xs text-muted-foreground">
          Copilot does not chat. It observes your Financial Twin and suggests intentional next steps.
        </div>
      </div>
    </aside>
  );
}
