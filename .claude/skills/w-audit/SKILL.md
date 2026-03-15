---
name: w-audit
description: >
  Comprehensive audit/verification. Runs mechanical checks and AI semantic reviews.
  Auto-invoked on "audit", "verify all", "full test" related requests.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Write, Agent, Bash
---

# Audit Skill

## Instructions
1. Use the `audit-worker` subagent to run the full audit pipeline:
   - Phase 1: Mechanical verification (typecheck, lint, format, test:coverage, test:mutation, semgrep, build)
   - Phase 2: Semantic review — 5 instances in parallel (architecture, logic, spec-compliance, test-smell, security)
   - Phase 3: Aggregation and verdict
2. Archive previous audit reports if exist:
   ```bash
   TS=$(date +%Y%m%d-%H%M%S)
   cp .claude/reports/audit-latest.json ".claude/reports/archive/${TS}_audit.json" 2>/dev/null || true
   cp .claude/reports/audit-latest.md   ".claude/reports/archive/${TS}_audit.md"   2>/dev/null || true
   ```
3. Save new reports:
   - Write `audit-latest.json` (machine output from audit-worker)
   - Generate `audit-latest.md` (한국어 narrative — verdict, findings by severity, fix priority)
4. Update `.claude/status.json`: set `stage: "audited"`, `audit.verdict`, `audit.open_findings`
5. Present the audit result to the user (from audit-latest.md)
6. If verdict is BLOCKED or NEEDS_WORK:
   - List all critical and high findings
   - Suggest fix priority order
7. If verdict is PASS:
   - Confirm all checks passed
   - Report coverage and any info-level observations

## Constraints
- Do NOT auto-fix findings
- Present all findings transparently to the user
- Phase 2 only runs if Phase 1 passes completely
