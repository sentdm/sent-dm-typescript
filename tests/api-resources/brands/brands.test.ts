// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SentDm from '@sentdm/sentdm';

const client = new SentDm({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource brands', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.brands.create({
      brand: {
        brandRelationship: 'SMALL_ACCOUNT',
        contactName: 'John Smith',
        vertical: 'PROFESSIONAL',
      },
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
  test.skip('create: required and optional params', async () => {
    const response = await client.brands.create({
      brand: {
        brandRelationship: 'SMALL_ACCOUNT',
        contactName: 'John Smith',
        vertical: 'PROFESSIONAL',
        brandName: null,
        businessLegalName: 'Acme Corporation LLC',
        businessName: 'Acme Corp',
        businessRole: 'CEO',
        businessUrl: 'https://acmecorp.com',
        city: 'New York',
        contactEmail: 'john@acmecorp.com',
        contactPhone: '+12025551234',
        contactPhoneCountryCode: '1',
        country: 'US',
        countryOfRegistration: 'US',
        destinationCountries: [{ id: 'US', isMain: false }],
        entityType: 'PRIVATE_PROFIT',
        expectedMessagingVolume: '10000',
        isTcrApplication: true,
        notes: null,
        phoneNumberPrefix: '+1',
        postalCode: '10001',
        primaryUseCase: 'Customer notifications and appointment reminders',
        state: 'NY',
        street: '123 Main Street',
        taxId: '12-3456789',
        taxIdType: 'us_ein',
      },
      test_mode: false,
      'Idempotency-Key': 'req_abc123_retry1',
    });
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.brands.update('a1b2c3d4-e5f6-7890-abcd-ef1234567890', {
      brand: {
        brandRelationship: 'SMALL_ACCOUNT',
        contactName: 'John Smith',
        vertical: 'PROFESSIONAL',
      },
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
  test.skip('update: required and optional params', async () => {
    const response = await client.brands.update('a1b2c3d4-e5f6-7890-abcd-ef1234567890', {
      brand: {
        brandRelationship: 'SMALL_ACCOUNT',
        contactName: 'John Smith',
        vertical: 'PROFESSIONAL',
        brandName: null,
        businessLegalName: 'Acme Corporation LLC',
        businessName: 'Acme Corp Updated',
        businessRole: 'CTO',
        businessUrl: null,
        city: null,
        contactEmail: 'john@acmecorp.com',
        contactPhone: '+12025551234',
        contactPhoneCountryCode: '1',
        country: 'US',
        countryOfRegistration: null,
        destinationCountries: [{ id: 'id', isMain: true }],
        entityType: null,
        expectedMessagingVolume: null,
        isTcrApplication: null,
        notes: null,
        phoneNumberPrefix: null,
        postalCode: null,
        primaryUseCase: null,
        state: null,
        street: null,
        taxId: null,
        taxIdType: null,
      },
      test_mode: false,
      'Idempotency-Key': 'req_abc123_retry1',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.brands.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.brands.delete('a1b2c3d4-e5f6-7890-abcd-ef1234567890', { body: {} });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.brands.delete('a1b2c3d4-e5f6-7890-abcd-ef1234567890', {
      body: { test_mode: false },
    });
  });
});
