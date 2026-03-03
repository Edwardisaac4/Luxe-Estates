import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';
import { stats } from '@/data/mockData';

const ctaStats = [
  { value: stats.totalProperties, label: 'Properties', suffix: '+' },
  { value: stats.totalAgents, label: 'Expert Agents', suffix: '+' },
  { value: stats.yearsExperience, label: 'Years Experience', suffix: '+' },
  { value: stats.clientSatisfaction, label: 'Satisfaction', suffix: '%' },
];

export default function CTA() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Content */}
          <h2
            className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-700 ${
              isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Ready to Find Your
            <span className="text-beige"> Dream Home?</span>
          </h2>

          <p
            className={`font-body text-lg text-white/70 mb-10 transition-all duration-700 delay-100 ${
              isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Let our expert agents guide you through the journey of finding the
            perfect property. Your dream home is just a click away.
          </p>

          {/* Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-200 ${
              isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              asChild
              size="lg"
              className="bg-beige text-dark hover:bg-beige/90 font-body font-medium px-8 animate-pulse-glow"
            >
              <Link to="/listings">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-body px-8"
            >
              <Link to="/contact">
                <Phone className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10 transition-all duration-700 delay-300 ${
              isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {ctaStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-beige mb-1">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="font-body text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-beige to-transparent opacity-30" />
    </section>
  );
}
