/**
 * Memory Controller Patch
 * 
 * This patch updates the memory controller to use LangChain as the primary adapter
 * with the original memory-mcp-adapter as a fallback mechanism.
 */

// Path to the memory controller
const FILE_PATH = './roo-framework-package/lib/langchain/memory-controller.js';

// Changes to implement:

// 1. Update the default adapter selection logic
//    FROM: let useLangChain = process.env.USE_LANGCHAIN_MEMORY === 'true';
//    TO:   let useLangChain = process.env.USE_ORIGINAL_MEMORY !== 'true';

// 2. Add availability tracking for the LangChain adapter
const AVAILABILITY_TRACKING = `
// Track LangChain availability
let langchainAvailable = false;

try {
  langchainAdapter = require('./langchain-mcp-adapter');
  
  // Check for required API keys
  const hasApiKeys = 
    langchainAdapter.config?.langchain?.apiKey?.anthropic || 
    langchainAdapter.config?.langchain?.apiKey?.openai;
  
  if (hasApiKeys) {
    langchainAvailable = true;
    console.log('LangChain adapter available with API keys');
  } else {
    console.warn('LangChain adapter loaded but no API keys found');
    langchainAvailable = false;
  }
} catch (error) {
  console.warn('LangChain adapter not available:', error.message);
  langchainAdapter = null;
  langchainAvailable = false;
}

// Configuration state - Default to LangChain when available
let useLangChain = process.env.USE_ORIGINAL_MEMORY !== 'true' && langchainAvailable;
`;

// 3. Enhanced adapter selection method that considers availability
const ENHANCED_GET_ACTIVE_ADAPTER = `
/**
 * Get the active adapter based on current configuration
 * @returns {Object} The active adapter
 */
function getActiveAdapter() {
  // If LangChain is enabled and available, use it
  if (useLangChain && langchainAdapter && langchainAvailable) {
    return langchainAdapter;
  }
  
  // Otherwise, fall back to the original adapter
  return originalAdapter;
}
`;

// 4. Improved proxy handler with automated fallback mechanism
const IMPROVED_PROXY_HANDLER = `
// Create a proxy to dynamically forward method calls to the active adapter
const memoryController = new Proxy({
  // Explicitly defined methods
  initialize,
  getActiveAdapter: () => useLangChain && langchainAdapter && langchainAvailable ? 'langchain' : 'original',
  withAdapter,
  setUseLangChain,
  isUsingLangChain,
  
  // Constants (always available from both adapters)
  get ASSET_TYPES() {
    return getActiveAdapter().ASSET_TYPES;
  },
  
  get RELATIONSHIP_TYPES() {
    return getActiveAdapter().RELATIONSHIP_TYPES;
  },
  
  get config() {
    return getActiveAdapter().config;
  }
}, {
  // Enhanced proxy handler with automatic fallback
  get(target, prop, receiver) {
    // If the property exists on the controller, return it
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    }
    
    // Get preferred and fallback adapters
    const preferredAdapter = (useLangChain && langchainAdapter && langchainAvailable) 
      ? langchainAdapter 
      : originalAdapter;
    const fallbackAdapter = originalAdapter;
    
    if (typeof preferredAdapter[prop] === 'function') {
      return async function(...args) {
        try {
          // Try with the preferred adapter first
          return await preferredAdapter[prop](...args);
        } catch (error) {
          // If we're already using the fallback, just propagate the error
          if (preferredAdapter === fallbackAdapter) {
            console.error(\`Memory operation failed: \${prop}\`, error);
            throw error;
          }
          
          console.warn(\`LangChain adapter operation failed (\${prop}): \${error.message}\`);
          console.warn('Falling back to original adapter');
          
          // Track fallback occurrences
          if (coreUtils && coreUtils.logModeActivity) {
            coreUtils.logModeActivity(
              'memory',
              \`Fallback to original adapter for \${prop}: \${error.message}\`
            );
          }
          
          // Fall back to the original adapter
          return fallbackAdapter[prop](...args);
        }
      };
    } else {
      return preferredAdapter[prop];
    }
  }
});
`;

// 5. Update environment variable documentation for .env file
const ENV_FILE_ADDITIONS = `
# Memory adapter configuration
# Set to 'true' to use the original memory adapter instead of LangChain
# USE_ORIGINAL_MEMORY=false

# LangChain API keys (at least one required for full functionality)
# ANTHROPIC_API_KEY=your-anthropic-api-key
# OPENAI_API_KEY=your-openai-api-key
`;

// Application steps:
// 1. Replace useLangChain initialization logic
// 2. Add enhanced getActiveAdapter function 
// 3. Update proxy handler with fallback logic
// 4. Add .env template additions
// 5. Update startup log to show which adapter is active