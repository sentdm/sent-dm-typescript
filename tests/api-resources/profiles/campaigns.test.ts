// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SentDm from '@sentdm/sentdm';

const client = new SentDm({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource campaigns', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.profiles.campaigns.create('770e8400-e29b-41d4-a716-446655440002', {
      campaign: {
        description: 'Appointment reminders and account notifications',
        name: 'Customer Notifications',
        type: 'App',
        useCases: [
          {
            messagingUseCaseUs: 'ACCOUNT_NOTIFICATION',
            sampleMessages: [
              'Hi {name}, your appointment is confirmed for {date} at {time}.',
              'Your order #{order_id} has been shipped. Track at {url}',
            ],
          },
        ],
      },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.profiles.campaigns.create('770e8400-e29b-41d4-a716-446655440002', {
      campaign: {
        description: 'Appointment reminders and account notifications',
        name: 'Customer Notifications',
        type: 'App',
        useCases: [
          {
            messagingUseCaseUs: 'ACCOUNT_NOTIFICATION',
            sampleMessages: [
              'Hi {name}, your appointment is confirmed for {date} at {time}.',
              'Your order #{order_id} has been shipped. Track at {url}',
            ],
          },
        ],
        helpKeywords: 'HELP, INFO, SUPPORT',
        helpMessage: 'Reply STOP to unsubscribe or contact support@acmecorp.com',
        messageFlow: 'User signs up on website and opts in to receive SMS notifications',
        optinKeywords: 'YES, START, SUBSCRIBE',
        optinMessage: 'You have opted in to Acme Corp notifications. Reply STOP to opt out.',
        optoutKeywords: 'STOP, UNSUBSCRIBE, END',
        optoutMessage: 'You have been unsubscribed. Reply START to opt back in.',
        privacyPolicyLink: 'https://acmecorp.com/privacy',
        termsAndConditionsLink: 'https://acmecorp.com/terms',
      },
      sandbox: false,
      'Idempotency-Key': 'req_abc123_retry1',
      'x-profile-id': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.profiles.campaigns.update('b2c3d4e5-f6a7-8901-bcde-f12345678901', {
      profileId: '770e8400-e29b-41d4-a716-446655440002',
      campaign: {
        description: 'Updated appointment reminders and account notifications',
        name: 'Customer Notifications Updated',
        type: 'App',
        useCases: [
          {
            messagingUseCaseUs: 'ACCOUNT_NOTIFICATION',
            sampleMessages: [
              'Hi {name}, your appointment is confirmed for {date} at {time}.',
              'Your order #{order_id} has been shipped. Track at {url}',
            ],
          },
        ],
      },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.profiles.campaigns.update('b2c3d4e5-f6a7-8901-bcde-f12345678901', {
      profileId: '770e8400-e29b-41d4-a716-446655440002',
      campaign: {
        description: 'Updated appointment reminders and account notifications',
        name: 'Customer Notifications Updated',
        type: 'App',
        useCases: [
          {
            messagingUseCaseUs: 'ACCOUNT_NOTIFICATION',
            sampleMessages: [
              'Hi {name}, your appointment is confirmed for {date} at {time}.',
              'Your order #{order_id} has been shipped. Track at {url}',
            ],
          },
        ],
        helpKeywords: null,
        helpMessage: null,
        messageFlow: 'User signs up on website and opts in to receive SMS notifications',
        optinKeywords: null,
        optinMessage: null,
        optoutKeywords: null,
        optoutMessage: null,
        privacyPolicyLink: null,
        termsAndConditionsLink: null,
      },
      sandbox: false,
      'Idempotency-Key': 'req_abc123_retry1',
      'x-profile-id': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.profiles.campaigns.list('770e8400-e29b-41d4-a716-446655440002');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.profiles.campaigns.list(
        '770e8400-e29b-41d4-a716-446655440002',
        { 'x-profile-id': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(SentDm.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.profiles.campaigns.delete('b2c3d4e5-f6a7-8901-bcde-f12345678901', {
      profileId: '770e8400-e29b-41d4-a716-446655440002',
      body: {},
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.profiles.campaigns.delete('b2c3d4e5-f6a7-8901-bcde-f12345678901', {
      profileId: '770e8400-e29b-41d4-a716-446655440002',
      body: { sandbox: false },
      'x-profile-id': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
