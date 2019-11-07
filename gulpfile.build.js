const gulp = require('gulp');
const del = require('del');
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
    del([`${cfg.paths.dist.public.css}*`, `${cfg.paths.dist.public.js}*`]);
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
    // To make sure that sw assets included after webpack main compilation

    function injectionTimer() {
        const fillSW = new SWInjectFiles(cfg.entries.modules.sw.compiled, {
            ignorePath: './dist/public',
        });

        fillSW.writeStaticFiles([
            './dist/public/img/**/*',
            './dist/public/css/*',
            './dist/public/js/!(runtime*)', // Match any js files except runtime chunk, because it already included  in index.html
            './dist/public/index.html',
        ]);
    }

    setTimeout(() => injectionTimer(), 25000);

    done();
});

// -----------------------------------------------------------------------------
// IMAGE COMPRESSION
// -----------------------------------------------------------------------------
gulp.task('IMAGEMIN', () =>
    gulp
        .src(cfg.globs.distImg)
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
        .pipe(gulp.dest(cfg.paths.dist.public.img)),
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
