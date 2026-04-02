import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Text } from 'react-native';
import { Image } from 'expo-image';
import { COLORS } from '../../constants/theme';
import { mockService } from '../../services/mockService';
import { Product, Service, Pet } from '../../types';

const PET_CATEGORY_ICON: Record<Pet['category'], string> = {
  dog: '🐶',
  cat: '🐱',
  bird: '🐦',
  fish: '🐠',
  rabbit: '🐰',
  reptile: '🦎',
  other: '🐾',
};

const getPetCategoryIcon = (category: Pet['category']) => PET_CATEGORY_ICON[category] ?? '🐾';

export function HomeScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      const [petsData, productsData, servicesData] = await Promise.all([
        mockService.getPets(),
        mockService.getProducts(undefined, 1, 4),
        mockService.getServices(),
      ]);

      setPets(petsData);
      setFeaturedProducts(productsData.products);
      setServices(servicesData.slice(0, 3));
      setLoading(false);
    } catch (error) {
      console.error('Error loading home data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome to Zooria! 🐾</Text>
        <Text style={styles.subtitle}>Your pet's one-stop destination</Text>
      </View>

      {/* My Pets Section */}
      {pets.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Pets</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {pets.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                style={styles.petCard}
              >
                <View style={styles.petImage}>
                  {pet.avatar ? (
                    <Image source={pet.avatar} style={styles.petImageAsset} contentFit="cover" />
                  ) : (
                    <Text style={styles.petImageText}>{getPetCategoryIcon(pet.category)}</Text>
                  )}
                </View>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petBreed}>{pet.breed}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.petCard, styles.addPet]}>
              <Text style={styles.addPetText}>+ Add Pet</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Banner Section */}
      <View style={styles.bannerSection}>
        <View style={[styles.banner, { backgroundColor: COLORS.primary }]}>
          <Text style={styles.bannerText}>Super Savings Today!</Text>
          <Text style={styles.bannerSubtext}>Up to 50% off on selected items</Text>
        </View>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
            >
              <View style={styles.productImage}>
                <Text style={styles.productImageText}>📦</Text>
              </View>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐ {product.rating}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Services</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
          >
            <View style={styles.serviceIcon}>
              <Text style={styles.serviceIconText}>
                {service.type === 'grooming'
                  ? '✂️'
                  : service.type === 'vet'
                    ? '🏥'
                    : service.type === 'training'
                      ? '🎓'
                      : service.type === 'boarding'
                        ? '🏠'
                        : '🚶'}
              </Text>
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceProvider}>{service.provider}</Text>
            </View>
            <View style={styles.serviceRight}>
              <Text style={styles.servicePrice}>${service.price}</Text>
              <Text style={styles.serviceRating}>⭐ {service.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🛒</Text>
            <Text style={styles.actionLabel}>Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🛁</Text>
            <Text style={styles.actionLabel}>Services</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🐕</Text>
            <Text style={styles.actionLabel}>Pets</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📦</Text>
            <Text style={styles.actionLabel}>Orders</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.spacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  section: {
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  // Pet Cards
  petCard: {
    marginLeft: 16,
    marginBottom: 12,
    width: 120,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  petImageAsset: {
    width: '100%',
    height: '100%',
  },
  petImageText: {
    fontSize: 40,
  },
  petName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  petBreed: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  addPet: {
    marginRight: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
  },
  addPetText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  // Banner
  bannerSection: {
    paddingHorizontal: 16,
  },
  banner: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 4,
  },
  bannerSubtext: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  // Product Cards
  productCard: {
    marginLeft: 16,
    marginBottom: 12,
    width: 140,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
  },
  productImage: {
    width: '100%',
    height: 100,
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productImageText: {
    fontSize: 40,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 6,
  },
  ratingContainer: {
    marginTop: 4,
  },
  rating: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  // Service Cards
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceIconText: {
    fontSize: 28,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  serviceProvider: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  serviceRight: {
    alignItems: 'flex-end',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 2,
  },
  serviceRating: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  // Actions Grid
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    aspectRatio: 1.2,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  spacing: {
    height: 20,
  },
});
