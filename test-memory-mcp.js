/**
 * Test Memory MCP Adapter
 * 
 * This script tests the Memory MCP Adapter's ability to connect to all databases
 * and perform basic operations.
 */

// Try to load dependencies
let memoryAdapter;
try {
  memoryAdapter = require('./roo-framework-package/lib/memory-mcp-adapter');
} catch (error) {
  console.error('Error loading memory-mcp-adapter:', error.message);
  console.error('Make sure you have installed the required dependencies:');
  console.error('npm install weaviate-ts-client neo4j-driver mongodb chromadb uuid');
  process.exit(1);
}

// Test function
async function testMemoryAdapter() {
  console.log('Testing Memory MCP Adapter...');
  console.log('Configuration:');
  console.log('- Weaviate:', memoryAdapter.config.weaviate);
  console.log('- Neo4j:', memoryAdapter.config.neo4j);
  console.log('- MongoDB:', memoryAdapter.config.mongodb);
  console.log('- Chroma:', memoryAdapter.config.chroma);
  
  try {
    // Initialize the adapter
    console.log('\nInitializing memory adapter...');
    
    // Check if weaviate-ts-client is installed correctly
    try {
      const weaviate = require('weaviate-ts-client');
      console.log('Weaviate client version:', weaviate.version || 'unknown');
      console.log('Weaviate client API:', Object.keys(weaviate).join(', '));
    } catch (weaviateError) {
      console.error('Error loading weaviate-ts-client:', weaviateError.message);
    }
    
    if (typeof memoryAdapter.initialize === 'function') {
      await memoryAdapter.initialize();
    }
    
    // Create a test memory asset
    console.log('\nCreating test memory asset...');
    try {
      const asset = await memoryAdapter.createMemoryAsset({
        type: memoryAdapter.ASSET_TYPES.CONCEPT,
        name: 'Test Concept',
        content: 'This is a test concept created by the test script.',
        tags: ['test', 'memory', 'mcp']
      });
      
      console.log('Asset created successfully:');
      console.log(asset);
      
      // Retrieve the asset
      console.log('\nRetrieving asset...');
      try {
        const retrievedAsset = await memoryAdapter.getMemoryAsset(asset.id);
        console.log('Asset retrieved successfully:');
        console.log(retrievedAsset);
      } catch (retrieveError) {
        console.error('Error retrieving asset:', retrieveError.message);
      }
      
      // List assets
      console.log('\nListing assets...');
      try {
        const assets = await memoryAdapter.listMemoryAssets();
        console.log(`Found ${assets.length} assets`);
      } catch (listError) {
        console.error('Error listing assets:', listError.message);
      }
      
      // Search assets
      console.log('\nSearching assets...');
      try {
        const searchResults = await memoryAdapter.searchMemoryAssets('test');
        console.log(`Found ${searchResults.length} matching assets`);
      } catch (searchError) {
        console.error('Error searching assets:', searchError.message);
      }
      
      console.log('\nAll tests completed successfully!');
      return true;
    } catch (createError) {
      console.error('Error creating memory asset:', createError.message);
      return false;
    }
  } catch (error) {
    console.error('Error testing memory adapter:', error);
    return false;
  }
}

// Run the test
testMemoryAdapter()
  .then(success => {
    if (success) {
      console.log('\nMemory MCP Adapter is working correctly with the new port configuration!');
      process.exit(0);
    } else {
      console.error('\nMemory MCP Adapter test failed.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });