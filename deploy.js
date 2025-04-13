// Simple deploy script to avoid path length issues
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const distPath = path.resolve(__dirname, 'dist');
const tempDir = path.resolve(__dirname, '.deploy-temp');

// Ensure we have a clean start
try {
  if (fs.existsSync(tempDir)) {
    console.log('Cleaning up previous deploy directory...');
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir);
} catch (err) {
  console.error('Error preparing temp directory:', err);
  process.exit(1);
}

try {
  // Copy dist contents to temp directory
  console.log('Copying build files...');
  fs.cpSync(distPath, tempDir, { recursive: true });

  // Initialize git in the temp directory
  console.log('Initializing git repository...');
  execSync('git init', { cwd: tempDir });
  execSync('git config --local user.name "GitHub Pages Deploy"', { cwd: tempDir });
  execSync('git config --local user.email "deploy@example.com"', { cwd: tempDir });

  // Create and commit files
  console.log('Committing files...');
  execSync('git add .', { cwd: tempDir });
  execSync('git commit -m "Deploy to GitHub Pages"', { cwd: tempDir });

  // Force push to gh-pages branch of the parent repository
  console.log('Pushing to gh-pages branch...');
  const currentRemote = execSync('git remote get-url origin', { cwd: __dirname }).toString().trim();
  execSync(`git push -f ${currentRemote} HEAD:gh-pages`, { cwd: tempDir });

  console.log('Deployment successful! Cleaning up...');
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log('Done!');
} catch (error) {
  console.error('Deployment failed:', error);
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  process.exit(1);
}
