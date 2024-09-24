import { jest } from '@jest/globals';

const fn = () => {
  return {
    exists: jest.fn(() => fn()),
    withMessage: jest.fn(() => fn()),
    isInt: jest.fn(() => fn()),
    isEmail: jest.fn(() => fn()),
    notEmpty: jest.fn(() => fn()),
  };
};

jest.mock('express-validator', () => {
  return {
    body: fn,
    query: fn,
    validationResult: jest.fn(),
  };
});

const { validateUserIdInQuery } = await import(
  '../../../../src/portfolio-backend/utils/validator.js'
);

describe('TEST errorHandler', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('errorHandler should call next fn', async () => {
    const { validationResult } = await import('express-validator');
    (validationResult as unknown as jest.Mocked<() => {}>).mockImplementation(
      () => {
        return {
          isEmpty: jest.fn(() => {
            return true;
          }),
          array: jest.fn(() => []),
        };
      }
    );

    const errorhandler = validateUserIdInQuery[1];
    const req = {} as jest.Mocked<Request>;
    const res = {} as jest.Mocked<Response>;
    const next = jest.fn();
    errorhandler(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('errorHandler should log error', async () => {
    const { validationResult } = await import('express-validator');
    (validationResult as unknown as jest.Mocked<() => {}>).mockImplementation(
      () => {
        return {
          isEmpty: jest.fn(() => {
            return false;
          }),
          array: jest.fn(() => ['ErrorA']),
        };
      }
    );
    const errorhandler = validateUserIdInQuery[1];
    const req = {} as jest.Mocked<Request>;
    const res = {
      status: jest.fn((scode) => {
        expect(scode).toEqual(400);
        return {
          send: jest.fn((payload) => {
            expect(payload).toHaveProperty('errors', expect.any(Array));
          }),
        };
      }),
    } as unknown as jest.Mocked<Response>;
    const next = jest.fn();
    errorhandler(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });
});
