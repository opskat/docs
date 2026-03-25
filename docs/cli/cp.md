---
sidebar_position: 4
sidebar_label: cp
---

# opsctl cp

Transfer files between local and remote hosts, or directly between two remote hosts.

## Syntax

```bash
opsctl [global-flags] cp <source> <destination>
```

## Path Format

| Format | Description |
|--------|-------------|
| `/path/to/file` or `./relative/path` | Local path |
| `<asset>:<remote-path>` | Remote path (asset name or ID) |

At least one of source or destination must be a remote path. Remote paths must start with `/`.

## Transfer Modes

| Mode | Description |
|------|-------------|
| **Local to Remote** | Upload a file to a remote server via SFTP |
| **Remote to Local** | Download a file from a remote server via SFTP |
| **Remote to Remote** | Stream a file directly between two assets (no local disk involved) |

## Approval

File transfer requires desktop app approval. A session is auto-created if not specified.

## Examples

```bash
# Upload a file by asset name
opsctl cp ./config.yml web-server:/etc/app/config.yml

# Download a file by asset ID
opsctl cp 1:/var/log/app.log ./app.log

# Transfer directly between two remote servers
opsctl cp 1:/etc/hosts 2:/tmp/hosts

# Upload using group/name disambiguation
opsctl cp ./deploy.sh production/web-01:/opt/scripts/deploy.sh

# Use with an explicit session
opsctl --session $ID cp ./app.tar.gz web-server:/opt/releases/
```
