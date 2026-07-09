"use client"
import React, { useEffect, useState } from "react";
import { Nunito } from "next/font/google";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Project from "./Components/Project/Project";
import Contact from "./Components/Contact/Contact";
import Footer from "@/components/spectrumui/footer";
import { Spotlight } from "../../components/motion-primitives/spotlight";
import { MouseIcon } from "../app/page-data";
import { Cursor } from "../../components/motion-primitives/cursor";
import Loading from "@/components/loading";
import { AnimatePresence } from "motion/react";
import { usePageState } from "@/hooks/usePageState";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Navbar from "./Components/Navbar/navbar";
import "lenis/dist/lenis.css";
import TimelinePage from "./Components/TimeLine/page";
import Image from "next/image";
import profilebackground from "@/app/assets/img/backgroundprofile.jpg";
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400']
})

const sectionClass =
  "scroll-mt-14 sm:scroll-mt-16 px-4 py-8 sm:px-6 sm:py-10 md:p-10 text-white dark:bg-section dark:text-foreground";

export default function Page() {
  const { isLoading, isOverInput } = usePageState();
  const [isTouch, setIsTouch] = useState(false);

  useSmoothScroll({ enabled: !isLoading });

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <div className={`${nunito.className} overflow-x-hidden`}>
      <AnimatePresence mode="wait">
        {isLoading && <Loading key="portfolio-loading" />}
      </AnimatePresence>
      <Spotlight
        className='bg-primary/30 dark:bg-primary/20 blur-3xl'
        size={64}
        springOptions={{
          bounce: 0.3,
          duration: 0.1,
        }}
      />
      {!isTouch && (
        <Cursor
          attachToParent
          variants={{
            initial: { scale: 0.3, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.3, opacity: 0 },
          }}
          transition={{
            ease: 'easeInOut',
            duration: 0.15,
          }}
          className=' z-50'
        >
          {!isOverInput && (
            <div>
              <MouseIcon className='h-6 w-6' />
            </div>
          )}
        </Cursor>
      )}
      <Navbar />
      <div className="relative z-20 pt-14 sm:pt-16 max-md:text-justify">
        <div>
          <section id="Home" className={`${sectionClass} relative overflow-hidden !py-0 h-[calc(100svh-3.5rem)] sm:h-[calc(100svh-4rem)] min-h-[36rem]`}>
            <Image
              src={profilebackground}
              alt=""
              aria-hidden="true"
              fill
              priority
              className="object-cover object-top pointer-events-none scale-110   md:translate-x-[18%] lg:translate-x-[28%] xl:translate-x-[34%]"
            />
            {/* Flat green opacity over the photo — same green, opacity only */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none bg-[oklch(0.18_0.05_148)]/75 dark:bg-black/75"
            />
            {/* Left → right fade — desktop only */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none hidden md:block dark:hidden"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.18 0.05 148) 0%, oklch(0.18 0.05 148) 42%, oklch(0.18 0.05 148 / 0.7) 58%, transparent 78%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none hidden dark:md:block"
              style={{
                background:
                  "linear-gradient(to right, rgb(0 0 0) 0%, rgb(0 0 0) 42%, rgb(0 0 0 / 0.7) 58%, transparent 78%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-[oklch(0.18_0.05_148)] via-[oklch(0.18_0.05_148)]/70 to-transparent dark:from-black dark:via-black/70"
            />
            <div className="relative h-full w-full z-10 home-on-photo px-4 sm:px-6 md:px-10">
              <Home />
            </div>
          </section>

          <section id="About" className={sectionClass}>
            <About />
          </section>

          <section id="Project" className={sectionClass}>
            <Project />
          </section>
          <section
            id="Timeline"
            className="min-h-screen scroll-mt-14 sm:scroll-mt-16 px-4 py-10 sm:px-6 sm:py-12 md:p-10 text-white dark:bg-section-alt dark:text-foreground"
          >
            <TimelinePage />
          </section>
          <section id="Contact" className={sectionClass}>
            <Contact />
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
