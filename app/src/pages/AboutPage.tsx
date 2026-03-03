import { Award, Users, Home, TrendingUp } from 'lucide-react';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { useInView } from '@/hooks/useInView';
import { stats, agents } from '@/data/mockData';

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description:
      'We strive for excellence in every transaction, ensuring our clients receive the highest level of service.',
  },
  {
    icon: Users,
    title: 'Integrity',
    description:
      'We operate with complete transparency and honesty, building trust with every client interaction.',
  },
  {
    icon: Home,
    title: 'Commitment',
    description:
      "We're committed to finding the perfect property that matches your unique needs and lifestyle.",
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description:
      'We leverage cutting-edge technology and market insights to deliver exceptional results.',
  },
];

export default function AboutPage() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-light">
      <Navigation />

      {/* Page Header */}
      <div className="pt-32 pb-16 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            About Luxe Estates
          </h1>
          <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
            Leading the luxury real estate market with integrity, expertise, and
            unparalleled service
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-beige" />
                <span className="font-body text-sm text-dark/60 uppercase tracking-wider">
                  Our Story
                </span>
              </div>
              <h2 className="font-display text-4xl font-bold text-dark mb-6">
                A Legacy of Excellence
              </h2>
              <div className="space-y-4 font-body text-dark/70 leading-relaxed">
                <p>
                  Founded in 2004, Luxe Estates has grown from a small boutique
                  agency to one of the most respected names in luxury real
                  estate. Our journey has been defined by a relentless commitment
                  to excellence and a deep understanding of the unique needs of
                  discerning clients.
                </p>
                <p>
                  Over the past two decades, we've had the privilege of helping
                  thousands of families find their dream homes and assisting
                  investors in building impressive property portfolios. Our
                  success is measured not just in transactions closed, but in the
                  lasting relationships we've built with our clients.
                </p>
                <p>
                  Today, with a team of over 50 expert agents and a portfolio
                  spanning the most desirable locations, we continue to set the
                  standard for luxury real estate service.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="/about-image.jpg"
                alt="Our office"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-dark rounded-xl shadow-xl p-6">
                <p className="font-display text-5xl font-bold text-beige">
                  {stats.yearsExperience}+
                </p>
                <p className="font-body text-white/60">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: stats.propertiesSold, label: 'Properties Sold', suffix: '+' },
              { value: stats.totalAgents, label: 'Expert Agents', suffix: '+' },
              { value: stats.yearsExperience, label: 'Years Experience', suffix: '+' },
              { value: stats.clientSatisfaction, label: 'Client Satisfaction', suffix: '%' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-display text-4xl md:text-5xl font-bold text-beige mb-2">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="font-body text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={ref} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-beige" />
              <span className="font-body text-sm text-dark/60 uppercase tracking-wider">
                Our Values
              </span>
              <div className="w-12 h-0.5 bg-beige" />
            </div>
            <h2 className="font-display text-4xl font-bold text-dark mb-4">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 ${
                    isInView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: isInView ? `${200 + index * 100}ms` : '0ms',
                  }}
                >
                  <div className="w-14 h-14 bg-beige/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-beige" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-dark mb-2">
                    {value.title}
                  </h3>
                  <p className="font-body text-dark/60 text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-beige/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-beige" />
              <span className="font-body text-sm text-dark/60 uppercase tracking-wider">
                Our Team
              </span>
              <div className="w-12 h-0.5 bg-beige" />
            </div>
            <h2 className="font-display text-4xl font-bold text-dark mb-4">
              Meet Our Experts
            </h2>
            <p className="font-body text-dark/60">
              Our team of experienced agents is dedicated to helping you find
              your perfect property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2"
              >
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-dark mb-1">
                    {agent.name}
                  </h3>
                  <p className="font-body text-beige text-sm mb-3">
                    {agent.role}
                  </p>
                  <p className="font-body text-dark/60 text-sm mb-4">
                    {agent.bio}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="font-display text-2xl font-bold text-dark">
                        {agent.sales}
                      </p>
                      <p className="font-body text-xs text-dark/60">
                        Properties Sold
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-body text-sm text-dark">{agent.phone}</p>
                      <p className="font-body text-xs text-dark/60">
                        {agent.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
