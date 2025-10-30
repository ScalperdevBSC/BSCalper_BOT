import { describe, it, expect } from 'vitest';
import { netSpreadBps } from '../src/utils/math';
describe('math', () => {
  it('spread positive', () => {
    expect(netSpreadBps(102,100)).toBeGreaterThan(0);
  });
});
