"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function Experience() {
  return (
    /* ── Full-width section — background fills edge-to-edge ── */
    <section
      id="experience"
      className="relative w-full bg-black overflow-hidden"
    >
      {/* ── Top separator: smooth gradient fade from previous section ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(139,92,246,0.04) 0%, transparent 100%)",
        }}
      />

      {/* ── Ambient glow ── */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* ── Content container ── */}
      <div className="container-fluid section-pad relative z-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <p className="text-[11px] font-mono tracking-[0.32em] uppercase text-[var(--purple)] mb-3">
            Career History
          </p>
          <h2 className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] text-white leading-none tracking-tight">
            Experience.
          </h2>
        </motion.div>

        {/* ── Timeline entries ── */}
        <div className="flex flex-col gap-16 md:gap-24">
          {portfolioData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col md:flex-row items-start gap-4 md:gap-8 group"
            >
              {/* Left: Date */}
              <div className="w-full md:w-[28%] flex-shrink-0">
                <p className="text-sm font-mono text-[var(--cyan)] uppercase tracking-widest pt-2 group-hover:text-[var(--purple)] transition-colors duration-500">
                  {exp.date}
                </p>
              </div>

              {/* Right: Content */}
              <div className="w-full md:w-[72%] border-t border-[var(--border)] pt-6 md:pt-0 md:border-t-0 md:border-l md:border-[var(--border)] md:pl-10 group-hover:md:border-[var(--cyan)]/30 transition-colors duration-500">
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-[var(--text-primary)] mb-4 group-hover:text-white transition-colors duration-300">
                  {exp.title}
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed text-base md:text-lg max-w-2xl">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Bottom separator: smooth fade into next section ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(6,182,212,0.03) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
