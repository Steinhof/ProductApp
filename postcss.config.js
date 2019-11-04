const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

module.exports = {
    plugins: [
        postcssPresetEnv({
            stage: 0,
            autoprefixer: { grid: 'autoplace' }, // Don't forget grid-rows
            features: {
                'nesting-rules': true, // Nesting selectors
            },
        }),
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
