// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as UsersAPI from './users';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Invite, update, and manage organization users and roles
 */
export class Users extends APIResource {
  /**
   * Retrieves detailed information about a specific user in an organization or
   * profile. Requires developer role or higher.
   *
   * @example
   * ```ts
   * const apiResponseOfUser = await client.users.retrieve(
   *   'userId',
   * );
   * ```
   */
  retrieve(
    userID: string,
    params: UserRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseOfUser> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/users/${userID}`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves all users who have access to the organization or profile identified by
   * the API key, including their roles and status. Shows invited users (pending
   * acceptance) and active users. Requires developer role or higher.
   *
   * @example
   * ```ts
   * const users = await client.users.list();
   * ```
   */
  list(
    params: UserListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UserListResponse> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get('/v3/users', {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Sends an invitation to a user to join the organization or profile with a
   * specific role. Requires admin role. The user will receive an invitation email
   * with a token to accept. Invitation tokens expire after 7 days.
   *
   * @example
   * ```ts
   * const apiResponseOfUser = await client.users.invite();
   * ```
   */
  invite(params: UserInviteParams, options?: RequestOptions): APIPromise<APIResponseOfUser> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post('/v3/users', {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined),
          ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Removes a user's access to an organization or profile. Requires admin role. You
   * cannot remove yourself or remove the last admin.
   *
   * @example
   * ```ts
   * await client.users.remove('userId', { body: {} });
   * ```
   */
  remove(userID: string, params: UserRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { body, 'x-profile-id': xProfileID } = params;
    return this._client.delete(path`/v3/users/${userID}`, {
      body: body,
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Updates a user's role in the organization or profile. Requires admin role. You
   * cannot change your own role or demote the last admin.
   *
   * @example
   * ```ts
   * const apiResponseOfUser = await client.users.updateRole(
   *   'userId',
   * );
   * ```
   */
  updateRole(
    userID: string,
    params: UserUpdateRoleParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfUser> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.patch(path`/v3/users/${userID}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined),
          ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfUser {
  /**
   * The response data (null if error)
   */
  data?: UserResponse | null;

  /**
   * Error details (null if successful)
   */
  error?: WebhooksAPI.APIError | null;

  /**
   * Metadata about the request and response
   */
  meta?: WebhooksAPI.APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

/**
 * User response for v3 API
 */
export interface UserResponse {
  /**
   * User unique identifier
   */
  id?: string;

  /**
   * When the user was added to the organization
   */
  created_at?: string;

  /**
   * User email address
   */
  email?: string;

  /**
   * When the user was invited
   */
  invited_at?: string | null;

  /**
   * When the user last logged in
   */
  last_login_at?: string | null;

  /**
   * User full name
   */
  name?: string;

  /**
   * User role in the organization: admin, billing, developer
   */
  role?: string;

  /**
   * User status: active, invited, suspended, rejected
   */
  status?: string;

  /**
   * When the user record was last updated
   */
  updated_at?: string | null;
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface UserListResponse {
  /**
   * The response data (null if error)
   */
  data?: UserListResponse.Data | null;

  /**
   * Error details (null if successful)
   */
  error?: WebhooksAPI.APIError | null;

  /**
   * Metadata about the request and response
   */
  meta?: WebhooksAPI.APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace UserListResponse {
  /**
   * The response data (null if error)
   */
  export interface Data {
    /**
     * List of users in the organization
     */
    users?: Array<UsersAPI.UserResponse>;
  }
}

export interface UserRetrieveParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface UserListParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface UserInviteParams {
  /**
   * Body param: User email address (required)
   */
  email?: string;

  /**
   * Body param: User full name (required)
   */
  name?: string;

  /**
   * Body param: User role: admin, billing, or developer (required)
   */
  role?: string;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Header param: Unique key to ensure idempotent request processing. Must be 1-255
   * alphanumeric characters, hyphens, or underscores. Responses are cached for 24
   * hours per key per customer.
   */
  'Idempotency-Key'?: string;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface UserRemoveParams {
  /**
   * Body param: Request to remove a user from an organization
   */
  body: UserRemoveParams.Body;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export namespace UserRemoveParams {
  /**
   * Request to remove a user from an organization
   */
  export interface Body extends WebhooksAPI.MutationRequestBase {}
}

export interface UserUpdateRoleParams {
  /**
   * Body param: User role: admin, billing, or developer (required)
   */
  role?: string;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Header param: Unique key to ensure idempotent request processing. Must be 1-255
   * alphanumeric characters, hyphens, or underscores. Responses are cached for 24
   * hours per key per customer.
   */
  'Idempotency-Key'?: string;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export declare namespace Users {
  export {
    type APIResponseOfUser as APIResponseOfUser,
    type UserResponse as UserResponse,
    type UserListResponse as UserListResponse,
    type UserRetrieveParams as UserRetrieveParams,
    type UserListParams as UserListParams,
    type UserInviteParams as UserInviteParams,
    type UserRemoveParams as UserRemoveParams,
    type UserUpdateRoleParams as UserUpdateRoleParams,
  };
}
