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
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOW, SPACING, RADIUS, FONT_SIZE, FONT_WEIGHT } from '../../constants/theme';
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
      {/* Header with Gradient */}
      <LinearGradient
        colors={['rgba(0, 217, 255, 0.1)', 'rgba(0, 153, 204, 0.05)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.headerGradient}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back! 👋</Text>
          <Text style={styles.subtitle}>Your pet's one-stop destination</Text>
        </View>
      </LinearGradient>

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
  headerGradient: {
    paddingBottom: SPACING.base,
  },
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl + 8,
    paddingBottom: SPACING.base,
  },
  greeting: {
    fontSize: FONT_SIZE['4xl'],
    fontWeight: FONT_WEIGHT.black,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FONT_SIZE.base,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHT.medium,
  },
  section: {
    paddingVertical: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  seeAll: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT.bold,
  },
  // Pet Cards
  petCard: {
    marginLeft: SPACING.xl,
    marginBottom: SPACING.lg,
    width: 140,
    alignItems: 'center',
    backgroundColor: COLORS.bgGlass,
    borderWidth: 1,
    borderColor: COLORS.bgGlassBorder,
    borderRadius: RADIUS.xl,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.base,
    ...SHADOW.md,
  },
  petImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    overflow: 'hidden',
    ...SHADOW.glowSm,
  },
  petImageAsset: {
    width: '100%',
    height: '100%',
  },
  petImageText: {
    fontSize: 48,
  },
  petName: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  petBreed: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontWeight: FONT_WEIGHT.medium,
  },
  addPet: {
    marginRight: SPACING.xl,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
  },
  addPetText: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.white,
  },
  // Banner
  bannerSection: {
    paddingHorizontal: SPACING.xl,
  },
  banner: {
    borderRadius: RADIUS.xl,
    paddingVertical: SPACING['2xl'],
    paddingHorizontal: SPACING.xl,
    ...SHADOW.lg,
  },
  bannerText: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: FONT_WEIGHT.black,
    color: COLORS.white,
    marginBottom: SPACING.sm,
    letterSpacing: -0.3,
  },
  bannerSubtext: {
    fontSize: FONT_SIZE.base,
    color: COLORS.white,
    opacity: 0.95,
    fontWeight: FONT_WEIGHT.semiBold,
  },
  // Product Cards
  productCard: {
    marginLeft: SPACING.xl,
    marginBottom: SPACING.lg,
    width: 160,
    backgroundColor: COLORS.bgGlass,
    borderWidth: 1,
    borderColor: COLORS.bgGlassBorder,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOW.md,
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  productImageText: {
    fontSize: 48,
  },
  productName: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.base,
  },
  price: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.black,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.base,
  },
  ratingContainer: {
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.base,
  },
  rating: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHT.medium,
  },
  // Service Cards
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgGlass,
    borderWidth: 1,
    borderColor: COLORS.bgGlassBorder,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
    ...SHADOW.md,
  },
  serviceIcon: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.base,
    ...SHADOW.glowSm,
  },
  serviceIconText: {
    fontSize: 32,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  serviceProvider: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHT.medium,
  },
  serviceRight: {
    alignItems: 'flex-end',
  },
  servicePrice: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  serviceRating: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHT.medium,
  },
  // Actions Grid
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.xl,
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    aspectRatio: 1.3,
    backgroundColor: COLORS.bgGlass,
    borderWidth: 1,
    borderColor: COLORS.bgGlassBorder,
    borderRadius: RADIUS.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOW.md,
  },
  actionIcon: {
    fontSize: 36,
    marginBottom: SPACING.sm,
  },
  actionLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    textTransform: 'capitalize',
  },
  spacing: {
    height: SPACING['2xl'],
  },
});
