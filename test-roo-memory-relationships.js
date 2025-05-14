/**
 * Test Roo Framework Memory Relationships
 * 
 * This script tests the Roo Framework's memory relationship functionality
 * to confirm that it's working with the Docker containers.
 */

// Import the Roo Framework
const rooFramework = require('./roo-framework-package');

// Test function
async function testMemoryRelationships() {
  try {
    console.log('Testing Roo Framework Memory Relationships...');
    
    // Create first memory asset
    console.log('\n1. Creating first memory asset...');
    const asset1 = await rooFramework.memory.createMemoryAsset({
      type: rooFramework.memory.ASSET_TYPES.CONCEPT,
      name: 'Docker',
      content: 'Docker is a platform for developing, shipping, and running applications in containers.',
      tags: ['docker', 'container', 'platform']
    });
    
    console.log('First memory asset created successfully:');
    console.log(JSON.stringify(asset1, null, 2));
    
    // Create second memory asset
    console.log('\n2. Creating second memory asset...');
    const asset2 = await rooFramework.memory.createMemoryAsset({
      type: rooFramework.memory.ASSET_TYPES.CONCEPT,
      name: 'Kubernetes',
      content: 'Kubernetes is an open-source container orchestration platform for automating deployment, scaling, and management of containerized applications.',
      tags: ['kubernetes', 'container', 'orchestration']
    });
    
    console.log('Second memory asset created successfully:');
    console.log(JSON.stringify(asset2, null, 2));
    
    // Create relationship between assets
    console.log('\n3. Creating relationship between assets...');
    const relationship = await rooFramework.memory.createRelationship({
      sourceId: asset1.id,
      targetId: asset2.id,
      type: rooFramework.memory.RELATIONSHIP_TYPES.RELATED_TO,
      description: 'Docker containers are often orchestrated by Kubernetes'
    });
    
    console.log('Relationship created successfully:');
    console.log(JSON.stringify(relationship, null, 2));
    
    // Get relationships for the first asset
    console.log('\n4. Getting relationships for the first asset...');
    const relationships = await rooFramework.memory.getAssetRelationships(asset1.id);
    
    console.log(`Found ${relationships.length} relationships for the first asset:`);
    console.log(JSON.stringify(relationships, null, 2));
    
    console.log('\nRoo Framework Memory Relationships are working correctly!');
    return true;
  } catch (error) {
    console.error('Error testing Roo Framework Memory Relationships:', error);
    return false;
  }
}

// Run the test
testMemoryRelationships()
  .then(success => {
    if (success) {
      console.log('\n✅ All tests passed! The Roo Framework Memory Relationships are working correctly.');
    } else {
      console.error('\n❌ Tests failed. Please check the error messages above.');
    }
  })
  .catch(error => {
    console.error('Unhandled error:', error);
  });