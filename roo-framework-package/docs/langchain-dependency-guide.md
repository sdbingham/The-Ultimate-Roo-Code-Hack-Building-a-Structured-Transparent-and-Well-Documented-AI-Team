# LangChain Dependency Guide

## Dependency Conflict Issue

When installing LangChain dependencies alongside the Roo Framework, you might encounter a dependency conflict error like this:

```
npm error code ERESOLVE
npm error ERESOLVE could not resolve
npm error
npm error While resolving: @sdbingham/roo-framework@4.5.0
npm error Found: @langchain/openai@0.5.10
npm error node_modules/@langchain/openai
npm error   @langchain/openai@"*" from the root project
npm error   @langchain/openai@">=0.1.0 <0.6.0" from langchain@0.3.25
npm error   node_modules/langchain
npm error     langchain@"*" from the root project
npm error
npm error Could not resolve dependency:
npm error peerOptional @langchain/openai@"^0.0.10" from @sdbingham/roo-framework@4.5.0
```

This occurs because the Roo Framework package specifies peer dependencies for specific versions of LangChain packages, but you're trying to install newer versions.

## Solution

### Option 1: Use the `--force` Flag

The simplest solution is to use the `--force` flag when installing the dependencies:

```bash
npm install langchain @langchain/openai @langchain/anthropic @langchain/community --force
```

This will install the latest versions of the LangChain packages, ignoring the peer dependency warnings.

### Option 2: Use the `--legacy-peer-deps` Flag

Alternatively, you can use the `--legacy-peer-deps` flag:

```bash
npm install langchain @langchain/openai @langchain/anthropic @langchain/community --legacy-peer-deps
```

This tells npm to use the legacy algorithm for installing peer dependencies, which is more lenient.

### Option 3: Install Specific Versions

If you want to avoid using flags, you can install the specific versions that are compatible with the Roo Framework:

```bash
npm install langchain@0.1.0 @langchain/openai@0.0.10 @langchain/anthropic@0.0.10 @langchain/community@0.0.10
```

However, this will install older versions of the packages, which might not have the latest features and bug fixes.

## Recommended Approach

We recommend using Option 1 or Option 2, as they will install the latest versions of the LangChain packages. The Roo Framework's LangChain integration is designed to be flexible and should work with newer versions of the LangChain packages.

After installation, you can verify that the integration is working correctly by running:

```bash
npx roo-framework langchain test
```

## Future Updates

In future versions of the Roo Framework, we will update the peer dependency specifications to be more flexible with version ranges, allowing for easier installation of the latest LangChain packages.