---
"@kalink-ui/canopy": patch
---

Shorten image transform field SQL identifiers by default so deeply nested Payload schemas avoid Postgres identifier-length failures while keeping public field names unchanged.
