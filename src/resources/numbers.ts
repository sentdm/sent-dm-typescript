// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage and lookup phone numbers
 */
export class Numbers extends APIResource {
  /**
   * Retrieves detailed information about a phone number including carrier, line
   * type, porting status, and VoIP detection. Uses the customer's messaging provider
   * for rich data, with fallback to the internal index.
   *
   * @example
   * ```ts
   * const response = await client.numbers.lookup(
   *   '+12025551234',
   * );
   * ```
   */
  lookup(
    phoneNumber: string,
    params: NumberLookupParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NumberLookupResponse> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/numbers/lookup/${phoneNumber}`, {
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
export interface NumberLookupResponse {
  /**
   * The response data (null if error)
   */
  data?: NumberLookupResponse.Data | null;

  /**
   * Error information
   */
  error?: WebhooksAPI.APIError | null;

  /**
   * Request and response metadata
   */
  meta?: WebhooksAPI.APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace NumberLookupResponse {
  /**
   * The response data (null if error)
   */
  export interface Data {
    carrier_name?: string | null;

    country_code?: string | null;

    is_ported?: boolean | null;

    is_valid?: boolean;

    is_voip?: boolean | null;

    line_type?: string | null;

    mobile_country_code?: string | null;

    mobile_network_code?: string | null;

    phone_number?: string;
  }
}

export interface NumberLookupParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export declare namespace Numbers {
  export { type NumberLookupResponse as NumberLookupResponse, type NumberLookupParams as NumberLookupParams };
}
