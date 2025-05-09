/**
 * Memory Integration Example
 * 
 * This example demonstrates how to use the Memory Mode in the Roo Framework.
 * It shows how to create memory assets, search for them, and create relationships.
 */

const rooFramework = require('@sdbingham/roo-framework');
const memory = rooFramework.memory;

// Helper function to wait for a specified time
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Main function
async function main() {
  console.log('Memory Integration Example');
  console.log('=========================\n');

  try {
    // Step 1: Create memory assets
    console.log('Step 1: Creating memory assets...');
    
    const vectorDbAsset = await memory.createMemoryAsset({
      type: 'concept',
      name: 'Vector Databases',
      content: 'Vector databases are specialized database systems designed to store and retrieve high-dimensional vectors efficiently. They are commonly used in machine learning applications for similarity search and recommendation systems.',
      tags: ['database', 'vector', 'embeddings', 'machine learning']
    });
    
    console.log(`Created asset: ${vectorDbAsset.name} (${vectorDbAsset.id})`);
    
    // Wait a moment to ensure the asset is indexed
    await wait(1000);
    
    const weaviateAsset = await memory.createMemoryAsset({
      type: 'concept',
      name: 'Weaviate',
      content: 'Weaviate is an open-source vector database that allows you to store data objects and vector embeddings from your favorite ML-models, and scale seamlessly into billions of data objects. It offers GraphQL-based querying and RESTful APIs.',
      tags: ['database', 'vector', 'weaviate', 'graphql']
    });
    
    console.log(`Created asset: ${weaviateAsset.name} (${weaviateAsset.id})`);
    
    // Wait a moment to ensure the asset is indexed
    await wait(1000);
    
    const chromaAsset = await memory.createMemoryAsset({
      type: 'concept',
      name: 'Chroma',
      content: 'Chroma is an open-source embedding database designed for storing and retrieving embeddings and their associated metadata. It provides a simple API for adding, querying, and filtering data, making it ideal for building AI applications with embeddings.',
      tags: ['database', 'vector', 'chroma', 'embeddings']
    });
    
    console.log(`Created asset: ${chromaAsset.name} (${chromaAsset.id})`);
    
    // Wait a moment to ensure the asset is indexed
    await wait(1000);
    
    // Step 2: List all memory assets
    console.log('\nStep 2: Listing all memory assets...');
    
    const assets = await memory.listMemoryAssets();
    
    console.log(`Found ${assets.length} assets:`);
    assets.forEach(asset => {
      console.log(`- ${asset.name} (${asset.type}): ${asset.tags.join(', ')}`);
    });
    
    // Step 3: Get a specific memory asset
    console.log('\nStep 3: Getting a specific memory asset...');
    
    const asset = await memory.getMemoryAsset(weaviateAsset.id);
    
    console.log(`Retrieved asset: ${asset.name}`);
    console.log(`Content: ${asset.content.substring(0, 100)}...`);
    
    // Step 4: Search memory assets
    console.log('\nStep 4: Searching memory assets...');
    
    const searchResults = await memory.searchMemoryAssets('vector database', {
      useSemanticSearch: true
    });
    
    console.log(`Found ${searchResults.length} results for "vector database":`);
    searchResults.forEach(result => {
      console.log(`- ${result.name} (Relevance: ${result.relevance.toFixed(2)})`);
      console.log(`  Preview: ${result.preview}`);
    });
    
    // Step 5: Create relationships between assets
    console.log('\nStep 5: Creating relationships between assets...');
    
    const relationship1 = await memory.createRelationship({
      sourceId: vectorDbAsset.id,
      targetId: weaviateAsset.id,
      type: memory.RELATIONSHIP_TYPES.RELATED_TO,
      description: 'Weaviate is a type of vector database'
    });
    
    console.log(`Created relationship: ${relationship1.type} (${relationship1.id})`);
    
    const relationship2 = await memory.createRelationship({
      sourceId: vectorDbAsset.id,
      targetId: chromaAsset.id,
      type: memory.RELATIONSHIP_TYPES.RELATED_TO,
      description: 'Chroma is a type of vector database'
    });
    
    console.log(`Created relationship: ${relationship2.type} (${relationship2.id})`);
    
    // Step 6: Get relationships for an asset
    console.log('\nStep 6: Getting relationships for an asset...');
    
    const relationships = await memory.getAssetRelationships(vectorDbAsset.id, {
      direction: 'both'
    });
    
    console.log(`Found ${relationships.length} relationships for asset ${vectorDbAsset.name}:`);
    relationships.forEach(rel => {
      console.log(`- ${rel.type}: ${rel.sourceId} -> ${rel.targetId}`);
      console.log(`  Description: ${rel.description}`);
    });
    
    console.log('\nMemory Integration Example completed successfully!');
    
  } catch (error) {
    console.error('Error in Memory Integration Example:', error);
  }
}

// Run the example
main().catch(console.error);