import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import {COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING} from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  prefix?: string;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  prefix,
  isPassword = false,
  containerStyle,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(isPassword);
  const glowAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setFocused(true);
    Animated.timing(glowAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setFocused(false);
    Animated.timing(glowAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = error
    ? COLORS.hotPink
    : focused
    ? COLORS.neonGreen
    : COLORS.bgGlassBorder;

  const glowShadow = focused && !error ? SHADOW.glowSm : {};

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View style={[styles.inputWrapper, {borderColor}, glowShadow]}>
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          style={[styles.input, prefix ? styles.inputWithPrefix : undefined]}
          placeholderTextColor={COLORS.textMuted}
          selectionColor={COLORS.neonGreen}
          secureTextEntry={hidden}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setHidden(prev => !prev)}
            style={styles.eyeButton}>
            <Text style={styles.eyeIcon}>{hidden ? '👁️' : '🙈'}</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.base,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    marginBottom: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgSecondary,
    borderWidth: 1,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.base,
    height: 52,
  },
  prefix: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    padding: 0,
  },
  inputWithPrefix: {
    marginLeft: 0,
  },
  eyeButton: {
    paddingLeft: SPACING.sm,
  },
  eyeIcon: {
    fontSize: FONT_SIZE.lg,
  },
  error: {
    color: COLORS.hotPink,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
  },
});

export default Input;
