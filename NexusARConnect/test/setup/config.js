/**
 * Configuration des tests unitaires et d'intégration
 */

export const TEST_CONFIG = {
  // Paramètres de base
  base: {
    mode: 'unit', // 'unit', 'integration', 'e2e'
    environment: 'node', // 'node', 'jsdom', 'browser'
    watch: true,
    verbose: true,
    bail: false,
    maxWorkers: '50%',
    testTimeout: 5000,
    
    // Couverture de code
    coverageThreshold: {
      global: { branches: 80, functions: 80, lines: 80, statements: 80 }
    },
    
    // Répertoires à inclure
    roots: ['<rootDir>/src'],
    
    // Fichiers de configuration
    setupFiles: ['<rootDir>/test/setup/jest.setup.js'],
    setupFilesAfterEnv: ['<rootDir>/test/setup/jest.after.env.js'],
    
    // Extensions supportées
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
    
    // Transformations
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      '^.+\\.vue$': '@vue/vue3-jest',
      '^.+\\.(css|less|scss|sass|styl)$': 'jest-transform-css'
    },
    
    // Alias
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^@test/(.*)$': '<rootDir>/test/$1'
    },
    
    // Fichiers à ignorer
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/coverage/'],
    
    // Fichiers de couverture
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx,vue}',
      '!**/node_modules/**',
      '!**/vendor/**',
      '!**/*.d.ts',
      '!**/test/**',
      '!**/tests/**',
      '!**/__tests__/**',
      '!**/__mocks__/**'
    ]
  },
  
  // Tests unitaires
  unit: {
    testMatch: [
      '**/__tests__/unit/**/*.spec.js',
      '**/test/unit/**/*.spec.js'
    ],
    testEnvironment: 'jsdom',
    collectCoverage: true,
    coverageDirectory: '<rootDir>/coverage/unit',
    coverageReporters: ['text', 'lcov', 'clover', 'html'],
    setupFiles: [
      '<rootDir>/test/setup/jest.setup.js',
      '<rootDir>/test/setup/unit.setup.js'
    ]
  },
  
  // Tests d'intégration
  integration: {
    testMatch: [
      '**/__tests__/integration/**/*.spec.js',
      '**/test/integration/**/*.spec.js'
    ],
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: '<rootDir>/coverage/integration',
    setupFiles: [
      '<rootDir>/test/setup/jest.setup.js',
      '<rootDir>/test/setup/integration.setup.js'
    ]
  },
  
  // Tests E2E
  e2e: {
    testMatch: [
      '**/__tests__/e2e/**/*.spec.js',
      '**/test/e2e/**/*.spec.js'
    ],
    testEnvironment: 'jsdom',
    setupFiles: [
      '<rootDir>/test/setup/jest.setup.js',
      '<rootDir>/test/setup/e2e.setup.js'
    ]
  }
};

export default TEST_CONFIG;
