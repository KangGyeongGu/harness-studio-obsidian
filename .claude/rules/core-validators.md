---
paths:
  - "src/core/validators/**/*.ts"
---

# Validator Rules

- Validation is 5 stages in order: syntax → template → path/bucket → ID → combination constraints
- Missing `statement` field must ALWAYS block — no exceptions, all annotation kinds
- DB family mixing in a single file is prohibited — enforce strictly
- Container ID prefixes: `REST.<DOMAIN>`, `RT.<DOMAIN>`, `SCH.REST.<DOMAIN>`, `SCH.RT.<DOMAIN>`, `DB.TABLE.<DOMAIN>`, `DB.ENUM.<DOMAIN>`
- Child IDs must include the parent ID as a prefix
- Return `ValidationResult { status: "ok"|"blocked", blocked_reasons: string[], diagnostics: string[] }`
- No Obsidian API imports allowed in core — pure TypeScript only
