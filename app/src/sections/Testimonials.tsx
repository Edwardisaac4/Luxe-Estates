import { Star, Quote } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { testimonials } from '@/data/mockData';

export default function Testimonials() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-beige/20">
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
              Testimonials
            </span>
            <div className="w-12 h-0.5 bg-beige" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mb-4">
            What Our Clients Say
          </h2>
          <p className="font-body text-dark/60">
            Real stories from satisfied homeowners
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`relative bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isInView ? `${200 + index * 150}ms` : '0ms',
              }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-2 w-10 h-10 bg-beige rounded-full flex items-center justify-center">
                <Quote className="w-5 h-5 text-dark" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="font-body text-dark/70 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-beige/30"
                />
                <div>
                  <p className="font-display font-semibold text-dark">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-sm text-dark/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
