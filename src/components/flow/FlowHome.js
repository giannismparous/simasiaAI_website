import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { flowContent, editions } from './flowContent';
import FlowRiver from './FlowRiver';
import {
  PhoneDay, People, LogosPraxis, DayRiver, ValueCalc, Equation, Plans, Crossing,
} from './FlowParts';
import './Flow.css';

/*
 * fλow home page. Dark and paper bands alternate, as on the rest of the site.
 * The river is the one memorable element; everything else stays quiet.
 * Slots let the page reuse live sections (DialogosAI demo, partnerships).
 */

const Wordmark = () => <span className="fl-word">f<span>λ</span>ow</span>;

const EditionSwitch = ({ c, ed, setEd }) => (
  <div className="fl-ed" role="group" aria-label={c.aria}>
    <button type="button" aria-pressed={ed === 'ngo'} onClick={() => setEd('ngo')}>{c.ngo}</button>
    <button type="button" aria-pressed={ed === 'med'} onClick={() => setEd('med')}>{c.med}</button>
  </div>
);

const FlowHome = ({ demo = null, proof = null }) => {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'el';
  const c = flowContent[lang];
  const [ed, setEd] = useState('ngo');
  const [calm, setCalm] = useState(false);
  const d = editions[lang][ed];
  const maxTheme = d.th[0][1];

  return (
    <div className="fl" lang={lang} data-ed={ed}>
      {/* 1. Hero: the λ river */}
      <section className="fl-hero fl-dark">
        <div className="fl-hero-copy">
          <p className="fl-mark"><Wordmark /> <span>{c.hero.by}</span></p>
          <h1>{c.hero.title}</h1>
          <p className="fl-sub">
            {c.hero.sub.map(([b, t]) => <React.Fragment key={t}>{b && <b>{b}</b>}{t}</React.Fragment>)}
          </p>
          <div className="fl-ctas">
            <a className="fl-btn" href="#fl-start">{c.hero.cta}</a>
            <a className="fl-link" href="#fl-day">{c.hero.link}</a>
          </div>
        </div>
        <div className="fl-river"><FlowRiver copy={c.hero} /></div>
      </section>

      {/* 2. The reframe: reassurance, not information */}
      <section className="fl-sec fl-paper">
        <div className="fl-in fl-reframe">
          <div className="fl-reframe-text">
            <h2>{c.reframe.title}</h2>
            {c.reframe.body.map((p, i) => <p key={i} className={i === 1 ? 'fl-turn' : 'fl-body'}>{p}</p>)}
          </div>
          <PhoneDay c={c.reframe.phone} />
        </div>
      </section>

      {/* 3. The people it flows for */}
      <section className="fl-sec fl-dark">
        <div className="fl-in">
          <h2 className="fl-h2">{c.people.title}</h2>
          <People c={c.people} />
          <p className="fl-fine">{c.people.note}</p>
        </div>
      </section>

      {/* 4. Λόγος + Πράξη = Ροή */}
      <section className="fl-sec fl-paper">
        <div className="fl-in">
          <h2 className="fl-h2">{c.parts.title}</h2>
          <p className="fl-lead">{c.parts.lead}</p>
          <LogosPraxis c={c.parts} />
        </div>
      </section>

      {demo}

      {/* 5. A day, turbulent or calm */}
      <section id="fl-day" className="fl-sec fl-dark">
        <div className="fl-in">
          <div className="fl-headrow">
            <div>
              <h2 className="fl-h2">{c.day.title}</h2>
              <p className="fl-lead">{c.day.lead}</p>
            </div>
            <EditionSwitch c={c.editions} ed={ed} setEd={setEd} />
          </div>
          <DayRiver rows={d.day} c={c.day} calm={calm} setCalm={setCalm} />
        </div>
      </section>

      {/* 6. Insights */}
      <section className="fl-sec fl-paper">
        <div className="fl-in fl-ins">
          <div className="fl-ins-text">
            <h2 className="fl-h2">{c.insights.title}</h2>
            <p className="fl-lead">{c.insights.lead[ed]}</p>
            <dl className="fl-ins-nums">
              {[c.insights.conv, c.insights.after, c.insights.answered].map((n) => (
                <div key={n[1]}><dt>{n[0]}</dt><dd>{n[1]}</dd></div>
              ))}
            </dl>
            <p className="fl-fine">{c.insights.sample}</p>
          </div>
          <div className="fl-ins-lists">
            <h3>{c.insights.themes}</h3>
            <ul className="fl-themes">
              {d.th.map((t) => (
                <li key={t[0]}>
                  <span>{t[0]}</span>
                  <i style={{ '--w': `${Math.round((t[1] / maxTheme) * 100)}%` }} />
                  <b>{t[1]}%</b>
                </li>
              ))}
            </ul>
            <h3>{c.insights.needs}</h3>
            <ul className="fl-needs">
              {d.nd.map((n) => <li key={n[0]}><span>{n[0]}</span><b>{n[1]} {c.insights.q}</b></li>)}
            </ul>
            <p className="fl-fine">{c.insights.needsNote}</p>
          </div>
        </div>
      </section>

      {proof}

      {/* 7. Value: Hormozi's equation, made tangible */}
      <section className="fl-sec fl-dark">
        <div className="fl-in">
          <div className="fl-headrow">
            <div>
              <h2 className="fl-h2">{c.value.title}</h2>
              <p className="fl-lead">{c.value.lead}</p>
            </div>
            <EditionSwitch c={c.editions} ed={ed} setEd={setEd} />
          </div>
          <ValueCalc c={c.value} ed={ed} lang={lang} />
          <h3 className="fl-h3">{c.value.eqTitle}</h3>
          <Equation c={c.value.eq} />
        </div>
      </section>

      {/* 8. Plans and guarantee */}
      <section id="fl-plans" className="fl-sec fl-paper">
        <div className="fl-in">
          <div className="fl-headrow">
            <h2 className="fl-h2">{c.plans.title}</h2>
            <EditionSwitch c={c.editions} ed={ed} setEd={setEd} />
          </div>
          {ed === 'ngo' && <p className="fl-lead">{c.plans.ngoFunding}</p>}
          <Plans plans={d.plans} c={c.plans} ed={ed} lang={lang} />
          <p className="fl-fine fl-center-t">{c.plans.note}{ed === 'med' && <> <Link to="/ypodochi">{c.plans.details}</Link></>}</p>
          <div className="fl-guar">
            <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div><h3>{c.plans.guarantee[ed][0]}</h3><p>{c.plans.guarantee[ed][1]}</p></div>
            <a className="fl-btn" href="#fl-start">{c.plans.start}</a>
          </div>
        </div>
      </section>

      {/* 9. Crossing: onboarding */}
      <section className="fl-sec fl-dark">
        <div className="fl-in">
          <h2 className="fl-h2">{c.crossing.title}</h2>
          <p className="fl-lead">{c.crossing.lead}</p>
        </div>
        <Crossing c={c.crossing} />
      </section>

      {/* 10. Trust */}
      <section className="fl-sec fl-paper">
        <div className="fl-in">
          <h2 className="fl-h2">{c.trust.title}</h2>
          <ul className="fl-trust">
            {c.trust.items.map((t) => <li key={t[0]}><b>{t[0]}</b> {t[1]}</li>)}
          </ul>
        </div>
      </section>

      {/* 11. Final invitation */}
      <section id="fl-start" className="fl-sec fl-dark fl-final">
        <div className="fl-in">
          <h2 className="fl-h2">{c.final.title}</h2>
          <p className="fl-lead">{c.final.lead}</p>
          <div className="fl-ctas">
            <Link className="fl-btn" to="/demo">{c.final.cta}</Link>
            <span className="fl-mail">{c.final.mail} <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a></span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlowHome;
