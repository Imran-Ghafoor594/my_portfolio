# Imran Ghafoor — AI Engineering Portfolio

A cinematic, recruiter-focused personal portfolio built to present my work across Artificial Intelligence, Machine Learning, Computer Vision, data-driven applications, and full-stack engineering.

The portfolio is designed as a single immersive experience rather than a traditional resume website, with dedicated case-study pages for my strongest projects and a compact section for additional builds.

**Live Portfolio:** https://imranghafoor.vercel.app/  

---

## About

I am Imran Ghafoor, an Artificial Intelligence student and aspiring AI/ML Engineer based in Pakistan. My work focuses on building practical intelligent systems and turning machine-learning ideas into usable applications.

This portfolio brings together my work in:

- Machine Learning and predictive modeling
- Deep Learning and Computer Vision
- NLP and Generative AI
- AI-powered application development
- Data-driven software systems
- Full-stack applications with Flask and MySQL

The site also documents my internship experience, technical stack, certifications, resume, and selected engineering work.

---

## Featured Projects

The portfolio currently highlights four primary case studies. Each project has its own detailed route covering the problem, solution, technology, implementation, and project-specific results.

| # | Project | Focus |
|---|---|---|
| 01 | **CropHeat AI** | Climate intelligence, risk scoring, APIs, FastAPI |
| 02 | **PlantScan** | Computer Vision, transfer learning, plant disease detection |
| 03 | **Smart Electricity Consumption** | Regression, prediction, data analysis, Flask |
| 04 | **EduPredict** | Database Systems, Flask, MySQL, student portal |

### CropHeat AI

A hyperlocal crop heat-risk platform that converts weather and climate data into an explainable crop-specific risk score. The system combines six weighted factors and produces a transparent 0–100 risk score with actionable advisory information.

**Stack:** Next.js, FastAPI, FortyGuard, Leaflet, SQLite

**Repository:** https://github.com/Imran-Ghafoor594/cropheat-ai  
**Case study:** `/projects/cropheat-ai`

> CropHeat is an explainable rule-based/hybrid risk engine, not a trained ML model.

### PlantScan

A plant disease detection system built by training and comparing three CNN backbones using transfer learning: EfficientNetB0, MobileNetV2, and ResNet50. The models are served through Flask with live camera capture and quality-gated automatic capture.

The portfolio presents the documented 98% result for the 38-class model setup while keeping the different dataset/model configurations explicit in the case study.

**Stack:** TensorFlow, Keras, EfficientNetB0, MobileNetV2, ResNet50, Flask, OpenCV

**Repository:** https://github.com/Imran-Ghafoor594/plant_disease_detection  
**Case study:** `/projects/plantscan`

### Smart Electricity Consumption

A household electricity consumption prediction system that compares seven regression models and deploys the selected model through a Flask application. The application also provides estimated consumption, bill information, efficiency scoring, and energy-saving recommendations.

**Documented metrics:** R² 0.9641, MAE 1.57 kWh, RMSE 1.98 kWh

**Stack:** Python, Pandas, Scikit-learn, XGBoost, Flask

**Repository:** https://github.com/Imran-Ghafoor594/smart_electricity_consumption_prediction  
**Case study:** `/projects/electricity`

### EduPredict

EduPredict is a full-stack university student portal developed as a Database Systems project. It is intentionally presented as a database/full-stack engineering project rather than an AI/ML project.

The system provides separate Admin and Student workflows:

- Admin authentication
- Student account creation and deletion
- Course management
- Marks entry with automatic grade calculation
- Result publishing
- Semester-fee management
- Student course enrollment and dropping
- Result and CGPA viewing
- Student profile management

**Stack:** Python, Flask, MySQL, HTML, CSS, JavaScript, Flask Sessions

**Repository:** https://github.com/Imran-Ghafoor594/edu-predict  
**Case study:** `/projects/edupredict`

---

## Other Builds

Smaller or earlier projects remain accessible without competing with the four main case studies.

### Jarvis AI Assistant
A multilingual, voice-first Python assistant using Gemini, including Hindi-to-English translation, web navigation, schedule lookup, and sleep/wake controls.

**Repository:** https://github.com/Imran-Ghafoor594/Jarvis

### RoboImmi
A desktop AI chatbot for DSA and AI questions using voice/text interaction, TF-IDF retrieval, logistic regression, chat history, and authentication.

**Repository:** https://github.com/Imran-Ghafoor594/RoboImmi

---

## Experience

### Machine Learning Intern — NeuroFive Solutions
**16 July 2026 — 28 August 2026**

Completed an ML-track capstone focused on stress-level prediction, including data cleaning, feature engineering, comparison of Linear Regression, Random Forest, and XGBoost, and deployment as a Streamlit application.

**Stack:** Python, Pandas, Scikit-learn, XGBoost, Streamlit

Repository: https://github.com/Imran-Ghafoor594/daily-stress-predictor

### Machine Learning Intern — Teyzix Core
**11 June 2026 — 10 July 2026**

Worked on the Smart Electricity Consumption Prediction system using regression models, feature engineering, data analysis, and Flask deployment.

**Stack:** Python, Scikit-learn, Pandas, Flask, Machine Learning

### AI Intern — Decode Labs
**10 June 2026 — 10 July 2026**

Worked on AI applications, machine-learning workflows, and intelligent automation using Python and related AI tooling.

---

## Portfolio Features

- Cinematic full-screen hero with background video
- Personal name and AI Engineer positioning directly over the hero
- Responsive mobile experience with native touch scrolling
- Desktop smooth scrolling using Lenis
- Custom cursor and mouse-tracked ambient effects on fine-pointer devices
- Neural node-network background on supported devices
- Reduced-motion support through Motion and CSS
- Dedicated project case-study routes
- Featured-project and Other Builds separation
- Experience timeline
- Technical Architecture section
- GitHub, LinkedIn, and resume access
- Internship certificate viewing
- Blog routes for technical write-ups
- SEO metadata, `robots.txt`, `sitemap.xml`, and `llms.txt`

---

## Tech Stack

### Frontend

- React 19
- TypeScript
- TanStack Start
- TanStack Router
- Tailwind CSS
- Motion
- Lenis
- Lucide React

### UI & Interaction

- Responsive component architecture
- Motion-based reveal animations
- Native Canvas/SVG effects
- Custom cursor
- Mouse-tracked glow effects
- Mobile navigation
- Reduced-motion support

### Engineering

- File-based routing
- SSR through TanStack Start
- TanStack Query
- ESLint
- Prettier
- Vite

### Deployment

- Vercel

---

## Project Structure

```text
src/
├── components/
│   ├── portfolio/
│   │   ├── Hero.tsx
│   │   ├── HeroBackdrop.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx
│   │   ├── CropHeatCaseStudy.tsx
│   │   ├── PlantScanCaseStudy.tsx
│   │   ├── ElectricityCaseStudy.tsx
│   │   ├── EduPredictCaseStudy.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Architecture.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── effects/
│   │   ├── SmoothScroll.tsx
│   │   ├── NeuralBackground.tsx
│   │   ├── MouseGlow.tsx
│   │   ├── CustomCursor.tsx
│   │   └── Reveal.tsx
│   └── ui/
├── routes/
│   ├── index.tsx
│   ├── projects.cropheat-ai.tsx
│   ├── projects.plantscan.tsx
│   ├── projects.electricity.tsx
│   ├── projects.edupredict.tsx
│   ├── blog.index.tsx
│   ├── blog.$slug.tsx
│   └── __root.tsx
├── data/
│   ├── projects.ts
│   ├── experience.ts
│   ├── architecture.ts
│   └── site.ts
├── hooks/
└── assets/

public/
├── video/
├── certificates/
├── resume/
├── robots.txt
└── llms.txt
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Imran-Ghafoor594/my_portfolio.git
cd my_portfolio
```

### 2. Install dependencies

This project was built with Bun and includes a lockfile.

```bash
bun install
```

Alternatively, npm can be used:

```bash
npm install --legacy-peer-deps
```

### 3. Start the development server

```bash
bun run dev
```

Or with npm:

```bash
npm run dev
```

Then open the local URL shown by Vite.

### 4. Production build

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

### 6. Lint the project

```bash
npm run lint
```

### 7. Format the project

```bash
npm run format
```

---

## Engineering Decisions

### Performance

The portfolio uses animation selectively instead of turning every section into a continuously animated scene.

- Lenis is used for desktop smooth scrolling while touch devices retain native scrolling.
- The hero video uses a poster image for smaller devices.
- The hero video is paused when it is outside the viewport where appropriate.
- Large blur-heavy layers are avoided in favor of lighter gradients.
- The neural background is limited to supported devices and is paused when it is not visible.
- Mouse effects only run on fine-pointer devices.
- Motion respects the user's `prefers-reduced-motion` setting.

### Content integrity

Project metrics are based on the corresponding project documentation rather than invented portfolio numbers. Different datasets and evaluation setups are kept distinct where necessary.

For example, PlantScan uses different dataset configurations across its model experiments, so the portfolio avoids presenting every reported result as though it came from one identical benchmark.

EduPredict is described as a Database Systems/full-stack project because that reflects its actual implementation: Flask, MySQL, sessions, CRUD workflows, course enrollment, results, and fee management.

### Portfolio architecture

The main homepage is composed from reusable React sections, while detailed project stories live on dedicated routes. This keeps the landing page focused while allowing each major project to have enough technical depth for recruiters or engineers who want to inspect the work.

---

## SEO & Accessibility

The portfolio includes:

- Page titles and meta descriptions
- Open Graph metadata
- Twitter card metadata
- Canonical metadata
- Schema.org Person structured data
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- Skip-to-content link
- Semantic labels and accessible navigation
- Reduced-motion support

---

## Contact

**Email:** meimranghafoor@gmail.com  
**GitHub:** https://github.com/Imran-Ghafoor594  
**LinkedIn:** https://linkedin.com/in/imranghafoor56  

---

## License

This repository contains my personal portfolio and project presentation. The portfolio content, branding, resume, certificates, and personal assets are not intended for redistribution without permission.
