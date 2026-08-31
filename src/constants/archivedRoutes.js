/** Frozen page snapshots — not linked in nav, sitemap, or RAG index. */
export const ARCHIVED_ROUTES = {
  oldHome: '/archive/old-home',
  oldDialogosAi: '/archive/old-dialogos-ai',
};

export const ARCHIVED_ROUTE_PATHS = Object.values(ARCHIVED_ROUTES);

export const isArchivedRoute = (pathname) =>
  ARCHIVED_ROUTE_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
