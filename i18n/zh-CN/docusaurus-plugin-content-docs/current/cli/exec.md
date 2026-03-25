---
sidebar_position: 2
sidebar_label: exec
---

# opsctl exec

在远程服务器上执行命令。

## 用法

```bash
opsctl exec <资产> -- <命令> [参数...]
```

## 示例

```bash
# 检查 nginx 配置
opsctl exec prod-web-1 -- nginx -t

# 重启服务
opsctl exec prod-web-1 -- systemctl restart nginx
```

## 选项

即将推出。
