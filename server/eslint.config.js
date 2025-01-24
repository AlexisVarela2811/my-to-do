import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
            },
            globals: {
                process: 'readonly',
                console: 'readonly',
            },
        },
        rules: {
            "no-console": "warn",
            "no-unused-vars": "warn",
            "no-undef": "error",
            "eqeqeq": "error",
            "curly": "error",
            "prefer-const": "error",
            "no-var": "error",
            "consistent-return": "error",
            "prefer-arrow-callback": "error",
            "no-implicit-globals": "error",
            "array-callback-return": "error",
            "no-magic-numbers": "warn"
        }
    }
];