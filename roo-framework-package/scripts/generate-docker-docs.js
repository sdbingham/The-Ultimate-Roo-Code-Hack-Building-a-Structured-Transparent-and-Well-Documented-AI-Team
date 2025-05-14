#!/usr/bin/env node

/**
 * Roo Framework Docker Documentation Generator
 *
 * This script generates a Markdown documentation file for the Docker configuration
 * used by the Roo Framework.
 *
 * Usage:
 *   node generate-docker-docs.js
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

// Docker documentation content
const dockerDocs = `# Docker Configuration Guide

This guide provides detailed information about the Docker configuration used by the Roo Framework.

## Overview

The Roo Framework uses Docker to provide four essential database services:

1. **Weaviate**: Vector database for semantic search
2. **Neo4j**: Graph database for relationship management
3. **MongoDB**: Document database for structured data storage
4. **Chroma**: Vector database for embeddings

These services are defined in a \`docker-compose.yml\` file and managed through setup and health check scripts.

## Docker Compose Configuration

The \`docker-compose.yml\` file includes the following enhancements:

### 1. Network Isolation

A dedicated network for Roo Framework containers improves isolation and security:

\`\`\`yaml
networks:
  roo_network:
    driver: bridge
\`\`\`

### 2. Container Naming

Explicit container names make it easier to reference them in commands and logs:

\`\`\`yaml
services:
  weaviate:
    container_name: roo_weaviate
    # other configuration...
\`\`\`

### 3. Restart Policy

Restart policies ensure service continuity:

\`\`\`yaml
services:
  weaviate:
    restart: unless-stopped
    # other configuration...
\`\`\`

## Environment Variables

The framework uses environment variables for configuration. These can be set in a \`.env\` file in your project root.

You can generate a template for this file using:

\`\`\`bash
npm run env:generate
\`\`\`

Key environment variables include:

### Connection Configuration

\`\`\`
ROO_WEAVIATE_SCHEME=http
ROO_WEAVIATE_HOST=localhost:8081
ROO_NEO4J_URI=bolt://localhost:7688
ROO_NEO4J_USERNAME=neo4j
ROO_NEO4J_PASSWORD=password
ROO_MONGODB_URI=mongodb://root:rootpassword@localhost:27018
ROO_MONGODB_DATABASE=roo_memory
ROO_CHROMA_PATH=http://localhost:8001
ROO_CHROMA_AUTH_TOKEN=admin_token
\`\`\`

### Resource Limits

\`\`\`
WEAVIATE_MEMORY_LIMIT=2G
WEAVIATE_CPU_LIMIT=1
NEO4J_MEMORY_LIMIT=2G
NEO4J_CPU_LIMIT=1
MONGODB_MEMORY_LIMIT=1G
MONGODB_CPU_LIMIT=1
CHROMA_MEMORY_LIMIT=1G
CHROMA_CPU_LIMIT=1
\`\`\`

## Docker Management Commands

The framework provides several npm scripts for Docker management:

\`\`\`bash
# Start Docker containers
npm run docker:start

# Stop Docker containers
npm run docker:stop

# Restart Docker containers
npm run docker:restart

# Check Docker container status
npm run docker:status

# View Docker container logs
npm run docker:logs

# Check Docker container health
npm run docker:health
\`\`\`

## Port Configuration

The Docker services use the following ports:

| Service  | Container Port | Host Port |
|----------|---------------|-----------|
| Weaviate | 8080          | 9081      |
| Neo4j UI | 7474          | 9475      |
| Neo4j Bolt| 7687         | 9687      |
| MongoDB  | 27017         | 29017     |
| Chroma   | 8000          | 9001      |

## Health Checks

Each container includes health checks to verify that the service is running correctly:

\`\`\`yaml
healthcheck:
  test: ["CMD", "wget", "--no-verbose", "--spider", "http://localhost:8080/v1/.well-known/ready"]
  interval: 10s
  timeout: 5s
  retries: 5
\`\`\`

You can run a comprehensive health check using:

\`\`\`bash
npm run docker:health
\`\`\`

## Troubleshooting

If you encounter issues with the Docker containers:

1. Check container status: \`npm run docker:status\`
2. View container logs: \`npm run docker:logs\`
3. Run the health check: \`npm run docker:health\`
4. Restart containers: \`npm run docker:restart\`
5. Recreate containers: \`npm run docker:stop && npm run docker:start\`

## Advanced Configuration

For production environments, you may want to enable additional features:

\`\`\`
# MongoDB Replica Set
MONGODB_REPLICA_SET=rs0
MONGODB_OPLOG_SIZE=1024
\`\`\`

## Security Considerations

The Docker configuration includes several security enhancements:

1. Network isolation to prevent unauthorized access
2. Resource limits to prevent denial-of-service attacks
3. Container naming for better audit trails
4. Restart policies for improved reliability

## Performance Considerations

To optimize performance:

1. Adjust memory limits based on available hardware
2. Configure Neo4j cache sizes appropriately
3. Monitor container resource usage
4. Use volume mounts for persistent data

## Further Reading

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Weaviate Documentation](https://weaviate.io/developers/weaviate)
- [Neo4j Documentation](https://neo4j.com/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Chroma Documentation](https://docs.trychroma.com/)
`;

// Main function
function main() {
  try {
    const projectRoot = getProjectRoot();
    const docsDir = path.join(projectRoot, 'docs');
    const docPath = path.join(docsDir, 'docker-configuration.md');
    
    // Create docs directory if it doesn't exist
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }
    
    // Write documentation file
    fs.writeFileSync(docPath, dockerDocs);
    
    console.log(`${colors.green}✓ Generated Docker configuration documentation at ${docPath}${colors.reset}`);
    
    // Also create a copy in the package docs directory
    const packageDocsDir = path.join(__dirname, '..', 'docs');
    const packageDocPath = path.join(packageDocsDir, 'docker-configuration.md');
    
    if (!fs.existsSync(packageDocsDir)) {
      fs.mkdirSync(packageDocsDir, { recursive: true });
    }
    
    fs.writeFileSync(packageDocPath, dockerDocs);
    console.log(`${colors.green}✓ Generated Docker configuration documentation at ${packageDocPath}${colors.reset}`);
    
  } catch (error) {
    console.error(`${colors.red}❌ Error generating Docker documentation: ${error.message}${colors.reset}`);
  }
}

// Run the script
main();