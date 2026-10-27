# YRUZ x402 API

Fast pay-per-call APIs for AI agents over **x402 v1 and v2**. Pay in **USDC on Solana or Base** (same price on both), no account, no API key, no signup. 335 paid operations, every one answering both x402 v2 (PAYMENT-REQUIRED header) and x402 v1 (JSON body), with Base and Solana offers in each 402.

- Discovery manifest: <https://yruz.one/.well-known/x402>
- OpenAPI 3.1 (with `x-payment-info`): <https://yruz.one/openapi.json> (x402 operations copied to [`openapi.json`](openapi.json))
- APIs.json: <https://yruz.one/.well-known/apis.json>
- Agent docs: <https://yruz.one/llms.txt> · <https://yruz.one/auth.md> · live prices and readiness: <https://yruz.one/x402.php>
- Facilitators: OpenFacilitator, PayAI, Dexter (they pay the network fee; the buyer only needs USDC)

## Best sellers

| Endpoint | What it does | USDC |
|---|---|---|
| [`/api/audit`](https://yruz.one/api/instructions?tool=audit) | Website audit: TLS, security headers, HTTP/2-3, SEO and AI-agent readiness, scored with fixes | 0.01 |
| [`/api/extract`](https://yruz.one/api/instructions?tool=extract) | Any web page as clean Markdown (code blocks, tables, lists) with metadata | 0.005 |
| [`/api/enrich`](https://yruz.one/api/instructions?tool=enrich) | Company profile from a domain: name, logo, socials, emails, phones, email provider, tech stack, registration | 0.01 |
| [`/api/safety`](https://yruz.one/api/instructions?tool=safety) | Is a link safe to open, sign or pay? Redirects, domain age, look-alikes, brand impersonation, wallet drainers | 0.005 |
| [`/api/weather`](https://yruz.one/api/instructions?tool=weather) | Current weather, 48 h hourly and 7-day forecast, US alerts, by place name or lat/lon | 0.003 |
| [`/api/domain`](https://yruz.one/api/instructions?tool=domain) | DNS, SPF/DMARC/DKIM/MTA-STS, RDAP registration and TLS of a domain, scored | 0.01 |
| [`/api/crypto/token`](https://yruz.one/api/instructions?tool=crypto-token) | Solana token rug-pull check: authorities, holders, liquidity, risk score | 0.005 |

**Know before you pay:** <https://yruz.one/api/instructions> gives every paid tool's parameters, a valid request, the exact price rule, the payment steps and the response fields. Answers are returned only for a paid call.

## Data Intelligence (new)

Source-attributed data for agents: every answer carries `provenance` (source, record URLs, `retrieved_at`, licence), `freshness_status`, `coverage`, `warnings` and `usage`. Catalogue with task ids, prices, limits and sources: <https://yruz.one/api/data> · source status: <https://yruz.one/api/data/sources>.

| Product | Endpoints | USDC |
|---|---|---|
| **DependencyPulse** (npm, PyPI, Packagist + OSV) | `/api/deps/package`, `versions`, `compare`, `check`, `batch` (0.002 per package version), `tree`, `audit` (package-lock.json, composer.lock, requirements.txt ...), `advisory`, `changes`, `monitor` | 0.002-0.025 |
| **TenderGraph** (EU TED, incl. EU-funded Serbia / Western Balkans) | `/api/tenders/search`, `notice`, `history`, `deadlines`, `awards`, `authority`, `supplier`, `changes`, `monitor` | 0.003-0.02 |
| **RealityGraph** (Wikidata, CC0) | `/api/reality/search`, `entity`, `history` (what the source said at a past date), `compare`, `resolve`, `evidence`, `conflicts`, `monitor` | 0.003-0.02 |

"No advisory" is reported as `not_affected_by_queried_advisories`, never as safe; tender values and winners only as published; entity resolution is deterministic on LEI / official website, names only rank.

## Promo Board (new)

List a link, API, x402 endpoint, MCP server or dataset for exactly 24 hours (`/api/promo/create`, 0.02 USDC; renew 0.01), safety-checked before payment. Send `title` and `url` (category and type optional) and keep the returned `id` and `owner_token`. One global top link: a higher confirmed payment takes it over for 24 hours (`/api/promo/takeover`, minimum = current price + 0.01, from 0.05). Public leaderboards (most expensive active link, highest takeover, lifetime spend) count settled payments only. Free: <https://yruz.one/api/promo>, page <https://yruz.one/promo>.

## Use it over MCP

The same tools are an MCP server, no auth: **`https://yruz.one/mcp/x402`** (streamable HTTP, stateless).
Payments follow the [x402 MCP transport](https://github.com/x402-foundation/x402/blob/main/specs/transports-v2/mcp.md):
an unpaid `tools/call` returns `isError` with the `PaymentRequired` in `structuredContent`; repeat it with the signed
`PaymentPayload` in `params._meta["x402/payment"]`; the receipt comes back in `result._meta["x402/payment-response"]`.
`get_example` returns the instructions of any tool (no answer data). Listed in the official MCP Registry as `io.github.xzntexe/yruz-x402`. Server card: <https://yruz.one/.well-known/mcp/x402-server-card.json>.

Tools: `site_audit`, `web_extract`, `company_enrich`, `url_safety_check`, `weather_forecast`, `link_preview`, `domain_intel`, `broken_links`, `uptime_check`, `x402_endpoint_check`,
`wallet_balance`, `crypto_price`, `crypto_trending`, `solana_token_check`, `solana_portfolio`, `solana_tx_explain`,
`network_fees`, `deps_*` (10), `tenders_*` (9), `reality_*` (8), `promo_*` (3 paid + 6 board reads), `yruz_list_services`, `yruz_get_source_status`, `get_example`. See [`examples/mcp-client.mjs`](examples/mcp-client.mjs).

## Bad input gets instructions, never a charge

Every refused call (HTTP 400/403/404/409/422) is not charged and carries an `instructions` block: what you sent, the missing required fields, unknown fields, a valid GET and POST request, the payment steps and a link to the full instructions of the tool. Unknown paths suggest the closest tool (`/api/extractt` -> `/api/extract`).

## How to pay

1. Call any endpoint (GET with query parameters or POST with a JSON body). Unpaid, it answers **HTTP 402**.
2. **x402 v2** clients read the base64 `PAYMENT-REQUIRED` header and resend with `PAYMENT-SIGNATURE`. **x402 v1** clients read the JSON body (`accepts`) and resend with `X-PAYMENT`.
3. Every 402 offers Base (`eip155:8453`) and Solana (`solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp`). The payment is bound to the exact input, so change nothing between the 402 and the paid retry.
4. Invalid or private input is refused before any payment with instructions for the correct call. Receipts come back in `PAYMENT-RESPONSE` / `X-PAYMENT-RESPONSE`.

## Crypto tools

Market data cached at most 60 s. Catalogue: [`/api/crypto`](https://yruz.one/api/crypto).

| Endpoint | What it does | USDC |
|---|---|---|
| [`/api/crypto/price`](https://yruz.one/api/crypto/price?ids=bitcoin%2Cethereum%2Csolana) | Get live crypto prices for coins and Solana tokens | 0.002 |
| [`/api/crypto/trending`](https://yruz.one/api/crypto/trending?limit=10) | Get trending coins, top gainers and losers | 0.003 |
| [`/api/crypto/token`](https://yruz.one/api/crypto/token?mint=JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN) | Check a Solana token for rug-pull risk | 0.005 |
| [`/api/crypto/portfolio`](https://yruz.one/api/crypto/portfolio?address=CWfaj5vDppWCp4q1X4iPYGWpCGY2Rerj9DQWqxTnz1Pp) | Get the tokens and USD value of a Solana wallet | 0.005 |
| [`/api/crypto/tx`](https://yruz.one/api/crypto/tx?signature=kR2EnMwjxxQ3LrZD8fp1e5m6rkkMmDateF5bktxhJDaBaKE6NoP623PbNxjwDVxozQMcgGacBqTEkjrPLzk5TWc) | Get a Solana transaction explained in plain words | 0.003 |
| [`/api/crypto/fees`](https://yruz.one/api/crypto/fees) | Get Solana priority fees and Base gas in USD | 0.002 |

## Agent tools

| Endpoint | What it does | USDC |
|---|---|---|
| [`/api/extract`](https://yruz.one/api/extract?url=https%3A%2F%2Fyruz.one%2F) | Extract a web page as clean Markdown with metadata | 0.005 |
| [`/api/unfurl`](https://yruz.one/api/unfurl?url=https%3A%2F%2Fyruz.one%2F) | Get the link preview card of a URL | 0.003 |
| [`/api/domain`](https://yruz.one/api/domain?domain=yruz.one) | Check DNS, email security and RDAP of a domain | 0.01 |
| [`/api/links`](https://yruz.one/api/links?url=https%3A%2F%2Fyruz.one%2F) | Check every link on a page for broken URLs | 0.01 |
| [`/api/x402-check`](https://yruz.one/api/x402-check?url=https%3A%2F%2Fyruz.one%2Fapi%2Faudit) | Check that a paid x402 endpoint answers a valid 402 | 0.005 |
| [`/api/uptime`](https://yruz.one/api/uptime?url=https%3A%2F%2Fyruz.one%2F) | Check if a website is up and how fast it answers | 0.003 |
| [`/api/wallet`](https://yruz.one/api/wallet?address=CWfaj5vDppWCp4q1X4iPYGWpCGY2Rerj9DQWqxTnz1Pp) | Get USDC and gas balance of a Solana or Base wallet | 0.002 |
| [`/api/audit`](https://yruz.one/api/audit?url=example.com) | Check the security, speed and SEO of a website | 0.01 |
| [`/api/trending`](https://yruz.one/api/trending) | What is moving on the YRUZ social network | 0.005 |

## Social data, utilities and toolkit

- **Social data** (public YRUZ content): `/api/search`, `/api/posts`, `/api/post`, `/api/profile`, `/api/profile/posts`, `/api/article`, `/api` (articles as Markdown), `/api/forums`, `/api/thread`, `/api/questions`, `/api/question`, `/api/pages`, `/api/page`. From 0.002 USDC; lists 0.002 + 0.0005 per item.
- **Developer utilities** ([catalogue](https://yruz.one/api/util)): `/api/util/<tool>`: time, uuid, random, password, ip, hash, hmac, base64, urlencode, slug, wordcount, case, json, jwt-decode, html2md, color, email, dns. 0.002 USDC.
- **YRUZ Toolkit** ([catalogue](https://yruz.one/api/toolkit)): 90+ tools at `/api/toolkit/<slug>` (ssl-lookup, http-headers-lookup, meta-tags-checker, dns-lookup, url-redirect-checker ...) and 1,700+ conversions at `/api/toolkit/convert?from=&to=&value=`. 0.002 USDC.

## Examples

- [`examples/curl.sh`](examples/curl.sh): see the 402 challenge
- [`examples/fetch.ts`](examples/fetch.ts): pay with `x402-fetch` (v1, Base); v2 clients such as `@x402/fetch` work the same way
- [`examples/python_v1.py`](examples/python_v1.py): pay with the `x402` Python client (v1)

## Listed on

[x402scan](https://www.x402scan.com) · [agent402](https://agent402.tools) · [402index](https://402index.io) · [PayAPI Market](https://payapi.market) · [agent-tools.cloud](https://agent-tools.cloud/x402) · [nohumans](https://nohumans.directory)

## Payment addresses

- Solana: `CWfaj5vDppWCp4q1X4iPYGWpCGY2Rerj9DQWqxTnz1Pp`
- Base: `0x235b73D50752800D9FaE24F51bEb08f47076c67A`

Contact: zanto@yruz.one · Website: <https://yruz.one>
