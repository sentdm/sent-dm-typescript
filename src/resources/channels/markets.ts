// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from '../webhooks';
import * as SMSAPI from './sms/sms';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

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
export class Markets extends APIResource {
  /**
   * Reads one market you send in — its sender, where that sender stands, and
   * everything its compliance holds.
   *
   * ## What `compliance` carries
   *
   * A market that registers with a compliance regime reports `brand` — the identity
   * the registration is filed against — and `campaign`, the programme filed against
   * it. Each carries `inherit`, saying whether it is yours or your organization's.
   *
   * `compliance.brand.vetting` is the brand's external vetting at The Campaign
   * Registry, read-only: `score` (0-100, the figure US carriers set 10DLC throughput
   * by), `status` (`PENDING`, `UNSCORE`, `ACTIVE`, `FAILED` or `EXPIRED`; carriers
   * read the score of an `ACTIVE` vet only), `vetted_at` and `expires_at`. It is
   * `null` while no vetting record is held for the brand, and `score` is `null` for
   * a vet that has none yet. A profile on your organization's brand reads your
   * organization's vetting.
   *
   * A market that registers with nobody has neither, so **both keys are absent**
   * rather than null: absent says this market does not ask, where null would say it
   * asks and you supplied nothing. It reports `documents` instead.
   *
   * `GET /v3/compliance/requirements` says what a market demands of any new
   * customer; this says what you gave it.
   *
   * ## Writing it back
   *
   * **`PATCH` this same path**, with the `compliance` object from this response:
   *
   * ```json
   * { "compliance": { "brand": { "tax_id": "12-3456789" } } }
   * ```
   *
   * Nothing else to learn — what comes back can be sent back, an omitted key is left
   * alone. There is no sub-resource for either half: both are singletons of the
   * market, so both are written here.
   *
   * `GET /v3/compliance/requirements` says what a market demands of anybody; this
   * says what you gave it.
   *
   * Send `x-profile-id` with an organization key to read one of your profiles'
   * markets.
   *
   * @example
   * ```ts
   * const apiResponseOfChannelMarket =
   *   await client.channels.markets.retrieve('ten_dlc', {
   *     channel: 'sms',
   *     country: 'US',
   *   });
   * ```
   */
  retrieve(
    type: string,
    params: MarketRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfChannelMarket> {
    const { channel, country, 'x-profile-id': xProfileID } = params;
    return this._client.get(path`/v3/channels/${channel}/${country}/${type}`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Supplies the market's identity and documents, and answers with the market as
   * stored — the same shape `GET` on this path returns.
   *
   * | To change                               | Send                                                                                                     |
   * | --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
   * | a `brand` value (US `TEN_DLC`)          | `compliance.brand`, as below                                                                             |
   * | a registration sent back for correction | `compliance.brand` — the identity is accepted even once filed, and the registration goes back for review |
   * | a document, in any market               | a multipart file named after the document's key                                                          |
   * | a campaign                              | `PATCH /v3/channels/sms/US/TEN_DLC/campaigns/{id}` — `compliance.campaign` here is `400`                 |
   * | the numbers                             | `POST /v3/channels/{channel}/{country}/{type}/numbers` — `numbers` here is `400`                         |
   *
   * ## Partial, at every level
   *
   * **An omitted key is left alone. An explicit `null` clears it.** Those are
   * different requests, so `{}` changes nothing and is refused rather than silently
   * accepted, and correcting one field does not blank the others.
   *
   * ```json
   * { "compliance": { "brand": { "contact_phone": "+12125550123" } } }
   * ```
   *
   * | Body                           | Effect                                                       |
   * | ------------------------------ | ------------------------------------------------------------ |
   * | `"brand": { … }`               | supplies or corrects the identity, and takes one of your own |
   * | `"brand": { "inherit": true }` | runs on your organization's, giving up your own              |
   * | `"brand": null`                | the same thing, said the short way                           |
   * | key omitted                    | left exactly as it is                                        |
   *
   * The brand read on this path, its `id` and `vetting` included, can be sent back
   * unchanged: both are read-only and ignored.
   *
   * ## Every other market
   *
   * Markets that register with no regime have no brand, so `compliance` is `400`
   * there. Their compliance is documents, sent here as multipart.
   *
   * ## Documents
   *
   * Send `multipart/form-data` with **each file named after the compliance key it
   * satisfies** — the key `GET /v3/channels/{channel}/{country}/compliance` lists. A
   * file that matches no document the market asks for is `400` naming the keys that
   * would, and a file the upload rules refuse (empty, too large, an unsupported
   * type) is `422`. `compliance` may ride in the same form as a text part holding
   * its JSON.
   *
   * ## What it will refuse
   *
   * **A filed identity is `409`.** Once the registration has gone to The Campaign
   * Registry they hold a copy, and a local change would diverge from it silently.
   * The exception is a registration sent back for correction: the identity is
   * accepted, and the registration goes back for review. Refiling it with The
   * Campaign Registry stays with Sent.
   *
   * Nothing is submitted to a regime here. Send `x-profile-id` with an organization
   * key to write one of your profiles' markets.
   *
   * @example
   * ```ts
   * const apiResponseOfChannelMarket =
   *   await client.channels.markets.update('ten_dlc', {
   *     channel: 'sms',
   *     country: 'US',
   *   });
   * ```
   */
  update(
    type: string,
    params: MarketUpdateParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfChannelMarket> {
    const {
      channel,
      country,
      'Idempotency-Key': idempotencyKey,
      'x-profile-id': xProfileID,
      ...body
    } = params;
    return this._client.patch(path`/v3/channels/${channel}/${country}/${type}`, {
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
   * Every market you send SMS in, each with its sender, where that sender stands,
   * and what its compliance holds.
   *
   * The same entries `GET /v3/channels` reports under `sms`, and the same shape
   * `GET /v3/channels/sms/{country}/{type}` returns for one of them — so a list, a
   * member read and the all-channels read cannot describe a market differently.
   *
   * Send `x-profile-id` with an organization key to list one of your profiles'
   * markets.
   *
   * @example
   * ```ts
   * const apiResponseOfListOfChannelMarket =
   *   await client.channels.markets.list('channel');
   * ```
   */
  list(
    channel: string,
    params: MarketListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseOfListOfChannelMarket> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/channels/${channel}`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Adds numbers to a market you hold. They are **added** to what it already asks
   * for, never replacing it — with one exception: a US `TEN_DLC` campaign opened
   * without `numbers` asks for one number in any area code by default, and while it
   * holds no number yet, the first numbers added replace that default. Once it holds
   * one, they are added beside it.
   *
   * ## Where they go
   *
   * - **SMS US `TEN_DLC`**: to **one campaign of your own**, named by `campaign_id`
   *   — the `id` of an entry in the market's `compliance.campaigns`
   *   (`GET /v3/channels/sms/US/TEN_DLC`). Required: left out it is `400` naming
   *   your campaigns in service. One you inherit from your organization is `400`:
   *   its numbers are the organization's. One out of service — expired, deactivated
   *   or released — is `409`. A campaign the carriers have not approved yet gets its
   *   numbers when they do; an approved one gets them now. With everything it asks
   *   for, a campaign holds at most 49 numbers, counting one for each sender profile
   *   inheriting it.
   * - **`LOCAL`**: to the market, claimed from inventory now; what inventory cannot
   *   cover stays pending. No `campaign_id`. A market holds at most 49 numbers.
   * - **Any other sender type** takes no numbers: `400`.
   *
   * ## What to send
   *
   * `numbers` — the list `POST /v3/channels/sms` takes, one entry per area code —
   * and, on US `TEN_DLC`, `campaign_id`, required.
   *
   * Until a number is assigned it reads as `PROVISIONING` in the market's `numbers`,
   * with the area code it was asked for. Returns **the market**, in the shape
   * `GET /v3/channels/sms/{country}/{type}` returns, with `202`.
   *
   * @example
   * ```ts
   * const apiResponseOfChannelMarket =
   *   await client.channels.markets.addNumbers('TEN_DLC', {
   *     channel: 'sms',
   *     country: 'US',
   *     numbers: [{}, {}],
   *     'Idempotency-Key': 'req_abc123_retry1',
   *   });
   * ```
   */
  addNumbers(
    type: string,
    params: MarketAddNumbersParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfChannelMarket> {
    const {
      channel,
      country,
      'Idempotency-Key': idempotencyKey,
      'x-profile-id': xProfileID,
      ...body
    } = params;
    return this._client.post(path`/v3/channels/${channel}/${country}/${type}/numbers`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          'Idempotency-Key': idempotencyKey,
          ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Every number you hold in one market (country and sender type): `ACTIVE` once it
   * can send, `PROVISIONING` while it is still to be assigned (it then has no
   * `sender_value` yet), `INACTIVE` once it could send and no longer can. US
   * `TEN_DLC` numbers name their `campaign_id`, and `?campaign_id=` keeps one
   * campaign's.
   *
   * A market you do not hold is `404`. Add numbers with `POST` on the same path.
   *
   * @example
   * ```ts
   * const apiResponseOfMarketNumbers =
   *   await client.channels.markets.listNumbers('type', {
   *     channel: 'channel',
   *     country: 'country',
   *   });
   * ```
   */
  listNumbers(
    type: string,
    params: MarketListNumbersParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfMarketNumbers> {
    const { channel, country, 'x-profile-id': xProfileID, ...query } = params;
    return this._client.get(path`/v3/channels/${channel}/${country}/${type}/numbers`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Replaces the numbers a market you hold asks for — their area codes and counts —
   * with the list you send. To add to them instead, use `POST` on this path.
   *
   * ## Whose numbers
   *
   * - **SMS US `TEN_DLC`**: **one campaign of your own**, named by `campaign_id` —
   *   the `id` of an entry in the market's `compliance.campaigns`. Required. So a
   *   campaign sent back for correction can change its area codes without being
   *   recreated. One you inherit from your organization is `400`; one out of service
   *   is `409`. With everything it asks for, a campaign holds at most 49 numbers,
   *   counting one for each sender profile inheriting it.
   * - **`LOCAL`**: the market's own, claimed from inventory now; what inventory
   *   cannot cover stays pending. No `campaign_id`.
   * - **Any other sender type** takes no numbers: `400`.
   *
   * ## What to send
   *
   * `numbers` — the list `POST /v3/channels/sms` takes, one entry per area code, an
   * entry without `area_code` meaning any — and, on US `TEN_DLC`, `campaign_id`.
   *
   * **Numbers already assigned are kept.** Nothing is released here, so a list that
   * no longer covers a number already held is `400`, naming how many it leaves out.
   * Lowering a count nothing has filled yet is fine.
   *
   * Until a number is assigned it reads as `PROVISIONING` in the market's `numbers`,
   * with the area code it was asked for. Returns **the market**, in the shape
   * `GET /v3/channels/sms/{country}/{type}` returns.
   *
   * @example
   * ```ts
   * const apiResponseOfChannelMarket =
   *   await client.channels.markets.replaceNumbers('TEN_DLC', {
   *     channel: 'sms',
   *     country: 'US',
   *     numbers: [{}, {}],
   *   });
   * ```
   */
  replaceNumbers(
    type: string,
    params: MarketReplaceNumbersParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfChannelMarket> {
    const {
      channel,
      country,
      'Idempotency-Key': idempotencyKey,
      'x-profile-id': xProfileID,
      ...body
    } = params;
    return this._client.patch(path`/v3/channels/${channel}/${country}/${type}/numbers`, {
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
export interface APIResponseOfChannelMarket {
  /**
   * One market the profile sends in on a channel — its sender, where that sender
   * stands, and what the market wants. Named for no one channel, as the routes it
   * answers are not (/v3/channels/{channel}/{country}/{type}); SMS is the channel
   * with markets today.
   *
   * A profile may send in several: it is a tenant, not a market. Each carries its
   * own status, because a profile can be live in one country and mid-registration in
   * another — and each carries what it still owes, rather than that being reported
   * in a separate array a caller has to join on.
   */
  data?: ChannelMarket | null;

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
export interface APIResponseOfListOfChannelMarket {
  /**
   * The response data (null if error)
   */
  data?: Array<ChannelMarket> | null;

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
export interface APIResponseOfMarketNumbers {
  /**
   * The numbers a customer holds in one market: GET
   * /v3/channels/{channel}/{country}/{type}/numbers.
   */
  data?: MarketNumbers | null;

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
 * One market the profile sends in on a channel — its sender, where that sender
 * stands, and what the market wants. Named for no one channel, as the routes it
 * answers are not (/v3/channels/{channel}/{country}/{type}); SMS is the channel
 * with markets today.
 *
 * A profile may send in several: it is a tenant, not a market. Each carries its
 * own status, because a profile can be live in one country and mid-registration in
 * another — and each carries what it still owes, rather than that being reported
 * in a separate array a caller has to join on.
 */
export interface ChannelMarket {
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
  compliance?: SMSAPI.SuppliedCompliance | null;

  country?: string | null;

  number_type?: string | null;

  /**
   * Every number this market holds or is still owed, each with its area code and its
   * own status (ACTIVE once it can send, PROVISIONING while it is still to be
   * assigned, INACTIVE once it could send and no longer can). One entry for a market
   * holding one number. US 10DLC numbers are assigned when the campaign is approved,
   * so they read as owed until then. Read-only.
   */
  numbers?: Array<SMSAPI.SMSNumber>;

  /**
   * A sentence for reason_code: this market's own explanation, naming what is
   * outstanding where that is you. Omitted while ACTIVE.
   */
  reason?: string | null;

  /**
   * Why the market is not ACTIVE, as a stable code: an ErrorCodes CHANNEL_xxx value
   * such as CHANNEL_001 (something you owe) or CHANNEL_009 (under review). Switch on
   * this rather than on reason. Omitted while ACTIVE. Read-only; when nothing more
   * specific is known it is the generic reason for the status.
   */
  reason_code?: string | null;

  /**
   * Where this market's sender stands, in terms of who is holding it up —
   * PROVISIONING, ACTION_NEEDED, PENDING_REVIEW or ACTIVE. Read-only.
   *
   * Resolved rather than reported raw: a live sender reads ACTIVE whatever it still
   * owes, a market with outstanding requirements or an open resubmission request
   * reads ACTION_NEEDED, and a market that registers with a regime reads
   * PENDING_REVIEW once its brand exists — filing to The Campaign Registry is ours
   * to do and need not have happened yet, so a dedicated brand created through this
   * API reads PENDING_REVIEW from the moment it is stored.
   *
   * Describes whether the market can send, not each number: a market holding several
   * numbers reads ACTIVE as soon as one of them is, whatever the others are doing.
   * Each number's own status is in numbers.
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
}

/**
 * One number the customer holds, or is still owed.
 */
export interface MarketNumber {
  area_code?: string | null;

  /**
   * The campaign the number belongs to (US TEN_DLC); null otherwise.
   */
  campaign_id?: string | null;

  /**
   * The number, or the sender id; null until it is assigned.
   */
  sender_value?: string | null;

  /**
   * ACTIVE, PROVISIONING or INACTIVE.
   */
  status?: string | null;

  /**
   * The market's sender type, e.g. TEN_DLC, LOCAL.
   */
  type?: string;
}

/**
 * The numbers a customer holds in one market: GET
 * /v3/channels/{channel}/{country}/{type}/numbers.
 */
export interface MarketNumbers {
  channel?: string;

  /**
   * ISO 3166-1 alpha-2, uppercase.
   */
  country?: string;

  /**
   * Empty, never null, when the customer holds nothing there.
   */
  numbers?: Array<MarketNumber>;
}

export interface MarketRetrieveParams {
  /**
   * Path param: The channel: `sms`. Other channels are `501` until they have markets
   */
  channel: string;

  /**
   * Path param: ISO 3166-1 alpha-2 country code, e.g. us
   */
  country: string;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface MarketUpdateParams {
  /**
   * Path param: The channel: `sms`. Other channels are `501` until they have markets
   */
  channel: string;

  /**
   * Path param: ISO 3166-1 alpha-2 country code, e.g. us
   */
  country: string;

  /**
   * Body param: The compliance values a market registers with. `brand` and
   * `campaign` apply to US `TEN_DLC`; other markets fill this map with the document
   * keys their own requirements name.
   */
  compliance?: SMSAPI.MarketCompliance;

  /**
   * Body param
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

  [k: string]: unknown;
}

export interface MarketListParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface MarketAddNumbersParams {
  /**
   * Path param: The channel: `sms`. Other channels are `501` until their numbers are
   * available
   */
  channel: string;

  /**
   * Path param: ISO 3166-1 alpha-2 country code, e.g. `US`
   */
  country: string;

  /**
   * Body param: The numbers, one entry per area code, e.g. [{"area_code": "415",
   * "quantity": 2}, {"quantity": 1}]. quantity defaults to 1, and an entry without
   * area_code means any area code. Required.
   *
   * POST adds them to what the market or campaign already asks for; PATCH replaces
   * that list with them, and has to cover every number already held, since none is
   * ever released.
   */
  numbers: Array<SMSAPI.SMSNumberRequest | null>;

  /**
   * Header param: Unique key to ensure idempotent request processing. Must be 1-255
   * alphanumeric characters, hyphens, or underscores. Responses are cached for 24
   * hours per key per customer.
   */
  'Idempotency-Key': string;

  /**
   * Body param: The campaign to add the numbers to, as campaigns[].id reports it.
   * Required on SMS US TEN_DLC, where every number belongs to a campaign; refused on
   * a market without campaigns.
   */
  campaign_id?: string | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface MarketListNumbersParams {
  /**
   * Path param: The channel: `sms`. Other channels are `501` until their numbers are
   * available
   */
  channel: string;

  /**
   * Path param: ISO 3166-1 country code, e.g. `US`
   */
  country: string;

  /**
   * Query param: Only the numbers of this campaign (US TEN_DLC); all of the market's
   * when absent.
   */
  campaign_id?: string | null;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface MarketReplaceNumbersParams {
  /**
   * Path param: The channel: `sms`. Other channels are `501` until their numbers are
   * available
   */
  channel: string;

  /**
   * Path param: ISO 3166-1 alpha-2 country code, e.g. `US`
   */
  country: string;

  /**
   * Body param: The numbers, one entry per area code, e.g. [{"area_code": "415",
   * "quantity": 2}, {"quantity": 1}]. quantity defaults to 1, and an entry without
   * area_code means any area code. Required.
   *
   * POST adds them to what the market or campaign already asks for; PATCH replaces
   * that list with them, and has to cover every number already held, since none is
   * ever released.
   */
  numbers: Array<SMSAPI.SMSNumberRequest | null>;

  /**
   * Body param: The campaign to add the numbers to, as campaigns[].id reports it.
   * Required on SMS US TEN_DLC, where every number belongs to a campaign; refused on
   * a market without campaigns.
   */
  campaign_id?: string | null;

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

export declare namespace Markets {
  export {
    type APIResponseOfChannelMarket as APIResponseOfChannelMarket,
    type APIResponseOfListOfChannelMarket as APIResponseOfListOfChannelMarket,
    type APIResponseOfMarketNumbers as APIResponseOfMarketNumbers,
    type ChannelMarket as ChannelMarket,
    type MarketNumber as MarketNumber,
    type MarketNumbers as MarketNumbers,
    type MarketRetrieveParams as MarketRetrieveParams,
    type MarketUpdateParams as MarketUpdateParams,
    type MarketListParams as MarketListParams,
    type MarketAddNumbersParams as MarketAddNumbersParams,
    type MarketListNumbersParams as MarketListNumbersParams,
    type MarketReplaceNumbersParams as MarketReplaceNumbersParams,
  };
}
