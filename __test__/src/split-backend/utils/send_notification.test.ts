import { jest } from '@jest/globals';



jest.unstable_mockModule('node-fetch', () => {
  return {
    __esModule: true,
    default: jest.fn((url, options) => {
      expect(url).toEqual('https://onesignal.com/api/v1/notifications');
      expect(options).toHaveProperty('method', 'POST');
      expect(options).toHaveProperty('headers');
      expect(options).toHaveProperty('body');
      return Promise.resolve({
        json: () => Promise.resolve({ message: 'Mocked response' }),
        status: 200,
      });
    }),
  };
});
jest.unstable_mockModule('../../../../src/@rsaw409/logger.js', () => {
  return {
    __esModule: true,
    default: {
      error: jest.fn(),
      info: jest.fn(),
    },
  };
});


const { send_push_notification } = await import(
  '../../../../src/split-backend/utils/send_notification.js'
);
const { default: fetch } = await import('node-fetch');

describe('SEND NOTIFCATION TEST', () => {
  beforeEach(() => {
    process.env.ONESIGNAL_KEY = 'test-key';
  });

  test('send notification test', async () => {
    send_push_notification({
      groupName: 'testGroup',
      headings: 'test heading',
      title: 'test title',
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
