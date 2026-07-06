import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DARK_HERO_ROUTES } from '../constants/darkHeroRoutes';
import './OverscrollFill.css';

const LIGHT_BG = '#faf9f5';
const DARK_BG = '#141413';
const EDGE_THRESHOLD = 120;

const OverscrollFill = () => {
  const { pathname } = useLocation();
  const isDarkHeroRoute = DARK_HERO_ROUTES.includes(pathname);
  const [showTopDarkFill, setShowTopDarkFill] = useState(isDarkHeroRoute);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    const syncBackdrop = () => {
      const scrollY = window.scrollY;
      const atTop = scrollY < EDGE_THRESHOLD;
      const atBottom =
        scrollY + window.innerHeight >= document.documentElement.scrollHeight - EDGE_THRESHOLD;
      const useDarkTop = isDarkHeroRoute && atTop;
      const useDarkBackdrop = useDarkTop || atBottom;

      setShowTopDarkFill(useDarkTop);

      document.documentElement.classList.toggle('page-backdrop-dark', useDarkBackdrop);
      document.documentElement.classList.toggle('page-backdrop-light', !useDarkBackdrop);
      document.documentElement.style.backgroundColor = useDarkBackdrop ? DARK_BG : LIGHT_BG;
      document.body.style.backgroundColor = useDarkBackdrop ? DARK_BG : LIGHT_BG;
      const root = document.getElementById('root');
      if (root) root.style.backgroundColor = useDarkBackdrop ? DARK_BG : LIGHT_BG;
      if (meta) meta.setAttribute('content', useDarkBackdrop ? DARK_BG : LIGHT_BG);
    };

    syncBackdrop();
    window.addEventListener('scroll', syncBackdrop, { passive: true });
    window.addEventListener('resize', syncBackdrop, { passive: true });
    return () => {
      window.removeEventListener('scroll', syncBackdrop);
      window.removeEventListener('resize', syncBackdrop);
    };
  }, [isDarkHeroRoute]);

  return (
    <>
      {showTopDarkFill && <div className="overscroll-fill overscroll-fill--top" aria-hidden="true" />}
      <div className="overscroll-fill overscroll-fill--bottom" aria-hidden="true" />
    </>
  );
};

export default OverscrollFill;
