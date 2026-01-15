
export interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Variation {
  label: string;
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  category: string;
  image: string; // Keep for backward compatibility/main image
  images: string[]; // Array for multiple views
  badge?: 'Bestseller' | 'New Arrival' | 'Limited' | 'Staff Pick';
  variations?: Variation[];
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariations?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export type PaymentMethod = 'Payoneer' | 'Google Pay' | 'Payeer' | 'Visa' | 'MasterCard' | 'Cash';

export interface CheckoutFormData {
  name: string;
  email: string;
  address: string;
  paymentMethod: PaymentMethod;
}
