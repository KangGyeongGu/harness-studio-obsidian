---
paths:
  - "src/api/**/*.ts"
---

# Daemon API Layer Rules

- All HTTP requests must go through `DaemonApiClient` — raw `fetch()` is prohibited
- `PATCH`/`DELETE` must always include `expected_version` — never omit it
- `status=blocked` responses must surface `blocked_reasons[]`, `failed_items[]`, and `diagnostics[]` to the user
- Preserve the full response envelope: `status`, `request_id`, `snapshot_id`, `diagnostics[]`
- Forward `integrity_report.gates[]` from write responses to the UI layer
- On network error, display guidance to check connection settings (daemon base URL)
- `409 PRECONDITION_REQUIRED` means no active snapshot — prompt user to run refresh
