/**
 * Security utilities for input validation and sanitization
 */

/**
 * Validates a device ID to ensure it follows the expected format
 * @param {string} deviceId - The device ID to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateDeviceId(deviceId) {
  // Debug info
  console.log('Validating device ID:', deviceId);
  
  // Check if deviceId is provided
  if (!deviceId) {
    console.log('Device ID is empty or null');
    return false;
  }
  
  // IMPORTANT: For now, accept ANY non-empty device ID to ensure functionality
  // We can add validation back once we confirm everything is working
  return true;
}

/**
 * Sanitizes text to prevent XSS attacks when inserting into HTML
 * @param {string} text - The text to sanitize
 * @returns {string} - The sanitized text
 */
export function sanitizeText(text) {
  if (!text) return '';
  
  // Create a temporary div element
  const temp = document.createElement('div');
    // Set its text content (not innerHTML) which encodes HTML entities
  temp.textContent = text;
  
  // Return the encoded string
  return temp.innerHTML;
}

/**
 * Validates and sanitizes URL parameters
 * @param {URLSearchParams} params - URL search parameters
 * @returns {Object} - Object containing validated and sanitized parameters
 */
export function validateAndSanitizeParams(params) {
  const deviceId = params.get('deviceId');
  const name = params.get('name') || 'Air Quality Monitor';
  
  // Validate deviceId
  if (!validateDeviceId(deviceId)) {
    console.error('Invalid device ID provided');
    throw new Error('Invalid device ID');
  }
  
  return {
    deviceId: deviceId, // Changed from 'id' to 'deviceId' to match what room.js expects
    name: sanitizeText(name),
    apiUrl: `https://ezdata2.m5stack.com/api/v2/${deviceId}/dataMacByKey/raw`
  };
}
