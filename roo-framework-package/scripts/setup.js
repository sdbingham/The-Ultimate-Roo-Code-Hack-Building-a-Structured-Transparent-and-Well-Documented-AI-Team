#!/usr/bin/env node

/**
 * Roo Framework Setup Script
 *
 * This script sets up the necessary directory structure and configuration files
 * for the Roo Framework in the user's project.
 *
 * It performs a complete setup:
 * 1. Creates all required files and directories
 * 2. Sets up boomerang state tracking
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');
const rooFramework = require('../index');

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

// Print banner
console.log(`
${colors.bright}${colors.blue}╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  ${colors.cyan}Roo Framework Setup${colors.blue}                                   ║
║  ${colors.dim}Structured, Transparent, and Well-Documented AI Team${colors.blue}  ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝${colors.reset}
`);

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Default to current working directory
let projectRoot = process.cwd();

// Ask user to confirm project root
console.log(`${colors.bright}Project Root Detection:${colors.reset}`);
console.log(`Detected current directory: ${projectRoot}`);

// Ask user to confirm or change project root
rl.question(`${colors.yellow}Is this the correct project root? (Y/n) ${colors.reset}`, (answer) => {
  if (answer.toLowerCase() === 'n' || answer.toLowerCase() === 'no') {
    rl.question(`${colors.yellow}Please enter the full path to your project root: ${colors.reset}`, (customPath) => {
      projectRoot = customPath.trim();
      console.log(`${colors.green}Using custom project root: ${projectRoot}${colors.reset}`);
      setupRooFramework(projectRoot);
    });
  } else {
    console.log(`${colors.green}Using current directory as project root${colors.reset}`);
    setupRooFramework(projectRoot);
  }
});

// Setup function with error handling
function setupRooFramework(projectRoot) {
  try {
    console.log(`\n${colors.bright}Setting up Roo Framework in: ${projectRoot}${colors.reset}\n`);
    
    // Verify we have write permissions to the project root
    try {
      const testFile = path.join(projectRoot, '.roo-test-permissions');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      console.log(`${colors.green}✓ Verified write permissions to project root${colors.reset}`);
    } catch (permError) {
      console.error(`${colors.red}❌ Error: No write permissions to project root ${projectRoot}${colors.reset}`);
      console.error(`${colors.red}Please run this script with appropriate permissions or choose a different directory.${colors.reset}`);
      rl.close();
      process.exit(1);
    }

    // Copy .roomodes to project root if it doesn't exist
    const roomodesSource = path.join(__dirname, '..', '.roomodes');
    const roomodesTarget = path.join(projectRoot, '.roomodes');

    if (!fs.existsSync(roomodesTarget)) {
      fs.copyFileSync(roomodesSource, roomodesTarget);
      console.log(`${colors.green}✓ Created .roomodes file in project root${colors.reset}`);
    } else {
      console.log(`${colors.yellow}ℹ .roomodes file already exists${colors.reset}`);
    }

    // Create complete .roo directory structure
    const directories = [
      // Basic structure
      '.roo',
      '.roo/logs',
      
      // Mode-specific logs
      '.roo/logs/orchestrator',
      '.roo/logs/code',
      '.roo/logs/architect',
      '.roo/logs/ask',
      '.roo/logs/debug',
      '.roo/logs/memory',
      '.roo/logs/deep-research',
      
      // Memory structure
      '.roo/memory',
      '.roo/memory/indices',
      '.roo/memory/assets'
    ];
    
    // Create directories
    let createdDirs = 0;
    directories.forEach(dir => {
      const dirPath = path.join(projectRoot, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        createdDirs++;
      }
    });
    
    console.log(`${colors.green}✓ Created ${createdDirs} directories in .roo structure${colors.reset}`);

    // Create boomerang state file if it doesn't exist
    const boomerangPath = path.join(projectRoot, '.roo', 'boomerang-state.json');
    if (!fs.existsSync(boomerangPath)) {
      fs.writeFileSync(boomerangPath, JSON.stringify({
        "tasks": {},
        "transitions": [],
        "version": "1.0.0"
      }, null, 2));
      console.log(`${colors.green}✓ Created boomerang-state.json file${colors.reset}`);
    } else {
      console.log(`${colors.yellow}ℹ boomerang-state.json already exists${colors.reset}`);
    }
    
    // Create docker-compose.yml file if it doesn't exist
    const dockerComposePath = path.join(projectRoot, 'docker-compose.yml');
    if (!fs.existsSync(dockerComposePath)) {
      const dockerComposeContent = `services:
  weaviate:
    image: semitechnologies/weaviate:1.19.6
    ports:
      - "9081:8080"
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      DEFAULT_VECTORIZER_MODULE: 'none'
      CLUSTER_HOSTNAME: 'node1'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
    volumes:
      - weaviate_data:/var/lib/weaviate
    deploy:
      resources:
        limits:
          memory: \${WEAVIATE_MEMORY_LIMIT:-2G}
          cpus: \${WEAVIATE_CPU_LIMIT:-1}
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--spider", "http://localhost:8080/v1/.well-known/ready"]
      interval: 10s
      timeout: 5s
      retries: 5

  neo4j:
    image: neo4j:5.9.0
    ports:
      - "9475:7474"
      - "9687:7687"
    environment:
      NEO4J_AUTH: neo4j/password
      NEO4J_dbms_memory_pagecache_size: \${NEO4J_MEMORY_PAGECACHE:-512M}
      NEO4J_dbms_memory_heap_initial__size: \${NEO4J_MEMORY_HEAP_INITIAL:-512M}
      NEO4J_dbms_memory_heap_max__size: \${NEO4J_MEMORY_HEAP_MAX:-1G}
    volumes:
      - neo4j_data:/data
    deploy:
      resources:
        limits:
          memory: \${NEO4J_MEMORY_LIMIT:-2G}
          cpus: \${NEO4J_CPU_LIMIT:-1}
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--spider", "http://localhost:7474"]
      interval: 10s
      timeout: 5s
      retries: 5

  mongodb:
    image: mongo:6.0
    ports:
      - "29017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: rootpassword
    command: ["--auth", "--bind_ip_all", "--wiredTigerCacheSizeGB", "1"]
    volumes:
      - mongodb_data:/data/db
      - mongodb_config:/data/configdb
    deploy:
      resources:
        limits:
          memory: \${MONGODB_MEMORY_LIMIT:-1G}
          cpus: \${MONGODB_CPU_LIMIT:-1}
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  chroma:
    image: ghcr.io/chroma-core/chroma:0.5.3
    ports:
      - "9001:8000"
    environment:
      CHROMA_SERVER_AUTH_CREDENTIALS_PROVIDER: token
      CHROMA_SERVER_AUTH_CREDENTIALS: \${ROO_CHROMA_AUTH_TOKEN:-admin_token}
      CHROMA_SERVER_AUTH_PROVIDER: token
      ALLOW_RESET: 'true'
      CHROMA_OTEL_EXPORTER_ENDPOINT: ''
      CHROMA_OTEL_SERVICE_NAME: 'chroma'
      CHROMA_OTEL_COLLECTION_ENDPOINT: ''
      NUMPY_EXPERIMENTAL_ARRAY_FUNCTION: '1'
    volumes:
      - chroma_data:/chroma/chroma
    deploy:
      resources:
        limits:
          memory: \${CHROMA_MEMORY_LIMIT:-1G}
          cpus: \${CHROMA_CPU_LIMIT:-1}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/api/v1/heartbeat"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  weaviate_data:
  neo4j_data:
  mongodb_data:
  mongodb_config:
  chroma_data:`;
      
      fs.writeFileSync(dockerComposePath, dockerComposeContent);
      console.log(`${colors.green}✓ Created docker-compose.yml file${colors.reset}`);
    } else {
      console.log(`${colors.yellow}ℹ docker-compose.yml already exists${colors.reset}`);
    }

    // Verify setup was successful
    const verificationPaths = [
      path.join(projectRoot, '.roomodes'),
      path.join(projectRoot, '.roo', 'boomerang-state.json'),
      path.join(projectRoot, 'docker-compose.yml')
    ];
    
    const missingPaths = verificationPaths.filter(p => !fs.existsSync(p));
    
    if (missingPaths.length === 0) {
      console.log(`\n${colors.green}${colors.bright}✓ Roo framework setup completed successfully!${colors.reset}`);
    } else {
      console.log(`\n${colors.yellow}⚠ Roo framework setup partially completed. The following files are missing:${colors.reset}`);
      missingPaths.forEach(p => console.log(`  - ${p}`));
      console.log(`\n${colors.yellow}Please check permissions and try running the setup again.${colors.reset}`);
    }
    
    // Always ask if user wants to start Docker containers, regardless of verification
    console.log(`\n${colors.bright}Docker Setup:${colors.reset}`);
    console.log(`The framework requires database servers for full functionality.`);
    rl.question(`${colors.yellow}Do you want to start the required database servers using Docker? (Y/n) ${colors.reset}`, (answer) => {
      if (answer.toLowerCase() !== 'n' && answer.toLowerCase() !== 'no') {
        console.log(`\n${colors.cyan}Starting Docker containers...${colors.reset}`);
        
        // Check if Docker is installed
        exec('docker --version', (error) => {
          if (error) {
            console.log(`${colors.red}❌ Docker is not installed or not in PATH.${colors.reset}`);
            console.log(`${colors.yellow}Please install Docker and Docker Compose, then run:${colors.reset}`);
            console.log(`${colors.dim}cd ${projectRoot} && docker compose up -d${colors.reset}`);
            setupLangChain();
            return;
          }
          
          // Start Docker containers - use 'docker compose' instead of 'docker-compose'
          // as 'docker-compose' is deprecated
          exec('docker compose up -d', { cwd: projectRoot }, (error, stdout, stderr) => {
            if (error) {
              console.log(`${colors.red}❌ Error starting Docker containers:${colors.reset}`);
              console.log(stderr);
              console.log(`${colors.yellow}Please start them manually:${colors.reset}`);
              console.log(`${colors.dim}cd ${projectRoot} && docker compose up -d${colors.reset}`);
            } else {
              console.log(`${colors.green}✓ Docker containers started successfully!${colors.reset}`);
              console.log(`${colors.dim}${stdout}${colors.reset}`);
            }
            setupLangChain();
          });
        });
      } else {
        console.log(`\n${colors.yellow}Skipping Docker container startup.${colors.reset}`);
        console.log(`${colors.yellow}To start the containers manually, run:${colors.reset}`);
        console.log(`${colors.dim}cd ${projectRoot} && docker compose up -d${colors.reset}`);
        setupLangChain();
      }
    });
    
  } catch (error) {
    console.error(`\n${colors.red}❌ Error during Roo framework setup:${colors.reset}`);
    console.error(error);
    rl.close();
    process.exit(1);
  }
}

// Function to set up LangChain integration
function setupLangChain() {
  console.log(`\n${colors.bright}LangChain Integration Setup:${colors.reset}`);
  console.log(`The framework supports LangChain integration for enhanced memory capabilities.`);
  rl.question(`${colors.yellow}Do you want to set up LangChain integration? (Y/n) ${colors.reset}`, (answer) => {
    if (answer.toLowerCase() !== 'n' && answer.toLowerCase() !== 'no') {
      console.log(`\n${colors.cyan}Setting up LangChain integration...${colors.reset}`);
      
      // Create .env file if it doesn't exist
      const envPath = path.join(projectRoot, '.env');
      if (!fs.existsSync(envPath)) {
        fs.writeFileSync(envPath, `# Roo Framework Environment Variables\n\n# LangChain API Keys\n# ANTHROPIC_API_KEY=your_anthropic_api_key\n# OPENAI_API_KEY=your_openai_api_key\n\n# LangChain Configuration\nUSE_LANGCHAIN_MEMORY=false\n`);
        console.log(`${colors.green}✓ Created .env file with LangChain configuration${colors.reset}`);
      } else {
        // Append LangChain configuration to existing .env file if not already present
        let envContent = fs.readFileSync(envPath, 'utf8');
        if (!envContent.includes('ANTHROPIC_API_KEY') && !envContent.includes('OPENAI_API_KEY')) {
          envContent += `\n# LangChain API Keys\n# ANTHROPIC_API_KEY=your_anthropic_api_key\n# OPENAI_API_KEY=your_openai_api_key\n`;
          fs.writeFileSync(envPath, envContent);
          console.log(`${colors.green}✓ Added LangChain API key configuration to .env file${colors.reset}`);
        }
        if (!envContent.includes('USE_LANGCHAIN_MEMORY')) {
          envContent += `\n# LangChain Configuration\nUSE_LANGCHAIN_MEMORY=false\n`;
          fs.writeFileSync(envPath, envContent);
          console.log(`${colors.green}✓ Added LangChain configuration to .env file${colors.reset}`);
        }
      }
      
      // Ask if user wants to install LangChain dependencies
      rl.question(`${colors.yellow}Do you want to install LangChain dependencies now? (Y/n) ${colors.reset}`, (installAnswer) => {
        if (installAnswer.toLowerCase() !== 'n' && installAnswer.toLowerCase() !== 'no') {
          console.log(`\n${colors.cyan}Installing LangChain dependencies...${colors.reset}`);
          console.log(`${colors.dim}This may take a few minutes.${colors.reset}`);
          
          // Install LangChain dependencies
          exec('npm install langchain @langchain/openai @langchain/anthropic @langchain/community', { cwd: projectRoot }, (error, stdout, stderr) => {
            if (error) {
              console.log(`${colors.red}❌ Error installing LangChain dependencies:${colors.reset}`);
              console.log(stderr);
              console.log(`${colors.yellow}Please install them manually:${colors.reset}`);
              console.log(`${colors.dim}npm install langchain @langchain/openai @langchain/anthropic @langchain/community${colors.reset}`);
            } else {
              console.log(`${colors.green}✓ LangChain dependencies installed successfully!${colors.reset}`);
            }
            finishSetup(true);
          });
        } else {
          console.log(`\n${colors.yellow}Skipping LangChain dependency installation.${colors.reset}`);
          console.log(`${colors.yellow}To install them manually, run:${colors.reset}`);
          console.log(`${colors.dim}npm install langchain @langchain/openai @langchain/anthropic @langchain/community${colors.reset}`);
          finishSetup(true);
        }
      });
    } else {
      console.log(`\n${colors.yellow}Skipping LangChain integration setup.${colors.reset}`);
      finishSetup(false);
    }
  });
}

// Function to display final setup information
function finishSetup(langchainSetup) {
  console.log(`\n${colors.cyan}Next steps:${colors.reset}`);
  console.log(`1. Generate environment variables example: ${colors.dim}npm run env:generate${colors.reset}`);
  console.log(`2. Generate Docker documentation: ${colors.dim}npm run docs:generate${colors.reset}`);
  console.log(`3. Check Docker container health: ${colors.dim}npm run docker:health${colors.reset}`);
  console.log(`4. Access the framework in your code: ${colors.dim}const rooFramework = require('@sdbingham/roo-framework');${colors.reset}`);
  console.log(`5. Use memory for knowledge management: ${colors.dim}rooFramework.memory.createMemoryAsset(...)${colors.reset}`);
  console.log(`6. Use boomerang for task tracking: ${colors.dim}rooFramework.boomerang.createTask(...)${colors.reset}`);
  
  if (langchainSetup) {
    console.log(`\n${colors.cyan}LangChain Integration:${colors.reset}`);
    console.log(`1. Configure your API keys in .env file: ${colors.dim}ANTHROPIC_API_KEY=your_api_key${colors.reset}`);
    console.log(`2. Enable LangChain integration: ${colors.dim}USE_LANGCHAIN_MEMORY=true${colors.reset}`);
    console.log(`3. Run LangChain integration test: ${colors.dim}npm run test-langchain${colors.reset}`);
    console.log(`4. Try the LangChain example: ${colors.dim}npm run langchain-example${colors.reset}`);
    console.log(`5. Access LangChain memory controller: ${colors.dim}const memoryController = rooFramework.memoryController;${colors.reset}`);
  }
  
  rl.close();
}