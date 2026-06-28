import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Lock } from "lucide-react";
import { Logo } from "@/shared/brand/Logo";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — SBI OneAI" },
      { name: "description", content: "Continue to the SBI OneAI demo workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex flex-col px-6 py-10 sm:px-12">
        <Link to="/" className="inline-flex w-fit">
          <Logo />
        </Link>
        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Welcome back</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Continue to SBI OneAI</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              This demo uses sample data, so no real credentials are required.
            </p>

            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/dashboard" });
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="cif">Customer ID</Label>
                <Input
                  id="cif"
                  defaultValue="SBI-DEMO-0824"
                  className="h-11 rounded-lg border-border-strong bg-surface/60"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pin">Secure PIN</Label>
                  <button
                    type="button"
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Forgot PIN?
                  </button>
                </div>
                <Input
                  id="pin"
                  type="password"
                  defaultValue="••••••"
                  className="h-11 rounded-lg border-border-strong bg-surface/60"
                />
              </div>

              <Button type="submit" size="lg" className="w-full rounded-lg">
                Continue to demo
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>

              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <Lock className="h-3 w-3" />
                Demo session only — no real account is accessed.
              </div>
            </form>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} State Bank of India — OneAI
        </p>
      </div>

      {/* Right: brand panel */}
      <div className="relative hidden overflow-hidden border-l border-border lg:block">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div aria-hidden className="surface-grid absolute inset-0" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-accent" />
            Agentic Banking
          </div>
          <div>
            <h2 className="max-w-md text-balance text-4xl font-semibold tracking-tight">
              Your Financial Twin is ready to plan the next chapter.
            </h2>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Track goals, simulate decisions, and receive intelligent guidance — all from a single,
              calm workspace built for trust.
            </p>
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-success" /> Bank-grade security
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent" /> Agentic AI
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
