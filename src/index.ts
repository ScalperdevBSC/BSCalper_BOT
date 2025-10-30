import fs from 'fs';
import yaml from 'yaml';
import { log } from './utils/logger';
import { netSpreadBps } from './utils/math';
import { fetchQuotes } from './engine/quoteAggregator';
import { allowed } from './engine/risk';
import { execute } from './engine/executor';
import { settle } from './engine/accounting';

const cfg = yaml.parse(fs.readFileSync('config/config.yml','utf8'));
const pairs = (yaml.parse(fs.readFileSync('config/pairs.yml','utf8'))).pairs.map((p:any)=>`${p.base}/${p.quote}`);

async function tick(pair: string) {
  const quotes = await fetchQuotes(pair);
  const bestBid = Math.max(...quotes.map(q => q.bid));
  const bestAsk = Math.min(...quotes.map(q => q.ask));
  const spread = netSpreadBps(bestBid, bestAsk);

  log('PAIR', pair, 'bestBid', bestBid, 'bestAsk', bestAsk, 'spreadBps', spread.toFixed(2));
  if (!allowed(spread, cfg)) return;

  const gasBuffer = cfg.execution.gasBufferUsd || 0;
  const notional  = cfg.execution.notionalCapUsd || 1000;
  const estPnlUsd = (bestBid - bestAsk) * (notional / bestAsk) - gasBuffer;

  if (estPnlUsd <= 0) return;

  if (cfg.execution.enabled) {
    const res = await execute({ pair, bestBid, bestAsk }, notional);
    log('TX', res);
  } else {
    log('WOULD_EXECUTE', { pair, notional, estPnlUsd: estPnlUsd.toFixed(2) });
  }

  const split = settle({ usd: estPnlUsd }, cfg);
  log('SETTLE', split);
}

async function main() {
  log('START', { executionEnabled: cfg.execution.enabled, pairs });
  setInterval(() => pairs.forEach(p => { tick(p).catch(console.error); }), 3000);
}
main().catch(e => { console.error(e); process.exit(1); });
