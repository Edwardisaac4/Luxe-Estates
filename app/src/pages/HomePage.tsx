import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import FeaturedListings from '@/sections/FeaturedListings';
import Services from '@/sections/Services';
import About from '@/sections/About';
import Testimonials from '@/sections/Testimonials';
import CTA from '@/sections/CTA';
import Footer from '@/sections/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-light">
      <Navigation />
      <main>
        <Hero />
        <FeaturedListings />
        <Services />
        <About />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
