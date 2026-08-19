# Security Policy / 安全策略

## Reporting a vulnerability / 报告安全漏洞

Do not disclose a suspected vulnerability in a public issue, discussion, pull request, social post, or shared screenshot. Email **security@openremix.app**. General support requests should go to **support@openremix.app**.

请勿通过公开 Issue、Discussion、Pull Request、社交媒体或共享截图披露疑似漏洞。安全漏洞请发送到 **security@openremix.app**，一般支持问题请联系 **support@openremix.app**。

Include, when available: the affected URL, component, and environment; reproduction steps and a minimal proof of concept; expected and observed results; impact and prerequisites; whether user data or credentials may be exposed; and a safe way to contact you.

如条件允许，请提供：受影响的 URL、组件和环境；复现步骤与最小证明；预期与实际结果；影响和前置条件；是否可能暴露用户数据或凭据；以及安全联系方式。

We accept reports in English or Chinese. The canonical machine-readable policy is published at [`https://openremix.app/.well-known/security.txt`](https://openremix.app/.well-known/security.txt).

我们接受英文或中文报告。机器可读规范入口为 [`https://openremix.app/.well-known/security.txt`](https://openremix.app/.well-known/security.txt)。

## Scope / 范围

In scope: `openremix.app` and first-party APIs; authentication, authorization, RBAC, sessions, OAuth, and recovery; payment webhooks, order/subscription settlement, credits, and billing access; media upload, generation jobs, storage, provider callbacks; and the public source code in this repository.

范围包括：`openremix.app` 与第一方 API；认证、授权、RBAC、会话、OAuth 和账号恢复；支付 Webhook、订单/订阅结算、积分和账单访问；媒体上传、生成任务、存储和服务商回调；以及本仓库的公开源代码。

Third-party providers such as Cloudflare, Google, Stripe, Resend, Evolink, and model vendors operate their own security programs. Report a provider vulnerability to that provider unless it is caused by OpenRemix integration.

Cloudflare、Google、Stripe、Resend、Evolink 和模型厂商拥有各自的安全响应流程；除非问题由 OpenRemix 集成造成，否则应直接向相应厂商报告。

## Safe-harbor expectations / 安全测试约束

- Use only accounts and content you own or are authorized to test.
- Avoid privacy violations, service degradation, spam, destructive actions, high-volume scans, and real financial charges.
- Treat invitation codes and claim URLs as credentials. Do not guess, enumerate, bulk redeem, or publish them.
- Do not trigger verification, recovery, invitation, or marketing email floods, and do not test with third-party addresses without authorization.
- Stop and report immediately if you access secrets, personal data, or another user's content.
- Do not retain, transmit, or publish accessed data beyond what is necessary to demonstrate the issue.
- Give OpenRemix a reasonable opportunity to investigate before disclosure.

- 仅测试你拥有或获授权的账号和内容；
- 避免侵犯隐私、影响服务、发送垃圾内容、执行破坏性操作、高频扫描或产生真实扣款；
- 将邀请码和领取链接视为凭据，不得猜测、枚举、批量兑换或公开传播；
- 不得触发验证、找回、邀请或营销邮件洪泛，也不得未经授权使用第三方地址测试；
- 如访问到密钥、个人数据或其他用户内容，应立即停止并报告；
- 不得保留、传输或公开超过漏洞证明所需的数据；
- 在公开披露前给予 OpenRemix 合理的调查和修复时间。

OpenRemix does not promise a bounty or payment. We will acknowledge good-faith reports and coordinate remediation and disclosure where practical.

OpenRemix 不承诺漏洞奖金或报酬；对于善意报告，我们会在可行范围内确认、修复并协调披露。

## Supported versions / 支持版本

Only the production deployment and the current default branch are supported. Historical commits, forks, local modifications, and disabled experimental pipelines are not guaranteed to receive fixes.

仅生产部署和当前默认分支属于支持范围。历史提交、Fork、本地修改以及默认关闭的实验管线不保证获得修复。
