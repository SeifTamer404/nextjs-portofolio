"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { portfolioData } from "@/data/portfolio";

/* --- Dynamic import: R3F canvas must never run on server ----- */
const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas"),
  { ssr: false, loading: () => null }
);

/* --- Animation Variants -------------------------------------- */
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUpVariants: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* --- Typewriter Effect --------------------------------------- */
function TypewriterRole({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <div className="text-[clamp(1rem,2vw,1.4rem)] font-mono text-[var(--cyan)] mb-4 flex items-center min-h-[28px]">
      <span>{displayedText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[3px] h-[1em] bg-[var(--cyan)] ml-2"
      />
    </div>
  );
}

/* --- Scroll Indicator ---------------------------------------- */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.4, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
      aria-hidden="true"
    >
      <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--text-dim)]">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="w-px h-12 bg-gradient-to-b from-[var(--purple)] to-transparent"
      />
    </motion.div>
  );
}

/* --- Ambient Gradient Vignette ------------------------------- */
function AmbientGradient() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.05) 75%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-40 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute z-[1] pointer-events-none"
        style={{
          top: "30%",
          left: "-5%",
          width: "clamp(300px, 40vw, 600px)",
          height: "clamp(300px, 40vw, 600px)",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.09) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </>
  );
}

/* --- Hero Section -------------------------------------------- */
export default function Hero() {
  const email = portfolioData.personalInfo.contact.email;

  return (
    <section
      id="hero"
      className="relative w-full min-h-svh flex flex-col bg-black overflow-hidden"
      aria-label={`Hero — ${portfolioData.personalInfo.name}`}
    >
      {/* -- 3D Canvas -- */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HeroCanvas />
      </div>

      <AmbientGradient />

      {/* -- Text content overlay -- */}
      <div className="relative z-10 flex-1 flex items-center py-[clamp(5rem,12vh,8rem)]" style={{ paddingInline: 'var(--container-px)' }}>
        <div className="w-full max-w-[80rem] mx-auto">
          <motion.div
            className="max-w-[min(800px,100%)]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* ── Status badge ── */}
            <motion.div variants={fadeUpVariants} className="mb-8">
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  whiteSpace: "nowrap",
                  padding: "0.20rem 1.0rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  border: "1px solid rgba(255,255,255,0.25)",
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  color: "var(--text-primary)",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--purple)",
                    flexShrink: 0,
                    boxShadow: "0 0 6px var(--purple)",
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                  aria-hidden="true"
                />
                Open to opportunities · {new Date().getFullYear()}
              </span>
            </motion.div>

            {/* ── Headline — flex-wrap with gap for proper spacing ── */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] text-white mb-4 flex flex-wrap gap-x-[0.3em]"
            >
              {portfolioData.personalInfo.name.split(" ").map((word, idx) => (
                <span key={idx}>{word}</span>
              ))}
            </motion.h1>

            {/* ── Typewriter Role ── */}
            <motion.div variants={fadeUpVariants}>
              <TypewriterRole text={portfolioData.personalInfo.role} />
            </motion.div>

            {/* ── Sub-description ── */}
            <motion.p
              variants={fadeUpVariants}
              className="text-[clamp(1rem,1.4vw,1.2rem)] text-[var(--text-muted)] leading-relaxed mb-5 max-w-[600px]"
            >
              {portfolioData.personalInfo.bio}
            </motion.p>

            {/* ── CTA Buttons ── */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              {/* Primary — View My Work */}
              <MagneticButton
                href="#work"
                strength={0.3}
                className="
                  group relative 
                  !flex !w-fit !items-center !justify-center gap-3 
                  !px-6 !py-3.5 !rounded-full 
                  bg-gradient-to-r from-[var(--purple)] to-[var(--cyan)] 
                  text-white font-medium text-[1.1rem] 
                  shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]
                  transition-all duration-300 hover:scale-105
                "
              >
                <span className="whitespace-nowrap">View My Work</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" strokeWidth={2.5} />
              </MagneticButton>

              {/* Secondary — Get in Touch */}
              <MagneticButton
                href="#contact"
                strength={0.25}
                className="
                  group relative 
                  !flex !w-fit !items-center !justify-center gap-3 
                  !px-8 !py-3.5 !rounded-full 
                  border border-white/20 bg-white/10 backdrop-blur-md 
                  text-white font-medium text-[1.1rem] 
                  hover:bg-white/20 hover:border-white/40
                  transition-all duration-300 hover:scale-105
                "
              >
                <Mail className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                <span className="whitespace-nowrap">Get in Touch</span>
              </MagneticButton>
            </motion.div>
            {/* Tech tags row intentionally removed */}
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
