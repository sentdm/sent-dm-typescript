// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Send a message and follow what happened to it.
 *
 * One endpoint sends on any channel: pass `channel: "sent"` and we pick between SMS, WhatsApp and RCS per recipient using your routing rules, or name a channel to pin it. A send is accepted asynchronously — `POST /v3/messages` returns an id, and delivery is reported through `GET /v3/messages/{id}`, its activities, or a webhook.
 *
 * **A message needs a sender.** What you can send, where, and at what cost is decided by the markets under **Channels** — so a recipient in a country you hold no sender for is refused here rather than queued.
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
   * webhooks or the GET /messages/{id} endpoint. Sends gated before any delivery
   * attempt do not reject the request — an account-level precondition such as
   * insufficient balance, a template not approved for sending, or free-form content
   * with no open conversation with the contact. The send is accepted with 202 and
   * the affected messages are reported as BLOCKED on GET /messages/{id} and the
   * message.blocked webhook.
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
  error?: MessageRetrieveActivitiesResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: MessageRetrieveActivitiesResponse.Meta;

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

    /**
     * Pagination metadata for list responses
     */
    pagination?: Data.Pagination;
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
       * Sender phone number for this activity (the customer's sending number for
       * outbound, the external sender for inbound). Null when not reported by the
       * provider.
       */
      from?: string | null;

      /**
       * Channel cost for this activity (e.g., SMS/WhatsApp provider cost), formatted to
       * 4 decimal places.
       */
      price?: string | null;

      /**
       * Activity status. Outbound: QUEUED, PROCESSED, ROUTED, SENT, DELIVERED, READ,
       * FAILED. Inbound (from contact): RECEIVED (terminal).
       */
      status?: string;

      /**
       * When this activity occurred
       */
      timestamp?: string;
    }

    /**
     * Pagination metadata for list responses
     */
    export interface Pagination {
      /**
       * @deprecated Cursor-based pagination. Never populated — see Cursors.
       */
      cursors?: Pagination.Cursors | null;

      /**
       * Whether there are more pages after this one
       */
      has_more?: boolean;

      /**
       * Current page number (1-indexed)
       */
      page?: number;

      /**
       * Number of items per page
       */
      page_size?: number;

      /**
       * Total number of items across all pages
       */
      total_count?: number;

      /**
       * Total number of pages
       */
      total_pages?: number;
    }

    export namespace Pagination {
      /**
       * @deprecated Cursor-based pagination. Never populated — see Cursors.
       */
      export interface Cursors {
        /**
         * Cursor to fetch the next page.
         */
        after?: string | null;

        /**
         * Cursor to fetch the previous page.
         */
        before?: string | null;
      }
    }
  }

  /**
   * Error information
   */
  export interface Error {
    /**
     * Machine-readable error code (e.g., "RESOURCE_001")
     */
    code?: string;

    /**
     * Additional validation error details (field-level errors)
     */
    details?: { [key: string]: Array<string> } | null;

    /**
     * URL to documentation about this error
     */
    doc_url?: string | null;

    /**
     * Human-readable error message
     */
    message?: string;
  }

  /**
   * Request and response metadata
   */
  export interface Meta {
    /**
     * Unique identifier for this request (for tracing and support)
     */
    request_id?: string;

    /**
     * Server timestamp when the response was generated
     */
    timestamp?: string;

    /**
     * API version used for this request
     */
    version?: string;
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
  error?: MessageRetrieveStatusResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: MessageRetrieveStatusResponse.Meta;

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

    direction?: string;

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

    template_category?: string | null;

    template_id?: string | null;

    template_name?: string | null;
  }

  export namespace Data {
    /**
     * Represents a status change event in a message's lifecycle (v3)
     */
    export interface Event {
      status: string;

      timestamp: string;

      description?: string | null;
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
        postbackData?: string | null;

        text?: string | null;

        type?: string;

        value?: string;
      }
    }
  }

  /**
   * Error information
   */
  export interface Error {
    /**
     * Machine-readable error code (e.g., "RESOURCE_001")
     */
    code?: string;

    /**
     * Additional validation error details (field-level errors)
     */
    details?: { [key: string]: Array<string> } | null;

    /**
     * URL to documentation about this error
     */
    doc_url?: string | null;

    /**
     * Human-readable error message
     */
    message?: string;
  }

  /**
   * Request and response metadata
   */
  export interface Meta {
    /**
     * Unique identifier for this request (for tracing and support)
     */
    request_id?: string;

    /**
     * Server timestamp when the response was generated
     */
    timestamp?: string;

    /**
     * API version used for this request
     */
    version?: string;
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface MessageSendResponse {
  /**
   * The result of a multi-recipient send.
   *
   * Declared here rather than in the service layer. POST /v3/messages used to
   * publish MessageSendResult — a type in Common.Services.Messaging.Contracts — so
   * the public contract was whatever the send service happened to return, and
   * changing that service for an internal reason changed the API. The service keeps
   * its result; this is what a caller sees, and the mapping between them is a
   * decision the endpoint makes.
   *
   * The wire is unchanged by the move: same names, same values.
   */
  data?: MessageSendResponse.Data | null;

  /**
   * Error information
   */
  error?: MessageSendResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: MessageSendResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace MessageSendResponse {
  /**
   * The result of a multi-recipient send.
   *
   * Declared here rather than in the service layer. POST /v3/messages used to
   * publish MessageSendResult — a type in Common.Services.Messaging.Contracts — so
   * the public contract was whatever the send service happened to return, and
   * changing that service for an internal reason changed the API. The service keeps
   * its result; this is what a caller sees, and the mapping between them is a
   * decision the endpoint makes.
   *
   * The wire is unchanged by the move: same names, same values.
   */
  export interface Data {
    recipients?: Array<Data.Recipient>;

    /**
     * Overall status — QUEUED once the batch is accepted for delivery.
     */
    status?: string;

    template_id?: string;

    template_name?: string;
  }

  export namespace Data {
    /**
     * What one recipient of a send got, as the API reports it.
     */
    export interface Recipient {
      /**
       * Resolved template body for this recipient's channel, or null when the channel is
       * auto-detected.
       */
      body?: string | null;

      /**
       * Channel this message will be sent on — sms, whatsapp — or null to auto-detect.
       */
      channel?: string | null;

      /**
       * Identifier for tracking this recipient's message.
       */
      message_id?: string;

      /**
       * Phone number in E.164 format.
       */
      to?: string;
    }
  }

  /**
   * Error information
   */
  export interface Error {
    /**
     * Machine-readable error code (e.g., "RESOURCE_001")
     */
    code?: string;

    /**
     * Additional validation error details (field-level errors)
     */
    details?: { [key: string]: Array<string> } | null;

    /**
     * URL to documentation about this error
     */
    doc_url?: string | null;

    /**
     * Human-readable error message
     */
    message?: string;
  }

  /**
   * Request and response metadata
   */
  export interface Meta {
    /**
     * Unique identifier for this request (for tracing and support)
     */
    request_id?: string;

    /**
     * Server timestamp when the response was generated
     */
    timestamp?: string;

    /**
     * API version used for this request
     */
    version?: string;
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
   * produces a separate message per recipient. "sent" = auto-detect. Defaults to
   * ["sent"] (auto-detect) if omitted.
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
  template?: MessageSendParams.Template | null;

  /**
   * Body param: Plain-text (free-form) message body. Provide either Template or
   * this.
   */
  text?: string | null;

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
