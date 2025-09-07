import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrolled / maxHeight) * 100;
      
      setScrollProgress(progress);
      
      if (scrolled > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 mb-5 transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' 
          : 'opacity-0 translate-y-8 pointer-events-none scale-50'
      }`}
    >
      <div className="relative group cursor-pointer" onClick={scrollToTop}>
        {/* Outer glow ring */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-400/20 via-rose-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
        
        {/* Progress circle background */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            {/* Background circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
              className="backdrop-blur-sm"
            />
            {/* Progress circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-300 filter drop-shadow-sm"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner button container */}
          <div className="absolute inset-2 rounded-full bg-black/80 backdrop-blur-xl border border-amber-500/30 flex items-center justify-center transition-all duration-500 group-hover:bg-black/90 group-hover:border-amber-400/60 group-hover:scale-105">
            {/* Animated gradient background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            
            {/* Arrow icon with luxury styling */}
            <div className="relative z-10">
              <div className="w-6 h-6 flex items-center justify-center">
                {/* Custom luxury arrow */}
                <svg 
                  className="w-5 h-5 text-amber-400 transition-all duration-500 group-hover:text-white group-hover:-translate-y-0.5 group-hover:scale-110" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  {/* Arrow shaft */}
                  <path 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 19V5"
                    className="drop-shadow-sm"
                  />
                  {/* Arrow head - left */}
                  <path 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M5 12l7-7"
                    className="drop-shadow-sm"
                  />
                  {/* Arrow head - right */}
                  <path 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M19 12l-7-7"
                    className="drop-shadow-sm"
                  />
                </svg>
              </div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full animate-ping"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${1.5 + Math.random()}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Rotating accent ring */}
          <div className="absolute -inset-1 rounded-full border border-gradient-to-r from-transparent via-amber-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-spin" style={{ animationDuration: '8s' }}></div>
        </div>

        {/* Premium tooltip */}
        <div className="absolute bottom-full right-0 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
          <div className="relative">
            {/* Tooltip background with glassmorphism */}
            <div className="bg-black/90 backdrop-blur-xl justify-center text-center border border-amber-500/20 text-amber-400 text-xs px-4 py-3 rounded-xl whitespace-nowrap font-light tracking-wider shadow-2xl shadow-black/50">
             
              {/* Progress text */}
              <div className="text-amber-300/70 text-[10px] mr-2 mt-1 text-center font-mono">
                {Math.round(scrollProgress)}%
              </div>
            </div>
            {/* Tooltip arrow */}
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black/90"></div>
            {/* Subtle glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/10 to-rose-500/10 blur-sm -z-10"></div>
          </div>
        </div>

        {/* Ambient light effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/5 via-rose-500/5 to-purple-500/5 blur-2xl scale-150 opacity-0 group-hover:opacity-100 transition-all duration-1000 -z-10"></div>
      </div>

      <style jsx>{`
        @keyframes luxuryPulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        .animate-luxury-pulse {
          animation: luxuryPulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ScrollToTop;