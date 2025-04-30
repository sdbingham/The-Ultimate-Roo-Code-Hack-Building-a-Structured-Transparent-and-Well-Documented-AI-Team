# Contributing to The Ultimate Roo Code Hack

Thank you for considering contributing to the Roo multi-agent framework! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported by searching the [Issues](https://github.com/Mnehmos/The-Ultimate-Roo-Code-Hack-Building-a-Structured-Transparent-and-Well-Documented-AI-Team/issues).
2. If the bug hasn't been reported, create a new issue using the bug report template.
3. Include as much detail as possible: steps to reproduce, expected behavior, actual behavior, and environment.

### Suggesting Features

1. Review existing [Issues](https://github.com/Mnehmos/The-Ultimate-Roo-Code-Hack-Building-a-Structured-Transparent-and-Well-Documented-AI-Team/issues) to check if the feature has already been suggested.
2. Create a new issue using the feature request template.
3. Clearly explain the feature, its benefits, and how it aligns with the SPARC framework.

### Pull Requests

1. Fork the repository.
2. Create a new branch from `main` for your changes.
3. Make your changes following the project's coding standards.
4. Ensure your code follows the SPARC framework principles.
5. Add tests if applicable.
6. Update documentation as needed.
7. Submit a pull request to the `main` branch.

## Development Workflow

### Setting Up the Development Environment

1. Clone the repository:
   ```
   git clone https://github.com/Mnehmos/The-Ultimate-Roo-Code-Hack-Building-a-Structured-Transparent-and-Well-Documented-AI-Team.git
   cd The-Ultimate-Roo-Code-Hack-Building-a-Structured-Transparent-and-Well-Documented-AI-Team
   ```

2. If working on the npm package:
   ```
   cd roo-team-setup
   npm install
   npm link
   ```

### File Structure

- `.roo/`: Configuration and runtime files
- `agents/`: Agent definitions for each mode
- `framework/`: Core framework documentation
- `best-practices/`: Best practices guides
- `implementation/`: Implementation guides
- `templates/`: Reusable templates
- `roo-team-setup/`: NPM package for automated setup

### Coding Standards

- Follow the existing code style and patterns.
- Keep token optimization in mind (target below 40% context window usage).
- Document all significant changes, especially architectural decisions.
- Maintain the multi-agent structure and respect mode boundaries.

## Adding or Modifying Modes

When adding or modifying modes:

1. Update both `config.json` and `.roomodes` files
2. Create corresponding rule files in `.roo/rules-{new-mode}/rules.md`
3. Create agent definition in `agents/{mode}/{mode}-agent.md`
4. Update the npm setup package to include the new mode

## Documentation

- Update relevant documentation for any changes.
- Follow the structured documentation approach.
- Include examples where appropriate.
- Reference the SPARC framework principles.

## Testing

- Test changes with multiple AI assistants that support custom modes.
- Verify that the SPARC framework principles are maintained.
- Test the boomerang logic for task delegation.
- Ensure memory functions operate correctly.

## Questions?

If you have questions about contributing, please open an issue with the "question" label.

Thank you for contributing to the Roo multi-agent framework!