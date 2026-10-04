import React, { useMemo, useState } from 'react';

/* ───────── Shared helpers ───────── */

const fmt = (n, lang) => new Intl.NumberFormat(lang === 'en' ? 'en-IE' : 'el-GR', { maximumFractionDigits: 0 }).format(Math.round(n));
export const euro = (n, lang) => (lang === 'en' ? `€${fmt(n, lang)}` : `${fmt(n, lang)} €`);

/* A calm, slowly drifting band of lines. Used behind the crossing and as a divider. */
export const CalmWater = ({ width = 1440, height = 160, lines = 9, className = '' }) => {
  const paths = [];
  for (let i = 0; i < lines; i += 1) {
    const y = 20 + (i * (height - 40)) / (lines - 1);
    const a = 6 + (i % 3) * 3;
    paths.push(
      <path
        key={i}
        className="flc-line"
        d={`M -40 ${y} C ${width * 0.25} ${y - a}, ${width * 0.5} ${y + a}, ${width * 0.75} ${y - a / 2} S ${width + 40} ${y + a / 2}, ${width + 80} ${y}`}
        style={{ strokeDasharray: `${120 + i * 17} ${22 + i * 3}`, animationDuration: `${34 + i * 2.2}s`, opacity: 0.3 + 0.5 * (1 - Math.abs(i - (lines - 1) / 2) / ((lines - 1) / 2)) }}
      />,
    );
  }
  return <svg className={`flc ${className}`} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">{paths}</svg>;
};

/* ───────── Λόγος + Πράξη = Ροή ───────── */

export const LogosPraxis = ({ c }) => (
  <div className="fllp">
    <div className="fllp-col fllp-logos">
      <p className="fllp-word">{c.logos.word}</p>
      <h3>{c.logos.name}</h3>
      <p className="fllp-line">{c.logos.line}</p>
      <ul>{c.logos.items.map((x) => <li key={x}>{x}</li>)}</ul>
    </div>
    <svg className="fllp-svg" viewBox="0 0 420 520" aria-hidden="true">
      {[...Array(7)].map((_, i) => {
        const o = (i - 3) * 6;
        return (
          <g key={i}>
            <path className="fllp-l" d={`M ${-10} ${70 + o} C ${120} ${70 + o}, ${150} ${250 + o * 0.5}, ${210} ${246 + o * 0.5}`} />
            <path className="fllp-p" d={`M ${-10} ${450 + o} C ${120} ${450 + o}, ${150} ${290 + o * 0.5}, ${210} ${286 + o * 0.5}`} />
            <path className="fllp-l" d={`M ${210} ${246 + o * 0.5} C ${300} ${242 + o * 0.5}, ${360} ${250 + o * 0.6}, ${430} ${252 + o * 0.6}`} />
            <path className="fllp-p" d={`M ${210} ${286 + o * 0.5} C ${300} ${282 + o * 0.5}, ${360} ${290 + o * 0.6}, ${430} ${292 + o * 0.6}`} />
          </g>
        );
      })}
      <g transform="translate(210 266)">
        <circle r="34" className="fllp-gate" />
        <circle cy="-8" r="8" className="fllp-gate-ink" />
        <path d="M-13 16 C -10 4, 10 4, 13 16" className="fllp-gate-ink-s" />
      </g>
      <rect x="120" y="318" width="180" height="26" rx="13" className="fllp-gate-bg" /><text x="210" y="336" textAnchor="middle" className="fllp-gate-t">{c.joint.gate}</text>
    </svg>
    <div className="fllp-col fllp-praxis">
      <p className="fllp-word">{c.praxis.word}</p>
      <h3>{c.praxis.name}</h3>
      <p className="fllp-line">{c.praxis.line}</p>
      <ul>{c.praxis.items.map((x) => <li key={x}>{x}</li>)}</ul>
    </div>
    <div className="fllp-col fllp-joint">
      <p className="fllp-word">{c.joint.word}</p>
      <h3 className="fllp-flow">f<span>λ</span>ow</h3>
      <ul>{c.joint.items.map((x) => <li key={x}>{x}</li>)}</ul>
    </div>
  </div>
);

/* ───────── The day as a river: turbulent vs calm ───────── */

export const DayRiver = ({ rows, c, calm, setCalm }) => {
  const W = 1100; const H = 220; const mid = 110;
  const xs = rows.map((r) => {
    const [h, m] = r[0].split(':').map(Number);
    return 40 + ((h + m / 60 - 8) / 12) * (W - 80);
  });
  const { rough, smooth } = useMemo(() => {
    let rp = ''; let sp = '';
    for (let x = 0; x <= W; x += 4) {
      let y = 0;
      rows.forEach((r, i) => {
        const d = (x - xs[i]) / 60;
        const env = Math.exp(-d * d);
        y += env * r[3] * 46 * Math.sin(x * 0.16 + i * 1.3);
      });
      y += Math.sin(x * 0.09) * 6;
      const s = Math.sin(x / 140) * 7;
      rp += `${x === 0 ? 'M' : 'L'} ${x} ${(mid + y).toFixed(1)} `;
      sp += `${x === 0 ? 'M' : 'L'} ${x} ${(mid + s).toFixed(1)} `;
    }
    return { rough: rp, smooth: sp };
  }, [rows, xs]);

  return (
    <div className={`fldr ${calm ? 'is-calm' : 'is-rough'}`}>
      <div className="fldr-toggle" role="group" aria-label={c.title}>
        <button type="button" aria-pressed={!calm} onClick={() => setCalm(false)}>{c.toggle[0]}</button>
        <button type="button" aria-pressed={calm} onClick={() => setCalm(true)}>{c.toggle[1]}</button>
      </div>
      <svg className="fldr-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={c.aria}>
        {[0, 3, 6, 9, 12].map((k) => {
          const x = 40 + (k / 12) * (W - 80);
          return <text key={k} x={x} y={H - 4} textAnchor="middle" className="fldr-hour">{`${8 + k}:00`}</text>;
        })}
        <path d={rough} className="fldr-rough" />
        <path d={smooth} className="fldr-smooth" />
        {xs.map((x, i) => <circle key={i} cx={x} cy={mid} r={calm ? 5 : 6 + rows[i][3] * 4} className="fldr-dot" />)}
      </svg>
      <ol className="fldr-list">
        {rows.map((r) => (
          <li key={r[0]}>
            <time>{r[0]}</time>
            <span className="fldr-before">{r[1]}</span>
            <span className="fldr-after">{r[2]}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

/* ───────── Value: the cost of a restless day (Hormozi) ───────── */

export const ValueCalc = ({ c, ed, lang }) => {
  const conf = c[ed];
  const [vals, setVals] = useState({});
  const v = (id) => (vals[`${ed}-${id}`] ?? conf.inputs.find((x) => x.id === id).def);
  const set = (id, n) => setVals((s) => ({ ...s, [`${ed}-${id}`]: n }));

  let today; let perMonth;
  if (ed === 'ngo') {
    const hoursMonth = (v('people') * v('mins') * 22) / 60 * 0.4;
    perMonth = hoursMonth;
    today = hoursMonth * 12 * v('rate');
  } else {
    const kept = v('missed') * 22 * (v('book') / 100);
    perMonth = kept;
    today = kept * 12 * v('fee');
  }
  const ratio = today / conf.flowCost;
  const max = Math.max(today, conf.flowCost);

  return (
    <div className="flv">
      <div className="flv-inputs">
        {conf.inputs.map((inp) => (
          <label key={inp.id} className="flv-in">
            <span className="flv-lab">{inp.label}</span>
            <output>{v(inp.id)}{inp.unit}</output>
            <input type="range" min={inp.min} max={inp.max} step={inp.step} value={v(inp.id)} onChange={(e) => set(inp.id, Number(e.target.value))} />
          </label>
        ))}
        <p className="flv-assume">{conf.assumption}</p>
      </div>
      <div className="flv-out" aria-live="polite">
        <p className="flv-big"><span>{fmt(perMonth, lang)}</span> {conf.hoursLabel}</p>
        <div className="flv-bar">
          <span className="flv-bar-l">{conf.todayLabel}</span>
          <div className="flv-track"><i className="flv-today" style={{ width: `${(today / max) * 100}%` }} /></div>
          <b>{euro(today, lang)}</b>
        </div>
        <div className="flv-bar">
          <span className="flv-bar-l">{conf.flowLabel}</span>
          <div className="flv-track"><i className="flv-flow" style={{ width: `${(conf.flowCost / max) * 100}%` }} /></div>
          <b>{euro(conf.flowCost, lang)}</b>
        </div>
        <p className="flv-ratio"><span>{ratio >= 1 ? ratio.toFixed(1).replace('.', lang === 'en' ? '.' : ',') : ratio.toFixed(2).replace('.', lang === 'en' ? '.' : ',')}×</span> {c.times}</p>
      </div>
    </div>
  );
};

export const Equation = ({ c }) => (
  <figure className="fleq">
    <div className="fleq-row">
      {c.top.map((t) => (
        <div key={t[0]} className="fleq-term fleq-up">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <b>{t[0]}</b><span>{t[1]}</span>
        </div>
      ))}
    </div>
    <div className="fleq-bar" aria-hidden="true" />
    <div className="fleq-row">
      {c.bottom.map((t) => (
        <div key={t[0]} className="fleq-term fleq-down">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <b>{t[0]}</b><span>{t[1]}</span>
        </div>
      ))}
    </div>
    <figcaption>{c.caption}</figcaption>
  </figure>
);

/* ───────── Plans ───────── */

export const Plans = ({ plans, c, ed, lang }) => {
  const [annual, setAnnual] = useState(true);
  return (
    <div className={`flpl flpl-${ed}`}>
      {ed === 'med' && (
        <div className="flpl-bill" role="group" aria-label={c.perMonth}>
          <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>{lang === 'en' ? 'Monthly' : 'Μηνιαία'}</button>
          <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>{lang === 'en' ? 'Annual' : 'Ετήσια'}</button>
        </div>
      )}
      <div className="flpl-grid">
        {plans.map((p) => {
          const price = ed === 'med' && annual && p.a ? p.a : p.m;
          return (
            <article key={p.n} className={`flpl-p${p.rec ? ' is-rec' : ''}`}>
              {p.rec && <p className="flpl-flag">{c.rec}</p>}
              <h3>{p.n}</h3>
              <p className="flpl-for">{p.f}</p>
              <p className="flpl-price"><span>{euro(price, lang)}</span>{c.perMonth}</p>
              {ed === 'med' && annual && p.a && <p className="flpl-annual">{c.annual}, {lang === 'en' ? 'instead of' : 'αντί'} {euro(p.m, lang)}</p>}
              <p className="flpl-setup">{c.setup}: <b>{p.s}</b></p>
              {p.w && <p className="flpl-worth">{c.worth}: <s>{p.w}</s></p>}
              <ul className="flpl-h">{p.h.map((x) => <li key={x}>{x}</li>)}</ul>
              {p.x.length > 0 && (
                <details>
                  <summary>{c.more}</summary>
                  <ul className="flpl-h">{p.x.map((x) => <li key={x}>{x}</li>)}</ul>
                </details>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

/* ───────── Crossing: onboarding as stepping stones ───────── */

export const Crossing = ({ c }) => (
  <div className="flx">
    <div className="flx-water">
      <CalmWater height={150} lines={8} />
      <svg className="flx-stones" viewBox="0 0 1100 150" aria-hidden="true">
        <path d="M 40 75 C 200 40, 330 110, 420 70 S 650 40, 700 80 S 950 110, 1060 70" className="flx-path" />
        {[150, 420, 690, 960].map((x, i) => (
          <g key={x}>
            <ellipse cx={x} cy={[66, 74, 80, 70][i]} rx="62" ry="22" className="flx-stone" />
            <text x={x} y={[66, 74, 80, 70][i] + 8} textAnchor="middle" className="flx-n">{i + 1}</text>
          </g>
        ))}
      </svg>
    </div>
    <ol className="flx-steps">
      {c.steps.map((s) => (
        <li key={s[0]}><b>{s[0]}</b><span>{s[1]}</span></li>
      ))}
    </ol>
  </div>
);
