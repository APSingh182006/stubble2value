import { describe, it, expect } from 'vitest';
import { estimate, initialFarm, net, options } from './stubble';
describe('illustrative farm estimates',()=>{
 it('uses grain, residue ratio and collection share',()=>{expect(estimate(initialFarm).residue).toBeCloseTo(6.3);});
 it('converts hectares to acres',()=>{expect(estimate({...initialFarm,area:1,unit:'hectares'}).acres).toBeCloseTo(2.47105);});
 it('uses known total production independently of area',()=>{expect(estimate({...initialFarm,known:true,production:10,area:30}).residue).toBeCloseTo(10.5);});
 it('uses a separate wheat ratio',()=>{expect(estimate({...initialFarm,crop:'Wheat'}).residue).toBeCloseTo(5.04);});
 it('recommends the highest net return meeting minimum quantity',()=>{const d=estimate(initialFarm);expect(d.residue).toBeGreaterThanOrEqual(d.recommended.min);for(const o of options.filter(o=>d.residue>=o.min)){expect(d.net).toBeGreaterThanOrEqual(net(o,d.residue));}});
});
