const gulp = require('gulp');

/* File paths */
const cfg = require('./config/config');

// -----------------------------------------------------------------------------
// MOVE PUBLIC FILES TO DIST
// -----------------------------------------------------------------------------
gulp.task('COPY', done => {
    gulp.src([
        cfg.globs.public[0],
        cfg.configs.env.config,
        cfg.entries.server.main.js,
    ]).pipe(gulp.dest(cfg.paths.dist.base));
    done();
});

// -----------------------------------------------------------------------------
// TYPEDOC
// -----------------------------------------------------------------------------
gulp.task('TYPEDOC', () =>
    gulp.src(cfg.globs.modules).pipe(
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
gulp.task('default', gulp.series('COPY'));
