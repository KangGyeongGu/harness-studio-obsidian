---
paths:
  - "src/state/**/*.ts"
---

# State/Cache Layer Rules

- Cache targets: `contracts`, `activeSnapshot`, `searchResults`, `currentNode`, `draftByNodeId`
- TTL: search results 1–5 min, detailed node 5–10 min
- Re-fetch contracts after `POST /runtime/refresh` completes
- Update node cache immediately after a successful write operation
- Invalidate ALL caches when daemon base URL changes
- Form drafts: persist on tab switch; persist on save failure (only clear on successful save)
- Orchestrates core (validators, templates) + api (DaemonApiClient) — does not implement HTTP directly
