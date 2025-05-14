/**
 * Setup LangChain Environment Variables
 * 
 * This script helps set up the environment variables needed for LangChain integration.
 * It will create or update the .env file with the necessary variables.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Path to .env file
const envFilePath = path.resolve(process.cwd(), '.env');

/**
 * Check if .env file exists and read its content
 */
function readEnvFile() {
  try {
    if (fs.existsSync(envFilePath)) {
      return fs.readFileSync(envFilePath, 'utf8');
    }
    return '';
  } catch (error) {
    console.error('Error reading .env file:', error.message);
    return '';
  }
}

/**
 * Write content to .env file
 */
function writeEnvFile(content) {
  try {
    fs.writeFileSync(envFilePath, content);
    return true;
  } catch (error) {
    console.error('Error writing .env file:', error.message);
    return false;
  }
}

/**
 * Add or update a variable in the .env file
 */
function updateEnvVariable(content, variable, value) {
  const lines = content.split('\n');
  const variableRegex = new RegExp(`^${variable}=.*`);
  const variableLine = `${variable}=${value}`;
  
  // Check if variable already exists
  const index = lines.findIndex(line => variableRegex.test(line));
  
  if (index !== -1) {
    // Update existing variable
    lines[index] = variableLine;
  } else {
    // Add new variable
    lines.push('');
    lines.push('# LangChain API Keys');
    lines.push(variableLine);
  }
  
  return lines.join('\n');
}

/**
 * Main function
 */
async function main() {
  console.log('LangChain Environment Setup');
  console.log('==========================');
  console.log('This script will help you set up the environment variables needed for LangChain integration.');
  console.log('It will create or update the .env file with the necessary variables.\n');
  
  // Read existing .env file
  let envContent = readEnvFile();
  
  // Ask for Claude API key
  rl.question('Enter your Claude API key (starts with "sk-ant-"): ', (claudeApiKey) => {
    if (!claudeApiKey) {
      console.error('Error: Claude API key is required');
      rl.close();
      return;
    }
    
    // Update .env file with Claude API key
    envContent = updateEnvVariable(envContent, 'CLAUDE_API_KEY', claudeApiKey);
    envContent = updateEnvVariable(envContent, 'ANTHROPIC_API_KEY', claudeApiKey);
    
    // Ask for OpenAI API key (optional)
    rl.question('Enter your OpenAI API key (optional, press Enter to skip): ', (openaiApiKey) => {
      if (openaiApiKey) {
        envContent = updateEnvVariable(envContent, 'OPENAI_API_KEY', openaiApiKey);
      }
      
      // Write updated .env file
      if (writeEnvFile(envContent)) {
        console.log('\nEnvironment variables successfully updated in .env file.');
        console.log(`File location: ${envFilePath}`);
        console.log('\nYou can now run the LangChain integration tests:');
        console.log('npm run test-langchain');
      } else {
        console.error('\nFailed to update environment variables.');
      }
      
      rl.close();
    });
  });
}

// Run the main function
main().catch(error => {
  console.error('Error:', error);
  rl.close();
});