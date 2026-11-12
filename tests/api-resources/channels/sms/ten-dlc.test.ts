// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Sent from '@sentdm/sentdm';

const client = new Sent({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tenDlc', () => {
  // Mock server tests are disabled
  test.skip('addCampaign', async () => {
    const responsePromise = client.channels.sms.tenDlc.addCampaign({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('addNumbers: only required params', async () => {
    const responsePromise = client.channels.sms.tenDlc.addNumbers({
      campaign_id: '8f14e45f-ceea-467f-a8f0-7c2a3d1b9e01',
      numbers: [{}],
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
  test.skip('addNumbers: required and optional params', async () => {
    const response = await client.channels.sms.tenDlc.addNumbers({
      campaign_id: '8f14e45f-ceea-467f-a8f0-7c2a3d1b9e01',
      numbers: [{ area_code: '415', quantity: 2 }],
      sandbox: false,
      'Idempotency-Key': 'req_abc123_retry1',
      'x-profile-id': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieveCompliance', async () => {
    const responsePromise = client.channels.sms.tenDlc.retrieveCompliance();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveCompliance: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.channels.sms.tenDlc.retrieveCompliance(
        { 'x-profile-id': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Sent.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('updateCampaign', async () => {
    const responsePromise = client.channels.sms.tenDlc.updateCampaign(
      '3f2a6c1e-8b4d-4e2a-9c7f-1d5b0a9e4c21',
      {},
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
