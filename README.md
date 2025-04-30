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

## 🏗️ Architecture

Below is an architectural overview of how the Roo framework operates:

```
┌─────────────────────────────────┐
│            VS Code              │
│     (Primary Development        │
│          Environment)           │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│             Roo Code            │
│                ↓                │
│          System Prompt          │
│   (Contains SPARC Framework:    │
│    • Specification, Pseudocode, │
│      Architecture, Refinement,  │
│      Completion methodology     │
│    • Advanced reasoning models  │
│    • Best practices enforcement │
│    • Memory Bank integration    │
│    • Boomerang pattern support) │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐      ┌─────────────────────────┐
│           Orchestrator          │      │         User            │
│     (System Prompt contains:    │      │     (Customer with      │
│      roles, definitions,        │◄─────┤     minimal context)    │
│      systems, processes,        │      │                         │
│      nomenclature, etc.)        │      └─────────────────────────┘
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│        Query Processing         │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│         MCP → Reprompt          │
│     (Only called on direct      │
│         user input)             │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│     Structured Prompt Creation  │
│                                 │
│       Project Prompt Eng.       │
│       Project Context           │
│       System Prompt             │
│       Role Prompt               │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│           Orchestrator          │
│     (System Prompt contains:    │
│      roles, definitions,        │
│      systems, processes,        │
│      nomenclature, etc.)        │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│         Substack Prompt         │
│   (Generated by Orchestrator    │
│        with structure)          │
│                                 │
│    ┌─────────┐  ┌─────────┐    │
│    │  Topic  │  │ Context │    │
│    └─────────┘  └─────────┘    │
│                                 │
│    ┌─────────┐  ┌─────────┐    │
│    │  Scope  │  │ Output  │    │
│    └─────────┘  └─────────┘    │
│                                 │
│    ┌─────────────────────┐     │
│    │       Extras        │     │
│    └─────────────────────┘     │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐   ┌────────────────────────────────────┐
│       Specialized Modes         │   │           MCP Tools                 │
│                                 │   │                                     │
│  ┌────────┐ ┌────────┐ ┌─────┐ │   │ ┌─────────┐  ┌─────────────────┐   │
│  │  Code  │ │ Debug  │ │ ... │ │──►│ │ Basic   │  │ CLI/Shell        │   │
│  └────┬───┘ └────┬───┘ └──┬──┘ │   │ │ CRUD    │  │ (cmd/PowerShell) │   │
│       │          │        │    │   │ └─────────┘  └─────────────────┘   │
└───────┼──────────┼────────┼────┘   │                                     │
        │          │        │        │ ┌─────────┐  ┌─────────────────┐   │
        │          │        │        │ │ API     │  │ Browser          │   │
        │          │        └───────►│ │ Calls   │  │ Automation       │   │
        │          │                 │ │ (Alpha  │  │ (Playwright)     │   │
        │          │                 │ │ Vantage)│  │                  │   │
        │          │                 │ └─────────┘  └─────────────────┘   │
        │          │                 │                                     │
        │          └────────────────►│ ┌──────────────────────────────┐   │
        │                            │ │        LLM Calls              │   │
        │                            │ │                               │   │
        │                            │ │ • Basic Queries               │   │
        └───────────────────────────►│ │ • Reporter Format            │   │
                                     │ │ • Logic MCP Primitives        │   │
                                     │ │ • Sequential Thinking         │   │
                                     │ └──────────────────────────────┘   │
                                     └────────────────┬─────────────────┬─┘
                                                      │                 │
                                                      ▼                 │
┌─────────────────────────────────────────────────────────────────┐    │
│                   Recursive Loop                                │    │
│                                                                 │    │
│  ┌────────────────────────┐    ┌───────────────────────┐       │    │
│  │     Task Execution     │    │      Reporting        │       │    │
│  │                        │    │                       │       │    │
│  │ • Execute assigned task│───►│ • Report work done    │       │◄───┘
│  │ • Solve specific issue │    │ • Share issues found  │       │
│  │ • Maintain focus       │    │ • Provide learnings   │       │
│  └────────────────────────┘    └─────────┬─────────────┘       │
│                                           │                     │
│                                           ▼                     │
│  ┌────────────────────────┐    ┌───────────────────────┐       │
│  │   Task Delegation      │    │    Deliberation       │       │
│  │                        │◄───┤                       │       │
│  │ • Identify next steps  │    │ • Assess progress     │       │
│  │ • Assign to best mode  │    │ • Integrate learnings │       │
│  │ • Set clear objectives │    │ • Plan next phase     │       │
│  └────────────────────────┘    └───────────────────────┘       │
│                                                                 │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Memory Mode                                  │
│                                                                 │
│  ┌────────────────────────┐    ┌───────────────────────┐       │
│  │  Project Archival      │    │   SQL Database        │       │
│  │                        │    │                       │       │
│  │ • Create memory folder │───►│ • Store project data  │       │
│  │ • Extract key learnings│    │ • Index for retrieval │       │
│  │ • Organize artifacts   │    │ • Version tracking    │       │
│  └────────────────────────┘    └─────────┬─────────────┘       │ 
│                                           │                     |
│                                           ▼                     │
│  ┌────────────────────────┐    ┌───────────────────────┐       │
│  │  Memory MCP            │    │   RAG System          │       │
│  │                        │◄───┤                       │       │
│  │ • Database writes      │    │ • Vector embeddings   │       │
│  │ • Data validation      │    │ • Semantic indexing   │       │
│  │ • Structured storage   │    │ • Retrieval functions │       │
│  └─────────────┬──────────┘    └───────────────────────┘       │
│                │                                               │
└────────────────┼───────────────────────────────────────────────┘
                 │
                 └───────────────────────────────────┐
                                                     ▼
┌─────────────────────────────────┐      ┌─────────────────────────┐
│           Orchestrator          │      │  Feedback loop w/ User  │  
│     (System Prompt contains:    │      │     (Customer with      │
│      roles, definitions,        │◄─────┤     minimal context)    │
│      systems, processes,        │      │                         │
│      nomenclature, etc.)        │      └─────────────────────────┘
└───────────────┬─────────────────┘
|
              Restart Recursive Loop
```

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

#### Option 3: Direct Setup with AI Assistant

If you prefer to set up the framework directly using an AI assistant like Roo, Claude, or ChatGPT, you can copy and paste the following prompt:

```
I need to set up a Roo multi-agent framework in my project. Please create the following directory structure and necessary files for me:

1. Create a .roo/ directory with the following subdirectories:
   - rules/ (for general rules)
   - rules-orchestrator/ (for orchestrator mode rules)
   - rules-code/ (for code mode rules)
   - rules-architect/ (for architect mode rules)
   - rules-ask/ (for ask mode rules)
   - rules-debug/ (for debug mode rules)
   - rules-memory/ (for memory mode rules)
   - rules-deep-research-agent/ (for deep research mode rules)
   - logs/ (for storing logs from different modes)

2. Create a .roomodes file in the project root with mode definitions for:
   - 🪃 Orchestrator mode
   - 💻 Code mode
   - 🏛️ Architect mode
   - ❓ Ask mode
   - 🪲 Debug mode
   - 💾 Memory mode
   - 🔍 Deep Research mode

3. Create agent definition directories under agents/:
   - orchestrator/
   - code/
   - architect/
   - ask/
   - debug/
   - memory/
   - research/ (for deep research mode)

4. Create a framework/ directory for documentation of the SPARC framework:
   - boomerang-logic.md
   - cognitive-processes.md
   - sparc-overview.md
   - structured-documentation.md

5. Create a best-practices/ directory with:
   - token-optimization.md

6. Create a templates/ directory with:
   - templates/task-prompts/standard-task-template.md

Each file should have appropriate content describing its purpose, and the rule files should contain the necessary instructions for each mode to function properly within the SPARC framework.

Please make sure all files follow the proper formatting and include explanations of how each component works within the overall framework.
```

After pasting this prompt, your AI assistant will guide you through creating the necessary files and directories for the Roo framework.

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
