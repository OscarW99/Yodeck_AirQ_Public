// This file helps manage template loading for room displays
import '../css/main.css'; // Import CSS directly - Vite will handle bundling and hashing

// Get URL parameters
const params = new URLSearchParams(window.location.search);
const deviceId = params.get('deviceId');
const roomName = params.get('name');
const templateStyle = params.get('templateStyle') || 'default';

// Load room data and initialize template
document.addEventListener('DOMContentLoaded', () => {
  // Set the room title if available
  const roomTitleElement = document.getElementById('roomTitle');
  if (roomTitleElement && roomName) {
    roomTitleElement.textContent = roomName;
  }
  
  // Initialize the template with device ID
  if (deviceId) {
    // This assumes room.js exports an initRoom function
    import('./room.js').then(module => {
      if (typeof module.initRoom === 'function') {
        module.initRoom(deviceId, templateStyle);
      }
    }).catch(error => {
      console.error('Error loading room module:', error);
    });
  } else {
    console.error('No device ID provided in URL parameters');
    document.body.innerHTML += '<div class="error-message">Error: No device ID provided</div>';
  }
});
