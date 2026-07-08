import type Lenis from "lenis";
import { SMOOTH_SCROLL_OPTIONS } from "@/lib/smooth-scroll-config";

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

function getHeaderHeight() {
  return window.matchMedia("(min-width: 640px)").matches ? 64 : 56;
}

export function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const element = document.getElementById(id);
  if (!element) return;

  const offset = -getHeaderHeight();
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (lenisInstance && !prefersReducedMotion) {
    lenisInstance.scrollTo(element, {
      offset,
      duration: SMOOTH_SCROLL_OPTIONS.duration,
      lerp: SMOOTH_SCROLL_OPTIONS.lerp,
    });
  } else {
    element.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  window.history.pushState(null, "", href);
}
