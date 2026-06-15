import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";

/* --- Fonts --------------------------------------------------- */
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

/* --- Metadata ------------------------------------------------ */
export const metadata: Metadata = {
  title: {
    default: "Portfolio — Creative Developer",
    template: "%s · Portfolio",
  },
  description:
    "Creative full-stack developer crafting immersive digital experiences with Next.js, Three.js, and motion design.",
  keywords: [
    "developer",
    "portfolio",
    "frontend",
    "next.js",
    "three.js",
    "creative",
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Portfolio — Creative Developer",
    description:
      "Creative full-stack developer crafting immersive digital experiences.",
    siteName: "Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Creative Developer",
    description:
      "Creative full-stack developer crafting immersive digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

/* --- Root Layout --------------------------------------------- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${inter.variable}
        ${spaceGrotesk.variable}
        ${jetbrainsMono.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full bg-black text-white overflow-x-hidden">
        {/* Custom glowing cursor (client-only) */}
        <CustomCursor />

        {/* Lenis smooth scroll wrapper */}
        <SmoothScrollProvider>
          <main id="main-content">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
