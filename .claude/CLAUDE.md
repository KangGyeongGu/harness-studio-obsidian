# Harness Studio Obsidian

Obsidian plugin providing UX for creating, editing, validating, and searching SSOT annotations.
Communicates with a local daemon HTTP API (`/api/v1/ssot`).

## Tech Stack

- Language: TypeScript (strict mode)
- Runtime: Obsidian Plugin API
- Build: esbuild
- Test: Vitest + jsdom + MSW (Mock Service Worker)
- Lint: ESLint + typescript-eslint + @vitest/eslint-plugin + Prettier
- Security: Semgrep (p/owasp-top-ten + custom `.semgrep/harness-rules.yaml`)
- Mutation Testing: StrykerJS (`.stryker.config.mjs`, break threshold: 50)

## Commands

```bash
npm run typecheck         # tsc --noEmit
npm run lint              # ESLint
npm run lint:fix          # ESLint --fix
npm run format            # Prettier --write
npm run format:check      # Prettier --check
npm run test              # Vitest run
npm run test:coverage     # Vitest + V8 coverage
npm run test:mutation     # StrykerJS mutation testing (/w-audit only, not smoke check)
npm run build             # esbuild
npm run verify            # typecheck + lint + test + build
npm run security:semgrep  # Semgrep scan
```

## Project Structure

```
src/
  main.ts          # Plugin entry point (onload / onLayoutReady)
  ui/              # Obsidian views, modals, settings tab
  core/            # Business logic (validators, templates) — NO Obsidian imports
  api/             # DaemonApiClient — daemon HTTP communication only
  state/           # Cache, settings, draft state
tests/
  setup.ts              # Vitest global setup
  setup-msw.ts          # MSW daemon mock server setup
  mocks/
    obsidian.ts         # Obsidian API mock (vitest path alias)
    daemon-handlers.ts  # MSW request handlers
```

## Architecture Layers (strict unidirectional dependency)

1. **UI** (`src/ui/`) — accesses daemon data through State only; no direct core/api calls
2. **Core** (`src/core/`) — pure business logic; NO Obsidian API imports (testability)
3. **API** (`src/api/`) — daemon HTTP communication only; no business logic
4. **State** (`src/state/`) — cache, settings, draft; orchestrates core + api

## Daemon API

- Base path: `/api/v1/ssot`
- Content-Type: `application/json; charset=utf-8`
- Response envelope: `{ status, request_id, snapshot_id, diagnostics[] }`
- `status=blocked` → surface `blocked_reasons[]`, `failed_items[]`, `diagnostics[]` to user
- **PATCH/DELETE: `expected_version` is required — reject without it**
- 409 PRECONDITION_REQUIRED: no active snapshot → prompt user to run refresh

## SSOT Annotation Rules (Strict Only)

- `statement` field is **required** for ALL annotation kinds — blocks without exception
- DB family: only one per file, mixing is prohibited
- Root types: `@AP`, `@DP`, `@F`, `@Harness`, `@ApiRest`, `@ApiRt`, `@SchemaRest`, `@SchemaRt`, `@Database`
- Bucket paths: `src/AP/**`, `src/DP/**`, `src/F/**`, `src/HARNESS/**`, `src/API/**/`, `src/DB/**/`
- Container ID prefixes: `REST.<D>`, `RT.<D>`, `SCH.REST.<D>`, `SCH.RT.<D>`, `DB.TABLE.<D>`, `DB.ENUM.<D>`
- Child IDs must include parent ID as prefix

## Plugin Lifecycle

- `onload()`: register ribbon icon, commands, view types ONLY (must be lightweight)
- `onLayoutReady()`: fetch contracts (`GET /contracts/annotations`), check active snapshot

## Reference Documents

- `references.md` — SSOT annotation rules + daemon API catalog
- `architecture.md` — Plugin architecture, form field mappings, validation rules
- `agent-system.md` — AI agent system design (Plan/Develop/Audit pipeline)

## Agent System

Workflow: `/w-plan` → user approval → `/w-develop` → `/w-audit`

- **plan-worker** (Sonnet): decomposes requirements into work items
- **develop-worker** (Sonnet): implements code, runs smoke verification (isolation: worktree)
- **audit-worker** (Sonnet): mechanical checks (7 steps) + parallel semantic review (5 instances)
- **reviewer** (Sonnet): reusable semantic reviewer; domain checklist injected via dynamic prompt
- **security-reviewer** (Sonnet): security review specialist (Bash for Semgrep execution)
- **test-generator** (Sonnet): unit test generation; initial or mutation-guided mode
- Path-specific rules in `.claude/rules/` auto-inject domain context when matching files are Read
- **Note**: Subagents do not auto-inherit this CLAUDE.md — workers must explicitly Read it or
  reference docs as needed (develop-worker reads architecture.md/references.md; plan-worker reads all three)
