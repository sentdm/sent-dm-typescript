// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ContactsAPI from './contacts';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Create, update, and manage customer contact lists
 */
export class Contacts extends APIResource {
  /**
   * Creates a new contact by phone number and associates it with the authenticated
   * customer.
   *
   * @example
   * ```ts
   * const apiResponseContact = await client.contacts.create();
   * ```
   */
  create(params: ContactCreateParams, options?: RequestOptions): APIPromise<APIResponseContact> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/v3/contacts', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
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
   * const apiResponseContact = await client.contacts.retrieve(
   *   '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<APIResponseContact> {
    return this._client.get(path`/v3/contacts/${id}`, options);
  }

  /**
   * Updates a contact's default channel and/or opt-out status. Inherited contacts
   * cannot be updated.
   *
   * @example
   * ```ts
   * const apiResponseContact = await client.contacts.update(
   *   '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
   * );
   * ```
   */
  update(id: string, params: ContactUpdateParams, options?: RequestOptions): APIPromise<APIResponseContact> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.patch(path`/v3/contacts/${id}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
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
   *   pageSize: 0,
   * });
   * ```
   */
  list(query: ContactListParams, options?: RequestOptions): APIPromise<ContactListResponse> {
    return this._client.get('/v3/contacts', { query, ...options });
  }

  /**
   * Dissociates a contact from the authenticated customer. Inherited contacts cannot
   * be deleted.
   *
   * @example
   * ```ts
   * await client.contacts.delete(
   *   '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
   *   { body: {} },
   * );
   * ```
   */
  delete(id: string, params: ContactDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { body } = params;
    return this._client.delete(path`/v3/contacts/${id}`, {
      body: body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': '*/*', Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseContact {
  /**
   * The response data (null if error)
   */
  data?: Contact | null;

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
   * Whether this is an inherited contact (read-only)
   */
  is_inherited?: boolean;

  /**
   * Whether the contact has opted out of messaging
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
 * Standard API response envelope for all v3 endpoints
 */
export interface ContactListResponse {
  /**
   * The response data (null if error)
   */
  data?: ContactListResponse.Data | null;

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

export namespace ContactListResponse {
  /**
   * The response data (null if error)
   */
  export interface Data {
    /**
     * List of contacts
     */
    contacts?: Array<ContactsAPI.Contact>;

    /**
     * Pagination metadata
     */
    pagination?: WebhooksAPI.PaginationMeta;
  }
}

export interface ContactCreateParams {
  /**
   * Body param: Phone number of the contact to create
   */
  phone_number?: string;

  /**
   * Body param: Test mode flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  test_mode?: boolean;

  /**
   * Header param: Unique key to ensure idempotent request processing. Must be 1-255
   * alphanumeric characters, hyphens, or underscores. Responses are cached for 24
   * hours per key per customer.
   */
  'Idempotency-Key'?: string;
}

export interface ContactUpdateParams {
  /**
   * Body param: Default messaging channel: "sms" or "whatsapp"
   */
  default_channel?: string | null;

  /**
   * Body param: Whether the contact has opted out of messaging
   */
  opt_out?: boolean | null;

  /**
   * Body param: Test mode flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  test_mode?: boolean;

  /**
   * Header param: Unique key to ensure idempotent request processing. Must be 1-255
   * alphanumeric characters, hyphens, or underscores. Responses are cached for 24
   * hours per key per customer.
   */
  'Idempotency-Key'?: string;
}

export interface ContactListParams {
  /**
   * Page number (1-indexed)
   */
  page: number;

  pageSize: number;

  /**
   * Optional channel filter (sms, whatsapp)
   */
  channel?: string | null;

  /**
   * Optional phone number filter (alternative to list view)
   */
  phone?: string | null;

  /**
   * Optional search term for filtering contacts
   */
  search?: string | null;
}

export interface ContactDeleteParams {
  /**
   * Request to delete/dissociate a contact
   */
  body: ContactDeleteParams.Body;
}

export namespace ContactDeleteParams {
  /**
   * Request to delete/dissociate a contact
   */
  export interface Body extends WebhooksAPI.MutationRequest {}
}

export declare namespace Contacts {
  export {
    type APIResponseContact as APIResponseContact,
    type Contact as Contact,
    type ContactListResponse as ContactListResponse,
    type ContactCreateParams as ContactCreateParams,
    type ContactUpdateParams as ContactUpdateParams,
    type ContactListParams as ContactListParams,
    type ContactDeleteParams as ContactDeleteParams,
  };
}
