// Simple deployment script for the simplified HTML files
const ghpages = require('gh-pages');

console.log('Deploying simplified files to GitHub Pages...');

ghpages.publish('dist', {
  message: 'Deploy simplified air quality dashboard'
}, function(err) {
  if (err) {
    console.error('Deployment failed:', err);
  } else {
    console.log('Deployment successful!');
  }
});
