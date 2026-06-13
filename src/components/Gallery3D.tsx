import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  url: string;
  category: string;
  caption: string;
}

export default function Gallery3D() {
  const images: GalleryItem[] = [
    {
      url: "https://static.wixstatic.com/media/ee3796_eb9aac8927e247ab8af6141a111a4005.jpg",
      category: "FLEET",
      caption: "ZZ Transport truck ZZ7 ready for container movements"
    },
    {
      url: "https://static.wixstatic.com/media/41d000_bfd692b5db3dbcbcc774fe90af9bcbc1.jpg",
      category: "OCEAN FREIGHT",
      caption: "Container ship freight operations — Fremantle wharf"
    },
    {
      url: "https://static.wixstatic.com/media/41d000_bd769439b7c0e9104c161bcbd6d72d9c.jpg",
      category: "AIR FREIGHT",
      caption: "Air freight collection and delivery — express service"
    },
    {
      url: "https://static.wixstatic.com/media/ee3796_596c6a435d434e66b90f8c436061664a.jpg",
      category: "STORAGE",
      caption: "Unpack, store and transportation solutions"
    },
    {
      url: "https://static.wixstatic.com/media/e2fc3825ed844c21af29770585d109f8.jpg",
      category: "CONTAINER",
      caption: "Container terminal operations — Perth Metro area"
    },
    {
      url: "https://static.wixstatic.com/media/13374f8d1c11d68fbb4c4a4fb9fb0f95.jpg",
      category: "CARGO",
      caption: "Cargo handling — specialist freight solutions"
    },
    {
      url: "https://static.wixstatic.com/media/c2a2be60ae6e1e97e231ddde94d28e16.jpg",
      category: "OCEAN FREIGHT",
      caption: "International cargo ship — container logistics"
    }
  ];

  const total = images.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const rotationTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate logic: rotates every 3 seconds
  useEffect(() => {
    if (!isHovered) {
      rotationTimer.current = setInterval(() => {
        handleNext();
      }, 3000);
    }
    return () => {
      if (rotationTimer.current) {
        clearInterval(rotationTimer.current);
      }
    };
  }, [isHovered, activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handleDotClick = (idx: number) => {
    setActiveIndex(idx);
  };

  const angleStep = 360 / total;

  return (
    <div 
      className="relative w-full h-[280px] sm:h-[340px] overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D stage container */}
      <div 
        className="relative w-full h-[220px] sm:h-[280px] flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {/* Carousel Ring */}
        <div 
          className="relative w-full h-full transition-transform duration-800"
          style={{ 
            transformStyle: "preserve-3d",
            transform: `rotateY(${-activeIndex * angleStep}deg)` 
          }}
        >
          {images.map((item, index) => {
            // Distance calculations for scale/opacity styling overrides
            let diff = Math.abs(index - activeIndex);
            if (diff > total / 2) {
              diff = total - diff;
            }

            const isActive = index === activeIndex;
            
            // Set styles based on index proximity (diff) to the front active element
            let scaleValue = 1.0;
            let opacityValue = 1.0;
            let zIndexValue = 10;
            let filterValue = "blur(0px)";

            if (diff === 0) {
              scaleValue = 1.0;
              opacityValue = 1.0;
              zIndexValue = 30;
              filterValue = "none";
            } else if (diff === 1) {
              scaleValue = 0.85;
              opacityValue = 0.70;
              zIndexValue = 20;
              filterValue = "blur(1px)";
            } else if (diff === 2) {
              scaleValue = 0.65;
              opacityValue = 0.40;
              zIndexValue = 10;
              filterValue = "blur(2px)";
            } else {
              scaleValue = 0.45;
              opacityValue = 0.15;
              zIndexValue = 5;
              filterValue = "blur(4px)";
            }

            const itemAngle = index * angleStep;

            return (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 transition-all duration-800"
                style={{
                  width: "240px",
                  height: "160px",
                  marginLeft: "-120px",
                  marginTop: "-80px",
                  transformStyle: "preserve-3d",
                  // True 3D projection placement using rotateY & translateZ
                  transform: `rotateY(${itemAngle}deg) translateZ(260px) scale(${scaleValue})`,
                  opacity: opacityValue,
                  zIndex: zIndexValue,
                  backfaceVisibility: "visible",
                }}
              >
                {/* Visual card */}
                <div 
                  className={`relative w-full h-full rounded-xl overflow-hidden border transition-all duration-500 bg-[#111111] ${
                    isActive 
                      ? "border-[#F5A623] shadow-[0_0_30px_rgba(245,166,35,0.4)]" 
                      : "border-[#1F1F1F]"
                  }`}
                  style={{ filter: filterValue }}
                >
                  {/* Actual image */}
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient underlying dark overlay to read the text with high contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-5" />

                  {/* Text labels absolute over content */}
                  <div className="absolute inset-x-0 bottom-0 p-3 text-left z-10">
                    <span className="inline-block bg-[#F5A623] text-black text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-white font-sans font-bold text-[10px] sm:text-xs tracking-wide leading-snug">
                      {item.caption}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation overlay controls - Positioned absolute at bottom to prevent layout bleed */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-center gap-3"
        style={{ marginBottom: '8px' }}
      >
        
        {/* Chevrons container */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623] hover:text-black hover:shadow-lg transition-all duration-300 flex items-center justify-center active:scale-90 cursor-pointer"
            aria-label="Previous image"
            id="gallery-prev-btn"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623] hover:text-black hover:shadow-lg transition-all duration-300 flex items-center justify-center active:scale-90 cursor-pointer"
            aria-label="Next image"
            id="gallery-next-btn"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dot indicators below */}
        <div className="flex items-center gap-2.5" id="gallery-dots-container">
          {images.map((_, idx) => {
            const isDotActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isDotActive 
                    ? "w-7 bg-[#F5A623] shadow-md shadow-[#F5A623]/25" 
                    : "w-2.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                id={`gallery-dot-${idx}`}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
}
