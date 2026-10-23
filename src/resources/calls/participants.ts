// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from '../webhooks';

export class Participants extends APIResource {}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfListOfCallParticipant {
  /**
   * The response data (null if error)
   */
  data?: Array<APIResponseOfListOfCallParticipant.Data> | null;

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

export namespace APIResponseOfListOfCallParticipant {
  /**
   * A participant of a conference call
   */
  export interface Data {
    /**
     * The participant's own call id: what the mute and remove endpoints take, and what
     * GET /v3/voice/calls/{id} accepts
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
}

export declare namespace Participants {
  export { type APIResponseOfListOfCallParticipant as APIResponseOfListOfCallParticipant };
}
