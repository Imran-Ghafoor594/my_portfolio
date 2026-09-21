import {
  DECODE_LABS_CERT_URL,
  NEUROFIVE_CERT_URL,
  TEYZIX_CERT_URL,
  HACKTHONE_CERT_URL,
} from "./site";

export const ghStats = [
  { label: "Repositories", value: "25", trend: "public" },
  { label: "Stars earned", value: "19", trend: "across repos" },
  { label: "Focus", value: "AI / ML", trend: "primary" },
];

export const languageBreakdown = [
  { name: "Python", pct: 65, color: "oklch(0.78 0.16 230)" },
  { name: "Jupyter Notebook", pct: 27, color: "oklch(0.72 0.19 265)" },
  { name: "Others", pct: 8, color: "oklch(0.75 0.18 165)" },
];

export const stackGroups: { title: string; items: string[] }[] = [
  { title: "Languages", items: ["Python", "SQL", "MongoDB"] },
  {
    title: "AI & Machine Learning",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Hugging Face", "Computer Vision"],
  },
  { title: "Frameworks", items: ["Flask", "FastAPI"] },
  { title: "Tools", items: ["Git", "GitHub", "VS Code", "Google Colab", "Jupyter Notebook"] },
];

export const certifications: {
  title: string;
  issuer: string;
  date: string;
  href: string;
}[] = [
    {
      title: "Machine Learning Fundamentals — Internship",
      issuer: "NeuroFive Solutions",
      date: "Aug 2026",
      href: NEUROFIVE_CERT_URL,
    },
    {
      title: "Machine Learning Internship",
      issuer: "Teyzix Core",
      date: "Jul 2026",
      href: TEYZIX_CERT_URL,
    },
    {
      title: "AI Internship",
      issuer: "Decode Labs",
      date: "Jul 2026",
      href: DECODE_LABS_CERT_URL,
    },
    {
      title: "Hackathon Participation",
      issuer: "fortyguard",
      date: "Sep 2026",
      href: HACKTHONE_CERT_URL,
    },
  ];
