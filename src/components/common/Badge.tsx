import React from 'react';
import {Text, StyleSheet, View, ViewStyle} from 'react-native';
import {COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING} from '../../constants/theme';

type BadgeVariant = 'green' | 'pink' | 'purple' | 'gold' | 'glass';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

const VARIANT_STYLES: Record<BadgeVariant, {bg: string; text: string}> = {
  green: {bg: COLORS.neonGreen, text: COLORS.textInverse},
  pink: {bg: COLORS.hotPink, text: COLORS.white},
  purple: {bg: COLORS.purple, text: COLORS.white},
  gold: {bg: COLORS.gold, text: COLORS.textInverse},
  glass: {bg: COLORS.bgGlass, text: COLORS.white},
};

const Badge: React.FC<BadgeProps> = ({label, variant = 'green', style}) => {
  const {bg, text} = VARIANT_STYLES[variant];

  return (
    <View
      style={[
        styles.badge,
        {backgroundColor: bg},
        variant === 'glass' && styles.glassBorder,
        style,
      ]}>
      <Text style={[styles.label, {color: text}]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    alignSelf: 'flex-start',
  },
  glassBorder: {
    borderWidth: 1,
    borderColor: COLORS.bgGlassBorder,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semiBold,
    letterSpacing: -0.2,
  },
});

export default Badge;
