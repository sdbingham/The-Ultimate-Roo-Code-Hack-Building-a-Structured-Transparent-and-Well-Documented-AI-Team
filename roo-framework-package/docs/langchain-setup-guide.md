# LangChain Setup Guide

## Installation Process

Setting up the LangChain integration with the Roo Framework involves two main steps:

1. **Install the required dependencies**
2. **Configure the environment**

This guide explains the process in detail and provides solutions for common issues.

## Step 1: Install Dependencies

### Required Packages

The LangChain integration requires the following packages:

- `langchain`: The core LangChain library
- `@langchain/openai`: OpenAI integration for LangChain
- `@langchain/anthropic`: Anthropic (Claude) integration for LangChain
- `@langchain/community`: Community integrations for LangChain

### Installation Command

```bash
npm install langchain @langchain/openai @langchain/anthropic @langchain/community
```

### Handling Dependency Conflicts

You might encounter dependency conflicts when installing these packages. See the [LangChain Dependency Guide](./langchain-dependency-guide.md) for solutions.

## Step 2: Configure the Environment

### Using the Setup Script

The easiest way to configure the environment is to use the built-in setup script:

```bash
npx roo-framework langchain setup
```

This script will:

1. Ask for your API keys (Claude and optionally OpenAI)
2. Create or update your `.env` file with the necessary configuration
3. Set up the LangChain integration

### Manual Configuration

If you prefer to configure the environment manually, add the following to your `.env` file:

```
# LangChain API Keys
ANTHROPIC_API_KEY=your_anthropic_api_key
OPENAI_API_KEY=your_openai_api_key

# LangChain Configuration
USE_LANGCHAIN_MEMORY=true
```

## Testing the Integration

After installation and configuration, you can test the integration:

```bash
npx roo-framework langchain test
```

This will verify that the LangChain integration is working correctly with your configured API keys and database services.

## Using the LangChain Integration

### In Your Code

```javascript
const rooFramework = require('@sdbingham/roo-framework');

// Check if LangChain is enabled
const isEnabled = rooFramework.isLangChainMemoryEnabled();
console.log(`LangChain integration is ${isEnabled ? 'enabled' : 'disabled'}`);

// Enable or disable LangChain integration at runtime
rooFramework.enableLangChainMemory(true);

// Use memory operations (automatically uses the active adapter)
const asset = rooFramework.memory.createMemoryAsset({
  type: 'concept',
  name: 'Example Concept',
  content: 'This is an example concept'
});
```

### LangChain-Specific Features

When the LangChain integration is enabled, you get access to additional features:

```javascript
// Generate a summary of a memory asset
const summary = rooFramework.memory.generateAssetSummary(assetId);

// Find related assets using semantic search
const relatedAssets = rooFramework.memory.findRelatedAssets(assetId);
```

## Troubleshooting

### Database Connection Issues

The LangChain integration requires the same database services as the original memory adapter. If you encounter database connection issues, make sure the services are running:

```bash
docker compose up -d
```

### API Key Issues

If you encounter issues with the API keys, make sure they are correctly set in your `.env` file. The LangChain integration uses:

- `ANTHROPIC_API_KEY` for Claude
- `OPENAI_API_KEY` for OpenAI

You can also use `CLAUDE_API_KEY` instead of `ANTHROPIC_API_KEY`.

### Dependency Issues

If you encounter dependency issues, see the [LangChain Dependency Guide](./langchain-dependency-guide.md) for solutions.