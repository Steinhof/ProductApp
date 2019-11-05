const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

// Settings
const cfg = require('./config/config');
const webpackLogger = require('./config/webpackLogger');

module.exports = {
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,
        __filename: false,
    },
    mode: 'production',
    context: __dirname,
    entry: {
        server: path.resolve(__dirname, cfg.files.serverTS),
    },
    output: {
        filename: '[name].js',
        publicPath: '',
        path: path.resolve(__dirname, cfg.paths.src.base),
    },
    externals: [nodeExternals()], // Don't include node_nodules to server
    watch: true,
    stats: webpackLogger,
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    'cache-loader',
                    {
                        // Performance depends on the project [see: https://blog.johnnyreilly.com/search?updated-max=2019-01-05T20:02:00Z&max-results=1&start=14&by-date=false ]
                        loader: 'thread-loader',
                        options: {
                            // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                            workers: require('os').cpus().length - 1,
                        },
                    },
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new NodemonPlugin({
            ext: 'js, json',
            env: {
                NODE_ENV: 'development',
                // NODE_OPTIONS: '--inspect', // To run debugger
            },
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
};
