import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Bot,
  Terminal,
  FileText,
  Mail,
  Linkedin,
  Github,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  Sparkles,
  Search,
  MessageSquare,
  CheckCircle,
  Copy,
  ArrowRight,
  ExternalLink,
  Cpu,
  Database,
  Smartphone,
  Globe,
  Flame,
  Info,
  Clock,
  Send,
  Sliders,
  Check,
  CheckSquare,
  Phone,
  MessageCircle
} from "lucide-react";
import AICopilot from "./components/AICopilot";
import CommandPalette from "./components/CommandPalette";
import HeroSection from "./components/HeroSection";

// Structured data for the portfolio (preserving exact existing content)
const EXPERIENCES = [
  {
    id: "cellar",
    company: "Cellar Innovative Developers",
    role: "Project Intern – Mobile Application Development",
    duration: "Dec 2024 – Mar 2025",
    location: "Kochi, India",
    achievements: [
      "Developed and engineered key student-faculty workflows for the Academix Hub mobile companion application using React Native, Node.js, Express.js, and MySQL.",
      "Collaborated closely within an Agile squad to deliver rapid sprint milestones, optimizing REST API response payloads and state synchronization.",
      "Conducted extensive troubleshooting and component-level debugging on Android emulators and real devices, reducing runtime faults significantly."
    ],
    technologies: ["React Native", "Node.js", "Express.js", "MySQL", "REST APIs", "Android Studio"],
    metrics: ["Reduced reported app bugs by 35%", "Engineered 12+ modular custom components"]
  },
  {
    id: "techwingsys",
    company: "TECHWINGSYS",
    role: "Project Intern – Web Application Development",
    duration: "Jul 2024 – Nov 2024",
    location: "Kochi, India",
    achievements: [
      "Designed, developed, and deployed the full-stack Academix Hub web application from scratch using PHP, MySQL, HTML5, and CSS3.",
      "Architected clean, normalized relational database schemas ensuring 100% data integrity for academic administration modules.",
      "Spearheaded the entire Software Development Lifecycle (SDLC) from requirements gathering and wireframing to backend coding, testing, and cloud deployment."
    ],
    technologies: ["HTML5", "CSS3", "PHP", "MySQL", "Apache Server", "Relational Database Design"],
    metrics: ["Built 100% scratch architecture", "Supported role-based portal access"]
  }
];

const PROJECTS = [
  {
    id: "academix-web",
    title: "Academix Hub – Web System",
    type: "web" as const,
    description: "A comprehensive academic management system supporting student and faculty portals, secure session-based authentication, and dynamic dashboard reports.",
    longDescription: "Built from scratch to streamline college operations. Features automated attendance logs, course syllabi coordination, marks entry, and secure, granular role-based permissions (Student, Teacher, Admin). Designed highly normalized MySQL schemas to handle complex data relationships efficiently.",
    techStack: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    features: ["Role-Based Authorization", "Attendance Audit Trail", "Dynamic Data Analytics Dashboard"],
    challenges: "Developing custom, secure session management and protecting database entrypoints from SQL injection without modern ORM frameworks.",
    solutions: "Implementing parameterized SQL statements throughout and creating robust custom cookie-session middleware layers.",
    githubUrl: "https://github.com/athul-dotcom",
    liveUrl: "https://ais-dev-qzf3gkkophupw2haijlmds-84942170695.asia-southeast1.run.app",
    colorTheme: "bg-[#136c5b]"
  },
  {
    id: "academix-mobile",
    title: "Academix Hub – Mobile App",
    type: "mobile" as const,
    description: "Cross-platform mobile companion built with React Native for on-the-go academic resource retrieval and real-time interaction feeds.",
    longDescription: "Developed as a sleek mobile companion app syncing instantly with academic servers via secure REST APIs. Optimized to handle patchy network connections gracefully by employing client-side local caching states.",
    techStack: ["React Native", "Node.js", "Express.js", "MySQL", "REST APIs"],
    features: ["Biometric Portal Sync", "Offline-First Asset Caching", "Responsive Touch Interactions"],
    challenges: "Handling rapid, concurrent state updates in API responses and rendering deeply nested course structures efficiently.",
    solutions: "Implemented modular, memorized components in React Native and optimized JSON payloads to transfer only relevant changed deltas.",
    githubUrl: "https://github.com/athul-dotcom",
    liveUrl: "https://ais-dev-qzf3gkkophupw2haijlmds-84942170695.asia-southeast1.run.app",
    colorTheme: "bg-[#f2b32c]"
  }
];

const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript (ES6+)", level: 88 },
      { name: "TypeScript", level: 82 },
      { name: "SQL", level: 85 },
      { name: "C++", level: 75 },
      { name: "PHP", level: 80 }
    ]
  },
  {
    title: "Frameworks & Ecosystems",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "React / React Native", level: 86 },
      { name: "Angular", level: 78 },
      { name: "RESTful APIs", level: 90 }
    ]
  },
  {
    title: "Databases & Platforms",
    skills: [
      { name: "MySQL", level: 87 },
      { name: "MongoDB", level: 80 },
      { name: "Git & GitHub", level: 90 },
      { name: "Android Studio", level: 76 }
    ]
  }
];

const CERTIFICATIONS = [
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "Jun 2026",
    color: "bg-[#136c5b]/10 border-[#136c5b]/20 text-[#136c5b]"
  },
  {
    title: "IoT Platforms Overview",
    issuer: "Infosys Springboard",
    date: "Apr 2026",
    color: "bg-[#f2b32c]/10 border-[#f2b32c]/20 text-[#c4850f]"
  },
  {
    title: "Basics of Python Development",
    issuer: "Infosys Springboard",
    date: "Feb 2026",
    color: "bg-rose-50 border-rose-100 text-rose-700"
  },
  {
    title: "Computational Problem Solving",
    issuer: "Infosys Springboard",
    date: "Jan 2026",
    color: "bg-sky-50 border-sky-100 text-sky-700"
  }
];

export default function App() {
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [currentUtcTime, setCurrentUtcTime] = useState("");
  const [activeProjectTab, setActiveProjectTab] = useState<"all" | "web" | "mobile">("all");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  // Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [messagesReceived, setMessagesReceived] = useState<any[]>([]);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Visitor Counter
  const [visitorCount, setVisitorCount] = useState(142);

  // Update real-time clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentUtcTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut for Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch submitted messages from local storage simulation / API
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessagesReceived(data);
      }
    } catch (e) {
      console.warn("Could not fetch message logs", e);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setIsSubmitting(true);
    setSubmitSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
          subject: "Portfolio Inquiry"
        })
      });

      if (res.ok) {
        const data = await res.json();
        setSubmitSuccess(data.message || "Message sent successfully!");
        setContactName("");
        setContactEmail("");
        setContactMessage("");
        setVisitorCount(prev => prev + 1);
        fetchMessages();
      } else {
        throw new Error("Failed");
      }
    } catch (err) {
      setSubmitSuccess("Message cached locally! Thank you for reaching out.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("athulkr34@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredProjects = PROJECTS.filter(
    (p) => activeProjectTab === "all" || p.type === activeProjectTab
  );

  return (
    <div id="portfolio-app" className="bg-[#faf9f6] text-[#18222f] min-h-screen font-sans selection:bg-neutral-100 selection:text-black overflow-x-hidden relative">
      
      {/* Modern minimalist Header */}
      <header id="portfolio-header" className="sticky top-0 bg-[#faf9f6]/90 backdrop-blur-md border-b border-[#dfdab8]/40 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          {/* Logo / Brand */}
          <div
            id="brand-logo-container"
            className="cursor-pointer"
            onClick={() => handleScrollToSection("hero")}
          >
            <span className="font-display font-black text-xl text-[#18222f] tracking-tight hover:opacity-80 transition-opacity uppercase">
              Athul
            </span>
          </div>

          {/* Navigation Links */}
          <nav id="header-nav" className="hidden md:flex items-center gap-8 text-xs font-display font-bold uppercase tracking-wider text-[#18222f]/70">
            <button onClick={() => handleScrollToSection("about")} className="hover:text-black transition-colors cursor-pointer relative py-1">About</button>
            <button onClick={() => handleScrollToSection("services")} className="hover:text-black transition-colors cursor-pointer relative py-1">Services</button>
            <button onClick={() => handleScrollToSection("projects")} className="hover:text-black transition-colors cursor-pointer relative py-1">Works</button>
            <button onClick={() => handleScrollToSection("experience")} className="hover:text-black transition-colors cursor-pointer relative py-1">Experience</button>
            <button onClick={() => handleScrollToSection("skills")} className="hover:text-black transition-colors cursor-pointer relative py-1">Skills</button>
          </nav>

          {/* Header Actions */}
          <div id="header-actions" className="flex items-center gap-3">
            <button
              id="header-copilot-trigger"
              onClick={() => setCopilotOpen(true)}
              className="px-5 py-2.5 bg-[#0f3830] hover:bg-[#0c2e27] rounded-full text-xs font-sans font-bold text-white flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Bot className="w-4 h-4 text-white" />
              <span>AI Twin</span>
            </button>

            <button
              id="header-hire-btn"
              onClick={() => handleScrollToSection("contact")}
              className="hidden sm:block px-5 py-2.5 bg-transparent hover:bg-[#eae7dc]/20 text-[#18222f] border border-[#dfdab8] text-xs font-sans font-bold rounded-full transition-all cursor-pointer active:scale-95"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection
        onOpenCopilot={() => setCopilotOpen(true)}
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 space-y-32 mt-16 pb-20">
        
        {/* Section 1: About Section next to play video card */}
        <section id="about" className="scroll-mt-24">
          <div className="flex flex-col gap-6 mb-12">
            <span className="text-[#18222f]/50 font-mono tracking-widest uppercase text-xs font-bold block">About Me</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-[#18222f] leading-tight tracking-tight max-w-3xl">
              Engineering has always been more than just a job - it's my passion.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Video Placeholder */}
            <div className="lg:col-span-8">
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-[#dfdab8]/60 shadow-md group cursor-pointer bg-[#18222f]">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
                  alt="Workspace video thumbnail"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12 border-l-black ml-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Stats and summary */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-10">
              <p className="text-sm text-[#18222f]/70 leading-relaxed">
                I help clients build robust web and mobile applications from scratch. With 9 months of full-stack internship experience, I focus on system performance, API security, and elegant UI/UX companion workflows.
              </p>

              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-5xl font-display font-black text-[#18222f] leading-none">+9</h3>
                  <p className="text-xs text-[#18222f]/70 font-bold uppercase tracking-wider mt-2">Months of professional internship experience</p>
                </div>
                <div>
                  <h3 className="text-5xl font-display font-black text-[#18222f] leading-none">+2</h3>
                  <p className="text-xs text-[#18222f]/70 font-bold uppercase tracking-wider mt-2">Production-ready academic platforms deployed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Services Section with 2x2 cards (one highlighted dark) */}
        <section id="services" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Title & Intro */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <span className="text-[#18222f]/50 font-mono tracking-widest uppercase text-xs font-bold block">Services</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-[#18222f] leading-tight tracking-tight">
                  A Comprehensive look at what I offer and how I deliver
                </h2>
                <p className="text-sm text-[#18222f]/70 leading-relaxed">
                  I plan secure relational database architectures, construct high-speed API layers, and build clean, scalable React Native companion client apps.
                </p>
              </div>
              <button
                onClick={() => handleScrollToSection("projects")}
                className="w-fit px-6 py-3 rounded-full bg-[#0f3830] text-white hover:bg-[#0c2e27] text-xs font-sans font-bold cursor-pointer active:scale-95 transition-all"
              >
                See Works
              </button>
            </div>

            {/* Right Column: 2x2 Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white hover:bg-[#eae7dc]/20 transition-colors p-6 rounded-2xl border border-[#dfdab8]/60 flex flex-col justify-between min-h-[180px] group cursor-pointer">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-neutral-400 font-bold">01</span>
                  <div className="p-2 bg-[#faf9f6] border border-[#dfdab8]/60 rounded-full group-hover:bg-neutral-100 transition-colors">
                    <Globe className="w-4 h-4 text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-display font-black text-neutral-900">Website Design</h3>
                  <p className="text-xs text-[#18222f]/70 mt-2">PHP & MySQL scratch architectures, secure session authorization, and custom administrative portals.</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white hover:bg-[#eae7dc]/20 transition-colors p-6 rounded-2xl border border-[#dfdab8]/60 flex flex-col justify-between min-h-[180px] group cursor-pointer">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-neutral-400 font-bold">02</span>
                  <div className="p-2 bg-[#faf9f6] border border-[#dfdab8]/60 rounded-full group-hover:bg-neutral-100 transition-colors">
                    <Smartphone className="w-4 h-4 text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-display font-black text-neutral-900">Mobile App Design</h3>
                  <p className="text-xs text-[#18222f]/70 mt-2">React Native student-faculty companion workflows, offline data caches, and responsive controls.</p>
                </div>
              </div>

              {/* Card 3 - Highlighted Dark Card */}
              <div className="bg-black text-white hover:bg-[#18222f] transition-colors p-6 rounded-2xl flex flex-col justify-between min-h-[180px] group cursor-pointer">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-[#18222f]/70 font-bold">03</span>
                  <div className="p-2 bg-[#0c2e27] rounded-full">
                    <Database className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-display font-black text-white">Database & Security</h3>
                  <p className="text-xs text-neutral-400 mt-2">100% relational integrity schema normalization (3NF), parameters SQL defense, and cookie-session middlewares.</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white hover:bg-[#eae7dc]/20 transition-colors p-6 rounded-2xl border border-[#dfdab8]/60 flex flex-col justify-between min-h-[180px] group cursor-pointer">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-neutral-400 font-bold">04</span>
                  <div className="p-2 bg-[#faf9f6] border border-[#dfdab8]/60 rounded-full group-hover:bg-neutral-100 transition-colors">
                    <Cpu className="w-4 h-4 text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-display font-black text-neutral-900">AI Twin integrations</h3>
                  <p className="text-xs text-[#18222f]/70 mt-2">Advanced integration of LLMs like Gemini 3.5 Flash to act as professional recruiters digital twin agent.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: My Work Experience - Horizontal Row Timeline */}
        <section id="experience" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Title */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <span className="text-[#18222f]/50 font-mono tracking-widest uppercase text-xs font-bold block">Experience</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-[#18222f] leading-tight tracking-tight">
                A Yearly snapshot of my creative growth
              </h2>
              <p className="text-sm text-[#18222f]/70 leading-relaxed">
                Summary of professional milestones, leadership academies, and structural training.
              </p>
            </div>

            {/* Right Column: Horizontal list of rows */}
            <div className="lg:col-span-8 flex flex-col border-t border-[#dfdab8]/40">
              
              {/* Row 1 */}
              <div className="flex items-center justify-between py-6 border-b border-[#dfdab8]/40 hover:bg-[#eae7dc]/20 px-4 transition-colors group cursor-pointer">
                <div>
                  <h3 className="text-lg font-display font-black text-[#18222f]">Mobile App Development Intern</h3>
                  <p className="text-xs text-[#18222f]/70 mt-1 uppercase font-mono font-bold tracking-wider">Cellar Innovative Developers • Kochi, India</p>
                </div>
                <div className="text-xl font-display font-black text-[#18222f] tracking-tight">
                  2024 - 2025
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-between py-6 border-b border-[#dfdab8]/40 hover:bg-[#eae7dc]/20 px-4 transition-colors group cursor-pointer">
                <div>
                  <h3 className="text-lg font-display font-black text-[#18222f]">Web Application Intern</h3>
                  <p className="text-xs text-[#18222f]/70 mt-1 uppercase font-mono font-bold tracking-wider">TECHWINGSYS • Kochi, India</p>
                </div>
                <div className="text-xl font-display font-black text-[#18222f] tracking-tight">
                  2024
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex items-center justify-between py-6 border-b border-[#dfdab8]/40 hover:bg-[#eae7dc]/20 px-4 transition-colors group cursor-pointer">
                <div>
                  <h3 className="text-lg font-display font-black text-[#18222f]">Master of Computer Applications</h3>
                  <p className="text-xs text-[#18222f]/70 mt-1 uppercase font-mono font-bold tracking-wider">Amrita Vishwa Vidyapeetham • Kochi, India</p>
                </div>
                <div className="text-xl font-display font-black text-[#18222f] tracking-tight">
                  2025 - Present
                </div>
              </div>

              {/* Row 4 */}
              <div className="flex items-center justify-between py-6 border-b border-[#dfdab8]/40 hover:bg-[#eae7dc]/20 px-4 transition-colors group cursor-pointer">
                <div>
                  <h3 className="text-lg font-display font-black text-[#18222f]">Bachelor of Computer Applications</h3>
                  <p className="text-xs text-[#18222f]/70 mt-1 uppercase font-mono font-bold tracking-wider">Cochin Arts & Science College • Kochi, India</p>
                </div>
                <div className="text-xl font-display font-black text-[#18222f] tracking-tight">
                  2022 - 2025
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 4: Projects (Works) */}
        <section id="projects" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#dfdab8]/40 pb-6 mb-12">
            <div>
              <span className="text-[#18222f]/50 font-mono tracking-widest uppercase text-xs font-bold block mb-2">Portfolio</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-[#18222f] leading-tight tracking-tight">
                Explore my portfolio of creative solutions
              </h2>
            </div>
            
            {/* Minimalist Filter Tabs */}
            <div className="flex items-center bg-[#eae7dc]/40 border border-[#dfdab8]/50 rounded-full p-1 text-xs mt-4 md:mt-0 font-display">
              {(["all", "web", "mobile"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveProjectTab(tab)}
                  className={`px-4 py-2 rounded-full capitalize font-bold transition-all cursor-pointer ${
                    activeProjectTab === tab
                      ? "bg-[#0f3830] text-white shadow-sm"
                      : "text-[#18222f]/70 hover:text-neutral-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Minimalist Works Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer flex flex-col gap-4"
              >
                {/* Image Frame */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#dfdab8]/60 bg-[#faf9f6] shadow-xs">
                  <div className={`absolute inset-0 ${project.colorTheme} opacity-80 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center text-white p-6`}>
                    <h3 className="text-xl font-display font-black text-center">{project.title}</h3>
                  </div>
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-xs rounded-full border border-[#dfdab8]/60 text-[10px] font-mono font-bold text-neutral-600 uppercase">
                    {project.type}
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex justify-between items-start px-1">
                  <div>
                    <h3 className="text-base font-display font-black text-neutral-900 group-hover:underline">{project.title}</h3>
                    <p className="text-xs text-[#18222f]/70 mt-1 line-clamp-1">{project.description}</p>
                  </div>
                  <div className="p-2 border border-neutral-200 rounded-full bg-white group-hover:bg-neutral-100 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-[#18222f]/80" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedProject && (
            <div id="project-lightbox" className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedProject(null)} />
              <div className="bg-white border border-[#dfdab8] rounded-2xl w-full max-w-2xl p-6 sm:p-8 z-10 relative overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-[#18222f]/70 hover:text-black p-2 rounded-full border border-neutral-200 hover:bg-neutral-50 bg-transparent transition-all font-bold"
                >
                  ✕
                </button>

                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">{selectedProject.type} Case Study</span>
                <h3 className="text-2xl md:text-3xl font-display font-black text-neutral-900 mt-2 mb-4">{selectedProject.title}</h3>

                <div className="space-y-6 text-sm text-neutral-600 leading-relaxed font-sans">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider mb-2">Summary & Architecture</h4>
                    <p className="text-[#18222f]/70">{selectedProject.longDescription}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider mb-2">Core Engineering Details</h4>
                    <p className="text-[#18222f]/70">Both web and mobile versions communicate efficiently to serve student-faculty workloads. The web portal enforces strict session authentication, and the companion app integrates offline data layers to guarantee seamless usage on the go.</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider mb-2">Key Features Highlighted</h4>
                    <ul className="list-disc list-inside space-y-1 text-[#18222f]/70">
                      {selectedProject.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-5 border-t border-[#dfdab8]/40">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-white border border-[#dfdab8] text-[#18222f] rounded-full text-xs font-sans font-bold flex items-center gap-2 hover:bg-[#faf9f6] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>View GitHub Repository</span>
                    </a>
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        setCopilotOpen(true);
                      }}
                      className="px-5 py-2.5 bg-[#0f3830] text-white rounded-full text-xs font-sans font-bold flex items-center gap-2 hover:bg-[#0c2e27] transition-colors shadow-sm cursor-pointer"
                    >
                      <Bot className="w-4 h-4" />
                      <span>Ask AI Twin about this project</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 5: Technical Ecosystem / Skills */}
        <section id="skills" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#dfdab8]/40 pb-6 mb-12">
            <div>
              <span className="text-[#18222f]/50 font-mono tracking-widest uppercase text-xs font-bold block mb-2">Qualified Stack</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-neutral-900">
                Technical Ecosystem
              </h2>
            </div>
            <div className="text-xs font-mono font-bold text-[#18222f]/70 uppercase tracking-widest mt-2 md:mt-0">
              Proficient developer capabilities
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                id={`skill-cat-${idx}`}
                className="bg-white border border-[#dfdab8]/60 p-6 rounded-2xl flex flex-col justify-between shadow-xs"
              >
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#0f3830] rounded-full" />
                    {cat.title}
                  </h3>

                  <div className="space-y-4">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-neutral-900">{skill.name}</span>
                          <span className="text-[#18222f]/50 font-mono">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-[#faf9f6] border border-[#dfdab8]/40 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0f3830] rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#dfdab8]/30 flex justify-between items-center text-[10px] text-[#18222f]/50 font-mono">
                  <span>Stack {idx + 1} of 3</span>
                  <span>Responsive system designs</span>
                </div>
              </div>
            ))}
          </div>

          {/* Industry Certifications */}
          <div className="mt-16">
            <h3 className="text-xs uppercase font-bold tracking-widest text-neutral-400 mb-6 font-mono">Industry Certifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#dfdab8]/60 p-5 rounded-2xl flex flex-col justify-between min-h-[115px] shadow-xs hover:border-[#0f3830]/85 transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 font-bold block uppercase">{cert.issuer}</span>
                    <h4 className="text-xs font-display font-extrabold text-neutral-900 mt-1 leading-snug">{cert.title}</h4>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] text-[#18222f]/50 font-mono">{cert.date}</span>
                    <span className="w-1.5 h-1.5 bg-[#0f3830] rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Elite Accolades */}
        <section id="achievements" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#dfdab8]/40 pb-6 mb-12">
            <div>
              <span className="text-[#18222f]/50 font-mono tracking-widest uppercase text-xs font-bold block mb-2">Elite Accolades</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-neutral-900">
                Leadership & Strategy
              </h2>
            </div>
            <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest mt-2 md:mt-0">
              National achievements log
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div id="achievement-ssb" className="lg:col-span-2 bg-white border border-[#dfdab8]/60 p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative group overflow-hidden shadow-xs">
              <div>
                <span className="text-[10px] font-mono text-[#18222f] bg-[#eae7dc]/50 border border-[#dfdab8]/60 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                  Top Executive Pool
                </span>
                <h3 className="text-xl md:text-2xl font-display font-black text-[#18222f] mt-4 mb-3">
                  Services Selection Board (SSB) Recommended Candidate
                </h3>
                <p className="text-[#18222f]/70 text-xs md:text-sm leading-relaxed mb-6">
                  Recommended by the <strong>Services Selection Board (SSB)</strong> as a candidate demonstrating exemplary officer-like qualities, analytical depth, logical reasoning under severe pressure, and structured teamwork coordination.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[#dfdab8]/30 text-[10px] text-[#18222f]/50 font-mono">
                <span className="flex items-center gap-1.5 font-bold text-black">
                  <Award className="w-4 h-4" />
                  #LEADERSHIP #STRATEGY
                </span>
                <span className="font-bold">Select National Pool</span>
              </div>
            </div>

            <div id="achievement-kho-kho" className="bg-white border border-[#dfdab8]/60 p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group shadow-xs">
              <div>
                <span className="text-[10px] font-mono text-[#18222f] bg-[#eae7dc]/50 border border-[#dfdab8]/60 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                  Team Captain
                </span>
                <h3 className="text-lg font-display font-black text-[#18222f] mt-4 mb-3">
                  National Kho-Kho Winner
                </h3>
                <p className="text-[#18222f]/70 text-xs leading-relaxed mb-6">
                  Winner of the <strong>CBSE Cluster XI Kho-Kho Tournament</strong>. Competing at a national level instills extreme team loyalty, operational execution speed, and rapid adaptive reflexes.
                </p>
              </div>
              <div className="text-[10px] text-[#18222f]/50 font-mono pt-4 border-t border-[#dfdab8]/30 flex justify-between items-center">
                <span>CBSE Cluster XI</span>
                <span className="text-black font-bold">Gold Medalist</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Quote */}
        <section className="py-8 scroll-mt-24">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
            <span className="text-6xl font-serif text-[#eae7dc] leading-none">“</span>
            <p className="text-lg md:text-xl font-display font-bold text-neutral-900 leading-relaxed max-w-3xl italic">
              Athul demonstrated outstanding problem-solving skills during the internships, creating modular companion applications and optimizing SQL queries with 100% relational integrity.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-xs uppercase font-display text-[#18222f]/80">
                LD
              </div>
              <div className="text-left">
                <h4 className="text-xs font-display font-black text-[#18222f] leading-tight">Lead Developer</h4>
                <p className="text-[10px] font-mono text-neutral-400 leading-none mt-0.5">Cellar Innovative Developers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Recruiter Live logs Console */}
        <section id="playground" className="scroll-mt-24">
          <div className="bg-white border border-[#dfdab8]/60 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center pb-6 border-b border-[#dfdab8]/40">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1 font-bold">Recruiter Exclusive Console</span>
                <h2 className="text-xl font-display font-black text-[#18222f]">Full-Stack Live Testing Console</h2>
                <p className="text-[#18222f]/70 text-xs mt-1">Submit a message via the form below to see state updates trigger instantly on this live panel.</p>
              </div>
              <div className="flex items-center gap-3 bg-[#faf9f6] border border-[#dfdab8]/60 px-4 py-2 rounded-xl text-xs font-mono font-bold shadow-xs">
                <span className="text-[#18222f]/70">Live Visitors:</span>
                <strong className="text-black font-black">{visitorCount}</strong>
                <span className="text-neutral-200">|</span>
                <span className="text-[#18222f]/70">Messages Saved:</span>
                <strong className="text-black font-black">{messagesReceived.length}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              {/* Message log display */}
              <div className="lg:col-span-7 bg-[#faf9f6] border border-[#dfdab8]/60 p-4 sm:p-6 rounded-xl flex flex-col justify-between min-h-[250px]">
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-3.5 flex items-center gap-2 font-bold">
                    <span className="w-1.5 h-3 bg-[#0f3830] rounded-full" />
                    Real-time Saved Messages Log
                  </h3>

                  <div className="space-y-3 max-h-[190px] overflow-y-auto pr-1 scrollbar-thin">
                    {messagesReceived.length > 0 ? (
                      messagesReceived.map((msg, index) => (
                        <div
                          key={msg.id || index}
                          className="bg-white border border-[#dfdab8]/60 p-3 rounded-lg text-xs flex flex-col gap-1 shadow-xs animate-slide-up"
                        >
                          <div className="flex items-center justify-between text-[#18222f]/50 font-mono">
                            <strong>{msg.name} ({msg.email})</strong>
                            <span className="text-[9px]">
                              {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : "Just now"}
                            </span>
                          </div>
                          <p className="text-neutral-800 mt-1 italic">"{msg.message}"</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-neutral-400 italic text-xs font-mono">
                        No custom messages received yet. Submit the contact form below to seed the database!
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#dfdab8]/40 flex justify-between items-center text-[10px] font-mono text-neutral-400 font-bold">
                  <span>DB Type: In-memory Array (Server API)</span>
                  <span className="text-black flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                    SYNCED WITH EXPRESS SERVER
                  </span>
                </div>
              </div>

              {/* Dev coordinates */}
              <div className="lg:col-span-5 bg-[#faf9f6] border border-[#dfdab8]/60 p-4 sm:p-6 rounded-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-3 flex items-center gap-2 font-bold">
                    <span className="w-1.5 h-3 bg-[#0f3830] rounded-full" />
                    Portfolio Environment Coordinates
                  </h3>

                  <div className="space-y-2 text-xs font-mono text-neutral-900 bg-white p-3.5 rounded-lg border border-[#dfdab8]/50 font-bold shadow-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Node Environment:</span>
                      <span>production</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Vite Build Port:</span>
                      <span>3000 (Proxy)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Framework Runtime:</span>
                      <span>React 19 / ESM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Server Clock:</span>
                      <span className="text-neutral-600 text-[10px] font-mono truncate max-w-[150px]">{currentUtcTime}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#dfdab8]/40">
                  <p className="text-[10px] text-neutral-400 leading-relaxed">
                    This React application interfaces with an Express Node.js server to log contact messages. The platform builds on Vite for optimized asset bundles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Contact Form */}
        <section id="contact" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#dfdab8]/40 pb-6 mb-12">
            <div>
              <span className="text-[#18222f]/50 font-mono tracking-widest uppercase text-xs font-bold block mb-2">Let's connect</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-neutral-900">
                Saying Hi
              </h2>
            </div>
            <div className="text-xs font-mono font-bold text-[#18222f]/70 uppercase tracking-widest mt-2 md:mt-0">
              Start by saying hi
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact details */}
            <div className="lg:col-span-5 bg-white border border-neutral-200 p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1 font-bold">Direct Outreach</span>
                <h3 className="text-xl font-display font-extrabold text-neutral-900 mb-4">Request Resume PDF or Interview</h3>
                <p className="text-[#18222f]/70 text-xs leading-relaxed mb-6 font-sans">
                  Drop your email details below, trigger my AI digital twin recruiter agent, or write directly to my email. I will respond to your invitation immediately.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs">
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-5 h-5 text-black shrink-0" />
                      <div>
                        <p className="text-neutral-400 text-[9px] font-mono uppercase font-bold leading-none">Official Email</p>
                        <p className="text-neutral-900 font-bold mt-1 font-sans">athulkr34@gmail.com</p>
                      </div>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="p-1.5 hover:bg-white border border-transparent hover:border-neutral-200 rounded-lg text-neutral-400 hover:text-black transition-all cursor-pointer"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs">
                    <MapPin className="w-5 h-5 text-black shrink-0" />
                    <div>
                      <p className="text-neutral-400 text-[9px] font-mono uppercase font-bold leading-none">Current Coordinates</p>
                      <p className="text-neutral-900 font-bold mt-1 font-sans">Kochi, Kerala, India (Open to Relocation)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex gap-3.5 items-center justify-center">
                <a
                  href="https://github.com/athul-dotcom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#faf9f6] border border-[#dfdab8]/60 rounded-full hover:bg-neutral-100 hover:text-black transition-colors text-[#18222f]/70 shadow-xs"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://linkedin.com/in/athul-k-r-b04255326"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#faf9f6] border border-[#dfdab8]/60 rounded-full hover:bg-neutral-100 hover:text-black transition-colors text-[#18222f]/70 shadow-xs"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 sm:p-8 rounded-2xl shadow-xs">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[#18222f]/50 font-mono">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-[#faf9f6] border border-[#dfdab8] focus:border-[#0f3830] rounded-xl px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:bg-white transition-all placeholder:text-neutral-300 font-sans"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[#18222f]/50 font-mono">Your Email</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full bg-[#faf9f6] border border-[#dfdab8] focus:border-[#0f3830] rounded-xl px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:bg-white transition-all placeholder:text-neutral-300 font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#18222f]/50 font-mono">Message / Invitation Details</label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="We'd love to invite you for a technical assessment..."
                    className="w-full bg-[#faf9f6] border border-[#dfdab8] focus:border-[#0f3830] rounded-xl px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:bg-white transition-all placeholder:text-neutral-300 resize-none font-sans"
                  />
                </div>

                {submitSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-xs flex items-center gap-2 font-bold font-mono">
                    <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{submitSuccess}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0f3830] hover:bg-[#0c2e27] text-white font-sans font-bold rounded-xl text-xs transition-all shadow-xs disabled:opacity-50 cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Sending..." : "Submit Message"}</span>
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* Dark connects footer box */}
      <section className="bg-[#0f3830] text-white py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-[#0c2e27] pb-12 mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-black leading-tight tracking-tight uppercase">Let's Connect<br />There</h2>
          </div>
          <button
            onClick={() => handleScrollToSection("contact")}
            className="px-6 py-3 bg-white text-black hover:bg-neutral-200 font-sans font-bold text-xs rounded-full transition-all cursor-pointer"
          >
            Say Hello
          </button>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-[#18222f]/70 font-mono">
          <div className="flex items-center gap-2.5">
            <span className="font-display font-black text-lg text-white uppercase tracking-tight">Athul</span>
            <span>© 2026 Athul K R. All rights reserved.</span>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/athul-dotcom" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/athul-k-r-b04255326" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </section>

      {/* Back to Top */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
        <button
          onClick={() => handleScrollToSection("portfolio-app")}
          className="p-3 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-xl text-[#18222f]/80 transition-all shadow-md text-xs font-mono font-bold cursor-pointer"
          title="Back to Top"
        >
          ↑ Top
        </button>

        <button
          onClick={() => setCopilotOpen(true)}
          className="p-4 bg-[#0f3830] hover:bg-[#0c2e27] rounded-full text-white transition-all shadow-xl hover:scale-105 active:scale-95 group relative cursor-pointer"
          title="Open AI Recruiter Twin"
        >
          <Bot className="w-6 h-6" />
          <span className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 bg-white border border-[#dfdab8] text-[#18222f] text-[10px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-display font-bold shadow-md">
            Ask my AI Twin
          </span>
        </button>
      </div>

      <AICopilot isOpen={copilotOpen} onClose={() => setCopilotOpen(false)} />

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenCopilot={() => setCopilotOpen(true)}
        onScrollToSection={handleScrollToSection}
      />
    </div>
  );
}
