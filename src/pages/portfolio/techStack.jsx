import React, { useState, useEffect, useRef } from "react";

const TechWeLove = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animatedStats, setAnimatedStats] = useState({
    years: 0,
    shipped: 0,
    nps: 0,
  });
  const sectionRef = useRef(null);

  const finalStats = {
    years: 4,
    shipped: 27,
    nps: 96,
  };

  // Luxury tech stack with sophisticated branding
  const techStack = [
    {
      name: "React",
      icon: "⚛︎",
      accent: "from-blue-400 via-cyan-300 to-blue-500",
    },
  {
  name: "Dot Net",
  icon: ".N", // clean proxy for .NET
  accent: "from-[#512BD4] via-[#8661C5] to-indigo-500", // matches official branding
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
      icon: "⚡︎", // lightning bolt vibe for fast deployment
      accent: "from-indigo-500 via-purple-400 to-blue-500", // Render's clean modern blue/purple gradient
    },
    {
      name: "Firebase",
      icon: "🔥", // classic flame symbol for Firebase
      accent: "from-yellow-400 via-orange-500 to-yellow-500", // Firebase’s fiery yellow-orange-red scheme
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

  const extendedStack = [...techStack, ...techStack, ...techStack];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const handleMouseMove = (e) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  };

  useEffect(() => {
    if (!isVisible) return;

    const animateCounter = (key, target, duration, delay = 0) => {
      setTimeout(() => {
        const startTime = Date.now();

        const updateValue = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 4);
          const value = Math.floor(target * easeOut);

          setAnimatedStats((prev) => ({ ...prev, [key]: value }));

          if (progress < 1) {
            requestAnimationFrame(updateValue);
          }
        };

        requestAnimationFrame(updateValue);
      }, delay);
    };

    animateCounter("years", finalStats.years, 2800, 600);
    animateCounter("shipped", finalStats.shipped, 3200, 1000);
    animateCounter("nps", finalStats.nps, 2500, 1400);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Sophisticated background layers */}
      <div className="absolute inset-0">
        {/* Dynamic gradient following mouse */}
        <div
          className="absolute inset-0 opacity-30 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(${
              window.innerWidth > 768 ? "1200px" : "600px"
            } circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(120, 53, 15, 0.1) 0%, 
              rgba(124, 45, 18, 0.05) 25%,
              transparent 50%)`,
          }}
        />

        {/* Elegant grid pattern */}
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

        {/* Floating luxury elements - responsive positioning */}
        <div className="absolute top-1/4 left-1/4 w-1 sm:w-2 h-1 sm:h-2 bg-gradient-to-r from-amber-400 to-orange-300 rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-gradient-to-r from-rose-400 to-pink-300 rounded-full opacity-80 animate-ping" />
        <div className="absolute bottom-1/4 left-1/3 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gradient-to-r from-violet-400 to-purple-300 rounded-full opacity-70" />
      </div>

      <div className="relative z-10 py-6 sm:py-8 md:py-12">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Luxurious Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <div
              className={`transform transition-all duration-2000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 sm:translate-y-16 opacity-0"
              }`}
            >
              {/* Premium badge */}
              <div className="relative inline-flex items-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-violet-500/20 blur-lg sm:blur-xl rounded-full" />
                <div className="relative backdrop-blur-xl border border-white/10 rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4">
                  <span className="text-white/90 text-xs sm:text-sm font-thin tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                    Technology Stack
                  </span>
                </div>
              </div>

              {/* Main title - responsive typography */}
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

          {/* Ultra-premium marquee - responsive */}
          <div
            className={`relative mb-16 sm:mb-20 md:mb-24 lg:mb-32 transform transition-all duration-2500 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 sm:translate-y-12 opacity-0"
            }`}
          >
            <div className="relative py-8 sm:py-12 md:py-16">
              {/* Luxury divider above */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-4 sm:h-6 md:h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

              <div className="overflow-hidden">
                <div className="flex animate-luxuryMarquee">
                  {extendedStack.map((tech, index) => (
                    <div
                      key={`${tech.name}-${index}`}
                      className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8 lg:mx-12 group cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative">
                        {/* Glow effect */}
                        <div
                          className={`absolute -inset-3 sm:-inset-4 md:-inset-6 bg-gradient-to-r ${tech.accent} opacity-0 group-hover:opacity-20 blur-xl sm:blur-2xl rounded-2xl sm:rounded-3xl transition-all duration-700`}
                        />

                        {/* Main card - responsive sizing */}
                        <div className="relative transition-all duration-500">
                          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 group-hover:border-white/20 transition-all duration-500">
                            {/* Tech icon - responsive size */}
                            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 md:mb-6 text-center">
                              <span
                                className={`bg-gradient-to-r ${tech.accent} bg-clip-text text-transparent font-bold`}
                              >
                                {tech.icon}
                              </span>
                            </div>

                            {/* Tech name - responsive typography */}
                            <div className="text-center">
                              <div className="text-white/90 text-sm sm:text-base md:text-lg font-light tracking-wide mb-1 sm:mb-2">
                                {tech.name}
                              </div>
                              <div
                                className={`w-8 sm:w-10 md:w-12 h-px bg-gradient-to-r ${tech.accent} mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Luxury divider below */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-4 sm:h-6 md:h-8 bg-gradient-to-t from-transparent via-white/20 to-transparent" />
            </div>
          </div>

          {/* Exquisite stats section - fully responsive */}
          <div
            className={`transform transition-all duration-2000 delay-1000 mb-8 sm:mb-12 md:mb-15 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 sm:translate-y-16 opacity-0"
            }`}
          >
            {/* Stats container with premium layout */}
            <div className="relative">
              {/* Central connecting lines - only on larger screens */}
              <div className="absolute top-1/2 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-y-1/2 hidden xl:block" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
                {/* Years stat */}
                <div className="relative group text-center">
                  <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 bg-gradient-to-r from-amber-500/10 via-orange-400/5 to-amber-500/10 blur-2xl sm:blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                  <div className="relative">
                    {/* Ornamental top */}
                    <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
                      <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
                    </div>

                    {/* Number display - responsive sizing */}
                    <div className="relative mb-4 sm:mb-6 md:mb-8">
                      <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-thin tracking-tighter">
                        <span className="bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                          {animatedStats.years}
                        </span>
                      </div>
                      <div className="absolute -top-2 sm:-top-3 md:-top-4 -right-2 sm:-right-3 md:-right-4 text-xl sm:text-2xl md:text-3xl text-amber-400/80 font-light">
                        +
                      </div>
                    </div>

                    {/* Label - responsive typography */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="text-white/90 text-base sm:text-lg md:text-xl font-thin tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                        Years
                      </div>
                      <div className="text-white/40 text-xs sm:text-sm font-extralight tracking-wide sm:tracking-wider">
                        of dedicated craftsmanship
                      </div>
                    </div>

                    {/* Ornamental bottom */}
                    <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
                      <div className="w-4 sm:w-6 md:w-8 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Projects shipped stat */}
                <div className="relative group text-center">
                  <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 bg-gradient-to-r from-rose-500/10 via-pink-400/5 to-rose-500/10 blur-2xl sm:blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                  <div className="relative">
                    <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
                      <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-rose-400/60 to-transparent" />
                    </div>

                    <div className="relative mb-4 sm:mb-6 md:mb-8">
                      <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-thin tracking-tighter">
                        <span className="bg-gradient-to-b from-rose-200 via-rose-400 to-rose-600 bg-clip-text text-transparent">
                          {animatedStats.shipped}
                        </span>
                      </div>
                      <div className="absolute -top-2 sm:-top-3 md:-top-4 -right-2 sm:-right-3 md:-right-4 text-xl sm:text-2xl md:text-3xl text-rose-400/80 font-light">
                        +
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <div className="text-white/90 text-base sm:text-lg md:text-xl font-thin tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                        Projects
                      </div>
                      <div className="text-white/40 text-xs sm:text-sm font-extralight tracking-wide sm:tracking-wider">
                        successfully delivered
                      </div>
                    </div>

                    <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
                      <div className="w-4 sm:w-6 md:w-8 h-px bg-gradient-to-r from-transparent via-rose-400/40 to-transparent" />
                    </div>
                  </div>
                </div>

                {/* NPS stat */}
                <div className="relative group text-center mb-15">
                  <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 bg-gradient-to-r from-violet-500/10 via-purple-400/5 to-violet-500/10 blur-2xl sm:blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                  <div className="relative">
                    <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
                      <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
                    </div>

                    <div className="relative mb-4 sm:mb-6 md:mb-8">
                      <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-thin tracking-tighter">
                        <span className="bg-gradient-to-b from-violet-200 via-violet-400 to-violet-600 bg-clip-text text-transparent">
                          {animatedStats.nps}
                        </span>
                      </div>
                      <div className="absolute -top-1 sm:-top-2 -right-3 sm:-right-4 md:-right-6 text-2xl sm:text-3xl md:text-4xl text-violet-400/80 font-thin">
                        %
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <div className="text-white/90 text-base sm:text-lg md:text-xl font-thin tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                        NPS Score
                      </div>
                      <div className="text-white/40 text-xs sm:text-sm font-extralight tracking-wide sm:tracking-wider">
                        client satisfaction rating
                      </div>
                    </div>

                    <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
                      <div className="w-4 sm:w-6 md:w-8 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating luxury marquee - responsive bottom section */}
      <div className="absolute bottom-0 left-0 right-0 py-6 sm:py-8 md:py-12 mt-6 sm:mt-8 md:mt-10">
        <div
          className={`transform transition-all duration-2500 delay-1500 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 sm:translate-y-8 opacity-0"
          }`}
        >
          {/* Elegant separator */}
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

        /* Responsive breakpoints for animation speed */
        @media (max-width: 640px) {
          .animate-luxuryMarquee {
            animation: luxuryMarquee 35s linear infinite;
          }
          .animate-premiumMarquee {
            animation: premiumMarquee 50s linear infinite;
          }
        }

        /* Custom scrollbar for premium feel */
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

        /* Ensure proper touch targets on mobile */
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
