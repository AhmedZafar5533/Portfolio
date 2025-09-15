import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

// Constants
const TESTIMONIALS_DATA = [
  {
    quote:
      "Their visionary approach elevated our entire digital ecosystem to unprecedented heights of sophistication.",
    author: "Victoria Sterling",
    position: "Founder & Creative Director",
    company: "Luxe Atelier",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    industry: "High Fashion",
    rating: 5.0,
    projectValue: "$2.8M",
  },
  {
    quote:
      "Pure artistry meets flawless execution. They transformed our vision into a masterpiece that speaks volumes.",
    author: "Alexander Blackwood",
    position: "Executive Chairman",
    company: "Prestige Holdings",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    industry: "Investment Banking",
    rating: 5.0,
    projectValue: "$4.2M",
  },
  {
    quote:
      "Excellence redefined. Their innovative methodology delivered results that exceeded every benchmark we set.",
    author: "Sophia Montclair",
    position: "Chief Innovation Officer",
    company: "Platinum Ventures",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    industry: "Technology",
    rating: 5.0,
    projectValue: "$3.5M",
  },
  {
    quote:
      "They don't just create brands—they craft legacies. Our market presence has been completely transformed.",
    author: "Emmanuel Laurent",
    position: "Global Brand Director",
    company: "Elite Consortium",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    industry: "Luxury Goods",
    rating: 5.0,
    projectValue: "$5.1M",
  },
];

const METRICS_DATA = [
  {
    value: "20+",
    label: "Projects Delivered",
    sublabel: "Worldwide Excellence",
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    sublabel: "Consistent Quality",
  },
  {
    value: "$50K+",
    label: "Revenue Generated",
    sublabel: "For Our Clients",
  },
];

const AUTO_SLIDE_INTERVAL = 6000;
const INTERSECTION_THRESHOLD = 0.2;

// Utility functions
const generateRandomPosition = () => ({
  left: `${20 + Math.random() * 60}%`,
  top: `${10 + Math.random() * 80}%`,
});

// Memoized Components
const FloatingOrb = React.memo(
  ({ delay, scale = 1, duration = 20, position, scrollY }) => (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: `${120 * scale}px`,
        height: `${120 * scale}px`,
        background: `radial-gradient(circle, 
        rgba(255, 223, 186, 0.03) 0%, 
        rgba(255, 184, 108, 0.02) 40%, 
        transparent 70%)`,
        left: position.left,
        top: position.top,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        filter: "blur(40px)",
        animation: "premiumFloat infinite ease-in-out",
        transform: `translateY(${scrollY * 0.1}px)`,
      }}
    />
  )
);

FloatingOrb.displayName = "FloatingOrb";

const StarIcon = React.memo(({ isActive, delay }) => (
  <div
    className={`w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-500 transition-transform duration-300 ${
      isActive ? "scale-110" : "scale-100"
    }`}
    style={{
      clipPath:
        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      transitionDelay: `${delay}ms`,
    }}
  />
));

StarIcon.displayName = "StarIcon";

const ModernCard = React.memo(({ testimonial, index, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`group cursor-pointer relative transition-all duration-700 ease-out ${
      isActive
        ? "scale-105 z-20"
        : "opacity-80 hover:opacity-100 hover:scale-102"
    }`}
    style={{
      transform: `translateY(${isActive ? -8 : 0}px)`,
      transitionDelay: `${index * 100}ms`,
    }}
  >
    <div
      className={`absolute -inset-4 transition-all duration-700 ${
        isActive
          ? "bg-gradient-to-r from-amber-400/20 via-yellow-300/15 to-orange-500/20 opacity-100 blur-xl"
          : "bg-black group-hover:opacity-60 blur-lg"
      }`}
    />

    <div className="relative bg-black backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-500 border-amber-400/50 shadow-2xl shadow-amber-500/20">
      <div
        className={`absolute top-0 left-0 right-0 h-1 transition-all duration-500 ${
          isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`}
      />

      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div
              className={`absolute -inset-1 rounded-full blur-sm transition-all duration-500 ${
                isActive
                  ? "bg-gradient-to-r from-amber-400 to-yellow-500 opacity-70"
                  : "bg-gradient-to-r from-slate-400 to-slate-600 opacity-0 group-hover:opacity-50"
              }`}
            />
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="relative w-14 h-14 rounded-full object-cover border-2 border-slate-600/50"
              loading="lazy"
            />
          </div>

          <div className="flex-1">
            <h4 className="text-white text-lg font-light mb-1">
              {testimonial.author}
            </h4>
            <p className="text-amber-400 text-sm font-medium mb-1">
              {testimonial.position}
            </p>
            <p className="text-slate-400 text-xs">{testimonial.company}</p>
          </div>
        </div>

        <blockquote className="text-slate-200 text-sm leading-relaxed mb-4 italic line-clamp-3">
          "{testimonial.quote}"
        </blockquote>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} isActive={isActive} delay={i * 50} />
            ))}
          </div>
          <div className="text-slate-500 text-xs">{testimonial.industry}</div>
        </div>
      </div>

      <div
        className={`h-px bg-gradient-to-r transition-all duration-500 ${
          isActive
            ? "from-transparent via-amber-400/60 to-transparent opacity-100"
            : "from-transparent via-slate-600/40 to-transparent opacity-50"
        }`}
      />
    </div>
  </div>
));

ModernCard.displayName = "ModernCard";

const NavigationDot = React.memo(({ isActive, onClick, index }) => (
  <button
    onClick={onClick}
    className="group relative"
    aria-label={`Go to testimonial ${index + 1}`}
  >
    <div
      className={`w-16 h-1 rounded-full transition-all duration-700 ${
        isActive
          ? "bg-gradient-to-r from-amber-400 to-yellow-500"
          : "bg-slate-700 group-hover:bg-slate-600"
      }`}
    />
    {isActive && (
      <div className="absolute inset-0 w-16 h-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 blur-sm opacity-50" />
    )}
  </button>
));

NavigationDot.displayName = "NavigationDot";

const MetricCard = React.memo(({ metric, index }) => (
  <div className="group text-center">
    <div className="relative">
      <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative py-10 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/30 group-hover:border-amber-500/20 rounded-2xl p-8 transition-all duration-500">
        <div className="text-4xl lg:text-5xl font-thin text-white mb-3">
          {metric.value}
        </div>
        <div className="text-amber-400 text-lg font-light mb-2">
          {metric.label}
        </div>
        <div className="text-slate-500 text-sm font-light">
          {metric.sublabel}
        </div>
      </div>
    </div>
  </div>
));

MetricCard.displayName = "MetricCard";

const PremiumTestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  // Memoize orb positions to prevent recalculation
  const orbPositions = useMemo(
    () => Array.from({ length: 6 }, () => generateRandomPosition()),
    []
  );

  const orbConfigs = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        delay: i * 3.5,
        scale: 0.8 + Math.random() * 0.6,
        duration: 25 + Math.random() * 15,
        position: orbPositions[i],
      })),
    [orbPositions]
  );

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, AUTO_SLIDE_INTERVAL);
  }, []);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleTestimonialClick = useCallback(
    (index) => {
      setActiveTestimonial(index);
      stopAutoSlide();
      // Restart auto-slide after user interaction
      setTimeout(startAutoSlide, AUTO_SLIDE_INTERVAL);
    },
    [startAutoSlide, stopAutoSlide]
  );

  // Memoized dynamic background style
  const dynamicBackgroundStyle = useMemo(
    () => ({
      background: `radial-gradient(circle at ${mousePosition.x * 100}% ${
        mousePosition.y * 100
      }%, 
      rgba(255, 184, 108, 0.05) 0%, 
      rgba(251, 191, 36, 0.03) 25%, 
      transparent 60%)`,
    }),
    [mousePosition.x, mousePosition.y]
  );

  const activeTestimonialData = useMemo(
    () => TESTIMONIALS_DATA[activeTestimonial],
    [activeTestimonial]
  );

  // Intersection Observer effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      stopAutoSlide();
    };
  }, [handleScroll, stopAutoSlide]);

  // Auto-slide effect
  useEffect(() => {
    if (isVisible) {
      startAutoSlide();
    }

    return stopAutoSlide;
  }, [isVisible, startAutoSlide, stopAutoSlide]);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-black relative overflow-hidden py-12 lg:py-32"
      onMouseMove={handleMouseMove}
    >
      {/* Premium background elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={dynamicBackgroundStyle}
        />

        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.02) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.02) 75%, rgba(255, 255, 255, 0.02) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.02) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.02) 75%, rgba(255, 255, 255, 0.02) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {orbConfigs.map((config, i) => (
          <FloatingOrb
            key={i}
            delay={config.delay}
            scale={config.scale}
            duration={config.duration}
            position={config.position}
            scrollY={scrollY}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-24 transform transition-all duration-2000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl border border-slate-600/30 rounded-full px-8 py-3 mb-12">
            <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full animate-pulse" />
            <span className="text-amber-300 text-sm font-medium tracking-[0.25em]">
              TESTIMONIALS
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-amber-400 to-transparent" />
          </div>

          <h2 className="text-6xl lg:text-7xl font-thin text-white leading-none tracking-tighter mb-8">
            <span className="block mb-2">CRAFTING</span>
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              EXCELLENCE
            </span>
          </h2>

          <p className="text-slate-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Discover why industry leaders trust us with their most ambitious
            visions
          </p>
        </div>

        {/* Featured testimonial */}
        <div
          className={`transform transition-all duration-2000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <div className="relative max-w-5xl mx-auto mb-16">
            <div className="absolute -inset-8 bg-gradient-to-r from-amber-500/10 via-yellow-400/5 to-amber-600/10 rounded-[3rem] blur-3xl" />

            <div className="relative">
              <div className="bg-gradient-to-br from-white/5 via-white/2 to-transparent backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-12 lg:p-16">
                {/* Decorative corners */}
                <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-amber-400/30 rounded-tl-2xl" />
                <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-amber-400/30 rounded-tr-2xl" />
                <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-amber-400/30 rounded-bl-2xl" />
                <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-amber-400/30 rounded-br-2xl" />

                {/* Quote mark */}
                <div className="flex justify-center mb-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-500/20">
                    <svg
                      className="w-10 h-10 text-slate-900"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                    </svg>
                  </div>
                </div>

                {/* Main quote */}
                <blockquote
                  key={activeTestimonial}
                  className="text-center text-3xl lg:text-4xl font-extralight text-white leading-tight mb-12 max-w-4xl mx-auto animate-[fadeInUp_0.8s_ease-out]"
                >
                  <span className="italic">
                    "{activeTestimonialData.quote}"
                  </span>
                </blockquote>

                {/* Author showcase */}
                <div
                  key={`author-${activeTestimonial}`}
                  className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-12 animate-[fadeInUp_0.8s_ease-out_0.2s_both]"
                >
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 blur-lg opacity-60" />
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
                      <img
                        src={activeTestimonialData.avatar}
                        alt={activeTestimonialData.author}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="text-center lg:text-left">
                    <div className="text-white text-2xl font-light mb-2">
                      {activeTestimonialData.author}
                    </div>
                    <div className="text-amber-400 text-lg font-medium mb-1">
                      {activeTestimonialData.position}
                    </div>
                    <div className="text-slate-400 text-base mb-3">
                      {activeTestimonialData.company} •{" "}
                      {activeTestimonialData.industry}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-6 mb-20">
            {TESTIMONIALS_DATA.map((_, index) => (
              <NavigationDot
                key={index}
                isActive={index === activeTestimonial}
                onClick={() => handleTestimonialClick(index)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Client showcase grid */}
        <div
          className={`transform transition-all duration-2000 delay-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-8">
              <div className="w-24 h-px bg-amber-400" />
              <span className="text-amber-400 text-sm font-light tracking-[0.3em]">
                CLIENT PORTFOLIO
              </span>
              <div className="w-24 h-px bg-amber-400" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {TESTIMONIALS_DATA.map((testimonial, index) => (
              <ModernCard
                key={index}
                testimonial={testimonial}
                index={index}
                isActive={index === activeTestimonial}
                onClick={() => handleTestimonialClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Achievement metrics */}
        <div
          className={`mt-32 transform transition-all duration-2000 delay-1500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {METRICS_DATA.map((metric, index) => (
              <MetricCard key={index} metric={metric} index={index} />
            ))}
          </div>
        </div>

        {/* Luxury signature */}
        <div
          className={`mt-24 text-center transform transition-all duration-2000 delay-2000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center space-x-12">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            <div className="text-amber-400 text-xs tracking-[.5em] font-light">
              PREMIUM • BESPOKE • EXCEPTIONAL
            </div>
            <div className="w-32 h-px bg-gradient-to-l from-transparent via-amber-500/50 to-transparent" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes premiumFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-40px) translateX(20px) rotate(90deg);
          }
          50% {
            transform: translateY(-20px) translateX(-30px) rotate(180deg);
          }
          75% {
            transform: translateY(-60px) translateX(10px) rotate(270deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default PremiumTestimonialsSection;
