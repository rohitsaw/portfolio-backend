import { jest } from '@jest/globals';
import { Request, Response } from 'express';

jest.unstable_mockModule(
  '../../../src/split-backend/db/queries/group.js',
  () => {
    return {
      createGroup: jest.fn(),
      getGroup: jest.fn(),
      getOverviewDataInGroup: jest.fn(),
    };
  }
);

jest.unstable_mockModule(
  '../../../src/split-backend/db/queries/user.js',
  () => {
    return {
      createUser: jest.fn(),
      getAllUsersInGroup: jest.fn(),
    };
  }
);

jest.unstable_mockModule(
  '../../../src/split-backend/db/queries/transaction.js',
  () => {
    return {
      saveTransaction: jest.fn(),
      savePayment: jest.fn(),
      savePayments: jest.fn(),
      getAllTransactionInGroup: jest.fn(),
    };
  }
);

jest.unstable_mockModule('../../../src/split-backend/utils/crypto.js', () => {
  return {
    encrypt: jest.fn(),
    decrypt: jest.fn(),
  };
});

jest.unstable_mockModule(
  '../../../src/split-backend/utils/send_notification.js',
  () => {
    return {
      send_push_notification: jest.fn(),
    };
  }
);

const { createGroup: createGroupInDB } = await import(
  '../../../src/split-backend/db/queries/group.js'
);
const { encrypt } = await import('../../../src/split-backend/utils/crypto.js');

const { createGroup } = await import(
  '../../../src/split-backend/controller.js'
);

describe('Testing Group Controllers', () => {
  let res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as any as Response;

  beforeEach(() => {
    jest.resetAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any as Response;
  });

  test('createGroup should throw error if name is not in payload', async () => {
    let req = {
      body: {},
    } as any as Request;

    await createGroup(req, res);
    expect(createGroupInDB).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Required Field missing name' })
    );
  });

  test('createGroup should create group', async () => {
    let req = {
      body: {
        name: 'test-group',
      },
    } as any as Request;

    (createGroupInDB as any).mockImplementation(() => {
      return {
        id: 1,
        dataValues: {},
      };
    });
    await createGroup(req, res);

    expect(createGroupInDB).toHaveBeenCalledWith({ name: 'test-group' });
    expect(encrypt).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
});
