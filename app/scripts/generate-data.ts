import fs from 'fs';
import path from 'path';

// Define structures
const PropertyType = {
  House: 'house',
  Apartment: 'apartment',
  Condo: 'condo',
  Villa: 'villa',
  Penthouse: 'penthouse',
} as const;

type PropertyType = typeof PropertyType[keyof typeof PropertyType];

const SaleStatus = {
  Sale: 'sale',
  Rent: 'rent',
} as const;

type SaleStatus = typeof SaleStatus[keyof typeof SaleStatus];

const PropertyBadge = {
  Featured: 'Featured',
  New: 'New',
  Hot: 'Hot',
} as const;

type PropertyBadge = typeof PropertyBadge[keyof typeof PropertyBadge];

interface Property {
  id: string;
  title: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  location: string;
  image: string;
  badge?: PropertyBadge;
  type: SaleStatus;
  propertyType?: PropertyType;
  description: string;
  amenities: string[];
  status: 'active' | 'pending' | 'sold';
  createdAt: string;
}

// Data sources for random generation
const locations = [
  'Lekki Phase 1, Lagos',
  'Victoria Island, Lagos',
  'Ikoyi, Lagos',
  'Banana Island, Lagos',
  'Ikeja GRA, Lagos',
  'Maitama, Abuja',
  'Asokoro, Abuja',
  'Wuse II, Abuja',
  'Gwarinpa, Abuja',
  'GRA Phase 2, Port Harcourt',
  'Peter Odili Road, Port Harcourt',
  'Bodija, Ibadan',
  'Enugu GRA, Enugu',
  'Asaba, Delta'
];

const homeAmenities = [
  'Swimming Pool', 'Gym', '24/7 Security', 'Boys Quarters (BQ)', 'Fitted Kitchen',
  'CCTV', 'Solar Panels', 'Inverter', 'Water Treatment', 'Ample Parking',
  'Balcony', 'En-suite Rooms', 'Walk-in Closet', 'Smart Home Features', 'Generator'
];

const adjectives = ['Luxury', 'Modern', 'Spacious', 'Exquisite', 'Stunning', 'Beautiful', 'Premium', 'Contemporary', 'Elegant', 'Classic'];

// Helpers
const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomAmenities = (count: number): string[] => {
  const shuffled = [...homeAmenities].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate Properties
const generateProperties = (): Property[] => {
  const properties = new Array<Property>();
  
  // 50 Buy, 30 Sell, 20 Rent
  // "Buy" and "Sell" are essentially both "sale" type from the database perspective. 
  // We'll create 80 'sale' entries and 20 'rent' entries.
  const distributions = [
    { count: 80, type: SaleStatus.Sale },
    { count: 20, type: SaleStatus.Rent }
  ];

  let idCounter = 1;

  distributions.forEach(({ count, type }) => {
    for (let i = 0; i < count; i++) {
        
      const propType: PropertyType = getRandom([PropertyType.House, PropertyType.Apartment, PropertyType.Condo, PropertyType.Villa, PropertyType.Penthouse]);
      const adj = getRandom(adjectives);
      const loc = getRandom(locations);
      
      // Nigerian pricing (Naira). Rentals are usually per annum.
      // Sales: 50M to 2B+
      // Rentals: 3M to 50M+
      let price = 0;
      if (type === SaleStatus.Sale) {
        price = getRandomInt(50, 2000) * 1000000;
      } else {
        price = getRandomInt(3, 50) * 1000000;
      }

      const beds = getRandomInt(1, 6);
      const baths = beds + getRandomInt(0, 2); // usually equal or more baths
      const sqft = getRandomInt(500, 5000);
      
      const p: Property = {
        id: idCounter.toString(),
        title: `${adj} ${beds}-Bed ${propType.charAt(0).toUpperCase() + propType.slice(1)}`,
        price,
        beds,
        baths,
        sqft,
        location: loc,
        image: `/property-${getRandomInt(1, 3)}.jpg`, // Just randomizing existing mock images
        type,
        propertyType: propType,
        badge: Math.random() > 0.7 ? getRandom([PropertyBadge.Featured, PropertyBadge.New, PropertyBadge.Hot]) : undefined,
        description: `Experience the finest living in this ${adj.toLowerCase()} ${propType} located in the heart of ${loc}. Features include spacious rooms and premium finishing.`,
        amenities: getRandomAmenities(getRandomInt(4, 10)),
        status: Math.random() > 0.8 ? 'sold' : (Math.random() > 0.8 ? 'pending' : 'active'),
        createdAt: new Date(Date.now() - getRandomInt(0, 10000000000)).toISOString().split('T')[0]
      };

      properties.push(p);
      idCounter++;
    }
  });

  return properties;
};

// Generate and write file
const newProps = generateProperties();

// Read existing mockData.ts
const mockDataPath = path.join(process.cwd(), 'src', 'data', 'mockData.ts');
let mockDataContent = fs.readFileSync(mockDataPath, 'utf-8');

// Replace the existing properties array with the new one
// A simple regex approach to find the `export const properties: Property[] = [...];` block
const propRegex = /export const properties: Property\[\] = \[[\s\S]*?\];/;
const newPropString = `export const properties: Property[] = ${JSON.stringify(newProps, null, 2)};`;

mockDataContent = mockDataContent.replace(propRegex, newPropString);

// Add propertyType to the types import if not exists
if (!mockDataContent.includes('propertyType')) {
    // This isn't perfect AST parsing, but we know it's not strictly typed in mockData right now
}

fs.writeFileSync(mockDataPath, mockDataContent);

console.log('Successfully generated 100 mock properties!');
