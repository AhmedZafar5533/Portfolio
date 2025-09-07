import React, { useState, useEffect, useRef } from "react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!isMobile && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  };

  const GoldParticle = ({ delay, size, duration }) => (
    <div
      className="absolute rounded-full opacity-20 sm:opacity-30 pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: "linear-gradient(45deg, #FFD700, #FFA500, #FF6347)",
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        filter: "blur(1px)",
        animation: "luxuryFloat infinite ease-in-out",
      }}
    />
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black relative overflow-hidden"
      onMouseMove={handleMouseMove}
      id="hero"
    >
      {/* Premium background texture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/5 via-transparent to-rose-900/5" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at ${
              mousePosition.x * 100
            }% ${
              mousePosition.y * 100
            }%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Luxury particles - reduced on mobile */}
      {Array.from({ length: isMobile ? 4 : 12 }).map((_, i) => (
        <GoldParticle
          key={i}
          delay={i * 0.5}
          size={isMobile ? 1 + Math.random() * 1.5 : 1 + Math.random() * 2}
          duration={8 + Math.random() * 6}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-20 mt-6 pt-10 pb-8 lg:pb-16 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Mobile/Tablet Layout (below lg) */}
          <div className="lg:hidden ">
            <div className="space-y-8 sm:space-y-12">
              {/* Content Section */}
              <div
                className={`space-y-6 sm:space-y-8 text-left sm:text-left transform transition-all duration-1500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
              >
                {/* Premium badge */}
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500/10 to-rose-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-2 sm:px-6 sm:py-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full animate-pulse" />
                  <span className="text-amber-300 text-xs sm:text-sm font-light tracking-widest">
                    CREATIVE TRIO
                  </span>
                </div>

                {/* Main Heading */}
                <div className="space-y-2">
                  <h1 className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[0.9] tracking-tight">
                    <div className="overflow-hidden">
                      <div
                        className={`transform transition-all duration-1000 delay-300 ${
                          isLoaded ? "translate-y-0" : "translate-y-full"
                        }`}
                      >
                        CRAFTING
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <div
                        className={`bg-gradient-to-r from-amber-400 to-rose-500 bg-clip-text text-transparent transform transition-all duration-1000 delay-500 ${
                          isLoaded ? "translate-y-0" : "translate-y-full"
                        }`}
                      >
                        EXCELLENCE
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <div
                        className={`text-gray-400 transform transition-all duration-1000 delay-700 ${
                          isLoaded ? "translate-y-0" : "translate-y-full"
                        }`}
                      >
                        TOGETHER
                      </div>
                    </div>
                  </h1>
                </div>

                {/* Description */}
                <div
                  className={`space-y-6 transform transition-all duration-1000 delay-1100 ${
                    isLoaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-xl text-left">
                    Creative minds united by passion for perfection. Every
                    project is a symphony of innovation and craftsmanship.
                  </p>

                  {/* Premium CTA */}
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-8">
                    <button className="group relative overflow-hidden">
                      <div className="relative bg-gradient-to-r from-amber-500 to-rose-500 p-[1px] rounded-full">
                        <div className="bg-black rounded-full px-6 py-3 group-hover:bg-transparent transition-all duration-500">
                          <span className="text-white text-sm font-light tracking-widest group-hover:text-black transition-colors duration-500">
                            VIEW OUR WORK
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-rose-500 opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity duration-500" />
                    </button>

                    <div className="flex items-center space-x-4 text-gray-500">
                      <div className="w-10 h-[1px] bg-gradient-to-r from-amber-500 to-transparent" />
                      <span className="text-xs tracking-widest font-light">
                        EST. MMXXIV
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Grid Section */}
              <div
                className={`transform transition-all duration-1500 delay-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
              >
                {/* Main featured image */}
                <div className="relative group mb-6">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-rose-500 p-[2px] transform rotate-1 group-hover:rotate-0 transition-transform duration-700 rounded-2xl">
                    <div className="bg-black w-full h-full rounded-xl" />
                  </div>
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-gradient-to-br from-gray-900 to-black overflow-hidden rounded-xl transform group-hover:scale-[0.98] transition-transform duration-700">
                    <img
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop"
                      alt="Portfolio showcase"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-amber-900/20" />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-amber-500/30 rounded-lg p-2 sm:p-3">
                      <div className="text-amber-400 text-xs font-light tracking-widest">
                        FEATURED
                      </div>
                    </div>
                  </div>
                </div>

                {/* Partner Cards */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="relative overflow-hidden bg-gradient-to-br from-amber-900/20 to-rose-900/20 backdrop-blur-sm border border-amber-500/20 rounded-xl p-3 sm:p-4 flex flex-col justify-center aspect-square">
                    <img
                      src="/people/shoaib.jpg"
                      alt="Shoaib Ali"
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
                    <div className="relative z-10">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 flex items-center justify-center text-black font-bold text-xs sm:text-sm mb-2">
                        S
                      </div>
                      <div className="text-white text-xs sm:text-sm font-light">
                        Shoaib Ali
                      </div>
                      <div className="text-gray-400 text-xs">
                        Creative Director
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-hidden bg-gradient-to-br from-amber-900/20 to-rose-900/20 backdrop-blur-sm border border-amber-500/20 rounded-xl p-3 sm:p-4 flex flex-col justify-center aspect-square">
                    <img
                      src="/people/ahmed.jpg"
                      alt="Ahmed Zafar"
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
                    <div className="relative z-10">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 flex items-center justify-center text-black font-bold text-xs sm:text-sm mb-2">
                        A
                      </div>
                      <div className="text-white text-xs sm:text-sm font-light">
                        Ahmed Zafar
                      </div>
                      <div className="text-gray-400 text-xs">
                        Lead Developer
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats and Third Partner Row */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="relative overflow-hidden bg-gradient-to-br from-amber-900/20 to-rose-900/20 backdrop-blur-sm border border-amber-500/20 rounded-xl p-3 sm:p-4 flex flex-col justify-center aspect-square">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                      alt="Ayaz Ahmed"
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
                    <div className="relative z-10">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 flex items-center justify-center text-black font-bold text-xs sm:text-sm mb-2">
                        A
                      </div>
                      <div className="text-white text-xs sm:text-sm font-light">
                        Ayaz Ahmed
                      </div>
                      <div className="text-gray-400 text-xs">
                        UI/UX Designer
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500/10 to-rose-500/10 backdrop-blur-sm border border-amber-500/20 rounded-xl p-3 sm:p-4 flex flex-col justify-center aspect-square">
                    <div className="text-amber-400 text-xl sm:text-2xl font-extralight mb-1">
                      20+
                    </div>
                    <div className="text-gray-400 text-xs font-light tracking-wider">
                      Projects Delivered
                    </div>
                  </div>
                </div>

                {/* Showcase Images */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative group overflow-hidden rounded-xl aspect-[3/2]">
                    <img
                      src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop"
                      alt="Work showcase"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white text-xs font-medium">
                      Recent Work
                    </div>
                  </div>

                  <div className="relative group overflow-hidden rounded-xl aspect-[3/2]">
                    <img
                      src="/people/brand.jpg"
                      alt="Design showcase"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white text-xs font-medium">
                      Brand Identity
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout (lg and above) */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start mb-10">
            {/* Left Content - Spans 5 columns */}
            <div
              className={`lg:col-span-5 space-y-12 transform transition-all duration-1500 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              {/* Premium badge */}
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500/10 to-rose-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-6 py-3">
                <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full animate-pulse" />
                <span className="text-amber-300 text-sm font-light tracking-widest">
                  CREATIVE TRIO
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl xl:text-8xl font-extralight text-white leading-[0.9] tracking-tight">
                  <div className="overflow-hidden">
                    <div
                      className={`transform transition-all duration-1000 delay-300 ${
                        isLoaded ? "translate-y-0" : "translate-y-full"
                      }`}
                    >
                      CRAFTING
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <div
                      className={`bg-gradient-to-r from-amber-400 via-yellow-300 to-rose-500 bg-clip-text text-transparent transform transition-all duration-1000 delay-500 ${
                        isLoaded ? "translate-y-0" : "translate-y-full"
                      }`}
                    >
                      EXCELLENCE
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <div
                      className={`text-gray-400 transform transition-all duration-1000 delay-700 ${
                        isLoaded ? "translate-y-0" : "translate-y-full"
                      }`}
                    >
                      TOGETHER
                    </div>
                  </div>
                </h1>
              </div>

              {/* Description */}
              <div
                className={`max-w-md space-y-8 transform transition-all duration-1000 delay-1100 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <p className="text-gray-300 text-lg leading-relaxed font-light">
                  Creative minds united by passion for perfection. Every project
                  is a symphony of innovation and craftsmanship.
                </p>

                {/* Premium CTA */}
                <div className="flex items-center space-x-8">
                  <button className="group relative overflow-hidden">
                    <div className="relative bg-gradient-to-r from-amber-500 to-rose-500 p-[1px] rounded-full">
                      <div className="bg-black rounded-full px-8 py-4 group-hover:bg-transparent transition-all duration-500">
                        <span className="text-white text-sm font-light tracking-widest group-hover:text-black transition-colors duration-500">
                          VIEW OUR WORK
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-rose-500 opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity duration-500" />
                  </button>

                  <div className="flex items-center space-x-4 text-gray-500">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-amber-500 to-transparent" />
                    <span className="text-xs tracking-widest font-light">
                      EST. MMXXIV
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Grid - Spans 7 columns */}
            <div
              className={`lg:col-span-7 grid grid-cols-6 grid-rows-4 gap-4 h-[500px] xl:h-[600px] transform transition-all duration-1500 delay-500 ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0"
              }`}
            >
              {/* Main featured image - Large */}
              <div className="col-span-4 row-span-3 relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-rose-500 p-[2px] transform rotate-1 group-hover:rotate-0 transition-transform duration-700 rounded-2xl">
                  <div className="bg-black w-full h-full rounded-xl" />
                </div>
                <div className="relative aspect-auto h-full bg-gradient-to-br from-gray-900 to-black overflow-hidden rounded-xl transform group-hover:scale-[0.98] transition-transform duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop"
                    alt="Portfolio showcase"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-amber-900/20" />
                  <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-sm border border-amber-500/30 rounded-lg p-3">
                    <div className="text-amber-400 text-xs font-light tracking-widest">
                      FEATURED
                    </div>
                  </div>
                </div>
              </div>

              {/* Partner Card 1 */}
              <div className="col-span-2 row-span-1 relative overflow-hidden bg-gradient-to-br from-amber-900/20 to-rose-900/20 backdrop-blur-sm border border-amber-500/20 rounded-xl p-4 flex flex-col justify-center">
                <img
                  src="/people/shoaib.jpg"
                  alt="Shoaib Ali"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 flex items-center justify-center text-black font-bold text-lg mb-3">
                    S
                  </div>
                  <div className="text-white text-sm font-light">
                    Shoaib Ali
                  </div>
                  <div className="text-gray-400 text-xs">Creative Director</div>
                </div>
              </div>

              {/* Partner Card 2 */}
              <div className="col-span-2 row-span-1 relative overflow-hidden bg-gradient-to-br from-amber-900/20 to-rose-900/20 backdrop-blur-sm border border-amber-500/20 rounded-xl p-4 flex flex-col justify-center">
                <img
                  src="/people/ahmed.jpg"
                  alt="Ahmed Zafar"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 flex items-center justify-center text-black font-bold text-lg mb-3">
                    A
                  </div>
                  <div className="text-white text-sm font-light">
                    Ahmed Zafar
                  </div>
                  <div className="text-gray-400 text-xs">Lead Developer</div>
                </div>
              </div>
              {/* Partner Card 3 - Third Partner replacing client satisfaction */}

              <div className="col-span-2 row-span-1 relative overflow-hidden bg-gradient-to-br from-amber-900/20 to-rose-900/20 backdrop-blur-sm border border-amber-500/20 rounded-xl p-4 flex flex-col justify-center">
                <img
                  src="/people/ayaz.jpg"
                  alt="Ayaz Ahmed"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 flex items-center justify-center text-black font-bold text-lg mb-3">
                    A
                  </div>
                  <div className="text-white text-sm font-light">
                    Ayaz Ahmed
                  </div>
                  <div className="text-gray-400 text-xs">UI/UX Designer</div>
                </div>
              </div>
              {/* Stats showcase - Now in first position */}
              <div className="col-span-2 row-span-1 bg-gradient-to-br from-amber-500/10 to-rose-500/10 backdrop-blur-sm border border-amber-500/20 rounded-xl p-4 flex flex-col justify-center">
                <div className="text-amber-400 text-2xl font-extralight mb-1">
                  20+
                </div>
                <div className="text-gray-400 text-xs font-light tracking-wider">
                  Projects Delivered
                </div>
              </div>

              {/* Small showcase image 1 */}
              <div className="col-span-2 row-span-1 relative group overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=200&fit=crop"
                  alt="Work showcase"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 " />
                <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                  Recent Work
                </div>
              </div>

              {/* Small showcase image 2 */}
              <div className="col-span-2 row-span-1 relative group overflow-hidden rounded-xl">
                <img
                  src="/people/brand.jpg"
                  alt="Design showcase"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 " />
                <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                  Brand Identity
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium footer accent */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        <div className="h-12 sm:h-20 bg-gradient-to-t from-amber-900/5 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes luxuryFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-15px) translateX(10px) scale(1.1);
            opacity: 0.6;
          }
          66% {
            transform: translateY(-5px) translateX(-10px) scale(0.9);
            opacity: 0.4;
          }
        }

        @media (max-width: 767px) {
          @keyframes luxuryFloat {
            0%,
            100% {
              transform: translateY(0px) translateX(0px) scale(1);
              opacity: 0.2;
            }
            50% {
              transform: translateY(-8px) translateX(5px) scale(1.05);
              opacity: 0.4;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
