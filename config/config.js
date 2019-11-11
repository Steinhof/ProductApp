// const fs = require('fs');

// const getMainCssFile = fs.readdirSync('./src/public/css/');
// const getJsFiles = fs.readdirSync('./src/public/js/');

// Export variables
module.exports = {
    name: 'Example Project',
    paths: {
        src: {
            base: './src/',
            client: {
                base: './src/client/',
                modules: './src/client/modules/',
                styles: './src/client/styles/',
                templates: './src/client/templates/',
            },
            public: {
                base: './src/public/',
                css: './src/public/css/',
                js: './src/public/js/',
                img: './src/public/img/',
                fonts: './src/public/fonts/',
            },
        },
        dist: {
            base: './dist/',
            public: {
                base: './dist/public/',
                css: './dist/public/css/',
                js: './dist/public/js/',
                img: './dist/public/img/',
                fonts: './dist/public/fonts/',
            },
        },
        config: {
            base: './config/',
        },
        logs: {
            base: './logs',
        },
    },
    urls: {
        dev: 'http://localhost:3000/',
        proxy: 'http://localhost:3001/',
    },
    ports: {
        dev: '3000',
        proxy: '3001',
    },
    globs: {
        src: ['./src/**/*'],
        dist: ['./dist/**/*'],
        client: ['./src/client/**/*'],
        distPublic: ['./dist/public/**/*'],
        modules: ['./src/client/modules/**/*'],
        styles: ['./src/client/styles/**/*.sass'],
        css: ['./src/public/css/*.css'],
        js: ['./src/public/js/*.js'],
        img: ['./src/public/img/**/*'],
        distImg: ['./dist/public/img/**/*'],
    },
    entries: {
        html: {
            main: './dist/public/index.html',
            template: './src/client/templates/module.html',
        },
        styles: {
            main: './src/client/styles/main.sass',
        },
        modules: {
            react: {
                main: './src/client/main.tsx',
            },
            ts: {
                main: './src/client/main.ts',
            },
            wasm: {
                main: './src/client/modules/implementation/assembly/wasm.ts',
            },
            sw: {
                main: './src/client/modules/utils/serviceWorker/sw.ts',
                compiled: './dist/public/sw.js',
            },
        },
        images: {
            favicon: './src/public/img/favicon/tour-favicon.ico',
        },
        server: {
            main: {
                ts: './src/server.ts',
                js: './dist/server.js',
            },
        },
    },
    configs: {
        webpack: {
            dev: './webpack.dev.js',
            build: './webpack.build.js',
            sw: './webpack.sw.js',
            node: './webpack.node.js',
        },
        tsconfig: {
            dev: 'tsconfig.json',
        },
        env: {
            config: './src/.env',
        },
    },
};
