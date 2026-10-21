# YRUZ x402 API

Fast pay-per-call APIs for AI agents over **x402 v1 and v2**. Pay in **USDC on Solana or Base** (same price on both), no account, no API key, no signup. 269 paid operations.

- Discovery manifest: <https://yruz.one/.well-known/x402>
- OpenAPI 3.1 (with `x-payment-info`): <https://yruz.one/openapi.json> (x402 operations copied to [`openapi.json`](openapi.json))
- APIs.json: <https://yruz.one/.well-known/apis.json>
- Agent docs: <https://yruz.one/llms.txt> · <https://yruz.one/auth.md> · live prices and readiness: <https://yruz.one/x402.php>
- Facilitators: OpenFacilitator, PayAI, Dexter (they pay the network fee; the buyer only needs USDC)

## How to pay

1. Call any endpoint (GET with query parameters or POST with a JSON body). Unpaid, it answers **HTTP 402**.
2. **x402 v2** clients read the base64 `PAYMENT-REQUIRED` header and resend with `PAYMENT-SIGNATURE`. **x402 v1** clients read the JSON body (`accepts`) and resend with `X-PAYMENT`.
3. Every 402 offers Base (`eip155:8453`) and Solana (`solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp`). The payment is bound to the exact input, so change nothing between the 402 and the paid retry.
4. Invalid or private input is refused with a free **400** before any payment. Receipts come back in `PAYMENT-RESPONSE` / `X-PAYMENT-RESPONSE`.

## Crypto tools

Market data cached at most 60 s. Free catalogue: [`/api/crypto`](https://yruz.one/api/crypto).

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
