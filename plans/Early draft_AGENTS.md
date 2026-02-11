# AGENTS.md
AI Development Workflow & Repository Rules

This repository is AI-assisted. All coding agents must strictly follow the workflow rules below.

The human maintainer (project owner) has final control over merges into `main`.

============================================================
CORE PRINCIPLES
============================================================

1. Prioritize clarity over cleverness.
2. Prefer simple, readable solutions.
3. Use ES Modules (import/export). No global variables.
4. Keep files small and single-purpose.
5. Do NOT refactor large portions of the codebase without explicit instruction.
6. Never break existing gameplay features.

============================================================
BRANCHING RULES (MANDATORY)
============================================================

1. NEVER work directly on `main`.

2. Always create a feature branch before starting work:

   git checkout -b feature/<short-feature-name>

   Example:
   git checkout -b feature/enclosure-stats

3. All development must occur on that branch.

4. Branch names must be concise and descriptive.

============================================================
COMMIT RULES (ATOMIC COMMITS REQUIRED)
============================================================

1. Commit after completing ONE logical task.

   Examples of a single logical task:
   - Creating a new class (e.g., Unicorn class)
   - Implementing a scoring system
   - Adding a UI component
   - Fixing a specific bug
   - Refactoring a single file for clarity

2. Do NOT combine unrelated changes in one commit.

3. Commit message format:

   <type>: <short description>

   Allowed types:
   - feat     (new feature)
   - fix      (bug fix)
   - refactor (internal restructuring)
   - chore    (tooling/config updates)
   - docs     (documentation changes)

   Examples:
   feat: add Unicorn movement logic
   feat: add enclosure stats panel UI
   fix: correct collision detection
   refactor: simplify score calculation logic

4. Before committing:
   - Ensure the game runs (npm run dev)
   - Ensure no console errors
   - Remove unused imports
   - Do not leave critical TODO comments

============================================================
PUSH RULES
============================================================

1. After completing and testing a feature:

   git push -u origin feature/<feature-name>

2. NEVER merge into `main`.
3. NEVER push directly to `main`.
4. NEVER delete branches.

The human maintainer performs merges manually.

============================================================
HUMAN MERGE INSTRUCTIONS (REFERENCE ONLY)
============================================================

# The AI MUST NOT execute the commands below.
# These are instructions for the human maintainer.

To merge a finished feature branch into main:

1. Switch to main:

   git checkout main

2. Pull latest changes:

   git pull origin main

3. Merge the feature branch:

   git merge feature/<feature-name>

4. Push updated main:

   git push origin main

5. (Optional) Delete local branch:

   git branch -d feature/<feature-name>

============================================================
TESTING REQUIREMENTS
============================================================

Before declaring a feature complete:

1. Run:

   npm run dev

2. Confirm:
   - Game loads successfully
   - No blank screen
   - No console errors
   - New feature works minimally
   - Existing gameplay still works

If errors exist, fix them before committing.

============================================================
ARCHITECTURE RULES
============================================================

Project structure must follow:

src/
  main.js
  scenes/
  entities/
  systems/
  ui/
  utils/

Rules:
1. Do not place heavy logic inside scenes.
2. Separate game logic from UI logic.
3. Keep systems loosely coupled.
4. Avoid circular dependencies.
5. Do not introduce new libraries without explanation.

============================================================
GAME DESIGN RULES
============================================================

1. Follow GAME_RULES.md strictly.
2. If a requested feature conflicts with GAME_RULES.md, request clarification.
3. Do not invent new mechanics unless instructed.

============================================================
REFRACTORING RULES
============================================================

A large refactor is defined as:
- Modifying more than 5 files
- Reorganizing folder structure
- Rewriting a core system

Large refactors require explicit human approval.

============================================================
AI BEHAVIOR REQUIREMENTS
============================================================

Before coding:
1. Provide a short implementation plan.

After completing a feature:
1. Provide a summary:
   - Files created
   - Files modified
   - Commits made
   - Branch name
   - Any risks introduced
2. Save summary into ./plans with title to match commit comment and branch name

Never:
- Rewrite major systems silently
- Install dependencies without explanation
- Leave partially implemented features
- Push broken builds
