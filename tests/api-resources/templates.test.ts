// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SentDm from '@sentdm/sentdm';

const client = new SentDm({
  apiKey: 'My API Key',
  senderID: 'My Sender ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource templates', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.templates.create({ definition: { body: {} } });
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
    const response = await client.templates.create({
      definition: {
        body: {
          multiChannel: {
            template:
              "Hello {{1:variable}}, thank you for joining our service. We're excited to help you with your messaging needs!",
            type: null,
            variables: [
              {
                id: 1,
                name: 'customerName',
                props: {
                  alt: null,
                  mediaType: null,
                  sample: 'John Doe',
                  shortUrl: null,
                  url: null,
                  variableType: 'text',
                },
                type: 'variable',
              },
            ],
          },
          sms: {
            template: 'template',
            type: 'type',
            variables: [
              {
                id: 0,
                name: 'name',
                props: {
                  alt: 'alt',
                  mediaType: 'mediaType',
                  sample: 'sample',
                  shortUrl: 'shortUrl',
                  url: 'url',
                  variableType: 'variableType',
                },
                type: 'type',
              },
            ],
          },
          whatsapp: {
            template: 'template',
            type: 'type',
            variables: [
              {
                id: 0,
                name: 'name',
                props: {
                  alt: 'alt',
                  mediaType: 'mediaType',
                  sample: 'sample',
                  shortUrl: 'shortUrl',
                  url: 'url',
                  variableType: 'variableType',
                },
                type: 'type',
              },
            ],
          },
        },
        authenticationConfig: { addSecurityRecommendation: true, codeExpirationMinutes: 0 },
        buttons: [
          {
            id: 0,
            props: {
              activeFor: 0,
              autofillText: 'autofillText',
              countryCode: 'countryCode',
              offerCode: 'offerCode',
              otpType: 'otpType',
              packageName: 'packageName',
              phoneNumber: 'phoneNumber',
              quickReplyType: 'quickReplyType',
              signatureHash: 'signatureHash',
              text: 'text',
              url: 'url',
              urlType: 'urlType',
            },
            type: 'type',
          },
        ],
        definitionVersion: '1.0',
        footer: {
          template: 'Best regards, The SentDM Team',
          type: 'text',
          variables: [
            {
              id: 0,
              name: 'name',
              props: {
                alt: 'alt',
                mediaType: 'mediaType',
                sample: 'sample',
                shortUrl: 'shortUrl',
                url: 'url',
                variableType: 'variableType',
              },
              type: 'type',
            },
          ],
        },
        header: {
          template: 'Welcome to {{1:variable}}!',
          type: 'text',
          variables: [
            {
              id: 1,
              name: 'companyName',
              props: {
                alt: null,
                mediaType: null,
                sample: 'SentDM',
                shortUrl: null,
                url: null,
                variableType: 'text',
              },
              type: 'variable',
            },
          ],
        },
      },
      category: 'MARKETING',
      language: 'en_US',
      submitForReview: false,
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.templates.retrieve('7ba7b820-9dad-11d1-80b4-00c04fd430c8');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.templates.list({ page: 0, pageSize: 0 });
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
    const response = await client.templates.list({
      page: 0,
      pageSize: 0,
      category: 'category',
      search: 'search',
      status: 'status',
    });
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.templates.delete('7ba7b820-9dad-11d1-80b4-00c04fd430c8');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
