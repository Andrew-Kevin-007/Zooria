import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  ViewToken,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Button from '../../components/common/Button';
import {COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING} from '../../constants/theme';

const {width: SCREEN_W} = Dimensions.get('window');

interface Slide {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  tint: readonly [string, string];
}

const SLIDES: Slide[] = [
  {
    id: '1',
    emoji: '🐕',
    title: 'find your\nperfect pet',
    subtitle: 'adopt, shop & vibe with your new bestie',
    tint: ['rgba(57,255,126,0.08)', 'rgba(0,201,167,0.04)'],
  },
  {
    id: '2',
    emoji: '🛍️',
    title: 'shop drops\n& pet fits',
    subtitle: 'drip out your pet with the freshest gear',
    tint: ['rgba(255,77,109,0.08)', 'rgba(255,140,66,0.04)'],
  },
  {
    id: '3',
    emoji: '✂️',
    title: 'glow up\nyour pet',
    subtitle: 'grooming, training & more — all in one place',
    tint: ['rgba(155,93,229,0.08)', 'rgba(106,13,173,0.04)'],
  },
];

interface OnboardingScreenProps {
  navigation: any;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({index: currentIndex + 1});
    } else {
      navigation.replace('Welcome');
    }
  };

  const handleSkip = () => {
    navigation.replace('Welcome');
  };

  const renderSlide = ({item}: {item: Slide}) => (
    <LinearGradient
      colors={[...item.tint]}
      style={styles.slide}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef}
      />

      {/* Bottom section */}
      <View style={styles.bottom}>
        {/* Dots */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => {
            const inputRange = [
              (i - 1) * SCREEN_W,
              i * SCREEN_W,
              (i + 1) * SCREEN_W,
            ];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });
            const bgColor = scrollX.interpolate({
              inputRange,
              outputRange: [
                COLORS.textMuted,
                COLORS.neonGreen,
                COLORS.textMuted,
              ],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  {width: dotWidth, backgroundColor: bgColor},
                ]}
              />
            );
          })}
        </View>

        {/* Buttons */}
        <View style={styles.buttonsRow}>
          <Button
            label="skip"
            variant="ghost"
            size="md"
            onPress={handleSkip}
            style={styles.skipBtn}
          />
          <Button
            label={currentIndex === SLIDES.length - 1 ? "let's go →" : 'next →'}
            variant="primary"
            size="md"
            onPress={handleNext}
            style={styles.nextBtn}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  slide: {
    width: SCREEN_W,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING['2xl'],
  },
  emoji: {
    fontSize: 120,
    marginBottom: SPACING['2xl'],
  },
  title: {
    fontSize: FONT_SIZE['5xl'],
    fontWeight: FONT_WEIGHT.black,
    color: COLORS.textPrimary,
    textAlign: 'center',
    letterSpacing: -1,
    lineHeight: 48,
  },
  subtitle: {
    marginTop: SPACING.base,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontWeight: FONT_WEIGHT.medium,
  },
  bottom: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING['3xl'],
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: RADIUS.full,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipBtn: {
    paddingHorizontal: SPACING.base,
  },
  nextBtn: {
    minWidth: 140,
  },
});

export default OnboardingScreen;
