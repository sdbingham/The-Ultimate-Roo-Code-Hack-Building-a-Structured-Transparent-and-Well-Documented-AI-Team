/**
 * Test Script for Memory Mode Transition Fix
 * 
 * This script tests the Memory mode transition fix by:
 * 1. Starting in Orchestrator mode
 * 2. Transitioning to Memory mode for a knowledge preservation task
 * 3. Completing the task in Memory mode
 * 4. Verifying that it automatically transitions back to Orchestrator mode
 */

const { RooFramework } = require('./roo-framework-package');

// Initialize the Roo Framework
const roo = require('./roo-framework-package');

// Start in Orchestrator mode
console.log('Starting in Orchestrator mode...');
roo.modes.setMode('orchestrator');

// Define a test knowledge item
const testKnowledge = {
  id: 'test-knowledge-item',
  type: 'concept',
  content: 'This is a test knowledge item for verifying the Memory mode transition fix.',
  metadata: {
    domain: 'testing',
    tags: ['memory', 'transition', 'fix', 'test']
  }
};

// Function to transition to Memory mode
async function transitionToMemoryMode() {
  console.log('Transitioning to Memory mode...');
  
  // Record the originating mode
  const originatingMode = roo.modes.getCurrentMode();
  console.log(`Originating mode: ${originatingMode}`);
  
  // Transition to Memory mode
  await roo.modes.setMode('memory', {
    task: 'Preserve test knowledge item',
    originatingMode: originatingMode,
    knowledge: testKnowledge
  });
  
  // Simulate completing the task in Memory mode
  console.log('Completing task in Memory mode...');
  setTimeout(completeMemoryTask, 2000);
}

// Function to complete the task in Memory mode
async function completeMemoryTask() {
  console.log('Task completed in Memory mode.');
  console.log('Checking if automatic transition back to originating mode occurs...');
  
  // Wait for the automatic transition
  setTimeout(checkTransition, 2000);
}

// Function to check if transition back to originating mode occurred
function checkTransition() {
  const currentMode = roo.modes.getCurrentMode();
  console.log(`Current mode: ${currentMode}`);
  
  if (currentMode === 'orchestrator') {
    console.log('SUCCESS: Memory mode correctly transitioned back to Orchestrator mode.');
  } else {
    console.log('FAILURE: Memory mode did not transition back to Orchestrator mode.');
  }
  
  // Clean up
  process.exit(0);
}

// Start the test
transitionToMemoryMode();