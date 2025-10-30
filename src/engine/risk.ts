export function allowed(spreadBps: number, cfg: any) {
  return spreadBps >= (cfg.execution.minSpreadBps || 0);
}
