---
sidebar_position: 3
sidebar_label: ssh
---

# opsctl ssh

启动到远程服务器的交互式 SSH 会话。

## 用法

```bash
opsctl ssh <资产>
```

## 示例

```bash
# 连接到预发布应用服务器
opsctl ssh staging-app

# 使用端口转发连接
opsctl ssh prod-web-1 -L 8080:localhost:80
```

## 选项

即将推出。
