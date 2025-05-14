/**
 * Test Roo Framework Memory Integration
 * 
 * This script tests the Roo Framework's memory functionality
 * to confirm that it's working with the Docker containers.
 */

// Import the Roo Framework
const rooFramework = require('./roo-framework-package');

// Test function
async function testMemory() {
  try {
    console.log('Testing Roo Framework Memory Integration...');
    
    // Create a memory asset
    console.log('\n1. Creating a memory asset...');
    const asset = await rooFramework.memory.createMemoryAsset({
      type: rooFramework.memory.ASSET_TYPES.CONCEPT,
      name: 'Test Concept',
      content: 'This is a test concept to verify Roo Framework memory integration.',
      tags: ['test', 'memory', 'integration']
    });
    
    console.log('Memory asset created successfully:');
    console.log(JSON.stringify(asset, null, 2));
    
    // Retrieve the asset
    console.log('\n2. Retrieving the asset...');
    const retrievedAsset = await rooFramework.memory.getMemoryAsset(asset.id);
    
    console.log('Memory asset retrieved successfully:');
    console.log(JSON.stringify(retrievedAsset, null, 2));
    
    // List all memory assets
    console.log('\n3. Listing all memory assets...');
    const assets = await rooFramework.memory.listMemoryAssets();
    
    console.log(`Found ${assets.length} memory assets.`);
    
    // Search for memory assets
    console.log('\n4. Searching for memory assets...');
    const searchResults = await rooFramework.memory.searchMemoryAssets('test');
    
    console.log(`Found ${searchResults.length} matching memory assets.`);
    
    console.log('\nRoo Framework Memory Integration is working correctly!');
    return true;
  } catch (error) {
    console.error('Error testing Roo Framework Memory Integration:', error);
    return false;
  }
}

// Run the test
testMemory()
  .then(success => {
    if (success) {
      console.log('\n✅ All tests passed! The Roo Framework Memory Integration is working correctly.');
    } else {
      console.error('\n❌ Tests failed. Please check the error messages above.');
    }
  })
  .catch(error => {
    console.error('Unhandled error:', error);
  });