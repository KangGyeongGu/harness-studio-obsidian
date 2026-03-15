---
name: daemon-api-catalog
description: >
  Daemon HTTP API full catalog (endpoints, request/response schemas, query options, error handling).
  Load on-demand when implementing api layer or debugging daemon communication.
user-invocable: false
---

# Daemon HTTP API Full Catalog

## Base Configuration
- **Base Path**: `/api/v1/ssot`
- **Content-Type**: `application/json; charset=utf-8`

## Response Envelope (all responses)

### Success Envelope
```json
{
  "status": "ok | blocked",
  "request_id": "string",
  "snapshot_id": "string",
  "diagnostics": [],
  "blocked_reasons": [],
  "failed_items": []
}
```
`blocked_reasons[]` and `failed_items[]` are required when `status=blocked`.

### Write Response (additional fields)
```json
{
  "applied": true,
  "new_snapshot_id": "string | null",
  "integrity_report": { "gates": [] },
  "affected_files": [],
  "affected_harnesses": []
}
```

### Transport Error Envelope
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {},
    "request_id": "string"
  }
}
```

## Snapshot / Guard Rules
- `snapshot_id` not specified → uses active snapshot
- No active snapshot + snapshot-dependent read → `409 PRECONDITION_REQUIRED`
- `PATCH`/`DELETE` require `expected_version` — mandatory, never omit
- Write may optionally accept `expected_snapshot_id`

## Integrity Gates (write operations)
- `G1_SyntaxField` — field syntax validation
- `G2_GlobalIdentity` — global ID uniqueness
- `G3_Reference` — reference integrity
- `G4_ComposePolicy` — Harness compose policy
- `G5_AffectedCompile` — downstream compile check
- `G6_Placeholder` — placeholder resolution

## Endpoints

### Mutation

#### POST /api/v1/ssot/nodes
Create a new annotation node.
```json
// Request
{
  "kind": "atom | ap | dp | ...",
  "file_path": "src/...",
  "fields": { "statement": "...", ... },
  "dry_run": true,
  "expected_snapshot_id": "optional"
}
```

#### PATCH /api/v1/ssot/nodes/{node_id}
Update an existing node. `expected_version` is **required**.
```json
// Request
{
  "expected_version": "string",
  "patch": {
    "fields": { "statement": "updated" },
    "body": null
  }
}
```
PATCH rules:
- `patch.fields` → merge applied
- Optional field removal: set to `null`
- Required field removal: prohibited
- `patch.body` omitted → retain; `null` → delete

#### DELETE /api/v1/ssot/nodes/{node_id}
Delete a node. `expected_version` is **required**.
```json
// Request (query param or body)
{ "expected_version": "string" }
```

#### POST /api/v1/ssot/runtime/refresh
Trigger daemon re-parse/re-validate. Mode: `incremental` (default) or `full`.
```json
{ "mode": "incremental | full" }
```
Note: refresh performs parse/validate only — does NOT resolve/compile.

### Read

#### GET /api/v1/ssot/nodes/{node_id}
Fetch a single node by ID.

Query options:
- `include`: `api`, `schema`, `db`
- `debug`: `raw`, `source`
- `statement_scope`: `atom` (default) | `all`

#### GET /api/v1/ssot/harnesses/{harness_id}/context
Get harness context (resolved AP/DP/F composition).

#### GET /api/v1/ssot/harnesses/{harness_id}/guidance
Get harness implementation guidance.

#### GET /api/v1/ssot/runtime/snapshots/active
Get the currently active snapshot. Call this on plugin init before any snapshot-dependent reads.

#### GET /api/v1/ssot/contracts/annotations
Get daemon annotation contracts (`kind_templates`). Call on plugin load and after refresh.

#### GET /api/v1/ssot/index/symbols?q={query}
Search annotation symbols.
```json
// Response
{
  "status": "ok",
  "items": [
    { "id": "string", "kind": "string", "label": "string" }
  ]
}
```

#### GET /api/v1/ssot/index/symbols/{symbol_id}/refs
Get all references to a symbol.

#### GET /api/v1/ssot/index/symbols/{symbol_id}/impact
Get impact analysis (what would be affected if this symbol is deleted/changed).
```json
// Response includes:
{ "affected_nodes": [], "affected_harnesses": [] }
```

## UX Policies (must implement in plugin)
1. Always show `blocked_reasons[]`, `failed_items[]`, `diagnostics[]` when `status=blocked`
2. Show `integrity_report.gates[]` in write result UI
3. Disable update/delete UI until `expected_version` is loaded from GET
4. On plugin init: call `GET /runtime/snapshots/active` first; if 409 → prompt refresh
5. After `POST /runtime/refresh` → re-fetch `GET /contracts/annotations` + re-check active snapshot
