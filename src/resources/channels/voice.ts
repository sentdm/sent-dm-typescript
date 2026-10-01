// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from '../webhooks';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * The senders you send from, one per channel.
 *
 * **SMS is a list of markets**, each keyed by `(country, number_type)` — a customer can hold `us/10dlc` and `gb/alphanumeric` at once, so a market is addressed by the pair rather than by country alone. **WhatsApp and RCS are single**: a customer has one business account and one agent. **Voice is per number**: each number you hold can carry phone calls on its own (`POST /v3/channels/voice`), each with the callback URL Sent asks what to do with its calls, one of them is the default line for calls placed from your app, and voice tokens are minted under `POST /v3/channels/voice/tokens`. Read your voice numbers with `GET /v3/channels/voice` and change one with `PATCH /v3/channels/voice/{number}`.
 *
 * ## Compliance lives on the market
 *
 * Adding a market records everything that market registers with, in its `compliance` object. Only **US `TEN_DLC`** registers with a regime — The Campaign Registry — and it is the only market whose compliance carries `brand` and `campaign`. Everywhere else compliance is documents, and many markets ask for none at all.
 *
 * `GET` and `PATCH` on a market return and accept the same shape, so what comes back can be sent back: an omitted key is left alone, and a key reported in `requirements` is the path into the body that clears it.
 *
 * Call `GET /v3/compliance/requirements` first — it answers what a market demands before you hold it, with a body you can fill in and post.
 */
export class Voice extends APIResource {
  /**
   * Adds voice to one of the numbers you hold, or gives you a new one. Send `number`
   * for a number that is already yours (see `GET /v3/channels`); leave it out to be
   * given a new US number, optionally in a particular `area_code`. Sending both is
   * refused. Nothing registers, so the number can carry calls as soon as this
   * returns.
   *
   * What happens on a call is decided by your `callback_url`: when a call arrives on
   * the number, or a caller presses a key on a menu, Sent POSTs a signed question
   * there and follows the answer. The response carries the `callback_secret` the
   * questions are signed with, the one time it is shown without rotating; verify a
   * question the way you verify a webhook. `POST /v3/channels/voice/{number}/test`
   * sends a test question and reports the verdict.
   *
   * Your first voice number becomes the line app-originated calls are placed from
   * when a voice token names no number; send `default_for_app_calls: true` to give
   * that role to another number. A number you turned off earlier is turned back on,
   * and the same number with a different `callback_url` has its URL replaced and
   * keeps its secret.
   *
   * Read the number's settings with `GET /v3/channels/voice` and change them with
   * `PATCH /v3/channels/voice/{number}`.
   *
   * With `sandbox: true` the request is validated and a simulated number reported
   * with `202`; nothing is written and no number is bought.
   *
   * @example
   * ```ts
   * const apiResponseOfVoiceNumberCreated =
   *   await client.channels.voice.create({
   *     callback_url: 'https://example.com/voice',
   *     number: '+12125550100',
   *   });
   * ```
   */
  create(params: VoiceCreateParams, options?: RequestOptions): APIPromise<APIResponseOfVoiceNumberCreated> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post('/v3/channels/voice', {
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

  /**
   * Reads one of your voice numbers, active or inactive: its status, whether it is
   * the default line for calls placed from your app, and its callback URL. The
   * signing secret is not on this read.
   *
   * The same shape `GET /v3/channels/voice` lists, and the same shape `PATCH` on
   * this path accepts and returns, so what comes back can be sent back.
   *
   * The number is the E.164 value in the path with the plus sign URL-encoded
   * (`%2B`).
   *
   * @example
   * ```ts
   * const apiResponseOfVoiceNumber =
   *   await client.channels.voice.retrieve('+12125550100');
   * ```
   */
  retrieve(
    number: string,
    params: VoiceRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseOfVoiceNumber> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/channels/voice/${number}`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Changes one of your voice numbers and answers with the number as stored, the
   * same shape `GET` on this path returns, so what comes back can be sent back.
   *
   * ## What it changes
   *
   * | Body                                          | Effect                                                                                                                                                     |
   * | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `"status": "ACTIVE"`                          | turns calls on again for a number you turned off; the callback URL and the secret it had are kept                                                          |
   * | `"status": "INACTIVE"`                        | turns calls off; the callback URL and the secret stay on the number                                                                                        |
   * | `"default_for_app_calls": true`               | makes this the line app-originated calls are placed from when a voice token names no number                                                                |
   * | `"callback_url": "https://example.com/voice"` | replaces where Sent asks what to do with each call on the number; the signing secret is kept, and a number that was waiting for its first URL is turned on |
   * | key omitted                                   | left exactly as it is                                                                                                                                      |
   *
   * `status` is matched ignoring case. Any combination is accepted:
   * `status: "ACTIVE"` with `default_for_app_calls: true` turns a number on as the
   * new default, and a `callback_url` sent with either status is written too. A body
   * that names none of the three is refused.
   *
   * ## What it will refuse
   *
   * **`default_for_app_calls: false` is `400`.** An account with active voice
   * numbers always has exactly one default, so the default moves by giving it to
   * another number.
   *
   * **Turning the default line off is `409`** while other active voice numbers
   * remain. Move the default to another number first. Turning off your last voice
   * number is allowed; that turns phone calls off.
   *
   * **Making an inactive number the default is `400`.** Send `status: "ACTIVE"` in
   * the same call.
   *
   * A number added without a `callback_url` is `INACTIVE` for that one reason, so
   * sending it a `callback_url` turns it on by itself, and it becomes your default
   * line if you have no other active voice number. A number you turned off while it
   * had a URL stays off.
   *
   * **A number you never turned voice on for is `404`.** Add it with
   * `POST /v3/channels/voice`.
   *
   * The number is the E.164 value in the path with the plus sign URL-encoded
   * (`%2B`).
   *
   * With `sandbox: true` nothing is written: the request is validated against the
   * stored number and the number is reported with `200` as it would read after the
   * change.
   *
   * @example
   * ```ts
   * const apiResponseOfVoiceNumber =
   *   await client.channels.voice.update('+12125550100');
   * ```
   */
  update(
    number: string,
    params: VoiceUpdateParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfVoiceNumber> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.patch(path`/v3/channels/voice/${number}`, {
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

  /**
   * Every number you turned phone calls on for, active or inactive, oldest first.
   * Each entry carries the number's status, whether it is the default line for calls
   * placed from your app, and its callback URL. The signing secret is never on a
   * read; it is shown when voice is turned on and by
   * `POST /v3/channels/voice/{number}/rotate-secret`.
   *
   * The same entries `GET /v3/channels` reports under `voice`, and the same shape
   * `GET /v3/channels/voice/{number}` returns for one of them. Change a number with
   * `PATCH /v3/channels/voice/{number}`.
   *
   * @example
   * ```ts
   * const apiResponseOfListOfVoiceNumber =
   *   await client.channels.voice.list();
   * ```
   */
  list(
    params: VoiceListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseOfListOfVoiceNumber> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get('/v3/channels/voice', {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

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
   *   await client.channels.voice.createToken();
   * ```
   */
  createToken(params: VoiceCreateTokenParams, options?: RequestOptions): APIPromise<APIResponseOfVoiceToken> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post('/v3/channels/voice/tokens', {
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

  /**
   * Generates a new signing secret for the questions Sent sends to this number's
   * callback URL and returns it. The previous secret stops signing immediately, so
   * update your backend before the next call reaches it. The number is the E.164
   * value in the path with the plus sign URL-encoded (`%2B`).
   *
   * With `sandbox: true` a secret is generated and returned with `202`, and nothing
   * is written.
   *
   * @example
   * ```ts
   * const apiResponseOfVoiceSecret =
   *   await client.channels.voice.rotateSecret('+12125550100');
   * ```
   */
  rotateSecret(
    number: string,
    params: VoiceRotateSecretParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfVoiceSecret> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post(path`/v3/channels/voice/${number}/rotate-secret`, {
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

  /**
   * Sends a synthetic call.request question, flagged "test": true, to the number's
   * callback URL, signed with that number's real secret, and reports what came back.
   * Use it to build and debug your callback endpoint without placing calls: no call
   * is placed, nothing is billed, and nothing is stored. One attempt with the same
   * deadline as a live call, no retry. The outcome is ok when your endpoint answered
   * 2xx with a valid answer; otherwise it is timeout, connection_failed, http_error
   * or invalid_answer, with the reason and, for an invalid answer, the field at
   * fault. The number is the E.164 value in the path with the plus sign URL-encoded
   * (`%2B`).
   *
   * With `sandbox: true` nothing is sent: the verdict comes back ok with `202` and
   * no request or response in it.
   *
   * @example
   * ```ts
   * const apiResponseOfVoiceCallbackTest =
   *   await client.channels.voice.test('+12025550123');
   * ```
   */
  test(
    number: string,
    params: VoiceTestParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfVoiceCallbackTest> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post(path`/v3/channels/voice/${number}/test`, {
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
export interface APIResponseOfListOfVoiceNumber {
  /**
   * The response data (null if error)
   */
  data?: Array<VoiceNumber> | null;

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
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfVoiceCallbackTest {
  /**
   * The verdict of a test question sent to your callback URL
   */
  data?: VoiceCallbackTest | null;

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
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfVoiceNumber {
  /**
   * One number the profile carries phone calls on.
   */
  data?: VoiceNumber | null;

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
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfVoiceNumberCreated {
  /**
   * The response data (null if error)
   */
  data?: VoiceNumberCreated | null;

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
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfVoiceSecret {
  /**
   * A freshly rotated callback signing secret
   */
  data?: VoiceSecret | null;

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
 * The verdict of a test question sent to your callback URL
 */
export interface VoiceCallbackTest {
  /**
   * Your answer as Sent read it, with numbers in E.164 and a missing caller id
   * filled in. Set only when the outcome is ok.
   */
  answer?: unknown | null;

  /**
   * The call id the test question carried. It does not exist anywhere else and
   * cannot be looked up.
   */
  call_id?: string;

  /**
   * Why the test did not end with ok
   */
  error?: VoiceCallbackTestErrorInfo | null;

  /**
   * What happened: ok, timeout, connection_failed, http_error or invalid_answer
   */
  outcome?: string;

  /**
   * The test question exactly as it was sent
   */
  request?: VoiceCallbackTestRequestInfo | null;

  /**
   * What your endpoint answered
   */
  response?: VoiceCallbackTestResponseInfo | null;
}

/**
 * Why the test did not end with ok
 */
export interface VoiceCallbackTestErrorInfo {
  /**
   * What to fix
   */
  message?: string;

  /**
   * Dotted path of the answer field at fault, such as action.action, when one field
   * is to blame
   */
  path?: string | null;

  /**
   * Machine-readable reason, such as timeout, http_error, malformed_json,
   * missing_action or unknown_action
   */
  reason?: string;
}

/**
 * The test question exactly as it was sent
 */
export interface VoiceCallbackTestRequestInfo {
  /**
   * The request body byte for byte. This is what the signature covers.
   */
  body?: string;

  /**
   * Every header Sent added, the signature included, so you can compare against what
   * your endpoint verified. The signing secret itself is never included.
   */
  headers?: { [key: string]: string };

  /**
   * The callback URL that was called
   */
  url?: string;
}

/**
 * What your endpoint answered
 */
export interface VoiceCallbackTestResponseInfo {
  /**
   * The start of the raw response body, capped at 2048 characters
   */
  body?: string | null;

  /**
   * The HTTP status your endpoint returned
   */
  status_code?: number;
}

/**
 * One number the profile carries phone calls on.
 */
export interface VoiceNumber {
  /**
   * Where Sent asks what to do with each call on this number: a signed question is
   * POSTed here when a call arrives or a caller presses a key, and the answer
   * decides the call. The signing secret is not on this read; it is shown when voice
   * is turned on and by the rotate endpoint.
   */
  callback_url?: string | null;

  created_at?: string;

  /**
   * Whether this is the line app-originated calls are placed from when a voice token
   * names no number. Exactly one active voice number carries it while the profile
   * has any.
   */
  default_for_app_calls?: boolean;

  /**
   * The number, in E.164.
   */
  number?: string;

  /**
   * ACTIVE while the number carries calls, INACTIVE once it was turned off. Nothing
   * provisions: a number the customer holds can carry calls the moment voice is
   * turned on for it.
   */
  status?: string;

  updated_at?: string;
}

/**
 * One number the profile carries phone calls on.
 */
export interface VoiceNumberCreated extends VoiceNumber {
  /**
   * The whsec\_ secret every question to callback_url is signed with. Shown here and
   * by POST /v3/channels/voice/{number}/rotate-secret, nowhere else: store it now.
   * Verify a question exactly as you verify a webhook, with X-Webhook-ID,
   * X-Webhook-Timestamp and the body.
   */
  callback_secret?: string;
}

/**
 * A freshly rotated callback signing secret
 */
export interface VoiceSecret {
  /**
   * The new whsec\_ secret. The previous one stopped signing the moment this was
   * returned, so update your backend before the next call reaches it. Shown once.
   */
  callback_secret?: string;
}

/**
 * A short-lived token your app passes to the voice client SDK to register
 */
export interface VoiceToken {
  /**
   * The signed token. Hand it to the client SDK unchanged.
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

export interface VoiceCreateParams {
  /**
   * Body param: Where Sent asks what to do with each call on this number: an
   * absolute HTTP or HTTPS URL on a public host. A signed question is POSTed here
   * when a call arrives or a caller presses a key, and the answer decides the call.
   * Every question is signed with the callback_secret the response returns, the same
   * way your webhooks are signed. Turning the number on again with a different URL
   * replaces it and keeps the secret.
   */
  callback_url: string;

  /**
   * Body param: The US area code a new number should be in, as 212. Only for a
   * request that leaves number out — sending both says two different things about
   * which number to use, and is refused. Omit it too and the number comes from
   * anywhere in the country.
   */
  area_code?: string | null;

  /**
   * Body param: Make this the line app-originated calls are placed from when a voice
   * token names no number. Omit it and your first voice number takes that role; a
   * later one leaves it where it is.
   */
  default_for_app_calls?: boolean | null;

  /**
   * Body param: One of your phone numbers, in E.164 format. Leave the field out
   * entirely to be given a new one instead; sending it empty is a refused request
   * rather than a request for a new number.
   */
  number?: string | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

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

export interface VoiceRetrieveParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface VoiceUpdateParams {
  /**
   * Body param: A new callback URL for the number, active or not: an absolute HTTP
   * or HTTPS URL on a public host, where Sent asks what to do with each call. The
   * signing secret is kept.
   */
  callback_url?: string | null;

  /**
   * Body param: true makes this the line app-originated calls are placed from when a
   * voice token names no number. false is refused: an account with active voice
   * numbers always has exactly one default, so the default moves by giving it to
   * another number.
   */
  default_for_app_calls?: boolean | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param: ACTIVE turns calls on for the number again, INACTIVE turns them off.
   * Matched ignoring case. Turning the default line off is refused while other
   * active voice numbers remain.
   */
  status?: 'ACTIVE' | 'INACTIVE' | null;

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

export interface VoiceListParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface VoiceCreateTokenParams {
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

export interface VoiceRotateSecretParams {
  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

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

export interface VoiceTestParams {
  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

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

export declare namespace Voice {
  export {
    type APIResponseOfListOfVoiceNumber as APIResponseOfListOfVoiceNumber,
    type APIResponseOfVoiceCallbackTest as APIResponseOfVoiceCallbackTest,
    type APIResponseOfVoiceNumber as APIResponseOfVoiceNumber,
    type APIResponseOfVoiceNumberCreated as APIResponseOfVoiceNumberCreated,
    type APIResponseOfVoiceSecret as APIResponseOfVoiceSecret,
    type APIResponseOfVoiceToken as APIResponseOfVoiceToken,
    type VoiceCallbackTest as VoiceCallbackTest,
    type VoiceCallbackTestErrorInfo as VoiceCallbackTestErrorInfo,
    type VoiceCallbackTestRequestInfo as VoiceCallbackTestRequestInfo,
    type VoiceCallbackTestResponseInfo as VoiceCallbackTestResponseInfo,
    type VoiceNumber as VoiceNumber,
    type VoiceNumberCreated as VoiceNumberCreated,
    type VoiceSecret as VoiceSecret,
    type VoiceToken as VoiceToken,
    type VoiceCreateParams as VoiceCreateParams,
    type VoiceRetrieveParams as VoiceRetrieveParams,
    type VoiceUpdateParams as VoiceUpdateParams,
    type VoiceListParams as VoiceListParams,
    type VoiceCreateTokenParams as VoiceCreateTokenParams,
    type VoiceRotateSecretParams as VoiceRotateSecretParams,
    type VoiceTestParams as VoiceTestParams,
  };
}
