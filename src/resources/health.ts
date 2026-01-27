// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Health extends APIResource {
  /**
   * Kubernetes liveness probe. Returns 200 if the application is running.
   */
  checkLive(options?: RequestOptions): APIPromise<void> {
    return this._client.get('/health/live', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Kubernetes readiness probe. Returns 200 when application is ready to serve
   * traffic.
   */
  checkReady(options?: RequestOptions): APIPromise<void> {
    return this._client.get('/health/ready', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}
