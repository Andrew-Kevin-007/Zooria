import React, {useRef} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING} from '../../constants/theme';

type ButtonVariant = 'primary' | 'accent' | 'glass' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const HEIGHT: Record<ButtonSize, number> = {sm: 40, md: 52, lg: 60};

const GRADIENT_MAP: Record<string, readonly [string, string]> = {
  primary: COLORS.gradientPrimary,
  accent: COLORS.gradientAccent,
};

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const isGradient = variant === 'primary' || variant === 'accent';
  const h = HEIGHT[size];

  const containerStyle: ViewStyle[] = [
    styles.base,
    {height: h},
    fullWidth && styles.fullWidth,
    variant === 'glass' && styles.glass,
    variant === 'ghost' && styles.ghost,
    variant === 'primary' && SHADOW.glowSm,
    variant === 'accent' && SHADOW.glowPink,
    disabled && styles.disabled,
    style as ViewStyle,
  ].filter(Boolean) as ViewStyle[];

  const labelColor =
    variant === 'primary'
      ? COLORS.textInverse
      : COLORS.textPrimary;

  const content = loading ? (
    <ActivityIndicator color={COLORS.white} size="small" />
  ) : (
    <Text
      style={[
        styles.label,
        {fontSize: size === 'sm' ? FONT_SIZE.base : FONT_SIZE.md},
        {color: labelColor},
        textStyle,
      ]}>
      {label}
    </Text>
  );

  return (
    <Animated.View style={{transform: [{scale}]}}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}>
        {isGradient ? (
          <LinearGradient
            colors={[...GRADIENT_MAP[variant]!]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={containerStyle}>
            {content}
          </LinearGradient>
        ) : (
          <Animated.View style={containerStyle}>{content}</Animated.View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  fullWidth: {
    width: '100%',
  },
  glass: {
    backgroundColor: COLORS.bgGlass,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: -0.3,
  },
});

export default Button;
