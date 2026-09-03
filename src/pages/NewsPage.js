import React, { useState, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeroBackdrop from '../components/PageHeroBackdrop';
import { useTranslation } from '../hooks/useTranslation';
import { newsArticlesByLang } from '../translations/newsArticles';
import './NewsPage.css';

const ease = [0.16, 1, 0.3, 1];

const NewsPage = () => {
  const { t, language } = useTranslation();
  const [filter, setFilter] = useState('all');
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '100px' });

  const articles = useMemo(
    () => newsArticlesByLang[language] || newsArticlesByLang.el,
    [language],
  );

  const countAll = articles.length;
  const countNews = articles.filter((a) => a.category === 'news').length;
  const countArticles = articles.filter((a) => a.category === 'articles').length;

  const filtered = filter === 'all' ? articles : articles.filter((a) => a.category === filter);

  const featuredArticle = filtered.find((a) => a.featured && filter === 'all');
  const gridArticles = featuredArticle
    ? filtered.filter((a) => a.slug !== featuredArticle.slug)
    : filtered;

  return (
    <div className="np-page">
      <section className="np-hero">
        <PageHeroBackdrop />
        <div className="container">
          <motion.div
            className="np-hero-inner"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <h1>{t('newsPage.heroTitle')}</h1>
            <p className="np-hero-sub">{t('newsPage.heroSub')}</p>
          </motion.div>
        </div>
      </section>

      <section className="np-filter">
        <div className="container">
          <div className="np-filter-inner">
            <p className="np-filter-label">{t('newsPage.filterLabel')}</p>
            <div className="np-filter-tabs" role="tablist" aria-label={t('newsPage.filterLabel')}>
              <button
                type="button"
                role="tab"
                aria-selected={filter === 'all'}
                className={`np-tab${filter === 'all' ? ' np-tab--active' : ''}`}
                onClick={() => setFilter('all')}
              >
                <span className="np-tab-text">{t('newsPage.filterAll')}</span>
                <span className="np-tab-count">{countAll}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={filter === 'news'}
                className={`np-tab${filter === 'news' ? ' np-tab--active' : ''}`}
                onClick={() => setFilter('news')}
              >
                <span className="np-tab-text">{t('newsPage.filterNews')}</span>
                <span className="np-tab-count">{countNews}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={filter === 'articles'}
                className={`np-tab${filter === 'articles' ? ' np-tab--active' : ''}`}
                onClick={() => setFilter('articles')}
              >
                <span className="np-tab-text">{t('newsPage.filterArticles')}</span>
                <span className="np-tab-count">{countArticles}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="np-grid-section" ref={gridRef}>
        <div className="container">
          {featuredArticle && (
            <motion.div
              className="np-featured-wrap"
              initial={{ opacity: 0, y: 30 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease }}
            >
              <Link to={`/news/${featuredArticle.slug}`} className="np-featured-card">
                {featuredArticle.image && (
                  <div className={`np-featured-img${featuredArticle.image.includes('/logos/') ? ' np-featured-img--logo' : ''}`}>
                    <img src={featuredArticle.image} alt={featuredArticle.title} />
                  </div>
                )}
                <div className="np-featured-content">
                  <div className="np-featured-badge">{t('newsPage.featuredBadge')}</div>
                  <div className="np-card-meta">
                    <span className="np-card-category-tag news">{featuredArticle.categoryLabel}</span>
                    <span className="np-card-date">{featuredArticle.date}</span>
                    <span className="np-card-time">{featuredArticle.readTime}</span>
                  </div>
                  <h2>{featuredArticle.title}</h2>
                  <p>{featuredArticle.excerpt}</p>
                  <span className="np-featured-read">{t('newsPage.readArticle')}</span>
                </div>
              </Link>
            </motion.div>
          )}

          {gridArticles.length > 0 ? (
            <div className="np-articles-grid">
              {gridArticles.map((article, i) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                >
                  <Link to={`/news/${article.slug}`} className="np-article-card">
                    {article.image && (
                      <div className="np-card-img">
                        <img src={article.image} alt={article.title} />
                      </div>
                    )}
                    <div className="np-card-content">
                      <div className="np-card-meta">
                        <span className={`np-card-category-tag ${article.category}`}>
                          {article.categoryLabel}
                        </span>
                        <span className="np-card-date">{article.date}</span>
                      </div>
                      <h2>{article.title}</h2>
                      <p>{article.excerpt}</p>
                      <div className="np-card-footer-info">
                        <span className="np-card-time">{article.readTime}</span>
                        <span className="np-card-read">{t('newsPage.readShort')}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            !featuredArticle && (
              <div className="np-empty-state">
                <div className="np-empty-icon">📰</div>
                <h3>{t('newsPage.emptyTitle')}</h3>
                <p>{t('newsPage.emptyBody')}</p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
