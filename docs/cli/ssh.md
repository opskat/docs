---
sidebar_position: 3
sidebar_label: ssh
---

# opsctl ssh

Open an interactive SSH terminal session to a remote server.

## Syntax

```bash
opsctl ssh <asset>
```

## Arguments

| Argument | Description |
|----------|-------------|
| `asset` | Asset name or numeric ID. Use `group/name` to disambiguate. |

## Behavior

- Opens a full interactive shell session with PTY allocation (`xterm-256color`)
- Terminal window resizes are automatically forwarded to the remote session
- Does **not** require desktop app approval (intended for human interactive use)
- When the desktop app is running, the session reuses its SSH connection pool
- When the desktop app is not running, a direct SSH connection is established
- The remote shell's exit code is propagated as `opsctl`'s exit code

## Examples

```bash
# Connect by asset name
opsctl ssh web-server

# Connect by asset ID
opsctl ssh 1

# Disambiguate by group/name
opsctl ssh production/web-01
```
