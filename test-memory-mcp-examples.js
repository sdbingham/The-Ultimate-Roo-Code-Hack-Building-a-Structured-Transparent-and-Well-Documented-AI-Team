/**
 * Memory MCP Adapter Testing Examples
 * 
 * This script provides examples of how to use the Memory MCP Adapter
 * for various operations like creating, retrieving, listing, searching,
 * and relating memory assets.
 * 
 * To run a specific example, uncomment the function call at the bottom
 * of this file.
 */

const memoryAdapter = require('./roo-framework-package/lib/memory-mcp-adapter');

// Example 1: Create a memory asset
async function createMemoryAssetExample() {
  console.log('\n=== Creating a Memory Asset ===\n');
  
  try {
    const asset = await memoryAdapter.createMemoryAsset({
      type: memoryAdapter.ASSET_TYPES.CONCEPT,
      name: 'Docker Configuration',
      content: 'Docker is a platform for developing, shipping, and running applications in containers.',
      tags: ['docker', 'container', 'devops']
    });
    
    console.log('Asset created successfully:');
    console.log(JSON.stringify(asset, null, 2));
    
    return asset;
  } catch (error) {
    console.error('Error creating memory asset:', error.message);
  }
}

// Example 2: Retrieve a memory asset by ID
async function getMemoryAssetExample(assetId) {
  console.log('\n=== Retrieving a Memory Asset ===\n');
  
  if (!assetId) {
    console.log('No asset ID provided. Creating a new asset first...');
    const asset = await createMemoryAssetExample();
    assetId = asset.id;
  }
  
  try {
    const asset = await memoryAdapter.getMemoryAsset(assetId);
    
    console.log('Asset retrieved successfully:');
    console.log(JSON.stringify(asset, null, 2));
    
    return asset;
  } catch (error) {
    console.error('Error retrieving memory asset:', error.message);
  }
}

// Example 3: List all memory assets
async function listMemoryAssetsExample() {
  console.log('\n=== Listing Memory Assets ===\n');
  
  try {
    const assets = await memoryAdapter.listMemoryAssets();
    
    console.log(`Found ${assets.length} assets:`);
    assets.forEach((asset, index) => {
      console.log(`\n--- Asset ${index + 1} ---`);
      console.log(`ID: ${asset.id}`);
      console.log(`Type: ${asset.type}`);
      console.log(`Name: ${asset.name}`);
      console.log(`Tags: ${asset.tags.join(', ')}`);
      console.log(`Created: ${asset.created_at}`);
    });
    
    return assets;
  } catch (error) {
    console.error('Error listing memory assets:', error.message);
  }
}

// Example 4: List memory assets with filters
async function listFilteredAssetsExample() {
  console.log('\n=== Listing Filtered Memory Assets ===\n');
  
  try {
    // Create a test asset if none exists
    await createMemoryAssetExample();
    
    // Filter by type
    console.log('Filtering by type: concept');
    const conceptAssets = await memoryAdapter.listMemoryAssets({
      type: memoryAdapter.ASSET_TYPES.CONCEPT
    });
    
    console.log(`Found ${conceptAssets.length} concept assets`);
    
    // Filter by tags
    console.log('\nFiltering by tags: docker');
    const dockerAssets = await memoryAdapter.listMemoryAssets({
      tags: ['docker']
    });
    
    console.log(`Found ${dockerAssets.length} docker-related assets`);
    
    return { conceptAssets, dockerAssets };
  } catch (error) {
    console.error('Error listing filtered assets:', error.message);
  }
}

// Example 5: Search memory assets
async function searchMemoryAssetsExample() {
  console.log('\n=== Searching Memory Assets ===\n');
  
  try {
    // Create a test asset if none exists
    await createMemoryAssetExample();
    
    // Search for "docker"
    console.log('Searching for "docker"');
    const results = await memoryAdapter.searchMemoryAssets('docker');
    
    console.log(`Found ${results.length} matching assets:`);
    results.forEach((result, index) => {
      console.log(`\n--- Result ${index + 1} ---`);
      console.log(`ID: ${result.id}`);
      console.log(`Type: ${result.type}`);
      console.log(`Name: ${result.name}`);
      console.log(`Relevance: ${result.relevance}`);
      console.log(`Match Type: ${result.matchType}`);
      console.log(`Preview: ${result.preview}`);
    });
    
    return results;
  } catch (error) {
    console.error('Error searching memory assets:', error.message);
  }
}

// Example 6: Create related memory assets
async function createRelatedAssetsExample() {
  console.log('\n=== Creating Related Memory Assets ===\n');
  
  try {
    // Create two related assets
    console.log('Creating first asset: Docker');
    const dockerAsset = await memoryAdapter.createMemoryAsset({
      type: memoryAdapter.ASSET_TYPES.CONCEPT,
      name: 'Docker',
      content: 'Docker is a platform for developing, shipping, and running applications in containers.',
      tags: ['docker', 'container', 'platform']
    });
    
    console.log('\nCreating second asset: Kubernetes');
    const kubernetesAsset = await memoryAdapter.createMemoryAsset({
      type: memoryAdapter.ASSET_TYPES.CONCEPT,
      name: 'Kubernetes',
      content: 'Kubernetes is an open-source container orchestration platform for automating deployment, scaling, and management of containerized applications.',
      tags: ['kubernetes', 'container', 'orchestration']
    });
    
    // Create relationship between them
    console.log('\nCreating relationship between Docker and Kubernetes');
    const relationship = await memoryAdapter.createRelationship({
      sourceId: dockerAsset.id,
      targetId: kubernetesAsset.id,
      type: memoryAdapter.RELATIONSHIP_TYPES.RELATED_TO,
      description: 'Docker containers are often orchestrated by Kubernetes'
    });
    
    console.log('Relationship created successfully:');
    console.log(JSON.stringify(relationship, null, 2));
    
    return { dockerAsset, kubernetesAsset, relationship };
  } catch (error) {
    console.error('Error creating related assets:', error.message);
  }
}

// Example 7: Get asset relationships
async function getAssetRelationshipsExample() {
  console.log('\n=== Getting Asset Relationships ===\n');
  
  try {
    // Create related assets if they don't exist
    const { dockerAsset, kubernetesAsset } = await createRelatedAssetsExample();
    
    // Get relationships for Docker asset
    console.log(`Getting relationships for Docker asset (${dockerAsset.id})`);
    const relationships = await memoryAdapter.getAssetRelationships(dockerAsset.id);
    
    console.log(`Found ${relationships.length} relationships:`);
    relationships.forEach((rel, index) => {
      console.log(`\n--- Relationship ${index + 1} ---`);
      console.log(`ID: ${rel.id}`);
      console.log(`Type: ${rel.type}`);
      console.log(`Source ID: ${rel.sourceId}`);
      console.log(`Target ID: ${rel.targetId}`);
      console.log(`Description: ${rel.description}`);
    });
    
    return relationships;
  } catch (error) {
    console.error('Error getting asset relationships:', error.message);
  }
}

// Main function to run examples
async function runExamples() {
  try {
    // Uncomment the examples you want to run
    await createMemoryAssetExample();
    await getMemoryAssetExample();
    await listMemoryAssetsExample();
    await listFilteredAssetsExample();
    await searchMemoryAssetsExample();
    await createRelatedAssetsExample();
    await getAssetRelationshipsExample();
    
    console.log('\nAll examples completed successfully!');
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Run the examples
runExamples();