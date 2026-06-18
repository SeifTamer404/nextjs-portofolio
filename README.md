# Seif Tamer — Portfolio Website

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r184-black?style=for-the-badge&logo=three.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**A high-performance, immersive portfolio website built with Next.js, Three.js, GSAP, and Framer Motion.**

[🌐 Live Site](https://github.com/SeifTamer404/nextjs-portofolio) · [📄 CV](https://drive.google.com/file/d/11MKn85of8d2ESq5DEmZXfs55_j2Jgqfw/view?usp=drive_link) · [💼 LinkedIn](https://www.linkedin.com/in/seif-elsharnoby-278793163/)

</div>

---

## 👤 Author

**Seif Tamer Elsayed Ismail**  
*Software Developer | MERN Stack Specialist*  
📍 Port Said, Egypt  
📧 seiftamer404@gmail.com  
📞 +20 128 810 0177

| Platform | Link |
|---|---|
| 🔗 LinkedIn | [seif-elsharnoby](https://www.linkedin.com/in/seif-elsharnoby-278793163/) |
| 🐙 GitHub | [SeifTamer404](https://github.com/SeifTamer404) |
| 📘 Facebook | [seif.elsharnoby](https://www.facebook.com/seif.elsharnoby.643637) |
| 📸 Instagram | [_seif_elsharnoby](https://www.instagram.com/_seif_elsharnoby/) |

---

## 📌 Overview

This is my personal developer portfolio — designed from scratch to be both technically impressive and visually stunning. The goal was to build something that doesn't just *list* my skills, but actively *demonstrates* them through the quality of the experience itself.

Every animation, transition, and interaction was deliberate. The site uses a **glassmorphism dark aesthetic** with purple/cyan accents, smooth scroll, a WebGL 3D canvas, and horizontal scrolling projects — all optimized to run fast on both desktop and mobile.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Dark Glassmorphism UI** | Premium dark theme with purple/cyan gradient palette and glass-effect cards |
| 🌌 **Interactive 3D Hero Canvas** | WebGL tech-network built with React Three Fiber — nodes, edges, particles, and sparkles |
| 🖱️ **Custom Glowing Cursor** | Desktop-only spring-animated cursor with hover effects (disabled on touch devices) |
| 📜 **Horizontal Project Scroll** | GSAP-powered pinned horizontal scroll carousel for the Projects section |
| ⚡ **Smooth Scrolling** | Lenis smooth scroll integrated across the entire page |
| 🎭 **Entrance Animations** | Framer Motion `whileInView` animations on every section |
| 🔤 **Typewriter Effect** | Animated typewriter for the hero role line |
| 🧲 **Magnetic Buttons** | Cursor-attracted CTA buttons in the Hero section |
| 📱 **Fully Responsive** | Optimized for mobile, tablet, and desktop with adaptive 3D quality |
| 🚀 **Branded Loading Screen** | Pure CSS loading screen with "ST" monogram — appears before any JavaScript |
| 🏷️ **Skill Icons** | Inline SVG brand icons for every technology in The Arsenal section |
| 📊 **SEO Ready** | Proper meta tags, Open Graph, Twitter Card, and semantic HTML |

---

## 🛠️ Tech Stack

### Core Framework

| Technology | Version | Why Used |
|---|---|---|
| **Next.js** | 16.2 (App Router) | Server-side rendering, file-based routing, image optimization, font optimization via `next/font`. App Router enables layouts, server components, and streaming. |
| **React** | 19 | Component-based UI. Used with `"use client"` boundaries to separate server and client rendering. |
| **TypeScript** | 5 | Type safety across all components. Interfaces like `PortfolioData`, `Project`, `PersonalInfo` enforce a strict data contract. |

### 3D & Visual

| Technology | Version | Why Used |
|---|---|---|
| **Three.js** | r184 | Core WebGL renderer. Powers the 3D scene: geometry, materials, lighting, and the render loop. |
| **@react-three/fiber** | 9.6 | React bindings for Three.js. Turns Three.js into a declarative JSX API. `useFrame` drives per-frame animations without manual `requestAnimationFrame` loops. |
| **@react-three/drei** | 10.7 | Helper components for R3F: `Stars` (starfield), `Float` (gentle floating animation), `Sparkles` (particle sparkles). Saves building these from scratch. |

**What the 3D scene contains:**
- `NetworkNode` — animated glowing spheres with orbiting rings
- `NetworkEdges` — connecting lines between nodes using `THREE.Line`
- `DataPackets` — moving dots that travel along edges
- `FloatingRings` — large counter-rotating torus geometries
- `CentralCore` — wireframe icosahedron + octahedron at the center
- `ParticleField` — 1400 (desktop) / 400 (mobile) ambient floating points
- `Stars` — 3500 (desktop) / 800 (mobile) deep star field

**Mobile optimization:** On touch devices, antialias is disabled, DPR is capped at 1x, `frameloop="demand"` renders only on changes, and half the geometry is removed.

### Animation

| Technology | Version | Why Used |
|---|---|---|
| **Framer Motion** | 12 | `motion` components for entrance animations (`whileInView`, `initial`, `animate`). Used for `fadeUp` variants across every section. Also powers the `useSpring` physics in the custom cursor. |
| **GSAP** | 3.15 | Used exclusively for the Projects horizontal scroll. `ScrollTrigger.create` pins the section and drives the `translateX` animation based on scroll position. Framer Motion can't do this level of scroll-linked control. |
| **Lenis** | 1.3 | Smooth scroll engine. Intercepts native scroll events and replaces them with a buttery eased scroll. Integrated via `@studio-freight/react-lenis` provider. |

### Styling

| Technology | Version | Why Used |
|---|---|---|
| **Tailwind CSS** | 4 | Utility-first CSS. Used for layout, spacing, flex/grid, and responsive breakpoints. Version 4 uses a new CSS-first config (`@import "tailwindcss"` instead of a JS config file). |
| **Vanilla CSS** | — | Used for design tokens (`--purple`, `--cyan`, `--container-px`), the loading screen (full CSS animation, zero JS), gradient section separators via `::before`/`::after` pseudo-elements, custom scrollbar, and noise texture overlay. |

**Design tokens defined in `:root`:**
```css
--purple:        #8b5cf6;
--cyan:          #06b6d4;
--container-px:  clamp(1.25rem, 5vw, 5rem);   /* unified padding */
--section-pad-y: clamp(5rem, 10vw, 10rem);     /* section vertical rhythm */
--ease-smooth:   cubic-bezier(0.22, 1, 0.36, 1);
```

### Fonts (via `next/font/google`)

| Font | Use |
|---|---|
| **Inter** | Body text, paragraph copy |
| **Space Grotesk** | Display headings (`h1`–`h6`), logo, monogram |
| **JetBrains Mono** | Code-style labels, badges, section tags, progress text |

All fonts use `display: "swap"` and are injected as CSS variables (`--font-inter`, `--font-space-grotesk`, `--font-jetbrains-mono`).

### Icons & Assets

| Tool | Why Used |
|---|---|
| **Lucide React** | Icon library for UI icons: `ArrowRight`, `Mail`, `ExternalLink`, `GitFork` |
| **Inline SVGs** | Brand icons in The Arsenal section (JavaScript, TypeScript, React, Node.js, etc.) are hand-written inline SVGs — no icon library needed, no extra network request, and they use `currentColor` to inherit the card's accent color |

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, loading screen, custom cursor
│   ├── page.tsx            # Main page — assembles all sections in order
│   └── globals.css         # Design tokens, resets, utility classes, section separators
│
├── components/
│   ├── sections/
│   │   ├── Hero.tsx         # Full-viewport hero with 3D canvas, typewriter, magnetic CTAs
│   │   ├── Projects.tsx     # Horizontal scroll carousel with GSAP ScrollTrigger
│   │   ├── Experience.tsx   # Timeline-style career history
│   │   ├── Expertise.tsx    # Skill cards with inline SVG brand icons
│   │   └── Contact.tsx      # Large "Let's Talk" section with footer links
│   │
│   ├── three/
│   │   └── HeroCanvas.tsx   # Full Three.js scene (R3F) with mobile optimization
│   │
│   ├── ui/
│   │   ├── CustomCursor.tsx     # Spring-animated custom cursor (desktop only)
│   │   ├── MagneticButton.tsx   # Mouse-attracting button wrapper
│   │   └── LoadingScreen.tsx    # (unused — replaced by pure CSS in layout.tsx)
│   │
│   └── providers/
│       └── SmoothScrollProvider.tsx  # Lenis smooth scroll context wrapper
│
└── data/
    └── portfolio.ts    # Single source of truth for ALL content (name, bio, skills,
                        # experience, projects, social links, CV URL)
```

---

## 🎬 Sections

### 1. Hero
- Full viewport height
- 3D WebGL canvas background (lazy-loaded, SSR disabled)
- Animated headline with typewriter effect for the role
- Status badge ("Open to opportunities")
- Two CTA buttons: `View My Work` (scrolls to #work) and `Get in Touch` (scrolls to #contact)
- Both buttons use a `MagneticButton` wrapper that attracts toward the cursor

### 2. Projects (Horizontal Scroll)
- GSAP `ScrollTrigger` pins the section and translates cards horizontally as you scroll
- 6 project cards, each with: cover image (with parallax on hover), tech stack tags, GitHub link
- Glass-effect cards with per-project accent colors

### 3. Experience
- Vertical timeline layout
- 4 career entries: Freelance, ITI/NTI Internship, TROSC Instructor, Octalian Community

### 4. The Arsenal
- 4 skill category cards: Languages, Frontend, Backend & Database, Tools & DevOps
- Each card has a colored accent, glassmorphism background, and inline SVG icons per skill

### 5. Contact
- Giant "Let's Talk." heading
- Clickable email with animated underline
- Footer with links: LinkedIn, GitHub, Facebook, Instagram, CV

---

## ⚡ Performance Optimizations

| Optimization | Detail |
|---|---|
| **Mobile 3D quality scaling** | Stars 3500→800, particles 1400→400, sparkles 180→40 on mobile |
| **Antialias disabled on mobile** | `antialias: false` on Canvas GL context |
| **DPR capped at 1x on mobile** | `dpr={[1,1]}` instead of `[1,2]` |
| **`frameloop="demand"`** | 3D canvas only re-renders when state changes on mobile |
| **Mouse parallax disabled on mobile** | No pointer events needed, removes per-frame calculations |
| **Custom cursor disabled on mobile** | `(pointer: fine)` media query + JS check — no spring animation overhead |
| **HeroCanvas dynamically imported** | `dynamic(() => import(...), { ssr: false })` — Three.js never runs on the server |
| **Images with `priority` + `loading="eager"`** | All project images are above the fold in the horizontal scroll carousel |
| **Loading screen in pure CSS** | CSS `@keyframes` — appears with the first HTML byte, zero JS dependency |
| **`next/font`** | Fonts self-hosted, no external request, `display: swap` prevents FOIT |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/SeifTamer404/nextjs-portofolio.git

# Navigate into the project
cd nextjs-portofolio/portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🔧 Customization

All content is managed from a **single file**: [`data/portfolio.ts`](./data/portfolio.ts)

To update the portfolio with your own info, edit:

```ts
export const portfolioData = {
  personalInfo: {
    name: "Your Name",
    role: "Your Role",
    bio: "Your bio...",
    contact: { email: "...", phone: "..." },
    social: { linkedin: "...", github: "...", facebook: "...", instagram: "..." },
    cvUrl: "...",
  },
  skills: {
    languages: [...],
    frontend: [...],
    backendDb: [...],
    tools: [...],
  },
  experience: [
    { title: "...", date: "...", description: "..." },
  ],
  projects: [
    { id: "...", title: "...", description: "...", stack: [...], image: "...", github: "..." },
  ],
};
```

No other file needs to be changed for content updates.

---

## 📦 Dependencies

```json
{
  "@react-three/drei":         "^10.7.7",
  "@react-three/fiber":        "^9.6.1",
  "@studio-freight/react-lenis":"^0.0.47",
  "framer-motion":             "^12.40.0",
  "gsap":                      "^3.15.0",
  "lenis":                     "^1.3.23",
  "lucide-react":              "^1.18.0",
  "next":                      "16.2.9",
  "react":                     "19.2.4",
  "three":                     "^0.184.0",
  "clsx":                      "^2.1.1"
}
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Designed & Developed by [Seif Tamer Elsayed Ismail](https://github.com/SeifTamer404)**

*Built with Next.js · Three.js · GSAP · Framer Motion*

</div>
