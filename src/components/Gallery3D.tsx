import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  url: string;
  category: string;
  caption: string;
}

export const images: GalleryItem[] = [
  {
    url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&q=60',
    category: 'FLEET',
    caption: 'ZZ Transport truck ZZ7 ready for container movements'
  },
  {
    url: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=400&q=60',
    category: 'OCEAN FREIGHT',
    caption: 'Container ship freight operations — Fremantle wharf'
  },
  {
    url: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400&q=60',
    category: 'AIR FREIGHT',
    caption: 'Air freight collection and delivery — express service'
  },
  {
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=60',
    category: 'STORAGE',
    caption: 'Unpack, store and transportation solutions'
  },
  {
    url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400&q=60',
    category: 'CONTAINER',
    caption: 'Container terminal operations — Perth Metro area'
  },
];

interface Gallery3DProps {
  compact?: boolean;
}

export default function Gallery3D({ compact = false }: Gallery3DProps) {
  const total = images.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rotationTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardWidth = isMobile ? (window.innerWidth - 32) : (compact ? 280 : 420);
  const cardHeight = isMobile ? 160 : (compact ? 160 : 240);

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
      className="relative overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        marginLeft: '0',
        padding: isMobile ? '0' : (compact ? '0' : '20px 0 40px 0'),
        background: compact ? 'transparent' : '#0A0A0A',
        marginTop: '0px',
      }}
    >
      {/* Thin gold separator line - Hidden in compact mode */}
      {!compact && <div style={{
        width: '100%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, #F5A623, transparent)',
        marginBottom: '0',
      }}/>}

      {/* 3D stage container */}
      <div 
        className="relative w-full"
        style={{
          height: isMobile ? '160px' : (compact ? '180px' : '260px'),
          display: 'flex',
          justifyContent: 'center',
          perspective: isMobile ? '600px' : '1200px',
        }}
      >
        {/* Carousel Ring */}
        <div 
          className="relative w-full h-full"
          style={{ 
            transition: 'transform 0.8s',
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
              scaleValue = 0.7; 
              opacityValue = 0.5;
              zIndexValue = 20;
              filterValue = "blur(1px)";
            } else if (diff === 2) {
              scaleValue = 0.55; 
              opacityValue = 0.35;
              zIndexValue = 10;
              filterValue = "blur(2px)";
            } else {
              scaleValue = 0.35;
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
                  display: isMobile ? (isActive ? 'block' : 'none') : 'block',
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  marginLeft: `${-(cardWidth / 2)}px`,
                  marginTop: `${-(cardHeight / 2)}px`,
                  // True 3D projection placement using rotateY & translateZ
                  transform: `rotateY(${itemAngle}deg) translateZ(${isMobile ? 250 : 400}px) scale(${scaleValue})`,
                  opacity: opacityValue,
                  zIndex: zIndexValue,
                  backfaceVisibility: "visible",
                }}
              >
                {/* Visual card */}
                <div 
                  className={`relative w-full h-full overflow-hidden border transition-all duration-500 bg-[#111111] ${
                    isActive 
                      ? "border-[#F5A623] shadow-[0_0_30px_rgba(245,166,35,0.4)]" 
                      : "border-[#1F1F1F]"
                  }`}
                  style={{ 
                    filter: filterValue,
                    borderRadius: '12px'
                  }}
                >
                  {/* Actual image */}
                  <img
                    src={item.url}
                    alt={item.caption}
                    loading="lazy"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center center',
                    }}
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

      {/* Fix 2: Navigation controls positioned relatively BELOW the 3D stage */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: isMobile ? '0px' : '16px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Arrow buttons container */}
        <div style={{ display: 'flex', gap: '16px' }}>
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
        <div 
          className="flex items-center gap-2.5" 
          style={{ marginTop: '12px' }}
          id="gallery-dots-container"
        >
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
