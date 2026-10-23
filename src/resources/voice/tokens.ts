// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from '../webhooks';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

/**
 * Phone calls from the numbers you hold, driven by your own callback URL.
 *
 * `POST /v3/channels/voice` enables a number for calls, with the callback URL Sent asks what to do with each call on it, and `POST /v3/voice/tokens` mints a short-lived token that lets a user of your app place and receive calls as that number. When a call arrives or a caller presses a key, a signed question is POSTed to the callback URL and the answer decides the call; `POST /v3/channels/voice/{number}/test` checks the URL answers the way we need before a real call reaches it, and `POST /v3/channels/voice/{number}/rotate-secret` replaces the signing secret. The call events themselves (`call.completed` and the rest) arrive through your webhooks.
 *
 * Every call is a record under `/v3/voice/calls`: read it, list its recordings once one is ready, hang it up, start or stop recording, and add, mute or remove conference participants while it is live. A leg to a phone number runs for at most what your balance affords at the destination's rate.
 */
export class Tokens extends APIResource {
  /**
   * Mints a short-lived token for one of your app users. Call this from your backend
   * and return the token to your app, which passes it to the voice client SDK to
   * register. The identity is bound to the given number, or to your default app-call
   * number when omitted, and calls placed by that identity are routed through the
   * bound number. Minting again re-binds the identity, so an identity can move
   * between numbers.
   *
   * @example
   * ```ts
   * const apiResponseOfVoiceToken =
   *   await client.voice.tokens.create();
   * ```
   */
  create(params: TokenCreateParams, options?: RequestOptions): APIPromise<APIResponseOfVoiceToken> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post('/v3/voice/tokens', {
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
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfVoiceToken {
  /**
   * A short-lived token your app passes to the voice client SDK to register
   */
  data?: VoiceToken | null;

  /**
   * Error information
   */
  error?: WebhooksAPI.ErrorDetail | null;

  /**
   * Request and response metadata
   */
  meta?: WebhooksAPI.APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

/**
 * A short-lived token your app passes to the voice client SDK to register
 */
export interface VoiceToken {
  /**
   * The signed token. Hand it to the client SDK unchanged. Treat it as opaque: read
   * the identity, number, and expiry from this response, not from the token.
   */
  token?: string;

  /**
   * When the token expires (UTC)
   */
  expires_at?: string;

  /**
   * The identity the token was minted for
   */
  identity?: string;

  /**
   * The phone number this identity is now bound to, in E.164 format
   */
  number?: string;
}

export interface TokenCreateParams {
  /**
   * Body param: Your identifier for the app user, such as an agent or account id.
   * Letters, digits, hyphens and underscores only, up to 200 characters.
   */
  identity?: string;

  /**
   * Body param: One of your voice-enabled phone numbers in E.164 format. Calls
   * placed by this identity are routed through that number. Omit to use your default
   * app-call number.
   */
  number?: string | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param: Token lifetime in seconds. Defaults to 600 and cannot exceed 3600.
   */
  ttl?: number | null;

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

export declare namespace Tokens {
  export {
    type APIResponseOfVoiceToken as APIResponseOfVoiceToken,
    type VoiceToken as VoiceToken,
    type TokenCreateParams as TokenCreateParams,
  };
}
