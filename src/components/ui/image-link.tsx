"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

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
  showImage = false 
}: ImageLinkProps) {
  const [isImageVisible, setIsImageVisible] = useState(showImage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Normalize to arrays for consistent handling
  const imageSources = Array.isArray(src) ? src : [src];
  const imageAlts = Array.isArray(alt) ? alt : [alt];
  const isMultipleImages = imageSources.length > 1;

  const toggleImageVisibility = () => {
    if (!isImageVisible) {
      // If image is not visible, show it and open modal directly
      setIsImageVisible(true);
      setIsModalOpen(true);
    } else {
      // If image is visible, just hide it
      setIsImageVisible(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsImageVisible(false);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageSources.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageSources.length) % imageSources.length);
  };

  return (
    <div className="">
      {/* Toggle Link */}
      <button
        onClick={toggleImageVisibility}
        className="text-gray-600 dark:text-accent-foreground hover:text-gray-800 underline cursor-pointer transition-colors"
      >
        {linkText}
      </button>

      {/* Image Display */}
      {isImageVisible && (
        <div className="relative mt-2 w-full max-w-full overflow-hidden">
          <Image
            src={imageSources[currentImageIndex]}
            alt={imageAlts[currentImageIndex]}
            className={`w-full max-w-full h-auto cursor-pointer transition-transform hover:scale-105 ${className}`}
            onClick={openModal}
          />
        </div>
      )}

      {/* Modal for enlarged image */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-6xl max-h-full w-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
            
            {/* Navigation arrows for multiple images */}
            {isMultipleImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  ›
                </button>
              </>
            )}

            {/* Image counter for multiple images */}
            {isMultipleImages && (
              <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full z-10">
                {currentImageIndex + 1} / {imageSources.length}
              </div>
            )}

            <Image
              src={imageSources[currentImageIndex]}
              alt={imageAlts[currentImageIndex]}
              className="max-w-full max-h-full object-contain rounded-lg mx-auto"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
