import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { DashSidebar } from "@/features/dashboard/components/Sidebar";
import { DashHeader } from "@/features/dashboard/components/Header";
import { Copilot } from "@/features/dashboard/components/Copilot";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Workspace — SBI OneAI" },
      {
        name: "description",
        content: "Your Financial Twin: goals, simulations, and intelligent guidance.",
      },
    ],
  }),
  component: DashboardLayout,
});

function DashboardLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  // Keep the dedicated chat page focused by hiding the right-side Copilot rail.
  const showCopilot = !path.startsWith("/dashboard/copilot");

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <DashSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashHeader />
        <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
      {showCopilot && <Copilot />}
    </div>
  );
}
