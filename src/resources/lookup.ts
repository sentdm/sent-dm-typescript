// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Lookup extends APIResource {
  /**
   * Validates a phone number and retrieves formatting, country, and timezone
   * information from the internal index. Provider-agnostic and works for all
   * customers.
   */
  retrievePhoneInfo(
    phoneNumber: string,
    options?: RequestOptions,
  ): APIPromise<LookupRetrievePhoneInfoResponse> {
    return this._client.get(path`/v3/lookup/number/${phoneNumber}`, options);
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface LookupRetrievePhoneInfoResponse {
  /**
   * The response data (null if error)
   */
  data?: LookupRetrievePhoneInfoResponse.Data | null;

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

export namespace LookupRetrievePhoneInfoResponse {
  /**
   * The response data (null if error)
   */
  export interface Data {
    carrierName?: string | null;

    isPorted?: boolean | null;

    isValid?: boolean;

    isVoip?: boolean | null;

    lineType?: string | null;

    mobileCountryCode?: string | null;

    mobileNetworkCode?: string | null;

    phoneNumber?: string;

    provider?: string;
  }
}

export declare namespace Lookup {
  export { type LookupRetrievePhoneInfoResponse as LookupRetrievePhoneInfoResponse };
}
