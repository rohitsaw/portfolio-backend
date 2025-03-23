import { jest } from '@jest/globals';
import { Request, Response } from 'express';

jest.unstable_mockModule('../../../src/@rsaw409/logger.js', () => {
  return {
    __esModule: true,
    default: {
      error: jest.fn(),
      info: jest.fn(),
    },
  };
});

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

jest.unstable_mockModule('../../../src/@rsaw409/crypto.js', () => {
  return {
    __esModule: true,
    default: {
      encrypt: jest.fn(),
      decrypt: jest.fn(),
    },
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

const {
  createGroup: createGroupInDB,
  getGroup: getGroupInDB,
  getOverviewDataInGroup: getOverviewDataInGroupFromDb,
} = await import('../../../src/split-backend/db/queries/group.js');

const {
  createUser: createUserInDB,
  getAllUsersInGroup: getAllUsersInGroupFromDB,
} = await import('../../../src/split-backend/db/queries/user.js');

const {
  getAllTransactionInGroup: getAllTransactionInGroupFromDB,
  savePayment: savePaymentInDB,
  savePayments: savePaymentsInDB,
  saveTransaction: saveTransactionInDB,
} = await import('../../../src/split-backend/db/queries/transaction.js');

const { default: crypto } = await import('../../../src/@rsaw409/crypto.js');

const { send_push_notification } = await import(
  '../../../src/split-backend/utils/send_notification.js'
);

const {
  createGroup,
  joinGroup,
  createUser,
  getAllUsersInGroup,
  getAllTransactionInGroup,
  getOverviewDataInGroup,
  savePayment,
  savePayments,
  saveTransaction,
} = await import('../../../src/split-backend/controller.js');

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
    expect(crypto.encrypt).toHaveBeenCalled();
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

    (crypto.decrypt as any).mockImplementation(() => 1);
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

    (crypto.decrypt as any).mockImplementation(() => 1);
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

  test('getAllTransactionInGroup should return success', async () => {
    let req = {
      body: {
        group_id: 1,
      },
    } as any as Request;

    await getAllTransactionInGroup(req, res);
    expect(getAllTransactionInGroupFromDB).toHaveBeenCalledWith({
      group_id: 1,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  test('getAllTransactionInGroup should return error if payload is incorrect', async () => {
    let req = {
      body: {},
    } as any as Request;

    await getAllTransactionInGroup(req, res);
    expect(getAllTransactionInGroupFromDB).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('getOverviewDataInGroup should return success', async () => {
    let req = {
      body: {
        group_id: 1,
      },
    } as any as Request;

    await getOverviewDataInGroup(req, res);
    expect(getOverviewDataInGroupFromDb).toHaveBeenCalledWith({
      group_id: 1,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  test('getOverviewDataInGroup should return error if payload is incorrect', async () => {
    let req = {
      body: {},
    } as any as Request;

    await getOverviewDataInGroup(req, res);
    expect(getOverviewDataInGroupFromDb).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('savePayment should return error if payload is incorrect', async () => {
    let req = {
      body: {},
    } as any as Request;

    await savePayment(req, res);
    expect(savePaymentInDB).not.toHaveBeenCalled();
    expect(send_push_notification).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('savePayment should return success', async () => {
    let req = {
      body: { from: '1', to: '1', amount: 100 },
    } as any as Request;

    await savePayment(req, res);
    expect(savePaymentInDB).toHaveBeenCalledWith({
      from: '1',
      to: '1',
      amount: 100,
    });
    expect(send_push_notification).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  test('savePayments should return error if req.body has incorrect schema in array', async () => {
    let req = {
      body: [{}],
    } as any as Request;

    await savePayments(req, res);
    expect(savePaymentsInDB).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('savePayments should return error if req.body is empty array', async () => {
    let req = {
      body: [],
    } as any as Request;

    await savePayments(req, res);
    expect(savePaymentsInDB).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('savePayments should return success', async () => {
    let req = {
      body: [{ from: '1', to: '2', amount: 100 }],
    } as any as Request;

    await savePayments(req, res);
    expect(savePaymentsInDB).toHaveBeenCalledWith([
      {
        from: '1',
        to: '2',
        amount: 100,
      },
    ]);
    expect(send_push_notification).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  test('saveTransaction should return error if payload is incorrect', async () => {
    let req = {
      body: {
        by: '1',
        title: 'test',
      },
    } as any as Request;

    await saveTransaction(req, res);
    expect(saveTransactionInDB).not.toHaveBeenCalled();
    expect(send_push_notification).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('saveTransaction should return error if transactionPart in incorrect in body', async () => {
    let req = {
      body: {
        by: '1',
        title: 'test',
        totalAmount: 100,
        transactionParts: [{ user_id: 1 }, { user_id: 2, amount: 80 }],
      },
    } as any as Request;

    await saveTransaction(req, res);
    expect(saveTransactionInDB).not.toHaveBeenCalled();
    expect(send_push_notification).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('saveTransaction should return error if transactionPart does not sum as totalAmount', async () => {
    let req = {
      body: {
        by: '1',
        title: 'test',
        totalAmount: 100,
        transactionParts: [
          { user_id: 1, amount: 90 },
          { user_id: 2, amount: 80 },
        ],
      },
    } as any as Request;

    await saveTransaction(req, res);
    expect(saveTransactionInDB).not.toHaveBeenCalled();
    expect(send_push_notification).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('saveTransaction should return success', async () => {
    let req = {
      body: {
        by: '1',
        title: 'test',
        totalAmount: 100,
        transactionParts: [
          { user_id: 1, amount: 20 },
          { user_id: 2, amount: 80 },
        ],
      },
    } as any as Request;

    await saveTransaction(req, res);
    expect(saveTransactionInDB).toHaveBeenCalled();
    expect(send_push_notification).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
});
