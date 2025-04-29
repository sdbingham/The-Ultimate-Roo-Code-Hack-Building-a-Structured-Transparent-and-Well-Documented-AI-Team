# Standard Task Template

*This template was created by Roo in Architect mode, demonstrating the specialized agent approach described in the guide.*

## Overview

This template provides a standardized format for creating task prompts in the multi-agent framework. Using consistent task formats ensures clear communication, proper tracking, and effective delegation across specialized agents.

## Template Structure

```markdown
# [TASK_TITLE]

## Context
[BACKGROUND_INFORMATION_AND_RELATIONSHIP_TO_LARGER_PROJECT]

## Scope
[SPECIFIC_REQUIREMENTS_AND_BOUNDARIES]
[STEP_BY_STEP_INSTRUCTIONS_WHEN_APPROPRIATE]

## Expected Output
[DETAILED_DESCRIPTION_OF_DELIVERABLES]
[FORMAT_SPECIFICATIONS]
[QUALITY_CRITERIA]

## [Optional] Additional Resources
[RELEVANT_TIPS_OR_EXAMPLES]
[LINKS_TO_REFERENCE_MATERIALS]
[PREVIOUS_LEARNINGS_FROM_SIMILAR_TASKS]

---

**Meta-Information**:
- task_id: [UNIQUE_TASK_ID]
- assigned_to: [SPECIALIST_MODE]
- priority: [LOW|MEDIUM|HIGH|CRITICAL]
- dependencies: [LIST_OF_DEPENDENT_TASK_IDS]
- cognitive_process: [RECOMMENDED_COGNITIVE_PROCESS]
- expected_token_cost: [LOW|MEDIUM|HIGH]
- reasoning_phase: [DISCOVERY|ANALYSIS|SYNTHESIS|VALIDATION]
- boomerang_return_to: [ORCHESTRATOR|ORIGINATING_MODE]
```

## Section Guidelines

### Task Title
- Clear, concise description of the task
- Action-oriented (e.g., "Create User Authentication System" rather than "User Authentication")
- Specific enough to distinguish from other tasks

### Context
- Background information necessary to understand the task
- Relationship to the larger project or goal
- Previous work that this task builds upon
- Constraints or considerations that influence the approach
- Why this task is important

### Scope
- Specific requirements and boundaries for the task
- Clear definition of what is included and excluded
- Step-by-step instructions when appropriate
- Acceptance criteria
- Constraints and limitations

### Expected Output
- Detailed description of deliverables
- Format specifications (file types, structure, etc.)
- Quality criteria for evaluation
- How the output will be used
- Any specific standards that must be followed

### Additional Resources
- Relevant tips or examples
- Links to reference materials
- Previous learnings from similar tasks
- Tools or techniques that might be helpful
- Sample outputs or templates

### Meta-Information
- **task_id**: Unique identifier for tracking (e.g., "TASK-2023-04-29-001")
- **assigned_to**: The specialist mode responsible for the task
- **priority**: Importance level (LOW, MEDIUM, HIGH, CRITICAL)
- **dependencies**: IDs of tasks that must be completed before this one
- **cognitive_process**: Recommended reasoning pattern from the Cognitive Process Library
- **expected_token_cost**: Estimated computational resource requirement
- **reasoning_phase**: Current phase in the overall workflow
- **boomerang_return_to**: Where the completed task should be returned

## Example Task Prompts

### Research Task Example

```markdown
# Research Current Trends in Quantum Computing

## Context
We are preparing a comprehensive report on the future of computing technologies for a client in the technology sector. This research on quantum computing will form a key section of the report, alongside sections on neuromorphic computing and molecular computing. The client needs to understand the current state of the technology and its potential impact on their industry within the next 5-10 years.

## Scope
Conduct a structured research investigation into the current state and future trends of quantum computing. Focus specifically on:
- Recent breakthroughs (last 2-3 years)
- Current limitations and challenges
- Projected timeline for commercial applications
- Key players in the industry
- Potential impact on cryptography, drug discovery, and optimization problems

Do not include detailed explanations of quantum mechanics principles unless directly relevant to understanding a breakthrough or limitation.

## Expected Output
Produce a comprehensive research synthesis document that includes:
- Executive summary (250-300 words)
- Structured findings organized by the focus areas listed in the scope
- Visual timeline of projected developments
- Table of key industry players with their specializations
- Properly cited sources using APA format
- 5-7 key insights highlighted for quick reference

The document should be in Markdown format, include proper headings and subheadings, and be between 1500-2000 words (excluding citations).

## Additional Resources
- Our previous report on quantum computing from 2021 is available at `/research/previous/quantum-2021.md`
- The client has specifically mentioned interest in D-Wave's annealing approach vs. gate-based quantum computers
- Consider using the "Evidence Triangulation" cognitive process to verify information from multiple sources

---

**Meta-Information**:
- task_id: RESEARCH-2023-04-29-001
- assigned_to: Research
- priority: HIGH
- dependencies: []
- cognitive_process: Evidence Triangulation
- expected_token_cost: MEDIUM
- reasoning_phase: DISCOVERY
- boomerang_return_to: Orchestrator
```

### Code Task Example

```markdown
# Implement User Authentication API Endpoints

## Context
We are developing a web application that requires secure user authentication. The frontend is being built with React, and we need backend API endpoints to handle user registration, login, password reset, and session management. This is part of the user management module, which is a critical security component of the overall application.

## Scope
Create the following RESTful API endpoints using Node.js and Express:
1. User registration (`POST /api/auth/register`)
2. User login (`POST /api/auth/login`)
3. Password reset request (`POST /api/auth/reset-request`)
4. Password reset confirmation (`POST /api/auth/reset-confirm`)
5. Session validation (`GET /api/auth/validate`)
6. Logout (`POST /api/auth/logout`)

Implement proper input validation, error handling, and security best practices including:
- Password hashing using bcrypt
- JWT token generation and validation
- Rate limiting for sensitive endpoints
- Input sanitization
- Comprehensive error responses

Do not implement the database models or frontend components, as these will be handled in separate tasks.

## Expected Output
- Complete implementation of the specified API endpoints in Node.js/Express
- Unit tests for each endpoint with at least 90% coverage
- API documentation using JSDoc comments
- A Postman collection for testing the endpoints
- Implementation notes including security considerations

The code should follow our established coding standards, use async/await for asynchronous operations, and include appropriate logging.

## Additional Resources
- API design specification: `/design/api-spec.yaml`
- Authentication flow diagram: `/design/auth-flow.png`
- Example JWT implementation: `/examples/jwt-implementation.js`
- Consider using the "Problem-Solving" cognitive process for implementation challenges

---

**Meta-Information**:
- task_id: CODE-2023-04-29-002
- assigned_to: Code
- priority: HIGH
- dependencies: [ARCHITECT-2023-04-28-005]
- cognitive_process: Problem-Solving
- expected_token_cost: HIGH
- reasoning_phase: SYNTHESIS
- boomerang_return_to: Orchestrator
```

### Architect Task Example

```markdown
# Design Data Model for Content Management System

## Context
We are developing a content management system (CMS) for a media company that needs to handle various types of content including articles, videos, podcasts, and image galleries. The system needs to support complex content relationships, versioning, workflow states, and fine-grained access control. This data model will be the foundation for both the backend database and API design.

## Scope
Create a comprehensive data model design that includes:
- Entity-relationship diagrams
- Schema definitions for all entities
- Relationship cardinality and constraints
- Indexing strategy for performance optimization
- Approach to content versioning
- Workflow state management
- Access control model
- Content categorization and tagging system

The design should consider scalability for up to 10 million content items and 1000 concurrent users. It should also account for future extensibility to new content types.

## Expected Output
Produce a detailed data model design document that includes:
- High-level overview of the data architecture
- Entity-relationship diagrams (in standard notation)
- Detailed schema definitions for each entity
- Explanation of key design decisions and their rationales
- Potential performance considerations and mitigations
- Implementation recommendations for the development team

The document should be in Markdown format with embedded diagrams (using Mermaid or similar). Include a glossary of terms for clarity.

## Additional Resources
- Current content types and attributes: `/requirements/content-types.md`
- Performance requirements: `/requirements/performance-sla.md`
- Similar system architecture we previously designed: `/designs/archive/media-portal-architecture.md`
- Consider using the "Strategic Planning" cognitive process for this design task

---

**Meta-Information**:
- task_id: ARCHITECT-2023-04-29-003
- assigned_to: Architect
- priority: CRITICAL
- dependencies: [RESEARCH-2023-04-25-001]
- cognitive_process: Strategic Planning
- expected_token_cost: MEDIUM
- reasoning_phase: ANALYSIS
- boomerang_return_to: Orchestrator
```

## Best Practices for Task Prompts

1. **Be specific and clear**: Avoid ambiguity in requirements and expectations
2. **Provide context**: Include enough background for the agent to understand the task's purpose
3. **Set boundaries**: Clearly define what is in and out of scope
4. **Specify deliverables**: Describe exactly what outputs are expected
5. **Include quality criteria**: Define how success will be measured
6. **Suggest cognitive processes**: Recommend appropriate reasoning patterns
7. **Link to resources**: Provide references to relevant materials
8. **Consider dependencies**: Identify tasks that must be completed first
9. **Assign appropriate priority**: Indicate the task's importance
10. **Estimate token cost**: Help manage computational resources

## Meta-Commentary

*As I create this task template, I'm applying the principles of structured documentation that are central to the multi-agent framework. The template itself demonstrates the meta-recursive nature of the system—it's a template for creating tasks, created as a task, following the template structure it describes.*

*Notice how the template includes both instructional content and examples, providing a comprehensive guide for users. This approach embodies the Architect's role in creating clear structures and patterns that others can follow.*

---

For more information on how task prompts integrate with other components of the multi-agent framework, see:
- [SPARC Framework Overview](../../framework/sparc-overview.md)
- [Boomerang Logic](../../framework/boomerang-logic.md)
- [Orchestrator Agent](../../agents/orchestrator/orchestrator-agent.md)