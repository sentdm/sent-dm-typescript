// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Contacts extends APIResource {
  /**
   * Retrieves a paginated list of contacts for the authenticated customer. Supports
   * server-side pagination with configurable page size. The customer ID is extracted
   * from the authentication token.
   */
  list(query: ContactListParams, options?: RequestOptions): APIPromise<ContactListResponse> {
    return this._client.get('/v2/contacts', { query, ...options });
  }

  /**
   * Retrieves a contact by their phone number for the authenticated customer. Phone
   * number should be in international format (e.g., +1234567890). The customer ID is
   * extracted from the authentication token.
   */
  retrieveByPhone(
    query: ContactRetrieveByPhoneParams,
    options?: RequestOptions,
  ): APIPromise<ContactListItemV2> {
    return this._client.get('/v2/contacts/phone', { query, ...options });
  }

  /**
   * Retrieves a specific contact by their unique identifier for the authenticated
   * customer. The customer ID is extracted from the authentication token. Returns
   * detailed contact information including phone number and creation timestamp.
   */
  retrieveID(query: ContactRetrieveIDParams, options?: RequestOptions): APIPromise<ContactListItemV2> {
    return this._client.get('/v2/contacts/id', { query, ...options });
  }
}

/**
 * Represents a contact in the customer's contact list
 */
export interface ContactListItemV2 {
  /**
   * The unique identifier of the contact
   */
  id?: string;

  /**
   * Comma-separated list of available messaging channels for this contact (e.g.,
   * "sms,whatsapp")
   */
  availableChannels?: string;

  /**
   * The country calling code (e.g., 1 for US/Canada)
   */
  countryCode?: string;

  /**
   * The default messaging channel to use for this contact (e.g., "sms" or
   * "whatsapp")
   */
  defaultChannel?: string;

  /**
   * The phone number formatted in E.164 standard (e.g., +1234567890)
   */
  formatE164?: string;

  /**
   * The phone number formatted for international dialing (e.g., +1 234-567-890)
   */
  formatInternational?: string;

  /**
   * The phone number formatted for national dialing (e.g., (234) 567-890)
   */
  formatNational?: string;

  /**
   * The phone number formatted according to RFC 3966 (e.g., tel:+1-234-567-890)
   */
  formatRfc?: string;

  /**
   * The phone number in its original format
   */
  phoneNumber?: string;

  /**
   * The ISO 3166-1 alpha-2 country code (e.g., US, CA, GB)
   */
  regionCode?: string;
}

export interface ContactListResponse {
  items?: Array<ContactListItemV2>;

  page?: number;

  pageSize?: number;

  totalCount?: number;

  totalPages?: number;
}

export interface ContactListParams {
  /**
   * The page number (zero-indexed). Default is 0.
   */
  page: number;

  /**
   * The number of items per page. Default is 20.
   */
  pageSize: number;
}

export interface ContactRetrieveByPhoneParams {
  /**
   * The phone number in international format (e.g., +1234567890)
   */
  phoneNumber: string;
}

export interface ContactRetrieveIDParams {
  /**
   * The unique identifier (GUID) of the resource to retrieve
   */
  id: string;
}

export declare namespace Contacts {
  export {
    type ContactListItemV2 as ContactListItemV2,
    type ContactListResponse as ContactListResponse,
    type ContactListParams as ContactListParams,
    type ContactRetrieveByPhoneParams as ContactRetrieveByPhoneParams,
    type ContactRetrieveIDParams as ContactRetrieveIDParams,
  };
}
