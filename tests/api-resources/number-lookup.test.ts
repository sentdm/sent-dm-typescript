// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SentDm from 'sent-dm';

const client = new SentDm({
  apiKey: 'My API Key',
  senderID: 'My Sender ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource numberLookup', () => {
  // Prism tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.numberLookup.retrieve({ phoneNumber: 'phoneNumber' });
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
    const response = await client.numberLookup.retrieve({ phoneNumber: 'phoneNumber' });
  });
});
