// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from '../webhooks';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

/**
 * The senders you send from, one per channel.
 *
 * **SMS is a list of markets**, each keyed by `(country, number_type)` — a customer can hold `us/10dlc` and `gb/alphanumeric` at once, so a market is addressed by the pair rather than by country alone. **WhatsApp and RCS are single**: a customer has one business account and one agent. **Voice is per number**: each number you hold can carry phone calls on its own (`POST /v3/channels/voice`), each with the callback URL Sent asks what to do with its calls, one of them is the default line for calls placed from your app, and voice tokens are minted with `POST /v3/voice/tokens`. Read your voice numbers with `GET /v3/channels/voice` and change one with `PATCH /v3/channels/voice/{number}`.
 *
 * ## Compliance lives on the market
 *
 * Adding a market records everything that market registers with, in its `compliance` object. Only **US `TEN_DLC`** registers with a regime — The Campaign Registry — and it is the only market whose compliance carries `brand` and `campaign`. Everywhere else compliance is documents, and many markets ask for none at all.
 *
 * `GET` and `PATCH` on a market return and accept the same shape, so what comes back can be sent back: an omitted key is left alone, and a key reported in `requirements` is the path into the body that clears it.
 *
 * Call `GET /v3/compliance/requirements` first — it answers what a market demands before you hold it, with a body you can fill in and post.
 */
export class Rcs extends APIResource {
  /**
   * Asks for an RCS agent and records the order form the carriers vet it against.
   * Always `202`: an agent is approved by the carriers, not by this call, and
   * nothing here can make that happen sooner.
   *
   * ## What it asks for
   *
   * The RCS Agent Order Form — the same one our team fills in on your behalf today,
   * so nothing has to be collected from you twice. **All fields are required** and
   * must be submitted together so the carrier review has everything it needs. The
   * only exception is `opt_in_screenshot_url`.
   *
   * **Agent identity:** `display_name`, `description`, `agent_use_case` (must be one
   * of the accepted use cases; the error names the set), `brand_color` (six-digit
   * hex, `#RRGGBB`).
   *
   * **Brand identity:** `brand_name` — the brand this agent presents. Not taken from
   * `compliance.brand`: a business may present a different brand on RCS than the one
   * its 10DLC registration is filed against, and the carriers vet this one.
   * `privacy_policy_url`, `terms_and_conditions_url`, `website_url`, `logo_url`, and
   * `banner_url` must be absolute `http(s)` URLs that the carriers can fetch without
   * authentication. The form specifies 224×224 px and 50 KB for the logo and
   * 1440×448 px and 200 KB for the banner; these cannot be checked without the image
   * bytes.
   *
   * **Contact details:** `brand_phone_number`, `customer_support_phone_number`,
   * `brand_email`, `customer_support_email`, `contact_name_and_title`.
   *
   * **Company:** `company_ein`, `entity_type`, `official_address` (street, city,
   * state, postal_code, country), `brief_company_description`.
   *
   * **Consent and messages:** `opt_in_process_description`, `start_message`,
   * `help_message`, `stop_message`, `sample_messages` (at least one example
   * message).
   *
   * **Optional:** `opt_in_screenshot_url` (validated as an http(s) URL if supplied).
   *
   * Anything supplied is checked against accepted values rather than passed through:
   * a value the provider rejects would otherwise surface days later, to somebody who
   * cannot fix it without asking you.
   *
   * **A customer has one agent.** Asking again while you have one is `409`.
   *
   * ## What comes back, and what does not
   *
   * Returns **the agent** — the form as stored, plus `id` and `status`. Not your
   * other channels, which this call cannot have changed.
   *
   * `status` is `PROVISIONING` until the agent is handed to the carriers and
   * approved. **`GET /v3/channels` reports `rcs: null` until then** — a channel row
   * is what routing reads to decide you are sendable, and writing one for an
   * unapproved agent would claim a channel that cannot carry traffic.
   *
   * Send `x-profile-id` with an organization key to ask for one of your profiles'
   * agents.
   *
   * @example
   * ```ts
   * const apiResponseOfRcsAgent =
   *   await client.channels.rcs.create();
   * ```
   */
  create(params: RcCreateParams, options?: RequestOptions): APIPromise<APIResponseOfRcsAgent> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post('/v3/channels/rcs', {
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
export interface APIResponseOfRcsAgent {
  /**
   * An RCS agent as its owner sees it: the order form back, plus where the
   * submission stands.
   *
   * Not RcsSenderResponse. That one is the admin projection and carries the pipeline
   * we track about a customer's request — internalStatus, statusReason, isLaunched —
   * and the S3 keys behind the assets. None of that is the customer's to read: an
   * internal status is a note to ourselves, and an S3 key is a storage detail that
   * would become a contract the moment it was published.
   *
   * What is here is what the caller sent, in the names it sent them under, plus the
   * three things only we can answer: the record's id, its status, and the number it
   * sends from. So a read after a write shows the form as stored rather than as
   * echoed.
   */
  data?: RcsAgent | null;

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
 * The registered address of the company behind the agent.
 */
export interface RcsAddress {
  city?: string | null;

  country?: string | null;

  postal_code?: string | null;

  state?: string | null;

  street?: string | null;
}

/**
 * An RCS agent as its owner sees it: the order form back, plus where the
 * submission stands.
 *
 * Not RcsSenderResponse. That one is the admin projection and carries the pipeline
 * we track about a customer's request — internalStatus, statusReason, isLaunched —
 * and the S3 keys behind the assets. None of that is the customer's to read: an
 * internal status is a note to ourselves, and an S3 key is a storage detail that
 * would become a contract the moment it was published.
 *
 * What is here is what the caller sent, in the names it sent them under, plus the
 * three things only we can answer: the record's id, its status, and the number it
 * sends from. So a read after a write shows the form as stored rather than as
 * echoed.
 */
export interface RcsAgent {
  /**
   * The agent record. Stable across the whole approval, and what support will ask
   * for.
   *
   * Nullable and omitted when absent: a sender profile with RCS intent records the
   * channel but has no agent until the order form is submitted, so no id exists to
   * report. A zero GUID is not a valid id and is worse than the field being absent.
   */
  id?: string | null;

  agent_use_case?: string | null;

  brand_color?: string | null;

  brand_email?: string | null;

  brand_name?: string | null;

  brand_phone_number?: string | null;

  brief_company_description?: string | null;

  company_ein?: string | null;

  contact_name_and_title?: string | null;

  /**
   * Omitted when no real agent record exists — the intent-only path has no creation
   * timestamp.
   */
  created_at?: string | null;

  customer_support_email?: string | null;

  customer_support_phone_number?: string | null;

  description?: string | null;

  display_name?: string | null;

  entity_type?: string | null;

  help_message?: string | null;

  /**
   * The registered address of the company behind the agent.
   */
  official_address?: RcsAddress | null;

  opt_in_process_description?: string | null;

  /**
   * The number the agent sends from, derived from brand_phone_number.
   */
  phone_number?: string | null;

  privacy_policy_url?: string | null;

  /**
   * A sentence for reason_code, saying what to do where it is yours. Omitted while
   * ACTIVE.
   */
  reason?: string | null;

  /**
   * Why the agent is not ACTIVE, as a stable code: an ErrorCodes CHANNEL_xxx value
   * such as CHANNEL_001 (something you owe) or CHANNEL_009 (under review). Switch on
   * this rather than on reason. Omitted while ACTIVE. Read-only; when nothing more
   * specific is known it is the generic reason for the status.
   */
  reason_code?: string | null;

  sample_messages?: Array<string> | null;

  start_message?: string | null;

  /**
   * Where the agent stands, in terms of who is holding it up — PROVISIONING,
   * ACTION_NEEDED, PENDING_REVIEW or ACTIVE.
   *
   * Resolved from both of the provider's axes rather than reported raw: an agent
   * whose resubmission we have asked for reads ACTION_NEEDED however its carrier
   * status still reads, and an agent not yet handed over reads PROVISIONING rather
   * than pending a review nobody has started.
   */
  status?: 'PROVISIONING' | 'ACTION_NEEDED' | 'PENDING_REVIEW' | 'ACTIVE' | 'INACTIVE' | null;

  stop_message?: string | null;

  terms_and_conditions_url?: string | null;

  website_url?: string | null;
}

export interface RcCreateParams {
  /**
   * Body param: Which kind of traffic the agent carries. One of the accepted use
   * cases; the error names the set.
   */
  agent_use_case?: 'VERIFICATION' | 'NOTIFICATIONS' | 'MARKETING' | 'MULTI_USE';

  /**
   * Body param
   */
  banner_url?: string;

  /**
   * Body param: Primary brand colour, as #RRGGBB. Three-digit shorthand is refused:
   * the value is submitted verbatim, so two spellings of one colour is only a way
   * for the stored value to disagree with the form.
   */
  brand_color?: string;

  /**
   * Body param
   */
  brand_email?: string;

  /**
   * Body param: The brand this agent presents over RCS.
   *
   * Not taken from your compliance.brand: a business may present a different brand
   * on RCS than the one its 10DLC registration is filed against, and the carriers
   * vet this one.
   */
  brand_name?: string;

  /**
   * Body param: The brand's own number. Also becomes the agent's canonical sending
   * number for routing, which is why it is normalised to E.164 rather than stored as
   * sent.
   */
  brand_phone_number?: string;

  /**
   * Body param
   */
  brief_company_description?: string;

  /**
   * Body param
   */
  company_ein?: string;

  /**
   * Body param
   */
  contact_name_and_title?: string;

  /**
   * Body param
   */
  customer_support_email?: string;

  /**
   * Body param
   */
  customer_support_phone_number?: string;

  /**
   * Body param: What the agent is for, shown to recipients. Capped by the carriers,
   * not by us.
   */
  description?: string;

  /**
   * Body param: The name the agent shows in the messaging client.
   */
  display_name?: string;

  /**
   * Body param
   */
  entity_type?: string;

  /**
   * Body param
   */
  help_message?: string;

  /**
   * Body param: Publicly reachable logo. It has to be fetchable without
   * authentication at review time, so a URL behind a login passes this call and
   * fails the review.
   */
  logo_url?: string;

  /**
   * Body param: The registered address of the company behind the agent.
   */
  official_address?: RcsAddress;

  /**
   * Body param: How recipients opt in, in prose. The carriers read this one.
   */
  opt_in_process_description?: string;

  /**
   * Body param: A screenshot of the opt-in, as a publicly fetchable URL.
   */
  opt_in_screenshot_url?: string | null;

  /**
   * Body param: Required by US carriers. Must be an absolute http(s) URL they can
   * fetch.
   */
  privacy_policy_url?: string;

  /**
   * Body param: Examples of what the agent will send, for the review.
   */
  sample_messages?: Array<string>;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param
   */
  start_message?: string;

  /**
   * Body param
   */
  stop_message?: string;

  /**
   * Body param
   */
  terms_and_conditions_url?: string;

  /**
   * Body param: The brand's own site.
   */
  website_url?: string;

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

export declare namespace Rcs {
  export {
    type APIResponseOfRcsAgent as APIResponseOfRcsAgent,
    type RcsAddress as RcsAddress,
    type RcsAgent as RcsAgent,
    type RcCreateParams as RcCreateParams,
  };
}
