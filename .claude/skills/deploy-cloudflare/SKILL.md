---
name: deploy-cloudflare
description: "Deploy this project to Cloudflare Workers using the reviewed Supabase PostgreSQL + Hyperdrive route. Use when the user asks to deploy or publish this project to Workers."
argument-hint: "[--domain=X | --rotate-secrets]"
user-invocable: true
---

# Deploy Seedance to Cloudflare Workers — $ARGUMENTS

This project's only production Worker backend is **Supabase PostgreSQL through
Cloudflare Hyperdrive**. `DATABASE_URL` is a direct Supabase administrative
connection used outside the Worker runtime; it is never a public Wrangler var.
The Worker receives its runtime connection through the `HYPERDRIVE` binding.

## Hard rules

1. Never run a production deploy without an explicit user `yes` in the current
   conversation.
2. Never expose secret values. Report names only.
3. Never create, copy, or edit `wrangler.jsonc` without the user's authority.
   The tracked `wrangler.example.jsonc` is intentionally bundle-only and is
   not deployable.
4. Never run a database migration as part of this skill. A production schema
   change is a separate, user-approved Supabase operation.
5. Always deploy through `pnpm cf:deploy`; it invokes `wrangler deploy
   --config wrangler.jsonc` after its gates pass.

## Configuration contract

The reviewed local `wrangler.jsonc` must contain:

- `vars.DATABASE_PROVIDER: "postgresql"` and `vars.DB_SCHEMA: "seedance21pro"`.
- A non-placeholder `hyperdrive` entry with `binding: "HYPERDRIVE"`.
- All required public vars used by `scripts/check-cloudflare-runtime-env.mjs`.
- `triggers.crons` including `*/5 * * * *` for durable AI-edit recovery.
- Product-video pipeline, queue consumer, cron sweeper, and container flags
  left fail-closed, with no product-video queue, service, container, or media
  binding until that separate infrastructure has been reviewed.

The deploy gate verifies that `AUTH_SECRET` and `CONFIG_ENCRYPTION_KEY` exist
as actual Worker secrets. Provider credentials normally remain encrypted
application configuration; do not place them in public Wrangler vars.

## Build modes

`pnpm cf:env:check` and `pnpm cf:build` are **bundle-only** commands. They may
use `wrangler.example.jsonc`, whose placeholder Hyperdrive ID and missing cron
are deliberate. They do not contact remote secrets.

`pnpm cf:env:check:deploy` and `pnpm cf:build:deploy` are **deploy-mode**
commands. They require local `wrangler.jsonc`, a reviewed Hyperdrive ID, the
AI-edit cron, real required secret names, and a generated Worker config whose
vars, Hyperdrive binding, and cron exactly match the reviewed local config.

The deploy build also verifies the PostgreSQL bundle and the fixed WASM
artifacts: libwebp and resvg must be emitted as local relative
`CompiledWasm` modules, never as build-machine or `node_modules` paths.

## Preflight

Run only read-only checks until the user confirms deployment:

```bash
pnpm build
pnpm cf:env:check
pnpm cf:build
```

For a requested production deploy, first verify the user has supplied a
reviewed local configuration and Supabase/Hyperdrive are already provisioned.
Do not infer binding IDs, secrets, or a production URL.

```bash
pnpm cf:env:check:deploy
pnpm cf:build:deploy
```

If either command fails, report the first concrete gate failure and stop. Do
not substitute the template or weaken the gate.

## Deploy confirmation

Before the final command, state the worker name, configured URL, Hyperdrive
binding name (never its connection string), required secret names, and that
the dedicated AI-edit durable-drain cron is present. Ask exactly once whether
to proceed.

After an explicit `yes`:

```bash
pnpm cf:deploy
```

Then perform the agreed smoke checks against the deployed URL. Do not make a
database migration, create infrastructure, or alter production configuration
as part of post-deploy verification.

## Launch checklist

- Local `wrangler.jsonc` exists and is reviewed; the tracked template was not
  used for deploy mode.
- Supabase PostgreSQL is reachable through the reviewed `HYPERDRIVE` binding.
- Required Worker secret names are present.
- Product-video external infrastructure remains fail-closed unless separately
  reviewed and provisioned.
- The `*/5 * * * *` AI-edit durable-drain cron is present so queued, expired,
  cleanup-pending, settlement-pending, and refund-pending work cannot rely on
  a browser poll loop.
- `pnpm cf:env:check:deploy` and `pnpm cf:build:deploy` passed.

## Troubleshooting

| Symptom | Action |
|---|---|
| Deploy gate says local config is required | Provide the reviewed `wrangler.jsonc`; the template is bundle-only. |
| Hyperdrive placeholder rejected | Provision/review the Supabase Hyperdrive binding, then update the local config. |
| Durable-drain cron rejected | Add the reviewed `*/5 * * * *` trigger to the local deploy config. |
| Required secret missing | Set the named Worker secret through the approved secret-management process; never add it to `vars`. |
| Generated config mismatch | Rebuild with `pnpm cf:build:deploy`; do not hand-edit `.output`. |
| PostgreSQL runtime connection error | Verify the `HYPERDRIVE` binding and Supabase network/TLS settings without printing the connection string. |
