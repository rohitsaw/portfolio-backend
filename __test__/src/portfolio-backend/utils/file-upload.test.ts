import { vi, describe, test, beforeEach, expect } from 'vitest';

vi.mock('file-type', () => {
  return {
    fileTypeFromBuffer: vi.fn(),
  };
});

vi.mock('../../../../src/@rsaw409/logger.js', () => {
  return {
    default: {
      error: vi.fn(),
      info: vi.fn(),
    },
  };
});

const { fileValidation } = await import('../../../../src/portfolio-backend/utils/file-validation');
const { fileTypeFromBuffer } = await import('file-type');

describe('TEST filevalidation', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('Should return if no file found in req', async () => {
    let req = {};
    let res = {};
    let next = vi.fn();
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
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
    let next = vi.fn();
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
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
    let next = vi.fn();
    (fileTypeFromBuffer as any).mockImplementation(() => {
      return {
        mime: 'image/png',
      };
    });
    await fileValidation(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
