import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  ViewProps,
} from 'react-native';
import {COLORS, RADIUS, SHADOW} from '../../constants/theme';

type GlowType = 'green' | 'pink' | 'purple';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
  glow?: GlowType;
  style?: ViewStyle;
}

const GLOW_MAP: Record<GlowType, ViewStyle> = {
  green: SHADOW.glowMd,
  pink: SHADOW.glowPink,
  purple: SHADOW.glowPurple,
};

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  onPress,
  glow,
  style,
  ...rest
}) => {
  const glowStyle = glow ? GLOW_MAP[glow] : {};

  const cardContent = (
    <View style={[styles.card, glowStyle, style]} {...rest}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        {cardContent}
      </TouchableOpacity>
    );
  }

  return cardContent;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgGlass,
    borderWidth: 1,
    borderColor: COLORS.bgGlassBorder,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
  },
});

export default GlassCard;
