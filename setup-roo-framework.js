#!/usr/bin/env node

/**
 * Enhanced Setup Script for Roo Framework v4.5.1
 * 
 * This script automates the entire setup process for the Roo Framework,
 * including LangChain integration, in a single command.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  dependencies: [
    'langchain@0.1.0',
    '@langchain/openai@0.0.10',
    '@langchain/anthropic@0.0.10',
    '@langchain/community@0.0.10'
  ],
  envVars: {
    USE_LANGCHAIN_MEMORY: 'true',
    ROO_LANGCHAIN_LLM_PROVIDER: 'anthropic',
    ROO_LANGCHAIN_LLM_MODEL: 'claude-3-sonnet-20250219',
    // Use the same provider for embeddings as for LLM by default
    // ROO_LANGCHAIN_EMBEDDING_PROVIDER: 'openai', // Only set if different from LLM provider
    ROO_LANGCHAIN_EMBEDDING_MODEL: 'text-embedding-ada-002'
  }
};

// Helper functions
function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m%s\x1b[0m',    // Cyan
    success: '\x1b[32m%s\x1b[0m',  // Green
    warning: '\x1b[33m%s\x1b[0m',  // Yellow
    error: '\x1b[31m%s\x1b[0m'     // Red
  };
  
  console.log(colors[type], `[Roo Setup] ${message}`);
}

function runCommand(command, errorMessage) {
  try {
    log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    log(errorMessage || `Failed to run command: ${command}`, 'error');
    log(error.message, 'error');
    return false;
  }
}

function updateEnvFile() {
  log('Updating .env file with LangChain configuration...');
  
  const envPath = path.join(process.cwd(), '.env');
  let envContent = '';
  
  // Read existing .env file if it exists
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Add LangChain configuration if not already present
  let updated = false;
  Object.entries(config.envVars).forEach(([key, value]) => {
    if (!envContent.includes(`${key}=`)) {
      envContent += `\n${key}=${value}`;
      updated = true;
    }
  });
  
  if (updated) {
    fs.writeFileSync(envPath, envContent);
    log('Updated .env file with LangChain configuration', 'success');
  } else {
    log('.env file already contains LangChain configuration', 'info');
  }
}

// Main setup process
async function setup() {
  log('Starting Roo Framework v4.5.1 setup with LangChain integration...', 'info');
  
  // Step 1: Install dependencies
  log('Installing required dependencies...');
  const depsToInstall = config.dependencies.join(' ');
  if (!runCommand(`npm install ${depsToInstall} --legacy-peer-deps`, 'Failed to install dependencies')) {
    return;
  }
  
  // Step 2: Update environment variables
  updateEnvFile();
  
  // Step 3: Run framework setup
  log('Running Roo Framework setup...');
  if (!runCommand('npm run setup', 'Failed to run Roo Framework setup')) {
    return;
  }
  
  // Step 4: Set up LangChain
  log('Setting up LangChain integration...');
  if (!runCommand('npm run setup-langchain', 'Failed to set up LangChain')) {
    return;
  }
  
  // Step 5: Generate documentation
  log('Generating Docker documentation...');
  runCommand('npm run docs:generate', 'Failed to generate documentation (non-critical)');
  
  // Step 6: Test LangChain integration
  log('Testing LangChain integration...');
  runCommand('npm run test-langchain', 'LangChain integration test failed (non-critical)');
  
  // Setup complete
  log('Roo Framework v4.5.1 setup with LangChain integration complete!', 'success');
  log('You can now use the framework in your code:', 'info');
  log('const rooFramework = require(\'@sdbingham/roo-framework\');', 'info');
  log('Try running an example: npm run langchain-example', 'info');
}

// Run setup
setup().catch(error => {
  log(`Setup failed: ${error.message}`, 'error');
});