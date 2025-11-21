import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 3D Particle Field Component
const ParticleField = React.memo(({ mousePosition }) => {
  const pointsRef = useRef();
  const [sphere] = useState(() => {
    const positions = [];
    const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 500 : 1500;
    
    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions.push(x, y, z);
    }
    
    return new Float32Array(positions);
  });

  useEffect(() => {
    if (!pointsRef.current) return;
    
    const animate = () => {
      if (pointsRef.current) {
        pointsRef.current.rotation.y += 0.001;
        pointsRef.current.rotation.x = mousePosition.y * 0.05;
        pointsRef.current.rotation.z = mousePosition.x * 0.05;
      }
    };
    
    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FFD700"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
});

ParticleField.displayName = "ParticleField";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Memoize static data
  const teamMembers = useMemo(
    () => [
      {
        name: "Shoaib Ali",
        role: "Creative Director",
        image: "/people/shoaib.jpg",
        initial: "S",
      },
      {
        name: "Ahmed Zafar",
        role: "Lead Developer",
        image: "/people/ahmed.jpg",
        initial: "A",
      },
      {
        name: "Ayaz Ahmed",
        role: "UI/UX Designer",
        image: "/people/ayaz.jpg",
        initial: "A",
      },
    ],
    []
  );

  const showcaseImages = useMemo(
    () => [
      {
        src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=200&fit=crop",
        alt: "Work showcase",
        label: "Recent Work",
      },
      {
        src: "/people/brand.jpg",
        alt: "Design showcase",
        label: "Brand Identity",
      },
    ],
    []
  );

  // Optimized resize handler with debouncing
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Throttled mouse move handler with glitch trigger
  const handleMouseMove = useCallback(
    (e) => {
      if (!isMobile && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
        
        // Random glitch effect on mouse move
        if (Math.random() > 0.98) {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 100);
        }
      }
    },
    [isMobile]
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);

    // Initial mobile check
    handleResize();

    // Add resize listener with passive flag for better performance
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // Memoized particle generation
  const particles = useMemo(() => {
    const count = isMobile ? 4 : 12;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      delay: i * 0.5,
      size: isMobile ? 1 + Math.random() * 1.5 : 1 + Math.random() * 2,
      duration: 8 + Math.random() * 6,
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
  }, [isMobile]);

  // Optimized particle component
  const GoldParticle = React.memo(({ particle }) => (
    <div
      className="absolute rounded-full opacity-20 sm:opacity-30 pointer-events-none"
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        background: "linear-gradient(45deg, #FFD700, #FFA500, #FF6347)",
        left: `${particle.left}%`,
        top: `${particle.top}%`,
        animationDelay: `${particle.delay}s`,
        animationDuration: `${particle.duration}s`,
        filter: "blur(1px)",
        animation: "luxuryFloat infinite ease-in-out",
      }}
    />
  ));

  // Optimized team card component
  const TeamCard = React.memo(({ member, className = "" }) => (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-amber-900/20 to-rose-900/20 backdrop-blur-sm border border-amber-500/20 rounded-xl p-3 sm:p-4 lg:p-4 flex flex-col justify-center ${className}`}
    >
      <img
        src={member.image}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover rounded-xl lg:rounded-none"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl lg:rounded-none" />
      <div className="relative z-10">
        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 flex items-center justify-center text-black font-bold text-xs sm:text-sm lg:text-lg mb-2 lg:mb-3">
          {member.initial}
        </div>
        <div className="text-white text-xs sm:text-sm font-light">
          {member.name}
        </div>
        <div className="text-gray-400 text-xs">{member.role}</div>
      </div>
    </div>
  ));

  // Optimized showcase image component
  const ShowcaseImage = React.memo(({ image, className = "" }) => (
    <div className={`relative group overflow-hidden rounded-xl ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />
      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white text-xs font-medium">
        {image.label}
      </div>
    </div>
  ));

  // Shared animation classes
  const fadeInUp = `transform transition-all duration-1500 ${
    isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
  }`;

  const fadeInRight = `transform transition-all duration-1500 delay-500 ${
    isLoaded ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
  }`;

  const slideUp = (delay) =>
    `transform transition-all duration-1000 delay-${delay} ${
      isLoaded ? "translate-y-0" : "translate-y-full"
    }`;

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black relative overflow-hidden"
      onMouseMove={handleMouseMove}
      id="hero"
    >
      {/* 3D Particle Field Background */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{ background: "transparent" }}
          >
            <ParticleField mousePosition={mousePosition} />
          </Canvas>
        </div>
      )}

      {/* Animated Grid Lines */}
      <motion.div 
        className="absolute inset-0 z-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 215, 0, ${0.05 + mousePosition.y * 0.1}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 215, 0, ${0.05 + mousePosition.x * 0.1}) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.3,
        }}
        animate={{
          backgroundPosition: [`0px 0px`, `50px 50px`],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Premium background texture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/5 via-transparent to-rose-900/5" />
        <motion.div
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

      {/* Luxury particles */}
      {particles.map((particle) => (
        <GoldParticle key={particle.id} particle={particle} />
      ))}

      {/* Main Content */}
      <div className="relative z-20 mt-6 pt-10 pb-8 lg:pb-16 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            <div className="space-y-8 sm:space-y-12">
              {/* Content Section */}
              <div
                className={`space-y-6 sm:space-y-8 text-left sm:text-left ${fadeInUp}`}
              >
                {/* Premium badge */}
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500/10 to-rose-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-2 sm:px-6 sm:py-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full animate-pulse" />
                  <span className="text-amber-300 text-xs sm:text-sm font-light tracking-widest">
                    CREATIVE TRIO
                  </span>
                </div>

                {/* Main Heading with Liquid Morphing Effect */}
                <div className="space-y-2">
                  <h1 className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[0.9] tracking-tight">
                    <div className="overflow-hidden">
                      <motion.div 
                        className={slideUp("300")}
                        animate={glitchActive ? {
                          x: [0, -2, 2, -1, 1, 0],
                          textShadow: [
                            "0 0 0px rgba(255,255,255,0)",
                            "2px 0 4px rgba(255,0,0,0.8), -2px 0 4px rgba(0,255,255,0.8)",
                            "0 0 0px rgba(255,255,255,0)"
                          ]
                        } : {}}
                        transition={{ duration: 0.1 }}
                      >
                        CRAFTING
                      </motion.div>
                    </div>
                    <div className="overflow-hidden">
                      <motion.div
                        className={`bg-gradient-to-r from-amber-400 to-rose-500 bg-clip-text text-transparent ${slideUp(
                          "500"
                        )}`}
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{
                          backgroundSize: "200% 200%",
                        }}
                      >
                        EXCELLENCE
                      </motion.div>
                    </div>
                    <div className="overflow-hidden">
                      <motion.div 
                        className={`text-gray-400 ${slideUp("700")}`}
                        whileHover={{
                          scale: 1.05,
                          textShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
                        }}
                      >
                        TOGETHER
                      </motion.div>
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
                    <button
                      className="group relative overflow-hidden"
                      aria-label="View our work"
                    >
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
              <div className={fadeInUp}>
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
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-amber-900/20" />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-amber-500/30 rounded-lg p-2 sm:p-3">
                      <div className="text-amber-400 text-xs font-light tracking-widest">
                        FEATURED
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {teamMembers.slice(0, 2).map((member) => (
                    <TeamCard
                      key={member.name}
                      member={member}
                      className="aspect-square"
                    />
                  ))}
                </div>

                {/* Third Partner and Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <TeamCard member={teamMembers[2]} className="aspect-square" />
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
                  {showcaseImages.map((image, index) => (
                    <ShowcaseImage
                      key={index}
                      image={image}
                      className="aspect-[3/2]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start mb-10">
            {/* Left Content */}
            <div className={`lg:col-span-5 space-y-12 ${fadeInUp}`}>
              {/* Premium badge */}
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500/10 to-rose-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-6 py-3">
                <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full animate-pulse" />
                <span className="text-amber-300 text-sm font-light tracking-widest">
                  CREATIVE TRIO
                </span>
              </div>

              {/* Main Heading with Liquid Morphing Effect */}
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl xl:text-8xl font-extralight text-white leading-[0.9] tracking-tight">
                  <div className="overflow-hidden">
                    <motion.div 
                      className={slideUp("300")}
                      animate={glitchActive ? {
                        x: [0, -2, 2, -1, 1, 0],
                        textShadow: [
                          "0 0 0px rgba(255,255,255,0)",
                          "2px 0 4px rgba(255,0,0,0.8), -2px 0 4px rgba(0,255,255,0.8)",
                          "0 0 0px rgba(255,255,255,0)"
                        ]
                      } : {}}
                      transition={{ duration: 0.1 }}
                    >
                      CRAFTING
                    </motion.div>
                  </div>
                  <div className="overflow-hidden">
                    <motion.div
                      className={`bg-gradient-to-r from-amber-400 via-yellow-300 to-rose-500 bg-clip-text text-transparent ${slideUp(
                        "500"
                      )}`}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        backgroundSize: "200% 200%",
                      }}
                    >
                      EXCELLENCE
                    </motion.div>
                  </div>
                  <div className="overflow-hidden">
                    <motion.div 
                      className={`text-gray-400 ${slideUp("700")}`}
                      whileHover={{
                        scale: 1.05,
                        textShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
                      }}
                    >
                      TOGETHER
                    </motion.div>
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

                <div className="flex items-center space-x-8">
                  <button
                    className="group relative overflow-hidden"
                    aria-label="View our work"
                  >
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

            {/* Right Visual Grid */}
            <div
              className={`lg:col-span-7 grid grid-cols-6 grid-rows-4 gap-4 h-[500px] xl:h-[600px] ${fadeInRight}`}
            >
              {/* Main featured image */}
              <div className="col-span-4 row-span-3 relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-rose-500 p-[2px] transform rotate-1 group-hover:rotate-0 transition-transform duration-700 rounded-2xl">
                  <div className="bg-black w-full h-full rounded-xl" />
                </div>
                <div className="relative aspect-auto h-full bg-gradient-to-br from-gray-900 to-black overflow-hidden rounded-xl transform group-hover:scale-[0.98] transition-transform duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop"
                    alt="Portfolio showcase"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-amber-900/20" />
                  <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-sm border border-amber-500/30 rounded-lg p-3">
                    <div className="text-amber-400 text-xs font-light tracking-widest">
                      FEATURED
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Cards */}
              {teamMembers.map((member, index) => (
                <TeamCard
                  key={member.name}
                  member={member}
                  className="col-span-2 row-span-1"
                />
              ))}

              {/* Stats */}
              <div className="col-span-2 row-span-1 bg-gradient-to-br from-amber-500/10 to-rose-500/10 backdrop-blur-sm border border-amber-500/20 rounded-xl p-4 flex flex-col justify-center">
                <div className="text-amber-400 text-2xl font-extralight mb-1">
                  20+
                </div>
                <div className="text-gray-400 text-xs font-light tracking-wider">
                  Projects Delivered
                </div>
              </div>

              {/* Showcase Images */}
              {showcaseImages.map((image, index) => (
                <ShowcaseImage
                  key={index}
                  image={image}
                  className="col-span-2 row-span-1"
                />
              ))}
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
