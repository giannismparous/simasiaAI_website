import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from './NewsPage';
import './ArticlePage.css';

const ArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return <Navigate to="/news" replace />;
  }

  return (
    <div className="ap-article-page">
      {/* Hero */}
      <section className="ap-article-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/news" className="ap-back-link">← Νέα & Άρθρα</Link>
            <div className="ap-article-meta">
              <span className="ap-article-category">{article.categoryLabel}</span>
              <span className="ap-article-date">{article.date}</span>
            </div>
            <h1>{article.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="ap-article-content">
        <div className="container">
          <motion.div
            className="ap-article-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {article.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </motion.div>

          <div className="ap-article-footer">
            <Link to="/news" className="ap-back-btn">← Πίσω στα Νέα</Link>
            <Link to="/book-demo" className="btn btn-primary">Κλείστε Demo</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
