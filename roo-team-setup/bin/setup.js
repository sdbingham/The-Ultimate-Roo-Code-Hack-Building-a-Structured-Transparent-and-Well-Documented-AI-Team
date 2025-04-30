#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

async function main() {
  console.log(chalk.blue('🪃 Setting up Roo multi-agent framework...'));
  
  const { setupType } = await inquirer.prompt([{
    type: 'list',
    name: 'setupType',
    message: 'What would you like to set up?',
    choices: [
      { name: 'Full project (directories, config files, and examples)', value: 'full' },
      { name: 'Configuration only (.roomodes and .roo directory)', value: 'config' }
    ]
  }]);

  // Define target directory (current working directory)
  const targetDir = process.cwd();
  
  // Create necessary directory structure
  await fs.ensureDir(path.join(targetDir, '.roo'));
  await fs.ensureDir(path.join(targetDir, '.roo/rules'));
  await fs.ensureDir(path.join(targetDir, '.roo/logs'));
  await fs.ensureDir(path.join(targetDir, '.roo/memory'));

  // Create mode-specific directories
  const modes = [
    'orchestrator', 
    'code', 
    'architect', 
    'ask', 
    'debug', 
    'memory', 
    'deep-research-agent'
  ];

  console.log(chalk.yellow('Creating mode-specific directories and rules...'));
  
  for (const mode of modes) {
    await fs.ensureDir(path.join(targetDir, `.roo/rules-${mode}`));
    await fs.ensureDir(path.join(targetDir, `.roo/logs/${mode}`));
    
    // Copy the rules template for each mode
    await fs.copyFile(
      path.join(__dirname, `../templates/rules-${mode}.md`), 
      path.join(targetDir, `.roo/rules-${mode}/rules.md`)
    );
  }

  // Copy the base configuration files
  console.log(chalk.yellow('Copying configuration files...'));
  
  await fs.copyFile(
    path.join(__dirname, '../templates/roomodes.json'), 
    path.join(targetDir, '.roomodes')
  );

  await fs.copyFile(
    path.join(__dirname, '../templates/config.json'), 
    path.join(targetDir, '.roo/config.json')
  );

  await fs.copyFile(
    path.join(__dirname, '../templates/global-rules.md'), 
    path.join(targetDir, '.roo/rules/rules.md')
  );

  // If full project setup is selected, create additional directories and example files
  if (setupType === 'full') {
    console.log(chalk.yellow('Setting up full project structure...'));
    
    // Create directory structure for full project
    await fs.ensureDir(path.join(targetDir, 'agents'));
    await fs.ensureDir(path.join(targetDir, 'framework'));
    await fs.ensureDir(path.join(targetDir, 'best-practices'));
    await fs.ensureDir(path.join(targetDir, 'templates/task-prompts'));
    
    // Create agent directories and generate example files
    for (const mode of modes) {
      let dirName = mode;
      if (mode === 'deep-research-agent') dirName = 'research';
      
      await fs.ensureDir(path.join(targetDir, `agents/${dirName}`));
      
      // Create example agent file with basic content
      const agentContent = `# ${dirName.charAt(0).toUpperCase() + dirName.slice(1)} Agent\n\nThis is a placeholder file for the ${dirName} agent documentation.\n\n## Role Definition\n\nDefine the core responsibilities of this agent mode here.\n\n## Capabilities\n\nList the capabilities of this agent mode here.\n`;
      
      await fs.writeFile(
        path.join(targetDir, `agents/${dirName}/${dirName}-agent.md`),
        agentContent
      );
    }
    
    // Create framework files with basic content
    const frameworkFiles = [
      { name: 'sparc-overview.md', title: 'SPARC Framework Overview' },
      { name: 'boomerang-logic.md', title: 'Boomerang Logic Pattern' },
      { name: 'cognitive-processes.md', title: 'Cognitive Processes' }
    ];
    
    for (const file of frameworkFiles) {
      const fileContent = `# ${file.title}\n\nThis is a placeholder file for ${file.title} documentation.\n\n## Overview\n\nProvide an overview of the ${file.title} here.\n\n## Implementation\n\nDescribe how to implement the ${file.title} here.\n`;
      
      await fs.writeFile(
        path.join(targetDir, `framework/${file.name}`),
        fileContent
      );
    }
    
    // Copy task template
    await fs.copyFile(
      path.join(__dirname, '../templates/standard-task-template.md'),
      path.join(targetDir, 'templates/task-prompts/standard-task-template.md')
    );
  }

  console.log(chalk.green('✅ Roo multi-agent workspace setup complete!'));
  console.log(chalk.yellow('You can now use the specialized modes in your VSCode environment.'));
  console.log(chalk.blue('Remember to reload your VS Code window if needed.'));
}

main().catch(err => {
  console.error(chalk.red('Error during setup:'), err);
  process.exit(1);
});