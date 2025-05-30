# Environment Configuration Guide for Roo Framework

## Overview

This guide provides detailed instructions for configuring the environment variables required for the Roo Framework, with a focus on LangChain integration and Docker container setup.

## Environment Variables Structure

The Roo Framework uses environment variables for configuration. These variables can be set in a `.env` file at the root of your project or directly in your environment.

## Core Environment Variables

### Basic Configuration

```bash
# GitHub Personal Access Token for npm authentication
NPM_TOKEN=your_github_pat

# API Keys for Language Models
ANTHROPIC_API_KEY=your_anthropic_api_key
OPENAI_API_KEY=your_openai_api_key
```

### LangChain Integration

```bash
# Enable LangChain adapter
USE_LANGCHAIN_MEMORY=true

# LangChain Model Configuration
# Provider Configuration
# This setting controls which API provider to use for both LLM and embeddings
ROO_LANGCHAIN_LLM_PROVIDER=anthropic
ROO_LANGCHAIN_LLM_MODEL=claude-3-sonnet-20250219

# Embedding Provider Configuration (Optional)
# Only set this if you want to use a different provider for embeddings
# ROO_LANGCHAIN_EMBEDDING_PROVIDER=openai
ROO_LANGCHAIN_EMBEDDING_MODEL=text-embedding-ada-002
```

### Database Connections

```bash
# Weaviate settings
ROO_WEAVIATE_SCHEME=http
ROO_WEAVIATE_HOST=localhost:8081

# Neo4j settings
ROO_NEO4J_URI=bolt://localhost:7688
ROO_NEO4J_USERNAME=neo4j
ROO_NEO4J_PASSWORD=password

# MongoDB settings
ROO_MONGODB_URI=mongodb://root:rootpassword@localhost:27018
ROO_MONGODB_DATABASE=roo_memory

# Chroma settings
ROO_CHROMA_PATH=http://localhost:8001
```

## Environment Generation

The Roo Framework provides a script to generate a template `.env` file with all required variables:

```bash
npm run env:generate
```

This will create a `.env.example` file that you can copy to `.env` and fill in with your specific values.

## Environment Variable Precedence

The framework follows this precedence order for environment variables:

1. Process environment variables
2. `.env` file in the project root
3. Default values in the framework code

## Docker Environment Configuration

When using Docker, environment variables can be passed to containers in several ways:

### 1. Using docker-compose.yml

```yaml
services:
  memory-service:
    image: sdbingham/roo-memory-service:latest
    environment:
      - USE_LANGCHAIN_MEMORY=true
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - ROO_LANGCHAIN_LLM_PROVIDER=anthropic
```

### 2. Using .env File with Docker Compose

Docker Compose automatically loads variables from a `.env` file in the same directory as your `docker-compose.yml` file.

### 3. Using Environment Files

```yaml
services:
  memory-service:
    env_file:
      - ./.env
      - ./config/memory-service.env
```

## Complete .env Template

Below is a complete template for the `.env` file with all available configuration options:

```bash
# GitHub Personal Access Token for npm authentication
NPM_TOKEN=your_github_pat

# API Keys for Language Models
ANTHROPIC_API_KEY=your_anthropic_api_key
OPENAI_API_KEY=your_openai_api_key

# LangChain Integration
USE_LANGCHAIN_MEMORY=true
# Provider Configuration
# This setting controls which API provider to use for both LLM and embeddings
ROO_LANGCHAIN_LLM_PROVIDER=anthropic
ROO_LANGCHAIN_LLM_MODEL=claude-3-sonnet-20250219

# Embedding Provider Configuration (Optional)
# Only set this if you want to use a different provider for embeddings
# ROO_LANGCHAIN_EMBEDDING_PROVIDER=openai
ROO_LANGCHAIN_EMBEDDING_MODEL=text-embedding-ada-002

# Weaviate settings
ROO_WEAVIATE_SCHEME=http
ROO_WEAVIATE_HOST=localhost:8081

# Neo4j settings
ROO_NEO4J_URI=bolt://localhost:7688
ROO_NEO4J_USERNAME=neo4j
ROO_NEO4J_PASSWORD=password

# MongoDB settings
ROO_MONGODB_URI=mongodb://root:rootpassword@localhost:27018
ROO_MONGODB_DATABASE=roo_memory

# Chroma settings
ROO_CHROMA_PATH=http://localhost:8001

# Docker settings
ROO_DOCKER_MEMORY_IMAGE=sdbingham/roo-memory-service:latest
ROO_DOCKER_DATA_VOLUME=./data

# Logging settings
ROO_LOG_LEVEL=info
ROO_LOG_FORMAT=json

# Performance settings
ROO_CACHE_ENABLED=true
ROO_CACHE_TTL=3600
```

## Environment Variable Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NPM_TOKEN` | GitHub Personal Access Token | - | Yes, for private packages |
| `ANTHROPIC_API_KEY` | Anthropic API key | - | Yes, if using Anthropic |
| `OPENAI_API_KEY` | OpenAI API key | - | Yes, if using OpenAI |
| `USE_LANGCHAIN_MEMORY` | Enable LangChain adapter | `false` | No |
| `ROO_LANGCHAIN_LLM_PROVIDER` | LLM provider | `anthropic` | No |
| `ROO_LANGCHAIN_LLM_MODEL` | LLM model name | `claude-3-sonnet-20250219` | No |
| `ROO_LANGCHAIN_EMBEDDING_PROVIDER` | Optional: Override embedding provider | Same as LLM provider | No |
| `ROO_LANGCHAIN_EMBEDDING_MODEL` | Embedding model name | `text-embedding-ada-002` | No |
| `ROO_WEAVIATE_SCHEME` | Weaviate connection scheme | `http` | No |
| `ROO_WEAVIATE_HOST` | Weaviate host and port | `localhost:8081` | No |
| `ROO_NEO4J_URI` | Neo4j connection URI | `bolt://localhost:7688` | No |
| `ROO_NEO4J_USERNAME` | Neo4j username | `neo4j` | No |
| `ROO_NEO4J_PASSWORD` | Neo4j password | `password` | No |
| `ROO_MONGODB_URI` | MongoDB connection URI | `mongodb://root:rootpassword@localhost:27018` | No |
| `ROO_MONGODB_DATABASE` | MongoDB database name | `roo_memory` | No |
| `ROO_CHROMA_PATH` | ChromaDB connection path | `http://localhost:8001` | No |
| `ROO_LOG_LEVEL` | Logging level | `info` | No |
| `ROO_LOG_FORMAT` | Logging format | `json` | No |
| `ROO_CACHE_ENABLED` | Enable caching | `true` | No |
| `ROO_CACHE_TTL` | Cache time-to-live in seconds | `3600` | No |

## Generating Environment Files

The Roo Framework provides scripts to generate environment files:

1. **Generate .env Example**:
   ```bash
   npm run env:generate
   ```

2. **Generate Docker Environment**:
   ```bash
   npm run docker:env
   ```

## Validating Environment Configuration

To validate your environment configuration:

```bash
npm run setup
```

This script checks for required environment variables and dependencies.

## Troubleshooting

### Missing API Keys

If you see errors about missing API keys:

```
Error: ANTHROPIC_API_KEY is required for LangChain integration
```

Make sure you've set the required API keys in your `.env` file.

### Database Connection Issues

If you encounter database connection errors:

```
Error: Could not connect to Weaviate at http://localhost:8081
```

Ensure that:
1. The database container is running
2. The connection details in your `.env` file are correct
3. There are no network issues preventing the connection

### Docker Environment Issues

If Docker containers can't access environment variables:

1. Check that your `docker-compose.yml` file is correctly referencing the variables
2. Verify that the `.env` file is in the same directory as your `docker-compose.yml`
3. Try using explicit environment variables in the `docker-compose.yml` file

## Next Steps

- Review the [Docker Architecture Documentation](docker-architecture-documentation.md) for container setup
- Follow the [LangChain Integration Setup Guide](langchain-integration-setup-guide.md) for LangChain setup
- Run `npm run docker:health` to verify your Docker environment