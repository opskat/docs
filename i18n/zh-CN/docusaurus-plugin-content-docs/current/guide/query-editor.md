---
sidebar_position: 4
sidebar_label: 查询编辑器
---

# 查询编辑器

OpsKat 内置查询编辑器，用于在 MySQL/PostgreSQL 数据库上执行 SQL，以及在 Redis 实例上执行命令。数据库连接可以通过 SSH 隧道进行安全访问。

## SQL 编辑器

### 连接

从侧边栏选择数据库资产并打开 **查询** 标签页。如果数据库资产配置了 SSH 隧道，OpsKat 会先建立 SSH 连接，再通过隧道连接数据库。

### 编写和执行查询

- 在编辑器中编写 SQL，支持语法高亮
- 执行查询后在结构化表格中查看结果
- `SELECT`、`SHOW`、`DESCRIBE` 和 `EXPLAIN` 语句以行的形式返回结果
- `INSERT`、`UPDATE` 和 `DELETE` 语句返回受影响的行数
- 可以为特定查询覆盖默认数据库

### SQL 分析

OpsKat 使用 **TiDB Parser** 在执行前分析 SQL 语句。这提供了以下能力：

- **语句分类** — 自动识别语句类型（SELECT、INSERT、UPDATE、DELETE、DROP、TRUNCATE 等）
- **危险模式检测** — 标记高风险操作，例如：
  - 不带 `WHERE` 子句的 `DELETE` 或 `UPDATE`
  - `PREPARE` 语句
  - `CALL` 语句
- **策略执行** — 语句类型和标记会在执行前与资产的[查询策略](/docs/guide/policy)进行比对

## 结果表格

查询结果以表格形式展示：

- 列标题与查询输出的列名对应
- 行数据以合适的格式渲染
- 高效处理大结果集

## Redis 命令执行

### 连接

选择 Redis 资产并打开 **查询** 标签页。与数据库类似，Redis 连接也可以通过 SSH 资产进行隧道连接。

### 执行命令

在编辑器中直接输入 Redis 命令：

```
GET mykey
HGETALL user:1
SET session:abc token123 EX 3600
KEYS user:*
INFO server
```

结果会根据命令返回类型（字符串、列表、哈希、集合等）以相应的结构化格式展示。

### Redis 键浏览器

键浏览器提供了可视化界面来浏览 Redis 数据：

- 使用模式匹配（基于 `SCAN`）浏览键
- 查看键的值、类型和 TTL
- 查看复杂数据结构（哈希、列表、集合、有序集合）

## 策略执行

通过查询编辑器执行的所有查询和命令都与 AI 智能体操作遵循相同的[策略规则](/docs/guide/policy)：

- **SQL** — 根据资产的查询策略检查（允许/拒绝的语句类型、危险模式标记）
- **Redis** — 根据资产的 Redis 策略检查（允许/拒绝的命令模式）

如果查询或命令被策略拒绝，将不会执行。如果需要确认，执行前会提示你进行审批。
