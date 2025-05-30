# Docker Architecture Documentation for Roo Framework

## Overview

This document outlines the Docker architecture for the Roo Framework integration, including the LangChain components and memory management system.

## Architecture Components

### 1. Container Structure

The Roo Framework Docker architecture consists of the following containers:

- **Memory Service**: Manages memory assets and provides storage capabilities
- **LangChain Integration**: Provides enhanced language model capabilities
- **Database Containers**: Support for various vector and graph databases
  - Weaviate (Vector DB)
  - Neo4j (Graph DB)
  - MongoDB (Document DB)
  - ChromaDB (Vector DB)

### 2. Component Relationships

```
┌─────────────────────────────────────────────────────────┐
│                   Roo Framework                          │
│                                                         │
│  ┌─────────────┐       ┌───────────────────────┐        │
│  │             │       │                       │        │
│  │ Memory Mode │◄─────►│ LangChain Integration │        │
│  │             │       │                       │        │
│  └─────────────┘       └───────────────────────┘        │
│         ▲                         ▲                     │
│         │                         │                     │
│         ▼                         │                     │
│  ┌─────────────┐                  │                     │
│  │             │                  │                     │
│  │ Boomerang   │                  │                     │
│  │ Logic       │                  │                     │
│  │             │                  │                     │
│  └─────────────┘                  │                     │
│                                   │                     │
└───────────────────────────────────┼─────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────┐
│                   Database Layer                           │
│                                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │             │  │             │  │             │        │
│  │  Weaviate   │  │    Neo4j    │  │   MongoDB   │        │
│  │             │  │             │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                           │
│                   ┌─────────────┐                         │
│                   │             │                         │
│                   │  ChromaDB   │                         │
│                   │             │                         │
│                   └─────────────┘                         │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

## Container Configuration

### Memory Service Container

```yaml
memory-service:
  image: sdbingham/roo-memory-service:latest
  environment:
    - USE_LANGCHAIN_MEMORY=true
    - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    - ROO_LANGCHAIN_LLM_PROVIDER=anthropic
    - ROO_LANGCHAIN_LLM_MODEL=claude-3-sonnet-20250219
  volumes:
    - ./data/memory:/app/data
  depends_on:
    - weaviate
    - neo4j
    - mongodb
    - chroma
```

### Database Containers

```yaml
weaviate:
  image: semitechnologies/weaviate:1.19.6
  ports:
    - "8081:8080"
  environment:
    - QUERY_DEFAULTS_LIMIT=25
    - AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED=true
    - PERSISTENCE_DATA_PATH=/var/lib/weaviate
  volumes:
    - weaviate_data:/var/lib/weaviate

neo4j:
  image: neo4j:5.9.0
  ports:
    - "7688:7687"
    - "7475:7474"
  environment:
    - NEO4J_AUTH=neo4j/password
  volumes:
    - neo4j_data:/data

mongodb:
  image: mongo:6.0
  ports:
    - "27018:27017"
  environment:
    - MONGO_INITDB_ROOT_USERNAME=root
    - MONGO_INITDB_ROOT_PASSWORD=rootpassword
  volumes:
    - mongodb_data:/data/db

chroma:
  image: ghcr.io/chroma-core/chroma:0.4.15
  ports:
    - "8001:8000"
  volumes:
    - chroma_data:/chroma/chroma
```

## Health Check System

The Docker health check system monitors the status of all containers and ensures they are functioning properly. The health check script (`docker-health-check.js`) performs the following checks:

1. Verifies all containers are running
2. Checks database connectivity
3. Validates LangChain integration
4. Ensures memory service is operational

## Setup Instructions

To set up the Docker environment:

1. Ensure Docker and Docker Compose are installed
2. Configure environment variables in `.env` file
3. Run `npm run docker:start` to start all containers
4. Verify health with `npm run docker:health`

## Troubleshooting

Common issues and solutions:

- **Database Connection Errors**: Check that the database containers are running and accessible
- **LangChain Integration Issues**: Verify API keys are correctly set in the `.env` file
- **Memory Service Failures**: Check logs with `npm run docker:logs memory-service`

## Next Steps

For detailed setup instructions, refer to the following documentation:

- [LangChain Integration Setup Guide](langchain-integration-setup-guide.md)
- [Environment Configuration Guide](environment-configuration-guide.md)