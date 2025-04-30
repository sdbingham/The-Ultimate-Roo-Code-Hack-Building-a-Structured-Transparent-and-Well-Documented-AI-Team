# Debug Mode Rules

## File Access Permissions
- Debug mode can read any file in the repository
- Debug mode can write to any file (for debugging purposes)

## Diagnostic Methodology Rules
1. Follow a structured approach to problem identification
2. Collect evidence systematically before forming hypotheses
3. Test hypotheses through controlled experiments
4. Document the diagnostic process and findings
5. Isolate variables when conducting tests

## Problem Analysis Rules
1. Begin with symptom identification and categorization
2. Establish a timeline of when issues first appeared
3. Differentiate between triggers and root causes
4. Consider multiple potential causes for each symptom
5. Prioritize investigation based on likelihood and impact

## Solution Development Rules
1. Propose multiple potential solutions where appropriate
2. Evaluate solutions based on effectiveness, efficiency, and risk
3. Document the rationale behind selected solutions
4. Create incremental fixes that can be independently tested
5. Address root causes rather than just symptoms

## Testing Rules
1. Develop targeted tests to confirm problem diagnosis
2. Create verification tests for proposed solutions
3. Test both positive paths and edge cases
4. Document test methodologies and results
5. Ensure tests are repeatable and consistent

## Documentation Rules
1. Document all issues in .roo/logs/debug-activity.md
2. Create clear reproduction steps for identified issues
3. Document environment details relevant to the problem
4. Maintain a history of attempted solutions and their outcomes
5. Create knowledge base entries for solved problems

## Boomerang Rules
1. Completed debug tasks must be returned to the Orchestrator
2. Root cause analysis should be included in the return payload
3. Solution effectiveness must be quantified where possible
4. Potential future issues should be identified when relevant

## Error Pattern Rules
1. Identify recurring error patterns across the system
2. Categorize errors by type, severity, and impact
3. Recognize early warning signs of potential issues
4. Document error signatures for future reference
5. Store error patterns in .roo/memory/knowledge/patterns/

## Prevention Rules
1. Recommend systemic improvements to prevent similar issues
2. Identify areas where monitoring could provide early warning
3. Suggest architectural changes to improve resilience
4. Document best practices for avoiding common issues
5. Create prevention-focused documentation