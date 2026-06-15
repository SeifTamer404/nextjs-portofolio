"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

const { social, cvUrl, contact } = portfolioData.personalInfo;

const footerLinks = [
  { label: "LinkedIn",  href: social.linkedin  },
  { label: "GitHub",    href: social.github    },
  { label: "Facebook",  href: social.facebook  },
  { label: "Instagram", href: social.instagram },
  { label: "CV",        href: cvUrl            },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-32 md:py-48 bg-black border-t border-[var(--border)] overflow-hidden flex flex-col justify-between"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex flex-col flex-1"
      >
        <div className="container-fluid flex flex-col items-center justify-center text-center flex-1">
          <p className="text-[11px] font-mono tracking-[0.32em] uppercase text-[var(--purple)] mb-8 md:mb-12">
            Next Step
          </p>

          <h2 className="font-display font-black text-[clamp(5rem,15vw,20rem)] leading-none tracking-tighter text-white mb-16 md:mb-24 hover:text-[var(--text-muted)] transition-colors duration-700 cursor-default">
            Let's Talk.
          </h2>

          {/* Email with animated underline */}
          <div className="relative group inline-block cursor-pointer px-4">
            <a
              href={`mailto:${contact.email}`}
              className="text-[clamp(1.5rem,4vw,3rem)] font-light text-[var(--text-muted)] group-hover:text-white transition-colors duration-500 pb-6 inline-block"
              data-cursor-hover
            >
              {contact.email}
            </a>

            {/* Base line */}
            <div className="absolute bottom-2 left-0 w-full h-[1px] bg-white/10" />

            {/* Animated fill line */}
            <div className="absolute bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-[var(--purple)] to-[var(--cyan)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </div>
        </div>

        {/* Footer bottom */}
        <div className="container-fluid py-10 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-[var(--border)]">
          <p className="text-sm font-mono text-[var(--text-dim)]">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {footerLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-[var(--text-dim)] hover:text-white transition-colors uppercase tracking-wider"
                data-cursor-hover
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
