const webpack = require('webpack');
const sass = require('sass');
const path = require('path');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const Fibers = require('fibers');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const CriticalCssPlugin = require('critical-css-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');

// Settings
const cfg = require('./config/config');
const getPackageNameFromPath = require('./config/getPackageNameFromPath');

// Webpack parameters
const sassRegex = /\.sass$/;
const sassModuleRegex = /\.module\.sass$/;

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
                use: ['babel-loader'],
                include: path.resolve('src'),
            },
            {
                test: sassRegex,
                exclude: sassModuleRegex,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 2 },
                    },
                    'postcss-loader',
                    'group-css-media-queries-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                implementation: sass,
                                fiber: Fibers,
                                indentedSyntax: true,
                            },
                        },
                    },
                ],
                // If 'false' any stylesheets imported in the manner above are now gone from the output.
                sideEffects: true,
            },
            {
                test: sassModuleRegex,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 2, modules: true },
                    },
                    'postcss-loader',
                    'group-css-media-queries-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                implementation: sass,
                                fiber: Fibers,
                                indentedSyntax: true,
                            },
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
        new PurgecssPlugin({
            paths: glob.sync(cfg.globs.src[0], { nodir: true }),
            trim: true,
            shorten: true,
            keyframes: true,
            fontFace: true,
        }),
        new ScriptExtHtmlWebpackPlugin({
            // preload: 'runtime', // async, defer, type='module', preload, prefetch, module
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
