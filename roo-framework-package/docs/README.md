# Roo Framework Documentation

Welcome to the Roo Framework documentation. This directory contains comprehensive documentation on various aspects of the framework.

## Documentation Index

### Core Documentation

- [Memory Management Guide](./memory-management.md) - Detailed documentation on the enhanced memory management features

### Package Structure Documentation

- [Package Structure Improvements](./package-structure-improvements.md) - Summary of improvements to the package structure
- [Package Structure Overview](./package-structure-overview.md) - Comprehensive overview of the package structure and components
- [NPM Package Structure](./npm-package-structure.md) - Guidance on the recommended package structure for npm publication
- [Using .npmignore](./using-npmignore.md) - Guide on using .npmignore for controlling package contents
- [Implementing Package Structure](./implementing-package-structure.md) - Step-by-step guide for implementing the optimized package structure
- [.npmignore Template](./npmignore-template.md) - Sample .npmignore template that can be used as a starting point

### Additional Resources

- [Main README](../README.md) - Overview, installation instructions, usage examples, and API reference
- [Detailed Mode Creation Guide](../detailed-mode-creation-guide.md) - Comprehensive guide for creating custom modes
- [Meet the Team](../meet-the-team.md) - Information about the framework's team and contributors

## Getting Started

If you're new to the Roo Framework, we recommend starting with the [Main README](../README.md) for an overview of the framework and installation instructions.

For specific topics:

1. **Setting up the framework**: Follow the installation instructions in the [Main README](../README.md)
2. **Understanding the package structure**: Read the [Package Structure Overview](./package-structure-overview.md)
3. **Working with memory management**: Refer to the [Memory Management Guide](./memory-management.md)
4. **Creating custom modes**: Follow the [Detailed Mode Creation Guide](../detailed-mode-creation-guide.md)
5. **Publishing the package**: See the [NPM Package Structure](./npm-package-structure.md) and [Using .npmignore](./using-npmignore.md) guides

## Package Structure Optimization

The package structure is optimized automatically during installation. When you install the package with:

```bash
npm install --save-dev @sdbingham/roo-framework
```

The postinstall script automatically:
1. Creates a recommended `.npmignore` file in your project root
2. Sets up the complete directory structure
3. Initializes all necessary files

No additional steps are needed - everything is ready to go immediately after installation!

For more information, see the [Implementing Package Structure](./implementing-package-structure.md) guide.

## Framework Architecture

The Roo Framework is built around several key components:

1. **Multi-Agent Framework**: Specialized modes for different types of tasks
2. **SPARC Framework**: Structured approach to complex problem-solving
3. **Agentic Boomerang**: Reliable task delegation and tracking system
4. **Structured Documentation**: Consistent, traceable documentation
5. **Token Optimization**: Efficient resource usage
6. **Memory Management**: Comprehensive knowledge storage and retrieval system

Each component is designed to work together to provide a comprehensive solution for building multi-agent AI systems.

## Contributing

If you'd like to contribute to the documentation, please follow these guidelines:

1. Use clear, concise language
2. Include examples where appropriate
3. Follow the existing documentation structure
4. Update the documentation index when adding new files

## Support

If you have questions or need help with the framework, please:

1. Check the existing documentation
2. Look for examples in the codebase
3. Reach out to the maintainers through the GitHub repository

Thank you for using the Roo Framework!