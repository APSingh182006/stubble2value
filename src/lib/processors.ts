// Records transcribed from public SAMARTH (Ministry of Power) directory pages, first page of each list,
// as viewed on 10 Oct 2026. Not complete, not automatically updated. Do not add records without a source.
export type Verification = 'confirmed' | 'potential' | 'demo';
export const verificationLabel: Record<Verification, string> = {
  confirmed: 'Paddy straw procurement confirmed',
  potential: 'Potential processor — procurement unverified',
  demo: 'Demo data',
};
export type Processor = {
  id: string; name: string; state: string; district: string; address?: string;
  email?: string; phone?: string; role: string; pathway: 'pellets';
  materials?: string; offer?: string; validFrom?: string; validTo?: string;
  capacityTpd?: number; lat?: number; lng?: number; mentionsPaddyStraw: boolean;
  verification: Verification; source: string; sourceName: string; note?: string;
};
const VD = 'https://samarth.powermin.gov.in/account/vendordetails';
const AG = 'https://samarth.powermin.gov.in/account/pellettraderaggregator';
const VL = 'https://samarth.powermin.gov.in/account/vendorlist';
const vl = (id: string, name: string, state: string, district: string, email: string, phone: string): Processor => ({
  id, name, state, district, email, phone, role: 'Biomass pellet vendor', pathway: 'pellets', mentionsPaddyStraw: false,
  verification: 'potential', source: VL, sourceName: 'SAMARTH vendor list',
});
export const processors: Processor[] = [
  { id: 'vd-agro-fresh', name: 'AGRO FRESH FIELDS', state: 'Uttar Pradesh', district: 'South Salmara Mankachar', address: 'Ground Floor, Gata No. 645, Asmoli Road, Post Rustampur Niyawali, Pali, Sambhal, Uttar Pradesh 244302', email: 'SHAHNAWAZCHAUDHARY11@GMAIL.COM', phone: '9837209888', role: 'Pellet manufacturer / supplier', pathway: 'pellets', materials: 'Listed offers: “Mustar husk, rice husk, paddy straw, etc” (80 MT stock, 80 TPD) and “Press mud, saw dust” (500 MT stock, 500 TPD); non-torrefied', offer: 'Pellet supply offer to power plants (not a straw purchase offer)', validFrom: '15/09/2026', validTo: '15/10/2026', capacityTpd: 60, lat: 28.65, lng: 78.49, mentionsPaddyStraw: true, verification: 'potential', source: VD, sourceName: 'SAMARTH vendor details', note: 'District is shown as listed in the source; the address is in Sambhal district. Paddy straw is listed as a pellet raw material, but buying straw from farmers is not confirmed.' },
  { id: 'ag-innovative', name: 'Innovative e Solutions Enterprise', state: 'Haryana', district: 'Panchkula', email: 'singlaanil@gmail.com', phone: '08195064202', role: 'Pellet trader / aggregator', pathway: 'pellets', offer: '“Innovative e Solutions Enterprise is an trading firm.”', mentionsPaddyStraw: false, verification: 'potential', source: AG, sourceName: 'SAMARTH pellet trader/aggregator list' },
  { id: 'ag-jr', name: 'J.R. TRADERS', state: 'Rajasthan', district: 'Sri Ganganagar', email: 'dhruvmahendra38@gmail.com', phone: '7696585296', role: 'Pellet trader / aggregator', pathway: 'pellets', offer: '“We deal in bio mass pellets and briquettes”', mentionsPaddyStraw: false, verification: 'potential', source: AG, sourceName: 'SAMARTH pellet trader/aggregator list' },
  { id: 'ag-ali', name: 'ALI ENTERPRISES', state: 'Uttar Pradesh', district: 'Amroha', email: 'alichaudhary140823@gmail.com', phone: '8445582425', role: 'Pellet trader / aggregator', pathway: 'pellets', offer: '“Trader of biomass pellets and supplier of raw material (agricultural waste)”', mentionsPaddyStraw: false, verification: 'potential', source: AG, sourceName: 'SAMARTH pellet trader/aggregator list' },
  { id: 'ag-biocrop', name: 'Biocrop Energy', state: 'Gujarat', district: 'Ahmedabad', email: 'biocropenergy@gmail.com', phone: '9725405659', role: 'Pellet trader / aggregator', pathway: 'pellets', offer: 'Supplier of agro-waste biomass pellets and briquettes for industrial thermal energy; supply and distribution only', mentionsPaddyStraw: false, verification: 'potential', source: AG, sourceName: 'SAMARTH pellet trader/aggregator list' },
  { id: 'ag-kothari', name: 'kothari Infra Enterprises Pvt Ltd', state: 'Maharashtra', district: 'Mumbai City', email: 'bhavesh.kothari@gmail.com', phone: '9920287848', role: 'Pellet trader / aggregator', pathway: 'pellets', offer: 'Trading and aggregation of biomass pellets; “also engaged in aggregation of raw agro-residue/biomass from farmers for onward supply to pellet manufacturing units”', mentionsPaddyStraw: false, verification: 'potential', source: AG, sourceName: 'SAMARTH pellet trader/aggregator list', note: 'States it aggregates agro-residue from farmers; paddy straw is not specifically named.' },
  vl('vl-ak', 'A.K. CONSTRUCTION', 'Uttar Pradesh', 'Sant Kabir Nagar', 'ecopellets1@gmail.com', '7054972353'),
  vl('vl-agarwal', 'AGARWAL AGRO INDUSTRIES', 'Rajasthan', 'Bikaner', '9461899852SURENDRA@GMAIL.COM', '9461899852'),
  vl('vl-agro-energy', 'AGRO ENERGY', 'Rajasthan', 'Bikaner', 'agroenergy100@gmail.com', '9773866690'),
  vl('vl-agro-energy-ind', 'Agro energy industries', 'Maharashtra', 'Nagpur', 'kapl@katariyagroup.in', '9552502209'),
  vl('vl-badshah', 'BADSHAH ENERGIES', 'Punjab', 'Ludhiana', 'BADSHAH@BADSHAHENERGIES.COM', '8427191999'),
  vl('vl-beyond', 'BEYOND DRILLING & EXPLORATION PVT', 'Delhi', 'New Delhi', 'beyonddrillingexploration@gmail.com', '9654081111'),
  vl('vl-enliven', 'Enliven nature LLP', 'Madhya Pradesh', 'Indore', 'enliven.nature@gmail.com', '9111455551'),
  vl('vl-erda', 'Erda Illumine alternative fuel pvt ltd', 'Maharashtra', 'Nagpur', 'gagandeep.arya@erdaillumine.com', '9836760999'),
  vl('vl-hitech', 'Hi tech agro energy pvt ltd', 'Haryana', 'Faridabad', 'amrit@hitechagro.org', '9911198829'),
  vl('vl-katariya', 'Katariya agro pvt ltd', 'Maharashtra', 'Nagpur', 'DISHANT@KATARIYAGROUP.IN', '9881122322'),
];
export const pathways = [{ id: 'pellets', name: 'Biomass pellets & briquettes' }, { id: 'paper', name: 'Paper & packaging' }, { id: 'compost', name: 'Compost' }, { id: 'biochar', name: 'Biochar' }, { id: 'energy', name: 'Biomass energy' }];
/** Approximate straight-line (great-circle) distance in km. Not road distance. */
export function straightLineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const r = (d: number) => (d * Math.PI) / 180;
  const h = Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lng - a.lng) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}
export function rankProcessors(list: Processor[], state: string, district: string, here?: { lat: number; lng: number } | null) {
  const score = (p: Processor) => (p.verification === 'confirmed' ? 1000 : 0) + (p.mentionsPaddyStraw ? 100 : 0) + (p.state === state ? 20 : 0) + (p.district === district ? 10 : 0);
  return [...list].sort((a, b) => {
    const d = score(b) - score(a); if (d) return d;
    if (here) { const da = a.lat != null && a.lng != null ? straightLineKm(here, { lat: a.lat, lng: a.lng }) : Infinity; const db = b.lat != null && b.lng != null ? straightLineKm(here, { lat: b.lat, lng: b.lng }) : Infinity; if (da !== db) return da - db; }
    return a.name.localeCompare(b.name);
  });
}
