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
import { useAos } from "@/hooks/useAos";
import Navbar from "./Components/Navbar/navbar";
import "lenis/dist/lenis.css";
import TimelinePage from "./Components/TimeLine/page";
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400']
})

const sectionClass =
  "scroll-mt-14 sm:scroll-mt-16 px-4 py-8 sm:px-6 sm:py-10 md:p-10 text-foreground";

export default function Page() {
  const { isLoading, isOverInput } = usePageState();
  const [isTouch, setIsTouch] = useState(false);

  useSmoothScroll({ enabled: !isLoading });
  useAos({ enabled: !isLoading });

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <div className={`${nunito.className} overflow-x-hidden`}>
      <AnimatePresence mode="wait">
        {isLoading && <Loading key="portfolio-loading" />}
      </AnimatePresence>
      <Spotlight
        className='bg-primary/30 blur-3xl'
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
      <div className="relative z-20 pt-14 sm:pt-16 max-md:[&_section:not(#Home)]:text-justify">
        <div>
          <section id="Home" className={`${sectionClass} relative flex flex-col overflow-x-hidden !py-0 h-auto min-h-[calc(100svh-3.5rem)] sm:min-h-[calc(100svh-4rem)] md:h-[calc(100svh-4rem)] md:min-h-0 md:overflow-hidden`}>
            <div className="relative z-10 flex flex-1 flex-col min-h-0 w-full min-w-0 max-w-full px-4 sm:px-6 md:px-10">
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
            className="min-h-screen scroll-mt-14 sm:scroll-mt-16 px-4 py-10 sm:px-6 sm:py-12 md:p-10 text-foreground"
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
