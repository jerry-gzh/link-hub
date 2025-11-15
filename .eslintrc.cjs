module.exports = {
    root: true,
    env: { browser: true, es2021: true },
    extends: [
        "eslint:recommended",
        "plugin:astro/recommended",
        "plugin:jsx-a11y/recommended"
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    overrides: [
        {
            files: ["**/*.astro"],
            parser: "astro-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
                extraFileExtensions: [".astro"]
            }
        }
    ]
};