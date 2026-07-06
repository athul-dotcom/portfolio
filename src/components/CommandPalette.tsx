import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Compass, FileDown, Mail, Copy, Check, ExternalLink } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToSection: (sectionId: string) => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Actions" | "Links";
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onScrollToSection
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("athulkr34@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1500);
  };

  const handleDownloadResume = () => {
    const resumeText = `Athul K R - Full-Stack Developer Resume\nEmail: athulkr34@gmail.com\nGitHub: https://github.com/athul-dotcom\nLinkedIn: https://linkedin.com/in/athul-k-r-b04255326\nKochi, Kerala, India\n\nPlease visit the portfolio for the fully interactive AI resume experience!`;
    const blob = new Blob([resumeText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Athul_KR_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  const commands: CommandItem[] = [
    {
      id: "copy-email",
      title: copied ? "Email Copied!" : "Copy Email Address",
      subtitle: "athulkr34@gmail.com",
      category: "Actions",
      icon: copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Mail className="w-4 h-4 text-[#0f3830] dark:text-emerald-400" />,
      action: handleCopyEmail
    },
    {
      id: "download-resume",
      title: "Download Resume",
      subtitle: "Get a print-friendly text version of my resume",
      category: "Actions",
      icon: <FileDown className="w-4 h-4 text-rose-500" />,
      action: handleDownloadResume
    },
    {
      id: "nav-about",
      title: "Go to About Me",
      subtitle: "Brief introduction and background",
      category: "Navigation",
      icon: <Compass className="w-4 h-4 text-[#5c6874] dark:text-neutral-400" />,
      action: () => {
        onScrollToSection("about");
        onClose();
      }
    },
    {
      id: "nav-experience",
      title: "Go to Work Experience",
      subtitle: "Full-stack mobile & web internships log",
      category: "Navigation",
      icon: <Compass className="w-4 h-4 text-[#5c6874] dark:text-neutral-400" />,
      action: () => {
        onScrollToSection("experience");
        onClose();
      }
    },
    {
      id: "nav-projects",
      title: "Go to Featured Projects",
      subtitle: "View case studies of completed works",
      category: "Navigation",
      icon: <Compass className="w-4 h-4 text-[#5c6874] dark:text-neutral-400" />,
      action: () => {
        onScrollToSection("projects");
        onClose();
      }
    },
    {
      id: "nav-skills",
      title: "Go to Skills & Certifications",
      subtitle: "Explore professional qualifications",
      category: "Navigation",
      icon: <Compass className="w-4 h-4 text-[#5c6874] dark:text-neutral-400" />,
      action: () => {
        onScrollToSection("skills");
        onClose();
      }
    },
    {
      id: "nav-contact",
      title: "Go to Get in Touch",
      subtitle: "Drop a message, let's create something together",
      category: "Navigation",
      icon: <Compass className="w-4 h-4 text-[#5c6874] dark:text-neutral-400" />,
      action: () => {
        onScrollToSection("contact");
        onClose();
      }
    },
    {
      id: "link-github",
      title: "Visit GitHub Profile",
      subtitle: "github.com/athul-dotcom",
      category: "Links",
      icon: <ExternalLink className="w-4 h-4 text-[#18222f] dark:text-white" />,
      action: () => {
        window.open("https://github.com/athul-dotcom", "_blank");
        onClose();
      }
    },
    {
      id: "link-linkedin",
      title: "Visit LinkedIn Profile",
      subtitle: "linkedin.com/in/athul-k-r-b04255326",
      category: "Links",
      icon: <ExternalLink className="w-4 h-4 text-[#18222f] dark:text-white" />,
      action: () => {
        window.open("https://linkedin.com/in/athul-k-r-b04255326", "_blank");
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter((cmd) => {
    const searchLower = search.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(searchLower) ||
      cmd.subtitle.toLowerCase().includes(searchLower) ||
      cmd.category.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[activeIndex]) {
          filteredCommands[activeIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, filteredCommands]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="palette-root" className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            id="palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#18222f]/40 dark:bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            id="palette-modal"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-[600px] bg-[#faf9f5] dark:bg-neutral-900 border border-[#dfdab8]/60 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden m-4 flex flex-col max-h-[450px]"
          >
            {/* Search Input */}
            <div id="palette-search-container" className="flex items-center gap-3 px-4 py-3.5 border-b border-[#dfdab8]/40 dark:border-neutral-800 bg-white dark:bg-neutral-950">
              <Search className="w-5 h-5 text-[#5c6874] dark:text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                id="palette-input"
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveIndex(0);
                }}
                className="w-full bg-transparent text-[#18222f] dark:text-white placeholder-[#5c6874] dark:placeholder-neutral-500 focus:outline-none text-sm font-display font-medium"
              />
              <span className="text-[10px] text-[#5c6874] dark:text-neutral-400 bg-[#faf9f5] dark:bg-neutral-900 border border-[#dfdab8] dark:border-neutral-800 px-2 py-0.5 rounded font-mono shrink-0 font-bold shadow-xs">
                ESC
              </span>
            </div>

            {/* Commands List */}
            <div id="palette-list" className="flex-1 overflow-y-auto p-2 bg-[#fcfbf7] dark:bg-neutral-900 scrollbar-thin">
              {filteredCommands.length > 0 ? (
                Array.from(new Set(filteredCommands.map((c) => c.category))).map((category) => {
                  const categoryCmds = filteredCommands.filter((c) => c.category === category);
                  return (
                    <div key={category} className="mb-3">
                      <h4 className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#5c6874] dark:text-neutral-400 tracking-widest font-mono">
                        {category}
                      </h4>
                      <div className="space-y-1">
                        {categoryCmds.map((cmd) => {
                          const globalIdx = filteredCommands.findIndex((c) => c.id === cmd.id);
                          const isActive = globalIdx === activeIndex;

                          return (
                            <button
                              key={cmd.id}
                              id={`palette-item-${cmd.id}`}
                              onClick={cmd.action}
                              onMouseEnter={() => setActiveIndex(globalIdx)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                                isActive
                                  ? "bg-[#0f3830]/10 dark:bg-emerald-500/10 border border-[#dfdab8] dark:border-neutral-700 text-[#18222f] dark:text-white"
                                  : "text-[#5c6874] dark:text-neutral-400 border border-transparent hover:bg-white/40 dark:hover:bg-neutral-800/50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full shrink-0 ${
                                  isActive
                                    ? "bg-[#0f3830]/20 dark:bg-emerald-500/20 text-[#0f3830] dark:text-emerald-400"
                                    : "bg-white dark:bg-neutral-950 border border-[#dfdab8] dark:border-neutral-800 text-[#5c6874] dark:text-neutral-400"
                                }`}>
                                  {cmd.icon}
                                </div>
                                <div>
                                  <div className="text-xs font-display font-bold text-[#18222f] dark:text-white">{cmd.title}</div>
                                  <div className="text-[10px] text-[#5c6874] dark:text-neutral-400">
                                    {cmd.subtitle}
                                  </div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-[#5c6874] dark:text-neutral-400 text-xs italic font-medium">
                  No commands found matching "{search}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div id="palette-footer" className="px-4 py-2.5 border-t border-[#dfdab8]/40 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex items-center justify-end text-[10px] text-[#5c6874] dark:text-neutral-400 font-mono">
              <div className="font-bold">Athul's Portfolio CLI</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
