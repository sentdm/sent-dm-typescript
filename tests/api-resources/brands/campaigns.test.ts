// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SentDm from 'sent-dm';

const client = new SentDm({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource campaigns', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.brands.campaigns.create('a1b2c3d4-e5f6-7890-abcd-ef1234567890', {
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

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.brands.campaigns.create('a1b2c3d4-e5f6-7890-abcd-ef1234567890', {
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
      test_mode: false,
      'Idempotency-Key': 'req_abc123_retry1',
    });
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.brands.campaigns.update('b2c3d4e5-f6a7-8901-bcde-f12345678901', {
      brandId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
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

  // Prism tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.brands.campaigns.update('b2c3d4e5-f6a7-8901-bcde-f12345678901', {
      brandId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
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
      test_mode: false,
      'Idempotency-Key': 'req_abc123_retry1',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.brands.campaigns.list('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.brands.campaigns.delete('b2c3d4e5-f6a7-8901-bcde-f12345678901', {
      brandId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
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

  // Prism tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.brands.campaigns.delete('b2c3d4e5-f6a7-8901-bcde-f12345678901', {
      brandId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      body: { test_mode: false },
    });
  });
});
