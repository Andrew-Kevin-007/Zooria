import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../types';

interface OrdersState {
  orders: Order[];
  activeOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  activeOrder: null,
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
      state.isLoading = false;
    },
    setActiveOrder(state, action: PayloadAction<Order | null>) {
      state.activeOrder = action.payload;
    },
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.unshift(action.payload);
    },
    updateOrderStatus(state, action: PayloadAction<{ orderId: string; status: Order['status'] }>) {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order) order.status = action.payload.status;
      if (state.activeOrder?.id === action.payload.orderId) {
        state.activeOrder.status = action.payload.status;
      }
    },
    setOrdersLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setOrdersError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setOrders,
  setActiveOrder,
  addOrder,
  updateOrderStatus,
  setOrdersLoading,
  setOrdersError,
} = ordersSlice.actions;
export default ordersSlice.reducer;
