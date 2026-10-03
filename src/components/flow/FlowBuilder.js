import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { ClinicIllustration, NgoIllustration } from '../GateIllustrations';
import { sendContactEmail } from '../../services/emailService';
import { builderCopy } from './builderContent';
import { threeContent } from './flowThreeContent';
import { NGO, MED, SPONSOR, MODULE_IDS, computeNgo, computeMed, computeSponsor } from './offerEngine';
import { euro } from './FlowParts';
import { MODULES } from './modules';
import { TimeBack } from './FlowThree';
import './FlowBuilder.css';

/*
 * /go: «Go with the fλow». The visitor tells us about their day (a few questions,
 * one at a time), the answers design a first fλow from the three parts
 * (DialogosAI, PraxisAI, MetronAI), they change it as they like, add their own
 * requests (unpriced, marked for pricing), see the time that comes back, and get
 * the offer. No fixed packages. Right: the live flow and the price.
 */

const euroCents = (n, lang) => { const v = new Intl.NumberFormat(lang === 'en' ? 'en-IE' : 'el-GR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n); return lang === 'en' ? `€${v}` : `${v} €`; };
const AUDIENCES = ['ngo', 'med', 'sponsor'];
const NAME = { dialogos: 'DialogosAI', praxis: 'PraxisAI', metron: 'MetronAI' };
const MED_GROUP = { logos: 'dialogos', praxis: 'praxis', insights: 'metron', extra: 'all' };
const SP_GROUP = { impact: 'metron', disclosure: 'metron', lang2: 'dialogos', praxis: 'praxis', greek: 'all' };
const SP_INC = {
  el: ['Απαντά 24/7 στους ανθρώπους του οργανισμού', 'Μόνο από εγκεκριμένες πηγές του οργανισμού', '«Με την υποστήριξη του …» σε κάθε συνομιλία'],
  en: ['Answers the organisation\'s people 24/7', 'Only from the organisation\'s approved sources', '"Supported by …" in every conversation'],
};
const short = (s, n = 26) => (s.length > n ? `${s.slice(0, n - 1).trim()}…` : s);
const initialFeatures = (list) => list.reduce((acc, f) => ({ ...acc, [f.id]: !!f.on }), {});
const parseMods = (m) => (m && /^[dpm]{1,3}$/.test(m) ? { dialogos: m.includes('d'), praxis: m.includes('p'), metron: m.includes('m') } : null);

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
    </svg>
  </div>
);

/* The live flow: what is hard today (left) → λ → the three parts (right) */
const LiveFlow = ({ pains, parts, price, c, lang }) => {
  const W = 560; const H = 460; const NX = 250; const NY = 210;
  const L = pains.length;
  const ly = (i) => (L <= 1 ? NY : 60 + (i * (H - 170)) / (L - 1));
  const rowY = { dialogos: 92, praxis: 210, metron: 328 };
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
      {pains.map((p, i) => {
        const y = ly(i); const w = 18 + (i % 3) * 14;
        return (
          <g key={p} className="flb-calm-g">
            <path className="flb-tangle" d={`M 8 ${y + 14} C 70 ${y - w}, 100 ${y + w + 20}, 140 ${(y + NY) / 2 + ((i % 2) ? 26 : -26)} S 196 ${NY + ((i % 2) ? -40 : 40)}, ${NX - 46} ${NY + (i - L / 2) * 4}`} />
            <text x="12" y={y + 4} className="flb-g-pain">{p}</text>
          </g>
        );
      })}
      {!L && <text x="16" y="70" className="flb-g-pain">{c.graphic.empty}</text>}
      {parts.map((p, i) => {
        const y = rowY[p.id];
        const x2 = W - 200;
        return (
          <g key={p.id} className={`flb-part${p.on ? ' is-on' : ' is-off'}`}>
            {[-5, 0, 5].map((o) => (
              <path key={o} className="flb-calm" style={{ stroke: p.color, opacity: p.on ? 1 : 0.18, strokeDasharray: p.on ? undefined : '3 7' }}
                d={`M ${NX + 46} ${NY + (i - 1) * 10 + o} C ${NX + 100} ${NY + (i - 1) * 10 + o}, ${NX + 110} ${y + o}, ${x2 - 10} ${y + o} L ${x2} ${y + o}`} />
            ))}
            <circle cx={x2 + 6} cy={y} r="5" style={{ fill: p.on ? p.color : 'transparent', stroke: p.color }} />
            <text x={x2 + 18} y={y - 8} className="flb-g-mod" style={{ fill: p.on ? '#faf9f5' : 'rgba(250,249,245,.35)' }}>{p.name}</text>
            <text x={x2 + 18} y={y + 9} className="flb-g-feat" style={{ fill: p.on ? p.color : 'rgba(250,249,245,.3)' }}>{p.on ? p.word : c.graphic.off}</text>
            {p.on && p.items.slice(0, 3).map((it, k) => <text key={it} x={x2 + 18} y={y + 27 + k * 15} className="flb-g-opt">+ {short(it, 24)}</text>)}
            {p.on && p.items.length > 3 && <text x={x2 + 18} y={y + 27 + 3 * 15} className="flb-g-opt">+{p.items.length - 3}</text>}
          </g>
        );
      })}
      <circle cx={NX} cy={NY} r="110" fill="url(#flbGlow)" />
      <circle cx={NX} cy={NY} r="46" className="flb-node" />
      <text x={NX} y={NY + 9} textAnchor="middle" className="flb-node-t">f<tspan className="flb-node-l">λ</tspan>ow</text>
      <text x={NX} y={NY + 84} textAnchor="middle" className="flb-g-price">{price.value ? `${price.from ? `${c.offer.from} ` : ''}${price.cents ? euroCents(shownPrice, lang) : euro(shownPrice, lang)}` : '—'}</text>
      <text x={NX} y={NY + 104} textAnchor="middle" className="flb-g-per">{price.label}</text>
    </svg>
  );
};

const Chip = ({ on, onClick, children }) => (
  <button type="button" className={`flb-chip${on ? ' is-on' : ''}`} aria-pressed={on} onClick={onClick}>{children}</button>
);

/* ───────── scoring the answers ───────── */
const scoreAnswers = (aud, a) => {
  const n = (k) => (typeof a[k] === 'number' ? a[k] : null);
  const where = Array.isArray(a.where) ? a.where : null;
  const scatter = where ? where.filter((i) => i !== 3).length : null;
  const talk = aud === 'med' ? n('missed') : n('calls');
  const dialogos = talk === null && n('repeat') === null ? null : Math.round((((talk ?? 1) + (n('repeat') ?? 1)) / 4) * 100);
  const praxis = n('miss') === null && scatter === null ? null : Math.min(100, Math.round(((n('miss') ?? 0) / 2) * 60 + Math.min(scatter ?? 0, 3) * 14));
  const metron = n('report') === null ? null : Math.round((n('report') / 2) * 100);
  return { dialogos, praxis, metron };
};
const recommend = (s) => {
  const known = MODULE_IDS.filter((id) => s[id] !== null);
  if (!known.length) return null;
  const rec = known.filter((id) => s[id] >= 40);
  if (rec.length) return rec;
  return [known.reduce((x, y) => (s[y] > s[x] ? y : x))];
};

/* one row per option */
const OptRow = ({ label, on, onToggle, priceNode, rec, recLabel, locked = false }) => (
  <button type="button" className={`flb-opt${on ? ' is-on' : ''}${locked ? ' is-locked' : ''}`} aria-pressed={!!on} disabled={locked} onClick={onToggle}>
    <span className="flb-opt-box" aria-hidden="true">{on ? '✓' : '+'}</span>
    <span className="flb-opt-t">{label}{rec && <em className="flb-rec">{recLabel}</em>}</span>
    <span className="flb-opt-p">{priceNode}</span>
  </button>
);

/* one card per part */
const ModuleCard = ({ m, p, on, lockedOn, onSwitch, inc, opts, isRec, c, aloneNote }) => (
  <article className={`flb-mod${on ? ' is-on' : ''}`} style={{ '--c': m.color }}>
    <header className="flb-mod-h">
      <div>
        <div className="flb-mod-word">{p.word}{isRec && <em className="flb-rec">{c.design.rec}</em>}</div>
        <h3>{m.name}</h3>
        <div className="flb-mod-line">{p.line}</div>
      </div>
      {lockedOn ? (
        <span className="flb-mod-state">✓ {c.design.on}</span>
      ) : (
        <button type="button" className={`flb-switch${on ? ' is-on' : ''}`} aria-pressed={on} onClick={onSwitch}>
          <i aria-hidden="true" /><span>{on ? c.design.on : c.design.off}</span>
        </button>
      )}
    </header>
    {aloneNote && <div className="flb-mod-alone">{aloneNote}</div>}
    <div className="flb-mod-body">
      <div className="flb-inc"><div className="flb-sub">{c.design.inc}</div>{inc.map((x) => <div key={x} className="flb-inc-i">{x}</div>)}</div>
      {opts.length > 0 && <div className="flb-opts"><div className="flb-sub">{c.design.opts}</div>{opts}</div>}
    </div>
  </article>
);

const FlowBuilder = ({ onSummary }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'el';
  const c = builderCopy[lang];
  const t3 = threeContent[lang];
  const location = useLocation();
  const qp = new URLSearchParams(location.search || '');
  const [aud, setAud] = useState(AUDIENCES.includes(qp.get('for')) ? qp.get('for') : null);
  const [presetMods] = useState(() => parseMods(qp.get('m')));
  useEffect(() => { const f = new URLSearchParams(location.search || '').get('for'); if (AUDIENCES.includes(f)) setAud(f); }, [location.search]);

  const [ngoSel, setNgoSel] = useState({ size: 's', modules: presetMods || { dialogos: true, praxis: false, metron: true }, features: {} });
  const [modsTouched, setModsTouched] = useState(!!presetMods);
  const [medSel, setMedSel] = useState({ size: '1', features: initialFeatures(MED.features) });
  const [annual, setAnnual] = useState(true);
  const [spSel, setSpSel] = useState({ orgs: '1', people: 2000, years: 1, cause: 0, options: initialFeatures(SPONSOR.options) });
  const [answers, setAnswers] = useState({ ngo: {}, med: {} });
  const [qi, setQi] = useState({ ngo: 0, med: 0 });
  const [quizDone, setQuizDone] = useState({ ngo: false, med: false });
  const [custom, setCustom] = useState([]);
  const [draft, setDraft] = useState('');
  const [minWarn, setMinWarn] = useState(false);
  const [form, setForm] = useState({ name: '', org: '', email: '', phone: '', consent: false });
  const [status, setStatus] = useState({ state: 'idle', mailto: '' });

  const ngo = useMemo(() => computeNgo(ngoSel), [ngoSel]);
  const med = useMemo(() => computeMed(medSel, annual), [medSel, annual]);
  const sp = useMemo(() => computeSponsor(spSel), [spSel]);
  const offer = aud === 'ngo' ? ngo : aud === 'med' ? med : aud === 'sponsor' ? sp : null;
  const isQuiz = aud === 'ngo' || aud === 'med';
  const quiz = isQuiz ? c.quiz[aud] : [];
  const ans = isQuiz ? answers[aud] : {};
  const scores = isQuiz ? scoreAnswers(aud, ans) : { dialogos: null, praxis: null, metron: null };
  const rec = recommend(scores);

  // which parts are on
  const mods = aud === 'ngo' ? ngoSel.modules : aud === 'sponsor' ? { dialogos: true, praxis: !!spSel.options.praxis, metron: true } : { dialogos: true, praxis: true, metron: true };

  /* questionnaire */
  const sizeList = aud === 'med' ? MED.sizes : NGO.sizes;
  const answerLabels = (q) => (q.k === 'size' ? sizeList.map((s) => s.label[lang]) : q.a);
  const finishQuiz = (nextAnswers) => {
    setQuizDone((d) => ({ ...d, [aud]: true }));
    if (aud === 'ngo' && !modsTouched) {
      const r = recommend(scoreAnswers('ngo', nextAnswers));
      if (r) setNgoSel((s) => ({ ...s, modules: { dialogos: r.includes('dialogos'), praxis: r.includes('praxis'), metron: r.includes('metron') } }));
    }
  };
  const pick = (q, idx) => {
    const cur = answers[aud];
    let val = idx;
    if (q.multi) { const arr = Array.isArray(cur[q.k]) ? cur[q.k] : []; val = arr.includes(idx) ? arr.filter((x) => x !== idx) : [...arr, idx]; }
    const next = { ...cur, [q.k]: val };
    setAnswers((s) => ({ ...s, [aud]: next }));
    if (q.k === 'size') {
      const id = sizeList[idx].id;
      if (aud === 'ngo') setNgoSel((s) => ({ ...s, size: id })); else setMedSel((s) => ({ ...s, size: id }));
    }
    if (!q.multi) {
      const i = qi[aud];
      setTimeout(() => {
        if (i < quiz.length - 1) setQi((s) => ({ ...s, [aud]: i + 1 })); else finishQuiz(next);
      }, 240);
    }
  };
  const answered = (q) => (Array.isArray(ans[q.k]) ? ans[q.k].length > 0 : ans[q.k] !== undefined);

  /* time inputs from the answers */
  const v = (k, def) => { const q = quiz.find((x) => x.k === k); const i = ans[k]; return q && q.v && typeof i === 'number' ? q.v[i] : def; };
  const whereArr = Array.isArray(ans.where) ? ans.where : null;
  const timeInputs = {
    team: v('team', aud === 'med' ? 1 : 6),
    calls: v('calls', aud === 'med' ? 35 : 20),
    repeat: v('repeat', 0.5),
    missed: v('missed', 4),
    doctors: { 1: 1, '2-5': 3, '6+': 7 }[medSel.size] || 1,
    scatter: whereArr ? whereArr.filter((i) => i !== 3).length : 2,
    miss: typeof ans.miss === 'number' ? ans.miss : 1,
    report: typeof ans.report === 'number' ? ans.report : 1,
  };

  /* pains on the left of the live flow */
  const pains = [];
  if (isQuiz) {
    const p = c.quizUi.pains;
    if (aud === 'med' && typeof ans.missed === 'number') pains.push(p.missed);
    if (aud === 'ngo' && typeof ans.calls === 'number' && ans.calls > 0) pains.push(p.calls);
    if (typeof ans.repeat === 'number' && ans.repeat > 0) pains.push(p.repeat);
    (whereArr || []).forEach((i) => { if (p.where[i]) pains.push(p.where[i]); });
    if (typeof ans.miss === 'number' && ans.miss > 0) pains.push(p.miss[aud]);
    if (typeof ans.report === 'number' && ans.report > 0) pains.push(p.report[aud]);
  }

  // options that come free once two or more parts are in (Viber, second language)
  const autoInc = (f) => !!f.includedWith && MODULE_IDS.filter((k) => ngoSel.modules[k]).length >= f.includedWith;

  /* the three parts, with chosen options, for the graphic and the offer */
  const optionsOf = (mid) => {
    if (aud === 'ngo') return NGO.features.filter((f) => f.module === mid && !f.inc && !f.quote && (ngoSel.features[f.id] || autoInc(f))).map((f) => f.label[lang]);
    if (aud === 'med') return MED.features.filter((f) => MED_GROUP[f.group] === mid && !f.locked && !f.quote && medSel.features[f.id]).map((f) => f.label[lang]);
    if (aud === 'sponsor') return SPONSOR.options.filter((f) => SP_GROUP[f.id] === mid && !f.locked && spSel.options[f.id] && f.id !== 'praxis').map((f) => f.label[lang]);
    return [];
  };
  const parts = MODULES.map((m) => ({ id: m.id, name: m.name, color: m.color, word: t3.layers.parts[m.id].word, on: !!mods[m.id], items: optionsOf(m.id) }));
  const price = !offer ? { value: 0, label: '' }
    : aud === 'sponsor' ? { value: offer.perPerson, label: c.offer.perPerson, from: offer.from, cents: true }
      : { value: offer.monthly, label: c.perMonth.replace('/', ''), from: offer.from };

  /* toggles */
  const toggleModule = (id) => {
    setModsTouched(true);
    const next = { ...ngoSel.modules, [id]: !ngoSel.modules[id] };
    if (!MODULE_IDS.some((k) => next[k])) { setMinWarn(true); return; }
    setMinWarn(false);
    const features = { ...ngoSel.features };
    if (id === 'dialogos' && !next.dialogos) features.family = false;
    setNgoSel({ ...ngoSel, modules: next, features });
  };
  const toggleNgoFeature = (f) => {
    const on = !ngoSel.features[f.id];
    const modules = { ...ngoSel.modules };
    if (on) { if (f.module !== 'all') modules[f.module] = true; if (f.requires) modules[f.requires] = true; }
    setNgoSel({ ...ngoSel, modules, features: { ...ngoSel.features, [f.id]: on } });
  };
  const toggleMed = (id) => setMedSel((s) => ({ ...s, features: { ...s.features, [id]: !s.features[id] } }));
  const toggleSp = (id) => setSpSel((s) => ({ ...s, options: { ...s.options, [id]: !s.options[id] } }));
  const addCustom = (e) => { e.preventDefault(); const x = draft.trim(); if (!x || custom.includes(x)) return; setCustom((l) => [...l, x].slice(0, 12)); setDraft(''); };

  /* prices shown next to options */
  const ngoOptPrice = (f) => {
    if (f.quote) return c.design.quote;
    if (f.includedWith && ngo.count >= f.includedWith) return c.included;
    const bits = [];
    if (f.monthly) bits.push(`+${euro(f.monthly, lang)}${c.perMonth}`);
    if (f.setup) bits.push(`+${euro(f.setup, lang)} ${c.setup}`);
    const p = bits.join(', ') + (f.atCost ? `, ${c.atCost}` : '');
    return f.includedWith ? `${p} · ${c.design.withTwo}` : p;
  };
  const medOptPrice = (f) => {
    if (f.quote) return c.design.quote;
    if (f.soon) return c.soon;
    if (f.atCost) return `+${euro(f.setupExtra, lang)} ${c.setup}, ${c.atCost}`;
    if (med.tierN >= f.tier) return c.included;
    const t = MED.tiers[f.tier - 1];
    return c.design.totalUpTo(`${euro(annual ? t.annual : t.monthly, lang)}${c.perMonth}`);
  };
  const spOptPrice = (f) => {
    if (f.atCost) return `+${euro(f.setup, lang)} ${c.setup}, ${c.atCost}`;
    return `+${euro(f.perOrgMonthly, lang)}${c.perMonth}${f.perOrgSetup ? ` + ${euro(f.perOrgSetup, lang)}` : ''} ${lang === 'en' ? 'per org' : 'ανά οργανισμό'}`;
  };

  const quotes = aud === 'ngo' ? ngo.quotes.map((f) => f.label[lang])
    : aud === 'med' ? MED.features.filter((f) => f.quote && medSel.features[f.id]).map((f) => f.label[lang]) : [];
  const recFeature = (id) => aud === 'med' && quizDone.med && (
    (id === 'booking' && (ans.calls ?? 0) >= 1) || (id === 'missed' && (ans.missed ?? 0) >= 1) || (id === 'reminders' && (ans.miss ?? 0) >= 1) || (id === 'callstats' && (ans.report ?? 0) >= 1));

  /* the text that travels with the offer (email, booking) */
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
      lines.push(`${c.offer.modulesTitle}: ${parts.filter((p) => p.on).map((p) => p.name).join(' + ')}`);
      lines.push(`${c.offer.monthly}: ${offer.from ? `${c.offer.from} ` : ''}${euro(offer.monthly, lang)}${aud === 'med' ? ` (${annual ? c.billing[1] : c.billing[0]})` : ''}`);
      lines.push(`${c.offer.setup}: ${euro(offer.setup, lang)}`);
    }
    parts.filter((p) => p.on && p.items.length).forEach((p) => lines.push(`${p.name}: ${p.items.join(', ')}`));
    if (quotes.length) lines.push(`${c.offer.quotesTitle}: ${quotes.join(', ')}`);
    if (custom.length) lines.push(`*** ${c.offer.customTitle.toUpperCase()}: ${custom.join(' | ')}`);
    if (isQuiz) {
      quiz.forEach((q) => { const a = ans[q.k]; if (a === undefined) return; const labels = answerLabels(q); lines.push(`${q.t} ${Array.isArray(a) ? a.map((i) => labels[i]).join(', ') : labels[a]}`); });
    }
    if (form.phone) lines.push(`${c.contact.phone}: ${form.phone}`);
    return lines.join('\n');
  };
  const summaryText = aud && offer ? offerText() : '';
  useEffect(() => { if (onSummary) onSummary(summaryText); }, [summaryText, onSummary]);

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

  const steps = aud === 'sponsor' ? c.stepsSponsor : c.steps;
  const q = quiz[qi[aud]] || null;

  const cardFor = (m) => {
    const p = t3.layers.parts[m.id];
    const on = !!mods[m.id];
    const lockedOn = aud === 'med' || (aud === 'sponsor' && m.id !== 'praxis');
    let inc = []; let opts = [];
    if (aud === 'ngo') {
      inc = NGO.features.filter((f) => f.module === m.id && f.inc).map((f) => f.label[lang]);
      opts = NGO.features.filter((f) => f.module === m.id && !f.inc).map((f) => (
        <OptRow key={f.id} label={<>{f.label[lang]}{f.requires && !mods[f.requires] && <small> · {c.design.needs}</small>}</>} on={ngoSel.features[f.id] || autoInc(f)} locked={autoInc(f)} onToggle={() => toggleNgoFeature(f)} priceNode={autoInc(f) ? c.design.withTwo : ngoOptPrice(f)} />
      ));
    } else if (aud === 'med') {
      inc = MED.features.filter((f) => MED_GROUP[f.group] === m.id && f.locked).map((f) => f.label[lang]);
      opts = MED.features.filter((f) => MED_GROUP[f.group] === m.id && !f.locked).map((f) => (
        <OptRow key={f.id} label={f.label[lang]} on={medSel.features[f.id]} onToggle={() => toggleMed(f.id)} priceNode={medOptPrice(f)} rec={recFeature(f.id)} recLabel={c.design.rec} />
      ));
    } else {
      inc = m.id === 'dialogos' ? SP_INC[lang] : m.id === 'praxis' ? [SPONSOR.options.find((f) => f.id === 'praxis').note[lang]] : SPONSOR.options.filter((f) => SP_GROUP[f.id] === m.id && f.locked).map((f) => f.label[lang]);
      opts = SPONSOR.options.filter((f) => SP_GROUP[f.id] === m.id && !f.locked && f.id !== 'praxis').map((f) => (
        <OptRow key={f.id} label={f.label[lang]} on={spSel.options[f.id]} onToggle={() => toggleSp(f.id)} priceNode={spOptPrice(f)} />
      ));
    }
    const isRec = aud === 'ngo' && quizDone.ngo && !!rec && rec.includes(m.id);
    const aloneNote = aud === 'ngo' && !on ? `${c.design.alone} ${euro(NGO.combos[m.id[0]].monthly, lang)}${c.perMonth}`
      : aud === 'sponsor' && m.id === 'praxis' ? spOptPrice(SPONSOR.options.find((f) => f.id === 'praxis')) : null;
    return (
      <ModuleCard key={m.id} m={m} p={p} on={on} lockedOn={lockedOn} inc={inc} opts={opts} isRec={isRec} c={c} aloneNote={aloneNote}
        onSwitch={() => (aud === 'ngo' ? toggleModule(m.id) : toggleSp('praxis'))} />
    );
  };
  const greek = NGO.features.find((f) => f.id === 'greek');

  return (
    <div className="flb" data-aud={aud || 'none'}>
      <header className="flb-head">
        <div className="flb-in">
          <div className="flb-topbar">
            <button type="button" className="flb-back" onClick={() => { if (window.history.state && window.history.state.idx > 0) navigate(-1); else navigate('/'); }}>← {c.back}</button>
            <p className="flb-mark">Go with the f<span>λ</span>ow</p>
          </div>
          <h1>{c.title}</h1>
          <p className="flb-lead">{c.lead}</p>
        </div>
      </header>

      <div className="flb-in flb-body">
        <div className="flb-steps">
          {/* 1. who */}
          <section className="flb-step" aria-labelledby="flb-s1">
            <h2 id="flb-s1"><span className="flb-n">1</span>{steps[0]}</h2>
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
              {/* 2. your day (questionnaire) or, for sponsors, what to support */}
              <section className="flb-step" aria-labelledby="flb-s2">
                <h2 id="flb-s2"><span className="flb-n">2</span>{steps[1]}</h2>
                {isQuiz && (
                  <div className="flb-quiz">
                    {!quizDone[aud] && q ? (
                      <div className="flb-qcard">
                        <div className="flb-qprog" aria-hidden="true">{quiz.map((x, n) => <span key={x.k} className={n < qi[aud] ? 'is-done' : n === qi[aud] ? 'is-now' : ''} />)}</div>
                        <div className="flb-qcount">{qi[aud] + 1} {c.quizUi.of} {quiz.length}</div>
                        <h3 className="flb-qt">{q.t}</h3>
                        {q.multi && <div className="flb-hint">{c.quizUi.multi}</div>}
                        <div className="flb-chips" role="group" aria-label={q.t}>
                          {answerLabels(q).map((a, n) => <Chip key={a} on={q.multi ? (ans[q.k] || []).includes(n) : ans[q.k] === n} onClick={() => pick(q, n)}>{a}</Chip>)}
                        </div>
                        <div className="flb-qnav">
                          {qi[aud] > 0 && <button type="button" className="flb-qback" onClick={() => setQi((s) => ({ ...s, [aud]: s[aud] - 1 }))}>← {c.quizUi.back}</button>}
                          {(q.multi || answered(q)) && (
                            <button type="button" className="flb-qnext" disabled={!answered(q)} onClick={() => (qi[aud] < quiz.length - 1 ? setQi((s) => ({ ...s, [aud]: s[aud] + 1 })) : finishQuiz(ans))}>
                              {qi[aud] < quiz.length - 1 ? c.quizUi.next : c.quizUi.done} →
                            </button>
                          )}
                          <a className="flb-qskip" href="#flb-s3" onClick={() => setQuizDone((d) => ({ ...d, [aud]: true }))}>{c.quizUi.skip}</a>
                        </div>
                      </div>
                    ) : (
                      <div className="flb-qsum">
                        <span>✓ {c.quizUi.answers}</span>
                        <button type="button" onClick={() => { setQuizDone((d) => ({ ...d, [aud]: false })); setQi((s) => ({ ...s, [aud]: 0 })); }}>{c.quizUi.edit}</button>
                      </div>
                    )}
                    <div className="flb-map" aria-live="polite">
                      <div className="flb-map-t">{c.quizUi.mapTitle}</div>
                      {MODULES.map((m) => (
                        <div key={m.id} className={`flb-bar${scores[m.id] === null ? ' is-empty' : ''}`} style={{ '--c': m.color }}>
                          <div className="flb-bar-h"><span>{c.quizUi.where[m.id]}</span><b>{m.name}</b></div>
                          <div className="flb-bar-track"><i style={{ width: `${scores[m.id] === null ? 0 : Math.max(4, scores[m.id])}%` }} /></div>
                        </div>
                      ))}
                      {rec && (quizDone[aud] || Object.keys(ans).length > 3) && (
                        <div className="flb-recline">
                          {MODULE_IDS.every((id) => scores[id] !== null && scores[id] < 40) ? c.quizUi.calm : (
                            <>{c.quizUi.recommend}: <b>{rec.map((id) => NAME[id]).join(' + ')}</b>{aud === 'ngo' && quizDone.ngo && !modsTouched ? `. ${c.quizUi.applied}` : '.'}</>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
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

              {/* 3. design your fλow */}
              <section className="flb-step" id="flb-s3" aria-labelledby="flb-s3h">
                <h2 id="flb-s3h"><span className="flb-n">3</span>{steps[2]}</h2>
                {aud === 'med' && (
                  <>
                    <p className="flb-hint">{c.design.medAll}</p>
                    <div className="flb-billing">
                      <div className="flb-chips">{c.billing.map((b, i) => <Chip key={b} on={annual === (i === 1)} onClick={() => setAnnual(i === 1)}>{b}</Chip>)}</div>
                      <small>{c.annualNote}</small>
                    </div>
                  </>
                )}
                {aud === 'sponsor' && <p className="flb-hint">{c.design.sponsorNote}</p>}
                {minWarn && <p className="flb-warn" role="status">{c.design.minOne}</p>}
                <div className="flb-mods">{MODULES.map((m) => cardFor(m))}</div>
                {aud === 'ngo' && ngo.saving && ngo.saving.monthly > 0 && (
                  <p className="flb-saving">{c.design.saving(euro(ngo.saving.monthly, lang), euro(ngo.saving.setup, lang))}</p>
                )}
                {aud === 'ngo' && (
                  <div className="flb-whole">
                    <OptRow label={greek.label[lang]} on={ngoSel.features.greek} onToggle={() => toggleNgoFeature(greek)} priceNode={ngoOptPrice(greek)} />
                  </div>
                )}
                <form className="flb-custom" onSubmit={addCustom}>
                  <div className="flb-sub">{c.design.customTitle}</div>
                  <div className="flb-custom-row">
                    <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={c.design.customPh} aria-label={c.design.customTitle} maxLength={90} />
                    <button type="submit" className="flb-custom-add">{c.design.customAdd}</button>
                  </div>
                  {custom.length > 0 && (
                    <div className="flb-custom-list">
                      {custom.map((x) => (
                        <span key={x} className="flb-custom-chip">{x}<em>{c.design.customTag}</em>
                          <button type="button" aria-label={`${c.design.remove}: ${x}`} onClick={() => setCustom((l) => l.filter((y) => y !== x))}>×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flb-hint flb-custom-note">{c.design.customNote}</div>
                </form>
              </section>

              {/* 4. the time that comes back (or, for sponsors, the impact) */}
              <section className="flb-step" aria-labelledby="flb-s4">
                <h2 id="flb-s4"><span className="flb-n">4</span>{steps[3]}</h2>
                {isQuiz ? (
                  <TimeBack c={t3.time} lang={lang} ed={aud} mods={mods} inputs={timeInputs} flowYearCost={offer ? offer.firstYear : null} key={aud} />
                ) : (
                  <div className="flb-impact">
                    <p className="flb-hint">{c.impactStep.lead}</p>
                    <div className="flb-impact-nums">
                      <div><b>{new Intl.NumberFormat(lang === 'en' ? 'en-IE' : 'el-GR').format(spSel.people * spSel.years)}</b><span>{c.impactStep.people}{spSel.years > 1 ? ` × ${spSel.years}` : ''}</span></div>
                      <div><b>{euroCents(sp.perPerson, lang)}</b><span>{c.impactStep.perPerson}</span></div>
                      <div><b>{sp.orgCount}{sp.from ? '+' : ''}</b><span>{c.impactStep.orgs}</span></div>
                    </div>
                    <div className="flb-impact-line">{c.impactStep.report}</div>
                  </div>
                )}
              </section>

              {/* 5. offer */}
              <section className="flb-step" id="flb-offer" aria-labelledby="flb-s5">
                <h2 id="flb-s5"><span className="flb-n">5</span>{steps[4]}</h2>
                <article className="flb-offer flb-print">
                  <header className="flb-offer-head">
                    <p className="flb-offer-brand">f<span>λ</span>ow <small>SimasiaAI, contact@simasiaai.gr</small></p>
                    <p className="flb-offer-for">{c.who[aud].name}{aud === 'sponsor' ? `, ${SPONSOR.causes[spSel.cause][lang]}` : ''}</p>
                  </header>
                  <div className="flb-offer-mods">
                    {parts.map((p) => (
                      <span key={p.id} className={`flb-offer-mod${p.on ? ' is-on' : ''}`} style={{ '--c': p.color }}>{p.on ? '✓' : '○'} {p.name}</span>
                    ))}
                  </div>
                  {aud !== 'sponsor' ? (
                    <>
                      <dl className="flb-offer-nums">
                        <div><dt>{c.offer.monthly}</dt><dd>{offer.from ? `${c.offer.from} ` : ''}{euro(offer.monthly, lang)}<small>{c.perMonth}</small></dd></div>
                        <div><dt>{c.offer.setup}</dt><dd>{offer.from ? `${c.offer.from} ` : ''}{euro(offer.setup, lang)}</dd></div>
                        <div><dt>{c.offer.firstYear}</dt><dd>{offer.from ? `${c.offer.from} ` : ''}{euro(offer.firstYear, lang)}</dd></div>
                      </dl>
                      {aud === 'med' && !offer.from && <p className="flb-offer-note">{lang === 'en' ? 'Matches' : 'Αντιστοιχεί στο'} «{offer.name[lang]}» {lang === 'en' ? 'on the clinics page' : 'της σελίδας για ιατρεία'}.</p>}
                      {aud === 'ngo' && ngo.saving && ngo.saving.monthly > 0 && <p className="flb-offer-note flb-offer-save">{c.design.saving(euro(ngo.saving.monthly, lang), euro(ngo.saving.setup, lang))}</p>}
                      {offer.from && <p className="flb-offer-note">{c.offer.custom}</p>}
                      {offer.atCost && <p className="flb-offer-note">+ {c.atCost}</p>}
                    </>
                  ) : (
                    <>
                      <dl className="flb-offer-nums">
                        <div><dt>{c.offer.total}</dt><dd>{sp.from ? `${c.offer.from} ` : ''}{euro(sp.total, lang)}</dd></div>
                        <div><dt>{c.offer.perPerson}</dt><dd>{euroCents(sp.perPerson, lang)}</dd></div>
                        <div><dt>{c.offer.orgs}</dt><dd>{SPONSOR.orgs.find((o) => o.id === spSel.orgs).label[lang]}</dd></div>
                      </dl>
                      <h3 className="flb-offer-h">{c.offer.sponsorWhat}</h3>
                      <ul className="flb-offer-list">{c.offer.sponsorList.map((x) => <li key={x}>{x}</li>)}</ul>
                      <p className="flb-offer-note">{c.offer.proof}</p>
                      {sp.atCost && <p className="flb-offer-note">+ {c.atCost}</p>}
                    </>
                  )}
                  {parts.some((p) => p.on && p.items.length) && (
                    <>
                      <h3 className="flb-offer-h">{c.offer.options}</h3>
                      <ul className="flb-offer-list">{parts.filter((p) => p.on).flatMap((p) => p.items.map((it) => <li key={`${p.id}${it}`}>{it}</li>))}</ul>
                    </>
                  )}
                  {quotes.length > 0 && (<><h3 className="flb-offer-h">{c.offer.quotesTitle}</h3><ul className="flb-offer-list flb-offer-quote">{quotes.map((x) => <li key={x}>{x}</li>)}</ul></>)}
                  {custom.length > 0 && (<><h3 className="flb-offer-h">{c.offer.customTitle}</h3><ul className="flb-offer-list flb-offer-quote">{custom.map((x) => <li key={x}>{x}</li>)}</ul></>)}
                  {aud !== 'sponsor' && <p className="flb-offer-g">{aud === 'med' ? c.offer.guaranteeMed : c.offer.guarantee}</p>}
                  {aud === 'ngo' && <p className="flb-offer-note flb-offer-pilot">{c.offer.pilot}</p>}
                  {aud === 'med' && <p className="flb-offer-note flb-offer-pilot">{c.offer.pilotMed}</p>}
                  {aud === 'ngo' && <p className="flb-offer-note">{c.offer.funding}</p>}
                  <div className="flb-one">
                    <p>{c.offer.oneNumber}</p>
                    <b>{c.offer.oneNumberText}</b>
                  </div>
                  <p className="flb-offer-fine">{c.offer.note}</p>
                </article>

                {aud !== 'sponsor' && (
                  <div className="flb-stack">
                    <h3>{c.stack.title}</h3>
                    <ul>{c.stack.items.map(([t, val]) => <li key={t}><span>{t}</span><s>{euro(val, lang)}</s></li>)}</ul>
                    <p className="flb-stack-sum">
                      <span>{c.stack.worth} <s>{euro(c.stack.items.reduce((a, [, val]) => a + val, 0), lang)}</s></span>
                      <b>{c.stack.you}: {c.stack.free}</b>
                    </p>
                  </div>
                )}

                <div className="flb-assure">
                  <h3>{c.assure.title}</h3>
                  <ul>{c.assure[aud].map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}</ul>
                </div>

                <div className="flb-unique">
                  <h3>{c.unique.title}</h3>
                  <p>{c.unique.text}</p>
                  <p className="flb-impact-l">{c.impact[aud]}</p>
                </div>

                <div className="flb-faq">
                  <h3>{c.faq.title}</h3>
                  {c.faq[aud].map(([fq, fa]) => (
                    <details key={fq}><summary>{fq}</summary><p>{fa}</p></details>
                  ))}
                  <Link className="flb-terms" to="/terms#ai-accuracy">{lang === 'en' ? 'Answer accuracy and terms' : 'Ακρίβεια απαντήσεων και όροι'} →</Link>
                </div>

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
                  <a className="flb-booklink" href="#book">{c.bookLink} ↓</a>
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
            <LiveFlow pains={pains.slice(0, 7)} parts={parts} price={price} c={c} lang={lang} />
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
