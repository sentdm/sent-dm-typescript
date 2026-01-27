// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Users extends APIResource {
  /**
   * Retrieves a specific user by their ID. Requires appropriate permissions. The
   * customerId can be either an organization ID or a profile ID.
   *
   * @example
   * ```ts
   * const customerUser =
   *   await client.organizations.users.retrieve(
   *     '650e8400-e29b-41d4-a716-446655440000',
   *     { customerId: '550e8400-e29b-41d4-a716-446655440000' },
   *   );
   * ```
   */
  retrieve(userID: string, params: UserRetrieveParams, options?: RequestOptions): APIPromise<CustomerUser> {
    const { customerId } = params;
    return this._client.get(path`/v2/organizations/${customerId}/users/${userID}`, options);
  }

  /**
   * Retrieves all users associated with an organization or sender profile. Requires
   * appropriate permissions. Supports pagination.
   *
   * @example
   * ```ts
   * const users = await client.organizations.users.list(
   *   '550e8400-e29b-41d4-a716-446655440000',
   *   { page: 0, pageSize: 0 },
   * );
   * ```
   */
  list(customerID: string, query: UserListParams, options?: RequestOptions): APIPromise<UserListResponse> {
    return this._client.get(path`/v2/organizations/${customerID}/users`, { query, ...options });
  }

  /**
   * Removes a user from an organization or sender profile. Requires admin
   * permissions. This action permanently deletes the user association.
   *
   * @example
   * ```ts
   * await client.organizations.users.delete(
   *   '650e8400-e29b-41d4-a716-446655440000',
   *   { customerId: '550e8400-e29b-41d4-a716-446655440000' },
   * );
   * ```
   */
  delete(userID: string, params: UserDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { customerId } = params;
    return this._client.delete(path`/v2/organizations/${customerId}/users/${userID}`, {
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
   * const customerUser =
   *   await client.organizations.users.invite(
   *     '550e8400-e29b-41d4-a716-446655440000',
   *   );
   * ```
   */
  invite(customerID: string, body: UserInviteParams, options?: RequestOptions): APIPromise<CustomerUser> {
    return this._client.post(path`/v2/organizations/${customerID}/users`, { body, ...options });
  }

  /**
   * Updates a user's role within an organization or sender profile. Requires admin
   * permissions. Valid roles are: admin, billing, developer.
   *
   * @example
   * ```ts
   * const customerUser =
   *   await client.organizations.users.updateRole(
   *     '650e8400-e29b-41d4-a716-446655440000',
   *     { customerId: '550e8400-e29b-41d4-a716-446655440000' },
   *   );
   * ```
   */
  updateRole(
    userID: string,
    params: UserUpdateRoleParams,
    options?: RequestOptions,
  ): APIPromise<CustomerUser> {
    const { customerId, ...body } = params;
    return this._client.put(path`/v2/organizations/${customerId}/users/${userID}`, { body, ...options });
  }
}

export interface CustomerUser {
  /**
   * Unique identifier
   */
  id?: string;

  createdAt?: string;

  customerId?: string;

  email?: string;

  invitationSentAt?: string | null;

  invitationToken?: string | null;

  invitationTokenExpiresAt?: string | null;

  lastLoginAt?: string | null;

  name?: string;

  role?: string;

  status?: string;

  updatedAt?: string | null;
}

export interface UserListResponse {
  page?: number;

  pageSize?: number;

  totalCount?: number;

  users?: Array<CustomerUser>;
}

export interface UserRetrieveParams {
  customerId: string;
}

export interface UserListParams {
  page: number;

  pageSize: number;
}

export interface UserDeleteParams {
  customerId: string;
}

export interface UserInviteParams {
  email?: string;

  invitedBy?: string | null;

  name?: string;

  role?: string;
}

export interface UserUpdateRoleParams {
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
    type CustomerUser as CustomerUser,
    type UserListResponse as UserListResponse,
    type UserRetrieveParams as UserRetrieveParams,
    type UserListParams as UserListParams,
    type UserDeleteParams as UserDeleteParams,
    type UserInviteParams as UserInviteParams,
    type UserUpdateRoleParams as UserUpdateRoleParams,
  };
}
