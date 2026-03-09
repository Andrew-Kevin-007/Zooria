import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Avatar from '../../components/common/Avatar';
import GlassCard from '../../components/common/GlassCard';
import Badge from '../../components/common/Badge';
import {RootState} from '../../store';
import {logout} from '../../store/slices/authSlice';
import {COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING} from '../../constants/theme';

interface ProfileScreenProps {
  navigation: any;
}

const MOCK_PETS = [
  {id: '1', emoji: '🐕', name: 'Max', breed: 'Golden Retriever'},
  {id: '2', emoji: '🐈', name: 'Luna', breed: 'Persian'},
];

const MENU_ITEMS = [
  {icon: '📦', label: 'my orders', screen: 'Orders', gradient: COLORS.gradientPrimary},
  {icon: '📅', label: 'my bookings', screen: 'Bookings', gradient: COLORS.gradientAccent},
  {icon: '❤️', label: 'saved items', screen: 'Saved', gradient: COLORS.gradientPurple},
  {icon: '✏️', label: 'edit profile', screen: 'EditProfile', gradient: COLORS.gradientPrimary},
  {icon: '⚙️', label: 'settings', screen: 'Settings', gradient: COLORS.gradientPurple},
];

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      {/* Top section with gradient blobs */}
      <View style={styles.topSection}>
        <View style={styles.blobGreen} />
        <View style={styles.blobPurple} />

        <Avatar
          uri={user?.avatar}
          name={user?.name || 'User'}
          size="xl"
          ringColor={COLORS.neonGreen}
        />
        <Text style={styles.name}>{user?.name || 'zooria user'}</Text>
        <Text style={styles.username}>@{(user?.name || 'user').toLowerCase().replace(/\s/g, '')}</Text>
        <Text style={styles.phone}>{user?.phone || '+91 9999999999'}</Text>
        <Badge label="✓ verified" variant="green" style={styles.verifiedBadge} />
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        {[
          {label: 'orders', value: '12'},
          {label: 'bookings', value: '5'},
          {label: 'saved', value: '24'},
        ].map(stat => (
          <GlassCard key={stat.label} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </GlassCard>
        ))}
      </View>

      {/* My Pets section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>my pets 🐾</Text>
      </View>
      <FlatList
        data={[...MOCK_PETS, {id: 'add', emoji: '➕', name: 'add pet', breed: ''}]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.petsScroll}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          if (item.id === 'add') {
            return (
              <TouchableOpacity
                style={styles.addPetCard}
                onPress={() => navigation.navigate('PetProfile')}
                activeOpacity={0.7}>
                <Text style={styles.addPetEmoji}>➕</Text>
                <Text style={styles.addPetText}>add pet</Text>
              </TouchableOpacity>
            );
          }
          return (
            <GlassCard
              style={styles.petCard}
              onPress={() => navigation.navigate('PetProfile', {pet: item})}>
              <Text style={styles.petEmoji}>{item.emoji}</Text>
              <Text style={styles.petName}>{item.name}</Text>
              <Badge label={item.breed} variant="glass" style={styles.breedBadge} />
            </GlassCard>
          );
        }}
      />

      {/* Menu items */}
      <View style={styles.menuSection}>
        {MENU_ITEMS.map(item => (
          <GlassCard
            key={item.label}
            style={styles.menuCard}
            onPress={() => navigation.navigate(item.screen)}>
            <LinearGradient
              colors={[...item.gradient]}
              style={styles.menuIcon}>
              <Text style={styles.menuIconText}>{item.icon}</Text>
            </LinearGradient>
            <Text style={styles.menuLabel}>{item.label}</Text>
            {item.label === 'seller dashboard' && (
              <Badge label="seller" variant="green" />
            )}
            <Text style={styles.chevron}>›</Text>
          </GlassCard>
        ))}

        {/* Seller dashboard (conditional) */}
        {(user?.role === 'seller' || user?.role === 'both') && (
          <GlassCard style={styles.menuCard} onPress={() => {}}>
            <LinearGradient
              colors={[...COLORS.gradientPrimary]}
              style={styles.menuIcon}>
              <Text style={styles.menuIconText}>🏪</Text>
            </LinearGradient>
            <Text style={styles.menuLabel}>seller dashboard</Text>
            <Badge label="seller" variant="green" />
            <Text style={styles.chevron}>›</Text>
          </GlassCard>
        )}

        {/* Sign out */}
        <GlassCard style={styles.menuCard} onPress={handleLogout}>
          <View style={styles.logoutIcon}>
            <Text style={styles.menuIconText}>🚪</Text>
          </View>
          <Text style={styles.logoutLabel}>sign out</Text>
          <Text style={styles.chevron}>›</Text>
        </GlassCard>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  scrollContent: {
    paddingBottom: SPACING['3xl'],
  },
  topSection: {
    alignItems: 'center',
    paddingTop: SPACING['3xl'] + 20,
    paddingBottom: SPACING.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  blobGreen: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(57,255,126,0.08)',
  },
  blobPurple: {
    position: 'absolute',
    top: 20,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(155,93,229,0.06)',
  },
  name: {
    fontSize: FONT_SIZE['3xl'],
    fontWeight: FONT_WEIGHT.black,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    marginTop: SPACING.base,
  },
  username: {
    fontSize: FONT_SIZE.base,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHT.medium,
    marginTop: SPACING.xs,
  },
  phone: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textMuted,
    fontWeight: FONT_WEIGHT.medium,
    marginTop: SPACING.xs,
  },
  verifiedBadge: {
    marginTop: SPACING.md,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.base,
  },
  statValue: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: FONT_WEIGHT.black,
    color: COLORS.neonGreen,
  },
  statLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textMuted,
    fontWeight: FONT_WEIGHT.medium,
    marginTop: SPACING.xs,
  },
  sectionHeader: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  petsScroll: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  petCard: {
    alignItems: 'center',
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.lg,
    width: 130,
  },
  petEmoji: {
    fontSize: 40,
    marginBottom: SPACING.sm,
  },
  petName: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  breedBadge: {
    alignSelf: 'center',
  },
  addPetCard: {
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.base,
    borderRadius: RADIUS.xl,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: COLORS.bgGlassBorder,
  },
  addPetEmoji: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  addPetText: {
    fontSize: FONT_SIZE.base,
    color: COLORS.textMuted,
    fontWeight: FONT_WEIGHT.medium,
  },
  menuSection: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.base,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconText: {
    fontSize: 18,
  },
  menuLabel: {
    flex: 1,
    marginLeft: SPACING.md,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.textPrimary,
  },
  chevron: {
    fontSize: FONT_SIZE['2xl'],
    color: COLORS.textMuted,
    fontWeight: FONT_WEIGHT.medium,
  },
  logoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,77,109,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutLabel: {
    flex: 1,
    marginLeft: SPACING.md,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.hotPink,
  },
});

export default ProfileScreen;
