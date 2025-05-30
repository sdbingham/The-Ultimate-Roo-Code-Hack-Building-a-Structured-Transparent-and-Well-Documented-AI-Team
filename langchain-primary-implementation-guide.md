# LangChain as Primary Memory Adapter Implementation Guide

This guide provides step-by-step instructions for making LangChain the primary memory management system in the Roo Framework while keeping the original `memory-mcp-adapter.js` as a fallback mechanism.

## 1. Install Required Dependencies

First, ensure all LangChain-related dependencies are installed:

```bash
npm install langchain @langchain/community @langchain/openai @langchain/anthropic
```

## 2. Update Memory Controller

Modify `roo-framework-package/lib/langchain/memory-controller.js` to change the default behavior:

```javascript
// FROM:
// let useLangChain = process.env.USE_LANGCHAIN_MEMORY === 'true';

// TO:
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
```

## 3. Implement Automatic Fallback

Replace the proxy handler in the memory controller with the enhanced version that includes automatic fallback:

```javascript
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
            console.error(`Memory operation failed: ${prop}`, error);
            throw error;
          }
          
          console.warn(`LangChain adapter operation failed (${prop}): ${error.message}`);
          console.warn('Falling back to original adapter');
          
          // Track fallback occurrences
          if (coreUtils && coreUtils.logModeActivity) {
            coreUtils.logModeActivity(
              'memory',
              `Fallback to original adapter for ${prop}: ${error.message}`
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
```

## 4. Update Environment Configuration

1. Modify `.env.template` and related environment setup files to add:

```
# Memory adapter configuration
# Set to 'true' to use the original memory adapter instead of LangChain
# USE_ORIGINAL_MEMORY=false

# LangChain API keys (at least one required for full functionality)
# ANTHROPIC_API_KEY=your-anthropic-api-key
# OPENAI_API_KEY=your-openai-api-key
```

2. Update `setup.js` to prompt for LangChain API keys during installation:

```javascript
// Add to roo-framework-package/scripts/setup.js
async function promptForLangChainKeys() {
  const anthropicKey = await promptForInput('Anthropic API Key (optional): ');
  const openAIKey = await promptForInput('OpenAI API Key (optional): ');
  
  // If at least one key is provided, update env file
  if (anthropicKey || openAIKey) {
    if (anthropicKey) {
      addToEnvFile('ANTHROPIC_API_KEY', anthropicKey);
    }
    if (openAIKey) {
      addToEnvFile('OPENAI_API_KEY', openAIKey);
    }
    console.log('LangChain API keys configured successfully');
  } else {
    console.log('No LangChain API keys provided. Some advanced memory features will be limited.');
    addToEnvFile('USE_ORIGINAL_MEMORY', 'true');
  }
}
```

## 5. Enable the LangChain Adapter's Commented Code

In `langchain-mcp-adapter.js`, uncomment and implement the LangChain-specific functionality:

1. Uncomment the LangChain imports
2. Uncomment the LLM initialization code
3. Uncomment the embedding model code
4. Uncomment the vector store integration code

## 6. Add Monitoring and Logging

Implement monitoring to track usage patterns and fallback frequency:

```javascript
// Add to roo-framework-package/lib/monitoring/memory-monitoring.js
const memoryMetrics = {
  langchainOperations: 0,
  originalOperations: 0,
  fallbackOccurrences: 0,
  methodFallbacks: {}
};

function recordAdapterOperation(adapter, method, success) {
  if (adapter === 'langchain') {
    memoryMetrics.langchainOperations++;
  } else {
    memoryMetrics.originalOperations++;
  }
  
  if (adapter === 'langchain' && !success) {
    memoryMetrics.fallbackOccurrences++;
    memoryMetrics.methodFallbacks[method] = (memoryMetrics.methodFallbacks[method] || 0) + 1;
  }
}

function getMemoryAdapterMetrics() {
  return {
    ...memoryMetrics,
    totalOperations: memoryMetrics.langchainOperations + memoryMetrics.originalOperations,
    fallbackPercentage: memoryMetrics.fallbackOccurrences / memoryMetrics.langchainOperations * 100
  };
}
```

## 7. Update Documentation

1. Update README.md to reflect the new architecture
2. Create a LangChain configuration guide
3. Document the fallback behavior
4. Update memory-related APIs documentation

## 8. Testing

Test the implementation with the following scenarios:

1. With valid LangChain API keys:
   - Verify all memory operations work correctly
   - Confirm LangChain is the default adapter

2. Without API keys:
   - Verify fallback to original adapter works
   - Test all memory operations still function

3. With `USE_ORIGINAL_MEMORY=true`:
   - Confirm original adapter is used regardless of API key availability

## Implementation Order

1. First implement the basic memory controller changes
2. Test core functionality with both adapters
3. Add the automatic fallback mechanism
4. Implement monitoring
5. Update documentation

This approach ensures the system remains functional throughout the transition while gradually enhancing its capabilities.