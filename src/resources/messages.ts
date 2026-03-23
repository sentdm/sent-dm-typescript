// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Send and track SMS and WhatsApp messages
 */
export class Messages extends APIResource {
  /**
   * Retrieves the activity log for a specific message. Activities track the message
   * lifecycle including acceptance, processing, sending, delivery, and any errors.
   *
   * @example
   * ```ts
   * const response = await client.messages.retrieveActivities(
   *   '8ba7b830-9dad-11d1-80b4-00c04fd430c8',
   * );
   * ```
   */
  retrieveActivities(
    id: string,
    params: MessageRetrieveActivitiesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessageRetrieveActivitiesResponse> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/messages/${id}/activities`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves the current status and details of a message by ID. Includes delivery
   * status, timestamps, and error information if applicable.
   *
   * @example
   * ```ts
   * const response = await client.messages.retrieveStatus(
   *   '8ba7b830-9dad-11d1-80b4-00c04fd430c8',
   * );
   * ```
   */
  retrieveStatus(
    id: string,
    params: MessageRetrieveStatusParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessageRetrieveStatusResponse> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/messages/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Sends a message to one or more recipients using a template. Supports
   * multi-channel broadcast — when multiple channels are specified (e.g. ["sms",
   * "whatsapp"]), a separate message is created for each (recipient, channel) pair.
   * Returns immediately with per-recipient message IDs for async tracking via
   * webhooks or the GET /messages/{id} endpoint.
   *
   * @example
   * ```ts
   * const response = await client.messages.send();
   * ```
   */
  send(params: MessageSendParams, options?: RequestOptions): APIPromise<MessageSendResponse> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post('/v3/messages', {
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
export interface MessageRetrieveActivitiesResponse {
  /**
   * Response for GET /messages/{id}/activities
   */
  data?: MessageRetrieveActivitiesResponse.Data | null;

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

export namespace MessageRetrieveActivitiesResponse {
  /**
   * Response for GET /messages/{id}/activities
   */
  export interface Data {
    /**
     * List of activity events ordered by most recent first
     */
    activities?: Array<Data.Activity>;

    /**
     * The message ID these activities belong to
     */
    message_id?: string;
  }

  export namespace Data {
    /**
     * A single message activity event for v3 API
     */
    export interface Activity {
      /**
       * Active contact markup applied on top of the channel cost, formatted to 4 decimal
       * places.
       */
      active_contact_price?: string | null;

      /**
       * Human-readable description of the activity
       */
      description?: string;

      /**
       * Channel cost for this activity (e.g., SMS/WhatsApp provider cost), formatted to
       * 4 decimal places.
       */
      price?: string | null;

      /**
       * Activity status (e.g., QUEUED, PROCESSED, ROUTED, SENT, DELIVERED, FAILED)
       */
      status?: string;

      /**
       * When this activity occurred
       */
      timestamp?: string;
    }
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface MessageRetrieveStatusResponse {
  /**
   * Message response for v3 API — same shape as v2 with snake_case JSON conventions
   */
  data?: MessageRetrieveStatusResponse.Data | null;

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

export namespace MessageRetrieveStatusResponse {
  /**
   * Message response for v3 API — same shape as v2 with snake_case JSON conventions
   */
  export interface Data {
    id?: string;

    active_contact_price?: number | null;

    channel?: string;

    contact_id?: string;

    created_at?: string;

    customer_id?: string;

    events?: Array<Data.Event> | null;

    /**
     * Structured message body format for database storage. Preserves channel-specific
     * components (header, body, footer, buttons).
     */
    message_body?: Data.MessageBody | null;

    phone?: string;

    phone_international?: string;

    price?: number | null;

    region_code?: string;

    status?: string;

    template_category?: string;

    template_id?: string | null;

    template_name?: string;
  }

  export namespace Data {
    /**
     * Represents a status change event in a message's lifecycle (v3)
     */
    export interface Event {
      description?: string | null;

      status?: string;

      timestamp?: string;
    }

    /**
     * Structured message body format for database storage. Preserves channel-specific
     * components (header, body, footer, buttons).
     */
    export interface MessageBody {
      buttons?: Array<MessageBody.Button> | null;

      content?: string;

      footer?: string | null;

      header?: string | null;
    }

    export namespace MessageBody {
      export interface Button {
        type?: string;

        value?: string;
      }
    }
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface MessageSendResponse {
  /**
   * Response for the multi-recipient send message endpoint
   */
  data?: MessageSendResponse.Data | null;

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

export namespace MessageSendResponse {
  /**
   * Response for the multi-recipient send message endpoint
   */
  export interface Data {
    /**
     * Per-recipient message results
     */
    recipients?: Array<Data.Recipient>;

    /**
     * Overall request status: "QUEUED" when the batch has been accepted and published
     * to Kafka.
     */
    status?: string;

    /**
     * Template ID that was used
     */
    template_id?: string;

    /**
     * Template display name
     */
    template_name?: string;
  }

  export namespace Data {
    /**
     * Per-recipient result in the send message response
     */
    export interface Recipient {
      /**
       * Resolved template body text for this recipient's channel, or null for
       * auto-detect
       */
      body?: string | null;

      /**
       * Channel this message will be sent on (e.g. "sms", "whatsapp"), or null for
       * auto-detect
       */
      channel?: string | null;

      /**
       * Unique message identifier for tracking this recipient's message
       */
      message_id?: string;

      /**
       * Phone number in E.164 format
       */
      to?: string;
    }
  }
}

export interface MessageRetrieveActivitiesParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface MessageRetrieveStatusParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface MessageSendParams {
  /**
   * Body param: Channels to broadcast on, e.g. ["whatsapp", "sms"]. Each channel
   * produces a separate message per recipient. "sent" = auto-detect, "rcs" =
   * reserved (skipped). Defaults to ["sent"] (auto-detect) if omitted.
   */
  channel?: Array<string> | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param: SDK-style template reference: resolve by ID or by name, with
   * optional parameters.
   */
  template?: MessageSendParams.Template;

  /**
   * Body param: List of recipient phone numbers in E.164 format (multi-recipient
   * fan-out)
   */
  to?: Array<string>;

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

export namespace MessageSendParams {
  /**
   * SDK-style template reference: resolve by ID or by name, with optional
   * parameters.
   */
  export interface Template {
    /**
     * Template ID (mutually exclusive with name)
     */
    id?: string | null;

    /**
     * Template name (mutually exclusive with id)
     */
    name?: string | null;

    /**
     * Template variable parameters for personalization
     */
    parameters?: { [key: string]: string } | null;
  }
}

export declare namespace Messages {
  export {
    type MessageRetrieveActivitiesResponse as MessageRetrieveActivitiesResponse,
    type MessageRetrieveStatusResponse as MessageRetrieveStatusResponse,
    type MessageSendResponse as MessageSendResponse,
    type MessageRetrieveActivitiesParams as MessageRetrieveActivitiesParams,
    type MessageRetrieveStatusParams as MessageRetrieveStatusParams,
    type MessageSendParams as MessageSendParams,
  };
}
