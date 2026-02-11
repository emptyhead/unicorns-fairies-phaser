# AGENTS.md
AI Development Rules for This Repository

This project is AI-assisted.
The human maintainer has final control over all merges into `main`.

============================================================
CORE PRINCIPLES
============================================================

1. Prioritize simplicity and readability.
2. Avoid clever or advanced patterns.
3. Use ES Modules (import/export). No global variables.
4. Keep files small and single-purpose.
5. Do not refactor large systems without explicit permission.
6. Never break existing gameplay features.

============================================================
BRANCHING RULES (MANDATORY)
============================================================

1. NEVER work directly on `main`.

2. Always create a feature branch before starting:

   git checkout -b feature/<short-name>

   Example:
   git checkout -b feature/unicorn-movement

3. All development must occur on that branch.

============================================================
COMMIT RULES (ATOMIC COMMITS REQUIRED)
============================================================

1. Commit after completing ONE logical task only.

   Examples:
   - Create a new class
   - Add a UI panel
   - Implement one gameplay mechanic
   - Fix one bug

2. Do NOT combine unrelated changes.

3. Commit message format:

   <type>: <short description>

   Types:
   - feat
   - fix
   - refactor
   - chore
   - docs

   Example:
   feat: add unicorn movement logic

4. Before committing:
   - Run `npm run dev`
   - Ensure game loads
   - Ensure no console errors
   - Remove unused imports

============================================================
PUSH RULES
============================================================

1. After a feature is complete and tested:

   git push -u origin feature/<feature-name>

2. NEVER merge into `main`.
3. NEVER push directly to `main`.
4. NEVER delete branches.

The human performs all merges.

============================================================
HUMAN MERGE INSTRUCTIONS (REFERENCE ONLY)
============================================================

# The AI MUST NOT execute the commands below.

To merge a feature branch into main:

1. git checkout main
2. git pull origin main
3. git merge feature/<feature-name>
4. git push origin main
5. (Optional) git branch -d feature/<feature-name>

============================================================
SAFE MODE RULES (BEGINNER PROTECTION)
============================================================

1. Before coding, provide a short implementation plan.
2. Modify no more than 5 files unless approved.
3. Do not reorganize folders without approval.
4. Do not introduce new libraries without explaining why.
5. Avoid design patterns unless clearly necessary.
6. Explain WHY a non-obvious solution was chosen.
7. After completing a feature, provide:
   - Branch name
   - Commits made
   - Files created/modified
   - Any risks introduced
   Store this in a file named [branch name]-[feature].md in ./implementation
9. The AI must refuse to checkout or modify the main branch.

============================================================
ARCHITECTURE GUIDELINES
============================================================

Project structure:

src/
  main.js
  scenes/
  entities/
  systems/
  ui/
  utils/

1. Keep game logic separate from UI.
2. Avoid tight coupling between systems.
3. Follow GAME_RULES.md strictly.
4. If a requested feature conflicts with GAME_RULES.md, ask for clarification.
