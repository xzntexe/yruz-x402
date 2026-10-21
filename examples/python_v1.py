# Pay per call with the x402 Python client (x402 v1, USDC on Base).
# pip install x402 eth-account
import os
from eth_account import Account
from x402.clients.requests import x402_requests

session = x402_requests(Account.from_key(os.environ["PRIVATE_KEY"]))
r = session.get("https://yruz.one/api/extract", params={"url": "https://example.com"})
print(r.json()["result"]["markdown"][:500])
