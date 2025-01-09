import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['/src/tests/vitest.setup.tsx', '/src/tests/setupMocks.tsx']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});