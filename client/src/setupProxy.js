const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/auth/google', { target: '/' }));
  app.use(proxy('/auth/facebook', { target: '/' }));
  app.use(proxy('/api/*', { target: '/' }));
};