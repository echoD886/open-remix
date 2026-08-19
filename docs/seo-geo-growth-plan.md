# SEO / GEO Growth Plan

Last updated: 2026-06-29

## Position

The site should win in search and AI answer surfaces by being useful, crawlable,
and easy to cite. The strategy is not to create bulk pages or manipulate AI
answers. Every public page must have a clear user job, visible evidence, and a
reason for existing.

## Rules We Follow

- No scaled low-value pages.
- No doorway city pages without real local proof, pricing, examples, or user
  questions.
- No fake "best" rankings.
- No scraped rewrites.
- No hidden keyword blocks or hidden SEO text.
- No back-button hijacking.
- No AI-only markup as a substitute for useful public content.

## Implemented In This Pass

- Removed hidden `meta keywords` from public routes and kept keyword intent in
  visible page copy, titles, descriptions, and structured content instead.
- Added a visible blog editorial-standard section explaining how Best,
  Alternatives, VS, and tool pages are evaluated.
- Added localized editorial-standard copy for every supported locale.
- Updated sitemap entries so static pages and learning pages include a current
  `lastmod`, and blog posts prefer `updatedAt` over `createdAt`.
- Added `/indexnow-key.txt` for IndexNow key discovery.
- Added protected `/api/indexnow/submit` for same-origin IndexNow URL
  submissions after publishing or updating public pages.

## Public Page Intent Map

| Page | Primary intent | Growth role |
| --- | --- | --- |
| `/` | Brand + core AI video/image creation | Entity definition, broad discovery |
| `/ai-video-generator` | Tool page for video generation | Conversion, AI answer citation |
| `/ai-image-generator` | Tool page for image/keyframe generation | Conversion, image-to-video handoff |
| `/pricing` | Credits, plans, cost comparison | Purchase-intent traffic |
| `/learn` | Topic cluster index | Internal linking and query coverage |
| `/learn/*` | Specific workflow questions | Supporting pages for AI citations |
| `/blog` | Best / Alternatives / VS / research entry | Commercial and GEO content hub |
| `/about` | Trust and entity clarity | EEAT / entity support |
| `/contact` | Human contact and support routes | Trust and compliance |

## Next Content Assets

Build these as real pages, not thin posts:

1. `AI video generator comparison 2026`
   - Include criteria, table, failure notes, cost, who should use each tool.
2. `Seedance alternatives`
   - Compare Seedance-style workflows against Kling, Veo, Wan, Runway, Sora,
     and image-to-video tools when reliable data is available.
3. `AI video cost calculator`
   - Let users estimate cost by model, duration, resolution, audio, and
     reference count.
4. `50 AI video prompt examples with outputs`
   - Only publish examples with actual generated outputs or marked demo data.
5. `Image-to-video workflow benchmark`
   - Test reference consistency, product shape preservation, face/outfit
     consistency, and failure rate.

## Weekly Operating Loop

1. Publish three long-tail workflow pages.
2. Publish one comparison or alternative page.
3. Publish one tool, template, benchmark, or data asset.
4. Update sitemap `lastmod` only for changed pages.
5. Submit changed URLs through IndexNow.
6. Review Google Search Console, Bing Webmaster Tools, Bing AI Performance,
   and analytics.
7. Merge, rewrite, or delete low-value pages before they become thin content.

## Measurement

- Search impressions and clicks by page.
- AI Overview / AI Mode / Bing AI citation or reference rate when available.
- Branded vs non-branded query growth.
- Tool-page conversion from comparison and learn pages.
- Pages with impressions but low CTR.
- Pages with visits but no generator or pricing click.

## Content Quality Checklist

Every new commercial-intent page needs:

- Direct answer in the first screen.
- Evaluation criteria.
- Comparison table.
- Pricing or credit context.
- A "best for / not for" section.
- FAQ with real user questions.
- Links to the relevant generator and pricing page.
- Clear source or test basis.
- Updated date and owner.
