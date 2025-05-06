# Roo Framework GitHub Package Setup Guide

This guide provides step-by-step instructions for packaging the Roo Multi-Agent Framework as a private GitHub Package. Follow these instructions to create and publish your own version of the framework.

## Required Files

### 1. package.json

Create a `package.json` file in the root of your repository:

```json
{
  "name": "@yourusername/roo-framework",
  "version": "1.0.0",
  "description": "Structured, Transparent, and Well-Documented AI Team Framework",
  "main": "index.js",
  "scripts": {
    "postinstall": "node scripts/setup.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/roo-framework-package.git"
  },
  "keywords": ["roo", "ai", "framework", "multi-agent"],
  "author": "Your Name",
  "license": "MIT",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "files": [
    "index.js",
    "scripts/",
    ".roomodes",
    "templates/",
    "README.md",
    "detailed-mode-creation-guide.md",
    "meet-the-team.md"
  ]
}
```

Replace `yourusername` with your actual GitHub username.

### 2. scripts/setup.js

Create a `scripts` directory and add a `setup.js` file:

```javascript
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
```

### 3. index.js

Create an `index.js` file in the root of your repository:

```javascript
// index.js
const fs = require('fs');
const path = require('path');

// Export utility functions
module.exports = {
  // Get path to documentation files
  getDocumentationPath: (filename) => {
    return path.join(__dirname, filename);
  },
  
  // Read documentation file
  readDocumentation: (filename) => {
    return fs.readFileSync(path.join(__dirname, filename), 'utf8');
  },
  
  // Get custom instructions
  getCustomInstructions: () => {
    return fs.readFileSync(path.join(__dirname, 'templates', 'custom-instructions-for-all-modes.md'), 'utf8');
  },
  
  // Get enhance prompt template
  getEnhancePromptTemplate: () => {
    return fs.readFileSync(path.join(__dirname, 'templates', 'enhance-prompt-template.md'), 'utf8');
  }
};
```

## Setup Instructions

### 1. Create a New Repository

1. Create a new repository on GitHub (e.g., `roo-framework-package`)
2. Clone the original Roo framework repository:

```bash
git clone https://github.com/Mnehmos/The-Ultimate-Roo-Code-Hack-Building-a-Structured-Transparent-and-Well-Documented-AI-Team.git roo-framework
cd roo-framework
```

### 2. Prepare the Package

1. Remove the original Git remote and add your new repository:

```bash
git remote remove origin
git remote add origin https://github.com/yourusername/roo-framework-package.git
```

2. Create the files listed above:
   - `package.json` in the root directory
   - `scripts/setup.js` (create the scripts directory first)
   - `index.js` in the root directory

3. Commit the changes:

```bash
git add package.json scripts/setup.js index.js
git commit -m "Prepare framework as GitHub Package"
```

### 3. Publish to GitHub Packages

1. Create a GitHub Personal Access Token (PAT) with the `write:packages` scope
2. Authenticate with GitHub Packages:

```bash
npm login --registry=https://npm.pkg.github.com --scope=@yourusername
# Enter your GitHub username
# Enter your PAT as the password
# Enter your email
```

3. Publish the package:

```bash
npm publish
```

## Using the Package in Your Projects

### 1. Authenticate with GitHub Packages

Create or edit `~/.npmrc` to include your GitHub authentication:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@yourusername:registry=https://npm.pkg.github.com
```

### 2. Install the Package

```bash
# Install as a dev dependency
npm install --save-dev @yourusername/roo-framework
```

The postinstall script will automatically:
- Copy the `.roomodes` file to your project root
- Create the `.roo` directory structure
- Initialize the boomerang state file

### 3. Access Framework Resources

```javascript
// Access documentation and templates
const rooFramework = require('@yourusername/roo-framework');

// Get custom instructions for VS Code setup
const customInstructions = rooFramework.getCustomInstructions();
console.log(customInstructions);

// Get path to a specific documentation file
const readmePath = rooFramework.getDocumentationPath('README.md');
console.log(`Documentation available at: ${readmePath}`);
```

## Updating the Package

When you want to update the package:

1. Make your changes
2. Update the version number in `package.json`
3. Commit the changes
4. Publish the new version:

```bash
npm publish
```

## Troubleshooting

### Authentication Issues

If you encounter authentication issues:

1. Ensure your PAT has the `write:packages` scope
2. Verify your `.npmrc` file has the correct token
3. Check that you're logged in with the correct account:

```bash
npm whoami --registry=https://npm.pkg.github.com
```

### Installation Issues

If the postinstall script fails:

1. Check the error message in the npm logs
2. Try running the setup script manually:

```bash
node node_modules/@yourusername/roo-framework/scripts/setup.js
```

3. Verify that your project has the necessary permissions to create directories and files