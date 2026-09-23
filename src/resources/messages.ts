// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WebhooksAPI from './webhooks';
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
 *
 * **A message can be resent on its id.** `POST /v3/messages/{id}/resend` puts a finished message — typically one BLOCKED for insufficient balance — back through the send pipeline. It is a new attempt, not a free retry: every policy runs again, the message is billed again, and its status webhooks fire again. A FILTERED message is never resendable.
 */
export class Messages extends APIResource {
  /**
   * Retrieves the activity log for a specific message. Activities track the message
   * lifecycle including acceptance, processing, sending, delivery, and any errors. A
   * SCHEDULED entry carries scheduled_at, the release instant in UTC as it stood at
   * that moment. Other entries have no scheduled_at key.
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
   * status, timestamps, and error information if applicable. A message that is or
   * was held for a later time (a send you scheduled with scheduled_at, or a
   * quiet-hours hold) is returned as a ScheduledMessageResponse: the same fields
   * plus scheduled_at, the release instant in UTC. A message sent immediately has no
   * scheduled_at key.
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
   * message.blocked webhook. To send later, set scheduled_at (ISO-8601 with an
   * explicit UTC offset; a value without one is rejected) between 1 minute and 30
   * days ahead: the response is a ScheduledSendMessageResponse (the same fields plus
   * scheduled_at; status is still QUEUED), each message then moves to SCHEDULED, is
   * held and released at that time (within a few minutes), and a message.scheduled
   * webhook fires once it is held. Balance and template approval are evaluated at
   * release, not at acceptance. Quiet hours are not checked when the request is
   * accepted: if the time falls inside a legally protected quiet-hours window for a
   * recipient, that message is moved to the next allowed time at release and a
   * second message.scheduled webhook reports the new scheduled_at. An account may
   * hold at most 1,000,000 scheduled messages at once (429 LIMIT_001).
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

    /**
     * Pagination metadata for list responses
     */
    pagination?: WebhooksAPI.PaginationMeta;
  }

  export namespace Data {
    /**
     * A single message activity event for v3 API.
     *
     * The activity list mixes statuses, so unlike a message it is one shape rather
     * than two: a SCHEDULED entry carries scheduled_at, and every other entry has no
     * such key.
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
       * SCHEDULED activities only: when the held message will be released for delivery,
       * in UTC. Same wire name as on the send response, the message and the webhook.
       * Omitted on every other activity. A message that quiet hours moved at release has
       * two SCHEDULED entries, each carrying the instant as it stood at that moment.
       */
      scheduled_at?: string | null;

      /**
       * Activity status. Outbound: QUEUED, PROCESSED, ROUTED, SCHEDULED, SENT,
       * DELIVERED, READ, FAILED. Inbound (from contact): RECEIVED (terminal).
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
   * Message response for v3 API — same shape as v2 with snake_case JSON conventions.
   *
   * The shape of a message that was sent immediately: it never has a scheduled_at
   * key. A message that is or was held for a later instant is a
   * ScheduledMessageResponse, and the endpoint decides which of the two to answer
   * with. From always returns this type.
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
   * Message response for v3 API — same shape as v2 with snake_case JSON conventions.
   *
   * The shape of a message that was sent immediately: it never has a scheduled_at
   * key. A message that is or was held for a later instant is a
   * ScheduledMessageResponse, and the endpoint decides which of the two to answer
   * with. From always returns this type.
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
     * components (header, header media, body, footer, buttons, MMS subject and media).
     *
     * Persisted as the messageBody jsonb column on Messages. Every write path goes
     * through MessageUtils.MessageBodyJsonOptions, which writes nulls, so the envelope
     * shape is stable regardless of channel or status. Anything that rebuilds this
     * object field by field — the four IMessageBodyStrategy implementations and
     * MessageUtils.BuildSegmentBody — has to carry every member, or that member is
     * silently dropped on whichever path forgot it.
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
     * components (header, header media, body, footer, buttons, MMS subject and media).
     *
     * Persisted as the messageBody jsonb column on Messages. Every write path goes
     * through MessageUtils.MessageBodyJsonOptions, which writes nulls, so the envelope
     * shape is stable regardless of channel or status. Anything that rebuilds this
     * object field by field — the four IMessageBodyStrategy implementations and
     * MessageUtils.BuildSegmentBody — has to carry every member, or that member is
     * silently dropped on whichever path forgot it.
     */
    export interface MessageBody {
      buttons?: Array<MessageBody.Button> | null;

      content?: string;

      footer?: string | null;

      header?: string | null;

      /**
       * The media asset that rode a message's header, recorded as sent.
       */
      headerMedia?: MessageBody.HeaderMedia | null;

      /**
       * MMS attachments, as the publicly fetchable URLs handed to the carrier. Null on
       * every other channel.
       *
       * Persisted rather than derived because a resend and a curfew release rebuild the
       * send from the stored row — MessageReplayCommandBuilder reads templateId and
       * templateVariables and nothing else — so media that lives only on the original
       * request would silently turn a replayed MMS into a text message.
       */
      media?: Array<MessageBody.Media> | null;

      /**
       * MMS subject line. Null on every other channel.
       */
      subject?: string | null;
    }

    export namespace MessageBody {
      export interface Button {
        postbackData?: string | null;

        text?: string | null;

        type?: string;

        value?: string;
      }

      /**
       * The media asset that rode a message's header, recorded as sent.
       */
      export interface HeaderMedia {
        /**
         * "image", "video" or "document" — taken from the header's media variable.
         */
        type?: string;

        /**
         * The https URL the caller supplied for this send. Never the template's stored
         * props.sample, which is Meta's expiring header_handle rather than what was
         * delivered.
         */
        url?: string;
      }

      /**
       * One attachment on a message: a customer-supplied public URL handed to the
       * carrier as-is.
       *
       *              A URL and nothing else. sent.dm never takes custody of MMS media — the customer hosts it and we
       *              pass the link through at send time — so there is no storage key, size or expiry to record. If we ever
       *              do host attachments, that belongs with the change that introduces the hosting, not here.
       */
      export interface Media {
        /**
         * One of Constants.MmsMediaTypes when known. Advisory — the carrier reads the
         * fetched object's Content-Type, not this.
         */
        mediaType?: string | null;

        url?: string;
      }
    }
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
   * The shape of an immediate send: it never has a scheduled_at key. A send that
   * carried scheduled_at is a ScheduledSendMessageResponse, and the endpoint decides
   * which of the two to answer with. From always returns this type.
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
   * The result of a multi-recipient send.
   *
   * Declared here rather than in the service layer. POST /v3/messages used to
   * publish MessageSendResult — a type in Common.Services.Messaging.Contracts — so
   * the public contract was whatever the send service happened to return, and
   * changing that service for an internal reason changed the API. The service keeps
   * its result; this is what a caller sees, and the mapping between them is a
   * decision the endpoint makes.
   *
   * The shape of an immediate send: it never has a scheduled_at key. A send that
   * carried scheduled_at is a ScheduledSendMessageResponse, and the endpoint decides
   * which of the two to answer with. From always returns this type.
   */
  export interface Data {
    recipients?: Array<Data.Recipient>;

    /**
     * QUEUED: the batch is accepted. A request that carried scheduled_at is QUEUED
     * here too; each message moves to SCHEDULED once it is held, as GET
     * /v3/messages/{id} and the message.scheduled webhook report.
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
   * Body param: Attachments for this send, as publicly fetchable https URLs. Used by
   * the MMS channel and ignored by every other one.
   *
   * Supplying these replaces the media on the template's mms body rather than adding
   * to it, so a template can hold a default creative while a caller still sends
   * something recipient-specific.
   *
   * Their presence is also what makes a message eligible for MMS on an auto-detect
   * send: a message with nothing attached is delivered as SMS, because an MMS with
   * no media is a more expensive text message.
   *
   * The recipient's carrier fetches each URL after the send is accepted, so it must
   * stay publicly reachable — a link that expires, or one behind auth, arrives as a
   * failed message.
   */
  media_urls?: Array<string> | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param: Optional future send time as an ISO-8601 timestamp with an explicit
   * UTC offset, e.g. 2026-10-01T09:00:00+02:00 or 2026-10-01T07:00:00Z. A value
   * without an offset is rejected (400) rather than read in the server's zone. The
   * offset only fixes the instant: it is stored and echoed in UTC as scheduled_at.
   * Omit to send now. Must be at least one minute ahead and at most 30 days ahead.
   * Accepted messages report SCHEDULED and are released for delivery at this time.
   * Quiet hours, balance and template approval are evaluated at release, not at
   * acceptance: a message whose time falls inside a recipient's protected
   * quiet-hours window is moved to the next allowed time and a second
   * message.scheduled webhook reports the new scheduled_at.
   */
  scheduled_at?: string | null;

  /**
   * Body param: Subject line for this send, overriding the template's. MMS only;
   * ignored on every other channel. Most handsets render it above the body, some
   * ignore it entirely.
   */
  subject?: string | null;

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
     * Template variable parameters for personalization, keyed by variable name.
     *
     * Every variable the template declares is required; GET /v3/templates/{id} lists
     * them. Supplying a key the template does not declare is ignored.
     *
     * Media headers. A template whose header is an image (designed in WhatsApp Manager
     * and imported into Sent) declares a reserved header_image key. Its value is a
     * publicly reachable https URL that Meta fetches at send time — Sent does not host
     * the asset, and the sample approved with the template is not reused. The key is
     * derived from the header's media type, so header_video and header_document follow
     * the same shape when those formats ship.
     *
     * "parameters": { "header_image": "https://cdn.example.com/banner.jpg", "name":
     * "John Doe" }
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
