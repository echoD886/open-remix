import { paraglideVitePlugin } from '@inlang/paraglide-js';
import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { execFileSync } from 'node:child_process';
import { createReadStream, statSync } from 'node:fs';
import path from 'node:path';
import remarkGfm from 'remark-gfm';
import { defineConfig, type Plugin } from 'vite';

import { readWranglerConfig } from './scripts/schema-provider.mjs';
import { loadEnvFiles } from './src/lib/env';

// Populate process.env from .env.local / .env.{NODE_ENV} / .env for the
// dev server and build process (Vite only exposes VITE_* via import.meta.env;
// server code reads secrets from process.env). In production, env comes
// from the actual host/container environment.
loadEnvFiles();

const supportedLocales = [
  'en',
  'de',
  'fr',
  'es',
  'pt',
  'it',
  'ja',
  'ko',
  'zh',
  'ru',
  'ar',
  'id',
  'th',
  'vi',
  'tr',
];
const prefixedUrlLocales = [
  ...supportedLocales.filter((locale) => locale !== 'en'),
  'en',
];

// Cloudflare Workers build (pnpm cf:build / cf:deploy): stub out unused DB
// drivers — mysql2 crashes workerd at module evaluation (node:net,
// node:process requires); postgres.js runs fine under nodejs_compat but is
// dead weight when the backend is D1. Which driver the bundle keeps follows
// wrangler.jsonc `vars.DATABASE_PROVIDER` (the runtime truth on workerd) —
// d1 stubs both, postgresql keeps postgres.js for the Hyperdrive binding.
const isCloudflareBuild = (process.env.NITRO_PRESET || '').includes('cloudflare');
const driverStub = new URL('./src/core/db/driver-stub.ts', import.meta.url).pathname;
const cloudflareLibwebpModule = new URL(
  './src/lib/vendor/libwebp-decoder/webp-decoder-module.cloudflare.ts',
  import.meta.url,
).pathname;
const libwebpModuleAlias = '@/lib/vendor/libwebp-decoder/webp-decoder-module';
const libwebpWasmPath = new URL(
  './src/lib/vendor/libwebp-decoder/libwebp-decoder.wasm',
  import.meta.url,
).pathname;
const cloudflareLibwebpWasmId = '@seedance/libwebp-decoder-wasm';
const cloudflareResvgModule = new URL(
  './src/lib/vendor/editable-image-rasterizer/resvg-wasm-module.cloudflare.ts',
  import.meta.url,
).pathname;
const resvgModuleAlias = '@/lib/vendor/editable-image-rasterizer/resvg-wasm-module';
const resvgWasmPath = new URL(
  './node_modules/@resvg/resvg-wasm/index_bg.wasm',
  import.meta.url,
).pathname;
const cloudflareResvgWasmId = '@seedance/editable-image-resvg-wasm';

// TanStack Start performs an SSR transform before Nitro's own Rollup phase.
// Mark this one import external during that first phase so Vite's generic WASM
// fallback cannot replace it with fetch/runtime compilation. Nitro then sees
// the absolute .wasm path and its Cloudflare preset emits the Worker module.
function cloudflareCompiledWasmExternal(): Plugin {
  return {
    name: 'seedance-cloudflare-compiled-wasm',
    enforce: 'pre',
    resolveId(source) {
      if (!isCloudflareBuild) return undefined;
      if (source === cloudflareLibwebpWasmId) {
        return { id: libwebpWasmPath, external: 'absolute' };
      }
      if (source === cloudflareResvgWasmId) {
        return { id: resvgWasmPath, external: 'absolute' };
      }
      return undefined;
    },
  };
}

// Prefer the local Wrangler configuration (or its tracked, fail-closed
// template for bundle-only CI) over a build-time env that can be polluted by
// .env.local (e.g. DATABASE_PROVIDER=sqlite for local dev).
function workersDbProvider(): string {
  try {
    const provider = readWranglerConfig(process.cwd(), { allowTemplate: true })
      ?.vars?.DATABASE_PROVIDER;
    if (typeof provider === 'string' && provider.trim()) return provider.trim();
  } catch {
    // No Wrangler config or template is present — fall through.
  }
  return process.env.DATABASE_PROVIDER || 'd1';
}

const workersDb = isCloudflareBuild ? workersDbProvider() : '';
const keepPostgres = workersDb === 'postgresql' || workersDb === 'postgres';

function deploymentShaForBuild() {
  const configured = [
    process.env.DEPLOYMENT_SHA,
    process.env.GITHUB_SHA,
    process.env.CF_PAGES_COMMIT_SHA,
  ]
    .map((value) => value?.trim())
    .find((value) => value && /^[A-Za-z0-9][A-Za-z0-9._-]{6,127}$/.test(value));
  if (configured) return configured;
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return 'unknown';
  }
}

function buildTimeForBuild() {
  const configured = process.env.BUILD_TIME?.trim();
  const timestamp = configured ? Date.parse(configured) : Number.NaN;
  return Number.isFinite(timestamp)
    ? new Date(timestamp).toISOString()
    : new Date().toISOString();
}

const seedanceAssetTypes: Record<string, string> = {
  '.mp4': 'video/mp4',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

function seedanceAssetDevServer(): Plugin {
  return {
    name: 'seedance-asset-dev-server',
    configureServer(server) {
      server.middlewares.use('/seedance-assets', (req, res, next) => {
        if (!req.url || (req.method !== 'GET' && req.method !== 'HEAD')) {
          next();
          return;
        }

        const url = new URL(req.url, 'http://localhost');
        const assetKey = decodeURIComponent(url.pathname.replace(/^\/+/, ''));
        const baseDir = path.resolve(process.cwd(), 'data', 'seedance-assets');
        const filePath = path.resolve(baseDir, assetKey);

        if (!filePath.startsWith(`${baseDir}${path.sep}`)) {
          res.statusCode = 403;
          res.end('Forbidden');
          return;
        }

        try {
          const file = statSync(filePath);
          if (!file.isFile()) {
            next();
            return;
          }

          const ext = path.extname(filePath).toLowerCase();
          const contentType = seedanceAssetTypes[ext] ?? 'application/octet-stream';
          const range = req.headers.range;

          res.setHeader('Accept-Ranges', 'bytes');
          res.setHeader('Cache-Control', 'no-store');
          res.setHeader('Content-Type', contentType);

          if (range) {
            const match = range.match(/^bytes=(\d*)-(\d*)$/);
            if (!match) {
              res.statusCode = 416;
              res.end('Invalid range');
              return;
            }

            const start = match[1] ? Number(match[1]) : 0;
            const end = match[2] ? Number(match[2]) : file.size - 1;
            if (
              Number.isNaN(start) ||
              Number.isNaN(end) ||
              start > end ||
              start >= file.size
            ) {
              res.statusCode = 416;
              res.setHeader('Content-Range', `bytes */${file.size}`);
              res.end('Range not satisfiable');
              return;
            }

            const safeEnd = Math.min(end, file.size - 1);
            res.statusCode = 206;
            res.setHeader('Content-Length', String(safeEnd - start + 1));
            res.setHeader('Content-Range', `bytes ${start}-${safeEnd}/${file.size}`);
            if (req.method === 'HEAD') {
              res.end();
              return;
            }
            createReadStream(filePath, { start, end: safeEnd }).pipe(res);
            return;
          }

          res.statusCode = 200;
          res.setHeader('Content-Length', String(file.size));
          if (req.method === 'HEAD') {
            res.end();
            return;
          }
          createReadStream(filePath).pipe(res);
        } catch {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  define: {
    __SEEDANCE_DEPLOYMENT_SHA__: JSON.stringify(deploymentShaForBuild()),
    __SEEDANCE_BUILD_TIME__: JSON.stringify(buildTimeForBuild()),
  },
  server: {
    port: 3000,
  },
  build: {
    rolldownOptions: {
      output: {
        // Paraglide's namespace export is shared by many route chunks. Keep
        // the generated catalog in its own content-hashed file so ordinary
        // UI deploys do not force browsers to re-download the full catalog.
        manualChunks(id) {
          if (
            id.includes('/src/paraglide/messages/') ||
            id.endsWith('/src/paraglide/messages.js')
          ) {
            return 'paraglide-messages';
          }
        },
      },
    },
  },
  resolve: {
    tsconfigPaths: true,
    alias: isCloudflareBuild
      ? {
          mysql2: driverStub,
          ...(keepPostgres ? {} : { postgres: driverStub }),
          // Workerd disallows runtime WebAssembly compilation. This exact
          // alias makes the audited decoder use Wrangler's CompiledWasm module
          // only in the Cloudflare bundle; Node retains its embedded-byte path.
          [libwebpModuleAlias]: cloudflareLibwebpModule,
          [resvgModuleAlias]: cloudflareResvgModule,
        }
      : {},
  },
  plugins: [
    cloudflareCompiledWasmExternal(),
    // MDX must run before the react plugin so JSX in compiled MDX gets transformed.
    { enforce: 'pre', ...mdx({ providerImportSource: '@mdx-js/react', remarkPlugins: [remarkGfm] }) },
    tailwindcss(),
    seedanceAssetDevServer(),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/paraglide',
      outputStructure: 'message-modules',
      cookieName: 'PARAGLIDE_LOCALE',
      strategy: ['url', 'cookie', 'baseLocale'],
      urlPatterns: [
        // API endpoints are never locale-prefixed.
        {
          pattern: '/api/:path(.*)?',
          localized: supportedLocales.map((locale) => [locale, '/api/:path(.*)?']),
        },
        // Bare locale homes match without a trailing-slash redirect.
        {
          pattern: '/',
          localized: supportedLocales.map((locale) => [
            locale,
            locale === 'en' ? '/' : `/${locale}`,
          ]),
        },
        // "as-needed" prefix: all non-English locales under /<locale>, en unprefixed.
        {
          pattern: '/:path(.*)?',
          localized: prefixedUrlLocales.map((locale) => [
            locale,
            locale === 'en' ? '/:path(.*)?' : `/${locale}/:path(.*)?`,
          ]),
        },
      ],
    }),
    tanstackStart({
      srcDirectory: 'src',
      router: {
        codeSplittingOptions: {
          defaultBehavior: [
            ['loader'],
            ['component'],
            ['pendingComponent'],
            ['errorComponent'],
            ['notFoundComponent'],
          ],
        },
      },
    }),
    viteReact(),
    nitro({
      plugins: ['./src/server/plugins/product-video-queue.ts'],
      cloudflare: isCloudflareBuild
        ? {
            // Nitro preserves this rule in .output/server/wrangler.json. It
            // makes the .wasm import above a precompiled module rather than a
            // fetchable asset or runtime-generated bytecode.
            wrangler: {
              rules: [
                {
                  type: 'CompiledWasm',
                  globs: ['**/*.wasm'],
                  fallthrough: true,
                },
              ],
            },
          }
        : undefined,
    }),
  ],
});
