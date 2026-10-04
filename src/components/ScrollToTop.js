import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// New page: start at the top. With a #hash (e.g. /go#book): glide to that section
// once it has rendered.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      let tries = 0;
      const id = hash.slice(1);
      const go = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else if (tries++ < 20) setTimeout(go, 50);
      };
      go();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
