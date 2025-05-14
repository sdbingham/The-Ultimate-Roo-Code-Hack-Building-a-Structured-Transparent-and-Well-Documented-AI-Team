/**
 * LangChain Memory Integration Example
 * 
 * This example demonstrates how to use the LangChain MCP adapter
 * for enhanced memory operations in the Roo Framework.
 */

// Import the memory controller which can switch between adapters
const memoryController = require('../lib/langchain/memory-controller');

// To use the LangChain adapter, set the environment variable:
// process.env.USE_LANGCHAIN_MEMORY = 'true';

// For this example, we'll force using the LangChain adapter
process.env.USE_LANGCHAIN_MEMORY = 'true';

// Set API keys for LangChain (replace with your actual keys)
process.env.ANTHROPIC_API_KEY = 'your-anthropic-api-key';
process.env.OPENAI_API_KEY = 'your-openai-api-key';

/**
 * Example 1: Create and retrieve a memory asset
 */
async function example1() {
  console.log('\n=== Example 1: Create and retrieve a memory asset ===\n');
  
  try {
    // Create a new memory asset
    const asset = await memoryController.createMemoryAsset({
      type: memoryController.ASSET_TYPES.RESEARCH,
      name: 'LangChain Integration Research',
      content: 'LangChain provides a standard interface for chains, a generic sequence of calls to components like LLMs, making it easy to combine these components. It includes memory components for persisting state between chain runs, making it useful for chatbots and other applications that require memory.',
      tags: ['langchain', 'memory', 'integration']
    });
    
    console.log('Created memory asset:');
    console.log(`- ID: ${asset.id}`);
    console.log(`- Name: ${asset.name}`);
    console.log(`- Type: ${asset.type}`);
    console.log(`- Tags: ${asset.tags.join(', ')}`);
    
    // Retrieve the memory asset
    const retrievedAsset = await memoryController.getMemoryAsset(asset.id);
    console.log('\nRetrieved memory asset:');
    console.log(`- Content: ${retrievedAsset.content.substring(0, 100)}...`);
    
    return asset.id;
  } catch (error) {
    console.error('Error in example 1:', error);
  }
}

/**
 * Example 2: Search memory assets
 */
async function example2(assetId) {
  console.log('\n=== Example 2: Search memory assets ===\n');
  
  try {
    // Search for memory assets
    const searchResults = await memoryController.searchMemoryAssets('langchain memory', {
      useSemanticSearch: true,
      limit: 5
    });
    
    console.log(`Found ${searchResults.length} results:`);
    searchResults.forEach((result, index) => {
      console.log(`\nResult ${index + 1}:`);
      console.log(`- ID: ${result.id}`);
      console.log(`- Name: ${result.name}`);
      console.log(`- Type: ${result.type}`);
      console.log(`- Relevance: ${result.relevance.toFixed(2)}`);
      console.log(`- Match Type: ${result.matchType}`);
      console.log(`- Preview: ${result.preview}`);
    });
  } catch (error) {
    console.error('Error in example 2:', error);
  }
}

/**
 * Example 3: Generate a summary using LangChain LLM
 */
async function example3(assetId) {
  console.log('\n=== Example 3: Generate a summary using LangChain LLM ===\n');
  
  try {
    // Generate a summary of the memory asset
    const summary = await memoryController.generateAssetSummary(assetId, {
      maxLength: 50
    });
    
    console.log('Generated summary:');
    console.log(summary);
  } catch (error) {
    console.error('Error in example 3:', error);
  }
}

/**
 * Example 4: Find related assets
 */
async function example4(assetId) {
  console.log('\n=== Example 4: Find related assets ===\n');
  
  try {
    // Find related assets
    const relatedAssets = await memoryController.findRelatedAssets(assetId, {
      limit: 3
    });
    
    console.log(`Found ${relatedAssets.length} related assets:`);
    relatedAssets.forEach((asset, index) => {
      console.log(`\nRelated Asset ${index + 1}:`);
      console.log(`- ID: ${asset.id}`);
      console.log(`- Name: ${asset.name}`);
      console.log(`- Type: ${asset.type}`);
      console.log(`- Relevance: ${asset.relevance.toFixed(2)}`);
      console.log(`- Preview: ${asset.preview}`);
    });
  } catch (error) {
    console.error('Error in example 4:', error);
  }
}

/**
 * Example 5: Compare original and LangChain adapters
 */
async function example5() {
  console.log('\n=== Example 5: Compare original and LangChain adapters ===\n');
  
  try {
    // Create an asset with the original adapter
    const originalAsset = await memoryController.withAdapter('original', async (adapter) => {
      return await adapter.createMemoryAsset({
        type: adapter.ASSET_TYPES.CONCEPT,
        name: 'Original Adapter Concept',
        content: 'This asset was created using the original memory-mcp-adapter.',
        tags: ['original', 'adapter', 'test']
      });
    });
    
    console.log('Created asset with original adapter:');
    console.log(`- ID: ${originalAsset.id}`);
    console.log(`- Name: ${originalAsset.name}`);
    
    // Create an asset with the LangChain adapter
    const langchainAsset = await memoryController.withAdapter('langchain', async (adapter) => {
      return await adapter.createMemoryAsset({
        type: adapter.ASSET_TYPES.CONCEPT,
        name: 'LangChain Adapter Concept',
        content: 'This asset was created using the LangChain memory adapter.',
        tags: ['langchain', 'adapter', 'test']
      });
    });
    
    console.log('\nCreated asset with LangChain adapter:');
    console.log(`- ID: ${langchainAsset.id}`);
    console.log(`- Name: ${langchainAsset.name}`);
    
    // Check which adapter is active
    console.log(`\nActive adapter: ${memoryController.getActiveAdapter()}`);
  } catch (error) {
    console.error('Error in example 5:', error);
  }
}

/**
 * Run all examples
 */
async function runExamples() {
  console.log('Starting LangChain Memory Integration Examples...\n');
  
  // Run example 1 and get the asset ID for use in other examples
  const assetId = await example1();
  
  // Run the remaining examples
  await example2(assetId);
  await example3(assetId);
  await example4(assetId);
  await example5();
  
  console.log('\nAll examples completed.');
}

// Run the examples
runExamples().catch(error => {
  console.error('Error running examples:', error);
});