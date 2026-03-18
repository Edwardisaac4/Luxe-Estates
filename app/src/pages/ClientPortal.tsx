import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Heart, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bell,
  Search,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useSavedProperties } from '@/contexts/SavedPropertiesContext';
import { useInquiries } from '@/contexts/InquiriesContext';
import { useProperties } from '@/contexts/PropertiesContext';
import { useTours } from '@/contexts/ToursContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';


const SIDEBAR_NAV = [
  { name: 'Dashboard', icon: LayoutDashboard, active: true },
  { name: 'Saved Properties', icon: Heart, active: false, badge: '2' },
  { name: 'Viewing Schedule', icon: Calendar, active: false, badge: '1' },
  { name: 'Messages & Offers', icon: MessageSquare, active: false },
  { name: 'Account Settings', icon: Settings, active: false },
];

export default function ClientPortal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuth();
  const { properties } = useProperties();
  const { favoriteIds, toggleFavorite, isFavorite } = useSavedProperties();
  const { inquiries } = useInquiries();
  const { userTours, scheduleTour, cancelTour } = useTours();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [tourDate, setTourDate] = useState('');
  const [tourTime, setTourTime] = useState('');
  const [isTourDialogOpen, setIsTourDialogOpen] = useState(false);
  const [selectedPropertyForTour, setSelectedPropertyForTour] = useState<string | null>(null);

  const savedPropertiesList = properties.filter((p) => 
    favoriteIds.includes(p.id) &&
    (searchQuery.trim() === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeTab = searchParams.get('tab') || 'Dashboard';

  // Update URL parameter when state changes
  const handleTabChange = (tabName: string) => {
    setSearchParams({ tab: tabName });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('You have been securely signed out.');
  };

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || 'John',
    lastName: user?.name?.split(' ').slice(1).join(' ') || 'Doe',
    phone: '(555) 123-4567',
    location: 'Beverly Hills, CA'
  });

  return (
    <div className="min-h-screen bg-light flex pt-20">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-dark/5 hidden lg:flex flex-col h-[calc(100vh-5rem)] sticky top-20">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-dark text-white flex items-center justify-center font-display font-bold text-xl">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </div>
            <div>
              <h3 className="font-display font-bold text-dark">{user?.name || 'Client User'}</h3>
              <p className="text-sm text-dark/60">Premium Member</p>
            </div>
          </div>

          <nav className="space-y-2">
            {SIDEBAR_NAV.map((item) => (
              <button
                key={item.name}
                onClick={() => handleTabChange(item.name)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.name 
                    ? 'bg-beige/20 text-dark font-medium' 
                    : 'text-dark/60 hover:bg-beige/10 hover:text-dark'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${activeTab === item.name ? 'text-beige-dark' : ''}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-dark text-white text-xs py-0.5 px-2 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-dark/60 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-dark mb-2">Welcome back, {user?.name?.split(' ')[0] || 'Client'}!</h1>
            <p className="text-dark/60">Here is what's happening with your real estate journey today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-dark/40" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search saved properties..." 
                className="pl-10 pr-4 py-2.5 rounded-full border border-dark/10 bg-white focus:outline-none focus:ring-2 focus:ring-beige w-full md:w-64 transition-all"
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative p-2.5 rounded-full bg-white border border-dark/10 hover:bg-beige/10 transition-colors focus:outline-none">
                  <Bell className="w-5 h-5 text-dark" />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-beige-dark rounded-full border-2 border-white"></span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 mr-4 mt-2" align="end">
                <div className="p-4 border-b border-dark/10">
                  <h4 className="font-display font-bold text-dark text-sm">Notifications</h4>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="p-4 border-b border-dark/5 hover:bg-dark/5 transition-colors cursor-pointer bg-beige/5">
                    <p className="text-sm text-dark"><span className="font-bold">Welcome</span> to your new Client Portal!</p>
                    <p className="text-xs text-dark/50 mt-1">Just now</p>
                  </div>
                  {inquiries.slice(0, 2).map((inq) => (
                    <div key={inq.id} className="p-4 border-b border-dark/5 hover:bg-dark/5 transition-colors cursor-pointer">
                      <p className="text-sm text-dark"><span className="font-bold">{inq.agentName}</span> replied to your inquiry about {inq.propertyTitle}.</p>
                      <p className="text-xs text-dark/50 mt-1">Recently</p>
                    </div>
                  ))}
                  {inquiries.length === 0 && (
                    <div className="p-8 text-center text-sm text-dark/50">
                      No new notifications
                    </div>
                  )}
                </div>
                <div className="p-3 text-center border-t border-dark/10 bg-dark/5 hover:bg-dark/10 transition-colors cursor-pointer">
                  <span className="text-xs font-bold text-dark">Mark all as read</span>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark/5 flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-beige/20 flex items-center justify-center text-beige-dark">
                  <Heart className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-dark/60 mb-1">Saved Properties</h4>
                  <p className="text-2xl font-bold font-display text-dark">{savedPropertiesList.length}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark/5 flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Calendar className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-dark/60 mb-1">Upcoming Tours</h4>
                  <p className="text-2xl font-bold font-display text-dark">
                    {userTours.filter(t => t.status === 'upcoming').length}
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-dark/5 flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-dark/60 mb-1">Active Inquiries</h4>
                  <p className="text-2xl font-bold font-display text-dark">{inquiries.length}</p>
                </div>
              </div>
            </div>

            {/* Upcoming Viewing Section */}
            {userTours.filter(t => t.status === 'upcoming').length > 0 && (
              <section className="bg-dark text-white rounded-2xl p-8 relative overflow-hidden">
                <div className="relative z-10 w-full md:w-2/3">
                  <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-4 text-beige">
                    Upcoming Tour
                  </div>
                  {(() => {
                    const nextTour = userTours.filter(t => t.status === 'upcoming')[0];
                    const tourProp = properties.find(p => p.id === nextTour.propertyId);
                    return (
                      <>
                        <h3 className="text-2xl font-display font-bold mb-2">{tourProp?.title || 'Property Tour'}</h3>
                        <p className="text-white/80 mb-6 flex items-center">
                          <Calendar className="w-4 h-4 mr-2" /> {new Date(nextTour.date).toLocaleDateString()} at {nextTour.time}
                        </p>
                        <div className="flex space-x-4">
                          <Button onClick={() => navigate(`/property/${tourProp?.id}`)} className="bg-beige text-dark hover:bg-beige/90">View Details</Button>
                          <Button 
                            variant="outline" 
                            className="border-white/20 text-white hover:bg-white/10"
                            onClick={() => cancelTour(nextTour.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1/3 md:w-1/2 opacity-20 md:opacity-40 bg-zinc-800">
                  {(() => {
                    const nextTour = userTours.filter(t => t.status === 'upcoming')[0];
                    const tourProp = properties.find(p => p.id === nextTour.propertyId);
                    return tourProp ? (
                      <img 
                        src={tourProp.image} 
                        alt="Tour" 
                        className="w-full h-full object-cover mask-image-gradient"
                      />
                    ) : null;
                  })()}
                </div>
              </section>
            )}

            {/* Saved Properties Highlights */}
            <section>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-display font-bold text-dark">Your Saved Properties</h2>
                  <p className="text-dark/60 mt-1">Properties you've favorited to review later.</p>
                </div>
                <Button variant="link" className="text-beige-dark hover:text-dark px-0" onClick={() => handleTabChange('Saved Properties')}>
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {savedPropertiesList.slice(0, 3).map((property) => (
                  <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-dark/5 group cursor-pointer hover:shadow-xl transition-all duration-300">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={property.image} 
                        alt={property.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(property.id);
                          }}
                          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-red-500 hover:bg-white transition-colors shadow-sm"
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-dark/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                          {property.propertyType}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="font-display text-2xl font-bold text-dark mb-2">₦{property.price.toLocaleString()}</p>
                      <h3 className="font-bold text-lg text-dark/90 mb-2 truncate">{property.title}</h3>
                      <p className="text-dark/60 text-sm flex items-center mb-4">
                        <MapPin className="w-4 h-4 mr-1 opacity-70" />
                        {property.location}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-dark/10">
                        <div className="flex space-x-4">
                          <span className="flex items-center text-sm font-medium text-dark/70">
                            <BedDouble className="w-4 h-4 mr-1.5 opacity-60" /> {property.beds}
                          </span>
                          <span className="flex items-center text-sm font-medium text-dark/70">
                            <Bath className="w-4 h-4 mr-1.5 opacity-60" /> {property.baths}
                          </span>
                          <span className="flex items-center text-sm font-medium text-dark/70">
                            <Maximize className="w-4 h-4 mr-1.5 opacity-60" /> {property.sqft}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {savedPropertiesList.length === 0 && (
                  <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dark/5 shadow-sm">
                    <Heart className="w-12 h-12 text-dark/20 mx-auto mb-4" />
                    <p className="font-display font-bold text-xl text-dark mb-2">No Saved Properties Yet</p>
                    <p className="text-dark/60 mb-6">Explore our listings and click the heart icon to save your favorites.</p>
                    <Button onClick={() => navigate('/listings')} className="bg-beige text-dark hover:bg-beige-dark">
                      Browse Listings
                    </Button>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* Saved Properties Tab */}
        {activeTab === 'Saved Properties' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8">
              <h2 className="text-3xl font-display font-bold text-dark mb-2">Your Saved Properties</h2>
              <p className="text-dark/60 text-lg">Curated properties you're interested in pursuing.</p>
            </header>

            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-dark/5 shadow-sm mb-6">
              <div className="flex space-x-2">
                <Button variant="outline" className="text-sm">All Properties</Button>
                <Button variant="ghost" className="text-sm text-dark/60">Available</Button>
                <Button variant="ghost" className="text-sm text-dark/60">Pending</Button>
              </div>
              <div className="flex items-center space-x-3 text-sm text-dark/60">
                <span>Sort by:</span>
                <select className="bg-transparent font-medium text-dark focus:outline-none cursor-pointer">
                  <option>Recently Added</option>
                  <option>Price (High to Low)</option>
                  <option>Price (Low to High)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPropertiesList.map((property) => (
                <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-dark/5 group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden shrink-0">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           toggleFavorite(property.id);
                         }}
                        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-red-500 hover:bg-white transition-colors shadow-sm"
                      >
                        <Heart className={`w-5 h-5 ${isFavorite(property.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-dark/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                        {property.propertyType}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="font-display text-2xl font-bold text-dark mb-2">₦{property.price.toLocaleString()}</p>
                    <h3 className="font-bold text-lg text-dark/90 mb-2 leading-tight">{property.title}</h3>
                    <p className="text-dark/60 text-sm flex items-center mb-6">
                      <MapPin className="w-4 h-4 mr-1 opacity-70" />
                      {property.location}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="flex items-center justify-between pb-6 border-b border-dark/10 mb-6">
                        <div className="flex space-x-4">
                          <span className="flex items-center text-sm font-medium text-dark/70" title="Beds">
                            <BedDouble className="w-4 h-4 mr-1.5 opacity-60" /> {property.beds}
                          </span>
                          <span className="flex items-center text-sm font-medium text-dark/70" title="Baths">
                            <Bath className="w-4 h-4 mr-1.5 opacity-60" /> {property.baths}
                          </span>
                          <span className="flex items-center text-sm font-medium text-dark/70" title="Square Feet">
                            <Maximize className="w-4 h-4 mr-1.5 opacity-60" /> {property.sqft}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPropertyForTour(property.id);
                            setIsTourDialogOpen(true);
                          }}
                          className="flex-1 bg-beige text-dark hover:bg-beige-dark transition-colors"
                        >
                          Schedule Tour
                        </Button>
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/property/${property.id}`);
                          }}
                          variant="outline" 
                          className="px-3 hover:bg-dark/5 border-dark/10"
                        >
                          <MessageSquare className="w-4 h-4 text-dark/70" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {savedPropertiesList.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dark/5 shadow-sm">
                  <Heart className="w-16 h-16 text-dark/20 mx-auto mb-6" />
                  <p className="font-display font-bold text-2xl text-dark mb-3">No Saved Properties</p>
                  <p className="text-dark/60 mb-8 max-w-md mx-auto">You haven't added any properties to your favorites yet. Explore our listings to find your dream home.</p>
                  <Button onClick={() => navigate('/listings')} className="bg-beige text-dark hover:bg-beige-dark px-8 h-12">
                    Browse Listings
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Viewing Schedule Tab */}
        {activeTab === 'Viewing Schedule' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8">
              <h2 className="text-3xl font-display font-bold text-dark mb-2">Your Viewing Schedule</h2>
              <p className="text-dark/60 text-lg">Manage your upcoming property tours.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Agenda List */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-display font-bold text-dark mb-4">Your Tours</h3>
                
                {userTours.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-xl border border-dark/5">
                    <Calendar className="w-12 h-12 text-dark/20 mx-auto mb-3" />
                    <p className="font-medium text-dark">No tours scheduled yet.</p>
                    <p className="text-sm text-dark/60 mt-1">Visit your Saved Properties to schedule a viewing.</p>
                  </div>
                ) : (
                  userTours.map((tour) => {
                    const property = properties.find(p => p.id === tour.propertyId);
                    if (!property) return null;
                    const dateObj = new Date(tour.date);
                    
                    return (
                      <div key={tour.id} className={`bg-white rounded-2xl border border-dark/5 shadow-sm p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow ${tour.status === 'cancelled' ? 'opacity-50' : ''}`}>
                        <div className="md:w-48 shrink-0 flex flex-col justify-center items-center p-4 bg-beige/10 rounded-xl text-center">
                          <span className="text-sm font-bold text-beige-dark uppercase tracking-wider mb-1">
                            {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                          </span>
                          <span className="text-4xl font-display font-bold text-dark">
                            {dateObj.getDate()}
                          </span>
                          <span className="text-dark/60 font-medium">
                            {dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                          <div className="mt-3 py-1 px-3 bg-white rounded-full text-sm font-semibold text-dark shadow-sm">
                            {tour.time}
                          </div>
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-center">
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold w-fit mb-3 ${
                            tour.status === 'upcoming' ? 'bg-green-100 text-green-700' :
                            tour.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-dark/10 text-dark/70'
                          }`}>
                            {tour.status.charAt(0).toUpperCase() + tour.status.slice(1)}
                          </div>
                          <h4 className="text-xl font-bold text-dark mb-2">{property.title}</h4>
                          <p className="text-dark/60 text-sm flex items-center mb-4">
                            <MapPin className="w-4 h-4 mr-1 opacity-70" />
                            {property.location}
                          </p>
                        </div>
                        
                        {tour.status === 'upcoming' && (
                          <div className="md:w-32 flex md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-dark/10 pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
                            <Button 
                              variant="outline" 
                              className="w-full text-sm text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                              onClick={() => cancelTour(tour.id)}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Calendar Widget Context */}
              <div className="bg-dark text-white rounded-2xl p-6 h-fit shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-xl">October 2024</h3>
                  <div className="flex space-x-2">
                    <button className="p-1 hover:bg-white/10 rounded-full transition-colors">&larr;</button>
                    <button className="p-1 hover:bg-white/10 rounded-full transition-colors">&rarr;</button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2 text-white/50">
                  <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                </div>
                
                <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
                  {/* Mock calendar days */}
                  {[...Array(31)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`
                        w-8 h-8 mx-auto flex items-center justify-center rounded-full cursor-pointer transition-all
                        ${i + 1 === 12 ? 'bg-beige text-dark font-bold shadow-lg scale-110' : 'hover:bg-white/20'}
                        ${i + 1 === 15 ? 'bg-white/20 text-white border border-white/30' : ''}
                        ${i < 10 ? 'opacity-40' : ''}
                      `}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                  <Button className="w-full bg-white text-dark hover:bg-white/90">
                    Request New Tour
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages & Offers Tab */}
        {activeTab === 'Messages & Offers' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-display font-bold text-dark mb-2">Messages & Offers</h2>
                <p className="text-dark/60 text-lg">Communicate with your agent and track offer statuses.</p>
              </div>
              <Button className="bg-dark text-white hover:bg-dark/90 px-6">New Message</Button>
            </header>

            <div className="bg-white rounded-2xl border border-dark/5 shadow-sm overflow-hidden flex flex-col md:flex-row h-[600px]">
              {/* Message List Sidebar */}
              <div className="w-full md:w-1/3 border-r border-dark/10 flex flex-col">
                <div className="p-4 border-b border-dark/10">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-dark/40" />
                    <input 
                      type="text" 
                      placeholder="Search messages..." 
                      className="w-full pl-9 pr-4 py-2 bg-dark/5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-beige"
                    />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  {inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="p-4 border-b border-dark/5 bg-beige/10 cursor-pointer">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-dark text-sm">{inquiry.agentName} (Agent)</h4>
                        <span className="text-xs text-dark/50">Just now</span>
                      </div>
                      <p className="text-xs font-medium text-beige-dark mb-1">Inquiry: {inquiry.propertyTitle}</p>
                      <p className="text-sm text-dark/70 line-clamp-2">{inquiry.message}</p>
                    </div>
                  ))}
                  
                  {inquiries.length === 0 && (
                    <div className="p-8 text-center text-dark/50">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p className="text-sm font-medium">No messages yet.</p>
                      <p className="text-xs mt-1">Send an inquiry from a property listing to see it here.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Message Content Area */}
              <div className="flex-1 flex flex-col bg-light/30">
                {inquiries.length > 0 ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-dark/10 bg-white flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-dark/10 flex items-center justify-center text-sm font-bold font-display">
                          {inquiries[0].agentName?.split(' ').map(n => n[0]).join('') || 'A'}
                        </div>
                        <div>
                          <h3 className="font-bold text-dark">{inquiries[0].agentName || 'Agent'}</h3>
                          <p className="text-xs text-green-600 font-medium">Online</p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => navigate(`/property/${inquiries[0].propertyId}`)}
                        variant="outline" 
                        className="text-sm shadow-sm"
                      >
                        View Linked Property
                      </Button>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
                      <div className="flex justify-center mt-auto mb-4">
                        <span className="text-xs font-medium text-dark/40 bg-dark/5 px-3 py-1 rounded-full">Today</span>
                      </div>
                      
                      {/* Sent */}
                      <div className="flex items-start justify-end space-x-3 mb-4">
                        <div className="bg-dark p-4 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
                          <p className="text-white/90 text-sm">
                            <span className="opacity-50 text-xs block mb-1">Inquiry for: {inquiries[0].propertyTitle}</span>
                            {inquiries[0].message}
                          </p>
                        </div>
                      </div>

                      {/* Automated Reply */}
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-dark/10 flex shrink-0 items-center justify-center text-xs font-bold font-display mt-1">AI</div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-dark/5 max-w-[80%]">
                          <p className="text-dark/80 text-sm italic">
                            Thank you for your inquiry regarding {inquiries[0].propertyTitle}. {inquiries[0].agentName} has been notified and will respond to your message shortly. Please look out for a push notification when they reply.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Message Input */}
                    <div className="p-4 bg-white border-t border-dark/10">
                      <div className="flex items-end gap-2">
                        <div className="flex-1 bg-dark/5 rounded-xl border border-dark/10 overflow-hidden focus-within:border-beige focus-within:ring-1 focus-within:ring-beige transition-all">
                          <textarea 
                            placeholder="Type your message..." 
                            className="w-full bg-transparent p-3 text-sm focus:outline-none resize-none h-12 max-h-32"
                            rows={1}
                          />
                        </div>
                        <Button className="shrink-0 bg-beige text-dark hover:bg-beige-dark h-12 px-6 rounded-xl">
                          Send
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-dark/40">
                    <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-lg font-medium font-display">Select a conversation</p>
                    <p className="text-sm mt-1 max-w-xs text-center">Your messages with our real estate agents will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Account Settings Tab */}
        {activeTab === 'Account Settings' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
            <header className="mb-8">
              <h2 className="text-3xl font-display font-bold text-dark mb-2">Account Settings</h2>
              <p className="text-dark/60 text-lg">Manage your profile, preferences, and notifications.</p>
            </header>

            {/* Profile Section */}
            <div className="bg-white rounded-2xl border border-dark/5 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-dark/10 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-dark text-white flex items-center justify-center font-display font-bold text-3xl">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white text-xs font-semibold">Change</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-2xl text-dark">{user?.name || 'Client User'}</h3>
                  <p className="text-dark/60 text-sm mb-3">{user?.email || 'client@example.com'}</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-beige/20 text-beige-dark text-xs font-bold rounded-full uppercase tracking-wider">Premium Buyer</span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-8">
                {/* Personal Information */}
                <div>
                  <h4 className="font-bold text-dark mb-4 text-lg">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-dark/70 mb-1.5 block">First Name</label>
                      <input 
                        type="text" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-dark/10 bg-dark/5 focus:bg-white focus:ring-2 focus:ring-beige outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark/70 mb-1.5 block">Last Name</label>
                      <input 
                        type="text" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-dark/10 bg-dark/5 focus:bg-white focus:ring-2 focus:ring-beige outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark/70 mb-1.5 block">Phone Number</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-dark/10 bg-dark/5 focus:bg-white focus:ring-2 focus:ring-beige outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark/70 mb-1.5 block">Location Preference</label>
                      <input 
                        type="text" 
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-dark/10 bg-dark/5 focus:bg-white focus:ring-2 focus:ring-beige outline-none transition-all" 
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-dark/10" />

                {/* Notification Preferences */}
                <div>
                  <h4 className="font-bold text-dark mb-4 text-lg">Notification Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-dark/10 hover:bg-dark/5 transition-colors">
                      <div>
                        <p className="font-bold text-dark text-sm">Property Alerts</p>
                        <p className="text-xs text-dark/60 mt-0.5">Get notified when properties matching your criteria hit the market.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-dark/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-beige-dark"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-dark/10 hover:bg-dark/5 transition-colors">
                      <div>
                        <p className="font-bold text-dark text-sm">Showing Reminders</p>
                        <p className="text-xs text-dark/60 mt-0.5">Receive SMS and email reminders 24 hours before a schedule tour.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-dark/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-beige-dark"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-4">
                  <Button variant="outline" className="px-6">Cancel</Button>
                  <Button 
                    className="bg-dark text-white hover:bg-dark/90 px-8"
                    onClick={() => {
                      if (user) {
                        updateUser({
                          name: `${formData.firstName} ${formData.lastName}`.trim(),
                          phone: formData.phone || user.phone || '',
                        });
                        toast.success('Your account settings have been updated.');
                      }
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fallback for unmatched tabs */}
        {!['Dashboard', 'Saved Properties', 'Viewing Schedule', 'Messages & Offers', 'Account Settings'].includes(activeTab) && (
          <div className="bg-white rounded-2xl p-12 text-center border border-dark/5 animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-24 h-24 bg-beige/10 rounded-full flex items-center justify-center mb-8 text-beige-dark ring-8 ring-beige/5">
              {activeTab === 'Viewing Schedule' && <Calendar className="w-12 h-12" />}
              {activeTab === 'Messages & Offers' && <MessageSquare className="w-12 h-12" />}
              {activeTab === 'Account Settings' && <Settings className="w-12 h-12" />}
            </div>
            <h2 className="text-3xl font-display font-bold text-dark mb-4">{activeTab} section coming soon</h2>
            <p className="text-dark/60 max-w-md mx-auto mb-8 text-lg">We are polishing this section of your portal to ensure the best possible experience. Check back soon!</p>
            <Button onClick={() => handleTabChange('Dashboard')} className="bg-dark hover:bg-dark/90 h-12 px-8 text-base">
              Return to Dashboard
            </Button>
          </div>
        )}
      </main>

      {/* Schedule Tour Dialog */}
      <Dialog open={isTourDialogOpen} onOpenChange={setIsTourDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Schedule a Tour</DialogTitle>
            <DialogDescription>
              Select your preferred date and time to view this property.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right text-sm font-medium text-dark/70">
                Date
              </label>
              <input
                id="date"
                type="date"
                className="col-span-3 flex h-10 w-full rounded-md border border-dark/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-beige"
                value={tourDate}
                onChange={(e) => setTourDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]} // Can't book past dates
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="time" className="text-right text-sm font-medium text-dark/70">
                Time
              </label>
              <select
                id="time"
                className="col-span-3 flex h-10 w-full rounded-md border border-dark/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-beige"
                value={tourTime}
                onChange={(e) => setTourTime(e.target.value)}
              >
                <option value="">Select a time</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTourDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-dark text-white hover:bg-beige hover:text-dark transition-colors"
              onClick={() => {
                if (selectedPropertyForTour && tourDate && tourTime) {
                  scheduleTour(selectedPropertyForTour, tourDate, tourTime);
                  setIsTourDialogOpen(false);
                  setTourDate('');
                  setTourTime('');
                  handleTabChange('Viewing Schedule');
                } else {
                  toast.error('Please select both date and time.');
                }
              }}
            >
              Confirm Viewing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
