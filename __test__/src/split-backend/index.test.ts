import { jest } from '@jest/globals';
import express, { Application } from 'express';

jest.unstable_mockModule('../../../src/split-backend/routes.js', () => {
  return {
    __esModule: true,
    addRoutes: jest.fn(),
  };
});

const { default: splitMailFn } = await import(
  '../../../src/split-backend/index.js'
);
const { addRoutes } = await import('../../../src/split-backend/routes.js');

describe('TEST Split Mail Fn', () => {
  test('Should Success if all env variable are present', async () => {
    const app: Application = express();
    process.env.ENCRYPTION_KEY = 'ENCRYPTION_KEY';
    process.env.IV = 'IV';
    process.env.ONESIGNAL_KEY = 'ONESIGNAL_KEY';
    await splitMailFn(app);
    expect(addRoutes).toHaveBeenCalledWith(app);
  });

  test('Should throw error if ENCRYPTION_KEY not in env variable', async () => {
    const app: Application = express();
    delete process.env.ENCRYPTION_KEY;
    process.env.IV = 'IV';
    process.env.ONESIGNAL_KEY = 'ONESIGNAL_KEY';

    await expect(splitMailFn(app)).rejects.toThrow(
      'ENCRYPTION_KEY env variable not set'
    );
    expect(addRoutes).not.toHaveBeenCalledWith(app);
  });

  test('Should throw error if IV not in env variable', async () => {
    const app: Application = express();
    process.env.ENCRYPTION_KEY = 'ENCRYPTION_KEY';
    delete process.env.IV;
    process.env.ONESIGNAL_KEY = 'ONESIGNAL_KEY';

    await expect(splitMailFn(app)).rejects.toThrow(
      'IV env variable not set'
    );
    expect(addRoutes).not.toHaveBeenCalledWith(app);
  });

  test('Should throw error if ONESIGNAL_KEY not in env variable', async () => {
    const app: Application = express();
    process.env.ENCRYPTION_KEY = 'ENCRYPTION_KEY';
    process.env.IV = 'IV';
    delete process.env.ONESIGNAL_KEY;

    await expect(splitMailFn(app)).rejects.toThrow(
      'ONESIGNAL_KEY env variable not set'
    );
    expect(addRoutes).not.toHaveBeenCalledWith(app);
  });
});