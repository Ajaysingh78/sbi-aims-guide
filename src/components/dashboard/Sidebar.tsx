import { useState } from "react";
import {
  LayoutDashboard,
  Target,
  Wand2,
  Sparkles,
  Wallet,
  Settings,
  LogOut,
  ChevronLeft,
  User,
} from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const items = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Goals", icon: Target, to: "/dashboard" },
  { label: "Simulation", icon: Wand2, to: "/dashboard" },
  { label: "Insights", icon: Sparkles, to: "/dashboard" },
  { label: "Products", icon: Wallet, to: "/dashboard" },
  { label: "Settings", icon: Settings, to: "/dashboard" },
];

export function DashSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={cn(
        "relative hidden shrink-0 border-r border-border bg-sidebar text-sidebar-foreground transition-[width] duration-300 ease-out lg:flex lg:flex-col",
        collapsed ? "w-[72px]" : "w-[248px]",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {collapsed ? <Logo showWordmark={false} /> : <Logo />}
        <button
          aria-label="Toggle sidebar"
          onClick={() => setCollapsed((c) => !c)}
          className="grid h-7 w-7 place-items-center rounded-md border border-sidebar-border text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {!collapsed && (
          <p className="px-2 pb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Workspace</p>
        )}
        {items.map((item, i) => {
          const active = i === 0 && pathname.startsWith("/dashboard");
          return (
            <Link
              key={item.label}
              to={item.to}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-md border border-transparent",
                  active && "border-primary/30 bg-primary/15 text-primary-glow",
                )}
              >
                <item.icon className="h-4 w-4" />
              </span>
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg p-2",
            !collapsed && "bg-sidebar-accent/50",
          )}
        >
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-primary-foreground">
            AR
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">Arjun Reddy</p>
              <p className="truncate text-[11px] text-muted-foreground">Premier customer</p>
            </div>
          )}
          {!collapsed && (
            <Link
              to="/"
              aria-label="Sign out"
              className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          )}
        </div>
        {collapsed && (
          <Link
            to="/"
            aria-label="Profile"
            className="mt-2 grid h-9 w-full place-items-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
          >
            <User className="h-4 w-4" />
          </Link>
        )}
      </div>
    </aside>
  );
}
