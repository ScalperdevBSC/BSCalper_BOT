# BSCalper BOT — Deterministic Arbitrage Engine

**No AI. No agents. Just math.**  
Engine monitors cross-DEX/CEX prices, executes when `spread - fees - gas > threshold`, and routes realized gains into the vault and **$SCALP buybacks**.

## What it does
- Continuously fetches quotes from connected DEX/CEX endpoints
- Calculates net-profitable routes after gas, fees, slippage
- Executes only when conditions are met (deterministic formula)
- Profit split:
  - **50%** → $SCALP buybacks + vault rewards
  - **50%** → direct distributions to vault shareholders
- Accepts deposits in **BNB / USD₁ / USDC / USDT** (configurable)
- Non-$SCALP profits can be swapped to sustain the buyback loop

## Quick start
1. `cp .env.example .env` and fill RPC/API keys  
2. `npm install`  
3. `cp config/config.example.yml config/config.yml` (edit params)  
4. `cp config/pairs.sample.yml config/pairs.yml` (edit pairs)  
5. `npm start` (paper mode; logs trades it would execute)

## Utility Dashboard (copy-ready text)
**Live Trading Overview** — real-time after vault is live.

**Stats**
- **Total Trades Executed:** `0`
- **Total Profit Generated:** `0.00`
- **Buyback Volume:** `0 $SCALP`
- **Latest Trade Log:** `Awaiting initialization`
- **Vault Participants:** `0`
- **Next Profit Distribution:** `Pending first cycle`

**Why no trades yet?**  
Live execution begins once the **vault and reward distribution** are finalized and funded. The engine is deterministic and only fires when conditions are met.

## Security
Keys via env vars; execution guards: min spread, max slippage, gas buffer, notional caps.

## License
MIT
