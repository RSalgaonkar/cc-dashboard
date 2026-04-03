export type TaxiAvailability = 'Available' | 'Busy' | 'Offline';

export interface TaxiDriver {
  name: string;
  phone: string;
  email: string;
  photo: string;
  experienceYears: number;
  language: string[];
  rating: number;
}

export interface TaxiVehicle {
  type: 'Sedan' | 'SUV' | 'Hatchback' | 'Luxury' | 'Van';
  number: string;
  color: string;
  seats: number;
  airConditioned: boolean;
}

export interface TaxiLocation {
  area: string;
  city: string;
  landmark: string;
}

export interface TaxiPricing {
  baseFare: number;
  perKm: number;
  nightCharge: number;
}

export interface Taxi {
  id: string;
  taxiName: string;
  availability: TaxiAvailability;
  driver: TaxiDriver;
  vehicle: TaxiVehicle;
  location: TaxiLocation;
  pricing: TaxiPricing;
}
