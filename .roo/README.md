# The Ultimate Roo Code Hack: .roo Configuration

This directory contains the configuration and runtime files for the multi-agent AI framework that implements the SPARC (Specification, Pseudocode, Architecture, Refinement, Completion) methodology. This README provides an overview of how the configuration is structured and how to use it.

## Directory Structure

```
.roo/
├── config.json              # Main configuration file
├── boomerang-state.json     # Task tracking and workflow state
├── logs/                    # Activity logs for each mode
│   ├── architect-activity.md
│   ├── code-activity.md
│   └── ...
├── memory/                  # Memory storage system
│   ├── projects/            # Project-specific memory
│   ├── knowledge/           # Cross-project knowledge
│   ├── context/             # Session and environmental context
│   └── index/               # Retrieval indexes and metadata
├── rules/                   # General rules for all modes
│   └── rules.md
└── rules-{mode}/            # Mode-specific rules
    ├── rules-orchestrator/
    ├── rules-code/
    └── ...
```

## Configuration Files

### config.json

The main configuration file that defines the entire framework structure. It includes:

- Framework version and metadata
- Mode definitions and capabilities
- Boomerang logic configuration
- Documentation standards
- Memory system configuration
- Cognitive process definitions

### .roomodes

This file defines the custom modes for the IDE integration. It includes:

- Mode slugs and display names
- Model configurations
- System prompt file paths
- Rules file paths

### boomerang-state.json

Tracks the state of all tasks in the system, including:

- Task IDs and descriptions
- Assignment information
- Status tracking
- Artifact references
- Timeline data

## Rules System

The rules system consists of general rules that apply to all modes, plus mode-specific rules:

- `rules/rules.md`: General rules for all modes
- `rules-{mode}/rules.md`: Rules specific to each specialist mode

## Memory System

The memory system stores and organizes project knowledge:

- Project-specific artifacts, decisions, and learnings
- Cross-project knowledge and patterns
- Session and environmental context
- Retrieval indexes for efficient access

## Implementation Guide

To implement this configuration in your environment:

1. **Copy Configuration Files**: Copy the `.roo` directory to your project root
2. **Update .roomodes**: Ensure the `.roomodes` file is in your project root
3. **Initialize Memory**: Create the basic memory structure if not present
4. **Configure Logging**: Set up the logging directories for each mode
5. **Verify Rules**: Ensure all rule files are properly configured

## Usage

Once configured, the framework enables:

- Task decomposition and delegation via the Orchestrator
- Specialized processing by expert modes
- Knowledge preservation through the Memory system
- Structured documentation and traceability
- Efficient token usage through the "Scalpel, not Hammer" approach

## Extending the Framework

To extend the framework:

- Add new modes by updating `config.json` and `.roomodes`
- Create corresponding rule files in `rules-{new-mode}/rules.md`
- Implement mode-specific logging in `logs/{new-mode}-activity.md`
- Update memory indexes to accommodate new artifact types

## Troubleshooting

Common issues and solutions:

- **Mode Switching Issues**: Verify `.roomodes` configuration
- **Task Tracking Problems**: Check `boomerang-state.json` format
- **Memory Access Errors**: Ensure memory directory structure exists
- **Rule Violations**: Review the appropriate rules file

For more detailed information, refer to the framework documentation in the `framework/` directory.
