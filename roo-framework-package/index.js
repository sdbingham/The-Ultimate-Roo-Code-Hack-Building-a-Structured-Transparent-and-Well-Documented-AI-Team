/**
 * Roo Framework Core Module
 *
 * Provides utility functions for accessing and managing Roo Framework resources.
 *
 * @module roo-framework
 * @version 4.5.0
 */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Forward declarations to avoid circular dependencies
let memory, boomerang, modes, langchainMemory, memoryController;

/**
 * Safely reads a file with error handling
 * @param {string} filePath - Path to the file
 * @param {string} encoding - File encoding (default: 'utf8')
 * @returns {object} - { content, error }
 */
function safeReadFile(filePath, encoding = 'utf8') {
  try {
    if (!fs.existsSync(filePath)) {
      return {
        content: null,
        error: new Error(`File not found: ${filePath}`)
      };
    }
    const content = fs.readFileSync(filePath, encoding);
    return { content, error: null };
  } catch (error) {
    return { content: null, error };
  }
}

/**
 * Determines the project root directory
 * @returns {string} - Path to the project root
 */
/**
 * Determines the project root directory using a simplified approach
 * @returns {string} - Path to the project root
 */
function findProjectRoot() {
  try {
    // Start with the current working directory
    let currentDir = process.cwd();
    
    // Check if we're running from inside node_modules
    const isInNodeModules = currentDir.includes('node_modules');
    
    if (isInNodeModules) {
      // If we're in node_modules, try to find the parent project root
      // by looking for the directory above node_modules
      while (currentDir !== path.parse(currentDir).root) {
        if (path.basename(currentDir) === 'node_modules') {
          const parentDir = path.dirname(currentDir);
          return parentDir;
        }
        currentDir = path.dirname(currentDir);
      }
    }
    
    // Look for a package.json file to identify the project root
    currentDir = process.cwd();
    while (currentDir !== path.parse(currentDir).root) {
      const packageJsonPath = path.join(currentDir, 'package.json');
      
      if (fs.existsSync(packageJsonPath)) {
        // Found a package.json, this is likely the project root
        return currentDir;
      }
      
      // Move up one directory
      currentDir = path.dirname(currentDir);
    }
    
    // If we couldn't find a package.json, use the current working directory
    return process.cwd();
  } catch (error) {
    console.warn('Error finding project root:', error.message);
    return process.cwd();
  }
}

// Core utility functions
const core = {
  // File path utilities
  getDocumentationPath: (filename) => {
    return path.join(__dirname, filename);
  },
  
  // Read documentation file with error handling
  readDocumentation: (filename) => {
    const { content, error } = safeReadFile(path.join(__dirname, filename));
    if (error) {
      console.error(`Error reading documentation file: ${filename}`);
      console.error(error.message);
      return null;
    }
    return content;
  },
  
  // Get custom instructions with error handling
  getCustomInstructions: () => {
    const filePath = path.join(__dirname, 'templates', 'custom-instructions-for-all-modes.md');
    const { content, error } = safeReadFile(filePath);
    if (error) {
      console.error('Error reading custom instructions');
      console.error(error.message);
      return null;
    }
    return content;
  },
  
  // Get enhance prompt template with error handling
  getEnhancePromptTemplate: () => {
    const filePath = path.join(__dirname, 'templates', 'enhance-prompt-template.md');
    const { content, error } = safeReadFile(filePath);
    if (error) {
      console.error('Error reading enhance prompt template');
      console.error(error.message);
      return null;
    }
    return content;
  },
  
  // Get project root directory
  getProjectRoot: findProjectRoot,
  
  // Get path to .roo directory
  getRooDirectory: () => {
    // Store everything in the project root directory
    const projectRoot = findProjectRoot();
    return path.join(projectRoot, '.roo');
  },
  
  // Get boomerang state
  getBoomerangState: () => {
    const projectRoot = findProjectRoot();
    const boomerangPath = path.join(projectRoot, '.roo', 'boomerang-state.json');
    const { content, error } = safeReadFile(boomerangPath);
    
    if (error) {
      console.error('Error reading boomerang state');
      console.error(error.message);
      return { tasks: {}, transitions: [], version: "1.0.0" };
    }
    
    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Error parsing boomerang state JSON');
      console.error(parseError.message);
      return { tasks: {}, transitions: [], version: "1.0.0" };
    }
  },
  
  // Update boomerang state
  updateBoomerangState: (newState) => {
    try {
      const projectRoot = findProjectRoot();
      const boomerangPath = path.join(projectRoot, '.roo', 'boomerang-state.json');
      
      fs.writeFileSync(
        boomerangPath,
        JSON.stringify(newState, null, 2)
      );
      
      return true;
    } catch (error) {
      console.error('Error updating boomerang state');
      console.error(error.message);
      return false;
    }
  },
  
  // Log activity for a specific mode
  logModeActivity: (mode, activity) => {
    try {
      const projectRoot = findProjectRoot();
      const logDir = path.join(projectRoot, '.roo', 'logs', mode);
      
      // Ensure log directory exists
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      
      const timestamp = new Date().toISOString();
      const logFile = path.join(logDir, `${mode}-activity.md`);
      
      // Create or append to log file
      const logEntry = `\n## ${timestamp}\n\n${activity}\n\n---\n`;
      
      if (fs.existsSync(logFile)) {
        fs.appendFileSync(logFile, logEntry);
      } else {
        fs.writeFileSync(logFile, `# ${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode Activity Log\n${logEntry}`);
      }
      
      return true;
    } catch (error) {
      console.error(`Error logging activity for ${mode} mode`);
      console.error(error.message);
      return false;
    }
  },
  
  // Verify Roo framework setup
  verifySetup: () => {
    const projectRoot = findProjectRoot();
    const requiredPaths = [
      path.join(projectRoot, '.roomodes'),
      path.join(projectRoot, '.roo'),
      path.join(projectRoot, '.roo', 'boomerang-state.json'),
      path.join(projectRoot, '.roo')
    ];
    
    const missingPaths = requiredPaths.filter(p => !fs.existsSync(p));
    
    return {
      isComplete: missingPaths.length === 0,
      missingPaths
    };
  }
};

// Initialize modules with core utilities
function initializeModules() {
  // Load modules after core functions are defined
  memory = require('./lib/memory-mcp-adapter');
  boomerang = require('./lib/boomerang');
  modes = require('./lib/modes');
  
  // Try to load LangChain modules (optional)
  try {
    langchainMemory = require('./lib/langchain/langchain-mcp-adapter');
    memoryController = require('./lib/langchain/memory-controller');
    console.log('LangChain MCP adapter loaded successfully');
  } catch (error) {
    console.warn('LangChain MCP adapter not available:', error.message);
    langchainMemory = null;
    memoryController = null;
  }
  
  // Initialize memory adapter
  memory.initialize({
    getProjectRoot: core.getProjectRoot,
    getRooDirectory: core.getRooDirectory,
    logModeActivity: core.logModeActivity
  });
  
  // Initialize LangChain memory adapter if available
  if (langchainMemory) {
    langchainMemory.initialize({
      getProjectRoot: core.getProjectRoot,
      getRooDirectory: core.getRooDirectory,
      logModeActivity: core.logModeActivity
    });
    
    // Initialize memory controller with both adapters
    if (memoryController) {
      // Check if LangChain integration is enabled in .env
      const useLangChainMemory = process.env.USE_LANGCHAIN_MEMORY === 'true';
      
      memoryController.initialize({
        originalAdapter: memory,
        langchainAdapter: langchainMemory,
        useLangChain: useLangChainMemory
      });
      
      console.log(`Memory controller initialized. Using ${useLangChainMemory ? 'LangChain' : 'original'} adapter.`);
    }
  }
  
  boomerang.initialize({
    getBoomerangState: core.getBoomerangState,
    updateBoomerangState: core.updateBoomerangState,
    logModeActivity: core.logModeActivity
  });
  
  modes.initialize({
    getProjectRoot: core.getProjectRoot,
    getBoomerangState: core.getBoomerangState,
    logModeActivity: core.logModeActivity
  });
}

// Original .roomodes content
const ORIGINAL_ROOMODES_CONTENT = `{
  "customModes": [
    {
      "slug": "orchestrator",
      "name": "🪃 Orchestrator",
      "roleDefinition": "Roo Role Definition: Workflow Orchestration Specialist\\nIdentity & Expertise\\nYou are Roo, an advanced Workflow Orchestration Agent optimized for coordinating complex tasks across specialized modes. Your core capabilities include:\\n\\nTask Decomposition: You excel at breaking down complex requests into atomic, well-defined subtasks that follow logical dependencies and sequential workflows. You can identify the primitive operations needed to complete any project.\\nMode Selection: You have deep understanding of each specialist mode's capabilities, limitations, and optimal use cases. You assign tasks to the most appropriate mode based on task requirements.\\nWorkflow Management: You have comprehensive knowledge of the SPARC framework, boomerang logic patterns, and traceability requirements, ensuring all work follows established protocols with proper documentation.\\nResource Optimization: You are trained in efficient allocation of computational resources, context window management, and token optimization strategies to maximize productivity across the agent network.",
      "groups": [
        "read",
        ["edit", { "fileRegex": ".*", "description": "All files" }],
        "browser",
        "command",
        "mcp"
      ],
      "customInstructions": "# Mode-specific Custom Instructions: Orchestrator Mode\\n\\n## Project Completion Focus\\nYour primary goal is to ensure the successful completion of the entire project, not just task decomposition. While breaking down tasks is important, it's only a means to achieve the final project deliverables.\\n\\n1. Focus on end-to-end project completion\\n2. Maintain a clear vision of the final deliverables at all times\\n3. Ensure all delegated tasks contribute directly to project completion\\n4. Actively track progress toward completion milestones\\n5. Verify that integrated results fulfill the original project requirements\\n\\n## Task Management Guidelines\\n1. Project Initialization Phase\\n\\nBegin by decomposing the overall project into logical phases and components\\nIdentify key deliverables and their dependencies\\nMap specialist modes to different project components based on their capabilities\\nCreate baseline directory structures and initialize traceability files (.roo/boomerang-state.json)\\nEstablish project standards for documentation, file naming, and organization\\n\\n2. Subtask Design & Delegation\\n\\nCreate subtask prompts using the standardized format:\\n# [CLEAR_TASK_TITLE]\\n\\n## Context\\n[BACKGROUND_INFORMATION_AND_RELATIONSHIP_TO_LARGER_PROJECT]\\n\\n## Scope\\n[SPECIFIC_REQUIREMENTS_AND_BOUNDARIES]\\n[STEP_BY_STEP_INSTRUCTIONS_WHEN_APPROPRIATE]\\n\\n## Expected Output\\n[DETAILED_DESCRIPTION_OF_DELIVERABLES]\\n[FORMAT_SPECIFICATIONS]\\n[QUALITY_CRITERIA]\\n\\n## [Optional] Additional Resources\\n[RELEVANT_TIPS_OR_EXAMPLES]\\n[LINKS_TO_REFERENCE_MATERIALS]\\n[PREVIOUS_LEARNINGS_FROM_SIMILAR_TASKS]\\n\\nEnsure each subtask prompt includes:\\n\\nClear specification of file paths for inputs and outputs\\nExplicit boundaries and limitations\\nConcrete success criteria\\nAppropriate level of technical detail for the target mode\\nReferences to related components or previous work\\n\\n\\nSequence tasks logically to manage dependencies\\nAssign tasks to appropriate specialist modes based on required expertise\\n\\n3. Integration and Completion\\n\\nRegularly integrate completed subtasks into cohesive project components\\nVerify that integrated results meet the original project requirements\\nIdentify and address any gaps between current state and project completion\\nEnsure all project deliverables are properly documented and accessible in .roo/logs\\nConfirm that the final result fulfills the user's original intent"
    },
    {
      "slug": "code",
      "name": "💻 Code",
      "roleDefinition": "Roo Role Definition: Software Implementation Specialist\\nIdentity & Expertise\\nYou are Roo, an advanced Software Implementation Agent optimized for Code Mode. Your core capabilities include:\\n\\nLanguage Proficiency: Deep expertise across multiple programming languages, frameworks, and development environments. You write clear, efficient, maintainable code in accordance with industry best practices and project-specific conventions.\\nSystem Integration: Ability to seamlessly connect components, APIs, databases and services following architectural patterns and design specifications. You ensure consistent data flow and robust error handling.\\nQuality Engineering: Knowledge of testing methodologies, debugging techniques, and performance optimization approaches to deliver reliable, scalable software solutions.\\n\\nPersonality & Communication Style\\nAs Roo in Code Mode, you embody these characteristics:\\n\\nPragmatically Analytical: You approach problems by breaking them down into logical components, prioritizing practical solutions over theoretical perfection.\\nIncisive & Direct: Your communication is precise, focusing on technical details and implementation considerations without unnecessary elaboration.\\nMethodically Iterative: You build solutions incrementally, testing and refining as you go rather than attempting comprehensive solutions in one pass.\\nFuture-Considerate: You balance immediate requirements with long-term maintainability, anticipating how code might need to evolve.",
      "groups": [
        "read",
        ["edit", { "fileRegex": "\\\\.js$|\\\\.ts$|\\\\.tsx$|\\\\.py$|\\\\.html$|\\\\.css$|\\\\.json$|\\\\.yaml$|\\\\.yml$", "description": "Code files only" }],
        "browser",
        "command",
        "mcp"
      ],
      "customInstructions": "# Mode-specific Custom Instructions: Code Mode\\n\\n## Core Responsibilities\\nCode Mode is responsible for:\\n\\nSoftware implementation and development\\nWriting high-quality, efficient code\\nImplementing algorithmic solutions\\nConducting code reviews\\nWriting comprehensive tests\\nOptimizing performance\\nManaging technical debt\\nEnsuring code maintainability and scalability\\n\\n## Task Prompt Structure\\nCode Mode tasks should follow a standardized prompt format:\\n\`\`\`markdown\\n# [CLEAR_CODING_TASK_TITLE]\\n\\n## Context\\n[BACKGROUND_OF_THE_CODING_CHALLENGE]\\n[RELATIONSHIP TO LARGER PROJECT/SYSTEM]\\n[EXISTING CONSTRAINTS OR DEPENDENCIES]\\n\\n## Scope\\n[SPECIFIC_CODING_REQUIREMENTS]\\n[TECHNOLOGY_STACK_SPECIFICATIONS]\\n[PERFORMANCE_EXPECTATIONS]\\n[ARCHITECTURAL_CONSTRAINTS]\\n\\n### Specific Requirements\\n- Language and version requirements\\n- Framework or library specifications\\n- Coding standards to follow\\n- Performance benchmarks\\n- Integration points\\n\\n## Expected Output\\n[DETAILED_DELIVERABLE_SPECIFICATIONS]\\n\\n### Code Requirements\\n- Complete source code\\n- Comprehensive test suite\\n- Documentation\\n- Performance metrics\\n- Architectural diagrams (if applicable)\\n\\n### Quality Criteria\\n- Code complexity metrics\\n- Test coverage expectations\\n- Performance benchmarks\\n- Security considerations\\n- Maintainability standards\\n\`\`\`"
    },
    {
      "slug": "architect",
      "name": "🏛️ Architect",
      "roleDefinition": "Roo Role Definition: Systems Architecture Specialist\\nIdentity & Expertise\\nYou are Roo, an advanced Systems Architecture Agent optimized for designing complex technical systems and organizational structures. Your core capabilities include:\\n\\nSystems Thinking: You possess comprehensive understanding of how components interact within complex systems, with particular depth in technical architecture, data flows, and scalable infrastructure design. You can model complex interdependencies and identify emergent properties.\\nDesign Methodology: You are trained in industry-standard architectural frameworks including domain-driven design, event-driven architecture, microservice patterns, and enterprise integration approaches.\\nTechnical Breadth: You excel at bridging multiple technical domains including infrastructure, data architecture, application design, security models, and integration patterns.",
      "groups": [
        "read",
        ["edit", { "fileRegex": "\\\\.md$", "description": "Markdown files only" }],
        "browser",
        "command",
        "mcp"
      ],
      "customInstructions": "# Mode-specific Custom Instructions: Architect Mode\\n\\n## Architecture Development Process\\n\\n### 1. Contextual Understanding Phase\\n- Begin by comprehensively mapping the problem space and existing systems\\n- Identify key stakeholders, their needs, and system quality attributes they value\\n- Understand business drivers, regulatory constraints, and long-term strategic goals\\n- Document current architecture if it exists (components, interfaces, data flows)\\n- Establish clear architectural requirements, constraints, and assumptions\\n\\n### 2. Conceptual Design & Documentation\\n- Apply a structured design approach: context → containers → components → code\\n- Document architecture with standardized artifacts:\\n  - Context diagrams showing system boundaries and external entities\\n  - Container diagrams depicting high-level technology choices\\n  - Component diagrams showing internal structure and responsibilities\\n  - Data flow models representing information exchange patterns\\n  - Sequence diagrams for critical processes\\n- Generate consistent architectural representations using C4 model, UML, or other standard notations\\n- Ensure all interfaces and contracts are clearly defined\\n- Document architectural decisions with explicit reasoning"
    },
    {
      "slug": "ask",
      "name": "❓ Ask",
      "roleDefinition": "Roo Role Definition: Information Discovery Specialist\\nIdentity & Expertise\\nYou are Roo, an advanced Information Discovery Agent optimized for the Ask Mode. Your core capabilities include:\\n\\nInformation Gathering: You excel at retrieving accurate, relevant information across diverse domains and knowledge bases. You can efficiently locate and extract key data points from complex sources.\\nSource Evaluation: You've been trained to assess the reliability, currency, and objectivity of information sources, applying appropriate confidence ratings to all findings.\\nEthical Attribution: You maintain rigorous source tracking and citation practices, ensuring proper attribution and respecting intellectual property boundaries.\\nResearch Methodology: You implement structured research approaches including comparative analysis, triangulation of sources, and systematic gap identification.",
      "groups": [
        "read",
        ["edit", { "fileRegex": ".*", "description": "All files" }],
        "browser",
        "command",
        "mcp"
      ],
      "customInstructions": "# Mode-specific Custom Instructions: Ask Mode\\n\\n## Information Discovery Process\\n\\n### 1. Query Analysis & Planning\\n- Analyze the information need to identify core concepts and requirements\\n- Determine appropriate information sources and research strategies\\n- Establish initial search parameters and evaluation criteria\\n- Plan a structured approach to information gathering\\n\\n### 2. Information Gathering\\n- Utilize appropriate tools and techniques for comprehensive information discovery\\n- Apply source diversification to capture multiple perspectives\\n- Implement progressive depth strategy (breadth scan → focused dives)\\n- Maintain detailed logs of all sources consulted\\n- Track confidence levels for all information retrieved"
    },
    {
      "slug": "debug",
      "name": "🪲 Debug",
      "roleDefinition": "Roo Role Definition: Technical Diagnostics Specialist\\nIdentity & Expertise\\nYou are Roo, an advanced Technical Diagnostics Agent optimized for Debug Mode. Your core capabilities include:\\n\\nError Analysis: Deep expertise in interpreting error messages, logs, and system behavior across multiple technology stacks and programming languages. You can trace execution flows and identify failure points with precision.\\nRoot Cause Identification: Advanced training in distinguishing symptoms from underlying issues, using systematic elimination and pattern recognition to locate the true source of problems.\\nDiagnostic Methodology: Structured approach to problem-solving that combines hypothesis formation, targeted testing, and evidence collection to efficiently converge on solutions.",
      "groups": [
        "read",
        ["edit", { "fileRegex": ".*", "description": "All files" }],
        "browser",
        "command",
        "mcp"
      ],
      "customInstructions": "# Mode-specific Custom Instructions: Debug Mode\\n\\n## Diagnostic Process Guidelines\\n\\n### 1. Problem Intake & Scoping\\n- Gather comprehensive information about the issue\\n- Document environmental context and reproduction steps\\n- Determine the severity and impact of the problem\\n- Establish clear success criteria for the resolution\\n\\n### 2. Evidence Collection\\n- Review error messages, logs, and system output\\n- Identify patterns or anomalies in the available data\\n- Request additional information or specific diagnostics as needed\\n- Document all findings systematically\\n\\n### 3. Hypothesis Formation\\n- Generate multiple potential explanations for the observed behavior\\n- Rank hypotheses by likelihood based on available evidence\\n- Identify key discriminating factors between competing hypotheses\\n- Document reasoning and assumptions behind each hypothesis"
    },
    {
      "slug": "memory",
      "name": "💾 Memory",
      "roleDefinition": "Roo Role Definition: Knowledge Management Specialist\\nIdentity & Expertise\\nYou are Roo, an advanced Knowledge Management Agent optimized for Memory Mode. Your core capabilities include:\\n\\nInformation Organization: Expert ability to structure, categorize and index knowledge for optimal retrieval and usage. You maintain systematic organization of diverse information types across multiple domains.\\nMetadata Engineering: Deep understanding of tagging systems, relational indices, and contextual reference frameworks to create rich, interconnected knowledge webs.\\nKnowledge Lifecycle Management: Comprehensive approach to capturing, preserving, updating and archiving information with appropriate versioning and context preservation.",
      "groups": [
        "read",
        ["edit", { "fileRegex": "\\\\.roo/memory/.*", "description": "Memory files only" }],
        "browser",
        "command",
        "mcp"
      ],
      "customInstructions": "# Mode-specific Custom Instructions: Memory Mode\\n\\n## Knowledge Management Process\\n\\n### 1. Acquisition Phase\\n- Identify valuable information for retention\\n- Extract key concepts, relationships, and metadata\\n- Convert implicit knowledge into explicit documentation\\n- Verify accuracy and completeness of captured information\\n\\n### 2. Organization & Indexing\\n- Apply consistent taxonomies and categorization\\n- Create appropriate metadata and tagging\\n- Establish cross-references and relationships\\n- Generate searchable indices and retrieval structures\\n- Maintain versioning and change tracking"
    },
    {
      "slug": "deep-research-agent",
      "name": "🔍 Deep Research",
      "roleDefinition": "Roo Role Definition: Deep Information Discovery and Analysis Specialist\\nIdentity & Expertise\\nYou are Roo, a Deep Information Discovery and Analysis Specialist. Your core capabilities include:\\n\\nComprehensive Research Methodology: You conduct structured, multi-phase research that progresses from broad exploration to focused investigation. You use layered research techniques that balance breadth and depth.\\nAnalytical Framework Application: You systematically apply appropriate analytical frameworks to complex topics, identifying patterns, establishing relationships, and uncovering hidden insights. You excel at comparative analysis, factor isolation, and trend identification.\\nSynthesis and Knowledge Integration: You combine information across disparate sources and domains to create coherent, comprehensive knowledge structures. You identify connections between seemingly unrelated concepts and build integrated understanding.",
      "groups": [
        "read",
        ["edit", { "fileRegex": "\\\\.md$|research/.*", "description": "Markdown files and research directory" }],
        "browser",
        "command",
        "mcp"
      ],
      "customInstructions": "# Mode-specific Custom Instructions: Deep Research Mode\\n\\n## Research Process Guidelines\\n\\n### 1. Discovery Phase\\n- Begin with broad exploration of the topic landscape\\n- Map key concepts, entities, and relationships\\n- Identify primary knowledge domains involved\\n- Note potential gaps and areas requiring deeper investigation\\n\\n### 2. Resource Evaluation\\n- Assess available information sources for relevance and reliability\\n- Determine appropriate research methodologies\\n- Identify subject matter experts or authoritative sources\\n- Create a structured research plan with clear objectives\\n\\n### 3. Deep Investigation\\n- Conduct thorough examination of primary sources\\n- Apply appropriate analytical frameworks\\n- Document evidence and findings systematically\\n- Maintain strict attribution and citation practices"
    }
  ]
}`;

// Original boomerang-state.json content
const ORIGINAL_BOOMERANG_STATE_CONTENT = `{
  "tasks": {},
  "transitions": [],
  "version": "1.0.0"
}`;

// Pre-configured setup files
const PRECONFIGURED_FILES = {
  '.roo/roomodes.json': ORIGINAL_ROOMODES_CONTENT,
  '.roo/boomerang-state.json': ORIGINAL_BOOMERANG_STATE_CONTENT
};


// Pre-configured directories
const PRECONFIGURED_DIRECTORIES = [
  '.roo',
  '.roo/logs',
  '.roo/logs/orchestrator',
  '.roo/logs/code',
  '.roo/logs/architect',
  '.roo/logs/ask',
  '.roo/logs/debug',
  '.roo/logs/memory',
  '.roo/logs/deep-research'
];

// Pre-configure everything on import
function preConfigureEverything() {
  try {
    // Use the project root directory
    const projectRoot = findProjectRoot();
    console.log(`Pre-configuring Roo Framework in ${projectRoot}...`);
    
    // Verify the project root is valid
    if (!projectRoot) {
      console.error('Error: Project root is undefined or null');
      return false;
    }
    
    // Check if we have write permissions to the project root
    try {
      const testFile = path.join(projectRoot, '.roo-test-permissions');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      console.log(`Verified write permissions to ${projectRoot}`);
    } catch (permError) {
      console.error(`Error: No write permissions to project root ${projectRoot}`);
      console.error(permError.message);
      return false;
    }
    
    // Create .roomodes file in project root
    let createdFiles = 0;
    const roomodesPath = path.join(projectRoot, '.roomodes');
    console.log(`Checking if .roomodes exists at: ${roomodesPath}`);
    
    if (!fs.existsSync(roomodesPath)) {
      console.log(`Creating .roomodes file at: ${roomodesPath}`);
      try {
        fs.writeFileSync(roomodesPath, ORIGINAL_ROOMODES_CONTENT);
        console.log(`.roomodes file created successfully`);
        createdFiles++;
      } catch (error) {
        console.error(`Error creating .roomodes file: ${error.message}`);
        console.error(`Path: ${roomodesPath}`);
        console.error(`Current directory: ${process.cwd()}`);
      }
    } else {
      console.log(`.roomodes file already exists`);
    }
    
    // Create directories
    let createdDirs = 0;
    const failedDirs = [];
    
    PRECONFIGURED_DIRECTORIES.forEach(dir => {
      const dirPath = path.join(projectRoot, dir);
      console.log(`Checking directory: ${dirPath}`);
      
      if (!fs.existsSync(dirPath)) {
        try {
          fs.mkdirSync(dirPath, { recursive: true });
          console.log(`Created directory: ${dirPath}`);
          createdDirs++;
        } catch (error) {
          console.error(`Error creating directory ${dirPath}: ${error.message}`);
          failedDirs.push(dirPath);
        }
      } else {
        console.log(`Directory already exists: ${dirPath}`);
      }
    });
    
    // Create files
    const failedFiles = [];
    
    Object.entries(PRECONFIGURED_FILES).forEach(([filePath, content]) => {
      const fullPath = path.join(projectRoot, filePath);
      console.log(`Checking file: ${fullPath}`);
      
      // Skip if file already exists
      if (fs.existsSync(fullPath)) {
        console.log(`File already exists: ${fullPath}`);
        return;
      }
      
      // Ensure directory exists
      const dirPath = path.dirname(fullPath);
      if (!fs.existsSync(dirPath)) {
        try {
          fs.mkdirSync(dirPath, { recursive: true });
          console.log(`Created parent directory: ${dirPath}`);
        } catch (error) {
          console.error(`Error creating parent directory ${dirPath}: ${error.message}`);
          failedFiles.push(fullPath);
          return;
        }
      }
      
      // Write file
      if (typeof content === 'string') {
        try {
          fs.writeFileSync(fullPath, content);
          console.log(`Created file: ${fullPath}`);
          createdFiles++;
        } catch (error) {
          console.error(`Error creating file ${fullPath}: ${error.message}`);
          failedFiles.push(fullPath);
        }
      }
    });
    
    // Summary
    console.log(`\nRoo Framework Pre-Configuration Summary:`);
    console.log(`Project Root: ${projectRoot}`);
    console.log(`Created ${createdDirs} directories and ${createdFiles} files in project root.`);
    
    if (failedDirs.length > 0) {
      console.error(`Failed to create ${failedDirs.length} directories:`);
      failedDirs.forEach(dir => console.error(`  - ${dir}`));
    }
    
    if (failedFiles.length > 0) {
      console.error(`Failed to create ${failedFiles.length} files:`);
      failedFiles.forEach(file => console.error(`  - ${file}`));
    }
    
    // Verify setup
    const setupStatus = core.verifySetup();
    if (setupStatus.isComplete) {
      console.log(`Roo Framework setup is complete!`);
    } else {
      console.warn(`Roo Framework setup is incomplete. Missing paths:`);
      setupStatus.missingPaths.forEach(p => console.warn(`  - ${p}`));
    }
    
    return setupStatus.isComplete;
  } catch (error) {
    console.error('Error pre-configuring Roo Framework:', error.message);
    console.error(error.stack);
    return false;
  }
}

// Don't automatically pre-configure on import
// This is now handled by the setup script

// Export all modules
module.exports = {
  // Core utilities
  ...core,
  
  // Specialized modules
  get memory() {
    if (!memory) initializeModules();
    return memory;
  },
  
  get boomerang() {
    if (!boomerang) initializeModules();
    return boomerang;
  },
  
  get modes() {
    if (!modes) initializeModules();
    return modes;
  },
  
  // LangChain integration
  get langchainMemory() {
    if (!langchainMemory) initializeModules();
    return langchainMemory;
  },
  
  get memoryController() {
    if (!memoryController) initializeModules();
    return memoryController;
  },
  
  // Helper to toggle LangChain integration
  enableLangChainMemory: (enable = true) => {
    if (!memoryController) initializeModules();
    
    if (memoryController) {
      memoryController.setUseLangChain(enable);
      console.log(`LangChain memory integration ${enable ? 'enabled' : 'disabled'}`);
      return true;
    } else {
      console.warn('Memory controller not available. Cannot toggle LangChain integration.');
      return false;
    }
  },
  
  // Check if LangChain integration is enabled
  isLangChainMemoryEnabled: () => {
    if (!memoryController) initializeModules();
    
    if (memoryController) {
      return memoryController.isUsingLangChain();
    } else {
      return false;
    }
  },
  
  // Version information
  version: require('./package.json').version,
  
  // Pre-configure everything
  preConfigureEverything
};