import { jest } from '@jest/globals';

import crypto from '../../../src/@rsaw409/crypto.js';

describe('CRYPTO TESTS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.ENCRYPTION_KEY = 'tests';
  });

  test('encrypt and descrypt test', () => {
    const text: string = 'test Data';
    expect(crypto.decrypt(crypto.encrypt(text))).toEqual(text);
  });
});
