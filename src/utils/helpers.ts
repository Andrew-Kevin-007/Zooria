/**
 * Format a price in Indian Rupees
 */
export const formatPrice = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

/**
 * Format age in months to readable string
 */
export const formatAge = (months: number): string => {
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem > 0 ? `${years}y ${rem}m` : `${years} year${years !== 1 ? 's' : ''}`;
};

/**
 * Truncate a string to a given length
 */
export const truncate = (str: string, length: number): string =>
  str.length > length ? `${str.substring(0, length)}...` : str;

/**
 * Generate star rating array for display
 */
export const getStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) return 'full';
    if (i < rating) return 'half';
    return 'empty';
  });
};

/**
 * Validate Indian phone number
 */
export const isValidPhone = (phone: string): boolean =>
  /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));

/**
 * Validate email
 */
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Get distance string between two coords (Haversine)
 */
export const getDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): string => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return dist < 1 ? `${Math.round(dist * 1000)}m` : `${dist.toFixed(1)}km`;
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
