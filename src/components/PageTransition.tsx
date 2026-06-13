import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simple routing & transition context to work seamlessly inside our React Vite environment
interface TransitionContextProps {
  currentPath: string;
  navigate: (path: string) => void;
  isPending: boolean;
}

const TransitionContext = createContext<TransitionContextProps>({
  currentPath: "#home",
  navigate: () => {},
  isPending: false,
});

export function useTransitionRouter() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState("#home");
  const [isPending, setIsPending] = useState(false);

  // Synchronize hash paths if user reloads or clicks custom identifiers
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#home";
      setCurrentPath(hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    // Parse initial route
    if (window.location.hash) {
      setCurrentPath(window.location.hash);
    }
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath) return;
    setIsPending(true);
    
    // Smooth timing delay to let the truck cover center-screen before swapping content
    setTimeout(() => {
      window.location.hash = path;
      setCurrentPath(path);
      setIsPending(false);
      window.scrollTo({ top: 0, behavior: "instant" as any });
    }, 250); // Midpoint of 500ms transition
  };

  return (
    <TransitionContext.Provider value={{ currentPath, navigate, isPending }}>
      {children}
    </TransitionContext.Provider>
  );
}

export default function PageTransition({
  children,
  routeKey
}: {
  children: React.ReactNode;
  routeKey: string;
}) {
  const { isPending } = useTransitionRouter();
  const [localDriving, setLocalDriving] = useState(false);

  // Preload truck image for instantaneous rendering on start
  useEffect(() => {
    const img = new Image();
    img.src = "/images/zz-truck.png";
  }, []);

  // Sync state so that truck drives active over the entire 500ms transition stretch
  useEffect(() => {
    if (isPending) {
      setLocalDriving(true);
    } else {
      const timer = setTimeout(() => {
        setLocalDriving(false);
      }, 250); // Buffer to let truck exit off-screen (250ms pending + 250ms buffer = 500ms total)
      return () => clearTimeout(timer);
    }
  }, [isPending]);

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const transition = {
    duration: 0.3,
    ease: 'easeInOut',
  };

  return (
    <div className="relative w-full overflow-hidden min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={routeKey}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          className="w-full flex-grow flex flex-col min-h-screen"
          style={{
            backgroundColor: '#0A0A0A',
            minHeight: '100vh',
            willChange: 'opacity',
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Truck Silhouette & Road sweep visual effect */}
      <AnimatePresence>
        {localDriving && (
          <div className="fixed inset-0 z-[9999] pointer-events-none">
            {/* The primary sweeping gold road line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.5, ease: "linear" }}
              className="fixed top-1/2 left-0 right-0 h-[4px] bg-[#F5A623] z-[9998] pointer-events-none origin-left shadow-[0_0_8px_#F5A623]"
              style={{ transform: "translateY(160px)" }}
            />

            {/* A second thinner gold road line with offset for double road line effect */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.5, ease: "linear" }}
              className="fixed top-1/2 left-0 right-0 h-[2px] bg-[#F5A623]/80 z-[9998] pointer-events-none origin-left shadow-[0_0_4px_#F5A623]"
              style={{ transform: "translateY(180px)" }}
            />

            {/* Subtle dark layout overlay sweep */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.35, 0] }}
              transition={{ duration: 0.5, ease: "linear" }}
              className="fixed inset-0 bg-[#0D1B2A] z-[9997] pointer-events-none"
            />

            {/* Real truck silhouette streaking across the screen at full scale */}
            <motion.div
              initial={{ x: "110vw" }}
              animate={{ x: "-50vw" }}
              transition={{ duration: 0.5, ease: "linear" }}
              className="fixed top-1/2 left-0 z-[9999] pointer-events-none flex items-center justify-center"
              style={{
                transform: "translateY(-50%)",
                height: "320px",
                width: "auto"
              }}
            >
              <div className="relative h-full flex items-center">
                {/* Gold flare backdrop */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F5A623]/20 via-[#F5A623]/5 to-transparent blur-md h-full w-full rounded" />
                <img
                  src="/images/zz-truck.png"
                  alt="Truck Silhouette"
                  className="h-full w-auto object-contain select-none pointer-events-none"
                  style={{
                    filter: "blur(4px) brightness(0.9)"
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
