// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from '../webhooks';
import * as ParticipantsAPI from './participants';
import { APIResponseOfListOfCallParticipant, Participants } from './participants';

export class Calls extends APIResource {
  participants: ParticipantsAPI.Participants = new ParticipantsAPI.Participants(this._client);
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfCall {
  /**
   * A call record
   */
  data?: APIResponseOfCall.Data | null;

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

export namespace APIResponseOfCall {
  /**
   * A call record
   */
  export interface Data {
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
     * insufficient_balance, destination_blocked, callback_not_configured, rejected or
     * no_answer. Null while the call is live, when it completed, and when it failed
     * without a recorded reason
     */
    failure_reason?: string | null;

    /**
     * One end of a call
     */
    from?: Data.From;

    /**
     * The calling mode: inapp for a call between people in your app and phone numbers,
     * routed by your number's callback URL
     */
    mode?: string;

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
     * INITIATED, RINGING, ANSWERED, COMPLETED, FAILED, NO_ANSWER or REJECTED
     */
    status?: string;

    /**
     * When the call entered each status, oldest first. Only returned when reading one
     * call
     */
    timeline?: Array<Data.Timeline> | null;

    /**
     * One end of a call
     */
    to?: Data.To;
  }

  export namespace Data {
    /**
     * One end of a call
     */
    export interface From {
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
     * When a call entered a status
     */
    export interface Timeline {
      /**
       * INITIATED, RINGING, ANSWERED, COMPLETED, FAILED, NO_ANSWER or REJECTED
       */
      status?: string;

      /**
       * When the call entered this status (UTC)
       */
      timestamp?: string;
    }

    /**
     * One end of a call
     */
    export interface To {
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
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfCallRecordings {
  /**
   * The recordings of a call, each as a short-lived download link
   */
  data?: APIResponseOfCallRecordings.Data | null;

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

export namespace APIResponseOfCallRecordings {
  /**
   * The recordings of a call, each as a short-lived download link
   */
  export interface Data {
    /**
     * Every recording of the call, oldest first. Empty until the first
     * call.recording_ready webhook has been sent, and for a call that was never
     * recorded
     */
    recordings?: Array<Data.Recording>;
  }

  export namespace Data {
    /**
     * A short-lived link to a call recording
     */
    export interface Recording {
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
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfCallsList {
  /**
   * Paginated list of calls
   */
  data?: APIResponseOfCallsList.Data | null;

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

export namespace APIResponseOfCallsList {
  /**
   * Paginated list of calls
   */
  export interface Data {
    /**
     * The calls on this page, most recent first
     */
    calls?: Array<Data.Call>;

    /**
     * Pagination metadata for list responses
     */
    pagination?: WebhooksAPI.PaginationMeta;
  }

  export namespace Data {
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
       * insufficient_balance, destination_blocked, callback_not_configured, rejected or
       * no_answer. Null while the call is live, when it completed, and when it failed
       * without a recorded reason
       */
      failure_reason?: string | null;

      /**
       * One end of a call
       */
      from?: Call.From;

      /**
       * The calling mode: inapp for a call between people in your app and phone numbers,
       * routed by your number's callback URL
       */
      mode?: string;

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
       * INITIATED, RINGING, ANSWERED, COMPLETED, FAILED, NO_ANSWER or REJECTED
       */
      status?: string;

      /**
       * When the call entered each status, oldest first. Only returned when reading one
       * call
       */
      timeline?: Array<Call.Timeline> | null;

      /**
       * One end of a call
       */
      to?: Call.To;
    }

    export namespace Call {
      /**
       * One end of a call
       */
      export interface From {
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
       * When a call entered a status
       */
      export interface Timeline {
        /**
         * INITIATED, RINGING, ANSWERED, COMPLETED, FAILED, NO_ANSWER or REJECTED
         */
        status?: string;

        /**
         * When the call entered this status (UTC)
         */
        timestamp?: string;
      }

      /**
       * One end of a call
       */
      export interface To {
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
    }
  }
}

Calls.Participants = Participants;

export declare namespace Calls {
  export {
    type APIResponseOfCall as APIResponseOfCall,
    type APIResponseOfCallRecordings as APIResponseOfCallRecordings,
    type APIResponseOfCallsList as APIResponseOfCallsList,
  };

  export {
    Participants as Participants,
    type APIResponseOfListOfCallParticipant as APIResponseOfListOfCallParticipant,
  };
}
