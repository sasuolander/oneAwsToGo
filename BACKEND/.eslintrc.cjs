module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    ignorePatterns: ["/build"],
    root: true,
    env: {
        node: true,
        jest: true,
        browser: true
      },
    "rules": {
        "@typescript-eslint/ban-ts-comment": "off",
        '@typescript-eslint/no-var-requires': 0,
        "@typescript-eslint/no-empty-function": "off"
      }
};
