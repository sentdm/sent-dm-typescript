// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from '../webhooks';
import * as ParticipantsAPI from './participants';
import {
  APIResponseOfListOfCallParticipant,
  CallParticipant,
  CallParticipantTarget,
  ParticipantAddParams,
  ParticipantListParams,
  ParticipantRemoveAllParams,
  ParticipantRemoveParams,
  ParticipantUpdateParams,
  Participants,
} from './participants';
import { APIPromise } from '../../core/api-promise';
import { CallsPage, type CallsPageParams, PagePromise } from '../../core/pagination';
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
export class Calls extends APIResource {
  participants: ParticipantsAPI.Participants = new ParticipantsAPI.Participants(this._client);

  /**
   * Retrieves one of your calls by id: the parties, the owning number, the current
   * status with its failure reason, duration, price, recording availability, and a
   * timeline of when the call entered each status.
   *
   * @example
   * ```ts
   * const apiResponseOfCall = await client.calls.retrieve(
   *   'call_9f2ab000-0000-4000-8000-000000000001',
   * );
   * ```
   */
  retrieve(
    id: string,
    params: CallRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseOfCall> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/calls/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves a paginated list of your calls, most recent first. Filter by
   * direction, status, the owning number, and the time the call started (from and to
   * are inclusive). Use the call webhooks for real-time updates; this list is for
   * looking calls up afterwards.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const call of client.calls.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    params: CallListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CallsCallsPage, Call> {
    const { 'x-profile-id': xProfileID, ...query } = params ?? {};
    return this._client.getAPIList('/v3/calls', CallsPage<Call>, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Ends one of your live calls. The call then ends the way any other call does: its
   * status moves to completed and call.completed is sent once the disconnect is
   * reported. A call that has already ended answers 409, and so does a call with no
   * phone leg, such as one between two app users.
   *
   * @example
   * ```ts
   * await client.calls.hangup(
   *   'call_9f2ab000-0000-4000-8000-000000000001',
   * );
   * ```
   */
  hangup(id: string, params: CallHangupParams, options?: RequestOptions): APIPromise<void> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post(path`/v3/calls/${id}/hangup`, {
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
   * Returns pre-signed links to the recordings of one of your calls, each valid
   * until its url_expires_at. A recording appears once the call was recorded, by a
   * connect answer with record set, a startRecording instruction or the recordings
   * command, and the call.recording_ready webhook has been sent; until then, and for
   * a call that was never recorded, the list is empty. A call recorded more than
   * once lists every recording, oldest first, each under the recording_id its
   * call.recording_ready webhook carried.
   *
   * @example
   * ```ts
   * const apiResponseOfCallRecordings =
   *   await client.calls.listRecordings(
   *     'call_9f2ab000-0000-4000-8000-000000000001',
   *   );
   * ```
   */
  listRecordings(
    id: string,
    params: CallListRecordingsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseOfCallRecordings> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/calls/${id}/recordings`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Starts or stops recording one of your live calls. Use start to begin recording
   * mid-call, or stop to end a recording, whether it was started here or by a
   * connect answer with record set. A call that has already ended answers 409, and
   * so does a call with no phone leg, such as one between two app users, which can't
   * be recorded.
   *
   * @example
   * ```ts
   * await client.calls.record(
   *   'call_9f2ab000-0000-4000-8000-000000000001',
   * );
   * ```
   */
  record(id: string, params: CallRecordParams, options?: RequestOptions): APIPromise<void> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post(path`/v3/calls/${id}/recordings`, {
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
}

export type CallsCallsPage = CallsPage<Call>;

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfCall {
  /**
   * A call record
   */
  data?: Call | null;

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
export interface APIResponseOfCallRecordings {
  /**
   * The recordings of a call, each as a short-lived download link
   */
  data?: CallRecordings | null;

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
export interface APIResponseOfCallsList {
  /**
   * Paginated list of calls
   */
  data?: CallsList | null;

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
 * A call record
 */
export interface Call {
  /**
   * The call id, the same one carried by the call.request question and every call
   * webhook
   */
  id?: string;

  /**
   * When the call was answered (UTC). Null until then, and always null for a call
   * between two of your app users
   */
  answered_at?: string | null;

  /**
   * outbound for a call placed from your app, inbound for a call to one of your
   * numbers
   */
  direction?: string;

  /**
   * Billable duration in seconds. Null while the call is live
   */
  duration_seconds?: number | null;

  /**
   * When the call ended (UTC). Null while the call is live
   */
  ended_at?: string | null;

  /**
   * Why the call did not complete: callback_timeout, invalid_answer,
   * insufficient_balance, destination_blocked, rejected or no_answer. Null while the
   * call is live, when it completed, and when it failed without a recorded reason
   */
  failure_reason?: string | null;

  /**
   * One end of a call
   */
  from?: CallParty;

  /**
   * Your number that owns the call, in E.164 format: the dialed number for an
   * inbound call, the caller's bound number for a call placed from your app
   */
  number?: string;

  /**
   * What the call cost. Null until it has been priced
   */
  price?: number | null;

  /**
   * True once a recording of the call is available
   */
  recording_available?: boolean;

  /**
   * When the call was placed (UTC)
   */
  started_at?: string;

  /**
   * initiated, ringing, answered, completed, failed, no_answer or rejected
   */
  status?: string;

  /**
   * When the call entered each status, oldest first. Only returned when reading one
   * call
   */
  timeline?: Array<CallTimelineEntry> | null;

  /**
   * One end of a call
   */
  to?: CallParty;
}

/**
 * One end of a call
 */
export interface CallParty {
  /**
   * user for one of your app users, number for a phone number, conference for a
   * room, anonymous for a caller who withheld their number
   */
  kind?: string;

  /**
   * The app user's identity, the phone number in E.164 format, or the room name.
   * Null when the kind is anonymous
   */
  value?: string | null;
}

/**
 * A short-lived link to a call recording
 */
export interface CallRecording {
  /**
   * A pre-signed link that downloads the recording as an MP3 file. Anyone holding it
   * can download the recording until it expires
   */
  download_url?: string;

  /**
   * The recording's id, the one the call.recording_ready webhook announced it under
   */
  recording_id?: string;

  /**
   * When the link stops working (UTC). Request the recordings again for a fresh link
   */
  url_expires_at?: string;
}

/**
 * The recordings of a call, each as a short-lived download link
 */
export interface CallRecordings {
  /**
   * Every recording of the call, oldest first. Empty until the first
   * call.recording_ready webhook has been sent, and for a call that was never
   * recorded
   */
  recordings?: Array<CallRecording>;
}

/**
 * When a call entered a status
 */
export interface CallTimelineEntry {
  /**
   * initiated, ringing, answered, completed, failed, no_answer or rejected
   */
  status?: string;

  /**
   * When the call entered this status (UTC)
   */
  timestamp?: string;
}

/**
 * Paginated list of calls
 */
export interface CallsList {
  /**
   * The calls on this page, most recent first
   */
  calls?: Array<Call>;

  /**
   * Pagination metadata for list responses
   */
  pagination?: WebhooksAPI.PaginationMeta;
}

export interface CallRetrieveParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface CallListParams extends CallsPageParams {
  /**
   * Query param: Optional direction filter: outbound for calls placed from your app,
   * inbound for calls to one of your numbers
   */
  direction?: string | null;

  /**
   * Query param: Only calls started at or after this time (ISO 8601)
   */
  from?: string | null;

  /**
   * Query param: Optional filter on the number that owns the call, one of your
   * voice-enabled numbers in E.164 format
   */
  number?: string | null;

  /**
   * Query param: Optional status filter: initiated, ringing, answered, completed,
   * failed, no_answer or rejected
   */
  status?: string | null;

  /**
   * Query param: Only calls started at or before this time (ISO 8601)
   */
  to?: string | null;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface CallHangupParams {
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

export interface CallListRecordingsParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface CallRecordParams {
  /**
   * Body param: start to begin recording, stop to end it
   */
  action?: string;

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

Calls.Participants = Participants;

export declare namespace Calls {
  export {
    type APIResponseOfCall as APIResponseOfCall,
    type APIResponseOfCallRecordings as APIResponseOfCallRecordings,
    type APIResponseOfCallsList as APIResponseOfCallsList,
    type Call as Call,
    type CallParty as CallParty,
    type CallRecording as CallRecording,
    type CallRecordings as CallRecordings,
    type CallTimelineEntry as CallTimelineEntry,
    type CallsList as CallsList,
    type CallsCallsPage as CallsCallsPage,
    type CallRetrieveParams as CallRetrieveParams,
    type CallListParams as CallListParams,
    type CallHangupParams as CallHangupParams,
    type CallListRecordingsParams as CallListRecordingsParams,
    type CallRecordParams as CallRecordParams,
  };

  export {
    Participants as Participants,
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
