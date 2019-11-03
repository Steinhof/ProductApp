const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

// Settings
const cfg = require('./config/config');

module.exports = {
    context: __dirname,
    target: 'web',
    entry: {
        sw: path.resolve(__dirname, cfg.files.sw),
    },
    mode: 'production',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, cfg.paths.public.base),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
            }),
        ],
    },
};
