import { createFileRoute } from "@tanstack/react-router";
import { EduPredictCaseStudy } from "@/components/portfolio/EduPredictCaseStudy";

export const Route = createFileRoute("/projects/edupredict")({
  head: () => ({
    meta: [
      { title: "EduPredict — Student Academic Portal | Imran Ghafoor" },
      { name: "description", content: "EduPredict case study: a role-based Flask and MySQL academic management portal by Imran Ghafoor." },
      { property: "og:title", content: "EduPredict — Imran Ghafoor" },
    ],
  }),
  component: EduPredictCaseStudy,
});
