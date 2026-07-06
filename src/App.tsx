import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Bot,
  FileText,
  Mail,
  Linkedin,
  Github,
  Search,
  ArrowRight,
  Send,
  Check,
  Sun,
  Moon,
  Menu,
  X,
  MapPin,
  Phone,
  Terminal,
  Database,
  Cpu,
  Globe,
  Sparkles,
  Award,
  Layers,
  Shield,
  Smartphone,
  Braces,
  GitBranch,
  Laptop
} from "lucide-react";
import CommandPalette from "./components/CommandPalette";
import HeroSection from "./components/HeroSection";
import AICopilot from "./components/AICopilot";

// Structured data for the portfolio
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
    title: "Academix Hub – Web Application",
    type: "web" as const,
    description: "A full-stack academic management platform supporting student and faculty portals with role-based access, secure authentication, sharing of trusted study notes, document view/download capabilities, and dynamic dashboards.",
    longDescription: "Built from scratch to streamline college operations. Features student and faculty portals with role-based access, secure session-based authentication, and a complete academic document repository where users can upload, view, and download trusted study notes, projects, and past question papers. Designed highly normalized MySQL schemas to handle complex data relationships efficiently.",
    techStack: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    features: ["Role-Based Authorization", "Trusted Notes, Projects & Papers Upload/Download", "Dynamic Data Analytics Dashboard"],
    coreEngineering: "The web portal enforces strict, secure session-based authentication, normalizes relational database tables to prevent duplicate records, and uses prepared parameterized queries to secure data entrypoints.",
    challenges: "Developing custom, secure session management and protecting database entrypoints from SQL injection without modern ORM frameworks.",
    solutions: "Implementing parameterized SQL statements throughout and creating robust custom cookie-session middleware layers.",
    githubUrl: "https://github.com/athul-dotcom",
    liveUrl: "https://ais-dev-qzf3gkkophupw2haijlmds-84942170695.asia-southeast1.run.app",
    colorTheme: "bg-[#136c5b]"
  },
  {
    id: "academix-mobile",
    title: "Academix Hub – Mobile Application",
    type: "mobile" as const,
    description: "A cross-platform mobile companion app built with React Native with real-time REST API data sync, enabling on-the-go viewing and downloading of trusted academic notes, projects, and question papers for students and faculty.",
    longDescription: "Developed as a sleek mobile companion app syncing instantly with academic servers via secure REST APIs. The mobile portal enables students and faculty to view and download trusted notes, projects, and question papers on the go, requiring no mobile data once cached locally.",
    techStack: ["React Native", "Node.js", "Express.js", "MySQL", "REST APIs"],
    features: ["Real-Time REST API Sync", "Trusted Notes, Projects & Papers Downloader", "Offline Access (No Mobile Data Required)"],
    coreEngineering: "The companion mobile app integrates native offline-first caching layers to ensure resource availability, leverages stateful React components, and synchronizes data with the MySQL database via optimized REST API endpoints.",
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
      { name: "Python" },
      { name: "Java" },
      { name: "JavaScript" },
      { name: "SQL" },
      { name: "C" },
      { name: "C++" },
      { name: "Solidity" }
    ]
  },
  {
    title: "Frameworks & Ecosystems",
    skills: [
      { name: "HTML5 & CSS3" },
      { name: "React / React Native" },
      { name: "Angular" },
      { name: "Express.js" },
      { name: "Node.js" },
      { name: "Bootstrap" },
      { name: "RESTful APIs" }
    ]
  },
  {
    title: "Databases & Tools",
    skills: [
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Git & GitHub" },
      { name: "Android Studio" },
      { name: "VS Code" },
      { name: "Google Colab" }
    ]
  }
];

const CERTIFICATIONS_GROUPED = [
  {
    issuer: "IBM SkillsBuild",
    certs: [
      { title: "Artificial Intelligence Fundamentals", date: "Jun 2026" }
    ]
  },
  {
    issuer: "Infosys Springboard",
    certs: [
      { title: "IoT Platforms Overview", date: "Apr 2026" },
      { title: "Basics of Python Development", date: "Feb 2026" },
      { title: "Computational Problem Solving", date: "Jan 2026" }
    ]
  }
];

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState<"all" | "web" | "mobile">("all");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  // Theme, Scroll Highlight, & Mobile Drawer Menu State
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Toggle Dark Mode Class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Active section highlights via IntersectionObserver
  useEffect(() => {
    const sections = ["hero", "about", "experience", "projects", "skills", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25, rootMargin: "-15% 0px -65% 0px" }
      );

      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
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
      } else {
        throw new Error("Failed");
      }
    } catch (err) {
      setSubmitSuccess("Thank you for reaching out! I will get back to you shortly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Athul_KR_Resume.pdf";
    link.download = "Athul_KR_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredProjects = PROJECTS.filter(
    (p) => activeProjectTab === "all" || p.type === activeProjectTab
  );

  const getSkillIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("python")) return <Terminal className="w-3.5 h-3.5 text-[#0f3830] dark:text-emerald-400" />;
    if (n.includes("java")) return <Braces className="w-3.5 h-3.5 text-[#0f3830] dark:text-emerald-400" />;
    if (n.includes("javascript") || n.includes("typescript")) return <Cpu className="w-3.5 h-3.5 text-[#0f3830] dark:text-emerald-400" />;
    if (n.includes("sql") || n.includes("mysql") || n.includes("mongodb")) return <Database className="w-3.5 h-3.5 text-[#0f3830] dark:text-emerald-400" />;
    if (n.includes("html") || n.includes("css") || n.includes("bootstrap")) return <Layers className="w-3.5 h-3.5 text-[#0f3830] dark:text-emerald-400" />;
    if (n.includes("react") || n.includes("mobile")) return <Smartphone className="w-3.5 h-3.5 text-[#0f3830] dark:text-emerald-400" />;
    if (n.includes("git")) return <GitBranch className="w-3.5 h-3.5 text-[#0f3830] dark:text-emerald-400" />;
    if (n.includes("api") || n.includes("rest")) return <Globe className="w-3.5 h-3.5 text-[#0f3830] dark:text-emerald-400" />;
    if (n.includes("solidity")) return <Shield className="w-3.5 h-3.5 text-[#0f3830] dark:text-emerald-400" />;
    return <Laptop className="w-3.5 h-3.5 text-[#0f3830] dark:text-emerald-400" />;
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <div id="portfolio-app" className="bg-[#faf9f6] text-[#18222f] dark:bg-neutral-950 dark:text-neutral-100 min-h-screen font-sans selection:bg-neutral-100 selection:text-black overflow-x-hidden relative transition-colors duration-300">
      
      {/* Modern minimalist Header */}
      <header id="portfolio-header" className="sticky top-0 bg-[#faf9f6]/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-[#dfdab8]/40 dark:border-neutral-800 z-40 transition-all duration-300">
        <div className="max-w-8xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          {/* Logo / Brand */}
          <div
            id="brand-logo-container"
            className="cursor-pointer"
            onClick={() => handleScrollToSection("hero")}
          >
            <span className="font-display font-black text-xl text-[#18222f] dark:text-white tracking-tight hover:opacity-80 transition-opacity uppercase">
              Athul K R
            </span>
          </div>

          {/* Navigation Links with Active Highlighting */}
          <nav id="header-nav" className="hidden md:flex items-center gap-8 text-xs font-display font-bold uppercase tracking-wider">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollToSection(item.id)}
                className={`transition-all duration-200 cursor-pointer relative py-1 border-b-2 ${
                  activeSection === item.id
                    ? "text-[#0f3830] dark:text-emerald-400 font-black border-[#0f3830] dark:border-emerald-400"
                    : "text-[#18222f]/70 dark:text-neutral-400 hover:text-black dark:hover:text-white border-transparent"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Header Actions */}
          <div id="header-actions" className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(prev => !prev)}
              className="p-2.5 bg-transparent hover:bg-[#eae7dc]/20 dark:hover:bg-neutral-800 text-[#18222f] dark:text-white border border-[#dfdab8]/50 dark:border-neutral-800 rounded-full transition-all cursor-pointer"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* AI Twin Trigger Button */}
            <button
              id="header-copilot-trigger"
              onClick={() => setCopilotOpen(true)}
              className="px-4 py-2 bg-[#0f3830] dark:bg-emerald-600 hover:bg-[#0c2c26] dark:hover:bg-emerald-700 text-white text-xs font-sans font-bold rounded-full transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4 text-white" />
              <span>AI Twin</span>
            </button>

            <button
              id="header-hire-btn"
              onClick={() => handleScrollToSection("contact")}
              className="hidden sm:block px-5 py-2.5 bg-transparent hover:bg-[#eae7dc]/20 dark:hover:bg-neutral-800 text-[#18222f] dark:text-white border border-[#dfdab8] dark:border-neutral-800 text-xs font-sans font-bold rounded-full transition-all cursor-pointer active:scale-95"
            >
              Connect
            </button>

            {/* Hamburger Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="block md:hidden p-2.5 bg-transparent hover:bg-[#eae7dc]/20 dark:hover:bg-neutral-800 text-[#18222f] dark:text-white border border-[#dfdab8]/50 dark:border-neutral-800 rounded-full transition-all cursor-pointer"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[69px] inset-x-0 bg-[#faf9f6]/95 dark:bg-neutral-950/95 border-b border-[#dfdab8]/40 dark:border-neutral-800 z-35 flex flex-col items-center py-6 gap-5 shadow-lg animate-slide-down">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                handleScrollToSection(item.id);
                setMobileMenuOpen(false);
              }}
              className={`text-sm font-display font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                activeSection === item.id
                  ? "text-[#0f3830] dark:text-emerald-400 font-extrabold"
                  : "text-[#18222f]/70 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              handleScrollToSection("contact");
              setMobileMenuOpen(false);
            }}
            className="px-6 py-2.5 bg-[#0f3830] dark:bg-emerald-600 text-white font-sans font-bold text-xs rounded-full shadow-xs active:scale-95 cursor-pointer"
          >
            Connect
          </button>
        </div>
      )}

      {/* Hero Section */}
      <HeroSection
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onScrollToSection={handleScrollToSection}
        darkMode={darkMode}
      />

      {/* Main Container */}
      <main className="max-w-8xl mx-auto px-6 md:px-12 space-y-32 mt-16 pb-20">
        
        {/* Section 1: About Section */}
        <section id="about" className="scroll-mt-24">
          <div className="flex flex-col gap-6 mb-12">
            <span className="text-[#18222f]/50 dark:text-neutral-400 font-mono tracking-widest uppercase text-xs font-bold block">About Me</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-[#18222f] dark:text-white leading-tight tracking-tight max-w-4xl">
              Know My Background
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Short Bio & Metadata Cards */}
            <div className="lg:col-span-8 space-y-8">
              <p className="text-base md:text-lg text-[#18222f]/70 dark:text-neutral-400 leading-relaxed font-sans text-justify">
                Full-stack software developer and MCA student at Amrita Vishwa Vidyapeetham with professional internship experience building web and mobile applications. Proficient in the MEAN stack, Python, React Native, and REST API development. Beyond coding, I am a national-level Kho-Kho athlete and CBSE Cluster XI Gold Medalist—a background that built my discipline, endurance, and team execution skills. Passionate about scalable, user-centric software development aligned with Google's mission of organizing information to make it universally accessible and useful.
              </p>

              {/* Key Details horizontal row layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-900 border border-[#dfdab8]/60 dark:border-neutral-800 rounded-2xl shadow-xs">
                  <div className="p-2.5 bg-[#faf9f6] dark:bg-neutral-950 border border-[#dfdab8]/40 dark:border-neutral-800 rounded-xl">
                    <MapPin className="w-4 h-4 text-[#0f3830] dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider font-mono text-[#18222f]/50 dark:text-neutral-400">Location</div>
                    <div className="text-xs font-bold text-[#18222f] dark:text-neutral-200">Kochi, Kerala, India</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-900 border border-[#dfdab8]/60 dark:border-neutral-800 rounded-2xl shadow-xs">
                  <div className="p-2.5 bg-[#faf9f6] dark:bg-neutral-950 border border-[#dfdab8]/40 dark:border-neutral-800 rounded-xl">
                    <Sparkles className="w-4 h-4 text-[#0f3830] dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider font-mono text-[#18222f]/50 dark:text-neutral-400">Availability</div>
                    <div className="text-xs font-bold text-[#18222f] dark:text-neutral-200">Open to Internships / Opps</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-900 border border-[#dfdab8]/60 dark:border-neutral-800 rounded-2xl shadow-xs">
                  <div className="p-2.5 bg-[#faf9f6] dark:bg-neutral-950 border border-[#dfdab8]/40 dark:border-neutral-800 rounded-xl">
                    <Award className="w-4 h-4 text-[#0f3830] dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider font-mono text-[#18222f]/50 dark:text-neutral-400">Experience</div>
                    <div className="text-xs font-bold text-[#18222f] dark:text-neutral-200">+9 Months Internships</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Stats */}
            <div className="lg:col-span-4 flex flex-col gap-8 lg:pl-6 border-t lg:border-t-0 lg:border-l border-[#dfdab8]/40 dark:border-neutral-800 pt-8 lg:pt-0">
              <div>
                <h3 className="text-5xl font-display font-black text-[#18222f] dark:text-white leading-none">+9</h3>
                <p className="text-xs text-[#18222f]/70 dark:text-neutral-400 font-bold uppercase tracking-wider mt-2">Months of professional internship experience</p>
              </div>
              <div>
                <h3 className="text-5xl font-display font-black text-[#18222f] dark:text-white leading-none">+2</h3>
                <p className="text-xs text-[#18222f]/70 dark:text-neutral-400 font-bold uppercase tracking-wider mt-2">Production-ready academic platforms deployed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: My Work Experience - Horizontal Row Timeline */}
        <section id="experience" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Title */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <span className="text-[#18222f]/50 dark:text-neutral-400 font-mono tracking-widest uppercase text-xs font-bold block">Experience</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-[#18222f] dark:text-white leading-tight tracking-tight">
                Code Learn Deliver
              </h2>
            </div>

            {/* Right Column: Horizontal list of rows */}
            <div className="lg:col-span-8 flex flex-col border-t border-[#dfdab8]/40 dark:border-neutral-800">
              {/* Row 1 */}
              <div className="flex items-center justify-between py-6 border-b border-[#dfdab8]/40 dark:border-neutral-800 hover:bg-[#eae7dc]/20 dark:hover:bg-neutral-900/50 px-4 transition-colors group cursor-pointer">
                <div>
                  <h3 className="text-lg font-display font-black text-[#18222f] dark:text-white">Mobile App Development Intern</h3>
                  <p className="text-xs text-[#18222f]/70 dark:text-neutral-400 mt-1 uppercase font-mono font-bold tracking-wider">Cellar Innovative Developers • Kochi, India</p>
                </div>
                <div className="text-sm sm:text-base md:text-lg font-display font-black text-[#18222f] dark:text-white tracking-tight text-right shrink-0">
                  Dec 2024 – Mar 2025
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-between py-6 border-b border-[#dfdab8]/40 dark:border-neutral-800 hover:bg-[#eae7dc]/20 dark:hover:bg-neutral-900/50 px-4 transition-colors group cursor-pointer">
                <div>
                  <h3 className="text-lg font-display font-black text-[#18222f] dark:text-white">Web Application Intern</h3>
                  <p className="text-xs text-[#18222f]/70 dark:text-neutral-400 mt-1 uppercase font-mono font-bold tracking-wider">TECHWINGSYS • Kochi, India</p>
                </div>
                <div className="text-sm sm:text-base md:text-lg font-display font-black text-[#18222f] dark:text-white tracking-tight text-right shrink-0">
                  Jul 2024 – Nov 2024
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Projects */}
        <section id="projects" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#dfdab8]/40 dark:border-neutral-800 pb-6 mb-12">
            <div>
              <span className="text-[#18222f]/50 dark:text-neutral-400 font-mono tracking-widest uppercase text-xs font-bold block mb-2">Projects</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-[#18222f] dark:text-white leading-tight tracking-tight">
                View Featured Projects
              </h2>
            </div>

            {/* Minimalist Filter Tabs */}
            <div className="flex items-center bg-[#eae7dc]/40 dark:bg-neutral-900 border border-[#dfdab8]/50 dark:border-neutral-800 rounded-full p-1 text-xs mt-4 md:mt-0 font-display">
              {(["all", "web", "mobile"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveProjectTab(tab)}
                  className={`px-4 py-2 rounded-full capitalize font-bold transition-all cursor-pointer ${
                    activeProjectTab === tab
                      ? "bg-[#0f3830] dark:bg-emerald-600 text-white shadow-sm"
                      : "text-[#18222f]/70 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Works Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer flex flex-col gap-4"
              >
                {/* Image Frame */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#dfdab8]/60 dark:border-neutral-800 bg-[#faf9f6] dark:bg-neutral-900 shadow-xs">
                  <div className={`absolute inset-0 ${project.colorTheme} opacity-80 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center text-white p-6`}>
                    <h3 className="text-xl font-display font-black text-center">{project.title}</h3>
                  </div>
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 dark:bg-neutral-950/95 border border-[#dfdab8]/60 dark:border-neutral-800 text-[10px] font-mono font-bold text-neutral-600 dark:text-neutral-300 uppercase">
                    {project.type}
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex justify-between items-start px-1">
                  <div>
                    <h3 className="text-base font-display font-black text-neutral-900 dark:text-white group-hover:underline">{project.title}</h3>
                    <p className="text-xs text-[#18222f]/70 dark:text-neutral-400 mt-1 line-clamp-1">{project.description}</p>
                  </div>
                  <div className="p-2 border border-neutral-200 dark:border-neutral-800 rounded-full bg-white dark:bg-neutral-900 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-850 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-[#18222f]/80 dark:text-neutral-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedProject && (
            <div id="project-lightbox" className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedProject(null)} />
              <div className="bg-white dark:bg-neutral-900 border border-[#dfdab8] dark:border-neutral-800 rounded-2xl w-full max-w-2xl p-6 sm:p-8 z-10 relative overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-[#18222f]/70 dark:text-neutral-400 hover:text-black dark:hover:text-white p-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 bg-transparent transition-all font-bold cursor-pointer"
                >
                  ✕
                </button>
                <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-bold">{selectedProject.type} Case Study</span>
                <h3 className="text-2xl md:text-3xl font-display font-black text-neutral-900 dark:text-white mt-2 mb-4">{selectedProject.title}</h3>
                
                <div className="space-y-6 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">Summary & Architecture</h4>
                    <p className="text-[#18222f]/70 dark:text-neutral-400 text-justify">{selectedProject.longDescription}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">Core Engineering Details</h4>
                    <p className="text-[#18222f]/70 dark:text-neutral-400 text-justify">{selectedProject.coreEngineering}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">Key Features Highlighted</h4>
                    <ul className="list-disc list-inside space-y-1 text-[#18222f]/70 dark:text-neutral-400">
                      {selectedProject.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 4: Technical Ecosystem / Skills */}
        <section id="skills" className="scroll-mt-24">
          <div className="flex flex-col border-b border-[#dfdab8]/40 dark:border-neutral-800 pb-6 mb-12">
            <div>
              <span className="text-[#18222f]/50 dark:text-neutral-400 font-mono tracking-widest uppercase text-xs font-bold block mb-2">skills</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-neutral-900 dark:text-white">
                Technical Ecosystem
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                id={`skill-cat-${idx}`}
                className="bg-white dark:bg-neutral-900 border border-[#dfdab8]/60 dark:border-neutral-800 p-6 rounded-2xl shadow-xs"
              >
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#0f3830] dark:bg-emerald-600 rounded-full" />
                    {cat.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#faf9f6] dark:bg-neutral-950 hover:bg-[#eae7dc]/30 dark:hover:bg-neutral-800 border border-[#dfdab8]/60 dark:border-neutral-800 rounded-lg text-xs font-sans font-bold text-[#18222f] dark:text-neutral-200 transition-all"
                      >
                        {getSkillIcon(skill.name)}
                        <span>{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Industry Certifications */}
          <div className="mt-16">
            <h3 className="text-xs uppercase font-bold tracking-widest text-neutral-400 dark:text-neutral-500 mb-6 font-mono">Industry Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              {CERTIFICATIONS_GROUPED.map((group, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-neutral-900 border border-[#dfdab8]/60 dark:border-neutral-800 p-6 rounded-2xl shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-[#0f3830] dark:bg-emerald-600 rounded-full" />
                      {group.issuer}
                    </h4>

                    <ul className="space-y-4">
                      {group.certs.map((cert, cIdx) => (
                        <li
                          key={cIdx}
                          className="flex justify-between items-center text-xs font-bold text-[#18222f] dark:text-neutral-200 pb-3 border-b border-[#dfdab8]/30 dark:border-neutral-800 last:border-0 last:pb-0"
                        >
                          <span className="pr-4">{cert.title}</span>
                          <span className="text-[#18222f]/50 dark:text-neutral-500 font-mono shrink-0">{cert.date}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Contact Form */}
        <section id="contact" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#dfdab8]/40 dark:border-neutral-800 pb-6 mb-12">
            <div>
              <span className="text-[#18222f]/50 dark:text-neutral-400 font-mono tracking-widest uppercase text-xs font-bold block mb-2">Let's connect</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-neutral-900 dark:text-white">
                Get in Touch
              </h2>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-[#dfdab8]/60 dark:border-neutral-800 p-6 sm:p-8 rounded-2xl shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Details, Socials, & Map Mock */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                <div>
                  <h3 className="text-xl font-display font-extrabold text-neutral-900 dark:text-white mb-4">Let's Collaborate</h3>
                  <p className="text-[#18222f]/70 dark:text-neutral-400 text-xs leading-relaxed font-sans text-justify mb-6">
                    Feel free to reach out for internship opportunities, project collaborations, or to request my resume PDF. Send a message using the form, or write to me directly at my email.
                  </p>

                  {/* Clickable Info Links (Email & Phone) */}
                  <div className="space-y-3">
                    <a
                      href="mailto:athulkr34@gmail.com"
                      className="flex items-center gap-2.5 text-xs font-bold text-[#18222f] dark:text-neutral-300 hover:text-[#0f3830] dark:hover:text-emerald-400 w-fit"
                    >
                      <Mail className="w-4 h-4 text-[#0f3830] dark:text-emerald-400" />
                      <span>athulkr34@gmail.com</span>
                    </a>
                    <a
                      href="tel:+919074092795"
                      className="flex items-center gap-2.5 text-xs font-bold text-[#18222f] dark:text-neutral-300 hover:text-[#0f3830] dark:hover:text-emerald-400 w-fit"
                    >
                      <Phone className="w-4 h-4 text-[#0f3830] dark:text-emerald-400" />
                      <span>+91 90740 92795</span>
                    </a>
                  </div>

                  {/* Social media icons row */}
                  <div className="flex gap-2.5 mt-6">
                    <a
                      href="mailto:athulkr34@gmail.com"
                      className="p-2 bg-[#faf9f6] dark:bg-neutral-950 border border-[#dfdab8]/60 dark:border-neutral-800 rounded-full hover:bg-[#eae7dc]/30 dark:hover:bg-neutral-800 text-[#18222f] dark:text-neutral-300 transition-all cursor-pointer"
                      title="Mail"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com/in/athul-k-r-b04255326"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#faf9f6] dark:bg-neutral-950 border border-[#dfdab8]/60 dark:border-neutral-800 rounded-full hover:bg-[#eae7dc]/30 dark:hover:bg-neutral-800 text-[#18222f] dark:text-neutral-300 transition-all cursor-pointer"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="https://github.com/athul-dotcom"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#faf9f6] dark:bg-neutral-950 border border-[#dfdab8]/60 dark:border-neutral-800 rounded-full hover:bg-[#eae7dc]/30 dark:hover:bg-neutral-800 text-[#18222f] dark:text-neutral-300 transition-all cursor-pointer"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Google Map Premium Vector Mockup (Kochi) */}
                <a
                  href="https://maps.google.com/?q=Kochi,Kerala,India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full h-[150px] rounded-2xl border border-[#dfdab8]/60 dark:border-neutral-800 overflow-hidden shadow-xs block group cursor-pointer"
                  title="Click to view on Google Maps"
                >
                  {/* Map Grid Vector Background */}
                  <div className="absolute inset-0 bg-[#f0eee5] dark:bg-neutral-950 opacity-90 transition-colors duration-300">
                    <svg className="w-full h-full stroke-[#d4cfbe] dark:stroke-neutral-800" strokeWidth="1" fill="none">
                      <line x1="0" y1="30" x2="100%" y2="30" />
                      <line x1="0" y1="75" x2="100%" y2="75" />
                      <line x1="0" y1="120" x2="100%" y2="120" />
                      <line x1="50" y1="0" x2="50" y2="100%" />
                      <line x1="150" y1="0" x2="150" y2="100%" />
                      <line x1="280" y1="0" x2="280" y2="100%" />
                      <path d="M 10 90 Q 90 80 130 50 T 300 20" strokeWidth="2.5" className="stroke-[#0f3830]/15 dark:stroke-emerald-500/10" />
                      <path d="M 90 0 C 130 40 180 80 200 150" strokeWidth="2.5" className="stroke-[#0f3830]/15 dark:stroke-emerald-500/10" />
                    </svg>
                  </div>
                  {/* Pulse Dot */}
                  <div className="absolute top-[50px] left-[130px] flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0f3830] dark:bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0f3830] dark:bg-emerald-500"></span>
                  </div>
                  {/* Tooltip Overlay */}
                  <div className="absolute bottom-2 left-2 right-2 bg-white/90 dark:bg-neutral-900/90 border border-[#dfdab8]/50 dark:border-neutral-800 px-3 py-1.5 rounded-xl text-[9px] font-mono font-bold text-neutral-850 dark:text-neutral-200 flex items-center justify-between group-hover:bg-[#0f3830] dark:group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
                    <span>Kochi, Kerala, India</span>
                    <span className="text-[7px] uppercase tracking-wider bg-[#0f3830] dark:bg-emerald-600 group-hover:bg-white text-white group-hover:text-[#0f3830] px-1.5 py-0.5 rounded shadow-xs">Open Map</span>
                  </div>
                </a>
              </div>

              {/* Right Column: Form Inputs */}
              <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-[#dfdab8]/40 dark:border-neutral-800 pt-6 lg:pt-0 lg:pl-8">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#18222f]/50 dark:text-neutral-400 font-mono">Name</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your Name / Company"
                        className="w-full bg-[#faf9f6] dark:bg-neutral-950 border border-[#dfdab8] dark:border-neutral-800 focus:border-[#0f3830] dark:focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-neutral-900 transition-all placeholder:text-neutral-350 font-sans"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#18222f]/50 dark:text-neutral-400 font-mono">Email</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="your.email@address.com"
                        className="w-full bg-[#faf9f6] dark:bg-neutral-950 border border-[#dfdab8] dark:border-neutral-800 focus:border-[#0f3830] dark:focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-neutral-900 transition-all placeholder:text-neutral-350 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[#18222f]/50 dark:text-neutral-400 font-mono">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Share details of your project, role, or inquiry..."
                      className="w-full bg-[#faf9f6] dark:bg-neutral-950 border border-[#dfdab8] dark:border-neutral-800 focus:border-[#0f3830] dark:focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-neutral-900 transition-all placeholder:text-neutral-350 resize-none font-sans"
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
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0f3830] dark:bg-emerald-600 hover:bg-[#0c2e27] dark:hover:bg-emerald-700 text-white font-sans font-bold rounded-xl text-xs transition-all shadow-xs disabled:opacity-50 cursor-pointer active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Sending..." : "Submit Message"}</span>
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Premium Multi-Column Footer */}
      <footer className="bg-[#0f3830] dark:bg-neutral-900 text-white py-16 px-6 md:px-10 lg:px-16 transition-colors duration-300">
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#dfdab8]/10 dark:border-neutral-800 pb-12 mb-8">
          
          {/* Brand & Summary */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <span className="font-display font-black text-2xl text-white uppercase tracking-tight">
              Athul K R
            </span>
            <p className="text-xs text-white/60 dark:text-neutral-400 font-sans leading-relaxed max-w-sm text-justify">
              Full stack developer crafting performant web and mobile software with secure session flows, optimized databases, and clean user-focused architectures.
            </p>
          </div>

          {/* Navigation Sitemap */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#dfdab8]/40 dark:text-neutral-500">Navigation</span>
            <nav className="flex flex-row flex-wrap gap-x-4 gap-y-2 text-xs text-white/80 dark:text-neutral-300 font-bold font-sans">
              <button onClick={() => handleScrollToSection("hero")} className="hover:text-white transition-colors cursor-pointer">Home</button>
              <button onClick={() => handleScrollToSection("about")} className="hover:text-white transition-colors cursor-pointer">About</button>
              <button onClick={() => handleScrollToSection("experience")} className="hover:text-white transition-colors cursor-pointer">Experience</button>
              <button onClick={() => handleScrollToSection("projects")} className="hover:text-white transition-colors cursor-pointer">Projects</button>
              <button onClick={() => handleScrollToSection("skills")} className="hover:text-white transition-colors cursor-pointer">Skills</button>
              <button onClick={() => handleScrollToSection("contact")} className="hover:text-white transition-colors cursor-pointer">Contact</button>
            </nav>
          </div>

          {/* Socials & Contact Info */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#dfdab8]/40 dark:text-neutral-500">Connect</span>
            <div className="flex gap-3 text-white/80 font-sans mt-1">
              <a
                href="mailto:athulkr34@gmail.com"
                className="p-2.5 bg-white/10 dark:bg-neutral-800 hover:bg-white/20 border border-white/10 rounded-full hover:text-white transition-all shadow-xs cursor-pointer"
                title="Email"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://linkedin.com/in/athul-k-r-b04255326"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/10 dark:bg-neutral-800 hover:bg-white/20 border border-white/10 rounded-full hover:text-white transition-all shadow-xs cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://github.com/athul-dotcom"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/10 dark:bg-neutral-800 hover:bg-white/20 border border-white/10 rounded-full hover:text-white transition-all shadow-xs cursor-pointer"
                title="GitHub"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright & Info Bottom Bar */}
        <div className="max-w-8xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] text-white/40 dark:text-neutral-500 font-mono">
          <div>
            © 2026 Athul K R. All rights reserved.
          </div>
          <div>
            <span>Kochi, Kerala, India</span>
          </div>
        </div>
      </footer>

      {/* Back to Top & AI Copilot floating bubble */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
        {/* Floating AI Copilot Trigger */}
        <button
          onClick={() => setCopilotOpen(true)}
          className="p-3 bg-[#0f3830] dark:bg-emerald-600 hover:bg-[#0c2c26] dark:hover:bg-emerald-700 text-white rounded-xl transition-all shadow-lg flex items-center gap-2 text-xs font-sans font-bold cursor-pointer active:scale-95 animate-pulse"
          title="Open AI Twin"
        >
          <Bot className="w-4.5 h-4.5 text-white" />
          <span>Ask My AI Twin</span>
        </button>

        <button
          onClick={() => handleScrollToSection("portfolio-app")}
          className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl text-[#18222f]/80 dark:text-white transition-all shadow-md text-xs font-mono font-bold cursor-pointer"
          title="Back to Top"
        >
          ↑ Top
        </button>
      </div>

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onScrollToSection={handleScrollToSection}
      />

      <AICopilot
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
      />
    </div>
  );
}
