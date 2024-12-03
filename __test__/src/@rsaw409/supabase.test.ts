import { jest } from '@jest/globals';

jest.unstable_mockModule('@supabase/supabase-js', () => {
  return {
    __esModule: true,
    createClient: jest.fn(() => {
      return {
        storage: {
          from: jest.fn(() => {
            return {
              upload: jest.fn(),
              list: jest.fn(() => {
                return {
                  data: [],
                };
              }),
              remove: jest.fn(),
            };
          }),
        },
      };
    }),
  };
});

jest.unstable_mockModule('base64-arraybuffer', () => {
  return {
    decode: jest.fn(),
  };
});

const { default: supabase } = await import('../../../src/@rsaw409/supabase');

describe('TESTS supabase funtions', () => {
  test('uploadFileToSupabse', async () => {
    const file = {
      buffer: {
        toString: jest.fn(),
      },
    } as unknown as Express.Multer.File;
    await supabase.uploadFileToSupabse('dummy/url', file);
  });

  test('deleteFileFromSupabase', async () => {
    await supabase.deleteFileFromSupabase('dummy/url');
  });
});
