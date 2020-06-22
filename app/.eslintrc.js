module.exports = {
    env: {
        es6: true,
        node: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'prettier',
        'eslint-config-prettier',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', 'prettier'],
    rules: {
        quotes: ['error', 'single', { avoidEscape: true }],
        semi: ['error', 'always'],
        'no-empty-function': 'off',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'prettier/prettier': 'error',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
