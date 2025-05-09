#!/usr/bin/env node

/**
 * Roo Framework Memory Health Check Script
 * 
 * This script performs a comprehensive health check of the Memory Mode setup
 * and provides recommendations for optimizing Memory Mode usage.
 */

const fs = require('fs');
const path = require('path');
const rooFramework = require('../index');
const memoryAutomation = require('../lib/automation/memory-automation');

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

// Banner for script
function printBanner() {
  console.log(`
${colors.bright}${colors.blue}╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  ${colors.cyan}Roo Framework Memory Health Check${colors.blue}                     ║
║  ${colors.dim}Optimize Memory Mode Usage${colors.blue}                           ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝${colors.reset}
  `);
}

// Initialize memory automation
function initializeMemoryAutomation() {
  memoryAutomation.initialize({
    getProjectRoot: rooFramework.getProjectRoot,
    getRooDirectory: rooFramework.getRooDirectory,
    logModeActivity: rooFramework.logModeActivity,
    getBoomerangState: rooFramework.getBoomerangState,
    updateBoomerangState: rooFramework.updateBoomerangState
  });
}

// Check memory infrastructure
function checkMemoryInfrastructure() {
  console.log(`\n${colors.bright}Checking Memory Infrastructure...${colors.reset}`);
  
  try {
    const result = memoryAutomation.verifyMemoryInfrastructure();
    
    if (result.verified) {
      console.log(`${colors.green}✓ Memory infrastructure is properly set up.${colors.reset}`);
    } else {
      if (result.fixed) {
        console.log(`${colors.yellow}⚠ Memory infrastructure had issues but they were fixed.${colors.reset}`);
        
        if (result.missingDirs && result.missingDirs.length > 0) {
          console.log(`${colors.dim}Created missing directories:${colors.reset}`);
          result.missingDirs.forEach(dir => console.log(`  - ${dir}`));
        }
        
        if (result.missingFiles && result.missingFiles.length > 0) {
          console.log(`${colors.dim}Created missing files:${colors.reset}`);
          result.missingFiles.forEach(file => console.log(`  - ${file}`));
        }
      } else {
        console.log(`${colors.red}✗ Memory infrastructure has issues that could not be fixed.${colors.reset}`);
        
        if (result.error) {
          console.log(`${colors.red}Error: ${result.error}${colors.reset}`);
        }
      }
    }
  } catch (error) {
    console.log(`${colors.red}✗ Error checking memory infrastructure: ${error.message}${colors.reset}`);
  }
}

// Check memory assets
function checkMemoryAssets() {
  console.log(`\n${colors.bright}Checking Memory Assets...${colors.reset}`);
  
  try {
    const memory = rooFramework.memory;
    const assets = memory.listMemoryAssets();
    
    if (assets.length === 0) {
      console.log(`${colors.yellow}⚠ No memory assets found. Memory Mode is not being utilized.${colors.reset}`);
      console.log(`${colors.dim}Recommendation: Start capturing knowledge using Memory Mode.${colors.reset}`);
    } else {
      console.log(`${colors.green}✓ Found ${assets.length} memory assets.${colors.reset}`);
      
      // Group assets by type
      const assetsByType = {};
      assets.forEach(asset => {
        if (!assetsByType[asset.type]) {
          assetsByType[asset.type] = [];
        }
        assetsByType[asset.type].push(asset);
      });
      
      // Display asset distribution
      console.log(`${colors.dim}Asset distribution:${colors.reset}`);
      Object.entries(assetsByType).forEach(([type, typeAssets]) => {
        console.log(`  - ${type}: ${typeAssets.length} assets`);
      });
      
      // Check for recent activity
      const now = new Date();
      const recentAssets = assets.filter(asset => {
        const createdDate = new Date(asset.created);
        return now - createdDate <= 30 * 24 * 60 * 60 * 1000; // 30 days
      });
      
      if (recentAssets.length === 0) {
        console.log(`${colors.yellow}⚠ No recent memory activity in the last 30 days.${colors.reset}`);
        console.log(`${colors.dim}Recommendation: Regularly capture knowledge to keep memory up to date.${colors.reset}`);
      } else {
        console.log(`${colors.green}✓ Found ${recentAssets.length} assets created in the last 30 days.${colors.reset}`);
      }
    }
  } catch (error) {
    console.log(`${colors.red}✗ Error checking memory assets: ${error.message}${colors.reset}`);
  }
}

// Check memory relationships
function checkMemoryRelationships() {
  console.log(`\n${colors.bright}Checking Memory Relationships...${colors.reset}`);
  
  try {
    const projectRoot = rooFramework.getProjectRoot();
    const indexPath = path.join(projectRoot, '.roo', 'memory', 'indices', 'main-index.json');
    
    if (!fs.existsSync(indexPath)) {
      console.log(`${colors.yellow}⚠ Memory index not found.${colors.reset}`);
      return;
    }
    
    const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    
    if (!index.relationships || index.relationships.length === 0) {
      console.log(`${colors.yellow}⚠ No memory relationships found. Knowledge graph is not being utilized.${colors.reset}`);
      console.log(`${colors.dim}Recommendation: Create relationships between related memory assets to build a knowledge graph.${colors.reset}`);
    } else {
      console.log(`${colors.green}✓ Found ${index.relationships.length} memory relationships.${colors.reset}`);
      
      // Group relationships by type
      const relationshipsByType = {};
      index.relationships.forEach(rel => {
        if (!relationshipsByType[rel.type]) {
          relationshipsByType[rel.type] = [];
        }
        relationshipsByType[rel.type].push(rel);
      });
      
      // Display relationship distribution
      console.log(`${colors.dim}Relationship distribution:${colors.reset}`);
      Object.entries(relationshipsByType).forEach(([type, rels]) => {
        console.log(`  - ${type}: ${rels.length} relationships`);
      });
    }
  } catch (error) {
    console.log(`${colors.red}✗ Error checking memory relationships: ${error.message}${colors.reset}`);
  }
}

// Check boomerang integration
function checkBoomerangIntegration() {
  console.log(`\n${colors.bright}Checking Boomerang Integration...${colors.reset}`);
  
  try {
    const boomerangState = rooFramework.getBoomerangState();
    
    if (!boomerangState.tasks || Object.keys(boomerangState.tasks).length === 0) {
      console.log(`${colors.yellow}⚠ No boomerang tasks found.${colors.reset}`);
      console.log(`${colors.dim}Recommendation: Use boomerang tasks to coordinate between modes.${colors.reset}`);
      return;
    }
    
    // Check for memory-related tasks
    const memoryTasks = Object.values(boomerangState.tasks).filter(task => 
      task.destination_mode === 'memory' || 
      task.origin_mode === 'memory' ||
      (task.task_id && task.task_id.startsWith('memory-'))
    );
    
    if (memoryTasks.length === 0) {
      console.log(`${colors.yellow}⚠ No memory-related boomerang tasks found. Memory Mode is not integrated with other modes.${colors.reset}`);
      console.log(`${colors.dim}Recommendation: Use the Memory Integration Framework to coordinate between Memory Mode and other modes.${colors.reset}`);
    } else {
      console.log(`${colors.green}✓ Found ${memoryTasks.length} memory-related boomerang tasks.${colors.reset}`);
      
      // Group tasks by status
      const tasksByStatus = {};
      memoryTasks.forEach(task => {
        const status = task.status || 'unknown';
        if (!tasksByStatus[status]) {
          tasksByStatus[status] = [];
        }
        tasksByStatus[status].push(task);
      });
      
      // Display task distribution
      console.log(`${colors.dim}Task status distribution:${colors.reset}`);
      Object.entries(tasksByStatus).forEach(([status, tasks]) => {
        console.log(`  - ${status}: ${tasks.length} tasks`);
      });
    }
  } catch (error) {
    console.log(`${colors.red}✗ Error checking boomerang integration: ${error.message}${colors.reset}`);
  }
}

// Check orchestrator integration
function checkOrchestratorIntegration() {
  console.log(`\n${colors.bright}Checking Orchestrator Integration...${colors.reset}`);
  
  try {
    const projectRoot = rooFramework.getProjectRoot();
    const roomodesPath = path.join(projectRoot, '.roomodes');
    
    if (!fs.existsSync(roomodesPath)) {
      console.log(`${colors.yellow}⚠ .roomodes file not found.${colors.reset}`);
      return;
    }
    
    const roomodes = JSON.parse(fs.readFileSync(roomodesPath, 'utf8'));
    
    if (!roomodes.customModes || roomodes.customModes.length === 0) {
      console.log(`${colors.yellow}⚠ No custom modes found in .roomodes file.${colors.reset}`);
      return;
    }
    
    // Find orchestrator mode
    const orchestratorMode = roomodes.customModes.find(mode => mode.slug === 'orchestrator');
    
    if (!orchestratorMode) {
      console.log(`${colors.yellow}⚠ Orchestrator mode not found in .roomodes file.${colors.reset}`);
      return;
    }
    
    // Check if orchestrator mode has memory integration
    if (!orchestratorMode.customInstructions || 
        !orchestratorMode.customInstructions.includes('Memory Integration Framework')) {
      console.log(`${colors.yellow}⚠ Orchestrator mode does not have Memory Integration Framework in custom instructions.${colors.reset}`);
      console.log(`${colors.dim}Recommendation: Update Orchestrator mode custom instructions to include Memory Integration Framework.${colors.reset}`);
      console.log(`${colors.dim}See orchestrator-memory-integration.md for details.${colors.reset}`);
    } else {
      console.log(`${colors.green}✓ Orchestrator mode has Memory Integration Framework in custom instructions.${colors.reset}`);
    }
  } catch (error) {
    console.log(`${colors.red}✗ Error checking orchestrator integration: ${error.message}${colors.reset}`);
  }
}

// Provide recommendations
function provideRecommendations() {
  console.log(`\n${colors.bright}${colors.cyan}Recommendations for Optimizing Memory Mode Usage:${colors.reset}\n`);
  
  console.log(`${colors.bright}1. Update Orchestrator Mode Custom Instructions${colors.reset}`);
  console.log(`   Ensure Orchestrator mode includes the Memory Integration Framework.`);
  console.log(`   See orchestrator-memory-integration.md for details.\n`);
  
  console.log(`${colors.bright}2. Implement Knowledge Capture Workflows${colors.reset}`);
  console.log(`   After completing significant project milestones, delegate knowledge preservation tasks to Memory mode.`);
  console.log(`   Example: Use memoryAutomation.createMemoryPreservationTask() to create memory tasks.\n`);
  
  console.log(`${colors.bright}3. Implement Cross-Mode Memory Integration${colors.reset}`);
  console.log(`   Ensure all specialist modes contribute to and leverage the collective knowledge base:`);
  console.log(`   - Research → Memory: Preserve research findings, sources, and insights`);
  console.log(`   - Architect → Memory: Document architectural decisions with rationales`);
  console.log(`   - Code → Memory: Record implementation patterns and technical decisions`);
  console.log(`   - Debug → Memory: Catalog problem patterns and solution strategies`);
  console.log(`   - Ask → Memory: Store user intent clarifications and domain knowledge\n`);
  
  console.log(`${colors.bright}4. Implement Knowledge Retrieval Orchestration${colors.reset}`);
  console.log(`   Before initiating new tasks, query Memory mode for relevant existing knowledge.`);
  console.log(`   Example: Use memoryAutomation.queryKnowledge() to search for relevant knowledge.\n`);
  
  console.log(`${colors.bright}5. Regularly Verify Memory Infrastructure${colors.reset}`);
  console.log(`   Run this health check script regularly to ensure Memory Mode is properly utilized.`);
  console.log(`   Example: Add a scheduled task to run this script weekly.\n`);
}

// Main function
function main() {
  printBanner();
  
  // Initialize memory automation
  initializeMemoryAutomation();
  
  // Run checks
  checkMemoryInfrastructure();
  checkMemoryAssets();
  checkMemoryRelationships();
  checkBoomerangIntegration();
  checkOrchestratorIntegration();
  
  // Provide recommendations
  provideRecommendations();
}

// Run the script
main();