// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ProfilesUsersAPI from '../profiles/users';
import * as OrganizationsProfilesUsersAPI from './profiles/users';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Users extends APIResource {
  /**
   * Retrieves a specific user by ID. Requires organization-scoped API key.
   *
   * @example
   * ```ts
   * const customerUserDto =
   *   await client.organizations.users.retrieve('userId', {
   *     orgId: 'orgId',
   *   });
   * ```
   */
  retrieve(
    userID: string,
    params: UserRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ProfilesUsersAPI.CustomerUserDto> {
    const { orgId } = params;
    return this._client.get(path`/v3/organizations/${orgId}/users/${userID}`, options);
  }

  /**
   * Retrieves all users associated with an organization. Requires
   * organization-scoped API key. Supports pagination.
   *
   * @example
   * ```ts
   * const userListResponse =
   *   await client.organizations.users.list('orgId', {
   *     page: 0,
   *     pageSize: 0,
   *   });
   * ```
   */
  list(
    orgID: string,
    query: UserListParams,
    options?: RequestOptions,
  ): APIPromise<ProfilesUsersAPI.UserListResponse> {
    return this._client.get(path`/v3/organizations/${orgID}/users`, { query, ...options });
  }

  /**
   * Removes a user from an organization. Requires organization-scoped API key.
   *
   * @example
   * ```ts
   * await client.organizations.users.delete('userId', {
   *   orgId: 'orgId',
   * });
   * ```
   */
  delete(userID: string, params: UserDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { orgId } = params;
    return this._client.delete(path`/v3/organizations/${orgId}/users/${userID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Invites a user to an organization or sender profile with a specified role.
   * Requires appropriate permissions. The customerId can be either an organization
   * ID or a profile ID.
   *
   * @example
   * ```ts
   * const customerUserDto =
   *   await client.organizations.users.createOrInvite(
   *     '550e8400-e29b-41d4-a716-446655440000',
   *   );
   * ```
   */
  createOrInvite(
    customerID: string,
    body: UserCreateOrInviteParams,
    options?: RequestOptions,
  ): APIPromise<ProfilesUsersAPI.CustomerUserDto> {
    return this._client.post(path`/v2/organizations/${customerID}/users`, { body, ...options });
  }

  /**
   * Removes a user from an organization or sender profile. Requires admin
   * permissions. This action permanently deletes the user association.
   *
   * @example
   * ```ts
   * await client.organizations.users.deleteByCustomer(
   *   '650e8400-e29b-41d4-a716-446655440000',
   *   { customerId: '550e8400-e29b-41d4-a716-446655440000' },
   * );
   * ```
   */
  deleteByCustomer(
    userID: string,
    params: UserDeleteByCustomerParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { customerId } = params;
    return this._client.delete(path`/v2/organizations/${customerId}/users/${userID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Sends an invitation to a user to join an organization with a specified role.
   * Requires organization-scoped API key. If the user already exists with 'invited'
   * status, resends the invitation with a new token.
   *
   * @example
   * ```ts
   * const inviteUserResponse =
   *   await client.organizations.users.invite('orgId');
   * ```
   */
  invite(
    orgID: string,
    body: UserInviteParams,
    options?: RequestOptions,
  ): APIPromise<ProfilesUsersAPI.InviteUserResponse> {
    return this._client.post(path`/v3/organizations/${orgID}/users/invite`, { body, ...options });
  }

  /**
   * Retrieves all users associated with an organization or sender profile. Requires
   * appropriate permissions. Supports pagination.
   *
   * @example
   * ```ts
   * const response =
   *   await client.organizations.users.listByCustomer(
   *     '550e8400-e29b-41d4-a716-446655440000',
   *     { page: 0, pageSize: 0 },
   *   );
   * ```
   */
  listByCustomer(
    customerID: string,
    query: UserListByCustomerParams,
    options?: RequestOptions,
  ): APIPromise<UserListByCustomerResponse> {
    return this._client.get(path`/v2/organizations/${customerID}/users`, { query, ...options });
  }

  /**
   * Retrieves a specific user by their ID. Requires appropriate permissions. The
   * customerId can be either an organization ID or a profile ID.
   *
   * @example
   * ```ts
   * const customerUserDto =
   *   await client.organizations.users.retrieveByCustomer(
   *     '650e8400-e29b-41d4-a716-446655440000',
   *     { customerId: '550e8400-e29b-41d4-a716-446655440000' },
   *   );
   * ```
   */
  retrieveByCustomer(
    userID: string,
    params: UserRetrieveByCustomerParams,
    options?: RequestOptions,
  ): APIPromise<ProfilesUsersAPI.CustomerUserDto> {
    const { customerId } = params;
    return this._client.get(path`/v2/organizations/${customerId}/users/${userID}`, options);
  }

  /**
   * Retrieves detailed information about a user invitation using the invitation
   * token. Verifies that the invitation belongs to the specified organization. This
   * endpoint is public and does not require authentication.
   *
   * @example
   * ```ts
   * const invitationDetails =
   *   await client.organizations.users.retrieveInvitationDetails(
   *     'invitation-token-example',
   *     { customerId: '550e8400-e29b-41d4-a716-446655440000' },
   *   );
   * ```
   */
  retrieveInvitationDetails(
    token: string,
    params: UserRetrieveInvitationDetailsParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationsProfilesUsersAPI.InvitationDetails> {
    const { customerId } = params;
    return this._client.get(path`/v3/organizations/${customerId}/users/invitations/${token}`, options);
  }

  /**
   * Updates a user's role within an organization. Requires organization-scoped API
   * key.
   *
   * @example
   * ```ts
   * await client.organizations.users.updateRole('userId', {
   *   orgId: 'orgId',
   * });
   * ```
   */
  updateRole(userID: string, params: UserUpdateRoleParams, options?: RequestOptions): APIPromise<void> {
    const { orgId, ...body } = params;
    return this._client.put(path`/v3/organizations/${orgId}/users/${userID}/role`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Updates a user's role within an organization or sender profile. Requires admin
   * permissions. Valid roles are: admin, billing, developer.
   *
   * @example
   * ```ts
   * const customerUserDto =
   *   await client.organizations.users.updateRoleByCustomer(
   *     '650e8400-e29b-41d4-a716-446655440000',
   *     { customerId: '550e8400-e29b-41d4-a716-446655440000' },
   *   );
   * ```
   */
  updateRoleByCustomer(
    userID: string,
    params: UserUpdateRoleByCustomerParams,
    options?: RequestOptions,
  ): APIPromise<ProfilesUsersAPI.CustomerUserDto> {
    const { customerId, ...body } = params;
    return this._client.put(path`/v2/organizations/${customerId}/users/${userID}`, { body, ...options });
  }
}

export interface UserListByCustomerResponse {
  page?: number;

  pageSize?: number;

  totalCount?: number;

  users?: Array<ProfilesUsersAPI.CustomerUserDto>;
}

export interface UserRetrieveParams {
  orgId: string;
}

export interface UserListParams {
  page: number;

  pageSize: number;
}

export interface UserDeleteParams {
  orgId: string;
}

export interface UserCreateOrInviteParams {
  email?: string;

  invitedBy?: string | null;

  name?: string;

  role?: string;
}

export interface UserDeleteByCustomerParams {
  customerId: string;
}

export interface UserInviteParams {
  email?: string;

  name?: string;

  role?: string;
}

export interface UserListByCustomerParams {
  page: number;

  pageSize: number;
}

export interface UserRetrieveByCustomerParams {
  customerId: string;
}

export interface UserRetrieveInvitationDetailsParams {
  customerId: string;
}

export interface UserUpdateRoleParams {
  /**
   * Path param
   */
  orgId: string;

  /**
   * Body param
   */
  role?: string;
}

export interface UserUpdateRoleByCustomerParams {
  /**
   * Path param
   */
  customerId: string;

  /**
   * Body param
   */
  role?: string;
}

export declare namespace Users {
  export {
    type UserListByCustomerResponse as UserListByCustomerResponse,
    type UserRetrieveParams as UserRetrieveParams,
    type UserListParams as UserListParams,
    type UserDeleteParams as UserDeleteParams,
    type UserCreateOrInviteParams as UserCreateOrInviteParams,
    type UserDeleteByCustomerParams as UserDeleteByCustomerParams,
    type UserInviteParams as UserInviteParams,
    type UserListByCustomerParams as UserListByCustomerParams,
    type UserRetrieveByCustomerParams as UserRetrieveByCustomerParams,
    type UserRetrieveInvitationDetailsParams as UserRetrieveInvitationDetailsParams,
    type UserUpdateRoleParams as UserUpdateRoleParams,
    type UserUpdateRoleByCustomerParams as UserUpdateRoleByCustomerParams,
  };
}
