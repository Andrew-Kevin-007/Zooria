import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { mockService } from '../../services/mockService';
import { Service, ServiceType } from '../../types';

const SERVICE_TYPES: ServiceType[] = ['grooming', 'vet', 'training', 'boarding', 'walking'];

export function ServicesScreen() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [selectedType, setSelectedType] = useState<ServiceType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSlot, setBookingSlot] = useState('');
  const [petName, setPetName] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await mockService.getServices();
      setServices(data);
      setFilteredServices(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading services:', error);
      setLoading(false);
    }
  };

  const filterByType = (type: ServiceType | null) => {
    setSelectedType(type);
    if (type) {
      setFilteredServices(services.filter((s) => s.type === type));
    } else {
      setFilteredServices(services);
    }
  };

  const getServiceIcon = (type: ServiceType) => {
    const icons: Record<ServiceType, keyof typeof MaterialCommunityIcons.glyphMap> = {
      grooming: 'content-cut',
      vet: 'stethoscope',
      training: 'school-outline',
      boarding: 'home-outline',
      walking: 'walk',
    };
    return icons[type];
  };

  const handleBookService = () => {
    if (!bookingDate || !bookingSlot || !petName) {
      Alert.alert('Validation', 'Please fill all fields');
      return;
    }
    Alert.alert(
      'Booking Confirmed',
      `Service booked for ${petName}\nDate: ${bookingDate}\nTime: ${bookingSlot}`,
      [{ text: 'OK', onPress: () => setShowBookingModal(false) }]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Pet Services</Text>
        <Text style={styles.subtitle}>Book professional services for your pets</Text>
      </View>

      {/* Service Types Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
      >
        <TouchableOpacity
          style={[
            styles.filterChip,
            !selectedType && styles.filterChipActive,
          ]}
          onPress={() => filterByType(null)}
        >
          <Text
            style={[
              styles.filterText,
              !selectedType && styles.filterTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {SERVICE_TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterChip,
              selectedType === type && styles.filterChipActive,
            ]}
            onPress={() => filterByType(type)}
          >
            <Text
              style={[
                styles.filterText,
                selectedType === type && styles.filterTextActive,
              ]}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Services List */}
      <ScrollView
        style={styles.servicesList}
        showsVerticalScrollIndicator={false}
      >
        {filteredServices.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons style={styles.emptyIcon} name="magnify" size={64} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No services found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your filters or check back later
            </Text>
          </View>
        ) : (
          filteredServices.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceImageContainer}>
                <MaterialCommunityIcons name={getServiceIcon(service.type)} size={30} color={COLORS.primary} />
              </View>

              <View style={styles.serviceContent}>
                <View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceProvider}>
                    {service.provider}
                  </Text>
                  <Text style={styles.serviceDescription} numberOfLines={2}>
                    {service.description}
                  </Text>
                </View>

                <View style={styles.serviceDetails}>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="clock-outline" size={14} color={COLORS.textSecondary} />
                    <Text style={styles.detailText}>
                      {service.duration} min
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="star" size={14} color={COLORS.warning} />
                    <Text style={styles.detailText}>
                      {service.rating} ({service.reviews} reviews)
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.serviceRight}>
                <Text style={styles.price}>${service.price}</Text>
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => {
                    setSelectedService(service);
                    setShowBookingModal(true);
                  }}
                >
                  <Text style={styles.bookButtonText}>Book</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        <View style={styles.spacing} />
      </ScrollView>

      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setShowBookingModal(false)}
              >
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Book Service</Text>
              <View style={{ width: 30 }} />
            </View>

            {/* Service Summary */}
            {selectedService && (
              <View style={styles.bookingSummary}>
                <Text style={styles.bookingServiceName}>
                  {selectedService.name}
                </Text>
                <Text style={styles.bookingProvider}>
                  {selectedService.provider}
                </Text>
                <Text style={styles.bookingPrice}>
                  ${selectedService.price}
                </Text>
              </View>
            )}

            {/* Booking Form */}
            <ScrollView style={styles.bookingForm}>
              <Text style={styles.fieldLabel}>Select Pet</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter pet name"
                placeholderTextColor={COLORS.textTertiary}
                value={petName}
                onChangeText={setPetName}
              />

              <Text style={styles.fieldLabel}>Preferred Date</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={COLORS.textTertiary}
                value={bookingDate}
                onChangeText={setBookingDate}
              />

              <Text style={styles.fieldLabel}>Available Slots</Text>
              {selectedService && (
                <View style={styles.slotsGrid}>
                  {selectedService.availableSlots.map((slot, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.slotButton,
                        bookingSlot === slot && styles.slotButtonActive,
                      ]}
                      onPress={() => setBookingSlot(slot)}
                    >
                      <Text
                        style={[
                          styles.slotText,
                          bookingSlot === slot && styles.slotTextActive,
                        ]}
                      >
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Pricing Breakdown */}
              {selectedService && (
                <View style={styles.pricingBreakdown}>
                  <View style={styles.pricingRow}>
                    <Text style={styles.pricingLabel}>Service Fee</Text>
                    <Text style={styles.pricingValue}>
                      ${selectedService.price}
                    </Text>
                  </View>
                  <View style={styles.pricingRow}>
                    <Text style={styles.pricingLabel}>Tax (10%)</Text>
                    <Text style={styles.pricingValue}>
                      ${(selectedService.price * 0.1).toFixed(2)}
                    </Text>
                  </View>
                  <View style={[styles.pricingRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>
                      ${(selectedService.price * 1.1).toFixed(2)}
                    </Text>
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowBookingModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleBookService}
              >
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  filterScroll: {
    paddingHorizontal: 16,
    marginBottom: 12,
    maxHeight: 50,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  servicesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
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
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  serviceCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
  },
  serviceImageContainer: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceContent: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  serviceProvider: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginBottom: 8,
  },
  serviceDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  serviceRight: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  bookButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 12,
  },
  spacing: {
    height: 20,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalClose: {
    fontSize: 24,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  bookingSummary: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 12,
    borderRadius: 12,
  },
  bookingServiceName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  bookingProvider: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  bookingPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  bookingForm: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 300,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  slotButton: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  slotButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  slotText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  slotTextActive: {
    color: COLORS.white,
  },
  pricingBreakdown: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pricingLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  pricingValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontWeight: '700',
    color: COLORS.white,
  },
});
