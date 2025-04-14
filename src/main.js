// Import CSS
import './styles.css';

// Import core modules
import { initializeAuthentication } from './js/auth.js';
import { initializeRooms } from './js/rooms.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  console.log('Main script loaded');
  
  // Initialize authentication
  initializeAuthentication();
  
  // Initialize rooms functionality
  initializeRooms();
});
