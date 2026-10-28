import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
      '/getall': 'http://localhost:5000',
      '/create': 'http://localhost:5000',
      '/get': 'http://localhost:5000',
      '/update': 'http://localhost:5000',
      '/delete': 'http://localhost:5000',
    },
  },
});
