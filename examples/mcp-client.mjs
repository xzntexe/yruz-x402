// Call the YRUZ x402 MCP server with automatic x402 payment (USDC on Base).
// npm install @x402/mcp @x402/evm @modelcontextprotocol/sdk viem
// EVM_PRIVATE_KEY=0x... node mcp-client.mjs
import { createx402MCPClient } from "@x402/mcp";
import { ExactEvmScheme } from "@x402/evm/exact/client";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { privateKeyToAccount } from "viem/accounts";

const account = privateKeyToAccount(process.env.EVM_PRIVATE_KEY);
const client = createx402MCPClient({
  name: "my-agent",
  version: "1.0.0",
  schemes: [{ network: "eip155:8453", client: new ExactEvmScheme(account) }],
  autoPayment: true,
  // approve each payment; every YRUZ tool costs 0.002-0.01 USDC
  onPaymentRequested: async ({ paymentRequired }) => Number(paymentRequired.accepts[0].amount) <= 10000,
});
await client.connect(new StreamableHTTPClientTransport(new URL("https://yruz.one/mcp/x402")));

// free: what does web_extract return?
console.log((await client.callTool("get_example", { tool: "web_extract" })).content[0].text.slice(0, 400));

// paid: 0.005 USDC
const r = await client.callTool("web_extract", { url: "https://en.wikipedia.org/wiki/HTTP_402" });
console.log(r.paymentMade, r.paymentResponse?.transaction);
console.log(JSON.parse(r.content[0].text).markdown.slice(0, 500));
