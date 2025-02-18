import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint({ cache: false }), react()],
  preview: {
    port: 5173,
    strictPort: true,
   },
});
