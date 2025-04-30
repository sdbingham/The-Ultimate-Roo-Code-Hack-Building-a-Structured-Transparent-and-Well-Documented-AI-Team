# The Ultimate Roo Code Hack

**Building a Structured, Transparent, and Well-Documented AI Team that Delegates Its Own Tasks**

This repository implements a comprehensive AI workflow system based on the SPARC framework (Specification, Pseudocode, Architecture, Refinement, Completion). It creates a cohesive experience across specialized AI modes, enabling efficient task delegation, structured documentation, and knowledge preservation.

## 🌟 Key Features

- **Multi-Agent Framework**: Specialized modes for different types of tasks
- **SPARC Methodology**: Structured approach to complex problem-solving
- **Boomerang Logic**: Reliable task delegation and tracking system
- **Memory System**: Knowledge preservation and retrieval across sessions
- **Structured Documentation**: Consistent, traceable documentation
- **Token Optimization**: Efficient resource usage through the "Scalpel, not Hammer" approach

## 🧩 Specialized Modes

The system includes the following specialized modes:

- **🪃 Orchestrator**: Task decomposition, assignment, and verification
- **💻 Code**: Software implementation and optimization
- **🏛️ Architect**: System design and pattern application
- **❓ Ask**: Information retrieval, evaluation, and communication
- **🪲 Debug**: Problem diagnosis and solution validation
- **💾 Memory**: Knowledge storage, organization, and retrieval
- **🔍 Deep Research**: In-depth investigation and analysis

## 📦 Quick Setup

Get started quickly with our automated setup tool:

```bash
npx roo-team-setup
```

This command will:
- Set up the entire Roo framework structure
- Create all necessary configuration files
- Generate mode-specific rules
- Configure the workspace for immediate use

You can choose between a full project setup or just the configuration files.

## 📂 Repository Structure

```
/
├── .roo/                     # Configuration and runtime files
├── agents/                   # Agent definitions for each mode
│   ├── orchestrator/
│   ├── code/
│   └── ...
├── framework/                # Core framework documentation
│   ├── sparc-overview.md
│   ├── boomerang-logic.md
│   └── ...
├── best-practices/           # Best practices guides
├── implementation/           # Implementation guides
└── templates/                # Reusable templates
```

## 🚀 Getting Started

### Prerequisites

- A compatible AI assistant that supports custom modes
- Basic understanding of the SPARC framework concepts

### Installation

#### Option 1: NPM (Recommended)

```bash
npx roo-team-setup
```

#### Option 2: Manual Setup

1. Clone this repository:
   ```
   git clone https://github.com/Mnehmos/The-Ultimate-Roo-Code-Hack-Building-a-Structured-Transparent-and-Well-Documented-AI-Team.git
   ```

2. Ensure the `.roomodes` file is in your project root

3. Configure your AI assistant to use the custom modes

### Basic Usage

1. **Start with the Orchestrator**: Begin by engaging the Orchestrator mode to plan your task
   ```
   /mode orchestrator
   ```

2. **Let the Orchestrator delegate**: The Orchestrator will break down complex tasks and assign them to specialist modes

3. **Review completed work**: The Orchestrator will verify and integrate completed subtasks

4. **Access stored knowledge**: Use the Memory mode to retrieve information from previous sessions

## 📚 Framework Components

### SPARC Framework

The SPARC Framework consists of four key components:

1. **Cognitive Process Library**: Reusable reasoning patterns for different types of tasks
2. **Boomerang Logic**: Task delegation and return system
3. **Structured Documentation**: Standardized documentation approach
4. **"Scalpel, not Hammer" Philosophy**: Efficient resource usage

### Boomerang Logic

The Boomerang Logic system ensures reliable task tracking:

1. Tasks originate from the Orchestrator
2. Specialist modes process assigned tasks
3. Completed tasks return to the Orchestrator
4. The Orchestrator verifies and integrates results

### Memory System

The Memory system preserves knowledge across sessions:

1. Project-specific artifacts, decisions, and learnings
2. Cross-project knowledge and patterns
3. Session and environmental context
4. Retrieval indexes for efficient access

## 🛠️ Advanced Usage

### Creating Custom Tasks

Use the standardized task prompt format:

```markdown
# [Task Title]

## Context
[Background information and relationship to the larger project]

## Scope
[Specific requirements and boundaries for the task]

## Expected Output
[Detailed description of deliverables]

## Additional Resources
[Relevant tips, examples, or reference materials]
```

### Extending the Framework

To extend the framework:

1. Add new modes by updating `config.json` and `.roomodes`
2. Create corresponding rule files in `.roo/rules-{new-mode}/rules.md`
3. Implement mode-specific logging in `.roo/logs/{new-mode}-activity.md`
4. Update memory indexes to accommodate new artifact types

## 📊 Performance Optimization

- Keep context window utilization below 40%
- Start with the least token-intensive cognitive primitives
- Break complex tasks into atomic components
- Use the most specialized mode for each subtask

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- The SPARC framework developers
- Contributors to the multi-agent AI research community
- All users who provide feedback and suggestions