import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { flowContent } from './flowContent';
import { threeContent } from './flowThreeContent';
import FlowRiver from './FlowRiver';
import { Crossing } from './FlowParts';
import { ThreeLayers, DemoHead, Edition, TimeBack, ValueEquation, BuildTeaser } from './FlowThree';
import DialogosDemo from './DialogosDemo';
import PraxisDemo from './PraxisDemo';
import MetronDemo from './MetronDemo';
import { GoLabel } from './modules';
import './Flow.css';

/*
 * fλow product page. Dark and paper bands alternate, as on the rest of the site.
 * Story: the river (one flow) → three parts,
 * separately and together → each part, live → proof → the time that returns and
 * why it is worth it → build your own fλow (no fixed packages) → how we cross
 * together → trust → start with a few questions.
 */

const Wordmark = () => <span className="fl-word">f<span>λ</span>ow</span>;

const FlowHome = ({ proof = null }) => {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'el';
  const c = flowContent[lang];
  const t3 = threeContent[lang];
  const [ed, setEd] = useState('ngo');

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
            <Link className="go-btn" to="/go"><GoLabel /></Link>
            <a className="fl-link" href="#fl-parts">{c.hero.link}</a>
          </div>
        </div>
        <div className="fl-river"><FlowRiver copy={c.hero} /></div>
      </section>

      {/* 4. Λόγος, Πράξη και Καταγραφή: separately and together */}
      <section id="fl-parts" className="fl-sec fl-paper">
        <div className="fl-in">
          <h2 className="fl-h2">{t3.layers.title}</h2>
          <p className="fl-lead">{t3.layers.lead}</p>
          <ThreeLayers c={t3.layers} />
        </div>
      </section>

      {/* 5. 01 DialogosAI, live */}
      <section id="fl-dialogos" className="fl-sec fl-dark">
        <div className="fl-in">
          <DemoHead d={t3.demos.dialogos} id="dialogos"><Edition c={t3.demos.edition} ed={ed} setEd={setEd} dark /></DemoHead>
          <DialogosDemo lang={lang} ed={ed} key={`d-${ed}-${lang}`} />
        </div>
      </section>

      {/* 6. 02 PraxisAI, live */}
      <section id="fl-praxis" className="fl-sec fl-paper">
        <div className="fl-in">
          <DemoHead d={t3.demos.praxis} id="praxis" />
          <PraxisDemo lang={lang} ed={ed} key={`p-${ed}-${lang}`} />
        </div>
      </section>

      {/* 7. 03 MetronAI, live */}
      <section id="fl-metron" className="fl-sec fl-dark">
        <div className="fl-in">
          <DemoHead d={{ ...t3.demos.metron, lead: t3.demos.metron.lead[ed] }} id="metron"><Edition c={t3.demos.edition} ed={ed} setEd={setEd} dark /></DemoHead>
          <MetronDemo lang={lang} ed={ed} key={`m-${ed}-${lang}`} />
        </div>
      </section>

      {proof}

      {/* 8. The time that comes back, and why it is worth more than it costs */}
      <section id="fl-value" className="fl-sec fl-dark">
        <div className="fl-in">
          <div className="fl-headrow">
            <div>
              <h2 className="fl-h2">{t3.time.title}</h2>
              <p className="fl-lead">{t3.time.lead}</p>
            </div>
            <Edition c={t3.demos.edition} ed={ed} setEd={setEd} dark />
          </div>
          <TimeBack c={t3.time} lang={lang} ed={ed} key={`t-${ed}`} />
          <h3 className="fl-h3">{t3.eq.title}</h3>
          <ValueEquation c={t3.eq} />
        </div>
      </section>

      {/* 9. Build your own fλow (replaces fixed packages) */}
      <section id="fl-plans" className="fl-sec fl-paper">
        <div className="fl-in">
          <div className="fl-headrow">
            <div>
              <h2 className="fl-h2">{t3.build.title}</h2>
              <p className="fl-lead">{t3.build.lead}</p>
            </div>
            <Edition c={t3.demos.edition} ed={ed} setEd={setEd} />
          </div>
          <BuildTeaser c={t3.build} parts={t3.layers.parts} lang={lang} ed={ed} key={`b-${ed}`} />
        </div>
      </section>

      {/* 10. Crossing: onboarding */}
      <section className="fl-sec fl-dark">
        <div className="fl-in">
          <h2 className="fl-h2">{c.crossing.title}</h2>
          <p className="fl-lead">{c.crossing.lead}</p>
        </div>
        <Crossing c={c.crossing} />
      </section>

      {/* 11. Trust */}
      <section className="fl-sec fl-paper">
        <div className="fl-in">
          <h2 className="fl-h2">{c.trust.title}</h2>
          <ul className="fl-trust">
            {c.trust.items.map((t) => <li key={t[0]}><b>{t[0]}</b> {t[1]}</li>)}
          </ul>
          <Link className="fl-terms-link" to="/terms#ai-accuracy">{c.trust.termsLink} →</Link>
        </div>
      </section>

      {/* 12. Start: a few questions, and the offer designs itself */}
      <section id="fl-start" className="fl-sec fl-dark fl-final">
        <div className="fl-in">
          <h2 className="fl-h2">{c.final.title}</h2>
          <p className="fl-lead">{c.final.lead}</p>
          <div className="fl-ctas fl-final-ctas">
            <Link className="go-btn" to={`/go?for=${ed}`}><GoLabel /></Link>
            <Link className="fl-link" to="/go#book">{c.final.cta}</Link>
            <span className="fl-mail">{c.final.mail} <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a></span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlowHome;
