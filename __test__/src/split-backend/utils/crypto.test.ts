import { jest } from '@jest/globals';

import {
  encrypt,
  decrypt,
} from '../../../../src/split-backend/utils/crypto.js';

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
