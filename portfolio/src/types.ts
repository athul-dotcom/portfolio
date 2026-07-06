export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  achievements: string[];
  technologies: string[];
  metrics?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  features: string[];
  challenges: string;
  solutions: string;
  githubUrl?: string;
  liveUrl?: string;
  type: "web" | "mobile" | "ai";
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[]; // level out of 100
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "Sports" | "Engineering" | "Academics";
  metric?: string;
  date?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
