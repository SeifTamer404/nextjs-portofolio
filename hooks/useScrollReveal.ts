"use client";

import { useEffect, useRef, RefObject } from "react";
import { useInView } from "framer-motion";

/**
 * Returns a ref and whether the element is currently visible in the viewport.
 * @param threshold - percentage of element visible before triggering (0–1)
 * @param once - if true, stays true after first intersection
 */
export function useScrollReveal<T extends Element>(
  threshold = 0.1,
  once = true
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null!);
  const isInView = useInView(ref, {
    once,
    margin: "0px 0px -10% 0px",
    amount: threshold,
  });

  return [ref, isInView];
}
