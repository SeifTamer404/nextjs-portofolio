"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import Lenis from "lenis";

/* --- Context -------------------------------------------------- */
interface SmoothScrollContextType {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/* --- Provider ------------------------------------------------ */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 2,
      infinite: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    setLenis(lenisInstance);

    /* -- Sync GSAP ScrollTrigger with Lenis scroll events ------
       Lenis v1 fires a 'scroll' event on its emitter. We listen
       to it and tell ScrollTrigger to re-read the scroll position.
       This prevents the pin from jittering on fast scrolls. -- */
    const syncScrollTrigger = async () => {
      try {
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        const { gsap } = await import("gsap");
        gsap.registerPlugin(ScrollTrigger);

        /* Lenis dispatches 'scroll' on its internal EventEmitter */
        lenisInstance.on("scroll", ScrollTrigger.update);

        /* Disable lag smoothing so GSAP + Lenis stay in lockstep */
        gsap.ticker.lagSmoothing(0);
      } catch {
        /* GSAP not loaded yet — ScrollTrigger will self-correct */
      }
    };
    syncScrollTrigger();

    /* -- RAF loop -- */
    let rafId: number;
    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    document.documentElement.classList.add("lenis");

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
