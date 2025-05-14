# Memory Mode Guide

## Overview

The Roo Framework Memory Mode provides a robust knowledge management system that allows you to store, retrieve, and manage relationships between memory assets. This guide explains how to use the Memory Mode with the new implementation that leverages official database clients.

## Architecture

The Memory Mode uses a combination of specialized databases to provide comprehensive knowledge management capabilities:

1. **Weaviate**: Primary knowledge base that combines vector search with data storage
2. **Neo4j**: Graph database for managing complex relationships between memory assets
3. **MongoDB**: Document database for flexible storage and efficient querying
4. **Chroma**: Vector database optimized for semantic search operations

## Setup

### Prerequisites

To use the Memory Mode, you need to have Docker installed on your system. The setup script will create a `docker-compose.yml` file and start the required containers.

### Configuration

You can configure the database connections using environment variables:

```
ROO_WEAVIATE_SCHEME=http
ROO_WEAVIATE_HOST=localhost:8081
ROO_NEO4J_URI=bolt://localhost:7688
ROO_NEO4J_USERNAME=neo4j
ROO_NEO4J_PASSWORD=password
ROO_MONGODB_URI=mongodb://root:rootpassword@localhost:27018
ROO_MONGODB_DATABASE=roo_memory
ROO_CHROMA_PATH=http://localhost:8001
```

### Docker Setup

The setup script will create a `docker-compose.yml` file in your project root and ask if you want to start the Docker containers. If you choose yes, it will start the containers automatically.

You can also start the containers manually:

```bash
cd your-project-root
docker compose up -d
```

## Using Memory Mode

### Creating Memory Assets

You can create memory assets using the Memory API:

```javascript
const rooFramework = require('@sdbingham/roo-framework');
const memory = rooFramework.memory;

const asset = memory.createMemoryAsset({
  type: 'concept',
  name: 'Vector Databases',
  content: 'Vector databases are specialized database systems...',
  tags: ['database', 'vector', 'embeddings']
});
```

Or using the CLI:

```bash
npx roo-framework memory create
```

### Asset Types

The Memory Mode supports the following asset types:

- `concept`: Conceptual knowledge
- `decision`: Decision records
- `pattern`: Design patterns
- `process`: Process documentation
- `research`: Research findings
- `requirement`: Requirements
- `solution`: Solution documentation

### Retrieving Memory Assets

You can retrieve memory assets by ID:

```javascript
const asset = memory.getMemoryAsset('asset-id');
```

Or using the CLI:

```bash
npx roo-framework memory get <id>
```

### Listing Memory Assets

You can list all memory assets:

```javascript
const assets = memory.listMemoryAssets();
```

Or using the CLI:

```bash
npx roo-framework memory list
```

You can also filter by type or tags:

```javascript
const assets = memory.listMemoryAssets({
  type: 'concept',
  tags: ['database']
});
```

### Searching Memory Assets

You can search memory assets using semantic search:

```javascript
const results = memory.searchMemoryAssets('vector database', {
  useSemanticSearch: true
});
```

Or using the CLI:

```bash
npx roo-framework memory search "vector database"
```

### Creating Relationships

You can create relationships between memory assets:

```javascript
const relationship = memory.createRelationship({
  sourceId: 'source-asset-id',
  targetId: 'target-asset-id',
  type: memory.RELATIONSHIP_TYPES.RELATED_TO,
  description: 'These concepts are related'
});
```

Or using the CLI:

```bash
npx roo-framework memory relate <sourceId> <targetId> <type>
```

### Relationship Types

The Memory Mode supports the following relationship types:

- `related_to`: General relationship
- `depends_on`: Dependency relationship
- `implements`: Implementation relationship
- `extends`: Extension relationship
- `references`: Reference relationship
- `supersedes`: Superseding relationship
- `contradicts`: Contradictory relationship
- `derived_from`: Derivation relationship

### Getting Relationships

You can get relationships for a memory asset:

```javascript
const relationships = memory.getAssetRelationships('asset-id', {
  direction: 'both'
});
```

Or using the CLI:

```bash
npx roo-framework memory relationships <id>
```

## Advanced Usage

### Custom Database Connections

You can use custom database connections by setting the environment variables:

```javascript
process.env.ROO_WEAVIATE_HOST = 'your-weaviate-instance.cloud';
process.env.ROO_NEO4J_URI = 'neo4j+s://your-neo4j-instance.cloud';
process.env.ROO_NEO4J_USERNAME = 'your-username';
process.env.ROO_NEO4J_PASSWORD = 'your-password';
process.env.ROO_MONGODB_URI = 'mongodb+srv://username:password@your-mongodb-uri';
process.env.ROO_MONGODB_DATABASE = 'your_database_name';
process.env.ROO_CHROMA_PATH = 'https://your-chroma-instance';
```

### Cloud-Hosted Services

Instead of running the databases locally with Docker, you can use cloud-hosted services:

- [Weaviate Cloud](https://weaviate.io/pricing) offers a free tier
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) has a free tier
- [Neo4j Aura](https://neo4j.com/cloud/platform/aura-graph-database/) offers a free tier
- [Chroma Cloud](https://www.trychroma.com/) has managed options

## Troubleshooting

### Docker Issues

If you encounter issues with Docker:

1. Make sure Docker Desktop is running
2. Try restarting Docker Desktop
3. Check Docker logs: `docker compose logs`

### Database Connection Issues

If you encounter database connection issues:

1. Check if the containers are running: `docker compose ps`
2. Check container logs: `docker compose logs <service-name>`
3. Verify the environment variables are set correctly

### Memory API Errors

If you encounter errors when using the Memory API:

1. Check if the databases are running
2. Check the error message for specific issues
3. Try initializing the clients manually: `memory.initialize()`

## Conclusion

The Memory Mode provides a powerful knowledge management system that allows you to store, retrieve, and manage relationships between memory assets. By leveraging official database clients, it provides a robust and scalable solution for your knowledge management needs.