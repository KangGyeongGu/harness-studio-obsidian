---
name: w-plan
description: >
  Task planning. Decomposes requirements into implementable work items and determines execution order.
  Auto-invoked on "plan", "design", "decompose" related requests.
argument-hint: "[objective]"
user-invocable: true
allowed-tools: Read, Write, Agent, Bash
---

# Plan Skill

## Instructions
1. Use the `plan-worker` subagent to analyze the objective and design a plan
2. Review the plan output for completeness:
   - All work items have clear objectives and owned_paths
   - Dependencies are correctly identified
   - Parallel opportunities are marked
   - Test scope is defined
3. Present the plan to the user for approval
4. On approval:
   a. Archive previous plan if exists:
      ```bash
      TS=$(date +%Y%m%d-%H%M%S)
      cp .claude/plans/current-plan.json ".claude/plans/archive/${TS}_plan.json" 2>/dev/null || true
      cp .claude/plans/current-plan.md   ".claude/plans/archive/${TS}_plan.md"   2>/dev/null || true
      ```
   b. Write `current-plan.json` and `current-plan.md` from plan-worker output
   c. Update `.claude/status.json`: set `current_run_id`, `stage: "planned"`, `plan.approved_at`

## Input
- `$ARGUMENTS`: The objective or feature requirement

## Constraints
- Do NOT start implementation
- Do NOT modify any source files
- Plan must reference `architecture.md` and `references.md` for design decisions
