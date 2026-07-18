import { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { newsArticlesByLang } from '../translations/newsArticles';

const ROUTE_TITLE_KEYS = [
  { path: '/', key: 'pageTitles.home', end: true },
  { path: '/team', key: 'pageTitles.team' },
  { path: '/news/:slug', key: null }, // resolved from article
  { path: '/news', key: 'pageTitles.news' },
  { path: '/services', key: 'pageTitles.services' },
  { path: '/collaborations', key: 'pageTitles.collaborations' },
  { path: '/book-demo', key: 'pageTitles.bookDemo' },
  { path: '/solutions', key: 'pageTitles.solutions' },
  { path: '/applications/simasia-chatbots', key: 'pageTitles.dialogosai' },
  { path: '/products/simasia-chatbots', key: 'pageTitles.dialogosai' },
  { path: '/applications/simasia-studio', key: 'pageTitles.studio' },
  { path: '/products/simasia-studio', key: 'pageTitles.studio' },
  { path: '/applications/simasia-daily', key: 'pageTitles.daily' },
  { path: '/products/simasia-daily', key: 'pageTitles.daily' },
  { path: '/applications/simasia-edu', key: 'pageTitles.edu' },
  { path: '/products/simasia-edu', key: 'pageTitles.edu' },
  { path: '/applications', key: 'pageTitles.applications' },
  { path: '/products', key: 'pageTitles.products' },
  { path: '/target-audience', key: 'pageTitles.targetAudience' },
];

function resolveTitle(pathname, t, language) {
  for (const route of ROUTE_TITLE_KEYS) {
    const match = matchPath({ path: route.path, end: route.end ?? false }, pathname);
    if (!match) continue;

    if (route.path === '/news/:slug') {
      const slug = match.params.slug;
      const articles = newsArticlesByLang[language] || newsArticlesByLang.el || [];
      const article = articles.find((a) => a.slug === slug);
      if (article?.title) return `${article.title} · SimasiaAI`;
      return t('pageTitles.news');
    }

    return t(route.key);
  }
  return t('pageTitles.fallback');
}

/**
 * Sets document.title from the current route + language.
 */
const DocumentTitle = () => {
  const { pathname } = useLocation();
  const { t, language } = useTranslation();

  useEffect(() => {
    document.title = resolveTitle(pathname, t, language);
  }, [pathname, t, language]);

  return null;
};

export default DocumentTitle;
