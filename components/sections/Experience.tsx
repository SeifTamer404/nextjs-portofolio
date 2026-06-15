"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function Experience() {
  return (
    <section className="py-40 px-8 md:px-16 max-w-[1400px] mx-auto flex flex-col gap-12 w-full relative bg-black border-t border-[var(--border)] overflow-hidden">
      <div className="container-fluid mb-16 md:mb-24">
        <p className="text-[11px] font-mono tracking-[0.32em] uppercase text-[var(--purple)] mb-3">
          Career History
        </p>
        <h2 className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] text-white leading-none tracking-tight">
          Experience.
        </h2>
      </div>

      <div className="container-fluid">
        <div className="flex flex-col gap-16 md:gap-24 relative">
          {portfolioData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col md:flex-row items-start gap-4 md:gap-8 group"
            >
              {/* Left Column: Date - strictly 30% on desktop */}
              <div className="w-full md:w-[30%] flex-shrink-0">
                <p className="text-sm font-mono text-[var(--cyan)] uppercase tracking-widest pt-2 group-hover:text-[var(--purple)] transition-colors duration-500">
                  {exp.date}
                </p>
              </div>

              {/* Right Column: Content - strictly 70% on desktop */}
              <div className="w-full md:w-[70%] border-t border-[var(--border)] pt-6 md:pt-0 md:border-t-0 md:border-l md:pl-8 group-hover:border-[var(--cyan)] transition-colors duration-500">
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-[var(--text-primary)] mb-4 group-hover:text-white transition-colors">
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
      
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[rgba(139,92,246,0.05)] blur-[100px] pointer-events-none rounded-full" />
    </section>
  );
}
