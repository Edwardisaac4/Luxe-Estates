import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';
import { stats } from '@/data/mockData';

const features = [
  'Exclusive property portfolio',
  'Personalized service approach',
  'Global market reach',
  'Transparent communication',
];

export default function About() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-700 ${
              isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/about-image.jpg"
                  alt="Luxury property"
                  className="w-full h-[500px] object-cover"
                />
              </div>

              {/* Floating Stats Cards */}
              <div
                className={`absolute -top-6 -left-6 bg-white rounded-xl shadow-xl p-5 transition-all duration-700 delay-300 ${
                  isInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <p className="font-display text-4xl font-bold text-dark">
                  {stats.propertiesSold}+
                </p>
                <p className="font-body text-sm text-dark/60">
                  Properties Sold
                </p>
              </div>

              <div
                className={`absolute -bottom-6 -right-6 bg-dark rounded-xl shadow-xl p-5 transition-all duration-700 delay-500 ${
                  isInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <p className="font-display text-4xl font-bold text-beige">
                  {stats.clientSatisfaction}%
                </p>
                <p className="font-body text-sm text-white/60">
                  Client Satisfaction
                </p>
              </div>

              {/* Decorative Element */}
              <div className="absolute -z-10 top-12 -left-12 w-full h-full border-2 border-beige/30 rounded-2xl" />
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-beige" />
              <span className="font-body text-sm text-dark/60 uppercase tracking-wider">
                About Us
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mb-6">
              About Luxe Estates
            </h2>

            <p className="font-body text-lg text-dark/70 mb-6 leading-relaxed">
              With over {stats.yearsExperience} years of experience in luxury real estate,
              we've helped thousands of clients find their dream properties. Our
              team of expert agents combines deep market knowledge with
              personalized service to deliver exceptional results.
            </p>

            <p className="font-body text-dark/60 mb-8 leading-relaxed">
              We understand that buying or selling a home is more than just a
              transaction—it's a life-changing experience. That's why we're
              dedicated to providing exceptional, personalized service for all of
              our clients.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isInView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-beige/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-beige" />
                  </div>
                  <span className="font-body text-sm text-dark">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="bg-dark text-white hover:bg-dark/90 font-body px-8"
            >
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
