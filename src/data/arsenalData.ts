export interface ModuleData {
  id: string;
  name: string;
  category: string;
  usedIn: string[];
  role?: string;
  coreConcepts?: string[];
}

export const arsenalModules: Record<string, ModuleData> = {
  // LANGUAGES
  "Python": { id: "LANG-01", name: "Python", category: "LANGUAGE", usedIn: ["HELM"], role: "Core backend & AI scripting" },
  "C++": { id: "LANG-02", name: "C++", category: "LANGUAGE", usedIn: [], coreConcepts: ["MEMORY MANAGEMENT", "OOP", "DATA STRUCTURES"] },
  "Java": { id: "LANG-03", name: "Java", category: "LANGUAGE", usedIn: [], coreConcepts: ["ENTERPRISE SYSTEMS", "JVM"] },
  "JavaScript": { id: "LANG-04", name: "JavaScript", category: "LANGUAGE", usedIn: ["SHOWRUSH"], role: "Frontend & dynamic scripting" },
  "TypeScript": { id: "LANG-05", name: "TypeScript", category: "LANGUAGE", usedIn: ["SHOWRUSH"], role: "Type-safe full-stack development" },
  "SQL": { id: "LANG-06", name: "SQL", category: "LANGUAGE", usedIn: ["HELM", "SHOWRUSH", "PHARMASSIST"], role: "Relational data querying" },

  // AI / ML
  "LangGraph": { id: "AI-01", name: "LangGraph", category: "AI / AGENT ORCHESTRATION", usedIn: ["HELM", "PHARMASSIST"], role: "Multi-agent workflow orchestration" },
  "LLMs": { id: "AI-02", name: "LLMs", category: "AI / ML", usedIn: ["PHARMASSIST"], role: "Natural language reasoning & triage" },
  "Scikit-learn": { id: "AI-03", name: "Scikit-learn", category: "AI / ML", usedIn: [], coreConcepts: ["MACHINE LEARNING", "PREDICTIVE MODELING"] },
  "SHAP": { id: "AI-04", name: "SHAP", category: "AI / ML", usedIn: [], coreConcepts: ["MODEL EXPLAINABILITY", "FEATURE IMPORTANCE"] },
  "PyTorch": { id: "AI-05", name: "PyTorch", category: "AI / ML", usedIn: [], coreConcepts: ["DEEP LEARNING", "NEURAL NETWORKS"] },
  "Pandas": { id: "AI-06", name: "Pandas", category: "DATA", usedIn: ["HELM"], role: "Data manipulation & analysis" },
  "NumPy": { id: "AI-07", name: "NumPy", category: "DATA", usedIn: ["HELM"], role: "Numerical computing" },
  "Data Modeling": { id: "AI-08", name: "Data Modeling", category: "DATA", usedIn: ["HELM", "PHARMASSIST"], coreConcepts: ["SCHEMA DESIGN", "ENTITY RELATIONS"] },

  // BACKEND / DISTRIBUTED
  "FastAPI": { id: "BE-01", name: "FastAPI", category: "BACKEND", usedIn: ["HELM", "PHARMASSIST"], role: "High-performance async API services" },
  "Node.js": { id: "BE-02", name: "Node.js", category: "BACKEND", usedIn: ["SHOWRUSH"], role: "Event-driven backend execution" },
  "Express.js": { id: "BE-03", name: "Express.js", category: "BACKEND", usedIn: ["SHOWRUSH"], role: "REST API framework" },
  "REST APIs": { id: "BE-04", name: "REST APIs", category: "ARCHITECTURE", usedIn: ["HELM", "PHARMASSIST", "SHOWRUSH"], coreConcepts: ["STATELESS", "HTTP PROTOCOLS"] },
  "WebSockets": { id: "BE-05", name: "WebSockets", category: "DISTRIBUTED", usedIn: ["SHOWRUSH"], role: "Real-time bi-directional communication" },
  "Microservices": { id: "BE-06", name: "Microservices", category: "ARCHITECTURE", usedIn: ["SHOWRUSH"], coreConcepts: ["DECOUPLING", "SCALABILITY"] },

  // DATABASES / CACHING
  "PostgreSQL": { id: "DB-01", name: "PostgreSQL", category: "DATABASE", usedIn: ["HELM", "SHOWRUSH", "PHARMASSIST"], coreConcepts: ["ACID", "TRANSACTIONS", "ROW-LEVEL LOCKING"] },
  "Redis": { id: "CACHE-01", name: "Redis", category: "CACHING / STATE", usedIn: ["HELM", "SHOWRUSH"], coreConcepts: ["CACHING", "TTL", "SESSION PERSISTENCE"] },
  "MongoDB": { id: "DB-02", name: "MongoDB", category: "DATABASE", usedIn: [], coreConcepts: ["NOSQL", "DOCUMENT STORE"] },
  "ACID": { id: "DB-03", name: "ACID", category: "CONCEPTS", usedIn: ["SHOWRUSH"], role: "Ensuring transaction reliability" },
  "Row-Level Locking": { id: "DB-04", name: "Row-Level Locking", category: "CONCEPTS", usedIn: ["SHOWRUSH"], role: "Concurrent checkout handling" },
  "TTL / Caching": { id: "CACHE-02", name: "TTL / Caching", category: "CONCEPTS", usedIn: ["SHOWRUSH", "HELM"], role: "Temporary data expiration" },

  // CLOUD / DEVOPS / TOOLS
  "Docker": { id: "DEV-01", name: "Docker", category: "CONTAINERIZATION", usedIn: ["PHARMASSIST"], role: "Environment isolation & deployment" },
  "Git": { id: "DEV-02", name: "Git", category: "VCS", usedIn: ["HELM", "PHARMASSIST", "SHOWRUSH"], coreConcepts: ["VERSION CONTROL", "COLLABORATION"] },
  "CI/CD Pipelines": { id: "DEV-03", name: "CI/CD Pipelines", category: "AUTOMATION", usedIn: [], role: "Automated testing and deployment" },
  "Postman": { id: "DEV-04", name: "Postman", category: "TOOLING", usedIn: ["HELM", "SHOWRUSH", "PHARMASSIST"], role: "API testing and validation" },
  "Linux": { id: "DEV-05", name: "Linux", category: "OS", usedIn: [], coreConcepts: ["BASH", "SYSTEM ADMINISTRATION"] },
};
