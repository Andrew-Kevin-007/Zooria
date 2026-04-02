import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Text } from 'react-native';
import { Image } from 'expo-image';
import { COLORS } from '../../constants/theme';
import { mockService } from '../../services/mockService';
import { Pet } from '../../types';

const PET_CATEGORY_ICON: Record<Pet['category'], string> = {
  dog: '🐶',
  cat: '🐱',
  bird: '🐦',
  fish: '🐠',
  rabbit: '🐰',
  reptile: '🦎',
  other: '🐾',
};

const getPetCategoryIcon = (category: Pet['category']) => PET_CATEGORY_ICON[category] ?? '🐾';

const formatCategory = (category: Pet['category']) =>
  category.charAt(0).toUpperCase() + category.slice(1);

export function PetProfileScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const data = await mockService.getPets();
      setPets(data);
      if (data.length > 0) {
        setSelectedPet(data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading pets:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Pets</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Pet</Text>
        </TouchableOpacity>
      </View>

      {/* Pet List */}
      {pets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🐕</Text>
          <Text style={styles.emptyText}>No pets added yet</Text>
          <Text style={styles.emptySubtext}>Add your first pet to get started</Text>
          <TouchableOpacity style={styles.emptyButton}>
            <Text style={styles.emptyButtonText}>Add Pet</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.petScroll}
          >
            {pets.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                style={[
                  styles.petPill,
                  selectedPet?.id === pet.id && styles.petPillActive,
                ]}
                onPress={() => setSelectedPet(pet)}
              >
                {pet.avatar ? (
                  <Image source={pet.avatar} style={styles.petPillAvatarImage} contentFit="cover" />
                ) : (
                  <Text style={styles.petPillAvatar}>{getPetCategoryIcon(pet.category)}</Text>
                )}
                <Text
                  style={[
                    styles.petPillName,
                    selectedPet?.id === pet.id && styles.petPillNameActive,
                  ]}
                >
                  {pet.name}
                </Text>
                <Text style={styles.petPillBreed}>{pet.breed}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Selected Pet Details */}
          {selectedPet && (
            <View style={styles.detailsCard}>
              <View style={styles.petHeader}>
                <View style={styles.petImageLarge}>
                  {selectedPet.avatar ? (
                    <Image source={selectedPet.avatar} style={styles.petImageLargeImage} contentFit="cover" />
                  ) : (
                    <Text style={styles.petImageText}>{getPetCategoryIcon(selectedPet.category)}</Text>
                  )}
                </View>
                <View style={styles.petHeaderInfo}>
                  <Text style={styles.petName}>{selectedPet.name}</Text>
                  <Text style={styles.petBreed}>{selectedPet.breed}</Text>
                  <Text style={styles.petCategory}>{formatCategory(selectedPet.category)}</Text>
                  <Text style={styles.petAge}>
                    {selectedPet.age} months old
                  </Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editIcon}>✏️</Text>
                </TouchableOpacity>
              </View>

              {/* Pet Info Grid */}
              <View style={styles.infoGrid}>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>Weight</Text>
                  <Text style={styles.infoValue}>{selectedPet.weight} kg</Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>Color</Text>
                  <Text style={styles.infoValue}>{selectedPet.color}</Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>Vaccinated</Text>
                  <Text style={styles.infoValue}>
                    {selectedPet.vaccinated ? '✅ Yes' : '❌ No'}
                  </Text>
                </View>
              </View>

              {/* Medical Info */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Medical Information</Text>
                <View style={styles.infoItem}>
                  <Text style={styles.infoItemLabel}>Allergies</Text>
                  <Text style={styles.infoItemValue}>
                    {selectedPet.allergies || 'None reported'}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoItemLabel}>Medical History</Text>
                  <Text style={styles.infoItemValue}>
                    {selectedPet.medicalHistory || 'None recorded'}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoItemLabel}>Microchip ID</Text>
                  <Text style={styles.infoItemValue}>
                    {selectedPet.microchipId || 'Not registered'}
                  </Text>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.actionsSection}>
                <TouchableOpacity style={styles.actionButtonPrimary}>
                  <Text style={styles.actionButtonIcon}>📋</Text>
                  <Text style={styles.actionButtonText}>View Health Records</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonSecondary}>
                  <Text style={styles.actionButtonIcon}>✏️</Text>
                  <Text style={styles.actionButtonText}>Edit Information</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButtonSecondary}
                  onPress={() =>
                    Alert.alert('Remove Pet', 'Are you sure you want to remove this pet?', [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Remove',
                        style: 'destructive',
                        onPress: () => console.log('Pet removed'),
                      },
                    ])
                  }
                >
                  <Text style={styles.actionButtonIcon}>🗑️</Text>
                  <Text style={styles.actionButtonText}>Remove Pet</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}

      <View style={styles.spacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 13,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: 16,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  emptyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  petScroll: {
    paddingBottom: 16,
    marginBottom: 16,
  },
  petPill: {
    marginHorizontal: 8,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: 120,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  petPillActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  petPillAvatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginBottom: 8,
  },
  petPillAvatar: {
    fontSize: 28,
    marginBottom: 8,
  },
  petPillName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  petPillNameActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  petPillBreed: {
    fontSize: 11,
    color: COLORS.textTertiary,
    textAlign: 'center',
    marginTop: 2,
  },
  detailsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  petHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  petImageLarge: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  petImageLargeImage: {
    width: '100%',
    height: '100%',
  },
  petImageText: {
    fontSize: 40,
  },
  petHeaderInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  petBreed: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  petCategory: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginBottom: 2,
  },
  petAge: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  editButton: {
    backgroundColor: COLORS.primaryLight,
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 18,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  infoItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoItemLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  infoItemValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  actionsSection: {
    gap: 10,
    marginBottom: 20,
  },
  actionButtonPrimary: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButtonSecondary: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionButtonIcon: {
    fontSize: 18,
  },
  actionButtonText: {
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  spacing: {
    height: 20,
  },
});
