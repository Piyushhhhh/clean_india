/**
 * Get current location using browser's Geolocation API
 * @returns {Promise<{lat: string, lng: string}>}
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        resolve({ lat, lng });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
};

/**
 * Format coordinates for display
 * @param {Object} coords - {lat, lng}
 * @returns {string}
 */
export const formatCoordinates = (coords) => {
  if (!coords) return '';
  return `${coords.lat}, ${coords.lng}`;
};

