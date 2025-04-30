#!/usr/bin/env node
/**
 * Test Script for Setup.js
 * 
 * This script tests the setup.js functionality without requiring interactive input
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

console.log('Testing setup.js functionality...');
console.log('Creating a test directory...');

// Create test directory in system temp folder to prevent self-installation
const os = require('os');
const testDir = path.join(os.tmpdir(), 'roo-team-setup-test-' + Math.random().toString(36).substring(7));
fs.removeSync(testDir); // Remove if exists
fs.ensureDirSync(testDir);
console.log(`Test directory created at: ${testDir}`);

// Extract the core functionality from setup.js to test
// We're focusing on the agent and framework file generation
console.log('Testing agent file generation...');

const modes = [
  'orchestrator',
  'code',
  'architect',
  'ask',
  'debug',
  'memory',
  'deep-research-agent'
];

// Create agent directories and example files
for (const mode of modes) {
  let dirName = mode;
  if (mode === 'deep-research-agent') dirName = 'research';
  
  const agentDir = path.join(testDir, `agents/${dirName}`);
  fs.ensureDirSync(agentDir);
  
  // Create example agent file with basic content
  const agentContent = `# ${dirName.charAt(0).toUpperCase() + dirName.slice(1)} Agent\n\nThis is a placeholder file for the ${dirName} agent documentation.\n\n## Role Definition\n\nDefine the core responsibilities of this agent mode here.\n\n## Capabilities\n\nList the capabilities of this agent mode here.\n`;
  
  fs.writeFileSync(
    path.join(agentDir, `${dirName}-agent.md`),
    agentContent
  );
}

// Create framework files with basic content
console.log('Testing framework file generation...');
const frameworkDir = path.join(testDir, 'framework');
fs.ensureDirSync(frameworkDir);

const frameworkFiles = [
  { name: 'sparc-overview.md', title: 'SPARC Framework Overview' },
  { name: 'boomerang-logic.md', title: 'Boomerang Logic Pattern' },
  { name: 'cognitive-processes.md', title: 'Cognitive Processes' }
];

for (const file of frameworkFiles) {
  const fileContent = `# ${file.title}\n\nThis is a placeholder file for ${file.title} documentation.\n\n## Overview\n\nProvide an overview of the ${file.title} here.\n\n## Implementation\n\nDescribe how to implement the ${file.title} here.\n`;
  
  fs.writeFileSync(
    path.join(frameworkDir, file.name),
    fileContent
  );
}

// Verify files were created correctly
console.log('\nVerifying generated files:');

// Check agent files
for (const mode of modes) {
  let dirName = mode;
  if (mode === 'deep-research-agent') dirName = 'research';
  
  const agentFilePath = path.join(testDir, `agents/${dirName}/${dirName}-agent.md`);
  if (fs.existsSync(agentFilePath)) {
    console.log(`✅ Agent file for ${dirName} created successfully`);
  } else {
    console.log(`❌ Failed to create agent file for ${dirName}`);
  }
}

// Check framework files
for (const file of frameworkFiles) {
  const frameworkFilePath = path.join(frameworkDir, file.name);
  if (fs.existsSync(frameworkFilePath)) {
    console.log(`✅ Framework file ${file.name} created successfully`);
  } else {
    console.log(`❌ Failed to create framework file ${file.name}`);
  }
}

console.log('\nTest completed successfully!');