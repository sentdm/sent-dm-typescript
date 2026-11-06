// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from '../webhooks';
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
export class SMS extends APIResource {
  /**
   * Gives the customer a sender in one country — the first market it sends in, and
   * the fifth.
   *
   * ## What to have in place first
   *
   * **Call `GET /v3/compliance/requirements?country=US&type=TEN_DLC` first.** It
   * returns this request's body ready to fill in, plus the brand and campaign calls
   * to make before it, in order. You never have to track forty countries' rules
   * yourself.
   *
   * **A market that registers with a compliance regime needs an identity, and this
   * call takes one.** US `TEN_DLC` registers with The Campaign Registry and files
   * that registration against a business identity. Send it in `compliance.brand` and
   * it is recorded here, before the registration that attaches to it — so a customer
   * with no identity reaches a first 10DLC market in one call.
   *
   * `{ "inherit": true }` runs on your organization's instead. A market with neither
   * — none stored, none sent — is `400`, because accepting it would write a channel
   * that could never register and leave it provisioning for ever with nothing saying
   * why.
   *
   * **Everything the regime wants arrives in this request's `compliance`**, as two
   * declared objects: `brand` — the identity the registration is filed against — and
   * `campaign`, with the use case, the consent narrative, the volume, the sample
   * messages and the keywords. There is nothing to set up first. Nothing is
   * submitted here either: the rows are what a submission is later assembled from,
   * and filing is externally rejectable so it happens on its own path.
   *
   * **A half you run yourself has to be complete here.** Whichever of `brand` and
   * `campaign` is your own rather than your organization's must carry every field
   * the regime asks of it, counting what you already hold — send the rest in this
   * request. A missing one is `400` naming each field, rather than a `202` for a
   * market that could never be filed. A half you inherit is asked for nothing.
   *
   * A market that registers with nobody — an alphanumeric sender in most countries —
   * needs neither, and may need documents instead.
   *
   * ## Sending it
   *
   * Takes the same fields `channels.sms` takes on `POST /v3/sender-profiles`,
   * because it is the same work, and both run one provisioning path. `compliance` is
   * top-level and answers for the market in this request, carrying `brand` and
   * `campaign` where the market registers.
   *
   * **Accepts multipart as well as JSON**, with each file named after the compliance
   * key it satisfies — a market that pre-registers its sender needs its documents at
   * the same moment it needs the sender. Every required document must be attached to
   * this request; a missing or invalid file is rejected before the market is added.
   *
   * **`area_codes` puts the sender somewhere specific**, in your order of
   * preference, for a `LOCAL` sender in any country or a US `TEN_DLC` sender — a
   * 10DLC number is an ordinary local long code bound to a registered campaign, so
   * both take the same codes out of the same inventory. It is honoured exactly: you
   * get a number in one of the codes you named or you get none, never one in a code
   * you left out.
   *
   * ## Several numbers
   *
   * **`numbers` lists the numbers you want, one entry per area code**, e.g.
   * `[{"area_code": "212", "quantity": 2}, {"quantity": 1}]` for two numbers in 212
   * and one in any area code. `quantity` defaults to 1, and an entry without
   * `area_code` means any area code. Omit `numbers` for one number. It is for
   * `LOCAL` and `TEN_DLC` only and cannot be combined with `area_codes`. A market
   * holds at most 49 numbers, counting the ones it already has.
   *
   * **On a `LOCAL` market you already hold, `numbers` adds those numbers to it**
   * instead of `409`. US `TEN_DLC` numbers belong to the market's campaign and are
   * assigned when the campaign is approved, not at request time. Until then they
   * read as `PROVISIONING` in the response's `numbers`, each with the area code it
   * was asked for. A profile inheriting your organization's campaign cannot request
   * `numbers` (`400`). `numbers` on a `TEN_DLC` market you already hold is `409`:
   * its numbers belong to its one campaign and are set when the market is created.
   *
   * **A market you already send in is `409`**: adding what is already there is a
   * mistake worth reporting rather than a silent no-op. A market is a
   * `(country, sender_type)` pair, so a **second sender type in a country you
   * already send in is fine** — `US TOLL_FREE` alongside `US TEN_DLC` is the
   * ordinary case. Two of the same type is not.
   *
   * **A market you hold that has no sender yet is not a duplicate**, and re-sending
   * it re-asks for a sender rather than being refused. That is the way out of an
   * area-code request nothing could fill: send the call again to name different
   * codes, or no codes at all to take a number anywhere in the country. It answers
   * `201` with the sender when the pool has one, otherwise `202` with the codes
   * recorded — and changes nothing else; compliance on a market you hold is
   * `PATCH /v3/channels/sms/{country}/{type}`.
   *
   * One exception: while a market's sender type is still unassigned, adding any type
   * to that country is `409` once it has a sender, because the market you have may
   * be about to become the one you asked for.
   *
   * Returns **the market**, in the shape `GET` and `PATCH` on
   * `/v3/channels/sms/{country}/{type}` use — so what this answers can be read back
   * and written back without reshaping. Not every channel you have: adding a market
   * cannot change an RCS agent or a WhatsApp account, and `GET /v3/channels` is the
   * whole picture. `201` when the market is ready; `202` while a sender or a
   * registration is still outstanding.
   *
   * Send `x-profile-id` with an organization key to add a market to one of your
   * profiles.
   *
   * @example
   * ```ts
   * const apiResponseOfSMSMarket =
   *   await client.channels.sms.create({
   *     number_type: 'TEN_DLC',
   *   });
   * ```
   */
  create(params: SMSCreateParams, options?: RequestOptions): APIPromise<APIResponseOfSMSMarket> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post('/v3/channels/sms', {
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
   * Reads one market you send in — its sender, where that sender stands, and
   * everything its compliance holds.
   *
   * ## What `compliance` carries
   *
   * A market that registers with a compliance regime reports `brand` — the identity
   * the registration is filed against — and `campaign`, the programme filed against
   * it. Each carries `inherit`, saying whether it is yours or your organization's.
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
   * const apiResponseOfSMSMarket =
   *   await client.channels.sms.retrieve('ten_dlc', {
   *     country: 'US',
   *   });
   * ```
   */
  retrieve(
    type: string,
    params: SMSRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfSMSMarket> {
    const { country, 'x-profile-id': xProfileID } = params;
    return this._client.get(path`/v3/channels/sms/${country}/${type}`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Supplies whatever this market is waiting on, and answers with the market as
   * stored — the same shape `GET` on this path returns, so **what comes back can be
   * sent back**.
   *
   * **A market reporting `ACTION_NEEDED` is fixed here**, whatever it is waiting on:
   *
   * | Outstanding                                  | Send                                                                                                                                  |
   * | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
   * | a `brand` or `campaign` value (US `TEN_DLC`) | `compliance`, as below                                                                                                                |
   * | a document, in any market                    | a multipart file named after the document's key                                                                                       |
   * | a registration sent back for correction      | `compliance.brand` and/or `compliance.campaign` — the identity is accepted even once filed, and the registration goes back for review |
   * | different numbers                            | `numbers`, the list the market asks for from now on                                                                                   |
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
   * That leaves the campaign untouched, along with every other field of the
   * identity.
   *
   * ## What a US `TEN_DLC` market holds
   *
   * Two halves, both singular: `brand`, the identity the registration is filed
   * against, and `campaign`, the programme filed against it. Each carries `inherit`.
   *
   * | Body                              | Effect                                                        |
   * | --------------------------------- | ------------------------------------------------------------- |
   * | `"brand": { … }`                  | supplies or corrects the identity, and takes one of your own  |
   * | `"brand": { "inherit": true }`    | runs on your organization's, giving up your own               |
   * | `"brand": null`                   | the same thing, said the short way                            |
   * | `"campaign": { … }`               | supplies or corrects the programme, and takes one of your own |
   * | `"campaign": { "inherit": true }` | runs on your organization's                                   |
   * | key omitted                       | left exactly as it is                                         |
   *
   * **Nothing here creates a second anything.** One identity and one campaign per
   * market, so a write is an upsert and a replayed request lands on the row it
   * already wrote. Sending the campaign twice does not file two registrations.
   *
   * ## Every other market
   *
   * Markets that register with no regime have neither half, so `compliance` is `400`
   * there. Their compliance is documents, sent here as multipart.
   *
   * ## Documents
   *
   * Send `multipart/form-data` with **each file named after the compliance key it
   * satisfies** — the key the market's `requirements` names. A file that matches no
   * document the market asks for is `400` naming the keys that would, and a file the
   * upload rules refuse (empty, too large, an unsupported type) is `422`.
   * `compliance` and `numbers` may ride in the same form as text parts holding their
   * JSON.
   *
   * ## Numbers
   *
   * `numbers` takes the list `POST /v3/channels/sms` takes, for a `LOCAL` or
   * `TEN_DLC` market, and **replaces** what the market asks for — send the list you
   * want, not a difference. Numbers already assigned stay; a list that leaves one of
   * them out is `400`, because nothing here releases a number.
   *
   * ```json
   * { "numbers": [{ "area_code": "415", "quantity": 2 }, { "quantity": 1 }] }
   * ```
   *
   * A `LOCAL` market is claimed from inventory at once, and whatever inventory
   * cannot cover stays pending. A `TEN_DLC` market's numbers are recorded on its
   * campaign and assigned once the carriers elect it — on the next acquisition cycle
   * when it already has been. They need a campaign of the profile's own: one
   * inherited from the organization is `400`.
   *
   * ## What it will refuse
   *
   * **A filed identity is `409`.** Once the registration has gone to The Campaign
   * Registry they hold a copy, and a local change would diverge from it silently.
   * The campaign is not frozen — omit `brand` and the same body is accepted. The
   * exception is a registration sent back for correction: the identity is accepted,
   * and a correction to either half sends the registration back for review. Refiling
   * it with The Campaign Registry stays with Sent.
   *
   * **More than one campaign is `409`.** The schema permits several and an account
   * built on the admin side may hold them; this surface writes one, and editing
   * whichever sorted first would leave the others unmentioned and unedited.
   *
   * Nothing is submitted to a regime here. These are the rows a submission is later
   * assembled from, which is what lets them be corrected without waiting on
   * something externally rejectable.
   *
   * Send `x-profile-id` with an organization key to write one of your profiles'
   * markets.
   *
   * @example
   * ```ts
   * const apiResponseOfSMSMarket =
   *   await client.channels.sms.update('ten_dlc', {
   *     country: 'US',
   *   });
   * ```
   */
  update(
    type: string,
    params: SMSUpdateParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfSMSMarket> {
    const { country, 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.patch(path`/v3/channels/sms/${country}/${type}`, {
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
   * const apiResponseOfListOfSMSMarket =
   *   await client.channels.sms.list();
   * ```
   */
  list(
    params: SMSListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseOfListOfSMSMarket> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get('/v3/channels/sms', {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfListOfSMSMarket {
  /**
   * The response data (null if error)
   */
  data?: Array<SMSMarket> | null;

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
export interface APIResponseOfSMSMarket {
  /**
   * One SMS market the profile sends in — its sender, where that sender stands, and
   * what the market wants.
   *
   * A profile may send in several: it is a tenant, not a market. Each carries its
   * own status, because a profile can be live in one country and mid-registration in
   * another — and each carries what it still owes, rather than that being reported
   * in a separate array a caller has to join on.
   */
  data?: SMSMarket | null;

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
 * The compliance values a market registers with. `brand` and `campaign` apply to
 * US `TEN_DLC`; other markets fill this map with the document keys their own
 * requirements name.
 */
export interface MarketCompliance {
  /**
   * Business identity. The identity the registration is filed against. Omit to have
   * none; { "inherit": true } to register under your organization's.
   */
  brand?: MarketCompliance.Brand;

  /**
   * Messaging campaign. What the programme sends and how recipients consented. Omit
   * to run on your organization's; supplying it takes one of your own. { "inherit":
   * true } says so outright. Required when `compliance.campaign.inherit != true`.
   */
  campaign?: MarketCompliance.Campaign;
}

export namespace MarketCompliance {
  /**
   * Business identity. The identity the registration is filed against. Omit to have
   * none; { "inherit": true } to register under your organization's.
   */
  export interface Brand {
    /**
     * Public-facing name. TCR displayName — the name recipients would recognise. Named
     * for what it holds rather than for TCR's field, which is why it is not
     * `display_name`. Required when `compliance.brand.inherit != true`.
     */
    business_name?: string;

    /**
     * City. Required when `compliance.brand.inherit != true`.
     */
    city?: string;

    /**
     * Contact email. TCR email. Required when `compliance.brand.inherit != true`.
     */
    contact_email?: string;

    /**
     * Responsible contact. Split into TCR's firstName/lastName on submission.
     * BrandService refuses a blank one, so a missing name is reported here rather than
     * thrown after the profile was written. Required when
     * `compliance.brand.inherit != true`.
     */
    contact_name?: string;

    /**
     * Contact phone. TCR sends it as both phone and mobilePhone, so it is asked for
     * once. Named for the contact it belongs to rather than as a bare `phone` on a
     * block that also carries an address. Required when
     * `compliance.brand.inherit != true`.
     */
    contact_phone?: string;

    /**
     * Country of registration. Two letters — US. The country spelled out in full is
     * accepted too and stored as its code, which is what a read answers with and what
     * is filed. Required when `compliance.brand.inherit != true`.
     */
    country?: string;

    /**
     * Country that issued the tax id. TCR einIssuingCountry — where the tax id was
     * issued, which is not always where the business trades. Defaults to `country`
     * when omitted, which is right for most. Takes the code or the country spelled
     * out, as `country` does.
     */
    ein_issuing_country?: string;

    /**
     * Entity type. TCR entityType. Decides which vetting TCR applies and, for
     * SOLE_PROPRIETOR, fixes the campaign fee regardless of volume. Also refused at
     * submission if absent. Required when `compliance.brand.inherit != true`.
     */
    entity_type?: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'SOLE_PROPRIETOR' | 'GOVERNMENT';

    /**
     * Run on the organization's brand. True to register under the parent
     * organization's identity rather than one of this profile's own; every field below
     * is then neither asked for nor accepted. Omitted, the brand is the organization's
     * unless this block supplies identity fields, which says plainly enough that it
     * wants one of its own.
     */
    inherit?: boolean;

    /**
     * Registered legal name. TCR companyName — the name on the incorporation
     * documents, which is often not the name recipients would recognise. Required when
     * `compliance.brand.inherit != true`.
     */
    legal_name?: string;

    /**
     * Postal code. Required when `compliance.brand.inherit != true`.
     */
    postal_code?: string;

    /**
     * State or region. TCR state. Two letters for a US registration. Required when
     * `compliance.brand.inherit != true`.
     */
    state?: string;

    /**
     * Street address. Required when `compliance.brand.inherit != true`.
     */
    street?: string;

    /**
     * Tax identifier. TCR ein. TcrBrandSubmissionValidator refuses a submission
     * without one, so it is wanted here rather than discovered at filing time.
     * Required when `compliance.brand.inherit != true`.
     */
    tax_id?: string;

    /**
     * Kind of tax identifier. Which kind of identifier `tax_id` is, e.g. us_ein.
     * Derived onto the brand form, and not itself sent to TCR. Required when
     * `compliance.brand.inherit != true`.
     */
    tax_id_type?: string;

    /**
     * Website. TCR website. Optional, and worth sending: carriers weigh it when
     * vetting, so a brand that has one and omits it is vetted on less than it could
     * be.
     */
    website?: string;
  }

  /**
   * Messaging campaign. What the programme sends and how recipients consented. Omit
   * to run on your organization's; supplying it takes one of your own. { "inherit":
   * true } says so outright. Required when `compliance.campaign.inherit != true`.
   */
  export interface Campaign {
    /**
     * What this programme sends. TCR description: what recipients will get and why, in
     * a sentence. The only one of these TCR takes verbatim as a description of the
     * programme, which is why it is asked for rather than derived from the customer's
     * name. Required when `compliance.campaign.inherit != true`.
     */
    description?: string;

    /**
     * Help keywords. TCR helpKeywords, comma separated, e.g. HELP,INFO. Required when
     * `compliance.campaign.inherit != true`.
     */
    help_keywords?: string;

    /**
     * Help reply. TCR helpMessage. Its presence is what sets subscriberHelp. Required
     * when `compliance.campaign.inherit != true`.
     */
    help_message?: string;

    /**
     * Run on the organization's campaign. True to register under the parent
     * organization's programme rather than one of this profile's own; every field
     * below is then neither asked for nor accepted. Owning the identity and inheriting
     * the campaign is refused — a campaign is filed against an identity registration,
     * and chk_tcr_inheritance forbids that pairing outright.
     */
    inherit?: boolean;

    /**
     * Consent narrative. TCR messageFlow: how recipients opt in, in prose. Under 40
     * characters is refused, and carriers reject vague descriptions — say where opt-in
     * happens, that the box is unchecked by default, and that consent is not a
     * condition of purchase. Required when `compliance.campaign.inherit != true`.
     */
    message_flow?: string;

    /**
     * Opt-in keywords. TCR optinKeywords, comma separated, e.g. START,YES. Required
     * when `compliance.campaign.inherit != true`.
     */
    opt_in_keywords?: string;

    /**
     * Opt-in confirmation. TCR optinMessage. Should state message frequency and that
     * rates may apply. Its presence is what sets subscriberOptin. Required when
     * `compliance.campaign.inherit != true`.
     */
    opt_in_message?: string;

    /**
     * Opt-out keywords. TCR optoutKeywords, comma separated. STOP, END, CANCEL,
     * UNSUBSCRIBE and QUIT are honoured regardless of what is declared. Required when
     * `compliance.campaign.inherit != true`.
     */
    opt_out_keywords?: string;

    /**
     * Opt-out confirmation. TCR optoutMessage. Its presence is what sets
     * subscriberOptout. Required when `compliance.campaign.inherit != true`.
     */
    opt_out_message?: string;

    /**
     * Privacy policy URL. TCR privacyPolicyLink. Required when
     * `compliance.campaign.inherit != true`.
     */
    privacy_policy_link?: string;

    /**
     * Terms and conditions URL. TCR termsAndConditionsLink. Required when
     * `compliance.campaign.inherit != true`.
     */
    terms_and_conditions_link?: string;

    /**
     * Use cases. What the campaign sends, and an example of each. One to five entries;
     * how they register is decided by volume, never declared. Required when
     * `compliance.campaign.inherit != true`.
     */
    use_cases?: Array<Campaign.UseCase>;

    /**
     * Expected monthly volume. Decides how the campaign registers and which fee tier
     * applies: below the low-volume threshold it registers as LOW_VOLUME with
     * sub-use-cases, above it as a single use case or MIXED. Omitting it registers the
     * campaign at the higher-fee standard tier.
     */
    volume?: string;
  }

  export namespace Campaign {
    export interface UseCase {
      /**
       * Sample messages. TCR sample1..sample5 for this use case. One to five, each
       * carrying the brand name and an opt-out instruction.
       */
      sample_messages: Array<unknown>;

      /**
       * Use case. What this entry sends. MIXED and LOW_VOLUME are refused — volume
       * decides those.
       */
      use_case:
        | 'MARKETING'
        | 'ACCOUNT_NOTIFICATION'
        | 'CUSTOMER_CARE'
        | 'FRAUD_ALERT'
        | '2FA'
        | 'DELIVERY_NOTIFICATION'
        | 'SECURITY_ALERT'
        | 'M2M'
        | 'HIGHER_EDUCATION'
        | 'POLLING_VOTING'
        | 'PUBLIC_SERVICE_ANNOUNCEMENT';
    }
  }
}

/**
 * One SMS market the profile sends in — its sender, where that sender stands, and
 * what the market wants.
 *
 * A profile may send in several: it is a tenant, not a market. Each carries its
 * own status, because a profile can be live in one country and mid-registration in
 * another — and each carries what it still owes, rather than that being reported
 * in a separate array a caller has to join on.
 */
export interface SMSMarket {
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
  compliance?: SuppliedCompliance | null;

  country?: string | null;

  number_type?: string | null;

  /**
   * Every number this market holds or is still owed, each with its area code and its
   * own status (ACTIVE once it can send, PROVISIONING while it is still to be
   * assigned, INACTIVE once it could send and no longer can). One entry for a market
   * holding one number. US 10DLC numbers are assigned when the campaign is approved,
   * so they read as owed until then. Read-only.
   */
  numbers?: Array<SMSNumber>;

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
   * The sender itself. Null until a carrier-assigned number is procured. For a
   * market holding several numbers, the first active one (the first assigned while
   * none is active) — every number is in numbers.
   */
  sender_value?: string | null;

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
 * One number of an SMS market.
 */
export interface SMSNumber {
  /**
   * The number's area code, e.g. 212. While the number is still to be assigned, the
   * area code it was asked for, or null when it was asked for in any area code.
   */
  area_code?: string | null;

  /**
   * The number, or null while it is still to be assigned.
   */
  sender_value?: string | null;

  /**
   * ACTIVE once the number can send; PROVISIONING while it is still to be assigned;
   * INACTIVE once it could send and no longer can.
   */
  status?: string | null;
}

/**
 * One entry of numbers: how many numbers to assign in one area code, or in any
 * area code when AreaCode is omitted.
 */
export interface SMSNumberRequest {
  /**
   * The area code, e.g. 212, validated against the request's country. Omit it for
   * numbers in any area code.
   */
  area_code?: string | null;

  /**
   * How many numbers. At least 1; omitted means 1.
   */
  quantity?: number | null;
}

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
export interface SuppliedCompliance {
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
  documents?: Array<SuppliedDocument> | null;
}

/**
 * A document a market asked for and has been given.
 */
export interface SuppliedDocument {
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

export interface SMSCreateParams {
  /**
   * Body param: Sender type. Decides the provisioning flow and what compliance is
   * asked for.
   *
   * [Required] so the published document says so. The validator has always demanded
   * it, but requiredness reached the schema by matching a rule to a property name —
   * which works for country, whose wire name is its camel-cased C# name, and
   * silently does not for number_type. A client generating a request from our
   * OpenAPI therefore sent what the document called sufficient and was answered 400.
   *
   * - `LOCAL` - A geographic number for the country. The ordinary choice:
   *   recognisable to recipients, and available almost everywhere.
   * - `TOLL_FREE` - A toll-free number. High throughput and no per-country
   *   registration, but US toll-free traffic goes through its own verification.
   * - `SHORT_CODE` - A short code — five or six digits, leased rather than
   *   provisioned. Highest throughput, longest lead time, and the most expensive.
   * - `ALPHANUMERIC` - A sender name rather than a number, up to 11 characters.
   *   Recipients cannot reply. Not available in every country, and several require
   *   it to be pre-registered with documents.
   * - `TEN_DLC` - A US 10-digit long code registered with The Campaign Registry. The
   *   only sender type that registers with a compliance regime, so it is the only
   *   one whose market declares `compliance.brand` and `compliance.campaign`.
   * - `MOBILE` - A mobile number. Where a country distinguishes it from a landline,
   *   some carriers treat mobile traffic differently.
   * - `10DLC` - The industry's spelling of `TEN_DLC`, accepted so an integrator can
   *   send the term it knows. Resolves to the same market.
   */
  number_type: 'LOCAL' | 'TOLL_FREE' | 'SHORT_CODE' | 'ALPHANUMERIC' | 'TEN_DLC' | 'MOBILE' | '10DLC';

  /**
   * Body param: The area codes to put this sender in, in your own order of
   * preference, e.g. ["415", "628"] for the US or ["20"] for London. Omit it and a
   * number is claimed anywhere in the country.
   *
   * Ordered, and the order is the request. The claim tries each code in turn and
   * stops at the first that yields a number. Nothing sorts the list and a code
   * listed twice is refused.
   *
   * One to fifty entries, each the area code as digits: 415, with the trunk prefix
   * as 020, or with the country's dialing prefix as +1415 (all are stored as the
   * bare code). A dialing prefix from a different country than country is refused.
   * Each code is checked against the country's numbering plan: it must start real
   * local or mobile numbers there, so toll-free and premium ranges, service codes
   * and another country's codes are refused with a reason.
   *
   * LOCAL senders in any country, and US TEN_DLC senders. No other sender type has a
   * geographic area code, and the list is refused with one rather than accepted and
   * dropped.
   *
   * Honoured exactly or not at all. Ask for 415 and you get a 415 number or you get
   * none, never a neighbouring code you did not name. A miss leaves the market with
   * no sender yet and the codes recorded on it, so it is filled when stock appears
   * rather than filled now from somewhere else. Many countries outside North America
   * require address or business documents before a local number can be bought, which
   * can delay or prevent the fill.
   */
  area_codes?: Array<string> | null;

  /**
   * Body param: The compliance values a market registers with. `brand` and
   * `campaign` apply to US `TEN_DLC`; other markets fill this map with the document
   * keys their own requirements name.
   */
  compliance?: MarketCompliance;

  /**
   * Body param: ISO 3166-1 alpha-2 country the sender operates in.
   */
  country?: string;

  /**
   * Body param: The numbers to assign, one entry per area code, e.g. [{"area_code":
   * "212", "quantity": 2}, {"area_code": "415"}, {"quantity": 1}]: two numbers in
   * 212, one in 415 and one in any area code. quantity defaults to 1, and an entry
   * without area_code means any area code. Omit numbers for one number.
   *
   * Only with LOCAL or TEN_DLC, and not together with area_codes. Each area code is
   * validated against country the same way area_codes is and may appear once, and at
   * most one entry may leave area_code out. On a LOCAL market you already hold, this
   * adds the numbers to it. US TEN_DLC numbers are assigned when the campaign is
   * approved, not at request time. Not available when the profile inherits the
   * organization's campaign.
   */
  numbers?: Array<SMSNumberRequest> | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param: The sender's identity where the caller chooses it. Required when
   * number_type is ALPHANUMERIC; optional for carrier-assigned types, which are
   * procured afterwards.
   */
  sender_value?: string | null;

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

export interface SMSRetrieveParams {
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

export interface SMSUpdateParams {
  /**
   * Path param: ISO 3166-1 alpha-2 country code, e.g. us
   */
  country: string;

  /**
   * Body param: The compliance values a market registers with. `brand` and
   * `campaign` apply to US `TEN_DLC`; other markets fill this map with the document
   * keys their own requirements name.
   */
  compliance?: MarketCompliance;

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

export interface SMSListParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export declare namespace SMS {
  export {
    type APIResponseOfListOfSMSMarket as APIResponseOfListOfSMSMarket,
    type APIResponseOfSMSMarket as APIResponseOfSMSMarket,
    type MarketCompliance as MarketCompliance,
    type SMSMarket as SMSMarket,
    type SMSNumber as SMSNumber,
    type SMSNumberRequest as SMSNumberRequest,
    type SuppliedCompliance as SuppliedCompliance,
    type SuppliedDocument as SuppliedDocument,
    type SMSCreateParams as SMSCreateParams,
    type SMSRetrieveParams as SMSRetrieveParams,
    type SMSUpdateParams as SMSUpdateParams,
    type SMSListParams as SMSListParams,
  };
}
