# Seedance generation routing decisions

These concise ADRs document intentional behavior that observability and
reliability work must preserve.

## ADR-001: Keep the temporary Seedance 2.5 provider substitution

- **Status:** Accepted, temporary.
- **Decision:** Continue presenting Seedance 2.5 while the current route uses
  Seedance 2.0 Fast. Persist and log the display model separately from the
  provider model and routing contract.
- **Consequence:** Provider readiness can change independently without renaming
  the public product. Internal evidence must never claim the display model was
  the executed provider model.

## ADR-002: Keep Kling as one Auto model with multiple routes

- **Status:** Accepted.
- **Decision:** Keep Kling O3 as one user-visible Auto model and resolve text,
  first-frame, first/last-frame, reference-image, and reference-video routes
  from the request contract.
- **Consequence:** Fallbacks and multiple provider routes are intentional. Route
  evidence and contract tests protect behavior; staging evidence is required
  before changing route selection.

## ADR-003: Allow one asset to have multiple explicit roles

- **Status:** Accepted.
- **Decision:** Model asset usage as bindings with a list of roles. An asset may
  be both a product reference and a start frame when the route supports it.
- **Consequence:** Duplicate asset identity is not itself an error. Used and
  unused assets must be recorded with roles or a reason for exclusion.

## ADR-004: Retain `product_video_job`

- **Status:** Accepted.
- **Decision:** Extend the existing `product_video_job` queue/outbox record and
  its deduplication, retry, scheduling, and lease fields instead of introducing
  another generic outbox.
- **Consequence:** Reliability changes remain compatible with the existing job
  lifecycle. Upload-attempt persistence is separate database work and is not
  part of this non-database change set.
