// index.js
const fs = require('fs');
const path = require('path');

// Export utility functions
module.exports = {
  // Get path to documentation files
  getDocumentationPath: (filename) => {
    return path.join(__dirname, filename);
  },
  
  // Read documentation file
  readDocumentation: (filename) => {
    return fs.readFileSync(path.join(__dirname, filename), 'utf8');
  },
  
  // Get custom instructions
  getCustomInstructions: () => {
    return fs.readFileSync(path.join(__dirname, 'templates', 'custom-instructions-for-all-modes.md'), 'utf8');
  },
  
  // Get enhance prompt template
  getEnhancePromptTemplate: () => {
    return fs.readFileSync(path.join(__dirname, 'templates', 'enhance-prompt-template.md'), 'utf8');
  }
};