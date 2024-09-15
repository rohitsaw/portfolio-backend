import { send_push_notification } from './send_notification';

jest.mock('node-fetch', () => ({
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
}));

describe('SEND NOTIFCATION TEST', () => {
  beforeEach(() => {
    process.env.ONESIGNAL_KEY = 'test-key';
  });

  test('send notification test', async () => {
    const { default: fetch } = await import('node-fetch');
    send_push_notification({
      groupName: 'testGroup',
      headings: 'test heading',
      title: 'test title',
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
