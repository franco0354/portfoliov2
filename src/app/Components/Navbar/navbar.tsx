"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { usePageState } from "@/hooks/usePageState";
import { cn } from "@/lib/utils";
import { DATA } from "@/app/page-data";
import Link from "next/link";
import { Sun, MoonIcon, Menu } from "lucide-react";
import { motion } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { scrollToSection } from "@/lib/scroll";

type NavItemProps = {
  item: (typeof DATA.navbar)[number];
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  variant?: "desktop" | "mobile";
};

function NavItem({ item, isActive, onClick, variant = "desktop" }: NavItemProps) {
  const isDesktop = variant === "desktop";

  return (
    <Link
      href={item.href}
      onClick={(e) => onClick(e, item.href)}
      aria-label={item.label}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative text-sm font-medium transition-colors",
        isDesktop ? "px-3 py-2 sm:px-4" : "rounded-lg px-3 py-3",
        isActive
          ? "font-semibold text-white dark:text-primary"
          : "text-white/75 hover:text-white dark:text-muted-foreground dark:hover:text-foreground"
      )}
    >
      {item.label}
      {isDesktop && !isActive && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-2 bottom-0 h-0.5 origin-center scale-x-0 bg-white/70 transition-transform duration-300 ease-out group-hover:scale-x-100 dark:bg-primary/70"
        />
      )}
      {isActive && isDesktop && (
        <motion.span
          layoutId="navbar-active-underline"
          className="absolute inset-x-2 bottom-0 h-0.5 bg-white dark:bg-primary"
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
      )}
      {isActive && !isDesktop && (
        <motion.span
          layoutId="navbar-active-mobile-bar"
          className="absolute bottom-0 left-0 top-0 w-0.5 bg-white dark:bg-primary"
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
      )}
    </Link>
  );
}

export default function Navbar() {
  const { mode, activeSection, toggleMode } = usePageState();
  const [open, setOpen] = useState(false);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      scrollToSection(href);
      setOpen(false);
    },
    []
  );

  return (
    <header className="fixed top-0 z-40 w-full border-b border-white/15 bg-[oklch(0.18_0.05_148)] text-white dark:border-border/40 dark:bg-background dark:text-foreground">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6">
        <div className="flex items-center gap-0.5">
          {DATA.socials.map((social) => (
            <Button
              key={social.label}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hover:text-white dark:text-foreground dark:hover:bg-accent"
              asChild
            >
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <social.icon className="size-4" />
              </a>
            </Button>
          ))}
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {DATA.navbar.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              isActive={activeSection === item.label}
              onClick={handleNavClick}
              variant="desktop"
            />
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 hover:text-white dark:text-foreground dark:hover:bg-accent"
            onClick={toggleMode}
            aria-label={mode === "light" ? "Dark Mode" : "Light Mode"}
          >
            {mode === "light" ? (
              <MoonIcon className="size-4" />
            ) : (
              <Sun className="size-4" />
            )}
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-white md:hidden dark:text-foreground dark:hover:bg-accent"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-white/15 bg-[oklch(0.18_0.05_148)]/95 text-white backdrop-blur-xl dark:border-border/60 dark:bg-background/95 dark:text-foreground"
            >
              <SheetHeader>
                <SheetTitle className="text-white">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {DATA.navbar.map((item) => (
                  <NavItem
                    key={item.label}
                    item={item}
                    isActive={activeSection === item.label}
                    onClick={handleNavClick}
                    variant="mobile"
                  />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
