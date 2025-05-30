# LangChain Integration Improvements

## Overview
This document outlines the changes needed to make LangChain the primary memory management system in the Roo Framework with automatic fallback to the original adapter.

## Required Changes

### 1. Memory Controller Updates
Update `roo-framework-package/lib/langchain/memory-controller.js` with an automatic fallback system:

```javascript
// Make LangChain the default unless explicitly disabled
let useLangChain = process.env.USE_ORIGINAL_MEMORY !== 'true' && langchainAvailable;

// Add robust automatic fallback in the proxy handler
return async function(...args) {
  try {
    // Try with the preferred adapter first
    return await preferredAdapter[prop](...args);
  } catch (error) {
    // If we're already using the fallback, just propagate the error
    if (preferredAdapter === fallbackAdapter) {
      console.error(`Memory operation failed: ${prop}`, error);
      throw error;
    }
    
    console.warn(`LangChain adapter operation failed (${prop}): ${error.message}`);
    console.warn('Falling back to original adapter');
    
    // Fall back to the original adapter
    return fallbackAdapter[prop](...args);
  }
};
```

### 2. Add Docker Health Check Script
Create a Docker health check script at `roo-framework-package/scripts/docker-health-check.js`:

```javascript
#!/usr/bin/env node

/**
 * Docker Health Check Script
 * 
 * This script verifies the health of all Docker containers used by the Roo Framework.
 * It checks each container's status and provides diagnostic information.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Containers to check (name patterns)
const CONTAINERS = [
  'roo-weaviate',
  'roo-neo4j',
  'roo-mongodb',
  'roo-chroma'
];

// Get project root directory
const getProjectRoot = () => {
  try {
    // Try to find docker-compose.yml in parent directories
    let currentDir = process.cwd();
    while (currentDir !== path.parse(currentDir).root) {
      if (fs.existsSync(path.join(currentDir, 'docker-compose.yml'))) {
        return currentDir;
      }
      currentDir = path.dirname(currentDir);
    }
    return process.cwd();
  } catch (error) {
    return process.cwd();
  }
};

// Run docker ps command and parse output
function getContainerStatus() {
  try {
    const output = execSync('docker ps -a --format "{{.Names}},{{.Status}},{{.Ports}}"').toString();
    return output.trim().split('\n').map(line => {
      const [name, status, ports] = line.split(',');
      return { name, status, ports };
    });
  } catch (error) {
    console.error('Error running docker ps command:', error.message);
    console.error('Make sure Docker is running and accessible.');
    process.exit(1);
  }
}

// Check if Docker is running
function checkDockerRunning() {
  try {
    execSync('docker info', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Display container health information
function displayContainerHealth(containers) {
  console.log('\n=== Docker Container Health Status ===\n');
  
  let allHealthy = true;
  let foundContainers = 0;
  
  CONTAINERS.forEach(containerPattern => {
    const matchingContainers = containers.filter(c => c.name.includes(containerPattern));
    
    if (matchingContainers.length === 0) {
      console.log(`❌ ${containerPattern}: Not found`);
      allHealthy = false;
      return;
    }
    
    matchingContainers.forEach(container => {
      foundContainers++;
      
      const isRunning = container.status.toLowerCase().includes('up');
      const isHealthy = container.status.toLowerCase().includes('healthy');
      const statusSymbol = isHealthy ? '✅' : (isRunning ? '⚠️' : '❌');
      
      console.log(`${statusSymbol} ${container.name}: ${container.status}`);
      if (container.ports) {
        console.log(`   Ports: ${container.ports}`);
      }
      
      if (!isRunning) {
        allHealthy = false;
        console.log(`   - Container is not running. Try restarting with: docker start ${container.name}`);
      } else if (!isHealthy && container.status.includes('health')) {
        allHealthy = false;
        console.log(`   - Container is running but not healthy`);
      }
    });
  });
  
  if (foundContainers === 0) {
    console.log('No Roo Framework containers found.');
    console.log('Run setup script to create the necessary Docker containers.');
    return false;
  }
  
  return allHealthy;
}

// Check container logs for recent errors
function checkContainerLogs(containerName) {
  try {
    const logs = execSync(`docker logs --tail 10 ${containerName} 2>&1`).toString();
    const hasErrors = logs.toLowerCase().includes('error') || logs.toLowerCase().includes('exception');
    
    if (hasErrors) {
      console.log(`\nRecent errors detected in ${containerName} logs:`);
      const errorLines = logs.split('\n').filter(line => 
        line.toLowerCase().includes('error') || line.toLowerCase().includes('exception')
      );
      errorLines.forEach(line => console.log(`   ${line.substring(0, 100)}${line.length > 100 ? '...' : ''}`));
    }
  } catch (error) {
    console.log(`Unable to check logs for ${containerName}: ${error.message}`);
  }
}

// Main function
async function main() {
  console.log('Running Docker health check for Roo Framework...');
  
  if (!checkDockerRunning()) {
    console.error('❌ Docker is not running. Please start Docker and try again.');
    process.exit(1);
  }
  
  const projectRoot = getProjectRoot();
  console.log(`Project root: ${projectRoot}`);
  
  // Change to project root if docker-compose.yml exists
  if (projectRoot !== process.cwd()) {
    process.chdir(projectRoot);
    console.log(`Changed working directory to: ${projectRoot}`);
  }
  
  const containers = getContainerStatus();
  const allHealthy = displayContainerHealth(containers);
  
  // Check logs for unhealthy containers
  if (!allHealthy) {
    console.log('\n=== Container Logs (Last 10 Lines) ===');
    containers.forEach(container => {
      if (CONTAINERS.some(pattern => container.name.includes(pattern))) {
        if (!container.status.toLowerCase().includes('up') || 
            (container.status.includes('health') && !container.status.toLowerCase().includes('healthy'))) {
          checkContainerLogs(container.name);
        }
      }
    });
  }
  
  console.log('\n=== Summary ===');
  if (allHealthy) {
    console.log('✅ All Roo Framework containers are healthy and running.');
    process.exit(0);
  } else {
    console.log('⚠️ Some Roo Framework containers have issues.');
    console.log('Run "docker-compose up -d" to restart all containers.');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
```

### 3. Update Package Scripts
Update `roo-framework-package/package.json` to include the Docker health check script:

```json
"scripts": {
  "docker:health": "node ./scripts/docker-health-check.js",
  "docker:start": "docker-compose up -d",
  "docker:stop": "docker-compose down",
  "docker:restart": "docker-compose down && docker-compose up -d"
}
```

### 4. Make LangChain Installation Automatic
Update `roo-framework-package/scripts/setup.js` to make LangChain installation automatic:

```javascript
// Replace the interactive prompts with automatic installation
async function setupLangChain() {
  console.log('Setting up LangChain integration (automatic)...');
  
  // Install dependencies without prompting
  console.log('Installing LangChain dependencies...');
  try {
    execSync('npm install --save langchain @langchain/community @langchain/openai @langchain/anthropic', {
      stdio: 'inherit'
    });
    console.log('✅ LangChain dependencies installed successfully');
    
    // Add API key prompts but make them optional
    const anthropicKey = await promptForInput('Anthropic API Key (optional, press Enter to skip): ');
    const openAIKey = await promptForInput('OpenAI API Key (optional, press Enter to skip): ');
    
    if (anthropicKey) {
      addToEnvFile('ANTHROPIC_API_KEY', anthropicKey);
      console.log('Added Anthropic API key to environment configuration');
    }
    
    if (openAIKey) {
      addToEnvFile('OPENAI_API_KEY', openAIKey);
      console.log('Added OpenAI API key to environment configuration');
    }
    
    if (!anthropicKey && !openAIKey) {
      console.log('⚠️ No API keys provided. LangChain will use fallback mechanisms until keys are added.');
      console.log('You can add API keys later by editing the .env file');
    }
    
    return true;
  } catch (error) {
    console.error('Error installing LangChain dependencies:', error.message);
    console.log('⚠️ LangChain setup encountered issues but will continue with limited functionality');
    return false;
  }
}
```

## Implementation Strategy

1. First implement the Docker health check script and package.json updates
2. Update the setup script to make LangChain installation automatic
3. Implement the memory controller changes to prioritize LangChain
4. Test all functionality thoroughly

This implementation will make LangChain the default memory system while ensuring robust fallback to the original adapter when needed.