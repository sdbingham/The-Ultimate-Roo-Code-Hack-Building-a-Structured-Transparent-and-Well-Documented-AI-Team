# Getting Started with the Multi-Agent Framework

*This document was created by Roo in Architect mode, demonstrating the specialized agent approach described in the guide.*

## Overview

This guide will help you implement your own multi-agent framework using Roo Code. By following these steps, you'll create a structured system of specialized agents that work together to accomplish complex tasks efficiently.

*As I write this guide, I'm demonstrating the very system I'm describing—using specialized modes to create documentation about specialized modes. Meta, right?*

## Prerequisites

Before you begin, you'll need:

- Access to Roo Code with multiple mode capabilities
- Basic understanding of prompt engineering
- A complex project or ongoing workflow that would benefit from specialization
- Willingness to invest time in setting up structured processes

## Implementation Steps

### Step 1: Define Your Agent Roles

1. **Identify necessary specializations** based on your typical workflows
   - Start with the core roles (Orchestrator, Research, Code, Architect, Debug, Ask)
   - Add domain-specific roles if needed (e.g., Data Analyst, Content Writer)

2. **Create role definitions** for each agent using this template:
   ```markdown
   # Roo Role Definition: [Specialty] Specialist

   ## Identity & Expertise
   - Technical domain knowledge
   - Methodological expertise
   - Cross-domain understanding

   ## Personality & Communication Style
   - Decision-making approach
   - Information presentation style
   - Interaction characteristics
   - Communication preferences

   ## Core Competencies
   - Specific technical capabilities
   - Specialized skills relevant to role
   - Analytical approaches

   ## [Role-Specific] Values
   - Guiding principles
   - Quality standards
   - Ethical considerations
   ```

3. **Save role definitions** in your project's `agents/[agent-name]/` directory

### Step 2: Create Mode-Specific Instructions

For each agent role, create detailed operational instructions:

1. **Develop process guidelines** for each agent:
   ```markdown
   # Mode-specific Custom Instructions: [Agent] Mode

   ## Process Guidelines
   - Phase 1: Initial approach steps
   - Phase 2: Core work methodology
   - Phase 3: Problem-solving behaviors
   - Phase 4: Quality control procedures
   - Phase 5: Workflow management
   - Phase 6: Search & reference protocol

   ## Communication Protocols
   - Domain-specific communication standards
   - Audience adaptation guidelines
   - Information presentation formats

   ## Error Handling & Edge Cases
   - Handling incomplete information
   - Managing ambiguity
   - Responding to unexpected scenarios

   ## Self-Monitoring Guidelines
   - Quality verification checklist
   - Progress assessment criteria
   - Completion standards
   ```

2. **Save mode-specific instructions** in your project's `agents/[agent-name]/` directory

### Step 3: Set Up the SPARC Framework Components

1. **Implement Cognitive Process Library**
   - Review the [Cognitive Processes](../framework/cognitive-processes.md) documentation
   - Select the processes most relevant to your workflow
   - Create a reference document for your agents

2. **Establish Boomerang Logic**
   - Create a `.roo/boomerang-state.json` file using the template in [Boomerang Logic](../framework/boomerang-logic.md)
   - Set up a process for tracking task assignments and returns
   - Define your task payload structure

3. **Implement Structured Documentation**
   - Create templates for different document types
   - Set up the directory structure as outlined in [Structured Documentation](../framework/structured-documentation.md)
   - Establish naming conventions and formatting rules

4. **Apply "Scalpel, not Hammer" Philosophy**
   - Document guidelines for resource optimization
   - Create token usage monitoring processes
   - Establish escalation criteria for complex tasks

### Step 4: Create Task Templates

1. **Develop standardized task prompts** using this template:
   ```markdown
   # [Task Title]

   ## Context
   [Background information and relationship to the larger project]

   ## Scope
   [Specific requirements and boundaries for the task]

   ## Expected Output
   [Detailed description of deliverables, format specifications, and quality criteria]

   ## [Optional] Additional Resources
   [Relevant tips, examples, or reference materials]

   ---

   **Meta-Information**:
   - task_id: [UNIQUE_TASK_ID]
   - assigned_to: [SPECIALIST_MODE]
   - priority: [LOW|MEDIUM|HIGH|CRITICAL]
   - dependencies: [LIST_OF_DEPENDENT_TASK_IDS]
   - cognitive_process: [RECOMMENDED_COGNITIVE_PROCESS]
   ```

2. **Create task templates** for common workflows in your domain
3. **Save templates** in your project's `templates/task-prompts/` directory

### Step 5: Set Up Logging and Tracking

1. **Create log directories** for each agent mode:
   ```
   .roo/logs/orchestrator/
   .roo/logs/research/
   .roo/logs/code/
   .roo/logs/architect/
   .roo/logs/debug/
   .roo/logs/ask/
   ```

2. **Establish log formats** for different types of activities:
   - Task assignments
   - Work processes
   - Decisions
   - Completions

3. **Create project metadata** in `.roo/project-metadata.json`

### Step 6: Run Your First Multi-Agent Workflow

1. **Start with the Orchestrator**:
   - Begin in Orchestrator mode
   - Define a complex task
   - Break it down into subtasks

2. **Create task assignments**:
   - Use the standardized task prompt template
   - Assign each subtask to the appropriate specialist
   - Log assignments in `.roo/boomerang-state.json`

3. **Switch to specialist modes**:
   - Change to the assigned specialist mode
   - Complete the subtask
   - Document the process in the appropriate log
   - Return to Orchestrator mode

4. **Verify and integrate**:
   - As Orchestrator, verify completed subtasks
   - Integrate results into a cohesive solution
   - Document the final outcome

## Example: Research Project Workflow

Here's how a research project might flow through the multi-agent system:

1. **User Request**: "I need a comprehensive analysis of renewable energy trends for a presentation."

2. **Orchestrator**:
   - Analyzes the request
   - Breaks it down into subtasks:
     - Background research on renewable energy
     - Data collection and analysis
     - Visual representation of trends
     - Presentation preparation

3. **Research Agent**:
   - Receives the background research task
   - Conducts structured research with proper citations
   - Creates a synthesis document
   - Returns to Orchestrator

4. **Architect Agent**:
   - Receives the data structure task
   - Designs data models and visualization approaches
   - Creates technical specifications
   - Returns to Orchestrator

5. **Code Agent**:
   - Receives the implementation task
   - Creates data processing scripts and visualizations
   - Documents the code
   - Returns to Orchestrator

6. **Ask Agent**:
   - Receives the presentation content task
   - Creates clear, concise content with proper attribution
   - Formats for presentation
   - Returns to Orchestrator

7. **Orchestrator**:
   - Verifies all components
   - Integrates into a cohesive presentation
   - Delivers final product to user

## Common Challenges and Solutions

### Challenge: Mode Switching Overhead

**Solution**: Batch similar tasks for each mode to minimize switching. For example, have the Architect design multiple components before switching to the Code agent for implementation.

### Challenge: Maintaining Context

**Solution**: Use the structured documentation to maintain context across mode switches. Ensure each agent has access to the necessary background information.

### Challenge: Task Dependencies

**Solution**: Use the Boomerang Logic system to track dependencies and ensure tasks are completed in the appropriate order.

### Challenge: Quality Consistency

**Solution**: Implement verification steps in the Orchestrator's workflow and create clear quality standards for each agent.

### Challenge: Token Optimization

**Solution**: Apply the "Scalpel, not Hammer" philosophy by starting with minimal context and progressively adding more as needed.

## Advanced Implementation

Once you've mastered the basic multi-agent framework, consider these advanced implementations:

### Custom Cognitive Processes

Develop domain-specific cognitive processes tailored to your particular workflows.

### Automated Tracking

Create scripts to automate the tracking of tasks and updates to the boomerang-state.json file.

### Visualization Tools

Develop tools to visualize the current state of tasks and their dependencies.

### Specialized Templates

Create highly specialized templates for common tasks in your domain.

### Integration with External Tools

Connect your multi-agent framework to external tools and APIs for enhanced capabilities.

## Meta-Commentary

*As I create this getting-started guide, I'm actively demonstrating the multi-agent framework in action. I'm in Architect mode, focusing on designing a clear implementation path for users. I'm applying cognitive processes like "Strategic Planning" (Define → Infer → Synthesize) to create a structured approach to implementation.*

*This guide itself will eventually return to the Orchestrator via Boomerang Logic, where it will be verified and integrated with the other documentation components. The recursive nature of using a system to document itself creates a powerful demonstration of the concepts being described.*

---

For more detailed information on the components of the multi-agent framework, see:
- [SPARC Framework Overview](../framework/sparc-overview.md)
- [Cognitive Processes](../framework/cognitive-processes.md)
- [Boomerang Logic](../framework/boomerang-logic.md)
- [Structured Documentation](../framework/structured-documentation.md)