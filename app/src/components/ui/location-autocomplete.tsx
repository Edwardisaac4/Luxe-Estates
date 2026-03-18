import { useState, useEffect, useRef } from "react"
import { MapPin, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Location = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

type LocationAutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function LocationAutocomplete({ value, onChange, className }: LocationAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Location[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const fetchLocations = async () => {
      if (!query || query.length < 3) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=ng&limit=5`);
        const data = await res.json();
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchLocations, 500);
    return () => clearTimeout(debounce);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (location: Location) => {
    const parts = location.display_name.split(',');
    const shortName = parts.length > 1 ? `${parts[0]}, ${parts[parts.length - 1].trim()}` : location.display_name;
    setQuery(shortName);
    onChange(shortName);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40 z-10" />
      <Input
        placeholder="Search Nigerian locations (e.g. Lagos, Abuja)"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (!isOpen) setIsOpen(true);
        }}
        onFocus={() => {
          if (results.length > 0) setIsOpen(true);
        }}
        className="pl-10 h-13 border-border bg-white/80 backdrop-blur-sm focus:bg-white focus:border-beige focus:ring-beige transition-all duration-300"
      />
      {isLoading && (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/40 animate-spin z-10" />
      )}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 max-h-64 overflow-auto overflow-x-hidden">
          {results.map((result, idx) => {
            const parts = result.display_name.split(',');
            const title = parts[0];
            const subtitle = parts.slice(1).join(',');
            return (
              <div
                key={result.place_id}
                className={cn(
                  "px-4 py-3 cursor-pointer transition-colors text-sm",
                  "hover:bg-beige/10",
                  idx !== results.length - 1 && "border-b border-border/50"
                )}
                onClick={() => handleSelect(result)}
              >
                <div className="font-medium text-dark truncate">
                  {title}
                </div>
                <div className="text-dark/60 text-xs truncate mt-0.5">
                  {subtitle}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
