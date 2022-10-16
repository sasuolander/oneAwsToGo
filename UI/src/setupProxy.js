const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            logLevel:'debug',
            pathRewrite:{
                'api':''
            },
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );
};
