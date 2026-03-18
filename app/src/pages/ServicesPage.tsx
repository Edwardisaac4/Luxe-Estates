import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { Link } from 'react-router-dom';
import { useInView } from '@/hooks/useInView';
import { services } from '@/data/mockData';
import {
  Search,
  Building,
  TrendingUp,
  Shield,
  Handshake,
  Landmark,
  BedDouble,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Search,
  Building,
  TrendingUp,
  Shield,
  Handshake,
  Landmark,
  BedDouble,
};

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const Icon = iconMap[service.icon] || Search;

  return (
    <div
      ref={ref}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-dark/5 hover:shadow-xl transition-all duration-500"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms, box-shadow 0.3s ease`,
      }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-0 bg-gradient-to-r from-beige to-dark group-hover:w-full transition-all duration-500" />

      <div className="p-8">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-light flex items-center justify-center mb-6 group-hover:bg-dark transition-colors duration-300">
          <Icon className="w-7 h-7 text-dark group-hover:text-beige transition-colors duration-300" />
        </div>

        {/* Title & Description */}
        <h3 className="font-display text-2xl font-bold text-dark mb-3">
          {service.title}
        </h3>
        <p className="font-body text-dark/60 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Feature list */}
        <ul className="space-y-3 mb-8">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-beige shrink-0" />
              <span className="font-body text-sm text-dark/70">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 font-body text-sm font-semibold text-dark group/link hover:text-beige transition-colors duration-300"
        >
          Get Started
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}

function HeroSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="relative min-h-[50vh] flex items-center bg-dark overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #c9a96e 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #c9a96e 0%, transparent 40%)`,
        }}
      />
      <div className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 60px,
            rgba(201,169,110,0.04) 60px,
            rgba(201,169,110,0.04) 61px
          )`,
        }}
      />

      <div
        ref={ref}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
      >
        <div
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-beige" />
            <span className="font-body text-sm text-beige/80 uppercase tracking-widest">
              What We Offer
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Our <span className="text-beige">Services</span>
          </h1>
          <p className="font-body text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            From property search to joint ventures and short-term rentals — we deliver comprehensive real estate solutions that move with your ambitions.
          </p>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="py-24 bg-dark">
      <div
        ref={ref}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-0.5 bg-beige" />
          <span className="font-body text-sm text-beige/80 uppercase tracking-widest">
            Ready to Begin?
          </span>
          <div className="w-12 h-0.5 bg-beige" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
          Let's Build Your Real Estate Future
        </h2>
        <p className="font-body text-white/60 text-lg mb-10 max-w-2xl mx-auto">
          Whether you're buying, investing, or looking to grow through joint ventures — our team is ready to guide you every step of the way.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-beige text-dark font-body font-semibold rounded-lg hover:bg-beige/90 transition-colors duration-300 group"
          >
            Contact Us
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            to="/listings"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-body font-semibold rounded-lg hover:bg-white/5 transition-colors duration-300"
          >
            Browse Listings
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-light">
      <Navigation />
      <HeroSection />

      {/* Services Grid */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
