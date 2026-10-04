import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MODULES } from './modules';
import { MODULE_IDS } from './offerCatalog';
import { euro } from './FlowParts';
import './FlowThree.css';

/*
 * The three parts of fλow on the product page:
 * - ThreeLayers: DialogosAI, PraxisAI, MetronAI, shown separately or together.
 * - TimeBack: the time that returns to the team (used on /flow and inside the offer).
 * - ValueEquation: Hormozi's four terms, each carried by one part.
 * - BuildTeaser: choose the parts (replaces fixed packages), continue in /go.
 */

const COLOR = { dialogos: '#6a9bcc', praxis: '#9fb383', metron: '#d97757', flow: '#faf9f5' };
const NAME = { dialogos: 'DialogosAI', praxis: 'PraxisAI', metron: 'MetronAI' };

/* ───────── shared bits ───────── */

export const Edition = ({ c, ed, setEd, dark = false }) => (
  <div className={`f3-ed${dark ? ' is-dark' : ''}`} role="group" aria-label={c.aria}>
    <button type="button" aria-pressed={ed === 'ngo'} onClick={() => setEd('ngo')}>{c.ngo}</button>
    <button type="button" aria-pressed={ed === 'med'} onClick={() => setEd('med')}>{c.med}</button>
  </div>
);

export const DemoHead = ({ d, id, children }) => (
  <div className="f3-dhead" style={{ '--c': COLOR[id] }}>
    <div>
      <div className="f3-dtag"><span className="f3-dnum">{d.n}</span><i aria-hidden="true" /><span>{d.word}</span><b>{NAME[id]}</b></div>
      <h2 className="fl-h2">{d.title}</h2>
      {d.lead && <p className="fl-lead">{d.lead}</p>}
    </div>
    {children}
  </div>
);

/* ───────── 1. Λόγος, Πράξη και Καταγραφή ───────── */

export const ThreeLayers = ({ c }) => {
  const [together, setTogether] = useState(true);
  return (
    <div className={`f3-layers${together ? ' is-together' : ' is-apart'}`}>
      <div className="f3-switch" role="group" aria-label={c.toggleAria}>
        {c.toggle.map((t, i) => (
          <button key={t} type="button" aria-pressed={together === (i === 1)} onClick={() => setTogether(i === 1)}>{t}</button>
        ))}
      </div>
      <div className="f3-cards">
        {MODULES.map((m) => {
          const p = c.parts[m.id];
          return (
            <article key={m.id} className="f3-card" style={{ '--c': m.color }}>
              <div className="f3-card-top"><span className="f3-word">{p.word}</span><span className="f3-dot" aria-hidden="true" /></div>
              <h3>{m.name}</h3>
              <div className="f3-line">{p.line}</div>
              <div className="f3-who">{p.who}</div>
              <ul>{p.items.map((x) => <li key={x}>{x}</li>)}</ul>
            </article>
          );
        })}
      </div>
      <svg className="f3-join" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
        <path className="f3-j f3-j-d" d="M 166 0 C 166 60, 470 50, 492 112" />
        <path className="f3-j f3-j-p" d="M 500 0 L 500 112" />
        <path className="f3-j f3-j-m" d="M 834 0 C 834 60, 530 50, 508 112" />
      </svg>
      <div className="f3-joint" aria-hidden={!together}>
        <div className="f3-joint-mark">f<span>λ</span>ow</div>
        <div>
          <h3>{c.joint.title}</h3>
          <ul>{c.joint.items.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>
      <div className="f3-alone" aria-hidden={together}>{c.alone}</div>
    </div>
  );
};

/* ───────── 2. The time that comes back ───────── */

const Person = ({ doctor, on }) => (
  <svg className={`f3-person${doctor ? ' is-doc' : ''}${on ? ' is-on' : ''}`} viewBox="0 0 24 40" aria-hidden="true">
    <circle cx="12" cy="7" r="5.5" className="f3-head" />
    <path d="M3 38 V22 C3 16 6.5 14 12 14 C17.5 14 21 16 21 22 V38 Z" className="f3-body" />
    {doctor && <path d="M8 15 C8 22 10 25 12 25 C14 25 16 22 16 15" className="f3-steth" />}
    {doctor && <circle cx="12" cy="27" r="1.6" className="f3-steth-dot" />}
  </svg>
);

const useCount = (value, ms = 600) => {
  const [v, setV] = useState(value);
  const cur = useRef(value);
  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { cur.current = value; setV(value); return undefined; }
    const from = cur.current; const start = performance.now(); let raf = 0;
    const step = (t) => {
      const k = Math.min(1, (t - start) / ms); const e = 1 - (1 - k) ** 3;
      const x = from + (value - from) * e;
      cur.current = x; setV(x);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, ms]);
  return v;
};

export const timeModel = ({ ed, mods, team, doctors, calls, repeat, missed, scatter = 2, miss = 1, report = 1 }) => {
  const people = Math.max(1, team);
  const dH = mods.dialogos ? (calls * repeat * 4 * 22) / 60 : 0;
  const pMin = (10 + 5 * Math.min(scatter, 3) + 5 * miss) * 0.5;
  const pH = mods.praxis ? (people * pMin * 22) / 60 : 0;
  const mH = mods.metron ? [2, 6, 12][report] || 6 : 0;
  const month = dH + pH + mH;
  const todayPer = Math.round((calls * repeat * 4) / people + 10 + 5 * Math.min(scatter, 3) + 5 * miss + 10);
  const backPer = Math.min(todayPer, Math.round(((dH + pH) * 60) / 22 / people));
  const appts = ed === 'med' && mods.dialogos ? Math.round(missed * 22 * 0.3) : 0;
  return { dH, pH, mH, month, year: month * 12, days: (month * 12) / 8, todayPer, backPer, appts, people, doctors: doctors || 0 };
};

export const TimeBack = ({ c, lang, ed, mods = { dialogos: true, praxis: true, metron: true }, inputs = null }) => {
  const editable = !inputs;
  const [own, setOwn] = useState({ ngo: { team: 8, calls: 20, repeat: 0.5 }, med: { team: 2, doctors: 2, calls: 35, repeat: 0.5, missed: 4 } });
  const v = inputs || own[ed];
  const set = (k) => (e) => setOwn((s) => ({ ...s, [ed]: { ...s[ed], [k]: Number(e.target.value) } }));
  const t = timeModel({ ed, mods, missed: 0, doctors: 0, ...v });
  const [euroOn, setEuroOn] = useState(false);
  const [rate, setRate] = useState(ed === 'med' ? 15 : 12);
  const [fee, setFee] = useState(50);
  const [moment, setMoment] = useState(0);
  const moments = c.moments[ed];
  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const id = setInterval(() => setMoment((m) => (m + 1) % moments.length), 3600);
    return () => clearInterval(id);
  }, [moments.length]);

  const monthShown = useCount(t.month);
  const daysShown = useCount(t.days);
  const maxH = Math.max(1, t.month);
  const parts = MODULE_IDS.filter((id) => mods[id]).map((id) => ({ id, h: { dialogos: t.dH, praxis: t.pH, metron: t.mH }[id] }));
  const worth = t.year * rate + (ed === 'med' ? t.appts * 12 * fee : 0);
  const showPeople = Math.min(24, Math.round(t.people));
  const showDocs = ed === 'med' ? Math.min(8, Math.round(t.doctors)) : 0;
  const fmt = (n, d = 0) => new Intl.NumberFormat(lang === 'en' ? 'en-IE' : 'el-GR', { maximumFractionDigits: d, minimumFractionDigits: d }).format(n);

  return (
    <div className="f3-time">
      {editable && (
        <div className="f3-sliders">
          {ed === 'med' && (
            <div className="f3-sl"><span className="f3-sl-t">{c.doctors}</span><output>{v.doctors}</output>
              <input type="range" min="1" max="8" step="1" value={v.doctors} onChange={set('doctors')} aria-label={c.doctors} /></div>
          )}
          <div className="f3-sl"><span className="f3-sl-t">{c.team[ed]}</span><output>{v.team}</output>
            <input type="range" min="1" max="30" step="1" value={v.team} onChange={set('team')} aria-label={c.team[ed]} /></div>
          <div className="f3-sl"><span className="f3-sl-t">{c.calls[ed]}</span><output>{v.calls}</output>
            <input type="range" min="0" max="80" step="1" value={v.calls} onChange={set('calls')} aria-label={c.calls[ed]} /></div>
          <div className="f3-sl"><span className="f3-sl-t">{c.repeat}</span><output>{Math.round(v.repeat * 100)}%</output>
            <input type="range" min="0.1" max="0.9" step="0.05" value={v.repeat} onChange={set('repeat')} aria-label={c.repeat} /></div>
          {ed === 'med' && (
            <div className="f3-sl"><span className="f3-sl-t">{c.missed}</span><output>{v.missed}</output>
              <input type="range" min="0" max="15" step="1" value={v.missed} onChange={set('missed')} aria-label={c.missed} /></div>
          )}
        </div>
      )}

      <div className="f3-time-grid">
        {/* the team, and their day */}
        <section className="f3-tcol">
          <div className="f3-tcap">{c.teamCap[ed]}</div>
          <div className="f3-people" aria-label={`${c.teamCap[ed]}: ${t.people}`}>
            {Array.from({ length: showDocs }, (_, i) => <Person key={`d${i}`} doctor on />)}
            {Array.from({ length: showPeople }, (_, i) => <Person key={`p${i}`} on />)}
            {t.people > showPeople && <span className="f3-more">+{Math.round(t.people - showPeople)}</span>}
          </div>
          <div className="f3-tcap f3-tcap2">{c.today}</div>
          <div className="f3-daybar" aria-hidden="true">
            <i className="f3-day-busy" style={{ width: `${Math.min(100, (t.todayPer / 480) * 100 * 2)}%` }}>
              <i className="f3-day-back" style={{ width: `${t.todayPer ? (t.backPer / t.todayPer) * 100 : 0}%` }} />
            </i>
          </div>
          <div className="f3-small">{c.todayLine(t.todayPer)} · <b>{t.backPer}′ {c.back}</b></div>
        </section>

        {/* every month, by part */}
        <section className="f3-tcol">
          <div className="f3-tcap">{c.month}</div>
          <div className="f3-big"><b>{fmt(monthShown)}</b><span>{c.hoursMonth}</span></div>
          <div className="f3-stack" aria-hidden="true">
            {parts.map((p) => <i key={p.id} style={{ width: `${(p.h / maxH) * 100}%`, background: COLOR[p.id] }} />)}
          </div>
          <div className="f3-parts">
            {parts.map((p) => (
              <div key={p.id} className="f3-part" style={{ '--c': COLOR[p.id] }}>
                <span className="f3-part-dot" aria-hidden="true" /><span className="f3-part-t"><b>{NAME[p.id]}</b> <span>{c.byPart[p.id]}</span></span><strong>{fmt(p.h)} h</strong>
              </div>
            ))}
          </div>
          {t.appts > 0 && <div className="f3-appts">{c.appts(t.appts)}</div>}
        </section>

        {/* a year */}
        <section className="f3-tcol f3-year">
          <div className="f3-tcap">{c.year}</div>
          <div className="f3-big"><b>≈ {fmt(daysShown)}</b><span>{c.days}<br />{c.daysLine}</span></div>
          <div className="f3-months" aria-hidden="true">
            {c.months.map((mo, i) => (
              <div key={`${mo}${i}`} className="f3-mo">
                <i style={{ height: `calc((100% - 18px) * ${((i + 1) / 12).toFixed(3)})`, transitionDelay: `${i * 45}ms`, opacity: t.month ? 1 : 0.2 }} />
                <span>{mo}</span>
              </div>
            ))}
          </div>
          <div className="f3-moment" aria-live="polite"><span>{c.forWhat}</span> <b key={moment}>{moments[moment]}</b></div>
        </section>
      </div>

      <div className="f3-euro">
        <button type="button" className={`f3-toggle${euroOn ? ' is-on' : ''}`} aria-pressed={euroOn} onClick={() => setEuroOn((x) => !x)}>
          <i aria-hidden="true" />{c.euroToggle}
        </button>
        {euroOn && (
          <div className="f3-euro-body">
            <div className="f3-sl"><span className="f3-sl-t">{c.rate}</span><output>{euro(rate, lang)}</output>
              <input type="range" min="6" max="40" step="1" value={rate} onChange={(e) => setRate(Number(e.target.value))} aria-label={c.rate} /></div>
            {ed === 'med' && (
              <div className="f3-sl"><span className="f3-sl-t">{c.fee}</span><output>{euro(fee, lang)}</output>
                <input type="range" min="20" max="150" step="5" value={fee} onChange={(e) => setFee(Number(e.target.value))} aria-label={c.fee} /></div>
            )}
            <div className="f3-euro-nums">
              <div><span>{c.worth}</span><b>{euro(worth, lang)}</b></div>
            </div>
            <div className="f3-small">{c.euroNote}</div>
          </div>
        )}
      </div>
      <div className="f3-note">{c.note}</div>
    </div>
  );
};

/* ───────── 3. The value equation, one term per part ───────── */

export const ValueEquation = ({ c }) => {
  const term = (t, up) => (
    <div key={t[0]} className={`f3-term ${up ? 'is-up' : 'is-down'}`} style={{ '--c': COLOR[t[2]] }}>
      <div className="f3-term-h">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d={up ? 'M12 19V5M6 11l6-6 6 6' : 'M12 5v14M6 13l6 6 6-6'} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <b>{t[0]}</b>
        <span className="f3-term-tag">{t[2] === 'flow' ? <>f<span className="go-l">λ</span>ow</> : NAME[t[2]]}</span>
      </div>
      <span className="f3-term-t">{t[1]}</span>
    </div>
  );
  return (
    <figure className="f3-eq">
      <div className="f3-eq-row">{c.top.map((t) => term(t, true))}</div>
      <div className="f3-eq-bar" aria-hidden="true" />
      <div className="f3-eq-row">{c.bottom.map((t) => term(t, false))}</div>
      <figcaption>{c.caption}</figcaption>
    </figure>
  );
};

/* ───────── 4. Build your own fλow (replaces fixed packages) ───────── */

export const BuildTeaser = ({ c, parts, ed }) => {
  const [mods, setMods] = useState({ dialogos: true, praxis: true, metron: true });
  const isMed = ed === 'med';
  const key = MODULE_IDS.filter((id) => mods[id]).map((id) => id[0]).join('');
  const count = key.length;
  const toggle = (id) => { if (isMed) return; setMods((m) => ({ ...m, [id]: !m[id] })); };
  const g = c.guarantee[ed];
  const href = `/go?for=${ed}${isMed ? '' : `&m=${key}`}`;
  return (
    <div className="f3-build">
      <div className="f3-build-cards">
        {MODULES.map((m) => {
          const on = isMed || mods[m.id];
          return (
            <button key={m.id} type="button" className={`f3-bcard${on ? ' is-on' : ''}${isMed ? ' is-locked' : ''}`} style={{ '--c': m.color }} aria-pressed={on} onClick={() => toggle(m.id)}>
              <span className="f3-bcard-top"><span className="f3-word">{parts[m.id].word}</span><span className="f3-bswitch" aria-hidden="true"><i /></span></span>
              <span className="f3-bname">{m.name}</span>
              <span className="f3-bline">{parts[m.id].line}</span>
              <span className="f3-bstate">{on ? `✓ ${c.on}` : `+ ${c.off}`}</span>
            </button>
          );
        })}
      </div>
      <div className="f3-build-sum">
        {isMed ? (
          <div className="f3-small">{c.medNote}</div>
        ) : count ? (
          <div className="f3-sum-price"><b>{count}</b><span>{c.chosen(count)}</span><em>{c.offerByEmail}</em></div>
        ) : <div className="f3-small">{c.need}</div>}
        <div className="f3-build-go">
          {count || isMed ? <Link className="fl-btn" to={href}>{c.cta} →</Link> : <span className="fl-btn is-disabled" aria-disabled="true">{c.cta} →</span>}
          <span className="f3-small">{c.hint}</span>
        </div>
      </div>
      <div className="fl-guar f3-guar">
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div><h3>{g[0]}</h3><p>{g[1]}</p></div>
      </div>
      <p className="fl-fine fl-center-t">{c.note}</p>
    </div>
  );
};

