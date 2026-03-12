import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Colors ──────────────────────────────────────────────────────────────────

export const COLORS = {
  // Brand
  primary: '#FF6B35',      // Warm orange — energy, playfulness
  primaryLight: '#FF8C5A',
  primaryDark: '#E55A25',
  secondary: '#2EC4B6',    // Teal — trust, calmness
  secondaryLight: '#4DD8CC',
  secondaryDark: '#1BA99D',

  // Accent
  accent: '#FFD166',       // Yellow — joy, optimism
  accentLight: '#FFE08A',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  background: '#F8F9FC',
  surface: '#FFFFFF',
  surfaceAlt: '#F0F2F8',

  // Text
  textPrimary: '#1A1D2E',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',

  // Semantic
  success: '#22C55E',
  successLight: '#DCFCE7',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',

  // Borders
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  divider: '#E5E7EB',

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.2)',

  // Pet categories (used as tag colors)
  dog: '#FF6B35',
  cat: '#A855F7',
  bird: '#22C55E',
  fish: '#3B82F6',
  rabbit: '#EC4899',
  reptile: '#84CC16',

  // Tab bar
  tabActive: '#FF6B35',
  tabInactive: '#9CA3AF',
};

// ─── Typography ──────────────────────────────────────────────────────────────

export const FONTS = {
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
};

export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
};

export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
};

export const FONT_WEIGHTS = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
};

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};

// ─── Border Radius ───────────────────────────────────────────────────────────

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

// ─── Shadows ─────────────────────────────────────────────────────────────────

export const SHADOWS = {
  none: {},
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  xl: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
};

// ─── Screen Dimensions ───────────────────────────────────────────────────────

export const SCREEN = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

// ─── Z-Index ─────────────────────────────────────────────────────────────────

export const Z_INDEX = {
  base: 0,
  card: 10,
  dropdown: 100,
  modal: 200,
  toast: 300,
};

// ─── Animation ───────────────────────────────────────────────────────────────

export const ANIMATION = {
  fast: 150,
  normal: 250,
  slow: 400,
};

// ─── Default Export ───────────────────────────────────────────────────────────

const theme = {
  colors: COLORS,
  fonts: FONTS,
  fontSizes: FONT_SIZES,
  fontWeights: FONT_WEIGHTS,
  lineHeights: LINE_HEIGHTS,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  screen: SCREEN,
  zIndex: Z_INDEX,
  animation: ANIMATION,
};

export default theme;
