import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { ElectricityCaseStudy } from "@/components/portfolio/ElectricityCaseStudy";

export const Route = createFileRoute("/projects/electricity")({
  head: () => ({
    meta: [
      { title: "Smart Electricity Consumption — Imran Ghafoor" },
      { name: "description", content: "Case study for a machine-learning household electricity prediction and energy optimization system." },
      { property: "og:title", content: "Smart Electricity Consumption — Imran Ghafoor" },
      { property: "og:description", content: "Household electricity prediction, model comparison, bill estimates and personalized energy-saving recommendations." },
      { property: "og:type", content: "article" },
    ],
  }),
  component: ElectricityRoute,
});

function ElectricityRoute() {
  return <MotionConfig reducedMotion="user"><ElectricityCaseStudy /></MotionConfig>;
}
