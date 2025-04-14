// This script generates the production configuration file from .env variables
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

console.log('Generating production configuration from environment variables...');

// Get all environment variables starting with VITE_
const envVars = {};
Object.keys(process.env).forEach(key => {
  if (key.startsWith('VITE_')) {
    envVars[key] = process.env[key];
  }
});

// Create the production configuration content
const configContent = `// This file is auto-generated during the build process. 
// DO NOT EDIT MANUALLY.

window.ENV = ${JSON.stringify(envVars, null, 2)};
`;

// Ensure the directory exists
const outputDir = path.resolve('./src/js');
const outputFile = path.resolve(outputDir, 'prod-config.js');

// Write the configuration file
fs.writeFileSync(outputFile, configContent);

console.log('Production configuration generated successfully at:', outputFile);
