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
import { DrawBorder } from "@/components/ui/draw-border";
import "@/app/Components/TimeLine/Timeline.modern.css";

interface TimelineEntry {
  year: string;
  month: string;
  content: React.ReactNode;
}

function TimelineDot({ index, isActive }: { index: number; isActive: boolean }) {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center md:h-10 md:w-10">
      {isActive && (
        <>
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border border-primary/40"
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
            className="absolute inset-0 rounded-full border border-primary/25"
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
        className={`timeline-dot-ring absolute inset-0 ${isActive ? "" : "timeline-dot-ring--inactive"}`}
      />

      <motion.div
        className={`timeline-dot-core ${isActive ? "timeline-dot-core--active" : "timeline-dot-core--inactive"}`}
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
      className="timeline-item"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="timeline-sidebar">
        <div className="timeline-dot-wrap">
          <TimelineDot index={index} isActive={isInView} />
        </div>
        <div className="timeline-year-block">
          <h3 className={`timeline-year ${isInView ? "" : "timeline-year--inactive"}`}>
            {item.year}
          </h3>
          <span className={`timeline-month ${isInView ? "" : "timeline-month--inactive"}`}>
            {item.month}
          </span>
        </div>
      </div>

      <div className="timeline-body">
        <div className="timeline-mobile-meta">
          <h3 className="timeline-mobile-year">{item.year}</h3>
          <span className={`timeline-month ${isInView ? "" : "timeline-month--inactive"}`}>
            {item.month}
          </span>
        </div>
        <motion.div
          className={`timeline-content-card draw-border-host ${isInView ? "" : "timeline-content-card--dim"}`}
          initial={{ opacity: 0.7, y: 12 }}
          animate={{
            opacity: isInView ? 1 : 0.72,
            y: isInView ? 0 : 4,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <DrawBorder radius={8} />
          <div className="timeline-content-inner">{item.content}</div>
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
    <div className="timeline-shell w-full font-sans px-0 sm:px-2 md:px-10" ref={containerRef}>
      <TextHeader text="Timeline" />

      <div className="timeline-intro px-1 sm:px-4 md:px-6" data-aos="fade-up" data-aos-delay="100">
        <p className="timeline-intro-lead">
          <TextAnimate animation="blurIn" duration={1} as="span" className="text-center">
            This timeline showcases my journey from being a student to starting my professional career, highlighting the key experiences and milestones along the way.
          </TextAnimate>
        </p>
      </div>

      <div ref={ref} className="timeline-track px-1 sm:px-4 md:px-8 lg:px-12">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
        <div
          style={{ height: height + "px" }}
          className="timeline-rail"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="timeline-rail-progress"
          />
        </div>
      </div>
    </div>
  );
};
