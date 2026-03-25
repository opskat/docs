---
sidebar_position: 7
sidebar_label: grant
---

# opsctl grant

请求和管理 opsctl 命令的预审批授权。授权允许匹配特定模式的命令无需逐条审批即可执行。

## 用法

```bash
opsctl grant <子命令> [选项]
```

## 示例

```bash
# 请求 nginx 操作授权
opsctl grant request --asset prod-web-1 --pattern "nginx *"

# 列出活跃授权
opsctl grant list
```

## 选项

即将推出。
