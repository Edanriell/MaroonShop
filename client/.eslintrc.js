const ALLOWED_PATH_GROUPS = [
  "pages/**",
  "widgets/**",
  "features/**",
  "entities/**",
  "shared/**",
].map((pattern) => ({
  pattern,
  group: "internal",
  position: "after",
}));

const DENIED_PATH_GROUPS = [
  "app/**",
  "pages/*/**",
  "widgets/*/**",
  "features/*/**",
  "entities/*/**",
  "shared/*/*/**",
  "../**/app",
  "../**/pages",
  "../**/widgets",
  "../**/features",
  "../**/entities",
  "../**/shared",
];

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    sourceType: "module",
  },
  env: {
    browser: true,
    es6: true,
  },
  plugins: ["react", "@typescript-eslint", "unicorn"],
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  rules: {
    "import/first": 2,
    "import/no-unresolved": 0,
    "import/order": [
      2,
      {
        pathGroups: ALLOWED_PATH_GROUPS,
        pathGroupsExcludedImportTypes: ["builtin"],
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],
    "no-restricted-imports": [2, { patterns: DENIED_PATH_GROUPS }],
    "prefer-const": 2,
    "no-var": 2,
    camelcase: [
      1,
      { ignoreDestructuring: true, ignoreImports: true, properties: "never" },
    ],
    "no-else-return": 2,
    "max-len": [1, { code: 120 }],
    "dot-notation": 2,
    "eol-last": 2,
    "no-alert": 2,
    "no-console": 2,
    eqeqeq: 1,
    "no-eq-null": 2,
    "max-params": [1, 2],
    "max-lines-per-function": [1, 48],
    "arrow-parens": [2, "always"],
    "unicorn/no-for-loop": 2,
    "unicorn/no-abusive-eslint-disable": 2,
    "unicorn/no-array-instanceof": 2,
    "unicorn/no-zero-fractions": 2,
    "unicorn/prefer-includes": 2,
    "unicorn/prefer-text-content": 2,
    "unicorn/import-index": 2,
    "unicorn/throw-new-error": 2,
    "react/jsx-uses-react": 0,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "no-restricted-globals": 1,
  },
  overrides: [],
};
