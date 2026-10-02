import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { flowContent, editions } from './flowContent';
import './Flow.css';

const Wordmark = () => (
  <span className="fl-word">f<span>λ</span>ow</span>
);

/* Hero stream: six tangled inputs enter fλow, six calm lines leave it. */
const Stream = ({ c }) => {
  const reduce = typeof window !== 'undefined' && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ly = [40, 92, 150, 196, 248, 300];
  const ry = [45, 95, 145, 195, 245, 295];
  const mix = [4, 2, 5, 0, 3, 1];
  return (
    <svg className="fl-stream" viewBox="0 0 1040 330" role="img" aria-label={c.streamAria}>
      <defs>
        <linearGradient id="flCore" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d97757" />
          <stop offset="1" stopColor="#c45532" />
        </linearGradient>
      </defs>
      {ly.map((y, i) => {
        const t = 128 + i * 15;
        return (
          <path key={`t${i}`} className="fl-t"
            d={`M175 ${y} C 260 ${ly[mix[i]]}, 330 ${ly[(i + 2) % 6]}, 380 ${(y + t) / 2} S 430 ${t}, 457 ${t}`} />
        );
      })}
      {ry.map((y, i) => {
        const t = 128 + i * 15;
        return <path key={`c${i}`} id={`flc${i}`} className="fl-c" d={`M583 ${t} C 660 ${t}, 700 ${y}, 800 ${y} L 830 ${y}`} />;
      })}
      {!reduce && ry.map((_, i) => (
        <circle key={`d${i}`} className="fl-dot" r="4">
          <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.35}s`}>
            <mpath href={`#flc${i}`} />
          </animateMotion>
        </circle>
      ))}
      <rect x="455" y="105" width="130" height="120" rx="30" fill="url(#flCore)" />
      <text x="520" y="174" textAnchor="middle" fontFamily="Source Serif 4, Georgia, serif" fontSize="38" fontWeight="700" fill="#fff">fλow</text>
      {ly.map((y, i) => <text key={`l${i}`} className="fl-lab fl-ll" x="162" y={y + 5} textAnchor="end">{c.streamIn[i]}</text>)}
      {ry.map((y, i) => <text key={`r${i}`} className="fl-lab fl-lr" x="842" y={y + 5}>{c.streamOut[i]}</text>)}
    </svg>
  );
};

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" />
  </svg>
);

const trustIcons = [
  <path key="0" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" />,
  <g key="1"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></g>,
  <path key="2" d="M12 3v18M3 12h18" />,
  <path key="3" d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />,
];

const FlowHome = ({ afterHow = null, afterInsights = null }) => {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'el';
  const c = flowContent[lang];
  const [ed, setEd] = useState('ngo');
  const [copied, setCopied] = useState(false);
  const d = editions[lang][ed];
  const maxTheme = d.th[0][1];

  const money = useMemo(() => (v) => (lang === 'en' ? v.replace(/(\d[\d,.]*)/, '€$1') : `${v} €`), [lang]);

  const copyMail = () => {
    const mail = 'contact@simasiaai.gr';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(mail).then(() => setCopied(true), () => setCopied(false));
    }
  };

  return (
    <div className="fl" lang={lang}>
      {/* HERO */}
      <section className="fl-hero">
        <div className="fl-in fl-hero-in">
          <p className="fl-brandline"><Wordmark /> <small>{c.by}</small></p>
          <h1 className="fl-h1">{c.title1} <em>{c.title2}</em></h1>
          <span className="fl-pill"><i />{c.pill}</span>
          <p className="fl-sub">{c.sub}</p>
          <div className="fl-ctas">
            <a className="fl-btn" href="#flow-start">{c.ctaMain}</a>
            <a className="fl-btn-ghost" href="#flow-day">{c.ctaDay} →</a>
          </div>
          <div className="fl-stream-wrap"><Stream c={c} /></div>
        </div>
      </section>

      {/* EDITION SWITCH */}
      <div className="fl-edbar">
        <div className="fl-seg" role="group" aria-label={c.edAria}>
          <button type="button" aria-pressed={ed === 'ngo'} onClick={() => setEd('ngo')}>{c.edNgo}</button>
          <button type="button" data-med aria-pressed={ed === 'med'} onClick={() => setEd('med')}>{c.edMed}</button>
        </div>
      </div>

      <div data-ed={ed}>
        {/* DAY */}
        <section id="flow-day" className="fl-sec">
          <div className="fl-in">
            <div className="fl-head fl-center">
              <div className="fl-eyebrow">{c.dayEyebrow}</div>
              <h2>{c.dayTitle}</h2>
              <p className="fl-lead">{c.dayLead}</p>
            </div>
            <div className="fl-days">
              {d.day.map((r) => (
                <article className="fl-dc" key={r[0]}>
                  <div className="fl-time">{r[0]}</div>
                  <p className="fl-before"><s>{r[1]}</s></p>
                  <p className="fl-after"><b>{r[2]}</b>{r[3]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW */}
        <section className="fl-sec fl-alt">
          <div className="fl-in">
            <div className="fl-head fl-center">
              <div className="fl-eyebrow">{c.howEyebrow}</div>
              <h2>{c.howTitle}</h2>
              <p className="fl-lead">{c.howLead}</p>
            </div>
            <div className="fl-parts">
              <div className="fl-part">
                <div className="fl-k">{c.parts.a.k}</div><h3>{c.parts.a.h}</h3><p>{c.parts.a.p}</p>
                <ul>{d.A.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div className="fl-part fl-mid">
                <div className="fl-k">{c.parts.m.k}</div><h3>{c.parts.m.h}</h3><p>{c.parts.m.p}</p>
                <ul>{c.parts.m.list.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div className="fl-part">
                <div className="fl-k">{c.parts.c.k}</div><h3>{c.parts.c.h}</h3><p>{c.parts.c.p}</p>
                <ul>{d.C.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {afterHow}

        {/* INSIGHTS */}
        <section className="fl-sec fl-insights">
          <div className="fl-in">
            <div className="fl-head">
              <div className="fl-eyebrow">{c.insEyebrow}</div>
              <h2>{c.insTitle}</h2>
              <p className="fl-lead">{c.insLead[ed]}</p>
            </div>
            <div className="fl-dash" role="img" aria-label={c.insAria}>
              <div className="fl-tile fl-c4"><span className="fl-sample">{c.sample}</span><div className="fl-k">{c.tConv}</div><div className="fl-n">{lang === 'en' ? '1,284' : '1.284'}</div><div className="fl-s">{c.tConvS}</div></div>
              <div className="fl-tile fl-c4"><div className="fl-k">{c.tAfter}</div><div className="fl-n">41%</div><div className="fl-s">{c.tAfterS}</div></div>
              <div className="fl-tile fl-c4"><div className="fl-k">{c.tMood}</div>
                <svg viewBox="0 0 300 70" preserveAspectRatio="none" style={{ width: '100%', height: 64 }} aria-hidden="true">
                  <path d="M0 52 L30 48 L60 50 L90 41 L120 43 L150 35 L180 37 L210 29 L240 31 L270 24 L300 20 L300 70 L0 70Z" fill="rgba(217,119,87,.18)" />
                  <path d="M0 52 L30 48 L60 50 L90 41 L120 43 L150 35 L180 37 L210 29 L240 31 L270 24 L300 20" fill="none" stroke="#d97757" strokeWidth="2.5" />
                  <circle cx="296" cy="21" r="4.5" fill="#faf9f5" />
                </svg>
                <div className="fl-s">{c.tMoodS}</div></div>
              <div className="fl-tile fl-c7"><div className="fl-k">{c.tThemes}</div>
                <div className="fl-themes">
                  {d.th.map((t) => (
                    <div className="fl-tb" key={t[0]}>
                      <span>{t[0]}</span>
                      <div className="fl-b"><i style={{ width: `${Math.round((t[1] / maxTheme) * 100)}%` }} /></div>
                      <span className="fl-p">{t[1]}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="fl-tile fl-c5"><div className="fl-k">{c.tNeeds}</div>
                <div>{d.nd.map((n) => <div className="fl-need" key={n[0]}><span className="fl-need-t">{n[0]}</span><span>{n[1]} {c.questions}</span></div>)}</div>
                <div className="fl-s">{c.tNeedsS}</div>
              </div>
            </div>
          </div>
        </section>

        {afterInsights}

        {/* PRICING */}
        <section id="flow-pricing" className="fl-sec fl-paper">
          <div className="fl-in">
            <div className="fl-head fl-center">
              <div className="fl-eyebrow">{c.priceEyebrow}</div>
              <h2>{c.priceTitle}</h2>
            </div>
            <div className="fl-plans">
              {d.plans.map((p) => (
                <div className={`fl-plan${p.rec ? ' fl-rec' : ''}`} key={p.n}>
                  {p.rec && <span className="fl-flag">{c.recFlag}</span>}
                  <h3>{p.n}</h3>
                  <p className="fl-for">{p.f}</p>
                  <div className="fl-m">{money(p.m)}<small> {c.perMonth}</small></div>
                  <div className="fl-su">{c.setup}: <b>{p.s}</b></div>
                  {p.w && <div className="fl-worth">{c.worth}: <s>{p.w}</s></div>}
                  <ul className="fl-ticks">{p.h.map((x) => <li key={x}>{x}</li>)}</ul>
                  {p.x.length > 0 && (
                    <details>
                      <summary>{c.allFeatures}</summary>
                      <ul className="fl-ticks">{p.x.map((x) => <li key={x}>{x}</li>)}</ul>
                    </details>
                  )}
                </div>
              ))}
            </div>
            <p className="fl-note">{c.priceNote}</p>
            <div className="fl-offer">
              <div>
                <h3>{c.pilotTitle}</h3>
                <p className="fl-muted">{c.pilotText}</p>
                <div className="fl-guar"><Check /><span><b>{c.guarB}</b> {c.guar}</span></div>
              </div>
              <a className="fl-btn" href="#flow-start">{c.pilotCta}</a>
            </div>
          </div>
        </section>

        {/* ONBOARDING */}
        <section className="fl-sec">
          <div className="fl-in">
            <div className="fl-head fl-center">
              <div className="fl-eyebrow">{c.onbEyebrow}</div>
              <h2>{c.onbTitle}</h2>
            </div>
            <div className="fl-steps">
              {c.steps.map((s, i) => (
                <div className="fl-st" key={s[0]}><span className="fl-no">{i + 1}</span><b>{s[0]}</b><span>{s[1]}</span></div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section className="fl-sec fl-tight">
          <div className="fl-in">
            <div className="fl-head fl-center">
              <div className="fl-eyebrow">{c.trustEyebrow}</div>
              <h2>{c.trustTitle}</h2>
            </div>
            <div className="fl-trust">
              {c.trust.map((t, i) => (
                <div className="fl-tr" key={t[0]}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{trustIcons[i]}</svg>
                  <div><b>{t[0]}</b><span>{t[1]}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="flow-start" className="fl-sec">
          <div className="fl-in">
            <div className="fl-final">
              <div className="fl-eyebrow">{c.finalEyebrow}</div>
              <h2>{c.finalTitle}</h2>
              <p className="fl-lead">{c.finalLead}</p>
              <div className="fl-mail">
                <Link className="fl-btn" to="/demo">{c.finalCta}</Link>
                <button type="button" className="fl-btn-line" onClick={copyMail}>{c.copy}</button>
              </div>
              <p className="fl-mailaddr">contact@simasiaai.gr</p>
              <p role="status" className="fl-copied">{copied ? c.copied : ''}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FlowHome;
