import { jest } from '@jest/globals';

jest.mock('Sequelize', () => {
  return {
    Sequelize: jest.fn((connStr) => {
      expect(connStr).toEqual('tests-postgres');
      return {
        authenticate: jest.fn(),
        sync: jest.fn(({ alter, force }) => {
          expect(alter).toEqual(true);
          expect(force).toEqual(undefined);
        }),
        query: jest.fn(),
      };
    }),
  };
});

jest.unstable_mockModule('./portfolio-backend/db/postgres', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.unstable_mockModule('./split-backend/db/postgres', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

describe('DBConnection Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('DBConnection initialization', async () => {
    process.env.postgresConnStr = 'tests-postgres';
    const { default: db } = await import('./postgres.js');
    await db.init();
    await db.init();
    db.getSequelize();
    expect(db.portfolio_backend).toEqual('portfolio_backend');
    expect(db.split_backend).toEqual('split_backend');
  });
});
