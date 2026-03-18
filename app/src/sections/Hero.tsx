import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { Search, Home, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocationAutocomplete } from '@/components/ui/location-autocomplete';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion, useMotionValue, useSpring, useTransform, animate, AnimatePresence, type Variants } from 'framer-motion';

const heroContent = [
  {
    image: '/slider-1.png',
    text: 'Perfect Home',
  },
  {
    image: '/slider-2.png',
    text: 'Luxury Villa',
  },
  {
    image: '/slider-3.png',
    text: 'Dream Estate',
  }
];

const TABS = ['buy', 'rent', 'sell'] as const;
type TabType = typeof TABS[number];

export default function Hero() {
  const [activeTab, setActiveTab] = useState<TabType>('buy');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const navigate = useNavigate();

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayedText = useTransform(rounded, (latest) => 
    heroContent[currentImageIndex].text.slice(0, latest)
  );

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroContent.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Typewriter effect when slide changes
  useEffect(() => {
    const currentText = heroContent[currentImageIndex].text;
    
    // Reset state for new animation
    setTimeout(() => setIsTyping(true), 0);
    count.set(0);

    const controls = animate(count, currentText.length, {
      type: "tween",
      duration: currentText.length * 0.07, // 70ms per char
      ease: "linear",
      onComplete: () => {
        setIsTyping(false);
      }
    });

    return controls.stop;
  }, [currentImageIndex, count]);

  // Mouse parallax setup for dynamic motion
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse coordinates to make the movement organic
  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background shifts slightly opposite to mouse
  const bgX = useTransform(smoothX, [-0.5, 0.5], ['-3%', '3%']);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ['-3%', '3%']);

  // Foreground text shifts slightly with mouse for depth
  const floatX = useTransform(smoothX, [-0.5, 0.5], ['15px', '-15px']);
  const floatY = useTransform(smoothY, [-0.5, 0.5], ['15px', '-15px']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Normalize coordinates between -0.5 and 0.5
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    
    mouseX.set(xPct);
    mouseY.set(yPct);
  };
  
  const handleMouseLeave = () => {
    // Return to center when mouse leaves
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSearch = () => {
    const query = qs.stringify(
      { location, type: activeTab, propertyType, priceRange },
      { skipNulls: true, filter: (_prefix, value) => value || undefined }
    );
    navigate(`/listings?${query}`);
  };

  // Text animation variants
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 50, rotateX: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Background Image Slider with Parallax */}
      <motion.div 
        className="absolute inset-[-10%] z-0"
        style={{ x: bgX, y: bgY }}
      >
        <AnimatePresence>
          <motion.img
            key={currentImageIndex}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            src={heroContent[currentImageIndex].image}
            alt="Luxury home"
            className="w-full h-full object-cover absolute inset-0"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-transparent mix-blend-multiply z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent mix-blend-multiply z-10 pointer-events-none" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <motion.div 
          className="max-w-3xl"
          style={{ x: floatX, y: floatY }} // Foreground Parallax effect
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tagline */}
          <motion.div variants={textVariants}>
            <p className="font-display text-beige text-sm md:text-sm tracking-[0.4em] uppercase mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-beige inline-block" />
              Premium Real Estate in Nigeria
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={textVariants}
            className="font-display text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.1] mb-6 tracking-tight"
          >
            Find Your <br />
            <span className="text-beige relative inline-block min-w-[300px]">
              <motion.span>{displayedText}</motion.span>
              {isTyping && <span className="animate-pulse absolute -right-4">|</span>}
              {!isTyping && (
                <motion.span
                  className="absolute bottom-2 left-0 w-full h-3 bg-white/20 -z-10"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                />
              )}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={textVariants}
            className="font-body text-lg md:text-xl text-white/80 mb-12 max-w-lg font-light leading-relaxed"
          >
            Discover exceptional properties in Nigeria's most desirable
            locations. Your dream home awaits.
          </motion.p>

          {/* Search Widget */}
          <motion.div
            variants={textVariants}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] p-3 md:p-4 relative z-30 border border-white/20"
          >
            {/* Tabs */}
            <div className="flex space-x-2 mb-4 md:mb-0 md:bg-transparent md:absolute md:-top-12 md:left-6 z-20">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-8 py-2.5 rounded-t-xl font-body text-sm font-medium capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-white/95 text-dark md:shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)]'
                      : 'text-white/60 hover:text-white md:bg-dark/40 md:backdrop-blur-sm hover:md:bg-dark/60'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-beige md:hidden" 
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Search Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-3 items-center rounded-xl">
              {/* Location Autocomplete API Component */}
              <div className="h-full relative z-50">
                <LocationAutocomplete
                  value={location}
                  onChange={setLocation}
                  className="w-full"
                />
              </div>

              {/* Property Type */}
              <div className="relative z-40">
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="h-13 bg-white/60 border border-border/50 shadow-sm rounded-xl focus:ring-beige hover:bg-white transition-colors">
                    <Home className="w-[18px] h-[18px] text-dark/40 mr-2" />
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent className="z-[60]">
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="relative z-30">
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="h-13 bg-white/60 border border-border/50 shadow-sm rounded-xl focus:ring-beige hover:bg-white transition-colors">
                    <DollarSign className="w-[18px] h-[18px] text-dark/40 mr-2" />
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent className="z-[60]">
                    <SelectItem value="0-50000000">₦0 - ₦50M</SelectItem>
                    <SelectItem value="50000000-150000000">₦50M - ₦150M</SelectItem>
                    <SelectItem value="150000000-500000000">₦150M - ₦500M</SelectItem>
                    <SelectItem value="500000000-1000000000">₦500M - ₦1B</SelectItem>
                    <SelectItem value="1000000000+">₦1B+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                className="h-13 px-8 rounded-xl bg-dark text-white hover:bg-beige hover:text-dark transition-all duration-300 font-body font-medium flex items-center group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <Search className="w-[18px] h-[18px] mr-2 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">Search</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 text-white/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-display">Scroll to explore</span>
        <motion.div 
          className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"
          animate={{ height: ["0%", "100%", "0%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Bottom fade out gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
