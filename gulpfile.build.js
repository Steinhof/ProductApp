const gulp = require('gulp');
const del = require('del');
const typedoc = require('gulp-typedoc');
const imagemin = require('gulp-imagemin');
const webpack = require('webpack');
const SWInjectFiles = require('./config/SWInjectFiles');

/* File paths */
const cfg = require('./config/config');

/* Webpack error handler */
const webpackErrorHandler = require('./config/webpackErrorHandler');

// -----------------------------------------------------------------------------
// DELETE OLD FILES
// -----------------------------------------------------------------------------
gulp.task('CLEAN', done => {
    del([cfg.globs.distCSS[0], cfg.globs.distJS[0]]);
    done();
});

// -----------------------------------------------------------------------------
// NODE WEBPACK SERVER
// -----------------------------------------------------------------------------
gulp.task('START-SERVER', done => {
    webpack(require(cfg.configs.webpack.node), webpackErrorHandler);
    done();
});

// -----------------------------------------------------------------------------
// WEBPACK
// -----------------------------------------------------------------------------
gulp.task('WEBPACK', done => {
    webpack(require(cfg.configs.webpack.build), webpackErrorHandler);
    done();
});

// -----------------------------------------------------------------------------
// SERVICE WORKER
// -----------------------------------------------------------------------------
gulp.task('SW', done => {
    webpack(require(cfg.configs.webpack.sw), webpackErrorHandler);
    done();
});

// -----------------------------------------------------------------------------
// INJECT CACHE FILES TO SW
// -----------------------------------------------------------------------------
gulp.task('SWFILES', done => {
    function timeOut() {
        const fillSW = new SWInjectFiles('./src/public/sw.js', {
            ignorePath: './src/public',
        });

        fillSW.writeStaticFiles([
            './src/public/img/**/*',
            './src/public/js/*',
            './src/public/css/*',
            './src/public/index.html',
        ]);
    }
    setTimeout(() => timeOut(), 3000);

    done();
});

// -----------------------------------------------------------------------------
// IMAGE COMPRESSION
// -----------------------------------------------------------------------------
gulp.task('IMAGEMIN', () =>
    gulp
        .src(cfg.paths.public.img)
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
                }),
            ]),
        )
        .pipe(gulp.dest(cfg.paths.public.img)),
);

// -----------------------------------------------------------------------------
// TYPEDOC
// -----------------------------------------------------------------------------
gulp.task('TYPEDOC', () =>
    gulp.src(cfg.globs.distModules).pipe(
        typedoc({
            module: 'commonjs',
            exclude: '/node_modules/',
            target: 'es5',
            includeDeclarations: true,
            ignoreCompilerErrors: true,
            experimentalDecorators: true,
            excludeExternals: true,
            version: true,
            out: './',
            name: 'My project',
        }),
    ),
);

// -----------------------------------------------------------------------------
// GULP START
// -----------------------------------------------------------------------------
gulp.task(
    'default',
    gulp.series(
        'CLEAN',
        'SW',
        'IMAGEMIN',
        'START-SERVER',
        'WEBPACK',
        'SWFILES',
    ),
);
