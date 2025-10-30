import { describe, it, expect } from 'vitest';
import { netSpreadBps } from '../src/utils/math';
describe('spread', () => {
  it('zero when ask<=0', () => {
    expect(netSpreadBps(100,0)).toBe(0);
  });
});
