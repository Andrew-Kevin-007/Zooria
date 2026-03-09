import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING} from '../../constants/theme';

interface Tab {
  key: string;
  label: string;
}

interface TabIndicatorProps {
  tabs: Tab[];
  activeKey: string;
  onTabPress: (key: string) => void;
}

const TabIndicator: React.FC<TabIndicatorProps> = ({
  tabs,
  activeKey,
  onTabPress,
}) => {
  const tabWidth = useRef(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const widths = useRef<number[]>(new Array(tabs.length).fill(0));

  const activeIndex = tabs.findIndex(t => t.key === activeKey);

  useEffect(() => {
    const targetX = widths.current
      .slice(0, activeIndex)
      .reduce((sum, w) => sum + w, 0);

    Animated.spring(translateX, {
      toValue: targetX,
      friction: 8,
      tension: 70,
      useNativeDriver: true,
    }).start();
  }, [activeIndex, translateX]);

  const handleLayout = (index: number) => (e: LayoutChangeEvent) => {
    widths.current[index] = e.nativeEvent.layout.width;
    if (index === 0) {
      tabWidth.current = e.nativeEvent.layout.width;
    }
  };

  return (
    <View style={styles.container}>
      {/* Sliding indicator */}
      <Animated.View
        style={[
          styles.indicator,
          {
            width: widths.current[activeIndex] || `${100 / tabs.length}%`,
            transform: [{translateX}],
          },
        ]}>
        <LinearGradient
          colors={[...COLORS.gradientPrimary]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.indicatorGradient}
        />
      </Animated.View>

      {/* Tab labels */}
      {tabs.map((tab, index) => {
        const isActive = tab.key === activeKey;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            activeOpacity={0.7}
            onLayout={handleLayout(index)}
            onPress={() => onTabPress(tab.key)}>
            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.activeLabel : styles.inactiveLabel,
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgSecondary,
    borderRadius: RADIUS.full,
    padding: SPACING.xs,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: SPACING.xs,
    left: SPACING.xs,
    bottom: SPACING.xs,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  indicatorGradient: {
    flex: 1,
    borderRadius: RADIUS.full,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    zIndex: 1,
  },
  tabLabel: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.semiBold,
    letterSpacing: -0.3,
  },
  activeLabel: {
    color: COLORS.textInverse,
  },
  inactiveLabel: {
    color: COLORS.textMuted,
  },
});

export default TabIndicator;
