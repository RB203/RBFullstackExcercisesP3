import stylistic from '@stylistic/eslint-plugin-js';

export default [
    {
        ignores: ['dist/**'],
        ignores: ['node_modules/**'],
    },
    {
        files: ['**/*.js','**/*.cjs'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: {
            '@stylistic/js': stylistic,
        },
        rules: {
            '@stylistic/js/indent': ['error', 2],
            '@stylistic/js/linebreak-style': 'off',
            '@stylistic/js/quotes': ['error', 'single'],
            '@stylistic/js/semi': ['error', 'never'],
            'eqeqeq': 'error',
            'no-trailing-spaces': 'error',
            'object-curly-spacing': ['error', 'always'],
            'arrow-spacing': ['error', { 'before': true, 'after': true }],
            'no-console': 0
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'script',
        },
    },
    
];