"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* --- Custom Glowing Cursor (desktop-only) -------------------- */
export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springy large ring follows slower
  const springConfig = { damping: 28, stiffness: 280, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  // Dot follows instantly
  const dotX = useSpring(mouseX, { damping: 20, stiffness: 600, mass: 0.1 });
  const dotY = useSpring(mouseY, { damping: 20, stiffness: 600, mass: 0.1 });

  // Detect if real pointer device (mouse) exists
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => {
      const desktop = mq.matches && navigator.maxTouchPoints === 0;
      setIsDesktop(desktop);
      // Restore cursor on touch devices
      if (!desktop) document.body.style.cursor = "auto";
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnterLink = () => {
      cursorRef.current?.classList.add("cursor--hover");
    };
    const handleMouseLeaveLink = () => {
      cursorRef.current?.classList.remove("cursor--hover");
    };

    window.addEventListener("mousemove", handleMouseMove);

    const interactives = document.querySelectorAll<HTMLElement>(
      "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterLink);
      el.addEventListener("mouseleave", handleMouseLeaveLink);
    });

    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll<HTMLElement>(
        "a, button, [role='button'], [data-cursor-hover]"
      );
      newInteractives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterLink);
        el.removeEventListener("mouseleave", handleMouseLeaveLink);
        el.addEventListener("mouseenter", handleMouseEnterLink);
        el.addEventListener("mouseleave", handleMouseLeaveLink);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [isDesktop, mouseX, mouseY]);

  // Don't render anything on touch/mobile devices
  if (!isDesktop) return null;

  return (
    <>
      {/* -- Outer glowing ring ---------------------------------- */}
      <motion.div
        ref={cursorRef}
        id="cursor-ring"
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* -- Inner dot ------------------------------------------- */}
      <motion.div
        ref={dotRef}
        id="cursor-dot"
        className="cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <style>{`
        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 99999;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(139, 92, 246, 0.7);
          pointer-events: none;
          transition:
            width  0.3s cubic-bezier(0.22, 1, 0.36, 1),
            height 0.3s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.3s ease,
            background 0.3s ease;
          box-shadow:
            0 0 12px rgba(139, 92, 246, 0.35),
            inset 0 0 8px rgba(139, 92, 246, 0.1);
          mix-blend-mode: normal;
        }

        .cursor-ring.cursor--hover {
          width: 64px;
          height: 64px;
          border-color: rgba(6, 182, 212, 0.85);
          background: rgba(6, 182, 212, 0.07);
          box-shadow:
            0 0 20px rgba(6, 182, 212, 0.4),
            inset 0 0 12px rgba(6, 182, 212, 0.1);
        }

        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 100000;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--purple, #8b5cf6);
          pointer-events: none;
          box-shadow:
            0 0 8px rgba(139, 92, 246, 0.8),
            0 0 16px rgba(139, 92, 246, 0.4);
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .cursor-ring.cursor--hover ~ .cursor-dot,
        .cursor-dot.cursor--hover {
          background: var(--cyan, #06b6d4);
          transform: scale(1.4);
        }
      `}</style>
    </>
  );
}
