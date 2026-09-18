## Database

项目使用 Prisma 连接 MySQL。先复制 `.env.example` 为 `.env`，按本机数据库修改 `DATABASE_URL`。

首次创建或更新数据库表结构：

```bash
npm run prisma:migrate -- --name init
```

只重新生成 Prisma Client：

```bash
npm run prisma:generate
```