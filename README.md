<div align="center">
  <img src="./public/logo.webp" alt="OpenRemix Logo" width="120" />
  
  # OpenRemix
  
  ### AI-Powered Product Photo & Video Generation Platform
  
  Transform ordinary product images into stunning marketing materials in seconds
  
  [![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-openremix.app-blue?style=for-the-badge)](https://openremix.app)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](./LICENSE)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  
  [English](#english) • [中文](./README.zh-CN.md)
</div>

---

## 🎯 Why OpenRemix?

> **Problem:** E-commerce businesses spend $100-500+ per product photoshoot and weeks creating video content. Manual editing is slow, expensive, and doesn't scale.

> **Solution:** OpenRemix uses AI to generate unlimited professional product photos and videos from a single image in seconds—at 10% the cost of traditional methods.

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://img.shields.io/badge/Cost-90%25_Lower-brightgreen?style=flat-square" /><br/>
        <strong>Reduce Photography Costs</strong><br/>
        $10 vs $500 per shoot
      </td>
      <td align="center">
        <img src="https://img.shields.io/badge/Speed-10x_Faster-blue?style=flat-square" /><br/>
        <strong>Generate in Seconds</strong><br/>
        Not hours or days
      </td>
      <td align="center">
        <img src="https://img.shields.io/badge/Scale-Unlimited-orange?style=flat-square" /><br/>
        <strong>Infinite Variations</strong><br/>
        Test every concept
      </td>
    </tr>
  </table>
</div>

---

## ✨ Features

### 🎨 AI Product Photography
- **Smart Background Removal** - One-click object isolation
- **16 Professional Themes** - Minimal, Luxury, Studio, Lifestyle, and more
- **Custom Prompts** - Complete creative control with natural language
- **Batch Generation** - Process multiple variants simultaneously

### 🎬 Product Video Creation
- **Static to Video** - Generate engaging product videos from photos
- **Dynamic Motion** - Camera movements and product animations
- **Social-Ready Exports** - Optimized for Instagram, TikTok, YouTube

### 💼 Enterprise-Grade Infrastructure
- **Multi-Database Support** - SQLite, PostgreSQL, MySQL, Turso, Cloudflare D1
- **RBAC & API Keys** - Fine-grained access control
- **Credit System** - Flexible pay-per-use or subscription
- **Stripe Integration** - Production-ready payments with webhooks

### 🌍 Built for Global Scale
- **17 Languages** - English, Chinese, Japanese, Korean, Spanish, French, German, and more
- **Edge-Ready** - Deploy on Cloudflare Workers with <50ms cold starts
- **Type-Safe** - Full TypeScript strict mode across the stack

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ and pnpm 9+
- Database (SQLite for dev, PostgreSQL recommended for production)
- Optional: AI provider API keys ([Replicate](https://replicate.com), [Fal.ai](https://fal.ai), [Gemini](https://ai.google.dev))

### Installation

```bash
# Clone the repository
git clone https://github.com/echoD886/open-remix.git
cd open-remix

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.development

# Edit .env.development with your settings:
#   DATABASE_PROVIDER=sqlite
#   DATABASE_URL=file:data/local.db
#   AUTH_SECRET= (generate: openssl rand -base64 32)
#   VITE_APP_URL=http://localhost:3000

# Initialize database
pnpm db:push

# Start dev server
pnpm dev
```

Visit **http://localhost:3000** 🎉

### Admin Setup

1. Sign up with your email
2. Open your database and set `role = 'admin'` for your user:
   ```sql
   -- SQLite
   UPDATE user SET role = 'admin' WHERE email = 'your@email.com';
   ```
3. Navigate to `/admin` and configure AI providers in Settings

---

## 🏗️ Tech Stack

<div align="center">
  <table>
    <tr>
      <td><strong>Frontend</strong></td>
      <td>
        <a href="https://tanstack.com/start">TanStack Start</a> • 
        <a href="https://react.dev">React 19</a> • 
        <a href="https://ui.shadcn.com">shadcn/ui v4</a> • 
        <a href="https://tailwindcss.com">Tailwind CSS 4</a>
      </td>
    </tr>
    <tr>
      <td><strong>Backend</strong></td>
      <td>
        <a href="https://nitro.unjs.io">Nitro</a> • 
        <a href="https://www.better-auth.com">better-auth</a> • 
        <a href="https://orm.drizzle.team">Drizzle ORM</a>
      </td>
    </tr>
    <tr>
      <td><strong>Database</strong></td>
      <td>
        SQLite • PostgreSQL • MySQL • Turso • Cloudflare D1
      </td>
    </tr>
    <tr>
      <td><strong>AI Providers</strong></td>
      <td>
        Replicate • Fal.ai • Google Gemini • Custom integrations
      </td>
    </tr>
    <tr>
      <td><strong>Deployment</strong></td>
      <td>
        Cloudflare Workers • Vercel • Docker • VPS
      </td>
    </tr>
  </table>
</div>

---

## 📖 Documentation

### Project Structure

```
src/
├── core/              # Infrastructure (auth, db, payment, AI, storage)
├── modules/           # Business logic (payments, credits, subscriptions)
├── routes/            # File-based routing (pages + API endpoints)
├── blocks/            # Page sections with i18n
├── components/        # Reusable UI components
└── lib/               # Utilities (api-client, cache, etc.)
```

### Key Concepts

**Modular Architecture** - Every module is independently removable. Delete `modules/subscriptions` if you don't need subscriptions.

**Database-Agnostic** - Switch databases by changing one env var (`DATABASE_PROVIDER`). All dialects use the same schema.

**i18n with Paraglide** - Compile-time translation with tree-shaking. No runtime overhead.

**Credit System** - FIFO consumption with expiration, automatic grant on subscription, revocation on refund.

### Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm db:push          # Sync schema (dev - fast, may lose data)
pnpm db:generate      # Create migration SQL (prod - safe)
pnpm db:migrate       # Apply migrations
pnpm db:studio        # Open Drizzle Studio GUI
pnpm typecheck        # Type checking
pnpm lint             # ESLint
```

---

## 🚢 Deployment

### Cloudflare Workers (Recommended)

```bash
# Install Wrangler
pnpm add -g wrangler

# Set up Hyperdrive for PostgreSQL
wrangler hyperdrive create openremix-db \
  --connection-string="postgresql://user:pass@host:5432/db"

# Configure wrangler.jsonc with binding

# Deploy
pnpm cf:deploy
```

### Docker

```bash
docker build -t openremix .
docker run -p 3000:3000 --env-file .env.production openremix
```

### VPS / Traditional Hosting

```bash
pnpm build
node .output/server/index.mjs
```

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Code** with TypeScript strict mode and tests
4. **Test**: `pnpm dev` + `pnpm build` + `pnpm typecheck`
5. **Commit**: `git commit -m 'feat: add amazing feature'`
6. **Push** and create a Pull Request

### Code Quality

- ✅ TypeScript strict mode enforced
- ✅ ESLint + Prettier configured
- ✅ Follows existing patterns in `modules/` and `routes/`
- ✅ All business logic must be testable (pure functions in `modules/`)

---

## 🛡️ Security

Found a vulnerability? **Do not open a public issue.** Email **security@openremix.app** with:

- Affected component and environment
- Reproduction steps
- Impact assessment
- Safe contact method

See [SECURITY.md](./SECURITY.md) for our full security policy.

---

## 📊 Performance

- **Lighthouse Score:** 95+ across all metrics
- **Cold Start:** <50ms on Cloudflare Workers
- **Bundle Size:** ~200KB gzipped (with code splitting)
- **Database Queries:** Optimized with Drizzle prepared statements

---

## 🗺️ Roadmap

- [ ] **Stable Diffusion Integration** - Self-hosted image generation
- [ ] **Video Editing Suite** - Trim, crop, add text overlays
- [ ] **Batch API** - Process thousands of images programmatically
- [ ] **Zapier/Make/n8n** - No-code automation workflows
- [ ] **White-Label Mode** - Custom branding for agencies
- [ ] **Analytics Dashboard** - ROI tracking and usage insights

---

## 📄 License

Licensed under the **MIT License** - see [LICENSE](./LICENSE).

You are free to:
- ✅ Use commercially
- ✅ Modify and distribute
- ✅ Use privately
- ✅ Sublicense

---

## 🙏 Acknowledgments

Built with incredible open-source technologies:

- [TanStack](https://tanstack.com/) - Router, Query, Form, Table
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [better-auth](https://www.better-auth.com/) - Modern authentication
- [Drizzle ORM](https://orm.drizzle.team/) - Type-safe database toolkit
- [Cloudflare](https://www.cloudflare.com/) - Edge infrastructure

---

## 💬 Community

- 🌐 **Website:** [openremix.app](https://openremix.app)
- 🐛 **Issues:** [GitHub Issues](https://github.com/echoD886/open-remix/issues)
- 📧 **Email:** support@openremix.app
- 💬 **Discussions:** [GitHub Discussions](https://github.com/echoD886/open-remix/discussions)

---

<div align="center">
  <strong>Made with ❤️ by the OpenRemix team</strong>
  
  If this project helps your business, give it a ⭐ on GitHub!
  
  [⭐ Star on GitHub](https://github.com/echoD886/open-remix) • [🚀 Try Demo](https://openremix.app) • [📖 Documentation](./AGENTS.md)
</div>
