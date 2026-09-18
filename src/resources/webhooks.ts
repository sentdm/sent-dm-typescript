// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import {
  PagePromise,
  WebhookEventsPage,
  type WebhookEventsPageParams,
  WebhooksPage,
  type WebhooksPageParams,
} from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Delivery reports and inbound messages, pushed to you.
 *
 * Subscribe an endpoint to the event types you care about — `GET /v3/webhooks/event-types` lists them — and we POST each one as it happens, retrying on failure. Polling `GET /v3/messages/{id}` works and does not scale.
 *
 * **Verify the signature.** Every delivery is signed with your endpoint's secret; an unverified endpoint is one anybody can post to. `rotate-secret` replaces it, `test` sends a specimen event, and `GET /v3/webhooks/{id}/events` shows what we tried to deliver and what your endpoint answered — which is the first place to look when something appears to be missing.
 */
export class Webhooks extends APIResource {
  /**
   * Creates a new webhook endpoint for the authenticated customer.
   *
   * @example
   * ```ts
   * const apiResponseWebhook = await client.webhooks.create();
   * ```
   */
  create(params: WebhookCreateParams, options?: RequestOptions): APIPromise<APIResponseWebhook> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post('/v3/webhooks', {
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
   * Retrieves a single webhook by ID for the authenticated customer.
   *
   * @example
   * ```ts
   * const apiResponseWebhook = await client.webhooks.retrieve(
   *   'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',
   * );
   * ```
   */
  retrieve(
    id: string,
    params: WebhookRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseWebhook> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/webhooks/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Updates an existing webhook for the authenticated customer.
   *
   * @example
   * ```ts
   * const apiResponseWebhook = await client.webhooks.update(
   *   'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',
   * );
   * ```
   */
  update(id: string, params: WebhookUpdateParams, options?: RequestOptions): APIPromise<APIResponseWebhook> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.put(path`/v3/webhooks/${id}`, {
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
   * Retrieves a paginated list of webhooks for the authenticated customer.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const webhookResponse of client.webhooks.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    params: WebhookListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WebhookResponsesWebhooksPage, WebhookResponse> {
    const { 'x-profile-id': xProfileID, ...query } = params ?? {};
    return this._client.getAPIList('/v3/webhooks', WebhooksPage<WebhookResponse>, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Deletes a webhook for the authenticated customer.
   *
   * @example
   * ```ts
   * await client.webhooks.delete(
   *   'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',
   * );
   * ```
   */
  delete(
    id: string,
    params: WebhookDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.delete(path`/v3/webhooks/${id}`, {
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves all available webhook event types that can be subscribed to.
   *
   * @example
   * ```ts
   * const response = await client.webhooks.listEventTypes();
   * ```
   */
  listEventTypes(
    params: WebhookListEventTypesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookListEventTypesResponse> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get('/v3/webhooks/event-types', {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves a paginated list of delivery events for the specified webhook.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const webhookListEventsResponse of client.webhooks.listEvents(
   *   'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',
   * )) {
   *   // ...
   * }
   * ```
   */
  listEvents(
    id: string,
    params: WebhookListEventsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WebhookListEventsResponsesWebhookEventsPage, WebhookListEventsResponse> {
    const { 'x-profile-id': xProfileID, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v3/webhooks/${id}/events`,
      WebhookEventsPage<WebhookListEventsResponse>,
      {
        query,
        ...options,
        headers: buildHeaders([
          { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
          options?.headers,
        ]),
      },
    );
  }

  /**
   * Generates a new signing secret for the specified webhook. The old secret is
   * immediately invalidated.
   *
   * @example
   * ```ts
   * const response = await client.webhooks.rotateSecret(
   *   'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',
   * );
   * ```
   */
  rotateSecret(
    id: string,
    params: WebhookRotateSecretParams,
    options?: RequestOptions,
  ): APIPromise<WebhookRotateSecretResponse> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post(path`/v3/webhooks/${id}/rotate-secret`, {
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
   * Sends a test event to the specified webhook endpoint to verify connectivity.
   *
   * @example
   * ```ts
   * const response = await client.webhooks.test(
   *   'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',
   * );
   * ```
   */
  test(id: string, params: WebhookTestParams, options?: RequestOptions): APIPromise<WebhookTestResponse> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post(path`/v3/webhooks/${id}/test`, {
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
   * Activates or deactivates a webhook for the authenticated customer.
   *
   * @example
   * ```ts
   * const apiResponseWebhook =
   *   await client.webhooks.toggleStatus(
   *     'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',
   *   );
   * ```
   */
  toggleStatus(
    id: string,
    params: WebhookToggleStatusParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseWebhook> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.patch(path`/v3/webhooks/${id}/toggle-status`, {
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

export type WebhookResponsesWebhooksPage = WebhooksPage<WebhookResponse>;

export type WebhookListEventsResponsesWebhookEventsPage = WebhookEventsPage<WebhookListEventsResponse>;

/**
 * Request and response metadata
 */
export interface APIMeta {
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

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseWebhook {
  /**
   * The response data (null if error)
   */
  data?: WebhookResponse | null;

  /**
   * Error information
   */
  error?: ErrorDetail | null;

  /**
   * Request and response metadata
   */
  meta?: APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

/**
 * Error information
 */
export interface ErrorDetail {
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
 * The envelope Sent POSTs to a subscribed webhook endpoint. Every event shares
 * this shape and varies only in Payload.
 */
export interface InboundMessageEvent {
  /**
   * The specific event within the family, for example message.delivered,
   * message.received or contact.opt_out. Absent on events that have no subtype, so
   * treat it as optional.
   */
  event?: string | null;

  /**
   * The event family, for example message, templates or contact. Route on this
   * first, then on event for the specific change.
   */
  field?: string;

  /**
   * Body of a message.received event. Delivered when a contact messages one of your
   * numbers.
   */
  payload?: InboundMessageEventPayload | null;

  /**
   * The event-specific body.
   */
  request_id?: string | null;

  /**
   * When Sent emitted the event, in UTC (yyyy-MM-ddTHH:mm:ssZ). This is the emission
   * time, not the time the underlying change happened. Use the timestamp inside the
   * payload for the latter.
   */
  timestamp?: string;
}

/**
 * Body of a message.received event. Delivered when a contact messages one of your
 * numbers.
 */
export interface InboundMessageEventPayload {
  /**
   * The contact's number in E.164 format, meaning the number the message came from.
   */
  inbound_number: string;

  /**
   * When the message was received, in UTC (yyyy-MM-ddTHH:mm:ssZ).
   */
  received_at: string;

  /**
   * The account the message belongs to.
   */
  account_id?: string;

  /**
   * The channel the message arrived on, for example sms or whatsapp.
   */
  channel?: string;

  /**
   * The inbound message.
   */
  message_id?: string;

  /**
   * Your number in E.164 format, meaning the number the message was addressed to.
   */
  outbound_number?: string;

  /**
   * The message body. Sent as null when the inbound message carried no text, for
   * example a media-only message. The field is always present, so read it and check
   * for null rather than checking whether the key exists.
   */
  text?: string | null;

  /**
   * When the message was received, in UTC (yyyy-MM-ddTHH:mm:ssZ). Same value as
   * ReceivedAt, kept for envelope consistency with outbound events.
   */
  updated_at?: string;
}

/**
 * The envelope Sent POSTs to a subscribed webhook endpoint. Every event shares
 * this shape and varies only in Payload.
 */
export interface MessageEvent {
  /**
   * The specific event within the family, for example message.delivered,
   * message.received or contact.opt_out. Absent on events that have no subtype, so
   * treat it as optional.
   */
  event?: string | null;

  /**
   * The event family, for example message, templates or contact. Route on this
   * first, then on event for the specific change.
   */
  field?: string;

  /**
   * Body of an outbound message lifecycle event. Delivered once per status change,
   * so a single message produces several of these as it moves toward a terminal
   * status.
   */
  payload?: MessageEventPayload | null;

  /**
   * The event-specific body.
   */
  request_id?: string | null;

  /**
   * When Sent emitted the event, in UTC (yyyy-MM-ddTHH:mm:ssZ). This is the emission
   * time, not the time the underlying change happened. Use the timestamp inside the
   * payload for the latter.
   */
  timestamp?: string;
}

/**
 * Body of an outbound message lifecycle event. Delivered once per status change,
 * so a single message produces several of these as it moves toward a terminal
 * status.
 */
export interface MessageEventPayload {
  /**
   * The status the message just reached, for example SENT, DELIVERED, or FAILED.
   * Sent means dispatched and delivered means confirmed, so treat them as distinct
   * outcomes.
   */
  message_status: string;

  /**
   * The account the message belongs to.
   */
  account_id?: string;

  /**
   * The agent attributed to the send, when the send was attributed to one.
   */
  agent_id?: string | null;

  /**
   * The rendered message body, as plain text. Sent as null when we aren't asserting
   * a body for this event. The field is always present, so read it and check for
   * null rather than checking whether the key exists. Truncated to 3072 characters.
   */
  body?: string | null;

  /**
   * The channel the message went out on, for example sms or whatsapp. A message that
   * falls back to another channel reports the channel actually used.
   */
  channel?: string;

  /**
   * The message this event describes. Stable across every event in the message's
   * lifecycle, so use it to correlate them.
   */
  message_id?: string;

  /**
   * The recipient's number in E.164 format.
   */
  outbound_number?: string;

  /**
   * The template the message was sent from, when it was sent from one.
   */
  template_id?: string | null;

  /**
   * Name of the template the message was sent from. Omitted when the message wasn't
   * template-based.
   */
  template_name?: string | null;

  /**
   * When the message reached MessageStatus, in UTC (yyyy-MM-ddTHH:mm:ssZ).
   */
  updated_at?: string;
}

export interface MutationRequest {
  /**
   * Sandbox flag - when true, the operation is simulated without side effects Useful
   * for testing integrations without actual execution
   */
  sandbox?: boolean;
}

/**
 * Pagination metadata for list responses
 */
export interface PaginationMeta {
  /**
   * @deprecated Cursor-based pagination. Never populated — see Cursors.
   */
  cursors?: PaginationMeta.Cursors | null;

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

export namespace PaginationMeta {
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

/**
 * The envelope Sent POSTs to a subscribed webhook endpoint. Every event shares
 * this shape and varies only in Payload.
 */
export interface TemplateEvent {
  /**
   * The specific event within the family, for example message.delivered,
   * message.received or contact.opt_out. Absent on events that have no subtype, so
   * treat it as optional.
   */
  event?: string | null;

  /**
   * The event family, for example message, templates or contact. Route on this
   * first, then on event for the specific change.
   */
  field?: string;

  /**
   * Body of a template status event. Delivered when a template's review outcome
   * changes, so you can react without polling.
   */
  payload?: TemplateEventPayload | null;

  /**
   * The event-specific body.
   */
  request_id?: string | null;

  /**
   * When Sent emitted the event, in UTC (yyyy-MM-ddTHH:mm:ssZ). This is the emission
   * time, not the time the underlying change happened. Use the timestamp inside the
   * payload for the latter.
   */
  timestamp?: string;
}

/**
 * Body of a template status event. Delivered when a template's review outcome
 * changes, so you can react without polling.
 */
export interface TemplateEventPayload {
  /**
   * The review status the template just reached, for example APPROVED or REJECTED.
   */
  status: string;

  /**
   * The template's identifier with Meta, assigned when the template is submitted for
   * review.
   */
  whatsapp_template_id: string;

  /**
   * The account the template belongs to.
   */
  account_id?: string;

  /**
   * Which consent keyword this template answers, when it is one of Sent's
   * auto-replies: OPT_IN, OPT_OUT, HELP, or OTHER for a customer-defined keyword.
   *
   * Omitted for an ordinary template, so its presence is the answer to "is this an
   * auto-reply". Sent creates the three compliance auto-replies at signup and they
   * go through review like any other template, so their events arrive mixed in with
   * the customer's own with nothing else to tell them apart.
   *
   * Named for the reader rather than after Template.OptAction, which it is mapped
   * from. The MCP tool result deliberately keeps OptAction, OptKeywords and IsOpt:
   * it mirrors the internal shape on purpose and publishes the keywords too, so
   * renaming one of the three there would leave a surface half in each vocabulary.
   * Two names for one concept, each consistent within its own surface, chosen over a
   * rename that breaks MCP clients silently.
   */
  auto_reply_action?: string | null;

  /**
   * The template's category, for example UTILITY, MARKETING, or AUTHENTICATION.
   */
  category?: string;

  /**
   * The channel leg this decision is about, for example whatsapp, sms, or rcs. A
   * template is reviewed per channel and the legs come back independently, so each
   * one reports separately.
   *
   * Omitted when the decision applies to the template as a whole rather than to one
   * leg. That event is the broader news: a template-wide rejection blocks every
   * channel, whatever the individual legs say.
   */
  channel?: string | null;

  /**
   * The template's language code, for example en_US.
   */
  language?: string;

  /**
   * Why the template reached Status, when a reason was given. Populated on a
   * rejection.
   */
  reason?: string | null;

  /**
   * The template in Sent.
   */
  template_id?: string;

  /**
   * The template's display name.
   */
  template_name?: string;
}

export interface WebhookEventType {
  description?: string | null;

  display_name?: string;

  event_type?: string | null;

  is_active?: boolean;

  name?: string;

  sub_types?: Array<WebhookEventType> | null;
}

export interface WebhookResponse {
  id?: string;

  consecutive_failures?: number;

  created_at?: string;

  /**
   * Which customer owns this — the key's own, or the profile named in x-profile-id.
   * Says whose resource this is, which the resource's own id does not.
   */
  customer_id?: string;

  display_name?: string;

  endpoint_url?: string;

  event_filters?: { [key: string]: Array<string> } | null;

  event_types?: Array<string>;

  is_active?: boolean;

  last_delivery_attempt_at?: string | null;

  last_successful_delivery_at?: string | null;

  retry_count?: number;

  signing_secret?: string | null;

  timeout_seconds?: number;

  updated_at?: string | null;
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface WebhookListEventTypesResponse {
  /**
   * The webhook event types a customer can subscribe to.
   */
  data?: WebhookListEventTypesResponse.Data | null;

  /**
   * Error information
   */
  error?: ErrorDetail | null;

  /**
   * Request and response metadata
   */
  meta?: APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace WebhookListEventTypesResponse {
  /**
   * The webhook event types a customer can subscribe to.
   */
  export interface Data {
    /**
     * The event_types on this page.
     */
    event_types?: Array<WebhooksAPI.WebhookEventType>;

    /**
     * Pagination metadata for list responses
     */
    pagination?: WebhooksAPI.PaginationMeta;
  }
}

export interface WebhookListEventsResponse {
  id?: string;

  created_at?: string;

  delivery_attempts?: number;

  delivery_status?: string;

  error_message?: string | null;

  /**
   * The exact event body that was delivered, or attempted, for this record. One of
   * the four webhook envelopes: a message status change, an inbound message, a
   * template status change, or a contact consent signal. Read field and event to
   * tell which, the same way your endpoint does.
   */
  event_data?:
    | MessageEvent
    | InboundMessageEvent
    | TemplateEvent
    | WebhookListEventsResponse.SentDmServicesCommonServicesWebhooksContractsWebhookEventOfChannelWebhookPayload
    | WebhookListEventsResponse.SentDmServicesCommonServicesWebhooksContractsWebhookEventOfContactWebhookPayload;

  event_type?: string;

  http_status_code?: number | null;

  processing_completed_at?: string | null;

  processing_started_at?: string | null;

  response_body?: string | null;
}

export namespace WebhookListEventsResponse {
  /**
   * The envelope Sent POSTs to a subscribed webhook endpoint. Every event shares
   * this shape and varies only in Payload.
   */
  export interface SentDmServicesCommonServicesWebhooksContractsWebhookEventOfChannelWebhookPayload {
    /**
     * The specific event within the family, for example message.delivered,
     * message.received or contact.opt_out. Absent on events that have no subtype, so
     * treat it as optional.
     */
    event?: string | null;

    /**
     * The event family, for example message, templates or contact. Route on this
     * first, then on event for the specific change.
     */
    field?: string;

    /**
     * Body of a channel event: where one of the customer's channels stands in
     * provisioning and compliance. Delivered when a milestone moves — a registration
     * filed, a verdict returned, a resubmission asked for, a sender gone live — so a
     * customer's own onboarding UI does not have to poll GET /v3/channels.
     *
     * The subject is one item, never the account. A customer's "SMS channel" has no
     * status; a market does. Country, NumberType and SenderValue name which one, so a
     * customer terminating only to Kosovo never receives an event about US 10DLC.
     *
     * Status is the stable half of the contract. It is the same four-value set GET
     * /v3/channels publishes, computed through the same code, so an event and a read
     * of the same market cannot disagree. A subscriber that reads nothing but the
     * status and the subject fields is a correct subscriber. The sub-type on the
     * envelope names the specific milestone and is additive — that vocabulary comes
     * from registries and carriers, which are parties Sent does not control.
     *
     * Status means provisioning and compliance are complete, not that a send will
     * succeed right now. An account can be suspended, or a destination blocked by a
     * routing rule, without either showing up here. Those are separate surfaces and
     * deliberately not modelled on this payload.
     */
    payload?: SentDmServicesCommonServicesWebhooksContractsWebhookEventOfChannelWebhookPayload.Payload | null;

    /**
     * The event-specific body.
     */
    request_id?: string | null;

    /**
     * When Sent emitted the event, in UTC (yyyy-MM-ddTHH:mm:ssZ). This is the emission
     * time, not the time the underlying change happened. Use the timestamp inside the
     * payload for the latter.
     */
    timestamp?: string;
  }

  export namespace SentDmServicesCommonServicesWebhooksContractsWebhookEventOfChannelWebhookPayload {
    /**
     * Body of a channel event: where one of the customer's channels stands in
     * provisioning and compliance. Delivered when a milestone moves — a registration
     * filed, a verdict returned, a resubmission asked for, a sender gone live — so a
     * customer's own onboarding UI does not have to poll GET /v3/channels.
     *
     * The subject is one item, never the account. A customer's "SMS channel" has no
     * status; a market does. Country, NumberType and SenderValue name which one, so a
     * customer terminating only to Kosovo never receives an event about US 10DLC.
     *
     * Status is the stable half of the contract. It is the same four-value set GET
     * /v3/channels publishes, computed through the same code, so an event and a read
     * of the same market cannot disagree. A subscriber that reads nothing but the
     * status and the subject fields is a correct subscriber. The sub-type on the
     * envelope names the specific milestone and is additive — that vocabulary comes
     * from registries and carriers, which are parties Sent does not control.
     *
     * Status means provisioning and compliance are complete, not that a send will
     * succeed right now. An account can be suspended, or a destination blocked by a
     * routing rule, without either showing up here. Those are separate surfaces and
     * deliberately not modelled on this payload.
     */
    export interface Payload {
      /**
       * The market's destination country as an ISO 3166-1 alpha-2 code, for example XK.
       * Always present, and the property that identifies this payload among the
       * delivered envelopes — see DeliveredWebhookEvents. Every event in this family
       * reports one market, and a market has a country.
       */
      country: string;

      /**
       * The account whose market this is, named as on every other family. When an
       * organization receives an event for one of its sender profiles this is the
       * profile, so a reseller compares it with its own id and anything different is one
       * of its profiles.
       */
      account_id?: string;

      /**
       * The channel this market belongs to: sms, whatsapp, or rcs. Never sent — that
       * value belongs to message events, where it names the smart-routing brand rather
       * than a channel that can be provisioned.
       */
      channel?: string;

      /**
       * The kind of sender the market uses, for example TEN_DLC, LOCAL, or ALPHANUMERIC.
       * Omitted when the subject has no sender type of its own.
       */
      number_type?: string | null;

      /**
       * Why the market reached this state, when a reason was given — a correction
       * explained, or a campaign lapse. Free text, passed through from the registry or
       * carrier that wrote it, so treat it as a message to show a human rather than a
       * value to branch on.
       */
      reason?: string | null;

      /**
       * The sender itself — a number in E.164, or an alphanumeric sender ID.
       *
       * Always present, and null until a sender exists. The key is on every delivery so
       * a subscriber reads one shape rather than branching on whether the field arrived
       * — the same choice template_id makes on the message payload.
       *
       * It can carry a value at any point in the lifecycle, not only once the market is
       * live: a number ordered and not yet active at the carrier is already known during
       * PROVISIONING, and an alphanumeric sender the customer chose themselves is known
       * before anything is filed. It is null while the market is still waiting on a
       * number, which for a US 10DLC registration is every event up to
       * channel.activated.
       */
      sender_value?: string | null;

      /**
       * Where the market stands: PENDING_REVIEW, ACTION_NEEDED, PROVISIONING, ACTIVE or
       * INACTIVE. PENDING_REVIEW means a registry or a carrier holds it and the wait is
       * theirs; ACTION_NEEDED means it is yours; PROVISIONING means the verdict is in
       * and Sent is acquiring the sender; INACTIVE means it had a working sender and no
       * longer does.
       *
       * Each event name is the transition into one of these, but the two are separate
       * fields and may legitimately differ. A resubmission filed against a market whose
       * sender is already live is channel.submitted carrying ACTIVE: a correction is
       * with the registry and the sender keeps working. Read both.
       */
      status?: string;

      /**
       * When the transition happened, in UTC (yyyy-MM-ddTHH:mm:ssZ).
       */
      updated_at?: string;
    }
  }

  /**
   * The envelope Sent POSTs to a subscribed webhook endpoint. Every event shares
   * this shape and varies only in Payload.
   */
  export interface SentDmServicesCommonServicesWebhooksContractsWebhookEventOfContactWebhookPayload {
    /**
     * The specific event within the family, for example message.delivered,
     * message.received or contact.opt_out. Absent on events that have no subtype, so
     * treat it as optional.
     */
    event?: string | null;

    /**
     * The event family, for example message, templates or contact. Route on this
     * first, then on event for the specific change.
     */
    field?: string;

    /**
     * Body of a contact.opt_in, contact.opt_out or contact.help event. Delivered when
     * a contact signals a consent change or asks for help.
     *
     * These events state the signal outright, so you do not have to recognise keywords
     * in the text of a message.received event. They also cover cases that produce no
     * inbound message at all, such as a network handling an opt-out on your behalf.
     *
     * Fields are ordered identity → resulting state → provenance → join key. Nothing
     * here restates the envelope: which of the three signals occurred is the
     * envelope's event, and when it was emitted is its timestamp. Retries carry the
     * same X-Webhook-Event-ID header, which is what to deduplicate on.
     */
    payload?: SentDmServicesCommonServicesWebhooksContractsWebhookEventOfContactWebhookPayload.Payload | null;

    /**
     * The event-specific body.
     */
    request_id?: string | null;

    /**
     * When Sent emitted the event, in UTC (yyyy-MM-ddTHH:mm:ssZ). This is the emission
     * time, not the time the underlying change happened. Use the timestamp inside the
     * payload for the latter.
     */
    timestamp?: string;
  }

  export namespace SentDmServicesCommonServicesWebhooksContractsWebhookEventOfContactWebhookPayload {
    /**
     * Body of a contact.opt_in, contact.opt_out or contact.help event. Delivered when
     * a contact signals a consent change or asks for help.
     *
     * These events state the signal outright, so you do not have to recognise keywords
     * in the text of a message.received event. They also cover cases that produce no
     * inbound message at all, such as a network handling an opt-out on your behalf.
     *
     * Fields are ordered identity → resulting state → provenance → join key. Nothing
     * here restates the envelope: which of the three signals occurred is the
     * envelope's event, and when it was emitted is its timestamp. Retries carry the
     * same X-Webhook-Event-ID header, which is what to deduplicate on.
     */
    export interface Payload {
      /**
       * Whether the contact is opted out after this signal — the state to write to your
       * own record. Same meaning as opt_out on the contact resource. On contact.help
       * this reports the contact's existing state, which help does not change.
       *
       * Two signals from the same contact can arrive out of order, because each one is
       * queued on its own rather than against the contact. Compare the envelope's
       * timestamp before you overwrite a newer state with an older one. That timestamp
       * is second-precision, so treat two signals stamped in the same second as
       * unordered and read the contact resource to settle them.
       */
      opt_out: boolean;

      /**
       * How the signal reached us. INBOUND_KEYWORD means the contact sent a message
       * whose text matched one of the keywords; PROVIDER_SIGNAL means the network
       * reported it. A provider signal usually carries no message_id or text, so read
       * both for null rather than inferring them from this field.
       */
      source: string;

      /**
       * The account the contact belongs to. Present so one endpoint can serve several
       * accounts.
       */
      account_id?: string;

      /**
       * The channel the signal arrived on, for example sms or whatsapp.
       */
      channel?: string;

      /**
       * The contact who raised the signal. Always populated, including for contact.help
       * from a number you have not messaged before — the contact is created if it does
       * not exist yet, so this identifier is always resolvable against the contacts API.
       */
      contact_id?: string;

      /**
       * The inbound message that carried the signal, matching message_id on the
       * corresponding message.received event so the two can be joined.
       *
       * Sent as null when the signal did not arrive as a message — for example when a
       * network processed an opt-out on your behalf — and also when the message belongs
       * to a different account than this event, which can happen on a shared WhatsApp
       * number. The field is always present, so read it and check for null rather than
       * checking whether the key exists.
       */
      message_id?: string | null;

      /**
       * The contact's number in E.164 format. Same value as phone_number on the contact
       * resource.
       */
      phone_number?: string;

      /**
       * The text the contact sent, for example STOP or UNSUBSCRIBE. Sent as null when
       * the signal did not arrive as text. The field is always present, so read it and
       * check for null rather than checking whether the key exists.
       */
      text?: string | null;
    }
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface WebhookRotateSecretResponse {
  /**
   * The response data (null if error)
   */
  data?: WebhookRotateSecretResponse.Data | null;

  /**
   * Error information
   */
  error?: ErrorDetail | null;

  /**
   * Request and response metadata
   */
  meta?: APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace WebhookRotateSecretResponse {
  /**
   * The response data (null if error)
   */
  export interface Data {
    signing_secret?: string;
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface WebhookTestResponse {
  /**
   * The response data (null if error)
   */
  data?: WebhookTestResponse.Data | null;

  /**
   * Error information
   */
  error?: ErrorDetail | null;

  /**
   * Request and response metadata
   */
  meta?: APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace WebhookTestResponse {
  /**
   * The response data (null if error)
   */
  export interface Data {
    message?: string;

    success?: boolean;
  }
}

export interface WebhookCreateParams {
  /**
   * Body param
   */
  display_name?: string;

  /**
   * Body param
   */
  endpoint_url?: string;

  /**
   * Body param
   */
  event_filters?: { [key: string]: Array<string> } | null;

  /**
   * Body param
   */
  event_types?: Array<string>;

  /**
   * Body param
   */
  retry_count?: number;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param
   */
  timeout_seconds?: number;

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

export interface WebhookRetrieveParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface WebhookUpdateParams {
  /**
   * Body param
   */
  display_name?: string;

  /**
   * Body param
   */
  endpoint_url?: string;

  /**
   * Body param
   */
  event_filters?: { [key: string]: Array<string> } | null;

  /**
   * Body param
   */
  event_types?: Array<string>;

  /**
   * Body param
   */
  retry_count?: number;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param
   */
  timeout_seconds?: number;

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

export interface WebhookListParams extends WebhooksPageParams {
  /**
   * Query param
   */
  is_active?: boolean | null;

  /**
   * Query param
   */
  search?: string | null;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface WebhookDeleteParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface WebhookListEventTypesParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface WebhookListEventsParams extends WebhookEventsPageParams {
  /**
   * Query param
   */
  search?: string | null;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface WebhookRotateSecretParams {
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

export interface WebhookTestParams {
  /**
   * Body param
   */
  event_type?: string;

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

export interface WebhookToggleStatusParams {
  /**
   * Body param
   */
  is_active?: boolean;

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

export declare namespace Webhooks {
  export {
    type APIMeta as APIMeta,
    type APIResponseWebhook as APIResponseWebhook,
    type ErrorDetail as ErrorDetail,
    type InboundMessageEvent as InboundMessageEvent,
    type InboundMessageEventPayload as InboundMessageEventPayload,
    type MessageEvent as MessageEvent,
    type MessageEventPayload as MessageEventPayload,
    type MutationRequest as MutationRequest,
    type PaginationMeta as PaginationMeta,
    type TemplateEvent as TemplateEvent,
    type TemplateEventPayload as TemplateEventPayload,
    type WebhookEventType as WebhookEventType,
    type WebhookResponse as WebhookResponse,
    type WebhookListEventTypesResponse as WebhookListEventTypesResponse,
    type WebhookListEventsResponse as WebhookListEventsResponse,
    type WebhookRotateSecretResponse as WebhookRotateSecretResponse,
    type WebhookTestResponse as WebhookTestResponse,
    type WebhookResponsesWebhooksPage as WebhookResponsesWebhooksPage,
    type WebhookListEventsResponsesWebhookEventsPage as WebhookListEventsResponsesWebhookEventsPage,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookRetrieveParams as WebhookRetrieveParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListParams as WebhookListParams,
    type WebhookDeleteParams as WebhookDeleteParams,
    type WebhookListEventTypesParams as WebhookListEventTypesParams,
    type WebhookListEventsParams as WebhookListEventsParams,
    type WebhookRotateSecretParams as WebhookRotateSecretParams,
    type WebhookTestParams as WebhookTestParams,
    type WebhookToggleStatusParams as WebhookToggleStatusParams,
  };
}
