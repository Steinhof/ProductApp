module.exports = api => {
    api.cache(true);
    const presets = [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
                loose: true,
                modules: false, // Ensure no compilers transform your ES2015 module syntax into CommonJS
            },
        ],
        [
            '@babel/preset-typescript',
            {
                isTSX: true,
                allowNamespaces: true,
                allExtensions: true,
            },
        ],
        '@babel/preset-react',
    ];
    const plugins = [];

    return {
        presets,
        plugins,
    };
};
