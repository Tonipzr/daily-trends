export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  setupFiles: ['./tests/setupTests.ts'],
}
