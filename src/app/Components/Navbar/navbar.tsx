"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { usePageState } from "@/hooks/usePageState";
import { cn } from "@/lib/utils";
import { DATA } from "@/app/page-data";
import Link from "next/link";
import { Sun, MoonIcon, Menu } from "lucide-react";
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
    <header className="fixed top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
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
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              aria-label={item.label}
              aria-current={activeSection === item.label ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                activeSection === item.label &&
                "bg-primary/20 ring-1 ring-primary/50"
              )}
            >
              {item.label}
            </Link>
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
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {DATA.navbar.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-current={
                      activeSection === item.label ? "page" : undefined
                    }
                    className={cn(
                      "rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent",
                      activeSection === item.label &&
                      "bg-primary/20 text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
