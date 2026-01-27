// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SentDm from 'sent-dm';

const client = new SentDm({
  apiKey: 'My API Key',
  customerSenderID: 'My Customer Sender ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource users', () => {
  // Prism tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.organizations.users.retrieve('userId', { orgId: 'orgId' });
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
    const response = await client.organizations.users.retrieve('userId', { orgId: 'orgId' });
  });

  // Prism tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.organizations.users.list('orgId', { page: 0, pageSize: 0 });
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
    const response = await client.organizations.users.list('orgId', { page: 0, pageSize: 0 });
  });

  // Prism tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.organizations.users.delete('userId', { orgId: 'orgId' });
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
    const response = await client.organizations.users.delete('userId', { orgId: 'orgId' });
  });

  // Prism tests are disabled
  test.skip('createOrInvite', async () => {
    const responsePromise = client.organizations.users.createOrInvite(
      '550e8400-e29b-41d4-a716-446655440000',
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

  // Prism tests are disabled
  test.skip('deleteByCustomer: only required params', async () => {
    const responsePromise = client.organizations.users.deleteByCustomer(
      '650e8400-e29b-41d4-a716-446655440000',
      { customerId: '550e8400-e29b-41d4-a716-446655440000' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('deleteByCustomer: required and optional params', async () => {
    const response = await client.organizations.users.deleteByCustomer(
      '650e8400-e29b-41d4-a716-446655440000',
      { customerId: '550e8400-e29b-41d4-a716-446655440000' },
    );
  });

  // Prism tests are disabled
  test.skip('invite', async () => {
    const responsePromise = client.organizations.users.invite('orgId', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listByCustomer: only required params', async () => {
    const responsePromise = client.organizations.users.listByCustomer(
      '550e8400-e29b-41d4-a716-446655440000',
      { page: 0, pageSize: 0 },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listByCustomer: required and optional params', async () => {
    const response = await client.organizations.users.listByCustomer('550e8400-e29b-41d4-a716-446655440000', {
      page: 0,
      pageSize: 0,
    });
  });

  // Prism tests are disabled
  test.skip('retrieveByCustomer: only required params', async () => {
    const responsePromise = client.organizations.users.retrieveByCustomer(
      '650e8400-e29b-41d4-a716-446655440000',
      { customerId: '550e8400-e29b-41d4-a716-446655440000' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieveByCustomer: required and optional params', async () => {
    const response = await client.organizations.users.retrieveByCustomer(
      '650e8400-e29b-41d4-a716-446655440000',
      { customerId: '550e8400-e29b-41d4-a716-446655440000' },
    );
  });

  // Prism tests are disabled
  test.skip('retrieveInvitationDetails: only required params', async () => {
    const responsePromise = client.organizations.users.retrieveInvitationDetails('invitation-token-example', {
      customerId: '550e8400-e29b-41d4-a716-446655440000',
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
  test.skip('retrieveInvitationDetails: required and optional params', async () => {
    const response = await client.organizations.users.retrieveInvitationDetails('invitation-token-example', {
      customerId: '550e8400-e29b-41d4-a716-446655440000',
    });
  });

  // Prism tests are disabled
  test.skip('updateRole: only required params', async () => {
    const responsePromise = client.organizations.users.updateRole('userId', { orgId: 'orgId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('updateRole: required and optional params', async () => {
    const response = await client.organizations.users.updateRole('userId', {
      orgId: 'orgId',
      role: 'developer',
    });
  });

  // Prism tests are disabled
  test.skip('updateRoleByCustomer: only required params', async () => {
    const responsePromise = client.organizations.users.updateRoleByCustomer(
      '650e8400-e29b-41d4-a716-446655440000',
      { customerId: '550e8400-e29b-41d4-a716-446655440000' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('updateRoleByCustomer: required and optional params', async () => {
    const response = await client.organizations.users.updateRoleByCustomer(
      '650e8400-e29b-41d4-a716-446655440000',
      { customerId: '550e8400-e29b-41d4-a716-446655440000', role: 'admin' },
    );
  });
});
