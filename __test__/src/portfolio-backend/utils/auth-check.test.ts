import { vi, describe, test, beforeEach, expect, Mock } from 'vitest';
import { NextFunction, Request, Response } from 'express';

vi.mock('../../../../src/portfolio-backend/db/queries/user.js', () => {
  return {
    getUserIdFromEmail: vi.fn(),
  };
});

const { getUserIdFromEmail } = await import('../../../../src/portfolio-backend/db/queries/user.js');
const { checkAuthenticated } = await import('../../../../src/portfolio-backend/utils/auth-check.js');

describe('checkAuthenticated function TESTS', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('return error if authentication failed', async () => {
    const req = {
      isAuthenticated: vi.fn(() => false),
    } as unknown as Request;
    let res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as any as Response;
    let next = vi.fn();
    await checkAuthenticated(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('return error if authenticated user is not valid', async () => {
    const req = {
      isAuthenticated: vi.fn(() => true),
      user: {
        emails: [],
      },
      query: {
        user_id: 'rsaw409@gmail.com',
      },
    } as unknown as Request;
    let res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as any as Response;
    let next = vi.fn();
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
      isAuthenticated: vi.fn(() => true),
      user: {
        emails: [{ value: 'rsaw409@gmail.com', verified: false }],
      },
      query: {
        user_id: '',
      },
    } as unknown as Request;
    let res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as any as Response;
    let next = vi.fn();
    await checkAuthenticated(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('return error if authenticated user is verified but id does not match with query user_id', async () => {
    const req = {
      isAuthenticated: vi.fn(() => true),
      user: {
        emails: [{ value: 'rsaw409@gmail.com', verified: true }],
      },
      query: {
        user_id: 1,
      },
    } as unknown as Request;
    let res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as any as Response;
    let next = vi.fn();
    (getUserIdFromEmail as Mock).mockImplementation(() => 2);
    await checkAuthenticated(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('return success if authenticated user is verified and id matches with query user_id', async () => {
    const req = {
      isAuthenticated: vi.fn(() => true),
      user: {
        emails: [{ value: 'rsaw409@gmail.com', verified: true }],
      },
      query: {
        user_id: 1,
      },
    } as unknown as Request;
    let res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as any as Response;
    let next = vi.fn();
    (getUserIdFromEmail as Mock).mockImplementation(() => 1);
    await checkAuthenticated(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
