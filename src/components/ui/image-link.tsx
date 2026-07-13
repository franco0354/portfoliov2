"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageLinkProps {
  src: string | string[] | StaticImageData | StaticImageData[];
  alt: string | string[];
  className?: string;
  linkText?: string;
  showImage?: boolean;
}

export function ImageLink({
  src,
  alt,
  className = "",
  linkText = "View Image",
  showImage = false,
}: ImageLinkProps) {
  const [isImageVisible, setIsImageVisible] = useState(showImage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const imageSources = Array.isArray(src) ? src : [src];
  const imageAlts = Array.isArray(alt) ? alt : [alt];
  const isMultipleImages = imageSources.length > 1;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const toggleImageVisibility = () => {
    if (!isImageVisible) {
      setIsImageVisible(true);
      setIsModalOpen(true);
    } else {
      setIsImageVisible(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsImageVisible(false);
    setCurrentImageIndex(0);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % imageSources.length);
  }, [imageSources.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + imageSources.length) % imageSources.length
    );
  }, [imageSources.length]);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowRight" && isMultipleImages) nextImage();
      if (event.key === "ArrowLeft" && isMultipleImages) prevImage();
    };

    document.body.classList.add("overflow-hidden");
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, isMultipleImages, closeModal, nextImage, prevImage]);

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={toggleImageVisibility}
        className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-foreground/4 px-4 py-2 text-sm font-medium text-foreground/80 ring-1 ring-foreground/10 transition-all duration-300 hover:bg-foreground/7 hover:text-foreground hover:ring-foreground/20 dark:bg-white/6 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:ring-white/20"
      >
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-foreground/6 to-transparent transition-transform duration-700 group-hover:translate-x-full dark:via-white/8" />
        <Expand
          size={14}
          className="relative shrink-0 text-primary transition-transform duration-300 group-hover:scale-110"
        />
        <span className="relative">{linkText}</span>
        <ArrowUpRight
          size={13}
          className="relative shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-70"
        />
      </button>

      {isImageVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={openModal}
          className="group/preview relative mt-3 block w-full max-w-full overflow-hidden rounded-2xl ring-1 ring-foreground/10 transition-all duration-300 hover:ring-foreground/20 dark:ring-white/10 dark:hover:ring-white/20"
        >
          <Image
            src={imageSources[currentImageIndex]}
            alt={imageAlts[currentImageIndex]}
            className={cn(
              "h-auto w-full max-w-full object-cover transition-transform duration-500 group-hover/preview:scale-[1.03]",
              className
            )}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover/preview:bg-black/25">
            <span className="flex scale-90 items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-900 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover/preview:scale-100 group-hover/preview:opacity-100">
              <Expand size={12} />
              Expand
            </span>
          </div>
        </motion.button>
      )}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-50 flex flex-col"
              >
                <motion.button
                  type="button"
                  aria-label="Close image viewer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-neutral-950/80 backdrop-blur-2xl"
                  onClick={closeModal}
                />

                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"
                  aria-hidden
                />

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full bg-white/10 text-white/90 ring-1 ring-white/20 backdrop-blur-xl transition-all duration-200 hover:bg-white/20 hover:text-white sm:right-6 sm:top-6"
                >
                  <X size={18} />
                </button>

                {isMultipleImages && (
                  <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 sm:top-6">
                    <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/15 backdrop-blur-xl">
                      {imageSources.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`Go to image ${index + 1}`}
                          className="relative flex h-2 items-center"
                        >
                          <span
                            className={cn(
                              "block h-1.5 rounded-full bg-white/40 transition-all duration-300",
                              index === currentImageIndex
                                ? "w-5 bg-white"
                                : "w-1.5 hover:bg-white/70"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-16 sm:px-12">
                  {isMultipleImages && (
                    <>
                      <button
                        type="button"
                        onClick={prevImage}
                        aria-label="Previous image"
                        className="absolute left-3 z-20 flex size-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:bg-white/20 sm:left-6"
                      >
                        <ChevronLeft size={22} />
                      </button>
                      <button
                        type="button"
                        onClick={nextImage}
                        aria-label="Next image"
                        className="absolute right-3 z-20 flex size-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:bg-white/20 sm:right-6"
                      >
                        <ChevronRight size={22} />
                      </button>
                    </>
                  )}

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="relative max-h-[72vh] w-full max-w-5xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        src={imageSources[currentImageIndex]}
                        alt={imageAlts[currentImageIndex]}
                        className="mx-auto max-h-[72vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="relative z-20 px-4 pb-6 sm:px-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mx-auto flex max-w-5xl flex-col items-center gap-4">
                    <div className="rounded-2xl bg-white/8 px-4 py-2.5 text-center ring-1 ring-white/12 backdrop-blur-xl">
                      <p className="text-sm font-medium text-white/95">
                        {imageAlts[currentImageIndex]}
                      </p>
                      {isMultipleImages && (
                        <p className="mt-0.5 text-xs text-white/50">
                          {currentImageIndex + 1} / {imageSources.length}
                        </p>
                      )}
                    </div>

                    {isMultipleImages && (
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {imageSources.map((imageSrc, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentImageIndex(index)}
                            aria-label={`View ${imageAlts[index]}`}
                            aria-current={
                              index === currentImageIndex ? "true" : undefined
                            }
                            className={cn(
                              "relative h-14 w-18 shrink-0 overflow-hidden rounded-xl ring-2 transition-all duration-300 sm:h-16 sm:w-24",
                              index === currentImageIndex
                                ? "scale-105 ring-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]"
                                : "ring-transparent opacity-50 hover:scale-105 hover:opacity-80"
                            )}
                          >
                            <Image
                              src={imageSrc}
                              alt={imageAlts[index]}
                              className="h-full w-full object-cover"
                            />
                            {index === currentImageIndex && (
                              <span className="absolute inset-0 ring-1 ring-inset ring-white/30" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
