// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Configuration de Playwright pour les tests E2E
 */
module.exports = defineConfig({
    // Dossier de test
    testDir: './tests/e2e',

    // Dossier de sortie des résultats
    outputDir: './test-results',

    // Dossier de stockage des artefacts de test (utiliser outputDir par défaut)

    // Configuration du timeout global
    timeout: 30 * 1000,
    expect: {
        timeout: 5000,
        toHaveScreenshot: { maxDiffPixelRatio: 0.01 },
        toMatchSnapshot: { threshold: 0.1 },
    },

    // Configuration de la capture d'écran et des traces gérées dans use

    // Configuration des workers
    workers: process.env.CI ? 2 : 4,

    // Configuration des rapports
    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['junit', { outputFile: 'test-results/results.xml' }]
    ],

    // Configuration des projets (navigateurs)
    projects: [
        // Configuration pour Chrome
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        // Configuration pour Firefox
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        // Configuration pour WebKit (Safari)
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },

        // Configuration pour les appareils mobiles
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },

        // Configuration pour les tests d'accessibilité
        {
            name: 'accessibility',
            testMatch: '**/accessibility/**',
            use: {
                ...devices['Desktop Chrome'],
                contextOptions: {
                    reducedMotion: 'reduce',
                    colorScheme: 'dark',
                },
            },
        },
    ],

    // Configuration du serveur web
    webServer: {
        command: 'npm run dev',
        port: 3000,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },

    // Configuration des viewports
    use: {
        // Taille de la fenêtre par défaut
        viewport: { width: 1280, height: 720 },

        // Délai d'attente par défaut
        actionTimeout: 10000,

        // Ignorer les erreurs HTTPS
        ignoreHTTPSErrors: true,

        // Capturer la vidéo des tests
        video: 'on-first-retry',

        // Capturer les traces
        trace: 'retain-on-failure',

        // Capturer les captures d'écran
        screenshot: 'only-on-failure',

        // Configuration du contexte
        contextOptions: {
            ignoreHTTPSErrors: true,
            javaScriptEnabled: true,
            acceptDownloads: true,
            hasTouch: false,
            isMobile: false,
        },

        // Configuration du navigateur
        launchOptions: {
            slowMo: 0,
            headless: !process.env.HEADLESS,
            devtools: process.env.DEBUG === 'true',
            args: [
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process',
                '--disable-site-isolation-trials',
            ],
        },

        // Configuration des requêtes réseau
        baseURL: process.env.BASE_URL || 'http://localhost:3000',
    },

    // Configuration des hooks globaux
    globalSetup: './test/setup/global.setup.js',
    globalTeardown: './test/teardown/global.teardown.js',

    // Configuration des hooks de test
    testMatch: '**/*.spec.js',
    testIgnore: '**/node_modules/**',
});
