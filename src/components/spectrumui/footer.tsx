"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

const backWavePath =
  "M0,52 C240,88 480,20 720,52 C960,84 1200,16 1440,52 L1440,120 L0,120 Z";

const frontWavePath =
  "M0,76 C360,44 720,96 1080,76 C1260,64 1380,84 1440,76 L1440,120 L0,120 Z";

function AnimatedWaveLayer({
  path,
  className,
  duration,
  reverse = false,
}: {
  path: string;
  className: string;
  duration: number;
  reverse?: boolean;
}) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 flex w-[200%]"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {[0, 1].map((index) => (
        <svg
          key={index}
          className="h-full w-1/2 shrink-0"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={path} className={className} />
        </svg>
      ))}
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden dark:bg-section-alt max-md:text-justify">
      <div className="px-4 pt-10 md:px-6">
        <div className="container mx-auto pb-10">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div data-aos="fade-up">
              <Link href="/" className="inline-flex items-center">
                <h2 className="mb-4 font-semibold">Portfolio</h2>
              </Link>

              <p className="text-sm text-muted-foreground max-w-xs">
                Full-stack web and mobile developer crafting thoughtful digital experiences.
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                © {new Date().getFullYear()} Franco Gregorio. All rights reserved.
              </p>
            </div>

            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="mb-4 font-semibold">Open to</h3>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles size={18} />
                Collaborations & Freelance Projects
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative h-20 w-full md:h-28"
        aria-hidden="true"
      >
        <AnimatedWaveLayer
          path={backWavePath}
          className="fill-primary/15 dark:fill-primary/25"
          duration={22}
        />
        <AnimatedWaveLayer
          path={frontWavePath}
          className="fill-primary/10 dark:fill-primary/20"
          duration={16}
          reverse
        />
      </div>
    </footer>
  );
}
