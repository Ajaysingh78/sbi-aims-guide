import { createFileRoute } from "@tanstack/react-router";
import { DashSidebar } from "@/components/dashboard/Sidebar";
import { DashHeader } from "@/components/dashboard/Header";
import { Copilot } from "@/components/dashboard/Copilot";
import {
  CurrentGoalCard,
  ExpenseSplitCard,
  GoalsProgressCard,
  HealthScoreCard,
  RecommendedProductCard,
  SavingsTimelineCard,
  UpcomingReminderCard,
  WhatIfHero,
} from "@/components/dashboard/Cards";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SBI OneAI" },
      { name: "description", content: "Your Financial Twin: goals, simulations, and intelligent guidance." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <DashSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashHeader />
        <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
          <div className="grid gap-5 xl:grid-cols-4 xl:auto-rows-min">
            <WhatIfHero />
            <HealthScoreCard />
            <CurrentGoalCard />
            <SavingsTimelineCard />
            <GoalsProgressCard />
            <ExpenseSplitCard />
            <RecommendedProductCard />
            <UpcomingReminderCard />
          </div>
        </main>
      </div>
      <Copilot />
    </div>
  );
}
