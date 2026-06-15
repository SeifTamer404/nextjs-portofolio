"use client";

import {
  useRef,
  useEffect,
  useState,
  MouseEvent as ReactMouseEvent,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, GitFork } from "lucide-react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";

/* --- Register GSAP Plugin ------------------------------------ */
gsap.registerPlugin(ScrollTrigger);

/* --- Types --------------------------------------------------- */
interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  accentColor: string;
  image: string;
  year: string;
  href: string;
  github: string;
}

/* --- Project Data -------------------------------------------- */
const ACCENT_COLORS = ["#8b5cf6", "#06b6d4", "#f43f5e", "#10b981"];

const PROJECTS: Project[] = portfolioData.projects.map((p, index) => ({
  id: `0${index + 1}`,
  title: p.title,
  subtitle: p.stack[0] || "Web Application",
  description: p.description,
  tags: p.stack,
  accentColor: ACCENT_COLORS[index % ACCENT_COLORS.length],
  image: p.image,
  year: new Date().getFullYear().toString(),
  href: "#",
  github: p.github,
}));

/* --- Project Card -------------------------------------------- */
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  /* -- Image parallax on mouse move -- */
  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (!cardRef.current || !imageWrapRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    imageWrapRef.current.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
  }

  function handleMouseLeave() {
    if (!imageWrapRef.current) return;
    imageWrapRef.current.style.transform = "scale(1) translate(0px, 0px)";
    setHovered(false);
  }

  return (
    <article
      ref={cardRef}
      id={`project-card-${project.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="flex-shrink-0 flex flex-col"
      /* 🔥 1. المعادلة السحرية: الطول والعرض بيكبروا ويصغروا مع الشاشة 🔥 */
      style={{ 
        width: "clamp(300px, 32vw, 460px)", 
        height: "clamp(420px, 68vh, 600px)" 
      }}
      aria-label={`Project: ${project.title}`}
    >
      {/* -- Glass card -- */}
      <div
        className="relative flex flex-col h-full rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.025)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: hovered
            ? `0 0 80px ${project.accentColor}1a, 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)`
            : "0 20px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Glowing top edge */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px z-20 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${project.accentColor} 50%, transparent 100%)`,
            opacity: hovered ? 0.9 : 0.3,
            transition: "opacity 0.5s ease",
          }}
        />

        {/* -- Image / Visual area -- */}
        <div
          className="relative overflow-hidden flex-shrink-0"
          /* 🔥 2. الصورة بتاخد 42% دايماً، عشان تسيب 58% للكلام يتنفس فيهم 🔥 */
          style={{ height: "42%" }}
        >
          {/* Inner image */}
          <div
            ref={imageWrapRef}
            className="absolute inset-[-8%] w-[116%] h-[116%]"
            style={{
              transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <Image
              src={project.image}
              alt={`${project.title} project screenshot`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 40vw"
              priority={index === 0}
            />
          </div>

          {/* Dark overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 100%)`,
            }}
          />

          {/* Project number badge */}
          <div className="absolute top-4 left-4 z-20">
            <span
              className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${project.accentColor}55`,
                color: project.accentColor,
              }}
            >
              {project.id}
            </span>
          </div>

          {/* Year */}
          <div className="absolute top-4 right-4 z-20">
            <span
              className="text-[10px] font-mono tracking-widest"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {project.year}
            </span>
          </div>
        </div>

        {/* -- Text content -- */}
        {/* صغرنا الـ Padding شوية عشان الشاشات الصغيرة */}
        <div className="flex flex-col flex-1 p-5 md:p-6 overflow-hidden">
          {/* Subtitle */}
          <p
            className="text-[10px] md:text-[11px] font-mono tracking-[0.22em] uppercase mb-2 flex-shrink-0"
            style={{ color: project.accentColor }}
          >
            {project.subtitle}
          </p>

          {/* Title */}
          <h3 className="font-display font-bold text-[var(--text-primary)] tracking-tight mb-2.5 flex-shrink-0"
            style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-[12px] md:text-[13px] leading-[1.6] text-[var(--text-muted)] mb-4 line-clamp-2 flex-shrink-0">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4 flex-shrink-0">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] md:text-[11px] font-mono px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--text-dim)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer: links */}
          <div
            className="flex items-center gap-3 pt-4 mt-auto flex-shrink-0 w-full"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <a
              href={project.href}
              data-cursor-hover
              className="flex items-center gap-1.5 text-[11px] md:text-[12px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
            >
              <ExternalLink size={11} strokeWidth={2} />
              Live Site
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="flex items-center gap-1.5 text-[11px] md:text-[12px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
            >
              <GitFork size={11} strokeWidth={2} />
              Source
            </a>

            {/* Accent arrow circle */}
            <div className="ml-auto flex-shrink-0">
              <div
                className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-colors duration-300 overflow-hidden"
                style={{
                  background: hovered
                    ? `${project.accentColor}28`
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${hovered ? project.accentColor + "66" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 5.5h9M6 1.5l4 4-4 4"
                    stroke={hovered ? project.accentColor : "rgba(255,255,255,0.4)"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* --- Scroll Progress Bar ------------------------------------- */
function ProgressDots({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="flex items-center gap-3">
      {PROJECTS.map((_, i) => (
        <div
          key={i}
          className="h-[3px] rounded-full transition-all duration-500"
          style={{
            width: i === activeIndex ? "36px" : "12px",
            background:
              i === activeIndex
                ? "linear-gradient(90deg, var(--purple), var(--cyan))"
                : "rgba(255,255,255,0.13)",
          }}
          aria-hidden="true"
        />
      ))}
      <span className="ml-2 text-[11px] font-mono text-[var(--text-dim)]">
        {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;
        {String(PROJECTS.length).padStart(2, "0")}
      </span>
    </div>
  );
}

/* --- Ambient glow -------------------------------------------- */
function SectionAmbient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute"
        style={{
          top: "20%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "10%",
          right: "-5%",
          width: "45vw",
          height: "45vw",
          background:
            "radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}

/* --- Main Projects Section ----------------------------------- */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      /* -- Header reveal (before pin) -- */
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      /* -- Horizontal scroll (pinned) -- */
      const getScrollDistance = () =>
        track.scrollWidth - window.innerWidth;

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1.4,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            /* Update active card indicator */
            const idx = Math.min(
              Math.round(self.progress * (PROJECTS.length - 1)),
              PROJECTS.length - 1
            );
            setActiveIndex(idx);
          },
        },
      });

    }, sectionRef); /* <- scoped context: all ScrollTriggers owned here */

    return () => ctx.revert(); /* ← full cleanup on unmount */
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full bg-black"
      aria-label="Selected Projects"
    >
      <SectionAmbient />

      {/* -- Pinned content shell -- */}
      <div className="h-screen flex flex-col">

        {/* -- Section header -- */}
        <div
          ref={headerRef}
          className="container-fluid flex items-end justify-between flex-shrink-0"
          style={{ paddingTop: "clamp(2rem, 5vh, 3.5rem)", paddingBottom: "clamp(1rem, 3vh, 2rem)" }}
        >
          {/* Left: title */}
          <div>
            <p className="text-[11px] font-mono tracking-[0.32em] uppercase text-[var(--purple)] mb-3">
              Selected Work
            </p>
            <h2
              className="font-display font-bold text-[var(--text-primary)] leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.8rem)" }}
            >
              Projects that pushed
              <br />
              <span className="gradient-text">the craft.</span>
            </h2>
          </div>

          {/* Right: progress + scroll hint */}
          <div className="hidden md:flex flex-col items-end gap-3">
            <ProgressDots activeIndex={activeIndex} />
            <p className="text-[11px] font-mono text-[var(--text-dim)] flex items-center gap-2">
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 5h14M10 1l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Scroll to explore
            </p>
          </div>
        </div>

        {/* -- Horizontally scrolling cards track -- */}
        <div className="flex-1 flex items-center overflow-visible">
          <div
            ref={trackRef}
            className="flex gap-7 will-change-transform flex-shrink-0"
            style={{
              paddingInline: "clamp(1.25rem, 5vw, 5rem)",
              width: "max-content",
            }}
            aria-label="Project cards"
          >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}

          {/* -- Outro panel: CTA after last card -- */}
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: "clamp(280px, 25vw, 380px)" }}
            aria-hidden="true"
          >
            <div className="text-center">
              <p className="text-[11px] font-mono tracking-widest text-[var(--text-dim)] uppercase mb-4">
                More coming
              </p>
              <a
                href="https://github.com/SeifTamer404"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <GitFork size={13} />
                View GitHub
              </a>
            </div>
          </div>
          </div>{/* end trackRef */}
        </div>{/* end flex-1 centering wrapper */}
      </div>{/* end h-screen shell */}
    </section>

  );
}
