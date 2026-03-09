import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING} from '../../constants/theme';
import {RootState} from '../../store';
import {hideToast} from '../../store/slices/uiSlice';

const {width: SCREEN_W} = Dimensions.get('window');

type ToastType = 'success' | 'error' | 'warning' | 'info';

const BORDER_COLORS: Record<ToastType, string> = {
  success: COLORS.neonGreen,
  error: COLORS.hotPink,
  warning: COLORS.gold,
  info: COLORS.info,
};

const GLOW_COLORS: Record<ToastType, string> = {
  success: COLORS.glowGreen,
  error: COLORS.glowPink,
  warning: 'rgba(255, 215, 0, 0.4)',
  info: 'rgba(91, 141, 239, 0.4)',
};

const ICONS: Record<ToastType, string> = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
};

const Toast: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.ui.toast);
  const translateY = useRef(new Animated.Value(-120)).current;

  useEffect(() => {
    if (toast?.visible) {
      Animated.spring(translateY, {
        toValue: 60,
        friction: 8,
        tension: 50,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        dismiss();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast?.visible]);

  const dismiss = () => {
    Animated.timing(translateY, {
      toValue: -120,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      dispatch(hideToast());
    });
  };

  if (!toast?.visible) {
    return null;
  }

  const type: ToastType = toast.type || 'info';

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateY}],
          borderLeftColor: BORDER_COLORS[type],
          shadowColor: GLOW_COLORS[type],
        },
      ]}>
      <Text style={styles.icon}>{ICONS[type]}</Text>
      <Text style={styles.message} numberOfLines={2}>
        {toast.message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    width: SCREEN_W - SPACING.xl * 2,
    backgroundColor: 'rgba(20,20,20,0.95)',
    borderRadius: RADIUS.lg,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    zIndex: 9999,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  icon: {
    fontSize: FONT_SIZE.lg,
    marginRight: SPACING.sm,
  },
  message: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.medium,
  },
});

export default Toast;
