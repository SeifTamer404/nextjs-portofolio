"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   LoadingScreen — shows a branded intro while the page initialises.
   It mounts immediately (SSR-safe via useState), waits for the DOM
   to be interactive, then animates out.
───────────────────────────────────────────────────────────────── */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fake-progress ticker — gives a sense of momentum
    let value = 0;
    const tick = setInterval(() => {
      // Accelerates fast then slows near 90 (waiting for real ready)
      const increment = value < 60 ? 4 : value < 80 ? 2 : 0.6;
      value = Math.min(value + increment, 90);
      setProgress(Math.round(value));
    }, 60);

    // Real ready trigger
    const done = () => {
      clearInterval(tick);
      setProgress(100);
      // Small pause at 100% before hiding
      setTimeout(() => setVisible(false), 520);
    };

    if (document.readyState === "complete") {
      done();
    } else {
      window.addEventListener("load", done, { once: true });
      // Safety net — hide after 4 s no matter what
      const safety = setTimeout(done, 4000);
      return () => {
        clearInterval(tick);
        window.removeEventListener("load", done);
        clearTimeout(safety);
      };
    }

    return () => clearInterval(tick);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
          aria-label="Loading"
          aria-live="polite"
        >
          {/* ── Ambient glow blobs ── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "20%", left: "15%",
              width: "min(50vw, 500px)", height: "min(50vw, 500px)",
              background: "radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "15%", right: "10%",
              width: "min(40vw, 400px)", height: "min(40vw, 400px)",
              background: "radial-gradient(ellipse, rgba(6,182,212,0.14) 0%, transparent 70%)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />

          {/* ── Monogram ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", marginBottom: "2.5rem" }}
          >
            {/* Outer rotating ring */}
            <motion.svg
              width="120" height="120" viewBox="0 0 120 120"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              aria-hidden="true"
            >
              <circle
                cx="60" cy="60" r="54"
                fill="none"
                stroke="url(#loaderGrad)"
                strokeWidth="1"
                strokeDasharray="12 6"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Counter-rotating inner ring */}
            <motion.svg
              width="120" height="120" viewBox="0 0 120 120"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              aria-hidden="true"
            >
              <circle
                cx="60" cy="60" r="44"
                fill="none"
                stroke="rgba(139,92,246,0.25)"
                strokeWidth="1"
                strokeDasharray="4 10"
                strokeLinecap="round"
              />
            </motion.svg>

            {/* Initials badge */}
            <div style={{
              width: 120, height: 120,
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
            }}>
              <span style={{
                fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)",
                fontWeight: 800,
                fontSize: "2.2rem",
                letterSpacing: "-0.04em",
                background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
              }}>
                ST
              </span>
            </div>
          </motion.div>

          {/* ── Name ── */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-jetbrains-mono, 'JetBrains Mono', monospace)",
              fontSize: "0.7rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(240,240,240,0.35)",
              marginBottom: "2.5rem",
            }}
          >
            Seif Tamer
          </motion.p>

          {/* ── Progress bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              width: "min(220px, 55vw)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            {/* Track */}
            <div style={{
              width: "100%", height: "1px",
              background: "rgba(255,255,255,0.07)",
              borderRadius: 999,
              overflow: "hidden",
            }}>
              {/* Fill */}
              <motion.div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #8b5cf6, #06b6d4)",
                  borderRadius: 999,
                  originX: 0,
                }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>

            {/* Percentage */}
            <span style={{
              fontFamily: "var(--font-jetbrains-mono, monospace)",
              fontSize: "0.65rem",
              color: "rgba(240,240,240,0.25)",
              letterSpacing: "0.2em",
            }}>
              {progress}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
