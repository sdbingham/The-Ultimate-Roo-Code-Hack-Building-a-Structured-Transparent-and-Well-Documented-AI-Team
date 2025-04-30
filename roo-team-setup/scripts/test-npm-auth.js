#!/usr/bin/env node
/**
 * NPM Authentication Test Script
 * 
 * This script helps diagnose common npm authentication and registry issues
 * that could be causing publishing problems in GitHub Actions.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

// Print header
console.log(`${colors.bold}==================================================${colors.reset}`);
console.log(`${colors.bold}NPM Configuration and Authentication Tester${colors.reset}`);
console.log(`${colors.bold}==================================================${colors.reset}\n`);

// Check if running as root/admin
try {
  console.log(`${colors.cyan}Checking execution environment...${colors.reset}`);
  const isRoot = process.platform === 'win32' ? false : process.getuid && process.getuid() === 0;
  if (isRoot) {
    console.log(`${colors.yellow}Warning: Running as root/admin user, this may cause permission issues with .npmrc${colors.reset}\n`);
  } else {
    console.log(`${colors.green}Running as regular user: OK${colors.reset}\n`);
  }
} catch (error) {
  console.log(`${colors.yellow}Unable to determine user permissions${colors.reset}\n`);
}

// Check npm version
try {
  console.log(`${colors.cyan}Checking npm version...${colors.reset}`);
  const npmVersion = execSync('npm --version').toString().trim();
  console.log(`npm version: ${npmVersion}`);
  
  // Parse version and check if it's greater than 9.0.0
  const versionParts = npmVersion.split('.').map(Number);
  if (versionParts[0] >= 9) {
    console.log(`${colors.yellow}Note: npm 9+ uses a different authentication flow by default.${colors.reset}`);
    console.log(`For GitHub Actions, make sure to use --auth-type=legacy or create .npmrc directly.\n`);
  } else {
    console.log(`${colors.green}npm version compatible with traditional authentication: OK${colors.reset}\n`);
  }
} catch (error) {
  console.log(`${colors.red}Error checking npm version: ${error.message}${colors.reset}\n`);
}

// Check npm registry configuration
try {
  console.log(`${colors.cyan}Checking npm registry configuration...${colors.reset}`);
  const registry = execSync('npm config get registry').toString().trim();
  console.log(`Default registry: ${registry}`);
  
  if (registry === 'https://registry.npmjs.org/') {
    console.log(`${colors.green}Using default npm registry: OK${colors.reset}\n`);
  } else {
    console.log(`${colors.yellow}Using non-standard registry. Make sure this is intentional.${colors.reset}\n`);
  }
} catch (error) {
  console.log(`${colors.red}Error checking npm registry: ${error.message}${colors.reset}\n`);
}

// Check for existing .npmrc files
console.log(`${colors.cyan}Checking for .npmrc files...${colors.reset}`);
const homeDir = require('os').homedir();
const globalNpmrc = path.join(homeDir, '.npmrc');
const projectNpmrc = path.join(process.cwd(), '.npmrc');

if (fs.existsSync(globalNpmrc)) {
  console.log(`Global .npmrc found: ${globalNpmrc}`);
  const content = fs.readFileSync(globalNpmrc, 'utf8');
  const hasAuthToken = content.includes('_authToken=');
  const registryLines = content.match(/registry=.+/g) || [];
  
  if (hasAuthToken) {
    console.log(`${colors.green}Contains authentication token: YES${colors.reset}`);
  } else {
    console.log(`${colors.yellow}Contains authentication token: NO${colors.reset}`);
  }
  
  if (registryLines.length > 0) {
    console.log('Registry settings found:');
    registryLines.forEach(line => console.log(`  - ${line}`));
  }
} else {
  console.log(`${colors.yellow}No global .npmrc found at ${globalNpmrc}${colors.reset}`);
}

console.log(); // Empty line for readability

if (fs.existsSync(projectNpmrc)) {
  console.log(`Project .npmrc found: ${projectNpmrc}`);
  const content = fs.readFileSync(projectNpmrc, 'utf8');
  const hasAuthToken = content.includes('_authToken=');
  const registryLines = content.match(/registry=.+/g) || [];
  
  if (hasAuthToken) {
    console.log(`${colors.green}Contains authentication token: YES${colors.reset}`);
  } else {
    console.log(`${colors.yellow}Contains authentication token: NO${colors.reset}`);
  }
  
  if (registryLines.length > 0) {
    console.log('Registry settings found:');
    registryLines.forEach(line => console.log(`  - ${line}`));
  }
} else {
  console.log(`${colors.yellow}No project .npmrc found${colors.reset}`);
}

console.log(); // Empty line for readability

// Test npm authentication
console.log(`${colors.cyan}Testing npm authentication...${colors.reset}`);
try {
  // This command will fail if not authenticated
  execSync('npm whoami', { stdio: 'pipe' });
  console.log(`${colors.green}Authentication successful! You are logged in to npm.${colors.reset}`);
} catch (error) {
  console.log(`${colors.red}Not authenticated to npm registry.${colors.reset}`);
  console.log(`${colors.yellow}To authenticate, run: npm login${colors.reset}`);
}

console.log(); // Empty line for readability

// Check package.json configuration
try {
  console.log(`${colors.cyan}Checking package.json configuration...${colors.reset}`);
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Check package name
    if (packageJson.name) {
      console.log(`Package name: ${packageJson.name}`);
      const isScoped = packageJson.name.startsWith('@');
      console.log(`Scoped package: ${isScoped ? 'YES' : 'NO'}`);
      
      if (isScoped) {
        console.log(`Scope: ${packageJson.name.split('/')[0]}`);
      }
    } else {
      console.log(`${colors.red}Package name not defined in package.json${colors.reset}`);
    }
    
    // Check publishConfig
    if (packageJson.publishConfig) {
      console.log(`\npublishConfig found:`);
      console.log(JSON.stringify(packageJson.publishConfig, null, 2));
      
      if (packageJson.publishConfig.registry) {
        console.log(`Publishing registry: ${packageJson.publishConfig.registry}`);
      }
      
      if (packageJson.publishConfig.access) {
        console.log(`Access level: ${packageJson.publishConfig.access}`);
      }
    } else {
      console.log(`${colors.yellow}No publishConfig found in package.json${colors.reset}`);
    }
    
    // Check repository
    if (packageJson.repository) {
      if (typeof packageJson.repository === 'string') {
        console.log(`\nRepository: ${packageJson.repository}`);
      } else if (packageJson.repository.url) {
        console.log(`\nRepository: ${packageJson.repository.url}`);
      }
    }
  } else {
    console.log(`${colors.red}No package.json found in current directory${colors.reset}`);
  }
} catch (error) {
  console.log(`${colors.red}Error checking package.json: ${error.message}${colors.reset}`);
}

console.log(); // Empty line for readability

// Provide recommendations
console.log(`${colors.cyan}${colors.bold}Recommendations:${colors.reset}`);
console.log(`1. If using GitHub Actions, make sure NPM_TOKEN secret is correctly set`);
console.log(`2. For npm 9+, use "--auth-type=legacy" or explicitly create .npmrc file`);
console.log(`3. Verify token permissions include publishing rights`);
console.log(`4. Check for token expiration or revocation`);
console.log(`5. Make sure package name isn't already taken on npm registry\n`);

console.log(`${colors.magenta}${colors.bold}To debug GitHub Actions workflow:${colors.reset}`);
console.log(`1. Add these steps before publishing to see configuration:`);
console.log(`   - run: npm config list`);
console.log(`   - run: echo "//registry.npmjs.org/:_authToken=\${NODE_AUTH_TOKEN}" > .npmrc`);
console.log(`   - run: cat .npmrc # Make sure no actual token is printed, just the placeholder`);
console.log(`2. Use "npm publish --verbose" for more detailed logging\n`);

console.log(`${colors.bold}==================================================${colors.reset}`);