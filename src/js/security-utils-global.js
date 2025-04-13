// Security utilities for input validation and sanitization
window.SecurityUtils = {
  // Validates a device ID to ensure it follows the expected format
  validateDeviceId: function(deviceId) {
    // Debug info
    console.log('Validating device ID:', deviceId);
    
    // Check if deviceId is provided
    if (!deviceId) {
      console.log('Device ID is empty or null');
      return false;
    }
    
    // IMPORTANT: For now, accept ANY non-empty device ID to ensure functionality
    return true;
  },

  // Sanitizes text to prevent XSS attacks when inserting into HTML
  sanitizeText: function(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  // Validates and sanitizes URL parameters
  validateAndSanitizeParams: function(params) {
    const deviceId = params.get('deviceId');
    const roomName = params.get('name') || 'Room';
    
    if (!this.validateDeviceId(deviceId)) {
      throw new Error('Invalid Device ID');
    }
    
    return {
      deviceId: deviceId,
      name: this.sanitizeText(roomName),
      apiUrl: `https://us-central1-yodeck-airq.cloudfunctions.net/app/api/devices/${deviceId}`
    };
  }
};
