"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const THUMB_MS = 280;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [optimisticDark, setOptimisticDark] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark =
    optimisticDark ?? (mounted && resolvedTheme === "dark");

  const handleToggle = async () => {
    if (!mounted || animating) return;

    const nextDark = !(optimisticDark ?? resolvedTheme === "dark");
    const nextTheme = nextDark ? "dark" : "light";
    const root = document.documentElement;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setAnimating(true);
    // Slide the thumb first so the switch always has a visible effect
    setOptimisticDark(nextDark);

    const applyTheme = () => {
      root.classList.toggle("dark", nextDark);
      setTheme(nextTheme);
    };

    if (prefersReduced) {
      applyTheme();
      setOptimisticDark(null);
      setAnimating(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, THUMB_MS));

    if (typeof document.startViewTransition !== "function") {
      applyTheme();
      setOptimisticDark(null);
      setAnimating(false);
      return;
    }

    root.dataset.themeWipe = nextDark ? "ltr" : "rtl";

    try {
      const transition = document.startViewTransition(applyTheme);
      await transition.finished;
    } finally {
      delete root.dataset.themeWipe;
      setOptimisticDark(null);
      setAnimating(false);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={handleToggle}
      disabled={!mounted || animating}
      className={cn(
        "theme-toggle group relative inline-flex h-8 w-14 shrink-0 items-center rounded-full",
        "border border-border bg-muted",
        "transition-colors duration-300",
        "hover:border-primary/50 hover:bg-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:opacity-70",
        "dark:border-border dark:bg-secondary dark:hover:border-primary/60 dark:hover:bg-accent"
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-between px-2"
      >
        <Sun
          className={cn(
            "size-3.5 transition-colors duration-300",
            isDark ? "text-muted-foreground" : "text-primary"
          )}
        />
        <Moon
          className={cn(
            "size-3.5 transition-colors duration-300",
            isDark ? "text-primary" : "text-muted-foreground"
          )}
        />
      </span>

      <span
        aria-hidden
        className={cn(
          "theme-toggle-thumb absolute top-0.5 left-0.5 z-10 size-6 rounded-full",
          "bg-card text-foreground",
          "border border-border",
          "shadow-[0_1px_3px_oklch(0_0_0/0.18)]",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover:border-primary/40",
          "group-active:scale-95",
          "dark:bg-foreground dark:border-transparent dark:shadow-[0_1px_3px_oklch(0_0_0/0.45)]",
          isDark && "translate-x-6"
        )}
      />
    </button>
  );
}
