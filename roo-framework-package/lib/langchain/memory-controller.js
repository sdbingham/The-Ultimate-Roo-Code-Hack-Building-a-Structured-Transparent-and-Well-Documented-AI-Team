/**
 * Memory Controller
 * 
 * This controller provides a unified interface to memory operations,
 * allowing seamless switching between the original memory-mcp-adapter
 * and the new LangChain-based adapter.
 */

// Import adapters
const originalAdapter = require('../memory-mcp-adapter');
let langchainAdapter;

try {
  langchainAdapter = require('./langchain-mcp-adapter');
} catch (error) {
  console.warn('LangChain adapter not available:', error.message);
  langchainAdapter = null;
}

// Configuration state
let useLangChain = process.env.USE_LANGCHAIN_MEMORY === 'true';
let isInitialized = false;
let coreUtils = null;

/**
 * Initialize the memory controller
 * @param {Object} options - Initialization options
 * @param {Object} options.originalAdapter - Original memory adapter
 * @param {Object} options.langchainAdapter - LangChain memory adapter
 * @param {boolean} options.useLangChain - Whether to use LangChain adapter
 */
function initialize(options = {}) {
  if (options.originalAdapter) {
    Object.assign(originalAdapter, options.originalAdapter);
  }
  
  if (options.langchainAdapter) {
    langchainAdapter = options.langchainAdapter;
  }
  
  if (options.useLangChain !== undefined) {
    useLangChain = options.useLangChain;
  }
  
  if (options.coreUtils) {
    coreUtils = options.coreUtils;
  }
  
  isInitialized = true;
  console.log(`Memory Controller initialized with ${useLangChain ? 'LangChain' : 'original'} adapter`);
}

/**
 * Get the active adapter based on current configuration
 * @returns {Object} The active adapter
 */
function getActiveAdapter() {
  // If LangChain is enabled and available, use it
  if (useLangChain && langchainAdapter) {
    return langchainAdapter;
  }
  
  // Otherwise, fall back to the original adapter
  return originalAdapter;
}

/**
 * Set whether to use LangChain adapter
 * @param {boolean} enable - Whether to enable LangChain
 */
function setUseLangChain(enable) {
  useLangChain = enable;
  console.log(`Memory Controller now using ${useLangChain ? 'LangChain' : 'original'} adapter`);
}

/**
 * Check if LangChain adapter is being used
 * @returns {boolean} Whether LangChain adapter is active
 */
function isUsingLangChain() {
  return useLangChain && langchainAdapter !== null;
}

/**
 * Execute a function with a specific adapter
 * @param {string} adapterName - Adapter to use ('langchain' or 'original')
 * @param {Function} operation - Function to execute with the adapter
 * @returns {*} Result of the operation
 */
function withAdapter(adapterName, operation) {
  if (adapterName === 'langchain' && langchainAdapter) {
    return operation(langchainAdapter);
  } else {
    return operation(originalAdapter);
  }
}

// Create a proxy to dynamically forward method calls to the active adapter
const memoryController = new Proxy({
  // Explicitly defined methods
  initialize,
  getActiveAdapter: () => useLangChain && langchainAdapter ? 'langchain' : 'original',
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
  // Proxy handler to forward method calls to the active adapter
  get(target, prop, receiver) {
    // If the property exists on the controller, return it
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    }
    
    // Otherwise, forward to the active adapter
    const adapter = getActiveAdapter();
    
    if (typeof adapter[prop] === 'function') {
      return function(...args) {
        return adapter[prop](...args);
      };
    } else {
      return adapter[prop];
    }
  }
});

module.exports = memoryController;