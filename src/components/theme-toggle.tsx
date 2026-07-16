"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const handleToggle = async () => {
    if (!mounted || animating) return;

    const nextDark = !isDark;
    const nextTheme = nextDark ? "dark" : "light";
    const root = document.documentElement;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const applyTheme = () => {
      root.classList.toggle("dark", nextDark);
      setTheme(nextTheme);
    };

    if (
      prefersReduced ||
      typeof document.startViewTransition !== "function"
    ) {
      applyTheme();
      return;
    }

    setAnimating(true);
    root.dataset.themeWipe = nextDark ? "ltr" : "rtl";

    try {
      const transition = document.startViewTransition(applyTheme);
      await transition.finished;
    } finally {
      delete root.dataset.themeWipe;
      setAnimating(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="text-foreground hover:bg-accent hover:text-foreground"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={handleToggle}
      disabled={!mounted || animating}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
