module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
    jest: false,
  },
  globals: {
    AFRAME: 'readonly',
    THREE: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:playwright/recommended',
    'plugin:eslint-comments/recommended',
    'prettier',
  ],
  plugins: ['eslint-comments', 'playwright'],
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'eslint-comments/no-unused-disable': 'warn',
  },
  overrides: [
    {
      files: ['tests/**/*.js', 'test/**/*.js'],
      env: { node: true, jest: true },
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['vite.config.js', 'playwright.config.js'],
      env: { node: true },
    },
    {
      files: ['sw.js', 'sw-config.js', 'src/utils/service-worker.js'],
      env: { worker: true, serviceworker: true },
      globals: {
        clients: 'readonly',
        self: 'readonly',
      },
      rules: {
        // Service worker logs are often useful during development
        'no-console': 'off',
      },
    },
  ],
};
