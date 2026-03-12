import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PetCategory, ProductCategory } from '../types';

interface FiltersState {
  searchQuery: string;
  selectedCategory: PetCategory | ProductCategory | null;
  priceRange: { min: number; max: number };
  sortBy: 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
  activeTab: 'pets' | 'products' | 'services';
  location: { lat: number; lng: number } | null;
  radiusKm: number;
  onlyVerifiedShops: boolean;
}

const initialState: FiltersState = {
  searchQuery: '',
  selectedCategory: null,
  priceRange: { min: 0, max: 100000 },
  sortBy: 'relevance',
  activeTab: 'pets',
  location: null,
  radiusKm: 10,
  onlyVerifiedShops: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCategory(state, action: PayloadAction<FiltersState['selectedCategory']>) {
      state.selectedCategory = action.payload;
    },
    setPriceRange(state, action: PayloadAction<{ min: number; max: number }>) {
      state.priceRange = action.payload;
    },
    setSortBy(state, action: PayloadAction<FiltersState['sortBy']>) {
      state.sortBy = action.payload;
    },
    setActiveTab(state, action: PayloadAction<FiltersState['activeTab']>) {
      state.activeTab = action.payload;
    },
    setLocation(state, action: PayloadAction<FiltersState['location']>) {
      state.location = action.payload;
    },
    setRadius(state, action: PayloadAction<number>) {
      state.radiusKm = action.payload;
    },
    toggleVerifiedShops(state) {
      state.onlyVerifiedShops = !state.onlyVerifiedShops;
    },
    resetFilters(state) {
      return { ...initialState, location: state.location };
    },
  },
});

export const {
  setSearchQuery,
  setCategory,
  setPriceRange,
  setSortBy,
  setActiveTab,
  setLocation,
  setRadius,
  toggleVerifiedShops,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
