import { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { newsArticlesByLang } from '../translations/newsArticles';

const SITE_URL = 'https://www.simasiaai.gr';

/** Current routes → `pageTitles.<key>` and `pageMeta.<key>` (src/translations/extraUi.js). */
const ROUTES = [
  { path: '/', key: 'home', end: true },
  { path: '/flow', key: 'flow' },
  { path: '/go', key: 'go' },
  { path: '/platform', key: 'platform' },
  { path: '/ypodochi', key: 'ypodochi' },
  { path: '/collaborations', key: 'collaborations' },
  { path: '/team', key: 'team' },
  { path: '/news/:slug', key: 'news', article: true },
  { path: '/news', key: 'news' },
  { path: '/newsletter', key: 'newsletter' },
  { path: '/terms', key: 'terms' },
  { path: '/privacy', key: 'privacy' },
  { path: '/cookies', key: 'cookies' },
  { path: '/calculator', key: 'calculator', noindex: true },
  { path: '/pricing-calculator', key: 'calculator', noindex: true },
];

function lookup(t, key, fallbackKey) {
  const value = t(key);
  if (typeof value === 'string' && value && value !== key) return value;
  const fb = t(fallbackKey);
  return typeof fb === 'string' && fb !== fallbackKey ? fb : 'SimasiaAI';
}

function resolveMeta(pathname, t, language) {
  for (const route of ROUTES) {
    const match = matchPath({ path: route.path, end: route.end ?? true }, pathname);
    if (!match) continue;

    let title = lookup(t, `pageTitles.${route.key}`, 'pageTitles.fallback');
    let description = lookup(t, `pageMeta.${route.key}`, 'pageMeta.fallback');
    let canonicalPath = route.path;

    if (route.article) {
      const slug = match.params.slug;
      const articles = newsArticlesByLang[language] || newsArticlesByLang.el || [];
      const article = articles.find((a) => a.slug === slug);
      canonicalPath = `/news/${slug}`;
      if (article?.title) title = `${article.title} · SimasiaAI`;
      if (article?.excerpt) description = article.excerpt;
    }

    return { title, description, canonicalPath, noindex: Boolean(route.noindex) };
  }

  return {
    title: lookup(t, 'pageTitles.fallback', 'pageTitles.fallback'),
    description: lookup(t, 'pageMeta.fallback', 'pageMeta.fallback'),
    canonicalPath: '/',
    noindex: false,
  };
}

/** Create or update a <meta> / <link> tag in <head>. */
function upsertHeadTag(tagName, matchAttr, matchValue, valueAttr, value) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector(`${tagName}[${matchAttr}="${matchValue}"]`);
  if (!el) {
    el = document.createElement(tagName);
    el.setAttribute(matchAttr, matchValue);
    document.head.appendChild(el);
  }
  el.setAttribute(valueAttr, value);
}

function trimDescription(text, max = 300) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
}

/**
 * Per-route <title>, meta description, canonical, Open Graph / Twitter tags and <html lang>.
 * The site switches language client-side on the same URL, so the canonical is language-neutral.
 */
const DocumentTitle = () => {
  const { pathname } = useLocation();
  const { t, language } = useTranslation();

  useEffect(() => {
    const { title, description, canonicalPath, noindex } = resolveMeta(pathname, t, language);
    const desc = trimDescription(description);
    const url = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;

    document.title = title;
    document.documentElement.setAttribute('lang', language === 'en' ? 'en' : 'el');

    upsertHeadTag('meta', 'name', 'description', 'content', desc);
    upsertHeadTag('link', 'rel', 'canonical', 'href', url);
    upsertHeadTag('meta', 'property', 'og:title', 'content', title);
    upsertHeadTag('meta', 'property', 'og:description', 'content', desc);
    upsertHeadTag('meta', 'property', 'og:url', 'content', url);
    upsertHeadTag('meta', 'property', 'og:locale', 'content', language === 'en' ? 'en_GB' : 'el_GR');
    upsertHeadTag('meta', 'name', 'twitter:title', 'content', title);
    upsertHeadTag('meta', 'name', 'twitter:description', 'content', desc);
    upsertHeadTag(
      'meta',
      'name',
      'robots',
      'content',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'
    );
  }, [pathname, t, language]);

  return null;
};

export default DocumentTitle;
