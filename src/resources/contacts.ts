// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * The people you message, and their channel identities.
 *
 * A contact holds one identity per channel — a phone number, a WhatsApp number — so routing can choose between them for the same person. Opt-out is recorded against the contact and honoured on every send, whichever channel it came through.
 *
 * `GET /v3/contacts/{id}/message-summary` is the per-contact view of what you have sent and what happened to it.
 */
export class Contacts extends APIResource {
  /**
   * Creates a new contact by phone number and associates it with the authenticated
   * customer.
   *
   * @example
   * ```ts
   * const contact = await client.contacts.create({
   *   phone_number: '+1234567890',
   * });
   * ```
   */
  create(params: ContactCreateParams, options?: RequestOptions): APIPromise<ContactCreateResponse> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post('/v3/contacts', {
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
   * Retrieves a specific contact by their unique identifier. Returns detailed
   * contact information including phone formats, available channels, and opt-out
   * status.
   *
   * @example
   * ```ts
   * const contact = await client.contacts.retrieve(
   *   '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
   * );
   * ```
   */
  retrieve(
    id: string,
    params: ContactRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactRetrieveResponse> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/contacts/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Updates a contact's default channel and/or opt-out status.
   *
   * @example
   * ```ts
   * const contact = await client.contacts.update(
   *   '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
   * );
   * ```
   */
  update(
    id: string,
    params: ContactUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ContactUpdateResponse> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.patch(path`/v3/contacts/${id}`, {
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
   * Retrieves a paginated list of contacts for the authenticated customer. Supports
   * filtering by search term, channel, or phone number.
   *
   * @example
   * ```ts
   * const contacts = await client.contacts.list({
   *   page: 0,
   *   page_size: 0,
   * });
   * ```
   */
  list(params: ContactListParams, options?: RequestOptions): APIPromise<ContactListResponse> {
    const { 'x-profile-id': xProfileID, ...query } = params;
    return this._client.get('/v3/contacts', {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * **Deprecated.** Use `PATCH /v3/contacts/{id}` with `{"opt_out": true}` instead,
   * and expect this to be removed in a future release. It still behaves exactly as
   * before, so nothing needs to change today.
   *
   * Opting a contact out stops every send to them, which is what deleting one was
   * mostly used for — and it keeps the record of who they were and that they asked.
   * A delete discards the consent history along with the contact, which is the part
   * you need if anyone ever asks why you stopped, or why you started again.
   *
   * Dissociates a contact from the authenticated customer.
   *
   * @deprecated
   */
  delete(id: string, params: ContactDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { 'x-profile-id': xProfileID, ...body } = params;
    return this._client.delete(path`/v3/contacts/${id}`, {
      body,
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Returns aggregate message counts, time bounds, channels used, and per-channel
   * success/fail scores (each as a percentage 0-100 of messages on that channel) for
   * one of your contacts. Successful terminal states: SENT/DELIVERED/READ for
   * outbound, RECEIVED for inbound. Fail: FAILED.
   *
   * @example
   * ```ts
   * const response =
   *   await client.contacts.retrieveMessageSummary(
   *     '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
   *   );
   * ```
   */
  retrieveMessageSummary(
    contactID: string,
    params: ContactRetrieveMessageSummaryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactRetrieveMessageSummaryResponse> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/contacts/${contactID}/message-summary`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface ContactCreateResponse {
  /**
   * Contact response for v3 API Uses snake_case for JSON property names
   */
  data?: ContactCreateResponse.Data | null;

  /**
   * Error information
   */
  error?: ContactCreateResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: ContactCreateResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace ContactCreateResponse {
  /**
   * Contact response for v3 API Uses snake_case for JSON property names
   */
  export interface Data {
    /**
     * Unique identifier for the contact
     */
    id?: string;

    /**
     * Comma-separated list of available messaging channels (e.g., "sms,whatsapp")
     */
    available_channels?: string;

    /**
     * Country calling code (e.g., 1 for US/Canada)
     */
    country_code?: string;

    /**
     * When the contact was created
     */
    created_at?: string;

    /**
     * Which customer owns this — the key's own, or the profile named in x-profile-id.
     * Says whose resource this is, which the resource's own id does not.
     */
    customer_id?: string;

    /**
     * Default messaging channel to use (e.g., "sms" or "whatsapp")
     */
    default_channel?: string;

    /**
     * Phone number in E.164 format (e.g., +1234567890)
     */
    format_e164?: string;

    /**
     * Phone number in international format (e.g., +1 234-567-890)
     */
    format_international?: string;

    /**
     * Phone number in national format (e.g., (234) 567-890)
     */
    format_national?: string;

    /**
     * Phone number in RFC 3966 format (e.g., tel:+1-234-567-890)
     */
    format_rfc?: string;

    /**
     * @deprecated Always false. Contacts are no longer shared or inherited between
     * sender profiles — a profile sees only the contacts it owns. Retained so existing
     * v3 clients reading is_inherited keep deserializing; it carries no information.
     */
    is_inherited?: boolean;

    /**
     * Whether the contact has opted out of messaging. Single source of truth — opt-out
     * is per-contact, not per-channel.
     */
    opt_out?: boolean;

    /**
     * Phone number in original format
     */
    phone_number?: string;

    /**
     * ISO 3166-1 alpha-2 country code (e.g., US, CA, GB)
     */
    region_code?: string;

    /**
     * When the contact was last updated
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
export interface ContactRetrieveResponse {
  /**
   * Contact response for v3 API Uses snake_case for JSON property names
   */
  data?: ContactRetrieveResponse.Data | null;

  /**
   * Error information
   */
  error?: ContactRetrieveResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: ContactRetrieveResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace ContactRetrieveResponse {
  /**
   * Contact response for v3 API Uses snake_case for JSON property names
   */
  export interface Data {
    /**
     * Unique identifier for the contact
     */
    id?: string;

    /**
     * Comma-separated list of available messaging channels (e.g., "sms,whatsapp")
     */
    available_channels?: string;

    /**
     * Country calling code (e.g., 1 for US/Canada)
     */
    country_code?: string;

    /**
     * When the contact was created
     */
    created_at?: string;

    /**
     * Which customer owns this — the key's own, or the profile named in x-profile-id.
     * Says whose resource this is, which the resource's own id does not.
     */
    customer_id?: string;

    /**
     * Default messaging channel to use (e.g., "sms" or "whatsapp")
     */
    default_channel?: string;

    /**
     * Phone number in E.164 format (e.g., +1234567890)
     */
    format_e164?: string;

    /**
     * Phone number in international format (e.g., +1 234-567-890)
     */
    format_international?: string;

    /**
     * Phone number in national format (e.g., (234) 567-890)
     */
    format_national?: string;

    /**
     * Phone number in RFC 3966 format (e.g., tel:+1-234-567-890)
     */
    format_rfc?: string;

    /**
     * @deprecated Always false. Contacts are no longer shared or inherited between
     * sender profiles — a profile sees only the contacts it owns. Retained so existing
     * v3 clients reading is_inherited keep deserializing; it carries no information.
     */
    is_inherited?: boolean;

    /**
     * Whether the contact has opted out of messaging. Single source of truth — opt-out
     * is per-contact, not per-channel.
     */
    opt_out?: boolean;

    /**
     * Phone number in original format
     */
    phone_number?: string;

    /**
     * ISO 3166-1 alpha-2 country code (e.g., US, CA, GB)
     */
    region_code?: string;

    /**
     * When the contact was last updated
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
export interface ContactUpdateResponse {
  /**
   * Contact response for v3 API Uses snake_case for JSON property names
   */
  data?: ContactUpdateResponse.Data | null;

  /**
   * Error information
   */
  error?: ContactUpdateResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: ContactUpdateResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace ContactUpdateResponse {
  /**
   * Contact response for v3 API Uses snake_case for JSON property names
   */
  export interface Data {
    /**
     * Unique identifier for the contact
     */
    id?: string;

    /**
     * Comma-separated list of available messaging channels (e.g., "sms,whatsapp")
     */
    available_channels?: string;

    /**
     * Country calling code (e.g., 1 for US/Canada)
     */
    country_code?: string;

    /**
     * When the contact was created
     */
    created_at?: string;

    /**
     * Which customer owns this — the key's own, or the profile named in x-profile-id.
     * Says whose resource this is, which the resource's own id does not.
     */
    customer_id?: string;

    /**
     * Default messaging channel to use (e.g., "sms" or "whatsapp")
     */
    default_channel?: string;

    /**
     * Phone number in E.164 format (e.g., +1234567890)
     */
    format_e164?: string;

    /**
     * Phone number in international format (e.g., +1 234-567-890)
     */
    format_international?: string;

    /**
     * Phone number in national format (e.g., (234) 567-890)
     */
    format_national?: string;

    /**
     * Phone number in RFC 3966 format (e.g., tel:+1-234-567-890)
     */
    format_rfc?: string;

    /**
     * @deprecated Always false. Contacts are no longer shared or inherited between
     * sender profiles — a profile sees only the contacts it owns. Retained so existing
     * v3 clients reading is_inherited keep deserializing; it carries no information.
     */
    is_inherited?: boolean;

    /**
     * Whether the contact has opted out of messaging. Single source of truth — opt-out
     * is per-contact, not per-channel.
     */
    opt_out?: boolean;

    /**
     * Phone number in original format
     */
    phone_number?: string;

    /**
     * ISO 3166-1 alpha-2 country code (e.g., US, CA, GB)
     */
    region_code?: string;

    /**
     * When the contact was last updated
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
export interface ContactListResponse {
  /**
   * A paginated list of contacts.
   */
  data?: ContactListResponse.Data | null;

  /**
   * Error information
   */
  error?: ContactListResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: ContactListResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace ContactListResponse {
  /**
   * A paginated list of contacts.
   */
  export interface Data {
    /**
     * The contacts on this page.
     */
    contacts?: Array<Data.Contact>;

    /**
     * Pagination metadata for list responses
     */
    pagination?: Data.Pagination;
  }

  export namespace Data {
    /**
     * Contact response for v3 API Uses snake_case for JSON property names
     */
    export interface Contact {
      /**
       * Unique identifier for the contact
       */
      id?: string;

      /**
       * Comma-separated list of available messaging channels (e.g., "sms,whatsapp")
       */
      available_channels?: string;

      /**
       * Country calling code (e.g., 1 for US/Canada)
       */
      country_code?: string;

      /**
       * When the contact was created
       */
      created_at?: string;

      /**
       * Which customer owns this — the key's own, or the profile named in x-profile-id.
       * Says whose resource this is, which the resource's own id does not.
       */
      customer_id?: string;

      /**
       * Default messaging channel to use (e.g., "sms" or "whatsapp")
       */
      default_channel?: string;

      /**
       * Phone number in E.164 format (e.g., +1234567890)
       */
      format_e164?: string;

      /**
       * Phone number in international format (e.g., +1 234-567-890)
       */
      format_international?: string;

      /**
       * Phone number in national format (e.g., (234) 567-890)
       */
      format_national?: string;

      /**
       * Phone number in RFC 3966 format (e.g., tel:+1-234-567-890)
       */
      format_rfc?: string;

      /**
       * @deprecated Always false. Contacts are no longer shared or inherited between
       * sender profiles — a profile sees only the contacts it owns. Retained so existing
       * v3 clients reading is_inherited keep deserializing; it carries no information.
       */
      is_inherited?: boolean;

      /**
       * Whether the contact has opted out of messaging. Single source of truth — opt-out
       * is per-contact, not per-channel.
       */
      opt_out?: boolean;

      /**
       * Phone number in original format
       */
      phone_number?: string;

      /**
       * ISO 3166-1 alpha-2 country code (e.g., US, CA, GB)
       */
      region_code?: string;

      /**
       * When the contact was last updated
       */
      updated_at?: string | null;
    }

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
export interface ContactRetrieveMessageSummaryResponse {
  /**
   * The response data (null if error)
   */
  data?: ContactRetrieveMessageSummaryResponse.Data | null;

  /**
   * Error information
   */
  error?: ContactRetrieveMessageSummaryResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: ContactRetrieveMessageSummaryResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace ContactRetrieveMessageSummaryResponse {
  /**
   * The response data (null if error)
   */
  export interface Data {
    channel_scores?: Array<Data.ChannelScore>;

    channels_used?: Array<string>;

    contact_id?: string;

    first_message_at?: string | null;

    last_message_at?: string | null;

    message_count?: number;
  }

  export namespace Data {
    export interface ChannelScore {
      channel?: string;

      /**
       * Percentage (0-100) of messages on this channel that ended in FAILED.
       */
      fail_score?: number;

      /**
       * Percentage (0-100) of messages on this channel that reached a successful
       * terminal state: SENT/DELIVERED/READ for outbound, RECEIVED for inbound.
       */
      success_score?: number;
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

export interface ContactCreateParams {
  /**
   * Body param: Phone number of the contact to create
   */
  phone_number: string;

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

export interface ContactRetrieveParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface ContactUpdateParams {
  /**
   * Body param: Default messaging channel: "sms" or "whatsapp"
   */
  default_channel?: string | null;

  /**
   * Body param: Whether the contact has opted out of messaging. Single source of
   * truth — opt-out is per-contact, not per-channel.
   */
  opt_out?: boolean | null;

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

export interface ContactListParams {
  /**
   * Query param: Page number (1-indexed)
   */
  page: number;

  /**
   * Query param: Number of items per page
   */
  page_size: number;

  /**
   * Query param: Optional channel filter (sms, whatsapp)
   */
  channel?: string | null;

  /**
   * Query param: Optional phone number filter (alternative to list view)
   */
  phone?: string | null;

  /**
   * Query param: Optional search term for filtering contacts
   */
  search?: string | null;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface ContactDeleteParams {
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

export interface ContactRetrieveMessageSummaryParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export declare namespace Contacts {
  export {
    type ContactCreateResponse as ContactCreateResponse,
    type ContactRetrieveResponse as ContactRetrieveResponse,
    type ContactUpdateResponse as ContactUpdateResponse,
    type ContactListResponse as ContactListResponse,
    type ContactRetrieveMessageSummaryResponse as ContactRetrieveMessageSummaryResponse,
    type ContactCreateParams as ContactCreateParams,
    type ContactRetrieveParams as ContactRetrieveParams,
    type ContactUpdateParams as ContactUpdateParams,
    type ContactListParams as ContactListParams,
    type ContactDeleteParams as ContactDeleteParams,
    type ContactRetrieveMessageSummaryParams as ContactRetrieveMessageSummaryParams,
  };
}
