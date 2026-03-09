import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import GlassCard from '../../components/common/GlassCard';
import {COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOW, SPACING} from '../../constants/theme';

interface SignupScreenProps {
  navigation: any;
}

type Role = 'buyer' | 'seller';

const SignupScreen: React.FC<SignupScreenProps> = ({navigation}) => {
  const [role, setRole] = useState<Role>('buyer');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSignup = () => {
    navigation.navigate('OTP', {phone});
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* Back */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        {/* Heading */}
        <Text style={styles.heading}>join the pack 🐾</Text>

        {/* Role selector */}
        <View style={styles.roleRow}>
          <GlassCard
            onPress={() => setRole('buyer')}
            style={[
              styles.roleCard,
              role === 'buyer' && styles.roleCardActive,
            ]}>
            <Text style={styles.roleEmoji}>🛒</Text>
            <Text style={styles.roleLabel}>pet owner</Text>
          </GlassCard>
          <View style={styles.roleGap} />
          <GlassCard
            onPress={() => setRole('seller')}
            style={[
              styles.roleCard,
              role === 'seller' && styles.roleCardActive,
            ]}>
            <Text style={styles.roleEmoji}>🏪</Text>
            <Text style={styles.roleLabel}>seller / shop</Text>
          </GlassCard>
        </View>

        {/* Fields */}
        <View style={styles.form}>
          <Input
            label="name"
            placeholder="your name"
            value={name}
            onChangeText={setName}
          />
          <Input
            label="phone"
            prefix="+91"
            placeholder="phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <Input
            label="email (optional)"
            placeholder="email address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Checkbox */}
        <TouchableOpacity
          style={styles.checkRow}
          onPress={() => setAgreed(!agreed)}
          activeOpacity={0.7}>
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkLabel}>
            i agree to the terms & privacy policy
          </Text>
        </TouchableOpacity>

        {/* Sign up button */}
        <Button
          label="let's go →"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!agreed}
          onPress={handleSignup}
        />

        {/* Bottom link */}
        <TouchableOpacity
          style={styles.bottomLink}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.bottomText}>
            already in the pack?{' '}
            <Text style={styles.linkGreen}>sign in</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING['3xl'],
    paddingBottom: SPACING['2xl'],
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
  heading: {
    fontSize: FONT_SIZE['4xl'],
    fontWeight: FONT_WEIGHT.black,
    color: COLORS.textPrimary,
    letterSpacing: -1,
    marginBottom: SPACING.xl,
  },
  roleRow: {
    flexDirection: 'row',
    marginBottom: SPACING.xl,
  },
  roleCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  roleCardActive: {
    borderColor: COLORS.neonGreen,
    ...SHADOW.glowSm,
  },
  roleGap: {
    width: SPACING.md,
  },
  roleEmoji: {
    fontSize: 36,
    marginBottom: SPACING.sm,
  },
  roleLabel: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.semiBold,
  },
  form: {
    marginBottom: SPACING.base,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.bgGlassBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  checkboxChecked: {
    backgroundColor: COLORS.neonGreen,
    borderColor: COLORS.neonGreen,
  },
  checkmark: {
    color: COLORS.textInverse,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },
  checkLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.medium,
    flex: 1,
  },
  bottomLink: {
    alignItems: 'center',
    marginTop: SPACING['2xl'],
  },
  bottomText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.medium,
  },
  linkGreen: {
    color: COLORS.neonGreen,
    fontWeight: FONT_WEIGHT.bold,
  },
});

export default SignupScreen;
