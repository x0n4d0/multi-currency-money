module.exports = {
  // roots: ['<rootDir>/test'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!**/test/**',
    '!**/config/**',
    '!**/**/index.ts',
    '!<rootDir>/src/shared/*.ts',
  ],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/test/(.*)$': '<rootDir>/test/$1',
    '@/(.*)$': '<rootDir>/src/$1',
  },
  // setupFiles: ['dotenv/config'],
};