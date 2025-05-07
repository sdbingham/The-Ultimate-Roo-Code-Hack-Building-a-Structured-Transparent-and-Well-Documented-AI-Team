// scripts/setup.js
const fs = require('fs');
const path = require('path');

// Determine the project root (2 levels up from node_modules/@yourusername/roo-framework/scripts)
const projectRoot = path.resolve(__dirname, '..', '..', '..', '..');

// Copy .roomodes to project root if it doesn't exist
const roomodesSource = path.join(__dirname, '..', '.roomodes');
const roomodesTarget = path.join(projectRoot, '.roomodes');

if (!fs.existsSync(roomodesTarget)) {
  fs.copyFileSync(roomodesSource, roomodesTarget);
  console.log('Created .roomodes file in project root');
}

// Create .roo directory structure
const directories = [
  '.roo',
  '.roo/logs',
  '.roo/logs/orchestrator',
  '.roo/logs/code',
  '.roo/logs/architect',
  '.roo/logs/ask',
  '.roo/logs/debug',
  '.roo/logs/memory',
  '.roo/logs/deep-research',
  '.roo/memory'
];

directories.forEach(dir => {
  const dirPath = path.join(projectRoot, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Create boomerang state file if it doesn't exist
const boomerangPath = path.join(projectRoot, '.roo', 'boomerang-state.json');
if (!fs.existsSync(boomerangPath)) {
  fs.writeFileSync(boomerangPath, '{}');
  console.log('Created boomerang-state.json file');
}

console.log('Roo framework setup complete!');