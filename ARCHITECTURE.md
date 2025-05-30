# Roo Framework Architecture

This document provides a comprehensive overview of the Roo Framework architecture with LangChain integration.

## System Components

The Roo Framework consists of several key components that work together to provide a structured, transparent, and well-documented AI team framework:

### 1. Core Framework

```
┌─────────────────────────────────────────────────────────┐
│                   Roo Framework                          │
│                                                         │
│  ┌─────────────┐       ┌───────────────────────┐        │
│  │             │       │                       │        │
│  │ Memory Mode │◄─────►│ LangChain Integration │        │
│  │             │       │                       │        │
│  └─────────────┘       └───────────────────────┘        │
│         ▲                         ▲                     │
│         │                         │                     │
│         ▼                         │                     │
│  ┌─────────────┐                  │                     │
│  │             │                  │                     │
│  │ Boomerang   │                  │                     │
│  │ Logic       │                  │                     │
│  │             │                  │                     │
│  └─────────────┘                  │                     │
│                                   │                     │
└───────────────────────────────────┼─────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────┐
│                   Database Layer                           │
│                                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │             │  │             │  │             │        │
│  │  Weaviate   │  │    Neo4j    │  │   MongoDB   │        │
│  │             │  │             │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                           │
│                   ┌─────────────┐                         │
│                   │             │                         │
│                   │  ChromaDB   │                         │
│                   │             │                         │
│                   └─────────────┘                         │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### 2. Memory System

The Memory system provides knowledge management capabilities:

- **Memory Assets**: Structured knowledge units with metadata
- **Relationships**: Connections between memory assets
- **Storage**: Persistent storage in vector and graph databases
- **Retrieval**: Semantic search and relationship traversal

### 3. LangChain Integration

The LangChain integration enhances the memory capabilities:

- **Adapter Layer**: Provides compatibility with existing database systems
- **Enhanced Search**: Semantic search using LLM embeddings
- **Asset Summarization**: Using LLMs to generate summaries
- **Related Asset Discovery**: Finding semantically related assets
- **Chain of Thought**: Reasoning capabilities for complex queries

### 4. Boomerang Logic

The Boomerang system manages task tracking and workflow:

- **Task Creation**: Creating structured tasks
- **Task Assignment**: Assigning tasks to specific modes
- **Task Tracking**: Monitoring task status and progress
- **Task Completion**: Verifying and finalizing completed tasks

## Integration Architecture

The LangChain integration follows a hybrid approach:

```
┌─────────────────────────────────────────┐
│         Memory Controller API           │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│         Adapter Selection Layer         │
└───────────────┬─────────┬───────────────┘
                │         │
    ┌───────────▼─────┐   │   ┌───────────▼─────┐
    │  Original MCP   │   │   │   LangChain     │
    │    Adapter      │   │   │    Adapter      │
    └───────────┬─────┘   │   └───────────┬─────┘
                │         │               │
                │         │               │
                │         │               ▼
                │         │   ┌───────────────────┐
                │         │   │  LangChain Core   │
                │         │   └───────────┬───────┘
                │         │               │
                │         └───────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│           Database Layer                │
│  ┌────────┐ ┌────────┐ ┌────────────┐  │
│  │Weaviate│ │ Neo4j  │ │  MongoDB   │  │
│  └────────┘ └────────┘ └────────────┘  │
│             ┌────────┐                 │
│             │ChromaDB│                 │
│             └────────┘                 │
└─────────────────────────────────────────┘
```

## Docker Container Architecture

The Docker environment consists of the following containers:

- **Memory Service**: Manages memory assets and provides storage capabilities
- **Database Containers**:
  - **Weaviate**: Vector database for semantic search
  - **Neo4j**: Graph database for relationship management
  - **MongoDB**: Document database for structured data
  - **ChromaDB**: Vector database for embeddings

## Configuration

The framework is configured through environment variables:

| Environment Variable | Description | Default Value |
|----------------------|-------------|---------------|
| `USE_LANGCHAIN_MEMORY` | Enable LangChain adapter | `false` |
| `ROO_LANGCHAIN_LLM_PROVIDER` | Provider for both LLM and embeddings (anthropic, openai) | `anthropic` |
| `ROO_LANGCHAIN_EMBEDDING_PROVIDER` | Optional: Override embedding provider | Same as LLM provider |
| `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` | API key for the chosen provider | - |
| `OPENAI_API_KEY` | OpenAI API key | - |
| `ROO_LANGCHAIN_LLM_MODEL` | LLM model name | `claude-3-sonnet-20250219` |
| `ROO_LANGCHAIN_EMBEDDING_MODEL` | Embedding model name | `text-embedding-ada-002` |

## Setup Process

The setup process follows these steps:

1. Install dependencies
2. Configure environment variables
3. Initialize database schemas
4. Set up Docker containers
5. Test connections and functionality

This architecture provides a flexible, extensible framework for building AI applications with advanced memory capabilities.