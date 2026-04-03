export interface AlcoholSupplier {
  name: string;
  phone: string;
  email: string;
  address: string;
  photo: string;
}

export interface AlcoholProduct {
  id: string;
  name: string;
  category: string;
  size: string;
  deliveryTime: string;
  price: number | string;
  rating: number;
  inStock: boolean;
  supplier: AlcoholSupplier;
}