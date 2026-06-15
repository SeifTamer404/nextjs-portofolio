"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  /** How strongly the button moves toward the cursor (0–1) */
  strength?: number;
  onClick?: () => void;
  id?: string;
}

export default function MagneticButton({
  children,
  href,
  className = "",
  style: externalStyle,
  strength = 0.28,
  onClick,
  id,
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring gives the satisfying "snap back" feel
  const x = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.4 });

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * strength);
    rawY.set((e.clientY - cy) * strength);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const sharedProps = {
    id,
    style: { x, y, ...externalStyle },
    "data-cursor-hover": true,
    whileTap: { scale: 0.94 },
    className,
  } as const;

  return (
    <div
      ref={wrapperRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      /* Padding creates a wider magnetic zone beyond the visible button */
      style={{ padding: "12px", margin: "-12px", display: "inline-block" }}
    >
      {href ? (
        <motion.a href={href} onClick={onClick} {...sharedProps}>
          {children}
        </motion.a>
      ) : (
        <motion.button type="button" onClick={onClick} {...sharedProps}>
          {children}
        </motion.button>
      )}
    </div>
  );
}
