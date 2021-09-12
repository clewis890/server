const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/api/*", "/auth/google", "/auth/github", "/auth/spotify"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};