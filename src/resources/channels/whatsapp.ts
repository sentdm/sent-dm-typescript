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
export class Whatsapp extends APIResource {
  /**
   * Connects a WhatsApp Business Account shared with us through a Multi-Partner
   * Solution to the calling sender profile. Send `x-profile-id` for the profile the
   * account belongs to.
   *
   * **Two fields, because everything else is derived.** `waba_id` says which of your
   * organization's shared accounts this is — you hold one per client, and nothing
   * else can say which. `phone_number_id` names the account's number, which is what
   * assigns it to the profile as the number it sends from.
   *
   * The solution the account arrived through, the client business portfolio that
   * owns it, the access token and its expiry are all resolved from your
   * organization. They are not accepted here: the first two are Meta's answer about
   * provenance, and the token is minted per client business and rotates roughly
   * every sixty days, so a value you sent would be stale before it was useful.
   *
   * `phone_number_id` is optional. Omit it to connect the account now and settle the
   * number later — the channel reads as `ACTION_NEEDED` with `reason_code`
   * `CHANNEL_007`, and the profile's WhatsApp messages fail until a number is named.
   * They do not fall back to your organization's account. Call this endpoint again
   * with `phone_number_id` to name one.
   *
   * The same resolution runs behind `channels.whatsapp` on
   * `POST /v3/sender-profiles`, so connecting at create and connecting afterwards
   * fill the same fields.
   *
   * Returns **the account**, not every channel you have — adding one cannot change a
   * market or an RCS agent, and `GET /v3/channels` is the whole picture. Giving an
   * account up is not self-service: ask support, because deregistering a number
   * lands in your own Meta business.
   *
   * @example
   * ```ts
   * const apiResponseOfWhatsappChannel =
   *   await client.channels.whatsapp.create();
   * ```
   */
  create(params: WhatsappCreateParams, options?: RequestOptions): APIPromise<APIResponseOfWhatsappChannel> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post('/v3/channels/whatsapp', {
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
export interface APIResponseOfWhatsappChannel {
  /**
   * The profile's WhatsApp account. Its status is Meta's verification state.
   */
  data?: WhatsappChannel | null;

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
 * The profile's WhatsApp account. Its status is Meta's verification state.
 */
export interface WhatsappChannel {
  /**
   * Derived from the organization's shared-account listing, like SolutionId.
   */
  owner_business_id?: string | null;

  /**
   * The Meta phone-number id the profile sends from, or null when the account is
   * connected but no number has been named yet — which is what a provisioning status
   * means here.
   */
  phone_number_id?: string | null;

  /**
   * A sentence for reason_code, saying what to do where it is yours. Omitted while
   * ACTIVE.
   */
  reason?: string | null;

  /**
   * Why the account is not ACTIVE, as a stable code: an ErrorCodes CHANNEL_xxx value
   * such as CHANNEL_001 (something you owe) or CHANNEL_009 (under review). Switch on
   * this rather than on reason. Omitted while ACTIVE. Read-only; when nothing more
   * specific is known it is the generic reason for the status.
   */
  reason_code?: string | null;

  /**
   * Derived, not echoed. The request no longer accepts this — it is read off the
   * organization's shared-account listing at connect time and reported back so a
   * caller can see which partnership the account actually arrived through.
   */
  solution_id?: string | null;

  /**
   * Read-only. Never carries a token — the row holds that and it is not returned.
   * ACTION_NEEDED when no account is connected or the account has no phone number:
   * both are yours to do.
   *
   * - `PROVISIONING` - We are working on it and there is nothing for you to do — a
   *   number is being procured, or a registration is being assembled. Minutes to
   *   hours.
   * - `ACTION_NEEDED` - **Waiting on you.** Something the market asks for has not
   *   been supplied, a regulator rejected what was, or we have asked you to correct
   *   and resubmit your identity data. Nothing progresses until you act. For an SMS
   *   market, `GET /v3/channels/sms/{country}/{type}` names what it wants and
   *   `PATCH` on the same path supplies it — compliance values, documents and
   *   numbers alike.
   * - `PENDING_REVIEW` - With a regulator or carrier — filed, or assembled and
   *   queued for us to file — and their answer is what moves it, to `ACTIVE` or back
   *   to `ACTION_NEEDED`. Nothing on your side changes it. Days for SMS, weeks for
   *   RCS.
   * - `ACTIVE` - Can carry traffic now. A channel a sender profile runs on its
   *   organization's reads `ACTIVE` too — it sends, which is what the field is
   *   about.
   * - `INACTIVE` - **It had a working sender and no longer does** — the number was
   *   released, or the campaign it carried lapsed. Distinct from `PROVISIONING`,
   *   which means it has never sent yet: the same absence of a sender, opposite
   *   news. Sends will fail until it returns to `ACTIVE`.
   */
  status?: 'PROVISIONING' | 'ACTION_NEEDED' | 'PENDING_REVIEW' | 'ACTIVE' | 'INACTIVE' | null;

  waba_id?: string | null;
}

export interface WhatsappCreateParams {
  /**
   * Body param: The Meta phone-number id of the number on WabaId, which assigns it
   * to this profile as the number it sends from. It is not checked against the
   * account here, so name the account's number; it is refused if another profile
   * already uses it.
   *
   * Optional: omit it to connect the account and settle the number later. Nothing
   * picks one on your behalf.
   */
  phone_number_id?: string | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param: WhatsApp Business Account id — one of the accounts shared into your
   * organization. Required: the organization holds one per client, and nothing but
   * the caller says which is meant here.
   */
  waba_id?: string;

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

export declare namespace Whatsapp {
  export {
    type APIResponseOfWhatsappChannel as APIResponseOfWhatsappChannel,
    type WhatsappChannel as WhatsappChannel,
    type WhatsappCreateParams as WhatsappCreateParams,
  };
}
