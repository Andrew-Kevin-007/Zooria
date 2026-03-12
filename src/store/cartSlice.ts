import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const recalculate = (items: CartItem[]) => ({
  totalAmount: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; quantity?: number }>) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.productId === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          product,
          quantity,
          shopId: product.shopId,
        });
      }
      Object.assign(state, recalculate(state.items));
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      Object.assign(state, recalculate(state.items));
    },
    updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const item = state.items.find((i) => i.productId === action.payload.productId);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
      Object.assign(state, recalculate(state.items));
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      Object.assign(state, recalculate(action.payload));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
