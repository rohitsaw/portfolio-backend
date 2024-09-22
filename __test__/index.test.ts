import { jest } from '@jest/globals';

jest.unstable_mockModule('http', () => {
  return {
    __esModule: true,
    createServer: jest.fn(() => {
      return {
        on: jest.fn(),
        listen: jest.fn(),
      };
    }),
    Server: jest.fn(),
  };
});

jest.unstable_mockModule('express', () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return {
        use: jest.fn(),
      };
    }),
  };
});

jest.unstable_mockModule('../src/portfolio-backend/index.js', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});
jest.unstable_mockModule('../src/tic-toe-backend/index.js', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});
jest.unstable_mockModule('../src/split-backend/index.js', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});
jest.unstable_mockModule('../src/postgres.js', () => {
  return {
    __esModule: true,
    default: {
      init: jest.fn(),
    },
  };
});

describe('TEST main fn', () => {
  test('main() Fn', async () => {
    await import('../src/index.js');
  });
});
