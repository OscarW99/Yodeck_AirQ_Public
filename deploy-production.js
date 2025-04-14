import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { execSync } from 'child_process';

// Load environment variables from .env.production if it exists
const prodEnvPath = path.resolve('.env.production');
if (fs.existsSync(prodEnvPath)) {
  console.log('Loading production environment variables from .env.production');
  dotenv.config({ path: prodEnvPath });
} else {
  console.log('Loading environment variables from .env');
  dotenv.config();
}

console.log('Starting production deployment process...');

try {
  // Build the application
  console.log('Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Here you can add any additional production deployment steps
  // For example: deploying to a server, packaging files, etc.
  
  console.log('Production build complete!');
  
  // Optional: Copy necessary files to a deployment directory
  const buildDir = path.resolve('./dist');
  // Add code here if you need to copy files to a specific deployment location
  
  console.log('Production deployment successful!');
} catch (error) {
  console.error('Production deployment failed:', error);
  process.exit(1);
}
