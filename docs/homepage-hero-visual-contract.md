# Homepage Hero Visual Contract

The homepage hero is an approved product surface, not a disposable marketing block.
Feature, SEO, localization, and responsive work must preserve this contract unless the
user explicitly approves a new hero design.

## Approved reference

- Source screenshot: the user-provided Seedance homepage reference in the product-design conversation.
- Baseline implementation: the multi-video hero introduced by commit `3293328`.

## Invariants

- Full-bleed `heroAssets` video carousel with poster fallback and crossfade.
- The first carousel asset is the complete `18.000s–35.776s` tail from the
  user-supplied `窗外-4k.mov`, encoded as the versioned Web asset
  `seedance/hero/window-18s-to-end-v2.mp4`; it must not silently fall back to the
  previous aquarium clip or a static product image.
- Localized creator-work eyebrow, with `AI Ad Creatives` as the English H1.
- The homepage composer remains centered inside the hero.
- Composer defaults to video generation using the default public video model, `16:9`, `5s`, and `480p` when the model exposes those defaults.
- Video tab precedes image tab.
- Video Studio, Image Studio, creative-example, and mute controls remain below the composer.
- Three hero carousel indicators remain at the bottom of the first viewport.
- The `#create` anchor belongs to the Hero section itself, not the composer. Login
  callbacks and direct `/#create` links must land on the complete Hero with its
  heading visible rather than scrolling the heading above the viewport.
- The shared `ReferenceMentionEditor`, rich `@` references, homepage-to-generator handoff, responsive fixes, and login callback are independent behaviors and must not replace the hero shell.
- Visible SEO direct-answer panels remain excluded from the homepage.
- The approved post-Hero composition is `WorkflowProof`, the three official
  media carousels beginning with `Immersive Audio-visual Experience`, model
  performance, official possibilities, scenario playbooks, pricing, and FAQ.
  Product-image campaign replacement sections must not take
  over this sequence.
- `/#create` remains a backward-compatible anchor, but the homepage removes the
  fragment with `history.replaceState` so the canonical visible URL is `/` (or
  the localized root such as `/zh`). New internal Home links use `/` directly.

## Release gate

Any homepage release must run `src/blocks/seedance-home.test.tsx` and visually compare
desktop and mobile captures against the approved reference. HTTP 200, anchor existence,
and text-only assertions are not sufficient evidence for a hero change.
