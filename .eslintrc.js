module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "linux"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
