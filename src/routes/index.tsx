import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Target,
  LineChart,
  Brain,
  ShieldCheck,
  Wand2,
  Compass,
  TrendingUp,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SBI OneAI — From Transaction Banking to Goal Banking" },
      {
        name: "description",
        content:
          "Agentic Banking platform from SBI. Plan goals, simulate decisions, and receive intelligent financial guidance powered by your AI Financial Twin.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <PreviewBand />
      <Benefits />
      <WhySection />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#vision" className="transition-colors hover:text-foreground">
            Vision
          </a>
          <a href="#preview" className="transition-colors hover:text-foreground">
            Demo
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link to="/login">
              Explore demo
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div aria-hidden className="surface-grid absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Introducing SBI OneAI — prototype v0.1
          </div>
          <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight md:text-7xl">
            From Transaction Banking
            <br />
            to{" "}
            <span className="bg-gradient-to-r from-accent via-primary-glow to-primary bg-clip-text text-transparent">
              Goal Banking
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
            An Agentic Banking platform that helps customers make smarter financial decisions
            through AI-powered goal planning, future simulation, and a personal Financial Twin.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/login">
                Explore demo
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-border-strong bg-surface/40 px-6 backdrop-blur"
            >
              <a href="#vision">Learn more</a>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-success" /> RBI-compliant by design
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Brain className="h-3.5 w-3.5 text-accent" /> Built on a personal Financial Twin
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary-glow" /> Agentic, not chatbot
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewBand() {
  return (
    <section id="preview" className="relative px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="card-elevated relative overflow-hidden rounded-3xl p-3 shadow-[var(--shadow-elevated)]">
          <div className="relative rounded-2xl border border-border-strong bg-background/80">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
              </div>
              <span className="text-xs text-muted-foreground">oneai.sbi / dashboard</span>
              <span className="text-xs text-muted-foreground">Interactive preview</span>
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-[1fr_1.6fr_1fr]">
              <PreviewCard
                title="Financial Health"
                value="824"
                subtitle="Excellent"
                tone="success"
              />
              <PreviewCard
                title="What-If Simulation"
                value="₹1,20,000 iPhone"
                subtitle="Delays Goa trip goal by 3 months"
                tone="primary"
                large
              />
              <PreviewCard
                title="Goal Progress"
                value="68%"
                subtitle="Goa Trip — Mar 2027"
                tone="accent"
              />
              <PreviewCard
                title="Monthly Savings"
                value="₹38,400"
                subtitle="+12% vs last month"
                tone="default"
              />
              <PreviewCard
                title="AI Insight"
                value="Increase SIP by ₹2,500"
                subtitle="Stay on track"
                tone="primary"
              />
              <PreviewCard
                title="Emergency Fund"
                value="4.2 mo"
                subtitle="Target: 6 months"
                tone="warning"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewCard({
  title,
  value,
  subtitle,
  tone,
  large,
}: {
  title: string;
  value: string;
  subtitle: string;
  tone: "default" | "primary" | "accent" | "success" | "warning";
  large?: boolean;
}) {
  const accentColor = {
    default: "text-muted-foreground",
    primary: "text-primary-glow",
    accent: "text-accent",
    success: "text-success",
    warning: "text-warning",
  }[tone];
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-border bg-surface/70 p-4 transition-colors hover:bg-surface ${
        large ? "md:row-span-2" : ""
      }`}
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>{title}</span>
        <span className={`h-1.5 w-1.5 rounded-full ${accentColor.replace("text-", "bg-")}`} />
      </div>
      <div className={`mt-3 font-semibold tracking-tight ${large ? "text-3xl" : "text-xl"}`}>
        {value}
      </div>
      <div className={`mt-1 text-xs ${accentColor}`}>{subtitle}</div>
      {large && (
        <div className="mt-5 space-y-2">
          {["Goal impact", "Savings impact", "Timeline shift", "Suggested alternative"].map(
            (row) => (
              <div
                key={row}
                className="flex items-center justify-between rounded-lg border border-border/70 bg-background/40 px-3 py-2 text-xs"
              >
                <span className="text-muted-foreground">{row}</span>
                <span className="font-medium text-foreground">—</span>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}

function Benefits() {
  const items = [
    {
      icon: Brain,
      title: "AI Financial Twin",
      body: "A living model of your money — income, spend, goals — kept in sync.",
    },
    {
      icon: Target,
      title: "Goal Planning",
      body: "Turn life ambitions into structured, fundable plans you can act on.",
    },
    {
      icon: Wand2,
      title: "What-If Simulation",
      body: "See how every decision shifts your goals before you commit.",
    },
    {
      icon: Compass,
      title: "Personalized Banking",
      body: "Products and nudges tailored to where you are in your journey.",
    },
    {
      icon: LineChart,
      title: "Intelligent Guidance",
      body: "Contextual insights from your Copilot, not a generic chatbot.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Trust",
      body: "Backed by SBI's institutional rigor, compliance, and security.",
    },
  ];
  return (
    <section id="features" className="border-t border-border bg-surface/30 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Key benefits</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            A banking app that thinks about your future, not just your transactions.
          </h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="group bg-background p-7 transition-colors hover:bg-surface">
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const shifts = [
    {
      before: "Check balance",
      after: "Understand your financial health",
      body: "A single score reflecting savings, spending, debt, and goal trajectory.",
    },
    {
      before: "Move money",
      after: "Move toward goals",
      body: "Every transfer is connected to a goal, with progress visualized in real time.",
    },
    {
      before: "Statements",
      after: "Simulations",
      body: "See months ahead — not just months behind — with what-if forecasting.",
    },
    {
      before: "Generic offers",
      after: "Personal guidance",
      body: "Products recommended only when they help you reach what matters.",
    },
  ];
  return (
    <section id="vision" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Why SBI OneAI</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              The shift from transaction banking to goal banking.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Traditional apps help customers do banking. SBI OneAI helps customers
              <em className="not-italic text-foreground"> live their financial lives</em> — with
              Agentic AI that plans, simulates, and guides.
            </p>
          </div>
          <div className="space-y-4">
            {shifts.map((s) => (
              <div
                key={s.after}
                className="card-elevated group rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider">
                  <span className="rounded-full border border-border bg-background px-2.5 py-1 text-muted-foreground">
                    {s.before}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-primary-glow">
                    {s.after}
                  </span>
                </div>
                <p className="mt-4 text-base leading-relaxed text-foreground/90">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="card-elevated relative overflow-hidden rounded-3xl p-10 md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "color-mix(in oklab, var(--primary) 50%, transparent)" }}
          />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Experience the future of intelligent banking.
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
                Step inside the SBI OneAI prototype — explore goal planning, what-if simulation, and
                the Financial Copilot, all in a premium banking workspace.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/login">
                  Explore demo
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-border-strong bg-surface/50 px-6"
              >
                <a href="#features">View features</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <Logo />
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-accent" />
            Foundation Sprint v0.1 — Frontend Prototype
          </span>
          <span>© {new Date().getFullYear()} State Bank of India — OneAI</span>
        </div>
      </div>
    </footer>
  );
}
