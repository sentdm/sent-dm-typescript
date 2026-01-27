// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SentDm from 'sent-dm';

const client = new SentDm({
  apiKey: 'My API Key',
  customerSenderID: 'My Customer Sender ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource profiles', () => {
  // Prism tests are disabled
  test.skip('listTemplates: only required params', async () => {
    const responsePromise = client.profiles.listTemplates('6ba7b810-9dad-11d1-80b4-00c04fd430c8', {
      page: 0,
      pageSize: 0,
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
  test.skip('listTemplates: required and optional params', async () => {
    const response = await client.profiles.listTemplates('6ba7b810-9dad-11d1-80b4-00c04fd430c8', {
      page: 0,
      pageSize: 0,
      category: 'category',
      searchTerm: 'searchTerm',
      status: 'status',
    });
  });

  // Prism tests are disabled
  test.skip('sendMessage: only required params', async () => {
    const responsePromise = client.profiles.sendMessage('6ba7b810-9dad-11d1-80b4-00c04fd430c8', {
      contactId: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
      templateId: '8ba7b830-9dad-11d1-80b4-00c04fd430c8',
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
  test.skip('sendMessage: required and optional params', async () => {
    const response = await client.profiles.sendMessage('6ba7b810-9dad-11d1-80b4-00c04fd430c8', {
      contactId: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
      templateId: '8ba7b830-9dad-11d1-80b4-00c04fd430c8',
      templateVariables: { name: 'John Doe', order_id: '12345' },
    });
  });
});
