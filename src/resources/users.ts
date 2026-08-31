// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * The people who can sign in to your organization, and what each may do.
 *
 * Users are dashboard access and nothing else — they do not send, and removing one does not affect traffic. An API key is not a user: it belongs to the organization or to a sender profile, so revoking a person's access leaves your integration running.
 */
export class Users extends APIResource {
  /**
   * Retrieves detailed information about a specific user in an organization or
   * profile. Requires developer role or higher.
   *
   * @example
   * ```ts
   * const user = await client.users.retrieve(
   *   '880e8400-e29b-41d4-a716-446655440003',
   * );
   * ```
   */
  retrieve(
    userID: string,
    params: UserRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UserRetrieveResponse> {
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
   * const response = await client.users.invite();
   * ```
   */
  invite(params: UserInviteParams, options?: RequestOptions): APIPromise<UserInviteResponse> {
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
   * await client.users.remove(
   *   'aa0e8400-e29b-41d4-a716-446655440005',
   * );
   * ```
   */
  remove(userID: string, params: UserRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { 'x-profile-id': xProfileID, ...body } = params;
    return this._client.delete(path`/v3/users/${userID}`, {
      body,
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
   * const response = await client.users.updateRole(
   *   'aa0e8400-e29b-41d4-a716-446655440005',
   * );
   * ```
   */
  updateRole(
    userID: string,
    params: UserUpdateRoleParams,
    options?: RequestOptions,
  ): APIPromise<UserUpdateRoleResponse> {
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
export interface UserRetrieveResponse {
  /**
   * User response for v3 API
   */
  data?: UserRetrieveResponse.Data | null;

  /**
   * Error information
   */
  error?: UserRetrieveResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: UserRetrieveResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace UserRetrieveResponse {
  /**
   * User response for v3 API
   */
  export interface Data {
    /**
     * User unique identifier
     */
    id?: string;

    /**
     * When the user was added to the organization
     */
    created_at?: string;

    /**
     * Which customer owns this — the key's own, or the profile named in x-profile-id.
     * Says whose resource this is, which the resource's own id does not.
     */
    customer_id?: string;

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
   * Error information
   */
  export interface Error {
    /**
     * Machine-readable error code (e.g., "RESOURCE_001")
     */
    code?: string;

    /**
     * Additional validation error details (field-level errors)
     */
    details?: { [key: string]: Array<string> } | null;

    /**
     * URL to documentation about this error
     */
    doc_url?: string | null;

    /**
     * Human-readable error message
     */
    message?: string;
  }

  /**
   * Request and response metadata
   */
  export interface Meta {
    /**
     * Unique identifier for this request (for tracing and support)
     */
    request_id?: string;

    /**
     * Server timestamp when the response was generated
     */
    timestamp?: string;

    /**
     * API version used for this request
     */
    version?: string;
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface UserListResponse {
  /**
   * The users in the organization.
   */
  data?: UserListResponse.Data | null;

  /**
   * Error information
   */
  error?: UserListResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: UserListResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace UserListResponse {
  /**
   * The users in the organization.
   */
  export interface Data {
    /**
     * Pagination metadata for list responses
     */
    pagination?: Data.Pagination;

    /**
     * The users on this page.
     */
    users?: Array<Data.User>;
  }

  export namespace Data {
    /**
     * Pagination metadata for list responses
     */
    export interface Pagination {
      /**
       * @deprecated Cursor-based pagination. Never populated — see Cursors.
       */
      cursors?: Pagination.Cursors | null;

      /**
       * Whether there are more pages after this one
       */
      has_more?: boolean;

      /**
       * Current page number (1-indexed)
       */
      page?: number;

      /**
       * Number of items per page
       */
      page_size?: number;

      /**
       * Total number of items across all pages
       */
      total_count?: number;

      /**
       * Total number of pages
       */
      total_pages?: number;
    }

    export namespace Pagination {
      /**
       * @deprecated Cursor-based pagination. Never populated — see Cursors.
       */
      export interface Cursors {
        /**
         * Cursor to fetch the next page.
         */
        after?: string | null;

        /**
         * Cursor to fetch the previous page.
         */
        before?: string | null;
      }
    }

    /**
     * User response for v3 API
     */
    export interface User {
      /**
       * User unique identifier
       */
      id?: string;

      /**
       * When the user was added to the organization
       */
      created_at?: string;

      /**
       * Which customer owns this — the key's own, or the profile named in x-profile-id.
       * Says whose resource this is, which the resource's own id does not.
       */
      customer_id?: string;

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
  }

  /**
   * Error information
   */
  export interface Error {
    /**
     * Machine-readable error code (e.g., "RESOURCE_001")
     */
    code?: string;

    /**
     * Additional validation error details (field-level errors)
     */
    details?: { [key: string]: Array<string> } | null;

    /**
     * URL to documentation about this error
     */
    doc_url?: string | null;

    /**
     * Human-readable error message
     */
    message?: string;
  }

  /**
   * Request and response metadata
   */
  export interface Meta {
    /**
     * Unique identifier for this request (for tracing and support)
     */
    request_id?: string;

    /**
     * Server timestamp when the response was generated
     */
    timestamp?: string;

    /**
     * API version used for this request
     */
    version?: string;
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface UserInviteResponse {
  /**
   * User response for v3 API
   */
  data?: UserInviteResponse.Data | null;

  /**
   * Error information
   */
  error?: UserInviteResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: UserInviteResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace UserInviteResponse {
  /**
   * User response for v3 API
   */
  export interface Data {
    /**
     * User unique identifier
     */
    id?: string;

    /**
     * When the user was added to the organization
     */
    created_at?: string;

    /**
     * Which customer owns this — the key's own, or the profile named in x-profile-id.
     * Says whose resource this is, which the resource's own id does not.
     */
    customer_id?: string;

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
   * Error information
   */
  export interface Error {
    /**
     * Machine-readable error code (e.g., "RESOURCE_001")
     */
    code?: string;

    /**
     * Additional validation error details (field-level errors)
     */
    details?: { [key: string]: Array<string> } | null;

    /**
     * URL to documentation about this error
     */
    doc_url?: string | null;

    /**
     * Human-readable error message
     */
    message?: string;
  }

  /**
   * Request and response metadata
   */
  export interface Meta {
    /**
     * Unique identifier for this request (for tracing and support)
     */
    request_id?: string;

    /**
     * Server timestamp when the response was generated
     */
    timestamp?: string;

    /**
     * API version used for this request
     */
    version?: string;
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface UserUpdateRoleResponse {
  /**
   * User response for v3 API
   */
  data?: UserUpdateRoleResponse.Data | null;

  /**
   * Error information
   */
  error?: UserUpdateRoleResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: UserUpdateRoleResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace UserUpdateRoleResponse {
  /**
   * User response for v3 API
   */
  export interface Data {
    /**
     * User unique identifier
     */
    id?: string;

    /**
     * When the user was added to the organization
     */
    created_at?: string;

    /**
     * Which customer owns this — the key's own, or the profile named in x-profile-id.
     * Says whose resource this is, which the resource's own id does not.
     */
    customer_id?: string;

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
   * Error information
   */
  export interface Error {
    /**
     * Machine-readable error code (e.g., "RESOURCE_001")
     */
    code?: string;

    /**
     * Additional validation error details (field-level errors)
     */
    details?: { [key: string]: Array<string> } | null;

    /**
     * URL to documentation about this error
     */
    doc_url?: string | null;

    /**
     * Human-readable error message
     */
    message?: string;
  }

  /**
   * Request and response metadata
   */
  export interface Meta {
    /**
     * Unique identifier for this request (for tracing and support)
     */
    request_id?: string;

    /**
     * Server timestamp when the response was generated
     */
    timestamp?: string;

    /**
     * API version used for this request
     */
    version?: string;
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
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
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
    type UserRetrieveResponse as UserRetrieveResponse,
    type UserListResponse as UserListResponse,
    type UserInviteResponse as UserInviteResponse,
    type UserUpdateRoleResponse as UserUpdateRoleResponse,
    type UserRetrieveParams as UserRetrieveParams,
    type UserListParams as UserListParams,
    type UserInviteParams as UserInviteParams,
    type UserRemoveParams as UserRemoveParams,
    type UserUpdateRoleParams as UserUpdateRoleParams,
  };
}
