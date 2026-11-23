// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Sent from '@sentdm/sentdm';

const client = new Sent({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource sms', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.channels.sms.create({ number_type: 'TEN_DLC' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.channels.sms.create({
      number_type: 'TEN_DLC',
      area_codes: ['415', '628'],
      compliance: {
        brand: {
          business_name: 'xxx',
          city: 'city',
          contact_email: 'dev@stainless.com',
          contact_name: 'contact_name',
          contact_phone: 'contact_phone',
          country: 'country',
          ein_issuing_country: 'ein_issuing_country',
          entity_type: 'PRIVATE_PROFIT',
          inherit: true,
          legal_name: 'legal_name',
          postal_code: 'postal_code',
          state: 'state',
          street: 'street',
          tax_id: 'xx',
          tax_id_type: 'tax_id_type',
          website: 'website',
        },
        campaign: {
          description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          help_keywords: 'help_keywords',
          help_message: 'xxxxxxxxxxxxxxxxxxxx',
          inherit: true,
          message_flow: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          opt_in_keywords: 'opt_in_keywords',
          opt_in_message: 'xxxxxxxxxxxxxxxxxxxx',
          opt_out_keywords: 'opt_out_keywords',
          opt_out_message: 'xxxxxxxxxxxxxxxxxxxx',
          privacy_policy_link: 'privacy_policy_link',
          terms_and_conditions_link: 'terms_and_conditions_link',
          use_cases: [{ sample_messages: [{}], use_case: 'MARKETING' }],
          volume: 'volume',
        },
      },
      numbers: [{ area_code: 'area_code', quantity: 0 }],
      sandbox: false,
      sender_value: null,
      'Idempotency-Key': 'req_abc123_retry1',
      'x-profile-id': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
