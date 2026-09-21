export type Experience = {
  role: string;
  company: string;
  duration: string;
  current?: boolean;
  description: string;
  tech: string[];
  focus?: string;
  metrics?: { label: string; value: string }[];
  link?: { label: string; url: string };
};

export const experience: Experience[] = [
  {
    role: "Machine Learning Intern",
    company: "NeuroFive Solutions",
    duration: "16 July 2026 — 28 August 2026",
    description:
      "Completed the ML Track capstone: an end-to-end stress-level prediction pipeline — data cleaning, feature engineering, and a three-model comparison (Linear Regression, Random Forest, XGBoost) — deployed as a live Streamlit app, with an honest write-up of the dataset's limitations.",
    tech: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Streamlit"],
    focus: "ML capstone: stress prediction",
    metrics: [
      { label: "Models compared", value: "3" },
      { label: "Dataset", value: "374 records" },
      { label: "Status", value: "Completed" },
    ],
    link: {
      label: "View repository",
      url: "https://github.com/Imran-Ghafoor594/daily-stress-predictor",
    },
  },
  {
    role: "Machine Learning Intern",
    company: "Teyzix Core",
    duration: "11 June 2026 — 10 July 2026",
    description:
      "Developed an end-to-end Smart Electricity Consumption Prediction system using regression models, feature engineering, data analysis, and Flask deployment to provide intelligent energy optimization recommendations.",
    tech: ["Python", "Scikit-learn", "Pandas", "Flask", "Machine Learning"],
    focus: "Energy forecasting system",
    metrics: [
      { label: "R² score", value: "0.964" },
      { label: "MAE", value: "1.57 kWh" },
      { label: "Shipped", value: "1 system" },
    ],
  },
  {
    role: "AI Intern",
    company: "Decode Labs",
    duration: "10 June 2026 — 10 July 2026",
    description:
      "Worked on AI applications, machine learning workflows, and intelligent automation while gaining practical experience in solving real-world AI problems.",
    tech: ["Python", "Artificial Intelligence", "Machine Learning", "Automation", "Git"],
    focus: "AI workflows & automation",
    metrics: [
      { label: "Domain", value: "Automation" },
      { label: "Stack", value: "Python · ML" },
      { label: "Duration", value: "1 month" },
    ],
  },
];
