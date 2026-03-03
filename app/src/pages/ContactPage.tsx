import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Luxury Lane', 'Beverly Hills, CA 90210'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info@luxestates.com', 'support@luxestates.com'],
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: ['Mon - Fri: 9AM - 6PM', 'Sat - Sun: 10AM - 4PM'],
  },
];

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-light">
      <Navigation />

      {/* Page Header */}
      <div className="pt-32 pb-16 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
            Get in touch with our team. We're here to help you find your perfect
            property.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 bg-beige/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-beige" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-dark mb-2">
                    {info.title}
                  </h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="font-body text-dark/60 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-card">
              <h2 className="font-display text-3xl font-bold text-dark mb-2">
                Send us a Message
              </h2>
              <p className="font-body text-dark/60 mb-8">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-sm font-medium text-dark mb-2 block">
                      First Name
                    </label>
                    <Input placeholder="John" required />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-dark mb-2 block">
                      Last Name
                    </label>
                    <Input placeholder="Doe" required />
                  </div>
                </div>

                <div>
                  <label className="font-body text-sm font-medium text-dark mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="font-body text-sm font-medium text-dark mb-2 block">
                    Phone Number
                  </label>
                  <Input type="tel" placeholder="+1 (555) 000-0000" />
                </div>

                <div>
                  <label className="font-body text-sm font-medium text-dark mb-2 block">
                    Subject
                  </label>
                  <Input placeholder="How can we help?" required />
                </div>

                <div>
                  <label className="font-body text-sm font-medium text-dark mb-2 block">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us more about what you're looking for..."
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-dark text-white hover:bg-dark/90 h-12"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-dark rounded-2xl h-80 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-dark to-dark/80" />
                <div className="relative z-10 text-center p-8">
                  <MapPin className="w-16 h-16 text-beige mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    Our Location
                  </h3>
                  <p className="font-body text-white/70">
                    123 Luxury Lane, Beverly Hills, CA 90210
                  </p>
                </div>
                {/* Decorative Grid */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(rgba(197, 184, 165, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(197, 184, 165, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>

              {/* Additional Info */}
              <div className="bg-beige/10 rounded-2xl p-8">
                <h3 className="font-display text-2xl font-bold text-dark mb-4">
                  Why Choose Us?
                </h3>
                <ul className="space-y-4">
                  {[
                    'Expert knowledge of luxury real estate market',
                    'Personalized service tailored to your needs',
                    'Access to exclusive off-market properties',
                    'Comprehensive support from search to closing',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-beige/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-beige" />
                      </div>
                      <span className="font-body text-dark/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
