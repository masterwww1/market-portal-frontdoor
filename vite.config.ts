import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, path.resolve(__dirname), '');

  // Get backend configuration from environment variables
  const backendUrl = env.VITE_BACKEND_URL || 'http://127.0.0.1:8210';
  const frontendPort = parseInt(env.VITE_FRONTEND_PORT || '3000', 10);
  const useProxy = env.VITE_USE_PROXY !== 'false';
  
  // Normalize localhost to 127.0.0.1 to force IPv4 and avoid IPv6 issues
  const normalizedBackendUrl = backendUrl.replace(/localhost/g, '127.0.0.1');

  return {
    plugins: [react()],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    server: {
      host: '0.0.0.0', // Allow access from local network
      port: frontendPort,
      proxy: useProxy
        ? {
            '/api': {
              target: normalizedBackendUrl,
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path, // Keep /api prefix
            },
          }
        : undefined,
    },
  };
});
