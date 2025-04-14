// This file should be creating the prod-config.js that's missing in your build

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

console.log('Generating production configuration from environment variables...');

// Extract Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Create the configuration file content
const configFileContent = `// Production configuration for Firebase
window.FIREBASE_CONFIG = ${JSON.stringify(firebaseConfig, null, 2)};
`;

// Ensure the directory exists
const outputDir = path.resolve('./src/js');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the configuration file
const outputFile = path.join(outputDir, 'prod-config.js');
fs.writeFileSync(outputFile, configFileContent);

console.log(`Production configuration generated successfully at: ${outputFile}`);
