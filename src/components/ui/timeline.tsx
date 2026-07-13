"use client";
import {
  useScroll,
  useTransform,
  motion,
  useInView,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import TextHeader from "../text-header";
import { TextAnimate } from "../magicui/text-animate";
interface TimelineEntry {
  year: string;
  month: string;
  content: React.ReactNode;
}

function TimelineDot({ index, isActive }: { index: number; isActive: boolean }) {
  return (
    <div className="relative h-8 w-8 md:h-10 md:w-10 flex items-center justify-center">
      {isActive && (
        <>
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border border-neutral-400/50"
            animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: index * 0.15,
              ease: "easeOut",
            }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border border-neutral-400/30"
            animate={{ scale: [1, 2.8], opacity: [0.35, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: index * 0.15 + 0.8,
              ease: "easeOut",
            }}
          />
        </>
      )}

      <div
        className={`absolute inset-0 rounded-full transition-all duration-500 ${isActive
          ? "bg-background/90 border-neutral-400/60 shadow-[0_0_20px_rgba(0,0,0,0.08)]"
          : "bg-background/70 border-neutral-200/70"
          } backdrop-blur-sm border`}
      />

      <motion.div
        className={`relative z-10 rounded-full transition-all duration-500 ${isActive
          ? "h-3.5 w-3.5 bg-gradient-to-br from-neutral-600 to-neutral-800 shadow-[0_0_14px_rgba(0,0,0,0.25)]"
          : "h-2.5 w-2.5 bg-neutral-300"
          } ring-2 ring-background`}
        animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
        transition={
          isActive
            ? { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }
            : { duration: 0.3 }
        }
      />
    </div>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: TimelineEntry;
  index: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { margin: "-30% 0px -30% 0px", once: false });

  return (
    <div
      ref={itemRef}
      className="relative z-10 flex justify-start gap-3 sm:gap-4 md:gap-10 pt-8 sm:pt-10 md:pt-40"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {/* Mobile: narrow dot rail. Desktop: sticky sidebar with year labels */}
      <div className="relative md:sticky flex flex-col md:flex-row z-40 items-center md:top-40 self-start shrink-0 w-8 sm:w-10 md:w-auto">
        <div className="shrink-0 md:absolute md:left-3">
          <TimelineDot index={index} isActive={isInView} />
        </div>
        <div className="hidden md:block md:pl-20">
          <motion.h3
            className={`text-5xl font-bold transition-colors duration-500 ${isInView
              ? "text-neutral-800"
              : "text-neutral-500"
              }`}
          >
            {item.year}
          </motion.h3>
          <p
            className={`text-lg md:text-xl mt-1 transition-colors duration-500 ${isInView
              ? "text-neutral-600"
              : "text-neutral-400"
              }`}
          >
            {item.month}
          </p>
        </div>
      </div>

      <div className="relative pl-4 sm:pl-6 md:pl-4 w-full min-w-0 flex-1 max-w-3xl lg:max-w-4xl">
        <div className="md:hidden block mb-3 sm:mb-4">
          <h3
            className={`text-xl sm:text-2xl font-bold transition-colors duration-500 ${isInView
              ? "text-neutral-800"
              : "text-neutral-500"
              }`}
          >
            {item.year}
          </h3>
          <p
            className={`text-sm sm:text-base transition-colors duration-500 break-words ${isInView
              ? "text-neutral-600"
              : "text-neutral-400"
              }`}
          >
            {item.month}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: isInView ? 1 : 0.6 }}
          transition={{ duration: 0.4 }}
        >
          {item.content}
        </motion.div>
      </div>
    </div>
  );
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans px-0 sm:px-2 md:px-10"
      ref={containerRef}
    >
      <TextHeader
        text="Timeline"
      />
      <p
        className="text-justify md:text-center text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-6xl mx-auto mb-6 sm:mb-10 px-1 sm:px-4 md:px-6 leading-relaxed"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        From senior high school research and college foundations to competition wins, freelance collaborations, and full-time work at a fintech startup — this timeline maps the experiences, projects, and milestones that shaped my growth as a developer.
      </p>

      <div ref={ref} className="relative max-w-7xl mx-auto px-1 sm:px-4 md:px-8 lg:px-12 pb-12 md:pb-20">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-[15px] sm:left-[19px] md:left-20 top-0 z-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200/80 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-neutral-500 via-neutral-600 to-neutral-400 shadow-[0_0_8px_rgba(0,0,0,0.15)]"
          />
        </div>
      </div>
    </div>
  );
};
