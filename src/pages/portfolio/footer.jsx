import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Send,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Star,
  Globe,
  Clock,
  AlertCircle,
} from "lucide-react";

const ArchitecturalContactFooter = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [activeCard, setActiveCard] = useState(null);
  const [ripples, setRipples] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const contactRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (contactRef.current) observer.observe(contactRef.current);

    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
      clearInterval(timeInterval);
    };
  }, []);

  const validate = useCallback((data) => {
    const errors = {};
    if (!data.name.trim()) errors.name = "Name is required.";
    if (!data.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid.";
    }
    if (!data.service) errors.service = "Please select a service.";
    if (!data.message.trim()) errors.message = "Message is required.";
    return errors;
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const createRipple = (e, cardIndex) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
      cardIndex,
    };
    setRipples((prev) => [...prev, ripple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await fetch(import.meta.env.VITE_API_URL || "https://portfolio-89bv.vercel.app/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: formData.email,
          subject: `Subject: ${formData.service}`,
          text: formData.message,
        }),
      });

      if (!success.ok) {
        const data = await success.json();
        alert(data.message || "Failed to send email");
        setIsSubmitting(false);
        return;
      }

      if (success.status === 200) {
        setIsSubmitting(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setFormData({ name: "", email: "", service: "", message: "" });
        }, 3000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again later.");
      setIsSubmitting(false);
    }
  };

  const FloatingOrb = ({ delay, size, color }) => (
    <div
      className="absolute rounded-full opacity-60"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${color}40, transparent)`,
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${15 + Math.random() * 10}s`,
        animation: "luxuryOrbit infinite linear",
      }}
    />
  );

  return (
    <div className="bg-black relative overflow-hidden min-h-screen">
      {/* Floating luxury orbs - hidden on very small screens */}
      <div className="hidden sm:block">
        {Array.from({ length: 6 }).map((_, i) => (
          <FloatingOrb
            key={i}
            delay={i * 2}
            size={60 + Math.random() * 100}
            color={["#FFD700", "#FFA500", "#FF6347"][i % 3]}
          />
        ))}
      </div>

      {/* Contact Section */}
      <section
        ref={contactRef}
        className="relative z-10 py-12 sm:py-16 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Architectural Header */}
          <div
            className={`text-center mb-12 sm:mb-16 lg:mb-24 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-16 sm:translate-y-32 opacity-0"
            }`}
          >
            <div className="relative inline-block">
              <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-amber-500/5 via-rose-500/5 to-amber-500/5 blur-xl sm:blur-3xl" />
              <div className="relative">
                <div className="text-4xl sm:text-6xl lg:text-8xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-rose-400 mb-4 sm:mb-6 tracking-tighter">
                  CONNECT
                </div>
                <div className="w-16 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6 sm:mb-8" />
                <p className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed sm:leading-loose px-4">
                  Every great project begins with a conversation. Let's
                  architect something extraordinary together.
                </p>
              </div>
            </div>
          </div>

          {/* Main Contact Layout */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-16">
            {/* Contact Cards Column */}
            <div
              className={`lg:col-span-2 space-y-4 sm:space-y-6 transform transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-12 sm:-translate-x-24 opacity-0"
              }`}
            >
              {[
                {
                  icon: Mail,
                  title: "Direct Line",
                  value: "trentbolt533@gmail.com",
                  subtitle: "Response within 2 hours",
                  gradient: "from-amber-500 to-yellow-500",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`group relative overflow-hidden bg-gradient-to-br from-gray-900/60 to-black/80 backdrop-blur-xl border border-amber-500/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 hover:border-amber-500/40 transition-all duration-700 cursor-pointer ${
                    activeCard === idx ? "scale-105" : "hover:scale-102"
                  }`}
                  onClick={(e) => {
                    createRipple(e, idx);
                    setActiveCard(idx);
                    setTimeout(() => setActiveCard(null), 2000);
                  }}
                >
                  {ripples
                    .filter((r) => r.cardIndex === idx)
                    .map((ripple) => (
                      <div
                        key={ripple.id}
                        className="absolute pointer-events-none rounded-full bg-amber-400/20"
                        style={{
                          left: ripple.x - 25,
                          top: ripple.y - 25,
                          width: 50,
                          height: 50,
                          animation: "rippleExpand 1s ease-out forwards",
                        }}
                      />
                    ))}

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center group-hover:rotate-12 transition-transform duration-500`}
                      >
                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-black" />
                      </div>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" />
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <h3 className="text-white text-lg sm:text-xl font-light tracking-wide">
                        {item.title}
                      </h3>
                      <div className="text-amber-300 text-base sm:text-lg font-medium break-all">
                        {item.value}
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm font-light">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              ))}
            </div>

            {/* Form Column */}
            <div
              className={`lg:col-span-3 mt-8 lg:mt-0 transform transition-all duration-1000 delay-700 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-12 sm:translate-x-24 opacity-0"
              }`}
            >
              <div className="relative">
                <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 hidden sm:block">
                  <div className="w-full h-full border border-amber-500/20 rounded-2xl sm:rounded-3xl lg:rounded-[3rem]" />
                  <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-t-2 border-l-2 border-amber-500/40" />
                  <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-t-2 border-r-2 border-amber-500/40" />
                  <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-b-2 border-l-2 border-amber-500/40" />
                  <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-b-2 border-r-2 border-amber-500/40" />
                </div>

                <div className="relative bg-gradient-to-br from-gray-900/40 to-black/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
                  {showSuccess ? (
                    <div className="text-center space-y-6 sm:space-y-8 py-12 sm:py-16">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 flex items-center justify-center mx-auto">
                        <Star className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-black" />
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-2xl sm:text-3xl font-light text-white">
                          Message Received
                        </h3>
                        <p className="text-gray-300 font-light text-sm sm:text-base">
                          We'll craft a response within 4 hours
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 sm:space-y-8">
                      <div className="text-center space-y-3 sm:space-y-4">
                        <div className="inline-flex items-center space-x-2 text-amber-300 text-xs sm:text-sm tracking-[0.3em] font-light">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{currentTime}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-thin text-white tracking-wide">
                          Project Inquiry
                        </h2>
                      </div>

                      <form
                        onSubmit={handleSubmit}
                        className="space-y-6 sm:space-y-8"
                        noValidate
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                          <div className="space-y-2 sm:space-y-3">
                            <label className="text-amber-300/80 text-xs tracking-[0.2em] font-light">
                              NAME
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className={`w-full bg-transparent border-0 border-b-2 pb-2 sm:pb-3 text-white text-base sm:text-lg font-light placeholder-gray-500 focus:outline-none transition-all duration-500 ${
                                formErrors.name
                                  ? "border-red-500/60"
                                  : "border-gray-600 focus:border-amber-400"
                              }`}
                              placeholder="Your full name"
                            />
                            {formErrors.name && (
                              <div className="flex items-center space-x-2 text-red-500/80 text-xs pt-1">
                                <AlertCircle size={14} />
                                <span>{formErrors.name}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2 sm:space-y-3">
                            <label className="text-amber-300/80 text-xs tracking-[0.2em] font-light">
                              EMAIL
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`w-full bg-transparent border-0 border-b-2 pb-2 sm:pb-3 text-white text-base sm:text-lg font-light placeholder-gray-500 focus:outline-none transition-all duration-500 ${
                                formErrors.email
                                  ? "border-red-500/60"
                                  : "border-gray-600 focus:border-amber-400"
                              }`}
                              placeholder="your@company.com"
                            />
                            {formErrors.email && (
                              <div className="flex items-center space-x-2 text-red-500/80 text-xs pt-1">
                                <AlertCircle size={14} />
                                <span>{formErrors.email}</span>
                              </div>
                            )}
                          </div>

                          <div className="sm:col-span-2 space-y-2 sm:space-y-3">
                            <label className="text-amber-300/80 text-xs tracking-[0.2em] font-light">
                              SERVICE TYPE
                            </label>
                            <select
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              className={`w-full bg-transparent border-0 border-b-2 pb-2 sm:pb-3 text-white text-base sm:text-lg font-light focus:outline-none transition-all duration-500 ${
                                formErrors.service
                                  ? "border-red-500/60"
                                  : "border-gray-600 focus:border-amber-400"
                              }`}
                            >
                              <option value="" className="bg-black">
                                Select service
                              </option>
                              <option value="UI/UX design" className="bg-black">
                                UI/UX Design
                              </option>
                              <option
                                value="Web development"
                                className="bg-black"
                              >
                                Web Development
                              </option>
                              <option value="Desktop app" className="bg-black">
                                Desktop App
                              </option>
                            </select>
                            {formErrors.service && (
                              <div className="flex items-center space-x-2 text-red-500/80 text-xs pt-1">
                                <AlertCircle size={14} />
                                <span>{formErrors.service}</span>
                              </div>
                            )}
                          </div>

                          <div className="sm:col-span-2 space-y-2 sm:space-y-3">
                            <label className="text-amber-300/80 text-xs tracking-[0.2em] font-light">
                              PROJECT VISION
                            </label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows={4}
                              className={`w-full bg-transparent border-2 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white text-base sm:text-lg font-light placeholder-gray-500 focus:outline-none transition-all duration-500 resize-none ${
                                formErrors.message
                                  ? "border-red-500/60"
                                  : "border-gray-600/50 focus:border-amber-400/60"
                              }`}
                              placeholder="Describe your vision, goals, and what success looks like for this project..."
                            />
                            {formErrors.message && (
                              <div className="flex items-center space-x-2 text-red-500/80 text-xs pt-1">
                                <AlertCircle size={14} />
                                <span>{formErrors.message}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 sm:pt-8 border-t border-amber-500/20 space-y-4 sm:space-y-0">
                          <div className="text-center sm:text-left">
                            <div className="text-gray-400 text-xs sm:text-sm font-light">
                              Typical response time:{" "}
                              <span className="text-amber-300">2-4 hours</span>
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative overflow-hidden w-full sm:w-auto"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-rose-500 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                            <div className="relative bg-gradient-to-r from-amber-500 to-rose-500 p-[2px] rounded-xl sm:rounded-2xl">
                              <div className="bg-black rounded-xl sm:rounded-2xl px-8 sm:px-12 py-4 sm:py-5 group-hover:bg-transparent transition-all duration-700">
                                <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                                  <span className="text-white group-hover:text-black text-xs sm:text-sm font-light tracking-[0.2em] transition-colors duration-700">
                                    {isSubmitting
                                      ? "TRANSMITTING"
                                      : "SEND INQUIRY"}
                                  </span>
                                  <Send
                                    className={`w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-black transition-all duration-700 ${
                                      isSubmitting
                                        ? "animate-pulse"
                                        : "group-hover:translate-x-1"
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="relative border-t border-amber-500/10">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 via-transparent to-rose-900/10" />
          <svg
            className="absolute bottom-0 left-0 w-full h-16 sm:h-24 lg:h-32 opacity-10"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <polygon
              points="0,100 300,0 600,60 900,20 1200,80 1200,100"
              fill="url(#footerGradient)"
            />
            <defs>
              <linearGradient
                id="footerGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#FFA500" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FF6347" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-12">
            <div className="sm:col-span-2 space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="text-white font-extralight text-2xl sm:text-3xl tracking-[0.3em]">
                  AURENIX
                </div>
                <div className="w-16 sm:w-24 h-[2px] bg-gradient-to-r from-amber-400 to-rose-500" />
                <p className="text-gray-300 font-light leading-relaxed sm:leading-loose text-base sm:text-lg">
                  Precision craftsmanship meets visionary design. We don't just
                  build products—we architect experiences.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xs">
                <div className="bg-gradient-to-br from-amber-500/10 to-rose-500/10 border border-amber-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-extralight text-amber-400 mb-1 sm:mb-2">
                    20+
                  </div>
                  <div className="text-gray-400 text-xs tracking-wider">
                    PROJECTS
                  </div>
                </div>
                <div className="bg-gradient-to-br from-rose-500/10 to-amber-500/10 border border-rose-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-extralight text-rose-400 mb-1 sm:mb-2">
                    ★★★★★
                  </div>
                  <div className="text-gray-400 text-xs tracking-wider">
                    RATING
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-amber-300 text-xs sm:text-sm tracking-[0.3em] font-light">
                EXPLORE
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {["Home", "Projects", "Services", "Contact"].map(
                  (link, idx) => (
                    <div key={idx} className="group cursor-pointer">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-1 h-1 bg-amber-400 rounded-full group-hover:w-4 sm:group-hover:w-6 group-hover:h-[2px] transition-all duration-500" />
                        <span className="text-gray-400 group-hover:text-white group-hover:tracking-wider transition-all duration-300 font-light text-sm sm:text-base">
                          {link}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-amber-300 text-xs sm:text-sm tracking-[0.3em] font-light">
                SERVICES
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Frontend Dev",
                  "Backend Dev",
                  "Desktop App Dev",
                  "Consulting",
                ].map((service, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-1 h-1 bg-rose-400 rounded-full group-hover:w-4 sm:group-hover:w-6 group-hover:h-[2px] transition-all duration-500" />
                      <span className="text-gray-400 group-hover:text-white group-hover:tracking-wider transition-all duration-300 font-light text-sm sm:text-base">
                        {service}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-amber-300 text-xs sm:text-sm tracking-[0.3em] font-light">
                CONNECT
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {["Instagram", "Dribbble", "LinkedIn", "Twitter"].map(
                  (social, idx) => (
                    <div
                      key={idx}
                      className="group cursor-pointer flex items-center justify-between"
                    >
                      <span className="text-gray-400 group-hover:text-white transition-colors duration-300 font-light text-sm sm:text-base">
                        {social}
                      </span>
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 opacity-0 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-500" />
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6">
              <h4 className="text-amber-300 text-xs sm:text-sm tracking-[0.3em] font-light">
                INSIDER ACCESS
              </h4>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                  Monthly insights on design trends, creative processes, and
                  industry perspectives.
                </p>

                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full bg-transparent border-0 border-b-2 border-gray-600 pb-3 sm:pb-4 text-white text-base sm:text-lg font-light placeholder-gray-500 focus:border-amber-400 focus:outline-none transition-all duration-500 pr-8"
                  />
                  <button className="absolute right-0 bottom-1 sm:bottom-2 group-hover:bottom-2 sm:group-hover:bottom-3 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:text-rose-400 transition-colors duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-6 sm:space-y-8 lg:flex-row lg:justify-between lg:items-center lg:space-y-0 pt-12 sm:pt-16 mt-12 sm:mt-16 border-t border-amber-500/20">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-gray-500 text-xs sm:text-sm font-light">
              <span>© 2025 AURENIX</span>
              <div className="flex items-center space-x-4 sm:space-x-6">
                <span className="hover:text-amber-300 transition-colors cursor-pointer">
                  Privacy
                </span>
                <span className="hover:text-amber-300 transition-colors cursor-pointer">
                  Terms
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2 text-gray-500 text-xs sm:text-sm font-light">
                <span>Crafted with</span>
                <div className="w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-amber-300">precision</span>
                <span>&</span>
                <span className="text-rose-300">passion</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 sm:space-x-6">
              <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
              <div className="text-amber-300 text-xs tracking-[0.3em] font-light">
                EST. MMXXIV
              </div>
              <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-l from-transparent to-rose-400" />
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes luxuryOrbit {
          0% {
            transform: rotate(0deg) translateX(30px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(30px) rotate(-360deg);
          }
        }

        @keyframes rippleExpand {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(8);
            opacity: 0;
          }
        }

        select option {
          background: #000;
          color: #fff;
        }

        @media (max-width: 640px) {
          @keyframes luxuryOrbit {
            0% {
              transform: rotate(0deg) translateX(20px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translateX(20px) rotate(-360deg);
            }
          }
        }
      `}</style>
    </div>
  );
};

export default ArchitecturalContactFooter;
