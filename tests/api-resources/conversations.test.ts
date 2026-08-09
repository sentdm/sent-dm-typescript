// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Sent from '@sentdm/sentdm';

const client = new Sent({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource conversations', () => {
  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.conversations.list({ page: 0, page_size: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: required and optional params', async () => {
    const response = await client.conversations.list({
      page: 0,
      page_size: 0,
      'x-profile-id': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('listMessages: only required params', async () => {
    const responsePromise = client.conversations.listMessages('08fab313-c9e2-502c-975e-08b0356c432e', {
      page: 0,
      page_size: 0,
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
  test.skip('listMessages: required and optional params', async () => {
    const response = await client.conversations.listMessages('08fab313-c9e2-502c-975e-08b0356c432e', {
      page: 0,
      page_size: 0,
      'x-profile-id': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
