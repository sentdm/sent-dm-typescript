// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Healthcheck extends APIResource {
  /**
   * Checks the health of the Sent Public API Endpoints.
   */
  check(options?: RequestOptions): APIPromise<void> {
    return this._client.get('/healthcheck', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}
