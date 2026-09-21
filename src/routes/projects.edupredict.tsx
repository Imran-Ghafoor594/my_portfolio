import { createFileRoute } from "@tanstack/react-router";
import { EduPredictCaseStudy } from "@/components/portfolio/EduPredictCaseStudy";

export const Route = createFileRoute("/projects/edupredict")({ component: EduPredictCaseStudy });
