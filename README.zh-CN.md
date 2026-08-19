<div align="center">
  <img src="./public/logo.webp" alt="OpenRemix Logo" width="120" />
  
  # OpenRemix
  
  ### AI 驱动的产品照片和视频生成平台
  
  几秒钟内将普通产品图片转化为惊艳的营销素材
  
  [![在线演示](https://img.shields.io/badge/🌐_在线演示-openremix.app-blue?style=for-the-badge)](https://openremix.app)
  [![许可证: MIT](https://img.shields.io/badge/许可证-MIT-green.svg?style=for-the-badge)](./LICENSE)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  
  [English](./README.md) • [中文](#中文)
</div>

---

## 🎯 为什么选择 OpenRemix？

> **问题：** 电商企业每次产品拍摄花费 $100-500+，视频制作需要数周时间。手工编辑速度慢、成本高，无法规模化。

> **解决方案：** OpenRemix 使用 AI 从单张图片在几秒内生成无限量专业产品照片和视频——成本仅为传统方法的 10%。

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://img.shields.io/badge/成本-降低90%25-brightgreen?style=flat-square" /><br/>
        <strong>大幅降低摄影成本</strong><br/>
        $10 对比 $500 每次拍摄
      </td>
      <td align="center">
        <img src="https://img.shields.io/badge/速度-快10倍-blue?style=flat-square" /><br/>
        <strong>秒级生成</strong><br/>
        而非数小时或数天
      </td>
      <td align="center">
        <img src="https://img.shields.io/badge/规模-无限制-orange?style=flat-square" /><br/>
        <strong>无限变体</strong><br/>
        测试每个创意
      </td>
    </tr>
  </table>
</div>

---

## ✨ 核心功能

### 🎨 AI 产品摄影
- **智能抠图** - 一键对象隔离
- **16 个专业主题** - 简约、奢华、工作室、生活方式等
- **自定义提示词** - 用自然语言完全控制创意
- **批量生成** - 同时处理多个变体

### 🎬 产品视频创作
- **静态转视频** - 从照片生成吸引人的产品视频
- **动态运动** - 相机运动和产品动画
- **社交媒体就绪** - 针对 Instagram、TikTok、YouTube 优化

### 💼 企业级基础设施
- **多数据库支持** - SQLite、PostgreSQL、MySQL、Turso、Cloudflare D1
- **RBAC 与 API 密钥** - 细粒度访问控制
- **积分系统** - 灵活的按需付费或订阅
- **Stripe 集成** - 生产就绪的支付与 webhook

### 🌍 为全球规模而生
- **17 种语言** - 英语、中文、日语、韩语、西班牙语、法语、德语等
- **边缘就绪** - 部署到 Cloudflare Workers，冷启动 <50ms
- **类型安全** - 整个技术栈完全 TypeScript 严格模式

---

## 🚀 快速开始

### 前置要求
- Node.js 20+ 和 pnpm 9+
- 数据库（开发用 SQLite，生产推荐 PostgreSQL）
- 可选：AI 提供商 API 密钥（[Replicate](https://replicate.com)、[Fal.ai](https://fal.ai)、[Gemini](https://ai.google.dev)）

### 安装

```bash
# 克隆仓库
git clone https://github.com/echoD886/open-remix.git
cd open-remix

# 安装依赖
pnpm install

# 设置环境变量
cp .env.example .env.development

# 编辑 .env.development 配置：
#   DATABASE_PROVIDER=sqlite
#   DATABASE_URL=file:data/local.db
#   AUTH_SECRET= (生成: openssl rand -base64 32)
#   VITE_APP_URL=http://localhost:3000

# 初始化数据库
pnpm db:push

# 启动开发服务器
pnpm dev
```

访问 **http://localhost:3000** 🎉

### 管理员设置

1. 使用邮箱注册
2. 打开数据库，将你的用户设置为 `role = 'admin'`：
   ```sql
   -- SQLite
   UPDATE user SET role = 'admin' WHERE email = 'your@email.com';
   ```
3. 访问 `/admin` 并在设置中配置 AI 提供商

---

## 🏗️ 技术栈

<div align="center">
  <table>
    <tr>
      <td><strong>前端</strong></td>
      <td>
        <a href="https://tanstack.com/start">TanStack Start</a> • 
        <a href="https://react.dev">React 19</a> • 
        <a href="https://ui.shadcn.com">shadcn/ui v4</a> • 
        <a href="https://tailwindcss.com">Tailwind CSS 4</a>
      </td>
    </tr>
    <tr>
      <td><strong>后端</strong></td>
      <td>
        <a href="https://nitro.unjs.io">Nitro</a> • 
        <a href="https://www.better-auth.com">better-auth</a> • 
        <a href="https://orm.drizzle.team">Drizzle ORM</a>
      </td>
    </tr>
    <tr>
      <td><strong>数据库</strong></td>
      <td>
        SQLite • PostgreSQL • MySQL • Turso • Cloudflare D1
      </td>
    </tr>
    <tr>
      <td><strong>AI 提供商</strong></td>
      <td>
        Replicate • Fal.ai • Google Gemini • 自定义集成
      </td>
    </tr>
    <tr>
      <td><strong>部署</strong></td>
      <td>
        Cloudflare Workers • Vercel • Docker • VPS
      </td>
    </tr>
  </table>
</div>

---

## 📖 文档

### 项目结构

```
src/
├── core/              # 基础设施（认证、数据库、支付、AI、存储）
├── modules/           # 业务逻辑（支付、积分、订阅）
├── routes/            # 基于文件的路由（页面 + API 端点）
├── blocks/            # 带 i18n 的页面片段
├── components/        # 可复用 UI 组件
└── lib/               # 工具函数（api-client、缓存等）
```

### 核心概念

**模块化架构** - 每个模块都可以独立删除。不需要订阅功能？删除 `modules/subscriptions` 即可。

**数据库无关** - 通过一个环境变量（`DATABASE_PROVIDER`）切换数据库。所有方言使用相同 schema。

**Paraglide i18n** - 编译时翻译，支持 tree-shaking。零运行时开销。

**积分系统** - FIFO 消费，支持过期、订阅自动发放、退款撤销。

### 常用命令

```bash
pnpm dev              # 启动开发服务器
pnpm build            # 生产构建
pnpm db:push          # 同步 schema（开发 - 快速，可能丢失数据）
pnpm db:generate      # 创建迁移 SQL（生产 - 安全）
pnpm db:migrate       # 应用迁移
pnpm db:studio        # 打开 Drizzle Studio GUI
pnpm typecheck        # 类型检查
pnpm lint             # ESLint
```

---

## 🚢 部署

### Cloudflare Workers（推荐）

```bash
# 安装 Wrangler
pnpm add -g wrangler

# 为 PostgreSQL 设置 Hyperdrive
wrangler hyperdrive create openremix-db \
  --connection-string="postgresql://user:pass@host:5432/db"

# 在 wrangler.jsonc 中配置绑定

# 部署
pnpm cf:deploy
```

### Docker

```bash
docker build -t openremix .
docker run -p 3000:3000 --env-file .env.production openremix
```

### VPS / 传统主机

```bash
pnpm build
node .output/server/index.mjs
```

---

## 🤝 贡献

我们欢迎贡献！查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解指南。

### 开发工作流

1. **Fork** 仓库
2. **创建**功能分支：`git checkout -b feature/amazing-feature`
3. **编码**，使用 TypeScript 严格模式和测试
4. **测试**：`pnpm dev` + `pnpm build` + `pnpm typecheck`
5. **提交**：`git commit -m 'feat: add amazing feature'`
6. **推送**并创建 Pull Request

### 代码质量

- ✅ TypeScript 严格模式强制执行
- ✅ 配置了 ESLint + Prettier
- ✅ 遵循 `modules/` 和 `routes/` 中的现有模式
- ✅ 所有业务逻辑必须可测试（`modules/` 中的纯函数）

---

## 🛡️ 安全

发现漏洞？**不要开启公开 issue。** 发送邮件至 **security@openremix.app**，包含：

- 受影响的组件和环境
- 复现步骤
- 影响评估
- 安全联系方式

查看 [SECURITY.md](./SECURITY.md) 了解完整安全策略。

---

## 📊 性能

- **Lighthouse 评分：** 所有指标 95+
- **冷启动：** Cloudflare Workers 上 <50ms
- **包大小：** ~200KB gzip 压缩（支持代码分割）
- **数据库查询：** Drizzle 预编译语句优化

---

## 🗺️ 路线图

- [ ] **Stable Diffusion 集成** - 自托管图像生成
- [ ] **视频编辑套件** - 裁剪、修剪、添加文本叠加
- [ ] **批量 API** - 程序化处理数千张图片
- [ ] **Zapier/Make/n8n** - 无代码自动化工作流
- [ ] **白标模式** - 为代理商定制品牌
- [ ] **分析仪表板** - ROI 跟踪和使用洞察

---

## 📄 许可证

采用 **MIT 许可证** - 查看 [LICENSE](./LICENSE)。

您可以自由地：
- ✅ 商业使用
- ✅ 修改和分发
- ✅ 私人使用
- ✅ 再许可

---

## 🙏 致谢

使用令人惊叹的开源技术构建：

- [TanStack](https://tanstack.com/) - Router、Query、Form、Table
- [shadcn/ui](https://ui.shadcn.com/) - 美观的组件库
- [better-auth](https://www.better-auth.com/) - 现代认证
- [Drizzle ORM](https://orm.drizzle.team/) - 类型安全的数据库工具包
- [Cloudflare](https://www.cloudflare.com/) - 边缘基础设施

---

## 💬 社区

- 🌐 **网站：** [openremix.app](https://openremix.app)
- 🐛 **Issues：** [GitHub Issues](https://github.com/echoD886/open-remix/issues)
- 📧 **邮箱：** support@openremix.app
- 💬 **讨论：** [GitHub Discussions](https://github.com/echoD886/open-remix/discussions)

---

<div align="center">
  <strong>OpenRemix 团队用 ❤️ 制作</strong>
  
  如果这个项目对您的业务有帮助，在 GitHub 上给它一个 ⭐！
  
  [⭐ Star on GitHub](https://github.com/echoD886/open-remix) • [🚀 在线演示](https://openremix.app) • [📖 文档](./AGENTS.md)
</div>
