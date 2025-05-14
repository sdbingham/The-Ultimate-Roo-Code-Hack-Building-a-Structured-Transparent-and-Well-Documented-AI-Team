# Changelog

All notable changes to the Roo Framework will be documented in this file.

## [4.3.2] - 2025-05-14

### Fixed
- Fixed database connection port mismatches in memory-mcp-adapter.js
- Updated port configurations to match Docker container settings:
  - Weaviate: Changed from port 8082 to 8081
  - Neo4j: Changed from port 7689 to 7688
  - MongoDB: Changed from port 27019 to 27018
  - Chroma: Changed from port 8002 to 8001
- Added MongoDB user creation step to setup documentation
- Improved connection testing approach for Weaviate and Chroma
- Enhanced troubleshooting documentation for database connections

## [4.3.1] - 2025-05-10

### Fixed
- Fixed memory mode transition issues
- Added proper error handling for memory operations
- Improved memory-related documentation
- Updated version numbers to reflect changes

## [4.3.0] - 2025-05-10

### Added
- Added enhanced memory integration with Orchestrator mode
- Improved memory asset management with relationship tracking
- Added memory-related examples and documentation
- Updated version numbers to reflect changes

## [4.2.9] - 2025-05-09

### Fixed
- Removed duplicate publishConfig in package.json
- Fixed conflicting registry configurations
- Ensured npm registry is used for publishing
- Updated version numbers to reflect changes

## [4.2.8] - 2025-05-09

### Fixed
- Removed GitHub Packages registry configuration from .npmrc files
- Simplified .npmrc files to use npm registry only
- Fixed environment variable issues with NPM_TOKEN
- Updated version numbers to reflect changes

## [4.2.7] - 2025-05-09

### Changed
- Updated package.json to publish to npm registry
- Added publishConfig with registry and access settings
- Updated version numbers to reflect changes

## [4.2.6] - 2025-05-09

### Fixed
- Updated authentication approach for GitHub Packages
- Added direct token configuration in .npmrc files
- Updated version numbers to reflect changes

## [4.2.5] - 2025-05-09

### Added
- Added .env files for GitHub Personal Access Token
- Updated INSTALLATION.md with .env file instructions
- Added dotenv integration instructions
- Updated version numbers to reflect changes

## [4.2.4] - 2025-05-09

### Added
- Added comprehensive installation guide (INSTALLATION.md)
- Added reference to installation guide in README.md
- Updated version numbers to reflect changes

## [4.2.3] - 2025-05-09

### Fixed
- Simplified registry configuration approach
- Removed dependenciesMeta section from package.json
- Added always-auth=false to .npmrc files
- Fixed installation errors related to dependency registry
- Updated version numbers to reflect changes

## [4.2.2] - 2025-05-09

### Fixed
- Added registry configuration for dependencies
- Created .npmrc file with proper registry settings
- Fixed installation errors related to dependency registry
- Updated version numbers to reflect changes

## [4.2.1] - 2025-05-09

### Fixed
- Added missing dependency: compute-cosine-similarity
- Fixed installation error related to missing dependency
- Updated version numbers to reflect changes

## [4.2.0] - 2025-05-09

### Added
- Added comprehensive documentation for memory features
- Updated memory documentation to reflect new implementation
- Added information about official database clients
- Added configuration guide for custom database connections

### Fixed
- Improved setup script to always prompt for Docker container startup
- Added more descriptive Docker setup instructions
- Ensured Docker setup runs regardless of verification status
- Fixed potential issue with Docker prompt being skipped

## [4.1.1] - 2025-05-09

### Fixed
- Fixed Weaviate container configuration by adding required persistence settings
- Added proper volume mounts for all database containers
- Removed obsolete version attribute from docker-compose.yml
- Improved Docker compatibility and stability

## [4.1.0] - 2025-05-09

### Added
- Added Docker integration with docker-compose.yml
- Added automatic Docker container startup in setup script
- Added Docker detection and error handling
- Added memory directory structure creation

### Changed
- Updated setup script to create and configure Docker environment
- Improved user experience with interactive prompts
- Enhanced post-setup instructions

## [4.0.0] - 2025-05-09

### Added
- Added integration with official database client libraries:
  - weaviate-ts-client for primary knowledge base
  - neo4j-driver for graph database
  - mongodb for document database
  - chromadb for vector database
- Added new memory-mcp-adapter.js implementation using official clients
- Added memory API documentation

### Changed
- Replaced custom MCP implementations with official client libraries
- Updated memory-related commands to use the new adapter
- Updated documentation to reflect the new memory architecture
- Updated directory structure to support the new memory implementation

### Fixed
- Fixed potential issues with memory-related dependencies

## [3.0.0] - 2025-04-15

### Added
- Added MCP-based Memory Mode architecture
- Added support for Weaviate, Neo4j, MongoDB, and Chroma MCP servers
- Added memory health check functionality
- Added knowledge capture and retrieval workflows
- Added semantic search capabilities
- Added relationship management for knowledge graphs

### Changed
- Updated Orchestrator Mode to integrate with Memory Mode
- Improved memory asset management
- Enhanced documentation with MCP architecture details

## [2.0.0] - 2025-03-01

### Added
- Added boomerang task management system
- Added mode management system
- Added CLI interface for framework management
- Added comprehensive documentation

### Changed
- Restructured directory organization
- Improved error handling and diagnostics

## [1.0.0] - 2025-02-01

### Added
- Initial release of the Roo Framework
- Basic directory structure
- Core utility functions
- Documentation