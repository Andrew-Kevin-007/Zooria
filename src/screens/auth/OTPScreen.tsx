import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Button from '../../components/common/Button';
import {COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING} from '../../constants/theme';
import {setUser} from '../../store/slices/authSlice';
import {showToast} from '../../store/slices/uiSlice';

interface OTPScreenProps {
  navigation: any;
  route: any;
}

const OTP_LENGTH = 6;
const TIMER_SECONDS = 30;

const OTPScreen: React.FC<OTPScreenProps> = ({navigation, route}) => {
  const dispatch = useDispatch();
  const phone = route.params?.phone || '9999999999';
  const maskedPhone = phone.replace(/(\d{2})\d{4}(\d{4})/, '$1****$2');

  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      return;
    }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }
  };

  const isFilled = otp.every(d => d !== '');

  const handleVerify = () => {
    dispatch(
      setUser({
        id: '1',
        name: 'Zooria User',
        phone,
        role: 'buyer',
      }),
    );
    dispatch(showToast({message: 'welcome to zooria! 🐾', type: 'success'}));
  };

  const handleResend = () => {
    setTimer(TIMER_SECONDS);
    setOtp(new Array(OTP_LENGTH).fill(''));
    inputs.current[0]?.focus();
    setActiveIndex(0);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.content}>
        {/* Back */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        {/* Emoji circle */}
        <View style={styles.emojiCircle}>
          <Text style={styles.phoneEmoji}>📱</Text>
        </View>

        {/* Heading */}
        <Text style={styles.heading}>{'check your\nphone 📲'}</Text>
        <Text style={styles.phoneNumber}>+91 {maskedPhone}</Text>

        {/* OTP Boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, i) => {
            const isFocused = activeIndex === i;
            const hasValue = digit !== '';
            return (
              <TextInput
                key={i}
                ref={ref => {
                  inputs.current[i] = ref;
                }}
                style={[
                  styles.otpBox,
                  hasValue && styles.otpBoxFilled,
                  isFocused && !hasValue && styles.otpBoxFocused,
                ]}
                value={digit}
                onChangeText={text => handleChange(text, i)}
                onKeyPress={e => handleKeyPress(e, i)}
                onFocus={() => setActiveIndex(i)}
                keyboardType="number-pad"
                maxLength={1}
                selectionColor={COLORS.neonGreen}
              />
            );
          })}
        </View>

        {/* Timer / Resend */}
        <View style={styles.timerRow}>
          {timer > 0 ? (
            <Text style={styles.timerText}>
              resend in{' '}
              <Text style={styles.timerCount}>{timer}s</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>resend code</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Verify */}
        <Button
          label="verify →"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!isFilled}
          onPress={handleVerify}
        />

        {/* Wrong number */}
        <TouchableOpacity
          style={styles.wrongRow}
          onPress={() => navigation.goBack()}>
          <Text style={styles.wrongText}>wrong number?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING['3xl'],
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.bgGlass,
    borderWidth: 1,
    borderColor: COLORS.bgGlassBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING['2xl'],
  },
  backText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.xl,
  },
  emojiCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.bgGlass,
    borderWidth: 1,
    borderColor: COLORS.bgGlassBorder,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: SPACING.xl,
    ...SHADOW.glowSm,
  },
  phoneEmoji: {
    fontSize: 36,
  },
  heading: {
    fontSize: FONT_SIZE['4xl'],
    fontWeight: FONT_WEIGHT.black,
    color: COLORS.textPrimary,
    letterSpacing: -1,
    textAlign: 'center',
    lineHeight: 40,
  },
  phoneNumber: {
    fontSize: FONT_SIZE.md,
    color: COLORS.neonGreen,
    fontWeight: FONT_WEIGHT.semiBold,
    textAlign: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING['2xl'],
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  otpBox: {
    width: 48,
    height: 56,
    backgroundColor: COLORS.bgSecondary,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.bgGlassBorder,
    textAlign: 'center',
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
  },
  otpBoxFilled: {
    borderColor: COLORS.neonGreen,
    color: COLORS.neonGreen,
    ...SHADOW.glowSm,
  },
  otpBoxFocused: {
    borderColor: COLORS.white,
  },
  timerRow: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  timerText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.medium,
  },
  timerCount: {
    color: COLORS.neonGreen,
    fontWeight: FONT_WEIGHT.bold,
  },
  resendText: {
    color: COLORS.neonGreen,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.bold,
  },
  wrongRow: {
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  wrongText: {
    color: COLORS.hotPink,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.medium,
    opacity: 0.7,
  },
});

export default OTPScreen;
