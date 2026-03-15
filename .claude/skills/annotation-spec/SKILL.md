---
name: annotation-spec
description: >
  SSOT annotation template field reference (required/optional/conditional fields for 14 kind types).
  Load on-demand when implementing validators, templates, or form UI.
user-invocable: false
---

# SSOT Annotation Template Field Reference

Complete field mapping for all 14 annotation kinds. `statement` is required on ALL kinds — no exceptions.

## Atom

| Field | Type | Required | Widget |
|-------|------|----------|--------|
| `role` | token(`core\|fe\|be\|all`) | yes | dropdown |
| `statement` | string | yes | multiline text |
| `scope` | token | no | text |
| `domain` | token | no | text |
| `api_refs` | token[] | no | search/tag |
| `db_refs` | token[] | no | search/tag |
| `status` | token | no | dropdown |
| `version` | token | no | text |

## AP / DP

| Field | Type | Required | Widget |
|-------|------|----------|--------|
| `domain` | token | yes | text |
| `statement` | string | yes | multiline text |
| `status` | token | no | dropdown |
| `version` | token | no | text |

## F

| Field | Type | Required | Widget |
|-------|------|----------|--------|
| `domain` | token | yes | text |
| `role` | token(`core\|fe\|be`) | yes | dropdown |
| `statement` | string | yes | multiline text |
| `status` | token | no | dropdown |
| `version` | token | no | text |

## Harness

| Field | Type | Required | Widget |
|-------|------|----------|--------|
| `domain` | token | yes | text |
| `role` | token(`fe\|be`) | yes | dropdown |
| `statement` | string | yes | multiline text |
| `compose_ap` | token[] | yes | search/tag |
| `compose_dp` | token[] | yes | search/tag |
| `compose_f` | token[] | yes | search/tag |
| `resolve_order` | token[](`AP\|DP\|F`) | no | drag-order |
| `status` | token | no | dropdown |
| `version` | token | no | text |

## ApiRest / ApiRt (container)

| Field | Type | Required | Widget |
|-------|------|----------|--------|
| `domain` | token | yes | text |
| `statement` | string | yes | multiline text |
| `status` | token | no | dropdown |
| `version` | token | no | text |

## Api

| Field | Type | Required | Widget |
|-------|------|----------|--------|
| `statement` | string | yes | multiline text |
| `call` | string | yes | text |
| `request_schema` | token | yes | search/tag |
| `success_http` | number | conditional (REST parent) | number input |
| `success_schema` | token | conditional (REST parent) | search/tag |
| `success_event_schema` | token[] | conditional (RT parent) | search/tag |
| `error_map` | token[] | yes | search/tag |
| `db_refs` | token[] | no | search/tag |
| `status` | token | no | dropdown |
| `version` | token | no | text |

## SchemaRest / SchemaRt (container)

| Field | Type | Required | Widget |
|-------|------|----------|--------|
| `domain` | token | yes | text |
| `statement` | string | yes | multiline text |
| `status` | token | no | dropdown |
| `version` | token | no | text |

## Schema

| Field | Type | Required | Widget |
|-------|------|----------|--------|
| `statement` | string | yes | multiline text |
| `req_res` | token(`REQ\|RES`) | yes | dropdown |
| `path_fields` | token[] | conditional (REQ) | key-type list |
| `query_fields` | token[] | conditional (REQ) | key-type list |
| `body_fields` | token[] | conditional (REQ) | key-type list |
| `data_fields` | token[] | conditional (RES) | key-type list |
| `event_type` | token | conditional (RT + RES) | text |
| `status` | token | no | dropdown |
| `version` | token | no | text |

## Database (container)

| Field | Type | Required | Widget |
|-------|------|----------|--------|
| `domain` | token | yes | text |
| `statement` | string | yes | multiline text |
| `status` | token | no | dropdown |
| `version` | token | no | text |

## Table

| Field | Type | Required | Widget |
|-------|------|----------|--------|
| `statement` | string | yes | multiline text |
| `table` | token | yes | text |
| `primary_key` | token[] | yes | tag |
| `columns` | token[] | yes | key-type list |
| `foreign_keys` | token[] | no | list |
| `indexes` | token[] | no | list |
| `unique_constraints` | token[] | no | list |
| `check_constraints` | token[] | no | list |
| `status` | token | no | dropdown |
| `version` | token | no | text |

## Enum

| Field | Type | Required | Widget |
|-------|------|----------|--------|
| `statement` | string | yes | multiline text |
| `name` | token | yes | text |
| `values` | token[] | yes | tag |
| `status` | token | no | dropdown |
| `version` | token | no | text |

## Entity

| Field | Type | Required | Widget |
|-------|------|----------|--------|
| `statement` | string | yes | multiline text |
| `storage` | token(`persistent\|ephemeral\|derived`) | yes | dropdown |
| `source_of_truth` | token(`db\|redis\|computed`) | yes | dropdown |
| `write_policy` | token(`write_through\|write_back\|none\|redis_only`) | yes | dropdown |
| `identity_fields` | token[] | yes | key-type list |
| `attributes` | token[] | yes | key-type list |
| `table_refs` | token[] | conditional (`storage=persistent`) | search/tag |
| `enum_refs` | token[] | no | search/tag |
| `derived_from` | token[] | no | search/tag |
| `status` | token | no | dropdown |
| `version` | token | no | text |

## Relation

| Field | Type | Required | Widget |
|-------|------|----------|--------|
| `statement` | string | yes | multiline text |
| `from_entity` | token | yes | search/tag |
| `to_entity` | token | yes | search/tag |
| `cardinality` | token(`one_to_one\|one_to_many\|many_to_one\|many_to_many`) | yes | dropdown |
| `storage_scope` | token(`persistent\|ephemeral\|mixed`) | yes | dropdown |
| `table_refs` | token[] | no | search/tag |
| `fk_rules` | token[] | no | list |
| `status` | token | no | dropdown |
| `version` | token | no | text |

## PersistencePolicy

| Field | Type | Required | Widget |
|-------|------|----------|--------|
| `statement` | string | yes | multiline text |
| `phase` | token | yes | text |
| `trigger` | token[] | yes | tag |
| `entity_refs` | token[] | yes | search/tag |
| `table_refs` | token[] | no | search/tag |
| `source_of_truth` | token(`redis\|db\|mixed`) | yes | dropdown |
| `write_policy` | token(`redis_only\|write_through\|write_back`) | yes | dropdown |
| `redis_state` | token(`authoritative\|mirror\|cache\|evict\|none`) | yes | dropdown |
| `db_state` | token(`none\|snapshot\|flush\|append_log\|finalize`) | yes | dropdown |
| `status` | token | no | dropdown |
| `version` | token | no | text |

## node.kind Values (for CRUD)
`atom`, `ap`, `dp`, `f`, `harness`, `api_rest_container`, `api_rt_container`, `api`,
`schema_rest_container`, `schema_rt_container`, `schema`, `database_container`,
`db_table`, `db_enum`, `db_entity`, `db_relation`, `db_persistence_policy`
