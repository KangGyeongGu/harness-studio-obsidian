---
name: w-develop
description: >
  Development execution. Implements code according to the approved plan.
  Auto-invoked on "develop", "implement", "build" related requests.
argument-hint: "[plan-file-or-work-item-id]"
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Write, Agent, Bash
---

# Develop Skill

## Instructions
1. Read the current plan from `.claude/plans/current-plan.json`
2. If `$ARGUMENTS` specifies a work item ID, implement only that item
3. Otherwise, implement all pending work items in order
4. For each work item:
   a. Use the `develop-worker` subagent with the work item details
   b. Verify the worker's output (check `smoke_check` in JSON result)
   c. If smoke test fails, instruct the worker to fix before proceeding
5. After all items complete:
   a. Archive previous report if exists:
      ```bash
      TS=$(date +%Y%m%d-%H%M%S)
      cp .claude/reports/develop-latest.json ".claude/reports/archive/${TS}_develop.json" 2>/dev/null || true
      ```
   b. Write `develop-latest.json` from develop-worker output
   c. Update `.claude/status.json`: set `stage: "developed"`, `develop.completed_at`, `develop.verdict`

## Constraints
- Do NOT implement work items not in the approved plan
- Do NOT skip smoke tests
- Stop and report if a work item fails after 3 fix attempts
