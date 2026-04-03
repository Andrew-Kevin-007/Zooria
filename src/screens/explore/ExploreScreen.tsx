import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOW, SPACING, RADIUS, FONT_SIZE, FONT_WEIGHT } from '../../constants/theme';
import { mockService } from '../../services/mockService';
import { Product, ProductCategory } from '../../types';

const CATEGORIES: ProductCategory[] = [
  'food',
  'accessories',
  'toys',
  'health',
  'grooming',
  'housing',
];

interface ExploreScreenProps {
  navigation?: any;
}

export function ExploreScreen({ navigation }: ExploreScreenProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await mockService.getProducts(undefined, 1, 20);
      setProducts(data.products);
      setFilteredProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error loading products:', error);
      setLoading(false);
    }
  };

  const filterProducts = (category: ProductCategory | null, search: string) => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (search.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryPress = (category: ProductCategory | null) => {
    setSelectedCategory(category);
    filterProducts(category, searchQuery);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    filterProducts(selectedCategory, text);
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Text style={styles.productImageText}>📦</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productDescription} numberOfLines={1}>
          {item.description}
        </Text>
        <View style={styles.productMeta}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={['rgba(255, 107, 53, 0.12)', 'rgba(0, 217, 255, 0.05)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore & Shop</Text>
          <Text style={styles.headerSubtitle}>Find amazing products for your pet</Text>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchWrapper, SHADOW.sm]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
      >
        <TouchableOpacity
          style={[
            styles.categoryChip,
            !selectedCategory && styles.categoryChipActive,
          ]}
          onPress={() => handleCategoryPress(null)}
        >
          <Text
            style={[
              styles.categoryText,
              !selectedCategory && styles.categoryTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              selectedCategory === cat && styles.categoryChipActive,
            ]}
            onPress={() => handleCategoryPress(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products List */}
      {filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyText}>No products found</Text>
          <Text style={styles.emptySubtext}>
            Try adjusting your filters or search query
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productList}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          scrollEnabled={false}
        />
      )}
    </View>
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
  },
  header: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
  },
  headerTitle: {
    fontSize: FONT_SIZE['4xl'],
    fontWeight: FONT_WEIGHT.black,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: FONT_SIZE.base,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHT.medium,
    marginTop: SPACING.xs,
  },
  searchContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
    marginTop: -SPACING.md,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.bgGlassBorder,
  },
  searchIcon: {
    fontSize: FONT_SIZE.xl,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZE.base,
    color: COLORS.textPrimary,
    fontWeight: FONT_WEIGHT.medium,
  },
  categoriesScroll: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
    maxHeight: 60,
  },
  categoryChip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bgGlass,
    marginRight: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.bgGlassBorder,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textSecondary,
  },
  categoryTextActive: {
    color: COLORS.textInverse,
  },
  productList: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING['2xl'],
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    marginBottom: SPACING.md,
  },
  productCard: {
    width: '48%',
    backgroundColor: COLORS.bgGlass,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.bgGlassBorder,
    ...SHADOW.md,
  },
  productImageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImageText: {
    fontSize: 48,
  },
  productInfo: {
    padding: SPACING.base,
  },
  productName: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  productDescription: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    fontWeight: FONT_WEIGHT.medium,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  price: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.black,
    color: COLORS.primary,
  },
  rating: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHT.medium,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.textInverse,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.bold,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.base,
  },
  emptyText: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  emptySubtext: {
    fontSize: FONT_SIZE.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING['2xl'],
    fontWeight: FONT_WEIGHT.medium,
  },
});
