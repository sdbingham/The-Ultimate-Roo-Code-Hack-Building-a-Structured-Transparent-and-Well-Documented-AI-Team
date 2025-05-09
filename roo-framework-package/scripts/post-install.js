#!/usr/bin/env node

/**
 * Roo Framework Post-Install Script
 * 
 * This script runs after the package is installed and informs the user
 * about the setup process.
 */

const readline = require('readline');
const { execSync } = require('child_process');

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
║  ${colors.cyan}Roo Framework Installation Complete${colors.blue}                   ║
║  ${colors.dim}Structured, Transparent, and Well-Documented AI Team${colors.blue}  ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝${colors.reset}
`);

console.log(`${colors.bright}Thank you for installing the Roo Framework!${colors.reset}\n`);

console.log(`${colors.yellow}Important:${colors.reset} You need to run the setup script to complete the installation:`);
console.log(`\n${colors.cyan}npx roo-framework setup${colors.reset}\n`);

console.log(`This will create the necessary files and directories in your project root,`);
console.log(`set up the boomerang state tracking system, and configure the framework for use.`);
console.log(`The setup script will guide you through the process and confirm the project root directory.\n`);

console.log(`${colors.bright}Documentation:${colors.reset}`);
console.log(`For more information, see the README.md file or run:`);
console.log(`${colors.cyan}npx roo-framework help${colors.reset}\n`);

console.log(`${colors.bright}Troubleshooting:${colors.reset}`);
console.log(`If you encounter any issues, you can run the diagnostic tool:`);
console.log(`${colors.cyan}npx roo-framework diagnose${colors.reset}\n`);

console.log(`${colors.green}${colors.bright}Happy coding with the Roo Framework!${colors.reset}`);

// Check if we're in an interactive terminal
const isInteractive = process.stdout.isTTY && process.stdin.isTTY;

if (isInteractive) {
  // Create readline interface for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Ask if the user wants to run the setup script now
  rl.question(`\n${colors.yellow}Would you like to run the setup script now? (Y/n) ${colors.reset}`, (answer) => {
    if (answer.toLowerCase() === 'n' || answer.toLowerCase() === 'no') {
      console.log(`\n${colors.yellow}Remember to run the setup script later:${colors.reset}`);
      console.log(`${colors.cyan}npx roo-framework setup${colors.reset}\n`);
      rl.close();
    } else {
      console.log(`\n${colors.green}Running setup...${colors.reset}\n`);
      try {
        // Run the setup script
        execSync('npx roo-framework setup', { stdio: 'inherit' });
        rl.close();
      } catch (error) {
        console.error(`\n${colors.red}Error running setup script: ${error.message}${colors.reset}`);
        console.log(`\n${colors.yellow}You can run it manually later:${colors.reset}`);
        console.log(`${colors.cyan}npx roo-framework setup${colors.reset}\n`);
        rl.close();
      }
    }
  });
} else {
  // Not in an interactive terminal, just display a reminder
  console.log(`\n${colors.yellow}Important: Remember to run the setup script to complete installation:${colors.reset}`);
  console.log(`${colors.cyan}npx roo-framework setup${colors.reset}\n`);
}