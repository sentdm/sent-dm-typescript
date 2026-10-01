// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Sent from '@sentdm/sentdm';

const client = new Sent({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource calls', () => {
  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.calls.retrieve('call_9f2ab000-0000-4000-8000-000000000001');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.calls.retrieve(
        'call_9f2ab000-0000-4000-8000-000000000001',
        { 'x-profile-id': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Sent.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.calls.list();
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
      client.calls.list(
        {
          direction: 'direction',
          from: '2019-12-27T18:11:19.117Z',
          number: 'number',
          page: 0,
          page_size: 0,
          status: 'status',
          to: '2019-12-27T18:11:19.117Z',
          'x-profile-id': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Sent.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('hangup', async () => {
    const responsePromise = client.calls.hangup('call_9f2ab000-0000-4000-8000-000000000001', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listRecordings', async () => {
    const responsePromise = client.calls.listRecordings('call_9f2ab000-0000-4000-8000-000000000001');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listRecordings: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.calls.listRecordings(
        'call_9f2ab000-0000-4000-8000-000000000001',
        { 'x-profile-id': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Sent.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('record', async () => {
    const responsePromise = client.calls.record('call_9f2ab000-0000-4000-8000-000000000001', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
