export interface HotelListing {
  id: string;
  name: string;
  location: string;
  roomType: string;
  pricePerNight: number;
  maxGuests: number;
  amenities: string[];
  availability: 'Available today' | 'Limited rooms';
  rating: number;
}

export const mockHotels: HotelListing[] = [
  {
    id: 'hotel-1',
    name: 'Laxmi Empire',
    location: 'Siolim',
    roomType: 'Deluxe Room',
    pricePerNight: 3200,
    maxGuests: 2,
    amenities: ['Wi-Fi', 'Breakfast', 'AC'],
    availability: 'Available today',
    rating: 4.4,
  },
  {
    id: 'hotel-2',
    name: 'Laxmi Nivas',
    location: 'Siolim',
    roomType: 'Family Suite',
    pricePerNight: 5400,
    maxGuests: 4,
    amenities: ['Pool', 'Wi-Fi', 'Parking'],
    availability: 'Limited rooms',
    rating: 4.6,
  },
  {
    id: 'hotel-3',
    name: 'Siolim Residency',
    location: 'Siolim',
    roomType: 'Studio',
    pricePerNight: 2700,
    maxGuests: 2,
    amenities: ['Wi-Fi', 'Work Desk', 'Breakfast'],
    availability: 'Available today',
    rating: 4.2,
  },
];