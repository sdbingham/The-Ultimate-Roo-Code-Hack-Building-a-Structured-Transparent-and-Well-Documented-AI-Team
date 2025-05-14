# Docker Configuration and Memory MCP Adapter Changes

This document summarizes the changes made to fix the Docker configuration and Memory MCP Adapter to work with non-standard ports.

## Overview

The Roo Framework's Memory Mode was updated to use non-standard ports for its Docker containers to avoid conflicts with other applications. The Memory MCP Adapter was also enhanced to be more resilient to service failures.

## Docker Configuration Changes

### Port Changes

The Docker container ports were updated to use non-standard ports:

| Service | Original Port | New Port |
|---------|--------------|----------|
| Weaviate | 8081 | 9081 |
| Neo4j UI | 7475 | 9475 |
| Neo4j Bolt | 7688 | 9687 |
| MongoDB | 27018 | 29017 |
| Chroma | 8001 | 9001 |

### Docker Compose File

The `docker-compose.yml` file was simplified to focus on the essential configuration:

```yaml
services:
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
          memory: ${WEAVIATE_MEMORY_LIMIT:-2G}
          cpus: ${WEAVIATE_CPU_LIMIT:-1}
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
      NEO4J_dbms_memory_pagecache_size: ${NEO4J_MEMORY_PAGECACHE:-512M}
      NEO4J_dbms_memory_heap_initial__size: ${NEO4J_MEMORY_HEAP_INITIAL:-512M}
      NEO4J_dbms_memory_heap_max__size: ${NEO4J_MEMORY_HEAP_MAX:-1G}
    volumes:
      - neo4j_data:/data
    deploy:
      resources:
        limits:
          memory: ${NEO4J_MEMORY_LIMIT:-2G}
          cpus: ${NEO4J_CPU_LIMIT:-1}
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
          memory: ${MONGODB_MEMORY_LIMIT:-1G}
          cpus: ${MONGODB_CPU_LIMIT:-1}
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
      CHROMA_SERVER_AUTH_CREDENTIALS: ${ROO_CHROMA_AUTH_TOKEN:-admin_token}
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
          memory: ${CHROMA_MEMORY_LIMIT:-1G}
          cpus: ${CHROMA_CPU_LIMIT:-1}
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
  chroma_data:
```

## Memory MCP Adapter Changes

### Configuration Updates

The `memory-mcp-adapter.js` file was updated to use the new port numbers:

```javascript
// Configuration - can be overridden via environment variables
const config = {
  weaviate: {
    scheme: process.env.ROO_WEAVIATE_SCHEME || 'http',
    host: process.env.ROO_WEAVIATE_HOST || 'localhost:9081',
  },
  neo4j: {
    uri: process.env.ROO_NEO4J_URI || 'bolt://localhost:9687',
    username: process.env.ROO_NEO4J_USERNAME || 'neo4j',
    password: process.env.ROO_NEO4J_PASSWORD || 'password',
  },
  mongodb: {
    uri: process.env.ROO_MONGODB_URI || 'mongodb://root:rootpassword@localhost:29017',
    database: process.env.ROO_MONGODB_DATABASE || 'roo_memory',
  },
  chroma: {
    path: process.env.ROO_CHROMA_PATH || 'http://localhost:9001',
  }
};
```

### Error Handling Improvements

The Memory MCP Adapter was enhanced with better error handling to be more resilient to service failures:

1. **Weaviate Client Initialization**: Added support for different versions of the Weaviate client API.

2. **Chroma Error Handling**: Added try-catch blocks around Chroma operations to continue without Chroma if it's not available.

3. **MongoDB Text Index**: Added code to create a text index on the `content` and `name` fields for better search functionality.

4. **Fallback Mechanisms**: Implemented fallback mechanisms to use alternative services when a primary service is not available.

### API Compatibility

The Memory MCP Adapter maintains the same API, so existing code that uses the Roo Framework's memory functionality will continue to work without changes:

```javascript
// Create a memory asset
const asset = await rooFramework.memory.createMemoryAsset({
  type: rooFramework.memory.ASSET_TYPES.CONCEPT,
  name: 'Example Concept',
  content: 'This is an example concept.',
  tags: ['example', 'concept']
});

// Get a memory asset
const retrievedAsset = await rooFramework.memory.getMemoryAsset(asset.id);

// List memory assets
const assets = await rooFramework.memory.listMemoryAssets();

// Search memory assets
const searchResults = await rooFramework.memory.searchMemoryAssets('example');
```

## Environment Variables

The environment variables template was updated to use the new port numbers:

```
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
```

## Health Check Script

The Docker health check script was updated to use the new port numbers:

```javascript
const checks = [
  { name: 'Weaviate', command: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:9081/v1/.well-known/ready', expectedOutput: '200' },
  { name: 'Neo4j', command: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:9475', expectedOutput: '200' },
  { name: 'MongoDB', command: 'docker compose exec mongodb mongosh --eval "db.adminCommand(\'ping\')" --quiet mongodb://root:rootpassword@localhost:27017/admin', expectedOutput: '{ ok: 1 }' },
  { name: 'Chroma', command: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:9001/api/v1/heartbeat', expectedOutput: '200' }
];
```

## NPM Scripts

The `package.json` file was updated with scripts for Docker management:

```json
"scripts": {
  "test": "echo \"No tests available\"",
  "docker:start": "docker compose up -d",
  "docker:stop": "docker compose down",
  "docker:restart": "docker compose restart",
  "docker:status": "docker compose ps",
  "docker:logs": "docker compose logs",
  "docker:health": "node ./node_modules/@sdbingham/roo-framework/scripts/docker-health-check.js",
  "env:generate": "node ./node_modules/@sdbingham/roo-framework/scripts/generate-env-example.js",
  "docs:generate": "node ./node_modules/@sdbingham/roo-framework/scripts/generate-docker-docs.js",
  "setup": "node ./node_modules/@sdbingham/roo-framework/scripts/setup.js"
}
```

## Conclusion

These changes ensure that the Roo Framework's Memory Mode works with real and existing MCPs using non-standard ports, avoiding conflicts with other applications. The Memory MCP Adapter is now more resilient to service failures, with proper error handling for cases where a service is not available.

To test these changes, refer to the [Testing Roo Framework Memory Integration](./testing-roo-framework-memory.md) document.