const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            logLevel:'info',
            pathRewrite:{
                'api':''
            },
            target: process.env.BACKEND_APP_BASE_URL,
            changeOrigin: true,
        })
    );
};
