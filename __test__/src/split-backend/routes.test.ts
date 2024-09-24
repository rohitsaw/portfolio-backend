import { jest } from '@jest/globals';
import request from 'supertest';
import express, { Request, Response } from 'express';

jest.unstable_mockModule('../../../src/split-backend/controller.js', () => {
  return {
    __esModule: true,
    joinGroup: jest.fn(),
    createGroup: jest.fn(),
    createUser: jest.fn(),
    saveTransaction: jest.fn(),
    savePayment: jest.fn(),
    getAllUsersInGroup: jest.fn(),
    getAllTransactionInGroup: jest.fn(),
    getOverviewDataInGroup: jest.fn(),
    savePayments: jest.fn(),
  };
});

const { getAllUsersInGroup } = await import(
  '../../../src/split-backend/controller.js'
);

const { addRoutes } = await import('../../../src/split-backend/routes.js');

describe('TEST portfolio routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should call all middleware', async () => {
    (
      getAllUsersInGroup as jest.Mocked<typeof getAllUsersInGroup>
    ).mockImplementation(async (_req: Request, res: Response) => {
      return res.status(200).send([]);
    });

    const app = express();
    addRoutes(app);

    const response = await request(app).post('/getAllUsersInGroup');

    expect(getAllUsersInGroup).toHaveBeenCalled();
    expect(response.status).toBe(200);
  });
});
