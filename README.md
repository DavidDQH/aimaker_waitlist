# AIMaker Waitlist

一个现代化的 AI 产品等待列表网站，使用 Next.js 和 PostgreSQL 构建。

## 功能特点

- 🎨 精美的深色主题 UI 设计
- ✨ 流畅的动画效果
- 📧 邮箱验证和去重
- 📊 实时显示等待列表人数
- 🗄️ PostgreSQL 数据库存储

## 技术栈

- **前端**: Next.js 14, React 18, Tailwind CSS
- **后端**: Next.js API Routes
- **数据库**: PostgreSQL + Prisma ORM

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置数据库

创建 `.env` 文件并添加你的 PostgreSQL 数据库连接字符串：

```env
DATABASE_URL="postgresql://username:password@localhost:5432/aimaker_waitlist?schema=public"
```

替换以下内容：
- `username`: 数据库用户名
- `password`: 数据库密码
- `localhost:5432`: 数据库地址和端口
- `aimaker_waitlist`: 数据库名称

### 3. 初始化数据库

运行 Prisma 迁移来创建数据库表：

```bash
npx prisma migrate dev --name init
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站。

## 数据库管理

### 查看数据库内容

```bash
npx prisma studio
```

### 重新生成 Prisma Client

```bash
npx prisma generate
```

## 部署

### Vercel 部署

1. 在 Vercel 上导入项目
2. 添加环境变量 `DATABASE_URL`（推荐使用 Vercel Postgres 或 Supabase）
3. 部署完成后运行迁移

## 项目结构

```
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts    # API 路由处理邮箱提交
│   ├── lib/
│   │   └── prisma.ts       # Prisma 客户端实例
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 根布局
│   └── page.tsx            # 首页组件
├── prisma/
│   └── schema.prisma       # 数据库模型定义
└── prisma.config.ts        # Prisma 配置
```

## License

MIT
