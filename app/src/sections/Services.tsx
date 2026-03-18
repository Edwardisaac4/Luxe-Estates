import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Building, TrendingUp, Shield, Handshake, Landmark, BedDouble, ChevronRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { services } from '@/data/mockData';

const iconMap: Record<string, React.ElementType> = {
  Search,
  Building,
  TrendingUp,
  Shield,
  Handshake,
  Landmark,
  BedDouble,
};

export default function Services() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const [activeService, setActiveService] = useState(0);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-beige" />
            <span className="font-body text-sm text-dark/60 uppercase tracking-wider">
              What We Offer
            </span>
            <div className="w-12 h-0.5 bg-beige" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mb-4">
            Our Services
          </h2>
          <p className="font-body text-dark/60">
            Comprehensive real estate solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Service List */}
          <div className="space-y-4">
            {services.slice(0, 4).map((service, index) => {
              const Icon = iconMap[service.icon] || Search;
              const isActive = activeService === index;

              return (
                <div
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-500 ${
                    isActive
                      ? 'bg-dark text-white shadow-xl'
                      : 'bg-light text-dark hover:bg-beige/10'
                  } ${
                    isInView
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-12'
                  }`}
                  style={{
                    transitionDelay: isInView ? `${200 + index * 100}ms` : '0ms',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        isActive ? 'bg-beige text-dark' : 'bg-white text-dark'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display text-xl font-semibold">
                          {service.title}
                        </h3>
                        <ChevronRight
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isActive ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                      <p
                        className={`font-body text-sm mb-3 ${
                          isActive ? 'text-white/80' : 'text-dark/60'
                        }`}
                      >
                        {service.description}
                      </p>
                      
                      {/* Features - Only show when active */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          isActive ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <ul className="space-y-2">
                          {service.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-sm text-white/70"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-beige" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Service Image */}
          <div
            className={`relative h-[500px] rounded-2xl overflow-hidden transition-all duration-700 delay-300 ${
              isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
          >
            {services.map((service, index) => (
              <img
                key={service.id}
                src={service.image}
                alt={service.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  activeService === index
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent" />
            
            {/* Progress Indicators */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    activeService === index
                      ? 'flex-1 bg-beige'
                      : 'w-8 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`View service ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/*View All button */}
      <div className="text-center mt-12">
        <Link to = '/services'
          className='inline-flex items-center gap-2 px-8 py-4
            bg-dark text-white font-body font-semibold rounded-lg hover:bg-dark/90
            transition-colors duration-300 group
          '
          >
          View All Services
          <ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
        </Link>
      </div>
      </div>
    </section>
  );
}
