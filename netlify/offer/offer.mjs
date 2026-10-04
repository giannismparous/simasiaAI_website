/*
 * Turns what a visitor chose on /go into a priced offer.
 * The browser sends only choices; every price is computed here from offerEngine.js,
 * so prices are never shown on the website and cannot be changed by the visitor.
 */
import { NGO, MED, SPONSOR, MODULE_IDS, computeNgo, computeMed, computeSponsor } from '../../src/components/flow/offerEngine.js';
import { COPY, PARTS } from './copy.mjs';

export class OfferInputError extends Error {}

const clean = (s, max) => String(s ?? '').replace(/[\u0000-\u001f\u007f<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
const bool = (o, ids) => ids.reduce((acc, id) => ({ ...acc, [id]: !!(o && o[id] === true) }), {});
const numIn = (v, min, max, def) => { const n = Number(v); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : def; };
export const EMAIL_RX = /^[^\s@<>()[\]\\,;:"]{1,64}@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

export const money = (n, lang, cents = false) => {
  const v = new Intl.NumberFormat(lang === 'en' ? 'en-IE' : 'el-GR', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 }).format(n);
  return lang === 'en' ? `€${v}` : `${v} €`;
};

/* Validate and normalise the request body. Throws OfferInputError on bad input. */
export const readRequest = (body) => {
  const b = body && typeof body === 'object' ? body : {};
  const lang = b.lang === 'en' ? 'en' : 'el';
  const aud = ['ngo', 'med', 'sponsor'].includes(b.aud) ? b.aud : null;
  if (!aud) throw new OfferInputError('aud');
  const contact = {
    name: clean(b.contact && b.contact.name, 80),
    org: clean(b.contact && b.contact.org, 120),
    email: clean(b.contact && b.contact.email, 120).toLowerCase(),
    phone: clean(b.contact && b.contact.phone, 30),
  };
  if (!contact.name) throw new OfferInputError('name');
  if (!EMAIL_RX.test(contact.email)) throw new OfferInputError('email');
  if (b.consent !== true) throw new OfferInputError('consent');

  let sel;
  if (aud === 'ngo') {
    const s = b.ngo || {};
    const modules = bool(s.modules, MODULE_IDS);
    if (!MODULE_IDS.some((id) => modules[id])) throw new OfferInputError('modules');
    sel = {
      size: NGO.sizes.some((x) => x.id === s.size) ? s.size : 's',
      modules,
      features: bool(s.features, NGO.features.filter((f) => !f.inc).map((f) => f.id)),
    };
  } else if (aud === 'med') {
    const s = b.med || {};
    const features = bool(s.features, MED.features.map((f) => f.id));
    MED.features.filter((f) => f.locked).forEach((f) => { features[f.id] = true; });
    sel = { size: MED.sizes.some((x) => x.id === s.size) ? s.size : '1', features };
  } else {
    const s = b.sponsor || {};
    const options = bool(s.options, SPONSOR.options.map((f) => f.id));
    SPONSOR.options.filter((f) => f.locked).forEach((f) => { options[f.id] = true; });
    sel = {
      orgs: SPONSOR.orgs.some((x) => x.id === s.orgs) ? s.orgs : '1',
      people: Math.round(numIn(s.people, 200, 20000, 2000)),
      years: s.years === 2 ? 2 : 1,
      cause: Math.round(numIn(s.cause, 0, SPONSOR.causes.length - 1, 0)),
      options,
    };
  }

  const custom = (Array.isArray(b.custom) ? b.custom : []).map((x) => clean(x, 90)).filter(Boolean).slice(0, 12);
  const answers = (Array.isArray(b.answers) ? b.answers : []).slice(0, 10)
    .map((x) => ({ q: clean(x && x.q, 160), a: clean(x && x.a, 200) })).filter((x) => x.q && x.a);
  const t = b.time || {};
  const time = { month: Math.round(numIn(t.month, 0, 2000, 0)), days: Math.round(numIn(t.days, 0, 2000, 0)), appts: Math.round(numIn(t.appts, 0, 2000, 0)) };
  return { lang, aud, contact, sel, custom, answers, time };
};

const refFor = (now) => {
  const d = now.toISOString().slice(0, 10).replace(/-/g, '');
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `FL-${d}-${r}`;
};

/* Build everything the PDF and the emails need. */
export const buildOffer = (req, now = new Date()) => {
  const { lang, aud, sel } = req;
  const c = COPY[lang];
  const L = (x) => (x && typeof x === 'object' ? x[lang] : x);
  const valid = new Date(now.getTime() + 30 * 24 * 3600 * 1000);
  const dateFmt = (d) => d.toLocaleDateString(c.locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Athens' });
  const offer = { ...req, ref: refFor(now), date: dateFmt(now), validUntil: dateFmt(valid), who: c.who[aud] };

  if (aud === 'ngo') {
    const r = computeNgo(sel);
    const size = NGO.sizes.find((x) => x.id === sel.size);
    offer.parts = MODULE_IDS.filter((id) => sel.modules[id]).map((id) => ({
      id, ...PARTS[id], word: PARTS[id].word[lang], role: PARTS[id].role[lang],
      included: NGO.features.filter((f) => f.module === id && f.inc).map((f) => L(f.label)),
      options: r.lines.filter((l) => l.ft.module === id).map((l) => ({
        label: L(l.ft.label),
        price: l.included ? c.freeWithTwo : [l.monthly ? `+${money(l.monthly, lang)}${c.perMonth}` : '', l.setup ? `+${money(l.setup, lang)} ${c.oneOff}` : ''].filter(Boolean).join(' · '),
      })),
    }));
    offer.whole = r.lines.filter((l) => l.ft.module === 'all').map((l) => ({ label: L(l.ft.label), price: `+${money(l.setup, lang)} ${c.oneOff} · ${c.atCost}` }));
    offer.quotes = r.quotes.map((f) => L(f.label));
    offer.price = {
      kind: 'ngo', name: L(r.name), from: r.from, size: L(size.label),
      monthly: money(r.monthly, lang), setup: money(r.setup, lang), firstYear: money(r.firstYear, lang),
      saving: r.saving && r.saving.monthly > 0 ? c.saving(money(r.saving.monthly, lang), money(r.saving.setup, lang)) : null,
      atCost: r.atCost, raw: { monthly: r.monthly, setup: r.setup },
    };
  } else if (aud === 'med') {
    const a = computeMed(sel, true);
    const m = computeMed(sel, false);
    const size = MED.sizes.find((x) => x.id === sel.size);
    const group = { logos: 'dialogos', praxis: 'praxis', insights: 'metron' };
    offer.parts = MODULE_IDS.map((id) => ({
      id, ...PARTS[id], word: PARTS[id].word[lang], role: PARTS[id].role[lang],
      included: MED.features.filter((f) => group[f.group] === id && f.locked).map((f) => L(f.label)),
      options: MED.features.filter((f) => group[f.group] === id && !f.locked && !f.quote && sel.features[f.id]).map((f) => ({ label: L(f.label), price: '' })),
    }));
    offer.whole = MED.features.filter((f) => f.group === 'extra' && sel.features[f.id] && !f.soon).map((f) => ({ label: L(f.label), price: f.setupExtra ? `+${money(f.setupExtra, lang)} ${c.oneOff} · ${c.atCost}` : '' }));
    offer.interest = MED.features.filter((f) => f.soon && sel.features[f.id]).map((f) => L(f.label));
    offer.quotes = MED.features.filter((f) => f.quote && sel.features[f.id]).map((f) => L(f.label));
    offer.price = {
      kind: 'med', name: L(a.name), from: a.from, size: L(size.label),
      annual: money(a.monthly, lang), annualSetup: money(a.setup, lang),
      monthly: money(m.monthly, lang), monthlySetup: money(m.setup, lang),
      firstYearAnnual: money(a.firstYear, lang), atCost: a.atCost,
      raw: { monthly: a.monthly, setup: a.setup },
    };
  } else {
    const r = computeSponsor(sel);
    const org = SPONSOR.orgs.find((o) => o.id === sel.orgs);
    offer.parts = [
      { id: 'dialogos', ...PARTS.dialogos, word: PARTS.dialogos.word[lang], role: PARTS.dialogos.role[lang], included: lang === 'en' ? ['Answers the organisation\'s people 24/7', 'Only from the organisation\'s approved sources'] : ['Απαντά 24/7 στους ανθρώπους του οργανισμού', 'Μόνο από εγκεκριμένες πηγές του οργανισμού'], options: sel.options.lang2 ? [{ label: L(SPONSOR.options.find((f) => f.id === 'lang2').label), price: '' }] : [] },
      ...(sel.options.praxis ? [{ id: 'praxis', ...PARTS.praxis, word: PARTS.praxis.word[lang], role: PARTS.praxis.role[lang], included: [L(SPONSOR.options.find((f) => f.id === 'praxis').note)], options: [] }] : []),
      { id: 'metron', ...PARTS.metron, word: PARTS.metron.word[lang], role: PARTS.metron.role[lang], included: SPONSOR.options.filter((f) => f.locked).map((f) => L(f.label)), options: [] },
    ];
    offer.whole = sel.options.greek ? [{ label: L(SPONSOR.options.find((f) => f.id === 'greek').label), price: `+${money(1500, lang)} ${c.oneOff} · ${c.atCost}` }] : [];
    offer.quotes = [];
    offer.price = {
      kind: 'sponsor', from: r.from, years: r.years,
      total: money(r.total, lang), perPerson: money(r.perPerson, lang, true),
      orgs: L(org.label), people: new Intl.NumberFormat(c.locale).format(sel.people),
      cause: L(SPONSOR.causes[sel.cause]),
      breakdown: c.spBreak(money(r.setup, lang), money(r.monthly, lang), money(r.impact, lang)),
      atCost: r.atCost, raw: { total: r.total },
    };
  }
  return offer;
};

/* One short line for subjects and the lead email */
export const priceLine = (offer) => {
  const c = COPY[offer.lang]; const p = offer.price;
  if (p.kind === 'ngo') return `${p.from ? `${c.from} ` : ''}${p.monthly}${c.perMonth} + ${p.setup} ${c.setup.toLowerCase()}`;
  if (p.kind === 'med') return `${p.from ? `${c.from} ` : ''}${p.annual}${c.perMonth} (${c.medAnnual.toLowerCase()})`;
  return `${p.from ? `${c.from} ` : ''}${p.total} · ${p.perPerson} ${c.spPerPerson}`;
};
