import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './PartnershipsSection.css';

const PYXIDA_PATH = '/ypodochi';
const PYXIDA_MARKER = /<strong>Pyxida<\/strong>/g;

export const renderWithPyxidaLinks = (html) => {
  if (!html || !html.includes('<strong>Pyxida</strong>')) {
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  }

  const parts = html.split(PYXIDA_MARKER);
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {i > 0 && (
        <Link to={PYXIDA_PATH} className="brand-pyxida-link">
          Pyxida
        </Link>
      )}
      {part ? <span dangerouslySetInnerHTML={{ __html: part }} /> : null}
    </React.Fragment>
  ));
};

const CollaborationsIntroCopy = ({ showViewAll = false, className = 'collabs-copy' }) => {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <h2>{renderWithPyxidaLinks(t('collaborations.home.headline'))}</h2>
      <p>{renderWithPyxidaLinks(t('collaborations.home.paragraph1'))}</p>
      <p dangerouslySetInnerHTML={{ __html: t('collaborations.home.paragraph2') }} />
      <p>{renderWithPyxidaLinks(t('collaborations.home.paragraph3'))}</p>
      {showViewAll && (
        <a href="/collaborations" className="collabs-view-all">
          {t('collaborations.home.viewAll')}
        </a>
      )}
    </div>
  );
};

export default CollaborationsIntroCopy;
