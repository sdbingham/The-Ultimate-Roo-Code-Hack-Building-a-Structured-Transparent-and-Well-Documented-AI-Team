# Roo Framework v4.5.1

## Quick Start

For a quick setup of the Roo Framework with LangChain integration, run:

```bash
node quick-setup.js
```

This will:
1. Install LangChain dependencies
2. Add LangChain scripts to package.json
3. Update environment variables
4. Run the setup script
5. Set up LangChain integration
6. Test the LangChain integration

## Manual Setup

If you prefer to set up the framework manually, follow these steps:

### 1. Install the Roo Framework Package

```bash
npm install @sdbingham/roo-framework --legacy-peer-deps
```

LangChain dependencies are now included with the main package installation.

### 2. Add LangChain Scripts to package.json

```bash
node add-langchain-scripts.js
```

### 3. Set Up LangChain Integration

```bash
npm run setup-langchain
```

### 4. Test LangChain Integration

```bash
npm run test-langchain
```

## Usage

After setting up the framework, you can use it in your code:

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
```

## Available Scripts

- `npm run test-langchain`: Test LangChain integration
- `npm run langchain-example`: Run LangChain example
- `npm run setup-langchain`: Set up LangChain integration
- `npm run docker:health`: Check Docker container health
- `npm run env:generate`: Generate environment variables example
- `npm run docs:generate`: Generate Docker documentation

## Documentation

For more detailed documentation, see:

- [Docker Architecture Documentation](docker-architecture-documentation.md)
- [LangChain Integration Setup Guide](langchain-integration-setup-guide.md)
- [Environment Configuration Guide](environment-configuration-guide.md)

## Troubleshooting

If you encounter issues with the installation:

1. Make sure you have Node.js 14.x or higher installed
2. Try installing with the `--legacy-peer-deps` flag:
   ```bash
   npm install @sdbingham/roo-framework --legacy-peer-deps
   ```
3. Check the [Installation Troubleshooting Guide](installation-troubleshooting-guide.md)
