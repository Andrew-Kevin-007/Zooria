import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import GlassCard from '../../components/common/GlassCard';
import {RootState} from '../../store';
import {setUser} from '../../store/slices/authSlice';
import {showToast} from '../../store/slices/uiSlice';
import {COLORS, FONT_SIZE, FONT_WEIGHT, SPACING} from '../../constants/theme';

interface EditProfileScreenProps {
  navigation: any;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const handleAvatarTap = () => {
    Alert.alert('coming soon', 'image picker will be available soon');
  };

  const handleSave = () => {
    if (user) {
      dispatch(setUser({...user, name, email}));
    }
    dispatch(showToast({message: 'profile updated!', type: 'success'}));
    navigation.goBack();
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

        <Text style={styles.heading}>edit your vibe</Text>

        {/* Avatar */}
        <TouchableOpacity
          style={styles.avatarSection}
          onPress={handleAvatarTap}
          activeOpacity={0.8}>
          <Avatar
            uri={user?.avatar}
            name={user?.name || 'User'}
            size="xl"
            ringColor={COLORS.neonGreen}
          />
          <View style={styles.cameraOverlay}>
            <MaterialCommunityIcons style={styles.cameraEmoji} name="camera-outline" size={14} color={COLORS.textPrimary} />
          </View>
        </TouchableOpacity>

        {/* The basics */}
        <GlassCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>the basics</Text>
          <Input
            label="name"
            placeholder="your name"
            value={name}
            onChangeText={setName}
          />
          <Input
            label="email"
            placeholder="email address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </GlassCard>

        {/* Location */}
        <GlassCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>your location</Text>
          <Input
            label="street"
            placeholder="street address"
            value={street}
            onChangeText={setStreet}
          />
          <Input
            label="city"
            placeholder="city"
            value={city}
            onChangeText={setCity}
          />
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Input
                label="state"
                placeholder="state"
                value={state}
                onChangeText={setState}
              />
            </View>
            <View style={styles.halfInput}>
              <Input
                label="pincode"
                placeholder="pincode"
                keyboardType="number-pad"
                value={pincode}
                onChangeText={setPincode}
              />
            </View>
          </View>
        </GlassCard>

        {/* Phone read-only */}
        <GlassCard style={styles.phoneCard}>
          <View style={styles.phoneRow}>
            <View>
              <Text style={styles.phoneLabel}>phone</Text>
              <Text style={styles.phoneValue}>
                +91 {user?.phone || '9999999999'}
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeLink}>change →</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Save */}
        <Button
          label="save changes"
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleSave}
        />
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
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING['3xl'],
    paddingBottom: SPACING['3xl'],
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
    marginBottom: SPACING.xl,
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
  avatarSection: {
    alignSelf: 'center',
    marginBottom: SPACING['2xl'],
    position: 'relative',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.bgTertiary,
    borderWidth: 2,
    borderColor: COLORS.bgPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraEmoji: {
    fontSize: 14,
  },
  sectionCard: {
    padding: SPACING.base,
    marginBottom: SPACING.base,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textSecondary,
    marginBottom: SPACING.base,
    letterSpacing: -0.3,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  halfInput: {
    flex: 1,
  },
  phoneCard: {
    padding: SPACING.base,
    marginBottom: SPACING.xl,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phoneLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textMuted,
    fontWeight: FONT_WEIGHT.medium,
  },
  phoneValue: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    fontWeight: FONT_WEIGHT.semiBold,
    marginTop: SPACING.xs,
  },
  changeLink: {
    color: COLORS.neonGreen,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.bold,
  },
});

export default EditProfileScreen;
