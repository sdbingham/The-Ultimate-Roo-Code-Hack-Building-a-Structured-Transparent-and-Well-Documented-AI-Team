# The Ultimate Roo Code Hack

**Building a Structured, Transparent, and Well-Documented AI Team that Delegates Its Own Tasks**

## 🙏 Support This Work

If this project helps you build better AI systems and you'd like to show your appreciation:

- **Buy Me a Coffee**: [https://buymeacoffee.com/mnehmos](https://buymeacoffee.com/mnehmos)
- **Check out Vario Research**: For advanced Deep Research alternatives (Talking about you Gemini, ChatGPT), visit [https://mnehmos.github.io/VarioResearch/](https://mnehmos.github.io/VarioResearch/) for custom reports in any format (I Prefer customized websites so i can add in API functionalities into your dashboards as needed. (Alpha Vantage, Yahoo Finance, Arxiv, google maps, etc))

## 🌟 Key Features

- **Multi-Agent Framework**: Specialized modes for different types of tasks
- **SPARC Framework**: Structured approach to complex problem-solving
- **Agentic Boomerang**: Reliable task delegation and tracking system
- **Structured Documentation**: Consistent, traceable documentation
- **Memory Integration**: Knowledge preservation across sessions
- **Token Optimization**: "Scalpel, not Hammer" approach for efficiency

## 🚀 Quick Setup Guide

### Step 1: Meet Your AI Team
Review the `meet-the-team.md` file to understand each team member's (mode's) specialties and when to use them.

### Step 2: Configure Modes
You have three options for configuring modes:

#### Option A: Edit Global Modes (For all projects)
1. Click the "Modes" button in the Roo sidebar
2. Select "Edit Global Modes"
3. Copy the contents of the `.roomodes` file from this project
4. Paste into the Global Modes editor
5. Click "Save"

#### Option B: Edit Project Modes (For this project only)
1. The `.roomodes` file in this project is already configured
2. To modify it, click the "Modes" button in the Roo sidebar
3. Select "Edit Project Modes (.roomodes)"
4. Make your changes
5. Click "Save"

#### Option C: Direct Setup with AI Assistant
If you prefer to set up the framework directly using an AI assistant like Roo, Claude, or ChatGPT, you can copy and paste the following prompt:

```
I want to set up the Ultimate Roo Code Hack multi-agent framework. Please help me:

1. Create a .roomodes file with configurations for these specialized modes:
   - Orchestrator (task management and delegation)
   - Code (software implementation)
   - Architect (system design)
   - Ask (information discovery)
   - Debug (problem diagnosis)
   - Memory (knowledge management)
   - Deep Research (in-depth investigation)

2. Create a meet-the-team.md file that describes each mode as a team member in plain English

3. Set up custom instructions that implement:
   - The SPARC framework for structured reasoning
   - Boomerang logic for task delegation
   - Token optimization strategies
   - Standardized documentation formats

Please provide the complete content for each file and instructions on how to use them.
```

### Step 3: Configure Custom Instructions
1. Click the "Modes" button in the Roo sidebar
2. Scroll down to "Custom Instructions for All Modes"
3. Copy the contents of `templates/custom-instructions-for-all-modes.md`
4. Paste into the Custom Instructions field
5. Click "Save"

### Step 4: Configure Enhance Prompt (Optional)
1. Click the "Support Prompts" button in the Roo sidebar
2. Select "Enhance Prompt"
3. Copy the contents of `templates/enhance-prompt-template.md`
4. Paste into the Prompt field
5. Click "Save"

## 🧩 Basic Usage

1. **Start with Orchestrator Mode** - This is your project manager who will coordinate everything
2. **Describe your project** - Be as detailed as possible in your initial prompt
3. **Let Orchestrator break it down** - It will create subtasks and delegate to specialist modes
4. **Review the results** - Orchestrator will integrate all the pieces and present the final result

## 🧩 Using the Modes

### Switching Modes
1. Click on the current mode name in the bottom left corner of the Roo interface
2. Select the desired mode from the dropdown menu

### Using the Enhance Prompt Feature
1. Type your basic prompt in the chat
2. Click the ✨ button next to the send button
3. Roo will transform your basic prompt into a comprehensive, structured project prompt

### Creating Custom Tasks
When creating tasks for specialist modes, use the standardized task prompt format:

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

This structured format ensures that specialist modes have all the information they need to complete tasks effectively and consistently.

## 🔄 The Boomerang Pattern

The Boomerang Pattern ensures reliable task delegation and tracking:

1. **Orchestrator** breaks down complex tasks into subtasks
2. **Orchestrator** assigns each subtask to a specialist mode using the `new_task` tool (NEVER `switch_mode`)
3. **Specialist Mode** completes the assigned task
4. **Specialist Mode** returns results to the Orchestrator
5. **Orchestrator** verifies and integrates the results

## 📊 Token Optimization & Best Practices

Follow these principles to optimize token usage and ensure project success:

1. **Comprehensive Initial Planning**:
   - Make initial prompts as detailed as possible
   - Include all required features in the first build
   - Establish complete scaffolding before implementation
   - Avoid adding new core functionalities later (leads to context issues)

2. **Resource Management**:
   - Keep context window utilization below 40%
   - Start with minimal context and add only what's needed
   - Clear unnecessary context when switching tasks
   - Break complex tasks into atomic components

3. **Quality Control**:
   - Set temperature to 0 for coding projects to ensure consistency
   - Maintain human-in-the-loop oversight for critical decisions
   - Monitor implementation to ensure requirements are met correctly
   - Minimize rework, as code refactoring can confuse even advanced models

4. **Model Selection**:
   - Use Claude 3.7 (recommended) for complex coding projects
   - Ideal for full-stack websites, basic Tauri applications, etc.
   - Provides best balance of context understanding and code generation

## 🤝 Getting Help

If you encounter any issues or have questions, you can:

1. Ask the Orchestrator to diagnose and resolve the problem
2. Review the mode definitions in the `.roomodes` file
3. Visit the GitHub repository for updates and community support

---

## 📋 File Structure

- **meet-the-team.md**: Descriptions of each AI team member (mode) in plain English
- **.roomodes**: The primary configuration file for all modes
- **templates/**: Contains templates for custom instructions and enhance prompt
  - **custom-instructions-for-all-modes.md**: Template for global instructions
  - **enhance-prompt-template.md**: Template for the enhance prompt feature

## 🔑 Important Notes

- The `.roomodes` file in your local repo will override global settings
- The older `.roo` directory structure is being deprecated
- Always use the `.roomodes` file for mode management and integration

## 📚 Advanced Mode Creation

For a detailed guide on creating custom modes, including system consistency and best practices, see the [detailed-mode-creation-guide.md](detailed-mode-creation-guide.md) file.