import { jest } from '@jest/globals';

jest.mock('sequelize', () => {
  return {
    Sequelize: jest.fn((connStr) => {
      expect(connStr).toEqual('tests-postgres');
      return {
        define: jest.fn(),
        authenticate: jest.fn(),
        sync: jest.fn(({ alter, force }) => {
          expect(alter).toEqual(true);
          expect(force).toEqual(undefined);
        }),
        query: jest.fn(),
      };
    }),
    DataTypes: { INTEGER: 'INTEGER', STRING: 'STRING', ARRAY: () => {} },
  };
});

const { Sequelize } = await import('sequelize');

const { default: createGroupModel } = await import(
  '../../../../../src/split-backend/db/models/group.js'
);
const { default: createUserModel } = await import(
  '../../../../../src/split-backend/db/models/user.js'
);
const { default: createTransactionModel } = await import(
  '../../../../../src/split-backend/db/models/transaction.js'
);
const { default: createTransactionPartModel } = await import(
  '../../../../../src/split-backend/db/models/transactionPart.js'
);

describe('TEST models init', () => {
  test('tests portfolio db models init', () => {
    const ss = new Sequelize('tests-postgres');
    const schemaName = 'tests-schemaname';

    createGroupModel(ss, schemaName);
    createUserModel(ss, schemaName);
    createTransactionModel(ss, schemaName);
    createTransactionPartModel(ss, schemaName);

    expect(ss.define).toHaveBeenCalledTimes(4);
  });
});
