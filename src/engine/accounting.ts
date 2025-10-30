export type PnL = { usd: number };
export function settle(pnl: PnL, cfg: any) {
  const buyback = (pnl.usd * (cfg.vault.split.buybackPercent||50)) / 100;
  const direct  = (pnl.usd * (cfg.vault.split.directPercent ||50)) / 100;
  return { buyback, direct };
}
