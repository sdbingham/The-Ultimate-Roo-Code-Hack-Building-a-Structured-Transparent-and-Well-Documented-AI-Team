# Changelog

All notable changes to the Roo Framework will be documented in this file.

## [4.5.3] - 2025-05-16

### Added
- Added unified provider configuration for both LLM and embeddings
- Added memory mode support for the unified provider configuration

### Fixed
- Fixed provider configuration to use a single API provider by default
- Fixed memory mode to work with the unified provider configuration

### Changed
- Modified LangChain adapter to use the same provider for both LLM and embeddings by default
- Updated all documentation to reflect the unified provider approach
- Updated environment variable handling to simplify API key management

## [4.5.2] - 2025-05-16

### Added
- Added direct .env file creation in post-install.js
- Added clear reminder to update API keys in .env file
- Added unified provider configuration for both LLM and embeddings

### Fixed
- Removed references to deleted scripts in package.json
- Updated post-install.js to not use generate-env command
- Fixed installation documentation to reflect simplified process
- Fixed provider configuration to use a single API provider by default

### Changed
- Removed unnecessary environment variable generation scripts
- Simplified installation process to two clear steps
- Updated documentation to reflect the new installation process
- Modified LangChain adapter to use the same provider for both LLM and embeddings by default

## [4.5.1] - 2025-05-16

### Added
- Added simplified setup scripts for LangChain integration
- Created comprehensive documentation for installation and usage
- Added support for newer versions of LangChain dependencies
- Made LangChain dependencies required instead of optional
- Added non-interactive mode to setup.js with command-line flags
- Added pre-configured .env file with placeholders for easy setup

### Fixed
- Fixed dependency conflicts with LangChain packages
- Resolved version inconsistencies across the project
- Improved error handling in setup process
- Enhanced installation documentation with troubleshooting steps
- Fixed setup script to work in both interactive and non-interactive environments
- Simplified environment variable configuration

### Changed
- Updated all version references to 4.5.1 for consistency
- Improved setup process with better error handling
- Enhanced documentation structure for clarity
- Moved LangChain dependencies from peer dependencies to regular dependencies
- Streamlined setup process by consolidating scripts and adding automation options
- Replaced environment variable generation scripts with a single, comprehensive .env file

## [4.5.0] - 2025-05-14

### Added
- Added LangChain MCP integration for enhanced memory capabilities
- Created hybrid approach to integrate LangChain with existing database systems
- Added feature flag system to toggle between original and LangChain adapters
- Added LangChain-specific features:
  - Enhanced semantic search using LLM embeddings
  - Asset summarization using LLMs
  - Related asset discovery
  - Chain of thought reasoning capabilities
- Added comprehensive documentation for LangChain integration
- Added example code for LangChain memory operations
- Added optional peer dependencies for LangChain packages

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

## [4.3.2] - 2025-05-10

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