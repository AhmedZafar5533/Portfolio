import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Constants
const SERVICES_DATA = [
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
    value: "Transform",
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
    value: "Scale",
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
    value: "Unite",
    color: "emerald",
  },
];

const COLOR_GRADIENTS = {
  amber: "from-amber-400 to-yellow-500",
  purple: "from-purple-400 to-pink-500",
  emerald: "from-emerald-400 to-teal-500",
};

const BACKGROUND_GRADIENTS = {
  0: "from-blue-900/20 to-cyan-900/10",
  1: "from-purple-900/20 to-violet-900/10",
  2: "from-emerald-900/20 to-teal-900/10",
};

const LOOP_INTERVAL = 4000; // 4 seconds
const INTERSECTION_THRESHOLD = 0.2;

// Neural Network Visualization Component
const NeuralNetwork = React.memo(() => {
  const linesRef = useRef();
  const pointsRef = useRef();
  
  const nodes = useMemo(() => {
    const nodePositions = [];
    for (let i = 0; i < 15; i++) {
      nodePositions.push(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      );
    }
    return new Float32Array(nodePositions);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={pointsRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodes.length / 3}
            array={nodes}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#FFD700"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  );
});

NeuralNetwork.displayName = "NeuralNetwork";

// Memoized Components
const HexagonalOrb = React.memo(({ delay, size, opacity, left, top }) => (
  <div
    className="absolute"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left,
      top,
      animationDelay: `${delay}s`,
      animationDuration: "12s",
      animation: "hexFloat infinite ease-in-out",
      opacity: opacity,
    }}
  >
    <div className="w-full h-full bg-gradient-to-br from-amber-400/20 to-rose-400/10 transform rotate-45 rounded-sm blur-sm" />
  </div>
));

HexagonalOrb.displayName = "HexagonalOrb";

const ServiceCard = React.memo(
  ({ service, index, isActive, onClick, onMouseEnter, onMouseLeave }) => (
    <motion.div
      className={`relative group cursor-pointer transition-all duration-700`}
      onClick={() => onClick(index)}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      animate={{
        scale: isActive ? 1.05 : 1,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <motion.div
        className={`relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-700 ${
          isActive
            ? "border-2 border-amber-500/30"
            : "bg-gray-900/20 border border-gray-800/50 hover:border-amber-500/20"
        }`}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {isActive && (
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
            <div className="w-2 h-16 bg-gradient-to-b from-amber-400 to-rose-500 rounded-full" />
          </div>
        )}

        <div className="flex items-start space-x-6">
          <div
            className={`text-4xl font-extralight transition-all duration-500 ${
              isActive ? "text-amber-400 scale-110" : "text-gray-600"
            }`}
          >
            {service.number}
          </div>

          <div className="flex-1">
            <h3
              className={`text-2xl font-light mb-3 transition-colors duration-500 ${
                isActive ? "text-white" : "text-gray-400"
              }`}
            >
              {service.shortTitle}
            </h3>

            <p
              className={`text-sm leading-relaxed transition-colors duration-500 ${
                isActive ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {service.description}
            </p>

            <div
              className={`mt-4 text-xs font-light tracking-wider transition-all duration-500 ${
                isActive
                  ? "text-amber-400/80 opacity-100"
                  : "text-gray-600 opacity-60"
              }`}
            >
              {service.tech}
            </div>
          </div>

          <div
            className={`text-right transition-all duration-500 ${
              isActive ? "opacity-100 scale-110" : "opacity-40"
            }`}
          >
            <div
              className={`text-lg font-light ${
                isActive ? "text-amber-400" : "text-gray-500"
              }`}
            >
              {service.metric}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {service.metricLabel}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={`absolute -inset-4 bg-gradient-to-r from-amber-500/0 to-rose-500/0 rounded-3xl blur-2xl transition-all duration-700 -z-10 ${
          isActive
            ? "from-amber-500/20 to-rose-500/20"
            : "group-hover:from-amber-500/5 group-hover:to-rose-500/5"
        }`}
      />
    </motion.div>
  )
);

ServiceCard.displayName = "ServiceCard";

const ProgressIndicator = React.memo(({ isActive, isPaused, onClick }) => (
  <div
    className={`relative w-8 h-2 rounded-full transition-all duration-500 cursor-pointer ${
      isActive ? "bg-amber-400/20" : "bg-gray-600 hover:bg-gray-500"
    }`}
    onClick={onClick}
  >
    {isActive && !isPaused && (
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full origin-left animate-pulse progress-bar" />
    )}
    {isActive && isPaused && (
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full" />
    )}
  </div>
));

ProgressIndicator.displayName = "ProgressIndicator";

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const activeService = useMemo(
    () => SERVICES_DATA[activeIndex],
    [activeIndex]
  );

  // Generate static orb positions to prevent re-renders
  const orbConfigs = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        delay: i * 1.5,
        size: 6 + Math.random() * 8,
        opacity: 0.1 + Math.random() * 0.2,
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
      })),
    []
  );

  const startLoop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % SERVICES_DATA.length);
      }
    }, LOOP_INTERVAL);
  }, [isPaused]);

  const stopLoop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

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

  const handleServiceClick = useCallback(
    (index) => {
      setActiveIndex(index);
      startLoop();
    },
    [startLoop]
  );

  const handleServiceHover = useCallback((index) => {
    setActiveIndex(index);
    setIsPaused(true);
  }, []);

  const handleServiceLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Intersection Observer effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          const timeout = setTimeout(() => startLoop(), 1000);
          return () => clearTimeout(timeout);
        } else {
          stopLoop();
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
      stopLoop();
    };
  }, [startLoop, stopLoop]);

  const colorGradientClass = useMemo(
    () => COLOR_GRADIENTS[activeService.color],
    [activeService.color]
  );

  const backgroundGradientClass = useMemo(
    () => BACKGROUND_GRADIENTS[activeIndex],
    [activeIndex]
  );

  const dynamicBackgroundStyle = useMemo(
    () => ({
      background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${
        mousePosition.y * 100
      }%, rgba(217, 119, 6, 0.05), transparent 40%)`,
    }),
    [mousePosition.x, mousePosition.y]
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
          style={dynamicBackgroundStyle}
        />
      </div>

      {/* Floating geometric elements */}
      {orbConfigs.map((config, i) => (
        <HexagonalOrb key={i} {...config} />
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
            <span className="text-white transition-all duration-[1000ms] ease-out">
              Digital
            </span>
            <br />
            <span
              className={`bg-gradient-to-r ${colorGradientClass} bg-clip-text text-transparent transition-all duration-[2000ms] ease-out`}
            >
              {activeService.value}
            </span>
          </h2>

          <p className="text-gray-400 text-md sm:text-xl lg:text-2xl font-thin leading-relaxed max-w-4xl mx-auto transition-all duration-[1500ms] ease-out">
            {activeService.description}
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
            {SERVICES_DATA.map((service, index) => (
              <ServiceCard
                key={service.number}
                service={service}
                index={index}
                isActive={activeIndex === index}
                onClick={handleServiceClick}
                onMouseEnter={handleServiceHover}
                onMouseLeave={handleServiceLeave}
              />
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
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-transparent to-rose-500/20 rounded-[2rem] blur-xl opacity-60" />

              <div className="relative h-full border border-amber-500/20 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20" />

                <div className="absolute inset-0 z-10">
                  <div
                    className={`w-full h-full transition-all duration-1000 bg-gradient-to-br ${backgroundGradientClass}`}
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-400/30 rounded-full transition-all duration-1000"
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

                <div className="relative z-30 h-full flex flex-col justify-end p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-extralight text-white mb-2">
                        {activeService.title}
                      </h3>
                      <div className="w-16 h-[2px] bg-gradient-to-r from-amber-400 to-rose-500" />
                    </div>

                    <p className="text-gray-300 text-base leading-relaxed font-light">
                      {activeService.details}
                    </p>

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

                      <div className="flex space-x-2">
                        {SERVICES_DATA.map((_, idx) => (
                          <ProgressIndicator
                            key={idx}
                            isActive={activeIndex === idx}
                            isPaused={isPaused}
                            onClick={() => handleServiceClick(idx)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating metrics */}
            <div className="absolute -bottom-8 -right-8 z-50 bg-gradient-to-r from-amber-500/10 to-rose-500/10 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6">
              <div className="text-center">
                <div className="text-2xl font-extralight text-amber-400 mb-1">
                  {activeService.metric}
                </div>
                <div className="text-xs text-gray-400 font-light tracking-wider">
                  {activeService.metricLabel}
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

        .progress-bar {
          animation: progressBar 4s linear infinite;
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
