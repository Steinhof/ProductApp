const webpack = require('webpack');
const path = require('path');
const glob = require('glob-all');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const CriticalCssPlugin = require('critical-css-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');

// Settings
const cfg = require('./config/config');
const getPackageNameFromPath = require('./config/getPackageNameFromPath');

module.exports = {
    mode: 'production',
    context: __dirname,
    target: 'web',
    entry: {
        main: path.resolve(__dirname, cfg.entries.modules.react.main),
    },
    output: {
        filename: 'js/[name].[contenthash].js',
        publicPath: '',
        path: path.resolve(__dirname, cfg.paths.dist.public.base),
        // libraryTarget: 'commonjs2', // To make the library compatible with other environments
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css', '.sass'],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true,
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },
                ],
                include: path.resolve('src'),
            },
            {
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 3 },
                    },
                    'postcss-loader',
                    'group-css-media-queries-loader',
                    'sass-loader',
                ],
                // If 'false' any stylesheets imported in the manner above are now gone from the output.
                sideEffects: true,
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            minifyCSS: true,
                            minifyJS: true,
                            removeComments: true,
                            useShortDoctype: true,
                            collapseWhitespace: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new FixStyleOnlyEntriesPlugin(),
        new CriticalCssPlugin({
            base: cfg.paths.dist.public.base,
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
            dimensions: [
                {
                    width: 1376,
                    height: 768,
                },
                {
                    width: 375,
                    height: 667,
                },
            ],
        }),
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: cfg.entries.html.template,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        // This Webpack plugin inlines script chunks into index.html.
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/]),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[id].[contenthash].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new ScriptExtHtmlWebpackPlugin({
            // preload: 'runtime', // async, defer, type='module', preload, prefetch, module
        }),
        new PurgecssPlugin({
            paths: glob.sync([cfg.globs.dist[0], cfg.globs.src[0]], {
                nodir: true,
            }),
            trim: true,
            shorten: true,
            keyframes: true,
            fontFace: true,
        }),
    ],
    optimization: {
        runtimeChunk: true,
        usedExports: true, //  Webpack will identify any code it thinks isn’t being used
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            maxInitialRequests: Infinity,
            cacheGroups: {
                vendors: {
                    test: /\/node_modules\//,
                    name(module, chunks) {
                        const packageName = getPackageNameFromPath(
                            module.context,
                        ).replace('/', '-');
                        return `${packageName}~${chunks
                            .map(chunk => chunk.name)
                            .join('~')}`;
                    },
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                    reuseExistingChunk: true,
                },
            },
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
};
