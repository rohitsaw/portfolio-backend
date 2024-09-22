import { jest } from '@jest/globals';

import { encrypt, decrypt } from './crypto';

describe('CRYPTO TESTS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.ENCRYPTION_KEY = 'tests';
    process.env.IV = 'dsjdw';
  });

  test('encrypt and descrypt test', () => {
    const text: string = 'test Data';
    expect(decrypt(encrypt(text))).toEqual(text);
  });
});
