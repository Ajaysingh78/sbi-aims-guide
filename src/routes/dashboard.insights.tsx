import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { insights } from "@/lib/mock";

export const Route = createFileRoute("/dashboard/insights")({
  head: () => ({
    meta: [
      { title: "Insights — SBI OneAI" },
      { name: "description", content: "Contextual intelligence from your Financial Twin." },
    ],
  }),
  component: InsightsPage,
});

const tone = {
  success: { color: "text-success", border: "border-success/30", Icon: CheckCircle2 },
  primary: { color: "text-primary-glow", border: "border-primary/30", Icon: TrendingUp },
  warning: { color: "text-warning", border: "border-warning/30", Icon: AlertTriangle },
} as const;

const jargonBusters = [
  {
    term: "SIP (Systematic Investment Plan)",
    plain:
      "Instead of buying mutual funds in one lump sum, you commit a fixed amount each month. It averages out the price you pay over time.",
  },
  {
    term: "CAGR",
    plain:
      "The smoothed annual growth rate of an investment, useful for comparing options that move differently year to year.",
  },
  {
    term: "Emergency Fund",
    plain:
      "Liquid savings worth 3–6 months of expenses. It exists so a job change or medical bill doesn't force you to touch your goals.",
  },
  {
    term: "Asset Allocation",
    plain:
      "How your money is split between equity, debt, and cash. The split — not the picks — drives most of your long-term return.",
  },
];

function InsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-primary-glow">
          <Sparkles className="h-3 w-3" /> Contextual Intelligence
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
          Insights that anticipate, not react.
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          Your Twin continuously observes income, spend, and goals — surfacing only what changes
          your decisions.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {[...insights, ...insights].slice(0, 6).map((ins, i) => {
          const t = tone[ins.tone];
          return (
            <div key={i} className={`card-elevated rounded-2xl border ${t.border} p-5`}>
              <div className="flex items-start gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-background/60">
                  <t.Icon className={`h-4 w-4 ${t.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug">{ins.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{ins.body}</p>
                </div>
              </div>
              <button className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-foreground/80 hover:text-foreground">
                Apply suggestion <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="card-elevated rounded-2xl p-5">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-semibold">Radical Transparency · Plain-language banking</h3>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Tap any banking term — your Twin explains it in plain language.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {jargonBusters.map((j) => (
            <div key={j.term} className="rounded-xl border border-border bg-background/40 p-4">
              <p className="text-sm font-semibold">{j.term}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{j.plain}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
