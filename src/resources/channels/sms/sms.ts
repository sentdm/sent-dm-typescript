// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as MarketsAPI from '../markets';
import * as TenDlcAPI from './ten-dlc';
import {
  TenDlc,
  TenDlcAddCampaignParams,
  TenDlcCampaignUseCase,
  TenDlcListCampaignsParams,
  TenDlcListCampaignsResponse,
  TenDlcUpdateCampaignParams,
} from './ten-dlc';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';

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
  tenDlc: TenDlcAPI.TenDlc = new TenDlcAPI.TenDlc(this._client);

  /**
   * Gives the customer a sender in one country — the first market it sends in, and
   * the fifth. Two addresses, one call: `POST /v3/channels/sms` with `country` and
   * `number_type` in the body, or `POST /v3/channels/sms/{country}/{type}` with the
   * market as the path (the path wins over the body).
   *
   * ## What to have in place first
   *
   * **Call `GET /v3/channels/sms/{country}/compliance` first.** It lists every
   * sender type the country offers and, for each, the compliance values and
   * documents to send, with their formats and options. You never have to track forty
   * countries' rules yourself.
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
   * **Your own brand has to be complete here.** It must carry every field the regime
   * asks of it, counting what you already hold — send the rest in this request. A
   * missing one is `400` naming each field, rather than a `202` for a market that
   * could never be filed. A brand you inherit is asked for nothing.
   *
   * **A campaign of your own is optional here.** Sent, it has to be complete in the
   * same way, and the `numbers` you ask for go on it. Omitted, no campaign is
   * written and `numbers` and `area_codes` are refused (`400`), because numbers
   * belong to a campaign: the market reads `ACTION_NEEDED` until you add one with
   * `POST /v3/channels/sms/US/TEN_DLC/campaigns`, then its numbers with
   * `POST /v3/channels/sms/US/TEN_DLC/numbers`.
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
   * holds at most 49 numbers.
   *
   * US `TEN_DLC` numbers belong to the market's campaign and are assigned when the
   * campaign is approved, not at request time. Until then they read as
   * `PROVISIONING` in the response's `numbers`, each with the area code it was asked
   * for. A profile inheriting your organization's campaign cannot request `numbers`
   * (`400`).
   *
   * **This call opens a market once. A market you already hold is `409`**, with a
   * sender or still waiting for one, and nothing is added to it here: change its
   * compliance with `PATCH /v3/channels/sms/{country}/{type}`, add numbers (and
   * their area codes) with `POST /v3/channels/sms/{country}/{type}/numbers`, and on
   * US `TEN_DLC` add a campaign with `POST /v3/channels/sms/US/TEN_DLC/campaigns`.
   * The `409` names them. A market is a `(country, sender_type)` pair, so a **second
   * sender type in a country you already send in is fine** — `US TOLL_FREE`
   * alongside `US TEN_DLC` is the ordinary case. Two of the same type is not.
   *
   * One exception: while a market's sender type is still unassigned, adding any type
   * to that country is `409`, because the market you have may be about to become the
   * one you asked for.
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
   * const apiResponseOfChannelMarket =
   *   await client.channels.sms.create({
   *     number_type: 'TEN_DLC',
   *   });
   * ```
   */
  create(
    params: SMSCreateParams,
    options?: RequestOptions,
  ): APIPromise<MarketsAPI.APIResponseOfChannelMarket> {
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
     * Postal code. Five digits for a US registration. Required when
     * `compliance.brand.inherit != true`.
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
     * Website. TCR website. Required whenever the identity's fields are sent, as the
     * dashboard requires it: carriers weigh it when vetting. Not reported as
     * outstanding on an identity already stored without one, which may be filed and no
     * longer changeable. Required when `compliance.brand.inherit != true`, whenever
     * its block is written.
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
     * Expected monthly volume. Required whenever the campaign's fields are written. A
     * whole number of messages, e.g. 1000 or 10000. Decides how the campaign registers
     * and which fee tier applies: below the low-volume threshold it registers as
     * LOW_VOLUME with sub-use-cases, above it as a single use case or MIXED. Omitting
     * it registers the campaign at the higher-fee standard tier. Required when
     * `compliance.campaign.inherit != true`, whenever its block is written.
     */
    volume?: string;
  }

  export namespace Campaign {
    export interface UseCase {
      /**
       * Sample messages. TCR sample1..sample5 for this use case. One to five, each 20 to
       * 1024 characters and carrying the brand name and an opt-out instruction. At most
       * five across the campaign, and at least two when a high-volume campaign has a
       * single use case.
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
 * One number of an SMS market.
 */
export interface SMSNumber {
  /**
   * The number's area code, e.g. 212. While the number is still to be assigned, the
   * area code it was asked for, or null when it was asked for in any area code.
   */
  area_code?: string | null;

  /**
   * The campaign the number is on, or is owed for: the id of its entry in
   * compliance.campaigns. Omitted for a market that registers no campaigns, and
   * where the campaign is not known — a number recorded without one, or one owed on
   * a campaign inherited from the organization.
   */
  campaign_id?: string | null;

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
 * One campaign a market registers, as the customer supplied it, with `inherit`
 * saying whose it is.
 */
export type SuppliedCampaign = { [key: string]: unknown };

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
   * Every campaign this market registers, each with inherit saying whose it is —
   * oldest first.
   *
   * A list, because a market can now be on more than one. POST
   * /v3/channels/sms/US/TEN_DLC/campaigns adds a campaign of the customer's own
   * beside the one it has, and a profile running on its organization's campaign
   * keeps that one when it adds its own. Campaign can only show one of them, so it
   * stays as it was, for callers that read it, and this is where the rest are.
   *
   * The organization's campaign reads "inherit": true and the customer's own read
   * "inherit": false. Each entry also carries its own status (ACTIVE once the
   * carriers have elected it, PENDING_REVIEW until then, ACTION_NEEDED when sent
   * back for correction, DECLINED when the carriers refused it, INACTIVE once
   * ended), so a market on several says which is approved; why the market is held up
   * stays its own reason, which names the campaign concerned. Each entry is the
   * shape of Campaign plus id, the campaign's own id, so several can be told apart.
   * Campaign carries no id, because it is sent back to PATCH, which refuses a key it
   * does not declare; this list is read-only.
   *
   * Absent for a market that registers with nobody; empty for one that registers and
   * has no campaign yet.
   */
  campaigns?: Array<SuppliedCampaign> | null;

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

SMS.TenDlc = TenDlc;

export declare namespace SMS {
  export {
    type MarketCompliance as MarketCompliance,
    type SMSNumber as SMSNumber,
    type SMSNumberRequest as SMSNumberRequest,
    type SuppliedCampaign as SuppliedCampaign,
    type SuppliedCompliance as SuppliedCompliance,
    type SuppliedDocument as SuppliedDocument,
    type SMSCreateParams as SMSCreateParams,
  };

  export {
    TenDlc as TenDlc,
    type TenDlcCampaignUseCase as TenDlcCampaignUseCase,
    type TenDlcListCampaignsResponse as TenDlcListCampaignsResponse,
    type TenDlcAddCampaignParams as TenDlcAddCampaignParams,
    type TenDlcListCampaignsParams as TenDlcListCampaignsParams,
    type TenDlcUpdateCampaignParams as TenDlcUpdateCampaignParams,
  };
}
