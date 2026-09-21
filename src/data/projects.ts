import plantScanImg from "@/assets/proj-plantscan.jpg";
import cropHeatImg from "@/assets/cropheat-case.svg";
import jarvisImg from "@/assets/proj-jarvis.jpg";
import roboImmiImg from "@/assets/proj-roboimmi.jpg";
import electricityImg from "@/assets/proj-electricity.jpg";
import eduPredictImg from "@/assets/proj-edupredict.svg";

export type Project = {
  n: string;
  name: string;
  emoji: string;
  tagline: string;
  problem: string;
  solution: string;
  metrics: { label: string; value: string }[];
  tech: string[];
  role: string;
  status: string;
  image: string;
  github: string;
  accent: string;
  year: string;
  caseStudy?: string;
};

export const projects: Project[] = [
  {
    n: "01",
    emoji: "🌡️",
    name: "CropHeat AI",
    tagline: "Hyperlocal climate intelligence turned into explainable, crop-specific heat-risk decisions.",
    problem: "Farmers and agronomists get generic weather forecasts, but a headline temperature does not explain whether heat is dangerous for a specific crop at a specific growth stage.",
    solution: "Built a FortyGuard-powered platform that combines spatial temperature, exceedance and persistence data with sourced crop heat-sensitivity thresholds to produce a transparent 0–100 risk score and actionable advisory.",
    metrics: [{ label: "Risk score", value: "0–100" }, { label: "Risk factors", value: "6" }, { label: "Hackathon", value: "FortyGuard" }],
    tech: ["Next.js", "FastAPI", "FortyGuard", "Leaflet", "SQLite"], role: "Solo build", status: "Hackathon", image: cropHeatImg,
    github: "https://github.com/Imran-Ghafoor594/cropheat-ai", accent: "oklch(0.78 0.18 45)", year: "2026", caseStudy: "/projects/cropheat-ai",
  },
  {
    n: "02", emoji: "🌿", name: "PlantScan",
    tagline: "Three CNN backbones, compared and shipped, for plant disease diagnosis.",
    problem: "Smallholder farmers lose crops to diseases they can't identify fast enough — lab tests are slow, expensive, and rarely reachable.",
    solution: "Trained and compared EfficientNetB0, MobileNetV2 and ResNet50 via transfer learning, then shipped the comparable models behind a Flask app with live camera capture and quality-gated auto-capture.",
    metrics: [{ label: "Accuracy", value: "98%" }, { label: "Classes", value: "38" }, { label: "Models compared", value: "3" }],
    tech: ["TensorFlow", "Keras", "EfficientNetB0", "Flask", "OpenCV"], role: "Semester Project", status: "Shipped", image: plantScanImg,
    github: "https://github.com/Imran-Ghafoor594/plant_disease_detection", caseStudy: "/projects/plantscan", accent: "oklch(0.75 0.18 165)", year: "2026",
  },
  {
    n: "03", emoji: "⚡", name: "Smart Electricity Consumption",
    tagline: "Predicts household electricity use, with real energy-saving recommendations.",
    problem: "Households can't see where their energy goes until the bill lands — too late to change anything.",
    solution: "Compared 7 regression models on a household dataset, then shipped the best-performing model behind a Flask app that estimates consumption and gives savings recommendations.",
    metrics: [
      { label: "R² score", value: "0.964" },
      { label: "MAE", value: "1.57 kWh" },
      { label: "Models compared", value: "7" },
    ],
    tech: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Flask"], role: "Teyzix Core Internship Project", status: "Shipped", image: electricityImg,
    github: "https://github.com/Imran-Ghafoor594/smart_electricity_consumption_prediction", caseStudy: "/projects/electricity", accent: "oklch(0.78 0.15 220)", year: "2026",
  },
  {
    n: "04",
    emoji: "🎓",
    name: "EduPredict",
    tagline: "A full-stack university portal built around structured student, course, result and fee workflows.",
    problem: "University records span students, courses, enrollments, marks and fees; without a structured system, these workflows become fragmented and difficult to manage.",
    solution: "Built a Flask + MySQL portal with separate admin and student workflows, session-based authentication, course enrollment, automatic grade calculation, published results, CGPA and semester-fee management.",
    metrics: [
      { label: "Portals", value: "2" },
      { label: "Database", value: "MySQL" },
      { label: "Backend", value: "Flask" },
    ],
    tech: ["Python", "Flask", "MySQL", "HTML/CSS", "JavaScript"],
    role: "Semester Project",
    status: "Academic",
    image: eduPredictImg,
    github: "https://github.com/Imran-Ghafoor594/edu-predict",
    caseStudy: "/projects/edupredict",
    accent: "oklch(0.76 0.17 195)",
    year: "2026",
  },
];
export const featuredProjects: Project[] = projects;
export const otherProjects: Project[] = [
  {
    n: "A1",
    emoji: "🤖",
    name: "Jarvis AI Assistant",
    tagline:
      "A multilingual voice assistant powered by Gemini, with real-time Hindi-to-English translation.",
    problem:
      "Voice assistants that only understand English lock a lot of natural, everyday speech out of the conversation.",
    solution:
      "A voice-first Python assistant using Gemini for open-domain questions plus translation, web navigation, schedule lookup and sleep/wake controls.",
    metrics: [
      { label: "Mode", value: "Voice-first" },
      { label: "Translation", value: "Hindi → English" },
    ],
    tech: ["Python", "Gemini API"],
    role: "Solo build",
    status: "Other build",
    image: jarvisImg,
    github: "https://github.com/Imran-Ghafoor594/Jarvis",
    accent: "oklch(0.72 0.19 265)",
    year: "2025",
    caseStudy: "/projects/jarvis",
  },
  {
    n: "A2",
    emoji: "💬",
    name: "RoboImmi",
    tagline: "A desktop AI chatbot for DSA and AI questions, by voice or text.",
    problem: "Students want quick, interactive help with DSA and AI concepts.",
    solution:
      "A Tkinter desktop chatbot using TF-IDF retrieval and logistic regression with voice input/output, chat history and login.",
    metrics: [
      { label: "Interface", value: "Voice + Text" },
      { label: "NLP", value: "TF-IDF + LogReg" },
    ],
    tech: ["Python", "Scikit-learn"],
    role: "Solo build",
    status: "Other build",
    image: roboImmiImg,
    github: "https://github.com/Imran-Ghafoor594/RoboImmi",
    accent: "oklch(0.7 0.22 305)",
    year: "2025",
    caseStudy: "/projects/roboimmi",
  },
];


