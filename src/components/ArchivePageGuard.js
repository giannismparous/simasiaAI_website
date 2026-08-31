import { useEffect } from 'react';

/**
 * Marks archived snapshot routes as noindex for crawlers.
 */
const ArchivePageGuard = ({ label }) => {
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    const created = !meta;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    const previous = meta.getAttribute('content');
    meta.setAttribute('content', 'noindex, nofollow');

    if (label) {
      document.documentElement.dataset.archivePage = label;
    }

    return () => {
      if (created && meta?.parentNode) {
        meta.parentNode.removeChild(meta);
      } else if (meta) {
        if (previous) meta.setAttribute('content', previous);
        else meta.removeAttribute('content');
      }
      delete document.documentElement.dataset.archivePage;
    };
  }, [label]);

  return null;
};

export default ArchivePageGuard;
