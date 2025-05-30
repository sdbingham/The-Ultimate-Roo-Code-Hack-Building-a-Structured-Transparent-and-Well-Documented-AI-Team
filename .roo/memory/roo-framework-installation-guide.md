# Roo Framework Installation and Setup Process

## Complete Installation Guide

This guide provides a comprehensive walkthrough of the Roo Framework installation and setup process.

### Prerequisites

Before installing the Roo Framework, ensure you have:

- Node.js 14.x or higher
- npm 7.x or higher
- Docker and Docker Compose (for database containers)
- API keys for language models (Anthropic Claude or OpenAI)

### Step 1: Install the Package

Install the Roo Framework package using npm:

```bash
npm install @sdbingham/roo-framework --legacy-peer-deps
```

The `--legacy-peer-deps` flag is used to handle potential dependency conflicts. The package now includes LangChain dependencies as regular dependencies.

### Step 2: Run the Setup Command

After installation, run the setup command to create the necessary directory structure and configuration files:

```bash
npx roo-framework setup
```

This command will:
- Create the `.roo` directory structure
- Set up boomerang state tracking
- Create the Docker configuration
- Optionally start Docker containers
- Set up LangChain integration

### Step 3: Configure Environment Variables

The most critical step is to edit the `.env` file in your project root:

1. Open the `.env` file in your editor
2. Replace the placeholder API keys with your actual keys:
   ```
   ANTHROPIC_API_KEY=your_actual_api_key_here
   # OPENAI_API_KEY=your_actual_api_key_here
   ```
3. Adjust any other configuration values as needed

### Step 4: Verify Installation

Verify that the installation was successful:

```bash
npm run test-langchain
npm run docker:health
```

### Step 5: Try the Example

Run the LangChain example to see the framework in action:

```bash
npm run langchain-example
```

## What Happens During Setup

The setup process performs several important tasks:

### 1. Directory Structure Creation

Creates the following directory structure:
```
.roo/
├── logs/
│   ├── orchestrator/
│   ├── code/
│   ├── architect/
│   ├── ask/
│   ├── debug/
│   ├── memory/
│   └── deep-research/
└── memory/
    ├── indices/
    └── assets/
```

### 2. Configuration Files Creation

Creates these configuration files:
- `.roomodes` - Mode configuration
- `.roo/boomerang-state.json` - Task tracking state
- `docker-compose.yml` - Docker container configuration

### 3. Docker Setup (Optional)

If you choose to start Docker containers during setup:
- Checks if Docker is installed
- Starts containers defined in docker-compose.yml
- Sets up database services for the framework

### 4. LangChain Integration (Optional)

If you choose to set up LangChain integration:
- Configures environment variables for LangChain
- Sets up connections to language models
- Enables enhanced memory capabilities

## Common Issues and Solutions

### API Key Issues

**Issue**: Missing or invalid API keys
**Solution**: Edit the `.env` file and add your valid API keys

### Docker Issues

**Issue**: Docker containers not starting
**Solution**: Check Docker installation and run:
```bash
docker compose up -d
```

### Dependency Issues

**Issue**: Package installation fails
**Solution**: Use the `--legacy-peer-deps` flag:
```bash
npm install @sdbingham/roo-framework --legacy-peer-deps
```

### Permission Issues

**Issue**: Permission denied when creating directories
**Solution**: Run the setup command with appropriate permissions

## Environment Variables Reference

The `.env` file contains these key sections:

### LangChain Configuration

```
# Enable LangChain memory adapter
USE_LANGCHAIN_MEMORY=true

# LLM Provider Configuration
ROO_LANGCHAIN_LLM_PROVIDER=anthropic
ROO_LANGCHAIN_LLM_MODEL=claude-3-sonnet-20250219

# Embedding Provider Configuration
ROO_LANGCHAIN_EMBEDDING_PROVIDER=openai
ROO_LANGCHAIN_EMBEDDING_MODEL=text-embedding-ada-002

# API Keys
ANTHROPIC_API_KEY=your_anthropic_api_key_here
# OPENAI_API_KEY=your_openai_api_key_here
```

### Docker Connection Configuration

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

### Docker Resource Limits

```
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
```

## Using the Framework

After installation, you can use the framework in your code:

```javascript
const rooFramework = require('@sdbingham/roo-framework');

// Use memory for knowledge management
rooFramework.memory.createMemoryAsset({
  type: rooFramework.memory.ASSET_TYPES.RESEARCH,
  name: 'Research on LangChain',
  content: 'Detailed findings about LangChain integration...',
  tags: ['langchain', 'memory', 'integration']
});

// Use boomerang for task tracking
rooFramework.boomerang.createTask({
  name: 'Implement LangChain Integration',
  description: 'Set up and test LangChain integration with Roo Framework',
  priority: 'high'
});

// Access LangChain memory controller
const memoryController = rooFramework.memoryController;

// Search for memory assets with semantic search
const results = await memoryController.searchMemoryAssets('langchain integration', {
  useSemanticSearch: true,
  limit: 5
});