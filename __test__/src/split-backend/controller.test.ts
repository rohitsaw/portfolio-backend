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

const { createGroup: createGroupInDB, getGroup: getGroupInDB } = await import(
  '../../../src/split-backend/db/queries/group.js'
);

const {
  createUser: createUserInDB,
  getAllUsersInGroup: getAllUsersInGroupFromDB,
} = await import('../../../src/split-backend/db/queries/user.js');

const { encrypt, decrypt } = await import(
  '../../../src/split-backend/utils/crypto.js'
);

const { createGroup, joinGroup, createUser, getAllUsersInGroup } = await import(
  '../../../src/split-backend/controller.js'
);

describe('Testing Controllers', () => {
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

  test('joinGroup should throw error if payload in invalid', async () => {
    let req = {
      body: {},
    } as any as Request;

    await joinGroup(req, res);
    expect(getGroupInDB).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Required Field missing invite_id' })
    );
  });

  test('joinGroup should throw error if group not found', async () => {
    let req = {
      body: {
        invite_id: '123',
      },
    } as any as Request;

    (decrypt as any).mockImplementation(() => 1);
    (getGroupInDB as any).mockImplementation(() => null);
    await joinGroup(req, res);
    expect(getGroupInDB).toHaveBeenCalledWith({ group_id: 1 });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'No Group Found' })
    );
  });

  test('joinGroup should return success', async () => {
    let req = {
      body: {
        invite_id: '123',
      },
    } as any as Request;

    (decrypt as any).mockImplementation(() => 1);
    (getGroupInDB as any).mockImplementation(() => {
      return {
        id: 1,
      };
    });
    await joinGroup(req, res);
    expect(getGroupInDB).toHaveBeenCalledWith({ group_id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  test('createUser should throw error for invalid payload', async () => {
    let req = {
      body: {},
    } as any as Request;

    await createUser(req, res);
    expect(createUserInDB).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('createUser should success', async () => {
    let req = {
      body: {
        name: 'test',
        group_id: 1,
      },
    } as any as Request;

    (createUserInDB as any).mockImplementation(() => {
      return {
        id: 1,
      };
    });

    await createUser(req, res);
    expect(createUserInDB).toHaveBeenCalledWith({
      name: 'test',
      group_id: 1,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ id: 1 });
  });

  test('getAllUsersInGroup should throw error for invalid payload', async () => {
    let req = {
      body: {},
    } as any as Request;

    await getAllUsersInGroup(req, res);
    expect(getAllUsersInGroupFromDB).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('getAllUsersInGroup should return success', async () => {
    let req = {
      body: {
        group_id: 1,
      },
    } as any as Request;

    await getAllUsersInGroup(req, res);
    expect(getAllUsersInGroupFromDB).toHaveBeenCalledWith({ group_id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
});
