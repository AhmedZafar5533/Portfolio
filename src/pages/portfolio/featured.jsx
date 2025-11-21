"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

// 3D Project Sphere Component
const ProjectSphere = React.memo(({ project, position, isActive, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else if (isActive) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial
        color={isActive ? "#FFD700" : "#FFA500"}
        emissive={isActive ? "#FF6347" : "#000000"}
        emissiveIntensity={hovered ? 0.5 : 0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
});

ProjectSphere.displayName = "ProjectSphere";

// 3D Carousel Scene
const CarouselScene = React.memo(({ projects, activeIndex, setActiveIndex }) => {
  const radius = 4;
  const angleStep = (Math.PI * 2) / projects.length;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFD700" />
      
      {projects.map((project, index) => {
        const angle = index * angleStep;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <ProjectSphere
            key={index}
            project={project}
            position={[x, 0, z]}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        );
      })}
    </>
  );
});

CarouselScene.displayName = "CarouselScene";

// Optimized IntersectionObserver hook with cleanup and memoization
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15, ...options }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

// Memoized Reveal component
const Reveal = React.memo(
  ({ children, className = "", delay = 0, as = "div" }) => {
    const { ref, inView } = useInView();
    const Tag = as;

    const style = useMemo(
      () => ({
        transitionDelay: `${delay}ms`,
      }),
      [delay]
    );

    const classes = useMemo(
      () =>
        [
          "will-change-transform transition-all duration-700 ease-out",
          "opacity-0 translate-y-6",
          inView ? "opacity-100 translate-y-0" : "",
          className,
        ].join(" "),
      [inView, className]
    );

    return (
      <Tag ref={ref} style={style} className={classes}>
        {children}
      </Tag>
    );
  }
);

// Optimized carousel with better performance
const LuxuryCarousel = React.memo(({ images, autoplayDelay = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play with better cleanup
  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      intervalRef.current = setInterval(nextSlide, autoplayDelay);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, isHovered, nextSlide, autoplayDelay]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  // Preload adjacent images
  useEffect(() => {
    const preloadIndex = (currentIndex + 1) % images.length;
    const img = new Image();
    img.src = images[preloadIndex].src;
  }, [currentIndex, images]);

  return (
    <div
      className="relative z-20 group w-full max-w-6xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm border border-amber-500/20">
        {/* Images container with better performance */}
        <div className="relative h-96 lg:h-[500px]">
          {images.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform-gpu ${
                index === currentIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading={index <= 1 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white text-2xl lg:text-3xl font-light mb-2 drop-shadow-lg">
                  {image.alt}
                </h3>
                <div className="w-16 h-[2px] bg-gradient-to-r from-amber-400 to-rose-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-amber-500/30 text-amber-400 opacity-0 group-hover:opacity-100 hover:bg-amber-500/20 hover:border-amber-500/60 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          aria-label="Previous image"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-amber-500/30 text-amber-400 opacity-0 group-hover:opacity-100 hover:bg-amber-500/20 hover:border-amber-500/60 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          aria-label="Next image"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Progress indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative group/dot"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    index === currentIndex
                      ? "border-amber-400 bg-amber-400"
                      : "border-amber-400/50 bg-transparent hover:border-amber-400/80"
                  }`}
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-amber-400/30 animate-ping" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute top-6 right-6">
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isAutoPlaying && !isHovered ? "bg-green-400" : "bg-gray-400"
            }`}
          />
        </div>
      </div>

      <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-amber-500/30">
        <span className="text-amber-400 text-sm font-light">
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
});

// Memoized floating particle component
const GoldParticle = React.memo(({ delay, size, duration }) => {
  const style = useMemo(
    () => ({
      width: `${size}px`,
      height: `${size}px`,
      background: "linear-gradient(45deg, #FFD700, #FFA500, #FF6347)",
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      filter: "blur(1px)",
      animation: "luxuryFloat infinite ease-in-out",
    }),
    [delay, size, duration]
  );

  return <div className="absolute rounded-full opacity-20" style={style} />;
});

const FeaturedProjectsCarousel = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize static data
  const images = useMemo(
    () => [
      { src: "/proj/img1.webp", alt: "Premium Digital Experience" },
      { src: "/proj/img2.webp", alt: "Luxury Brand Identity" },
      { src: "/proj/img3.webp", alt: "Enterprise Solution" },
      { src: "/proj/img1.webp", alt: "Creative Innovation" },
      { src: "/proj/img2.webp", alt: "Strategic Design" },
    ],
    []
  );

  const projects = useMemo(
    () => [
      {
        title: "E-Commerce Revolution",
        category: "Digital Commerce",
        description:
          "Transforming retail experiences with cutting-edge technology",
        metrics: "300% increase in conversions",
        image: "/proj/img1.webp"
      },
      {
        title: "Brand Identity Suite",
        category: "Visual Identity",
        description:
          "Complete brand transformation for luxury market positioning",
        metrics: "98% brand recognition",
        image: "/proj/img2.webp"
      },
      {
        title: "Enterprise Platform",
        category: "Web Development",
        description: "Scalable solution serving millions of users globally",
        metrics: "99.9% uptime achieved",
        image: "/proj/img3.webp"
      },
    ],
    []
  );

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  }, []);

  // Memoize particles to prevent recreation
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => (
        <GoldParticle
          key={i}
          delay={i * 0.8}
          size={1 + Math.random() * 2}
          duration={12 + Math.random() * 6}
        />
      )),
    []
  );

  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `radial-gradient(circle at ${mousePosition.x * 100}% ${
        mousePosition.y * 100
      }%, rgba(255, 215, 0, 0.15) 0%, transparent 50%)`,
    }),
    [mousePosition]
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black z-20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Optimized background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/5 via-transparent to-rose-900/5" />
        <div className="absolute inset-0 opacity-10" style={backgroundStyle} />
      </div>

      {particles}

      <div className="relative z-20 max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <Reveal as="section" className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <span className="text-amber-300 text-sm font-light tracking-[0.3em] uppercase relative">
              Featured Work
              <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-gradient-to-r from-amber-400 to-rose-500 transition-all duration-700 ease-out group-hover:w-full" />
            </span>
          </div>

          <h2 className="text-6xl lg:text-7xl font-extralight text-white leading-tight tracking-tight mb-6">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-rose-500 bg-clip-text text-transparent">
              EXCEPTIONAL
            </span>
            <br />
            <span className="text-gray-300">PROJECTS</span>
          </h2>

          <p className="text-gray-300 text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Discover our portfolio of transformative digital experiences that
            drive measurable business results and redefine industry standards
          </p>
        </Reveal>

        {/* 3D Carousel or Fallback */}
        <Reveal as="section" delay={120} className="mb-16">
          {!isMobile ? (
            <div className="relative z-20 w-full max-w-6xl mx-auto">
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm border border-amber-500/20">
                <Canvas>
                  <CarouselScene 
                    projects={projects} 
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                  />
                </Canvas>
                
                {/* Project Info Overlay */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-lg border border-amber-500/30 rounded-2xl p-6"
                  >
                    <div className="text-amber-400 text-sm font-light tracking-widest mb-2">
                      {projects[activeIndex].category}
                    </div>
                    <h3 className="text-white text-2xl lg:text-3xl font-light mb-3">
                      {projects[activeIndex].title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {projects[activeIndex].description}
                    </p>
                    <div className="text-amber-300 font-medium text-sm">
                      {projects[activeIndex].metrics}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <div className="flex space-x-3">
                    {projects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className="relative group/dot"
                      >
                        <div
                          className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                            index === activeIndex
                              ? "border-amber-400 bg-amber-400"
                              : "border-amber-400/50 bg-transparent hover:border-amber-400/80"
                          }`}
                        />
                        {index === activeIndex && (
                          <div className="absolute inset-0 w-3 h-3 rounded-full bg-amber-400/30 animate-ping" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <LuxuryCarousel images={images} autoplayDelay={4000} />
          )}
        </Reveal>

        {/* Project Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 120}>
              <div className="group relative bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm border border-amber-500/10 rounded-3xl p-8 transition-all duration-700 hover:border-amber-500/40 hover:scale-[1.05] hover:rotate-[0.5deg]">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-rose-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <div className="text-amber-400 text-sm font-light tracking-widest mb-3 uppercase">
                    {project.category}
                  </div>
                  <h3 className="text-white text-2xl font-light mb-4 group-hover:text-amber-300 transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="text-amber-300 font-medium text-sm">
                    {project.metrics}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        {/* CTA */}
        <Reveal as="section" delay={100} className="text-center">
          <button className="group relative mb-7 inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-rose-500 text-black px-8 py-4 rounded-full font-medium transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/30">
            <span>Explore All Projects</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </Reveal>
      </div>

      <style jsx>{`
        @keyframes luxuryFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.25;
          }
          33% {
            transform: translateY(-10px) translateX(6px) scale(1.05);
            opacity: 0.4;
          }
          66% {
            transform: translateY(-5px) translateX(-6px) scale(0.95);
            opacity: 0.3;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.will-change-transform) {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
          :global(.animate-ping) {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedProjectsCarousel;
