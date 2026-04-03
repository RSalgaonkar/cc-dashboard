import { Taxi } from '../types/taxi';

export const mockTaxis: Taxi[] = [
  {
    id: 'taxi-1',
    taxiName: 'Laxmi',
    availability: 'Available',
    driver: {
      name: 'Sushant Salgaonkar',
      phone: '+91 8698281323',
      email: 'sushant.salgaonkar@gmail.com',
      photo:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      experienceYears: 8,
      language: ['English', 'Hindi', 'Konkani'],
      rating: 4.8,
    },
    vehicle: {
      type: 'Sedan',
      number: 'GA03V5027',
      color: 'Grey',
      seats: 4,
      airConditioned: true,
    },
    location: {
      area: 'Siolim',
      city: 'Goa',
      landmark: 'Near Home for Aged',
    },
    pricing: {
      baseFare: 120,
      perKm: 18,
      nightCharge: 80,
    },
  },
  {
    id: 'taxi-2',
    taxiName: 'Laxmi Service',
    availability: 'Busy',
    driver: {
      name: 'Sushant Salgaonkar',
      phone: '+91 8698281323',
      email: 'sushant.salgaonkar@gmail.com',
      photo:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      experienceYears: 11,
      language: ['English', 'Hindi'],
      rating: 4.6,
    },
    vehicle: {
      type: 'SUV',
      number: 'GA03V0381',
      color: 'Black',
      seats: 6,
      airConditioned: true,
    },
    location: {
      area: 'Siolim',
      city: 'Goa',
      landmark: 'Near Home for the Aged',
    },
    pricing: {
      baseFare: 180,
      perKm: 24,
      nightCharge: 120,
    },
  },
  {
    id: 'taxi-3',
    taxiName: 'Nayak Services',
    availability: 'Available',
    driver: {
      name: 'Sarvesh Nayak',
      phone: '+91 888120894',
      email: 'sarvesh.nayak@nayakservices.in',
      photo:
        'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=400&q=80',
      experienceYears: 5,
      language: ['English', 'Marathi', 'Hindi'],
      rating: 4.5,
    },
    vehicle: {
      type: 'Hatchback',
      number: 'GA05L6612',
      color: 'Silver',
      seats: 4,
      airConditioned: true,
    },
    location: {
      area: 'Siolim',
      city: 'Goa',
      landmark: 'Near Siolim Bridge',
    },
    pricing: {
      baseFare: 100,
      perKm: 15,
      nightCharge: 60,
    },
  },
  {
    id: 'taxi-4',
    taxiName: 'Amit Drive Goa',
    availability: 'Offline',
    driver: {
      name: 'Amit McDowell',
      phone: '+91 8080130380',
      email: 'amit.mcdowell@amitdrivegoa.com',
      photo:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      experienceYears: 9,
      language: ['English', 'Hindi', 'Urdu'],
      rating: 4.9,
    },
    vehicle: {
      type: 'Luxury',
      number: 'GA09R9007',
      color: 'Blue',
      seats: 4,
      airConditioned: true,
    },
    location: {
      area: 'Siolim',
      city: 'Goa',
      landmark: 'Under Siolim Bridge',
    },
    pricing: {
      baseFare: 300,
      perKm: 35,
      nightCharge: 180,
    },
  },
];