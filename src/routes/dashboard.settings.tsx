import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Settings as SettingsIcon, Bell, ShieldCheck, Brain, Globe } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({
    meta: [
      { title: "Settings — SBI OneAI" },
      { name: "description", content: "Tune your Twin, notifications, security, and privacy." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-primary-glow">
          <SettingsIcon className="h-3 w-3" /> Workspace settings
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
          Tune your Financial Twin.
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          Control how OneAI observes, suggests, and protects you.
        </p>
      </div>

      <Section icon={Brain} title="Twin behaviour" desc="How proactive your Copilot should be.">
        <Toggle
          label="Proactive suggestions"
          hint="OneAI surfaces insights without asking."
          defaultOn
        />
        <Toggle
          label="What-If auto-simulate"
          hint="Automatically simulate any spend above ₹25,000."
          defaultOn
        />
        <Toggle
          label="Goal-first nudges"
          hint="Defer offers that don't help your top goal."
          defaultOn
        />
      </Section>

      <Section icon={Bell} title="Notifications" desc="Reach you only when it matters.">
        <Toggle label="Goal milestones" defaultOn />
        <Toggle label="Risk alerts (emergency fund, debt)" defaultOn />
        <Toggle label="Product recommendations" />
        <Toggle label="Weekly Twin summary" defaultOn />
      </Section>

      <Section icon={ShieldCheck} title="Security & privacy" desc="Bank-grade by default.">
        <Toggle label="Biometric login" defaultOn />
        <Toggle label="Transaction PIN for >₹50,000" defaultOn />
        <Toggle label="Share anonymised data to improve OneAI" />
      </Section>

      <Section icon={Globe} title="Region & language" desc="">
        <Row label="Language" value="English (India)" />
        <Row label="Currency" value="INR · Indian Rupee" />
        <Row label="Time zone" value="Asia/Kolkata" />
      </Section>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-elevated rounded-2xl p-5">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-accent" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {desc && <p className="mt-1 text-xs text-muted-foreground">{desc}</p>}
      <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-background/40">
        {children}
      </div>
    </div>
  );
}

function Toggle({ label, hint, defaultOn }: { label: string; hint?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          on ? "bg-primary" : "bg-surface"
        }`}
        aria-pressed={on}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
