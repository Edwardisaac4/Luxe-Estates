import { useParams, Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Phone, Mail, ArrowLeft, Heart, Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { properties, agents } from '@/data/mockData';

function formatPrice(price: number) {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(2)}M`;
  }
  return `$${price.toLocaleString()}`;
}

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === id);
  const agent = agents[0]; // In a real app, this would be linked to the property

  if (!property) {
    return (
      <div className="min-h-screen bg-light">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <h1 className="font-display text-3xl font-bold text-dark mb-4">
            Property Not Found
          </h1>
          <p className="font-body text-dark/60 mb-6">
            The property you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/listings">Browse Listings</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Inquiry sent successfully! We will contact you soon.');
  };

  return (
    <div className="min-h-screen bg-light">
      <Navigation />

      {/* Back Button */}
      <div className="pt-24 pb-4 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            asChild
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <Link to="/listings">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Listings
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {property.badge && (
            <Badge
              className={`font-body text-xs ${
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
          <Badge
            className={`font-body text-xs capitalize ${
              property.type === 'sale'
                ? 'bg-dark text-white'
                : 'bg-beige text-dark'
            }`}
          >
            For {property.type}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            onClick={() => toast.success('Added to favorites!')}
          >
            <Heart className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            onClick={() => toast.success('Link copied to clipboard!')}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Price & Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-white/80 mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="font-body text-lg">{property.location}</span>
            </div>
            <p className="font-display text-4xl md:text-5xl font-bold text-beige">
              {formatPrice(property.price)}
              <span className="text-lg text-white/60 font-normal ml-2">
                {property.type === 'rent' ? '/month' : ''}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 p-6 bg-white rounded-xl shadow-card">
              <div className="text-center">
                <Bed className="w-8 h-8 text-beige mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-dark">
                  {property.beds}
                </p>
                <p className="font-body text-sm text-dark/60">Bedrooms</p>
              </div>
              <div className="text-center">
                <Bath className="w-8 h-8 text-beige mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-dark">
                  {property.baths}
                </p>
                <p className="font-body text-sm text-dark/60">Bathrooms</p>
              </div>
              <div className="text-center">
                <Square className="w-8 h-8 text-beige mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-dark">
                  {property.sqft.toLocaleString()}
                </p>
                <p className="font-body text-sm text-dark/60">Square Feet</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-card">
              <h2 className="font-display text-2xl font-bold text-dark mb-4">
                Description
              </h2>
              <p className="font-body text-dark/70 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities && (
              <div className="bg-white rounded-xl p-6 shadow-card">
                <h2 className="font-display text-2xl font-bold text-dark mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-beige/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-beige" />
                      </div>
                      <span className="font-body text-sm text-dark">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agent Info */}
            <div className="bg-white rounded-xl p-6 shadow-card">
              <h2 className="font-display text-2xl font-bold text-dark mb-4">
                Listing Agent
              </h2>
              <div className="flex items-center gap-4">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <p className="font-display text-xl font-semibold text-dark">
                    {agent.name}
                  </p>
                  <p className="font-body text-dark/60">{agent.role}</p>
                  <div className="flex gap-3 mt-2">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl p-6 shadow-card">
              <h3 className="font-display text-xl font-bold text-dark mb-4">
                Interested in this property?
              </h3>
              <p className="font-body text-dark/60 mb-6">
                Fill out the form below and we'll get back to you shortly.
              </p>

              <form onSubmit={handleInquiry} className="space-y-4">
                <div>
                  <Input placeholder="Your Name" required />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" required />
                </div>
                <div>
                  <Input type="tel" placeholder="Your Phone" />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    rows={4}
                    defaultValue={`I'm interested in ${property.title}`}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-dark text-white hover:bg-dark/90"
                >
                  Send Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
