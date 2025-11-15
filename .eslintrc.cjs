/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,

    extends: [
        "plugin:astro/recommended",
    ],

    overrides: [
        {
            files: ["**/*.astro"],
            parser: "astro-eslint-parser",
            parserOptions: {
                extraFileExtensions: [".astro"],
            },
        },
    ],
};


