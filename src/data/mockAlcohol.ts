export interface AlcoholSupplier {
  name: string;
  photo: string;
  phone: string;
  email: string;
  address: string;
}

export interface AlcoholProduct {
  id: string;
  name: string;
  category: string;
  size: string;
  price: number;
  rating: number;
  deliveryTime: string;
  inStock: boolean;
  supplier: AlcoholSupplier;
}

export const mockAlcoholProducts: AlcoholProduct[] = [
  {
    id: 'alc-1',
    name: 'Kingfisher Ultra',
    category: 'Beer',
    size: '650 ml',
    price: 180,
    rating: 4.4,
    deliveryTime: '25-35 mins',
    inStock: true,
    supplier: {
      name: 'Rashiketh Salgaonkar',
      photo:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      phone: '+91 9356797109',
      email: 'support@goabeverages.com',
      address: 'Siolim, Goa',
    },
  },
  {
    id: 'alc-2',
    name: 'Bacardi White Rum',
    category: 'Rum',
    size: '750 ml',
    price: 1450,
    rating: 4.7,
    deliveryTime: '30-40 mins',
    inStock: true,
    supplier: {
      name: 'Rashiketh Salgaonkar',
      photo:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      phone: '+91 9356797109',
      email: 'support@goabeverages.com',
      address: 'Siolim, Goa',
    },
  },
  {
    id: 'alc-3',
    name: 'Sula Red Wine',
    category: 'Wine',
    size: '750 ml',
    price: 1200,
    rating: 4.5,
    deliveryTime: '35-45 mins',
    inStock: false,
    supplier: {
      name: 'Rashiketh Salgaonkar',
      photo:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      phone: '+91 9356797109',
      email: 'support@goabeverages.com',
      address: 'Siolim, Goa',
    },
  },
];