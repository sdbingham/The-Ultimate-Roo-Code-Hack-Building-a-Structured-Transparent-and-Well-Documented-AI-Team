#!/usr/bin/env node

/**
 * Roo Framework Environment Template Generator
 *
 * This script generates a .env.template file with the environment variables
 * required for the Roo Framework Docker containers.
 *
 * Usage:
 *   npx roo-framework generate-env
 *
 * Features:
 * - Creates a .env.template file in the project root
 * - Includes all environment variables needed for Docker containers
 * - Provides default values for all variables
 * - Includes documentation for each variable
 *
 * Environment Variables:
 * - Weaviate Configuration:
 *   - ROO_WEAVIATE_SCHEME: HTTP scheme (http/https)
 *   - ROO_WEAVIATE_HOST: Host and port for Weaviate
 *   - WEAVIATE_MEMORY_LIMIT: Memory limit for Weaviate container
 *   - WEAVIATE_CPU_LIMIT: CPU limit for Weaviate container
 *
 * - Neo4j Configuration:
 *   - ROO_NEO4J_URI: URI for Neo4j connection
 *   - ROO_NEO4J_USERNAME: Username for Neo4j
 *   - ROO_NEO4J_PASSWORD: Password for Neo4j
 *   - NEO4J_MEMORY_LIMIT: Memory limit for Neo4j container
 *   - NEO4J_CPU_LIMIT: CPU limit for Neo4j container
 *   - NEO4J_MEMORY_PAGECACHE: Page cache size for Neo4j
 *   - NEO4J_MEMORY_HEAP_INITIAL: Initial heap size for Neo4j
 *   - NEO4J_MEMORY_HEAP_MAX: Maximum heap size for Neo4j
 *
 * - MongoDB Configuration:
 *   - ROO_MONGODB_URI: URI for MongoDB connection
 *   - ROO_MONGODB_DATABASE: Database name for MongoDB
 *   - MONGODB_MEMORY_LIMIT: Memory limit for MongoDB container
 *   - MONGODB_CPU_LIMIT: CPU limit for MongoDB container
 *
 * - Chroma Configuration:
 *   - ROO_CHROMA_PATH: Path for Chroma connection
 *   - ROO_CHROMA_AUTH_TOKEN: Authentication token for Chroma
 *   - CHROMA_MEMORY_LIMIT: Memory limit for Chroma container
 *   - CHROMA_CPU_LIMIT: CPU limit for Chroma container
 *
 * After generating the template:
 * 1. Copy .env.template to .env
 * 2. Edit .env with your specific configuration
 * 3. Restart Docker containers to apply changes
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

// Environment variables template
const envTemplate = `# Roo Framework Environment Variables
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

// Generate .env.template file
function generateEnvTemplate() {
  const projectRoot = getProjectRoot();
  const envTemplatePath = path.join(projectRoot, '.env.template');
  
  try {
    fs.writeFileSync(envTemplatePath, envTemplate);
    console.log(`${colors.green}✓ Generated .env.template file at ${envTemplatePath}${colors.reset}`);
    
    // Also create a copy in the package directory
    const packageEnvTemplatePath = path.join(__dirname, '..', '.env.template');
    fs.writeFileSync(packageEnvTemplatePath, envTemplate);
    console.log(`${colors.green}✓ Generated .env.template file at ${packageEnvTemplatePath}${colors.reset}`);
    
    console.log(`\n${colors.yellow}To use this template:${colors.reset}`);
    console.log(`1. Copy .env.template to .env: ${colors.dim}cp .env.template .env${colors.reset}`);
    console.log(`2. Edit .env with your specific configuration${colors.reset}`);
    console.log(`3. Restart your Docker containers: ${colors.dim}docker compose down && docker compose up -d${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}❌ Error generating .env.template file: ${error.message}${colors.reset}`);
  }
}

// Main function
function main() {
  console.log(`\n${colors.bright}${colors.blue}Generating Roo Framework Environment Template${colors.reset}\n`);
  generateEnvTemplate();
}

// Run the script
main();