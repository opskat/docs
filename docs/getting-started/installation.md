---
sidebar_position: 1
sidebar_label: Installation
---

# Installation

OpsKat runs on macOS, Linux, and Windows. You can download a pre-built binary or build from source.

## Prerequisites

Building from source requires:

| Dependency | Version | Purpose |
|---|---|---|
| [Go](https://go.dev/) | 1.25+ | Backend |
| [Node.js](https://nodejs.org/) | 22+ | Frontend build |
| [pnpm](https://pnpm.io/) | latest | Frontend package manager |
| [Wails v2 CLI](https://wails.io/docs/gettingstarted/installation) | v2 | Desktop app framework |

Install the Wails CLI after Go is set up:

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

## Download Pre-built Binaries

Pre-built binaries for macOS, Linux, and Windows will be available on the [GitHub Releases](https://github.com/nicoxiang/opskat/releases) page.

## Building from Source

Clone the repository and build:

```bash
git clone https://github.com/nicoxiang/opskat.git
cd opskat
make install       # Install frontend dependencies (pnpm install)
make build         # Production build (desktop app only)
```

To build with the embedded `opsctl` CLI (recommended for full functionality):

```bash
make build-embed   # Production build with embedded opsctl binary
```

The built application will be in the `build/bin/` directory.

### Build Targets

| Command | Description |
|---|---|
| `make install` | Install frontend dependencies |
| `make dev` | Development mode with hot reload |
| `make build` | Production build (without opsctl) |
| `make build-embed` | Production build with embedded opsctl |
| `make build-cli` | Build the opsctl CLI only |
| `make install-cli` | Install opsctl to `$GOPATH/bin` |

### Development Mode

For development with hot reload on both frontend and backend:

```bash
make dev
```

## Platform Support

OpsKat supports all three major desktop platforms:

- **macOS** (Intel and Apple Silicon)
- **Linux** (x86_64)
- **Windows** (x86_64)

## App Data Directory

OpsKat stores its database (`opskat.db`), configuration, and logs in a platform-specific directory:

| Platform | Path |
|---|---|
| macOS | `~/Library/Application Support/opskat` |
| Windows | `%APPDATA%/opskat` |
| Linux | `~/.config/opskat` |

The `opsctl` CLI uses the same data directory by default, but you can override it with the `--data-dir` flag.

## Installing opsctl

The `opsctl` CLI tool can be installed in two ways:

1. **From the desktop app** — One-click install from the Settings page. The embedded binary is extracted to `~/.local/bin/` (Linux/macOS) or `%LOCALAPPDATA%/opsctl` (Windows).
2. **From source** — Run `make install-cli` to build and install to `$GOPATH/bin`.

Verify the installation:

```bash
opsctl --help
```
