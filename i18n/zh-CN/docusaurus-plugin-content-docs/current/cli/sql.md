---
sidebar_position: 5
sidebar_label: sql
---

# opsctl sql

通过 SSH 隧道对 MySQL 或 PostgreSQL 数据库执行 SQL 查询。

## 用法

```bash
opsctl sql <资产> "<查询>"
```

## 示例

```bash
# 统计用户数
opsctl sql prod-mysql "SELECT count(*) FROM users"

# 查看表结构
opsctl sql prod-mysql "DESCRIBE orders"
```

## 选项

即将推出。
