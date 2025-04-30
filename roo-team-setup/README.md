# Roo Team Setup

A command-line tool to quickly set up the Roo multi-agent framework workspace in your project.

## What is Roo?

Roo is a structured, transparent, and well-documented AI team that delegates its own tasks. It's a comprehensive AI workflow system based on the SPARC framework, enabling efficient task delegation, structured documentation, and knowledge preservation.

Learn more at: [The Ultimate Roo Code Hack](https://github.com/Mnehmos/The-Ultimate-Roo-Code-Hack-Building-a-Structured-Transparent-and-Well-Documented-AI-Team)

## Installation & Usage

### Using npx (recommended)

The easiest way to use this tool is with npx, which runs it without installing:

```bash
npx roo-team-setup
```

### Installing globally

Alternatively, you can install the tool globally:

```bash
npm install -g roo-team-setup
```

Then run it anytime:

```bash
roo-setup
```

## What Gets Created

The tool prompts you to choose between:

### Full Project Setup

Creates a complete Roo framework structure:

```
/
├── .roo/                     # Configuration files
│   ├── rules/                # General rules
│   ├── rules-orchestrator/   # Mode-specific rules
│   ├── rules-code/
│   ├── ...other mode rules
│   ├── config.json           # Framework configuration
│   └── logs/                 # Log directories
├── .roomodes                 # Mode definitions for VSCode
├── agents/                   # Agent definitions
│   ├── orchestrator/
│   ├── code/
│   └── ...other agents
├── framework/                # Framework documentation
├── best-practices/           # Best practices guides
└── templates/                # Reusable templates
```

### Configuration Only

Creates just the essential configuration files:

```
/
├── .roo/                     # Configuration files
│   ├── rules/                # General rules
│   ├── rules-*/              # Mode-specific rules
│   ├── config.json           # Framework configuration
│   └── logs/                 # Log directories
└── .roomodes                 # Mode definitions for VSCode
```

## Available Modes

The setup includes configuration for these specialized modes:

- **🪃 Orchestrator**: Task decomposition, assignment, and verification
- **💻 Code**: Software implementation and optimization
- **🏛️ Architect**: System design and pattern application
- **❓ Ask**: Information retrieval, evaluation, and communication
- **🪲 Debug**: Problem diagnosis and solution validation
- **💾 Memory**: Knowledge storage, organization, and retrieval
- **🔍 Deep Research**: In-depth investigation and analysis

## Requirements

- Node.js 14 or newer
- Compatible AI assistant that supports custom modes

## License

MIT