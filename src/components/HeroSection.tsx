import React from "react";
import { motion } from "motion/react";
import { FileText, Search } from "lucide-react";

interface HeroSectionProps {
  onOpenCommandPalette: () => void;
  onScrollToSection: (sectionId: string) => void;
  darkMode?: boolean;
}

export default function HeroSection({
  onOpenCommandPalette,
  onScrollToSection,
  darkMode = false,
}: HeroSectionProps) {
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Athul_KR_Resume.pdf";
    link.download = "Athul_KR_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="hero"
      className="relative bg-transparent pt-20 pb-12 px-6 md:px-10 lg:px-16 select-none overflow-hidden"
    >
      {/* Premium SVG Abstract grid background with gradient glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-40 dark:opacity-20 transition-opacity duration-300">
        <svg className="w-full h-full stroke-neutral-300 dark:stroke-neutral-800" strokeWidth="0.5" fill="none">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
          <circle cx="75%" cy="35%" r="200" className="fill-[#0f3830]/5 dark:fill-emerald-500/10 blur-3xl animate-pulse" />
          <circle cx="25%" cy="75%" r="250" className="fill-[#dfdab8]/20 dark:fill-neutral-900/20 blur-3xl" />
        </svg>
      </div>

      <div className="max-w-8xl mx-auto flex flex-col gap-12">
        {/* Main Grid: Title & Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Big Title */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-[4rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[7.5rem] font-display font-black leading-[0.9] tracking-tighter text-[#18222f] dark:text-white uppercase transition-colors duration-300">
                Full Stack Developer
              </h1>
            </motion.div>

            {/* Tech Caption */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-sm md:text-base font-sans text-[#18222f]/70 dark:text-neutral-400 font-medium leading-relaxed max-w-2xl text-justify transition-colors duration-300"
            >
              Developing cross-platform software with highly optimized database schemas, secure session management, and responsive user interfaces.
            </motion.p>

            {/* Quick Actions Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 mt-4"
            >
              <button
                onClick={handleDownloadResume}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-neutral-900 hover:bg-[#eae7dc]/30 dark:hover:bg-neutral-800 text-[#18222f] dark:text-white border border-[#dfdab8] dark:border-neutral-800 font-sans font-bold text-xs transition-all cursor-pointer active:scale-95 shadow-xs"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume</span>
              </button>

              <button
                onClick={onOpenCommandPalette}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-neutral-900 hover:bg-[#eae7dc]/30 dark:hover:bg-neutral-800 text-[#18222f] dark:text-white border border-[#dfdab8] dark:border-neutral-800 font-sans font-bold text-xs transition-all cursor-pointer active:scale-95 shadow-xs"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Portrait and Tagline */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6 text-left lg:text-right">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative w-full max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden border border-[#dfdab8]/50 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md self-start lg:self-end"
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
              className="max-w-[280px] flex flex-col items-start lg:items-end text-left lg:text-right"
            >
              <div className="text-xs font-mono font-bold text-[#18222f] dark:text-neutral-300 tracking-wide transition-colors duration-300">
                Master of Computer Applications
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
