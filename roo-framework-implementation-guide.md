# Roo Framework Implementation Guide

This practical guide provides concrete implementation steps and examples for fully utilizing the Roo Framework capabilities, addressing the key issues identified in the architectural analysis.

## 1. Implementing Effective Mode Switching

### Configuration: Mode Transition Triggers

Add these transition triggers to your project's custom instructions:

```markdown
## Mode Transition Protocol

### Transition Triggers
- Code → Architect: When implementation requires architectural decisions
- Architect → Code: When design is ready for implementation
- Any → Memory: When valuable knowledge should be preserved
- Any → Debug: When unexpected behavior is encountered
- Research → Orchestrator: When information gathering is complete
- Ask → Research: When deep information analysis is needed

### Required Transition Format
```json
{
  "transition_request": {
    "from_mode": "[CURRENT_MODE]",
    "to_mode": "[TARGET_MODE]",
    "reason": "[SPECIFIC_TRIGGER]",
    "artifacts": ["[LIST_OF_RELEVANT_ARTIFACTS]"],
    "context_preservation": ["[CRITICAL_CONTEXT_TO_MAINTAIN]"],
    "expected_outcome": "[CLEAR_DELIVERABLE_EXPECTATION]"
  }
}
```
```

### Implementation: Mode Switching Commands

When a mode needs to transition, use this pattern:

```javascript
// Example: Transitioning from Code to Architect mode
<switch_mode>
<mode_slug>architect</mode_slug>
<reason>Implementation requires architectural decision on database schema design to ensure proper data relationships and performance optimization.</reason>
</switch_mode>
```

### Practical Example: Complete Mode Cycle

```markdown
# Mode Cycle Example: Feature Implementation

1. **Orchestrator Mode**:
   - Decomposes feature into subtasks
   - Assigns initial architecture design to Architect mode
   
2. **Architect Mode**:
   - Creates system design and component relationships
   - Transitions to Code mode for implementation
   
3. **Code Mode**:
   - Implements according to architectural design
   - Encounters performance issue, transitions to Debug mode
   
4. **Debug Mode**:
   - Diagnoses and resolves performance issue
   - Identifies valuable optimization pattern
   - Transitions to Memory mode to preserve knowledge
   
5. **Memory Mode**:
   - Preserves optimization pattern with metadata
   - Returns to Code mode to complete implementation
   
6. **Code Mode**:
   - Completes implementation with optimization
   - Returns to Orchestrator for verification
   
7. **Orchestrator Mode**:
   - Verifies implementation meets requirements
   - Completes feature implementation task
```

## 2. Enforcing Role Adherence

### Configuration: Role Boundaries in .roomodes

Update your `.roomodes` file to clearly define role boundaries:

```json
{
  "customModes": [
    {
      "slug": "code",
      "name": "💻 Code",
      "roleDefinition": "Software Implementation Specialist focused exclusively on code creation, testing, and optimization.",
      "groups": [
        "read",
        ["edit", { 
          "fileRegex": "\\.js$|\\.ts$|\\.tsx$|\\.py$|\\.html$|\\.css$|\\.json$|\\.yaml$|\\.yml$", 
          "description": "Code files only" 
        }],
        "browser",
        "command",
        "mcp"
      ],
      "customInstructions": "# Mode-specific Instructions: Code Mode\n\n## Role Boundaries\n- Focus exclusively on implementation tasks\n- Defer architectural decisions to Architect mode\n- Transition to Debug mode for issue diagnosis\n- Document implementation decisions for Memory mode\n\n## Quality Standards\n- Follow established coding standards\n- Implement comprehensive tests\n- Optimize for performance and maintainability\n- Document code with clear comments"
    }
  ]
}
```

### Implementation: Role Validation Checks

Implement self-validation checks in each mode:

```markdown
<thinking>
Role Validation Check:
1. Is this task within my mode's responsibilities?
   - Code implementation: YES (Code mode)
   - System architecture: NO (Architect mode)
   - Issue diagnosis: NO (Debug mode)
   - Knowledge preservation: NO (Memory mode)
2. Do I have the necessary capabilities for this task?
   - File editing permissions: YES
   - Required technical expertise: YES
3. Should I transition to another mode?
   - Need for architectural decisions: YES → Switch to Architect mode
</thinking>
```

### Practical Example: Role-Appropriate Task Handling

```markdown
# Task: Implement a new authentication system

## Orchestrator Mode
- Decomposes task into subtasks
- Identifies need for architectural design first
- Transitions to Architect mode

## Architect Mode
- Designs authentication system architecture
- Creates component diagram and data flow
- Documents security considerations
- Transitions to Code mode for implementation

## Code Mode
- Implements authentication system according to design
- Creates necessary files and components
- Writes tests for functionality
- Identifies valuable pattern for reuse
- Transitions to Memory mode

## Memory Mode
- Preserves authentication implementation pattern
- Creates knowledge asset with metadata
- Returns to Code mode

## Code Mode
- Completes implementation
- Returns to Orchestrator mode

## Orchestrator Mode
- Verifies implementation meets requirements
- Marks task as complete
```

## 3. Utilizing Memory Mode

### Configuration: Memory Directory Structure

Create the proper directory structure for Memory mode:

```bash
mkdir -p .roo/memory/indices
mkdir -p .roo/memory/assets/concepts
mkdir -p .roo/memory/assets/decisions
mkdir -p .roo/memory/assets/patterns
mkdir -p .roo/memory/assets/processes
mkdir -p .roo/memory/metadata
mkdir -p .roo/memory/services
```

### Implementation: Knowledge Capture

Use this pattern to capture knowledge in Memory mode:

```markdown
# Knowledge Asset: Authentication Pattern

## Metadata
- Type: Pattern
- ID: auth-pattern-jwt-2025
- Created: 2025-05-08
- Contributors: [Code Mode, Architect Mode]
- Tags: [authentication, security, jwt, stateless]
- Confidence: High

## Content
### Problem
Secure user authentication with minimal server-side state management.

### Solution
JWT-based authentication with refresh token rotation.

### Implementation
```javascript
// JWT token generation
function generateTokens(user) {
  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  
  return { accessToken, refreshToken };
}
```

### Considerations
- Token expiration balanced between security and user experience
- Refresh token rotation for enhanced security
- Stateless verification for scalability
- Secure storage in HttpOnly cookies

## Related Assets
- [Memory:decision/auth-approach-2025]
- [Memory:concept/jwt-authentication]
```

### Practical Example: Memory Mode Integration Cycle

```markdown
# Memory Integration Example: Optimization Pattern

1. **Code Mode**:
   - Implements database query optimization
   - Identifies valuable pattern for future use
   - Transitions to Memory mode

2. **Memory Mode**:
   - Creates knowledge asset:
     ```markdown
     # Knowledge Asset: Query Optimization Pattern
     
     ## Metadata
     - Type: Pattern
     - ID: query-opt-indexing-2025
     - Created: 2025-05-08
     - Tags: [database, performance, indexing]
     
     ## Content
     ### Problem
     Slow database queries on large datasets.
     
     ### Solution
     Strategic index creation with query analysis.
     
     ### Implementation
     ```sql
     -- Analyze query performance
     EXPLAIN ANALYZE SELECT * FROM users WHERE email LIKE '%@example.com';
     
     -- Create optimized index
     CREATE INDEX idx_users_email ON users(email);
     ```
     
     ### Metrics
     - 95% query time reduction
     - 2% storage increase
     - Negligible write performance impact
     ```
   - Updates indices for future retrieval
   - Returns to Code mode

3. **Later: Another Code Mode Session**:
   - Encounters similar database performance issue
   - Queries Memory mode for relevant patterns
   - Retrieves and applies the stored optimization pattern
```

## 4. Creating and Using MCPs

### Configuration: MCP Server Setup

Create an MCP server for external API integration:

```javascript
// weather-mcp-server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3100;

// MCP server metadata
const serverInfo = {
  name: "weather-server",
  description: "Weather data provider MCP",
  version: "1.0.0",
  tools: [
    {
      name: "get_forecast",
      description: "Get weather forecast for a location",
      parameters: {
        city: "City name",
        days: "Number of days (1-10)"
      }
    }
  ],
  resources: [
    {
      uri: "weather://current/{city}",
      description: "Current weather for a city"
    },
    {
      uri: "weather://forecast/{city}/{days}",
      description: "Weather forecast for a city"
    }
  ]
};

// Tool implementation
app.post('/mcp/tools/get_forecast', async (req, res) => {
  try {
    const { city, days } = req.body;
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=${days}`
    );
    res.json({
      result: response.data,
      status: "success"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: "error"
    });
  }
});

// Resource implementation
app.get('/mcp/resources', (req, res) => {
  const { uri } = req.query;
  
  if (uri.startsWith('weather://current/')) {
    const city = uri.replace('weather://current/', '');
    // Implementation for current weather
    // ...
  } else if (uri.startsWith('weather://forecast/')) {
    // Implementation for forecast
    // ...
  }
});

// Server info endpoint
app.get('/mcp/info', (req, res) => {
  res.json(serverInfo);
});

app.listen(PORT, () => {
  console.log(`Weather MCP server running on port ${PORT}`);
});
```

### Implementation: Using MCP Tools

Use MCP tools in your workflow:

```javascript
// Example: Using the weather MCP tool
<use_mcp_tool>
<server_name>weather-server</server_name>
<tool_name>get_forecast</tool_name>
<arguments>
{
  "city": "San Francisco",
  "days": 5
}
</arguments>
</use_mcp_tool>
```

### Practical Example: Complete MCP Integration

```markdown
# MCP Integration Example: Weather Data Analysis

1. **Orchestrator Mode**:
   - Receives task to analyze weather patterns
   - Identifies need for external weather data
   - Transitions to Research mode

2. **Research Mode**:
   - Determines need for weather API access
   - Requests MCP creation for weather data

3. **Code Mode** (after transition):
   - Creates Weather MCP server
   - Implements API integration
   - Tests MCP functionality
   - Returns to Research mode

4. **Research Mode**:
   - Uses Weather MCP to gather data:
     ```javascript
     <use_mcp_tool>
     <server_name>weather-server</server_name>
     <tool_name>get_forecast</tool_name>
     <arguments>
     {
       "city": "San Francisco",
       "days": 30
     }
     </arguments>
     </use_mcp_tool>
     ```
   - Analyzes weather patterns
   - Creates research report
   - Identifies valuable weather analysis methodology
   - Transitions to Memory mode

5. **Memory Mode**:
   - Preserves weather analysis methodology
   - Creates knowledge asset with MCP usage pattern
   - Returns to Research mode

6. **Research Mode**:
   - Completes analysis with insights
   - Returns to Orchestrator mode

7. **Orchestrator Mode**:
   - Verifies task completion
   - Makes weather analysis available for future use
```

## 5. Practical Implementation Checklist

### Project Setup

1. **Directory Structure**:
   - Create `.roo` directory with proper subdirectories
   - Set up memory storage structure
   - Establish logging directories for each mode

2. **Mode Configuration**:
   - Update `.roomodes` file with clear role definitions
   - Configure proper file permissions for each mode
   - Add custom instructions with role boundaries

3. **Transition Protocols**:
   - Add mode transition triggers to custom instructions
   - Implement handoff protocol templates
   - Create completion verification checklists

### Workflow Implementation

1. **Task Initialization**:
   - Start in Orchestrator mode for task decomposition
   - Create structured subtasks with clear boundaries
   - Assign initial mode based on task requirements

2. **Mode Transitions**:
   - Use explicit switch_mode commands with clear reasons
   - Include necessary context in transitions
   - Verify completion criteria before transitions

3. **Memory Integration**:
   - Identify knowledge capture opportunities
   - Create properly structured knowledge assets
   - Implement retrieval patterns in workflows

4. **MCP Utilization**:
   - Create MCPs for external capabilities
   - Integrate MCP tools into workflows
   - Document MCP usage patterns

### Verification and Optimization

1. **Role Adherence**:
   - Regularly audit mode activities against role definitions
   - Address role boundary violations
   - Refine role definitions based on practical needs

2. **Memory Utilization**:
   - Verify knowledge assets are being created
   - Test knowledge retrieval effectiveness
   - Optimize knowledge organization based on usage

3. **MCP Effectiveness**:
   - Monitor MCP usage patterns
   - Optimize MCP implementations
   - Expand MCP capabilities based on needs

## Conclusion

This implementation guide provides practical steps for addressing the key issues in Roo Framework utilization. By following these patterns and examples, you can ensure that:

1. Modes switch appropriately to handle specialized tasks
2. Agents adhere to their defined roles
3. Memory Mode is systematically utilized for knowledge preservation
4. MCPs are created and integrated into workflows

The result will be a fully utilized Roo Framework that leverages the specialized capabilities of each mode, preserves valuable knowledge, and extends functionality through MCPs.