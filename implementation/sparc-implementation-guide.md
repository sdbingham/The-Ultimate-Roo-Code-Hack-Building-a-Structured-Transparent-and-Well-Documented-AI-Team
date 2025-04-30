---
title: SPARC Framework Implementation Guide
task_id: update-001
date: 2025-04-30
last_updated: 2025-04-30
status: FINAL
owner: Architect
---

# SPARC Framework Implementation Guide

This guide provides detailed instructions for implementing the SPARC (Specification, Pseudocode, Architecture, Refinement, Completion) framework in your AI workflow system. It explains how the configuration files align with the core vision and requirements, ensuring a cohesive experience across all specialized modes.

## Core Vision Alignment

The SPARC framework implementation is built around these key principles:

1. **Specialized Agents**: Each mode is optimized for specific types of tasks
2. **Structured Workflows**: Clear processes for task delegation and completion
3. **Knowledge Preservation**: Comprehensive memory system for institutional knowledge
4. **Token Efficiency**: "Scalpel, not Hammer" approach to resource usage
5. **Transparent Documentation**: Consistent documentation standards across all components

## Configuration Files Overview

### .roomodes

The `.roomodes` file defines the custom modes available in the IDE. Each mode includes:

- **slug**: Unique identifier for the mode
- **name**: Display name with appropriate emoji
- **description**: Concise description of the mode's specialty
- **model**: AI model configuration (with thinking enabled for research-heavy modes)
- **systemPromptFile**: Path to the mode's system prompt
- **rules**: Path to the mode's rules file

### .roo/config.json

The `.roo/config.json` file provides the comprehensive configuration for the entire framework:

- **Mode definitions**: Detailed configuration for each specialized mode
- **Boomerang logic**: Task tracking and workflow configuration
- **Documentation standards**: Templates and section structures
- **Memory system**: Storage structure and indexing
- **Cognitive processes**: Primitive operations and process definitions

## Specialized Modes

### 🪃 Orchestrator Mode

**Core Purpose**: Task decomposition, assignment, and verification

The Orchestrator is the central coordinator of the multi-agent system. It:
- Breaks down complex tasks into manageable subtasks
- Assigns tasks to the appropriate specialist modes
- Tracks dependencies between tasks
- Verifies completed work against requirements
- Integrates components into cohesive solutions

**Key Configuration Elements**:
- Has access to all files in the repository
- Utilizes strategic planning and complex decision-making processes
- Maintains the boomerang-state.json for task tracking

### 💻 Code Mode

**Core Purpose**: Software implementation and optimization

The Code mode is responsible for implementing technical solutions. It:
- Writes, refactors, and manages code
- Applies appropriate design patterns
- Documents code with standardized practices
- Creates reusable, maintainable components

**Key Configuration Elements**:
- Has access to code files (.js, .ts, .py, .html, .css, .json, .yaml, .yml)
- Utilizes problem-solving and operational optimization processes
- Follows structured implementation approach

### 🏛️ Architect Mode

**Core Purpose**: System design and pattern application

The Architect mode develops architectural blueprints and technical strategies. It:
- Creates architectural designs and documentation
- Applies appropriate patterns and principles
- Documents design decisions with rationales
- Creates visual representations of complex systems

**Key Configuration Elements**:
- Has access to markdown files for documentation
- Utilizes strategic planning and synthesizing complexity processes
- Documents architectural decisions in ADRs

### ❓ Ask Mode

**Core Purpose**: Information retrieval and communication

The Ask mode retrieves and synthesizes information. It:
- Researches and analyzes information with proper attribution
- Evaluates source quality and reliability
- Communicates with appropriate confidence indicators
- Respects citation limits and copyright considerations

**Key Configuration Elements**:
- Has broad file access for information gathering
- Utilizes evidence triangulation and fact-checking processes
- Follows strict citation and attribution standards

### 🪲 Debug Mode

**Core Purpose**: Problem diagnosis and solution validation

The Debug mode identifies and resolves technical issues. It:
- Applies structured diagnostic methodology
- Documents hypothesis testing and evidence collection
- Identifies root causes through systematic analysis
- Validates solutions with appropriate testing

**Key Configuration Elements**:
- Has broad file access for debugging purposes
- Utilizes root cause analysis and hypothesis testing processes
- Documents issues and solutions for future reference

### 💾 Memory Mode

**Core Purpose**: Knowledge storage and retrieval

The Memory mode preserves and organizes project knowledge. It:
- Stores artifacts, decisions, and learnings
- Organizes information for efficient retrieval
- Identifies patterns across project history
- Provides contextual information to other agents

**Key Configuration Elements**:
- Has access to the .roo/memory directory
- Utilizes pattern extraction and adaptive learning processes
- Maintains comprehensive indexing system

### 🔍 Deep Research Mode

**Core Purpose**: In-depth investigation and analysis

The Deep Research mode conducts comprehensive research. It:
- Follows layered research methodology
- Evaluates sources for quality and reliability
- Synthesizes information from diverse sources
- Creates well-documented research artifacts

**Key Configuration Elements**:
- Has access to markdown files and research directories
- Utilizes evidence triangulation and knowledge synthesis processes
- Follows strict citation and attribution standards

## Boomerang Logic Implementation

The Boomerang Logic system ensures reliable task tracking and completion:

1. **Task Origination**: Tasks are created in `.roo/boomerang-state.json` with unique IDs
2. **Task Assignment**: The Orchestrator assigns tasks to specialist modes
3. **Task Processing**: Specialists process tasks within their domains
4. **Task Return**: Completed tasks return to the Orchestrator
5. **Task Verification**: The Orchestrator verifies and accepts returned tasks

## Memory System Implementation

The Memory system is structured to preserve knowledge across sessions:

1. **Projects**: Project-specific artifacts, decisions, and learnings
2. **Knowledge**: Cross-project patterns, references, and best practices
3. **Context**: Session and environmental information
4. **Index**: Retrieval indexes for efficient access to stored information

## Rules System Implementation

Each mode has specific rules that govern its operation:

1. **General Rules**: Apply to all modes (`.roo/rules/rules.md`)
2. **Mode-Specific Rules**: Define boundaries and standards for each mode (`.roo/rules-{mode}/rules.md`)

## Implementation Steps

To implement the SPARC framework in your environment:

1. **Copy Configuration Files**:
   - Place `.roomodes` in your project root
   - Copy the `.roo` directory to your project root

2. **Initialize Directory Structure**:
   - Create the memory directory structure if not present
   - Set up logging directories for each mode

3. **Configure Mode Access**:
   - Ensure your AI assistant supports custom modes
   - Configure access to the defined modes

4. **Verify Rules**:
   - Review the rules files for each mode
   - Ensure they align with your project requirements

5. **Test Workflow**:
   - Start with the Orchestrator mode
   - Test the task delegation and return process
   - Verify memory storage and retrieval

## Best Practices

### Token Optimization

- Keep context window utilization below 40%
- Start with the least token-intensive cognitive primitives
- Break complex tasks into atomic components
- Use the most specialized mode for each subtask

### Documentation Standards

- Use standardized file headers with metadata
- Follow consistent section structures
- Maintain clear traceability between tasks and outputs
- Store documentation in appropriate directories

### Task Management

- Create clear, unambiguous task prompts
- Include necessary context and requirements
- Specify expected outputs and quality criteria
- Track dependencies between tasks

## Troubleshooting

### Common Issues

- **Mode Switching Issues**: Verify `.roomodes` configuration
- **Task Tracking Problems**: Check `boomerang-state.json` format
- **Memory Access Errors**: Ensure memory directory structure exists
- **Rule Violations**: Review the appropriate rules file

### Resolution Steps

1. Check configuration files for syntax errors
2. Verify file paths and permissions
3. Review mode-specific rules for constraints
4. Check system prompt files for consistency

## Conclusion

This implementation guide provides a comprehensive overview of how the SPARC framework is configured and implemented. By following these guidelines, you can create a cohesive AI workflow system that leverages specialized modes, structured documentation, and efficient resource usage to tackle complex tasks effectively.

The configuration files have been carefully designed to align with the core vision while ensuring that only the best elements from different approaches are integrated. This creates a seamless, efficient system that maintains the integrity of the original concept while incorporating practical improvements.