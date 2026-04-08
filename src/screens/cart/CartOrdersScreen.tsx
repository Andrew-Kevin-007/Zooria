import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { mockService } from '../../services/mockService';
import { Order } from '../../types';

type TabType = 'cart' | 'orders';

export function CartOrdersScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('cart');
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ordersData, cartData] = await Promise.all([
        mockService.getOrders(),
        mockService.getCart(),
      ]);
      setOrders(ordersData);
      setCartItems(cartData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return COLORS.success;
      case 'preparing':
        return COLORS.warning;
      case 'pending':
        return COLORS.warning;
      case 'cancelled':
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'check-circle';
      case 'preparing':
        return 'package-variant-closed';
      case 'pending':
        return 'clock-outline';
      case 'cancelled':
        return 'close-circle';
      default:
        return 'clipboard-list-outline';
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Cart & Orders</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'cart' && styles.tabActive]}
          onPress={() => setActiveTab('cart')}
        >
          <View style={styles.tabLabelRow}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={16}
              color={activeTab === 'cart' ? COLORS.primary : COLORS.textSecondary}
            />
            <Text
              style={[styles.tabText, activeTab === 'cart' && styles.tabTextActive]}
            >
              Cart
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'orders' && styles.tabActive]}
          onPress={() => setActiveTab('orders')}
        >
          <View style={styles.tabLabelRow}>
            <MaterialCommunityIcons
              name="package-variant-closed"
              size={16}
              color={activeTab === 'orders' ? COLORS.primary : COLORS.textSecondary}
            />
            <Text
              style={[styles.tabText, activeTab === 'orders' && styles.tabTextActive]}
            >
              Orders
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'cart' ? (
          // CART TAB
          <>
            {cartItems.length === 0 ? (
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons style={styles.emptyIcon} name="cart-outline" size={64} color={COLORS.textSecondary} />
                <Text style={styles.emptyText}>Your cart is empty</Text>
                <Text style={styles.emptySubtext}>
                  Add items from the shop to get started
                </Text>
                <TouchableOpacity style={styles.emptyButton}>
                  <Text style={styles.emptyButtonText}>Continue Shopping</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {/* Cart Items */}
                {cartItems.map((item, index) => (
                  <View key={index} style={styles.cartItem}>
                    <View style={styles.itemImage}>
                      <MaterialCommunityIcons name="package-variant-closed" size={26} color={COLORS.primary} />
                    </View>
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.product.name}</Text>
                      <Text style={styles.itemDescription} numberOfLines={1}>
                        {item.product.description}
                      </Text>
                      <Text style={styles.itemPrice}>
                        ${item.product.price.toFixed(2)}
                      </Text>
                    </View>
                    <View style={styles.itemQuantity}>
                      <TouchableOpacity style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityValue}>{item.quantity}</Text>
                      <TouchableOpacity style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.removeButton}>
                      <MaterialCommunityIcons name="trash-can-outline" size={18} color={COLORS.error} />
                    </TouchableOpacity>
                  </View>
                ))}

                {/* Cart Summary */}
                <View style={styles.cartSummary}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>
                      ${calculateCartTotal().toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Shipping</Text>
                    <Text style={styles.summaryValue}>$5.00</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Tax</Text>
                    <Text style={styles.summaryValue}>
                      ${(calculateCartTotal() * 0.1).toFixed(2)}
                    </Text>
                  </View>
                  <View
                    style={[styles.summaryRow, styles.totalRow]}
                  >
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>
                      ${(calculateCartTotal() + 5 + calculateCartTotal() * 0.1).toFixed(2)}
                    </Text>
                  </View>
                </View>

                {/* Checkout Button */}
                <TouchableOpacity
                  style={styles.checkoutButton}
                  onPress={() => Alert.alert('Checkout', 'Proceeding to checkout...')}
                >
                  <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        ) : (
          // ORDERS TAB
          <>
            {orders.length === 0 ? (
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons style={styles.emptyIcon} name="package-variant-closed" size={64} color={COLORS.textSecondary} />
                <Text style={styles.emptyText}>No orders yet</Text>
                <Text style={styles.emptySubtext}>
                  Your orders will appear here once you place them
                </Text>
              </View>
            ) : (
              orders.map((order) => (
                <View key={order.id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <View>
                      <Text style={styles.orderId}>Order #{order.id.slice(-4).toUpperCase()}</Text>
                      <Text style={styles.orderDate}>
                        {typeof order.createdAt === 'string'
                          ? order.createdAt.split('T')[0]
                          : order.createdAt.toLocaleDateString()}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(order.status) },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={getStatusIcon(order.status)}
                        size={12}
                        color={COLORS.white}
                      />
                      <Text style={styles.statusText}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Text>
                    </View>
                  </View>

                  {/* Order Items */}
                  {order.items.map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                      <MaterialCommunityIcons style={styles.orderItemIcon} name="package-variant-closed" size={20} color={COLORS.primary} />
                      <View style={styles.orderItemDetails}>
                        <Text style={styles.orderItemName}>
                          {item.product.name}
                        </Text>
                        <Text style={styles.orderItemQty}>
                          Qty: {item.quantity}
                        </Text>
                      </View>
                      <Text style={styles.orderItemPrice}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </Text>
                    </View>
                  ))}

                  <View style={styles.orderFooter}>
                    <View>
                      <Text style={styles.orderTotalLabel}>Order Total</Text>
                      <Text style={styles.orderTotalAmount}>
                        ${order.totalPrice.toFixed(2)}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.orderDetailButton}>
                      <Text style={styles.orderDetailButtonText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </>
        )}
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  // Cart Items
  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  itemQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginHorizontal: 8,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: COLORS.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  quantityValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 8,
  },
  // Cart Summary
  cartSummary: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  // Checkout
  checkoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
  // Order Card
  orderCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.white,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  orderItemIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  orderItemDetails: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  orderItemQty: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  orderItemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  orderTotalLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  orderTotalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  orderDetailButton: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  orderDetailButtonText: {
    fontWeight: '600',
    color: COLORS.primary,
    fontSize: 12,
  },
});
