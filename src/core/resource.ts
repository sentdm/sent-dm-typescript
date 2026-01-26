// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { SentDm } from '../client';

export abstract class APIResource {
  protected _client: SentDm;

  constructor(client: SentDm) {
    this._client = client;
  }
}
