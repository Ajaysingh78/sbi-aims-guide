import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import { Wand2, TrendingUp, AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/dashboard/simulation")({
  head: () => ({
    meta: [
      { title: "What-If Simulation — SBI OneAI" },
      {
        name: "description",
        content: "Simulate financial decisions before they affect your goals.",
      },
    ],
  }),
  component: SimulationPage,
});

const fmtINR = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });

function SimulationPage() {
  // Inputs
  const [monthlyIncome, setMonthlyIncome] = useState(125000);
  const [monthlySpend, setMonthlySpend] = useState(72000);
  const [sip, setSip] = useState(15000);
  const [oneTime, setOneTime] = useState(120000); // Big purchase, such as a phone or trip.
  const [horizonYears, setHorizonYears] = useState(5);
  const [returnRate, setReturnRate] = useState(11); // % p.a.

  const { baseline, scenario, deltaCorpus, goalShiftMonths } = useMemo(() => {
    const months = horizonYears * 12;
    const monthlySurplus = Math.max(0, monthlyIncome - monthlySpend);
    const baseSip = sip;
    const scenarioSip = sip; // same sip; one-time hit reduces opening corpus
    const r = returnRate / 100 / 12;

    const series: { m: number; baseline: number; scenario: number }[] = [];
    let bCorpus = 0;
    let sCorpus = -oneTime; // immediate one-time outflow
    for (let i = 1; i <= months; i++) {
      bCorpus = bCorpus * (1 + r) + baseSip + monthlySurplus * 0.3;
      sCorpus = sCorpus * (1 + r) + scenarioSip + monthlySurplus * 0.3;
      if (i % 3 === 0 || i === months) {
        series.push({
          m: i,
          baseline: Math.round(bCorpus / 100000), // in lakh
          scenario: Math.round(sCorpus / 100000),
        });
      }
    }
    const dCorpus = (series.at(-1)?.scenario ?? 0) - (series.at(-1)?.baseline ?? 0);

    // Goal-shift: months needed in scenario to reach baseline final corpus
    const goalTarget = (series.at(-1)?.baseline ?? 0) * 100000;
    let extra = 0;
    let c = sCorpus;
    while (c < goalTarget && extra < 240) {
      c = c * (1 + r) + scenarioSip + monthlySurplus * 0.3;
      extra++;
    }

    return {
      baseline: series.map((p) => ({ m: `M${p.m}`, value: p.baseline })),
      scenario: series.map((p) => ({ m: `M${p.m}`, value: p.scenario })),
      deltaCorpus: dCorpus * 100000,
      goalShiftMonths: extra,
    };
  }, [monthlyIncome, monthlySpend, sip, oneTime, horizonYears, returnRate]);

  const merged = baseline.map((p, i) => ({
    m: p.m,
    baseline: p.value,
    scenario: scenario[i]?.value ?? 0,
  }));

  const onTrack = deltaCorpus >= -50000;

  const reset = () => {
    setMonthlyIncome(125000);
    setMonthlySpend(72000);
    setSip(15000);
    setOneTime(120000);
    setHorizonYears(5);
    setReturnRate(11);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="What-If Engine"
        title="Simulate your decisions before you commit."
        description="Adjust the inputs below. Your Financial Twin updates the projection instantly."
        icon={<Wand2 className="h-4 w-4" />}
        right={
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        {/* Controls */}
        <div className="card-elevated space-y-5 rounded-2xl p-5">
          <Slider
            label="Monthly income"
            value={monthlyIncome}
            min={20000}
            max={500000}
            step={5000}
            onChange={setMonthlyIncome}
            format={fmtINR}
          />
          <Slider
            label="Monthly spending"
            value={monthlySpend}
            min={10000}
            max={300000}
            step={2000}
            onChange={setMonthlySpend}
            format={fmtINR}
          />
          <Slider
            label="SIP investment / month"
            value={sip}
            min={0}
            max={100000}
            step={1000}
            onChange={setSip}
            format={fmtINR}
          />
          <Slider
            label="One-time decision"
            value={oneTime}
            min={0}
            max={1000000}
            step={5000}
            onChange={setOneTime}
            format={fmtINR}
          />
          <Slider
            label="Horizon"
            value={horizonYears}
            min={1}
            max={15}
            step={1}
            onChange={setHorizonYears}
            format={(v) => `${v} yr`}
          />
          <Slider
            label="Expected return (p.a.)"
            value={returnRate}
            min={4}
            max={18}
            step={0.5}
            onChange={setReturnRate}
            format={(v) => `${v}%`}
          />
        </div>

        {/* Output */}
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat
              label="Corpus delta"
              value={(deltaCorpus >= 0 ? "+" : "−") + fmtINR(Math.abs(deltaCorpus))}
              tone={onTrack ? "success" : "warning"}
              hint={`Over ${horizonYears} years`}
            />
            <Stat
              label="Goal recovery"
              value={goalShiftMonths === 0 ? "On schedule" : `+${goalShiftMonths} mo`}
              tone={goalShiftMonths === 0 ? "success" : "warning"}
              hint="To reach baseline corpus"
            />
            <Stat
              label="Verdict"
              value={onTrack ? "Safe to proceed" : "Reconsider"}
              tone={onTrack ? "success" : "warning"}
              hint="Twin recommendation"
            />
          </div>

          <div className="card-elevated rounded-2xl p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Projected corpus (₹ lakh)
                </p>
                <h3 className="mt-1 text-sm font-semibold">Baseline vs your decision</h3>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-4 rounded-full bg-accent" /> Baseline
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-4 rounded-full"
                    style={{ background: onTrack ? "var(--success)" : "var(--warning)" }}
                  />
                  Scenario
                </span>
              </div>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={merged} margin={{ left: -10, right: 8 }}>
                  <defs>
                    <linearGradient id="gB" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gS" x1="0" x2="0" y1="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={onTrack ? "var(--success)" : "var(--warning)"}
                        stopOpacity={0.5}
                      />
                      <stop
                        offset="100%"
                        stopColor={onTrack ? "var(--success)" : "var(--warning)"}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                  <XAxis
                    dataKey="m"
                    stroke="oklch(0.72 0.02 250)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="oklch(0.72 0.02 250)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.18 0.04 254)",
                      border: "1px solid oklch(1 0 0 / 0.12)",
                      borderRadius: 10,
                      fontSize: 12,
                      color: "white",
                    }}
                    formatter={(v: number) => `₹${v} L`}
                  />
                  <Area
                    type="monotone"
                    dataKey="baseline"
                    stroke="var(--accent)"
                    fill="url(#gB)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="scenario"
                    stroke={onTrack ? "var(--success)" : "var(--warning)"}
                    fill="url(#gS)"
                    strokeWidth={2.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-elevated rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Twin recommendation
            </p>
            <div className="mt-3 flex items-start gap-3 rounded-xl border border-border bg-background/40 p-4">
              {onTrack ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              ) : (
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
              )}
              <div className="text-sm leading-relaxed">
                {onTrack
                  ? "This decision keeps your long-term goals intact. Consider routing surplus into your highest-priority goal."
                  : `This decision sets your corpus back by ${fmtINR(Math.abs(deltaCorpus))}. Splitting the spend into EMIs or deferring by 2 months would protect your goal timeline.`}
              </div>
            </div>

            <div className="mt-4 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={merged}>
                  <Line
                    type="monotone"
                    dataKey="scenario"
                    stroke={onTrack ? "var(--success)" : "var(--warning)"}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="baseline"
                    stroke="var(--accent)"
                    strokeWidth={1.5}
                    dot={false}
                  />
                  <XAxis dataKey="m" hide />
                  <YAxis hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground">{label}</label>
        <span className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-xs font-medium tabular-nums">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface accent-[var(--primary-glow)]"
      />
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
  hint,
}: {
  label: string;
  value: string;
  tone: "success" | "warning";
  hint: string;
}) {
  const accent = tone === "success" ? "text-success" : "text-warning";
  const Icon = tone === "success" ? TrendingUp : AlertTriangle;
  return (
    <div className="card-elevated rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
        <Icon className={`h-4 w-4 ${accent}`} />
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function PageHeader({
  eyebrow,
  title,
  description,
  icon,
  right,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-primary-glow">
          {icon}
          {eyebrow}
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {right}
    </div>
  );
}
