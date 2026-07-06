import React from "react";
import { motion } from "motion/react";
import { Bot, FileText, Search, ArrowUpRight } from "lucide-react";

interface HeroSectionProps {
  onOpenCopilot: () => void;
  onOpenCommandPalette: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function HeroSection({
  onOpenCopilot,
  onOpenCommandPalette,
  onScrollToSection,
}: HeroSectionProps) {
  const handleDownloadResume = () => {
    const resumeText = `Athul K R - Full-Stack Developer Resume\nEmail: athulkr34@gmail.com\nGitHub: https://github.com/athul-dotcom\nLinkedIn: https://linkedin.com/in/athul-k-r-b04255326\nKochi, Kerala, India\n\nPlease visit the portfolio at ${window.location.origin} for the fully interactive AI resume experience!`;
    const blob = new Blob([resumeText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Athul_KR_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="hero"
      className="relative bg-[#faf9f6] pt-20 pb-12 px-6 md:px-12 lg:px-24 select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Main Grid: Title & Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Big Title */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-[4rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[7.5rem] font-display font-black leading-[0.9] tracking-tighter text-[#18222f] uppercase">
                Full-Stack
                <br />
                Developer
              </h1>
            </motion.div>

            {/* Quick Actions Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 mt-4"
            >
              <button
                onClick={onOpenCopilot}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#0f3830] text-white hover:bg-[#0c2e27] font-sans font-bold text-xs transition-all cursor-pointer active:scale-95 shadow-sm"
              >
                <Bot className="w-4 h-4" />
                <span>AI Twin Copilot</span>
              </button>

              <button
                onClick={handleDownloadResume}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#eae7dc]/30 text-[#18222f] border border-[#dfdab8] font-sans font-bold text-xs transition-all cursor-pointer active:scale-95 shadow-xs"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume</span>
              </button>

              <button
                onClick={onOpenCommandPalette}
                className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#eae7dc]/40 hover:bg-[#eae7dc]/60 text-[#18222f]/70 font-mono text-xs transition-all cursor-pointer active:scale-95 border border-[#dfdab8]/50"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
                <kbd className="text-[10px] bg-white border border-[#dfdab8]/60 px-1.5 py-0.5 rounded font-mono shadow-xs">
                  ⌘K
                </kbd>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Portrait and Tagline */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6 text-left lg:text-right">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative w-full max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden border border-[#dfdab8]/50 bg-white shadow-md self-start lg:self-end"
            >
              <img
                src="https://i.postimg.cc/Kv1cxgKJ/image.png"
                alt="Athul K R"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-[280px] space-y-3"
            >
              <p className="text-sm font-sans text-[#18222f]/60 font-medium leading-relaxed">
                I engineer highly performant backend companion systems, cross-platform mobile apps, and highly normalized, robust SQL databases.
              </p>
              <a
                href="mailto:athulkr34@gmail.com"
                className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#18222f] hover:underline"
              >
                athulkr34@gmail.com
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Tech Stack Marquee Pill Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full border-t border-b border-[#dfdab8]/30 py-6 mt-6 flex flex-wrap items-center justify-between gap-4"
        >
          {["React Native", "Node.js", "Express.js", "MySQL", "TypeScript", "Python", "PHP", "Git"].map((tech) => (
            <span
              key={tech}
              className="px-5 py-2.5 bg-white border border-[#dfdab8]/60 rounded-full text-xs font-mono font-bold text-[#18222f]/80 tracking-wide hover:bg-[#eae7dc]/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
