/**
 * Mock Service - Dummy data for development
 * Replace with real Firebase service when ready
 */

import { User, Product, Pet, Order, Service } from '../types';

export const mockService = {
  // ─── Users & Pets ────────────────────────────────────────────────────────

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    return {
      id: 'user_001',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '+1 (555) 123-4567',
      role: 'buyer',
      avatar: 'https://i.pravatar.cc/150?img=1',
      address: {
        street: '123 Pet Street',
        city: 'San Francisco',
        state: 'CA',
        pincode: '94105',
        lat: 37.7749,
        lng: -122.4194,
      },
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-03-13'),
    };
  },

  /**
   * Get all pets for current user
   */
  getPets: async (): Promise<Pet[]> => {
    return [
      {
        id: 'pet_001',
        userId: 'user_001',
        name: 'Max',
        category: 'dog',
        breed: 'Golden Retriever',
        age: 3,
        weight: 30,
        avatar: require('../../assets/dog/dog1.avif'),
        color: 'Golden',
        microchipId: 'CHIP-123456',
        vaccinated: true,
        allergies: 'Chicken',
        medicalHistory: 'None',
        createdAt: new Date('2024-01-20'),
      },
      {
        id: 'pet_002',
        userId: 'user_001',
        name: 'Luna',
        category: 'cat',
        breed: 'Siamese',
        age: 2,
        weight: 4,
        avatar: require('../../assets/cat/cat3.avif'),
        color: 'Cream',
        microchipId: 'CHIP-789012',
        vaccinated: true,
        allergies: 'Fish',
        medicalHistory: 'Diabetes',
        createdAt: new Date('2024-02-10'),
      },
      {
        id: 'pet_003',
        userId: 'user_001',
        name: 'Kiwi',
        category: 'bird',
        breed: 'Budgerigar',
        age: 1,
        weight: 0.04,
        avatar: require('../../assets/birds/bird1.avif'),
        color: 'Green',
        vaccinated: true,
        medicalHistory: 'None',
        createdAt: new Date('2024-03-01'),
      },
      {
        id: 'pet_004',
        userId: 'user_001',
        name: 'Rocky',
        category: 'dog',
        breed: 'German Shepherd',
        age: 4,
        weight: 32,
        avatar: require('../../assets/dog/dog8.avif'),
        color: 'Black and Tan',
        microchipId: 'CHIP-654321',
        vaccinated: true,
        allergies: 'None',
        medicalHistory: 'None',
        createdAt: new Date('2024-03-05'),
      },
      {
        id: 'pet_005',
        userId: 'user_001',
        name: 'Milo',
        category: 'cat',
        breed: 'Persian',
        age: 2,
        weight: 4.5,
        avatar: require('../../assets/cat/cat7.webp'),
        color: 'White',
        vaccinated: true,
        allergies: 'None',
        medicalHistory: 'None',
        createdAt: new Date('2024-03-08'),
      },
    ];
  },

  // ─── Products ────────────────────────────────────────────────────────────

  /**
   * Get all products with pagination
   */
  getProducts: async (
    category?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ products: Product[]; total: number }> => {
    const allProducts: Product[] = [
      {
        id: 'prod_001',
        name: 'Premium Dog Food',
        category: 'food',
        description: 'High-quality dog food with all essential nutrients',
        price: 49.99,
        rating: 4.8,
        reviews: 234,
        image:
          'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=300&q=80',
        sellerId: 'seller_001',
        sellerName: 'PetCare Store',
        inStock: true,
        quantity: 50,
        tags: ['food', 'dog', 'nutrition'],
        createdAt: new Date('2024-01-01'),
      },
      {
        id: 'prod_002',
        name: 'Interactive Dog Toy',
        category: 'toys',
        description:
          'Durable toy that keeps dogs entertained for hours with interactive features',
        price: 24.99,
        rating: 4.5,
        reviews: 156,
        image:
          'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80',
        sellerId: 'seller_001',
        sellerName: 'PetCare Store',
        inStock: true,
        quantity: 120,
        tags: ['toy', 'dog', 'interactive'],
        createdAt: new Date('2024-01-05'),
      },
      {
        id: 'prod_003',
        name: 'Cat Scratching Post',
        category: 'housing',
        description: 'Multi-level cat scratching post for exercise and relaxation',
        price: 79.99,
        rating: 4.6,
        reviews: 89,
        image:
          'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&q=80',
        sellerId: 'seller_002',
        sellerName: 'Cat Kingdom',
        inStock: true,
        quantity: 25,
        tags: ['housing', 'cat', 'furniture'],
        createdAt: new Date('2024-01-10'),
      },
      {
        id: 'prod_004',
        name: 'Pet Grooming Brush',
        category: 'grooming',
        description: 'Professional grooming brush for dogs and cats',
        price: 19.99,
        rating: 4.7,
        reviews: 342,
        image:
          'https://images.unsplash.com/photo-1576091160399-9c12cb4ee413?w=300&q=80',
        sellerId: 'seller_003',
        sellerName: 'Grooming Plus',
        inStock: true,
        quantity: 200,
        tags: ['grooming', 'brush', 'accessory'],
        createdAt: new Date('2024-01-15'),
      },
      {
        id: 'prod_005',
        name: 'Pet Health Supplement',
        category: 'health',
        description: 'Vitamin and mineral supplements for pet wellness',
        price: 34.99,
        rating: 4.4,
        reviews: 128,
        image:
          'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&q=80',
        sellerId: 'seller_004',
        sellerName: 'Healthy Pets Co',
        inStock: true,
        quantity: 80,
        tags: ['health', 'supplement', 'wellness'],
        createdAt: new Date('2024-02-01'),
      },
      {
        id: 'prod_006',
        name: 'Comfortable Pet Bed',
        category: 'accessories',
        description: 'Orthopedic pet bed for maximum comfort',
        price: 89.99,
        rating: 4.9,
        reviews: 412,
        image:
          'https://images.unsplash.com/photo-1577720643272-265f434346f2?w=300&q=80',
        sellerId: 'seller_002',
        sellerName: 'Cat Kingdom',
        inStock: true,
        quantity: 35,
        tags: ['bed', 'accessory', 'comfort'],
        createdAt: new Date('2024-02-05'),
      },
    ];

    const filtered = category
      ? allProducts.filter((p) => p.category === category)
      : allProducts;

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      products: filtered.slice(start, end),
      total: filtered.length,
    };
  },

  // ─── Services ────────────────────────────────────────────────────────────

  /**
   * Get available services
   */
  getServices: async (
    type?: string
  ): Promise<Service[]> => {
    const allServices: Service[] = [
      {
        id: 'svc_001',
        type: 'grooming',
        name: 'Dog Grooming',
        description: 'Professional dog grooming and spa services',
        provider: 'Pawsitive Grooming',
        providerId: 'seller_003',
        price: 75,
        rating: 4.9,
        reviews: 245,
        image:
          'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&q=80',
        duration: 60,
        availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        createdAt: new Date('2024-01-01'),
      },
      {
        id: 'svc_002',
        type: 'vet',
        name: 'Veterinary Checkup',
        description: 'Complete pet health examination and vaccination',
        provider: 'Happy Paws Clinic',
        providerId: 'seller_005',
        price: 120,
        rating: 5.0,
        reviews: 189,
        image:
          'https://images.unsplash.com/photo-1576091160399-f665d671e572?w=300&q=80',
        duration: 45,
        availableSlots: ['08:00', '09:30', '11:00', '13:00', '14:30'],
        createdAt: new Date('2024-01-05'),
      },
      {
        id: 'svc_003',
        type: 'training',
        name: 'Dog Training Classes',
        description: 'Professional dog training for obedience and behavior',
        provider: 'Smart Dogs Academy',
        providerId: 'seller_006',
        price: 50,
        rating: 4.7,
        reviews: 156,
        image:
          'https://images.unsplash.com/photo-1560807707-38cc396dc385?w=300&q=80',
        duration: 90,
        availableSlots: ['10:00', '15:00', '16:00'],
        createdAt: new Date('2024-01-10'),
      },
      {
        id: 'svc_004',
        type: 'boarding',
        name: 'Pet Boarding',
        description: 'Safe and comfortable boarding facility for your pets',
        provider: 'PetStay Resort',
        providerId: 'seller_007',
        price: 40,
        rating: 4.6,
        reviews: 98,
        image:
          'https://images.unsplash.com/photo-1576091160669-112d19633e4b?w=300&q=80',
        duration: 1440,
        availableSlots: ['Check-in anytime'],
        createdAt: new Date('2024-01-15'),
      },
      {
        id: 'svc_005',
        type: 'walking',
        name: 'Dog Walking Service',
        description: 'Daily dog walks and outdoor exercise',
        provider: 'Happy Walks',
        providerId: 'seller_008',
        price: 25,
        rating: 4.8,
        reviews: 312,
        image:
          'https://images.unsplash.com/photo-1633722715463-d30628ceb4ae?w=300&q=80',
        duration: 30,
        availableSlots: ['07:00', '12:00', '18:00'],
        createdAt: new Date('2024-02-01'),
      },
    ];

    return type ? allServices.filter((s) => s.type === type) : allServices;
  },

  // ─── Cart & Orders ───────────────────────────────────────────────────────

  /**
   * Get user's cart items
   */
  getCart: async (): Promise<
    Array<{ product: Product; quantity: number }>
  > => {
    return [
      {
        product: {
          id: 'prod_001',
          name: 'Premium Dog Food',
          category: 'food',
          description:
            'High-quality dog food with all essential nutrients',
          price: 49.99,
          rating: 4.8,
          reviews: 234,
          image:
            'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=300&q=80',
          sellerId: 'seller_001',
          sellerName: 'PetCare Store',
          inStock: true,
          quantity: 50,
          tags: ['food', 'dog', 'nutrition'],
          createdAt: new Date('2024-01-01'),
        },
        quantity: 2,
      },
      {
        product: {
          id: 'prod_004',
          name: 'Pet Grooming Brush',
          category: 'grooming',
          description: 'Professional grooming brush for dogs and cats',
          price: 19.99,
          rating: 4.7,
          reviews: 342,
          image:
            'https://images.unsplash.com/photo-1576091160399-9c12cb4ee413?w=300&q=80',
          sellerId: 'seller_003',
          sellerName: 'Grooming Plus',
          inStock: true,
          quantity: 200,
          tags: ['grooming', 'brush', 'accessory'],
          createdAt: new Date('2024-01-15'),
        },
        quantity: 1,
      },
    ];
  },

  /**
   * Get user's orders
   */
  getOrders: async (): Promise<Order[]> => {
    return [
      {
        id: 'order_001',
        userId: 'user_001',
        items: [
          {
            product: {
              id: 'prod_002',
              name: 'Interactive Dog Toy',
              category: 'toys',
              description:
                'Durable toy that keeps dogs entertained for hours',
              price: 24.99,
              rating: 4.5,
              reviews: 156,
              image:
                'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80',
              sellerId: 'seller_001',
              sellerName: 'PetCare Store',
              inStock: true,
              quantity: 120,
              tags: ['toy', 'dog', 'interactive'],
              createdAt: new Date('2024-01-05'),
            },
            quantity: 2,
          },
        ],
        totalPrice: 49.98,
        status: 'delivered',
        paymentStatus: 'paid',
        deliveryAddress: {
          street: '123 Pet Street',
          city: 'San Francisco',
          state: 'CA',
          pincode: '94105',
        },
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-03-01'),
      },
      {
        id: 'order_002',
        userId: 'user_001',
        items: [
          {
            product: {
              id: 'prod_003',
              name: 'Cat Scratching Post',
              category: 'housing',
              description:
                'Multi-level cat scratching post for exercise and relaxation',
              price: 79.99,
              rating: 4.6,
              reviews: 89,
              image:
                'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&q=80',
              sellerId: 'seller_002',
              sellerName: 'Cat Kingdom',
              inStock: true,
              quantity: 25,
              tags: ['housing', 'cat', 'furniture'],
              createdAt: new Date('2024-01-10'),
            },
            quantity: 1,
          },
        ],
        totalPrice: 79.99,
        status: 'pending',
        paymentStatus: 'paid',
        deliveryAddress: {
          street: '123 Pet Street',
          city: 'San Francisco',
          state: 'CA',
          pincode: '94105',
        },
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-03-10'),
      },
    ];
  },

  // ─── Seller Dashboard ─────────────────────────────────────────────────────

  /**
   * Get seller stats
   */
  getSellerStats: async (): Promise<{
    totalSales: number;
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    avgRating: number;
  }> => {
    return {
      totalSales: 1250,
      totalRevenue: 48500,
      totalOrders: 340,
      totalProducts: 45,
      avgRating: 4.7,
    };
  },

  /**
   * Get seller's products
   */
  getSellerProducts: async (sellerId: string): Promise<Product[]> => {
    return [
      {
        id: 'prod_001',
        name: 'Premium Dog Food',
        category: 'food',
        description: 'High-quality dog food with all essential nutrients',
        price: 49.99,
        rating: 4.8,
        reviews: 234,
        image:
          'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=300&q=80',
        sellerId: sellerId,
        sellerName: 'PetCare Store',
        inStock: true,
        quantity: 50,
        tags: ['food', 'dog', 'nutrition'],
        createdAt: new Date('2024-01-01'),
      },
      {
        id: 'prod_002',
        name: 'Interactive Dog Toy',
        category: 'toys',
        description:
          'Durable toy that keeps dogs entertained for hours with interactive features',
        price: 24.99,
        rating: 4.5,
        reviews: 156,
        image:
          'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80',
        sellerId: sellerId,
        sellerName: 'PetCare Store',
        inStock: true,
        quantity: 120,
        tags: ['toy', 'dog', 'interactive'],
        createdAt: new Date('2024-01-05'),
      },
    ];
  },

  /**
   * Get seller's orders
   */
  getSellerOrders: async (sellerId: string): Promise<Order[]> => {
    return [
      {
        id: 'order_101',
        userId: 'user_002',
        items: [
          {
            product: {
              id: 'prod_001',
              name: 'Premium Dog Food',
              category: 'food',
              description:
                'High-quality dog food with all essential nutrients',
              price: 49.99,
              rating: 4.8,
              reviews: 234,
              image:
                'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=300&q=80',
              sellerId: sellerId,
              sellerName: 'PetCare Store',
              inStock: true,
              quantity: 50,
              tags: ['food', 'dog', 'nutrition'],
              createdAt: new Date('2024-01-01'),
            },
            quantity: 3,
          },
        ],
        totalPrice: 149.97,
        status: 'preparing',
        paymentStatus: 'paid',
        deliveryAddress: {
          street: '456 Dog Lane',
          city: 'Los Angeles',
          state: 'CA',
          pincode: '90001',
        },
        createdAt: new Date('2024-03-12'),
        updatedAt: new Date('2024-03-13'),
      },
    ];
  },
};
