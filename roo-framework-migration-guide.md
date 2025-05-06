# Migration Guide: From Repository to Package

This guide helps you transition from using the full Roo Multi-Agent Framework repository to the packaged version. It provides step-by-step instructions for migrating existing projects and adapting your workflow.

## Why Migrate?

Moving from the full repository to the packaged version offers several advantages:

1. **Cleaner Project Structure**: Eliminate unnecessary files from your project
2. **Simplified Updates**: Easily update to new versions with npm
3. **Standardized Integration**: Use familiar package management workflows
4. **Reduced Duplication**: Maintain a single source of truth for framework files
5. **Better Separation of Concerns**: Clear distinction between framework and project code

## Migration Steps

### 1. Inventory Your Current Setup

Before migrating, take inventory of your current setup:

- **Custom Modifications**: Note any customizations you've made to framework files
- **Project Structure**: Document how your project integrates with the framework
- **Dependencies**: Identify any dependencies on specific framework files

### 2. Install the Package

```bash
# Install the packaged framework
npm install --save-dev @yourusername/roo-framework
```

The postinstall script will automatically:
- Create the `.roo` directory structure
- Initialize the boomerang state file
- Copy the `.roomodes` file to your project root

### 3. Apply Custom Modifications

If you've made custom modifications to framework files, you'll need to apply them to the packaged version:

#### Modified .roomodes

If you've customized the `.roomodes` file:

1. Compare your customized `.roomodes` with the one installed by the package
2. Merge your customizations into the new file

```bash
# Compare files
diff .roomodes.bak .roomodes

# Edit the new .roomodes file to incorporate your changes
code .roomodes
```

#### Custom Instructions

If you've customized the instructions for modes:

1. Access the package's custom instructions
2. Merge your customizations with the package version
3. Update your VS Code settings

```javascript
// Get the package's custom instructions
const rooFramework = require('@yourusername/roo-framework');
const baseInstructions = rooFramework.getCustomInstructions();

// Merge with your customizations and update VS Code settings
```

### 4. Update Directory Structure

The package creates a standard `.roo` directory structure. If you've used a different structure:

1. Identify differences between your structure and the package structure
2. Migrate content from your old structure to the new one

```bash
# Create a backup of your existing .roo directory
cp -r .roo .roo.bak

# Move specific files to the new structure
mv .roo.bak/custom-logs/* .roo/logs/
```

### 5. Update References

Update any references to framework files in your project:

```javascript
// Before: Direct file references
const customInstructions = fs.readFileSync('./framework/templates/custom-instructions-for-all-modes.md', 'utf8');

// After: Package API
const rooFramework = require('@yourusername/roo-framework');
const customInstructions = rooFramework.getCustomInstructions();
```

### 6. Clean Up

Remove the old framework files from your project:

```bash
# If you had the framework as a directory in your project
rm -rf ./framework

# If you had the framework as a Git submodule
git submodule deinit -f -- path/to/framework
git rm -f path/to/framework
```

### 7. Test Your Setup

Verify that everything works correctly:

1. Check that all modes appear in VS Code
2. Test each mode with a simple task
3. Verify that the boomerang logic works correctly
4. Confirm that logs are being saved to the correct locations

## Common Migration Scenarios

### Scenario 1: Basic Repository User

If you've been using the repository without modifications:

1. Install the package
2. Remove the old repository files
3. Update your VS Code settings to use the package's custom instructions

### Scenario 2: Custom Mode Definitions

If you've created custom modes:

1. Install the package
2. Merge your custom mode definitions into the new `.roomodes` file
3. Update your VS Code settings
4. Remove the old repository files

### Scenario 3: Custom Directory Structure

If you've created a custom directory structure:

1. Install the package
2. Migrate content from your custom structure to the package structure
3. Update any scripts or tools that reference the old structure
4. Remove the old repository files

### Scenario 4: Git Submodule User

If you've been using the repository as a Git submodule:

1. Install the package
2. Remove the submodule
3. Update your VS Code settings
4. Update any references to submodule files

## Troubleshooting

### Missing Modes

If modes are missing after migration:

1. Verify that the `.roomodes` file exists in your project root
2. Check that the file has the correct format and content
3. Restart VS Code to apply changes

### Missing Custom Instructions

If your custom instructions are missing:

1. Check your VS Code settings
2. Verify that you've correctly merged your customizations with the package version
3. Restart VS Code to apply changes

### Directory Structure Issues

If the directory structure is incorrect:

1. Compare your structure with the expected structure
2. Run the package's setup script to recreate the structure
3. Manually migrate any missing content

```bash
# Run the setup script
node node_modules/@yourusername/roo-framework/scripts/setup.js
```

## Rollback Plan

If you encounter issues during migration, you can roll back to your previous setup:

1. Restore your backup files
2. Uninstall the package
3. Reinstall the repository or submodule

```bash
# Uninstall the package
npm uninstall @yourusername/roo-framework

# Restore backups
mv .roomodes.bak .roomodes
mv .roo.bak .roo
```

## Best Practices After Migration

### Keeping Up to Date

Regularly update the package to get the latest features and fixes:

```bash
npm update @yourusername/roo-framework
```

### Documentation Access

Access framework documentation programmatically instead of keeping local copies:

```javascript
const rooFramework = require('@yourusername/roo-framework');
const meetTheTeam = rooFramework.readDocumentation('meet-the-team.md');
```

### Version Pinning

Pin to specific versions for stability:

```json
{
  "dependencies": {
    "@yourusername/roo-framework": "1.0.0"
  }
}
```

### Customization Strategy

Adopt a layered customization strategy:

1. Use the package as the foundation
2. Apply minimal customizations to `.roomodes` and custom instructions
3. Keep customizations in version control
4. Document the rationale for each customization

## Conclusion

Migrating from the full repository to the packaged version streamlines your workflow and simplifies maintenance. By following this guide, you can transition smoothly while preserving your customizations and project structure.

The packaged approach provides a cleaner, more maintainable solution that leverages standard package management practices while retaining all the powerful features of the Roo Multi-Agent Framework.