import { vi, describe, test, expect, Mock } from 'vitest';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { validateUserIdInQuery } from '../../../../src/portfolio-backend/utils/validator.js';

vi.mock('express-validator', () => {
  return {
    validationResult: vi.fn(),
    query: () => ({
      exists: () => ({
        withMessage: () => ({
          isInt: () => ({
            withMessage: vi.fn(),
          }),
          isEmail: () => ({
            withMessage: () => ({
              normalizeEmail: vi.fn(),
            }),
          }),
        }),
      }),
    }),
    body: () => ({
      exists: () => ({
        notEmpty: () => ({}),
        withMessage: () => ({
          isInt: () => ({
            withMessage: vi.fn(),
          }),
          isEmail: () => ({
            withMessage: () => ({
              normalizeEmail: vi.fn(),
            }),
          }),
          notEmpty: () => ({}),
        }),
      }),
    }),
  };
});

describe('TEST validator', () => {
  test('Success if validation pass', () => {
    (validationResult as unknown as Mock).mockImplementation(() => {
      return {
        isEmpty: () => true,
      };
    });
    const req = {} as Request;
    const res = {} as Response;
    const next = vi.fn();
    validateUserIdInQuery[1](req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('Return Error if validation fails', () => {
    (validationResult as unknown as Mock).mockImplementation(() => {
      return {
        isEmpty: () => false,
        array: () => [
          { type: 'field', msg: 'test', path: 'test', location: 'test' },
        ],
      };
    });
    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as any as Response;
    const next = vi.fn();
    validateUserIdInQuery[1](req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: expect.any(Array),
      })
    );
  });
});
