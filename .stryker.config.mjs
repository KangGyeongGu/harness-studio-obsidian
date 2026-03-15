// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  testRunner: 'vitest',
  vitest: {
    configFile: 'vitest.config.ts',
  },
  mutate: [
    'src/**/*.ts',
    '!src/main.ts',
    '!src/**/*.d.ts',
  ],
  thresholds: {
    high: 80,
    low: 60,
    break: 50,
  },
  reporters: ['html', 'json', 'progress'],
  htmlReporter: {
    fileName: '.claude/reports/mutation-report.html',
  },
  jsonReporter: {
    fileName: '.claude/reports/mutation-report.json',
  },
  coverageAnalysis: 'perTest',
  timeoutMS: 10000,
  timeoutFactor: 1.5,
  concurrency: 4,
  ignorePatterns: [
    'node_modules',
    '.claude',
    'dist',
  ],
};

export default config;
