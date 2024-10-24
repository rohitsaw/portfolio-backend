import { jest } from '@jest/globals';

jest.unstable_mockModule('file-type', () => {
  return {
    fileTypeFromBuffer: jest.fn(),
  };
});

const { fileValidation } = await import(
  '../../../../src/portfolio-backend/utils/file-validation'
);

const { fileTypeFromBuffer } = await import('file-type');

describe('TEST filevalidation', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('Should return if no file found in req', async () => {
    let req = {};
    let res = {};
    let next = jest.fn();

    await fileValidation(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('Should return if mimetype is not valid.', async () => {
    let req = {
      file: {
        buffer: '',
      },
    };
    let res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    let next = jest.fn();

    (fileTypeFromBuffer as any).mockImplementation(() => {
      return {
        mime: 'application/pdf',
      };
    });

    await fileValidation(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: expect.any(String) });
  });

  test('Should call next if mimetype is valid.', async () => {
    let req = {
      file: {
        buffer: '',
      },
    };
    let res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    let next = jest.fn();

    (fileTypeFromBuffer as any).mockImplementation(() => {
      return {
        mime: 'image/png',
      };
    });

    await fileValidation(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
