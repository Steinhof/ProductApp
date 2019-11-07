const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

// Settings
const cfg = require('./config/config');

const tsRegex = /\.ts$/;
const dtsRegex = /\.d.ts$/;

module.exports = {
    context: __dirname,
    target: 'web',
    entry: {
        sw: path.resolve(__dirname, cfg.entries.modules.sw.main),
    },
    mode: 'production',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, cfg.paths.dist.public.base),
    },
    module: {
        rules: [
            {
                test: tsRegex,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
            {
                test: dtsRegex,
                loader: 'ignore-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.ts', '.d.ts'],
    },
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
