const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const plugin = require('postcss-flexbugs-fixes');

module.exports = {
    plugins: [
        postcssPresetEnv({
            stage: 0,
            autoprefixer: { grid: 'autoplace' }, // Don't forget grid-rows
            features: {
                'nesting-rules': true, // Nesting selectors
            },
        }),
        plugin('postcss-flexbugs-fixes'),
        cssnano({
            preset: [
                'advanced',
                {
                    discardComments: {
                        removeAll: true,
                    },
                },
            ],
        }),
    ],
};
