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
console.log(`set up the boomerang state tracking system, configure the framework for use,`);
console.log(`and optionally set up LangChain integration for enhanced memory capabilities.`);
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
        // Create .env file if it doesn't exist
        const fs = require('fs');
        const path = require('path');
        const envPath = path.join(process.cwd(), '.env');
        
        if (!fs.existsSync(envPath)) {
          console.log(`\n${colors.green}Creating .env file...${colors.reset}\n`);
          
          // Content for .env file
          const envContent = `# Roo Framework Environment Variables
# This file contains all configurable environment variables for the Roo Framework.

# =============================================================================
# LangChain Integration
# =============================================================================
# These variables are required for LangChain integration

# Enable LangChain memory adapter
USE_LANGCHAIN_MEMORY=true

# Provider Configuration
# This setting controls which API provider to use for both LLM and embeddings
ROO_LANGCHAIN_LLM_PROVIDER=anthropic
ROO_LANGCHAIN_LLM_MODEL=claude-3-sonnet-20250219

# Embedding Provider Configuration (Optional)
# Only set this if you want to use a different provider for embeddings
# ROO_LANGCHAIN_EMBEDDING_PROVIDER=openai
ROO_LANGCHAIN_EMBEDDING_MODEL=text-embedding-ada-002

# API Keys (replace with your actual API keys)
ANTHROPIC_API_KEY=your_anthropic_api_key_here
# OPENAI_API_KEY=your_openai_api_key_here

# =============================================================================
# Docker Connection Configuration
# =============================================================================
# These variables are used by your application to connect to the services

# Weaviate Configuration
ROO_WEAVIATE_SCHEME=http
ROO_WEAVIATE_HOST=localhost:9081

# Neo4j Configuration
ROO_NEO4J_URI=bolt://localhost:9687
ROO_NEO4J_USERNAME=neo4j
ROO_NEO4J_PASSWORD=password

# MongoDB Configuration
ROO_MONGODB_URI=mongodb://root:rootpassword@localhost:29017
ROO_MONGODB_DATABASE=roo_memory

# Chroma Configuration
ROO_CHROMA_PATH=http://localhost:9001
ROO_CHROMA_AUTH_TOKEN=admin_token

# =============================================================================
# Docker Resource Limits
# =============================================================================
# These variables are used by docker-compose.yml to set resource limits

# Weaviate Resource Limits
WEAVIATE_MEMORY_LIMIT=2G
WEAVIATE_CPU_LIMIT=1

# Neo4j Resource Limits
NEO4J_MEMORY_LIMIT=2G
NEO4J_CPU_LIMIT=1
NEO4J_MEMORY_PAGECACHE=512M
NEO4J_MEMORY_HEAP_INITIAL=512M
NEO4J_MEMORY_HEAP_MAX=1G

# MongoDB Resource Limits
MONGODB_MEMORY_LIMIT=1G
MONGODB_CPU_LIMIT=1

# Chroma Resource Limits
CHROMA_MEMORY_LIMIT=1G
CHROMA_CPU_LIMIT=1

# =============================================================================
# Advanced Configuration
# =============================================================================
# Uncomment and modify these for production environments

# MongoDB Advanced Configuration
# MONGODB_REPLICA_SET=rs0
# MONGODB_OPLOG_SIZE=1024

# Container Names (optional)
# ROO_CONTAINER_PREFIX=myproject_
`;
          
          fs.writeFileSync(envPath, envContent);
          console.log(`${colors.green}✓ Created .env file${colors.reset}`);
          console.log(`${colors.yellow}⚠ IMPORTANT: Edit the .env file to replace placeholder API keys with your actual keys${colors.reset}`);
        }
        
        // Run the setup script
        console.log(`\n${colors.green}Running setup...${colors.reset}\n`);
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