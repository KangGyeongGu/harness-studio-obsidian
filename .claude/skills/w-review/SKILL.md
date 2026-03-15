---
name: w-review
description: >
  Code review. Performs semantic-only review on changed code.
  Auto-invoked on "review", "code review", "check code" related requests.
argument-hint: "[file-path-or-scope]"
user-invocable: true
allowed-tools: Read, Agent, Bash
---

# Review Skill

## Instructions
1. Identify changed files:
   - If `$ARGUMENTS` is a file path, review that file only
   - If `$ARGUMENTS` is "all" or empty, review all uncommitted changes (`git diff --name-only`)
2. Spawn `reviewer` subagents in parallel with domain-specific prompts:

**Instance 1 — Architecture**
```
Review domain: Architecture
Scope: [changed files]

Checklist:
1. Does UI code (src/ui/) directly call core or api? (layer violation)
2. Does core module (src/core/) include obsidian imports? (dependency violation)
3. Does api module (src/api/) perform communication outside daemon?
4. Are new public interfaces consistent with existing patterns?
5. Are there circular dependencies?
6. Are there modules violating the single responsibility principle?

Reference: architecture.md for the 4-layer architecture.
```

**Instance 2 — Logic**
```
Review domain: Logic correctness
Scope: [changed files]

Checklist:
1. Do all code paths in functions return correct values?
2. Are null/undefined edge cases handled?
3. Is error handling missing anywhere? (especially async/await)
4. Are there PATCH/DELETE calls without expected_version?
5. Are there places ignoring status=blocked responses?
6. Is cache invalidation missing anywhere?
7. Are event listener/timer cleanups missing anywhere?
8. Are there potential race conditions?
```

3. Aggregate findings:
   - Deduplicate overlapping findings
   - Rank by severity
4. Present structured findings to the user

## Constraints
- Read-only: do NOT modify any files
- Only report findings with >80% confidence
- Do NOT report style/formatting issues (that's ESLint/Prettier's job)
- No security review here — use `/w-audit` for full security analysis
