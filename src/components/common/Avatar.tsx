import React from 'react';
import {View, Image, Text, StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONT_SIZE, FONT_WEIGHT, SPACING} from '../../constants/theme';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: AvatarSize;
  online?: boolean;
  ringColor?: string;
  style?: ViewStyle;
}

const SIZE_MAP: Record<AvatarSize, number> = {sm: 32, md: 48, lg: 64, xl: 96};
const FONT_MAP: Record<AvatarSize, number> = {
  sm: FONT_SIZE.xs,
  md: FONT_SIZE.base,
  lg: FONT_SIZE.lg,
  xl: FONT_SIZE['3xl'],
};

const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 'md',
  online,
  ringColor = COLORS.neonGreen,
  style,
}) => {
  const dim = SIZE_MAP[size];
  const ringWidth = size === 'sm' ? 1.5 : 2;
  const onlineDot = dim * 0.22;

  const initials = name
    ? name
        .split(' ')
        .slice(0, 2)
        .map(w => w[0])
        .join('')
        .toUpperCase()
    : '?';

  return (
    <View
      style={[
        styles.wrapper,
        {
          width: dim + ringWidth * 2 + 4,
          height: dim + ringWidth * 2 + 4,
        },
        style,
      ]}>
      {/* Ring */}
      <View
        style={[
          styles.ring,
          {
            width: dim + ringWidth * 2 + 4,
            height: dim + ringWidth * 2 + 4,
            borderRadius: (dim + ringWidth * 2 + 4) / 2,
            borderWidth: ringWidth,
            borderColor: ringColor,
          },
        ]}>
        {uri ? (
          <Image
            source={{uri}}
            style={[
              styles.image,
              {
                width: dim,
                height: dim,
                borderRadius: dim / 2,
              },
            ]}
          />
        ) : (
          <LinearGradient
            colors={[...COLORS.gradientPrimary]}
            style={[
              styles.fallback,
              {
                width: dim,
                height: dim,
                borderRadius: dim / 2,
              },
            ]}>
            <Text style={[styles.initials, {fontSize: FONT_MAP[size]}]}>
              {initials}
            </Text>
          </LinearGradient>
        )}
      </View>

      {/* Online indicator */}
      {online && (
        <View
          style={[
            styles.online,
            {
              width: onlineDot,
              height: onlineDot,
              borderRadius: onlineDot / 2,
              borderWidth: size === 'sm' ? 1 : 2,
              right: 0,
              bottom: 0,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: COLORS.textInverse,
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: -0.5,
  },
  online: {
    position: 'absolute',
    backgroundColor: COLORS.neonGreen,
    borderColor: COLORS.bgPrimary,
  },
});

export default Avatar;
