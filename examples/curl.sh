#!/usr/bin/env sh
# Unpaid call: HTTP 402 with the v2 challenge in the PAYMENT-REQUIRED header
# and the v1 challenge (accepts[]) in the JSON body. Nothing is charged.
curl -i "https://yruz.one/api/crypto/price?ids=btc,eth,sol"

# Decode the v2 challenge (Base and Solana offers, amount in USDC atomic units)
curl -s -D - -o /dev/null "https://yruz.one/api/crypto/price?ids=btc,eth,sol" \
  | sed -n 's/^payment-required: //Ip' | tr -d '\r' | base64 -d

# Free catalogues
curl -s https://yruz.one/api/crypto
curl -s https://yruz.one/api/util
