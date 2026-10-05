export const profileData = {
  name: "Siddharth Verma",
  role: "Computer Science & Engineering Student",
  specialization: "AI / SOFTWARE / SYSTEMS",
  university: "Vellore Institute of Technology",
  duration: "2023 — 2027",
  cgpa: "8.28",
  intro: "Computer Science & Engineering student focused on AI/ML, backend engineering, distributed systems and building practical software products.",
  contact: {
    email: "sid.verma2407@gmail.com",
    linkedin: "https://www.linkedin.com/in/siddharth-verma-a03b58304",
    github: "https://github.com/sidverma2407-png"
  }
};

export const skillsData = {
  languages: ["Python", "C++", "Java", "JavaScript", "TypeScript", "SQL"],
  ai_ml: ["LangGraph", "LLMs", "Scikit-learn", "SHAP", "PyTorch", "Pandas", "NumPy", "Data Modeling"],
  backend: ["FastAPI", "Node.js", "Express.js", "REST APIs", "WebSockets", "Microservices"],
  databases: ["PostgreSQL", "Redis", "MongoDB", "ACID", "Row-Level Locking", "TTL / Caching"],
  cloud_devops: ["Docker", "Git", "CI/CD Pipelines", "Postman", "Linux"]
};

export const missionsData = [
  {
    id: "m01",
    title: "HELM",
    subtitle: "AI FINANCE COPILOT",
    tech: ["Python", "FastAPI", "LangGraph", "React", "PostgreSQL", "Redis"],
    description: "An autonomous AI finance copilot that translates natural-language prompts into parameterized database queries across 12 financial metrics.",
    highlights: ["LangGraph", "FastAPI", "PostgreSQL", "Redis", "streaming forecasts", "sub-second response times"],
    links: {
      project: "#",
      github: "#"
    }
  },
  {
    id: "m02",
    title: "PHARMASSIST",
    subtitle: "AI QUALITY MANAGEMENT SYSTEM",
    tech: ["FastAPI", "LangGraph", "LLMs", "PostgreSQL", "Docker", "PyMuPDF"],
    description: "An AI-powered pharmaceutical quality management system that triages and risk-scores incoming complaints through a 10-node LangGraph workflow.",
    highlights: ["10-node AI workflow", "complaint triage", "risk scoring", "OCR", "duplicate detection", "validated JSON schemas", "800ms automated pipeline"],
    links: {
      project: "#",
      github: "#"
    }
  },
  {
    id: "m03",
    title: "SHOWRUSH",
    subtitle: "FULL-STACK EVENT & TICKET BOOKING PLATFORM",
    tech: ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Redis", "Socket.IO"],
    description: "A full-stack event and ticket booking platform demonstrating advanced database concurrency.",
    highlights: ["transactional PostgreSQL locking", "ACID compliance", "concurrent checkout handling", "Redis TTL", "Socket.IO", "real-time ticket allocation"],
    links: {
      project: "#",
      github: "#"
    }
  }
];

export const experienceData = [
  {
    role: "AI/ML & SOFTWARE INTERN",
    company: "EMIAC TECHNOLOGIES",
    duration: "May 2026 — Jul 2026",
    achievements: [
      "Engineered a deterministic evaluation pipeline for client SEO workflows.",
      "Improved keyword coverage from 38% to 100%.",
      "Designed a 5-agent LangGraph workflow.",
      "Covered keyword clustering, source retrieval and drafting.",
      "Reduced manual research turnaround time by 70%.",
      "Created validation rubrics across 15 evaluation parameters."
    ],
    metrics: [
      { label: "COVERAGE", from: "38%", to: "100%" },
      { label: "TIME REDUCTION", value: "70%" },
      { label: "AGENTS", value: "5" },
      { label: "PARAMETERS", value: "15" }
    ]
  }
];

export const intelData = {
  education: [
    {
      institution: "Vellore Institute of Technology",
      degree: "B.Tech Computer Science and Engineering",
      duration: "2023 — 2027",
      score: "CGPA: 8.28"
    },
    {
      institution: "KR Mangalam World School",
      degree: "High School",
      duration: "Graduated",
      score: "Class XII: 88% | Class X: 96%"
    }
  ],
  leadership: [
    {
      role: "Core Committee Member (Management & Events)",
      organization: "IEEE COMPUTER SOCIETY CHAPTER — VIT",
      duration: "Mar 2025 — Jan 2026",
      highlights: ["500+ participants"]
    },
    {
      role: "Core Committee Member (Operations & Design)",
      organization: "Mozilla Firefox Club — VIT",
      duration: "Mar 2025 — Apr 2026",
      highlights: ["Open-source events", "Speaker sessions", "Coding bootcamps", "Design & promotional campaigns"]
    }
  ],
  certifications: [
    "MERN Stack Developer — Ethnus",
    "C++ Programming Basics",
    "Cyber Security Training — Hackershala",
    "Python — 100 Days of Code — Udemy"
  ]
};
