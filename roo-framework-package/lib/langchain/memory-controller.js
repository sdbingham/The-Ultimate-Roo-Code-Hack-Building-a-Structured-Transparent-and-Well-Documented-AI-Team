/**
 * Memory Controller
 * 
 * This controller provides a unified interface to memory operations,
 * allowing seamless switching between the original memory-mcp-adapter
 * and the new LangChain-based adapter.
 */

const originalAdapter = require('../memory-mcp-adapter');
const langchainAdapter = require('./langchain-mcp-adapter');

// Feature flag to determine which adapter to use
const useLangChain = process.env.USE_LANGCHAIN_MEMORY === 'true';

// Select the appropriate adapter based on the feature flag
const activeAdapter = useLangChain ? langchainAdapter : originalAdapter;

console.log(`Memory Controller initialized with ${useLangChain ? 'LangChain' : 'original'} adapter`);

// Export all properties and methods from the active adapter
module.exports = {
  // Constants
  ASSET_TYPES: activeAdapter.ASSET_TYPES,
  RELATIONSHIP_TYPES: activeAdapter.RELATIONSHIP_TYPES,
  
  // Configuration
  config: activeAdapter.config,
  
  // Core methods
  initialize: activeAdapter.initialize,
  
  // Memory asset operations
  createMemoryAsset: activeAdapter.createMemoryAsset,
  getMemoryAsset: activeAdapter.getMemoryAsset,
  listMemoryAssets: activeAdapter.listMemoryAssets,
  searchMemoryAssets: activeAdapter.searchMemoryAssets,
  
  // Relationship operations
  createRelationship: activeAdapter.createRelationship,
  getAssetRelationships: activeAdapter.getAssetRelationships,
  
  // LangChain-specific methods (only available when using LangChain adapter)
  ...(useLangChain ? {
    generateAssetSummary: langchainAdapter.generateAssetSummary,
    findRelatedAssets: langchainAdapter.findRelatedAssets
  } : {}),
  
  // Utility method to check which adapter is active
  getActiveAdapter: () => useLangChain ? 'langchain' : 'original',
  
  // Method to force using a specific adapter for a single operation
  withAdapter: (adapterName, operation) => {
    if (adapterName === 'langchain') {
      return operation(langchainAdapter);
    } else {
      return operation(originalAdapter);
    }
  }
};