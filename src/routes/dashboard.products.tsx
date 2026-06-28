import { createFileRoute } from "@tanstack/react-router";
import {
  Wallet,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Home,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/products")({
  head: () => ({
    meta: [
      { title: "Products — SBI OneAI" },
      { name: "description", content: "Banking products matched to your Financial Twin." },
    ],
  }),
  component: ProductsPage,
});

const products = [
  {
    icon: TrendingUp,
    name: "SBI Magnum Children Benefit",
    category: "Mutual Fund",
    match: 94,
    why: "Aligns to your Home Down Payment timeline (2029). 5-yr CAGR 12.4%.",
    cta: "Start SIP",
  },
  {
    icon: ShieldCheck,
    name: "SBI Life Smart Shield",
    category: "Term Insurance",
    match: 91,
    why: "Twin detected dependent risk gap. ₹1Cr cover at ₹742/mo for your profile.",
    cta: "Get quote",
  },
  {
    icon: Home,
    name: "SBI Home Loan — Privilege",
    category: "Home Loan",
    match: 88,
    why: "Pre-approved up to ₹78L at 8.40% based on your Twin score 824.",
    cta: "View offer",
  },
  {
    icon: CreditCard,
    name: "SBI Cashback Card",
    category: "Credit Card",
    match: 82,
    why: "5% cashback on your top 3 spend categories (Groceries, Fuel, Bills).",
    cta: "Apply",
  },
  {
    icon: Wallet,
    name: "SBI Tax Saver FD",
    category: "Fixed Deposit",
    match: 76,
    why: "₹1.5L 80C bucket still open this FY. Lock-in 5 yr at 6.75%.",
    cta: "Open FD",
  },
  {
    icon: TrendingUp,
    name: "SBI Bluechip Equity",
    category: "Mutual Fund",
    match: 73,
    why: "Diversifies your existing portfolio — currently 68% mid-cap heavy.",
    cta: "Start SIP",
  },
];

function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-primary-glow">
          <Sparkles className="h-3 w-3" /> Personalized for Arjun
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
          Products are recommended only when they help.
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          No upsell loops. Each match is scored against your goals, cashflow, and risk profile.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((p) => (
          <div key={p.name} className="card-elevated rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary-glow">
                  <p.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {p.category}
                  </p>
                  <p className="text-sm font-semibold">{p.name}</p>
                </div>
              </div>
              <MatchBadge score={p.match} />
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{p.why}</p>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Matched by your Twin</span>
              <button className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                {p.cta} <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchBadge({ score }: { score: number }) {
  const tone =
    score >= 90
      ? "text-success border-success/40"
      : score >= 80
        ? "text-primary-glow border-primary/40"
        : "text-muted-foreground border-border";
  return (
    <div
      className={`rounded-full border bg-background/40 px-2.5 py-1 text-[10px] font-semibold tabular-nums ${tone}`}
    >
      {score}/100
    </div>
  );
}
