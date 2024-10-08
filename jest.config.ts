// jest.config.ts
import { createDefaultEsmPreset, type JestConfigWithTsJest } from 'ts-jest';

const defaultEsmPreset = createDefaultEsmPreset();

const jestConfig: JestConfigWithTsJest = {
  ...defaultEsmPreset,
  transformIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: ['<rootDir>/__test__/**/*.(test).ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,js,tsx}', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

export default jestConfig;
