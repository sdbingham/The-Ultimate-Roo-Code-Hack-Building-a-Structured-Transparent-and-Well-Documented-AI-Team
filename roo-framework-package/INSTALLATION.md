# Roo Framework Installation Guide

This guide provides detailed instructions for installing and using the Roo Framework package.

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Docker (for running the database containers)

## Installation

### 1. Configure npm for GitHub Packages

Create a `.npmrc` file in your project root with the following content:

```
@sdbingham:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
registry=https://registry.npmjs.org/
always-auth=false
```

### 2. Set up GitHub Authentication

You need a GitHub Personal Access Token with the `read:packages` scope to install packages from GitHub Packages.

1. Create a Personal Access Token on GitHub:
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Generate a new token with the `read:packages` scope
   - Copy the token

2. Set the NPM_TOKEN using a .env file:

   Create a `.env` file in your project root with the following content:
   ```
   # GitHub Personal Access Token for npm authentication
   NPM_TOKEN=your_github_personal_access_token
   ```

   Alternatively, you can set the environment variable directly:

   **On Linux/macOS:**
   ```bash
   export NPM_TOKEN=your_github_personal_access_token
   ```

   **On Windows (Command Prompt):**
   ```cmd
   set NPM_TOKEN=your_github_personal_access_token
   ```

   **On Windows (PowerShell):**
   ```powershell
   $env:NPM_TOKEN="your_github_personal_access_token"
   ```

3. Install dotenv to load the .env file:
   ```bash
   npm install dotenv
   ```

   Then in your scripts that need the token:
   ```javascript
   require('dotenv').config();
   // Now process.env.NPM_TOKEN is available
   ```

### 3. Install the Package

```bash
npm install @sdbingham/roo-framework
```

If you want to install a specific version:

```bash
npm install @sdbingham/roo-framework@4.2.3
```

## Troubleshooting Installation Issues

### Clear npm Cache

If you encounter installation issues, try clearing the npm cache:

```bash
npm cache clean --force
```

### Verify Authentication

Make sure your GitHub authentication is working:

```bash
npm whoami --registry=https://npm.pkg.github.com/
```

If this doesn't show your GitHub username, your authentication is not set up correctly.

### Check .npmrc Configuration

Ensure your `.npmrc` file is correctly configured:

1. It should be in your project root
2. It should have the correct registry URLs
3. The `NPM_TOKEN` environment variable should be set

### Try Local Installation

If you have a local copy of the package, you can install it directly:

```bash
npm install file:/path/to/roo-framework-package
```

## Post-Installation Setup

After installing the package, you need to run the setup script:

```bash
npx roo-framework setup
```

This will:
1. Create the necessary directory structure
2. Set up the boomerang state tracking system
3. Create a docker-compose.yml file for the required databases

## Starting the Docker Containers

The setup script will ask if you want to start the Docker containers. If you choose yes, it will start them automatically.

You can also start them manually:

```bash
docker compose up -d
```

## Verifying Installation

To verify that the installation was successful:

```bash
npx roo-framework verify
```

## Using the Framework

After installation and setup, you can use the framework in your code:

```javascript
const rooFramework = require('@sdbingham/roo-framework');

// Use memory for knowledge management
const memory = rooFramework.memory;
const asset = memory.createMemoryAsset({
  type: 'concept',
  name: 'Example Concept',
  content: 'This is an example concept',
  tags: ['example', 'concept']
});

// Use boomerang for task tracking
const boomerang = rooFramework.boomerang;
const task = boomerang.createTask({
  title: 'Example Task',
  description: 'This is an example task',
  status: 'pending'
});
```

## Documentation

For more information, see the documentation:

- [Memory Mode Guide](./docs/memory-mode-guide.md)
- [Memory Management](./docs/memory-management.md)
- [Memory MCP Architecture](./docs/memory-mcp-architecture.md)

## Examples

Check out the examples directory for usage examples:

- [Memory Integration Example](./examples/memory-integration-example.js)

## Support

If you encounter any issues, please open an issue on the GitHub repository.