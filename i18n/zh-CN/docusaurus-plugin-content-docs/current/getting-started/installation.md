---
sidebar_position: 1
sidebar_label: 安装
---

# 安装

OpsKat 支持 macOS、Linux 和 Windows 系统。你可以下载预编译的二进制文件，也可以从源码构建。

## 前置依赖

从源码构建需要以下依赖：

| 依赖 | 版本 | 用途 |
|---|---|---|
| [Go](https://go.dev/) | 1.25+ | 后端 |
| [Node.js](https://nodejs.org/) | 22+ | 前端构建 |
| [pnpm](https://pnpm.io/) | 最新版 | 前端包管理器 |
| [Wails v2 CLI](https://wails.io/docs/gettingstarted/installation) | v2 | 桌面应用框架 |

安装好 Go 之后，安装 Wails CLI：

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

## 下载预编译二进制文件

macOS、Linux 和 Windows 的预编译二进制文件可在 [GitHub Releases](https://github.com/nicoxiang/opskat/releases) 页面下载。

## 从源码构建

克隆仓库并构建：

```bash
git clone https://github.com/nicoxiang/opskat.git
cd opskat
make install       # Install frontend dependencies (pnpm install)
make build         # Production build (desktop app only)
```

如需构建并内嵌 `opsctl` CLI（推荐，可获得完整功能）：

```bash
make build-embed   # Production build with embedded opsctl binary
```

构建完成的应用程序位于 `build/bin/` 目录中。

### 构建目标

| 命令 | 说明 |
|---|---|
| `make install` | 安装前端依赖 |
| `make dev` | 开发模式，支持热重载 |
| `make build` | 生产构建（不包含 opsctl） |
| `make build-embed` | 生产构建，内嵌 opsctl |
| `make build-cli` | 仅构建 opsctl CLI |
| `make install-cli` | 将 opsctl 安装到 `$GOPATH/bin` |

### 开发模式

前后端均支持热重载的开发模式：

```bash
make dev
```

## 平台支持

OpsKat 支持三大主流桌面平台：

- **macOS**（Intel 和 Apple Silicon）
- **Linux**（x86_64）
- **Windows**（x86_64）

## 应用数据目录

OpsKat 将数据库（`opskat.db`）、配置和日志存储在各平台对应的目录中：

| 平台 | 路径 |
|---|---|
| macOS | `~/Library/Application Support/opskat` |
| Windows | `%APPDATA%/opskat` |
| Linux | `~/.config/opskat` |

`opsctl` CLI 默认使用相同的数据目录，但你可以通过 `--data-dir` 参数覆盖。

## 安装 opsctl

`opsctl` CLI 工具有两种安装方式：

1. **通过桌面应用** — 在设置页面一键安装。内嵌的二进制文件会被提取到 `~/.local/bin/`（Linux/macOS）或 `%LOCALAPPDATA%/opsctl`（Windows）。
2. **从源码安装** — 运行 `make install-cli` 构建并安装到 `$GOPATH/bin`。

验证安装：

```bash
opsctl --help
```
