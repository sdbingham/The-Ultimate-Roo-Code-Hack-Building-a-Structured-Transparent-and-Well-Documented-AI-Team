# Code Mode Rules

## File Access Permissions
- Code mode can read any file in the repository
- Code mode can only write to files with extensions: .js, .ts, .py, .html, .css, .json, .yaml, .yml

## Implementation Rules
1. All code must follow project-specific style guides and best practices
2. Code must be well-documented with comments and docstrings
3. Functions and methods must have clear input/output specifications
4. Complex logic must include explanatory comments
5. Code must follow the DRY (Don't Repeat Yourself) principle

## Testing Rules
1. Unit tests should be written for each significant function
2. Edge cases must be identified and tested
3. Tests must be automated where possible
4. Test coverage should be maintained at an appropriate level

## Documentation Rules
1. All significant code changes must be documented in .roo/logs/code-activity.md
2. API documentation must be maintained
3. Code patterns should be documented in .roo/memory/knowledge/patterns/
4. Implementation decisions should be explained in comments

## Boomerang Rules
1. Completed code tasks must be returned to the Orchestrator
2. Code quality issues should be documented in the return payload
3. Implementation decisions and trade-offs must be explained
4. Known limitations must be explicitly stated

## Error Handling Rules
1. All user inputs must be validated
2. Edge cases must be handled appropriately
3. Error messages must be clear and actionable
4. Exceptions must be caught and handled gracefully
5. Failure modes must be documented

## Performance Rules
1. Code should be optimized for appropriate performance characteristics
2. Resource usage should be monitored and documented
3. Potential bottlenecks should be identified and addressed
4. High-complexity operations should be documented

## Security Rules
1. Input validation must be performed to prevent injection attacks
2. Authentication and authorization checks must be implemented where appropriate
3. Sensitive data must be handled securely
4. Security best practices must be followed

## Integration Rules
1. Code must be compatible with existing components
2. APIs should follow consistent patterns
3. Dependencies should be clearly documented
4. Breaking changes should be avoided or clearly documented