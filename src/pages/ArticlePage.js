import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { newsArticlesByLang } from '../translations/newsArticles';
import './ArticlePage.css';

/* -- Rich-block renderers -- */

const DekBlock = ({ text }) => <p className="ap-dek">{text}</p>;

const H2Block = ({ text }) => <h2 className="ap-body-h2">{text}</h2>;

const TilesBlock = ({ items }) => (
  <div className="ap-tiles">
    {items.map((item, i) => (
      <div key={i} className="ap-tile">
        <div className="ap-tile-n">{item.n}</div>
        <div className="ap-tile-l">{item.l}</div>
      </div>
    ))}
  </div>
);

const LayersFigure = ({ title, sub, layers, caption }) => (
  <div className="ap-layers-figure">
    <p className="ap-fig-title">{title}</p>
    {sub && <p className="ap-fig-sub">{sub}</p>}
    <div className="ap-layers-stack">
      {layers.map((layer, i) => (
        <div key={i} className="ap-layer-row" style={{ opacity: Math.max(0.35, 1 - i * 0.13) }}>
          <div className="ap-layer-main">
            <span className="ap-layer-label">{layer.label}</span>
            <span className="ap-layer-detail">{layer.detail}</span>
          </div>
          <div className="ap-layer-note">{layer.note}</div>
        </div>
      ))}
    </div>
    {caption && <p className="ap-fig-cap">{caption}</p>}
  </div>
);

const SimasiaBox = ({ title, body }) => (
  <div className="ap-simasia-box">
    <span className="ap-simasia-title">{title}</span>
    <p>{body}</p>
  </div>
);

const SourcesBlock = ({ title, items }) => (
  <div className="ap-sources">
    <h2 className="ap-sources-title">{title}</h2>
    <ol>
      {items.map((src, i) => (
        <li key={i}>{src}</li>
      ))}
    </ol>
  </div>
);

const renderBlock = (block, i) => {
  if (typeof block === 'string') return <p key={i}>{block}</p>;
  if (!block || typeof block !== 'object') return null;
  switch (block.type) {
    case 'dek':           return <DekBlock key={i} text={block.text} />;
    case 'h2':            return <H2Block key={i} text={block.text} />;
    case 'tiles':         return <TilesBlock key={i} items={block.items} />;
    case 'layers-figure': return <LayersFigure key={i} title={block.title} sub={block.sub} layers={block.layers} caption={block.caption} />;
    case 'simasia-box':   return <SimasiaBox key={i} title={block.title} body={block.body} />;
    case 'sources':       return <SourcesBlock key={i} title={block.title} items={block.items} />;
    case 'image':
      return (
        <figure key={i} className="ap-inline-figure">
          <img src={block.src} alt={block.alt || ''} />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    default: return null;
  }
};

/* -- Author byline -- */
const AuthorByline = ({ author }) => {
  if (!author) return null;
  return (
    <div className="ap-author-byline">
      {author.photo && (
        <img className="ap-author-photo" src={author.photo} alt={author.name} />
      )}
      <div className="ap-author-info">
        <span className="ap-author-name">{author.byline || author.name}</span>
        {!author.byline && author.title && <span className="ap-author-title">{author.title}</span>}
      </div>
    </div>
  );
};

/* -- Main page component -- */
const ArticlePage = () => {
  const { slug } = useParams();
  const { t, language } = useTranslation();

  const article = useMemo(() => {
    const list = newsArticlesByLang[language] || newsArticlesByLang.el;
    return list.find((a) => a.slug === slug);
  }, [language, slug]);

  // Backward-compatibility redirect from old slug to new slug
  if (slug === 'syggnomi-kyria-mou-poia-eiste') {
    return <Navigate to="/news/poia-techniti-noimosyni" replace />;
  }

  if (!article) {
    return <Navigate to="/news" replace />;
  }

  return (
    <div className="ap-article-page">
      <section className="ap-article-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/news" className="ap-back-link">{t('newsPage.backToNews')}</Link>
            {article.series && (
              <p className="ap-series-label">{article.series}</p>
            )}
            <div className="ap-article-meta">
              <span className={`ap-article-category-tag ${article.category}`}>{article.categoryLabel}</span>
              <span className="ap-article-date">{article.date}</span>
              <span className="ap-article-time">{article.readTime}</span>
            </div>
            <h1>{article.title}</h1>
            <AuthorByline author={article.author} />
            {article.image && (
              <div className={`ap-hero-image${article.image.includes('/logos/') ? ' ap-hero-image--logo' : ''}`}>
                <img src={article.image} alt={article.title} />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="ap-article-content">
        <div className="container">
          <motion.div
            className="ap-article-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {article.content.map((block, i) => renderBlock(block, i))}
          </motion.div>

          <div className="ap-article-footer">
            <Link to="/news" className="ap-back-btn">{t('newsPage.backToNewsBtn')}</Link>
            <Link to="/demo" className="btn btn-primary">{t('newsPage.cta')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
