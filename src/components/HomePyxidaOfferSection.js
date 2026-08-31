import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { ProductVisualLanguageProvider } from '../contexts/ProductVisualLanguageContext';
import { formatEuroSuffix } from '../utils/formatEuro';
import ModuleVisual, { VisualStage } from './PraxiModuleVisuals';
import './OfferLadderSection.css';
import './HomePyxidaOfferSection.css';

const PYXIDA_NAME = 'Pyxida';

const moduleIndexLabel = (prefix, index) => `${prefix || 'Module'} ${index + 1}`;

const HomePraxiModule = ({ tier, index, offer, setupPrice }) => {
  const features = tier.scrollFeatures || tier.features?.slice(0, 4) || [];
  const perMonth = offer.billingPerMonth || '/μήνα';
  const monthlyAmount = tier.priceMonthly || tier.price;
  const visualFirst = index % 2 === 1;

  return (
    <article className={`home-pyxida-module${visualFirst ? ' home-pyxida-module--visual-first' : ''}`}>
      <div className="home-pyxida-module-grid">
        <div className="home-pyxida-module-copy ol-praxi-module-copy">
          <span className="ol-module-index">
            {moduleIndexLabel(offer.praxiModuleIndexPrefix, index)}
          </span>
          <h3 className="ol-scene-title ol-praxi-module-verb">{tier.verb}</h3>
          <p className="ol-scene-body ol-praxi-module-focus">{tier.productRole}</p>
          <p className="ol-scene-body ol-praxi-module-tagline">{tier.tagline}</p>
          <div className="ol-praxi-module-pricing home-pyxida-module-pricing">
            <div className="ol-praxi-module-price-row home-pyxida-module-price-row">
              <span className="ol-tier-price">
                {formatEuroSuffix(monthlyAmount)}
                <span className="ol-pyxida-offer-billing-period">{perMonth}</span>
              </span>
              {setupPrice && (
                <>
                  <span className="home-pyxida-module-price-sep" aria-hidden="true">+</span>
                  <span className="ol-praxi-module-setup">{formatEuroSuffix(setupPrice)}</span>
                </>
              )}
            </div>
          </div>
          <ul className="ol-pyxida-offer-features ol-praxi-module-features">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="home-pyxida-module-visual ol-pyxida-scene-visual-wrap ol-pyxida-scene-visual-wrap--praxi ol-pyxida-scene-visual-wrap--crm">
          <VisualStage accent="crm" variant={`praxi-${tier.id}`}>
            <ModuleVisual tierId={tier.id} />
          </VisualStage>
        </div>
      </div>
    </article>
  );
};

const renderFeatureText = (text, brandName) => {
  if (!text || !brandName || !text.includes(brandName)) return text;
  const parts = text.split(brandName);
  const nodes = [];
  parts.forEach((part, i) => {
    if (i > 0) {
      nodes.push(
        <span key={`brand-${i}`} className="ol-brand-inline ol-brand-inline--pyxida">
          {brandName}
        </span>
      );
    }
    if (part) nodes.push(part);
  });
  return nodes;
};

const HomePyxidaOfferSection = () => {
  const { t, language } = useTranslation();
  const offer = t('ypodochiPage.offer') || {};
  const tiers = t('ypodochiPage.tiers') || [];
  const tier = tiers.find((item) => item.id === 'apanta') || tiers[0] || {};
  const praxiTiers = tiers.filter((item) => item.productKind === 'praxi');
  const features = tier.scrollFeatures || tier.features || [];
  const giftRows = offer.giftRows || [];
  const setupPrice = (tier.setup || '').replace(/^\+\s*/, '');
  const brandName = t('homePyxidaOffer.titleBrand') || offer.pyxidaTitle || PYXIDA_NAME;

  if (features.length === 0) return null;

  return (
    <ProductVisualLanguageProvider language={language}>
    <section className="home-pyxida-offer" aria-labelledby="home-pyxida-offer-title">
      <div className="container">
        <div className="home-pyxida-offer-inner ol-pyxida-scene--offer">
          <div className="ol-pyxida-offer-open">
            <div className="ol-pyxida-offer-core">
              <h2 id="home-pyxida-offer-title" className="home-pyxida-offer-title">
                {t('homePyxidaOffer.titleBefore')}{' '}
                <Link to="/ypodochi" className="brand-pyxida-link">
                  {brandName}
                </Link>
              </h2>
            </div>

            <div className="ol-pyxida-offer-body">
              <div className="ol-pyxida-offer-lists-wrap">
                <div className="ol-pyxida-offer-lists">
                  <div className="ol-pyxida-offer-col ol-pyxida-offer-col--included">
                    <div className="ol-pyxida-offer-col-head">
                      <span className="ol-pyxida-offer-included-title">
                        {offer.includedEyebrow || 'Included'}
                      </span>
                    </div>
                    <ul className="ol-pyxida-offer-features">
                      {features.map((feature) => (
                        <li key={feature}>
                          <span className="ol-pyxida-offer-feature-copy">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {giftRows.length > 0 && (
                    <div className="ol-pyxida-offer-col ol-pyxida-offer-col--gifts">
                      <div className="ol-pyxida-offer-col-head ol-pyxida-offer-col-head--gifts">
                        <span className="ol-pyxida-offer-gifts-title">
                          {offer.giftsEyebrow || '+ Free extras'}
                        </span>
                      </div>
                      <ul className="ol-pyxida-offer-features ol-praxi-module-features">
                        {giftRows.map((row) => (
                          <li key={row.label}>
                            <span className="ol-pyxida-offer-feature-copy">
                              {renderFeatureText(row.label, brandName)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {praxiTiers.length > 0 && (
                <div className="home-pyxida-modules">
                  <header className="home-pyxida-modules-head">
                    <h3 className="home-pyxida-modules-title">{t('homePyxidaOffer.modulesTitle')}</h3>
                    <p className="home-pyxida-modules-desc">{t('homePyxidaOffer.modulesDesc')}</p>
                  </header>
                  <div className="home-pyxida-modules-list">
                    {praxiTiers.map((praxiTier, index) => (
                      <HomePraxiModule
                        key={praxiTier.id}
                        tier={praxiTier}
                        index={index}
                        offer={offer}
                        setupPrice={setupPrice}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="home-pyxida-offer-cta-wrap">
              <Link to="/ypodochi" className="ol-pyxida-offer-cta">
                {t('homePyxidaOffer.cta')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    </ProductVisualLanguageProvider>
  );
};

export default HomePyxidaOfferSection;
