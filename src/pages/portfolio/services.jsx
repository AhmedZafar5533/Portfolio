import React, { useState, useEffect, useRef } from "react";

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const services = [
    {
      number: "01",
      title: "Web Applications",
      shortTitle: "Web Apps",
      description:
        "Cutting-edge web applications that push the boundaries of what's possible in the browser.",
      details:
        "From progressive web apps to complex dashboard systems, we create digital experiences that captivate and perform flawlessly across all devices.",
      tech: "React • Next.js • TypeScript • GraphQL",
      metric: "200ms",
      metricLabel: "Avg Load Time",
      value: "Transform", // <- This changes the text
      color: "amber",
    },
    {
      number: "02",
      title: ".NET Applications",
      shortTitle: ".NET Apps",
      description:
        "Enterprise-grade solutions built on Microsoft's robust .NET ecosystem for unmatched reliability.",
      details:
        "Scalable backend systems, APIs, and enterprise applications designed to handle millions of operations with precision and security.",
      tech: ".NET Core • Azure • SQL • Microservices",
      metric: "99.9%",
      metricLabel: "Uptime SLA",
      value: "Scale", // <- Different text for each service
      color: "purple",
    },
    {
      number: "03",
      title: "System Integrations",
      shortTitle: "Integrations",
      description:
        "Seamless connections between disparate systems, creating unified digital ecosystems.",
      details:
        "Custom API integrations, data synchronization, and workflow automation that transforms isolated systems into cohesive platforms.",
      tech: "REST • GraphQL • Webhooks • ETL",
      metric: "< 100ms",
      metricLabel: "API Response",
      value: "Unite", // <- Changes dynamically
      color: "emerald",
    },
  ];
const getColorClasses = (color, variant = 'default') => {
  const colorMap = {
    amber: { default: 'from-amber-400 to-gold-500' },
    purple: { default: 'from-purple-400 to-pink-500' },
    emerald: { default: 'from-emerald-400 to-teal-500' }
  };
  return colorMap[color][variant];
};
  // Auto loop functionality
  const startLoop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % services.length);
      }
    }, 2500); // 4 seconds per card
  };

  const stopLoop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start auto loop when component becomes visible
          setTimeout(() => startLoop(), 1000); // Start after initial animation
        } else {
          stopLoop(); // Stop loop when not visible to save resources
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      stopLoop();
    };
  }, [isPaused]);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  };

  const handleServiceClick = (index) => {
    setActiveIndex(index);
    // Restart the loop from the selected index
    startLoop();
  };

  const handleServiceHover = (index) => {
    setActiveIndex(index);
    setIsPaused(true);
  };

  const handleServiceLeave = () => {
    setIsPaused(false);
  };

  const HexagonalOrb = ({ delay, size, opacity }) => (
    <div
      className="absolute"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
        animationDelay: `${delay}s`,
        animationDuration: "12s",
        animation: "hexFloat infinite ease-in-out",
        opacity: opacity,
      }}
    >
      <div className="w-full h-full bg-gradient-to-br from-amber-400/20 to-rose-400/10 transform rotate-45 rounded-sm blur-sm" />
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-amber-900/10" />
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `radial-gradient(600px circle at ${
              mousePosition.x * 100
            }% ${
              mousePosition.y * 100
            }%, rgba(217, 119, 6, 0.05), transparent 40%)`,
          }}
        />
      </div>

      {/* Floating geometric elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <HexagonalOrb
          key={i}
          delay={i * 1.5}
          size={6 + Math.random() * 8}
          opacity={0.1 + Math.random() * 0.2}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        {/* Header Section */}
        <div
          className={`text-center mb-20 transform transition-all duration-1200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="relative inline-block mb-12">
            <div className="absolute -inset-8 blur-2xl" />
           <div className="inline-flex items-center space-x-8">
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-amber-500/40" />
            <div className="text-amber-400/60 text-sm font-light tracking-[0.3em]">
              WHAT WE CRAFT
            </div>
            <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-amber-500/40" />
          </div>
          </div>

         <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-thin leading-[1] mb-6 sm:mb-8">
            <span className="text-white transition-all duration-[1000ms] ease-out">Digital</span>
            <br />
            <span className={`bg-gradient-to-r ${getColorClasses(services[activeIndex].color, 'default')} bg-clip-text text-transparent transition-all duration-[2000ms] ease-out`}>
              {services[activeIndex].value}
            </span>
          </h2>

          <p className="text-gray-400 text-md sm:text-xl lg:text-2xl font-thin leading-relaxed max-w-4xl mx-auto transition-all duration-[1500ms] ease-out">
            {services[activeIndex].description}
          </p>
        </div>

        {/* Main Interactive Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
          {/* Left: Interactive Service Selector */}
          <div
            className={`space-y-8 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-12 opacity-0"
            }`}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative group cursor-pointer transition-all duration-700 ${
                  activeIndex === index ? "scale-105" : "scale-100"
                }`}
                onClick={() => handleServiceClick(index)}
                onMouseEnter={() => handleServiceHover(index)}
                onMouseLeave={handleServiceLeave}
              >
                {/* Service Card */}
                <div
                  className={`relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-700 ${
                    activeIndex === index
                      ? "border-2 border-amber-500/30"
                      : "bg-gray-900/20 border border-gray-800/50 hover:border-amber-500/20"
                  }`}
                >
                  {/* Active indicator */}
                  {activeIndex === index && (
                    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-16 bg-gradient-to-b from-amber-400 to-rose-500 rounded-full" />
                    </div>
                  )}

                  <div className="flex items-start space-x-6">
                    {/* Number */}
                    <div
                      className={`text-4xl font-extralight transition-all duration-500 ${
                        activeIndex === index
                          ? "text-amber-400 scale-110"
                          : "text-gray-600"
                      }`}
                    >
                      {service.number}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3
                        className={`text-2xl font-light mb-3 transition-colors duration-500 ${
                          activeIndex === index ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {service.shortTitle}
                      </h3>

                      <p
                        className={`text-sm leading-relaxed transition-colors duration-500 ${
                          activeIndex === index
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        {service.description}
                      </p>

                      {/* Tech stack preview */}
                      <div
                        className={`mt-4 text-xs font-light tracking-wider transition-all duration-500 ${
                          activeIndex === index
                            ? "text-amber-400/80 opacity-100"
                            : "text-gray-600 opacity-60"
                        }`}
                      >
                        {service.tech}
                      </div>
                    </div>

                    {/* Performance metric */}
                    <div
                      className={`text-right transition-all duration-500 ${
                        activeIndex === index
                          ? "opacity-100 scale-110"
                          : "opacity-40"
                      }`}
                    >
                      <div
                        className={`text-lg font-light ${
                          activeIndex === index
                            ? "text-amber-400"
                            : "text-gray-500"
                        }`}
                      >
                        {service.metric}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {service.metricLabel}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className={`absolute -inset-4 bg-gradient-to-r from-amber-500/0 to-rose-500/0 rounded-3xl blur-2xl transition-all duration-700 -z-10 ${
                    activeIndex === index
                      ? "from-amber-500/20 to-rose-500/20"
                      : "group-hover:from-amber-500/5 group-hover:to-rose-500/5"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Right: Dynamic Content Display */}
          <div
            className={`relative transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-12 opacity-0"
            }`}
          >
            {/* Main display area */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
              {/* Premium border effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-transparent to-rose-500/20 rounded-[2rem] blur-xl opacity-60" />

              <div className="relative h-full border border-amber-500/20 rounded-3xl overflow-hidden">
                {/* Content overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20" />

                {/* Dynamic background pattern */}
                <div className="absolute inset-0 z-10">
                  <div
                    className={`w-full h-full transition-all duration-1000 ${
                      activeIndex === 0
                        ? "bg-gradient-to-br from-blue-900/20 to-cyan-900/10"
                        : activeIndex === 1
                        ? "bg-gradient-to-br from-purple-900/20 to-violet-900/10"
                        : "bg-gradient-to-br from-emerald-900/20 to-teal-900/10"
                    }`}
                  />

                  {/* Animated geometric shapes */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 bg-amber-400/30 rounded-full transition-all duration-1000`}
                        style={{
                          left: `${20 + i * 7}%`,
                          top: `${30 + Math.sin(i) * 20}%`,
                          animationDelay: `${i * 0.2}s`,
                          animation:
                            activeIndex === Math.floor(i / 4)
                              ? "pulse 2s infinite"
                              : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Service content */}
                <div className="relative z-30 h-full flex flex-col justify-end p-8">
                  <div className="space-y-6">
                    {/* Service title */}
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-extralight text-white mb-2">
                        {services[activeIndex].title}
                      </h3>
                      <div className="w-16 h-[2px] bg-gradient-to-r from-amber-400 to-rose-500" />
                    </div>

                    {/* Detailed description */}
                    <p className="text-gray-300 text-base leading-relaxed font-light">
                      {services[activeIndex].details}
                    </p>

                    {/* Action area */}
                    <div className="flex items-center justify-between pt-4">
                      <button className="group relative overflow-hidden">
                        <div className="relative bg-gradient-to-r from-amber-500 to-rose-500 p-[1px] rounded-full">
                          <div className="bg-black rounded-full px-6 py-3 group-hover:bg-transparent transition-all duration-500">
                            <span className="text-white text-sm font-light tracking-wider group-hover:text-black transition-colors duration-500">
                              LEARN MORE
                            </span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-rose-500 opacity-0 group-hover:opacity-30 rounded-full blur-xl transition-opacity duration-500" />
                      </button>

                      {/* Progress indicators with auto-loop visualization */}
                      <div className="flex space-x-2">
                        {services.map((_, idx) => (
                          <div
                            key={idx}
                            className={`relative w-8 h-2 rounded-full transition-all duration-500 cursor-pointer ${
                              activeIndex === idx
                                ? "bg-amber-400/20"
                                : "bg-gray-600 hover:bg-gray-500"
                            }`}
                            onClick={() => handleServiceClick(idx)}
                          >
                            {/* Progress bar for active item */}
                            {activeIndex === idx && !isPaused && (
                              <div
                                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full origin-left animate-pulse"
                                style={{
                                  animation: "progressBar 4s linear infinite",
                                }}
                              />
                            )}
                            {/* Static active state when paused */}
                            {activeIndex === idx && isPaused && (
                              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating metrics */}
            <div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-amber-500/10 to-rose-500/10 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6">
              <div className="text-center">
                <div className="text-2xl font-extralight text-amber-400 mb-1">
                  {services[activeIndex].metric}
                </div>
                <div className="text-xs text-gray-400 font-light tracking-wider">
                  {services[activeIndex].metricLabel}
                </div>
              </div>
            </div>

            {/* Pause/Play indicator */}
            <div className="absolute top-4 right-4">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isPaused ? "bg-amber-400" : "bg-amber-400/40"
                }`}
              >
                {!isPaused && (
                  <div className="absolute inset-0 bg-amber-400/20 rounded-full animate-ping" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div
          className={`mt-24 text-center transform transition-all duration-1000 delay-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="inline-flex items-center space-x-8">
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-amber-500/40" />
            <div className="text-amber-400/60 text-sm font-light tracking-[0.3em]">
              EXCELLENCE DELIVERED
            </div>
            <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-amber-500/40" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes hexFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.1;
          }
          25% {
            transform: translateY(-20px) rotate(90deg) scale(1.2);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-10px) rotate(180deg) scale(0.8);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-30px) rotate(270deg) scale(1.1);
            opacity: 0.4;
          }
        }

        @keyframes progressBar {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesSection;
