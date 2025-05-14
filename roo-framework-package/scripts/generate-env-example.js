#!/usr/bin/env node

/**
 * Roo Framework Environment Variables Example Generator
 *
 * This script generates a .env.example file with documented environment variables
 * for the Roo Framework Docker configuration.
 *
 * Usage:
 *   node generate-env-example.js
 */

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

// Get project root
function getProjectRoot() {
  return process.cwd();
}

// Environment variables content
const envContent = `# Roo Framework Docker Environment Variables
# This file contains all configurable environment variables for the Roo Framework Docker setup.
# Copy this file to .env and modify as needed.

# =============================================================================
# Connection Configuration
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

// Main function
function main() {
  try {
    const projectRoot = getProjectRoot();
    const envExamplePath = path.join(projectRoot, '.env.example');
    
    // Write .env.example file
    fs.writeFileSync(envExamplePath, envContent);
    
    console.log(`${colors.green}✓ Created .env.example file at ${envExamplePath}${colors.reset}`);
    console.log(`${colors.cyan}To use this file:${colors.reset}`);
    console.log(`${colors.dim}1. Copy it to .env: cp .env.example .env${colors.reset}`);
    console.log(`${colors.dim}2. Modify the values as needed${colors.reset}`);
    console.log(`${colors.dim}3. Restart the Docker containers: docker compose down && docker compose up -d${colors.reset}`);
    
  } catch (error) {
    console.error(`${colors.red}❌ Error generating .env.example file:${colors.reset}`);
    console.error(error);
    process.exit(1);
  }
}

// Run the script
main();