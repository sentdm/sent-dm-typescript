// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from '../webhooks';
import * as CallsAPI from './calls';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Phone calls from the numbers you hold, driven by your own callback URL.
 *
 * `POST /v3/channels/voice` enables a number for calls, with the callback URL Sent asks what to do with each call on it, and `POST /v3/channels/voice/tokens` mints a short-lived token that lets a user of your app place and receive calls as that number. When a call arrives or a caller presses a key, a signed question is POSTed to the callback URL and the answer decides the call; `POST /v3/channels/voice/{number}/test` checks the URL answers the way we need before a real call reaches it, and `POST /v3/channels/voice/{number}/rotate-secret` replaces the signing secret. The call events themselves (`call.completed` and the rest) arrive through your webhooks.
 *
 * Every call is a record under `/v3/calls`: read it, list its recordings once one is ready, hang it up, start or stop recording, and add, mute or remove conference participants while it is live. A leg to a phone number runs for at most what your balance affords at the destination's rate.
 */
export class Participants extends APIResource {
  /**
   * Mutes or unmutes one participant of the conference room a live call is in, named
   * by the participant's own call id from the participants list: send muted true to
   * silence them, muted false to let them be heard again. Muting a participant who
   * is already muted succeeds, as does unmuting one who is not. A participant who is
   * not in this call's room answers 404. A call that has ended answers 409, as does
   * a call that is not in a conference.
   *
   * @example
   * ```ts
   * await client.calls.participants.update(
   *   'call_9f2ab000-0000-4000-8000-000000000002',
   *   { id: 'call_9f2ab000-0000-4000-8000-000000000001' },
   * );
   * ```
   */
  update(participantID: string, params: ParticipantUpdateParams, options?: RequestOptions): APIPromise<void> {
    const { id, 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.patch(path`/v3/calls/${id}/participants/${participantID}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          Accept: '*/*',
          ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined),
          ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Lists who is in the conference room one of your live calls is in: each
   * participant's own call id, who they are, whether the room mutes them, and how
   * long they have been connected. The call itself is one of the participants. Use a
   * participant's id to mute or remove them; it is also a call id, so GET
   * /v3/calls/{id} accepts it. A call that has ended answers 409, as does a call
   * that is not in a conference.
   *
   * @example
   * ```ts
   * const apiResponseOfListOfCallParticipant =
   *   await client.calls.participants.list(
   *     'call_9f2ab000-0000-4000-8000-000000000001',
   *   );
   * ```
   */
  list(
    id: string,
    params: ParticipantListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseOfListOfCallParticipant> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/calls/${id}/participants`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Dials one of your app users or a phone number into a call that is in a
   * conference room, and answers with the participant's own call record. The
   * participant is a call of their own: it has its own id, can be looked up and hung
   * up, and is billed and reported through call.completed and call.failed like any
   * other call. Every participant needs a positive balance. A phone participant is
   * called from caller_id, which must be one of your numbers, or from the call's
   * owning number when omitted, and needs a destination you may call. Only a call
   * your answer connected to a conference can take participants: a call connected to
   * a user or a number answers 409.
   *
   * @example
   * ```ts
   * const apiResponseOfCall =
   *   await client.calls.participants.add(
   *     'call_9f2ab000-0000-4000-8000-000000000001',
   *   );
   * ```
   */
  add(
    id: string,
    params: ParticipantAddParams,
    options?: RequestOptions,
  ): APIPromise<CallsAPI.APIResponseOfCall> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post(path`/v3/calls/${id}/participants`, {
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
   * Removes one participant from the conference room a live call is in, named by the
   * participant's own call id from the participants list. Their leg ends and is
   * reported through call.completed like any other call; everyone else stays
   * connected. A participant who is not in this call's room answers 404. A call that
   * has ended answers 409, as does a call that is not in a conference.
   *
   * @example
   * ```ts
   * await client.calls.participants.remove(
   *   'call_9f2ab000-0000-4000-8000-000000000002',
   *   { id: 'call_9f2ab000-0000-4000-8000-000000000001' },
   * );
   * ```
   */
  remove(participantID: string, params: ParticipantRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { id, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.delete(path`/v3/calls/${id}/participants/${participantID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Removes every participant from the conference room a live call is in, the call
   * itself included. Every leg ends and is reported through call.completed like any
   * other call. A room that is already empty answers 204 as well. A call that has
   * ended answers 409, as does a call that is not in a conference.
   *
   * @example
   * ```ts
   * await client.calls.participants.removeAll(
   *   'call_9f2ab000-0000-4000-8000-000000000001',
   * );
   * ```
   */
  removeAll(id: string, params: ParticipantRemoveAllParams, options?: RequestOptions): APIPromise<void> {
    const { 'x-profile-id': xProfileID, ...body } = params;
    return this._client.delete(path`/v3/calls/${id}/participants`, {
      body,
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfListOfCallParticipant {
  /**
   * The response data (null if error)
   */
  data?: Array<CallParticipant> | null;

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
 * A participant of a conference call
 */
export interface CallParticipant {
  /**
   * The participant's own call id: what the mute and remove endpoints take, and what
   * GET /v3/calls/{id} accepts
   */
  id?: string;

  /**
   * How long the participant has been connected to the room, in seconds
   */
  duration_seconds?: number;

  /**
   * user for one of your app users, number for a phone number, anonymous for a
   * caller who withheld their number
   */
  kind?: string;

  /**
   * True while the room mutes this participant
   */
  muted?: boolean;

  /**
   * The app user's identity or the phone number in E.164 format. Null when the kind
   * is anonymous
   */
  value?: string | null;
}

/**
 * A participant to add to a call
 */
export interface CallParticipantTarget {
  /**
   * user for one of your app users, number for a phone number
   */
  kind?: string;

  /**
   * The app user's identity, or the phone number in E.164 format
   */
  value?: string;
}

export interface ParticipantUpdateParams {
  /**
   * Path param: The call id from the route, as carried by call webhooks and the
   * calls list, for example call_9f2ab000-0000-4000-8000-000000000001
   */
  id: string;

  /**
   * Body param: true to mute the participant, false to unmute them
   */
  muted?: boolean;

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

export interface ParticipantListParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface ParticipantAddParams {
  /**
   * Body param: The number shown to a phone participant as the caller, in E.164
   * format. Must be one of your numbers. The call's owning number when omitted
   */
  caller_id?: string | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param: A participant to add to a call
   */
  to?: CallParticipantTarget;

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

export interface ParticipantRemoveParams {
  /**
   * Path param: The call id from the route, as carried by call webhooks and the
   * calls list, for example call_9f2ab000-0000-4000-8000-000000000001
   */
  id: string;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface ParticipantRemoveAllParams {
  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export declare namespace Participants {
  export {
    type APIResponseOfListOfCallParticipant as APIResponseOfListOfCallParticipant,
    type CallParticipant as CallParticipant,
    type CallParticipantTarget as CallParticipantTarget,
    type ParticipantUpdateParams as ParticipantUpdateParams,
    type ParticipantListParams as ParticipantListParams,
    type ParticipantAddParams as ParticipantAddParams,
    type ParticipantRemoveParams as ParticipantRemoveParams,
    type ParticipantRemoveAllParams as ParticipantRemoveAllParams,
  };
}
