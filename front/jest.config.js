// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  preset: "ts-jest", // ✅ Good for TypeScript
  testEnvironment: "jest-environment-jsdom", // ✅ Needed for React
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // ✅ For custom mocks
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest" // ✅ TS transformer
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1" // ✅ Alias resolution
  }
};

module.exports = createJestConfig(customJestConfig);

