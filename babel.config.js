module.exports = api => {
    api.cache(true);
    const presets = [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
                loose: true,
                modules: false,
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
