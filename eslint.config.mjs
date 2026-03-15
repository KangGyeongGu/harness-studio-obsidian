// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import vitest from '@vitest/eslint-plugin';

export default tseslint.config(
  js.configs.recommended,
  // Type-checked rules — TypeScript source files only
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Test files — vitest rules
  {
    files: ['tests/**/*.ts'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/expect-expect': 'error',
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-focused-tests': 'error',
    },
  },
  // Global ignores
  {
    ignores: [
      'node_modules/',
      'main.js',
      'main.js.map',
      'coverage/',
      '.stryker-tmp/',
    ],
  }
);
