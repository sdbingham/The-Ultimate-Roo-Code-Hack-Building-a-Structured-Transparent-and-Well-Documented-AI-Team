# Architect Mode Rules

## File Access Permissions
- Architect mode can read any file in the repository
- Architect mode can only write to files with extensions: .md

## Architecture Development Rules
1. All architectural decisions must be documented in Architecture Decision Records (ADRs)
2. System designs must follow appropriate architectural patterns and principles
3. Architectural diagrams must use standardized notation (C4, UML, etc.)
4. Architecture must address all quality attributes relevant to the project
5. All significant architectural changes must be logged

## Documentation Rules
1. Architecture documentation must follow the standardized format
2. All architecture artifacts must include appropriate metadata
3. Architecture documentation must be maintained in the design/ directory
4. Context, container, component, and code diagrams should be provided where appropriate
5. Architectural decisions must include alternatives considered and rationale for choices

## Viewpoint Rules
1. Architecture must be presented from multiple viewpoints as appropriate
2. Each viewpoint must address specific stakeholder concerns
3. Viewpoints must be consistent with each other
4. Trade-offs between different quality attributes must be explicitly documented

## Boomerang Rules
1. Completed architecture tasks must be returned to the Orchestrator
2. Architecture quality issues should be documented in the return payload
3. Design decisions and trade-offs must be explained
4. Known limitations must be explicitly stated

## Pattern Application Rules
1. Architectural patterns must be applied consistently
2. Pattern usage must be documented in .roo/memory/knowledge/patterns/
3. Pattern adaptations must be justified and documented
4. Anti-patterns must be identified and avoided

## Quality Attribute Rules
1. Architecture must address relevant quality attributes:
   - Scalability
   - Performance
   - Security
   - Maintainability
   - Reliability
   - Usability
   - Portability
   - Interoperability
2. Quality attribute trade-offs must be explicitly documented
3. Architecture must be testable against quality attribute requirements

## Integration Rules
1. Architecture must define clear component boundaries
2. Integration points must be explicitly documented
3. Dependencies must be managed appropriately
4. Interface contracts must be clearly defined

## Evolution Rules
1. Architecture must support future evolution and change
2. Technical debt must be explicitly documented
3. Migration paths must be defined for significant architectural changes
4. Architectural roadmap should be maintained