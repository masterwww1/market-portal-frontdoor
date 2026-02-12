import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, path.resolve(__dirname), '');

  // Get backend configuration from environment variables
  // Priority: VITE_BACKEND_URL > individual components
  let backendUrl: string;
  if (env.VITE_BACKEND_URL) {
    backendUrl = env.VITE_BACKEND_URL;
  } else {
    const backendHost = env.VITE_BACKEND_HOST || 'localhost';
    const backendPort = env.VITE_BACKEND_PORT || '8210';
    const backendProtocol = env.VITE_BACKEND_PROTOCOL || 'http';
    backendUrl = `${backendProtocol}://127.0.0.1:${backendPort}`;
  }
  
  const frontendPort = parseInt(env.VITE_FRONTEND_PORT || '3000', 10);
  const useProxy = env.VITE_USE_PROXY !== 'false';

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
              target: backendUrl,
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path, // Keep /api prefix
            },
          }
        : undefined,
    },
  };
});
