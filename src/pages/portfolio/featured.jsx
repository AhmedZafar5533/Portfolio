"use client";

import React, { useState, useEffect, useRef } from "react";

/** IntersectionObserver hook (JSX version) */
function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.unobserve(entry.target); // reveal once
      }
    }, options || {});

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

/** Reveal wrapper (JSX version) */
const Reveal = ({ children, className = "", delay = 0, as = "div" }) => {
  const { ref, inView } = useInView({
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.15,
  });
  const Tag = as || "div";
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        "will-change-transform transition-all duration-700 ease-out",
        "opacity-0 translate-y-6",
        inView ? "opacity-100 translate-y-0" : "",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
};

/** Custom Luxury Carousel Component */
const LuxuryCarousel = ({ images, autoplayDelay = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextSlide, autoplayDelay);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, autoplayDelay]);

  // Pause on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div
      className="relative z-20 group w-full max-w-6xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main carousel container */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm border border-amber-500/20">
        {/* Images container */}
        <div className="relative h-96 lg:h-[500px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Image title overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white text-2xl lg:text-3xl font-light mb-2 drop-shadow-lg">
                  {image.alt}
                </h3>
                <div className="w-16 h-[2px] bg-gradient-to-r from-amber-400 to-rose-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-amber-500/30 text-amber-400 opacity-0 group-hover:opacity-100 hover:bg-amber-500/20 hover:border-amber-500/60 hover:scale-110 transition-all duration-300 flex items-center justify-center"
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

        {/* Progress indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative group/dot"
              >
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    index === currentIndex
                      ? "border-amber-400 bg-amber-400"
                      : "border-amber-400/50 bg-transparent hover:border-amber-400/80"
                  }`}
                />
                {/* Active indicator with progress */}
                {index === currentIndex && (
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-amber-400/30 animate-ping" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Autoplay indicator */}
        <div className="absolute top-6 right-6">
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isAutoPlaying ? "bg-green-400" : "bg-gray-400"
            }`}
          />
        </div>
      </div>

      {/* Image counter */}
      <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-amber-500/30">
        <span className="text-amber-400 text-sm font-light">
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

const FeaturedProjectsCarousel = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const images = [
    { src: "/ecomerce-brown.png", alt: "Runway Vogue" },
    { src: "/marbo dark.png", alt: "Marbo Global" },
    { src: "/imageAnalyzer.png", alt: "VisionAI" },
  ];

  const projects = [
    {
      title: "Runway Vogue",
      category: "Fashion Website",
      description:
        "A stylish online hub showcasing the latest trends and designer collections",
      metrics: "500k monthly fashion enthusiasts",
    },
    {
      title: "Marbo Global",
      category: "E-Commerce Platform",
      description:
        "Seamless shopping experience with AI-powered product recommendations",
      metrics: "200% growth in online sales",
    },
    {
      title: "VisionAI",
      category: "Image Analyzer",
      description:
        "Advanced image recognition system for real-time object detection",
      metrics: "95% accuracy in visual analysis",
    },
  ];

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  };

  const GoldParticle = ({ delay, size, duration }) => (
    <div
      className="absolute rounded-full opacity-20"
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
      className="min-h-screen bg-black z-20 relative overflow-hidden "
      onMouseMove={handleMouseMove}
    >
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/5 via-transparent to-rose-900/5" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at ${
              mousePosition.x * 100
            }% ${
              mousePosition.y * 100
            }%, rgba(255, 215, 0, 0.15) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Floating Gold Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <GoldParticle
          key={i}
          delay={i * 0.8}
          size={1 + Math.random() * 2}
          duration={12 + Math.random() * 6}
        />
      ))}

      <div className="relative z-20 max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <Reveal as="section" className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <span className="text-amber-300 text-sm font-light tracking-[0.3em] uppercase relative">
              Featured Work
              <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-gradient-to-r from-amber-400 to-rose-500 transition-all duration-700 ease-out group-hover:w-full"></span>
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

        {/* Custom Luxury Carousel */}
        <Reveal as="section" delay={120} className="mb-16">
          <LuxuryCarousel images={images} autoplayDelay={4000} />
        </Reveal>

        {/* Project Stats (staggered) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 120}>
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
        {/* <Reveal as="section" delay={100} className="text-center">
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
        </Reveal> */}
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

        /* Respect user motion preferences */
        @media (prefers-reduced-motion: reduce) {
          :global(.will-change-transform) {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedProjectsCarousel;
