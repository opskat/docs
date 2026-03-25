---
sidebar_position: 4
sidebar_label: Query Editor
---

# Query Editor

OpsKat includes a built-in query editor for executing SQL on MySQL/PostgreSQL databases and commands on Redis instances. Database connections can be tunneled through SSH for secure access.

## SQL Editor

### Connecting

Select a database asset from the sidebar and open the **Query** tab. If the database asset has an SSH tunnel configured, OpsKat establishes the SSH connection first and tunnels the database connection through it.

### Writing and Executing Queries

- Write SQL in the editor with syntax highlighting
- Execute the query to see results in a structured table
- Query results for `SELECT`, `SHOW`, `DESCRIBE`, and `EXPLAIN` statements are returned as rows
- `INSERT`, `UPDATE`, and `DELETE` statements return the number of affected rows
- You can override the default database for a specific query

### SQL Analysis

OpsKat uses **TiDB Parser** to analyze SQL statements before execution. This powers:

- **Statement classification** — Automatically identifies the statement type (SELECT, INSERT, UPDATE, DELETE, DROP, TRUNCATE, etc.)
- **Dangerous pattern detection** — Flags risky operations such as:
  - `DELETE` or `UPDATE` without a `WHERE` clause
  - `PREPARE` statements
  - `CALL` statements
- **Policy enforcement** — Statement types and flags are checked against the asset's [query policy](/docs/guide/policy) before execution

## Result Tables

Query results are displayed in a tabular format:

- Column headers match the query's output columns
- Rows are rendered with appropriate formatting
- Large result sets are handled efficiently

## Redis Command Execution

### Connecting

Select a Redis asset and open the **Query** tab. Like databases, Redis connections can be tunneled through an SSH asset.

### Executing Commands

Type Redis commands directly in the editor:

```
GET mykey
HGETALL user:1
SET session:abc token123 EX 3600
KEYS user:*
INFO server
```

Results are displayed in a structured format appropriate for the command's return type (string, list, hash, set, etc.).

### Redis Key Browser

The key browser provides a visual interface for exploring Redis data:

- Browse keys with pattern matching (`SCAN`-based)
- View key values, types, and TTL
- Inspect complex data structures (hashes, lists, sets, sorted sets)

## Policy Enforcement

All queries and commands executed through the Query Editor are subject to the same [policy rules](/docs/guide/policy) as AI Agent operations:

- **SQL** — Checked against the asset's query policy (allowed/denied statement types, dangerous pattern flags)
- **Redis** — Checked against the asset's Redis policy (allowed/denied command patterns)

If a query or command is denied by policy, it will not be executed. If it requires confirmation, you will be prompted before execution.
