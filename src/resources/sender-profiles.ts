// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WebhooksAPI from './webhooks';
import * as ChannelsAPI from './channels/channels';
import * as RcsAPI from './channels/rcs';
import * as SMSAPI from './channels/sms';
import { APIPromise } from '../core/api-promise';
import { PagePromise, SenderProfilesPage, type SenderProfilesPageParams } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

/**
 * Your customers, each sending as itself.
 *
 * A sender profile is a tenant of yours: it has its own API key, its own balance, and can have its own identity and senders — so your customers send under their own brand and never see Sent. Depth is one; a profile cannot create profiles.
 *
 * **Everything is inherited unless the profile owns it.** `{ "name": "…" }` alone gives you a usable profile immediately, running on your identity, your inbox and your billing. Supply a capability's fields and the profile owns that one instead.
 *
 * **A sender is the exception.** A brand and a campaign can be inherited; a number cannot. A profile either has a sender of its own or terminates through your shared routes.
 *
 * To act for a profile on any other resource, send `x-profile-id` with your organization key rather than looking for a parallel set of endpoints.
 */
export class SenderProfiles extends APIResource {
  /**
   * Creates a sender profile under your organization. A profile is a customer of
   * yours: it sends under its own or your identity, and your customers never see
   * Sent.
   *
   * ## The minimum
   *
   * `{ "name": "Example Retail", "short_name": "Example" }`. `short_name` is the SMS
   * sender id and is required. Inbox and opt-out list come from your organization.
   * Its brand and campaign are your organization's only where `compliance` says
   * `{ "inherit": true }` — omitted, the profile has neither. Billing defaults to
   * the profile's own balance, with your organization covering what it cannot.
   *
   * **A sender is not one of them.** The brand and the campaign can be inherited; a
   * number cannot. A profile either has a sender of its own — `channels.sms` — or it
   * has none and terminates through the shared routes for that country.
   *
   * ## Saying what a profile owns
   *
   * Every capability is one of three things, and there is no flag per state:
   *
   * - **Its own** — supply the capability's fields. Data is what owning looks like.
   * - **The organization's** — `{ "inherit": true }`, with nothing else.
   * - **None** — omit the block.
   *
   * There is no `"inherit": false` that also carries no data. A second way to say
   * the same thing would let a request contradict itself.
   *
   * Inheriting needs no id. A customer has exactly one brand, so `brand` resolves
   * without one.
   *
   * **The campaign has no block of its own.** It is only ever a registration, and
   * every field of one is something a specific market demands — so it lives in
   * `compliance`, alongside the rest of what that market asks for, and it says whose
   * it is there too: `"compliance": { "campaign": { "inherit": true } }` runs the
   * profile on your organization's campaign and brand, and stops this call asking
   * for any campaign field. `"brand": { "inherit": true }` alone inherits the brand
   * only: the campaign is then the profile's own. Inheriting takes _all_ of your
   * organization's, because inheritance resolves an owner rather than a single row.
   *
   * A profile with a `brand` of its own **cannot** inherit the campaign, and asking
   * is refused with `400`: a campaign is filed against a brand registration, and
   * your organization's campaign is filed against your organization's brand rather
   * than this profile's. Inherit both, own both, or inherit the brand and own the
   * campaign.
   *
   * `channels.sms` is the market the profile starts in — one `country` and
   * `number_type`. It decides what else this call asks for: the compliance catalog
   * is keyed on that pair, and it determines which fields `brand` accepts and what
   * `compliance` answers for.
   *
   * **Several numbers in that market**: `channels.sms.numbers` lists them, one entry
   * per area code, e.g. `[{"area_code": "212", "quantity": 2}, {"quantity": 1}]` for
   * two in 212 and one in any area code. `quantity` defaults to 1, an entry without
   * `area_code` means any area code, and the total is at most 49. The market is
   * created with **one campaign**, the one in `compliance.campaign`, and a US
   * `TEN_DLC` market's numbers are stored on it and assigned when it is approved. A
   * profile inheriting your organization's campaign keeps one number. Every number
   * is listed in `channels.sms[].numbers` with its area code and status.
   *
   * A profile is a tenant, not a market, so it can go on to send in several — but
   * through `POST /v3/channels/sms` with the `x-profile-id` header, one market and
   * its compliance at a time. Reads return every market as `channels.sms[]`, so the
   * read shape is a list even where this one is not.
   *
   * `brand` is required when `number_type` is `TEN_DLC` — inherited or its own. A
   * 10DLC registration has nothing to attach to without one, and no later call can
   * supply it, so omitting it is refused with `400` rather than reported as
   * outstanding.
   *
   * ## Use cases and volume
   *
   * A TCR campaign declares one to five `use_cases`, each with its own
   * `sample_messages` — TCR attributes samples to the use case they illustrate, so
   * they travel together.
   *
   * How that set registers is derived from `volume` and never declared. Below the
   * low-volume threshold the campaign registers as `LOW_VOLUME` with every entry as
   * a sub-use-case; above it, one entry registers as that use case outright and
   * several register as `MIXED` with sub-use-cases. `MIXED` and `LOW_VOLUME` are
   * therefore refused as `use_case` values: they describe the shape of a set, which
   * is ours to work out.
   *
   * **Leaving `volume` out is accepted and costs more.** An absent value registers
   * the campaign at the standard tier, which carries the higher fee — so say so when
   * a campaign is low volume. Sole proprietor brands are the exception: their fee is
   * fixed by entity type, and volume only decides the use case.
   *
   * ## Compliance
   *
   * `brand` is captured identically in every country. Everything a specific market
   * demands on top of it — including every field of the campaign — goes in
   * `compliance`, as key/value entries whose keys depend on the sender's country and
   * type. US `TEN_DLC` registers with The Campaign Registry and asks for a
   * substantial set; an alphanumeric sender may pre-register with documents, or need
   * nothing at all.
   *
   * You do not have to know any of it. Omit `compliance` and the response lists
   * exactly what is outstanding, with types and accepted values — or call
   * `GET /v3/compliance/requirements` first. Anything Sent supplies on your behalf
   * is never asked for, and is rejected if sent.
   *
   * Requirements can be conditional, and the condition is published as
   * `required_when` so you can render a form from it rather than discover the rule
   * by being rejected. Every US `TEN_DLC` campaign field carries
   * `compliance.inherit != true` — send `"inherit": true` and none of them is asked
   * for or accepted, because the profile is running on your organization's campaign.
   *
   * ## Uploading documents
   *
   * Send `application/json` for everything except a market that pre-registers a
   * sender with supporting documents. For those, send `multipart/form-data` instead:
   * put this entire document — unchanged — in a single field named `profile`, and
   * attach each file under a field named after the compliance key it satisfies.
   * Individual form fields per property are not read; the payload is always the one
   * `profile` field.
   *
   * A pre-registration market has no `brand` and no `campaign` — those are asked for
   * only where a regime registers one — so its `compliance` carries nothing at all,
   * and the documents are the request:
   *
   * ```bash
   * curl -X POST https://api.sent.dm/v3/sender-profiles \
   *   -H 'x-api-key: YOUR_SECRET_TOKEN' \
   *   -F 'profile={
   *         "name": "Example Retail",
   *         "short_name": "EXAMPLE",
   *         "channels": {
   *           "sms": {
   *             "country": "XK",
   *             "number_type": "ALPHANUMERIC",
   *             "sender_value": "EXAMPLE"
   *           }
   *         }
   *       }' \
   *   -F 'business_registration=@registration.pdf' \
   *   -F 'letter_of_authorization=@loa.pdf'
   * ```
   *
   * `business_registration` and `letter_of_authorization` are illustrative. The real
   * field names are whatever that market configures, so read them from
   * `GET /v3/compliance/requirements`, which lists documents separately from the
   * values — under `attachments`, each with the `field_name` to put the file under.
   *
   * A document has no JSON form, so naming one in `compliance` is refused with `400`
   * rather than ignored: accepting it would report the requirement as satisfied
   * while no file was ever stored.
   *
   * ## WhatsApp and RCS
   *
   * Neither can be inherited, so neither takes an `inherit`: the profile's WhatsApp
   * account and RCS agent are its own or it has none. Sharing your organization's
   * would share its inbox and its throughput, which makes the two indistinguishable
   * to a recipient.
   *
   * `channels.whatsapp` names one of the accounts shared into your organization, and
   * takes the two identifiers nothing else can supply: `waba_id`, because your
   * organization holds one account per client, and `phone_number_id`, because naming
   * the account's number is what assigns it to the profile as the number it sends
   * from.
   *
   * Everything else is resolved from your organization — the Multi-Partner Solution
   * the account arrived through, the client business portfolio that owns it, the
   * access token and that token's expiry. None of them is accepted here: the first
   * two are Meta's answer about provenance, so a value you sent could assert a
   * partnership Meta disagrees with, and the token is minted per client business and
   * rotates roughly every sixty days.
   *
   * `phone_number_id` is optional. Omit it to connect the account now and settle the
   * number later — the channel reads as `ACTION_NEEDED` with `reason_code`
   * `CHANNEL_007`, and the profile's WhatsApp messages fail until a number is named.
   * They do not fall back to your organization's account.
   * `POST /v3/channels/whatsapp` connects an account to an existing profile and
   * resolves the same fields the same way.
   *
   * An account of its own needs a sender of its own, so `channels.whatsapp` requires
   * `channels.sms`. A profile sending SMS on your organization's sender shares that
   * inbox and opt-out list, and is not a separate tenant to give an account to —
   * asking is refused with `400`, before your organization is asked to resolve
   * anything.
   *
   * `channels.rcs` records the RCS agent. RCS (Rich Communication Services) is the
   * next-generation SMS standard built into Android — it lets you send branded
   * messages with images, buttons and read receipts over the carrier network, with
   * no app install required. Learn more in the
   * [Google RCS documentation](https://developers.google.com/business-communications/rcs-business-messaging).
   *
   * All fields on the agent form are required except `opt_in_screenshot_url`. The
   * full form must be submitted in one go so the carrier review has everything it
   * needs. A carrier approval no API call can trigger is arranged offline, so the
   * status reports `PROVISIONING` until it is.
   *
   * ## Responses
   *
   * `201` when the profile is complete on return — the fully-inherited case, where
   * nothing needs registering. `202` when something is still provisioning, with
   * per-capability status and outstanding requirements. `409` when the WhatsApp
   * account supplied is already recorded. `400` covers a wrong value as well as a
   * missing one: a missing brand under `TEN_DLC`, a brand or campaign inherited
   * under `TEN_DLC` that your organization does not have yet, an unknown compliance
   * key, a bad type, a sender id the market does not allow, a `waba_id` that is not
   * one of the accounts shared into your organization, or a WhatsApp account Meta
   * rejects. `502` when Meta could not be reached to verify the WhatsApp account;
   * nothing was created, so retry.
   *
   * @example
   * ```ts
   * const apiResponseOfSenderProfile =
   *   await client.senderProfiles.create();
   * ```
   */
  create(
    params: SenderProfileCreateParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfSenderProfile> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post(
      '/v3/sender-profiles',
      maybeMultipartFormRequestOptions(
        {
          body,
          ...options,
          headers: buildHeaders([
            { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
            options?.headers,
          ]),
        },
        this._client,
      ),
    );
  }

  /**
   * Reads one of your sender profiles.
   *
   * The document mirrors `POST /v3/sender-profiles`, with three differences that
   * follow from this being a read rather than a request.
   *
   * `channels.sms` is a **list**. Create takes the one market a profile starts in; a
   * profile can go on to send in several, and this reports all of them, each with
   * its own `status`.
   *
   * `compliance.brand` comes back **in full, with `inherit` saying whose it is**. On
   * a request `{ "inherit": true }` carries no data because there is nothing to
   * send; here it carries the data, because the point of a read is to say what the
   * profile actually sends under.
   *
   * **There is no `campaigns` array.** Brand, campaign, and compliance documents are
   * reported at the profile root in `compliance`. A profile running on your
   * organization's campaign is asked for none of the campaign fields, so
   * `compliance.campaign` carries `{ "inherit": true }` with no campaign data.
   *
   * `api_key` is **never** returned here. It is shown once, by create.
   *
   * A profile belonging to another organization reads as `404`, not `403`: saying
   * which of the two it is would confirm the id exists.
   *
   * @example
   * ```ts
   * const apiResponseOfSenderProfile =
   *   await client.senderProfiles.retrieve(
   *     '770e8400-e29b-41d4-a716-446655440002',
   *   );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<APIResponseOfSenderProfile> {
    return this._client.get(path`/v3/sender-profiles/${id}`, options);
  }

  /**
   * Changes a profile's own attributes: `name`, `short_name`, `description` and
   * `notifications` (who is emailed about the profile's events — `ORGANIZATION`,
   * `SENDER_PROFILE`, or `ORGANIZATION_AND_SENDER_PROFILE`).
   *
   * **Only those.** A profile's identity, its markets and its compliance each have a
   * sub-resource of their own, because each has its own validation and its own
   * external consequences — a brand change may need re-registering, a market change
   * provisions a sender. Folding them in here would give those fields two writers
   * and no way to say which one wins.
   *
   * Omitting a field leaves it alone; sending `null` clears it. Those are different
   * requests, so `{}` changes nothing and is refused rather than silently accepted —
   * a caller who misspelt every field would otherwise get a `200` and an unchanged
   * profile.
   *
   * `name` and `short_name` cannot be cleared: `short_name` is the SMS sender id, so
   * a supplied value must be 3–11 characters of letters, numbers and spaces with at
   * least one letter.
   *
   * Returns the profile as `GET /v3/sender-profiles/{id}` would, so the result of
   * the change needs no second call to see.
   *
   * @example
   * ```ts
   * const apiResponseOfSenderProfile =
   *   await client.senderProfiles.update(
   *     '770e8400-e29b-41d4-a716-446655440002',
   *   );
   * ```
   */
  update(
    id: string,
    params: SenderProfileUpdateParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfSenderProfile> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.patch(path`/v3/sender-profiles/${id}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Lists the sender profiles under your organization, newest first, paginated with
   * `page` and `page_size`.
   *
   * Each entry is the same document `GET /v3/sender-profiles/{id}` returns, with one
   * difference: **`compliance.documents` at the profile root is absent**. Working
   * out which documents a market holds means a catalog lookup and a document read
   * per market, and doing that for every profile on a page would turn one request
   * into dozens to answer a question you did not ask. Read a single profile for
   * that. Brand and campaign are still included when they exist.
   *
   * `compliance.documents` being **absent** is not the same as it being an **empty
   * list**. Absent means the documents were not fetched here; an empty list means
   * the profile holds none.
   *
   * `api_key` is never returned. It is shown once, by create.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const senderProfile of client.senderProfiles.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: SenderProfileListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SenderProfilesSenderProfilesPage, SenderProfile> {
    return this._client.getAPIList('/v3/sender-profiles', SenderProfilesPage<SenderProfile>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes one of your sender profiles and returns `204`.
   *
   * The delete is **soft**: the profile stops being usable and stops appearing in
   * reads, and its message history is kept, because deleting a profile must not
   * delete the record of what it sent.
   *
   * ## What it releases
   *
   * Anything the profile still held goes with it. A **phone number** returns to our
   * inventory and can be given to whoever asks next — it does not stay reserved for
   * you, and getting the same number back afterwards is not something we can
   * promise. A **WhatsApp account of its own** is deregistered from Meta. Its
   * routing rules stop being used, so nothing sends through the profile after this
   * call.
   *
   * A profile that only inherits from its organization holds nothing of its own and
   * releases nothing.
   *
   * ## When it is refused
   *
   * A number the profile holds that your **WhatsApp Business Account still carries**
   * refuses the delete with a `409 CONFLICT_012`, and nothing is deleted: it would
   * return to our shared inventory while Meta still routes WhatsApp to it, and the
   * next customer given it could not register it at all. Only you can take it off
   * the account — deregister **and** delete it in WhatsApp Manager, then try again.
   * A `409 CONFLICT_013` means we could not read the account, so we cannot tell
   * either way.
   *
   * @example
   * ```ts
   * await client.senderProfiles.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v3/sender-profiles/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type SenderProfilesSenderProfilesPage = SenderProfilesPage<SenderProfile>;

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfSenderProfile {
  /**
   * A sender profile as the API reports it — the same document the create call
   * accepts, plus the read-only facts it cannot: each market's status and what it
   * still owes.
   *
   * No status at the profile, brand or campaign level. Brand and campaign are
   * identity, and identity has no lifecycle. What has one is the registration of a
   * sender in a market, and the approval of a channel — so status lives there, where
   * it says which specific thing is blocked rather than flattening several answers
   * into one.
   */
  data?: SenderProfile | null;

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
export interface APIResponseOfSenderProfilesList {
  /**
   * A paginated list of sender profiles.
   */
  data?: SenderProfilesList | null;

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
 * A sender profile as the API reports it — the same document the create call
 * accepts, plus the read-only facts it cannot: each market's status and what it
 * still owes.
 *
 * No status at the profile, brand or campaign level. Brand and campaign are
 * identity, and identity has no lifecycle. What has one is the registration of a
 * sender in a market, and the approval of a channel — so status lives there, where
 * it says which specific thing is blocked rather than flattening several answers
 * into one.
 */
export interface SenderProfile {
  id?: string;

  /**
   * The API key for this profile.
   *
   * Returned by create and by nothing else. It is shown once; a read that repeated
   * it would turn every profile list into a credential dump and put the key into any
   * log or cache that keeps a response body.
   *
   * Omitted rather than null on a read. A key field that is always present and
   * always empty suggests it could be populated, which is an invitation to populate
   * it; absent says there is nothing to look for. Doing it with a serializer
   * condition rather than a second response type keeps create and read on one shape,
   * which is what stops them drifting.
   */
  api_key?: string | null;

  /**
   * Who pays for a sender profile's traffic, as a read reports it.
   *
   * Its own type, field for field the same as BillingRequest. Same reason as the
   * brand: a response is not a request, whatever it carries.
   */
  billing?: SenderProfileBilling | null;

  /**
   * The channels a profile sends on. SMS is a list because a profile can send in
   * several markets; WhatsApp and RCS are single, because a profile has one business
   * account and one agent.
   */
  channels?: ChannelsAPI.ChannelsState | null;

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
  compliance?: SenderProfile.Compliance | null;

  created_at?: string;

  description?: string | null;

  name?: string;

  /**
   * Who is notified about this profile's events: ORGANIZATION, SENDER_PROFILE, or
   * ORGANIZATION_AND_SENDER_PROFILE. Always present — a profile that never chose
   * reports as ORGANIZATION, the value a create would send to get the default
   * behaviour.
   */
  notifications?: string | null;

  organization_id?: string | null;

  short_name?: string | null;
}

export namespace SenderProfile {
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
 * Who pays for a sender profile's traffic, as a read reports it.
 *
 * Its own type, field for field the same as BillingRequest. Same reason as the
 * brand: a response is not a request, whatever it carries.
 */
export interface SenderProfileBilling {
  /**
   * Whether the organization pays, rather than the profile.
   */
  inherit?: boolean;
}

/**
 * Who pays for what a sender profile sends.
 *
 * Ownership reads the same way as BrandRequest and CampaignRequest: inherit: true
 * is the organization paying; inherit: false (or an empty block) is the profile
 * paying for itself.
 *
 * An absent block is the one place billing differs from brand and campaign: a
 * profile still has to be paid for, so omitting billing stores
 * ProfileAndOrganizationBilling — the profile pays first and its organization
 * covers what the profile's balance cannot (see ResolveStored). { "name": "..." }
 * stays a complete request.
 *
 * Billing carries no fields of its own yet, so a profile paying for itself is {
 * "inherit": false } — or an empty block, which means the same. That is thinner
 * than brand and campaign, where supplying data is the act of owning; it becomes
 * ordinary the moment billing gains a contact or a payment method to carry.
 */
export interface SenderProfileBillingRequest {
  /**
   * Whether the parent organization pays. false is the profile paying for itself.
   */
  inherit?: boolean;
}

/**
 * The channels the profile sends on. Each is independently the profile's own or
 * absent — none can be inherited, so none carries a mode and presence is the whole
 * of the request.
 *
 * A profile can send SMS in several markets, but create takes one — the market it
 * starts in. Further markets are added through POST /v3/channels/sms with
 * x-profile-id, and a read returns them all as a list. Create stays singular
 * permanently rather than being a list that accepts one entry: the constraint is
 * in the type, and there is no later widening to break the contract.
 */
export interface SenderProfileChannels {
  /**
   * Asks for an RCS agent of the profile's own, optionally with the full order form
   * inline.
   *
   * Two modes, distinguished by whether any field is populated: "rcs": {} — intent
   * only. Records that the profile wants its own agent; the order form is submitted
   * separately through POST /v3/channels/rcs once the fields are ready. "rcs": {
   * ...fields... } — full form. All required fields must be present; the agent is
   * created alongside the profile in one call. Omitting opt_in_screenshot_url is
   * allowed.
   */
  rcs?: SenderProfileRcs | null;

  /**
   * One SMS market a profile sends in — a country and a sender type.
   *
   * A profile may have several. It is a tenant, not a market: a business sending to
   * two countries is one customer of yours, and forcing it into two profiles would
   * give it two API keys, two inboxes and two contact lists for one business. The
   * platform already assumes many — CustomerChannelProviders is unique on (customer,
   * channel, iso, number).
   *
   * No mode: a sender is the profile's own or it has none. Listing a market is the
   * request for one.
   *
   * Also the discriminator for everything else: the compliance catalog is keyed on
   * (country, number type), and that pair decides which fields brand accepts and
   * what compliance is asked for.
   */
  sms?: SenderProfileSMS | null;

  /**
   * The profile's own WhatsApp Business Account, named by the two identifiers the
   * organization cannot answer for you.
   *
   * No mode: a profile's WABA is its own or it has none. Sharing the organization's
   * would mean sharing its inbox and its throughput, which makes the two
   * indistinguishable to a recipient — so inheriting is not offered rather than
   * refused.
   *
   * Everything derivable is derived. Whenever this block is present, the solution
   * the account arrived through, the client business portfolio that owns it, the
   * access token and that token's expiry are all resolved from the organization by
   * IPartnerSolutionService.ResolveAccountCredentialsAsync — the first two off the
   * org's shared-account listing, the token minted against the org's own solution.
   * They were previously asked for and are no longer accepted: solution_id and
   * owner_business_id are Meta's answer about provenance, so taking them from the
   * caller let a request assert a partnership Meta disagreed with, and the listing
   * has to be consulted regardless because it is what proves the account is one this
   * organization may reach.
   *
   * No access token, and there never was one here: it is minted per client business
   * portfolio and rotates roughly every sixty days, so a pasted value would be stale
   * before it was useful. Asking a customer to mint a System User token in Meta
   * Business Manager is skilled work in a console they were never meant to see, and
   * it would say nothing about which solution the account came from or when it is
   * revoked.
   */
  whatsapp?: SenderProfileWhatsapp | null;
}

/**
 * Asks for an RCS agent of the profile's own, optionally with the full order form
 * inline.
 *
 * Two modes, distinguished by whether any field is populated: "rcs": {} — intent
 * only. Records that the profile wants its own agent; the order form is submitted
 * separately through POST /v3/channels/rcs once the fields are ready. "rcs": {
 * ...fields... } — full form. All required fields must be present; the agent is
 * created alongside the profile in one call. Omitting opt_in_screenshot_url is
 * allowed.
 */
export interface SenderProfileRcs {
  description: string;

  agent_use_case?: string | null;

  banner_url?: string | null;

  billing_category?: string | null;

  brand_color?: string | null;

  brand_email?: string | null;

  brand_name?: string | null;

  brand_phone_number?: string | null;

  brief_company_description?: string | null;

  company_ein?: string | null;

  contact_name_and_title?: string | null;

  customer_support_email?: string | null;

  customer_support_phone_number?: string | null;

  display_name?: string | null;

  entity_type?: string | null;

  help_message?: string | null;

  hosting_region?: string | null;

  logo_url?: string | null;

  /**
   * The registered address of the company behind the agent.
   */
  official_address?: RcsAPI.RcsAddress | null;

  opt_in_process_description?: string | null;

  /**
   * Optional — uploaded separately and its URL may not be known at submission time.
   */
  opt_in_screenshot_url?: string | null;

  privacy_policy_url?: string | null;

  sample_messages?: Array<string> | null;

  start_message?: string | null;

  stop_message?: string | null;

  terms_and_conditions_url?: string | null;

  website_url?: string | null;
}

/**
 * One SMS market a profile sends in — a country and a sender type.
 *
 * A profile may have several. It is a tenant, not a market: a business sending to
 * two countries is one customer of yours, and forcing it into two profiles would
 * give it two API keys, two inboxes and two contact lists for one business. The
 * platform already assumes many — CustomerChannelProviders is unique on (customer,
 * channel, iso, number).
 *
 * No mode: a sender is the profile's own or it has none. Listing a market is the
 * request for one.
 *
 * Also the discriminator for everything else: the compliance catalog is keyed on
 * (country, number type), and that pair decides which fields brand accepts and
 * what compliance is asked for.
 */
export interface SenderProfileSMS {
  /**
   * ISO 3166-1 alpha-2 country the sender operates in, e.g. US.
   */
  country: string;

  /**
   * The area codes to put this sender in, in your own order of preference, e.g.
   * ["415", "628"] for the US or ["20"] for London. Omit it and a number is claimed
   * anywhere in the country.
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
   * Sender type: LOCAL, MOBILE, TEN_DLC, TOLL_FREE, SHORT_CODE or ALPHANUMERIC.
   * 10DLC is accepted as a synonym of TEN_DLC. Availability varies by country.
   */
  number_type?: string | null;

  /**
   * The numbers to assign, one entry per area code, e.g. [{"area_code": "212",
   * "quantity": 2}, {"area_code": "415"}, {"quantity": 1}]: two numbers in 212, one
   * in 415 and one in any area code. quantity defaults to 1, and an entry without
   * area_code means any area code. Omit numbers for one number.
   *
   * Only with LOCAL or TEN_DLC, and not together with area_codes. Each area code is
   * validated against country the same way area_codes is and may appear once, and at
   * most one entry may leave area_code out. US TEN_DLC numbers are assigned when the
   * campaign is approved, not at request time. Not available when the profile
   * inherits the organization's campaign.
   */
  numbers?: Array<SMSAPI.SMSNumberRequest> | null;

  /**
   * The sender's identity, where the caller chooses it rather than the carrier
   * assigning it. Required when number_type is ALPHANUMERIC; omit for
   * carrier-assigned types and one is provisioned.
   */
  sender_value?: string | null;
}

/**
 * The profile's own WhatsApp Business Account, named by the two identifiers the
 * organization cannot answer for you.
 *
 * No mode: a profile's WABA is its own or it has none. Sharing the organization's
 * would mean sharing its inbox and its throughput, which makes the two
 * indistinguishable to a recipient — so inheriting is not offered rather than
 * refused.
 *
 * Everything derivable is derived. Whenever this block is present, the solution
 * the account arrived through, the client business portfolio that owns it, the
 * access token and that token's expiry are all resolved from the organization by
 * IPartnerSolutionService.ResolveAccountCredentialsAsync — the first two off the
 * org's shared-account listing, the token minted against the org's own solution.
 * They were previously asked for and are no longer accepted: solution_id and
 * owner_business_id are Meta's answer about provenance, so taking them from the
 * caller let a request assert a partnership Meta disagreed with, and the listing
 * has to be consulted regardless because it is what proves the account is one this
 * organization may reach.
 *
 * No access token, and there never was one here: it is minted per client business
 * portfolio and rotates roughly every sixty days, so a pasted value would be stale
 * before it was useful. Asking a customer to mint a System User token in Meta
 * Business Manager is skilled work in a console they were never meant to see, and
 * it would say nothing about which solution the account came from or when it is
 * revoked.
 */
export interface SenderProfileWhatsapp {
  /**
   * The Meta phone-number id this profile sends from. Must already be registered
   * under WabaId.
   *
   * Optional. Omit it to attach the account now and settle the number later: the
   * channel reads as ACTION_NEEDED with CHANNEL_007, and the profile's WhatsApp
   * messages fail until a number is named. They do not fall back to the
   * organization's account. Nothing picks one on your behalf.
   */
  phone_number_id?: string | null;

  /**
   * WhatsApp Business Account id — one of the accounts shared into your
   * organization. Required: the organization holds one per client, and nothing but
   * the caller says which belongs to this profile.
   */
  waba_id?: string | null;
}

/**
 * A paginated list of sender profiles.
 */
export interface SenderProfilesList {
  /**
   * Pagination metadata for list responses
   */
  pagination?: WebhooksAPI.PaginationMeta;

  /**
   * The sender_profiles on this page.
   */
  sender_profiles?: Array<SenderProfile>;
}

export interface SenderProfileCreateParams {
  /**
   * Body param: Who pays for what a sender profile sends.
   *
   * Ownership reads the same way as BrandRequest and CampaignRequest: inherit: true
   * is the organization paying; inherit: false (or an empty block) is the profile
   * paying for itself.
   *
   * An absent block is the one place billing differs from brand and campaign: a
   * profile still has to be paid for, so omitting billing stores
   * ProfileAndOrganizationBilling — the profile pays first and its organization
   * covers what the profile's balance cannot (see ResolveStored). { "name": "..." }
   * stays a complete request.
   *
   * Billing carries no fields of its own yet, so a profile paying for itself is {
   * "inherit": false } — or an empty block, which means the same. That is thinner
   * than brand and campaign, where supplying data is the act of owning; it becomes
   * ordinary the moment billing gains a contact or a payment method to carry.
   */
  billing?: SenderProfileBillingRequest | null;

  /**
   * Body param: The channels the profile sends on. Each is independently the
   * profile's own or absent — none can be inherited, so none carries a mode and
   * presence is the whole of the request.
   *
   * A profile can send SMS in several markets, but create takes one — the market it
   * starts in. Further markets are added through POST /v3/channels/sms with
   * x-profile-id, and a read returns them all as a list. Create stays singular
   * permanently rather than being a list that accepts one entry: the constraint is
   * in the type, and there is no later widening to break the contract.
   */
  channels?: SenderProfileChannels | null;

  /**
   * Body param: The compliance values a market registers with. `brand` and
   * `campaign` apply to US `TEN_DLC`; other markets fill this map with the document
   * keys their own requirements name.
   */
  compliance?: SMSAPI.MarketCompliance;

  /**
   * Body param
   */
  description?: string | null;

  /**
   * Body param: Display name for the profile. Required.
   */
  name?: string;

  /**
   * Body param: Who is notified about this profile's events: ORGANIZATION,
   * SENDER_PROFILE, or ORGANIZATION_AND_SENDER_PROFILE. Omitting it leaves the
   * profile on the Organization default.
   */
  notifications?: string | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param: Short name, which is also the SMS sender id — required. 3–11
   * characters of letters, numbers and spaces, with at least one letter.
   */
  short_name?: string;

  /**
   * Header param: Unique key to ensure idempotent request processing. Must be 1-255
   * alphanumeric characters, hyphens, or underscores. Responses are cached for 24
   * hours per key per customer.
   */
  'Idempotency-Key'?: string;
}

export interface SenderProfileUpdateParams {
  /**
   * Body param
   */
  description?: string | null;

  /**
   * Body param
   */
  name?: string;

  /**
   * Body param: Who is notified about this profile's events: ORGANIZATION,
   * SENDER_PROFILE, or ORGANIZATION_AND_SENDER_PROFILE. Cannot be cleared — a
   * supplied value must be one of those.
   */
  notifications?: string | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param
   */
  short_name?: string | null;

  /**
   * Header param: Unique key to ensure idempotent request processing. Must be 1-255
   * alphanumeric characters, hyphens, or underscores. Responses are cached for 24
   * hours per key per customer.
   */
  'Idempotency-Key'?: string;
}

export interface SenderProfileListParams extends SenderProfilesPageParams {}

export declare namespace SenderProfiles {
  export {
    type APIResponseOfSenderProfile as APIResponseOfSenderProfile,
    type APIResponseOfSenderProfilesList as APIResponseOfSenderProfilesList,
    type SenderProfile as SenderProfile,
    type SenderProfileBilling as SenderProfileBilling,
    type SenderProfileBillingRequest as SenderProfileBillingRequest,
    type SenderProfileChannels as SenderProfileChannels,
    type SenderProfileRcs as SenderProfileRcs,
    type SenderProfileSMS as SenderProfileSMS,
    type SenderProfileWhatsapp as SenderProfileWhatsapp,
    type SenderProfilesList as SenderProfilesList,
    type SenderProfilesSenderProfilesPage as SenderProfilesSenderProfilesPage,
    type SenderProfileCreateParams as SenderProfileCreateParams,
    type SenderProfileUpdateParams as SenderProfileUpdateParams,
    type SenderProfileListParams as SenderProfileListParams,
  };
}
