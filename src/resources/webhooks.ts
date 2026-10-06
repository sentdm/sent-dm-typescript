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
   * Retrieves a paginated list of delivery events for the specified webhook. If the
   * webhook is cloned onto your sender profiles, the list includes what those clones
   * received; read payload.account_id to tell whose event it is.
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
 * The envelope Sent POSTs to a subscribed webhook endpoint. Every event shares
 * this shape and varies only in Payload.
 */
export interface CallEvent {
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
   * Body of a call.initiated, call.answered, call.completed, call.failed or
   * call.recording_ready event. Which of them occurred is the envelope's event.
   *
   * Shaped like the message, inbound, template and channel payloads: account_id
   * names the account the event is about, channel names the channel, and updated_at
   * is when the change happened on the call, in the same yyyy-MM-ddTHH:mm:ssZ form.
   * duration_seconds and price are added on call.completed, reason on call.failed
   * and recording_id on call.recording_ready; each is omitted rather than sent as
   * null when it does not apply.
   *
   * Casing is snake_case because these ride the same webhook stream customers
   * already parse message_id from; the question/answer contract is a separate
   * surface and stays camelCase. Nothing here is provider-shaped: no provider call
   * id, no namespaced identity.
   */
  payload?: CallEventPayload | null;

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
 * Body of a call.initiated, call.answered, call.completed, call.failed or
 * call.recording_ready event. Which of them occurred is the envelope's event.
 *
 * Shaped like the message, inbound, template and channel payloads: account_id
 * names the account the event is about, channel names the channel, and updated_at
 * is when the change happened on the call, in the same yyyy-MM-ddTHH:mm:ssZ form.
 * duration_seconds and price are added on call.completed, reason on call.failed
 * and recording_id on call.recording_ready; each is omitted rather than sent as
 * null when it does not apply.
 *
 * Casing is snake_case because these ride the same webhook stream customers
 * already parse message_id from; the question/answer contract is a separate
 * surface and stays camelCase. Nothing here is provider-shaped: no provider call
 * id, no namespaced identity.
 */
export interface CallEventPayload {
  /**
   * Sent's call id, the same one the customer saw on the first question.
   */
  call_id: string;

  /**
   * The account the call belongs to: the key's own customer, or the sender profile
   * it acted as.
   */
  account_id?: string;

  /**
   * Always voice.
   */
  channel?: string;

  /**
   * How long the call lasted. Only on call.completed.
   */
  duration_seconds?: number | null;

  /**
   * The customer number that owns the call, in E.164 format.
   */
  number?: string;

  /**
   * What the call was charged. Only on call.completed, and omitted there until
   * billing has recorded the charge.
   */
  price?: number | null;

  /**
   * The machine-readable reason the call did not complete. Only on call.failed, and
   * omitted when no reason was recorded.
   */
  reason?: string | null;

  /**
   * The recording that became available, the same id GET /v3/calls/{id}/recordings
   * lists it under. Only on call.recording_ready, which is sent once per recording.
   */
  recording_id?: string | null;

  /**
   * When the change happened on the call, as opposed to when the event was emitted.
   */
  updated_at?: string;
}

/**
 * The envelope Sent POSTs to a subscribed webhook endpoint. Every event shares
 * this shape and varies only in Payload.
 */
export interface ChannelEvent {
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
  payload?: ChannelEventPayload | null;

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
export interface ChannelEventPayload {
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
   * of its profiles. Matches customer_id on GET /v3/channels and the sender
   * profile's id. Together with channel, country, and number_type, it identifies the
   * market.
   */
  account_id?: string;

  /**
   * The channel this market belongs to: sms, whatsapp, or rcs. Never sent — that
   * value belongs to message events, where it names the smart-routing brand rather
   * than a channel that can be provisioned.
   */
  channel?: string;

  /**
   * What a market has been given: the identity it registers under, its programme,
   * and any documents attached.
   *
   * What it does not carry is what the market asks for. That is the subject of GET
   * /v3/compliance/requirements, and it is the same answer for every caller — a
   * description of what a compliance regime wants, not a record of one customer's
   * progress through it. It was reported here as well for a while, which put the
   * same array in six response shapes and left a caller deciding which of two
   * sources to believe.
   *
   * Present on a list read for markets that register (carrying brand and campaign),
   * but with documents absent — documents are not fetched for a list, because a
   * catalog lookup and a document read per market would multiply across a page.
   * Absent documents is distinct from an empty list: absent says they were not
   * fetched; empty says the market has been given none. The parent object is null
   * only when the market registers with nobody and compliance was not computed —
   * nothing to show at all.
   */
  compliance?: ChannelEventPayload.Compliance | null;

  /**
   * The kind of sender the market uses, for example TEN_DLC, LOCAL, or ALPHANUMERIC.
   * Omitted when the subject has no sender type of its own.
   */
  number_type?: string | null;

  /**
   * Why the market reached this state, as a sentence to show a person: the specific
   * explanation when one was given (a correction explained, a campaign lapse),
   * otherwise what reason_code means for this market. Not a value to branch on.
   */
  reason?: string | null;

  /**
   * Why the market is not ACTIVE, as a stable code: an ErrorCodes CHANNEL_xxx value
   * such as CHANNEL_001 (something you owe) or CHANNEL_002 (a correction was
   * requested). The same code the channels resource reports for the market. Switch
   * on this rather than on reason. Omitted while ACTIVE.
   */
  reason_code?: string | null;

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

export namespace ChannelEventPayload {
  /**
   * What a market has been given: the identity it registers under, its programme,
   * and any documents attached.
   *
   * What it does not carry is what the market asks for. That is the subject of GET
   * /v3/compliance/requirements, and it is the same answer for every caller — a
   * description of what a compliance regime wants, not a record of one customer's
   * progress through it. It was reported here as well for a while, which put the
   * same array in six response shapes and left a caller deciding which of two
   * sources to believe.
   *
   * Present on a list read for markets that register (carrying brand and campaign),
   * but with documents absent — documents are not fetched for a list, because a
   * catalog lookup and a document read per market would multiply across a page.
   * Absent documents is distinct from an empty list: absent says they were not
   * fetched; empty says the market has been given none. The parent object is null
   * only when the market registers with nobody and compliance was not computed —
   * nothing to show at all.
   */
  export interface Compliance {
    /**
     * The identity this market registers under, with inherit saying whose it is.
     *
     * Reported here rather than on the profile because it belongs to the registration
     * this market files, and only one market files one. It was a top-level block for a
     * while, which put a per-registration value beside a list of markets and left a
     * caller to work out which market it belonged to.
     *
     * Absent for a market that registers with nobody — such a market asks for no
     * identity, so there is none to report. Absent and null mean different things:
     * absent says this market does not ask, null would say it asks and nothing was
     * supplied.
     *
     * Untyped, like the request side, because its members are declared by the market's
     * own schema rather than by a C# class. A typed pair here would be a second
     * definition of what a market wants, free to drift from the one that validates.
     */
    brand?: { [key: string]: unknown } | null;

    /**
     * The programme this market registers, with inherit saying whose it is.
     *
     * One, not a list. TcrCampaigns permits several and an account built on the admin
     * side may hold them, but this surface offers one — which is what lets the
     * market's PATCH be an upsert rather than a collection with an addressable create
     * behind it. An account holding several is reported as its first and refused on
     * write, rather than half-edited.
     *
     * Carries no id. Nothing addresses a campaign, and an undeclared key would be
     * refused if the caller sent this object back — which it is meant to be able to
     * do.
     */
    campaign?: { [key: string]: unknown } | null;

    /**
     * What has been supplied for this market.
     *
     * Files, not values — the declared halves above carry the values. A document
     * cannot be a JSON value, so it is sent as multipart on the channel call and
     * reported here as a reference.
     *
     * Absent on a list read, which fetches identity but does not compute compliance
     * documents per market. Absent and empty mean different things: absent says the
     * documents were not fetched; empty says the market has been given none.
     */
    documents?: Array<Compliance.Document> | null;
  }

  export namespace Compliance {
    /**
     * A document a market asked for and has been given.
     */
    export interface Document {
      /**
       * Identifier of the upload, for fetching it back through the documents endpoints.
       */
      document_id?: string | null;

      file_name?: string | null;

      /**
       * The catalog's name for this document, matching the requirement it satisfies.
       */
      key?: string;
    }
  }
}

/**
 * The envelope Sent POSTs to a subscribed webhook endpoint. Every event shares
 * this shape and varies only in Payload.
 */
export interface ContactEvent {
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
   * Body of a contact.opt_in, contact.opt_out, contact.help or
   * contact.custom_keyword event. Delivered when a contact signals a consent change,
   * asks for help, or sends one of your own auto-reply keywords.
   *
   * These events state the signal outright, so you do not have to recognise keywords
   * in the text of a message.received event. They also cover cases that produce no
   * inbound message at all, such as a network handling an opt-out on your behalf.
   *
   * Two of the four change consent and two do not: contact.help and
   * contact.custom_keyword report the state the contact already had. Read opt_out
   * for the state and the envelope's event for what happened, rather than inferring
   * one from the other.
   *
   * Fields are ordered identity → resulting state → provenance → join keys. The two
   * parties are from and to. Note that the message family has not moved to those
   * names yet — message.received still calls the same two parties inbound_number and
   * outbound_number. Nothing here restates the envelope: which signal occurred is
   * the envelope's event, and when it was emitted is its timestamp. Retries carry
   * the same X-Webhook-Event-ID header, which is what to deduplicate on.
   */
  payload?: ContactEventPayload | null;

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
 * Body of a contact.opt_in, contact.opt_out, contact.help or
 * contact.custom_keyword event. Delivered when a contact signals a consent change,
 * asks for help, or sends one of your own auto-reply keywords.
 *
 * These events state the signal outright, so you do not have to recognise keywords
 * in the text of a message.received event. They also cover cases that produce no
 * inbound message at all, such as a network handling an opt-out on your behalf.
 *
 * Two of the four change consent and two do not: contact.help and
 * contact.custom_keyword report the state the contact already had. Read opt_out
 * for the state and the envelope's event for what happened, rather than inferring
 * one from the other.
 *
 * Fields are ordered identity → resulting state → provenance → join keys. The two
 * parties are from and to. Note that the message family has not moved to those
 * names yet — message.received still calls the same two parties inbound_number and
 * outbound_number. Nothing here restates the envelope: which signal occurred is
 * the envelope's event, and when it was emitted is its timestamp. Retries carry
 * the same X-Webhook-Event-ID header, which is what to deduplicate on.
 */
export interface ContactEventPayload {
  /**
   * Whether the contact is opted out after this signal — the state to write to your
   * own record. Same meaning as opt_out on the contact resource. On contact.help and
   * contact.custom_keyword this reports the contact's existing state, which neither
   * changes.
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
   * The RCS agent the signal reached, when it reached one.
   *
   * Omitted entirely on channels that have no agent, rather than sent as null — an
   * SMS or WhatsApp payload does not carry this key at all. On RCS it is the
   * counterpart to To: a contact reaches an agent rather than a number, so exactly
   * one of the two is populated and never both. If you run more than one agent, this
   * is what tells you which of them the contact acted on.
   */
  agent_id?: string | null;

  /**
   * The channel the signal arrived on, for example sms or whatsapp.
   */
  channel?: string;

  /**
   * The contact who raised the signal. Always populated, including for contact.help
   * or contact.custom_keyword from a number you have not messaged before — the
   * contact is created if it does not exist yet, so this identifier is always
   * resolvable against the contacts API.
   */
  contact_id?: string;

  /**
   * The contact's number, in E.164 format with the leading + — who raised the
   * signal. The same party message.received publishes as inbound_number.
   */
  from?: string;

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
   * The auto-reply template whose keyword the contact matched, joinable against the
   * templates API.
   *
   * This is what identifies which signal arrived on contact.custom_keyword: every
   * custom template reports the same event name, so the event alone cannot tell your
   * booking keyword from your opening-hours one. One template holds as many keywords
   * as you configured, so this is steadier to switch on than text.
   *
   * Populated on the compliance sub-types too, where it names the template that
   * replied. Sent as null when no template was involved — a network-reported opt-out
   * matches no keyword. The field is always present, so read it and check for null.
   */
  template_id?: string | null;

  /**
   * The text the contact sent, for example STOP or UNSUBSCRIBE. Sent as null when
   * the signal did not arrive as text. The field is always present, so read it and
   * check for null rather than checking whether the key exists.
   */
  text?: string | null;

  /**
   * The number of yours that received the signal, in E.164 format with the leading
   * +. Tells a multi-number account which of its senders the contact acted on, which
   * nothing else on this payload answers.
   *
   * This is your number, not the contact's. That is the opposite of what to means on
   * POST /v3/messages, where it is the list of recipients you are sending to. Reply
   * to From, not to this field, or the message goes back to yourself.
   *
   * Sent as null when the signal did not arrive at a number of yours — an RCS signal
   * terminates at an agent rather than a number, and a provider-reported opt-out may
   * name no receiving number at all. The field is always present, so read it and
   * check for null rather than checking whether the key exists.
   */
  to?: string | null;
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
   * The channel the message arrived on, for example sms or mms.
   */
  channel?: string;

  /**
   * Attachments the contact sent, present only on channels that carry them (mms
   * today) and omitted entirely otherwise.
   *
   * Each url points at the carrier's own copy of the file — sent.dm records where
   * the attachment is, not the attachment itself. The link is unauthenticated and
   * expires on the carrier's schedule, which differs between them: assume days, not
   * months. Download what you need on receipt; re-reading the message through GET
   * /v3/messages/{id} returns the same stored link, not a fresh one, so once it
   * lapses the entry remains with whatever the carrier declared about the file but
   * the file is no longer reachable.
   */
  media?: Array<InboundMessageEventPayload.Media> | null;

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

export namespace InboundMessageEventPayload {
  /**
   * One attachment on an inbound message.
   */
  export interface Media {
    /**
     * SHA-256 of the file as the carrier declared it, when it declares one. Verify
     * what you download against this — sent.dm never reads the bytes, so it is the
     * only integrity signal available.
     */
    hash_sha256?: string | null;

    /**
     * Content type as the carrier reported it, for example image/jpeg.
     */
    mime_type?: string | null;

    /**
     * Size in bytes as the carrier declared it. Absent when it declared none.
     */
    size_bytes?: number | null;

    /**
     * Where the carrier hosts the attachment.
     *
     * This link expires and is not authenticated. sent.dm relays it rather than
     * copying the file, so how long it stays fetchable is the carrier's decision and
     * differs between them — assume days, not months. Anyone holding the URL can fetch
     * it until it lapses. Copy the file on receipt if you need it to outlive that
     * window; do not store this URL as a permanent reference.
     */
    url?: string | null;
  }
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
   * A human-readable sentence for ReasonCode, for example "The recipient is not
   * registered on this channel". Omitted whenever reason_code is.
   */
  reason?: string | null;

  /**
   * Why the message reached this status, as a stable platform code such as
   * DELIVERY_007 or BUSINESS_003. Present on message.failed, message.filtered and
   * message.blocked; omitted on every status that needs no explanation. Switch on
   * this rather than on Reason: the code is stable, the wording may be improved. It
   * is the platform's classification of the outcome and never a carrier or vendor
   * code.
   */
  reason_code?: string | null;

  /**
   * message.scheduled only: why the message is held, either because you scheduled it
   * or because the recipient is inside a protected quiet-hours window. Omitted on
   * every other event, including message.cancelled — that is a property of the hold,
   * not of the cancellation, and repeating it there would read as "why was this
   * cancelled", which it does not answer.
   */
  schedule_reason?: string | null;

  /**
   * message.scheduled and message.cancelled only, in UTC (yyyy-MM-ddTHH:mm:ssZ): on
   * message.scheduled it is when the held message will be released for delivery, on
   * message.cancelled the release instant that was called off — the same instant,
   * before and after. A consumer that recorded a future send from the first event
   * has what it needs to un-record it from the second. Omitted on every other event.
   */
  scheduled_at?: string | null;

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
   * the six webhook envelopes:
   *
   * message — an outbound message changed status. message with event:
   * message.received — someone replied to you. templates — a template was approved,
   * rejected, paused or similar. channel — one of your markets moved in provisioning
   * or compliance. contact — a consent signal: opt-in, opt-out or help. link — a
   * tracked short link was clicked or a hosted file downloaded, or one expired or
   * was revoked.
   *
   * Read field and event to tell which, the same way your endpoint does. The two
   * message envelopes are the reason that is two fields and not one: they share a
   * field and differ by event.
   *
   * Treat the list as open. It has grown twice — channel and then link — and a
   * handler that rejects an envelope it does not recognise will break on the next
   * addition rather than ignore it.
   */
  event_data?:
    | MessageEvent
    | InboundMessageEvent
    | TemplateEvent
    | ChannelEvent
    | ContactEvent
    | WebhookListEventsResponse.SentDmServicesCommonServicesWebhooksContractsWebhookEventOfLinkWebhookPayload
    | CallEvent;

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
  export interface SentDmServicesCommonServicesWebhooksContractsWebhookEventOfLinkWebhookPayload {
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
     * Body of a link event: something happened to a tracked link Sent published on the
     * customer's behalf. A link points either at a URL the customer supplied or at a
     * file Sent hosts for them; LinkKind says which. Delivered when an eligible
     * request is served, or when a published link reaches the end of its life.
     *
     * A click is a request, not a read receipt. link.clicked means the redirect was
     * served; link.downloaded means bytes went out. Neither proves a person saw
     * anything — messaging providers and link scanners fetch URLs on their own, which
     * is what TrafficClass exists to tell apart. Filter on it before reporting a
     * click-through rate; treat likely_human as a hint, never as delivery
     * confirmation.
     *
     * RecordId identifies the link; the X-Webhook-Event-ID header identifies the
     * delivery. One link is hit many times, so those are the two keys a subscriber
     * needs: group by the first, deduplicate on the second — exactly as on every other
     * family. The payload carries no event identifier of its own, for the same reason
     * none of the others do.
     *
     * Nothing here identifies the visitor. No IP address and no visitor token crosses
     * this boundary. Country, Device and Browser are coarse buckets derived at the
     * edge and are absent whenever the request did not supply enough to derive them.
     */
    payload?: SentDmServicesCommonServicesWebhooksContractsWebhookEventOfLinkWebhookPayload.Payload | null;

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

  export namespace SentDmServicesCommonServicesWebhooksContractsWebhookEventOfLinkWebhookPayload {
    /**
     * Body of a link event: something happened to a tracked link Sent published on the
     * customer's behalf. A link points either at a URL the customer supplied or at a
     * file Sent hosts for them; LinkKind says which. Delivered when an eligible
     * request is served, or when a published link reaches the end of its life.
     *
     * A click is a request, not a read receipt. link.clicked means the redirect was
     * served; link.downloaded means bytes went out. Neither proves a person saw
     * anything — messaging providers and link scanners fetch URLs on their own, which
     * is what TrafficClass exists to tell apart. Filter on it before reporting a
     * click-through rate; treat likely_human as a hint, never as delivery
     * confirmation.
     *
     * RecordId identifies the link; the X-Webhook-Event-ID header identifies the
     * delivery. One link is hit many times, so those are the two keys a subscriber
     * needs: group by the first, deduplicate on the second — exactly as on every other
     * family. The payload carries no event identifier of its own, for the same reason
     * none of the others do.
     *
     * Nothing here identifies the visitor. No IP address and no visitor token crosses
     * this boundary. Country, Device and Browser are coarse buckets derived at the
     * edge and are absent whenever the request did not supply enough to derive them.
     */
    export interface Payload {
      /**
       * The link's public identifier — the eight-character code in the short URL, for
       * example A78B2BU0. Unique across both kinds, and never reused, so it is the
       * stable key to group one link's events by.
       */
      record_id: string;

      /**
       * Where the request appeared to come from, as an ISO 3166-1 alpha-2 code. Named
       * separately from the country on a channel event, which is a destination market
       * the customer registered for — this one is a property of a single visitor and is
       * absent when the edge could not resolve it.
       */
      access_country?: string | null;

      /**
       * How the request was served, when the edge recorded it. Free text describing the
       * outcome — show it to a human rather than branching on it.
       */
      access_outcome?: string | null;

      /**
       * The requesting browser family, for example chrome or safari, or unknown. Derived
       * from the user agent.
       */
      browser?: string | null;

      /**
       * How many bytes were served, for a file access. A ranged request reports the
       * bytes in that range, not the size of the file, so several accesses of one file
       * can each report a part.
       */
      bytes_served?: number | null;

      /**
       * The channel the message carrying this link went out on: sms, whatsapp, or rcs.
       */
      channel?: string | null;

      /**
       * The organization the link belongs to. Always the parent account, never a sender
       * profile — read SenderProfileId for that.
       *
       * This family publishes the owner as an explicit pair rather than the single
       * account_id the other families use. The pair says which organization and which
       * profile without the subscriber deriving either, which is the trade: one more key
       * against not having to know that account_id silently becomes the profile when one
       * exists.
       */
      customer_id?: string;

      /**
       * The requesting device class: mobile, tablet, desktop or unknown. Derived from
       * the user agent.
       */
      device?: string | null;

      /**
       * What the link points at: url for a destination the customer supplied, file for
       * media Sent hosts. Always present, and implied by the event — link.clicked is
       * always url and link.downloaded always file — but published as its own field so a
       * subscriber can branch on the kind without parsing the event name, the same
       * separation the channel family keeps between its event and its status.
       */
      link_kind?: string;

      /**
       * The message the link was published in.
       *
       * The event can arrive before the message is readable through GET /v3/messages: a
       * provider may fetch a link within milliseconds of the send, and nothing here
       * waits for the message row. Retry the read rather than treating an unknown id as
       * an error.
       */
      message_id?: string | null;

      /**
       * When the access or lifecycle change actually happened, in UTC
       * (yyyy-MM-ddTHH:mm:ssZ). The envelope's timestamp is when Sent emitted the event;
       * this is when the thing occurred, and the two differ by the ingest delay.
       */
      occurred_at?: string;

      /**
       * The caller-supplied label tying this link back to a position in the message, for
       * example body:0 for the first link in the body. Present when the link was created
       * with one.
       */
      reference_key?: string | null;

      /**
       * The host of the page that linked here, when the request supplied one. The host
       * only — never a full referring URL.
       */
      referrer_host?: string | null;

      /**
       * The HTTP method of the request that was served, for an access event. Omitted on
       * link.expired and link.revoked, which describe no request.
       */
      request_method?: string | null;

      /**
       * The sender profile that owns the link, or null when the organization owns it
       * directly. Always on the wire so a handler reads one shape rather than branching
       * on whether the key arrived.
       *
       * sender_profile_id, not profile_id: the API already publishes
       * messaging_profile_id and sending_phone_number_profile_id for provider-side
       * profiles, which are a different thing entirely. The unqualified name would read
       * as one of those.
       */
      sender_profile_id?: string | null;

      /**
       * The HTTP status Sent answered the request with: 302 for a link, 200 or 206 for a
       * file. Omitted on lifecycle events.
       */
      status_code?: number | null;

      /**
       * A coarse guess at what made the request: likely_human, provider (a messaging
       * platform prefetching the link), bot, or unknown. Derived from the user agent, so
       * it is a hint for filtering noise rather than a fact to bill or report on.
       */
      traffic_class?: string | null;
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
   * Body param: Request-only: the events an organization webhook's sender profile
   * clones receive, one clone per existing and future profile. Responses never
   * return it.
   */
  sender_profile?: WebhookCreateParams.SenderProfile | null;

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

export namespace WebhookCreateParams {
  /**
   * Request-only: the events an organization webhook's sender profile clones
   * receive, one clone per existing and future profile. Responses never return it.
   */
  export interface SenderProfile {
    event_filters?: { [key: string]: Array<string> } | null;

    event_types?: Array<string>;
  }
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
   * Body param: Request-only: the events an organization webhook's sender profile
   * clones receive, one clone per existing and future profile. Responses never
   * return it.
   */
  sender_profile?: WebhookUpdateParams.SenderProfile | null;

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

export namespace WebhookUpdateParams {
  /**
   * Request-only: the events an organization webhook's sender profile clones
   * receive, one clone per existing and future profile. Responses never return it.
   */
  export interface SenderProfile {
    event_filters?: { [key: string]: Array<string> } | null;

    event_types?: Array<string>;
  }
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
    type CallEvent as CallEvent,
    type CallEventPayload as CallEventPayload,
    type ChannelEvent as ChannelEvent,
    type ChannelEventPayload as ChannelEventPayload,
    type ContactEvent as ContactEvent,
    type ContactEventPayload as ContactEventPayload,
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
