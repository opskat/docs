---
sidebar_position: 2
sidebar_label: Building
---

# Building from Source

## Prerequisites

- **Go 1.25+** (see `go.mod` for exact version)
- **Node.js 22+** with **pnpm 10+**
- **Wails v2** CLI (`go install github.com/wailsapp/wails/v2/cmd/wails@latest`)
- **golangci-lint** (for linting)
- **mockgen** from `go.uber.org/mock` (for generating mocks)
- **UPX** (optional, for compressed builds)
- **Git**

## Make Commands

All commands are run from the project root (`opskat/`).

### Desktop App

| Command | Description |
|---|---|
| `make dev` | Wails dev mode with frontend + backend hot reload |
| `make build` | Production build (without embedded opsctl) |
| `make build-embed` | Production build with embedded opsctl binary |
| `make build-upx` | Production build with UPX compression (requires `upx`) |
| `make run` | Build with embedded opsctl and run the app |
| `make install` | Install frontend dependencies (`pnpm install`) |
| `make clean` | Clean build artifacts (`build/bin`, `frontend/dist`, embedded binary, coverage files) |

### opsctl CLI

| Command | Description |
|---|---|
| `make build-cli` | Build CLI to `./build/bin/opsctl` |
| `make build-cli-upx` | Build CLI with UPX compression |
| `make install-cli` | Install CLI to `$GOPATH/bin` |
| `make install-skill` | Install Claude Code skill (symlink to `~/.claude/skills/opsctl`) |

### Quality

| Command | Description |
|---|---|
| `make lint` | Go lint with `golangci-lint` (10 minute timeout, matches CI) |
| `make lint-fix` | Go lint with auto-fix |
| `make test` | Run all Go tests (`./internal/...` and `./cmd/opsctl/...`) |
| `make test-cover` | Run tests with coverage report, opens `coverage.html` in browser |

## Frontend Development

Frontend source is in `frontend/`. All commands run from that directory.

```bash
cd frontend

pnpm install          # Install dependencies
pnpm run dev          # Vite dev server (for standalone frontend development)
pnpm run build        # Type check (tsc -b) + Vite build
pnpm run lint         # ESLint
pnpm run lint:fix     # ESLint with auto-fix
pnpm run preview      # Preview production build
```

For full-stack development with hot reload on both frontend and backend, use `make dev` from the project root instead.

### Frontend Tech Stack

- Vite 6 (build tool)
- TypeScript 5 (strict mode via `tsc -b`)
- React 19
- Tailwind CSS 4
- ESLint 10 + Prettier

## Backend Testing

Run all tests (matches what CI runs):

```bash
go test ./internal/... ./cmd/opsctl/...
```

Run a single package:

```bash
go test -v ./internal/ai/...
```

Run with coverage:

```bash
make test-cover
```

### Testing Frameworks

- **GoConvey** -- BDD-style nested test structure
- **testify** -- Assertions
- **go.uber.org/mock** -- Interface mocking with `mockgen`

## Generating Wails TypeScript Bindings

After changing public methods on the `App` struct in `app.go`, regenerate the TypeScript bindings that the frontend calls:

```bash
wails generate module
```

This updates the generated files under `frontend/src/wailsjs/go/main/App`.

## Generating Mocks

After changing repository interfaces, regenerate mocks with `mockgen`:

```bash
mockgen -source=internal/repository/asset_repo/asset.go \
  -destination=internal/repository/asset_repo/mock_asset_repo/asset.go \
  -package=mock_asset_repo
```

Follow the same pattern for other repository interfaces.

## CI Pipeline

GitHub Actions (`.github/workflows/ci.yml`) runs on all pull requests and pushes to `main` and `develop/*` branches.

### Jobs

**1. Go Lint**

Runs `golangci-lint` with gofmt/goimports formatters. Creates a placeholder `frontend/dist` directory since Wails expects it.

```yaml
- uses: golangci/golangci-lint-action@v9
  with:
    version: latest
```

**2. Go Test**

```bash
go test ./internal/... ./cmd/opsctl/...
```

**3. Frontend Check**

Runs lint + type check + build with frozen lockfile:

```bash
cd frontend && pnpm install --frozen-lockfile
cd frontend && pnpm run lint
cd frontend && pnpm run build
```

### Concurrency

CI uses concurrency groups (`ci-${{ github.ref }}`) with `cancel-in-progress: true`, so pushing new commits cancels the previous run for the same branch.

## Build Outputs

| Platform | Desktop App Path |
|---|---|
| macOS | `./build/bin/opskat.app/Contents/MacOS/opskat` |
| Linux | `./build/bin/opskat` |
| Windows | `./build/bin/opskat.exe` |

The opsctl CLI always builds to `./build/bin/opsctl`.

## Version Configuration

The build version defaults to `1.0.0` and can be overridden:

```bash
make build VERSION=2.0.0
```

Version is injected via ldflags into `github.com/cago-frame/cago/configs.Version`.
