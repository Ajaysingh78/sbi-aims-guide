import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Plane,
  Smartphone,
  Sparkles,
  TrendingUp,
  Wand2,
  Shield,
} from "lucide-react";
import {
  expenseSplit,
  goalProgress,
  projection,
  savingsTrend,
} from "@/features/dashboard/data/financial-demo-data";

const CHART_PRIMARY = "oklch(0.62 0.18 256)";
const CHART_ACCENT = "oklch(0.78 0.14 215)";
const CHART_SUCCESS = "oklch(0.72 0.16 160)";
const CHART_WARNING = "oklch(0.82 0.14 75)";
const CHART_PURPLE = "oklch(0.65 0.18 310)";
const GRID = "oklch(1 0 0 / 0.06)";
const AXIS = "oklch(0.72 0.02 250)";

function Card({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`card-elevated rounded-2xl p-5 transition-colors ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
        )}
        <h3 className="mt-1 truncate text-sm font-semibold tracking-tight">{title}</h3>
      </div>
      {action}
    </div>
  );
}

const tooltipStyle = {
  background: "oklch(0.18 0.04 254)",
  border: "1px solid oklch(1 0 0 / 0.12)",
  borderRadius: 10,
  fontSize: 12,
  color: "white",
} as const;

/* ---------------- Hero: What-If Simulation ---------------- */

export function WhatIfHero() {
  return (
    <Card className="relative overflow-hidden xl:col-span-2 xl:row-span-2">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "color-mix(in oklab, var(--primary) 45%, transparent)" }}
      />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-primary-glow">
            <Wand2 className="h-3 w-3" /> What-If Simulation
          </div>
          <button className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground">
            Run simulation <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <h2 className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">
          What happens if I buy a{" "}
          <span className="bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
            ₹1,20,000 phone
          </span>{" "}
          this month?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your Financial Twin simulated the next 18 months across active goals.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <SimRow
            icon={Plane}
            label="Goal Impact"
            value="Goa Trip"
            delta="Delayed by 3 months"
            tone="warning"
          />
          <SimRow
            icon={TrendingUp}
            label="Savings Impact"
            value="−₹14,200 / mo"
            delta="for next 8 months"
            tone="warning"
          />
          <SimRow
            icon={Calendar}
            label="Timeline Shift"
            value="Mar 2027 → Jun 2027"
            delta="Down Payment goal"
            tone="warning"
          />
          <SimRow
            icon={Smartphone}
            label="Suggested Alternative"
            value="Split into 6 EMIs"
            delta="Keeps goals on track"
            tone="success"
          />
        </div>

        <div className="mt-6 h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projection}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="y" stroke={AXIS} tickLine={false} axisLine={false} fontSize={11} />
              <YAxis hide />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `₹${v} L`} />
              <Line
                type="monotone"
                dataKey="base"
                name="If you buy now"
                stroke={CHART_WARNING}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="optimized"
                name="Recommended path"
                stroke={CHART_SUCCESS}
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex items-center justify-end gap-4 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-4 rounded-full" style={{ background: CHART_WARNING }} /> Buy
            now
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-4 rounded-full" style={{ background: CHART_SUCCESS }} />{" "}
            Recommended
          </span>
        </div>
      </div>
    </Card>
  );
}

function SimRow({
  icon: Icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delta: string;
  tone: "warning" | "success";
}) {
  const color = tone === "success" ? "text-success" : "text-warning";
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface text-foreground/80">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
        <p className={`text-xs ${color}`}>{delta}</p>
      </div>
    </div>
  );
}

/* ---------------- Other cards ---------------- */

export function HealthScoreCard() {
  return (
    <Card>
      <CardHeader
        eyebrow="Financial health"
        title="Your score"
        action={<Shield className="h-4 w-4 text-success" />}
      />
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-4xl font-semibold tracking-tight">824</div>
          <div className="mt-1 inline-flex items-center gap-1 text-xs text-success">
            <ArrowUpRight className="h-3 w-3" /> +18 this month
          </div>
        </div>
        <div className="h-16 w-28">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={savingsTrend}>
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={CHART_SUCCESS} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={CHART_SUCCESS} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="saved"
                stroke={CHART_SUCCESS}
                fill="url(#g1)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          { l: "Savings", v: "A" },
          { l: "Debt", v: "B+" },
          { l: "Goals", v: "A−" },
        ].map((m) => (
          <div key={m.l} className="rounded-lg border border-border bg-background/40 py-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.l}</p>
            <p className="text-sm font-semibold">{m.v}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function CurrentGoalCard() {
  return (
    <Card>
      <CardHeader eyebrow="Current goal" title="Goa Trip · March 2027" />
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-semibold tracking-tight">₹1,22,400</p>
        <p className="text-xs text-muted-foreground">of ₹1,80,000</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-background/60">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          style={{ width: "68%" }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-success">68% complete</span>
        <span className="text-muted-foreground">On track · 2 weeks ahead</span>
      </div>
    </Card>
  );
}

export function GoalsProgressCard() {
  return (
    <Card>
      <CardHeader eyebrow="Goals" title="Progress across active goals" />
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={goalProgress} layout="vertical" margin={{ left: 8, right: 8 }}>
            <CartesianGrid stroke={GRID} horizontal={false} />
            <XAxis type="number" hide domain={[0, 100]} />
            <YAxis
              type="category"
              dataKey="name"
              stroke={AXIS}
              tickLine={false}
              axisLine={false}
              fontSize={11}
              width={110}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
            <Bar dataKey="value" radius={[6, 6, 6, 6]} fill={CHART_PRIMARY} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function SavingsTimelineCard() {
  return (
    <Card className="md:col-span-2">
      <CardHeader
        eyebrow="Savings timeline"
        title="Saved vs projected — last 9 months"
        action={<span className="text-[11px] text-success">+12% MoM</span>}
      />
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={savingsTrend} margin={{ left: -10, right: 8 }}>
            <defs>
              <linearGradient id="gSaved" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={CHART_PRIMARY} stopOpacity={0.55} />
                <stop offset="100%" stopColor={CHART_PRIMARY} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gProj" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={CHART_ACCENT} stopOpacity={0.35} />
                <stop offset="100%" stopColor={CHART_ACCENT} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="m" stroke={AXIS} tickLine={false} axisLine={false} fontSize={11} />
            <YAxis
              stroke={AXIS}
              tickLine={false}
              axisLine={false}
              fontSize={11}
              tickFormatter={(v) => `₹${v / 1000}k`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`}
            />
            <Area
              type="monotone"
              dataKey="projected"
              stroke={CHART_ACCENT}
              fill="url(#gProj)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="saved"
              stroke={CHART_PRIMARY}
              fill="url(#gSaved)"
              strokeWidth={2.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function ExpenseSplitCard() {
  const colors = [CHART_PRIMARY, CHART_ACCENT, CHART_SUCCESS, CHART_PURPLE];
  return (
    <Card>
      <CardHeader eyebrow="This month" title="Expense distribution" />
      <div className="flex items-center gap-4">
        <div className="h-36 w-36 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseSplit}
                dataKey="value"
                innerRadius={42}
                outerRadius={64}
                paddingAngle={2}
                stroke="none"
              >
                {expenseSplit.map((_, i) => (
                  <Cell key={i} fill={colors[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex-1 space-y-2">
          {expenseSplit.map((e, i) => (
            <li key={e.name} className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ background: colors[i] }} />
                {e.name}
              </span>
              <span className="font-medium">{e.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export function RecommendedProductCard() {
  return (
    <Card>
      <CardHeader eyebrow="Recommended for you" title="SBI Magnum Children Benefit" />
      <p className="text-sm text-muted-foreground">
        A balanced fund aligned to your Down Payment goal, with historic CAGR of 12.4%.
      </p>
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary-glow">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Match score · 94/100</p>
          <p className="text-xs text-muted-foreground">Based on your Financial Twin</p>
        </div>
        <button className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs hover:bg-surface-elevated">
          Learn more <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </Card>
  );
}

export function UpcomingReminderCard() {
  return (
    <Card>
      <CardHeader eyebrow="Upcoming" title="Scheduled actions" />
      <ul className="space-y-3">
        {[
          { date: "28 Oct", title: "SIP auto-debit", sub: "₹15,000 · Bluechip Equity" },
          { date: "02 Nov", title: "Credit card due", sub: "₹24,180 · pay in full" },
          { date: "12 Nov", title: "Goal review with Copilot", sub: "Goa Trip checkpoint" },
        ].map((r) => (
          <li
            key={r.title}
            className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface text-foreground/80">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{r.title}</p>
              <p className="truncate text-xs text-muted-foreground">{r.sub}</p>
            </div>
            <span className="text-xs text-muted-foreground">{r.date}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
