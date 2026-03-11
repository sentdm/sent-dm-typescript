// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Configure webhook endpoints for real-time event delivery
 */
export class Webhooks extends APIResource {
  /**
   * Creates a new webhook endpoint for the authenticated customer.
   *
   * @example
   * ```ts
   * const apiResponseWebhook = await client.webhooks.create();
   * ```
   */
  create(params: WebhookCreateParams, options?: RequestOptions): APIPromise<APIResponseWebhook> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post('/v3/webhooks', {
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
   * Retrieves a single webhook by ID for the authenticated customer.
   *
   * @example
   * ```ts
   * const apiResponseWebhook = await client.webhooks.retrieve(
   *   'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',
   * );
   * ```
   */
  retrieve(
    id: string,
    params: WebhookRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseWebhook> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/webhooks/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Updates an existing webhook for the authenticated customer.
   *
   * @example
   * ```ts
   * const apiResponseWebhook = await client.webhooks.update(
   *   'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',
   * );
   * ```
   */
  update(id: string, params: WebhookUpdateParams, options?: RequestOptions): APIPromise<APIResponseWebhook> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.put(path`/v3/webhooks/${id}`, {
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
   * Retrieves a paginated list of webhooks for the authenticated customer.
   *
   * @example
   * ```ts
   * const webhooks = await client.webhooks.list({
   *   page: 0,
   *   page_size: 0,
   * });
   * ```
   */
  list(params: WebhookListParams, options?: RequestOptions): APIPromise<WebhookListResponse> {
    const { 'x-profile-id': xProfileID, ...query } = params;
    return this._client.get('/v3/webhooks', {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Deletes a webhook for the authenticated customer.
   *
   * @example
   * ```ts
   * await client.webhooks.delete(
   *   'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',
   * );
   * ```
   */
  delete(
    id: string,
    params: WebhookDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.delete(path`/v3/webhooks/${id}`, {
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves all available webhook event types that can be subscribed to.
   *
   * @example
   * ```ts
   * const response = await client.webhooks.listEventTypes();
   * ```
   */
  listEventTypes(
    params: WebhookListEventTypesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookListEventTypesResponse> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get('/v3/webhooks/event-types', {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves a paginated list of delivery events for the specified webhook.
   *
   * @example
   * ```ts
   * const response = await client.webhooks.listEvents(
   *   'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',
   *   { page: 0, page_size: 0 },
   * );
   * ```
   */
  listEvents(
    id: string,
    params: WebhookListEventsParams,
    options?: RequestOptions,
  ): APIPromise<WebhookListEventsResponse> {
    const { 'x-profile-id': xProfileID, ...query } = params;
    return this._client.get(path`/v3/webhooks/${id}/events`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Generates a new signing secret for the specified webhook. The old secret is
   * immediately invalidated.
   *
   * @example
   * ```ts
   * const response = await client.webhooks.rotateSecret(
   *   'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',
   *   { body: {} },
   * );
   * ```
   */
  rotateSecret(
    id: string,
    params: WebhookRotateSecretParams,
    options?: RequestOptions,
  ): APIPromise<WebhookRotateSecretResponse> {
    const { body, 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID } = params;
    return this._client.post(path`/v3/webhooks/${id}/rotate-secret`, {
      body: body,
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
   * Sends a test event to the specified webhook endpoint to verify connectivity.
   *
   * @example
   * ```ts
   * const response = await client.webhooks.test(
   *   'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',
   * );
   * ```
   */
  test(id: string, params: WebhookTestParams, options?: RequestOptions): APIPromise<WebhookTestResponse> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post(path`/v3/webhooks/${id}/test`, {
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
   * Activates or deactivates a webhook for the authenticated customer.
   *
   * @example
   * ```ts
   * const apiResponseWebhook =
   *   await client.webhooks.toggleStatus(
   *     'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',
   *   );
   * ```
   */
  toggleStatus(
    id: string,
    params: WebhookToggleStatusParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseWebhook> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.patch(path`/v3/webhooks/${id}/toggle-status`, {
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
 * Error information
 */
export interface APIError {
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
export interface APIMeta {
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

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseWebhook {
  /**
   * The response data (null if error)
   */
  data?: WebhookResponse | null;

  /**
   * Error details (null if successful)
   */
  error?: APIError | null;

  /**
   * Metadata about the request and response
   */
  meta?: APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export interface MutationRequestBase {
  /**
   * Sandbox flag - when true, the operation is simulated without side effects Useful
   * for testing integrations without actual execution
   */
  sandbox?: boolean;
}

/**
 * Pagination metadata for list responses
 */
export interface PaginationMeta {
  /**
   * Cursor-based pagination (optional)
   */
  cursors?: PaginationMeta.Cursors | null;

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

export namespace PaginationMeta {
  /**
   * Cursor-based pagination (optional)
   */
  export interface Cursors {
    /**
     * Cursor to fetch the next page
     */
    after?: string | null;

    /**
     * Cursor to fetch the previous page
     */
    before?: string | null;
  }
}

export interface WebhookResponse {
  id?: string;

  consecutive_failures?: number;

  created_at?: string;

  display_name?: string;

  endpoint_url?: string;

  event_types?: Array<string>;

  is_active?: boolean;

  last_delivery_attempt_at?: string | null;

  last_successful_delivery_at?: string | null;

  retry_count?: number;

  signing_secret?: string | null;

  timeout_seconds?: number;

  updated_at?: string | null;
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface WebhookListResponse {
  /**
   * The response data (null if error)
   */
  data?: WebhookListResponse.Data | null;

  /**
   * Error details (null if successful)
   */
  error?: APIError | null;

  /**
   * Metadata about the request and response
   */
  meta?: APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace WebhookListResponse {
  /**
   * The response data (null if error)
   */
  export interface Data {
    /**
     * Pagination metadata for list responses
     */
    pagination?: WebhooksAPI.PaginationMeta;

    webhooks?: Array<WebhooksAPI.WebhookResponse>;
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface WebhookListEventTypesResponse {
  /**
   * The response data (null if error)
   */
  data?: WebhookListEventTypesResponse.Data | null;

  /**
   * Error details (null if successful)
   */
  error?: APIError | null;

  /**
   * Metadata about the request and response
   */
  meta?: APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace WebhookListEventTypesResponse {
  /**
   * The response data (null if error)
   */
  export interface Data {
    event_types?: Array<Data.EventType>;
  }

  export namespace Data {
    export interface EventType {
      description?: string | null;

      display_name?: string;

      is_active?: boolean;

      name?: string;
    }
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface WebhookListEventsResponse {
  /**
   * The response data (null if error)
   */
  data?: WebhookListEventsResponse.Data | null;

  /**
   * Error details (null if successful)
   */
  error?: APIError | null;

  /**
   * Metadata about the request and response
   */
  meta?: APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace WebhookListEventsResponse {
  /**
   * The response data (null if error)
   */
  export interface Data {
    events?: Array<Data.Event>;

    /**
     * Pagination metadata for list responses
     */
    pagination?: WebhooksAPI.PaginationMeta;
  }

  export namespace Data {
    export interface Event {
      id?: string;

      created_at?: string;

      delivery_attempts?: number;

      delivery_status?: string;

      error_message?: string | null;

      event_data?: unknown;

      event_type?: string;

      http_status_code?: number | null;

      processing_completed_at?: string | null;

      processing_started_at?: string | null;

      response_body?: string | null;
    }
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface WebhookRotateSecretResponse {
  /**
   * The response data (null if error)
   */
  data?: WebhookRotateSecretResponse.Data | null;

  /**
   * Error details (null if successful)
   */
  error?: APIError | null;

  /**
   * Metadata about the request and response
   */
  meta?: APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace WebhookRotateSecretResponse {
  /**
   * The response data (null if error)
   */
  export interface Data {
    signing_secret?: string;
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface WebhookTestResponse {
  /**
   * The response data (null if error)
   */
  data?: WebhookTestResponse.Data | null;

  /**
   * Error details (null if successful)
   */
  error?: APIError | null;

  /**
   * Metadata about the request and response
   */
  meta?: APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace WebhookTestResponse {
  /**
   * The response data (null if error)
   */
  export interface Data {
    message?: string;

    success?: boolean;
  }
}

export interface WebhookCreateParams {
  /**
   * Body param
   */
  display_name?: string;

  /**
   * Body param
   */
  endpoint_url?: string;

  /**
   * Body param
   */
  event_types?: Array<string>;

  /**
   * Body param
   */
  retry_count?: number;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param
   */
  timeout_seconds?: number;

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

export interface WebhookRetrieveParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface WebhookUpdateParams {
  /**
   * Body param
   */
  display_name?: string;

  /**
   * Body param
   */
  endpoint_url?: string;

  /**
   * Body param
   */
  event_types?: Array<string>;

  /**
   * Body param
   */
  retry_count?: number;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param
   */
  timeout_seconds?: number;

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

export interface WebhookListParams {
  /**
   * Query param
   */
  page: number;

  /**
   * Query param
   */
  page_size: number;

  /**
   * Query param
   */
  is_active?: boolean | null;

  /**
   * Query param
   */
  search?: string | null;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface WebhookDeleteParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface WebhookListEventTypesParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface WebhookListEventsParams {
  /**
   * Query param
   */
  page: number;

  /**
   * Query param
   */
  page_size: number;

  /**
   * Query param
   */
  search?: string | null;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface WebhookRotateSecretParams {
  /**
   * Body param
   */
  body: WebhookRotateSecretParams.Body;

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

export namespace WebhookRotateSecretParams {
  export interface Body extends WebhooksAPI.MutationRequestBase {}
}

export interface WebhookTestParams {
  /**
   * Body param
   */
  event_type?: string;

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

export interface WebhookToggleStatusParams {
  /**
   * Body param
   */
  is_active?: boolean;

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

export declare namespace Webhooks {
  export {
    type APIError as APIError,
    type APIMeta as APIMeta,
    type APIResponseWebhook as APIResponseWebhook,
    type MutationRequestBase as MutationRequestBase,
    type PaginationMeta as PaginationMeta,
    type WebhookResponse as WebhookResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookListEventTypesResponse as WebhookListEventTypesResponse,
    type WebhookListEventsResponse as WebhookListEventsResponse,
    type WebhookRotateSecretResponse as WebhookRotateSecretResponse,
    type WebhookTestResponse as WebhookTestResponse,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookRetrieveParams as WebhookRetrieveParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListParams as WebhookListParams,
    type WebhookDeleteParams as WebhookDeleteParams,
    type WebhookListEventTypesParams as WebhookListEventTypesParams,
    type WebhookListEventsParams as WebhookListEventsParams,
    type WebhookRotateSecretParams as WebhookRotateSecretParams,
    type WebhookTestParams as WebhookTestParams,
    type WebhookToggleStatusParams as WebhookToggleStatusParams,
  };
}
