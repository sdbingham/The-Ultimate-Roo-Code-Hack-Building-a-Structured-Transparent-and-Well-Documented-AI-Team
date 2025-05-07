# Roo Multi-Agent Framework Package

A packaged version of the Structured, Transparent, and Well-Documented AI Team Framework for Roo.

## Overview

This package provides a streamlined way to incorporate the Roo Multi-Agent Framework into your projects. It includes:

- Specialized mode definitions
- Custom instructions for all modes
- Directory structure for organizing project artifacts
- Documentation and templates

## Features

- **Multi-Agent Framework**: Specialized modes for different types of tasks
- **SPARC Framework**: Structured approach to complex problem-solving
- **Agentic Boomerang**: Reliable task delegation and tracking system
- **Structured Documentation**: Consistent, traceable documentation
- **Token Optimization**: Efficient resource usage through the "Scalpel, not Hammer" approach

## Specialized Modes

The framework includes the following specialized modes:

- **🪃 Orchestrator**: Task decomposition, assignment, and verification
- **💻 Code**: Software implementation and optimization
- **🏛️ Architect**: System design and pattern application
- **❓ Ask**: Information retrieval, evaluation, and communication
- **🪲 Debug**: Problem diagnosis and solution validation
- **💾 Memory**: Knowledge storage, organization, and retrieval
- **🔍 Deep Research**: In-depth investigation and analysis

## Installation

### Prerequisites

- Node.js and npm
- GitHub account with a Personal Access Token (PAT) with `read:packages` scope
- VS Code with the Roo extension

### Setup Authentication

Create or edit `~/.npmrc` to include your GitHub authentication:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@yourusername:registry=https://npm.pkg.github.com
```

Replace `YOUR_GITHUB_TOKEN` with your GitHub PAT and `yourusername` with your GitHub username.

### Install the Package

```bash
# Install as a dev dependency
npm install --save-dev @yourusername/roo-framework
```

The package's postinstall script will automatically:
- Copy the `.roomodes` file to your project root
- Create the `.roo` directory structure
- Initialize the boomerang state file

## Usage

### Configure VS Code

1. Open VS Code settings
2. Navigate to the Roo extension settings
3. Set up custom instructions for all modes:

```javascript
// Get custom instructions from the package
const rooFramework = require('@yourusername/roo-framework');
const customInstructions = rooFramework.getCustomInstructions();

// Copy these instructions into the VS Code Roo extension settings
```

### Basic Workflow

1. **Start with Orchestrator Mode** - This is your project manager who will coordinate everything
2. **Describe your project** - Be as detailed as possible in your initial prompt
3. **Let Orchestrator break it down** - It will create subtasks and delegate to specialist modes
4. **Review the results** - Orchestrator will integrate all the pieces and present the final result

### Switching Modes

1. Click on the current mode name in the bottom left corner of the Roo interface
2. Select the desired mode from the dropdown menu

### Using the Enhance Prompt Feature

Access the enhance prompt template:

```javascript
const rooFramework = require('@yourusername/roo-framework');
const enhancePromptTemplate = rooFramework.getEnhancePromptTemplate();
```

Use this template to transform basic prompts into comprehensive, structured project prompts.

## Directory Structure

The framework creates the following directory structure in your project:

```
your-project/
├── .roomodes                      # Mode definitions
├── .roo/                          # Process documentation
│   ├── logs/                      # Activity logs by mode
│   │   ├── orchestrator/          # Orchestration decisions
│   │   ├── code/                  # Code implementation logs
│   │   └── [other_modes]/         # Mode-specific logs
│   ├── boomerang-state.json       # Task tracking
│   └── memory/                    # Knowledge storage
└── [your project files]
```

## Documentation Access

Access the framework documentation programmatically:

```javascript
const rooFramework = require('@yourusername/roo-framework');

// Get path to a specific documentation file
const readmePath = rooFramework.getDocumentationPath('README.md');

// Read documentation content
const meetTheTeam = rooFramework.readDocumentation('meet-the-team.md');
```

## Updating

When a new version of the package is released, update with:

```bash
npm update @yourusername/roo-framework
```

## Customization

You can customize the framework by:

1. Modifying the `.roomodes` file to adjust mode definitions
2. Editing the custom instructions in VS Code settings
3. Creating your own templates based on the framework's examples

## Troubleshooting

### Mode Configuration Issues

If modes aren't appearing correctly:
1. Verify that the `.roomodes` file exists in your project root
2. Check that the file has the correct format and content
3. Restart VS Code to apply changes

### Directory Structure Issues

If the `.roo` directory structure wasn't created properly:
1. Run the setup script manually:

```bash
node node_modules/@yourusername/roo-framework/scripts/setup.js
```

### Authentication Issues

If you can't install the package:
1. Ensure your PAT has the correct permissions
2. Verify your `.npmrc` file is correctly configured
3. Check that you're authenticated with GitHub Packages

## License

This package is based on the original Roo Multi-Agent Framework created by [Mnehmos](https://github.com/Mnehmos), which is licensed under the MIT License.

## Acknowledgments

- [Mnehmos](https://github.com/Mnehmos) - Creator of the original [Roo Multi-Agent Framework](https://github.com/Mnehmos/The-Ultimate-Roo-Code-Hack-Building-a-Structured-Transparent-and-Well-Documented-AI-Team)
- Contributors to the multi-agent AI research community
- The Roo Code team

If this package helps you build better AI systems, consider supporting the original creator:
- [Buy Me a Coffee](https://buymeacoffee.com/mnehmos)
- [Vario Research](https://mnehmos.github.io/VarioResearch/) for custom research reports