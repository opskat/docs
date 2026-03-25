---
sidebar_position: 6
sidebar_label: redis
---

# opsctl redis

Execute Redis commands against a Redis asset. Redis connections are tunneled through SSH when the asset is configured with an SSH tunnel.

## Syntax

```bash
opsctl [global-flags] redis <asset> "<command>"
```

## Arguments

| Argument | Description |
|----------|-------------|
| `asset` | Redis asset name or numeric ID |
| `command` | Redis command to execute (e.g., `GET mykey`, `HGETALL user:1`) |

## Approval

Commands are checked against the asset's Redis policy:

- **Allowed commands** execute without approval
- **Dangerous commands** (e.g., `FLUSHDB`, `CONFIG SET`) are rejected by default
- Other commands require user confirmation via the desktop app
- When the desktop app is offline, only commands matching the allow-list policy are permitted

## Examples

```bash
# Get a key value
opsctl redis cache "GET session:abc123"

# Get all fields from a hash
opsctl redis cache "HGETALL user:1"

# Set a key with expiration
opsctl redis cache "SET key value EX 3600"

# List keys by pattern
opsctl redis cache "KEYS user:*"

# Use with an explicit session
opsctl --session $ID redis cache "DEL temp:*"
```
