import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: '/',
  publicDir: 'public',
  server: {
    port: 3000,
    open: true,
    cors: true,
    host: true
  },
  // Prévisualisation de prod en HTTPS (évite les blocages caméra sur mobile)
  preview: {
    https: true,
    port: 4174,
    open: false,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`
      }
    }
  },
  optimizeDeps: {
    include: ['aframe']
  },
  // Plugin de mock API pour le développement
  plugins: [
    {
      name: 'mock-api',
      configureServer(server) {
        server.middlewares.use('/api/health', (req, res) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'ok', timestamp: Date.now() }));
        });
        
        // Endpoint de réception des rapports d'erreurs (voir src/config/settings/errors.js)
        server.middlewares.use('/api/error-report', async (req, res) => {
          try {
            let body = '';
            for await (const chunk of req) body += chunk;
            const payload = body ? JSON.parse(body) : {};
            // Vous pouvez journaliser côté serveur de dev si besoin
            // eslint-disable-next-line no-console
            console.log('[mock-api] error-report received:', payload);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ received: true }));
          } catch (e) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ received: false, error: String(e) }));
          }
        });
      }
    }
  ]
});
