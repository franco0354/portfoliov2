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
import { usePageState } from "@/hooks/usePageState";
import Navbar from "./Components/Navbar/navbar";
import TimelinePage from "./Components/TimeLine/page";
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400']
})

const sectionClass =
  "scroll-mt-14 sm:scroll-mt-16 bg-section px-4 py-8 sm:px-6 sm:py-10 md:p-10";

export default function Page() {
  const { isLoading, isOverInput } = usePageState();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <div className={`${nunito.className} overflow-x-hidden`}>
      {isLoading && (
        <Loading />
      )}
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
          <section id="Home" className={sectionClass}>
            <Home />
          </section>

          <section id="About" className={sectionClass}>
            <About />
          </section>

          <section id="Project" className={sectionClass}>
            <Project />
          </section>
          <section id="Timeline" className={`min-h-screen bg-section-alt px-4 py-10 sm:px-6 sm:py-12 md:p-10 scroll-mt-14 sm:scroll-mt-16`}>
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
