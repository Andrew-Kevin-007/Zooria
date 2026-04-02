import {TextStyle} from 'react-native';

// ─── COLORS ────────────────────────────────────────────────
export const COLORS = {
  // Backgrounds (dark-first)
  bgPrimary: '#0D0D0D',
  bgSecondary: '#1A1A1A',
  bgTertiary: '#242424',
  bgGlass: 'rgba(255,255,255,0.07)',
  bgGlassBorder: 'rgba(255,255,255,0.12)',

  // Brand Gradients (use as arrays with LinearGradient)
  gradientPrimary: ['#39FF7E', '#00C9A7'] as const,
  gradientAccent: ['#FF4D6D', '#FF8C42'] as const,
  gradientPurple: ['#9B5DE5', '#6A0DAD'] as const,
  gradientDark: ['#1A1A1A', '#0D0D0D'] as const,
  gradientCard: [
    'rgba(255,255,255,0.1)',
    'rgba(255,255,255,0.03)',
  ] as const,

  // Brand
  primary: '#FF6B35', // Warm orange — energy, playfulness
  primaryLight: '#FF8C5A',
  primaryDark: '#E55A25',
  secondary: '#2EC4B6', // Teal — trust, calmness
  secondaryLight: '#4DD8CC',
  secondaryDark: '#1BA99D',

  // Accent
  accent: '#FFD166', // Yellow — joy, optimism
  accentLight: '#FFE08A',

  // Solids
  neonGreen: '#39FF7E',
  hotPink: '#FF4D6D',
  purple: '#9B5DE5',
  coral: '#FF8C42',
  gold: '#FFD700',
  white: '#FFFFFF',
  offWhite: '#F0F0F0',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.65)',
  textMuted: 'rgba(255,255,255,0.35)',
  textInverse: '#0D0D0D',

  // Status
  success: '#39FF7E',
  error: '#FF4D6D',
  warning: '#FFD700',
  info: '#5B8DEF',

  // Glow shadows (use as shadowColor)
  glowGreen: 'rgba(57, 255, 126, 0.4)',
  glowPink: 'rgba(255, 77, 109, 0.4)',
  glowPurple: 'rgba(155, 93, 229, 0.4)',
} as const;

// ─── FONT SIZES ────────────────────────────────────────────
export const FONT_SIZE = {
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
  '6xl': 52,
} as const;

// ─── FONT WEIGHTS ──────────────────────────────────────────
export const FONT_WEIGHT: Record<string, TextStyle['fontWeight']> = {
  black: '900',
  bold: '700',
  semiBold: '600',
  medium: '500',
  regular: '400',
} as const;

// ─── SPACING ───────────────────────────────────────────────
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
} as const;

// ─── BORDER RADIUS ─────────────────────────────────────────
export const RADIUS = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  full: 999,
} as const;

// ─── SHADOWS (Glow Presets) ────────────────────────────────
export const SHADOW = {
  glowSm: {
    shadowColor: COLORS.glowGreen,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  glowMd: {
    shadowColor: COLORS.glowGreen,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  glowPink: {
    shadowColor: COLORS.glowPink,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  glowPurple: {
    shadowColor: COLORS.glowPurple,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// ─── GLASSMORPHISM STYLE HELPER ────────────────────────────
export const GLASS = {
  backgroundColor: COLORS.bgGlass,
  borderWidth: 1,
  borderColor: COLORS.bgGlassBorder,
  borderRadius: RADIUS.xl,
  overflow: 'hidden' as const,
};
