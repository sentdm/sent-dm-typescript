// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Sent from '@sentdm/sentdm';

const client = new Sent({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tenDlc', () => {
  // Mock server tests are disabled
  test.skip('addCampaign: only required params', async () => {
    const responsePromise = client.channels.sms.tenDlc.addCampaign({
      description: 'Appointment reminders for patients who opted in when booking.',
      help_keywords: 'help_keywords',
      help_message: 'xxxxxxxxxxxxxxxxxxxx',
      message_flow: 'Patients opt in on the booking form by checking a consent box.',
      opt_in_keywords: 'opt_in_keywords',
      opt_in_message: 'xxxxxxxxxxxxxxxxxxxx',
      opt_out_keywords: 'opt_out_keywords',
      opt_out_message: 'xxxxxxxxxxxxxxxxxxxx',
      privacy_policy_link: 'privacy_policy_link',
      terms_and_conditions_link: 'terms_and_conditions_link',
      use_cases: [
        {
          sample_messages: ['Reminder: your appointment is tomorrow at 10:00. Reply STOP to opt out.'],
          use_case: 'ACCOUNT_NOTIFICATION',
        },
      ],
      volume: 'volume',
      'Idempotency-Key': 'req_abc123_retry1',
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
  test.skip('addCampaign: required and optional params', async () => {
    const response = await client.channels.sms.tenDlc.addCampaign({
      description: 'Appointment reminders for patients who opted in when booking.',
      help_keywords: 'help_keywords',
      help_message: 'xxxxxxxxxxxxxxxxxxxx',
      message_flow: 'Patients opt in on the booking form by checking a consent box.',
      opt_in_keywords: 'opt_in_keywords',
      opt_in_message: 'xxxxxxxxxxxxxxxxxxxx',
      opt_out_keywords: 'opt_out_keywords',
      opt_out_message: 'xxxxxxxxxxxxxxxxxxxx',
      privacy_policy_link: 'privacy_policy_link',
      terms_and_conditions_link: 'terms_and_conditions_link',
      use_cases: [
        {
          sample_messages: ['Reminder: your appointment is tomorrow at 10:00. Reply STOP to opt out.'],
          use_case: 'ACCOUNT_NOTIFICATION',
        },
      ],
      volume: 'volume',
      'Idempotency-Key': 'req_abc123_retry1',
      sandbox: false,
      'x-profile-id': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('listCampaigns', async () => {
    const responsePromise = client.channels.sms.tenDlc.listCampaigns();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listCampaigns: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.channels.sms.tenDlc.listCampaigns(
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
