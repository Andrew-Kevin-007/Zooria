import {TextStyle} from 'react-native';

// ─── COLORS ────────────────────────────────────────────────
export const COLORS = {
  // Backgrounds (dark-first, enhanced)
  bgPrimary: '#0A0A0A',
  bgSecondary: '#161616',
  bgTertiary: '#202020',
  bgGlass: 'rgba(255,255,255,0.08)',
  bgGlassBorder: 'rgba(255,255,255,0.1)',
  // Backward-compatible aliases used across older screens
  background: '#0A0A0A',
  surface: '#151515',
  surfaceAlt: '#1E1E1E',
  border: 'rgba(255,255,255,0.1)',

  // Brand Gradients (use as arrays with LinearGradient)
  gradientPrimary: ['#00D9FF', '#0099FF'] as const, // Cyan to Blue
  gradientAccent: ['#FF6B35', '#FF8C42'] as const,  // Orange
  gradientPurple: ['#A78BFA', '#7C3AED'] as const,  // Purple
  gradientSuccess: ['#34D399', '#10B981'] as const, // Green
  gradientDark: ['#1A1A1A', '#0D0D0D'] as const,
  gradientCard: [
    'rgba(255,255,255,0.08)',
    'rgba(255,255,255,0.02)',
  ] as const,

  // Brand - Enhanced vibrant palette
  primary: '#00D9FF',     // Cyan - vibrant & modern
  primaryLight: '#33E5FF',
  primaryDark: '#0099CC',
  secondary: '#FF6B35',   // Orange - warm & friendly  
  secondaryLight: '#FF8C5A',
  secondaryDark: '#E55A25',
  tertiary: '#7C3AED',    // Purple - creative & elegant

  // Accent
  accent: '#34D399',      // Green - success & growth
  accentLight: '#6EE7B7',
  accentDark: '#10B981',

  // Solids
  neonGreen: '#34D399',
  hotPink: '#FF006E',
  purple: '#A78BFA',
  coral: '#FF6B35',
  gold: '#FBBF24',
  white: '#FFFFFF',
  offWhite: '#F9FAFB',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.7)',
  textMuted: 'rgba(255,255,255,0.4)',
  textTertiary: 'rgba(255,255,255,0.4)',
  textInverse: '#0A0A0A',

  // Status
  success: '#34D399',
  error: '#FF006E',
  errorLight: 'rgba(255, 0, 110, 0.12)',
  warning: '#FBBF24',
  info: '#3B82F6',

  // Glow shadows (use as shadowColor)
  glowGreen: 'rgba(52, 211, 153, 0.35)',
  glowPink: 'rgba(255, 0, 110, 0.35)',
  glowPurple: 'rgba(167, 139, 250, 0.35)',
  glowBlue: 'rgba(0, 217, 255, 0.35)',
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

// ─── SHADOWS (Glow Presets - Enhanced) ────────────────────────────────
export const SHADOW = {
  // Subtle elevation
  sm: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  // Medium elevation
  md: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  // Large elevation
  lg: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  // Blue glow (primary)
  glowSm: {
    shadowColor: COLORS.glowBlue,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 4,
  },
  glowMd: {
    shadowColor: COLORS.glowBlue,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 8,
  },
  // Green glow
  glowGreen: {
    shadowColor: COLORS.glowGreen,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.75,
    shadowRadius: 12,
    elevation: 6,
  },
  // Pink glow
  glowPink: {
    shadowColor: COLORS.glowPink,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.75,
    shadowRadius: 12,
    elevation: 6,
  },
  // Purple glow
  glowPurple: {
    shadowColor: COLORS.glowPurple,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.75,
    shadowRadius: 12,
    elevation: 6,
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
