import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Button from '../../components/common/Button';
import {COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING} from '../../constants/theme';

const {height: SCREEN_H} = Dimensions.get('window');

interface WelcomeScreenProps {
  navigation: any;
}

const FEATURES = [
  {icon: 'paw-outline', label: 'adopt'},
  {icon: 'cart-outline', label: 'shop'},
  {icon: 'content-cut', label: 'services'},
  {icon: 'car-outline', label: 'taxi'},
];

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  const slideUp = useRef(new Animated.Value(200)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideUp, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Gradient blobs */}
      <View style={styles.blobContainer}>
        <View style={styles.blobGreen} />
        <View style={styles.blobPink} />
      </View>

      {/* Logo area */}
      <View style={styles.logoArea}>
        <MaterialCommunityIcons style={styles.pawEmoji} name="paw" size={64} color={COLORS.neonGreen} />
        <View style={styles.nameRow}>
          <Text style={styles.nameWhite}>zoor</Text>
          <Text style={styles.nameGreen}>ia</Text>
        </View>
      </View>

      {/* Bottom card */}
      <Animated.View
        style={[
          styles.bottomCard,
          {
            transform: [{translateY: slideUp}],
            opacity,
          },
        ]}>
        <Text style={styles.welcomeText}>welcome to zooria</Text>
        <Text style={styles.subtext}>the pet app that actually slaps</Text>

        {/* Feature pills */}
        <View style={styles.pillsRow}>
          {FEATURES.map(f => (
            <View key={f.label} style={styles.pill}>
              <View style={styles.pillInner}>
                <MaterialCommunityIcons name={f.icon as any} size={14} color={COLORS.textPrimary} />
                <Text style={styles.pillText}>{f.label}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <Button
          label="sign in"
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => navigation.navigate('Login')}
        />
        <View style={styles.btnGap} />
        <Button
          label="create account"
          variant="glass"
          size="lg"
          fullWidth
          onPress={() => navigation.navigate('Signup')}
        />

        {/* Terms */}
        <Text style={styles.terms}>
          by continuing you agree to our terms of service & privacy policy
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  blobContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  blobGreen: {
    position: 'absolute',
    top: -60,
    left: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(57,255,126,0.12)',
  },
  blobPink: {
    position: 'absolute',
    bottom: SCREEN_H * 0.35,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255,77,109,0.10)',
  },
  logoArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pawEmoji: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  nameRow: {
    flexDirection: 'row',
  },
  nameWhite: {
    fontSize: FONT_SIZE['5xl'],
    fontWeight: FONT_WEIGHT.black,
    color: COLORS.textPrimary,
    letterSpacing: -1,
  },
  nameGreen: {
    fontSize: FONT_SIZE['5xl'],
    fontWeight: FONT_WEIGHT.black,
    color: COLORS.neonGreen,
    letterSpacing: -1,
  },
  bottomCard: {
    backgroundColor: 'rgba(26,26,26,0.92)',
    borderTopLeftRadius: RADIUS['2xl'],
    borderTopRightRadius: RADIUS['2xl'],
    borderWidth: 1,
    borderColor: COLORS.bgGlassBorder,
    borderBottomWidth: 0,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING['2xl'],
    paddingBottom: SPACING['3xl'],
  },
  welcomeText: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: FONT_WEIGHT.black,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtext: {
    fontSize: FONT_SIZE.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginVertical: SPACING.xl,
  },
  pill: {
    backgroundColor: COLORS.bgGlass,
    borderWidth: 1,
    borderColor: COLORS.bgGlassBorder,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
  },
  pillInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  pillText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.semiBold,
  },
  btnGap: {
    height: SPACING.md,
  },
  terms: {
    marginTop: SPACING.lg,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default WelcomeScreen;
