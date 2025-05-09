# Roo Framework Project with MCP-based Memory Architecture v1.1.0

This project uses the Roo Framework with the new MCP-based Memory Mode architecture. The Memory Mode system has been completely redesigned to use a network of specialized MCP (Model Context Protocol) servers for improved performance, scalability, and reliability.

We're leveraging real, existing MCP implementations for various database types:

- **Weaviate MCP Server**: Official MCP server for Weaviate vector database integration, serving as the primary knowledge base for Memory Mode.
- **Neo4j MCP Server**: Official MCP server for Neo4j graph database integration, enabling relationship management between knowledge assets.
- **MongoDB MCP Server**: Official MCP server for MongoDB document database integration, providing flexible storage and backup capabilities.
- **Chroma MCP Server**: Official MCP server for Chroma vector database integration, specialized for semantic search capabilities.
- **mem0-mcp**: Modern memory system for AI applications with MCP integration, providing enhanced memory operations.

## MCP Implementation Status

The MCP-based Memory Mode architecture uses real, existing MCP implementations for various database types. These implementations are actively maintained, have good documentation, and are easy to integrate with the Roo Framework.

To use the MCP-based Memory Mode architecture:

1. Build and publish the updated package with the MCP-based Memory Mode implementation:
   ```bash
   cd roo-framework-package
   npm publish
   ```

2. Install the updated package in your project:
   ```bash
   npm install @sdbingham/roo-framework@latest
   ```

3. Follow the "Getting Started" instructions below to set up and use the MCP-based Memory Mode.

## MCP-based Memory Architecture

The Memory Mode system uses four specialized MCP servers:

- **Weaviate MCP**: Primary knowledge base with combined vector search and data storage
- **Neo4j MCP**: Graph database for managing complex relationships between memory assets
- **MongoDB MCP**: Document database for flexible storage and efficient querying
- **Chroma MCP**: Vector database optimized for semantic search operations

These servers are integrated through a unified adapter layer that provides a consistent API for interacting with the MCPs.

## MCP Server Locations and Testing

### MCP Server Locations

After installation and running the setup script, the MCP configurations are stored in the `.roo/mcp/` directory in your project root. Each MCP server has its own configuration file:

- `weaviate-server.json`: Configuration for the Weaviate MCP (primary knowledge base)
- `neo4j-server.json`: Configuration for the Neo4j MCP (graph database)
- `mongodb-server.json`: Configuration for the MongoDB MCP (document database)
- `chroma-server.json`: Configuration for the Chroma MCP (vector database)
- `mem0-server.json`: Configuration for the mem0-mcp server (enhanced memory operations)

The MCP servers themselves are Node.js packages that are installed as dependencies of the Roo Framework package.

### MCP Server Installation

The MCP servers are installed as dependencies of the Roo Framework package. You can install them manually using:

```bash
npm install @roo/mcp-weaviate-server @roo/mcp-neo4j-server @roo/mcp-mongodb-server @roo/mcp-chroma-server mem0-mcp
```

Or they will be installed automatically when you install the Roo Framework package.

### Testing the MCP Servers

You can test the MCP servers using the following commands:

1. **Check MCP Server Status**:
   ```bash
   npx roo-framework check-mcp-status
   ```
   This command will check the status of all MCP servers and show you which ones are running.

2. **Start MCP Servers**:
   ```bash
   npx roo-framework start-mcp-servers
   ```
   This command will start all MCP servers that are not already running.

3. **Run Comprehensive Tests**:
   ```bash
   node test-memory-mcp.js
   ```
   This command will run the comprehensive test suite for the MCP-based Memory Mode system, which includes:
   - Unit tests for the memory-mcp-adapter.js file
   - Integration tests for MCP server interaction
   - System tests for the entire Memory Mode system
   - Agent interaction tests for different Roo agents

4. **Run Specific Test Suites**:
   ```bash
   node test-memory-mcp.js unit       # Run unit tests only
   node test-memory-mcp.js integration # Run integration tests only
   node test-memory-mcp.js system     # Run system tests only
   node test-memory-mcp.js agents     # Run agent interaction tests only
   ```

## Testing the Memory MCP System

To test the Memory MCP system, use the following commands:

```bash
# Run all Memory MCP tests
npm test

# Run specific test suites
npm run test-memory-mcp-unit
npm run test-memory-mcp-integration
npm run test-memory-mcp-system
npm run test-memory-mcp-agents
```

## Debugging the Memory MCP System

To debug the Memory MCP system, use the following commands:

```bash
# Check status of all MCP servers
npm run debug-memory-mcp status

# Trace an operation through the adapter layer
npm run debug-memory-mcp trace <operation>

# Diagnose issues in the Memory Mode system
npm run debug-memory-mcp diagnose

# Get recommendations for optimizing performance
npm run debug-memory-mcp optimize
```

## Monitoring the Memory MCP System

To monitor the Memory MCP system in real-time, use the following command:

```bash
npm run memory-mcp-monitor
```

This will start a background service that monitors the status of all MCP servers and provides real-time updates on their performance.

## Documentation

For more information about the MCP-based Memory Mode architecture, see the following documentation:

- [Memory MCP Architecture](roo-framework-package/docs/memory-mcp-architecture.md): Detailed technical documentation of the MCP-based architecture
- [Test Memory MCP README](roo-framework-package/test/test-memory-mcp-readme.md): Documentation of the test suite
- [Debug Memory MCP README](roo-framework-package/scripts/debug-memory-mcp-readme.md): Documentation of the debugging tools
- [Memory MCP Test Report](roo-framework-package/test/memory-mcp-test-report.md): Detailed report of test results and recommendations

## Project Structure

- `roo-framework-package/`: The Roo Framework package with the MCP-based Memory Mode implementation
- `test-memory-mcp.js`: Script for running Memory MCP tests
- `debug-memory-mcp.js`: Script for debugging the Memory MCP system
- `memory-mcp-monitor.js`: Script for monitoring the Memory MCP system in real-time
- `package.json`: Project configuration with scripts for testing, debugging, and monitoring

## Getting Started

1. Build and publish the updated package with the MCP-based Memory Mode implementation:
   ```bash
   cd roo-framework-package
   npm publish
   ```

2. Install the updated package in your project:
   ```bash
   npm install @sdbingham/roo-framework@latest
   ```

3. Run the setup script:
   ```bash
   npx roo-framework setup
   ```

4. Check MCP server status:
   ```bash
   npx roo-framework check-mcp-status
   ```

5. Start MCP servers if needed:
   ```bash
   npx roo-framework start-mcp-servers
   ```

6. Run the tests:
   ```bash
   npm test
   ```

7. Start using the Roo Framework with MCP-based Memory Mode in your code:
   ```javascript
   const rooFramework = require('@sdbingham/roo-framework');
   const memory = rooFramework.memory;

   // Create a memory asset
   const asset = memory.createMemoryAsset({
     type: memory.ASSET_TYPES.CONCEPT,
     name: 'Semantic Search',
     content: 'Semantic search is a data searching technique...',
     tags: ['search', 'semantic', 'nlp']
   });
   ```

## Troubleshooting

If you encounter issues with the MCP-based Memory Mode architecture, check the following:

1. **MCP Directory Not Found**: If the `.roo/mcp/` directory is not found after running the setup script, it means you're using an older version of the package that doesn't include the MCP-based Memory Mode implementation. Make sure you've published and installed the updated package.

2. **MCP Commands Not Recognized**: If the `check-mcp-status` and `start-mcp-servers` commands are not recognized by the CLI, it means you're using an older version of the package. Make sure you've published and installed the updated package.

3. **MCP Servers Not Starting**: If the MCP servers don't start, check the error messages for details. You may need to install additional dependencies or configure your system to run the MCP servers.

## MCP Server Usage

Each MCP server provides specific tools for interacting with its underlying database:

### Weaviate MCP Server
```javascript
const result = await mcp.use({
  server: "weaviate-server",
  tool: "create_object",
  args: { class: "MemoryAsset", properties: {...} }
});
```

### Neo4j MCP Server
```javascript
const result = await mcp.use({
  server: "neo4j-server",
  tool: "create_relationship",
  args: { from_node: "sourceId", to_node: "targetId" }
});
```

### MongoDB MCP Server
```javascript
const result = await mcp.use({
  server: "mongodb-server",
  tool: "create_document",
  args: { collection: "memory_assets", document: {...} }
});
```

### Chroma MCP Server
```javascript
const result = await mcp.use({
  server: "chroma-server",
  tool: "query_embeddings",
  args: { collection: "memory_assets", query_text: "query" }
});
```

### mem0-mcp Server
```javascript
const result = await mcp.use({
  server: "mem0-server",
  tool: "add_memory",
  args: { content: "text", userId: "user1" }
});
```
