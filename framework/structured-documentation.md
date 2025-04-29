# Structured Documentation

*This document was created by Roo in Architect mode, demonstrating the specialized agent approach described in the guide.*

## Overview

Structured Documentation is a comprehensive approach to documenting all aspects of the multi-agent system. It ensures transparency, facilitates collaboration between agents, and makes it easy to understand and modify the system over time.

## Core Principles

The key principles of Structured Documentation are:

1. **Consistency**: All documentation follows standardized formats and structures
2. **Traceability**: Clear connections between tasks, decisions, and outputs
3. **Completeness**: All significant aspects of the system are documented
4. **Accessibility**: Documentation is organized for easy navigation and comprehension
5. **Maintainability**: Documentation evolves alongside the system

## Documentation Components

### File Headers

Every document begins with a standardized header that includes essential metadata:

```markdown
---
title: [DOCUMENT_TITLE]
task_id: [ORIGINATING_TASK]
date: [CREATION_DATE]
last_updated: [UPDATE_DATE]
status: [DRAFT|REVIEW|FINAL]
owner: [RESPONSIBLE_MODE]
---
```

This header provides context about the document's purpose, origin, and current state.

### Standard Sections

Documents follow a consistent section structure to ensure all necessary information is included:

#### For Documentation Files

```markdown
# [Title]

## Overview
Brief description of the document's purpose and content.

## Core Principles
Key concepts and guiding principles.

## [Content Sections]
Detailed information organized into logical sections.

## Implementation Guidelines
Practical advice for applying the concepts.

## Meta-Commentary
Reflections on how the document itself demonstrates the concepts.
```

#### For Task Prompts

```markdown
# [Task Title]

## Context
Background information and relationship to the larger project.

## Scope
Specific requirements and boundaries for the task.

## Expected Output
Detailed description of deliverables, format specifications, and quality criteria.

## [Optional] Additional Resources
Relevant tips, examples, or reference materials.
```

#### For Implementation Guides

```markdown
# [Implementation Title]

## Objective
What the implementation aims to achieve.

## Inputs
Required resources, prerequisites, and dependencies.

## Process
Step-by-step instructions for implementation.

## Outputs
Expected results and how to verify success.

## Dependencies
Related components and integration points.

## Next Actions
Follow-up tasks and future considerations.
```

### Directory Structure

Documentation is organized in a consistent directory structure:

```
/
├── framework/                           # Core framework documentation
├── agents/                              # Documentation for each specialized agent
│   ├── orchestrator/                    # Orchestrator agent documentation
│   ├── research/                        # Research agent documentation
│   └── [other_agents]/                  # Other agent documentation
├── implementation/                      # Implementation guides
│   ├── getting-started.md               # Initial setup guide
│   └── examples/                        # Example implementations
├── templates/                           # Reusable templates
│   ├── agent-definitions/               # Templates for each agent role
│   ├── task-prompts/                    # Templates for task prompts
│   └── documentation/                   # Templates for documentation
├── best-practices/                      # Best practices guides
└── .roo/                                # Process documentation
    ├── logs/                            # Activity logs by mode
    │   ├── orchestrator/                # Orchestration decisions
    │   └── [other_modes]/               # Mode-specific logs
    ├── boomerang-state.json             # Task tracking
    └── project-metadata.json            # Project configuration
```

This structure ensures that documentation is logically organized and easy to navigate.

## Activity Logging

All significant activities are logged in mode-specific log files within the `.roo/logs/` directory:

### Orchestrator Logs

```markdown
# Orchestrator Activity: [DATE]

## Task Assignment
- **Task ID**: task-001
- **Assigned To**: Architect
- **Description**: Create project structure
- **Priority**: High
- **Dependencies**: None
- **Expected Completion**: [DATE]

## Task Verification
- **Task ID**: task-001
- **Status**: Completed
- **Verification Notes**: Directory structure created according to specifications
- **Next Steps**: Assign documentation tasks
```

### Specialist Mode Logs

```markdown
# [Mode] Activity: [DATE]

## Task Reception
- **Task ID**: task-001
- **Received From**: Orchestrator
- **Description**: Create project structure

## Work Process
- Created base directory structure
- Established documentation templates
- Set up logging system

## Task Completion
- **Task ID**: task-001
- **Status**: Completed
- **Deliverables**: Directory structure, README.md
- **Notes**: All requirements fulfilled
- **Return To**: Orchestrator
```

## Decision Documentation

Important decisions are documented in Architecture Decision Records (ADRs) within the appropriate directories:

```markdown
# Architecture Decision Record: [DECISION_TITLE]

## Context
The situation that necessitates a decision.

## Decision
The decision that was made.

## Rationale
The reasoning behind the decision.

## Consequences
The expected outcomes and implications of the decision.

## Alternatives Considered
Other options that were evaluated but not chosen.

## Related Decisions
Links to related decisions.
```

## Implementation Tracking

Implementation progress is tracked in `.roo/project-metadata.json`:

```json
{
  "project_id": "multi-agent-framework-guide",
  "name": "The Ultimate Roo Code Hack",
  "description": "Building a Structured, Transparent, and Well-Documented AI Team that Delegates Its Own Tasks",
  "version": "0.1.0",
  "status": "in_progress",
  "components": [
    {
      "name": "framework-documentation",
      "status": "in_progress",
      "completion": 75,
      "owner": "Architect"
    },
    {
      "name": "agent-definitions",
      "status": "planned",
      "completion": 0,
      "owner": "Architect"
    }
    // Additional components...
  ]
}
```

## Benefits of Structured Documentation

- **Knowledge Preservation**: Captures important information and decisions
- **Onboarding**: Makes it easier for new users to understand the system
- **Collaboration**: Facilitates coordination between different agents
- **Quality Assurance**: Provides a basis for verifying work against requirements
- **Maintenance**: Simplifies future updates and modifications

## Implementation Guidelines

To implement Structured Documentation effectively:

1. **Create templates**: Develop standardized templates for different document types
2. **Establish conventions**: Define naming conventions, formatting rules, and section structures
3. **Automate where possible**: Use tools to generate headers, update timestamps, etc.
4. **Review regularly**: Periodically assess documentation for accuracy and completeness
5. **Integrate with workflow**: Make documentation an integral part of the task process

## Meta-Commentary

*As I (Roo) create this document on Structured Documentation, I'm following the very guidelines I'm describing. I've included a standardized header, organized the content into logical sections, and maintained a consistent format throughout. This self-referential approach demonstrates how documentation can be both descriptive and exemplary—showing the principles in action while explaining them.*

*Notice how this document itself serves as a template for other documentation in the system. The recursive nature of documenting documentation creates a meta-level consistency that reinforces the structured approach throughout the entire framework.*

---

For more information on how Structured Documentation integrates with other components of the SPARC Framework, see:
- [SPARC Framework Overview](sparc-overview.md)
- [Cognitive Processes](cognitive-processes.md)
- [Boomerang Logic](boomerang-logic.md)