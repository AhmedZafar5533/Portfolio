// MainPage.jsx
import HeroSection from "./hero";
import FeaturedProjectsCarousel from './featured'
import ServicesSection from './services'
import TechWeLove from './techStack'
import TestimonialsSection from './testimonials'
import ArchitecturalContactFooter from './footer'
import Navigation from "./navbar";
import ScrollToTop from "./scrollButton";

export default function MainPage(){
  return(
    <>
      <Navigation />
      {/* Hero Section with Navigation */}
      <HeroSection />
      
      {/* Featured Projects Section - Portfolio */}
      <section id="featured">
        <FeaturedProjectsCarousel />
      </section>
      
      {/* Services Section */}
      <section id="services">
        <ServicesSection />
      </section>
      
      {/* Tech Section - Projects */}
      <section id="tech">
        <TechWeLove />
      </section>
      
      {/* Testimonials Section - About */}
      <section id="testimonials">
        <TestimonialsSection />
      </section>
      
      {/* Footer Section - Contact */}
      <section id="footer">
        <ArchitecturalContactFooter />
      </section>

      <ScrollToTop />
    </>
  )
}