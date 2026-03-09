import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import {COLORS, FONT_SIZE, FONT_WEIGHT, SPACING} from '../../constants/theme';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulsing glow circle
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Tagline fade in
    Animated.timing(taglineOpacity, {
      toValue: 1,
      duration: 600,
      delay: 800,
      useNativeDriver: true,
    }).start();

    // Loading dots
    const dotAnim = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      );

    dotAnim(dot1, 0).start();
    dotAnim(dot2, 150).start();
    dotAnim(dot3, 300).start();

    // Navigate after 2.5s
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Pulsing paw circle */}
      <Animated.View
        style={[styles.pawCircle, {transform: [{scale: pulseAnim}]}]}>
        <Text style={styles.pawEmoji}>🐾</Text>
      </Animated.View>

      {/* App name */}
      <View style={styles.nameRow}>
        <Text style={styles.nameWhite}>zoor</Text>
        <Text style={styles.nameGreen}>ia</Text>
      </View>

      {/* Tagline */}
      <Animated.Text style={[styles.tagline, {opacity: taglineOpacity}]}>
        your pet's happy place ✨
      </Animated.Text>

      {/* Loading dots */}
      <View style={styles.dotsRow}>
        {[dot1, dot2, dot3].map((dot, i) => (
          <Animated.View
            key={i}
            style={[styles.dot, {opacity: dot}]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pawCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.bgSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.glowGreen,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 12,
  },
  pawEmoji: {
    fontSize: 44,
  },
  nameRow: {
    flexDirection: 'row',
    marginTop: SPACING.xl,
  },
  nameWhite: {
    fontSize: FONT_SIZE['6xl'],
    fontWeight: FONT_WEIGHT.black,
    color: COLORS.textPrimary,
    letterSpacing: -1,
  },
  nameGreen: {
    fontSize: FONT_SIZE['6xl'],
    fontWeight: FONT_WEIGHT.black,
    color: COLORS.neonGreen,
    letterSpacing: -1,
  },
  tagline: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.textMuted,
    fontWeight: FONT_WEIGHT.medium,
  },
  dotsRow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 80,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.neonGreen,
  },
});

export default SplashScreen;
