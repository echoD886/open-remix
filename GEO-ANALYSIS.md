# OpenRemix GEO and Agent-Readiness Analysis

Date: 2026-08-12
Canonical site: https://openremix.app

## Executive summary

The site already had strong conventional crawl foundations: indexable SSR pages, a large localized sitemap with hreflang, canonical URLs, structured data, `llms.txt`, `llms-full.txt`, and public editorial guides. The external Agent-Ready scan scored 14/100 because it primarily tests emerging machine-discovery protocols, not because the site was invisible to search engines.

This change adds the missing machine interface layer without changing the visible Hero or homepage sections:

- RFC 9727 API catalog and OpenAPI description
- HTTP `Link` discovery headers
- RFC 7763 Markdown content negotiation with `Vary: Accept`
- Explicit AI crawler rules and content signals
- OAuth authorization-server and protected-resource discovery
- A real read-only OAuth-protected MCP endpoint
- Agent Skills discovery with verifiable SHA-256 digests
- Browser WebMCP read-only tools
- `auth.md`, AIP discovery, sitemap/robots HEAD support

## Current content signals

| Area | Status | Evidence |
|---|---|---|
| Crawl and index | Strong | SSR, robots, canonical URLs, sitemap |
| Multilingual discovery | Strong | Locale-prefixed URLs and hreflang sitemap entries |
| AI-readable summaries | Strong | `/llms.txt` and `/llms-full.txt` |
| Entity clarity | Strong | Independent-workspace disambiguation and organization schema |
| Answerable public content | Good | Learning center, blog, policy, pricing, generator pages |
| Standard Agent discovery | Implemented in this change | API catalog, OpenAPI, OAuth, MCP, skills, WebMCP |
| Off-site authority | Needs ongoing work | Independent citations, reviews, reputable mentions, community evidence |

## Query and citation strategy

Priority query clusters:

1. AI ad creative generator
2. Product image to video
3. Reference-guided product photos
4. Batch ad variation generation
5. Product video generator with image reference
6. Seedance 2.5 workflow, references, duration, and credit questions

Public answers should keep these evidence boundaries:

- Describe only capabilities visible in the current product.
- Distinguish this workspace from the underlying model vendor.
- Do not promise marketplace approval, legal compliance, conversion, ranking, or publishing results.
- Prefer a canonical first-party page for product facts and the model vendor for underlying model-family claims.

## Measurement

The Agent-Ready score and real AI-search visibility are different metrics. Protocol checks can reach full technical coverage after deployment and DNS configuration, but Google AI Overviews, ChatGPT Search, Claude, and Perplexity citations also depend on indexing, relevance, freshness, independent authority, and query demand. Measure both:

- Technical: endpoint status, response types, Link headers, Markdown negotiation, sitemap HEAD/GET, MCP initialization, skill digest integrity.
- Visibility: branded and non-branded citation tests, AI referral traffic, Search Console impressions, Bing Webmaster data, indexed page count, and third-party mentions.

## Remaining external dependency

DNS AI discovery uses an emerging `_agents` SVCB/HTTPS record and must be published at the DNS provider. It is not an application-code change and is not yet an Internet Standard. DNSSEC should be enabled before treating that record as authenticated discovery.
