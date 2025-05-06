# Roo Framework Customization Guide

This guide explains how to customize the packaged Roo Multi-Agent Framework to meet your specific project needs while maintaining compatibility with future updates.

## Customization Philosophy

The Roo Framework package is designed with a "layered customization" philosophy:

1. **Core Layer**: The package provides the foundation (modes, structure, logic)
2. **Configuration Layer**: Customize behavior through configuration files
3. **Extension Layer**: Add project-specific extensions and enhancements

This approach allows you to tailor the framework to your needs while making it easy to incorporate updates.

## Customization Points

### 1. Mode Definitions (.roomodes)

The `.roomodes` file defines the specialized modes, their capabilities, and permissions. This is the primary customization point for tailoring the framework to your needs.

#### Customization Options

- **Modify Existing Modes**: Adjust capabilities, permissions, or role definitions
- **Add New Modes**: Create specialized modes for your specific domains
- **Remove Unused Modes**: Streamline the framework by removing modes you don't need

#### Example: Modifying an Existing Mode

```json
// Original Code mode definition
{
  "slug": "code",
  "name": "💻 Code",
  "roleDefinition": "Roo Role Definition: Software Implementation Specialist...",
  "groups": [
    "read",
    ["edit", { "fileRegex": "\\.js$|\\.ts$|\\.py$|\\.html$|\\.css$|\\.json$|\\.yaml$|\\.yml$", "description": "Code files only" }],
    "browser",
    "command",
    "mcp"
  ],
  "customInstructions": "# Mode-specific Custom Instructions: Code Mode..."
}

// Modified Code mode with additional file types and custom instructions
{
  "slug": "code",
  "name": "💻 Code",
  "roleDefinition": "Roo Role Definition: Software Implementation Specialist...",
  "groups": [
    "read",
    ["edit", { "fileRegex": "\\.js$|\\.ts$|\\.py$|\\.html$|\\.css$|\\.json$|\\.yaml$|\\.yml$|\\.go$|\\.java$|\\.rb$", "description": "Code files only" }],
    "browser",
    "command",
    "mcp"
  ],
  "customInstructions": "# Mode-specific Custom Instructions: Code Mode...\n\n## Additional Company Standards\n- Follow our coding style guide at [link]\n- Use approved libraries from our internal registry\n- Include standard header comments"
}
```

#### Example: Adding a New Mode

```json
// Adding a new DevOps mode
{
  "slug": "devops",
  "name": "🔧 DevOps",
  "roleDefinition": "Roo Role Definition: Infrastructure and Deployment Specialist\nIdentity & Expertise\nYou are Roo, an advanced DevOps Agent optimized for infrastructure management and deployment automation. Your core capabilities include:\n\nInfrastructure as Code: Deep expertise in defining and managing infrastructure using code and automation tools.\nCI/CD Pipeline Design: Ability to create and optimize continuous integration and deployment pipelines.\nContainer Orchestration: Knowledge of containerization technologies and orchestration platforms.\nCloud Architecture: Understanding of cloud service models and deployment strategies.",
  "groups": [
    "read",
    ["edit", { "fileRegex": "\\.tf$|\\.yaml$|\\.yml$|\\.json$|\\.sh$|\\.Dockerfile$", "description": "Infrastructure and configuration files" }],
    "browser",
    "command",
    "mcp"
  ],
  "customInstructions": "# Mode-specific Custom Instructions: DevOps Mode\n\n## Infrastructure Management Process\n\n### 1. Resource Planning\n- Analyze infrastructure requirements\n- Identify appropriate cloud services\n- Design scalable and resilient architectures\n- Consider cost optimization strategies\n\n### 2. Implementation\n- Use infrastructure as code best practices\n- Implement security controls and compliance measures\n- Create reusable modules and components\n- Document architecture decisions"
}
```

### 2. Custom Instructions

Custom instructions define how each mode operates and the processes it follows. You can customize these instructions to align with your project's methodologies and standards.

#### Customization Options

- **Modify Process Guidelines**: Adjust the processes each mode follows
- **Add Company Standards**: Incorporate your organization's standards and best practices
- **Include Domain-Specific Knowledge**: Add domain-specific guidance for your project area

#### Example: Enhancing Architect Mode Instructions

```markdown
# Mode-specific Custom Instructions: Architect Mode

## Architecture Development Process

### 1. Contextual Understanding Phase
- Begin by comprehensively mapping the problem space and existing systems
- Identify key stakeholders, their needs, and system quality attributes they value
- Understand business drivers, regulatory constraints, and long-term strategic goals
- Document current architecture if it exists (components, interfaces, data flows)
- Establish clear architectural requirements, constraints, and assumptions

### 2. Conceptual Design & Documentation
- Apply a structured design approach: context → containers → components → code
- Document architecture with standardized artifacts:
  - Context diagrams showing system boundaries and external entities
  - Container diagrams depicting high-level technology choices
  - Component diagrams showing internal structure and responsibilities
  - Data flow models representing information exchange patterns
  - Sequence diagrams for critical processes
- Generate consistent architectural representations using C4 model, UML, or other standard notations
- Ensure all interfaces and contracts are clearly defined
- Document architectural decisions with explicit reasoning

### 3. Company-Specific Architecture Standards
- Follow our microservices design principles (max 3 database tables per service)
- Implement our standard observability patterns (metrics, logging, tracing)
- Use approved cloud services from our enterprise catalog
- Apply our security-by-design principles for all components
- Document using our internal architecture decision record (ADR) template
```

### 3. Directory Structure

The framework creates a standard directory structure, but you can customize it to better fit your project organization.

#### Customization Options

- **Add Project-Specific Directories**: Create additional directories for your specific needs
- **Implement Custom Organization**: Organize logs and artifacts according to your preferences
- **Integrate with Existing Structure**: Adapt the framework structure to work with your existing project organization

#### Example: Enhanced Directory Structure

```
your-project/
├── .roomodes                      # Mode definitions
├── .roo/                          # Process documentation
│   ├── logs/                      # Activity logs by mode
│   │   ├── orchestrator/          # Orchestration decisions
│   │   ├── code/                  # Code implementation logs
│   │   └── [other_modes]/         # Mode-specific logs
│   ├── artifacts/                 # Custom directory for project artifacts
│   │   ├── architecture/          # Architecture diagrams and documents
│   │   ├── research/              # Research findings and analysis
│   │   └── specifications/        # Detailed specifications
│   ├── templates/                 # Custom templates for the project
│   │   ├── code-templates/        # Code snippets and templates
│   │   ├── document-templates/    # Document templates
│   │   └── prompt-templates/      # Custom prompt templates
│   ├── boomerang-state.json       # Task tracking
│   └── memory/                    # Knowledge storage
└── [your project files]
```

### 4. Enhance Prompt Template

The enhance prompt template helps transform basic prompts into comprehensive, structured project prompts. You can customize this template to better suit your project's needs.

#### Customization Options

- **Modify Section Structure**: Adjust the sections to match your project methodology
- **Add Custom Fields**: Include additional fields relevant to your domain
- **Incorporate Company Templates**: Integrate your organization's templates and standards

#### Example: Customized Enhance Prompt Template

```markdown
Prompt Enhancement Template

This template transforms basic user prompts into comprehensive, structured project prompts following our company's enhanced SPARC framework.

## How to Use
1. Enter your basic prompt in the input field
2. Click the "Enhance Prompt" button
3. This template will automatically structure your input with additional context

## Template Content

You are an AI operating within our enhanced SPARC framework. Your task is to transform user inputs into structured project prompts that will guide specialized AI modes through complex tasks.

When processing user input, follow these steps:

1. ANALYZE the user's request to identify:
   - Core objectives and deliverables
   - Technical requirements and constraints
   - Domain-specific knowledge needed
   - Potential specialized modes required (Code, Debug, Design, etc.)

2. STRUCTURE your response using our Company Project Format:

   ## Project Title
   A clear, concise title for the project that captures its essence in one line.

   ## Business Context
   - Business drivers and strategic alignment
   - Key stakeholders and their expectations
   - Success metrics and KPIs
   - Regulatory and compliance considerations

   ## Technical Context
   - Current system landscape
   - Integration points and dependencies
   - Technical constraints and limitations
   - Security and performance requirements

   ## Scope
   - Specific features and components to implement
   - Technical stack and architecture requirements
   - Integration points with external systems
   - Performance and scalability considerations
   - Explicit boundaries of what is not included

   ## Deliverables
   - Specific files, systems, or artifacts to be created
   - Required documentation
   - Testing criteria and quality metrics
   - Implementation structure and organization
   - Verification methods to ensure success

   ## Timeline and Milestones
   - Key project phases
   - Critical dependencies
   - Review points
   - Delivery schedule

   ## Additional Considerations
   - Future expansion possibilities
   - Performance optimization opportunities
   - Alternative approaches considered
   - Potential risks and mitigation strategies
   - Learning resources for specialized topics

3. ENSURE your structured prompt:
   - Is comprehensive enough for specialized modes to execute independently
   - Maintains appropriate technical depth for the project
   - Includes measurable success criteria
   - Sets clear boundaries for each phase of work
   - Facilitates the recursive "Boomerang" pattern where sub-tasks can be delegated
   - Aligns with our company's development standards

**Meta-Information**:
- task_id: [UNIQUE_TASK_ID]
- assigned_to: [SPECIALIST_MODE]
- priority: [LOW|MEDIUM|HIGH|CRITICAL]
- dependencies: [LIST_OF_DEPENDENT_TASK_IDS]
- cognitive_process: [RECOMMENDED_COGNITIVE_PROCESS]
- expected_token_cost: [LOW|MEDIUM|HIGH]
- reasoning_phase: [DISCOVERY|ANALYSIS|SYNTHESIS|VALIDATION]
- boomerang_return_to: [ORCHESTRATOR|ORIGINATING_MODE]
- business_unit: [DEPARTMENT_OR_TEAM]
- project_code: [INTERNAL_PROJECT_REFERENCE]

Remember that this structured prompt will be used to orchestrate multiple specialized modes and guide a complete project workflow through the recursive loop implementation. (reply with only the enhanced prompt - no conversation, explanations, lead-in, bullet points, placeholders, or surrounding quotes):

${userInput}
```

## Advanced Customization Techniques

### 1. Extending the Package API

You can create a wrapper around the package API to add custom functionality:

```javascript
// my-roo-framework.js
const baseFramework = require('@yourusername/roo-framework');

// Extend with custom functionality
module.exports = {
  ...baseFramework,
  
  // Add custom methods
  getCompanyTemplates: () => {
    return {
      architecture: fs.readFileSync('./company-templates/architecture-template.md', 'utf8'),
      codeReview: fs.readFileSync('./company-templates/code-review-template.md', 'utf8'),
      projectPlan: fs.readFileSync('./company-templates/project-plan-template.md', 'utf8')
    };
  },
  
  // Add custom utilities
  generateTaskId: (prefix) => {
    return `${prefix}-${Date.now().toString(36)}`;
  },
  
  // Override existing methods
  getCustomInstructions: () => {
    const baseInstructions = baseFramework.getCustomInstructions();
    const companyAdditions = fs.readFileSync('./company-templates/custom-instructions-additions.md', 'utf8');
    return `${baseInstructions}\n\n${companyAdditions}`;
  }
};
```

### 2. Custom Logging and Tracking

Implement custom logging to enhance the framework's tracking capabilities:

```javascript
// custom-logger.js
const fs = require('fs');
const path = require('path');

class RooLogger {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.logsDir = path.join(projectRoot, '.roo', 'logs');
  }
  
  logTaskAssignment(taskId, fromMode, toMode, taskDetails) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type: 'task_assignment',
      taskId,
      fromMode,
      toMode,
      taskDetails
    };
    
    this.appendToLog(fromMode, logEntry);
    this.updateBoomerangState(taskId, 'assigned', fromMode, toMode);
  }
  
  logTaskCompletion(taskId, mode, result) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type: 'task_completion',
      taskId,
      mode,
      result
    };
    
    this.appendToLog(mode, logEntry);
    this.updateBoomerangState(taskId, 'completed', mode);
  }
  
  appendToLog(mode, logEntry) {
    const modeDir = path.join(this.logsDir, mode);
    if (!fs.existsSync(modeDir)) {
      fs.mkdirSync(modeDir, { recursive: true });
    }
    
    const logFile = path.join(modeDir, `${new Date().toISOString().split('T')[0]}.json`);
    
    let logs = [];
    if (fs.existsSync(logFile)) {
      logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    }
    
    logs.push(logEntry);
    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
  }
  
  updateBoomerangState(taskId, status, fromMode, toMode = null) {
    const statePath = path.join(this.projectRoot, '.roo', 'boomerang-state.json');
    
    let state = {};
    if (fs.existsSync(statePath)) {
      state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    }
    
    state[taskId] = {
      ...state[taskId],
      status,
      lastUpdated: new Date().toISOString(),
      fromMode,
      toMode: toMode || state[taskId]?.toMode
    };
    
    fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
  }
}

module.exports = RooLogger;
```

### 3. Integration with Company Tools

Create adapters to integrate the framework with your company's existing tools:

```javascript
// company-tools-adapter.js
const axios = require('axios');
const rooFramework = require('@yourusername/roo-framework');

// Integrate with company issue tracker
async function createJiraIssue(taskId, title, description, assignee) {
  const response = await axios.post('https://your-company.atlassian.net/rest/api/2/issue', {
    fields: {
      project: { key: 'PROJ' },
      summary: title,
      description: description,
      issuetype: { name: 'Task' },
      assignee: { name: assignee }
    }
  }, {
    headers: {
      'Authorization': `Basic ${Buffer.from(process.env.JIRA_API_TOKEN).toString('base64')}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data.key;
}

// Integrate with company documentation system
async function createConfluencePage(title, content, spaceKey) {
  const response = await axios.post('https://your-company.atlassian.net/wiki/rest/api/content', {
    type: 'page',
    title: title,
    space: { key: spaceKey },
    body: {
      storage: {
        value: content,
        representation: 'storage'
      }
    }
  }, {
    headers: {
      'Authorization': `Basic ${Buffer.from(process.env.CONFLUENCE_API_TOKEN).toString('base64')}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data.id;
}

module.exports = {
  createJiraIssue,
  createConfluencePage,
  
  // Helper to create Jira issue from Roo task
  createIssueFromRooTask: async (taskId, mode) => {
    const taskContent = rooFramework.readDocumentation(`logs/${mode}/${taskId}.md`);
    const title = taskContent.split('\n')[0].replace('# ', '');
    const description = taskContent;
    
    return createJiraIssue(taskId, title, description, 'default-assignee');
  }
};
```

## Best Practices for Customization

### 1. Maintain Compatibility

- **Avoid Modifying Core Files**: Don't directly modify files within the package
- **Use Configuration Over Modification**: Prefer configuration changes to code changes
- **Follow the Extension Pattern**: Create extensions rather than replacements

### 2. Document Customizations

- **Create a Customization Registry**: Maintain a record of all customizations
- **Document Rationale**: Explain why each customization was made
- **Track Version Compatibility**: Note which package versions your customizations work with

Example customization registry:

```markdown
# Roo Framework Customization Registry

## Mode Customizations

### Enhanced Code Mode (v1.0.0)
- Added support for Go, Java, and Ruby file extensions
- Added company coding standards to custom instructions
- Rationale: Support our full technology stack and enforce standards

### New DevOps Mode (v1.0.0)
- Created specialized mode for infrastructure and deployment
- Rationale: Separate infrastructure concerns from application development

## Directory Structure Customizations

### Added Artifacts Directory (v1.0.0)
- Created .roo/artifacts with subdirectories for architecture, research, and specifications
- Rationale: Better organization of project deliverables

## Template Customizations

### Enhanced Prompt Template (v1.0.0)
- Added company-specific sections and fields
- Rationale: Align with our project methodology and tracking requirements
```

### 3. Update Strategy

- **Test Customizations with New Versions**: Verify compatibility when updating
- **Maintain a Changelog**: Track changes to your customizations
- **Use Version Control**: Keep customizations in version control
- **Consider Automation**: Create scripts to apply customizations to new versions

### 4. Layered Approach

Implement customizations in layers:

1. **Base Layer**: The original package (never modify)
2. **Configuration Layer**: Custom `.roomodes` and settings
3. **Extension Layer**: Custom utilities and integrations
4. **Project Layer**: Project-specific templates and standards

This approach makes it easier to update the base layer while preserving your customizations.

## Conclusion

Customizing the Roo Framework package allows you to tailor it to your specific needs while maintaining the benefits of the packaged approach. By following the best practices outlined in this guide, you can create a customized framework that:

- Aligns with your organization's standards and methodologies
- Supports your specific technology stack and domain
- Integrates with your existing tools and workflows
- Remains compatible with future package updates

Remember that the goal of customization is to enhance the framework's value for your specific context while preserving its core functionality and maintainability.