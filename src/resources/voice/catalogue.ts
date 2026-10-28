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
 *
 * **Voice agents.** `POST /v3/voice/agents` creates an agent that answers calls through the Sent Voice Gateway: `session_type` says whether Sent carries the call as text (speech recognised and spoken for the agent) or as audio, `websocket_url` is where the gateway dials the agent for each call (leave it out and the agent dials in with your API key), and `tools`, `transfer_targets`, `fallback` and `limits` say what it may do on a call. The agent's `signing_secret` is shown on create and on `POST /v3/voice/agents/{id}/rotate-secret` only. Voices and languages for text sessions come from `GET /v3/voice/voices`. A number takes calls to an agent once it is bound to it on `/v3/channels/voice`.
 */
export class Catalogue extends APIResource {
  /**
   * The names a voice agent's `speech.voice` and `speech.language` accept, with the
   * default marked. The list grows as voices are added; a name is never removed
   * without notice.
   *
   * @example
   * ```ts
   * const apiResponseOfVoiceCatalogue =
   *   await client.voice.catalogue.list();
   * ```
   */
  list(
    params: CatalogueListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseOfVoiceCatalogue> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get('/v3/voice/voices', {
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
export interface APIResponseOfVoiceCatalogue {
  /**
   * The voices and languages a text-session agent may name in its speech settings:
   * what GET /v3/voice/voices and the admin GET /voice/voices answer, in one shape.
   */
  data?: VoiceCatalogue | null;

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
 * The voices and languages a text-session agent may name in its speech settings:
 * what GET /v3/voice/voices and the admin GET /voice/voices answer, in one shape.
 */
export interface VoiceCatalogue {
  /**
   * BCP 47 tags accepted as speech.language.
   */
  languages?: Array<string>;

  voices?: Array<VoiceCatalogueVoice>;
}

export interface VoiceCatalogueVoice {
  /**
   * Whether this is the voice used when an agent names none.
   */
  default?: boolean;

  description?: string;

  /**
   * The language the voice speaks.
   */
  language?: string;

  /**
   * The value to send as speech.voice.
   */
  name?: string;
}

export interface CatalogueListParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export declare namespace Catalogue {
  export {
    type APIResponseOfVoiceCatalogue as APIResponseOfVoiceCatalogue,
    type VoiceCatalogue as VoiceCatalogue,
    type VoiceCatalogueVoice as VoiceCatalogueVoice,
    type CatalogueListParams as CatalogueListParams,
  };
}
