import { jest } from '@jest/globals';

jest.mock('sequelize', () => {
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

jest.unstable_mockModule('../src/portfolio-backend/db/postgres', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.unstable_mockModule('../src/split-backend/db/postgres', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

const { default: connectToPortfolioDB } = await import(
  '../src/portfolio-backend/db/postgres.js'
);
const { default: connectToSplitDB } = await import(
  '../src/portfolio-backend/db/postgres.js'
);

describe('DBConnection Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('DBConnection initialization', async () => {
    process.env.postgresConnStr = 'tests-postgres';
    const { default: db, DBConnection } = await import('../src/postgres.js');

    const db2 = DBConnection.getInstance();

    expect(db).toEqual(db2);

    await db.init();
    await db.init();

    db.getSequelize();

    expect(db.portfolio_backend).toEqual('portfolio_backend');
    expect(db.split_backend).toEqual('split_backend');
    expect(connectToPortfolioDB).toHaveBeenCalledTimes(1);
    expect(connectToSplitDB).toHaveBeenCalledTimes(1);
  });
});
