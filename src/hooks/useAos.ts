"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { getLenis } from "@/lib/scroll";

type UseAosOptions = {
  enabled?: boolean;
};

export function useAos({ enabled = true }: UseAosOptions = {}) {
  useEffect(() => {
    if (!enabled) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: false,
      offset: 80,
      mirror: true,
    });

    const refreshAos = () => AOS.refresh();

    let lenisInstance = getLenis();
    const attachLenis = () => {
      const instance = getLenis();
      if (!instance || instance === lenisInstance) return Boolean(instance);

      lenisInstance?.off("scroll", refreshAos);
      lenisInstance = instance;
      instance.on("scroll", refreshAos);
      return true;
    };

    attachLenis();
    window.addEventListener("resize", refreshAos);

    const lenisPoll = window.setInterval(() => {
      if (attachLenis()) {
        window.clearInterval(lenisPoll);
      }
    }, 150);

    refreshAos();

    return () => {
      window.removeEventListener("resize", refreshAos);
      window.clearInterval(lenisPoll);
      lenisInstance?.off("scroll", refreshAos);
    };
  }, [enabled]);
}
