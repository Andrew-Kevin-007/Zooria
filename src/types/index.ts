// ─── Enums ───────────────────────────────────────────────────────────────────

export type UserRole = 'buyer' | 'seller' | 'admin';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type ServiceType = 'grooming' | 'vet' | 'training' | 'boarding' | 'walking';

export type PetCategory = 'dog' | 'cat' | 'bird' | 'fish' | 'rabbit' | 'reptile' | 'other';

export type ProductCategory =
  | 'food'
  | 'accessories'
  | 'toys'
  | 'health'
  | 'grooming'
  | 'housing'
  | 'other';

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  address?: Address;
  createdAt: Date | any;
  updatedAt: Date | any;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  lat?: number;
  lng?: number;
}

// ─── Pet ──────────────────────────────────────────────────────────────────────

export interface Pet {
  id: string;
  userId: string;
  name: string;
  category: PetCategory;
  breed: string;
  age: number;
  weight: number;
  avatar?: string | number;
  color: string;
  microchipId?: string;
  vaccinated: boolean;
  allergies?: string;
  medicalHistory?: string;
  createdAt: Date | any;
}

// ─── Product ──────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  sellerId: string;
  shopId?: string;
  sellerName: string;
  inStock: boolean;
  quantity: number;
  tags: string[];
  createdAt: Date | any;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  type: ServiceType;
  name: string;
  description: string;
  provider: string;
  providerId: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  duration: number;
  availableSlots: string[];
  createdAt: Date | any;
}

// ─── Shop ─────────────────────────────────────────────────────────────────────

export interface Shop {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  logo?: string;
  coverImage?: string;
  address: Address;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  openingHours: {
    open: string;
    close: string;
    days: string[];
  };
  createdAt: Date | any;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  shopId: string;
}

// ─── Order ────────────────────────────────────────────────────────────────────

export interface Order {
  id: string;
  userId: string;
  items: Array<{ product: Product; quantity: number }>;
  totalPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  deliveryAddress: Address;
  createdAt: Date | any;
  updatedAt: Date | any;
}

// ─── Booking ──────────────────────────────────────────────────────────────────

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  service: Service;
  shopId: string;
  date: string; // ISO date string
  timeSlot: string; // e.g. "10:00 AM"
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  petName?: string;
  createdAt: Date | any;
}

// ─── Review ───────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  targetId: string; // productId, shopId, or serviceId
  targetType: 'product' | 'shop' | 'service';
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date | any;
}

// ─── Navigation Types ─────────────────────────────────────────────────────────

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  OTPVerification: { email: string };
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  PetDetail: { petId: string };
  ProductDetail: { productId: string };
  ShopProfile: { shopId: string };
  Services: { shopId?: string };
  Booking: { serviceId: string };
};

export type OrderStackParamList = {
  OrdersList: undefined;
  OrderDetail: { orderId: string };
  OrderTracking: { orderId: string };
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfile: undefined;
  Settings: undefined;
  SellerDashboard: undefined;
  AddListing: undefined;
  SellerOrders: undefined;
};
