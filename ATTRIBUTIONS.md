# Third-Party Attributions / 第三方署名

This document records material third-party sources and notices that must be preserved when this repository or its binaries are used or redistributed. It does not replace the full license text of any dependency.

本文记录主要第三方来源及使用或再分发时必须保留的声明，不替代任何依赖的完整许可证文本。

## Embedded source code / 内嵌源代码

### libwebp 1.6.0

- Source and pinned version: [`src/lib/vendor/libwebp-decoder/PROVENANCE.md`](src/lib/vendor/libwebp-decoder/PROVENANCE.md)
- License: BSD 3-Clause
- Patent terms: WebM additional IP rights grant
- Required notices: [`LICENSE.libwebp`](src/lib/vendor/libwebp-decoder/LICENSE.libwebp), [`PATENTS.libwebp`](src/lib/vendor/libwebp-decoder/PATENTS.libwebp), and [`NOTICE.md`](src/lib/vendor/libwebp-decoder/NOTICE.md)
- Modifications: a Cloudflare-compatible decoder build and wrapper

再分发源码或二进制时，必须保留 BSD 3-Clause 版权与免责声明、WebM 专利授权以及 NOTICE，且不得暗示 Google 或贡献者为衍生产品背书。

### resvg WebAssembly

- Component: `@resvg/resvg-wasm` 2.6.2
- License: Mozilla Public License 2.0
- Provenance: [`src/lib/vendor/editable-image-rasterizer/PROVENANCE.md`](src/lib/vendor/editable-image-rasterizer/PROVENANCE.md)

If you distribute modified MPL-covered files, comply with MPL 2.0 source and notice obligations for those files. 修改或再分发 MPL 覆盖文件时，必须履行 MPL 2.0 对相应文件的源码与声明义务。

## Fonts / 字体

Fonts are consumed through pinned Fontsource packages: Inter, Libre Baskerville, Noto Sans SC 5.2.9, and Roboto Mono 5.2.9. Noto Sans SC is distributed under the SIL Open Font License 1.1. Retain the license files shipped by the Fontsource packages when redistributing font binaries, and do not imply upstream endorsement.

字体通过固定版本的 Fontsource 包使用。再分发字体文件时须保留包内许可证；不得暗示上游字体作者为 OpenRemix 背书。

## Frameworks and libraries / 框架与依赖

The application depends on packages including React, TanStack Start/Router/Query/Form/Table, Vite, Nitro, TypeScript, Tailwind CSS, shadcn/ui, Paraglide, Better Auth, Drizzle ORM, Stripe, Resend, and others listed in [`package.json`](package.json) and [`pnpm-lock.yaml`](pnpm-lock.yaml). Each package remains governed by its own license. Binary redistributors are responsible for retaining the complete dependency notice set.

应用所依赖的各 npm 包继续受其各自许可证约束。二进制再分发者有责任保留完整依赖许可证清单。

## Models, APIs, and trademarks / 模型、API 与商标

OpenRemix may integrate with or discuss third-party services and models, including Cloudflare, Google, Stripe, Resend, Evolink, ByteDance Seedance, Kling, Veo, GPT Image, Seedream, Nano Banana, Wan, Hailuo, Grok, and others. These names are used only for identification, compatibility, routing, comparison, or citation. All trademarks belong to their respective owners. OpenRemix is independent and is not an official site for those vendors or models.

上述名称仅用于识别、兼容、路由、比较或引用；商标归各自权利人所有。OpenRemix 是独立创作工作台，并非相关厂商或模型的官方网站。

When publishing a model claim, cite a first-party vendor document or clearly label the claim as reported, inferred, or unverified. Do not present a provider route under one model version as proof that a different version is available.

发布模型能力说明时，应引用厂商第一方文档，或明确标注为“报道”“推断”或“未验证”；不得把某一版本的服务路由当作另一版本已经可用的证据。

## Images, video, screenshots, and generated media / 媒体素材

Repository visibility and the OpenRemix software license do **not** grant rights to third-party images, videos, screenshots, logos, people, products, music, prompts, datasets, or AI-generated outputs stored in or referenced by the repository. Some design-reference and generated-media files do not currently carry complete per-file provenance. Treat them as reference-only unless a maintainer can produce written publishing rights.

仓库公开和 OpenRemix 软件许可证**不会**授予第三方图片、视频、截图、Logo、人物、产品、音乐、提示词、数据集或 AI 生成输出的使用权。部分设计参考与生成媒体缺少逐文件完整来源；除非维护者能提供书面发布权，否则只能作为参考，不能再分发或用于生产。

Every new media asset must record: original creator and source URL; acquisition date and exact license or written permission; whether it was modified or AI-generated and which provider/model was used; required credit line and restrictions; and confirmation that depicted people, products, brands, and music may be used.

新增媒体必须记录：原作者与来源 URL、获取日期和精确许可证/书面许可、是否修改或 AI 生成及其服务商/模型、要求的署名与限制，以及人物/产品/品牌/音乐的可用权利。

## Downstream requirements / 下游使用要求

Anyone who copies or uses this project must comply with the proprietary OpenRemix [LICENSE](LICENSE), retain applicable third-party notices, provide attribution when required, obtain their own service agreements and credentials, verify media/privacy/publicity/trademark/commercial rights, and avoid implying endorsement by OpenRemix or any third party.

任何复制或使用本项目的人都必须遵守 OpenRemix 专有许可证，保留适用的第三方声明，在许可证或许可要求时标注来源，自行取得 API/服务协议与凭据，确认媒体、隐私、肖像、商标和商业使用权，并避免暗示 OpenRemix 或任何第三方背书。

Questions: **support@openremix.app**. / 署名问题：**support@openremix.app**。
