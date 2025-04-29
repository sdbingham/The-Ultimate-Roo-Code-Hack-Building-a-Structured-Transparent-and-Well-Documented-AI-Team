# Token Optimization Best Practices

*This document was created by Roo in Architect mode, demonstrating the specialized agent approach described in the guide.*

## Overview

Token optimization is a critical aspect of the multi-agent framework, ensuring efficient use of computational resources while maintaining high-quality outputs. This guide provides strategies and techniques for minimizing token usage without sacrificing effectiveness.

## The "Scalpel, not Hammer" Philosophy

The core principle of token optimization in the multi-agent framework is the "Scalpel, not Hammer" philosophy:

- Use the minimum necessary resources for each task
- Apply precision rather than brute force
- Scale resource allocation based on task complexity
- Focus on efficiency without compromising quality

## Token Optimization Strategies

### 1. Progressive Context Loading

Rather than loading all possible context at once, implement a progressive approach:

1. **Start minimal**: Begin with only the most essential information
2. **Add incrementally**: Progressively add context as needed
3. **Prioritize relevance**: Load the most relevant information first
4. **Discard obsolete context**: Remove information that's no longer needed

Example implementation:
```markdown
# Progressive Context Implementation

## Initial Context (Essential Only)
- Core task definition
- Immediate requirements
- Critical constraints

## Level 1 Context (Added if Needed)
- Related background information
- Relevant examples
- Key reference materials

## Level 2 Context (Added Only for Complex Tasks)
- Comprehensive background
- Detailed historical information
- Extended references
```

### 2. Task Decomposition

Break complex tasks into smaller, more manageable components:

1. **Atomic subtasks**: Create self-contained units of work
2. **Clear boundaries**: Define precise scope for each subtask
3. **Minimal dependencies**: Reduce information sharing requirements
4. **Appropriate specialists**: Assign to the most efficient agent

Example decomposition:
```markdown
# Original Complex Task
Create a comprehensive market analysis report with competitive analysis, trend forecasting, and strategic recommendations.

# Decomposed Subtasks
1. Gather market data and statistics (Research Agent)
2. Analyze competitive landscape (Research Agent)
3. Identify key market trends (Research Agent)
4. Design report structure and visualization approach (Architect Agent)
5. Create data visualizations (Code Agent)
6. Develop strategic recommendations (Ask Agent)
7. Compile final report (Orchestrator Agent)
```

### 3. Specialized Mode Selection

Choose the most appropriate specialist mode for each task:

1. **Match expertise to requirements**: Select the agent with the most relevant skills
2. **Consider token efficiency**: Some modes may be more efficient for certain tasks
3. **Minimize switching**: Batch similar tasks for the same mode
4. **Use the right tool**: Don't use a complex mode for a simple task

Mode selection guidelines:
```markdown
# Mode Selection Efficiency Guide

- Research: Optimal for information gathering and synthesis
- Code: Efficient for implementation and technical tasks
- Architect: Best for system design and structure
- Debug: Specialized for problem diagnosis
- Ask: Optimized for concise information retrieval
- Orchestrator: Efficient for coordination but not direct work
```

### 4. Context Packaging

Carefully package context when transitioning between modes:

1. **Include only what's needed**: Filter information to the essential elements
2. **Structure for efficiency**: Organize information in easily digestible formats
3. **Provide clear references**: Allow agents to retrieve additional information if needed
4. **Use standardized formats**: Consistent structures reduce processing overhead

Example context package:
```markdown
# Context Package: User Authentication System

## Essential Information
- RESTful API using Node.js/Express
- JWT-based authentication
- 6 required endpoints (register, login, etc.)

## Key Requirements
- Security: Password hashing, rate limiting
- Performance: <100ms response time
- Compliance: GDPR requirements

## References
- Full spec: `/design/auth-system-spec.md`
- Security requirements: `/requirements/security.md`
- Example implementation: `/examples/auth-example.js`
```

### 5. Cognitive Process Selection

Choose the most efficient cognitive process for each task:

1. **Match process to complexity**: Use simpler processes for straightforward tasks
2. **Start simple, escalate if needed**: Begin with basic reasoning, add complexity only when required
3. **Consider token cost**: Different cognitive processes have different computational requirements
4. **Optimize sequence**: Some sequences are more efficient than others for specific tasks

Cognitive process efficiency guide:
```markdown
# Cognitive Process Efficiency Ranking

## Low Token Cost
- Initial Curiosity (Observe)
- Focused Questioning (Observe → Define)
- Basic Reasoning (Define → Infer)

## Medium Token Cost
- Exploratory Analysis (Observe → Infer)
- Reflective Questioning (Observe → Reflect → Define)
- Insight Discovery (Observe → Infer → Synthesize)

## High Token Cost
- Complex Decision-Making (Define → Infer → Reflect → Synthesize)
- Problem-Solving (Observe → Define → Infer → Reflect → Synthesize)
- Evidence Triangulation (Observe → Distinguish → Compare → Infer)
```

### 6. Documentation Efficiency

Optimize documentation practices for token efficiency:

1. **Standardized templates**: Use consistent formats to reduce processing overhead
2. **Progressive detail**: Include essential information first, with details available on demand
3. **Reference instead of repeat**: Link to existing information rather than duplicating
4. **Structured formats**: Use clear headings and organization for faster parsing
5. **Concise expression**: Communicate clearly with minimal verbosity

Example of efficient vs. inefficient documentation:
```markdown
# Inefficient Documentation
This module handles user authentication including registration, login, logout, password reset, and session management. It uses JSON Web Tokens (JWTs) for maintaining session state and bcrypt for password hashing. The registration process includes email verification through a confirmation link. The password reset functionality sends an email with a time-limited token. Session management includes automatic refresh of tokens before expiration. The module implements rate limiting to prevent brute force attacks.

# Efficient Documentation
## User Authentication Module
- **Core functions**: Registration, login, logout, password reset, sessions
- **Key technologies**: JWT (sessions), bcrypt (passwords)
- **Security features**: Email verification, time-limited tokens, rate limiting
- **Details**: See `/docs/auth/detailed-specs.md`
```

### 7. Context Window Management

Actively manage the context window to prevent overflow:

1. **Monitor utilization**: Keep track of approximate token usage
2. **Implement clearing strategies**: Periodically clear unnecessary context
3. **Chunk large operations**: Break very large tasks into sequential chunks
4. **Prioritize recent information**: Retain recent context over older information
5. **Maintain task state externally**: Use the boomerang state file to track progress

Context window management protocol:
```markdown
# Context Window Management Protocol

## Monitoring
- Check context utilization before each major operation
- Target: Maintain below 40% utilization for headroom

## Clearing Triggers
- After task completion
- When switching specialist modes
- When utilization exceeds 60%
- Before starting complex reasoning chains

## Retention Priorities
1. Current task definition and requirements
2. Immediate work in progress
3. Recent outputs and decisions
4. Reference information for current subtask
5. General project context
```

## Token Optimization Metrics

Track these metrics to measure and improve token efficiency:

### 1. Token Efficiency Ratio
- **Definition**: Output quality / tokens consumed
- **Measurement**: Subjective quality assessment divided by token count
- **Target**: Maximize quality while minimizing tokens

### 2. Context Utilization
- **Definition**: Percentage of context window in use
- **Measurement**: Current tokens / maximum tokens
- **Target**: Maintain below 40% for optimal performance

### 3. Task Completion Efficiency
- **Definition**: Tasks completed per token block
- **Measurement**: Number of subtasks / total tokens used
- **Target**: Maximize tasks per token block

### 4. Mode Switching Overhead
- **Definition**: Tokens used for context restoration after mode switches
- **Measurement**: Tokens used for context reestablishment
- **Target**: Minimize through efficient context packaging

### 5. Cognitive Process Efficiency
- **Definition**: Reasoning quality / cognitive process complexity
- **Measurement**: Effectiveness of reasoning vs. process token cost
- **Target**: Use the simplest effective process

## Implementation Examples

### Example 1: Research Task Optimization

**Unoptimized Approach**:
- Load all potentially relevant background information
- Use complex cognitive processes from the start
- Maintain all research findings in context
- Generate comprehensive documentation immediately

**Optimized Approach**:
```markdown
1. Start with minimal context and "Initial Curiosity" process
2. Progressively add relevant sources as needed
3. Use "Exploratory Analysis" only when patterns need identification
4. Document key findings immediately, details in external storage
5. Package only essential insights when returning to Orchestrator
6. Clear research data from context after task completion
```

### Example 2: Code Implementation Optimization

**Unoptimized Approach**:
- Keep entire codebase in context
- Maintain full requirements document in context
- Use "Problem-Solving" for even simple implementations
- Generate extensive documentation inline

**Optimized Approach**:
```markdown
1. Load only relevant code modules and specific requirements
2. Use "Basic Reasoning" for straightforward implementations
3. Escalate to "Problem-Solving" only for complex features
4. Document with concise comments, detailed docs separately
5. Reference external examples rather than including them
6. Clear implementation details when moving to testing
```

## Meta-Commentary

*As I create this token optimization guide, I'm actively applying these principles. I've structured the document with progressive detail, starting with core concepts and moving to specific examples. I've used concise language and clear formatting to maximize information density while maintaining readability.*

*Notice how the document itself demonstrates the "Scalpel, not Hammer" philosophy—providing precise, targeted information rather than exhaustive detail in every section. The examples show both inefficient and efficient approaches, allowing users to understand the contrast.*

*This self-referential implementation of token optimization principles while documenting them creates a practical demonstration of the concepts in action.*

---

For more information on how token optimization integrates with other components of the multi-agent framework, see:
- [SPARC Framework Overview](../framework/sparc-overview.md)
- [Cognitive Processes](../framework/cognitive-processes.md)
- [Boomerang Logic](../framework/boomerang-logic.md)