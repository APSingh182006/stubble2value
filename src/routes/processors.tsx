import { useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { MapPin, ExternalLink, Mail, Phone, LocateFixed, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { meta } from '@/components/stubble/shared';
import { useFarm } from '@/components/stubble/farm-context';
import { processors, pathways, verificationLabel, rankProcessors, straightLineKm, type Verification } from '@/lib/processors';

export const Route = createFileRoute('/processors')({ head: () => meta('Find processors across India', 'Search potential agricultural-residue processors listed on public SAMARTH directories, filtered by state, district, pathway and verification status.'), component: Processors });

const NP = 'Not provided';
function Processors() {
  const { farm } = useFarm();
  const states = useMemo(() => [...new Set(processors.map(p => p.state))].sort(), []);
  const [state, setState] = useState('all');
  const [district, setDistrict] = useState('all');
  const [pathway, setPathway] = useState('all');
  const [status, setStatus] = useState<'all' | Verification>('all');
  const [q, setQ] = useState('');
  const [here, setHere] = useState<{ lat: number; lng: number } | null>(null);
  const [geoMsg, setGeoMsg] = useState('');
  const districtsIn = useMemo(() => [...new Set(processors.filter(p => state === 'all' || p.state === state).map(p => p.district))].sort(), [state]);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    const f = processors.filter(p => (state === 'all' || p.state === state) && (district === 'all' || p.district === district) && (pathway === 'all' || p.pathway === pathway) && (status === 'all' || p.verification === status) && (!s || [p.name, p.state, p.district, p.address ?? ''].join(' ').toLowerCase().includes(s)));
    return rankProcessors(f, state === 'all' ? farm.state : state, district === 'all' ? farm.district : district, here);
  }, [q, state, district, pathway, status, here, farm.state, farm.district]);
  function locate() {
    if (!navigator.geolocation) { setGeoMsg('Location is not available in this browser.'); return; }
    setGeoMsg('Finding your location…');
    navigator.geolocation.getCurrentPosition(p => { setHere({ lat: p.coords.latitude, lng: p.coords.longitude }); setGeoMsg('Using your device location for straight-line distances.'); }, () => setGeoMsg('Location permission was not given. Distances stay hidden.'));
  }
  function reset() { setState('all'); setDistrict('all'); setPathway('all'); setStatus('all'); setQ(''); }
  return <main className="page"><div className="container">
    <div className="section-label">Nationwide directory</div>
    <h1 className="page-title">Find processors near you.</h1>
    <p className="page-sub">Businesses listed on the Government of India’s SAMARTH biomass directories. Listing here does not mean they buy straw from farmers.</p>
    <div className="flex flex-wrap gap-3 items-center mt-6"><span className="badge">SOURCE: SAMARTH · MINISTRY OF POWER</span><span className="badge">{processors.length} RECORDS · NOT COMPLETE</span></div>
    <p className="assumptions">Records were copied by hand from the first page of each public SAMARTH list on 10 Oct 2026. The directory is not complete and does not update automatically. Always confirm current acceptance, price, minimum quantity and transport directly with the business.</p>
    <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-5">
      <label className="lg:col-span-2"><span className="field-label">Search name or location</span><input className="field" value={q} onChange={e => setQ(e.target.value)} placeholder="e.g. Ludhiana or Agro" aria-label="Search name or location" /></label>
      <label><span className="field-label">State</span><select className="field" aria-label="State" value={state} onChange={e => { setState(e.target.value); setDistrict('all'); }}><option value="all">All states</option>{states.map(s => <option key={s}>{s}</option>)}</select></label>
      <label><span className="field-label">District</span><select className="field" aria-label="District" value={district} onChange={e => setDistrict(e.target.value)}><option value="all">All districts</option>{districtsIn.map(d => <option key={d}>{d}</option>)}</select></label>
      <label><span className="field-label">Use pathway</span><select className="field" aria-label="Use pathway" value={pathway} onChange={e => setPathway(e.target.value)}><option value="all">All pathways</option>{pathways.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
      <label className="lg:col-span-2"><span className="field-label">Verification status</span><select className="field" aria-label="Verification status" value={status} onChange={e => setStatus(e.target.value as 'all' | Verification)}><option value="all">All statuses</option>{(Object.keys(verificationLabel) as Verification[]).map(v => <option key={v} value={v}>{verificationLabel[v]}</option>)}</select></label>
      <div className="lg:col-span-3 flex flex-wrap gap-3 items-end"><Button variant="outline" onClick={locate}><LocateFixed />Use my location for distance</Button><Button variant="ghost" onClick={reset}>Clear filters</Button></div>
    </div>
    {geoMsg && <p role="status" className="text-xs muted mt-3">{geoMsg}</p>}
    <p className="text-sm muted mt-6">{results.length} result{results.length === 1 ? '' : 's'} · ranked by stated paddy-straw use, then your state/district{here ? ', then straight-line distance' : ''}</p>
    {results.length === 0 ? <div className="buyer-card mt-4 text-center py-10"><SearchX className="mx-auto text-primary" /><h3 className="mt-3">No listed processors match.</h3><p className="text-sm muted mt-2">There are no sourced records for these filters yet. Try another state or pathway, ask your local agriculture office or KVK, or combine straw with neighbours to reach larger buyers.</p><Button className="mt-5" variant="outline" onClick={reset}>Clear filters</Button></div> :
    <div className="grid gap-4 mt-4 md:grid-cols-2">{results.map(p => { const km = here && p.lat != null && p.lng != null ? straightLineKm(here, { lat: p.lat, lng: p.lng }) : null; return <article key={p.id} className="buyer-card">
      <div className="flex justify-between gap-3"><h3>{p.name}</h3></div>
      <span className="badge mt-2 inline-block">{verificationLabel[p.verification].toUpperCase()}</span>
      <p className="text-xs muted mt-3 flex gap-2 items-center"><MapPin size={14} />{p.district}, {p.state} · {p.role}</p>
      <div className="text-sm leading-6 mt-3 space-y-1">
        <p><span className="muted">Address: </span>{p.address ?? NP}</p>
        <p><span className="muted">Materials / offer: </span>{p.materials ?? p.offer ?? NP}</p>
        <p><span className="muted">Offer validity: </span>{p.validFrom ? `${p.validFrom} – ${p.validTo}` : NP}</p>
        <p><span className="muted">Plant capacity: </span>{p.capacityTpd != null ? `${p.capacityTpd} tonnes/day` : NP}</p>
        <p><span className="muted">Distance: </span>{km != null ? `≈${Math.round(km)} km straight-line (not road distance)` : p.lat == null ? 'Not provided (no coordinates)' : 'Use your location to estimate'}</p>
        {p.note && <p className="assumptions">{p.note}</p>}
      </div>
      <div className="buyer-bottom mt-3 flex-wrap gap-2">
        <Button asChild variant="outline" size="sm"><a href={p.source} target="_blank" rel="noopener noreferrer">Source <ExternalLink /></a></Button>
        {p.phone && <Button asChild variant="outline" size="sm"><a href={`tel:${p.phone}`}><Phone />{p.phone}</a></Button>}
        {p.email && <Button asChild variant="outline" size="sm"><a href={`mailto:${p.email.toLowerCase()}`}><Mail />Email</a></Button>}
      </div>
    </article>; })}</div>}
    <p className="assumptions">Contact details are reproduced as published on SAMARTH. Inclusion is not an endorsement, and none of these records currently confirms direct paddy-straw purchase from farmers.</p>
  </div></main>;
}
