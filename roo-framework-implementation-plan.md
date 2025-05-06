# Roo Framework Package Implementation Plan

This document outlines the step-by-step implementation plan for creating and publishing the Roo Multi-Agent Framework as a GitHub Package. Follow these instructions once you have your GitHub Personal Access Token (PAT) ready.

## Phase 1: Repository Setup

### Step 1: Create a New Repository

1. Log in to GitHub
2. Create a new repository named "roo-framework-package"
3. Initialize with a README.md
4. Choose an appropriate license (MIT recommended for compatibility with the original framework)

### Step 2: Clone the Original Repository

```bash
# Clone the original repository
git clone https://github.com/Mnehmos/The-Ultimate-Roo-Code-Hack-Building-a-Structured-Transparent-and-Well-Documented-AI-Team.git roo-framework-source

# Navigate to the cloned repository
cd roo-framework-source
```

### Step 3: Clone Your New Repository

```bash
# Clone your new repository
git clone https://github.com/yourusername/roo-framework-package.git

# Navigate to your repository
cd roo-framework-package
```

## Phase 2: Package Structure Creation

### Step 1: Copy Essential Files

```bash
# Create directories
mkdir -p scripts templates

# Copy essential files from the source repository
cp ../roo-framework-source/.roomodes .
cp -r ../roo-framework-source/templates/* templates/
cp ../roo-framework-source/README.md .
cp ../roo-framework-source/detailed-mode-creation-guide.md .
cp ../roo-framework-source/meet-the-team.md .
```

### Step 2: Create package.json

Create a `package.json` file in the root of your repository:

```bash
# Create package.json
cat > package.json << 'EOF'
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
EOF

# Replace yourusername with your actual GitHub username
sed -i 's/yourusername/YOUR_GITHUB_USERNAME/g' package.json
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

### Step 3: Create setup.js

Create a `setup.js` file in the scripts directory:

```bash
# Create setup.js
cat > scripts/setup.js << 'EOF'
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
EOF

# Replace yourusername with your actual GitHub username
sed -i 's/yourusername/YOUR_GITHUB_USERNAME/g' scripts/setup.js
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

### Step 4: Create index.js

Create an `index.js` file in the root of your repository:

```bash
# Create index.js
cat > index.js << 'EOF'
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
EOF
```

### Step 5: Update README.md

Create a new README.md for your package:

```bash
# Create a new README.md
cp roo-framework-package-readme.md README.md

# Replace yourusername with your actual GitHub username
sed -i 's/yourusername/YOUR_GITHUB_USERNAME/g' README.md
```

## Phase 3: Version Control

### Step 1: Add Files to Git

```bash
# Add all files to git
git add .

# Commit the changes
git commit -m "Initial package setup"
```

### Step 2: Push to GitHub

```bash
# Push to GitHub
git push origin main
```

## Phase 4: Package Publishing

### Step 1: Configure npm for GitHub Packages

Create or edit `~/.npmrc` to include your GitHub authentication:

```bash
# Create .npmrc file
cat > ~/.npmrc << EOF
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
@YOUR_GITHUB_USERNAME:registry=https://npm.pkg.github.com
EOF
```

Replace:
- `YOUR_GITHUB_PAT` with your GitHub Personal Access Token
- `YOUR_GITHUB_USERNAME` with your actual GitHub username

### Step 2: Authenticate with GitHub Packages

```bash
# Authenticate with GitHub Packages
npm login --registry=https://npm.pkg.github.com --scope=@YOUR_GITHUB_USERNAME
```

Enter:
- Your GitHub username
- Your GitHub PAT as the password
- Your email address

### Step 3: Publish the Package

```bash
# Publish the package
npm publish
```

## Phase 5: Testing the Package

### Step 1: Create a Test Project

```bash
# Create a test project directory
mkdir roo-framework-test
cd roo-framework-test

# Initialize npm
npm init -y
```

### Step 2: Configure npm for the Test Project

Create a `.npmrc` file in the test project:

```bash
# Create .npmrc file
cat > .npmrc << EOF
@YOUR_GITHUB_USERNAME:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
EOF
```

Replace:
- `YOUR_GITHUB_PAT` with your GitHub Personal Access Token
- `YOUR_GITHUB_USERNAME` with your actual GitHub username

### Step 3: Install the Package

```bash
# Install the package
npm install --save-dev @YOUR_GITHUB_USERNAME/roo-framework
```

### Step 4: Verify Installation

Check that the package has been installed correctly:

```bash
# Check that .roomodes file exists
ls -la .roomodes

# Check that .roo directory structure exists
ls -la .roo
```

### Step 5: Create a Test Script

Create a test script to verify the package API:

```bash
# Create test.js
cat > test.js << EOF
const rooFramework = require('@YOUR_GITHUB_USERNAME/roo-framework');

// Test getCustomInstructions
const customInstructions = rooFramework.getCustomInstructions();
console.log('Custom instructions loaded successfully.');

// Test getEnhancePromptTemplate
const enhancePromptTemplate = rooFramework.getEnhancePromptTemplate();
console.log('Enhance prompt template loaded successfully.');

// Test getDocumentationPath
const readmePath = rooFramework.getDocumentationPath('README.md');
console.log(`README.md path: ${readmePath}`);

// Test readDocumentation
const meetTheTeam = rooFramework.readDocumentation('meet-the-team.md');
console.log('Meet the team document loaded successfully.');

console.log('All tests passed!');
EOF

# Replace YOUR_GITHUB_USERNAME with your actual GitHub username
sed -i 's/YOUR_GITHUB_USERNAME/your-github-username/g' test.js
```

Replace `your-github-username` with your actual GitHub username.

### Step 6: Run the Test Script

```bash
# Run the test script
node test.js
```

## Phase 6: Documentation

### Step 1: Copy Documentation Files

Copy the documentation files to your repository:

```bash
# Copy documentation files
cp roo-framework-package-setup.md .
cp roo-framework-architecture.md .
cp roo-framework-migration-guide.md .
cp roo-framework-customization-guide.md .
cp roo-framework-implementation-plan.md .

# Add to git
git add .
git commit -m "Add documentation"
git push origin main
```

### Step 2: Update Package with Documentation

Update the `files` array in `package.json` to include the documentation:

```bash
# Update package.json
sed -i 's/"files": \[/"files": \[\n    "roo-framework-package-setup.md",\n    "roo-framework-architecture.md",\n    "roo-framework-migration-guide.md",\n    "roo-framework-customization-guide.md",\n    "roo-framework-implementation-plan.md",/g' package.json

# Commit and push
git add package.json
git commit -m "Include documentation in package"
git push origin main
```

### Step 3: Publish Updated Package

```bash
# Update version in package.json
npm version patch

# Publish updated package
npm publish
```

## Phase 7: Usage in Projects

### Step 1: Configure npm for Your Projects

For each project where you want to use the package:

1. Create a `.npmrc` file:

```
@YOUR_GITHUB_USERNAME:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

2. Install the package:

```bash
npm install --save-dev @YOUR_GITHUB_USERNAME/roo-framework
```

### Step 2: Configure VS Code

1. Open VS Code settings
2. Navigate to the Roo extension settings
3. Set up custom instructions for all modes using the package API:

```javascript
// Get custom instructions from the package
const rooFramework = require('@YOUR_GITHUB_USERNAME/roo-framework');
const customInstructions = rooFramework.getCustomInstructions();

// Copy these instructions into the VS Code Roo extension settings
```

## Maintenance Plan

### Regular Updates

1. Monitor the original repository for updates
2. Incorporate relevant changes into your package
3. Update the version number following semantic versioning
4. Publish the updated package

### Version Management

Follow semantic versioning:
- **Patch (1.0.x)**: Bug fixes and minor improvements
- **Minor (1.x.0)**: New features that don't break compatibility
- **Major (x.0.0)**: Breaking changes

### Documentation Updates

Keep documentation up to date:
1. Update documentation files when making changes
2. Include changelog information
3. Provide migration guides for major version changes

## Conclusion

By following this implementation plan, you will create a GitHub Package that provides a streamlined way to incorporate the Roo Multi-Agent Framework into your projects. This approach offers several advantages:

1. **Clean Project Structure**: Only essential files are included in your projects
2. **Easy Updates**: Update to new versions with npm
3. **Standardized Integration**: Use familiar package management workflows
4. **Private Access**: Control who can access your package
5. **Customization**: Tailor the framework to your needs while maintaining updatability

Once implemented, you can use this package across all your projects, ensuring consistency and reducing duplication.