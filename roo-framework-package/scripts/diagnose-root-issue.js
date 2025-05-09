#!/usr/bin/env node

/**
 * Roo Framework Root Directory Diagnostic Script
 * 
 * This script diagnoses issues with the findProjectRoot() function and tests
 * if explicitly running preConfigureEverything() resolves the problem.
 */

const fs = require('fs');
const path = require('path');
const rooFramework = require('../index.js');

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

console.log(`
${colors.bright}${colors.blue}╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  ${colors.cyan}Roo Framework Root Directory Diagnostic${colors.blue}               ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝${colors.reset}
`);

// Step 1: Log environment information
console.log(`${colors.bright}Environment Information:${colors.reset}`);
console.log(`Current Working Directory: ${process.cwd()}`);
console.log(`__dirname: ${__dirname}`);
console.log(`Node.js Version: ${process.version}`);
console.log(`Platform: ${process.platform}`);

// Step 2: Check if we're running inside node_modules
const isInNodeModules = process.cwd().includes('node_modules');
console.log(`Running inside node_modules: ${isInNodeModules ? colors.yellow + 'Yes' + colors.reset : colors.green + 'No' + colors.reset}`);

// Step 3: Log the result of findProjectRoot()
const projectRoot = rooFramework.getProjectRoot();
console.log(`\n${colors.bright}Project Root Detection:${colors.reset}`);
console.log(`Detected Project Root: ${projectRoot}`);

// Step 4: Check if this is the expected project root
console.log(`\n${colors.bright}Project Root Validation:${colors.reset}`);

// Check if package.json exists in the detected project root
const packageJsonPath = path.join(projectRoot, 'package.json');
const hasPackageJson = fs.existsSync(packageJsonPath);
console.log(`package.json exists in detected root: ${hasPackageJson ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}`);

// If package.json exists, check if it includes this package as a dependency
let isDependency = false;
if (hasPackageJson) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = {
      ...(packageJson.dependencies || {}),
      ...(packageJson.devDependencies || {})
    };
    
    isDependency = !!dependencies['@sdbingham/roo-framework'];
    console.log(`@sdbingham/roo-framework is listed as a dependency: ${isDependency ? colors.green + 'Yes' + colors.reset : colors.yellow + 'No' + colors.reset}`);
  } catch (error) {
    console.log(`${colors.red}Error reading package.json: ${error.message}${colors.reset}`);
  }
}

// Step 5: Check if .roomodes already exists
const roomodesPath = path.join(projectRoot, '.roomodes');
const hasRoomodes = fs.existsSync(roomodesPath);
console.log(`\n${colors.bright}Pre-Configuration Check:${colors.reset}`);
console.log(`.roomodes exists in detected root: ${hasRoomodes ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}`);

// Check if .roo directory exists
const rooDirPath = path.join(projectRoot, '.roo');
const hasRooDir = fs.existsSync(rooDirPath);
console.log(`.roo directory exists in detected root: ${hasRooDir ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}`);

// Step 6: Check setup status
console.log(`\n${colors.bright}Setup Status:${colors.reset}`);

// Track which files and directories exist
const filesStatus = {
  roomodes: hasRoomodes,
  rooDir: hasRooDir
};

// Check setup status
console.log(`.roomodes exists: ${filesStatus.roomodes ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}`);
console.log(`.roo directory exists: ${filesStatus.rooDir ? colors.green + 'Yes' + colors.reset : colors.red + 'No' + colors.reset}`);

// Provide status information
if (!filesStatus.roomodes) {
  console.log(`${colors.red}✗ .roomodes file is missing${colors.reset}`);
} else {
  console.log(`${colors.green}✓ .roomodes file exists${colors.reset}`);
}

if (!filesStatus.rooDir) {
  console.log(`${colors.red}✗ .roo directory is missing${colors.reset}`);
} else {
  console.log(`${colors.green}✓ .roo directory exists${colors.reset}`);
}

// Step 7: Verify the setup
console.log(`\n${colors.bright}Verifying Setup:${colors.reset}`);
const setupStatus = rooFramework.verifySetup();

if (setupStatus.isComplete) {
  console.log(`${colors.green}✓ Roo framework setup is complete!${colors.reset}`);
} else {
  console.log(`${colors.red}✗ Roo framework setup is incomplete.${colors.reset}`);
  console.log(`Missing paths:`);
  setupStatus.missingPaths.forEach(p => console.log(`  - ${p}`));
}

// Step 8: Provide recommendations
console.log(`\n${colors.bright}Recommendations:${colors.reset}`);

if (!setupStatus.isComplete) {
  console.log(`${colors.yellow}1. Run the setup script:${colors.reset}`);
  console.log(`   npx roo-framework setup`);
  console.log(`\n${colors.yellow}2. Check for permission issues:${colors.reset}`);
  console.log(`   Ensure you have write permissions to the project root directory.`);
  console.log(`\n${colors.yellow}3. Verify the project root:${colors.reset}`);
  console.log(`   The setup script will ask you to confirm the project root directory.`);
} else {
  console.log(`${colors.green}The Roo Framework is correctly set up in your project.${colors.reset}`);
}

// Step 9: Provide detailed debug information about the findProjectRoot function
console.log(`\n${colors.bright}findProjectRoot() Debug Information:${colors.reset}`);

// Trace the directory traversal that findProjectRoot would perform
function traceProjectRootLogic() {
  console.log(`${colors.dim}Tracing findProjectRoot() logic:${colors.reset}`);
  
  // Strategy 1: Find package.json by traversing up
  let currentDir = process.cwd();
  console.log(`${colors.dim}Strategy 1: Looking for package.json starting from ${currentDir}${colors.reset}`);
  
  let foundPackageJson = false;
  while (currentDir !== path.parse(currentDir).root) {
    const packageJsonExists = fs.existsSync(path.join(currentDir, 'package.json'));
    console.log(`  ${colors.dim}Checking ${currentDir}: package.json exists? ${packageJsonExists ? 'Yes' : 'No'}${colors.reset}`);
    
    if (packageJsonExists) {
      console.log(`  ${colors.green}Found package.json at ${currentDir}${colors.reset}`);
      foundPackageJson = true;
      break;
    }
    
    // Move up one directory
    currentDir = path.dirname(currentDir);
  }
  
  if (!foundPackageJson) {
    console.log(`  ${colors.yellow}No package.json found in directory hierarchy${colors.reset}`);
    
    // Strategy 2: Find node_modules by traversing up
    currentDir = process.cwd();
    console.log(`${colors.dim}Strategy 2: Looking for node_modules starting from ${currentDir}${colors.reset}`);
    
    let foundNodeModules = false;
    while (currentDir !== path.parse(currentDir).root) {
      const nodeModulesExists = fs.existsSync(path.join(currentDir, 'node_modules'));
      console.log(`  ${colors.dim}Checking ${currentDir}: node_modules exists? ${nodeModulesExists ? 'Yes' : 'No'}${colors.reset}`);
      
      if (nodeModulesExists) {
        console.log(`  ${colors.green}Found node_modules at ${currentDir}${colors.reset}`);
        foundNodeModules = true;
        break;
      }
      
      // Move up one directory
      currentDir = path.dirname(currentDir);
    }
    
    if (!foundNodeModules) {
      console.log(`  ${colors.yellow}No node_modules found in directory hierarchy${colors.reset}`);
      
      // Strategy 3: Find package.json with this package as a dependency
      console.log(`${colors.dim}Strategy 3: Looking for package.json with @sdbingham/roo-framework as a dependency${colors.reset}`);
      
      const packageJsonPaths = [];
      currentDir = process.cwd();
      
      // Collect all package.json files
      while (currentDir !== path.parse(currentDir).root) {
        const packageJsonPath = path.join(currentDir, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          packageJsonPaths.push(packageJsonPath);
          console.log(`  ${colors.dim}Found package.json at ${packageJsonPath}${colors.reset}`);
        }
        currentDir = path.dirname(currentDir);
      }
      
      // Check each package.json for a dependency on this package
      let foundDependency = false;
      for (const packageJsonPath of packageJsonPaths) {
        try {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          const dependencies = {
            ...(packageJson.dependencies || {}),
            ...(packageJson.devDependencies || {})
          };
          
          const hasDependency = !!dependencies['@sdbingham/roo-framework'];
          console.log(`  ${colors.dim}Checking ${packageJsonPath}: has @sdbingham/roo-framework? ${hasDependency ? 'Yes' : 'No'}${colors.reset}`);
          
          if (hasDependency) {
            console.log(`  ${colors.green}Found @sdbingham/roo-framework as a dependency in ${packageJsonPath}${colors.reset}`);
            foundDependency = true;
            break;
          }
        } catch (error) {
          console.log(`  ${colors.red}Error reading ${packageJsonPath}: ${error.message}${colors.reset}`);
        }
      }
      
      if (!foundDependency) {
        console.log(`  ${colors.yellow}No package.json with @sdbingham/roo-framework as a dependency found${colors.reset}`);
        console.log(`  ${colors.yellow}Fallback: Using current working directory: ${process.cwd()}${colors.reset}`);
      }
    }
  }
}

traceProjectRootLogic();

console.log(`\n${colors.bright}${colors.green}Diagnostic Complete${colors.reset}`);