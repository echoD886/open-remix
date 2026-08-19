# Design

## Source of truth
- Status: Active
- Last refreshed: 2026-07-16
- Primary product surfaces: Existing chat composer, product-image batch result conversation, editable product-image editor, deterministic product-material compositions.
- Evidence reviewed: `docs/superpowers/specs/2026-07-10-product-image-generation-design.md`; `docs/superpowers/plans/2026-07-10-product-image-workflow.md`; `src/styles/globals.css`; `src/config/product-image-roles.ts`; `src/config/product-image-role-policy-v2.ts`; `src/lib/product-image-planner-v2.ts`; `src/lib/editable-product-image-document.ts`; `src/components/editable-product-image-editor.tsx`; `src/blocks/image-generation-batch-conversation.tsx`; and the seller-provided 720x2048 floral apparel detail-image reference. No earlier repository-root `DESIGN.md` existed.
- Observed facts: The application already has a compact product-image workflow, a grouped result conversation, a layered editor, Base Nova/shadcn primitives, and deterministic size-chart extraction/rendering. The supplied reference uses a product hero, repeated detail imagery, restrained editorial rules, product-derived blue/yellow accents, a designed size table, and care information.
- Design inference: The reference is a quality and hierarchy example, not a pixel-match target. Product-derived styling should be expressed through controlled tokens and deterministic layout, not arbitrary generated typography or copied reference composition.

## Brand
- Personality: Capable, calm, precise, commerce-aware, and creatively helpful without feeling like a complicated design suite.
- Trust signals: Preserve seller data verbatim; distinguish generated product visuals from deterministic factual layers; show review states when extraction is uncertain; keep original results available; explain marketplace limitations honestly.
- Avoid: AI-looking ornamental clutter, invented facts, arbitrary template decoration, fake success percentages, unreadably dense tables, destructive replacement of a compliant plain main image, and claims of guaranteed marketplace approval.

## Product goals
- Goals: Let one uploaded product image generate immediately; improve fidelity when optional real materials exist; automatically turn an uploaded size chart into a designed, editable, data-safe table; support both a long detail image and an explicitly requested size-guide main visual; adapt visual styling to the product and generated imagery.
- Non-goals: A new upload flow, a mandatory questionnaire, a freeform Figma-like canvas, model-painted size-chart text, direct screenshot pasting, automatic marketplace submission, or any change to product-video behavior.
- Success signals: Users can generate without extra inputs; uploaded size data survives extraction, composition, editing, export, and replay unchanged; the plain main image remains available; derived assets feel visually related to the product; dense tables remain legible; no extra image-generation card or user image credit is created for deterministic compositions.

## Personas and jobs
- Primary personas: E-commerce operators who want fast results; merchants with accurate product materials; designers or advanced operators who want a polished editable result.
- User jobs: Generate product assets quickly; keep a SKU visually consistent; present accurate sizing; create a complete listing set; make small post-generation layout/style changes without regenerating the product.
- Key contexts of use: Desktop-first creation and editing, mobile result review, uncertain or partial reference material, bilingual English/Chinese operation, and marketplace listings with different image-overlay rules.

## Information architecture
- Primary navigation: Keep the existing site and composer navigation unchanged.
- Core routes/screens: Existing product-image composer -> grouped batch result -> optional editable composition editor/export. No new top-level route is required.
- Content hierarchy: Plain generated product results remain primary. When a verified size chart exists, show deterministic derived results alongside them: long detail image by default, and a separate size-guide main visual only when the user explicitly requests it. Review-required compositions remain visible but are clearly marked and cannot imply verified data.

## Design principles
- Principle 1: One image is enough. Supplemental materials improve truth and consistency but never block the base generation path.
- Principle 2: Facts and creativity have separate authority. The sealed size-table payload owns every label, unit, note, row, and cell; a style director may choose only whitelisted visual tokens.
- Principle 3: Preserve a compliant base asset. A size-guide main visual is an additional marketing asset, not a silent replacement for a plain marketplace main image.
- Principle 4: Design from the product, not from a random template. Palette, typography family, spacing, line treatment, motif, and image rhythm may respond to the product while staying restrained and legible.
- Principle 5: Density decides format. A compact table may fit a 4:5 asset; denser data uses 9:16 or the long-detail format instead of shrinking below readable sizes.
- Tradeoffs: Deterministic composition offers less unconstrained novelty than image generation, but it guarantees editable structure, stable typography, reproducible exports, and exact factual data.

## Visual language
- Color: Application chrome continues using the existing warm-neutral oklch tokens. Generated compositions use a validated product-derived palette with background, surface, text, accent, and border roles. Contrast and fallback values are enforced independently of model suggestions.
- Typography: Application UI keeps Inter/Libre Baskerville and system fallbacks. Composition tokens may choose only `system-sans`, `system-serif`, or `system-mono`; factual table text prioritizes readability over brand expression.
- Spacing/layout rhythm: Use generous whitespace and a clear product -> evidence/details -> sizing hierarchy. Long detail uses modular editorial sections; the size-guide main visual gives the product roughly 60-68% of the visual emphasis and keeps the table as a secondary but readable block.
- Shape/radius/elevation: Prefer fine rules, flat surfaces, restrained radii, and low or no elevation. Decorative geometry must come from a small motif whitelist and never compete with product imagery or table cells.
- Motion: Existing UI motion only. Deterministic image canvases are static; editor transitions respect reduced-motion settings.
- Imagery/iconography: Use accepted product outputs and verified seller assets. Supported motifs are `none`, `fine-rule`, `botanical-line`, `dial-ticks`, `stitch-line`, `geometric-grid`, and `speed-line`. Examples: floral apparel can use botanical lines and sampled blue/yellow accents; watches can use dial ticks and a technical grid; sportswear can use a restrained speed line. Motifs never contain factual copy or third-party IP.

## Components
- Existing components to reuse: Existing chat composer, product-image batch cards/conversation, editable layered document, SVG renderer, editor controls, TanStack Query/API client patterns, shadcn primitives, and existing result actions.
- New/changed components: Add a product-material design-token contract; a constrained style-director adapter with deterministic fallback; `detail-long` and `main-with-size-guide` document variants; compact style controls in the current editor; multi-derived-result presentation in the existing batch conversation.
- Variants and states: `detail-long` (1080x3072), `main-with-size-guide` (1080x1350 when readable, otherwise 1080x1920), future-compatible `size-guide-only` but not a default output; `ready`, `needs-review`, `fallback-style`, and `skipped-for-density` states.
- Token/component ownership: UI tokens remain in `src/styles/globals.css`. Product-material composition tokens live in a domain schema under `src/lib/` and are persisted in the editable document. The size-table schema remains the sole data owner.

## Accessibility
- Target standard: WCAG 2.2 AA for application controls and readable exported compositions.
- Keyboard/focus behavior: Every new editor control must be keyboard reachable, use visible focus styles, and preserve existing layer-selection behavior.
- Contrast/readability: Reject or repair unsafe token combinations; do not render factual table text below the documented minimum; do not encode status through color alone.
- Screen-reader semantics: Name derived result variants and verification/review states; label style controls; retain semantic form controls rather than canvas-only interaction.
- Reduced motion and sensory considerations: Respect the existing `prefers-reduced-motion` behavior; avoid flashing, excessive parallax, or texture behind dense factual content.

## Responsive behavior
- Supported breakpoints/devices: Existing responsive application breakpoints; desktop is the full editing surface, tablet/mobile support result review and basic form controls.
- Layout adaptations: Batch results stack on narrow screens; editor side panels move below the canvas or use the existing compact layout. Export dimensions do not change with viewport size.
- Touch/hover differences: Critical controls cannot depend on hover; use minimum touch targets consistent with existing UI primitives.

## Interaction states
- Loading: Show extraction/composition progress separately from provider image generation and do not imply another billable image task.
- Empty: No uploaded size chart means no deterministic size composition and no interruption to normal product generation.
- Error: Extraction or style analysis failure creates a persistent editable/review draft with a safe fallback style; refresh must not repeatedly call OCR or lose accepted product images.
- Success: Show plain generated assets plus completed deterministic derived assets, each with its own label, preview, edit, and export action.
- Disabled: Exact-data export remains disabled or visibly review-gated while table data needs confirmation; style controls can remain available because they cannot modify data.
- Offline/slow network, if applicable: Persist server state, make replay idempotent, and restore composition status when the conversation is reopened.

## Content voice
- Tone: Direct, reassuring, and outcome-oriented.
- Terminology: Use “尺码主视觉 / Size-guide visual” for a text-bearing marketing image; reserve “主图 / marketplace main image” for platform-context wording. Use “长详情图 / Long detail image”, “已核验 / Verified”, and “需要确认 / Needs review”.
- Microcopy rules: State that one image can generate; describe each optional material by the error it prevents; never say missing optional material is required; never claim generated factual text is guaranteed; explain that a dense table moved to a taller format for readability.

## Implementation constraints
- Framework/styling system: TanStack Start, React 19, TypeScript strict, Tailwind CSS 4, shadcn/ui v4 Base Nova, Paraglide i18n, TanStack Query over `@/lib/api-client`.
- Design-token constraints: The style director returns strict JSON only. It cannot return HTML, SVG, arbitrary CSS, copy, product claims, or table data. Allowed fields are preset, palette roles, font family, table treatment, spacing/radius/stroke bounds, layout mode, and motif enum. Invalid suggestions fall back deterministically.
- Data-integrity constraints: Size-chart extraction is hash-verified and double-read. The normalized table is sealed with a stable data hash. Composition and export recompute the hash before and after applying style tokens; styling cannot add, remove, rename, reorder, translate, or alter any factual table value. The uploaded chart screenshot is source evidence only and is never pasted into the final canvas.
- Performance constraints: Reuse one verified extraction for all derived variants; cap accepted product assets; avoid extra generative image calls; keep SVG/raster export bounded for Node and Cloudflare Workers.
- Compatibility constraints: Preserve existing API responses where practical; version new document/identity behavior; do not change the product-video path; do not introduce raw client `fetch`; do not edit `components/ui/*` manually.
- Test/screenshot expectations: Unit-test schema rejection, intent detection, density selection, contrast fallback, token/data separation, stable data hashes, and layout dimensions. Integration-test idempotent replay, no duplicate OCR, no extra provider billing/cards, style failure fallback, and current batch result rendering. Run typecheck, full tests, integration tests, Node production build, and Cloudflare build/bundle checks.

## Open questions
- [ ] Confirm per-marketplace policy for exporting a text-bearing “main” asset / Product / affects whether it can be labeled marketplace main; default is a separate size-guide marketing visual.
- [ ] Decide whether `size-guide-only` should become a default third derived output / Product / no impact on the current two-output implementation.
