import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { newsArticlesByLang } from '../translations/newsArticles';
import './ArticlePage.css';

const ArticlePage = () => {
  const { slug } = useParams();
  const { t, language } = useTranslation();

  const article = useMemo(() => {
    const list = newsArticlesByLang[language] || newsArticlesByLang.el;
    return list.find((a) => a.slug === slug);
  }, [language, slug]);

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
            <div className="ap-article-meta">
              <span className={`ap-article-category-tag ${article.category}`}>{article.categoryLabel}</span>
              <span className="ap-article-date">{article.date}</span>
              <span className="ap-article-time">{article.readTime}</span>
            </div>
            <h1>{article.title}</h1>
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
            {article.content.map((block, i) => {
              if (block && typeof block === 'object' && block.type === 'image') {
                return (
                  <figure key={i} className="ap-inline-figure">
                    <img src={block.src} alt={block.alt || ''} />
                    {block.caption && <figcaption>{block.caption}</figcaption>}
                  </figure>
                );
              }
              return <p key={i}>{block}</p>;
            })}
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
