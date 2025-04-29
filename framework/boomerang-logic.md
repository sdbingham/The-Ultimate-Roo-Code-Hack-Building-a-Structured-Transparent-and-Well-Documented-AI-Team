# Boomerang Logic

*This document was created by Roo in Architect mode, demonstrating the specialized agent approach described in the guide.*

## Overview

Boomerang Logic is a task delegation and return system that ensures all subtasks are properly tracked and completed within a multi-agent framework. It creates a reliable workflow where nothing falls through the cracks, and the Orchestrator maintains a clear overview of all ongoing work.

## Core Principles

The key principles of Boomerang Logic are:

1. **Centralized Orchestration**: Tasks originate from the Orchestrator with clear assignment parameters
2. **Specialized Processing**: Specialist modes process assigned tasks within defined boundaries
3. **Mandatory Return**: Completed tasks return to the Orchestrator for verification and integration
4. **Explicit Transitions**: Mode transitions occur only through boomerang returns

## The Boomerang Cycle

### 1. Task Origination
- The Orchestrator receives a complex task from the user
- The Orchestrator analyzes the task and breaks it down into subtasks
- Each subtask is assigned a unique `task_id` for tracking

### 2. Task Assignment
- The Orchestrator creates a detailed task prompt for each subtask
- The prompt includes context, scope, expected output, and metadata
- The Orchestrator delegates the task to the appropriate specialist mode
- The assignment is logged in `.roo/boomerang-state.json`

### 3. Task Processing
- The specialist mode receives the task and processes it within its domain
- The specialist applies appropriate cognitive processes from the library
- All work is documented according to standardized formats
- The specialist may create artifacts in the appropriate directories

### 4. Task Return
- Upon completion, the specialist prepares a structured return payload
- The payload includes the `task_id`, results, and any relevant metadata
- The specialist explicitly returns control to the Orchestrator
- The return is logged in `.roo/boomerang-state.json`

### 5. Task Verification
- The Orchestrator reviews the completed subtask
- The Orchestrator verifies that the output meets the requirements
- If issues are found, the task may be returned to the specialist for revision
- Once verified, the task is marked as complete

### 6. Task Integration
- The Orchestrator integrates the completed subtask into the overall solution
- The integration is documented in the appropriate logs
- The Orchestrator updates the project status

## Boomerang Payload Structure

Each task assignment and return uses a standardized JSON payload structure:

```json
{
  "task_id": "unique-task-identifier",
  "origin_mode": "Orchestrator",
  "destination_mode": "Code",
  "status": "assigned",
  "priority": "high",
  "dependencies": ["dependency-task-id-1", "dependency-task-id-2"],
  "context": "Background information relevant to the task",
  "requirements": "Specific requirements for the task",
  "expected_output": "Description of the expected deliverable",
  "cognitive_process": "Problem-Solving",
  "timestamp": "2023-04-29T10:15:30Z"
}
```

When a task is returned, the payload is updated:

```json
{
  "task_id": "unique-task-identifier",
  "origin_mode": "Code",
  "destination_mode": "Orchestrator",
  "status": "completed",
  "result": "Path to the deliverable or summary of the outcome",
  "issues_encountered": "Any challenges or limitations",
  "next_steps": "Suggested follow-up actions",
  "timestamp": "2023-04-29T11:45:22Z"
}
```

## Boomerang State Tracking

All task assignments and returns are tracked in `.roo/boomerang-state.json`, which maintains a complete history of the project workflow:

```json
{
  "project_id": "multi-agent-framework-guide",
  "start_time": "2023-04-29T09:00:00Z",
  "status": "in_progress",
  "tasks": [
    {
      "task_id": "task-001",
      "description": "Create project structure",
      "assigned_to": "Architect",
      "status": "completed",
      "assigned_time": "2023-04-29T09:05:00Z",
      "completed_time": "2023-04-29T09:30:00Z",
      "artifacts": ["README.md", "directory-structure"]
    },
    {
      "task_id": "task-002",
      "description": "Document SPARC framework",
      "assigned_to": "Architect",
      "status": "in_progress",
      "assigned_time": "2023-04-29T09:35:00Z",
      "artifacts": ["framework/sparc-overview.md"]
    }
    // Additional tasks...
  ]
}
```

## Benefits of Boomerang Logic

- **Traceability**: Every task is tracked from assignment to completion
- **Accountability**: Clear ownership of tasks at all times
- **Coordination**: Dependencies between tasks are explicitly managed
- **Visibility**: Current project status is always available
- **Quality Control**: Verification step ensures all work meets standards

## Implementation Guidelines

To implement Boomerang Logic effectively:

1. **Create a task tracking system**: Implement `.roo/boomerang-state.json` to maintain task state
2. **Standardize task prompts**: Use consistent formats for all task assignments
3. **Enforce explicit returns**: Require specialist modes to formally return control
4. **Log all transitions**: Document every mode switch and task handoff
5. **Visualize workflow**: Create tools to view the current state of all tasks

## Common Patterns

### Sequential Boomerang
Tasks are assigned and returned one at a time in a linear sequence:
```
Orchestrator → Specialist A → Orchestrator → Specialist B → Orchestrator
```

### Parallel Boomerang
Multiple tasks are assigned simultaneously and return independently:
```
                → Specialist A →
Orchestrator → Specialist B → Orchestrator
                → Specialist C →
```

### Nested Boomerang
A specialist delegates subtasks to other specialists before returning:
```
Orchestrator → Specialist A → Specialist B → Specialist A → Orchestrator
```

## Meta-Commentary

*As I (Roo) document this Boomerang Logic system, I'm participating in it. I received this documentation task from the Orchestrator, I'm completing it in Architect mode, and I'll return it when finished. This document will then be verified and integrated into the overall guide. The recursive nature of this process—documenting a system while using it—demonstrates the practical application of the concepts described.*

---

For more information on how Boomerang Logic integrates with other components of the SPARC Framework, see:
- [SPARC Framework Overview](sparc-overview.md)
- [Cognitive Processes](cognitive-processes.md)
- [Structured Documentation](structured-documentation.md)