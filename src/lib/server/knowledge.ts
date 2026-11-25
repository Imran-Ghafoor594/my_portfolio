/**
 * Approved public facts drawn from the published portfolio and existing resume.
 * Add private career preferences ONLY after Imran explicitly approves the wording.
 * This is the single source of truth for the assistant; no arbitrary document access.
 */
export type KnowledgeEntry = {
  id: string;
  questions: string[];
  answer: string;
  source: { label: string; href: string };
  context: string;
};

export const knowledge: KnowledgeEntry[] = [
  {
    id: "profile.intro",
    questions: ["Who is Imran Ghafoor?", "Tell me about Imran", "Introduce Imran", "What does Imran do?", "Who are you?"],
    answer: "Imran Ghafoor is an AI and Machine Learning engineering student based in Lahore, Pakistan. His work focuses on applied machine learning, computer vision and practical AI applications. His portfolio documents CropHeat AI, PlantScan, Smart Electricity Consumption and EduPredict.",
    context: "Profile: Imran Ghafoor; AI/ML engineering student; based in Lahore, Pakistan; applied machine learning, computer vision, practical AI applications.",
    source: { label: "About Imran", href: "/#about" },
  },
  {
    id: "profile.location",
    questions: ["Where is Imran based?", "Which city does Imran live in?", "What is Imran's location?", "Where is he from?", "Imran address city"],
    answer: "Imran is based in Lahore, Pakistan. His portfolio does not publish a detailed residential address.",
    context: "Public location: Lahore, Pakistan. No street address is approved for disclosure.",
    source: { label: "About Imran", href: "/#about" },
  },
  {
    id: "profile.education",
    questions: ["Where did Imran study?", "What is Imran's education?", "Which university is Imran attending?", "What degree does he have?", "Imran university and CGPA", "Where is Imran studying artificial intelligence?"],
    answer: "Imran is pursuing a Bachelor of Science in Artificial Intelligence (BSAI) at Riphah International University (2024–present). His published resume reports a CGPA of 3.74/4.00 and coursework in machine learning, data structures and algorithms, probability and statistics, database systems and programming for AI.",
    context: "Education: Bachelor of Science in Artificial Intelligence (BSAI), Riphah International University, 2024–present; CGPA 3.74/4.00 as stated in published resume. Coursework: ML, DSA, probability/statistics, database systems, programming for AI.",
    source: { label: "View resume", href: "/resume/Imran%20Ghafoor.pdf" },
  },
  {
    id: "profile.interests",
    questions: ["What roles is Imran interested in?", "Is Imran open to internships?", "What type of work is Imran looking for?", "Can I hire Imran?"],
    answer: "Imran's portfolio states that he is open to internship opportunities in AI and Machine Learning. For current availability, working arrangements or a specific role, please contact him directly.",
    context: "Professional interest: AI and machine learning internship opportunities. Current status should be confirmed directly; no verified remote/hybrid/on-site preferences or preferred work cities.",
    source: { label: "Contact Imran", href: "/#contact" },
  },
  {
    id: "profile.skills",
    questions: ["What are Imran's skills?", "Which technologies does Imran use?", "What is Imran's technical stack?", "Does he know Python?", "Does Imran know TensorFlow?", "What programming languages does he use?"],
    answer: "Imran works with Python, SQL, Pandas, NumPy, scikit-learn, TensorFlow/Keras, PyTorch, OpenCV, Flask and Streamlit. His project portfolio also demonstrates FastAPI, MySQL, TypeScript, React and Next.js. His strengths include machine learning pipelines, computer vision, data analysis and applied AI.",
    context: "Skills: Python, SQL, Pandas, NumPy, scikit-learn, TensorFlow/Keras, PyTorch, OpenCV, Flask, Streamlit; project exposure to FastAPI, MySQL, TypeScript, React, Next.js. Focus: ML, computer vision, data analysis and AI workflows.",
    source: { label: "Explore portfolio", href: "/#work" },
  },
  {
    id: "projects.overview",
    questions: ["Which projects has Imran built?", "What are Imran's projects?", "Show me his best projects", "Tell me about the portfolio projects", "What AI applications has he made?"],
    answer: "Imran's featured projects are CropHeat AI (explainable heat-risk assessment), PlantScan (plant disease detection using transfer learning), Smart Electricity Consumption (regression-based energy predictions) and EduPredict (a Flask/MySQL academic management portal). The portfolio also mentions Jarvis and RoboImmi.",
    context: "Featured projects: CropHeat AI (heat-risk), PlantScan (computer vision), Smart Electricity Consumption (regression), EduPredict (academic portal). Other builds: Jarvis, RoboImmi.",
    source: { label: "Explore featured work", href: "/#work" },
  },
  {
    id: "project.cropheat",
    questions: ["What is CropHeat AI?", "Explain CropHeat AI", "How does Imran's crop heat project work?", "What did he build for climate and agriculture?", "Is CropHeat AI machine learning?"],
    answer: "CropHeat AI is an explainable crop-specific heat-risk platform. It combines FortyGuard temperature, heat-exceedance and persistence data with documented crop-sensitivity thresholds to calculate a transparent 0–100 field-level risk score. The risk engine is deterministic and explainable—not a trained ML classifier. AI or rule-based advisory explains the result; the case study documents demo-mode limitations.",
    context: "CropHeat AI: FortyGuard spatial temperature, exceedance, persistence; sourced crop thresholds; explainable deterministic six-component 0–100 risk score (not a trained ML model); advisory uses AI/rule-based fallback; built with Next.js, FastAPI, Leaflet, SQLite; project limits documented.",
    source: { label: "CropHeat AI case study", href: "/projects/cropheat-ai" },
  },
  {
    id: "project.plantscan",
    questions: ["What is PlantScan?", "Explain Imran's plant disease detector", "Does Imran have a computer vision project?", "Which CNN models were used in PlantScan?", "What is Imran's experience with image classification?"],
    answer: "PlantScan is Imran's plant disease classification project. It compares EfficientNetB0, MobileNetV2 and ResNet50 using transfer learning and provides a Flask application with live camera capture. The published project reports 98% validation accuracy for EfficientNetB0 and 95% for MobileNetV2 on a 38-class configuration; ResNet50 was evaluated on a different 15-class configuration.",
    context: "PlantScan: plant disease computer vision, transfer learning EfficientNetB0/MobileNetV2/ResNet50, Flask and live camera; reported validation accuracy 98% EfficientNetB0 and 95% MobileNetV2 on 38 classes; ResNet50 tested on 15 classes, not directly comparable.",
    source: { label: "PlantScan case study", href: "/projects/plantscan" },
  },
  {
    id: "project.electricity",
    questions: ["What is Smart Electricity Consumption?", "Explain electricity consumption prediction", "What did Imran build at Teyzix Core?", "Which regression models did Imran compare?", "What is the dataset for the electricity project?"],
    answer: "Smart Electricity Consumption was developed during Imran's Teyzix Core internship. It compares seven regression models and provides Flask-based household consumption predictions and energy-saving guidance. Its case study describes the dataset as self-created synthetic data with physically consistent relationships—not independently collected real-world measurements. Reported evaluation includes R² 0.964 and MAE 1.57 kWh.",
    context: "Smart Electricity Consumption: internship project at Teyzix Core; 7 regression models; Flask interface; dataset explicitly self-created SYNTHETIC with physically consistent relationships, not real-world measured data; reported R² 0.964, MAE 1.57 kWh.",
    source: { label: "Electricity case study", href: "/projects/electricity" },
  },
  {
    id: "project.edupredict",
    questions: ["What is EduPredict?", "Explain his database project", "Has Imran built a university portal?", "What projects used Flask and MySQL?"],
    answer: "EduPredict is a Flask and MySQL academic management portal with administrator and student workflows. It supports student records, course enrollment, results, grade calculations and fee management. It is presented as an academic project.",
    context: "EduPredict: Flask + MySQL academic student portal; admin/student roles; course enrollment, results, grades, fee workflows. Academic project.",
    source: { label: "EduPredict case study", href: "/projects/edupredict" },
  },
  {
    id: "project.jarvis",
    questions: ["What is Jarvis AI assistant?", "Has Imran made a voice assistant?", "Explain Imran's Jarvis project"],
    answer: "Jarvis is Imran's voice-first Python assistant, using a Gemini API integration for open-domain questions alongside translation and everyday helper commands. See the GitHub repository for implementation details.",
    context: "Jarvis voice assistant: Python, Gemini API, translation, web navigation, schedule lookup and sleep/wake controls.",
    source: { label: "Jarvis repository", href: "https://github.com/Imran-Ghafoor594/Jarvis" },
  },
  {
    id: "project.roboimmi",
    questions: ["What is RoboImmi?", "Did Imran build a TF-IDF chatbot?", "Explain RoboImmi project"],
    answer: "RoboImmi is a desktop chatbot for DSA and AI questions with voice/text interaction. Its documented approach uses TF-IDF retrieval and logistic regression with a Tkinter UI.",
    context: "RoboImmi: Tkinter desktop chatbot; TF-IDF + logistic regression, voice/text, DSA and AI Q&A.",
    source: { label: "RoboImmi repository", href: "https://github.com/Imran-Ghafoor594/RoboImmi" },
  },
  {
    id: "experience.neurofive",
    questions: ["What did Imran do at NeuroFive?", "Tell me about NeuroFive Solutions internship", "What was his ML capstone?"],
    answer: "Imran completed a Machine Learning internship at NeuroFive Solutions from 16 July to 28 August 2026. His capstone was a stress-level prediction pipeline covering cleaning, feature engineering and comparison of Linear Regression, Random Forest and XGBoost, deployed with Streamlit. The portfolio notes the dataset's limitations.",
    context: "NeuroFive Solutions: Machine Learning Intern, 16 Jul–28 Aug 2026; stress-level capstone, 374 records; cleaning, feature engineering, linear regression, random forest, XGBoost; Streamlit deployment; dataset limitations noted.",
    source: { label: "Experience timeline", href: "/#experience" },
  },
  {
    id: "experience.teyzix",
    questions: ["Tell me about Teyzix Core internship", "Where did Imran work on electricity predictions?", "What was his role at Teyzix?"],
    answer: "Imran was a Machine Learning Intern at Teyzix Core from 11 June to 10 July 2026. His portfolio describes a Flask-based Smart Electricity Consumption Prediction project and applied regression modeling, preprocessing and evaluation.",
    context: "Teyzix Core: Machine Learning Intern, 11 Jun–10 Jul 2026; Smart Electricity Consumption Prediction, Flask + regression evaluation.",
    source: { label: "Experience timeline", href: "/#experience" },
  },
  {
    id: "experience.decode",
    questions: ["What did Imran do at Decode Labs?", "Tell me about Decode Labs internship", "Did he work on automation?"],
    answer: "Imran held an AI internship at Decode Labs from 10 June to 10 July 2026. His published experience describes AI applications, machine learning workflows and intelligent automation.",
    context: "Decode Labs: AI Intern, 10 Jun–10 Jul 2026; AI applications, machine learning workflows, automation.",
    source: { label: "Experience timeline", href: "/#experience" },
  },
  {
    id: "experience.overview",
    questions: ["Where has Imran worked?", "What are Imran's internships?", "Tell me about his professional experience", "How many internships has he completed?"],
    answer: "Imran's portfolio lists three 2026 internships: Machine Learning Intern at NeuroFive Solutions, Machine Learning Intern at Teyzix Core and AI Intern at Decode Labs. His published work includes stress prediction, electricity forecasting and AI workflow experience.",
    context: "Experience summary: NeuroFive Solutions ML Intern, Teyzix Core ML Intern, Decode Labs AI Intern (all 2026). Project focus: stress prediction, energy forecasting, AI automation.",
    source: { label: "Experience timeline", href: "/#experience" },
  },
  {
    id: "profile.contact",
    questions: ["How can I contact Imran?", "What is his email?", "Where is his LinkedIn?", "How do I reach him?", "Where is his CV?", "Show resume", "Can I download Imran's resume?"],
    answer: "For work-related enquiries, contact Imran at meimranghafoor@gmail.com. You can also use the portfolio contact section, view his resume or explore his GitHub and LinkedIn profiles.",
    context: "Contact: public email meimranghafoor@gmail.com. Resume at /resume/Imran%20Ghafoor.pdf; LinkedIn linkedin.com/in/imranghafoor56; GitHub github.com/Imran-Ghafoor594.",
    source: { label: "Contact Imran", href: "/#contact" },
  },
];

export const profileContext = knowledge.map(({ context }) => context).join("\n");
