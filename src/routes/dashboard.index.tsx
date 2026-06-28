import { createFileRoute } from "@tanstack/react-router";
import {
  CurrentGoalCard,
  ExpenseSplitCard,
  GoalsProgressCard,
  HealthScoreCard,
  RecommendedProductCard,
  SavingsTimelineCard,
  UpcomingReminderCard,
  WhatIfHero,
} from "@/features/dashboard/components/Cards";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Overview — SBI OneAI" },
      {
        name: "description",
        content: "Your Financial Twin at a glance — health, goals, simulations, and next actions.",
      },
    ],
  }),
  component: Overview,
});

function Overview() {
  return (
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
  );
}
