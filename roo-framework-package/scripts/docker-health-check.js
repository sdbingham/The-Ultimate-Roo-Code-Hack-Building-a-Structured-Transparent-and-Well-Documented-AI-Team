#!/usr/bin/env node

/**
 * Roo Framework Docker Health Check Script
 *
 * This script verifies that all Docker containers required by the Roo Framework
 * are running correctly and provides troubleshooting guidance for any issues.
 *
 * Usage:
 *   npx roo-framework docker-health
 *
 * Features:
 * - Checks if Docker and Docker Compose are installed
 * - Verifies docker-compose.yml file exists
 * - Checks status of all containers (running/stopped)
 * - Verifies container health checks
 * - Checks container logs for errors
 * - Tests connectivity to each container
 * - Provides specific troubleshooting guidance for each container
 *
 * Container-specific checks:
 * - Weaviate: Verifies the vector database is accessible on port 8080
 * - Neo4j: Verifies the graph database is accessible on ports 7474 and 7687
 * - MongoDB: Verifies the document database is accessible on port 27017
 * - Chroma: Verifies the vector database is accessible on port 8000
 *
 * Troubleshooting:
 * If issues are found, the script provides specific guidance for resolving them,
 * including commands to restart containers, check logs, and verify configurations.
 */

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

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
function printBanner() {
  console.log(`
${colors.bright}${colors.blue}╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  ${colors.cyan}Roo Framework Docker Health Check${colors.blue}                    ║
║  ${colors.dim}Verify Container Status and Configuration${colors.blue}            ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝${colors.reset}
  `);
}

// Get project root
function getProjectRoot() {
  return process.cwd();
}

// Check if Docker is installed
function checkDockerInstallation() {
  return new Promise((resolve, reject) => {
    exec('docker --version', (error, stdout, stderr) => {
      if (error) {
        console.log(`${colors.red}❌ Docker is not installed or not in PATH.${colors.reset}`);
        console.log(`${colors.yellow}Please install Docker and Docker Compose before continuing.${colors.reset}`);
        reject(new Error('Docker not installed'));
        return;
      }
      
      console.log(`${colors.green}✓ Docker is installed: ${colors.dim}${stdout.trim()}${colors.reset}`);
      resolve();
    });
  });
}

// Check if Docker Compose is installed
function checkDockerComposeInstallation() {
  return new Promise((resolve, reject) => {
    exec('docker compose version', (error, stdout, stderr) => {
      if (error) {
        console.log(`${colors.red}❌ Docker Compose is not installed or not in PATH.${colors.reset}`);
        console.log(`${colors.yellow}Please install Docker Compose before continuing.${colors.reset}`);
        reject(new Error('Docker Compose not installed'));
        return;
      }
      
      console.log(`${colors.green}✓ Docker Compose is installed: ${colors.dim}${stdout.trim()}${colors.reset}`);
      resolve();
    });
  });
}

// Check if docker-compose.yml exists
function checkDockerComposeFile() {
  const projectRoot = getProjectRoot();
  const dockerComposePath = path.join(projectRoot, 'docker-compose.yml');
  
  if (!fs.existsSync(dockerComposePath)) {
    console.log(`${colors.red}❌ docker-compose.yml not found in ${projectRoot}${colors.reset}`);
    console.log(`${colors.yellow}Please run the setup script to create the docker-compose.yml file:${colors.reset}`);
    console.log(`${colors.dim}npx @sdbingham/roo-framework setup${colors.reset}`);
    return false;
  }
  
  console.log(`${colors.green}✓ docker-compose.yml found in ${projectRoot}${colors.reset}`);
  return true;
}

// Check container status
function checkContainerStatus() {
  return new Promise((resolve, reject) => {
    exec('docker compose ps --format json', { cwd: getProjectRoot() }, (error, stdout, stderr) => {
      if (error) {
        console.log(`${colors.red}❌ Error checking container status: ${error.message}${colors.reset}`);
        reject(error);
        return;
      }
      
      try {
        // Check if stdout is empty or whitespace only
        if (!stdout || stdout.trim() === '') {
          console.log(`${colors.yellow}⚠ No containers are running.${colors.reset}`);
          console.log(`${colors.yellow}Please start the containers:${colors.reset}`);
          console.log(`${colors.dim}docker compose up -d${colors.reset}`);
          resolve({ running: false, containers: [] });
          return;
        }
        
        // Parse the JSON output
        let containers;
        try {
          containers = JSON.parse(stdout);
        } catch (parseError) {
          // Try alternative approach with docker compose ps without JSON format
          console.log(`${colors.yellow}⚠ Could not parse JSON output. Trying alternative approach...${colors.reset}`);
          exec('docker compose ps', { cwd: getProjectRoot() }, (error, altStdout, stderr) => {
            if (error) {
              console.log(`${colors.red}❌ Error checking container status: ${error.message}${colors.reset}`);
              reject(error);
              return;
            }
            
            if (!altStdout || altStdout.trim() === '') {
              console.log(`${colors.yellow}⚠ No containers are running.${colors.reset}`);
              console.log(`${colors.yellow}Please start the containers:${colors.reset}`);
              console.log(`${colors.dim}docker compose up -d${colors.reset}`);
              resolve({ running: false, containers: [] });
              return;
            }
            
            console.log(`${colors.yellow}⚠ Using basic container status information (JSON format not supported).${colors.reset}`);
            console.log(`${colors.dim}${altStdout}${colors.reset}`);
            
            // Simple parsing of docker compose ps output
            const lines = altStdout.split('\n').filter(line => line.trim() !== '');
            // Skip header line
            const containerLines = lines.slice(1);
            
            const containers = {};
            containerLines.forEach(line => {
              const parts = line.split(/\s+/);
              if (parts.length >= 3) {
                const name = parts[0];
                const isRunning = line.includes('running') || line.includes('Up');
                containers[name] = { isRunning, health: 'N/A' };
              }
            });
            
            resolve({ running: Object.values(containers).some(c => c.isRunning), containers });
          });
          return;
        }
        
        if (containers.length === 0) {
          console.log(`${colors.yellow}⚠ No containers are running.${colors.reset}`);
          console.log(`${colors.yellow}Please start the containers:${colors.reset}`);
          console.log(`${colors.dim}docker compose up -d${colors.reset}`);
          resolve({ running: false, containers: [] });
          return;
        }
        
        console.log(`\n${colors.bright}Container Status:${colors.reset}`);
        
        const containerStatus = {};
        let allRunning = true;
        
        containers.forEach(container => {
          const name = container.Service;
          const isRunning = container.State === 'running';
          const health = container.Health || 'N/A';
          
          containerStatus[name] = { isRunning, health };
          
          if (isRunning) {
            if (health === 'healthy') {
              console.log(`${colors.green}✓ ${name}: ${colors.reset}${colors.green}Running (Healthy)${colors.reset}`);
            } else if (health === 'unhealthy') {
              console.log(`${colors.red}✗ ${name}: ${colors.reset}${colors.red}Running (Unhealthy)${colors.reset}`);
              allRunning = false;
            } else {
              console.log(`${colors.yellow}⚠ ${name}: ${colors.reset}${colors.yellow}Running (Health: ${health})${colors.reset}`);
            }
          } else {
            console.log(`${colors.red}✗ ${name}: ${colors.reset}${colors.red}Not Running (${container.State})${colors.reset}`);
            allRunning = false;
          }
        });
        
        resolve({ running: allRunning, containers: containerStatus });
      } catch (error) {
        console.log(`${colors.red}❌ Error checking container status: ${error.message}${colors.reset}`);
        
        // Check if Docker is running
        exec('docker info', (infoError) => {
          if (infoError) {
            console.log(`${colors.red}❌ Docker daemon is not running. Please start Docker Desktop or Docker service.${colors.reset}`);
            console.log(`${colors.yellow}After starting Docker, run this script again.${colors.reset}`);
          } else {
            console.log(`${colors.yellow}⚠ Docker is running, but there was an error checking containers.${colors.reset}`);
            console.log(`${colors.yellow}Try starting the containers manually:${colors.reset}`);
            console.log(`${colors.dim}docker compose up -d${colors.reset}`);
          }
          reject(error);
        });
      }
    });
  });
}

// Check container logs for errors
function checkContainerLogs(serviceName) {
  return new Promise((resolve, reject) => {
    exec(`docker compose logs --tail=50 ${serviceName}`, { cwd: getProjectRoot() }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      
      // Look for common error patterns
      const errorPatterns = [
        'Error:', 
        'Exception:', 
        'fatal:', 
        'Failed to', 
        'Could not',
        'Connection refused',
        'Permission denied'
      ];
      
      const errors = [];
      
      stdout.split('\n').forEach(line => {
        for (const pattern of errorPatterns) {
          if (line.includes(pattern)) {
            errors.push(line.trim());
            break;
          }
        }
      });
      
      resolve({ containerName: serviceName, errors });
    });
  });
}

// Check all container logs
async function checkAllContainerLogs(containers) {
  console.log(`\n${colors.bright}Checking Container Logs for Errors:${colors.reset}`);
  
  // Map container names to service names
  const serviceNames = ['weaviate', 'neo4j', 'mongodb', 'chroma'];
  const logPromises = serviceNames.map(name => checkContainerLogs(name));
  
  try {
    const results = await Promise.all(logPromises);
    
    let hasErrors = false;
    
    results.forEach(result => {
      if (result.errors.length > 0) {
        hasErrors = true;
        console.log(`${colors.yellow}⚠ ${result.containerName} has errors in logs:${colors.reset}`);
        result.errors.slice(0, 5).forEach(error => {
          console.log(`  ${colors.dim}${error}${colors.reset}`);
        });
        if (result.errors.length > 5) {
          console.log(`  ${colors.dim}... and ${result.errors.length - 5} more errors${colors.reset}`);
        }
      } else {
        console.log(`${colors.green}✓ ${result.containerName}: No errors found in logs${colors.reset}`);
      }
    });
    
    return hasErrors;
  } catch (error) {
    console.log(`${colors.red}❌ Error checking container logs: ${error.message}${colors.reset}`);
    return true;
  }
}

// Check container connectivity
function checkContainerConnectivity() {
  console.log(`\n${colors.bright}Checking Container Connectivity:${colors.reset}`);
  
  // First check if Docker is running
  return new Promise((resolve) => {
    exec('docker info', (infoError) => {
      if (infoError) {
        console.log(`${colors.red}❌ Docker daemon is not running. Cannot check container connectivity.${colors.reset}`);
        resolve(false);
        return;
      }
      
      // Check if containers are running
      exec('docker compose ps', { cwd: getProjectRoot() }, (psError, psStdout) => {
        if (psError || !psStdout || psStdout.trim() === '') {
          console.log(`${colors.yellow}⚠ No containers are running. Cannot check connectivity.${colors.reset}`);
          console.log(`${colors.yellow}Please start the containers first:${colors.reset}`);
          console.log(`${colors.dim}docker compose up -d${colors.reset}`);
          resolve(false);
          return;
        }
        
        const checks = [
          { name: 'Weaviate', command: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:9081/v1/.well-known/ready', expectedOutput: '200' },
          { name: 'Neo4j', command: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:9475', expectedOutput: '200' },
          { name: 'MongoDB', command: 'docker compose exec mongodb mongosh --eval "db.adminCommand(\'ping\')" --quiet mongodb://root:rootpassword@localhost:27017/admin', expectedOutput: '{ ok: 1 }' },
          { name: 'Chroma', command: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:9001/api/v1/heartbeat', expectedOutput: '200' }
        ];
        
        Promise.all(checks.map(check => {
          return new Promise((resolveCheck) => {
            exec(check.command, { cwd: getProjectRoot() }, (error, stdout, stderr) => {
              // For curl commands, check if the output is 200 regardless of exit code
              if (check.command.includes('curl') && stdout.trim() === '200') {
                console.log(`${colors.green}✓ ${check.name}: ${colors.reset}${colors.green}Reachable${colors.reset}`);
                resolveCheck(true);
                return;
              }
              
              if (error || !stdout.includes(check.expectedOutput)) {
                console.log(`${colors.red}✗ ${check.name}: ${colors.reset}${colors.red}Not reachable${colors.reset}`);
                resolveCheck(false);
              } else {
                console.log(`${colors.green}✓ ${check.name}: ${colors.reset}${colors.green}Reachable${colors.reset}`);
                resolveCheck(true);
              }
            });
          });
        })).then(results => {
          const allConnected = results.every(result => result);
          resolve(allConnected);
        }).catch(() => {
          resolve(false);
        });
      });
    });
  });
}

// Provide troubleshooting guidance
function provideTroubleshooting(containerStatus) {
  console.log(`\n${colors.bright}${colors.cyan}Troubleshooting Guidance:${colors.reset}\n`);
  
  // Check for specific container issues
  Object.entries(containerStatus.containers).forEach(([name, status]) => {
    if (!status.isRunning || status.health === 'unhealthy') {
      console.log(`${colors.bright}${name} Issues:${colors.reset}`);
      
      if (name === 'weaviate') {
        console.log(`1. Check if port 9081 is already in use by another application.`);
        console.log(`2. Ensure Weaviate has enough memory allocated to Docker.`);
        console.log(`3. Try restarting the container: ${colors.dim}docker compose restart weaviate${colors.reset}`);
      } else if (name === 'neo4j') {
        console.log(`1. Check if ports 9475 or 9687 are already in use.`);
        console.log(`2. Ensure Neo4j has enough memory allocated to Docker.`);
        console.log(`3. Try restarting the container: ${colors.dim}docker compose restart neo4j${colors.reset}`);
      } else if (name === 'mongodb') {
        console.log(`1. Check if port 29017 is already in use.`);
        console.log(`2. Verify MongoDB authentication settings.`);
        console.log(`3. Try restarting the container: ${colors.dim}docker compose restart mongodb${colors.reset}`);
      } else if (name === 'chroma') {
        console.log(`1. Check if port 9001 is already in use.`);
        console.log(`2. Verify Chroma environment variables.`);
        console.log(`3. Try restarting the container: ${colors.dim}docker compose restart chroma${colors.reset}`);
      }
      
      console.log(`4. Check detailed logs: ${colors.dim}docker compose logs ${name}${colors.reset}\n`);
    }
  });
  
  // General troubleshooting
  console.log(`${colors.bright}General Troubleshooting:${colors.reset}`);
  console.log(`1. Restart all containers: ${colors.dim}docker compose restart${colors.reset}`);
  console.log(`2. Recreate containers: ${colors.dim}docker compose down && docker compose up -d${colors.reset}`);
  console.log(`3. Check Docker system resources: ${colors.dim}docker system info${colors.reset}`);
  console.log(`4. Update container images: ${colors.dim}docker compose pull${colors.reset}`);
  console.log(`5. Check for Docker network issues: ${colors.dim}docker network inspect bridge${colors.reset}\n`);
}

// Sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function
async function main() {
  printBanner();
  
  try {
    // Check Docker installation
    await checkDockerInstallation();
    
    // Check Docker Compose installation
    await checkDockerComposeInstallation();
    
    // Check docker-compose.yml file
    const hasDockerComposeFile = checkDockerComposeFile();
    if (!hasDockerComposeFile) {
      return;
    }
    
    // Check container status
    const containerStatus = await checkContainerStatus();
    
    // If containers are starting up, wait a bit for them to initialize
    if (containerStatus.running) {
      console.log(`\n${colors.yellow}⚠ Waiting 10 seconds for containers to initialize...${colors.reset}`);
      await sleep(10000);
    }
    
    // If containers are not running, exit
    if (!containerStatus.running && Object.keys(containerStatus.containers).length === 0) {
      console.log(`\n${colors.yellow}⚠ No containers are running. Please start them with:${colors.reset}`);
      console.log(`${colors.dim}docker compose up -d${colors.reset}`);
      return;
    }
    
    // Check container logs
    const hasLogErrors = await checkAllContainerLogs(containerStatus.containers);
    
    // Check container connectivity
    const isConnected = await checkContainerConnectivity();
    
    // Provide summary
    console.log(`\n${colors.bright}Summary:${colors.reset}`);
    
    if (containerStatus.running && !hasLogErrors && isConnected) {
      console.log(`${colors.green}${colors.bright}✓ All containers are running correctly!${colors.reset}`);
    } else {
      console.log(`${colors.yellow}${colors.bright}⚠ Some containers have issues.${colors.reset}`);
      provideTroubleshooting(containerStatus);
    }
    
  } catch (error) {
    console.error(`\n${colors.red}❌ Error during Docker health check:${colors.reset}`);
    console.error(error);
    process.exit(1);
  }
}

// Run the script
main();