---
sidebar_position: 3
sidebar_label: Contributing
---

# Contributing

## Code Conventions

### Commit Messages

- Write commit messages in **Chinese**.
- Never add `Co-Authored-By: Claude` to commit messages.

### Error Handling

- Never ignore errors silently (no `_ =` for errors).
- Use the cago zap logger, not the standard `log` package:

```go
import (
    "github.com/cago-frame/cago/pkg/logger"
    "go.uber.org/zap"
)

logger.Default().Warn("something happened", zap.Error(err))
logger.Default().Error("operation failed", zap.Error(err))
```

### Error Codes

Error codes with i18n support live in `internal/pkg/code/`. Both zh-CN and en are supported.

### Soft Delete

Assets use `Status = StatusDeleted` instead of hard delete. Never hard-delete asset records.

### IME Compatibility

The `Input` component has built-in IME protection -- it automatically blocks Enter `onKeyDown` during Chinese composition input. For non-Input components (e.g., `<textarea>`), use the `useIMEComposing` hook from `@/hooks/useIMEComposing`.

## Testing Patterns

### Frameworks

- **GoConvey** -- BDD-style nesting for test structure
- **testify** -- Assertions
- **go.uber.org/mock** -- Mock generation and injection

### Approach

Follow **TDD** (Test-Driven Development): write tests first, then implement.

- **Entity tests**: Pure unit tests, no dependencies.
- **Service tests**: Use mock repositories.

### Mock Injection

Repositories use a `Register` pattern for dependency injection. In tests, register a mock and restore via `t.Cleanup`:

```go
func setupTest(t *testing.T) (context.Context, *mock_asset_repo.MockAssetRepo) {
    mockCtrl := gomock.NewController(t)
    t.Cleanup(func() { mockCtrl.Finish() })
    mockRepo := mock_asset_repo.NewMockAssetRepo(mockCtrl)
    asset_repo.RegisterAsset(mockRepo)
    return context.Background(), mockRepo
}
```

### Running Tests

```bash
# All tests (matches CI)
go test ./internal/... ./cmd/opsctl/...

# Single package with verbose output
go test -v ./internal/ai/...

# With coverage report
make test-cover
```

## i18n Conventions

### Frontend (i18next)

All user-facing text uses i18next keys via `react-i18next`. Translation files are in `frontend/src/i18n/`. Supports zh-CN and en.

### Backend (cago i18n)

Error codes in `internal/pkg/code/` use cago's i18n system. Backend methods use `a.langCtx()` to set the language context based on the frontend's language setting, so error messages are returned in the correct language.

## Project Structure

```
opskat/
├── main.go                     # Wails app entry point
├── app.go                      # Wails App struct (bindings layer)
├── cmd/opsctl/                 # opsctl CLI entry point
├── internal/
│   ├── ai/                     # AI agent (providers, tools, policies, audit)
│   ├── app/                    # App-level helpers
│   ├── approval/               # Unix socket approval protocol for opsctl
│   ├── bootstrap/              # Shared init (DB, repos, credentials, migrations)
│   ├── connpool/               # DB/Redis connection pooling with SSH tunnel
│   ├── embedded/               # Embedded opsctl binary (for desktop app)
│   ├── model/entity/           # Rich domain entities with business logic
│   ├── pkg/code/               # Error codes with i18n
│   ├── repository/             # Data access interfaces + implementations
│   ├── service/                # Business logic services
│   ├── sshpool/                # SSH connection pool + Unix socket server
│   └── wailsapp/               # Wails app configuration
├── migrations/                 # gormigrate database migrations
├── frontend/
│   └── src/
│       ├── components/         # React components
│       ├── stores/             # Zustand state stores
│       ├── hooks/              # Custom React hooks
│       ├── i18n/               # i18next translations
│       ├── lib/                # Utility functions
│       └── wailsjs/            # Generated Wails TypeScript bindings
└── skill/                      # Claude Code skill definitions
```

## How to Add a New Asset Type

1. **Define the entity**: Add a new config struct and type constant in `internal/model/entity/`. Add `Get<Type>Config()` / `Set<Type>Config()` methods on the asset entity.

2. **Add repository support**: Ensure the asset repository can persist and query the new type.

3. **Add service logic**: Create or extend a service in `internal/service/` for type-specific operations (connection testing, command execution, etc.).

4. **Add connection pooling** (if needed): Add a new connection factory in `internal/connpool/` with optional SSH tunnel support.

5. **Add AI tool support**: Register new tool handlers in `internal/ai/tool_registry.go` and add a policy type if the asset supports command execution.

6. **Add policy support**: Create a new policy file (e.g., `<type>_policy.go`) in `internal/ai/` implementing allow/deny list evaluation. Add built-in policy groups in `internal/service/policy_group_svc/`.

7. **Frontend**: Add UI components for the new asset type's configuration, connection panel, and query interface. Add corresponding Zustand store state if needed.

8. **Migrations**: Add a gormigrate migration in `migrations/migrations.go` if schema changes are needed.

## How to Add a New AI Tool

1. **Define the tool**: Add a `ToolDef` entry in `internal/ai/tool_registry.go` via `AllToolDefs()`. Each tool has a name, description, input schema, and handler function.

2. **Implement the handler**: The handler receives parsed input and returns a result string. Use existing helpers:
   - `ssh_helper.go` for SSH operations (`ExecWithStdio`, `CopyBetweenAssets`)
   - `database_helper.go` for SQL execution via connpool
   - `redis_helper.go` for Redis command execution via connpool

3. **Add policy checks** (if the tool executes commands): Call `CheckPermission()` from `permission.go` which routes to the appropriate policy checker by asset type. Handle the three possible decisions: `Allow`, `Deny`, `NeedConfirm`.

4. **Audit logging**: If you use `AuditingExecutor` (the default wrapper), audit logging is automatic. For custom flows, call `WriteAuditLog()` directly.

5. **Connection caching**: Use `SSHClientCache` or `ConnCache[C]` to reuse connections within a conversation, rather than creating new connections per tool call.

6. **Share with opsctl**: Tools defined in `AllToolDefs()` are automatically available to both the AI agent and opsctl.
