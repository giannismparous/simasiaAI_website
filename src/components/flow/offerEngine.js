// fλow offer engine: the prices of Go with the fλow. SERVER ONLY.
// Imported by netlify/offer (function send-offer) to write the emailed PDF offer, and by tests.
// Never import this file from src/ components: the browser must not load prices.
// The browser uses offerCatalog.js (same parts, features and labels, without prices).
// Prices exclude VAT. Hosting and AI usage are billed at cost (as in all contracts).
//
// Sources
// - Clinics: the former /ypodochi tiers (Απαντάει 199/149, Κλείνει 249/199,
//   Φέρνει πίσω 299/249, Σηκώνει το τηλέφωνο 399/299; setup 490 €, free with annual).
// - NGOs: Oct 2026 pricing doc, per part (see NGO.combos). Pilot: 199 € for 60 days.
// - Sponsors: derived from the NGO Insights package per organisation (PROPOSAL, to confirm).
// - Size steps, add-on prices and the Greek-model tier are PROPOSALS (to confirm).
import { MODULE_IDS, NGO as NGO_CAT, MED as MED_CAT, SPONSOR as SPONSOR_CAT } from './offerCatalog.js';

export { MODULE_IDS };

const L = (el, en) => ({ el, en });
const withPrices = (list, prices) => list.map((x) => (prices[x.id] ? { ...x, ...prices[x.id] } : x));

/* ───────── NGOs, associations, care services: three parts, priced alone, cheaper together ─────────
 * The two- and three-part prices keep the Oct 2026 plans: DialogosAI = Πλοηγός (119 + 2.400),
 * DialogosAI + MetronAI = 179 + 2.900, all three = Φροντίδα (249 + 4.500).
 * PraxisAI alone, MetronAI alone and the other pairs are PROPOSALS (to confirm). */

const comboKey = (m) => MODULE_IDS.filter((id) => m[id]).map((id) => id[0]).join('');

export const NGO = {
  sizes: withPrices(NGO_CAT.sizes, {
    s: { monthly: 0, setup: 0 },
    m: { monthly: 30, setup: 300 },
    l: { monthly: 70, setup: 600 },
  }),
  // d = DialogosAI, p = PraxisAI, m = MetronAI
  combos: {
    d: { monthly: 119, setup: 2400 },
    p: { monthly: 119, setup: 2400 },
    m: { monthly: 89, setup: 1400 },
    dm: { monthly: 179, setup: 2900 },
    dp: { monthly: 199, setup: 3600 },
    pm: { monthly: 179, setup: 3000 },
    dpm: { monthly: 249, setup: 4500 },
  },
  network: { name: L('Δίκτυο', 'Network'), monthly: 450, setup: 7500 },
  features: withPrices(NGO_CAT.features, {
    viber: { monthly: 20, setup: 200 },
    whatsapp: { monthly: 20, setup: 200 },
    lang2: { monthly: 20, setup: 300 },
    shifts: { monthly: 30, setup: 0 },
    family: { monthly: 20, setup: 0 },
    ocr: { monthly: 30, setup: 300 },
    voice: { monthly: 30, setup: 0 },
    callcenter: { monthly: 30, setup: 300 },
    impact: { monthly: 50, setup: 0 },
    greek: { setup: 1500 },
  }),
  pilot: { price: 199, days: 60 },
};

export const comboPrice = (mods) => NGO.combos[comboKey(mods)] || null;
export const comboSaving = (mods) => {
  const k = comboKey(mods);
  if (k.length < 2) return null;
  const sum = k.split('').reduce((a, ch) => ({ monthly: a.monthly + NGO.combos[ch].monthly, setup: a.setup + NGO.combos[ch].setup }), { monthly: 0, setup: 0 });
  const c = NGO.combos[k];
  return { monthly: sum.monthly - c.monthly, setup: sum.setup - c.setup };
};

/* ───────── Practices & clinics: PraxisAI (CRM) is the core ───────── */

export const MED = {
  sizes: MED_CAT.sizes,
  tiers: withPrices(MED_CAT.tiers.map((t) => ({ ...t, id: t.n })), {
    1: { monthly: 199, annual: 149 },
    2: { monthly: 249, annual: 199 },
    3: { monthly: 299, annual: 249 },
    4: { monthly: 399, annual: 299 },
  }).map(({ id, ...t }) => t),
  custom: { name: L('Κλινική Global', 'Clinic Global'), from: 590, setupFrom: 4500 },
  setup: 490, // free with annual billing
  worth: L('≈ 4.700 €', '≈ €4,700'),
  features: withPrices(MED_CAT.features, { greek: { setupExtra: 1500 } }),
};

/* ───────── Sponsors: pharma, foundations, CSR (PROPOSAL derived from NGO Insights) ───────── */

export const SPONSOR = {
  causes: SPONSOR_CAT.causes,
  orgs: withPrices(SPONSOR_CAT.orgs, {
    1: { setupDiscount: 0, coord: 0 },
    '2-5': { setupDiscount: 0.2, coord: 0 },
    fed: { setupDiscount: 0.35, coord: 150 },
  }),
  perOrg: { monthly: 179, setup: 2900 }, // Πλοηγός + MetronAI
  impactPackYear: 600, // quarterly impact report + disclosure file
  options: withPrices(SPONSOR_CAT.options, {
    lang2: { perOrgMonthly: 20 },
    praxis: { perOrgMonthly: 70, perOrgSetup: 1600 },
    greek: { setup: 1500 },
  }),
};

/* ───────── Compute ───────── */

export function computeNgo(sel) {
  const size = NGO.sizes.find((s) => s.id === sel.size) || NGO.sizes[0];
  const mods = sel.modules;
  const count = MODULE_IDS.filter((id) => mods[id]).length;
  const base = comboPrice(mods) || { monthly: 0, setup: 0 };
  let monthly; let setup; let from = false;
  if (size.network) { monthly = NGO.network.monthly; setup = NGO.network.setup; from = true; } else {
    monthly = base.monthly + size.monthly;
    setup = base.setup + (mods.praxis ? size.setup : 0);
  }
  let atCost = false; const quotes = [];
  const lines = [];
  NGO.features.forEach((ft) => {
    if (ft.inc || !sel.features[ft.id]) return;
    if (ft.module !== 'all' && !mods[ft.module]) return;
    if (ft.quote) { quotes.push(ft); return; }
    if (ft.atCost) atCost = true;
    if (ft.includedWith && count >= ft.includedWith) { lines.push({ ft, included: true }); return; }
    if (!size.network) { monthly += ft.monthly || 0; setup += ft.setup || 0; }
    lines.push({ ft, monthly: ft.monthly || 0, setup: ft.setup || 0 });
  });
  const names = MODULE_IDS.filter((id) => mods[id]).map((id) => ({ dialogos: 'DialogosAI', praxis: 'PraxisAI', metron: 'MetronAI' }[id]));
  const name = size.network ? NGO.network.name : (count === 3 ? L('Ολόκληρο το fλow', 'The whole fλow') : L(names.join(' + '), names.join(' + ')));
  return { audience: 'ngo', name, monthly, setup, from, firstYear: setup + monthly * 12, atCost, quotes, lines, count, saving: size.network ? null : comboSaving(mods), pilot: NGO.pilot };
}

export function computeMed(sel, annual) {
  const size = MED.sizes.find((s) => s.id === sel.size) || MED.sizes[0];
  const f = sel.features;
  let n = size.minTier || 1;
  MED.features.forEach((ft) => { if (f[ft.id] && ft.tier && ft.tier > n) n = ft.tier; });
  const tier = MED.tiers[n - 1];
  let atCost = false; let extraSetup = 0;
  MED.features.forEach((ft) => { if (f[ft.id] && ft.atCost) { atCost = true; extraSetup += ft.setupExtra || 0; } });
  if (size.custom) {
    return { audience: 'med', name: MED.custom.name, monthly: MED.custom.from, setup: MED.custom.setupFrom + extraSetup, from: true, firstYear: MED.custom.setupFrom + extraSetup + MED.custom.from * 12, worth: null, atCost, tierN: 5, features: f, annual };
  }
  const monthly = annual ? tier.annual : tier.monthly;
  const setup = (annual ? 0 : MED.setup) + extraSetup;
  return { audience: 'med', name: tier.name, monthly, monthlyList: tier.monthly, setup, from: false, firstYear: setup + monthly * 12, worth: MED.worth, atCost, tierN: n, features: f, annual };
}

export function computeSponsor(sel) {
  const org = SPONSOR.orgs.find((o) => o.id === sel.orgs) || SPONSOR.orgs[0];
  const years = sel.years || 1;
  const o = sel.options;
  const c = org.count;
  let perOrgMonthly = SPONSOR.perOrg.monthly + (o.lang2 ? 20 : 0) + (o.praxis ? 70 : 0);
  let perOrgSetup = SPONSOR.perOrg.setup + (o.praxis ? 1600 : 0);
  const setupTotal = perOrgSetup + perOrgSetup * (1 - org.setupDiscount) * (c - 1) + (o.greek ? 1500 : 0);
  const monthlyTotal = perOrgMonthly * c + org.coord;
  const total = setupTotal + monthlyTotal * 12 * years + SPONSOR.impactPackYear * years;
  const people = Math.max(1, sel.people) * years;
  return {
    audience: 'sponsor', orgCount: c, orgLabel: org.label, years, setup: setupTotal, monthly: monthlyTotal,
    impact: SPONSOR.impactPackYear * years, total, perPerson: total / people, atCost: !!o.greek, from: org.id === 'fed',
  };
}
