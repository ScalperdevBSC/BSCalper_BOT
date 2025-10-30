export type Route = { from: string; to: string; venue: string };
export function bestRoute(pair: string, venues: string[]): Route {
  // Placeholder for routing selection logic
  return { from: pair.split('/')[0], to: pair.split('/')[1], venue: venues[0] || 'dex:jupiter' };
}
