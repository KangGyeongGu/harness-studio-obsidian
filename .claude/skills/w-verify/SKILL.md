---
name: w-verify
description: >
  Mechanical verification only. Runs typecheck, lint, format, test, and build sequentially.
  Auto-invoked on "verify", "check", "run tests" related requests.
user-invocable: true
allowed-tools: Bash
---

# Verify Skill

## Instructions
Run the following commands sequentially and report results:

1. `npm run typecheck` — TypeScript type checking
2. `npm run lint` — ESLint code quality check
3. `npm run format:check` — Prettier format check
4. `npm run test` — Vitest unit tests
5. `npm run build` — esbuild build

## Output Format
```text
Verify Result
- typecheck: pass|fail
- lint: pass|fail (N errors, N warnings)
- format: pass|fail
- test: pass|fail (N passed, N failed, coverage: N%)
- build: pass|fail (bundle size: N KB)
- Overall: PASS|FAIL
```

If any step fails, report the error details and stop.
Do NOT auto-fix. Report findings to the user.
