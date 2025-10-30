export function bps(n: number) { return n / 10_000; }
export function netSpreadBps(bid: number, ask: number) {
  if (ask <= 0) return 0;
  return ((bid - ask) / ask) * 10_000;
}
