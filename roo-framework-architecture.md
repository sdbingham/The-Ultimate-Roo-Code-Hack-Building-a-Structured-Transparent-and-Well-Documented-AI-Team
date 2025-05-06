# Roo Framework Package Architecture

This document outlines the architectural design of the Roo Multi-Agent Framework package, explaining its components, interactions, and integration patterns.

## System Context

The Roo Framework Package operates within the following context:

```
┌─────────────────────────────────┐
│         VS Code Editor          │
│                                 │
│  ┌─────────────────────────┐    │
│  │      Roo Extension      │    │
│  └───────────┬─────────────┘    │
│              │                  │
│  ┌───────────▼─────────────┐    │
│  │   Roo Framework Package │    │
│  └───────────┬─────────────┘    │
│              │                  │
│  ┌───────────▼─────────────┐    │
│  │     User Project        │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

## Component Architecture

The package consists of the following key components:

### 1. Core Configuration

```
┌─────────────────────────────────┐
│       Core Configuration        │
│                                 │
│  ┌─────────────────────────┐    │
│  │      .roomodes          │    │
│  │   (Mode Definitions)    │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │   Custom Instructions   │    │
│  │  (SPARC & Boomerang)    │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

- **`.roomodes`**: Defines the specialized modes, their capabilities, and permissions
- **Custom Instructions**: Implements the SPARC framework and Boomerang logic

### 2. Directory Structure

```
┌─────────────────────────────────┐
│      Directory Structure        │
│                                 │
│  ┌─────────────────────────┐    │
│  │        .roo/            │    │
│  │                         │    │
│  │   ┌─────────────────┐   │    │
│  │   │      logs/      │   │    │
│  │   └─────────────────┘   │    │
│  │                         │    │
│  │   ┌─────────────────┐   │    │
│  │   │     memory/     │   │    │
│  │   └─────────────────┘   │    │
│  │                         │    │
│  │   ┌─────────────────┐   │    │
│  │   │boomerang-state.json│   │    │
│  │   └─────────────────┘   │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

- **`.roo/logs/`**: Stores activity logs for each mode
- **`.roo/memory/`**: Manages knowledge storage and retrieval
- **`.roo/boomerang-state.json`**: Tracks task delegation and completion

### 3. Package API

```
┌─────────────────────────────────┐
│          Package API            │
│                                 │
│  ┌─────────────────────────┐    │
│  │  getDocumentationPath() │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  readDocumentation()    │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  getCustomInstructions()│    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │getEnhancePromptTemplate()│    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

- Provides programmatic access to framework resources
- Enables integration with custom tooling and workflows

### 4. Setup Automation

```
┌─────────────────────────────────┐
│        Setup Automation         │
│                                 │
│  ┌─────────────────────────┐    │
│  │     postinstall         │    │
│  │      script             │    │
│  └───────────┬─────────────┘    │
│              │                  │
│  ┌───────────▼─────────────┐    │
│  │    Directory Creation   │    │
│  └───────────┬─────────────┘    │
│              │                  │
│  ┌───────────▼─────────────┐    │
│  │     File Copying        │    │
│  └───────────┬─────────────┘    │
│              │                  │
│  ┌───────────▼─────────────┐    │
│  │  State Initialization   │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

- Automatically sets up the framework during package installation
- Creates necessary directories and initializes state files

## Integration Patterns

### 1. NPM Package Integration

```
┌─────────────────────────────────┐
│     NPM Package Integration     │
│                                 │
│  ┌─────────────────────────┐    │
│  │   package.json          │    │
│  │   (dependencies)        │    │
│  └───────────┬─────────────┘    │
│              │                  │
│  ┌───────────▼─────────────┐    │
│  │   npm install           │    │
│  └───────────┬─────────────┘    │
│              │                  │
│  ┌───────────▼─────────────┐    │
│  │   postinstall script    │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

- Leverages standard npm package management
- Uses postinstall hooks for automatic setup

### 2. VS Code Integration

```
┌─────────────────────────────────┐
│       VS Code Integration       │
│                                 │
│  ┌─────────────────────────┐    │
│  │   .roomodes             │    │
│  │   (project modes)       │    │
│  └───────────┬─────────────┘    │
│              │                  │
│  ┌───────────▼─────────────┐    │
│  │   Roo Extension         │    │
│  │   (reads .roomodes)     │    │
│  └───────────┬─────────────┘    │
│              │                  │
│  ┌───────────▼─────────────┐    │
│  │   Custom Instructions   │    │
│  │   (in VS Code settings) │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

- Integrates with VS Code's Roo extension
- Configures modes and custom instructions

### 3. Project Structure Integration

```
┌─────────────────────────────────┐
│   Project Structure Integration │
│                                 │
│  ┌─────────────────────────┐    │
│  │   User Project          │    │
│  │                         │    │
│  │   ┌─────────────────┐   │    │
│  │   │  .roomodes      │   │    │
│  │   └─────────────────┘   │    │
│  │                         │    │
│  │   ┌─────────────────┐   │    │
│  │   │  .roo/          │   │    │
│  │   └─────────────────┘   │    │
│  │                         │    │
│  │   ┌─────────────────┐   │    │
│  │   │  Project Files  │   │    │
│  │   └─────────────────┘   │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

- Minimally invasive to existing project structures
- Adds only necessary configuration and directory structure

## Data Flow

The framework's data flow follows this pattern:

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │     │                     │
│  User Input         │────►│  Orchestrator Mode  │────►│  Specialist Mode    │
│  (Task Description) │     │  (Task Breakdown)   │     │  (Task Execution)   │
│                     │     │                     │     │                     │
└─────────────────────┘     └──────────┬──────────┘     └──────────┬──────────┘
                                       │                            │
                                       │                            │
                            ┌──────────▼──────────┐      ┌──────────▼──────────┐
                            │                     │      │                     │
                            │  .roo/logs/        │◄─────┤  Task Results       │
                            │  (Activity Logging) │      │  (Boomerang Return) │
                            │                     │      │                     │
                            └──────────┬──────────┘      └─────────────────────┘
                                       │
                                       │
                            ┌──────────▼──────────┐
                            │                     │
                            │  Final Result       │
                            │  (User Delivery)    │
                            │                     │
                            └─────────────────────┘
```

## Architectural Decisions

### 1. Package vs. Repository Clone

**Decision**: Package the framework as an npm module rather than requiring a repository clone.

**Rationale**:
- Simplifies installation and updates
- Provides a standardized integration method
- Enables version control and dependency management
- Reduces project clutter

### 2. Automatic Setup vs. Manual Configuration

**Decision**: Implement automatic setup via postinstall script.

**Rationale**:
- Reduces setup errors
- Ensures consistent configuration
- Improves developer experience
- Maintains framework integrity

### 3. Minimal Project Footprint

**Decision**: Add only essential files to the user's project.

**Rationale**:
- Minimizes interference with existing project structure
- Reduces potential conflicts
- Keeps the user's project clean
- Separates framework internals from project code

### 4. Programmatic Access to Documentation

**Decision**: Provide API for accessing documentation rather than copying it.

**Rationale**:
- Reduces duplication
- Ensures documentation stays current with package version
- Allows selective access to specific documentation
- Enables integration with custom tooling

## Quality Attributes

### 1. Maintainability

- **Modular Design**: Clear separation of components
- **Versioned Updates**: Semantic versioning for predictable updates
- **Documented Architecture**: Clear component relationships and interactions

### 2. Usability

- **Automated Setup**: Minimal manual configuration required
- **Clear Documentation**: Comprehensive usage instructions
- **Programmatic API**: Flexible integration options

### 3. Extensibility

- **Customizable Modes**: Ability to modify mode definitions
- **Pluggable Structure**: Framework components can be extended
- **API Access**: Programmatic access to framework resources

### 4. Security

- **Private Package**: Controlled access via GitHub Packages
- **Token Authentication**: Secure package retrieval
- **Isolated Resources**: Framework resources don't interfere with project

## Deployment View

```
┌─────────────────────────────────────────────────────────────────┐
│                      GitHub Packages Registry                    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                 Roo Framework Package                    │    │
│  └─────────────────────────────────────────────────────────┘    │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                      Developer Workstation                       │
│                                                                 │
│  ┌─────────────────────────┐       ┌─────────────────────────┐  │
│  │                         │       │                         │  │
│  │    VS Code + Roo        │◄──────┤   npm install          │  │
│  │                         │       │                         │  │
│  └─────────────────────────┘       └─────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                     User Project                         │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Evolution and Maintenance

### Version Management

- **Semantic Versioning**: Follow semver for predictable updates
- **Changelog**: Document changes between versions
- **Migration Guides**: Provide guidance for major version upgrades

### Customization Points

- **Mode Definitions**: Customizable via `.roomodes`
- **Custom Instructions**: Modifiable in VS Code settings
- **Directory Structure**: Extensible for project-specific needs

### Update Process

1. Update package version
2. Publish to GitHub Packages
3. Users update via npm
4. Postinstall script handles any necessary migrations

## Conclusion

The Roo Framework Package architecture provides a clean, maintainable, and extensible solution for integrating the multi-agent framework into projects. By packaging the framework as an npm module with automated setup, it minimizes configuration overhead while providing full access to the framework's capabilities.

This architecture balances several key concerns:
- Keeping user projects clean and uncluttered
- Providing full access to framework features
- Enabling easy updates and maintenance
- Supporting customization and extension

The result is a solution that makes the powerful Roo Multi-Agent Framework accessible and practical for a wide range of projects.