"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Logo from "@/app/assets/img/logo.png";

export const LOAD_DURATION = 2000;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return () => {
      document.getElementById("initial-loader")?.remove();
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = Math.min(now - start, LOAD_DURATION);
      const next = Math.round(easeOutCubic(elapsed / LOAD_DURATION) * 100);
      setProgress(next);
      if (elapsed < LOAD_DURATION) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="loading-screen fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden text-white"
      role="progressbar"
      aria-label="Loading portfolio"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex flex-col items-center gap-9 px-6"
      >
        <div className="relative size-32 md:size-36">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-white/12"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-full"
          >
            <svg viewBox="0 0 100 100" className="size-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                className="text-white/25"
              />
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeDasharray="72 230"
                className="text-white/70"
              />
            </svg>
          </motion.div>

          <div className="absolute inset-5 rounded-full bg-linear-to-br from-white/8 via-transparent to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />

          <div className="absolute inset-7 overflow-hidden rounded-full ring-1 ring-white/20 ring-offset-2 ring-offset-section">
            <Image
              src={Logo}
              alt="Logo"
              fill
              className="object-contain p-2"
              priority
            />
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <span className="absolute left-1/2 top-1 size-1.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_10px_rgb(255_255_255_/_0.35)]" />
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-[clamp(1.5rem,4vw,2rem)] font-bold tracking-tight text-white">
            Franco <span className="gradient-text">Gregorio</span>
          </h1>

          <p className="text-sm tracking-wide text-white/72">
            Preparing your experience
          </p>
        </div>

        <div className="w-full max-w-68 space-y-2.5">
          <div className="relative h-0.5 overflow-hidden rounded-full bg-white/20">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-white/30 via-white to-white/30"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 animate-[shimmer_2.2s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/25 to-transparent" />
          </div>

          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/65">
            <span>Portfolio</span>
            <span>{String(progress).padStart(2, "0")}%</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
