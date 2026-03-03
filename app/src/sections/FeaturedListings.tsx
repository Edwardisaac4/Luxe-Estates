import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useInView } from '@/hooks/useInView';
import { properties } from '@/data/mockData';

const featuredProperties = properties.slice(0, 3);

function formatPrice(price: number) {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  }
  return `$${(price / 1000).toFixed(0)}K`;
}

export default function FeaturedListings() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div
            className={`transition-all duration-700 ${
              isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-beige" />
              <span className="font-body text-sm text-dark/60 uppercase tracking-wider">
                Featured Properties
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-dark">
              Featured Listings
            </h2>
            <p className="font-body text-dark/60 mt-3 max-w-lg">
              Handpicked properties that define luxury living
            </p>
          </div>

          <div
            className={`mt-6 md:mt-0 transition-all duration-700 delay-200 ${
              isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              asChild
              variant="outline"
              className="border-dark text-dark hover:bg-dark hover:text-white font-body"
            >
              <Link to="/listings">
                View All Properties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, index) => (
            <Link
              key={property.id}
              to={`/property/${property.id}`}
              className={`group block bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isInView ? `${200 + index * 150}ms` : '0ms',
              }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Badge */}
                {property.badge && (
                  <Badge
                    className={`absolute top-4 left-4 font-body text-xs ${
                      property.badge === 'Hot'
                        ? 'bg-red-500 text-white'
                        : property.badge === 'New'
                        ? 'bg-green-500 text-white'
                        : 'bg-beige text-dark'
                    }`}
                  >
                    {property.badge}
                  </Badge>
                )}

                {/* Price Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="font-display text-2xl font-bold text-white">
                    {formatPrice(property.price)}
                  </span>
                  <span className="font-body text-sm text-white/80">
                    {property.type === 'rent' ? '/month' : ''}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-dark mb-2 group-hover:text-beige transition-colors">
                  {property.title}
                </h3>

                <div className="flex items-center text-dark/60 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="font-body text-sm">{property.location}</span>
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-dark/70">
                    <Bed className="w-4 h-4" />
                    <span className="font-body text-sm">{property.beds}</span>
                  </div>
                  <div className="flex items-center gap-1 text-dark/70">
                    <Bath className="w-4 h-4" />
                    <span className="font-body text-sm">{property.baths}</span>
                  </div>
                  <div className="flex items-center gap-1 text-dark/70">
                    <Square className="w-4 h-4" />
                    <span className="font-body text-sm">
                      {property.sqft.toLocaleString()} sqft
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
