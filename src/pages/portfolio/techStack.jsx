import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, useAnimation } from "framer-motion";

// Constants
const FINAL_STATS = {
  years: 4,
  shipped: 27,
  nps: 96,
};

const ANIMATION_CONFIGS = {
  years: { duration: 2800, delay: 600 },
  shipped: { duration: 3200, delay: 1000 },
  nps: { duration: 2500, delay: 1400 },
};

const TECH_STACK = [
  {
    name: "React",
    icon: "⚛︎",
    accent: "from-blue-400 via-cyan-300 to-blue-500",
  },
  {
    name: "Dot Net",
    icon: ".N",
    accent: "from-[#512BD4] via-[#8661C5] to-indigo-500",
  },
  {
    name: "Next.js",
    icon: "△",
    accent: "from-gray-700 via-gray-500 to-white",
  },
  {
    name: "Tailwind CSS",
    icon: "◇",
    accent: "from-teal-400 via-cyan-300 to-blue-400",
  },
  {
    name: "Node.js",
    icon: "◈",
    accent: "from-green-400 via-emerald-300 to-green-500",
  },
  {
    name: "MongoDB",
    icon: "⸙",
    accent: "from-green-500 via-green-400 to-cyan-400",
  },
  {
    name: "Render",
    icon: "⚡︎",
    accent: "from-indigo-500 via-purple-400 to-blue-500",
  },
  {
    name: "Firebase",
    icon: "🔥",
    accent: "from-yellow-400 via-orange-500 to-yellow-500",
  },
  {
    name: "AWS",
    icon: "☁",
    accent: "from-orange-400 via-amber-300 to-yellow-400",
  },
  {
    name: "Vercel",
    icon: "▲",
    accent: "from-gray-800 via-gray-600 to-gray-400",
  },
];

const INTERSECTION_THRESHOLD = 0.2;

// Memoized Components with Ken Burns Effect
const TechCard = React.memo(({ tech, index }) => {
  const controls = useAnimation();

  return (
    <motion.div
      className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8 lg:mx-12 group cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
      onHoverStart={() => {
        controls.start({
          scale: 1.15,
          rotate: [0, 2, -2, 0],
          transition: { duration: 0.5 }
        });
      }}
      onHoverEnd={() => {
        controls.start({
          scale: 1,
          rotate: 0,
          transition: { duration: 0.3 }
        });
      }}
    >
      <div className="relative">
        <motion.div
          className={`absolute -inset-3 sm:-inset-4 md:-inset-6 bg-gradient-to-r ${tech.accent} opacity-0 group-hover:opacity-20 blur-xl sm:blur-2xl rounded-2xl sm:rounded-3xl transition-all duration-700`}
          animate={{
            opacity: [0, 0.2, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="relative transition-all duration-500"
          animate={controls}
          whileHover={{
            boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)",
          }}
        >
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 group-hover:border-white/20 transition-all duration-500 overflow-hidden">
            {/* Ken Burns Effect Background */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-10"
              animate={{
                scale: [1, 1.1, 1],
                x: [0, 10, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: `radial-gradient(circle at center, ${tech.accent.split(' ')[1]}, transparent)`
              }}
            />

            <motion.div 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 md:mb-6 text-center relative z-10"
              whileHover={{
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.6 }
              }}
            >
              <span
                className={`bg-gradient-to-r ${tech.accent} bg-clip-text text-transparent font-bold`}
              >
                {tech.icon}
              </span>
            </motion.div>

            <div className="text-center relative z-10">
              <motion.div 
                className="text-white/90 text-sm sm:text-base md:text-lg font-light tracking-wide mb-1 sm:mb-2"
                whileHover={{ scale: 1.1 }}
              >
                {tech.name}
              </motion.div>
              <motion.div
                className={`w-8 sm:w-10 md:w-12 h-px bg-gradient-to-r ${tech.accent} mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
                animate={{
                  scaleX: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

TechCard.displayName = "TechCard";

const StatCard = React.memo(
  ({
    value,
    label,
    description,
    gradientClass,
    accentColor,
    showPlus = true,
    showPercent = false,
  }) => (
    <motion.div 
      className="relative group text-center"
      whileHover={{
        scale: 1.05,
        rotateY: 10,
        rotateX: 5,
        z: 50,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <motion.div
        className={`absolute -inset-4 sm:-inset-6 md:-inset-8 bg-gradient-to-r ${accentColor} blur-2xl sm:blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div 
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(30px)"
        }}
      >
        <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
          <div
            className={`w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent ${
              accentColor.split(" ")[1]
            }/60 to-transparent`}
          />
        </div>

        <div className="relative mb-4 sm:mb-6 md:mb-8">
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-thin tracking-tighter">
            <span
              className={`bg-gradient-to-b ${gradientClass} bg-clip-text text-transparent`}
            >
              {value}
            </span>
          </div>
          {showPlus && (
            <div
              className={`absolute -top-2 sm:-top-3 md:-top-4 -right-2 sm:-right-3 md:-right-4 text-xl sm:text-2xl md:text-3xl ${
                accentColor.split(" ")[1]
              }/80 font-light`}
            >
              +
            </div>
          )}
          {showPercent && (
            <div
              className={`absolute -top-1 sm:-top-2 -right-3 sm:-right-4 md:-right-6 text-2xl sm:text-3xl md:text-4xl ${
                accentColor.split(" ")[1]
              }/80 font-thin`}
            >
              %
            </div>
          )}
        </div>

        <div className="space-y-2 sm:space-y-3">
          <div className="text-white/90 text-base sm:text-lg md:text-xl font-thin tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            {label}
          </div>
          <div className="text-white/40 text-xs sm:text-sm font-extralight tracking-wide sm:tracking-wider">
            {description}
          </div>
        </div>

        <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
          <div
            className={`w-4 sm:w-6 md:w-8 h-px bg-gradient-to-r from-transparent ${
              accentColor.split(" ")[1]
            }/40 to-transparent`}
          />
        </div>
      </motion.div>
    </motion.div>
  )
);

StatCard.displayName = "StatCard";

const MarqueeCard = React.memo(({ tech, index }) => (
  <div
    key={`marquee-${tech.name}-${index}`}
    className="flex-shrink-0 group cursor-pointer"
  >
    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm group-hover:bg-white/5 group-hover:border-white/10 transition-all duration-500">
      <div
        className={`text-lg sm:text-xl md:text-2xl bg-gradient-to-r ${tech.accent} bg-clip-text text-transparent font-bold`}
      >
        {tech.icon}
      </div>
      <div className="text-white/70 text-xs sm:text-sm font-light tracking-wide group-hover:text-white/90 transition-colors duration-300">
        {tech.name}
      </div>
    </div>
  </div>
));

MarqueeCard.displayName = "MarqueeCard";

const TechWeLove = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animatedStats, setAnimatedStats] = useState({
    years: 0,
    shipped: 0,
    nps: 0,
  });
  const [windowWidth, setWindowWidth] = useState(0);

  const sectionRef = useRef(null);
  const animationRefs = useRef({});

  // Memoize extended tech stack to prevent recreation
  const extendedStack = useMemo(
    () => [...TECH_STACK, ...TECH_STACK, ...TECH_STACK],
    []
  );

  // Handle window resize for responsive background
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  // Memoized dynamic background style
  const dynamicBackgroundStyle = useMemo(
    () => ({
      background: `radial-gradient(${
        windowWidth > 768 ? "1200px" : "600px"
      } circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
      rgba(120, 53, 15, 0.1) 0%, 
      rgba(124, 45, 18, 0.05) 25%,
      transparent 50%)`,
    }),
    [mousePosition.x, mousePosition.y, windowWidth]
  );

  // Optimized counter animation
  const animateCounter = useCallback((key, target, duration, delay = 0) => {
    // Clear existing animation
    if (animationRefs.current[key]) {
      cancelAnimationFrame(animationRefs.current[key]);
    }

    setTimeout(() => {
      const startTime = Date.now();

      const updateValue = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const value = Math.floor(target * easeOut);

        setAnimatedStats((prev) => ({ ...prev, [key]: value }));

        if (progress < 1) {
          animationRefs.current[key] = requestAnimationFrame(updateValue);
        } else {
          delete animationRefs.current[key];
        }
      };

      animationRefs.current[key] = requestAnimationFrame(updateValue);
    }, delay);
  }, []);

  // Intersection observer effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      observer.disconnect();
      // Cleanup animation frames
      Object.values(animationRefs.current).forEach((id) => {
        if (id) cancelAnimationFrame(id);
      });
    };
  }, [isVisible]);

  // Stats animation effect
  useEffect(() => {
    if (!isVisible) return;

    Object.entries(ANIMATION_CONFIGS).forEach(([key, config]) => {
      animateCounter(key, FINAL_STATS[key], config.duration, config.delay);
    });
  }, [isVisible, animateCounter]);

  const statsData = useMemo(
    () => [
      {
        value: animatedStats.years,
        label: "Years",
        description: "of dedicated craftsmanship",
        gradientClass: "from-amber-200 via-amber-400 to-amber-600",
        accentColor: "from-amber-500/10 via-orange-400/5 to-amber-500/10",
        showPlus: true,
      },
      {
        value: animatedStats.shipped,
        label: "Projects",
        description: "successfully delivered",
        gradientClass: "from-rose-200 via-rose-400 to-rose-600",
        accentColor: "from-rose-500/10 via-pink-400/5 to-rose-500/10",
        showPlus: true,
      },
      {
        value: animatedStats.nps,
        label: "NPS Score",
        description: "client satisfaction rating",
        gradientClass: "from-violet-200 via-violet-400 to-violet-600",
        accentColor: "from-violet-500/10 via-purple-400/5 to-violet-500/10",
        showPercent: true,
      },
    ],
    [animatedStats]
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Sophisticated background layers */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30 transition-opacity duration-1000"
          style={dynamicBackgroundStyle}
        />

        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="absolute top-1/4 left-1/4 w-1 sm:w-2 h-1 sm:h-2 bg-gradient-to-r from-amber-400 to-orange-300 rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-gradient-to-r from-rose-400 to-pink-300 rounded-full opacity-80 animate-ping" />
        <div className="absolute bottom-1/4 left-1/3 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gradient-to-r from-violet-400 to-purple-300 rounded-full opacity-70" />
      </div>

      <div className="relative z-10 py-6 sm:py-8 md:py-12">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <div
              className={`transform transition-all duration-2000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 sm:translate-y-16 opacity-0"
              }`}
            >
              <div className="relative inline-flex items-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-violet-500/20 blur-lg sm:blur-xl rounded-full" />
                <div className="relative backdrop-blur-xl border border-white/10 rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4">
                  <span className="text-white/90 text-xs sm:text-sm font-thin tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                    Technology Stack
                  </span>
                </div>
              </div>

              <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-thin leading-none tracking-tighter mb-4 sm:mb-6 md:mb-8">
                <div className="relative inline-block">
                  <span className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-amber-400 via-rose-400 to-violet-400 blur-2xl sm:blur-3xl opacity-30" />
                  <span className="relative bg-gradient-to-r from-white via-amber-100 to-rose-100 bg-clip-text text-transparent">
                    TECHNOLOGY
                  </span>
                </div>
                <br />
                <span className="text-white/40 font-extralight">MASTERY</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 font-extralight max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                Curated excellence in modern development
              </p>
            </div>
          </div>

          {/* Tech Marquee */}
          <div
            className={`relative mb-16 sm:mb-20 md:mb-24 lg:mb-32 transform transition-all duration-2500 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 sm:translate-y-12 opacity-0"
            }`}
          >
            <div className="relative py-8 sm:py-12 md:py-16">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-4 sm:h-6 md:h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

              <div className="overflow-hidden">
                <div className="flex animate-luxuryMarquee">
                  {extendedStack.map((tech, index) => (
                    <TechCard
                      key={`${tech.name}-${index}`}
                      tech={tech}
                      index={index}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-4 sm:h-6 md:h-8 bg-gradient-to-t from-transparent via-white/20 to-transparent" />
            </div>
          </div>

          {/* Stats Section */}
          <div
            className={`transform transition-all duration-2000 delay-1000 mb-8 sm:mb-12 md:mb-15 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 sm:translate-y-16 opacity-0"
            }`}
          >
            <div className="relative">
              <div className="absolute top-1/2 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-y-1/2 hidden xl:block" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
                {statsData.map((stat, index) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="absolute bottom-0 left-0 right-0 py-6 sm:py-8 md:py-12 mt-6 sm:mt-8 md:mt-10">
        <div
          className={`transform transition-all duration-2500 delay-1500 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 sm:translate-y-8 opacity-0"
          }`}
        >
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-12 sm:w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-white/20" />
              <div className="w-1 sm:w-1.5 md:w-2 h-1 sm:h-1.5 md:h-2 bg-white/30 rounded-full" />
              <div className="w-12 sm:w-16 md:w-24 h-px bg-gradient-to-r from-white/20 via-white/20 to-transparent" />
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex animate-premiumMarquee space-x-4 sm:space-x-8 md:space-x-12 lg:space-x-16">
              {extendedStack.map((tech, index) => (
                <MarqueeCard
                  key={`bottom-${tech.name}-${index}`}
                  tech={tech}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes luxuryMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes premiumMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-luxuryMarquee {
          animation: luxuryMarquee 25s linear infinite;
        }

        .animate-premiumMarquee {
          animation: premiumMarquee 40s linear infinite;
        }

        .animate-luxuryMarquee:hover,
        .animate-premiumMarquee:hover {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .animate-luxuryMarquee {
            animation: luxuryMarquee 35s linear infinite;
          }
          .animate-premiumMarquee {
            animation: premiumMarquee 50s linear infinite;
          }
        }

        ::-webkit-scrollbar {
          width: 2px;
        }

        @media (min-width: 640px) {
          ::-webkit-scrollbar {
            width: 4px;
          }
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #fbbf24, #f59e0b);
          border-radius: 2px;
        }

        @media (max-width: 640px) {
          .group {
            min-width: 44px;
            min-height: 44px;
          }
        }
      `}</style>
    </section>
  );
};

export default TechWeLove;
