# LangChain Integration Guide

This guide explains how to use the LangChain integration with the Roo Framework Memory Mode. The integration provides enhanced memory capabilities through LangChain's components while maintaining compatibility with existing database systems.

## Table of Contents

- [Overview](#overview)
- [Benefits](#benefits)
- [Setup](#setup)
- [Usage](#usage)
- [Configuration](#configuration)
- [Advanced Features](#advanced-features)
- [Comparison with Original Adapter](#comparison-with-original-adapter)
- [Troubleshooting](#troubleshooting)
- [Related Documentation](#related-documentation)

## Overview

The LangChain integration adds powerful language model capabilities to the Roo Framework's Memory Mode. It allows you to leverage LangChain's components for tasks like semantic search, summarization, and relationship inference while maintaining compatibility with the existing memory infrastructure.

The integration follows a hybrid approach:

1. **Phase 1**: Add LangChain alongside the existing architecture
2. **Phase 2**: Evaluate component by component
3. **Phase 3**: Potential full migration based on evaluation results

This approach minimizes risk while allowing for incremental adoption of LangChain's capabilities.

## Benefits

The LangChain integration provides several benefits:

- **Enhanced Semantic Search**: Improved semantic understanding for more accurate search results
- **LLM-Powered Summarization**: Generate concise summaries of memory assets
- **Relationship Inference**: Automatically discover relationships between memory assets
- **Compatibility**: Works with existing database systems (Weaviate, Neo4j, MongoDB, Chroma)
- **Flexibility**: Toggle between original and LangChain adapters as needed
- **Robust Error Handling**: Graceful fallbacks when services are unavailable

## Setup

### Prerequisites

- Roo Framework 4.5.0 or higher
- Node.js 14.x or higher
- Access to LLM APIs (Anthropic Claude or OpenAI)

### Installation

For detailed installation instructions, see the [LangChain Setup Guide](./langchain-setup-guide.md).

Quick start:

1. Install the required dependencies:

```bash
npm install langchain @langchain/openai @langchain/anthropic @langchain/community
```

> **Note**: If you encounter dependency conflicts, see the [LangChain Dependency Guide](./langchain-dependency-guide.md) for solutions.

2. Set up environment variables:

```bash
# Enable LangChain adapter
export USE_LANGCHAIN_MEMORY=true

# API keys for LLMs
export ANTHROPIC_API_KEY=your-anthropic-api-key
export OPENAI_API_KEY=your-openai-api-key

# Optional: Configure LLM and embedding models
export ROO_LANGCHAIN_LLM_PROVIDER=anthropic
export ROO_LANGCHAIN_LLM_MODEL=claude-3-sonnet-20250219
export ROO_LANGCHAIN_EMBEDDING_PROVIDER=openai
export ROO_LANGCHAIN_EMBEDDING_MODEL=text-embedding-ada-002
```

### Using the Setup Script

The easiest way to set up the LangChain integration is to use the built-in setup script:

```bash
npx roo-framework langchain setup
```

This script will guide you through the setup process, including configuring API keys and environment variables.

## Usage

### Basic Usage

The LangChain integration maintains the same API as the original memory adapter, so you can use it with minimal changes to your code:

```javascript
// Import the Roo Framework
const rooFramework = require('@sdbingham/roo-framework');

// Create a memory asset
const asset = await rooFramework.memory.createMemoryAsset({
  type: rooFramework.memory.ASSET_TYPES.RESEARCH,
  name: 'Research on LangChain',
  content: 'Detailed findings about LangChain integration...',
  tags: ['langchain', 'memory', 'integration']
});

// Search for memory assets
const results = await rooFramework.memory.searchMemoryAssets('langchain integration', {
  useSemanticSearch: true,
  limit: 5
});
```

### LangChain-Specific Features

The LangChain adapter provides additional methods not available in the original adapter:

```javascript
// Generate a summary of a memory asset
const summary = await rooFramework.memory.generateAssetSummary(assetId, {
  maxLength: 100
});

// Find related assets
const relatedAssets = await rooFramework.memory.findRelatedAssets(assetId, {
  limit: 3
});
```

### Switching Between Adapters

You can toggle between the original and LangChain adapters at runtime:

```javascript
// Enable LangChain integration
rooFramework.enableLangChainMemory(true);

// Disable LangChain integration
rooFramework.enableLangChainMemory(false);

// Check if LangChain is enabled
const isEnabled = rooFramework.isLangChainMemoryEnabled();
console.log(`LangChain integration is ${isEnabled ? 'enabled' : 'disabled'}`);
```

You can also use different adapters for specific operations:

```javascript
// Get the memory controller
const memoryController = rooFramework.memoryController;

// Use original adapter for a specific operation
const asset = await memoryController.withAdapter('original', async (adapter) => {
  return await adapter.createMemoryAsset({
    type: adapter.ASSET_TYPES.CONCEPT,
    name: 'Original Adapter Concept',
    content: 'This asset was created using the original memory-mcp-adapter.',
    tags: ['original', 'adapter', 'test']
  });
});

// Use LangChain adapter for a specific operation
const langchainAsset = await memoryController.withAdapter('langchain', async (adapter) => {
  return await adapter.createMemoryAsset({
    type: adapter.ASSET_TYPES.CONCEPT,
    name: 'LangChain Adapter Concept',
    content: 'This asset was created using the LangChain memory adapter.',
    tags: ['langchain', 'adapter', 'test']
  });
});
```

## Configuration

The LangChain adapter can be configured using environment variables:

| Environment Variable | Description | Default Value |
|----------------------|-------------|---------------|
| `USE_LANGCHAIN_MEMORY` | Enable LangChain adapter | `false` |
| `ROO_LANGCHAIN_LLM_PROVIDER` | LLM provider (anthropic, openai) | `anthropic` |
| `ROO_LANGCHAIN_EMBEDDING_PROVIDER` | Embedding provider (openai) | `openai` |
| `ANTHROPIC_API_KEY` | Anthropic API key | - |
| `OPENAI_API_KEY` | OpenAI API key | - |
| `ROO_LANGCHAIN_LLM_MODEL` | LLM model name | `claude-3-sonnet-20250219` |
| `ROO_LANGCHAIN_EMBEDDING_MODEL` | Embedding model name | `text-embedding-ada-002` |

## Advanced Features

### Custom Embeddings

You can configure custom embeddings for different use cases:

```javascript
// In a future version, you'll be able to specify custom embedding models
process.env.ROO_LANGCHAIN_EMBEDDING_MODEL = 'text-embedding-3-large';
```

### Chain of Thought Reasoning

LangChain enables more sophisticated reasoning capabilities:

```javascript
// Example of future chain-of-thought feature
const reasoning = await memoryController.analyzeAssetRelationships(assetId, {
  reasoningDepth: 'deep',
  includeExplanations: true
});
```

### Retrieval-Augmented Generation (RAG)

Combine memory assets with LLM generation:

```javascript
// Example of future RAG feature
const response = await memoryController.generateResponseFromMemory(
  'What are the key benefits of LangChain integration?',
  {
    contextLimit: 5,
    responseFormat: 'markdown'
  }
);
```

## Comparison with Original Adapter

| Feature | Original Adapter | LangChain Adapter |
|---------|------------------|-------------------|
| Basic CRUD operations | ✅ | ✅ |
| Keyword search | ✅ | ✅ |
| Semantic search | ✅ (basic) | ✅ (enhanced) |
| Relationship management | ✅ | ✅ |
| Asset summarization | ❌ | ✅ |
| Related asset discovery | ❌ | ✅ |
| Chain of thought reasoning | ❌ | ✅ |
| Retrieval-augmented generation | ❌ | ✅ |
| Error handling | ✅ (basic) | ✅ (enhanced) |
| Database fallbacks | ❌ | ✅ |

## Troubleshooting

### Common Issues

#### Dependency Conflicts

If you encounter dependency conflicts when installing LangChain packages, see the [LangChain Dependency Guide](./langchain-dependency-guide.md) for detailed solutions.

#### API Key Issues

If you encounter errors related to API keys:

```
Error: Authentication error: Invalid API key provided
```

Make sure you've set the correct API keys in your environment variables:

```bash
export ANTHROPIC_API_KEY=your-anthropic-api-key
export OPENAI_API_KEY=your-openai-api-key
```

#### Memory Controller Not Found

If you get an error like:

```
Error: Cannot find module '@sdbingham/roo-framework/lib/langchain/memory-controller'
```

Make sure you're using Roo Framework 4.5.0 or higher, and that you've installed the required dependencies.

#### Database Connection Failures

The LangChain integration includes robust error handling for database connection failures. If a database service is unavailable, the system will gracefully fall back to available services.

If you see errors like:

```
Error connecting to Weaviate: Failed to connect
Error connecting to Neo4j: Failed to connect to server
```

Make sure your database services are running:

```bash
docker compose up -d
```

#### Compatibility Issues

If you encounter compatibility issues between the original and LangChain adapters, you can use the `withAdapter` method to ensure consistent behavior:

```javascript
// Force using the original adapter for compatibility
const result = await memoryController.withAdapter('original', async (adapter) => {
  return await adapter.searchMemoryAssets('query', options);
});
```

### Getting Help

If you encounter issues not covered in this guide, please:

1. Check the [examples directory](../examples/) for usage examples
2. Review the [API documentation](./memory-mode-guide.md) for more details
3. Submit an issue on the GitHub repository

## Related Documentation

- [LangChain Setup Guide](./langchain-setup-guide.md): Detailed setup instructions
- [LangChain Dependency Guide](./langchain-dependency-guide.md): Solutions for dependency conflicts
- [Memory Management Guide](./memory-management.md): General memory management documentation
- [Memory MCP Architecture](./memory-mcp-architecture.md): Architecture of the memory MCP system

## Next Steps

- Try the [LangChain Memory Example](../examples/langchain-memory-example.js)
- Run the [LangChain Integration Test](../scripts/test-langchain-integration.js)
- Explore the [LangChain documentation](https://js.langchain.com/docs/) for more advanced features
- Contribute to the development of the LangChain integration