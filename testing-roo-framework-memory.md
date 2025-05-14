# Testing Roo Framework Memory Integration with Docker

This document provides instructions on how to verify that the Roo Framework's memory functionality is working correctly with the Docker containers.

## Prerequisites

- Docker containers are running with the updated port configuration
- Node.js is installed
- Required npm packages are installed

## Testing Steps

### 1. Create a Simple Test Script

Create a new file called `test-roo-memory.js` with the following content:

```javascript
// Import the Roo Framework
const rooFramework = require('./roo-framework-package');

// Test function
async function testMemory() {
  try {
    console.log('Testing Roo Framework Memory Integration...');
    
    // Create a memory asset
    const asset = await rooFramework.memory.createMemoryAsset({
      type: rooFramework.memory.ASSET_TYPES.CONCEPT,
      name: 'Test Concept',
      content: 'This is a test concept to verify Roo Framework memory integration.',
      tags: ['test', 'memory', 'integration']
    });
    
    console.log('Memory asset created successfully:');
    console.log(asset);
    
    // Retrieve the asset
    const retrievedAsset = await rooFramework.memory.getMemoryAsset(asset.id);
    console.log('Memory asset retrieved successfully:');
    console.log(retrievedAsset);
    
    console.log('Roo Framework Memory Integration is working correctly!');
  } catch (error) {
    console.error('Error testing Roo Framework Memory Integration:', error);
  }
}

// Run the test
testMemory();
```

### 2. Run the Test Script

Execute the test script with Node.js:

```bash
node test-roo-memory.js
```

### 3. Verify the Results

If the Roo Framework's memory integration is working correctly, you should see output similar to the following:

```
Testing Roo Framework Memory Integration...
Memory asset created successfully:
{
  id: '12345678-1234-1234-1234-123456789012',
  type: 'concept',
  name: 'Test Concept',
  content: 'This is a test concept to verify Roo Framework memory integration.',
  tags: [ 'test', 'memory', 'integration' ],
  created_at: '2025-05-14T18:30:00.000Z',
  updated_at: '2025-05-14T18:30:00.000Z'
}
Memory asset retrieved successfully:
{
  id: '12345678-1234-1234-1234-123456789012',
  type: 'concept',
  name: 'Test Concept',
  content: 'This is a test concept to verify Roo Framework memory integration.',
  tags: [ 'test', 'memory', 'integration' ],
  created_at: '2025-05-14T18:30:00.000Z',
  updated_at: '2025-05-14T18:30:00.000Z'
}
Roo Framework Memory Integration is working correctly!
```

## Additional Testing

### Testing Memory Asset Listing

To test listing memory assets, add the following to your test script:

```javascript
// List all memory assets
const assets = await rooFramework.memory.listMemoryAssets();
console.log(`Found ${assets.length} memory assets:`);
console.log(assets);
```

### Testing Memory Asset Searching

To test searching memory assets, add the following to your test script:

```javascript
// Search for memory assets
const searchResults = await rooFramework.memory.searchMemoryAssets('test');
console.log(`Found ${searchResults.length} matching memory assets:`);
console.log(searchResults);
```

### Testing Memory Asset Relationships

To test creating and retrieving relationships between memory assets, add the following to your test script:

```javascript
// Create another memory asset
const anotherAsset = await rooFramework.memory.createMemoryAsset({
  type: rooFramework.memory.ASSET_TYPES.CONCEPT,
  name: 'Related Concept',
  content: 'This concept is related to the test concept.',
  tags: ['related', 'test']
});

// Create a relationship between the assets
const relationship = await rooFramework.memory.createRelationship({
  sourceId: asset.id,
  targetId: anotherAsset.id,
  type: rooFramework.memory.RELATIONSHIP_TYPES.RELATED_TO,
  description: 'These concepts are related'
});

console.log('Relationship created successfully:');
console.log(relationship);

// Get relationships for the first asset
const relationships = await rooFramework.memory.getAssetRelationships(asset.id);
console.log(`Found ${relationships.length} relationships for the asset:`);
console.log(relationships);
```

## Troubleshooting

If you encounter errors when running the test script, check the following:

1. Ensure all Docker containers are running:
   ```bash
   npm run docker:status
   ```

2. Check the health of the Docker containers:
   ```bash
   npm run docker:health
   ```

3. Verify the port configuration in the `memory-mcp-adapter.js` file:
   ```javascript
   // Configuration - can be overridden via environment variables
   const config = {
     weaviate: {
       scheme: process.env.ROO_WEAVIATE_SCHEME || 'http',
       host: process.env.ROO_WEAVIATE_HOST || 'localhost:9081',
     },
     neo4j: {
       uri: process.env.ROO_NEO4J_URI || 'bolt://localhost:9687',
       username: process.env.ROO_NEO4J_USERNAME || 'neo4j',
       password: process.env.ROO_NEO4J_PASSWORD || 'password',
     },
     mongodb: {
       uri: process.env.ROO_MONGODB_URI || 'mongodb://root:rootpassword@localhost:29017',
       database: process.env.ROO_MONGODB_DATABASE || 'roo_memory',
     },
     chroma: {
       path: process.env.ROO_CHROMA_PATH || 'http://localhost:9001',
     }
   };
   ```

4. Check the Docker container logs for any errors:
   ```bash
   npm run docker:logs
   ```

5. Restart the Docker containers if necessary:
   ```bash
   npm run docker:restart
   ```

## Conclusion

If the test script runs successfully, it confirms that the Roo Framework's memory functionality is working correctly with the Docker containers. This means that the Memory MCP Adapter is properly configured to use the non-standard ports, and all the necessary database services are accessible.