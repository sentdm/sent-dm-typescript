// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Users extends APIResource {
  /**
   * Retrieves a specific user by ID. Requires profile-scoped API key.
   *
   * @example
   * ```ts
   * const customerUserDto =
   *   await client.profiles.users.retrieve('userId', {
   *     profileId: 'profileId',
   *   });
   * ```
   */
  retrieve(
    userID: string,
    params: UserRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<CustomerUserDto> {
    const { profileId } = params;
    return this._client.get(path`/v3/profiles/${profileId}/users/${userID}`, options);
  }

  /**
   * Retrieves all users associated with a profile. Requires profile-scoped API key.
   * Supports pagination.
   *
   * @example
   * ```ts
   * const userListResponse = await client.profiles.users.list(
   *   'profileId',
   *   { page: 0, pageSize: 0 },
   * );
   * ```
   */
  list(profileID: string, query: UserListParams, options?: RequestOptions): APIPromise<UserListResponse> {
    return this._client.get(path`/v3/profiles/${profileID}/users`, { query, ...options });
  }

  /**
   * Removes a user from a profile. Requires profile-scoped API key.
   *
   * @example
   * ```ts
   * await client.profiles.users.delete('userId', {
   *   profileId: 'profileId',
   * });
   * ```
   */
  delete(userID: string, params: UserDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { profileId } = params;
    return this._client.delete(path`/v3/profiles/${profileId}/users/${userID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Sends an invitation to a user to join a profile with a specified role. Requires
   * profile-scoped API key. If the user already exists with 'invited' status,
   * resends the invitation with a new token.
   *
   * @example
   * ```ts
   * const inviteUserResponse =
   *   await client.profiles.users.invite('profileId');
   * ```
   */
  invite(
    profileID: string,
    body: UserInviteParams,
    options?: RequestOptions,
  ): APIPromise<InviteUserResponse> {
    return this._client.post(path`/v3/profiles/${profileID}/users/invite`, { body, ...options });
  }

  /**
   * Updates a user's role within a profile. Requires profile-scoped API key.
   *
   * @example
   * ```ts
   * await client.profiles.users.updateRole('userId', {
   *   profileId: 'profileId',
   * });
   * ```
   */
  updateRole(userID: string, params: UserUpdateRoleParams, options?: RequestOptions): APIPromise<void> {
    const { profileId, ...body } = params;
    return this._client.put(path`/v3/profiles/${profileId}/users/${userID}/role`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface BaseDto {
  /**
   * Unique identifier
   */
  id?: string;

  createdAt?: string;

  updatedAt?: string | null;
}

export interface CustomerUserDto extends BaseDto {
  customerId?: string;

  email?: string;

  invitationSentAt?: string | null;

  invitationToken?: string | null;

  invitationTokenExpiresAt?: string | null;

  lastLoginAt?: string | null;

  name?: string;

  role?: string;

  status?: string;
}

export interface InviteUserRequest {
  email?: string;

  name?: string;

  role?: string;
}

export interface InviteUserResponse {
  email?: string;

  invitationExpiresAt?: string;

  invitationToken?: string;

  invitationUrl?: string;

  isResend?: boolean;

  name?: string;

  role?: string;

  status?: string;

  userId?: string;
}

export interface UpdateUserRoleRequest {
  role?: string;
}

export interface UserListResponse {
  items?: Array<CustomerUserDto>;

  page?: number;

  pageSize?: number;

  totalCount?: number;

  totalPages?: number;
}

export interface UserRetrieveParams {
  profileId: string;
}

export interface UserListParams {
  page: number;

  pageSize: number;
}

export interface UserDeleteParams {
  profileId: string;
}

export interface UserInviteParams {
  email?: string;

  name?: string;

  role?: string;
}

export interface UserUpdateRoleParams {
  /**
   * Path param
   */
  profileId: string;

  /**
   * Body param
   */
  role?: string;
}

export declare namespace Users {
  export {
    type BaseDto as BaseDto,
    type CustomerUserDto as CustomerUserDto,
    type InviteUserRequest as InviteUserRequest,
    type InviteUserResponse as InviteUserResponse,
    type UpdateUserRoleRequest as UpdateUserRoleRequest,
    type UserListResponse as UserListResponse,
    type UserRetrieveParams as UserRetrieveParams,
    type UserListParams as UserListParams,
    type UserDeleteParams as UserDeleteParams,
    type UserInviteParams as UserInviteParams,
    type UserUpdateRoleParams as UserUpdateRoleParams,
  };
}
