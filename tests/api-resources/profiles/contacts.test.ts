// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SentDm from 'sent-dm';

const client = new SentDm({
  apiKey: 'My API Key',
  customerSenderID: 'My Customer Sender ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource contacts', () => {
  // Prism tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.profiles.contacts.retrieve('7ba7b810-9dad-11d1-80b4-00c04fd430c8', {
      profileId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
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
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.profiles.contacts.retrieve('7ba7b810-9dad-11d1-80b4-00c04fd430c8', {
      profileId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    });
  });

  // Prism tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.profiles.contacts.list('6ba7b810-9dad-11d1-80b4-00c04fd430c8', {
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
  test.skip('list: required and optional params', async () => {
    const response = await client.profiles.contacts.list('6ba7b810-9dad-11d1-80b4-00c04fd430c8', {
      page: 0,
      pageSize: 0,
      channel: 'channel',
      searchTerm: 'searchTerm',
    });
  });
});
