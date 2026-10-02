import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { ClinicIllustration, NgoIllustration } from '../GateIllustrations';
import { sendContactEmail } from '../../services/emailService';
import { builderCopy } from './builderContent';
import { NGO, MED, SPONSOR, computeNgo, computeMed, computeSponsor } from './offerEngine';
import { euro } from './FlowParts';

const euroCents = (n, lang) => { const v = new Intl.NumberFormat(lang === 'en' ? 'en-IE' : 'el-GR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n); return lang === 'en' ? `€${v}` : `${v} €`; };
import './FlowBuilder.css';

/*
 * /flow/build: a visitor builds their own fλow and gets an offer.
 * Left: five short steps. Right: the live flow (what hurts today on the left,
 * the λ in the middle, what they chose on the right) and the price.
 */

const AUDIENCES = ['ngo', 'med', 'sponsor'];
const GROUP_COLOR = { logos: '#6a9bcc', praxis: '#9fb383', insights: '#d97757', extra: '#b0aea5' };

const initialFeatures = (list) => list.reduce((acc, f) => ({ ...acc, [f.id]: !!f.on }), {});

/* Animated number for the price ticker */
const useTween = (value, ms = 450) => {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = performance.now(); const a = from.current; const b = value;
    if (a === b) return undefined;
    let raf = 0;
    const step = (t) => {
      const k = Math.min(1, (t - start) / ms); const e = 1 - (1 - k) ** 3;
      setShown(a + (b - a) * e);
      if (k < 1) raf = requestAnimationFrame(step); else from.current = b;
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); from.current = b; };
  }, [value, ms]);
  return shown;
};

/* A sponsor, drawn in the site's character style */
const SponsorIllustration = () => (
  <div className="gate-illus" aria-hidden="true">
    <svg viewBox="0 0 280 280" fill="none" className="gate-illus-svg">
      <ellipse cx="140" cy="244" rx="74" ry="7" fill="#faf9f5" opacity="0.06" />
      <rect x="104" y="204" width="18" height="36" rx="8" fill="#3a3630" />
      <rect x="128" y="204" width="18" height="36" rx="8" fill="#3a3630" />
      <rect x="96" y="132" width="58" height="80" rx="16" fill="#6a9bcc" />
      <path d="M125 132 L117 150 L125 168 L133 150 Z" fill="#faf9f5" opacity="0.85" />
      <ellipse cx="88" cy="160" rx="10" ry="7" fill="#6a9bcc" transform="rotate(-25 88 160)" />
      <ellipse cx="164" cy="150" rx="11" ry="7" fill="#6a9bcc" transform="rotate(-35 164 150)" />
      <ellipse cx="125" cy="98" rx="27" ry="29" fill="#f2ede6" />
      <ellipse cx="125" cy="81" rx="27" ry="13" fill="#2c2825" />
      <circle cx="116" cy="100" r="3" fill="#1a1816" />
      <circle cx="134" cy="100" r="3" fill="#1a1816" />
      <path d="M117 111 Q125 117 133 111" stroke="#1a1816" strokeWidth="2" fill="none" strokeLinecap="round" />
      <g transform="translate(184 106)">
        <path d="M0 10 C0 -2, 18 -4, 18 8 C18 -4, 36 -2, 36 10 C36 24, 18 32, 18 38 C18 32, 0 24, 0 10 Z" fill="#d97757" />
      </g>
      <path d="M166 146 C 180 140, 190 136, 198 126" stroke="#d97757" strokeWidth="1.6" strokeDasharray="4 4" fill="none" opacity="0.7" />
      <circle cx="60" cy="80" r="4" fill="#d97757" opacity="0.6" />
      <circle cx="226" cy="214" r="3" fill="#faf9f5" opacity="0.5" />
    </svg>
  </div>
);

/* The live flow: pains (left, tangled) → λ → chosen features (right, calm) */
const LiveFlow = ({ pains, features, price, c, lang }) => {
  const W = 560; const H = 440; const NX = 270; const NY = 200;
  const leftItems = pains.length ? pains : [];
  const L = leftItems.length; const R = features.length;
  const ly = (i) => (L <= 1 ? NY : 60 + (i * (H - 150)) / (L - 1));
  const ry = (i) => (R <= 1 ? NY : 40 + (i * (H - 110)) / (R - 1));
  const shownPrice = useTween(price.value);
  return (
    <svg className="flb-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={c.graphic.aria}>
      <defs>
        <radialGradient id="flbGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#d97757" stopOpacity="0.28" />
          <stop offset="1" stopColor="#d97757" stopOpacity="0" />
        </radialGradient>
      </defs>
      <text x="16" y="22" className="flb-g-cap">{c.graphic.today}</text>
      <text x={W - 16} y="22" textAnchor="end" className="flb-g-cap">{c.graphic.withFlow}</text>
      {leftItems.map((p, i) => {
        const y = ly(i); const w = 18 + (i % 3) * 14;
        return (
          <g key={p}>
            <path className="flb-tangle" d={`M 8 ${y + 14} C ${70} ${y - w}, ${110} ${y + w + 20}, ${150} ${(y + NY) / 2 + ((i % 2) ? 26 : -26)} S ${210} ${NY + ((i % 2) ? -40 : 40)}, ${NX - 46} ${NY + (i - L / 2) * 4}`} />
            <text x="12" y={y + 4} className="flb-g-pain">{p}</text>
          </g>
        );
      })}
      {features.map((f, i) => {
        const y = ry(i);
        return (
          <g key={f.id} className="flb-calm-g">
            <path className="flb-calm" style={{ stroke: GROUP_COLOR[f.group] }} d={`M ${NX + 46} ${NY + (i - R / 2) * 3} C ${NX + 110} ${NY}, ${NX + 120} ${y}, ${W - 150} ${y} L ${W - 140} ${y}`} />
            <circle cx={W - 140} cy={y} r="3.5" style={{ fill: GROUP_COLOR[f.group] }} />
            <text x={W - 132} y={y + 4} className="flb-g-feat">{f.short}</text>
          </g>
        );
      })}
      {!R && <text x={W - 16} y={NY + 4} textAnchor="end" className="flb-g-pain">{c.graphic.empty}</text>}
      <circle cx={NX} cy={NY} r="110" fill="url(#flbGlow)" />
      <circle cx={NX} cy={NY} r="46" className="flb-node" />
      <text x={NX} y={NY + 9} textAnchor="middle" className="flb-node-t">f<tspan className="flb-node-l">λ</tspan>ow</text>
      <text x={NX} y={NY + 84} textAnchor="middle" className="flb-g-price">{price.from ? `${c.offer.from} ` : ''}{price.cents ? euroCents(shownPrice, lang) : euro(shownPrice, lang)}</text>
      <text x={NX} y={NY + 104} textAnchor="middle" className="flb-g-per">{price.label}</text>
    </svg>
  );
};

const Chip = ({ on, onClick, children }) => (
  <button type="button" className={`flb-chip${on ? ' is-on' : ''}`} aria-pressed={on} onClick={onClick}>{children}</button>
);

const FlowBuilder = () => {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'el';
  const c = builderCopy[lang];
  const location = useLocation();
  const qp = new URLSearchParams(location.search || '');
  const [aud, setAud] = useState(AUDIENCES.includes(qp.get('for')) ? qp.get('for') : null);
  useEffect(() => { const f = new URLSearchParams(location.search || '').get('for'); if (AUDIENCES.includes(f)) setAud(f); }, [location.search]);

  const [ngoSel, setNgoSel] = useState({ size: 's', features: initialFeatures(NGO.features) });
  const [medSel, setMedSel] = useState({ size: '1', features: initialFeatures(MED.features) });
  const [annual, setAnnual] = useState(true);
  const [spSel, setSpSel] = useState({ orgs: '1', people: 2000, years: 1, cause: 0, options: initialFeatures(SPONSOR.options) });
  const [pains, setPains] = useState({ ngo: [], med: [], sponsor: [] });
  const [q2, setQ2] = useState({}); const [q3, setQ3] = useState(null);
  const [form, setForm] = useState({ name: '', org: '', email: '', phone: '', consent: false });
  const [status, setStatus] = useState({ state: 'idle', mailto: '' });

  const ngo = useMemo(() => computeNgo(ngoSel), [ngoSel]);
  const med = useMemo(() => computeMed(medSel, annual), [medSel, annual]);
  const sp = useMemo(() => computeSponsor(spSel), [spSel]);
  const offer = aud === 'ngo' ? ngo : aud === 'med' ? med : aud === 'sponsor' ? sp : null;

  // features shown on the right of the live flow
  const chosen = useMemo(() => {
    if (aud === 'ngo') return NGO.features.filter((f) => ngo.features[f.id]).map((f) => ({ id: f.id, group: f.group, short: f.tag[lang], full: f.label[lang] }));
    if (aud === 'med') return MED.features.filter((f) => medSel.features[f.id] && !f.soon).map((f) => ({ id: f.id, group: f.group, short: f.tag[lang], full: f.label[lang] }));
    if (aud === 'sponsor') return SPONSOR.options.filter((f) => spSel.options[f.id]).map((f) => ({ id: f.id, group: f.id === 'praxis' ? 'praxis' : f.id === 'lang2' ? 'logos' : 'insights', short: f.tag[lang], full: f.label[lang] }));
    return [];
  }, [aud, ngo, medSel, spSel, lang]);
  const painList = aud ? c.pains[aud] : [];
  const painsShown = aud ? (pains[aud].length ? pains[aud].map((i) => painList[i]) : painList.slice(0, 3)) : [];
  const price = !offer ? { value: 0, label: '' }
    : aud === 'sponsor' ? { value: offer.perPerson, label: c.offer.perPerson, from: offer.from, cents: true }
      : { value: offer.monthly, label: c.perMonth.replace('/', ''), from: offer.from };

  const toggle = (setter, key) => (id) => setter((s) => ({ ...s, [key]: { ...s[key], [id]: !s[key][id] } }));
  // NGO: switching PraxisAI off also switches off what depends on it
  const toggleNgo = (id) => setNgoSel((s) => {
    const on = !computeNgo(s).features[id];
    const features = { ...s.features, [id]: on };
    if (!on && id === 'praxis') { features.family = false; features.voice = false; }
    if (!on && id === 'insights') { features.praxis = false; features.family = false; features.voice = false; }
    return { ...s, features };
  });
  const togglePain = (i) => setPains((s) => ({ ...s, [aud]: s[aud].includes(i) ? s[aud].filter((x) => x !== i) : [...s[aud], i] }));

  const offerText = () => {
    if (!offer) return '';
    const lines = [`fλow · ${c.who[aud].name}`];
    if (aud === 'sponsor') {
      lines.push(`${c.size.sponsor[0]} ${SPONSOR.orgs.find((o) => o.id === spSel.orgs).label[lang]}`);
      lines.push(`${c.size.sponsor[1]} ${spSel.people}`);
      lines.push(`${c.size.sponsor[2]} ${spSel.years}`);
      lines.push(`${c.size.sponsor[3]} ${SPONSOR.causes[spSel.cause][lang]}`);
      lines.push(`${c.offer.total}: ${euro(sp.total, lang)}, ${euroCents(sp.perPerson, lang)} ${c.offer.perPerson}`);
    } else {
      lines.push(`${c.offer.plan}: ${offer.name[lang]}`);
      lines.push(`${c.offer.monthly}: ${offer.from ? `${c.offer.from} ` : ''}${euro(offer.monthly, lang)}${aud === 'med' ? ` (${annual ? c.billing[1] : c.billing[0]})` : ''}`);
      lines.push(`${c.offer.setup}: ${euro(offer.setup, lang)}`);
    }
    lines.push(`${lang === 'en' ? 'Selected' : 'Επιλογές'}: ${chosen.map((f) => f.full).join(', ')}`);
    if (pains[aud].length) lines.push(`${c.pains.title} ${pains[aud].map((i) => painList[i]).join(', ')}`);
    if (q2[aud] !== undefined) lines.push(`${c.pains.q2[aud]} ${c.pains.a2[aud][q2[aud]]}`);
    if (q3 !== null) lines.push(`${c.pains.q3} ${c.pains.a3[q3]}`);
    if (form.phone) lines.push(`${c.contact.phone}: ${form.phone}`);
    return lines.join('\n');
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.consent) { setStatus({ state: 'invalid', mailto: '' }); return; }
    setStatus({ state: 'sending', mailto: '' });
    const text = offerText();
    try {
      await sendContactEmail({ fromName: form.name, fromEmail: form.email, organizationType: `fλow · ${c.who[aud].name}`, companyName: form.org, message: text });
      setStatus({ state: 'sent', mailto: '' });
    } catch (err) {
      const mailto = `mailto:contact@simasiaai.gr?subject=${encodeURIComponent(`fλow · ${c.who[aud].name} · ${form.org || form.name}`)}&body=${encodeURIComponent(text.slice(0, 1800))}`;
      setStatus({ state: 'fallback', mailto });
    }
  };

  const featureRow = (f, on, onToggle, priceNode) => (
    <label key={f.id} className={`flb-feat${on ? ' is-on' : ''}${f.locked ? ' is-locked' : ''}${f.soon ? ' is-soon' : ''}`}>
      <input type="checkbox" checked={!!on} disabled={f.locked} onChange={() => onToggle(f.id)} />
      <span className="flb-feat-dot" style={{ background: GROUP_COLOR[f.group] || GROUP_COLOR.insights }} aria-hidden="true" />
      <span className="flb-feat-txt"><b>{f.label[lang]}</b><small>{f.note[lang]}</small></span>
      <span className="flb-feat-price">{priceNode}</span>
    </label>
  );

  const ngoPrice = (f) => {
    if (f.locked) return c.always;
    if (f.tier) {
      const t = NGO.tiers.find((x) => x.id === f.tier); const base = NGO.tiers[0];
      return f.id === 'insights' ? `+${euro(t.monthly - base.monthly, lang)}${c.perMonth}` : `+${euro(t.monthly - NGO.tiers[1].monthly, lang)}${c.perMonth}`;
    }
    const tierIdx = NGO.tiers.findIndex((t) => t.id === ngo.tierId);
    const incIdx = f.includedFrom ? NGO.tiers.findIndex((t) => t.id === f.includedFrom) : 99;
    if (ngo.tierId === 'network' || tierIdx >= incIdx) return c.included;
    if (f.atCost) return `+${euro(f.setup, lang)} ${c.setup}, ${c.atCost}`;
    return `+${euro(f.monthly, lang)}${c.perMonth}`;
  };
  const medPrice = (f) => {
    if (f.locked) return c.always;
    if (f.soon) return c.soon;
    if (f.atCost) return `+${euro(f.setupExtra, lang)} ${c.setup}, ${c.atCost}`;
    if (med.tierN >= f.tier) return c.included;
    const t = MED.tiers[f.tier - 1];
    return `${MED.tiers[f.tier - 1].name[lang]} ${euro(annual ? t.annual : t.monthly, lang)}${c.perMonth}`;
  };
  const spPrice = (f) => {
    if (f.locked) return c.included;
    if (f.atCost) return `+${euro(f.setup, lang)} ${c.setup}, ${c.atCost}`;
    return `+${euro(f.perOrgMonthly, lang)}${c.perMonth}${f.perOrgSetup ? ` + ${euro(f.perOrgSetup, lang)}` : ''} ${lang === 'en' ? 'per org' : 'ανά οργανισμό'}`;
  };

  const groups = aud === 'ngo' ? ['insights', 'logos', 'praxis', 'extra'] : ['praxis', 'logos', 'insights', 'extra'];
  const groupTitle = (g) => { const [n, v] = c.groups[g].split(' · '); return <h4 className="flb-group"><span style={{ background: GROUP_COLOR[g] }} aria-hidden="true" />{n}{v && <em> {v}</em>}</h4>; };

  return (
    <div className="flb" data-aud={aud || 'none'}>
      <header className="flb-head">
        <div className="flb-in">
          <p className="flb-mark">f<span>λ</span>ow</p>
          <h1>{c.title}</h1>
          <p className="flb-lead">{c.lead}</p>
        </div>
      </header>

      <div className="flb-in flb-body">
        <div className="flb-steps">
          {/* 1. who */}
          <section className="flb-step" aria-labelledby="flb-s1">
            <h2 id="flb-s1"><span className="flb-n">1</span>{c.steps[0]}</h2>
            <div className="flb-doors">
              {AUDIENCES.map((a) => (
                <button key={a} type="button" className={`flb-door${aud === a ? ' is-on' : ''}`} aria-pressed={aud === a} onClick={() => setAud(a)}>
                  {a === 'ngo' ? <NgoIllustration /> : a === 'med' ? <ClinicIllustration /> : <SponsorIllustration />}
                  <b>{c.who[a].name}</b>
                  <small>{c.who[a].line}</small>
                </button>
              ))}
            </div>
            {aud && <p className="flb-pitch">{c.who[aud].pitch}</p>}
          </section>

          {aud && (
            <>
              {/* 2. size */}
              <section className="flb-step" aria-labelledby="flb-s2">
                <h2 id="flb-s2"><span className="flb-n">2</span>{c.steps[1]}</h2>
                {aud === 'ngo' && (<><p className="flb-q">{c.size.ngo}</p><div className="flb-chips">{NGO.sizes.map((s) => <Chip key={s.id} on={ngoSel.size === s.id} onClick={() => setNgoSel((x) => ({ ...x, size: s.id }))}>{s.label[lang]}</Chip>)}</div></>)}
                {aud === 'med' && (<><p className="flb-q">{c.size.med}</p><div className="flb-chips">{MED.sizes.map((s) => <Chip key={s.id} on={medSel.size === s.id} onClick={() => setMedSel((x) => ({ ...x, size: s.id }))}>{s.label[lang]}</Chip>)}</div></>)}
                {aud === 'sponsor' && (
                  <>
                    <p className="flb-q">{c.size.sponsor[0]}</p>
                    <div className="flb-chips">{SPONSOR.orgs.map((o) => <Chip key={o.id} on={spSel.orgs === o.id} onClick={() => setSpSel((x) => ({ ...x, orgs: o.id }))}>{o.label[lang]}</Chip>)}</div>
                    <label className="flb-range">
                      <span className="flb-q">{c.size.sponsor[1]}</span>
                      <output>{new Intl.NumberFormat(lang === 'en' ? 'en-IE' : 'el-GR').format(spSel.people)} {c.size.people}</output>
                      <input type="range" min="200" max="20000" step="100" value={spSel.people} onChange={(e) => setSpSel((x) => ({ ...x, people: Number(e.target.value) }))} />
                    </label>
                    <p className="flb-q">{c.size.sponsor[2]}</p>
                    <div className="flb-chips">{[1, 2].map((y) => <Chip key={y} on={spSel.years === y} onClick={() => setSpSel((x) => ({ ...x, years: y }))}>{c.size.years[y - 1]}</Chip>)}</div>
                    <p className="flb-q">{c.size.sponsor[3]}</p>
                    <div className="flb-chips">{SPONSOR.causes.map((cz, i) => <Chip key={cz.el} on={spSel.cause === i} onClick={() => setSpSel((x) => ({ ...x, cause: i }))}>{cz[lang]}</Chip>)}</div>
                  </>
                )}
              </section>

              {/* 3. features */}
              <section className="flb-step" aria-labelledby="flb-s3">
                <h2 id="flb-s3"><span className="flb-n">3</span>{c.steps[2]}</h2>
                {aud === 'med' && (
                  <div className="flb-billing">
                    <div className="flb-chips">{c.billing.map((b, i) => <Chip key={b} on={annual === (i === 1)} onClick={() => setAnnual(i === 1)}>{b}</Chip>)}</div>
                    <small>{c.annualNote}</small>
                  </div>
                )}
                {aud !== 'sponsor' && groups.map((g) => {
                  const list = (aud === 'ngo' ? NGO : MED).features.filter((f) => f.group === g);
                  if (!list.length) return null;
                  return (
                    <div key={g} className="flb-fgroup">
                      {groupTitle(g)}
                      {list.map((f) => (aud === 'ngo'
                        ? featureRow(f, ngo.features[f.id], toggleNgo, ngoPrice(f))
                        : featureRow(f, medSel.features[f.id], toggle(setMedSel, 'features'), medPrice(f))))}
                    </div>
                  );
                })}
                {aud === 'sponsor' && (
                  <div className="flb-fgroup">
                    {SPONSOR.options.map((f) => featureRow({ ...f, group: f.id === 'praxis' ? 'praxis' : f.id === 'lang2' ? 'logos' : f.id === 'greek' ? 'extra' : 'insights' }, spSel.options[f.id], toggle(setSpSel, 'options'), spPrice(f)))}
                  </div>
                )}
              </section>

              {/* 4. today */}
              <section className="flb-step" aria-labelledby="flb-s4">
                <h2 id="flb-s4"><span className="flb-n">4</span>{c.steps[3]}</h2>
                <p className="flb-q">{c.pains.title}</p>
                <p className="flb-hint">{c.pains.hint}</p>
                <div className="flb-chips">{painList.map((p, i) => <Chip key={p} on={pains[aud].includes(i)} onClick={() => togglePain(i)}>{p}</Chip>)}</div>
                <p className="flb-q">{c.pains.q2[aud]}</p>
                <div className="flb-chips">{c.pains.a2[aud].map((a, i) => <Chip key={a} on={q2[aud] === i} onClick={() => setQ2((s) => ({ ...s, [aud]: i }))}>{a}</Chip>)}</div>
                <p className="flb-q">{c.pains.q3}</p>
                <div className="flb-chips">{c.pains.a3.map((a, i) => <Chip key={a} on={q3 === i} onClick={() => setQ3(i)}>{a}</Chip>)}</div>
              </section>

              {/* 5. offer */}
              <section className="flb-step" id="flb-offer" aria-labelledby="flb-s5">
                <h2 id="flb-s5"><span className="flb-n">5</span>{c.steps[4]}</h2>
                <article className="flb-offer flb-print">
                  <header className="flb-offer-head">
                    <p className="flb-offer-brand">f<span>λ</span>ow <small>SimasiaAI, contact@simasiaai.gr</small></p>
                    <p className="flb-offer-for">{c.who[aud].name}{aud === 'sponsor' ? `, ${SPONSOR.causes[spSel.cause][lang]}` : ''}</p>
                  </header>
                  {aud !== 'sponsor' ? (
                    <>
                      <p className="flb-offer-plan">{c.offer.plan}: <b>{offer.name[lang]}</b></p>
                      <dl className="flb-offer-nums">
                        <div><dt>{c.offer.monthly}</dt><dd>{offer.from ? `${c.offer.from} ` : ''}{euro(offer.monthly, lang)}<small>{c.perMonth}</small></dd></div>
                        <div><dt>{c.offer.setup}</dt><dd>{offer.from ? `${c.offer.from} ` : ''}{euro(offer.setup, lang)}</dd></div>
                        <div><dt>{c.offer.firstYear}</dt><dd>{offer.from ? `${c.offer.from} ` : ''}{euro(offer.firstYear, lang)}</dd></div>
                      </dl>
                      {offer.worth && <p className="flb-offer-worth">{c.offer.worth}: <s>{offer.worth[lang]}</s></p>}
                      {offer.from && <p className="flb-offer-note">{c.offer.custom}</p>}
                      {offer.atCost && <p className="flb-offer-note">+ {c.atCost}</p>}
                      <ul className="flb-offer-list">{chosen.map((f) => <li key={f.id}>{f.full}</li>)}</ul>
                      <p className="flb-offer-g">{aud === 'med' ? c.offer.guaranteeMed : c.offer.guarantee}</p>
                      {aud === 'ngo' && <p className="flb-offer-note">{c.offer.pilot}</p>}
                      {aud === 'ngo' && <p className="flb-offer-note">{c.offer.funding}</p>}
                    </>
                  ) : (
                    <>
                      <dl className="flb-offer-nums">
                        <div><dt>{c.offer.total}</dt><dd>{sp.from ? `${c.offer.from} ` : ''}{euro(sp.total, lang)}</dd></div>
                        <div><dt>{c.offer.perPerson}</dt><dd>{euroCents(sp.perPerson, lang)}</dd></div>
                        <div><dt>{c.offer.orgs}</dt><dd>{SPONSOR.orgs.find((o) => o.id === spSel.orgs).label[lang]}</dd></div>
                      </dl>
                      <h3 className="flb-offer-h">{c.offer.sponsorWhat}</h3>
                      <ul className="flb-offer-list">{c.offer.sponsorList.map((x) => <li key={x}>{x}</li>)}{chosen.filter((f) => !['impact', 'disclosure'].includes(f.id)).map((f) => <li key={f.id}>{f.full}</li>)}</ul>
                      <p className="flb-offer-note">{c.offer.proof}</p>
                      {sp.atCost && <p className="flb-offer-note">+ {c.atCost}</p>}
                    </>
                  )}
                  <div className="flb-one">
                    <p>{c.offer.oneNumber}</p>
                    <b>{c.offer.oneNumberText}</b>
                  </div>
                  <p className="flb-offer-fine">{c.offer.note}</p>
                </article>

                <form className="flb-form" onSubmit={submit} noValidate>
                  <h3>{c.contact.title}</h3>
                  <p className="flb-hint">{c.contact.lead}</p>
                  <div className="flb-fields">
                    <label><span>{c.contact.name}</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" required /></label>
                    <label><span>{c.contact.org}</span><input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} autoComplete="organization" /></label>
                    <label><span>{c.contact.email}</span><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" required /></label>
                    <label><span>{c.contact.phone}</span><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" /></label>
                  </div>
                  <label className="flb-consent"><input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} /> <span>{c.contact.consent}</span></label>
                  <div className="flb-actions">
                    <button type="submit" className="fl-btn" disabled={status.state === 'sending'}>{status.state === 'sending' ? c.contact.sending : c.contact.send}</button>
                    <button type="button" className="flb-print-btn" onClick={() => window.print()}>{aud === 'sponsor' ? c.contact.printSponsor : c.contact.print}</button>
                  </div>
                  <p role="status" className="flb-status">
                    {status.state === 'invalid' && c.contact.required}
                    {status.state === 'sent' && c.contact.sent}
                    {status.state === 'fallback' && (<>{c.contact.fallback} <a href={status.mailto}>{c.contact.fallbackLink}</a></>)}
                  </p>
                </form>
              </section>
            </>
          )}
        </div>

        <aside className="flb-live" aria-label={c.graphic.aria}>
          <div className="flb-live-in">
            <LiveFlow pains={painsShown} features={chosen} price={price} c={c} lang={lang} />
            {offer && (
              <div className="flb-ticker">
                <span>{aud === 'sponsor' ? `${c.offer.total} ${euro(sp.total, lang)}` : offer.name[lang]}</span>
                <a href="#flb-offer">{c.summaryBar}</a>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FlowBuilder;
