const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  const target = process.env.SIMASIA_GEMINI_PROXY_TARGET || 'http://127.0.0.1:3456';
  app.use(
    '/.netlify/functions',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: (path) => path,
    })
  );
};
