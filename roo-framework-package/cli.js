#!/usr/bin/env node

/**
 * Roo Framework CLI
 * 
 * Command-line interface for the Roo Framework, providing easy access to
 * framework utilities and management functions.
 */

const fs = require('fs');
const path = require('path');
const rooFramework = require('./index');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

// Banner for CLI
function printBanner() {
  console.log(`
${colors.bright}${colors.blue}╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  ${colors.cyan}Roo Framework CLI${colors.blue}                                        ║
║  ${colors.dim}Structured, Transparent, and Well-Documented AI Team${colors.blue}      ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝${colors.reset}
  `);
}

// Help text
function printHelp() {
  console.log(`
${colors.bright}Usage:${colors.reset} roo-framework <command> [options]

${colors.bright}Commands:${colors.reset}

  ${colors.cyan}setup${colors.reset}              Setup the Roo Framework
  ${colors.cyan}verify${colors.reset}             Verify the Roo Framework installation
  ${colors.cyan}docker-health${colors.reset}      Check Docker container health
  ${colors.cyan}generate-env${colors.reset}       Generate .env.template file
  ${colors.cyan}memory <subcommand>${colors.reset} Memory management commands
  ${colors.cyan}boomerang <subcommand>${colors.reset} Boomerang task management commands
  ${colors.cyan}mode <subcommand>${colors.reset}  Mode management commands
  ${colors.cyan}help${colors.reset}               Show this help message
  ${colors.cyan}version${colors.reset}            Show version information

${colors.bright}Memory Subcommands:${colors.reset}

  ${colors.cyan}memory list${colors.reset}        List all memory assets
  ${colors.cyan}memory create${colors.reset}      Create a new memory asset
  ${colors.cyan}memory get <id>${colors.reset}    Get a specific memory asset
  ${colors.cyan}memory search <query>${colors.reset} Search memory assets (with semantic search)
  ${colors.cyan}memory relate <sourceId> <targetId> <type>${colors.reset} Create a relationship
  ${colors.cyan}memory relationships <id>${colors.reset} Get relationships for an asset

${colors.bright}Boomerang Subcommands:${colors.reset}

  ${colors.cyan}boomerang list${colors.reset}     List all boomerang tasks
  ${colors.cyan}boomerang create${colors.reset}   Create a new boomerang task
  ${colors.cyan}boomerang status <id>${colors.reset} Get status of a specific task
  ${colors.cyan}boomerang update <id>${colors.reset} Update a boomerang task

${colors.bright}Mode Subcommands:${colors.reset}

  ${colors.cyan}mode list${colors.reset}          List all available modes
  ${colors.cyan}mode info <slug>${colors.reset}   Show information about a specific mode

${colors.bright}Examples:${colors.reset}

  ${colors.dim}# Setup the framework in the current project${colors.reset}
  $ roo-framework setup

  ${colors.dim}# Verify the framework installation${colors.reset}
  $ roo-framework verify

  ${colors.dim}# Check Docker container health${colors.reset}
  $ roo-framework docker-health

  ${colors.dim}# Generate environment template file${colors.reset}
  $ roo-framework generate-env

  ${colors.dim}# Create a new boomerang task${colors.reset}
  $ roo-framework boomerang create
`);
}

// Version information
function printVersion() {
  const packageJson = require('./package.json');
  console.log(`${colors.bright}Roo Framework CLI${colors.reset} version ${colors.cyan}${packageJson.version}${colors.reset}`);
}

// Setup command
function runSetup() {
  console.log(`${colors.bright}Setting up Roo Framework...${colors.reset}`);
  try {
    require('./scripts/setup');
  } catch (error) {
    console.log(`${colors.red}Error: Setup script not found.${colors.reset}`);
    console.log(`${colors.yellow}Please ensure the package is installed correctly.${colors.reset}`);
  }
}

// Verify command
function runVerify() {
  console.log(`${colors.bright}Verifying Roo Framework installation...${colors.reset}`);
  try {
    require('./scripts/test-framework');
  } catch (error) {
    console.log(`${colors.yellow}Verification script not found. Using built-in verification...${colors.reset}`);
    const result = rooFramework.verifySetup();
    if (result.isComplete) {
      console.log(`${colors.green}✓ Roo framework setup is complete!${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ Roo framework setup is incomplete.${colors.reset}`);
      console.log(`Missing paths:`);
      result.missingPaths.forEach(p => console.log(`  - ${p}`));
    }
  }
}

// Docker health check command
function runDockerHealthCheck() {
  console.log(`${colors.bright}Checking Docker container health...${colors.reset}`);
  try {
    require('./scripts/docker-health-check');
  } catch (error) {
    console.log(`${colors.red}Error: Docker health check script not found.${colors.reset}`);
    console.log(`${colors.yellow}Please ensure the package is installed correctly.${colors.reset}`);
  }
}

// Generate environment template command
function runGenerateEnvTemplate() {
  console.log(`${colors.bright}Generating environment template...${colors.reset}`);
  try {
    require('./scripts/generate-env-template');
  } catch (error) {
    console.log(`${colors.red}Error: Generate environment template script not found.${colors.reset}`);
    console.log(`${colors.yellow}Please ensure the package is installed correctly.${colors.reset}`);
  }
}

// Memory management commands
function handleMemoryCommands(args) {
  const subcommand = args[0] || 'list';
  
  switch (subcommand) {
    case 'list':
      console.log(`${colors.bright}Listing memory assets...${colors.reset}`);
      listMemoryAssets();
      break;
    case 'create':
      console.log(`${colors.bright}Creating new memory asset...${colors.reset}`);
      createMemoryAsset();
      break;
    case 'get':
      const assetId = args[1];
      if (!assetId) {
        console.log(`${colors.red}Error: Asset ID is required${colors.reset}`);
        return;
      }
      console.log(`${colors.bright}Getting memory asset ${assetId}...${colors.reset}`);
      getMemoryAssetById(assetId);
      break;
    case 'search':
      const query = args[1];
      if (!query) {
        console.log(`${colors.red}Error: Search query is required${colors.reset}`);
        return;
      }
      console.log(`${colors.bright}Searching memory assets for "${query}"...${colors.reset}`);
      searchMemoryAssets(query);
      break;
    case 'relate':
      if (args.length < 4) {
        console.log(`${colors.red}Error: Source ID, target ID, and relationship type are required${colors.reset}`);
        console.log(`Usage: ${colors.cyan}roo-framework memory relate <sourceId> <targetId> <relationType>${colors.reset}`);
        return;
      }
      const sourceId = args[1];
      const targetId = args[2];
      const relationType = args[3];
      console.log(`${colors.bright}Creating relationship between ${sourceId} and ${targetId}...${colors.reset}`);
      createRelationship(sourceId, targetId, relationType);
      break;
    case 'relationships':
      const relationshipAssetId = args[1];
      if (!relationshipAssetId) {
        console.log(`${colors.red}Error: Asset ID is required${colors.reset}`);
        return;
      }
      console.log(`${colors.bright}Getting relationships for asset ${relationshipAssetId}...${colors.reset}`);
      getAssetRelationships(relationshipAssetId);
      break;
    default:
      console.log(`${colors.red}Error: Unknown memory subcommand: ${subcommand}${colors.reset}`);
      console.log(`Run ${colors.cyan}roo-framework help${colors.reset} for usage information.`);
  }
}

// Create a memory asset
function createMemoryAsset() {
  try {
    // Prompt for asset details
    console.log(`${colors.bright}Enter memory asset details:${colors.reset}`);
    console.log(`${colors.yellow}Note: This is a simplified version for demonstration.${colors.reset}`);
    
    // In a real implementation, we would prompt for user input
    // For now, we'll create a sample asset
    const assetType = 'concept';
    const assetName = 'Sample Concept';
    const assetContent = 'This is a sample concept created through the CLI.';
    const assetTags = ['sample', 'cli', 'concept'];
    
    // Create the asset using the memory adapter
    const memory = rooFramework.memory;
    const asset = memory.createMemoryAsset({
      type: assetType,
      name: assetName,
      content: assetContent,
      tags: assetTags
    });
    
    console.log(`${colors.green}✓ Memory asset created successfully!${colors.reset}`);
    console.log(`${colors.bright}ID:${colors.reset} ${asset.id}`);
    console.log(`${colors.bright}Type:${colors.reset} ${asset.type}`);
    console.log(`${colors.bright}Name:${colors.reset} ${asset.name}`);
    console.log(`${colors.bright}Created:${colors.reset} ${asset.created_at}`);
    console.log(`${colors.bright}Tags:${colors.reset} ${asset.tags.join(', ')}`);
    
  } catch (error) {
    console.log(`${colors.red}Error creating memory asset: ${error.message}${colors.reset}`);
  }
}

// Get a memory asset by ID
function getMemoryAssetById(assetId) {
  try {
    // Get the asset using the memory adapter
    const memory = rooFramework.memory;
    const asset = memory.getMemoryAsset(assetId);
    
    console.log(`${colors.bright}Memory Asset:${colors.reset}\n`);
    console.log(`${colors.bright}ID:${colors.reset} ${asset.id}`);
    console.log(`${colors.bright}Type:${colors.reset} ${asset.type}`);
    console.log(`${colors.bright}Name:${colors.reset} ${asset.name}`);
    console.log(`${colors.bright}Created:${colors.reset} ${asset.created_at}`);
    console.log(`${colors.bright}Tags:${colors.reset} ${asset.tags.join(', ')}`);
    console.log(`\n${colors.bright}Content:${colors.reset}\n`);
    console.log(asset.content);
    
  } catch (error) {
    console.log(`${colors.red}Error getting memory asset: ${error.message}${colors.reset}`);
  }
}

// Search memory assets
function searchMemoryAssets(query) {
  try {
    // Search assets using the memory adapter
    const memory = rooFramework.memory;
    const results = memory.searchMemoryAssets(query, { useSemanticSearch: true });
    
    if (results.length === 0) {
      console.log(`${colors.yellow}No matching memory assets found.${colors.reset}`);
      return;
    }
    
    console.log(`${colors.bright}Search Results:${colors.reset}\n`);
    
    results.forEach((result, index) => {
      console.log(`${colors.bright}${index + 1}. ${result.name}${colors.reset}`);
      console.log(`   ID: ${result.id}`);
      console.log(`   Type: ${result.type}`);
      console.log(`   Relevance: ${Math.round(result.relevance * 100)}%`);
      console.log(`   Match Type: ${result.matchType}`);
      console.log();
    });
    
    console.log(`${colors.cyan}Total: ${results.length} results${colors.reset}`);
    
  } catch (error) {
    console.log(`${colors.red}Error searching memory assets: ${error.message}${colors.reset}`);
  }
}

// Create a relationship between two memory assets
function createRelationship(sourceId, targetId, relationType) {
  try {
    // Create relationship using the memory adapter
    const memory = rooFramework.memory;
    
    // Validate relationship type
    const validTypes = Object.values(memory.RELATIONSHIP_TYPES);
    if (!validTypes.includes(relationType)) {
      console.log(`${colors.red}Error: Invalid relationship type: ${relationType}${colors.reset}`);
      console.log(`Valid types: ${validTypes.join(', ')}`);
      return;
    }
    
    const relationship = memory.createRelationship({
      sourceId,
      targetId,
      type: relationType,
      description: `Created via CLI on ${new Date().toISOString()}`
    });
    
    console.log(`${colors.green}✓ Relationship created successfully!${colors.reset}`);
    console.log(`${colors.bright}ID:${colors.reset} ${relationship.id}`);
    console.log(`${colors.bright}Source:${colors.reset} ${relationship.sourceId}`);
    console.log(`${colors.bright}Target:${colors.reset} ${relationship.targetId}`);
    console.log(`${colors.bright}Type:${colors.reset} ${relationship.type}`);
    console.log(`${colors.bright}Created:${colors.reset} ${relationship.created}`);
    
  } catch (error) {
    console.log(`${colors.red}Error creating relationship: ${error.message}${colors.reset}`);
  }
}

// Get relationships for a memory asset
function getAssetRelationships(assetId) {
  try {
    // Get relationships using the memory adapter
    const memory = rooFramework.memory;
    const relationships = memory.getAssetRelationships(assetId, { direction: 'both' });
    
    if (relationships.length === 0) {
      console.log(`${colors.yellow}No relationships found for asset ${assetId}.${colors.reset}`);
      return;
    }
    
    console.log(`${colors.bright}Relationships for Asset ${assetId}:${colors.reset}\n`);
    
    // Group by direction
    const outgoing = relationships.filter(r => r.sourceId === assetId);
    const incoming = relationships.filter(r => r.targetId === assetId);
    
    if (outgoing.length > 0) {
      console.log(`${colors.bright}Outgoing Relationships:${colors.reset}`);
      outgoing.forEach(rel => {
        console.log(`  → ${rel.targetId} (${rel.type})`);
      });
      console.log();
    }
    
    if (incoming.length > 0) {
      console.log(`${colors.bright}Incoming Relationships:${colors.reset}`);
      incoming.forEach(rel => {
        console.log(`  ← ${rel.sourceId} (${rel.type})`);
      });
      console.log();
    }
    
    console.log(`${colors.cyan}Total: ${relationships.length} relationships${colors.reset}`);
    
  } catch (error) {
    console.log(`${colors.red}Error getting relationships: ${error.message}${colors.reset}`);
  }
}

// List memory assets
function listMemoryAssets() {
  try {
    // List assets using the memory adapter
    const memory = rooFramework.memory;
    const assets = memory.listMemoryAssets();
    
    if (assets.length === 0) {
      console.log(`${colors.yellow}No memory assets found.${colors.reset}`);
      return;
    }
    
    console.log(`${colors.bright}Memory Assets:${colors.reset}\n`);
    
    assets.forEach(asset => {
      console.log(`${colors.bright}ID:${colors.reset} ${asset.id}`);
      console.log(`${colors.bright}Type:${colors.reset} ${asset.type}`);
      console.log(`${colors.bright}Name:${colors.reset} ${asset.name}`);
      console.log(`${colors.bright}Created:${colors.reset} ${asset.created_at}`);
      console.log(`${colors.bright}Tags:${colors.reset} ${asset.tags ? asset.tags.join(', ') : 'None'}`);
      console.log();
    });
    
    console.log(`${colors.cyan}Total: ${assets.length} assets${colors.reset}`);
    
  } catch (error) {
    console.log(`${colors.red}Error listing memory assets: ${error.message}${colors.reset}`);
  }
}

// Boomerang task management commands
function handleBoomerangCommands(args) {
  const subcommand = args[0] || 'list';
  
  switch (subcommand) {
    case 'list':
      console.log(`${colors.bright}Listing boomerang tasks...${colors.reset}`);
      listBoomerangTasks();
      break;
    case 'create':
      console.log(`${colors.bright}Creating new boomerang task...${colors.reset}`);
      console.log(`${colors.yellow}This feature is not yet implemented.${colors.reset}`);
      break;
    case 'status':
      const taskId = args[1];
      if (!taskId) {
        console.log(`${colors.red}Error: Task ID is required${colors.reset}`);
        return;
      }
      console.log(`${colors.bright}Getting status of boomerang task ${taskId}...${colors.reset}`);
      console.log(`${colors.yellow}This feature is not yet implemented.${colors.reset}`);
      break;
    case 'update':
      const updateTaskId = args[1];
      if (!updateTaskId) {
        console.log(`${colors.red}Error: Task ID is required${colors.reset}`);
        return;
      }
      console.log(`${colors.bright}Updating boomerang task ${updateTaskId}...${colors.reset}`);
      console.log(`${colors.yellow}This feature is not yet implemented.${colors.reset}`);
      break;
    default:
      console.log(`${colors.red}Error: Unknown boomerang subcommand: ${subcommand}${colors.reset}`);
      console.log(`Run ${colors.cyan}roo-framework help${colors.reset} for usage information.`);
  }
}

// List boomerang tasks
function listBoomerangTasks() {
  try {
    const boomerangState = rooFramework.getBoomerangState();
    
    if (!boomerangState.tasks || Object.keys(boomerangState.tasks).length === 0) {
      console.log(`${colors.yellow}No boomerang tasks found.${colors.reset}`);
      return;
    }
    
    console.log(`${colors.bright}Boomerang Tasks:${colors.reset}\n`);
    
    Object.entries(boomerangState.tasks).forEach(([id, task]) => {
      console.log(`${colors.bright}ID:${colors.reset} ${id}`);
      console.log(`${colors.bright}Status:${colors.reset} ${task.status || 'Unknown'}`);
      console.log(`${colors.bright}Created:${colors.reset} ${task.created || 'Unknown'}`);
      if (task.origin_mode) {
        console.log(`${colors.bright}Origin Mode:${colors.reset} ${task.origin_mode}`);
      }
      if (task.destination_mode) {
        console.log(`${colors.bright}Destination Mode:${colors.reset} ${task.destination_mode}`);
      }
      console.log();
    });
    
    console.log(`${colors.cyan}Total: ${Object.keys(boomerangState.tasks).length} tasks${colors.reset}`);
    
  } catch (error) {
    console.log(`${colors.red}Error listing boomerang tasks: ${error.message}${colors.reset}`);
  }
}

// Mode management commands
function handleModeCommands(args) {
  const subcommand = args[0] || 'list';
  
  switch (subcommand) {
    case 'list':
      console.log(`${colors.bright}Listing available modes...${colors.reset}`);
      listModes();
      break;
    case 'info':
      const modeSlug = args[1];
      if (!modeSlug) {
        console.log(`${colors.red}Error: Mode slug is required${colors.reset}`);
        return;
      }
      console.log(`${colors.bright}Getting information about mode ${modeSlug}...${colors.reset}`);
      getModeInfo(modeSlug);
      break;
    default:
      console.log(`${colors.red}Error: Unknown mode subcommand: ${subcommand}${colors.reset}`);
      console.log(`Run ${colors.cyan}roo-framework help${colors.reset} for usage information.`);
  }
}

// List available modes
function listModes() {
  try {
    const projectRoot = rooFramework.getProjectRoot();
    const roomodesPath = path.join(projectRoot, '.roomodes');
    
    if (!fs.existsSync(roomodesPath)) {
      console.log(`${colors.yellow}No modes found. .roomodes file does not exist.${colors.reset}`);
      return;
    }
    
    const roomodes = JSON.parse(fs.readFileSync(roomodesPath, 'utf8'));
    
    if (!roomodes.customModes || roomodes.customModes.length === 0) {
      console.log(`${colors.yellow}No custom modes found in .roomodes file.${colors.reset}`);
      return;
    }
    
    console.log(`${colors.bright}Available Modes:${colors.reset}\n`);
    
    roomodes.customModes.forEach(mode => {
      console.log(`${colors.bright}${mode.name || mode.slug}${colors.reset} (${colors.cyan}${mode.slug}${colors.reset})`);
    });
    
    console.log(`\n${colors.cyan}Total: ${roomodes.customModes.length} modes${colors.reset}`);
    
  } catch (error) {
    console.log(`${colors.red}Error listing modes: ${error.message}${colors.reset}`);
  }
}

// Get information about a specific mode
function getModeInfo(modeSlug) {
  try {
    const projectRoot = rooFramework.getProjectRoot();
    const roomodesPath = path.join(projectRoot, '.roomodes');
    
    if (!fs.existsSync(roomodesPath)) {
      console.log(`${colors.yellow}No modes found. .roomodes file does not exist.${colors.reset}`);
      return;
    }
    
    const roomodes = JSON.parse(fs.readFileSync(roomodesPath, 'utf8'));
    
    if (!roomodes.customModes || roomodes.customModes.length === 0) {
      console.log(`${colors.yellow}No custom modes found in .roomodes file.${colors.reset}`);
      return;
    }
    
    const mode = roomodes.customModes.find(m => m.slug === modeSlug);
    
    if (!mode) {
      console.log(`${colors.red}Error: Mode "${modeSlug}" not found.${colors.reset}`);
      return;
    }
    
    console.log(`${colors.bright}Mode Information:${colors.reset}\n`);
    console.log(`${colors.bright}Name:${colors.reset} ${mode.name || mode.slug}`);
    console.log(`${colors.bright}Slug:${colors.reset} ${mode.slug}`);
    
    if (mode.roleDefinition) {
      console.log(`\n${colors.bright}Role Definition:${colors.reset}`);
      console.log(`${colors.dim}${mode.roleDefinition.split('\n')[0]}${colors.reset}`);
    }
    
    if (mode.groups) {
      console.log(`\n${colors.bright}Permissions:${colors.reset}`);
      mode.groups.forEach(group => {
        if (typeof group === 'string') {
          console.log(`- ${group}`);
        } else if (Array.isArray(group) && group.length > 1) {
          console.log(`- ${group[0]}: ${group[1].description || 'No description'}`);
        }
      });
    }
    
    if (mode.customInstructions) {
      console.log(`\n${colors.bright}Custom Instructions:${colors.reset} ${colors.dim}(first line)${colors.reset}`);
      console.log(`${colors.dim}${mode.customInstructions.split('\n')[0]}${colors.reset}`);
    }
    
  } catch (error) {
    console.log(`${colors.red}Error getting mode information: ${error.message}${colors.reset}`);
  }
}

// Main function
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  printBanner();
  
  if (!command || command === 'help') {
    printHelp();
    return;
  }
  
  switch (command) {
      case 'version':
        printVersion();
        break;
      case 'setup':
        runSetup();
        break;
      case 'verify':
        runVerify();
        break;
      case 'docker-health':
        runDockerHealthCheck();
        break;
      case 'generate-env':
        runGenerateEnvTemplate();
        break;
      case 'memory':
        handleMemoryCommands(args.slice(1));
        break;
      case 'boomerang':
        handleBoomerangCommands(args.slice(1));
        break;
      case 'mode':
        handleModeCommands(args.slice(1));
        break;
    default:
      console.log(`${colors.red}Error: Unknown command: ${command}${colors.reset}`);
      console.log(`Run ${colors.cyan}roo-framework help${colors.reset} for usage information.`);
  }
}

// Run the CLI
main();