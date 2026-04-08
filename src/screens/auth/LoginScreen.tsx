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
import {COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING} from '../../constants/theme';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    navigation.navigate('OTP', {phone});
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
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
        <Text style={styles.heading}>{"hey, you're\nback"}</Text>
        <Text style={styles.subtext}>sign into your zooria</Text>

        {/* Inputs */}
        <View style={styles.form}>
          <Input
            label="phone"
            prefix="+91"
            placeholder="your phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <Input
            label="password"
            placeholder="enter password"
            isPassword
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.forgotRow}>
            <Text style={styles.forgotText}>forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign in button */}
        <Button
          label="sign in →"
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleSignIn}
        />

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social buttons */}
        <View style={styles.socialRow}>
          <Button
            label="google"
            variant="glass"
            size="md"
            onPress={() => {}}
            style={styles.socialBtn}
          />
          <View style={styles.socialGap} />
          <Button
            label="otp"
            variant="glass"
            size="md"
            onPress={() => navigation.navigate('OTP', {phone})}
            style={styles.socialBtn}
          />
        </View>

        {/* Bottom link */}
        <TouchableOpacity
          style={styles.bottomLink}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.bottomText}>
            new here?{' '}
            <Text style={styles.linkGreen}>create account</Text>
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
    lineHeight: 40,
  },
  subtext: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    fontWeight: FONT_WEIGHT.medium,
  },
  form: {
    marginTop: SPACING['2xl'],
    marginBottom: SPACING.xl,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginTop: -SPACING.sm,
  },
  forgotText: {
    color: COLORS.neonGreen,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.semiBold,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.bgGlassBorder,
  },
  dividerText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.sm,
    marginHorizontal: SPACING.md,
    fontWeight: FONT_WEIGHT.medium,
  },
  socialRow: {
    flexDirection: 'row',
  },
  socialBtn: {
    flex: 1,
  },
  socialGap: {
    width: SPACING.md,
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

export default LoginScreen;
