# LangChain Integration for Roo Framework

## Overview

The LangChain integration enhances the Roo Framework's memory capabilities by leveraging LangChain's powerful components while maintaining compatibility with existing database systems. This hybrid approach allows for incremental adoption and graceful fallbacks when services are unavailable.

## Key Features

- **Enhanced Semantic Search**: Improved search capabilities using LangChain's vector stores
- **AI-Powered Summaries**: Generate summaries of memory assets using LLMs
- **Related Asset Discovery**: Find semantically related assets using embedding similarity
- **Seamless Switching**: Toggle between original and LangChain adapters at runtime
- **Robust Error Handling**: Graceful fallbacks when services are unavailable

## Quick Start

### Installation

```bash
# Install dependencies (may require --force flag)
npm install langchain @langchain/openai @langchain/anthropic @langchain/community --force

# Run setup script
npx roo-framework langchain setup
```

### Configuration

```
# .env file
ANTHROPIC_API_KEY=your_anthropic_api_key
USE_LANGCHAIN_MEMORY=true
```

### Usage

```javascript
const rooFramework = require('@sdbingham/roo-framework');

// Create a memory asset
const asset = await rooFramework.memory.createMemoryAsset({
  type: 'concept',
  name: 'Example Concept',
  content: 'This is an example concept'
});

// Generate a summary (LangChain-specific feature)
const summary = await rooFramework.memory.generateAssetSummary(asset.id);
```

## Documentation

- [LangChain Integration Guide](./langchain-integration-guide-updated.md): Comprehensive guide to the LangChain integration
- [LangChain Setup Guide](./langchain-setup-guide.md): Detailed setup instructions
- [LangChain Dependency Guide](./langchain-dependency-guide.md): Solutions for dependency conflicts

## Architecture

The LangChain integration follows a hybrid architecture:

1. **Memory Controller**: Acts as a facade that dynamically forwards requests to either the original memory adapter or the LangChain adapter
2. **LangChain Adapter**: Implements the same interface as the original adapter but uses LangChain components
3. **Database Compatibility**: Works with the same database systems (Weaviate, Neo4j, MongoDB, Chroma)

## Examples

See the [examples directory](../examples/) for usage examples:

- [LangChain Memory Example](../examples/langchain-memory-example.js): Basic usage of the LangChain integration

## Testing

Run the integration test to verify that the LangChain integration is working correctly:

```bash
npx roo-framework langchain test
```

## Troubleshooting

If you encounter issues, see the [LangChain Integration Guide](./langchain-integration-guide-updated.md#troubleshooting) for solutions to common problems.

## Next Steps

- Try the [LangChain Memory Example](../examples/langchain-memory-example.js)
- Run the [LangChain Integration Test](../scripts/test-langchain-integration.js)
- Explore the [LangChain documentation](https://js.langchain.com/docs/) for more advanced features