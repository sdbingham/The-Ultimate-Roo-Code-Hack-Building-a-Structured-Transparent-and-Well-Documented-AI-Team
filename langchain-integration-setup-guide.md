# LangChain Integration Setup Guide for Roo Framework

## Overview

This guide provides step-by-step instructions for setting up the LangChain integration with the Roo Framework. The integration enhances the memory capabilities of the framework with advanced language model features.

## Prerequisites

- Node.js 14.x or higher
- npm 7.x or higher
- Roo Framework 4.3.2 or higher
- Access to LLM APIs (Anthropic Claude or OpenAI)

## Installation Steps

### 1. Install Required Dependencies

First, install the LangChain dependencies in your project:

```bash
npm install langchain @langchain/openai @langchain/anthropic @langchain/community
```

### 2. Configure Environment Variables

Create or update your `.env` file with the following LangChain-specific settings:

```bash
# Enable LangChain adapter
USE_LANGCHAIN_MEMORY=true

# API keys for LLMs (at least one is required)
ANTHROPIC_API_KEY=your-anthropic-api-key
# OPENAI_API_KEY=your-openai-api-key

# Optional: Configure LLM and embedding models
# Provider Configuration
# This setting controls which API provider to use for both LLM and embeddings
ROO_LANGCHAIN_LLM_PROVIDER=anthropic
ROO_LANGCHAIN_LLM_MODEL=claude-3-sonnet-20250219

# Embedding Provider Configuration (Optional)
# Only set this if you want to use a different provider for embeddings
# ROO_LANGCHAIN_EMBEDDING_PROVIDER=openai
ROO_LANGCHAIN_EMBEDDING_MODEL=text-embedding-ada-002
```

### 3. Update package.json Scripts

Add the following scripts to your project's `package.json` file:

```json
"scripts": {
  // ... existing scripts
  "test-langchain": "node ./node_modules/@sdbingham/roo-framework/scripts/test-langchain-integration.js",
  "langchain-example": "node ./node_modules/@sdbingham/roo-framework/examples/langchain-memory-example.js",
  "setup-langchain": "node ./node_modules/@sdbingham/roo-framework/scripts/setup-langchain-env.js"
}
```

### 4. Run Setup Script

Execute the LangChain setup script to configure your environment:

```bash
npm run setup-langchain
```

### 5. Verify Installation

Test the LangChain integration to ensure it's working correctly:

```bash
npm run test-langchain
```

## Usage Examples

### Basic Memory Operations with LangChain

```javascript
// Import the memory controller
const memoryController = require('@sdbingham/roo-framework').memory;

// Create a memory asset
const asset = await memoryController.createMemoryAsset({
  type: memoryController.ASSET_TYPES.RESEARCH,
  name: 'Research on LangChain',
  content: 'Detailed findings about LangChain integration...',
  tags: ['langchain', 'memory', 'integration']
});

// Search for memory assets with semantic search
const results = await memoryController.searchMemoryAssets('langchain integration', {
  useSemanticSearch: true,
  limit: 5
});
```

### Advanced LangChain Features

```javascript
// Generate a summary of a memory asset
const summary = await memoryController.generateAssetSummary(assetId, {
  maxLength: 100
});

// Find related assets
const relatedAssets = await memoryController.findRelatedAssets(assetId, {
  limit: 3
});

// Use retrieval-augmented generation
const response = await memoryController.generateResponseFromMemory(
  'What are the key benefits of LangChain integration?',
  {
    contextLimit: 5,
    responseFormat: 'markdown'
  }
);
```

## Configuration Options

| Environment Variable | Description | Default Value |
|----------------------|-------------|---------------|
| `USE_LANGCHAIN_MEMORY` | Enable LangChain adapter | `false` |
| `ROO_LANGCHAIN_LLM_PROVIDER` | Provider for both LLM and embeddings (anthropic, openai) | `anthropic` |
| `ROO_LANGCHAIN_EMBEDDING_PROVIDER` | Optional: Override embedding provider | Same as LLM provider |
| `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` | API key for the chosen provider | - |
| `OPENAI_API_KEY` | OpenAI API key | - |
| `ROO_LANGCHAIN_LLM_MODEL` | LLM model name | `claude-3-sonnet-20250219` |
| `ROO_LANGCHAIN_EMBEDDING_MODEL` | Embedding model name | `text-embedding-ada-002` |

## Troubleshooting

### Common Issues

#### API Key Errors

If you encounter authentication errors:

```
Error: Authentication error: Invalid API key provided
```

Make sure you've set the correct API keys in your `.env` file.

#### Memory Controller Not Found

If you get an error like:

```
Error: Cannot find module '@sdbingham/roo-framework/lib/langchain/memory-controller'
```

Make sure you're using Roo Framework 4.3.2 or higher, and that you've installed the required dependencies.

#### Compatibility Issues

If you encounter compatibility issues between the original and LangChain adapters, you can use the `withAdapter` method to ensure consistent behavior:

```javascript
// Force using the original adapter for compatibility
const result = await memoryController.withAdapter('original', async (adapter) => {
  return await adapter.searchMemoryAssets('query', options);
});
```

## Architecture Integration

The LangChain integration follows a hybrid approach that maintains compatibility with existing database systems while adding enhanced language model capabilities:

```
┌─────────────────────────────────────────┐
│         Memory Controller API           │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│         Adapter Selection Layer         │
└───────────────┬─────────┬───────────────┘
                │         │
    ┌───────────▼─────┐   │   ┌───────────▼─────┐
    │  Original MCP   │   │   │   LangChain     │
    │    Adapter      │   │   │    Adapter      │
    └───────────┬─────┘   │   └───────────┬─────┘
                │         │               │
                │         │               │
                │         │               ▼
                │         │   ┌───────────────────┐
                │         │   │  LangChain Core   │
                │         │   └───────────┬───────┘
                │         │               │
                │         └───────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│           Database Layer                │
│  ┌────────┐ ┌────────┐ ┌────────────┐  │
│  │Weaviate│ │ Neo4j  │ │  MongoDB   │  │
│  └────────┘ └────────┘ └────────────┘  │
│             ┌────────┐                 │
│             │ChromaDB│                 │
│             └────────┘                 │
└─────────────────────────────────────────┘
```

## Next Steps

- Try the LangChain example: `npm run langchain-example`
- Explore the [LangChain documentation](https://js.langchain.com/docs/) for more advanced features
- Review the [Docker Architecture Documentation](docker-architecture-documentation.md) for container setup
- Check the [Environment Configuration Guide](environment-configuration-guide.md) for detailed environment setup