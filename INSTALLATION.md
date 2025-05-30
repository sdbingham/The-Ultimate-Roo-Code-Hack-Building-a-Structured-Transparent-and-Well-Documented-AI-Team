# Roo Framework Installation Guide

This guide provides comprehensive instructions for installing and setting up the Roo Framework v4.5.3 with LangChain integration.

## Prerequisites

- Node.js 14.x or higher
- npm 7.x or higher
- Docker and Docker Compose (for database containers)
- API keys for language models (Anthropic Claude or OpenAI)

## Quick Installation

For a streamlined installation process, follow these steps:

### 1. Configure Environment Variables

The project includes a pre-configured `.env` file with all necessary environment variables. Before running the setup:

1. Open the `.env` file in your project root
2. Replace the placeholder API keys with your actual keys:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   # OPENAI_API_KEY=your_openai_api_key_here
   ```
3. Adjust any other configuration values as needed

### 2. Run the Setup Script

```bash
node quick-setup.js
```

This script automates the installation process in a single non-interactive command, including:
1. Installing LangChain dependencies
2. Adding necessary scripts to package.json
3. Verifying environment variables
4. Running the framework setup (directory structure, Docker configuration)
5. Testing the LangChain integration

## Manual Installation

If you prefer to install the framework manually, follow these steps:

### 1. Install the Roo Framework Package

```bash
npm install @sdbingham/roo-framework --legacy-peer-deps
```

The `--legacy-peer-deps` flag is used to handle potential dependency conflicts. All LangChain dependencies are now included with the main package installation.

### 2. Configure Environment Variables

Create or update your `.env` file with the following settings:

```bash
# Enable LangChain adapter
USE_LANGCHAIN_MEMORY=true

# API keys for LLMs (at least one is required)
ANTHROPIC_API_KEY=your-anthropic-api-key
# OPENAI_API_KEY=your-openai-api-key

# Provider Configuration
# This setting controls which API provider to use for both LLM and embeddings
ROO_LANGCHAIN_LLM_PROVIDER=anthropic
ROO_LANGCHAIN_LLM_MODEL=claude-3-sonnet-20250219

# Embedding Provider Configuration (Optional)
# Only set this if you want to use a different provider for embeddings
# ROO_LANGCHAIN_EMBEDDING_PROVIDER=openai
ROO_LANGCHAIN_EMBEDDING_MODEL=text-embedding-ada-002
```

### 4. Run Setup Script

After installing the package, run the setup script:

```bash
npx roo-framework setup
```

This script will:
- Create the necessary directory structure
- Set up boomerang state tracking
- Create Docker configuration
- Optionally start Docker containers
- Set up LangChain integration

### 6. Verify Installation

```bash
# Check Docker container health
npm run docker:health
```

You can also verify the installation by checking that the directory structure was created correctly:

```bash
ls -la .roo
```

## Troubleshooting Common Issues

### Dependency Conflicts

If you encounter dependency conflicts, try the following solution:

1. **Use the `--legacy-peer-deps` flag**:
   ```bash
   npm install @sdbingham/roo-framework --legacy-peer-deps
   ```

LangChain dependencies are now included as regular dependencies in the package, so you don't need to install them separately.

### Missing Scripts

If you encounter "Missing script" errors, make sure you're using the correct commands:

```bash
npx roo-framework setup
```

The setup script is part of the package and should be available after installation.

### API Key Issues

If you encounter authentication errors:

```
Error: Authentication error: Invalid API key provided
```

Make sure you've set the correct API keys in your `.env` file.

### Database Connection Errors

If you encounter database connection errors:

1. Check that the database containers are running:
   ```bash
   docker compose ps
   ```

2. Verify the connection details in your `.env` file match the Docker container settings.

3. Check Docker logs for any issues:
   ```bash
   npm run docker:logs
   ```

## Next Steps

After successful installation:

1. Explore the [Docker Architecture Documentation](docker-architecture-documentation.md)

2. Review the [LangChain Integration Guide](langchain-integration-setup-guide.md)

3. Check the [Environment Configuration Guide](environment-configuration-guide.md)

4. Start using the framework in your code:
   ```javascript
   const rooFramework = require('@sdbingham/roo-framework');
   
   // Use the framework's memory system
   rooFramework.memory.createMemoryAsset({
     type: 'research',
     name: 'Example Memory Asset',
     content: 'This is an example memory asset'
   });
   ```