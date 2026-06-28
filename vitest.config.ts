import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}', 'tests/**/*.test.ts'],
    reporters: ['default', ['json', { outputFile: './coverage/test-results.json' }]],
    coverage: {
      provider: 'v8',
      include: ['src/shared/**', 'src/entities/**', 'src/features/**'],
      reporter: ['text', 'html', 'lcov', 'json-summary'],
      reportsDirectory: './coverage',
    },
  },
});
