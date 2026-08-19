---
name: launch-audit
description: "Whole-project audit-and-fix passes for a ShipAny (TanStack Start) project across five launch-readiness dimensions: responsive/mobile, light/dark theme, SEO, performance (Lighthouse), and security. Use when the user wants to sweep the WHOLE project (not one component) on one of these axes, or run a final check before deploying. Triggers on: '整体处理一下响应式 / 手机端 / 移动端适配', '整体处理 light/dark 主题 / 暗黑模式样式', '整体修一下 seo / 每个页面 seo 友好', '整体修性能 / Lighthouse 评分 / Core Web Vitals', '整体排查安全问题 / 上线前安全 / 找漏洞', plus EN equivalents: 'make the whole site mobile-friendly', 'fix dark mode everywhere', 'audit SEO across all pages', 'improve Lighthouse scores', 'security sweep before deploy', 'pre-launch check'."
argument-hint: "[responsive|theme|seo|perf|security|all] — which dimension to audit & fix (omit to infer from the request or run all)"
user-invocable: true
---

# Launch Audit — $ARGUMENTS

A **whole-project**, audit-then-fix pass for a ShipAny **TanStack Start** project. Each
dimension is a self-contained checklist tuned to this codebase (blocks/components split,
oklch theme tokens in `src/styles/globals.css`, Paraglide i18n, route `head()` metadata,
`sitemap[.]xml.ts`/`robots[.]txt.ts`, `createFileRoute` server handlers for APIs). Run one
dimension or all five.

## When to use (timing)

- **Per-dimension, on demand** — the user asks to sweep the whole project on one axis
  ("整体处理一下响应式", "确保暗黑模式正常", "每个页面 seo 友好", "Lighthouse 评分要高",
  "排查一遍安全问题"). Infer the dimension from the phrasing.
- **Pre-launch gate** — before a production deploy, run `all` five in order. This is the
  natural final step after the build works and content is in place.
- **Not for a single component** — if the user is editing one block/page, just fix it
  inline. This skill is for the *cross-cutting sweep* ("整体/全站/每个页面").

If `$ARGUMENTS` doesn't name a dimension, infer it from the user's message; if it's a
generic "check everything before launch", run **all** in the order below (cheap → expensive,
security last as the deploy gate).

## How each pass works

For every dimension: **(1) inventory** the surface, **(2) audit** against the checklist,
**(3) fix** the real issues, **(4) verify** with the listed command/tool, **(5) report**.
Always finish with `pnpm build` passing. Prefer editing `src/blocks/*` and `src/components/*`;
never hand-edit `src/components/ui/*` (use `npx shadcn add`).

---

## 1. responsive — mobile & breakpoints

**Surface:** every block in `src/blocks/*`, marketing chrome (`site-header`,
`site-footer`), `app-sidebar`/`app-layout`, dashboard routes, dialogs/sheets.

**Audit:**
- Test at **390px** (mobile), **768px** (tablet), **1440px** (desktop). Use the
  `webapp-testing` / `agent-browser` skill to screenshot, or Chrome DevTools.
- Horizontal overflow (`overflow-x`): long unbroken strings, fixed `w-[...]` px widths,
  wide tables/grids not switching to a stacked layout, images without `max-w-full`.
- Tap targets ≥ 40px; nav collapses to a mobile menu (`site-header`); no hover-only actions.
- Grids degrade (`grid-cols-1 md:grid-cols-3`); text uses responsive steps
  (`text-3xl md:text-5xl`); section padding scales (`py-12 md:py-24`).
- `AppSidebar` collapses behind `SidebarTrigger` on small screens.

**Fix:** add missing responsive Tailwind variants; fluid widths (`w-full max-w-*`); make
tables `overflow-x-auto` or stack.

**Verify:** screenshots at 390/768/1440 with no overflow; `pnpm build`.

---

## 2. theme — light / dark visual correctness

**Surface:** `src/styles/globals.css` (oklch CSS variables under `:root` and `.dark`), every
block/component, the `ThemeProvider` in `src/routes/__root.tsx`.

**Audit:**
- **Hardcoded colors are the #1 dark-mode bug.** Grep for `bg-white`, `text-black`,
  `bg-black`, `text-white`, `bg-gray-*`, `border-gray-*`, raw `#hex`, `bg-[...]` in
  `src/blocks` + `src/components`. Replace with semantic tokens: `bg-background`,
  `text-foreground`, `bg-card`, `bg-muted`, `text-muted-foreground`, `border-border`,
  `bg-primary`/`text-primary-foreground`, `ring-ring`.
- Both `:root` and `.dark` define every token used; contrast is legible in dark.
- Images with baked-in white backgrounds; SVG `fill="#000"` that should be `currentColor`;
  gradients/overlays that vanish in dark; shadows (prefer borders in dark); focus rings.
- Theme toggle works and persists; `suppressHydrationWarning` on `<html>` in `RootDocument`
  prevents a flash of the wrong theme.

**Fix:** swap hardcoded utilities for tokens; add/adjust `.dark` token values in
`src/styles/globals.css`; make decorative SVGs use `currentColor`.

**Verify:** load each route in light AND dark (toggle), screenshot both; `pnpm build`.

---

## 3. seo — per-page SEO friendliness

**Surface:** `src/routes/__root.tsx` `head()` (root meta + hreflang `links`), each route's
`head()` returning `{ meta, links }`, `src/routes/sitemap[.]xml.ts`,
`src/routes/robots[.]txt.ts`, MDX/static pages, Paraglide messages.

**Audit (per route):**
- Each route's `head()` sets a unique `{ title }` + `{ name: 'description' }`. No duplicate
  or empty titles. Title ~50–60 chars, description ~120–160.
- Canonical + `og:*` / `twitter:*` meta present (added via `head().meta`). OG image resolves
  (`/logo.svg` by default — a raster is better for rich social cards).
- **i18n:** hreflang `alternate` links per locale (already emitted in `__root.tsx` — confirm
  every public route is covered); locale-correct `<html lang>` (set in `RootDocument` via
  `getLocale()`).
- One `<h1>` per route, sane heading hierarchy; descriptive `alt` on meaningful images.
- `sitemap[.]xml.ts` includes all public routes + blog/MDX with hreflang;
  `robots[.]txt.ts` blocks `/admin`, `/settings`, `/api` and points to the sitemap.
- Structured data (JSON-LD) for org/product/article where relevant (inject via
  `head().scripts` or a script tag).
- No stray `noindex` on public routes; no broken internal links.

For a deep crawl-style report, the **seo-audit** skill complements this.

**Fix:** add/repair each route's `head()`, hreflang links, sitemap entries, headings, alt
text, JSON-LD.

**Verify:** `pnpm build`; fetch `/sitemap.xml` + `/robots.txt`; view-source a couple routes
for `<title>`/`<meta>`/`<link rel="alternate">`.

---

## 4. perf — performance & Lighthouse / Core Web Vitals

**Surface:** images, fonts, the landing route and heaviest routes, Vite bundle size, data
loaders.

**Audit:**
- **Images:** plain `<img>` here (no `next/image`) — set explicit `width`/`height` to avoid
  CLS, `loading="lazy"` below the fold, `fetchpriority="high"` only on the LCP image, and
  modern formats. `max-w-full h-auto` so they scale.
- **Fonts:** loaded via `@fontsource` imports in `src/styles/globals.css` — keep the subset
  small (the file already warns a full import is ~100KB render-blocking); `font-display: swap`.
- **Rendering:** marketing routes should prerender/SSR cleanly; keep heavy client-only
  widgets out of the initial payload (lazy-load); route `loader`s shouldn't block first paint
  with slow calls.
- **JS weight:** check `pnpm build`'s largest chunks; tree-shake; don't pull a big lib into
  the landing route; defer analytics.
- **CWV targets:** LCP < 2.5s, CLS < 0.1, INP < 200ms.

Drive measurement with the **web-perf** skill (Chrome DevTools MCP) or Lighthouse in the
browser; fix what the trace flags (render-blocking, long tasks, oversized images, caching).

**Fix:** add image dimensions + lazy/priority, trim the font subset, lazy-load heavy
components, trim bundles, keep marketing routes static.

**Verify:** re-run Lighthouse/web-perf; CWV green; `pnpm build` (watch chunk sizes).

---

## 5. security — pre-deploy vulnerability sweep

**Surface:** the whole project — API routes (`src/routes/api/*`, `createFileRoute` server
handlers), module services, auth & RBAC, env handling, user input, file uploads.

**Audit:** run the project's **security-scan** skill (secrets, injection/XSS, auth/logic
flaws, `.gitignore`/`.dockerignore` gaps) AND review beyond the diff for launch:
- Every `server.handlers` route checks auth (`getAuth().api.getSession`) and the right
  permission (`hasPermission`) before acting; no admin action reachable without `admin.*`.
- Server-trusts-client checks on money/credits/state (payment, credits, subscriptions) —
  amounts/ownership validated server-side, webhooks signature-verified.
- No secrets in the client bundle (only `VITE_`-prefixed vars are public) or committed env;
  provider keys come from admin config/env, not hardcoded. `CONFIG_ENCRYPTION_KEY` set for prod.
- Input validation on all writes; parameterized DB queries (Drizzle — no string-built SQL);
  no `dangerouslySetInnerHTML` with user data.
- Open-redirect guards on auth `callbackUrl` (must be same-site `/…`); upload type/size
  limits; rate limiting on sensitive endpoints.
- `robots[.]txt.ts` + route guards don't expose `/admin`/`/api`; errors don't leak
  stack traces/secrets.

For a deeper pass, the **security-review** skill reviews the branch.

**Fix:** add the missing auth/permission/validation guards; remove leaked secrets (and
**rotate** any that were ever committed); tighten redirects/uploads.

**Verify:** `security-scan` clean (no HIGH); `pnpm build`. HIGH findings block deploy.

---

## Output

For each dimension run, end with a short report:

```
| 维度 | 检查范围 | 发现的问题 | 已修复 | 仍需关注 |
```

Then state `pnpm build` passes. For an `all` run, do them in order (responsive → theme →
seo → perf → security) and give one combined report; treat unresolved **security HIGH** as a
launch blocker.
