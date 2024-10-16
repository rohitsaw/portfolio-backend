import { jest } from '@jest/globals';
import { NextFunction, Request, Response } from 'express';

jest.unstable_mockModule(
  '../../../../src/portfolio-backend/db/queries/user.js',
  () => {
    return {
      getUserIdFromEmail: jest.fn(),
    };
  }
);

const { getUserIdFromEmail } = await import(
  '../../../../src/portfolio-backend/db/queries/user.js'
);

const { checkAuthenticated } = await import(
  '../../../../src/portfolio-backend/utils/auth-check.js'
);

describe('checkAuthenticated function TESTS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('return error if authentication failed', async () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    } as unknown as Request;
    let res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any as Response;
    let next = jest.fn();

    await checkAuthenticated(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('return error if authenticated user is not valid', async () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
      user: {
        emails: [],
      },
      query: {
        user_id: 'rsaw409@gmail.com',
      },
    } as unknown as Request;
    let res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any as Response;
    let next = jest.fn();

    await checkAuthenticated(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Could not identify you as authorized user.',
      })
    );
  });

  test('return error if authenticated user is not verified', async () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
      user: {
        emails: [{ value: 'rsaw409@gmail.com', verified: false }],
      },
      query: {
        user_id: '',
      },
    } as unknown as Request;
    let res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any as Response;
    let next = jest.fn();

    await checkAuthenticated(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('return error if authenticated user is verified but id does not match with query user_id', async () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
      user: {
        emails: [{ value: 'rsaw409@gmail.com', verified: true }],
      },
      query: {
        user_id: 1,
      },
    } as unknown as Request;

    let res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any as Response;

    let next = jest.fn();

    (getUserIdFromEmail as unknown as jest.Mock).mockImplementation(() => 2);

    await checkAuthenticated(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('return error if authenticated user is verified but id does not match with query user_id', async () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
      user: {
        emails: [{ value: 'rsaw409@gmail.com', verified: true }],
      },
      query: {
        user_id: 1,
      },
    } as unknown as Request;

    let res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any as Response;

    let next = jest.fn();

    (getUserIdFromEmail as unknown as jest.Mock).mockImplementation(() => 1);

    await checkAuthenticated(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
