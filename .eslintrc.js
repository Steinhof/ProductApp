module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2018,
        // project: path.resolve(__dirname, './tsconfig.json'),
        tsconfigRootDir: __dirname,
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    plugins: [
        '@typescript-eslint',
        'react',
        'jsx-a11y',
        'react-hooks'
        // 'prettier' commented as i don't want to run prettier through eslint because performance
    ],
    env: {
        // These environments are not mutually exclusive, so you can define more than one at a time.
        browser: true,
        node: true,
        'shared-node-browser': true,
        es6: true,
        es2017: true,
        es2020: true,
        worker: true,
        serviceworker: true,
        mongo: true,
        jest: true,
    },
    globals: {
        // Jest Puppeteer, [see https://github.com/smooth-code/jest-puppeteer/blob/v4.0.0/README.md#configure-eslint]
        page: true
    },
    extends: [
        "eslint:recommended",
        'plugin:react/recommended',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
        "prettier",
        'prettier/react'
    ],
    rules: {
        // "typescript/no-var-requires": "off", //Disable require imports
        'import/no-unresolved': 'off',
        // 'no-cycle': [2, { maxDepth: 1 }], // Works wrong with express
        'prettier/prettier': [
            'error',
            {
                'singleQuote': true,
                'trailingComma': 'all',
                'tabWidth': 4,
            }
        ],
        // These rules don't add much value, are better covered by TypeScript and good definition files
        'react/no-direct-mutation-state': 'off',
        'react/no-deprecated': 'off',
        'react/no-string-refs': 'off',
        'react/require-render-return': 'off',
        'react/jsx-filename-extension': [
            'warn',
            {
                extensions: ['.jsx', '.tsx']
            }
        ], // also want to use with ".tsx"
    },
    settings: {
        'import/extensions': [".js",".jsx",".ts",".tsx"],
        'import/parsers': {
            '@typescript-eslint/parser': [".ts",".tsx"]
        },
        'import/resolver': {
            'node': {
                'extensions': [".js",".jsx",".ts",".tsx"]
            }
        },
        react: {
            version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    }
};
