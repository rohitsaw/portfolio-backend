import { jest } from '@jest/globals';

jest.unstable_mockModule('../../../../src/@rsaw409/supabase.js', () => {
  return {
    __esModule: true,
    default: {
      storage: {
        from: jest.fn((bucket_name) => {
          return {
            upload: jest.fn(),
            remove: jest.fn(),
            list: jest.fn(() => ({ data: ['1', '2'] })),
          };
        }),
      },
    },
  };
});

jest.unstable_mockModule('base64-arraybuffer', () => {
  return {
    decode: jest.fn(),
  };
});

const { uploadFileToSupabse, deleteFileFromSupabase } = await import(
  '../../../../src/portfolio-backend/utils/supabase'
);

describe('TESTS supabse funtions', () => {
  test('uploadFileToSupabse', async () => {
    const file = {
      buffer: {
        toString: jest.fn(),
      },
    } as unknown as Express.Multer.File;
    await uploadFileToSupabse('dummy/url', file);
  });

  test('deleteFileFromSupabase', async () => {
    await deleteFileFromSupabase('dummy/url');
  });
});
