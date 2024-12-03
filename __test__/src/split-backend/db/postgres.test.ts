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

jest.unstable_mockModule('../../../../src/@rsaw409/logger.js', () => {
  return {
    __esModule: true,
    default: {
      error: jest.fn(),
      info: jest.fn(),
    },
  };
});

jest.unstable_mockModule(
  '../../../../src/split-backend/db/models/group.js',
  () => {
    return {
      __esModule: true,
      default: jest.fn(),
    };
  }
);
jest.unstable_mockModule(
  '../../../../src/split-backend/db/models/user.js',
  () => {
    return {
      __esModule: true,
      default: jest.fn(),
    };
  }
);
jest.unstable_mockModule(
  '../../../../src/split-backend/db/models/transaction.js',
  () => {
    return {
      __esModule: true,
      default: jest.fn(),
    };
  }
);
jest.unstable_mockModule(
  '../../../../src/split-backend/db/models/transactionPart.js',
  () => {
    return {
      __esModule: true,
      default: jest.fn(),
    };
  }
);

const { default: initializeSplitDB } = await import(
  '../../../../src/split-backend/db/postgres.js'
);

const { Sequelize } = await import('sequelize');

const { default: createGroupModel } = await import(
  '../../../../src/split-backend/db/models/group.js'
);
const { default: createUserModel } = await import(
  '../../../../src/split-backend/db/models/group.js'
);
const { default: createTransactionModel } = await import(
  '../../../../src/split-backend/db/models/group.js'
);
const { default: createTransactionPartModel } = await import(
  '../../../../src/split-backend/db/models/group.js'
);

describe('TEST SplitDB initialization', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('Should init initializeSplitDB', async () => {
    const ss = new Sequelize('tests-postgres');
    const schemaName = 'test-schema';
    await initializeSplitDB(ss, schemaName);
    expect(createGroupModel).toHaveBeenCalledWith(ss, schemaName);
    expect(createUserModel).toHaveBeenCalledWith(ss, schemaName);
    expect(createTransactionModel).toHaveBeenCalledWith(ss, schemaName);
    expect(createTransactionPartModel).toHaveBeenCalledWith(ss, schemaName);
  });

  test('Should log error in initializeSplitDB', async () => {
    (
      createTransactionModel as jest.Mocked<typeof createTransactionModel>
    ).mockImplementation(() => {
      throw new Error('Error in creating model');
    });

    const ss = new Sequelize('tests-postgres');
    const schemaName = 'test-schema';
    await initializeSplitDB(ss, schemaName);
  });
});
