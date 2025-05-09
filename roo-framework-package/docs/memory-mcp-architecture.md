# Memory MCP Architecture

## Overview

The Memory Mode in the Roo Framework uses the Model Context Protocol (MCP) architecture to provide a flexible and extensible memory management system. This document describes the architecture of the Memory MCP system and how it integrates with the Roo Framework.

## MCP Architecture

The Model Context Protocol (MCP) is a standardized way for AI agents to interact with external tools and resources. In the context of the Memory Mode, MCP provides a way for AI agents to interact with specialized databases for knowledge management.

### Components

The Memory MCP architecture consists of the following components:

1. **Memory MCP Adapter**: The central component that provides a unified interface to the memory management system.
2. **Database Clients**: Official client libraries for specialized databases.
3. **Docker Integration**: Docker containers for running the databases locally.
4. **Configuration System**: Environment variables for configuring the database connections.

## Memory MCP Adapter

The Memory MCP Adapter (`memory-mcp-adapter.js`) is the core component of the Memory MCP architecture. It provides a unified interface to the memory management system and delegates the actual implementation to official database clients.

### Features

- **Unified API**: Provides a consistent API for memory management operations.
- **Multi-Database Support**: Integrates with multiple specialized databases.
- **Fallback Mechanisms**: Implements fallback mechanisms for robustness.
- **Error Handling**: Provides comprehensive error handling.

### API

The Memory MCP Adapter provides the following API:

- **createMemoryAsset**: Create a new memory asset.
- **getMemoryAsset**: Get a memory asset by ID.
- **listMemoryAssets**: List all memory assets.
- **searchMemoryAssets**: Search memory assets.
- **createRelationship**: Create a relationship between two memory assets.
- **getAssetRelationships**: Get relationships for a memory asset.

## Database Clients

The Memory MCP architecture uses official client libraries for specialized databases:

1. **Weaviate Client**: `weaviate-ts-client` for the primary knowledge base.
2. **Neo4j Driver**: `neo4j-driver` for the graph database.
3. **MongoDB Client**: `mongodb` for the document database.
4. **Chroma Client**: `chromadb` for the vector database.

### Integration

The Memory MCP Adapter initializes these clients and manages their lifecycle. It also ensures that the necessary schemas and collections exist in the databases.

## Docker Integration

The Memory MCP architecture uses Docker to run the databases locally. The setup script creates a `docker-compose.yml` file that defines the services and their configurations.

### Services

The `docker-compose.yml` file defines the following services:

1. **Weaviate**: The primary knowledge base.
2. **Neo4j**: The graph database.
3. **MongoDB**: The document database.
4. **Chroma**: The vector database.

### Volumes

The `docker-compose.yml` file also defines volumes for data persistence:

1. **weaviate_data**: For Weaviate data.
2. **neo4j_data**: For Neo4j data.
3. **mongodb_data**: For MongoDB data.
4. **chroma_data**: For Chroma data.

## Configuration System

The Memory MCP architecture uses environment variables for configuration. These variables allow you to customize the database connections:

```
ROO_WEAVIATE_SCHEME=http
ROO_WEAVIATE_HOST=localhost:8080
ROO_NEO4J_URI=bolt://localhost:7687
ROO_NEO4J_USERNAME=neo4j
ROO_NEO4J_PASSWORD=password
ROO_MONGODB_URI=mongodb://localhost:27017
ROO_MONGODB_DATABASE=roo_memory
ROO_CHROMA_PATH=http://localhost:8000
```

### Default Configuration

If the environment variables are not set, the Memory MCP Adapter uses default values that assume the databases are running locally with Docker.

### Custom Configuration

You can set these environment variables to use custom database connections, such as cloud-hosted services.

## Integration with Roo Framework

The Memory MCP architecture integrates with the Roo Framework in several ways:

### Index.js Integration

The `index.js` file loads the Memory MCP Adapter and initializes it with core utilities:

```javascript
// Load modules after core functions are defined
memory = require('./lib/memory-mcp-adapter');
boomerang = require('./lib/boomerang');
modes = require('./lib/modes');

// Initialize memory adapter
memory.initialize({
  getProjectRoot: core.getProjectRoot,
  getRooDirectory: core.getRooDirectory,
  logModeActivity: core.logModeActivity
});
```

### CLI Integration

The `cli.js` file provides command-line interfaces for memory management operations:

```javascript
// Memory management commands
function handleMemoryCommands(args) {
  const subcommand = args[0] || 'list';
  
  switch (subcommand) {
    case 'list':
      console.log(`${colors.bright}Listing memory assets...${colors.reset}`);
      listMemoryAssets();
      break;
    // ...
  }
}
```

### Setup Integration

The `setup.js` file creates the necessary directory structure and Docker configuration:

```javascript
// Create memory directory structure
const directories = [
  // ...
  '.roo/memory',
  '.roo/memory/indices',
  '.roo/memory/assets'
];

// Create docker-compose.yml file
const dockerComposePath = path.join(projectRoot, 'docker-compose.yml');
if (!fs.existsSync(dockerComposePath)) {
  const dockerComposeContent = `services:
  weaviate:
    // ...
  `;
  fs.writeFileSync(dockerComposePath, dockerComposeContent);
}
```

## Conclusion

The Memory MCP architecture provides a flexible and extensible memory management system for the Roo Framework. By leveraging official database clients and Docker integration, it enables sophisticated knowledge management capabilities while maintaining a consistent API.

For more information on using the Memory Mode, see the [Memory Mode Guide](./memory-mode-guide.md).