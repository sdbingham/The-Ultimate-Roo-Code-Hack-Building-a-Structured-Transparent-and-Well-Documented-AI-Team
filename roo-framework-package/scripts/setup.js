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

// Check for non-interactive mode
const args = process.argv.slice(2);
const nonInteractiveMode = args.includes('--non-interactive');
const autoStartDocker = args.includes('--start-docker');
const skipLangChain = args.includes('--skip-langchain');

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

// Default to current working directory
let projectRoot = process.cwd();

// Create readline interface for user input if not in non-interactive mode
const rl = nonInteractiveMode ? null : readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if (nonInteractiveMode) {
  console.log(`${colors.bright}Running in non-interactive mode${colors.reset}`);
  console.log(`${colors.green}Using current directory as project root: ${projectRoot}${colors.reset}`);
  setupRooFramework(projectRoot);
} else {
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
}

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
      if (!nonInteractiveMode && rl) {
        rl.close();
      }
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
    
    // Handle Docker setup
    if (nonInteractiveMode) {
      if (autoStartDocker) {
        console.log(`\n${colors.bright}Docker Setup (Automatic):${colors.reset}`);
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
          
          // Start Docker containers
          exec('docker compose up -d', { cwd: projectRoot }, (error, stdout, stderr) => {
            if (error) {
              console.log(`${colors.red}❌ Error starting Docker containers:${colors.reset}`);
              console.log(stderr);
            } else {
              console.log(`${colors.green}✓ Docker containers started successfully!${colors.reset}`);
              console.log(`${colors.dim}${stdout}${colors.reset}`);
            }
            setupLangChain();
          });
        });
      } else {
        console.log(`\n${colors.yellow}Skipping Docker container startup (non-interactive mode).${colors.reset}`);
        setupLangChain();
      }
    } else {
      // Interactive mode - ask user
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
    }
    
  } catch (error) {
    console.error(`\n${colors.red}❌ Error during Roo framework setup:${colors.reset}`);
    console.error(error);
    if (!nonInteractiveMode && rl) {
      rl.close();
    }
    process.exit(1);
  }
}

// Function to set up LangChain integration
function setupLangChain() {
  // Skip LangChain setup if explicitly specified with --skip-langchain flag
  if (skipLangChain) {
    console.log(`\n${colors.yellow}Skipping LangChain integration setup (--skip-langchain flag).${colors.reset}`);
    finishSetup(false);
    return;
  }

  console.log(`\n${colors.bright}LangChain Integration Setup (Automatic):${colors.reset}`);
  console.log(`${colors.cyan}Setting up LangChain integration...${colors.reset}`);
  
  // Create .env file if it doesn't exist
  const envPath = path.join(projectRoot, '.env');
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, `# Roo Framework Environment Variables

# LangChain API Keys
# ANTHROPIC_API_KEY=your_anthropic_api_key
# OPENAI_API_KEY=your_openai_api_key

# Memory System Configuration
# LangChain is used by default, set to 'true' to force original memory adapter
# USE_ORIGINAL_MEMORY=false
`);
    console.log(`${colors.green}✓ Created .env file with LangChain configuration${colors.reset}`);
  } else {
    // Append/update LangChain configuration to existing .env file if needed
    let envContent = fs.readFileSync(envPath, 'utf8');
    let updated = false;
    
    // Add API key configuration if not present
    if (!envContent.includes('ANTHROPIC_API_KEY') && !envContent.includes('OPENAI_API_KEY')) {
      envContent += `\n# LangChain API Keys\n# ANTHROPIC_API_KEY=your_anthropic_api_key\n# OPENAI_API_KEY=your_openai_api_key\n`;
      updated = true;
    }
    
    // Update memory configuration:
    // - If USE_LANGCHAIN_MEMORY exists, rename to USE_ORIGINAL_MEMORY with inverted value
    // - If neither exists, add USE_ORIGINAL_MEMORY=false
    if (envContent.includes('USE_LANGCHAIN_MEMORY=true')) {
      envContent = envContent.replace(/USE_LANGCHAIN_MEMORY=true/g, '# USE_LANGCHAIN_MEMORY=true (Deprecated)\n# LangChain is now the default memory system\n# USE_ORIGINAL_MEMORY=false');
      updated = true;
    } else if (envContent.includes('USE_LANGCHAIN_MEMORY=false')) {
      envContent = envContent.replace(/USE_LANGCHAIN_MEMORY=false/g, '# USE_LANGCHAIN_MEMORY=false (Deprecated)\n# LangChain is now the default memory system\n# USE_ORIGINAL_MEMORY=true');
      updated = true;
    } else if (!envContent.includes('USE_ORIGINAL_MEMORY')) {
      envContent += `\n# Memory System Configuration\n# LangChain is used by default, set to 'true' to force original memory adapter\n# USE_ORIGINAL_MEMORY=false\n`;
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(envPath, envContent);
      console.log(`${colors.green}✓ Updated .env file with LangChain configuration${colors.reset}`);
    }
  }
  
  // Install LangChain dependencies automatically
  console.log(`\n${colors.cyan}Installing LangChain dependencies...${colors.reset}`);
  console.log(`${colors.dim}This may take a few minutes.${colors.reset}`);
  
  // We use --legacy-peer-deps because some LangChain dependencies may have peer dependency conflicts
  exec('npm install langchain@0.1.0 @langchain/openai@0.0.10 @langchain/anthropic@0.0.10 @langchain/community@0.0.10 --legacy-peer-deps', { cwd: projectRoot }, (error, stdout, stderr) => {
    if (error) {
      console.log(`${colors.red}❌ Error installing LangChain dependencies:${colors.reset}`);
      console.log(`${colors.dim}${stderr}${colors.reset}`);
      console.log(`${colors.yellow}You can try installing them manually:${colors.reset}`);
      console.log(`${colors.dim}npm install langchain@0.1.0 @langchain/openai@0.0.10 @langchain/anthropic@0.0.10 @langchain/community@0.0.10 --legacy-peer-deps${colors.reset}`);
    } else {
      console.log(`${colors.green}✓ LangChain dependencies installed successfully!${colors.reset}`);
    }
    
    // Prompt for API keys
    if (nonInteractiveMode) {
      finishSetup(true);
    } else {
      console.log(`\n${colors.bright}LangChain API Key Setup:${colors.reset}`);
      console.log(`${colors.yellow}LangChain requires API keys for enhanced functionality.${colors.reset}`);
      
      rl.question(`${colors.yellow}Enter your Anthropic API key (optional, press Enter to skip): ${colors.reset}`, (anthropicKey) => {
        if (anthropicKey && anthropicKey.trim()) {
          updateEnvFile(envPath, 'ANTHROPIC_API_KEY', anthropicKey.trim());
          console.log(`${colors.green}✓ Added Anthropic API key to .env file${colors.reset}`);
        }
        
        rl.question(`${colors.yellow}Enter your OpenAI API key (optional, press Enter to skip): ${colors.reset}`, (openaiKey) => {
          if (openaiKey && openaiKey.trim()) {
            updateEnvFile(envPath, 'OPENAI_API_KEY', openaiKey.trim());
            console.log(`${colors.green}✓ Added OpenAI API key to .env file${colors.reset}`);
          }
          
          if (!anthropicKey.trim() && !openaiKey.trim()) {
            console.log(`${colors.yellow}No API keys provided. Some LangChain features will use fallback methods.${colors.reset}`);
            console.log(`${colors.yellow}You can add API keys later by editing the .env file.${colors.reset}`);
          }
          
          finishSetup(true);
        });
      });
    }
  });
}

// Helper function to update a specific value in the .env file
function updateEnvFile(envPath, key, value) {
  let envContent = fs.readFileSync(envPath, 'utf8');
  const regex = new RegExp(`^#?\\s*${key}=.*$`, 'm');
  
  if (regex.test(envContent)) {
    // Replace existing line (commented or not)
    envContent = envContent.replace(regex, `${key}=${value}`);
  } else {
    // Add new line
    envContent += `\n${key}=${value}`;
  }
  
  fs.writeFileSync(envPath, envContent);
}

// Function to display final setup information
function finishSetup(langchainSetup) {
  console.log(`\n${colors.cyan}Next steps:${colors.reset}`);
  console.log(`1. Check Docker container health: ${colors.dim}npm run docker:health${colors.reset}`);
  console.log(`2. Access the framework in your code: ${colors.dim}const rooFramework = require('@sdbingham/roo-framework');${colors.reset}`);
  console.log(`3. Use memory for knowledge management: ${colors.dim}rooFramework.memory.createMemoryAsset(...)${colors.reset}`);
  console.log(`4. Use boomerang for task tracking: ${colors.dim}rooFramework.boomerang.createTask(...)${colors.reset}`);
  
  if (langchainSetup) {
    console.log(`\n${colors.cyan}LangChain Integration:${colors.reset}`);
    console.log(`1. LangChain is now the default memory system${colors.reset}`);
    console.log(`2. Add your API keys in .env file: ${colors.dim}ANTHROPIC_API_KEY=your_api_key${colors.reset}`);
    console.log(`3. If needed, revert to original memory: ${colors.dim}USE_ORIGINAL_MEMORY=true${colors.reset}`);
    console.log(`4. Run example: ${colors.dim}npm run langchain-example${colors.reset}`);
  }
  
  // Only close readline interface if in interactive mode
  if (!nonInteractiveMode && rl) {
    rl.close();
  }
}