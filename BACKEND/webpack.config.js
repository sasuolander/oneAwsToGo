const path = require('path');
const { NODE_ENV = 'production' } = process.env;


const vendor = [
    "@aws-sdk/client-cloudformation",
    "axios",
    "body-parser",
    "cors",
    "express",
]

//1.7MB
const srcPath = __dirname+"/src"

module.exports = {
    entry: {
        app:path.resolve(srcPath, 'index.ts')
    },
    //devtool: 'eval-cheap-module-source-map',
    mode: NODE_ENV,
    target: 'node',
    output: {
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js',
        clean:true
    },
    resolve: {
        fallback: { path: require.resolve("path-browserify"),
            'aws-crt': false,
            'better-sqlite3':false,
            'mysql':false,
            'mysql2':false,
            'oracledb':false,
            'sqlite3':false,
            'tedious':false},
        extensions: ['.ts', '.js','.json','.mjs'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
        ],
    },
    module: {
        rules: [
            {
                type: 'javascript/auto',
                test: /\.json$/, use: ['json-loader']},
            {
                test: /\.ts$/,

                use: [
                    'ts-loader',
                ],
                exclude: /node_modules/
            },
        ]
    },
}
