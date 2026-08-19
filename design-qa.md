# OpenRemix design QA

## Prompt optimization control — 2026-08-15

- source visual truth: user-provided reference screenshot (local QA artifact; not committed)
- browser-rendered evidence: desktop, tooltip, mobile, and focused-comparison captures were reviewed locally and intentionally not committed
- source pixels: 2642 × 644; interpreted as a 1321 × 322 CSS-pixel reference at 2× density
- desktop implementation: 1440 × 900 pixels and CSS pixels, device scale 1
- mobile implementation: 390 × 844 pixels and CSS pixels, device scale 1
- focused comparison: source normalized to 1320 × 322 above a 1320 × 280 implementation crop
- state: Chinese locale, light composer surface over the existing video hero, prompt optimization enabled, tooltip separately verified

### Full-view comparison evidence

The source places a compact prompt-assistance control in the right side of the composer toolbar, directly before the credit estimate and submit button. The implementation preserves that hierarchy and keeps all generation settings grouped on the left. It intentionally uses the existing OpenRemix glass composer, Chinese localization, and video-first default instead of copying the source application's brand or model state.

### Focused region comparison evidence

The combined comparison shows the full source composer above the rendered OpenRemix composer at the same 1320-pixel width. The optimization control is visually distinct without competing with the primary submit action: wand icon, localized label, `+2` badge, and a real switch state. The active state uses the existing cyan accent and exposes the cost before submission. A separate hover capture verifies the dark explanatory tooltip.

### Required fidelity surfaces

- fonts and typography: existing OpenRemix Inter-based UI type, compact semibold toolbar hierarchy, and readable 10px credit badge are consistent with neighboring controls; no clipping or broken Chinese wrapping.
- spacing and layout rhythm: the 40px control matches the adjacent action height, sits immediately before the credit total, and preserves the two-sided toolbar grouping. Desktop and 390px mobile layouts have no horizontal page overflow.
- colors and visual tokens: default state uses neutral border/text tokens; enabled state uses the established cyan accent, a restrained ring, and clear switch contrast. The black submit action remains dominant.
- image quality and asset fidelity: the supplied source contains no required image asset for this control. The implementation uses the project's Lucide icon family and does not introduce placeholder art, custom SVG art, or raster artifacts.
- copy and content: `优化提示词` and `+2` keep the action and price visible; the latest provider-neutral operation copy is documented in the revision below.
- responsiveness and accessibility: mobile hides the long label while retaining the icon, `+2`, switch, full accessible name, `aria-pressed`, keyboard focus ring, and a practical 104.875 × 40px tap target. Measured `bodyScrollWidth` and document width both equal the 390px viewport.

### Primary interactions tested

- default state is off (`aria-pressed=false`) on initial render.
- one click selects the control and changes the visible generation estimate from 45 to 47 credits.
- hover displays the optimization benefit and 2-credit explanation.
- image, video, product-image, and product-video modes all render the same opt-in control, defaulted off.
- mobile rendering keeps the control reachable without horizontal overflow.
- no generation or other credit-consuming request was submitted during visual QA.

### Console errors

The in-app browser reported no console errors or warnings during the desktop, tooltip, four-mode, and mobile checks.

### Findings and comparison history

First comparison: no actionable P0/P1/P2 mismatch. The differences from the source (OpenRemix glass surface, localized copy, and explicit switch/price badge) are intentional product adaptations that improve cost disclosure and remain faithful to the reference control placement. No visual fix was required after the combined comparison.

final result: passed

## Prompt optimization benefit copy — 2026-08-15

- source visual truth: user-provided reference screenshot (local QA artifact; not committed)
- browser-rendered implementation: local QA capture reviewed and intentionally not committed
- source pixels: 732 × 280
- implementation pixels and viewport: 1280 × 720 CSS px, device scale 1
- state: Chinese locale, product-image mode, prompt-optimization tooltip open, optimization switch off

### Full-view and focused comparison evidence

The source highlighted a provider-first explanation that told the user which model runs and how much it costs, but did not explain what the option actually does. The browser-rendered implementation preserves the same compact dark tooltip, placement, pointer, and 2-credit disclosure while describing the actual flow: use the user's creative goal and current description to analyze likely needs, then optimize, supplement, and polish the prompt accordingly. It makes no promise about generation quality or outcome. The tooltip remains readable and does not cover the primary submit button.

### Required fidelity surfaces

- fonts and typography: the existing compact white tooltip type and centered line-height remain unchanged; the revised Chinese copy wraps cleanly without clipping.
- spacing and layout rhythm: tooltip width, padding, pointer position, and relationship to the toggle remain unchanged.
- colors and visual tokens: the existing near-black tooltip, white text, and neutral off-state control are unchanged.
- image quality and asset fidelity: no image asset is involved; the existing icon-library wand remains unchanged.
- copy and content: intent and needs analysis now lead into the prompt optimization, supplementation, and polishing steps; the infrastructure provider is hidden, no outcome is promised, and the 2-credit per-use cost remains explicit.

### Findings and comparison history

1. P1: the original tooltip exposed the implementation provider but did not tell users what the option does; an intermediate revision also overpromised more stable, intent-matching generation results.
   - fix: rewrote the customer-facing description in all 15 locales to explain intent-aware needs analysis followed by targeted optimization, supplementation, and polishing, then state the per-use credit cost.
   - post-fix evidence: the browser snapshot contains the intent-aware Chinese process copy and contains neither the old provider-first sentence nor the rejected outcome claim.

### Primary interactions tested

- opened product-image mode and hovered the prompt-optimization control.
- verified the revised tooltip is visible and the old DeepSeek sentence is absent.
- verified the control remains off by default and still exposes the `+2` cost.
- no generation or credit-consuming request was submitted.

### Console errors

The in-app browser reported no console errors or warnings during this focused check.

final result: passed

## Latest responsive media result evidence

- source visual truth: user-provided reference screenshot (local QA artifact; not committed)
- earlier component-only evidence: local QA capture reviewed and intentionally not committed
- source pixels: 2328 × 962
- implementation pixels: 1800 × 953
- implementation viewport: 1800 × 953 CSS px, device scale 1
- state: successful product-video result with requested `3:4`

## Full-view comparison evidence

The source defines the existing workbench result language: prompt/metadata above the delivered media, media aligned to the left, and actions below. The implementation preserves that structure and changes only the output frame geometry. The earlier browser-rendered 3:4 component measured exactly 375 × 500 CSS px (`0.75`), with computed `aspect-ratio: 3 / 4` and `object-fit: contain`.

## Focused region comparison evidence

The media frame is the focused region because crop fidelity is the requested behavior. The full visible image/video remains inside the frame without `object-cover` cropping. Before load, the requested ratio reserves space; after load, image `naturalWidth/naturalHeight` or video `videoWidth/videoHeight` becomes authoritative, so the result does not remain trapped in a fixed 3:4, 1:1, 16:9, or 2:1 module.

## Required fidelity surfaces

- typography: existing component typography and hierarchy are unchanged.
- spacing/layout: prompt → media → action order is preserved; media width is derived continuously from its actual ratio and a shared maximum viewing height, not fixed breakpoint buckets.
- colors/tokens: existing card/background/status/action tokens are unchanged.
- image quality: the main image/video uses `object-contain`; no source pixels are cropped.
- copy/content: existing task prompt and metadata remain authoritative; the ratio label matches the frame.
- responsiveness/accessibility: the frame is `w-full` with a portrait max-width, so it shrinks on narrow viewports; native video controls and labels remain intact.

## Findings and comparison history

1. Earlier P1: successful video results were forced into `aspect-video`; workbench history and single-image results were forced into `2:1`, and video history used `object-cover`.
   - fix: parse the persisted/requested aspect ratio, render main image/video with `object-contain`, then replace the provisional ratio with intrinsic media dimensions after load.
   - post-fix evidence: targeted component tests cover 3:4, 9:16, 1:1, and 16:9 without crop; the earlier browser measurement for 3:4 was `375 × 500`, ratio `0.75`, computed `3 / 4`, `object-fit: contain`.

2. Earlier P1: the QA screenshot introduced a separate `SCENE 1` shell and fixed width buckets that could be mistaken for production workbench chrome.
   - fix: the QA-only shell is not part of the workbench and its temporary files were removed. Production history keeps its existing prompt → media → actions structure, while result geometry now follows intrinsic media dimensions continuously.

No actionable P0/P1/P2 differences remain for the requested ratio behavior. The product-video workflow's scene card remains a separate existing product surface; it no longer determines or fixes the media's ratio.

## Primary interactions tested

- production workbench ratio picker exposes and selects `3:4`.
- component render receives `aspectRatio="3:4"`.
- native video controls remain visible.
- download action remains present.
- no production generation or credit-consuming action was submitted during this focused visual QA.

## Console errors

No browser-rendering error was visible in the component preview. The browser control surface in this environment did not expose a console-message API, so the production build and component/unit tests are the executable error gates.

## Final result

final result: passed

## Previous production history-card evidence

- source visual truth: user-provided reference screenshot (local QA artifact; not committed)
- browser-rendered implementation and combined comparison: reviewed locally and intentionally not committed
- route: `https://openremix.app/zh/ai-image-generator?qa=watermark-final`
- state: authenticated production history with completed reference-driven image and image-to-video results
- earlier findings fixed: persisted canonical image references, restored reference fan/inline mention, constrained completed media, added image/video share controls, and allowed Chinese-adjacent `@` without weakening email protection.

## Compact product composer — 2026-08-15

- source visual truth and removal references: user-provided screenshots (local QA artifacts; not committed)
- browser-rendered evidence: ordinary composer baseline plus desktop/mobile product-image and product-video captures were reviewed locally and intentionally not committed
- desktop viewport: 1440 × 900 CSS px, device scale 1
- mobile viewport: 390 × 844 CSS px, device scale 1
- state: Chinese locale, unauthenticated initial composer, empty references, prompt optimization available but not submitted

### Full-view comparison evidence

The supplied product-video composer diverged from the ordinary composer by inserting a large brief form and seller-facts accordion between the prompt and toolbar. The implementation removes both surfaces completely. Product image and product video now retain the same prompt-first silhouette, rounded glass surface, compact controls, and primary submit action as the ordinary image/video modes.

### Focused region comparison evidence

Only product-specific choices remain in the toolbar: marketplace/platform and the relevant set or delivery type. Product modes use a clean full-width settings row followed by a right-aligned action row on desktop; mobile wraps the same controls without clipping or horizontal page overflow. The server continues deriving safe platform-aware defaults, so removing the visible brief fields does not remove the essential generation context.

### Required fidelity surfaces

- fonts and typography: existing OpenRemix type scale, semibold control labels, and Chinese localization remain consistent with the ordinary composer.
- spacing and layout rhythm: the oversized form stack is gone; product controls use the same 40px compact-control height and spacing rhythm as image/video controls.
- colors and visual tokens: the existing warm glass surface, neutral borders, cyan selected mode, and black submit action are unchanged.
- image quality and asset fidelity: no new raster or vector assets were required; uploaded references keep the existing preview treatment.
- copy and content: users no longer see unexplained video-job, content-style, audience, seller-fact, claim, size, care, price, discount, CTA, or authorization fields.
- responsiveness and accessibility: desktop and 390px mobile states were exercised; controls keep accessible labels and no horizontal page overflow was observed.

### Findings and comparison history

1. P1: the initial product modes exposed a large expert-oriented brief and seller-facts form that overwhelmed the core prompt interaction.
   - fix: removed the form UI and stopped sending those unused client fields; the server now supplies safe defaults from the selected platform.
2. P2: after removal, the wider product controls could still clip when forced into the ordinary single toolbar row.
   - fix: product modes use a compact two-row toolbar while ordinary image/video modes remain unchanged.

### Primary interactions tested

- switched among ordinary image, ordinary video, product image, and product video modes.
- verified product image exposes the marketplace and image-set choices without the removed forms.
- verified product video exposes the marketplace/video-placement choice without the removed forms.
- verified prompt optimization remains available and opt-in in every mode.
- verified desktop and mobile wrapping with no console errors or warnings.
- no generation or credit-consuming action was submitted during visual QA.

### Console errors

The final fresh reload and cross-mode interactions emitted no new console errors or warnings. The persistent development tab retained two earlier HMR-era `/zh` versus `/zh/` home-link hydration warnings from before the final verification window; neither reproduced on the final reload and neither came from the product-composer change.

final result: passed
