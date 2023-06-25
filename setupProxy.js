// Create a file named `setupProxy.js` or `setupProxy.ts`
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:44367',
      secure: false,
      changeOrigin: true,
    })
  );
};
