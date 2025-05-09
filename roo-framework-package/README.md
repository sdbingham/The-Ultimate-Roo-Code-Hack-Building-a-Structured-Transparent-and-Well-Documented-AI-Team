# Roo Framework

A structured, transparent, and well-documented AI team framework for managing multi-agent workflows.

![Roo Framework](https://img.shields.io/badge/Roo-Framework-blue)
![Version](https://img.shields.io/badge/Version-4.2.5-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## What is the Roo Framework?

The Roo Framework is a comprehensive system for organizing and managing AI agent workflows. It provides a structured approach to:

- **Mode Management**: Define specialized AI agent modes with specific capabilities and permissions
- **Memory Management**: Store and retrieve knowledge across agent interactions using official database clients
- **Boomerang Task Management**: Track tasks as they move between different agent modes
- **Standardized Documentation**: Maintain consistent documentation across your AI team

## Features

- **Mode System**: Define custom modes with specific roles, permissions, and instructions
- **Memory System**: Store and retrieve knowledge assets using industry-standard databases
- **Boomerang System**: Track tasks as they transition between different modes
- **CLI Interface**: Manage your AI team through an easy-to-use command line interface
- **Directory Structure**: Organized file structure for all AI team artifacts

## Advanced Memory Features

The Roo Framework includes powerful memory management capabilities through official client libraries for industry-standard databases:

### Weaviate (Primary Knowledge Base)

Serves as the primary knowledge base for Memory Mode:
- Combined vector search and data storage
- Schema-based data modeling
- Automatic vectorization of content
- Cross-references between objects

### Neo4j (Graph Database)

Manages relationships between memory assets:
- Native graph database for complex relationship modeling
- Cypher query language for traversing relationships
- Support for various relationship types and properties
- Bidirectional traversal (incoming and outgoing relationships)

### MongoDB (Document Database)

Provides flexible document storage:
- Schema-less document storage for memory assets
- Rich querying capabilities
- Efficient indexing for fast retrieval
- Backup storage for redundancy

### Chroma (Vector Database)

Enables advanced semantic search:
- Specialized vector database for embeddings
- Nearest neighbor search algorithms
- Filtering and metadata-based search
- Optimized for semantic similarity operations

## Installation

### Installation Command

```bash
npm install --save-dev @sdbingham/roo-framework
```

This package includes all required dependencies for the Roo Framework.

For GitHub Packages, use:

```bash
npm install --save-dev @sdbingham/roo-framework --registry=https://npm.pkg.github.com
```

Make sure you have authenticated with GitHub Packages first:

```bash
npm login --registry=https://npm.pkg.github.com
```

For detailed installation instructions, troubleshooting, and configuration options, see the [Installation Guide](./INSTALLATION.md).

### Setup

After installing the package, you need to run the setup script to create the necessary files and directories:

```bash
npx roo-framework setup
```

This setup script will:
1. Create the `.roomodes` file in your project root
2. Set up the `.roo` directory structure
3. Initialize all required files with the correct content

The setup script will guide you through the process and confirm the project root directory before creating any files.

### Importing in Your Code

After setup, you can import the framework in your code:

```javascript
const rooFramework = require('@sdbingham/roo-framework');
```

## Directory Structure

The Roo Framework creates the following directory structure in your project:

```
.roomodes                      # Mode definitions file
.roo/                          # Root directory for all Roo Framework files
├── logs/                      # Activity logs
│   ├── orchestrator/          # Orchestrator mode logs
│   ├── code/                  # Code mode logs
│   ├── architect/             # Architect mode logs
│   ├── ask/                   # Ask mode logs
│   ├── debug/                 # Debug mode logs
│   ├── memory/                # Memory mode logs
│   └── deep-research/         # Deep Research mode logs
├── memory/                    # Memory system
│   ├── indices/               # Memory indices
│   └── assets/                # Memory assets
└── boomerang-state.json       # Boomerang task state
```

## User Guide

### CLI Interface

The Roo Framework provides a command-line interface for easy interaction:

```bash
npx roo-framework <command> [options]
```

#### Available Commands

- `setup`: Set up the Roo Framework
- `verify`: Verify the Roo Framework installation
- `memory <subcommand>`: Memory management commands
- `boomerang <subcommand>`: Boomerang task management commands
- `mode <subcommand>`: Mode management commands
- `help`: Show help information
- `version`: Show version information

### Mode Management

Modes define specialized AI agent roles with specific capabilities and permissions.

#### Listing Available Modes

```bash
npx roo-framework mode list
```

#### Getting Mode Information

```bash
npx roo-framework mode info <slug>
```

Example:
```bash
npx roo-framework mode info code
```

### Memory Management

The memory system allows storing and retrieving knowledge across agent interactions using official client libraries for industry-standard databases.

#### Listing Memory Assets

```bash
npx roo-framework memory list
```

#### Creating a Memory Asset

```bash
npx roo-framework memory create
```

This creates a new memory asset with the specified type, name, content, and tags.

#### Getting a Memory Asset

```bash
npx roo-framework memory get <id>
```

Retrieves a specific memory asset by its ID, showing both metadata and content.

#### Searching Memory Assets

```bash
npx roo-framework memory search <query>
```

Performs a semantic search across all memory assets, returning results ranked by relevance.

#### Creating Relationships (Knowledge Graph)

```bash
npx roo-framework memory relate <sourceId> <targetId> <type>
```

Creates a relationship between two memory assets, building a knowledge graph. Supported relationship types include:
- related_to
- depends_on
- implements
- extends
- references
- supersedes
- contradicts
- derived_from

#### Viewing Relationships

```bash
npx roo-framework memory relationships <id>
```

Shows all relationships (both incoming and outgoing) for a specific memory asset.

### Boomerang Task Management

The boomerang system tracks tasks as they transition between different modes.

#### Listing Boomerang Tasks

```bash
npx roo-framework boomerang list
```

#### Creating a Boomerang Task

```bash
npx roo-framework boomerang create
```
Note: This feature is planned for future implementation.

#### Getting Task Status

```bash
npx roo-framework boomerang status <id>
```
Note: This feature is planned for future implementation.

#### Updating a Task

```bash
npx roo-framework boomerang update <id>
```
Note: This feature is planned for future implementation.

## Troubleshooting

### Troubleshooting

If you encounter any issues during setup, you can use the diagnostic tools included with the package:

```bash
# Run the diagnostic script to identify project root issues
npx roo-framework diagnose

# Verify the framework installation
npx roo-framework verify
```

Common issues and solutions:

1. **Wrong project root detected**: The setup script will ask you to confirm the project root directory. If it's incorrect, you can specify the correct path.

2. **Permission issues**: Make sure you have write permissions to the project directory.

3. **Missing files after setup**: Run `npx roo-framework verify` to check which files are missing, then run the setup script again.

### Verifying Installation

You can verify that all required files exist in your project root:

```bash
npx roo-framework verify
```

This will check if all required files exist and show any missing files.

### Accessing Roo Directory

You can access the Roo directory programmatically:

```javascript
const rooFramework = require('@sdbingham/roo-framework');
const rooDirectory = rooFramework.getRooDirectory();
console.log(`Roo directory is located at: ${rooDirectory}`);
```

### CLI Commands Not Working

If CLI commands aren't working, verify that the framework is set up correctly:

```bash
npx roo-framework verify
```

## API Reference

The Roo Framework provides a JavaScript API for programmatic access:

### Core API

```javascript
const rooFramework = require('@sdbingham/roo-framework');

// Get project root
const projectRoot = rooFramework.getProjectRoot();

// Get boomerang state
const boomerangState = rooFramework.getBoomerangState();

// Update boomerang state
rooFramework.updateBoomerangState(newState);

// Log mode activity
rooFramework.logModeActivity('code', 'Implemented new feature');

// Verify setup
const setupStatus = rooFramework.verifySetup();
```

### Memory API

```javascript
const memory = require('@sdbingham/roo-framework').memory;

// Create a memory asset
const asset = memory.createMemoryAsset({
  type: 'concept',
  name: 'Semantic Search',
  content: 'Semantic search is a data searching technique...',
  tags: ['search', 'semantic', 'nlp']
});

// List all memory assets
const assets = memory.listMemoryAssets();

// Get a specific memory asset
const asset = memory.getMemoryAsset('concept-123456');

// Search memory assets
const results = memory.searchMemoryAssets('semantic', {
  useSemanticSearch: true
});

// Create a relationship between assets
const relationship = memory.createRelationship({
  sourceId: 'concept-123456',
  targetId: 'concept-789012',
  type: memory.RELATIONSHIP_TYPES.RELATED_TO,
  description: 'These concepts are related'
});

// Get relationships for an asset
const relationships = memory.getAssetRelationships('concept-123456', {
  direction: 'both'
});
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.