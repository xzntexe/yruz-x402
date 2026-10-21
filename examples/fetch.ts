// Pay per call with x402-fetch (x402 v1, USDC on Base).
// npm i x402-fetch viem
import { wrapFetchWithPayment } from "x402-fetch";
import { privateKeyToAccount } from "viem/accounts";

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
const fetchWithPayment = wrapFetchWithPayment(fetch, account);

const res = await fetchWithPayment("https://yruz.one/api/crypto/token?mint=JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN");
console.log(await res.json()); // { product, result: { risk_score, flags, ... }, payment }
