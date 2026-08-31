import React, { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './AboutSection.css';
import giannisReal from '../assets/giannis-real.png';
import dimitrisReal from '../assets/dimitris-real.png';
import anastasiaReal from '../assets/anastasia-real.png';
import stergiosReal from '../assets/stergios-real.png';
import pantelisImg from '../assets/pantelis.png';

const avatarById = {
  stergios: stergiosReal,
  dimitris: dimitrisReal,
  giannis: giannisReal,
  anastasia: anastasiaReal,
  pantelis: pantelisImg,
};

const avatarClassById = {
  giannis: 'as-avatar-giannis',
  pantelis: 'as-avatar-pantelis',
};

const AboutSection = () => {
  const { t } = useTranslation();
  const principles = t('aboutSection.principles');
  const teamCopy = t('aboutSection.team');
  const team = useMemo(() => {
    if (!Array.isArray(teamCopy)) return [];
    return teamCopy.map((member) => ({
      ...member,
      avatar: avatarById[member.id],
      avatarClass: avatarClassById[member.id] || '',
    }));
  }, [teamCopy]);

  const ceoRef = useRef(null);
  const teamRef = useRef(null);
  const principlesRef = useRef(null);

  const ceoInView = useInView(ceoRef, { once: true, margin: '100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '100px' });
  const principlesInView = useInView(principlesRef, { once: true, margin: '100px' });

  return (
    <div id="about" className="about-section-wrap">
      <div className="as-section-title">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('aboutSection.title')}</h2>
            <p>{t('aboutSection.subtitle')}</p>
          </motion.div>
        </div>
      </div>

      <section className="as-ceo-section" ref={ceoRef}>
        <div className="container">
          <motion.div
            className="as-ceo-card"
            initial={{ opacity: 0, y: 30 }}
            animate={ceoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="as-ceo-layout">
              <div className="as-ceo-copy">
                <span className="as-ceo-badge">{t('aboutSection.ceoBadge')}</span>
                <blockquote className="as-ceo-quote">{t('aboutSection.ceoQuote')}</blockquote>
                <h2>{t('aboutSection.ceoName')}</h2>
                <h3 className="as-ceo-title">{t('aboutSection.ceoTitle')}</h3>
              </div>
              <div className="as-ceo-portrait" aria-hidden="true">
                <img src={stergiosReal} alt="" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="as-team-section" ref={teamRef}>
        <div className="container">
          <motion.div
            className="as-team-header"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('aboutSection.teamTitle')}</h2>
            <p>{t('aboutSection.teamSubtitle')}</p>
          </motion.div>

          <div className="as-team-grid as-team-strip">
            {team.map((member, i) => (
              <motion.div
                key={member.id || member.name}
                className="as-member-card"
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
              >
                <div className="as-member-portrait" aria-hidden="true">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt=""
                      className={member.avatarClass || undefined}
                    />
                  ) : (
                    <span>{member.name.split(' ').map((p) => p[0]).join('').toUpperCase()}</span>
                  )}
                </div>
                <div className="as-member-top">
                  <div className="as-member-name-wrap">
                    <h3>{member.name}</h3>
                    <h4>{member.role}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="as-principles" ref={principlesRef}>
        <div className="container">
          <motion.div
            className="as-principles-header"
            initial={{ opacity: 0, y: 20 }}
            animate={principlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('aboutSection.principlesTitle')}</h2>
            <p>{t('aboutSection.principlesSubtitle')}</p>
          </motion.div>
          <div className="as-principles-list">
            {principles.map((p, i) => (
              <motion.div
                key={p.num}
                className="as-principle-item"
                initial={{ opacity: 0, y: 20 }}
                animate={principlesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <span className="as-principle-num">{p.num}</span>
                <div className="as-principle-body">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="as-mission">
        <div className="container">
          <motion.div
            className="as-mission-inner"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('aboutSection.missionTitle')}</h2>
            <p className="as-mission-text">
              {t('aboutSection.missionBefore')}{' '}
              <em className="brand-dialogos">DialogosAI</em>{' '}
              {t('aboutSection.missionAfter')}
            </p>
            <Link to="/demo" className="btn btn-primary">{t('aboutSection.cta')}</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
