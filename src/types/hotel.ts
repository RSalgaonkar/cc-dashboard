export interface Hotel {
  id: string;
  name: string;
  location: string;
  roomType: string;
  rating: number;
  pricePerNight: number;
  maxGuests: number;
  amenities: string[];
  availability: string;
}
