"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";
import { SMOOTH_SCROLL_OPTIONS } from "@/lib/smooth-scroll-config";

type UseSmoothScrollOptions = {
  enabled?: boolean;
};

export function useSmoothScroll({ enabled = true }: UseSmoothScrollOptions = {}) {
  useEffect(() => {
    if (!enabled) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      ...SMOOTH_SCROLL_OPTIONS,
    });

    setLenis(lenis);

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        lenis.destroy();
        setLenis(null);
      }
    };

    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      lenis.destroy();
      setLenis(null);
    };
  }, [enabled]);
}
