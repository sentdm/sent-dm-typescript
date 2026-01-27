// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SentDm from 'sent-dm';

const client = new SentDm({
  apiKey: 'My API Key',
  senderID: 'My Sender ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource messages', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.messages.retrieve('7ba7b820-9dad-11d1-80b4-00c04fd430c8');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('sendQuickMessage: only required params', async () => {
    const responsePromise = client.messages.sendQuickMessage({
      customMessage: 'Hello, this is a test message!',
      phoneNumber: '+1234567890',
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
  test.skip('sendQuickMessage: required and optional params', async () => {
    const response = await client.messages.sendQuickMessage({
      customMessage: 'Hello, this is a test message!',
      phoneNumber: '+1234567890',
    });
  });

  // Prism tests are disabled
  test.skip('sendToContact: only required params', async () => {
    const responsePromise = client.messages.sendToContact({
      contactId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      templateId: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
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
  test.skip('sendToContact: required and optional params', async () => {
    const response = await client.messages.sendToContact({
      contactId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      templateId: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
      templateVariables: { name: 'John Doe', order_id: '12345' },
    });
  });

  // Prism tests are disabled
  test.skip('sendToPhone: only required params', async () => {
    const responsePromise = client.messages.sendToPhone({
      phoneNumber: '+1234567890',
      templateId: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
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
  test.skip('sendToPhone: required and optional params', async () => {
    const response = await client.messages.sendToPhone({
      phoneNumber: '+1234567890',
      templateId: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
      templateVariables: { name: 'John Doe', order_id: '12345' },
    });
  });
});
