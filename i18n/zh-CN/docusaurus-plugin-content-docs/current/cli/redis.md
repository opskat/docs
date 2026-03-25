---
sidebar_position: 6
sidebar_label: redis
---

# opsctl redis

对 Redis 实例执行 Redis 命令。

## 用法

```bash
opsctl redis <资产> "<命令>"
```

## 示例

```bash
# 获取键值
opsctl redis prod-redis "GET session:abc123"

# 按模式列出键
opsctl redis prod-redis "KEYS user:*"
```

## 选项

即将推出。
