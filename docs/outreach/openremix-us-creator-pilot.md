# OpenRemix US Creator Pilot

Date: 2026-08-14

## Outcome and boundaries

This pilot recruits US-based AI-video creators and small studios for product feedback. Discovery may be automated over public pages, but the campaign does not scrape or store personal email addresses and does not send to a discovered profile automatically.

The candidate source of truth is `data/outreach/openremix-us-ai-video-candidates.csv`:

- `verified`: public evidence supports a US location, AI-video relevance, and a public contact route. A human still has to inspect the route and approve the contact.
- `manual_verify`: useful lead, but at least one identity, location, recency, business-contact, or video-fit fact is incomplete. Do not send.

Only a creator-owned page explicitly labelled for business, collaboration, sponsorship, commissions, or a creator-marketplace contact flow may be approved. A public personal address alone is not approval.

## Pilot offer

Recommended offer for an approved participant:

- 15-day OpenRemix creator trial using a one-use invite code.
- 1,000 starter credits after account verification, enough for roughly thirteen 8-second draft-tier video tests at the public example estimate of about 72 credits per draft. The exact number of runs varies by model and settings.
- Optional 20-minute onboarding call.
- No posting requirement and no requirement to leave a positive review.
- One feedback request after the participant has generated at least one asset.

Existing product support:

- `/admin/invite-codes` can create one-use codes and set trial days.
- `/admin/credits` can grant credits after the participant creates an account.
- `/settings/tickets` can collect signed-in feedback and `/admin/tickets` can manage replies.

## Segments

1. Independent AI filmmakers and tutorial creators.
2. AI commercial, UGC, and product-video studios.
3. Motion designers and editors already using Runway, Kling, Veo, Sora, Seedance, or ComfyUI.

Prioritize candidates whose recent public work exposes a concrete workflow problem that OpenRemix can address. Do not claim that OpenRemix is categorically better than another product.

## Approval checklist

Before adding any recipient address to a sending system, record and approve all of the following:

- The recipient is explicitly US-based, with a source URL and review date.
- The public contact point says business inquiries, collaboration, sponsorship, commissions, or equivalent.
- The proposed message is relevant to the recipient's current AI-video work.
- The source page does not say no promotions, no solicitation, or similar.
- The address was not guessed, purchased, copied from a data broker, or extracted by a scraper.
- The recipient has not opted out and is not on the suppression list.
- The sender has a valid complete physical postal address in the footer.
- The message has a working one-click or reply-based opt-out.
- A human has approved the personalized opening and the factual product claims.

## Invitation copy: independent creator

Subject options:

- Private OpenRemix creator trial for your AI-video workflow
- Invitation: test OpenRemix with 1,000 creator credits

Body:

> Hi {{first_name}},
>
> I found your {{specific_work}} while looking at creators working with {{tool_or_workflow}}. You publish this contact route for {{business_contact_purpose}}.
>
> We are building OpenRemix, a workspace for planning, generating, comparing, and revising AI video and image work across multiple creation workflows. I thought it might be relevant because {{one_specific_reason}}.
>
> We would like to offer you a private 15-day trial plus 1,000 starter credits in exchange for honest product feedback. There is no posting requirement and no expectation of a positive review.
>
> If you are interested, reply “yes” and I will send a one-use invite code. If not, reply “no” and we will not contact you again.
>
> {{sender_name}}
> OpenRemix
> https://openremix.app
> {{complete_physical_postal_address}}

## Invitation copy: studio or agency

Subject: OpenRemix workflow trial for {{studio_name}}

> Hi {{first_name_or_team}},
>
> I came across {{specific_project}} and noticed your team is already using {{specific_ai_video_workflow}}. We are building OpenRemix to keep references, generation settings, credit estimates, history, and iteration in one workspace.
>
> We can provide a 15-day studio trial and 1,000 starter credits for a hands-on evaluation. We are looking for direct feedback on where the workflow saves time and where it still breaks. No public review or promotional post is required.
>
> If that is useful, reply “yes” and I will send a one-use code. If you would rather not hear from us, reply “no” and we will suppress the address.
>
> {{sender_name}}
> OpenRemix
> https://openremix.app
> {{complete_physical_postal_address}}

## Follow-up policy

- Send at most one follow-up, no earlier than five business days after the first message.
- Do not send a follow-up after any negative response, opt-out, bounce, or complaint.
- Do not add a non-responder to a newsletter or another campaign.
- Reply-based opt-outs must be added to the suppression list immediately, even though US law provides a longer outside limit.

Follow-up:

> Hi {{first_name}},
>
> One brief follow-up on the OpenRemix creator trial below. If the timing is not useful, no action is needed and I will close the invitation. Reply “no” if you want the address placed on our permanent suppression list.
>
> {{sender_name}}

## Feedback loop

After a participant has used the product, ask them to open `/settings/tickets` with the title `Creator Pilot Feedback` and answer:

1. What were you trying to create?
2. Which model or workflow did you use before OpenRemix?
3. Where did OpenRemix save time?
4. Where did the workflow become confusing or fail?
5. Was the credit estimate understandable before generation?
6. What would make you use the product again next week?
7. May we quote this feedback publicly? Default: no.

Track only aggregate pilot metrics:

- Approved contacts
- Messages sent
- Positive replies
- Invite codes redeemed
- Participants completing one generation
- Feedback responses
- Opt-outs, bounces, and complaints

## Sending gate

No production email should be sent yet. The repository currently lacks:

1. A complete valid physical postal address for the sender. Production configuration contains locality, region, and country but no street/PO-box mailing address.
2. A campaign suppression-list data model and unsubscribe endpoint.
3. A human-approved recipient list containing only qualified business-contact addresses.
4. A confirmed creator credit budget and operator identity for the signature.

Resend is already available as a transport and supports custom headers, but transport availability is not permission to send. Add the four controls above before implementing or running a campaign sender.
