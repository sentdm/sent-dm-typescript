// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SentDm from 'sent_dm';

const client = new SentDm({
  apiKey: 'My API Key',
  senderID: 'My Sender ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource organizations', () => {
  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.organizations.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieveProfiles', async () => {
    const responsePromise = client.organizations.retrieveProfiles('6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
