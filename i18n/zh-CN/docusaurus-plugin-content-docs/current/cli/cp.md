---
sidebar_position: 4
sidebar_label: cp
---

# opsctl cp

在本地和远程主机之间，或两台远程主机之间传输文件。

## 用法

```bash
opsctl cp <源> <目标>
```

## 示例

```bash
# 上传文件
opsctl cp ./app.tar.gz prod-web-1:/opt/

# 下载文件
opsctl cp prod-web-1:/var/log/app.log ./

# 跨服务器传输
opsctl cp staging-app:/opt/app.tar.gz prod-web-1:/opt/
```

## 选项

即将推出。
