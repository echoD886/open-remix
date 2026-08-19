# OpenRemix

[English](./README.md) | [中文版](./README.zh-CN.md)

**用 AI 将产品图片转化为营销素材**

OpenRemix 是一个开源的 AI 驱动平台，帮助企业从简单的产品图片创建专业的产品照片、广告变体和产品视频。基于现代 Web 技术构建，专为可扩展性设计。

🌐 **在线演示**: [openremix.app](https://openremix.app)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-red)](https://tanstack.com/start)

---

## 🎯 OpenRemix 解决什么问题？

电商企业和营销人员面临诸多挑战：

- **专业产品摄影成本高昂**（每次拍摄 $100-500+）
- **手工照片编辑和抠图耗时**
- **创建 A/B 测试的广告变体创意有限**
- **缺乏社交媒体和广告所需的视频内容**
- **跨营销渠道的品牌呈现不一致**

OpenRemix 通过以下方式解决这些问题：

✅ **用 AI 在几秒钟内生成专业产品照片**，而非数小时  
✅ **创建无限广告变体**，测试不同背景、风格和场景  
✅ **从静态图片生成产品视频**，用于社交媒体  
✅ **在所有生成素材中保持一致的质量**  
✅ **与传统摄影相比降低 90%+ 的成本**  

---

## ✨ 核心功能

### 🖼️ AI 产品照片生成
- **智能背景移除**和替换
- **多种风格预设**：简约、奢华、生活方式、工作室等
- **自定义提示词**，完全创意控制
- **批量处理**，一次生成多个变体

### 🎬 产品视频创作
- **AI 驱动的视频生成**，从静态产品图片生成
- **动态效果**和动态相机运动
- **社交媒体和广告的导出格式**

### 🎨 高级定制
- **16 个专业主题**，即时预览
- **自定义宽高比**（1:1, 4:5, 16:9, 9:16）
- **质量控制**，分辨率和风格强度设置
- **品牌一致性**，通过保存的风格模板

### 💳 灵活的商业化
- **基于积分的系统**，FIFO 消费
- **订阅计划**（入门版、专业版、企业版）
- **一次性购买积分**，适合偶尔使用的用户
- **Stripe 集成**，支持 webhook
- **可扩展的支付提供商**（Stripe、PayPal、Creem 就绪）

### 🔐 企业级
- **多租户架构**，基于角色的访问控制（RBAC）
- **API 密钥管理**，程序化访问
- **审计日志**和使用跟踪
- **邮箱验证**和密码重置流程
- **Google One-Tap** 和 OAuth 支持

### 🌍 国际化支持
- **内置 17 种语言**（英语、中文、日语、韩语、西班牙语、法语、德语、葡萄牙语、意大利语、俄语、阿拉伯语、印尼语、泰语、越南语、土耳其语）
- **Paraglide JS i18n**，编译时优化
- **SEO 优化**的多语言路由
- **RTL 支持**（阿拉伯语）

---

## 🏗️ 架构与技术栈

### 前端
- **[TanStack Start](https://tanstack.com/start)** - React 19 元框架，基于文件的路由
- **[TanStack Query](https://tanstack.com/query)** - 强大的异步状态管理
- **[TanStack Form](https://tanstack.com/form)** - 类型安全的表单处理，Zod 验证
- **[shadcn/ui v4](https://ui.shadcn.com/)** - 美观易用的组件（Base Nova 风格）
- **[Tailwind CSS 4](https://tailwindcss.com/)** - 实用优先的样式，OKLCH 颜色
- **Vite 8** - 极速构建工具

### 后端
- **[Nitro](https://nitro.unjs.io/)** - 通用服务器引擎
- **[better-auth](https://www.better-auth.com/)** - 现代认证，Drizzle 适配器
- **[Drizzle ORM](https://orm.drizzle.team/)** - 类型安全的 SQL，多数据库支持

### 数据库支持
- ✅ **SQLite**（默认，零配置）
- ✅ **PostgreSQL**（生产环境推荐）
- ✅ **MySQL**
- ✅ **Turso**（边缘 SQLite）
- ✅ **Cloudflare D1**（serverless SQLite）

### AI 与媒体处理
- **支持多个 AI 提供商**：
  - [Replicate](https://replicate.com/) - 图像生成模型
  - [Fal.ai](https://fal.ai/) - 快速推理
  - [Gemini](https://ai.google.dev/) - Google 多模态 AI
  - 通过 `AIManager` 自定义提供商集成
- **Cloudflare R2** 可扩展的媒体存储
- **S3 兼容**存储抽象

### 基础设施
- **Cloudflare Workers** 部署就绪
- **Supabase PostgreSQL** + Hyperdrive 生产环境
- **边缘就绪**，最小冷启动
- **Docker 支持**

---

## 🚀 快速开始

### 前置要求

- **Node.js** 20+ 和 **pnpm** 9+
- 数据库（SQLite 开箱即用，或生产环境使用 PostgreSQL/MySQL）
- （可选）AI 提供商 API 密钥用于图像生成

### 安装

```bash
# 克隆仓库
git clone https://github.com/echoD886/open-remix.git
cd open-remix

# 安装依赖
pnpm install

# 设置环境变量
cp .env.example .env.development

# 在 .env.development 中配置数据库和密钥：
# - DATABASE_PROVIDER=sqlite (或 postgres/mysql)
# - DATABASE_URL=file:data/local.db
# - AUTH_SECRET= (生成: openssl rand -base64 32)
# - VITE_APP_URL=http://localhost:3000

# 创建数据库表
pnpm db:push

# 启动开发服务器
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 🎉

### 首次管理员设置

1. 使用邮箱注册
2. 打开数据库，手动将你的用户设置 `role = 'admin'`
3. 导航到 `/admin` 配置 AI 提供商和支付设置

---

## 📖 文档

### 项目结构

```
src/
├── core/                # 基础设施层（跨项目可复用）
│   ├── auth/            # better-auth + RBAC
│   ├── db/              # 多数据库连接池
│   ├── payment/         # 支付提供商抽象
│   ├── email/           # 邮件提供商抽象
│   ├── storage/         # S3/R2 存储抽象
│   ├── ai/              # AI 提供商抽象
│   └── i18n/            # 区域感知导航
│
├── modules/             # 业务逻辑（可独立删除）
│   ├── payment/         # 结账、webhook、订单管理
│   ├── subscriptions/   # 订阅生命周期
│   ├── credits/         # FIFO 积分消费
│   ├── apikeys/         # API 密钥 CRUD + 验证
│   ├── rbac/            # 权限检查
│   └── ai-tasks/        # AI 生成跟踪
│
├── routes/              # 基于文件的路由（页面 + API）
│   ├── index.tsx        # 主页
│   ├── (auth)/          # 登录、注册流程
│   ├── settings/        # 用户仪表板
│   ├── admin/           # 管理面板
│   └── api/             # REST 端点
│
├── blocks/              # 零配置页面片段（读取 i18n）
├── components/          # 可复用 UI（内容通过 props）
├── hooks/               # 共享 React Query hooks
└── lib/                 # 工具函数（api-client, hash, cache 等）
```

### 数据库模式

21 个表涵盖认证、支付、订阅、积分、RBAC、AI 任务等。

**关键表：**
- `user`, `session`, `account`, `verification` (认证)
- `order`, `subscription`, `credit` (支付)
- `role`, `permission`, `rolePermission`, `userRole` (RBAC)
- `apikey` (API 访问)
- `aiTask`, `chat`, `chatMessage` (AI)
- `config` (加密设置)

**模式管理：**
- 开发环境：`pnpm db:push`（快速，可能丢失数据）
- 生产环境：`pnpm db:generate` → 审查 SQL → `pnpm db:migrate`

### 环境变量

所有配置通过 `.env.development`（本地）或 Cloudflare secrets（生产）。

**必需：**
```env
VITE_APP_URL=https://openremix.app
VITE_APP_NAME=OpenRemix
DATABASE_PROVIDER=sqlite
DATABASE_URL=file:data/local.db
AUTH_SECRET=<用-openssl-生成>
```

**提供商凭据**（Stripe、OAuth、AI 密钥）在**管理面板** → 设置中管理，设置 `CONFIG_ENCRYPTION_KEY` 后加密存储在数据库中。

---

## 🎨 定制

### 添加新功能

1. **数据库**：在 `src/config/db/schema.ts` 添加表，运行 `pnpm db:push`
2. **服务**：创建 `src/modules/<feature>/service.ts`（纯业务逻辑）
3. **API**：创建 `src/routes/api/<feature>.ts`（轻量 REST 包装）
4. **UI**：创建 `src/routes/settings/<feature>.tsx`（或 `admin/<feature>.tsx`）
5. **i18n**：在 `messages/en.json` 和 `messages/zh.json` 添加键
6. **导航**：更新布局 `route.tsx` 中的导航数组

### 样式与主题

- **主题颜色**：编辑 `src/styles/globals.css`（OKLCH CSS 变量）
- **添加组件**：`npx shadcn add <component>`
- **字体**：在 `src/routes/__root.tsx` 配置

### i18n（国际化）

- **添加翻译**：编辑 `messages/{en,zh,...}.json`，使用扁平点分键
- **组件中使用**：`import { m } from '@/paraglide/messages.js'; m['key.name']()`
- **添加语言**：更新 `project.inlang/settings.json` 的 locales，创建新的消息文件

---

## 🚢 部署

### Cloudflare Workers（推荐）

```bash
# 安装 Wrangler CLI
pnpm add -g wrangler

# 设置 Hyperdrive（用于 PostgreSQL）
wrangler hyperdrive create openremix-db --connection-string="postgresql://..."

# 在 wrangler.jsonc 配置 Hyperdrive 绑定

# 部署
pnpm cf:deploy
```

### Docker

```bash
docker build -t openremix .
docker run -p 3000:3000 --env-file .env.production openremix
```

### 传统 VPS

```bash
pnpm build
node .output/server/index.mjs
```

---

## 🤝 贡献

我们欢迎贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解指南。

### 开发工作流

1. Fork 仓库
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 修改并测试：`pnpm dev` + `pnpm build`
4. 清晰的提交信息：`git commit -m 'feat: add amazing feature'`
5. 推送并创建 Pull Request

### 代码风格

- **TypeScript strict 模式**强制执行
- **ESLint** + **Prettier**（运行 `pnpm lint` 和 `pnpm format`）
- 遵循 `src/modules/` 和 `src/routes/` 中的现有模式

---

## 🐛 安全

发现安全漏洞？请发送邮件至 **security@openremix.app**，而不是开启公开 issue。

查看 [SECURITY.md](./SECURITY.md) 了解我们的安全策略。

---

## 📊 性能

- **Lighthouse 评分**：95+（性能、可访问性、最佳实践、SEO）
- **冷启动**：Cloudflare Workers 上 <50ms
- **构建大小**：~200KB gzip 压缩 JavaScript
- **图片**：WebP 懒加载 + 响应式 srcsets

---

## 🗺️ 路线图

- [ ] **更多 AI 提供商**：Stable Diffusion、Midjourney 集成
- [ ] **视频编辑**：裁剪、修剪、添加文本叠加
- [ ] **批量 API**：程序化处理数百张图片
- [ ] **Zapier/Make 集成**：无代码自动化
- [ ] **白标模式**：为代理商定制品牌
- [ ] **分析仪表板**：跟踪生成使用和 ROI

---

## 📄 许可证

本项目采用 **MIT 许可证** - 详见 [LICENSE](./LICENSE)。

您可以自由使用、修改和分发此软件，用于商业或非商业目的。

---

## 🙏 致谢

使用出色的开源技术构建：

- [TanStack](https://tanstack.com/) - Router、Query、Form、Table
- [shadcn/ui](https://ui.shadcn.com/) - 组件库
- [better-auth](https://www.better-auth.com/) - 认证
- [Drizzle ORM](https://orm.drizzle.team/) - 数据库工具包
- [Cloudflare](https://www.cloudflare.com/) - 边缘基础设施

---

## 💬 社区与支持

- **网站**：[openremix.app](https://openremix.app)
- **GitHub Issues**：[报告 bug 或请求功能](https://github.com/echoD886/open-remix/issues)
- **邮箱**：support@openremix.app

---

**OpenRemix 团队用 ❤️ 制作**

如果这个项目对您的业务有帮助，请考虑在 GitHub 上给它一个 ⭐！
