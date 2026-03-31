// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Sent } from '../client';

export abstract class APIResource {
  protected _client: Sent;

  constructor(client: Sent) {
    this._client = client;
  }
}
