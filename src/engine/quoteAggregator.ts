export type Quote = { venue: string; bid: number; ask: number; pair: string };
export async function fetchQuotes(pair: string): Promise<Quote[]> {
  // Wire to adapters/* for real quotes
  return [
    { venue: 'dex:jupiter', bid: 100.2, ask: 99.9, pair },
    { venue: 'cex:binance', bid: 100.1, ask: 99.8, pair }
  ];
}
