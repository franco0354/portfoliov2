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

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", href);
  }
}

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
          ? "text-primary font-semibold"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {item.label}
      {isDesktop && !isActive && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-2 bottom-0 h-0.5 origin-center scale-x-0 bg-primary/70 transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
      )}
      {isActive && isDesktop && (
        <motion.span
          layoutId="navbar-active-underline"
          className="absolute inset-x-2 bottom-0 h-0.5 bg-primary"
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
      )}
      {isActive && !isDesktop && (
        <motion.span
          layoutId="navbar-active-mobile-bar"
          className="absolute bottom-0 left-0 top-0 w-0.5 bg-primary"
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
    <header className="fixed top-0 z-40 w-full border-b border-border/40 bg-background/75 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6">
        <div className="flex items-center gap-0.5">
          {DATA.socials.map((social) => (
            <Button key={social.label} variant="ghost" size="icon" asChild>
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
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-border/60 bg-background/95 backdrop-blur-xl">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
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
