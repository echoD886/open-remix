# Contributing to OpenRemix / 参与 OpenRemix

Thank you for improving OpenRemix. This document is bilingual; English is followed by Chinese in each section.

感谢你参与改进 OpenRemix。本文为中英双语说明。

## Scope and conduct / 范围与协作

Contributions must preserve OpenRemix as the product identity. Seedance, Kling, Veo, GPT Image, Seedream, and similar names may appear only when they truthfully identify a model, provider route, comparison, or source. Do not describe OpenRemix as an official vendor site or rename a third-party model as an OpenRemix-owned model.

所有改动都必须保持 OpenRemix 为产品品牌。Seedance、Kling、Veo、GPT Image、Seedream 等名称只能在真实的模型、服务路由、比较或来源语境中出现；不得把 OpenRemix 描述为厂商官方网站，也不得把第三方模型称为 OpenRemix 自有模型。

Be respectful, document trade-offs, and keep pull requests focused. Never add private customer data, generated media without publishing rights, or secrets.

请保持尊重、说明取舍，并让每个 Pull Request 聚焦。禁止提交客户隐私数据、无发布权的生成媒体或任何密钥。

## Development workflow / 开发流程

1. Create a branch with a clear purpose.
2. Copy `.env.example` to `.env.development`; never commit the copy.
3. Make the smallest coherent change and update all affected locales.
4. Add or update tests for behavior and trust boundaries.
5. Run the full quality gate below.
6. Review the diff for secrets, brand drift, unsafe SQL, and generated files.

1. 创建目的清晰的分支；
2. 将 `.env.example` 复制为 `.env.development`，不得提交副本；
3. 以最小但完整的范围修改，并同步更新所有受影响语言；
4. 为行为和信任边界补充测试；
5. 运行下方完整门禁；
6. 检查 diff 中是否有密钥、品牌漂移、危险 SQL 或误提交的生成文件。

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm test:integration
pnpm typecheck
pnpm build
pnpm cf:build
```

## Project rules / 项目规则

- UI code uses TanStack Start and regular React components; there are no React Server Components.
- Components must not import server-only modules. Client data access goes through typed API routes and TanStack Query.
- Public copy is localized through Paraglide. Add the same key and meaning to all supported locale files; do not rely on accidental English fallback.
- Generated files such as `src/routeTree.gen.ts` and `src/paraglide/` are not edited by hand.
- Production PostgreSQL changes use reviewed migrations. Never run `db:push` against production.
- Payment, credit, subscription, webhook, and task-settlement changes must be idempotent and concurrency-safe.
- AI-agent surfaces are read-only unless a future design is separately reviewed and explicitly authorized.

- UI 使用 TanStack Start 与普通 React 组件，不使用 React Server Components；
- 组件不得导入服务端模块，客户端数据通过类型化 API 与 TanStack Query 获取；
- 公开文案由 Paraglide 管理，受影响的所有语言必须保持相同含义，不能依赖意外的英文回退；
- `src/routeTree.gen.ts`、`src/paraglide/` 等生成文件不得手工修改；
- 生产 PostgreSQL 只能使用审查后的迁移，禁止对生产运行 `db:push`；
- 支付、积分、订阅、Webhook 和任务结算必须保持幂等并能抵抗并发；
- AI Agent 接口默认为只读，未来任何写能力都必须单独设计、审查并明确授权。

## Security and secrets / 安全与密钥

Before every commit, run the repository security scan and inspect staged files. Credentials belong in Cloudflare Worker secrets or encrypted Admin settings. Wrangler `vars`, browser-visible `VITE_*` values, logs, screenshots, fixtures, and documentation are public surfaces.

每次提交前必须运行仓库安全扫描并检查已暂存文件。凭据只能放在 Cloudflare Worker secrets 或加密的后台设置中。Wrangler `vars`、浏览器可见的 `VITE_*` 值、日志、截图、测试夹具和文档都应视为公开内容。

Never commit real invitation codes or claim URLs, recipient addresses,
mailing lists, provider delivery IDs, test-message payloads, suppression data,
or outreach logs. Use synthetic addresses and redacted identifiers in tests and
documentation. A gitignore rule is a backstop; it is not permission to keep
private operational data inside repository history.

禁止提交真实邀请码或领取链接、收件人地址、邮件名单、服务商投递 ID、测试邮件内容、退订抑制数据或外联日志。测试和文档只能使用虚构地址与脱敏标识。Git 忽略规则只是兜底，不代表私密运营数据可以进入仓库历史。

If you discover a vulnerability, do not open a public issue. Follow [SECURITY.md](SECURITY.md).

发现安全漏洞时不要创建公开 Issue，请遵循 [SECURITY.md](SECURITY.md)。

## Attribution / 署名

When adding third-party code, fonts, images, videos, datasets, model outputs, or design references, record the source, version, license, modification status, and required notice in [ATTRIBUTIONS.md](ATTRIBUTIONS.md) or a colocated `PROVENANCE.md`. Do not import an asset when its publication rights are unknown.

新增第三方代码、字体、图片、视频、数据集、模型输出或设计参考时，必须在 [ATTRIBUTIONS.md](ATTRIBUTIONS.md) 或同目录 `PROVENANCE.md` 中记录来源、版本、许可证、是否修改以及必须保留的声明。无法确认公开权利的素材不得提交。

## Pull request checklist / Pull Request 检查表

- [ ] The change is described in user-visible terms. / 用用户可理解的方式描述改动。
- [ ] Tests cover the changed behavior and failure path. / 测试覆盖正常行为和失败路径。
- [ ] All affected locales are complete and semantically aligned. / 所有受影响语言完整且语义一致。
- [ ] OpenRemix is the product brand; third-party names are contextual. / OpenRemix 是产品品牌，第三方名称仅作语境说明。
- [ ] No secret, personal data, or unlicensed media is included. / 不包含密钥、个人数据或无授权媒体。
- [ ] No real invite, recipient, or outreach record is included. / 不包含真实邀请、收件人或外联记录。
- [ ] Required attribution and documentation are updated. / 已更新必要署名与文档。
- [ ] All quality gates pass. / 完整门禁全部通过。
