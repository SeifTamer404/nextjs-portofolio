import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";

/* ─── Fonts ──────────────────────────────────────────────────── */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

/* ─── Metadata ───────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Seif Tamer — Full-Stack Developer",
    template: "%s · Seif Tamer",
  },
  description:
    "Full-stack developer & MERN Stack specialist crafting production-ready web applications with Next.js, React, and Node.js.",
  keywords: ["developer", "portfolio", "full-stack", "MERN", "next.js", "react"],
  authors: [{ name: "Seif Tamer Elsayed Ismail" }],
  creator: "Seif Tamer Elsayed Ismail",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Seif Tamer — Full-Stack Developer",
    description: "Full-stack developer & MERN Stack specialist.",
    siteName: "Seif Tamer Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seif Tamer — Full-Stack Developer",
    description: "Full-stack developer & MERN Stack specialist.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

/* ─── Critical loader CSS ─────────────────────────────────────
   Injected into <head> so it's painted with the very first HTML
   byte — zero JS needed. All animations are pure CSS.
─────────────────────────────────────────────────────────────── */
const LOADER_CSS = `
/* ── Container ── */
#__st-loader {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Exit: starts fading at 1.4 s, gone by 2.0 s */
  animation: stLoaderExit 0.6s cubic-bezier(0.22,1,0.36,1) 1.4s forwards;
}
@keyframes stLoaderExit {
  to {
    opacity: 0;
    transform: scale(1.04);
    visibility: hidden;
    pointer-events: none;
  }
}

/* ── Ambient blobs ── */
#__st-loader .blob1 {
  position: absolute; top: 18%; left: 12%;
  width: clamp(200px,40vw,480px); height: clamp(200px,40vw,480px);
  background: radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%);
  filter: blur(70px); pointer-events: none;
}
#__st-loader .blob2 {
  position: absolute; bottom: 12%; right: 8%;
  width: clamp(160px,32vw,380px); height: clamp(160px,32vw,380px);
  background: radial-gradient(ellipse, rgba(6,182,212,0.14) 0%, transparent 70%);
  filter: blur(70px); pointer-events: none;
}

/* ── Badge wrapper ── */
#__st-loader .badge-wrap {
  position: relative;
  width: 120px; height: 120px;
  margin-bottom: 24px;
  animation: stFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
}
@keyframes stFadeUp {
  from { opacity: 0; transform: translateY(14px) scale(0.9); }
  to   { opacity: 1; transform: translateY(0)   scale(1);   }
}

/* ── Spinning rings ── */
#__st-loader .ring-outer {
  position: absolute; inset: 0;
  animation: stSpinCW 8s linear infinite;
}
#__st-loader .ring-inner {
  position: absolute; inset: 0;
  animation: stSpinCCW 12s linear infinite;
}
@keyframes stSpinCW  { to { transform: rotate(360deg);  } }
@keyframes stSpinCCW { to { transform: rotate(-360deg); } }

/* ── Initials badge ── */
#__st-loader .badge {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
}
#__st-loader .initials {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-weight: 800; font-size: 2.1rem; letter-spacing: -0.04em;
  background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; line-height: 1;
}

/* ── Name ── */
#__st-loader .st-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem; letter-spacing: 0.35em;
  text-transform: uppercase; color: rgba(240,240,240,0.3);
  margin-bottom: 32px;
  animation: stFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both;
}

/* ── Progress bar ── */
#__st-loader .progress-wrap {
  width: clamp(160px,50vw,220px);
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  animation: stFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.35s both;
}
#__st-loader .progress-track {
  width: 100%; height: 1px;
  background: rgba(255,255,255,0.07); border-radius: 999px; overflow: hidden;
}
/* CSS-only progress: 0→100% over 1.3 s */
#__st-loader .progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #8b5cf6, #06b6d4);
  border-radius: 999px;
  animation: stProgressFill 1.3s cubic-bezier(0.33,1,0.68,1) forwards;
}
@keyframes stProgressFill {
  from { width: 0%; }
  to   { width: 100%; }
}
`;

/* ─── Root Layout ─────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Critical loader CSS — painted with first HTML byte */}
        <style dangerouslySetInnerHTML={{ __html: LOADER_CSS }} />
      </head>

      <body className="min-h-full bg-black text-white overflow-x-hidden">

        {/* ── Loading screen — pure HTML+CSS, zero JS, zero hydration issues ── */}
        <div id="__st-loader" aria-label="Loading" role="status" aria-live="polite">
          <div className="blob1" aria-hidden="true" />
          <div className="blob2" aria-hidden="true" />

          {/* Spinning rings + initials */}
          <div className="badge-wrap" aria-hidden="true">
            <svg className="ring-outer" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="54"
                stroke="url(#lg1)" strokeWidth="1"
                strokeDasharray="12 6" strokeLinecap="round"
              />
              <defs>
                <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#8b5cf6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
            <svg className="ring-inner" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="44"
                stroke="rgba(139,92,246,0.25)" strokeWidth="1"
                strokeDasharray="4 10" strokeLinecap="round"
              />
            </svg>
            <div className="badge">
              <span className="initials">ST</span>
            </div>
          </div>

          {/* Name */}
          <p className="st-name" aria-hidden="true">Seif Tamer</p>

          {/* Progress bar — CSS animation only */}
          <div className="progress-wrap" aria-hidden="true">
            <div className="progress-track">
              <div className="progress-fill" />
            </div>
          </div>
        </div>

        {/* Custom glowing cursor — desktop only, renders null on mobile */}
        <CustomCursor />

        {/* Lenis smooth scroll */}
        <SmoothScrollProvider>
          <main id="main-content">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
