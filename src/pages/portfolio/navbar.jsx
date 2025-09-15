import React, { useState, useEffect } from "react";

const Navigation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    // Scroll listener
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100; // Offset for fixed navbar
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }

    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  // Navigation items with their corresponding section IDs
  const navItems = [
    { name: "PORTFOLIO", id: "featured" },
    { name: "EXPERTISE", id: "services" },
    { name: "CLIENT STORIES", id: "testimonials" },
    { name: "CONNECT", id: "footer" },
  ];

  const mobileNavItems = [
    { name: "PORTFOLIO", id: "featured" },
    { name: "EXPERTISE", id: "services" },
    { name: "CLIENT STORIES", id: "testimonials" },
    { name: "CONNECT", id: "footer" },
  ];

  return (
    <>
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrollY > 50
            ? "bg-black/95 backdrop-blur-xl border-b border-amber-500/20"
            : ""
        }`}
      >
        <div className="max-w-7xl  mx-auto flex justify-between items-center px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
          {/* Logo / Name */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-white font-light text-base sm:text-lg md:text-xl tracking-[0.15em] sm:tracking-[0.2em] hover:text-amber-400 transition-colors duration-300"
            >
              AURENIX
            </button>
          </div>

          {/* Nav Links - Hidden on mobile, shown on md+ */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-12 text-xs lg:text-sm text-gray-300 font-light tracking-wider">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item.id)}
                className="relative cursor-pointer group transition-all duration-500 hover:text-white"
              >
                <span className="transition-all duration-300 group-hover:tracking-widest">
                  {item.name}
                </span>
                <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-gradient-to-r from-amber-700 to-yellow-400 transition-all duration-500 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative z-[9999] w-6 h-6 flex flex-col justify-center items-center focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {/* Top bar */}
            <span
              className={`absolute h-0.5 w-6 bg-amber-400 transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "rotate-45" : "-translate-y-2"
              }`}
            ></span>

            {/* Middle bar */}
            <span
              className={`absolute h-0.5 w-6 bg-amber-400 transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>

            {/* Bottom bar */}
            <span
              className={`absolute h-0.5 w-6 bg-amber-400 transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "-rotate-45" : "translate-y-2"
              }`}
            ></span>
          </button>

          {/* Time - Hidden on mobile */}
          <div className="hidden md:block text-xs text-gray-400 font-light tracking-widest">
            {currentTime}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden absolute top-0 left-0 w-screen h-screen bg-black/95 backdrop-blur-xl z-[9998] transition-all duration-500 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {mobileNavItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item.id)}
                className="text-white text-xl font-light tracking-[0.2em] hover:text-amber-400 transition-all duration-300 hover:tracking-widest"
              >
                {item.name}
              </button>
            ))}
            <div className="mt-8 text-amber-400 text-sm font-light tracking-widest">
              {currentTime}
            </div>
          </div>
        </div>
      </nav>

      {/* Luxury side indicators - Hidden on mobile */}
      <div className="hidden lg:flex fixed right-4 xl:right-8 top-1/2 transform -translate-y-1/2 flex-col space-y-6 z-30">
        {[
          { id: "hero", label: "Home" },
          { id: "featured", label: "Portfolio" },
          { id: "services", label: "Services" },
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(item.id)}
            className="group cursor-pointer relative"
            title={item.label}
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500/30 to-transparent group-hover:from-amber-500 transition-all duration-300" />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/90 text-amber-400 text-xs px-2 py-1 rounded whitespace-nowrap">
                {item.label}
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default Navigation;
