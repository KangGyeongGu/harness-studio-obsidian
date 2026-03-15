---
paths:
  - "src/core/templates/**/*.ts"
---

# Template Engine Rules

- Use daemon contracts `kind_templates` as the primary source of truth for field definitions
- Conditional fields for `Api`:
  - REST parent → `success_http` (number, required) + `success_schema` (token, required)
  - RT parent → `success_event_schema` (token[], required)
- Conditional fields for `Schema` (branch by `req_res`):
  - REQ → `path_fields`, `query_fields`, `body_fields`
  - RES → `data_fields`; RT+RES adds `event_type`
- Conditional fields for `Entity`: `storage=persistent` → `table_refs` required
- Field types: `token` → text input or dropdown; `token[]` → search/tag input with autocomplete
- No Obsidian API imports allowed in core — pure TypeScript only
