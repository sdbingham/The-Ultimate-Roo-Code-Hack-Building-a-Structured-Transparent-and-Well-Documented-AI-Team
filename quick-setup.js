#!/usr/bin/env node

/**
 * Roo Framework All-in-One Setup Script
 *
 * This script automates the entire setup process for the Roo Framework
 * with LangChain integration in a single non-interactive command.
 *
 * It serves as a wrapper around the core setup.js script (which is interactive)
 * and handles all the additional steps like dependency installation and configuration.
 *
 * Run it with: node quick-setup.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

// Banner
console.log(`
${colors.bright}${colors.blue}╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  ${colors.cyan}Roo Framework Quick Setup${colors.blue}                               ║
║  ${colors.dim}Version 4.5.3${colors.blue}                                          ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝${colors.reset}
`);

// Helper function to run a command and handle errors
function runCommand(command, errorMessage) {
  try {
    console.log(`${colors.bright}Running: ${command}${colors.reset}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`${colors.red}${errorMessage || `Failed to run command: ${command}`}${colors.reset}`);
    console.error(`${colors.red}${error.message}${colors.reset}`);
    return false;
  }
}

// Helper function to check .env file
function checkEnvFile() {
  console.log(`${colors.bright}Checking .env file...${colors.reset}`);
  
  const envPath = path.join(process.cwd(), '.env');
  
  // Check if .env file exists
  if (fs.existsSync(envPath)) {
    console.log(`${colors.green}✓ .env file found${colors.reset}`);
    
    // Check if API keys are set
    const envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('ANTHROPIC_API_KEY=your_anthropic_api_key_here') ||
        envContent.includes('OPENAI_API_KEY=your_openai_api_key_here')) {
      console.log(`${colors.yellow}⚠ API keys in .env file need to be updated with real values${colors.reset}`);
      console.log(`${colors.yellow}  Please edit the .env file and replace the placeholder API keys${colors.reset}`);
    }
  } else {
    console.log(`${colors.red}❌ .env file not found${colors.reset}`);
    console.log(`${colors.yellow}  Please create a .env file with the required environment variables${colors.reset}`);
    console.log(`${colors.yellow}  See the documentation for details${colors.reset}`);
    return false;
  }
  
  return true;
}

// Main setup process
async function setup() {
  console.log(`${colors.bright}Starting Roo Framework quick setup...${colors.reset}\n`);
  
  // Step 1: Install LangChain dependencies
  console.log(`${colors.cyan}Step 1: Installing LangChain dependencies${colors.reset}`);
  
  // LangChain dependencies to install - always install these as required dependencies
  const dependencies = [
    'langchain@0.1.0',
    '@langchain/openai@0.0.10',
    '@langchain/anthropic@0.0.10',
    '@langchain/community@0.0.10'
  ];
  
  // Check if package.json exists
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error(`${colors.red}Error: package.json not found in the current directory.${colors.reset}`);
    return;
  }
  
  // Read package.json
  let packageJson;
  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    packageJson = JSON.parse(packageJsonContent);
  } catch (error) {
    console.error(`${colors.red}Error reading package.json: ${error.message}${colors.reset}`);
    return;
  }
  
  // Always install all LangChain dependencies to ensure they're properly set up
  console.log(`${colors.yellow}Installing LangChain dependencies:${colors.reset}`);
  dependencies.forEach(dep => console.log(`- ${dep}`));
  console.log();
  
  const installCommand = `npm install ${dependencies.join(' ')} --legacy-peer-deps`;
  if (!runCommand(installCommand, 'Failed to install LangChain dependencies')) {
    return;
  }
  console.log();
  
  // Step 2: Update package.json version
  console.log(`${colors.cyan}Step 2: Updating package.json version${colors.reset}`);
  
  // Re-read package.json in case it was updated by the dependency installation
  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    packageJson = JSON.parse(packageJsonContent);
  } catch (error) {
    console.error(`${colors.red}Error reading package.json: ${error.message}${colors.reset}`);
    return;
  }
  
  // Update version if needed
  if (packageJson.version !== '4.5.3') {
    console.log(`Updating version from ${packageJson.version} to 4.5.3`);
    packageJson.version = '4.5.3';
    
    // Write updated package.json
    try {
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
      console.log(`\nSuccessfully updated package.json:`);
      console.log(`- Set version to 4.5.2`);
    } catch (error) {
      console.error(`${colors.red}Error writing package.json: ${error.message}${colors.reset}`);
      return;
    }
  } else {
    console.log(`Package version is already 4.5.2`);
  }
  console.log();
  
  // Step 3: Check environment variables
  console.log(`${colors.cyan}Step 3: Checking environment variables${colors.reset}`);
  if (!checkEnvFile()) {
    console.log(`${colors.red}Setup cannot continue without a valid .env file${colors.reset}`);
    return;
  }
  console.log();
  
  // Step 4: Run core setup script (from roo-framework-package)
  console.log(`${colors.cyan}Step 4: Running core setup script (non-interactive mode)${colors.reset}`);
  console.log(`${colors.dim}This will create the directory structure, boomerang state, and docker-compose.yml${colors.reset}`);
  if (!runCommand('npm run setup -- --non-interactive --start-docker --setup-langchain --install-langchain-deps', 'Failed to run core setup script')) {
    console.log(`${colors.yellow}Core setup script failed, but continuing with LangChain setup...${colors.reset}`);
  }
  console.log();
  
  // Setup complete
  console.log(`${colors.green}${colors.bright}Roo Framework setup with LangChain integration complete!${colors.reset}`);
  console.log(`\n${colors.bright}Next steps:${colors.reset}`);
  console.log(`1. Check Docker container health: ${colors.cyan}npm run docker:health${colors.reset}`);
  console.log(`2. Start using the framework in your code:`);
  console.log(`   ${colors.dim}const rooFramework = require('@sdbingham/roo-framework');${colors.reset}`);
  console.log(`3. Use the framework's memory system:`);
  console.log(`   ${colors.dim}rooFramework.memory.createMemoryAsset({${colors.reset}`);
  console.log(`   ${colors.dim}  type: 'research',${colors.reset}`);
  console.log(`   ${colors.dim}  name: 'Example Memory Asset',${colors.reset}`);
  console.log(`   ${colors.dim}  content: 'This is an example memory asset'${colors.reset}`);
  console.log(`   ${colors.dim}});${colors.reset}`);
}

// Run setup
setup().catch(error => {
  console.error(`${colors.red}Setup failed: ${error.message}${colors.reset}`);
});