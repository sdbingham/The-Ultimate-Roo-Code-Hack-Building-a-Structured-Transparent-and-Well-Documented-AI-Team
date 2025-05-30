/**
 * LangChain MCP Adapter
 * 
 * This adapter provides integration between the Roo Framework Memory Mode
 * and LangChain, enabling advanced memory capabilities through LangChain's
 * components while maintaining compatibility with existing database systems.
 */

// Import LangChain components (these would need to be added as dependencies)
// const { OpenAI } = require('langchain/llms/openai');
// const { ChatAnthropic } = require('langchain/chat_models/anthropic');
// const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
// const { WeaviateStore } = require('langchain/vectorstores/weaviate');
// const { MongoDBAtlasVectorSearch } = require('langchain/vectorstores/mongodb_atlas');
// const { Neo4jGraph } = require('langchain/graphs/neo4j_graph');
// const { ChromaStore } = require('langchain/vectorstores/chroma');

// Import existing database clients for compatibility
const weaviate = require('weaviate-ts-client');
const neo4j = require('neo4j-driver');
const { MongoClient } = require('mongodb');
const { ChromaClient } = require('chromadb');
const { v4: uuidv4 } = require('uuid');

// Configuration - can be overridden via environment variables
const config = {
  // LangChain-specific configuration
  langchain: {
    llmProvider: process.env.ROO_LANGCHAIN_LLM_PROVIDER || 'anthropic', // 'openai', 'anthropic', etc.
    // Use the same provider for embeddings as for LLM by default
    embeddingProvider: process.env.ROO_LANGCHAIN_EMBEDDING_PROVIDER || process.env.ROO_LANGCHAIN_LLM_PROVIDER || 'openai',
    apiKey: {
      anthropic: process.env.ANTHROPIC_API_KEY,
      openai: process.env.OPENAI_API_KEY
    },
    models: {
      llm: process.env.ROO_LANGCHAIN_LLM_MODEL || 'claude-3-sonnet-20250219',
      embedding: process.env.ROO_LANGCHAIN_EMBEDDING_MODEL || 'text-embedding-ada-002'
    }
  },
  
  // Database configurations (same as memory-mcp-adapter.js for compatibility)
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

// Asset types (same as memory-mcp-adapter.js for compatibility)
const ASSET_TYPES = {
  CONCEPT: 'concept',
  DECISION: 'decision',
  PATTERN: 'pattern',
  PROCESS: 'process',
  RESEARCH: 'research',
  REQUIREMENT: 'requirement',
  SOLUTION: 'solution'
};

// Relationship types (same as memory-mcp-adapter.js for compatibility)
const RELATIONSHIP_TYPES = {
  RELATED_TO: 'related_to',
  DEPENDS_ON: 'depends_on',
  IMPLEMENTS: 'implements',
  EXTENDS: 'extends',
  REFERENCES: 'references',
  SUPERSEDES: 'supersedes',
  CONTRADICTS: 'contradicts',
  DERIVED_FROM: 'derived_from'
};

// Client instances
let llmModel;
let embeddingModel;
let weaviateClient;
let weaviateVectorStore;
let neo4jDriver;
let neo4jGraph;
let mongoClient;
let mongoVectorStore;
let chromaClient;
let chromaVectorStore;

/**
 * Initialize LangChain and database clients
 * @returns {Promise<boolean>} Success status
 */
async function initializeClients() {
  try {
    console.log("Initializing LangChain MCP adapter...");
    
    // Initialize LLM based on configuration
    // if (config.langchain.llmProvider === 'anthropic') {
    //   llmModel = new ChatAnthropic({
    //     apiKey: config.langchain.apiKey.anthropic,
    //     model: config.langchain.models.llm
    //   });
    // } else {
    //   // Default to OpenAI
    //   llmModel = new OpenAI({
    //     apiKey: config.langchain.apiKey.openai,
    //     model: config.langchain.models.llm
    //   });
    // }
    
    // Initialize embeddings
    // embeddingModel = new OpenAIEmbeddings({
    //   apiKey: config.langchain.apiKey.openai,
    //   model: config.langchain.models.embedding
    // });
    
    // Initialize Weaviate client (same as memory-mcp-adapter.js)
    try {
      if (typeof weaviate.client === 'function') {
        weaviateClient = weaviate.client({
          scheme: config.weaviate.scheme,
          host: config.weaviate.host,
        });
      } else if (typeof weaviate.Client === 'function') {
        weaviateClient = new weaviate.Client({
          scheme: config.weaviate.scheme,
          host: config.weaviate.host,
        });
      } else {
        try {
          weaviateClient = weaviate({
            scheme: config.weaviate.scheme,
            host: config.weaviate.host,
          });
        } catch (error) {
          console.error("Weaviate client API not found. Check weaviate-ts-client version.");
          console.error(error.message);
          weaviateClient = null;
        }
      }
    } catch (error) {
      console.error("Error initializing Weaviate client:", error.message);
      weaviateClient = null;
    }
    
    // Initialize Weaviate vector store with LangChain
    // weaviateVectorStore = await WeaviateStore.fromExistingIndex(embeddingModel, {
    //   client: weaviateClient,
    //   indexName: 'MemoryAsset',
    //   textKey: 'content'
    // });
    
    // Initialize Neo4j driver
    try {
      neo4jDriver = neo4j.driver(
        config.neo4j.uri,
        neo4j.auth.basic(config.neo4j.username, config.neo4j.password)
      );
      console.log("Neo4j driver initialized successfully");
    } catch (error) {
      console.error("Error initializing Neo4j driver:", error.message);
      neo4jDriver = null;
    }
    
    // Initialize Neo4j graph with LangChain
    // neo4jGraph = new Neo4jGraph({
    //   driver: neo4jDriver,
    //   database: 'neo4j'
    // });
    
    // Initialize MongoDB client
    try {
      mongoClient = new MongoClient(config.mongodb.uri);
      await mongoClient.connect();
      console.log("MongoDB client initialized successfully");
    } catch (error) {
      console.error("Error initializing MongoDB client:", error.message);
      mongoClient = null;
    }
    
    // Initialize MongoDB vector store with LangChain
    // const mongoDb = mongoClient.db(config.mongodb.database);
    // mongoVectorStore = new MongoDBAtlasVectorSearch(embeddingModel, {
    //   collection: mongoDb.collection('memory_assets'),
    //   indexName: 'vector_index',
    //   textKey: 'content'
    // });
    
    // Initialize Chroma client
    try {
      chromaClient = new ChromaClient({ path: config.chroma.path });
      console.log("Chroma client initialized successfully");
    } catch (error) {
      console.error("Error initializing Chroma client:", error.message);
      chromaClient = null;
    }
    
    // Initialize Chroma vector store with LangChain
    // const chromaCollection = await chromaClient.getOrCreateCollection({
    //   name: 'memory_assets'
    // });
    // chromaVectorStore = new ChromaStore(embeddingModel, {
    //   collection: chromaCollection
    // });
    
    // Ensure schemas and collections exist if clients are available
    if (weaviateClient || neo4jDriver || mongoClient || chromaClient) {
      await ensureSchemas();
    } else {
      console.warn("No database clients available. Skipping schema initialization.");
    }
    
    console.log("LangChain MCP adapter initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing LangChain MCP clients:", error);
    return false;
  }
}

/**
 * Ensure schemas and collections exist
 * @returns {Promise<boolean>} Success status
 */
async function ensureSchemas() {
  try {
    // Ensure Weaviate schema (if available)
    if (weaviateClient) {
      try {
        const schemaExists = await weaviateClient.schema.exists('MemoryAsset');
        if (!schemaExists) {
          await weaviateClient.schema.classCreator()
            .withClass({
              class: 'MemoryAsset',
              properties: [
                { name: 'type', dataType: ['string'] },
                { name: 'name', dataType: ['string'] },
                { name: 'content', dataType: ['text'] },
                { name: 'tags', dataType: ['string[]'] },
                { name: 'created_at', dataType: ['date'] },
                { name: 'updated_at', dataType: ['date'] },
                { name: 'embedding', dataType: ['vector'] }
              ],
            })
            .do();
          console.log("Created Weaviate schema for MemoryAsset");
        }
      } catch (error) {
        console.error("Error ensuring Weaviate schema:", error.message);
      }
    }
    
    // Ensure Neo4j constraints (if available)
    if (neo4jDriver) {
      try {
        const neo4jSession = neo4jDriver.session();
        try {
          await neo4jSession.run(`
            CREATE CONSTRAINT memory_asset_id IF NOT EXISTS
            FOR (a:MemoryAsset) REQUIRE a.id IS UNIQUE
          `);
          console.log("Created Neo4j constraint for MemoryAsset");
        } finally {
          await neo4jSession.close();
        }
      } catch (error) {
        console.error("Error ensuring Neo4j constraints:", error.message);
      }
    }
    
    // Ensure MongoDB collections (if available)
    if (mongoClient) {
      try {
        const db = mongoClient.db(config.mongodb.database);
        const mongoCollections = await db.listCollections().toArray();
        if (!mongoCollections.find(c => c.name === 'memory_assets')) {
          await db.createCollection('memory_assets');
          await db.collection('memory_assets').createIndex({ id: 1 }, { unique: true });
          console.log("Created MongoDB collection for memory_assets");
        }
        
        // Create text index for search
        try {
          await db.collection('memory_assets').createIndex({ content: 'text', name: 'text' });
          console.log("Created text index on memory_assets collection");
        } catch (indexError) {
          console.warn("Error creating text index:", indexError.message);
        }
      } catch (error) {
        console.error("Error ensuring MongoDB collections:", error.message);
      }
    }
    
    // Create vector index for MongoDB Atlas Vector Search (if using LangChain)
    // try {
    //   await db.collection('memory_assets').createIndex(
    //     { vector_embedding: "vector" },
    //     {
    //       name: "vector_index",
    //       dimensions: 1536, // OpenAI embedding dimensions
    //       vectorSearchOptions: { similarity: "cosine" }
    //     }
    //   );
    //   console.log("Created vector index on memory_assets collection");
    // } catch (indexError) {
    //   console.warn("Error creating vector index:", indexError.message);
    // }
    
    // Ensure Chroma collection (if available)
    if (chromaClient) {
      try {
        const chromaCollections = await chromaClient.listCollections();
        if (!chromaCollections.find(c => c.name === 'memory_assets')) {
          await chromaClient.createCollection({
            name: 'memory_assets',
          });
          console.log("Created Chroma collection for memory_assets");
        }
      } catch (chromaError) {
        console.warn("Error with Chroma collections:", chromaError.message);
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error ensuring schemas:", error);
    return false;
  }
}

/**
 * Create a new memory asset using LangChain
 * 
 * @param {Object} assetData - Asset data
 * @param {string} assetData.type - Asset type (concept, decision, etc.)
 * @param {string} assetData.name - Asset name
 * @param {string} assetData.content - Asset content
 * @param {string[]} [assetData.tags] - Asset tags
 * @returns {Promise<Object>} Created asset
 */
async function createMemoryAsset(assetData) {
  try {
    // Initialize clients if needed
    if (!weaviateClient && !neo4jDriver && !mongoClient && !chromaClient) {
      await initializeClients();
    }
    
    const assetId = uuidv4();
    const now = new Date().toISOString();
    
    // Generate embeddings using LangChain (commented out until dependencies are added)
    // const embedding = await embeddingModel.embedQuery(assetData.content);
    
    // For now, use a mock embedding
    const mockEmbedding = Array(1536).fill(0).map(() => Math.random());
    
    // Create asset in Weaviate (if available)
    if (weaviateClient) {
      try {
        await weaviateClient.data.creator()
          .withClassName('MemoryAsset')
          .withId(assetId)
          .withProperties({
            type: assetData.type,
            name: assetData.name,
            content: assetData.content,
            tags: assetData.tags || [],
            created_at: now,
            updated_at: now,
            embedding: mockEmbedding // Would use real embedding in production
          })
          .do();
        console.log(`Asset created in Weaviate: ${assetId}`);
      } catch (error) {
        console.warn(`Error creating asset in Weaviate: ${error.message}`);
        // Continue with other databases
      }
    } else {
      console.warn("Weaviate client not available, skipping Weaviate storage");
    }
    
    // Create asset in MongoDB for backup (if available)
    if (mongoClient) {
      try {
        const db = mongoClient.db(config.mongodb.database);
        await db.collection('memory_assets').insertOne({
          id: assetId,
          type: assetData.type,
          name: assetData.name,
          content: assetData.content,
          tags: assetData.tags || [],
          created_at: now,
          updated_at: now,
          vector_embedding: mockEmbedding // Would use real embedding in production
        });
        console.log(`Asset created in MongoDB: ${assetId}`);
      } catch (error) {
        console.warn(`Error creating asset in MongoDB: ${error.message}`);
        // Continue with other databases
      }
    } else {
      console.warn("MongoDB client not available, skipping MongoDB storage");
    }
    
    // Create node in Neo4j (if available)
    if (neo4jDriver) {
      try {
        const neo4jSession = neo4jDriver.session();
        try {
          await neo4jSession.run(`
            CREATE (a:MemoryAsset {
              id: $id,
              type: $type,
              name: $name,
              created_at: $created_at
            })
            RETURN a
          `, {
            id: assetId,
            type: assetData.type,
            name: assetData.name,
            created_at: now
          });
          console.log(`Asset created in Neo4j: ${assetId}`);
        } finally {
          await neo4jSession.close();
        }
      } catch (error) {
        console.warn(`Error creating asset in Neo4j: ${error.message}`);
        // Continue with other databases
      }
    } else {
      console.warn("Neo4j driver not available, skipping Neo4j storage");
    }
    
    // Add to Chroma for vector search (if available)
    if (chromaClient) {
      try {
        const chromaCollection = await chromaClient.getCollection({
          name: 'memory_assets',
        });
        
        await chromaCollection.add({
          ids: [assetId],
          embeddings: [mockEmbedding], // Would use real embedding in production
          metadatas: [{
            id: assetId,
            type: assetData.type,
            name: assetData.name,
            tags: assetData.tags ? assetData.tags.join(',') : ''
          }],
          documents: [assetData.content]
        });
        console.log(`Asset created in Chroma: ${assetId}`);
      } catch (chromaError) {
        console.warn("Error adding to Chroma:", chromaError.message);
        // Continue without Chroma
      }
    } else {
      console.warn("Chroma client not available, skipping Chroma storage");
    }
    
    return {
      id: assetId,
      type: assetData.type,
      name: assetData.name,
      content: assetData.content,
      tags: assetData.tags || [],
      created_at: now,
      updated_at: now
    };
  } catch (error) {
    console.error("Error creating memory asset with LangChain:", error);
    throw error;
  }
}

/**
 * Get a memory asset by ID
 * 
 * @param {string} id - Asset ID
 * @returns {Promise<Object>} Memory asset
 */
async function getMemoryAsset(id) {
  try {
    // Initialize clients if needed
    if (!weaviateClient && !neo4jDriver && !mongoClient && !chromaClient) {
      await initializeClients();
    }
    
    // Try to get from Weaviate first
    if (weaviateClient) {
      try {
        const result = await weaviateClient.data.getterById()
          .withClassName('MemoryAsset')
          .withId(id)
          .do();
        
        if (result.properties) {
          return {
            id: id,
            type: result.properties.type,
            name: result.properties.name,
            content: result.properties.content,
            tags: result.properties.tags || [],
            created_at: result.properties.created_at,
            updated_at: result.properties.updated_at
          };
        }
      } catch (weaviateError) {
        console.warn("Weaviate lookup failed, falling back to MongoDB:", weaviateError.message);
      }
    } else {
      console.warn("Weaviate client not available, falling back to MongoDB");
    }
    
    // Fall back to MongoDB
    if (mongoClient) {
      try {
        const db = mongoClient.db(config.mongodb.database);
        const asset = await db.collection('memory_assets').findOne({ id });
        
        if (asset) {
          return {
            id: asset.id,
            type: asset.type,
            name: asset.name,
            content: asset.content,
            tags: asset.tags || [],
            created_at: asset.created_at,
            updated_at: asset.updated_at
          };
        }
      } catch (mongoError) {
        console.warn("MongoDB lookup failed:", mongoError.message);
      }
    } else {
      console.warn("MongoDB client not available");
    }
    
    // If we get here, we couldn't find the asset in any database
    throw new Error(`Asset with ID ${id} not found in any available database`);
  } catch (error) {
    console.error("Error getting memory asset:", error);
    throw error;
  }
}

/**
 * Search memory assets using LangChain's semantic search capabilities
 * 
 * @param {string} query - Search query
 * @param {Object} [options] - Search options
 * @param {boolean} [options.useSemanticSearch=true] - Use semantic search
 * @param {string} [options.type] - Filter by asset type
 * @param {string[]} [options.tags] - Filter by tags
 * @param {number} [options.limit] - Maximum number of results
 * @returns {Promise<Object[]>} Search results
 */
async function searchMemoryAssets(query, options = {}) {
  try {
    // Initialize clients if needed
    if (!weaviateClient && !neo4jDriver && !mongoClient && !chromaClient) {
      await initializeClients();
    }
    
    let shouldUseSemanticSearch = options.useSemanticSearch !== false;
    
    if (shouldUseSemanticSearch && chromaClient) {
      try {
        // In a full implementation, we would use LangChain's vector stores:
        // const results = await weaviateVectorStore.similaritySearch(query, options.limit || 10);
        
        // For now, use Chroma directly (same as memory-mcp-adapter.js)
        const chromaCollection = await chromaClient.getCollection({
          name: 'memory_assets',
        });
        
        // Build filter if needed
        let filter = {};
        if (options.type) {
          filter.type = options.type;
        }
        
        // Generate query embedding (would use LangChain in production)
        const mockEmbedding = Array(384).fill(0).map(() => Math.random());
        
        const results = await chromaCollection.query({
          queryEmbeddings: [mockEmbedding],
          nResults: options.limit || 10,
          filter: filter
        });
        
        // Format results
        const formattedResults = [];
        for (let i = 0; i < results.ids[0].length; i++) {
          const id = results.ids[0][i];
          const metadata = results.metadatas[0][i];
          const document = results.documents[0][i];
          const distance = results.distances[0][i];
          
          formattedResults.push({
            id,
            type: metadata.type,
            name: metadata.name,
            tags: metadata.tags ? metadata.tags.split(',') : [],
            relevance: 1 - distance, // Convert distance to relevance score
            matchType: 'semantic',
            preview: document.substring(0, 100) + '...'
          });
        }
        
        return formattedResults;
      } catch (error) {
        console.warn("Error with semantic search:", error.message);
        // Fall back to MongoDB search
        shouldUseSemanticSearch = false;
      }
    } else if (shouldUseSemanticSearch) {
      console.warn("Chroma client not available, falling back to keyword search");
      shouldUseSemanticSearch = false;
    }
    
    // Use MongoDB for keyword search if semantic search is disabled or failed
    if (!shouldUseSemanticSearch && mongoClient) {
      try {
        const db = mongoClient.db(config.mongodb.database);
        
        // Build query
        const mongoQuery = {
          $text: { $search: query }
        };
        
        if (options.type) {
          mongoQuery.type = options.type;
        }
        
        if (options.tags && options.tags.length > 0) {
          mongoQuery.tags = { $in: options.tags };
        }
        
        // Execute query
        const results = await db.collection('memory_assets')
          .find(mongoQuery)
          .project({
            score: { $meta: 'textScore' },
            id: 1,
            type: 1,
            name: 1,
            tags: 1,
            content: 1
          })
          .sort({ score: { $meta: 'textScore' } })
          .limit(options.limit || 10)
          .toArray();
        
        // Format results
        return results.map(result => ({
          id: result.id,
          type: result.type,
          name: result.name,
          tags: result.tags || [],
          relevance: result.score,
          matchType: 'keyword',
          preview: result.content.substring(0, 100) + '...'
        }));
      } catch (error) {
        console.warn("Error with MongoDB search:", error.message);
      }
    } else if (!shouldUseSemanticSearch) {
      console.warn("MongoDB client not available, cannot perform search");
    }
    
    // If we get here, both search methods failed or were unavailable
    console.warn("No search methods available, returning empty results");
    return [];
  } catch (error) {
    console.error("Error searching memory assets:", error);
    throw error;
  }
}

/**
 * Generate a summary of a memory asset using LangChain LLM
 * 
 * @param {string} assetId - Asset ID
 * @param {Object} [options] - Options
 * @param {number} [options.maxLength=100] - Maximum summary length
 * @returns {Promise<string>} Generated summary
 */
async function generateAssetSummary(assetId, options = {}) {
  try {
    // Initialize clients if needed
    if (!weaviateClient && !neo4jDriver && !mongoClient && !chromaClient) {
      await initializeClients();
    }
    
    // Get the asset
    let asset;
    try {
      asset = await getMemoryAsset(assetId);
    } catch (error) {
      console.error(`Error getting asset ${assetId}:`, error.message);
      return `Unable to generate summary: Asset not found`;
    }
    
    // Check if we have an LLM model available
    if (!config.langchain.apiKey.anthropic && !config.langchain.apiKey.openai) {
      console.warn("No LLM API keys available, returning mock summary");
      return `This is a mock summary of the ${asset.type} "${asset.name}" generated by LangChain. In a real implementation, this would be generated by an LLM like Claude or GPT.`;
    }
    
    // In a full implementation, we would use LangChain's LLM:
    // const prompt = `Summarize the following ${asset.type} in ${options.maxLength || 100} words or less:\n\n${asset.content}`;
    // const summary = await llmModel.predict(prompt);
    // return summary.trim();
    
    // For now, return a mock summary with API key info
    return `This is a mock summary of the ${asset.type} "${asset.name}" generated by LangChain using ${config.langchain.apiKey.anthropic ? 'Claude' : 'OpenAI'} API. In a real implementation, this would be generated by an LLM.`;
  } catch (error) {
    console.error("Error generating asset summary:", error);
    throw error;
  }
}

/**
 * Find related assets using LangChain's similarity search
 * 
 * @param {string} assetId - Asset ID
 * @param {Object} [options] - Options
 * @param {number} [options.limit=5] - Maximum number of related assets
 * @param {string} [options.type] - Filter by asset type
 * @returns {Promise<Object[]>} Related assets
 */
async function findRelatedAssets(assetId, options = {}) {
  try {
    // Initialize clients if needed
    if (!weaviateClient && !neo4jDriver && !mongoClient && !chromaClient) {
      await initializeClients();
    }
    
    // Get the asset
    let asset;
    try {
      asset = await getMemoryAsset(assetId);
    } catch (error) {
      console.error(`Error getting asset ${assetId}:`, error.message);
      return [];
    }
    
    // In a full implementation, we would use LangChain's vector stores:
    // const results = await weaviateVectorStore.similaritySearch(asset.content, options.limit || 5);
    
    // For now, use a simplified approach with Chroma
    if (chromaClient) {
      try {
        const chromaCollection = await chromaClient.getCollection({
          name: 'memory_assets',
        });
        
        // Build filter if needed
        let filter = {};
        if (options.type) {
          filter.type = options.type;
        }
        
        // Generate query embedding (would use LangChain in production)
        const mockEmbedding = Array(384).fill(0).map(() => Math.random());
        
        const results = await chromaCollection.query({
          queryEmbeddings: [mockEmbedding],
          nResults: (options.limit || 5) + 1, // +1 because we'll filter out the original asset
          filter: filter
        });
        
        // Format results and filter out the original asset
        const formattedResults = [];
        for (let i = 0; i < results.ids[0].length; i++) {
          const id = results.ids[0][i];
          
          // Skip the original asset
          if (id === assetId) continue;
          
          const metadata = results.metadatas[0][i];
          const document = results.documents[0][i];
          const distance = results.distances[0][i];
          
          formattedResults.push({
            id,
            type: metadata.type,
            name: metadata.name,
            tags: metadata.tags ? metadata.tags.split(',') : [],
            relevance: 1 - distance, // Convert distance to relevance score
            preview: document.substring(0, 100) + '...'
          });
        }
        
        return formattedResults;
      } catch (error) {
        console.warn("Error finding related assets with Chroma:", error.message);
      }
    } else {
      console.warn("Chroma client not available, cannot find related assets");
    }
    
    // If Chroma is not available or fails, try a simple keyword-based approach with MongoDB
    if (mongoClient) {
      try {
        const db = mongoClient.db(config.mongodb.database);
        
        // Extract keywords from the asset content
        const keywords = asset.content.split(/\s+/).filter(word => word.length > 5).slice(0, 5);
        
        if (keywords.length === 0) {
          return [];
        }
        
        // Build query
        const mongoQuery = {
          $text: { $search: keywords.join(' ') },
          id: { $ne: assetId } // Exclude the original asset
        };
        
        if (options.type) {
          mongoQuery.type = options.type;
        }
        
        // Execute query
        const results = await db.collection('memory_assets')
          .find(mongoQuery)
          .project({
            score: { $meta: 'textScore' },
            id: 1,
            type: 1,
            name: 1,
            tags: 1,
            content: 1
          })
          .sort({ score: { $meta: 'textScore' } })
          .limit(options.limit || 5)
          .toArray();
        
        // Format results
        return results.map(result => ({
          id: result.id,
          type: result.type,
          name: result.name,
          tags: result.tags || [],
          relevance: result.score,
          preview: result.content.substring(0, 100) + '...'
        }));
      } catch (error) {
        console.warn("Error finding related assets with MongoDB:", error.message);
      }
    } else {
      console.warn("MongoDB client not available, cannot find related assets");
    }
    
    // If we get here, all methods failed or were unavailable
    return [];
  } catch (error) {
    console.error("Error finding related assets:", error);
    throw error;
  }
}

// Initialize function for core utilities
function initialize(coreUtils) {
  // Store core utilities if needed
  console.log("Initializing LangChain MCP adapter");
  initializeClients().then(success => {
    if (success) {
      console.log("LangChain MCP adapter initialized successfully");
    } else {
      console.error("Failed to initialize LangChain MCP adapter");
    }
  });
}

module.exports = {
  ASSET_TYPES,
  RELATIONSHIP_TYPES,
  config,
  initialize,
  createMemoryAsset,
  getMemoryAsset,
  searchMemoryAssets,
  generateAssetSummary,
  findRelatedAssets
};