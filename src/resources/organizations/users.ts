// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ProfilesUsersAPI from '../profiles/users';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Users extends APIResource {
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

export interface UserCreateOrInviteParams {
  email?: string;

  invitedBy?: string | null;

  name?: string;

  role?: string;
}

export interface UserDeleteByCustomerParams {
  customerId: string;
}

export interface UserListByCustomerParams {
  page: number;

  pageSize: number;
}

export interface UserRetrieveByCustomerParams {
  customerId: string;
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
    type UserCreateOrInviteParams as UserCreateOrInviteParams,
    type UserDeleteByCustomerParams as UserDeleteByCustomerParams,
    type UserListByCustomerParams as UserListByCustomerParams,
    type UserRetrieveByCustomerParams as UserRetrieveByCustomerParams,
    type UserUpdateRoleByCustomerParams as UserUpdateRoleByCustomerParams,
  };
}
