# Memory Management in Roo Framework

## Overview

The Roo Framework provides a comprehensive memory management system that allows AI agents to store, retrieve, and manage knowledge across interactions. This document provides an overview of the memory management architecture and how it integrates with the rest of the framework.

## Architecture

The memory management system in the Roo Framework is built on a multi-database architecture that leverages specialized databases for different aspects of knowledge management:

### Database Components

1. **Weaviate (Primary Knowledge Base)**
   - Purpose: Serves as the primary storage for memory assets
   - Features:
     - Combined vector search and data storage
     - Schema-based data modeling
     - Automatic vectorization of content
     - Cross-references between objects

2. **Neo4j (Graph Database)**
   - Purpose: Manages relationships between memory assets
   - Features:
     - Native graph database for complex relationship modeling
     - Cypher query language for traversing relationships
     - Support for various relationship types and properties
     - Bidirectional traversal (incoming and outgoing relationships)

3. **MongoDB (Document Database)**
   - Purpose: Provides flexible document storage and backup
   - Features:
     - Schema-less document storage for memory assets
     - Rich querying capabilities
     - Efficient indexing for fast retrieval
     - Backup storage for redundancy

4. **Chroma (Vector Database)**
   - Purpose: Enables advanced semantic search
   - Features:
     - Specialized vector database for embeddings
     - Nearest neighbor search algorithms
     - Filtering and metadata-based search
     - Optimized for semantic similarity operations

### Integration with Docker

The memory management system uses Docker to run these databases locally. The setup script creates a `docker-compose.yml` file that defines the services and their configurations.

## Memory Assets

Memory assets are the basic units of knowledge in the memory management system. Each asset has the following properties:

- **ID**: Unique identifier for the asset
- **Type**: Type of the asset (concept, decision, pattern, etc.)
- **Name**: Name of the asset
- **Content**: Content of the asset
- **Tags**: Tags associated with the asset
- **Created At**: Creation timestamp
- **Updated At**: Last update timestamp

### Asset Types

The memory management system supports the following asset types:

- **Concept**: Conceptual knowledge
- **Decision**: Decision records
- **Pattern**: Design patterns
- **Process**: Process documentation
- **Research**: Research findings
- **Requirement**: Requirements
- **Solution**: Solution documentation

## Relationships

Relationships connect memory assets to form a knowledge graph. Each relationship has the following properties:

- **ID**: Unique identifier for the relationship
- **Source ID**: ID of the source asset
- **Target ID**: ID of the target asset
- **Type**: Type of the relationship
- **Description**: Description of the relationship
- **Created At**: Creation timestamp

### Relationship Types

The memory management system supports the following relationship types:

- **Related To**: General relationship
- **Depends On**: Dependency relationship
- **Implements**: Implementation relationship
- **Extends**: Extension relationship
- **References**: Reference relationship
- **Supersedes**: Superseding relationship
- **Contradicts**: Contradictory relationship
- **Derived From**: Derivation relationship

## API

The memory management system provides a comprehensive API for interacting with memory assets and relationships:

### Asset Management

- **createMemoryAsset**: Create a new memory asset
- **getMemoryAsset**: Get a memory asset by ID
- **listMemoryAssets**: List all memory assets
- **searchMemoryAssets**: Search memory assets

### Relationship Management

- **createRelationship**: Create a relationship between two memory assets
- **getAssetRelationships**: Get relationships for a memory asset

## Integration with Modes

The memory management system integrates with the mode system in the Roo Framework:

### Memory Mode

The Memory Mode is a specialized mode for managing memory assets and relationships. It provides a dedicated interface for knowledge management.

### Orchestrator Mode Integration

The Orchestrator Mode integrates with the memory management system to store and retrieve knowledge during task orchestration.

### Other Modes

Other modes can access the memory management system to store and retrieve knowledge relevant to their specific tasks.

## Configuration

The memory management system can be configured using environment variables:

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

## Conclusion

The memory management system in the Roo Framework provides a robust foundation for knowledge management across AI agent interactions. By leveraging specialized databases and a comprehensive API, it enables sophisticated knowledge storage, retrieval, and relationship management.

For more detailed information on using the memory management system, see the [Memory Mode Guide](./memory-mode-guide.md).