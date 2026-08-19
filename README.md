# OpenRemix

[中文版](./README.zh-CN.md)

**Transform product images into campaign-ready marketing materials with AI**

OpenRemix is an open-source AI-powered platform that helps businesses create professional product photos, ad variations, and product videos from simple product images. Built with modern web technologies and designed for scalability.

🌐 **Live Demo**: [openremix.app](https://openremix.app)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-red)](https://tanstack.com/start)

---

## 🎯 What Problem Does OpenRemix Solve?

E-commerce businesses and marketers face several challenges:

- **High cost** of professional product photography ($100-500+ per shoot)
- **Time-consuming** manual photo editing and background removal
- **Limited creativity** when creating ad variations for A/B testing
- **Lack of video content** for social media and advertising
- **Inconsistent brand presentation** across marketing channels

OpenRemix solves these problems by:

✅ **Generating professional product photos** with AI in seconds, not hours  
✅ **Creating unlimited ad variations** for testing different backgrounds, styles, and contexts  
✅ **Producing product videos** from static images for social media  
✅ **Maintaining consistent quality** across all generated materials  
✅ **Reducing costs** by 90%+ compared to traditional photography  

---

## ✨ Key Features

### 🖼️ AI Product Photo Generation
- **Smart background removal** and replacement
- **Multiple style presets**: Minimal, Luxury, Lifestyle, Studio, and more
- **Custom prompts** for complete creative control
- **Batch processing** for generating multiple variations at once

### 🎬 Product Video Creation
- **AI-powered video generation** from static product images
- **Motion effects** and dynamic camera movements
- **Export-ready formats** for social media and ads

### 🎨 Advanced Customization
- **16 professional themes** with instant preview
- **Custom aspect ratios** (1:1, 4:5, 16:9, 9:16)
- **Quality control** with resolution and style intensity settings
- **Brand consistency** through saved style templates

### 💳 Flexible Monetization
- **Credit-based system** with FIFO consumption
- **Subscription plans** (Starter, Pro, Enterprise)
- **One-time credit purchases** for occasional users
- **Stripe integration** with webhook support
- **Extensible payment providers** (Stripe, PayPal, Creem ready)

### 🔐 Enterprise-Ready
- **Multi-tenant architecture** with role-based access control (RBAC)
- **API key management** for programmatic access
- **Audit logging** and usage tracking
- **Email verification** and password reset flows
- **Google One-Tap** and OAuth support

### 🌍 International Support
- **17 languages** built-in (English, Chinese, Japanese, Korean, Spanish, French, German, Portuguese, Italian, Russian, Arabic, Indonesian, Thai, Vietnamese, Turkish)
- **Paraglide JS i18n** with compile-time optimization
- **SEO-optimized** multilingual routes
- **RTL support** for Arabic

---

## 🏗️ Architecture & Tech Stack

### Frontend
- **[TanStack Start](https://tanstack.com/start)** - React 19 meta-framework with file-based routing
- **[TanStack Query](https://tanstack.com/query)** - Powerful async state management
- **[TanStack Form](https://tanstack.com/form)** - Type-safe form handling with Zod validation
- **[shadcn/ui v4](https://ui.shadcn.com/)** - Beautiful accessible components (Base Nova style)
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling with OKLCH colors
- **Vite 8** - Lightning-fast build tool

### Backend
- **[Nitro](https://nitro.unjs.io/)** - Universal server engine
- **[better-auth](https://www.better-auth.com/)** - Modern authentication with Drizzle adapter
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe SQL with multi-database support

### Database Support
- ✅ **SQLite** (default, zero-config)
- ✅ **PostgreSQL** (recommended for production)
- ✅ **MySQL**
- ✅ **Turso** (edge SQLite)
- ✅ **Cloudflare D1** (serverless SQLite)

### AI & Media Processing
- **Multiple AI providers** supported:
  - [Replicate](https://replicate.com/) - Image generation models
  - [Fal.ai](https://fal.ai/) - Fast inference
  - [Gemini](https://ai.google.dev/) - Google's multimodal AI
  - Custom provider integration via `AIManager`
- **Cloudflare R2** for scalable media storage
- **S3-compatible** storage abstraction

### Infrastructure
- **Cloudflare Workers** deployment ready
- **Supabase PostgreSQL** + Hyperdrive for production
- **Edge-ready** with minimal cold start
- **Docker support** included

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ and **pnpm** 9+
- A database (SQLite works out of the box, or PostgreSQL/MySQL for production)
- (Optional) AI provider API keys for image generation

### Installation

```bash
# Clone the repository
git clone https://github.com/echoD886/open-remix.git
cd open-remix

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.development

# Configure your database and secrets in .env.development:
# - DATABASE_PROVIDER=sqlite (or postgres/mysql)
# - DATABASE_URL=file:data/local.db
# - AUTH_SECRET= (generate with: openssl rand -base64 32)
# - VITE_APP_URL=http://localhost:3000

# Create database tables
pnpm db:push

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

### First Admin Setup

1. Sign up with your email
2. Open your database and manually set `role = 'admin'` for your user
3. Navigate to `/admin` to configure AI providers and payment settings

---

## 📖 Documentation

### Project Structure

```
src/
├── core/                # Infrastructure layer (reusable across projects)
│   ├── auth/            # better-auth + RBAC
│   ├── db/              # Multi-database connection pooling
│   ├── payment/         # Payment provider abstraction
│   ├── email/           # Email provider abstraction
│   ├── storage/         # S3/R2 storage abstraction
│   ├── ai/              # AI provider abstraction
│   └── i18n/            # Locale-aware navigation
│
├── modules/             # Business logic (independently removable)
│   ├── payment/         # Checkout, webhooks, order management
│   ├── subscriptions/   # Subscription lifecycle
│   ├── credits/         # FIFO credit consumption
│   ├── apikeys/         # API key CRUD + validation
│   ├── rbac/            # Permission checks
│   └── ai-tasks/        # AI generation tracking
│
├── routes/              # File-based routing (pages + API)
│   ├── index.tsx        # Homepage
│   ├── (auth)/          # Sign-in, sign-up flows
│   ├── settings/        # User dashboard
│   ├── admin/           # Admin panel
│   └── api/             # REST endpoints
│
├── blocks/              # Zero-config page sections (read i18n)
├── components/          # Reusable UI (content via props)
├── hooks/               # Shared React Query hooks
└── lib/                 # Utilities (api-client, hash, cache, etc.)
```

### Database Schema

21 tables covering auth, payments, subscriptions, credits, RBAC, AI tasks, and more.

**Key tables:**
- `user`, `session`, `account`, `verification` (auth)
- `order`, `subscription`, `credit` (payments)
- `role`, `permission`, `rolePermission`, `userRole` (RBAC)
- `apikey` (API access)
- `aiTask`, `chat`, `chatMessage` (AI)
- `config` (encrypted settings)

**Schema management:**
- Development: `pnpm db:push` (fast, may lose data)
- Production: `pnpm db:generate` → review SQL → `pnpm db:migrate`

### Environment Variables

All configuration via `.env.development` (local) or Cloudflare secrets (production).

**Required:**
```env
VITE_APP_URL=https://openremix.app
VITE_APP_NAME=OpenRemix
DATABASE_PROVIDER=sqlite
DATABASE_URL=file:data/local.db
AUTH_SECRET=<generate-with-openssl>
```

**Provider credentials** (Stripe, OAuth, AI keys) are managed in the **admin panel** → Settings, stored encrypted in the database when `CONFIG_ENCRYPTION_KEY` is set.

---

## 🎨 Customization

### Adding a New Feature

1. **Database**: Add tables to `src/config/db/schema.ts`, run `pnpm db:push`
2. **Service**: Create `src/modules/<feature>/service.ts` (pure business logic)
3. **API**: Create `src/routes/api/<feature>.ts` (thin REST wrapper)
4. **UI**: Create `src/routes/settings/<feature>.tsx` (or `admin/<feature>.tsx`)
5. **i18n**: Add keys to `messages/en.json` and `messages/zh.json`
6. **Navigation**: Update nav array in layout `route.tsx`

### Styling & Theming

- **Theme colors**: Edit `src/styles/globals.css` (OKLCH CSS variables)
- **Add components**: `npx shadcn add <component>`
- **Fonts**: Configured in `src/routes/__root.tsx`

### i18n (Internationalization)

- **Add translations**: Edit `messages/{en,zh,...}.json` with flat dot keys
- **Use in components**: `import { m } from '@/paraglide/messages.js'; m['key.name']()`
- **Add a language**: Update `project.inlang/settings.json` locales, create new message file

---

## 🚢 Deployment

### Cloudflare Workers (Recommended)

```bash
# Install Wrangler CLI
pnpm add -g wrangler

# Set up Hyperdrive (for PostgreSQL)
wrangler hyperdrive create openremix-db --connection-string="postgresql://..."

# Configure wrangler.jsonc with your Hyperdrive binding

# Deploy
pnpm cf:deploy
```

### Docker

```bash
docker build -t openremix .
docker run -p 3000:3000 --env-file .env.production openremix
```

### Traditional VPS

```bash
pnpm build
node .output/server/index.mjs
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test: `pnpm dev` + `pnpm build`
4. Commit with clear messages: `git commit -m 'feat: add amazing feature'`
5. Push and create a Pull Request

### Code Style

- **TypeScript strict mode** enforced
- **ESLint** + **Prettier** (run `pnpm lint` and `pnpm format`)
- Follow existing patterns in `src/modules/` and `src/routes/`

---

## 🐛 Security

Found a security vulnerability? Please email **security@openremix.app** instead of opening a public issue.

See [SECURITY.md](./SECURITY.md) for our security policy.

---

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Cold Start**: <50ms on Cloudflare Workers
- **Build Size**: ~200KB gzipped JavaScript
- **Images**: WebP with lazy loading + responsive srcsets

---

## 🗺️ Roadmap

- [ ] **More AI providers**: Stable Diffusion, Midjourney integration
- [ ] **Video editing**: Trim, crop, add text overlays
- [ ] **Batch API**: Process hundreds of images programmatically
- [ ] **Zapier/Make integration**: No-code automation
- [ ] **White-label mode**: Custom branding for agencies
- [ ] **Analytics dashboard**: Track generation usage and ROI

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) for details.

You are free to use, modify, and distribute this software for commercial or non-commercial purposes.

---

## 🙏 Acknowledgments

Built with amazing open-source technologies:

- [TanStack](https://tanstack.com/) - Router, Query, Form, Table
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [better-auth](https://www.better-auth.com/) - Authentication
- [Drizzle ORM](https://orm.drizzle.team/) - Database toolkit
- [Cloudflare](https://www.cloudflare.com/) - Edge infrastructure

---

## 💬 Community & Support

- **Website**: [openremix.app](https://openremix.app)
- **GitHub Issues**: [Report bugs or request features](https://github.com/echoD886/open-remix/issues)
- **Email**: support@openremix.app

---

**Made with ❤️ by the OpenRemix team**

If this project helps your business, please consider giving it a ⭐ on GitHub!
