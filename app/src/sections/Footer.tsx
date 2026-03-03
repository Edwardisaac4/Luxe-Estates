import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
  ],
  services: [
    { name: 'Buy Property', href: '/listings' },
    { name: 'Sell Property', href: '/contact' },
    { name: 'Rent Property', href: '/listings' },
    { name: 'Property Management', href: '/contact' },
  ],
  resources: [
    { name: 'Blog', href: '#' },
    { name: 'Market Reports', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Guides', href: '#' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
];

export default function Footer() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <footer ref={ref} className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div
              className={`lg:col-span-2 transition-all duration-700 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <Link to="/" className="inline-block mb-6">
                <span className="font-display text-2xl font-bold text-dark">
                  LUXE ESTATES
                </span>
              </Link>
              <p className="font-body text-dark/60 mb-6 max-w-sm">
                Your trusted partner in luxury real estate. We help you find the
                perfect property that matches your lifestyle and aspirations.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-dark/60">
                  <MapPin className="w-5 h-5 text-beige" />
                  <span className="font-body text-sm">
                    123 Luxury Lane, Beverly Hills, CA
                  </span>
                </div>
                <div className="flex items-center gap-3 text-dark/60">
                  <Phone className="w-5 h-5 text-beige" />
                  <span className="font-body text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-dark/60">
                  <Mail className="w-5 h-5 text-beige" />
                  <span className="font-body text-sm">info@luxestates.com</span>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div
              className={`transition-all duration-700 delay-100 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="font-display font-semibold text-dark mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-dark/60 hover:text-dark transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`transition-all duration-700 delay-200 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="font-display font-semibold text-dark mb-4">
                Services
              </h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-dark/60 hover:text-dark transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`transition-all duration-700 delay-300 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="font-display font-semibold text-dark mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-dark/60 hover:text-dark transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-dark/60">
              © 2024 Luxe Estates. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-light flex items-center justify-center text-dark/60 hover:bg-beige hover:text-dark transition-all"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-6">
              <Link
                to="#"
                className="font-body text-sm text-dark/60 hover:text-dark transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="font-body text-sm text-dark/60 hover:text-dark transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
