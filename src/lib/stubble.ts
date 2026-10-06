export type Farm = { area: number; unit: 'acres' | 'hectares'; crop: string; state: string; district: string; known: boolean; production: number; yield: number; disposal: string };
export const initialFarm: Farm = { area: 5, unit: 'acres', crop: 'Paddy', state: 'Odisha', district: 'Dhenkanal', known: false, production: 6, yield: 1.2, disposal: 'Not selected' };
export const districts: Record<string, string[]> = { Odisha: ['Dhenkanal', 'Cuttack', 'Bargarh', 'Sambalpur'], Punjab: ['Ludhiana', 'Patiala', 'Sangrur', 'Amritsar'], Haryana: ['Karnal', 'Kurukshetra', 'Panipat'], 'Uttar Pradesh': ['Lucknow', 'Bareilly', 'Gorakhpur'], 'West Bengal': ['Bardhaman', 'Hooghly', 'Nadia'] };
export const options = [
 { id: 'paper', name: 'Paper & packaging', short: 'A new chapter for your straw.', icon: 'paper', low: 1800, high: 2800, min: 5, distance: 28, days: 14, difficulty: 'Medium', setup: 'Baling & drying', buyer: 'Fiber and paper mills', process: 'Dry straw is pulped into fibers, then pressed into paper and packaging.', best: 'Farms near a straw-compatible paper mill', impact: 3 },
 { id: 'packaging', name: 'Molded fiber', short: 'From field to food-safe forms.', icon: 'box', low: 2000, high: 3200, min: 5, distance: 35, days: 18, difficulty: 'Medium', setup: 'Clean, dry bales', buyer: 'Molded-fiber manufacturers', process: 'A specialist processor shapes cleaned straw pulp into trays and protective packaging.', best: 'Aggregated volumes near a specialist processor', impact: 3 },
 { id: 'pellets', name: 'Biomass pellets', short: 'Fuel a cleaner possibility.', icon: 'flame', low: 1500, high: 2500, min: 2, distance: 18, days: 7, difficulty: 'Easy', setup: 'Collection & baling', buyer: 'Pellet mills and aggregators', process: 'A processor dries, grinds and compresses straw into pellets or briquettes for suitable boilers.', best: 'Farmers looking for a simple bulk sale', impact: 2 },
 { id: 'biochar', name: 'Biochar', short: 'Give your soil something back.', icon: 'sprout', low: 1200, high: 2200, min: 1, distance: 32, days: 21, difficulty: 'Specialist', setup: 'Qualified processor', buyer: 'Biochar processors', process: 'A trained processor heats straw with limited oxygen. Never attempt uncontrolled burning to make biochar.', best: 'Farms with a qualified local processor', impact: 5 },
 { id: 'compost', name: 'Compost', short: 'Good things come full circle.', icon: 'leaf', low: 600, high: 1200, min: 0.5, distance: 9, days: 60, difficulty: 'Easy', setup: 'Space, water & turning', buyer: 'Composters and local growers', process: 'Chopped straw is mixed with nitrogen-rich material and managed moisture to produce compost.', best: 'On-farm soil reuse or nearby composting', impact: 4 },
 { id: 'mushrooms', name: 'Mushroom growing', short: 'A harvest after the harvest.', icon: 'mushroom', low: 1800, high: 3000, min: 0.5, distance: 24, days: 10, difficulty: 'Medium', setup: 'Clean, untreated straw', buyer: 'Mushroom substrate growers', process: 'Growers prepare and pasteurize suitable clean straw as a growing substrate.', best: 'Clean residue near mushroom growers', impact: 3 },
 { id: 'energy', name: 'Biomass energy', short: 'Power beyond the paddy.', icon: 'energy', low: 1300, high: 2100, min: 10, distance: 45, days: 12, difficulty: 'Medium', setup: 'Bulk aggregation', buyer: 'Compatible biomass plants', process: 'Accepted straw is used in a controlled, emissions-managed biomass energy facility.', best: 'Farmer groups with large volumes', impact: 2 },
 { id: 'agriculture', name: 'Agricultural reuse', short: 'Another life on the farm.', icon: 'wheat', low: 400, high: 900, min: 0.1, distance: 5, days: 3, difficulty: 'Easy', setup: 'Chopping or bundling', buyer: 'Nearby farms and nurseries', process: 'Use suitable straw as mulch or animal bedding. Paddy straw is not automatically suitable animal feed; seek local advice.', best: 'Low-transport local reuse', impact: 4 },
];
export type ReuseOption = typeof options[number];
export const buyers = [
 { name: 'GreenFiber Collective', option: 'paper', distance: 28, min: 5, price: 2300, pickup: false, x: 67, y: 27 },
 { name: 'HarvestLoop Biomass', option: 'pellets', distance: 18, min: 2, price: 2000, pickup: true, x: 37, y: 42 },
 { name: 'EarthCycle Compost', option: 'compost', distance: 9, min: 0.5, price: 900, pickup: true, x: 62, y: 68 },
 { name: 'SecondLife Biochar', option: 'biochar', distance: 32, min: 1, price: 1700, pickup: false, x: 25, y: 73 },
 { name: 'FieldForm Packaging', option: 'packaging', distance: 35, min: 5, price: 2600, pickup: false, x: 78, y: 46 },
 { name: 'StrawSprout Growers', option: 'mushrooms', distance: 24, min: 0.5, price: 2400, pickup: true, x: 44, y: 22 },
 { name: 'Harvest Energy Hub', option: 'energy', distance: 45, min: 10, price: 1700, pickup: false, x: 83, y: 77 },
 { name: 'Neighbourhood Farm Loop', option: 'agriculture', distance: 5, min: 0.1, price: 650, pickup: true, x: 52, y: 58 },
];
export type Buyer = typeof buyers[number];
export const money = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
export function estimate(farm: Farm) {
 const acres = farm.area * (farm.unit === 'hectares' ? 2.47105 : 1);
 const grain = farm.known ? farm.production : acres * farm.yield;
 const ratio = farm.crop === 'Wheat' ? 1.2 : 1.5;
 const residue = grain * ratio * 0.7;
 const eligible = options.filter(o => residue >= o.min);
 const ranked = [...eligible].sort((a, b) => net(b, residue) - net(a, residue));
 const recommended = ranked[0] ?? options[7];
  if (!recommended) throw new Error('At least one reuse option is required');
 return { acres, grain, residue, ratio, recommended, low: residue * recommended.low, high: residue * recommended.high, transport: transport(recommended, residue), net: net(recommended, residue) };
}
export const transport = (o: ReuseOption, tonnes: number) => tonnes * o.distance * 12;
export const net = (o: ReuseOption, tonnes: number) => tonnes * (o.low + o.high) / 2 - transport(o, tonnes) - tonnes * 450;