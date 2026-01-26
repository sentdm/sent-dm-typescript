// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class NumberLookup extends APIResource {
  /**
   * Retrieves detailed information about a phone number including validation,
   * formatting, country information, and available messaging channels. The customer
   * ID is extracted from the authentication token.
   *
   * @example
   * ```ts
   * const numberLookup = await client.numberLookup.retrieve({
   *   phoneNumber: 'phoneNumber',
   *   'x-api-key': '',
   *   'x-sender-id': '00000000-0000-0000-0000-000000000000',
   * });
   * ```
   */
  retrieve(
    params: NumberLookupRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<NumberLookupRetrieveResponse> {
    const { 'x-api-key': xAPIKey, 'x-sender-id': xSenderID, ...query } = params;
    return this._client.get('/v2/number-lookup', {
      query,
      ...options,
      headers: buildHeaders([{ 'x-api-key': xAPIKey, 'x-sender-id': xSenderID }, options?.headers]),
    });
  }
}

/**
 * Response containing phone number lookup data
 */
export interface NumberLookupRetrieveResponse {
  /**
   * The country calling code (e.g., 1 for US/Canada)
   */
  countryCode?: string;

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
   * The type of phone number (e.g., mobile, fixed_line, voip)
   */
  numberType?: string;

  /**
   * The phone number in its original format
   */
  phoneNumber?: string;

  /**
   * The timezones associated with the phone number
   */
  phoneTimezones?: string;

  /**
   * The ISO 3166-1 alpha-2 country code (e.g., US, CA, GB)
   */
  regionCode?: string;
}

export interface NumberLookupRetrieveParams {
  /**
   * Query param
   */
  phoneNumber: string;

  /**
   * Header param
   */
  'x-api-key': string;

  /**
   * Header param
   */
  'x-sender-id': string;
}

export declare namespace NumberLookup {
  export {
    type NumberLookupRetrieveResponse as NumberLookupRetrieveResponse,
    type NumberLookupRetrieveParams as NumberLookupRetrieveParams,
  };
}
