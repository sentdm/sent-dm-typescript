// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from '../webhooks';
import * as RcsAPI from './rcs';
import { APIResponseOfRcsAgent, RcCreateParams, Rcs, RcsAddress, RcsAgent } from './rcs';
import * as VoiceAPI from './voice';
import {
  APIResponseOfListOfVoiceNumber,
  APIResponseOfVoiceCallbackTest,
  APIResponseOfVoiceNumber,
  APIResponseOfVoiceNumberCreated,
  APIResponseOfVoiceSecret,
  Voice,
  VoiceCallbackTest,
  VoiceCallbackTestErrorInfo,
  VoiceCallbackTestRequestInfo,
  VoiceCallbackTestResponseInfo,
  VoiceCreateParams,
  VoiceListParams,
  VoiceNumber,
  VoiceNumberCreated,
  VoiceRetrieveParams,
  VoiceRotateSecretParams,
  VoiceSecret,
  VoiceTestParams,
  VoiceUpdateParams,
} from './voice';
import * as WhatsappAPI from './whatsapp';
import { APIResponseOfWhatsappChannel, Whatsapp, WhatsappChannel, WhatsappCreateParams } from './whatsapp';
import * as SMSAPI from './sms/sms';
import {
  MarketCompliance,
  SMS as SmsapiSMS,
  SMSCreateParams,
  SMSCreateResponse,
  SMSNumber,
  SMSNumberRequest,
  SuppliedCampaign,
  SuppliedCompliance,
  SuppliedDocument,
} from './sms/sms';
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
export class Channels extends APIResource {
  sms: SMSAPI.SMS = new SMSAPI.SMS(this._client);
  rcs: RcsAPI.Rcs = new RcsAPI.Rcs(this._client);
  whatsapp: WhatsappAPI.Whatsapp = new WhatsappAPI.Whatsapp(this._client);
  voice: VoiceAPI.Voice = new VoiceAPI.Voice(this._client);

  /**
   * Every market you send SMS in, your WhatsApp account, your RCS agent and the
   * numbers you carry phone calls on — with each one's status, and what each market
   * has supplied.
   *
   * **Status lives on the channel, never on you or your brand.** An identity has no
   * lifecycle; what has one is the registration of a sender in a market and the
   * approval of a channel. So a customer live in one country and mid-registration in
   * another reports exactly that, rather than one flattened answer.
   *
   * `sms[n].compliance` carries what each market holds: `brand` and `campaign` for
   * markets that register with a compliance regime such as US TEN_DLC, and
   * `documents` for markets that pre-register an alphanumeric or similar sender.
   * Absent means the market registers with nobody and nothing has been supplied.
   * `GET /v3/compliance/requirements` says what a market demands of any new
   * customer; this says what you gave it.
   *
   * Send `x-profile-id` with an organization key to read one of your profiles'
   * channels.
   *
   * @example
   * ```ts
   * const apiResponseOfChannelsState =
   *   await client.channels.list();
   * ```
   */
  list(
    params: ChannelListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseOfChannelsState> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get('/v3/channels', {
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
export interface APIResponseOfChannelsState {
  /**
   * The channels a profile sends on. SMS is a list because a profile can send in
   * several markets; WhatsApp and RCS are single, because a profile has one business
   * account and one agent.
   */
  data?: ChannelsState | null;

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
 * The channels a profile sends on. SMS is a list because a profile can send in
 * several markets; WhatsApp and RCS are single, because a profile has one business
 * account and one agent.
 */
export interface ChannelsState {
  /**
   * Which customer these channels belong to — the key's own, or the profile named in
   * x-profile-id.
   *
   * Same reason the brand carries one: as the response to /v3/channels there is no
   * other id in the document, and under x-profile-id this is the profile the call
   * resolved to rather than the caller. Absent when nested inside a sender profile,
   * whose own id already says whose they are.
   */
  customer_id?: string | null;

  /**
   * The markets this profile can send MMS in, one entry per country, or empty when
   * none.
   *
   * Appears alongside sms rather than replacing an entry in it: the two are separate
   * senders on the same number and a caller needs to see both — a market can be live
   * for SMS while its MMS row is still provisioning, or MMS-incapable entirely
   * because the market's sender-type SKU does not carry it.
   */
  mms?: Array<MmsMarket>;

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
  rcs?: RcsAPI.RcsAgent | null;

  sms?: Array<ChannelsState.SMS>;

  /**
   * The numbers this profile carries phone calls on, one entry per number, or empty
   * when none. Voice is per number like an SMS market is per country: each number is
   * its own channel row, turned on and off on its own, and one of them is the line
   * app-originated calls fall back to.
   */
  voice?: Array<VoiceAPI.VoiceNumber>;

  /**
   * The profile's WhatsApp account. Its status is Meta's verification state.
   */
  whatsapp?: WhatsappAPI.WhatsappChannel | null;
}

export namespace ChannelsState {
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
  export interface SMS {
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
}

/**
 * One market the profile can send MMS in.
 *
 * Deliberately not ChannelMarketState: an MMS market carries no compliance of its
 * own. It is the same number, carrier and registration as the SMS market on it in
 * that country — MMS files nothing separately — so a compliance block here would
 * always be null and would invite the question of what an MMS market owes. It owes
 * what the SMS market owes, reported there.
 */
export interface MmsMarket {
  /**
   * ISO-3166 alpha-2 of the market.
   */
  country?: string | null;

  /**
   * The sender type the market sends from, mirroring the SMS sender.
   */
  number_type?: string | null;

  /**
   * The sending number. Null while the market is still being provisioned.
   */
  sender_value?: string | null;

  /**
   * Where this market's MMS sender stands. Read-only.
   */
  status?: string | null;
}

export interface ChannelListParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

Channels.SMS = SmsapiSMS;
Channels.Rcs = Rcs;
Channels.Whatsapp = Whatsapp;
Channels.Voice = Voice;

export declare namespace Channels {
  export {
    type APIResponseOfChannelsState as APIResponseOfChannelsState,
    type ChannelsState as ChannelsState,
    type MmsMarket as MmsMarket,
    type ChannelListParams as ChannelListParams,
  };

  export {
    SmsapiSMS as SMS,
    type MarketCompliance as MarketCompliance,
    type SMSNumber as SMSNumber,
    type SMSNumberRequest as SMSNumberRequest,
    type SuppliedCampaign as SuppliedCampaign,
    type SuppliedCompliance as SuppliedCompliance,
    type SuppliedDocument as SuppliedDocument,
    type SMSCreateResponse as SMSCreateResponse,
    type SMSCreateParams as SMSCreateParams,
  };

  export {
    Rcs as Rcs,
    type APIResponseOfRcsAgent as APIResponseOfRcsAgent,
    type RcsAddress as RcsAddress,
    type RcsAgent as RcsAgent,
    type RcCreateParams as RcCreateParams,
  };

  export {
    Whatsapp as Whatsapp,
    type APIResponseOfWhatsappChannel as APIResponseOfWhatsappChannel,
    type WhatsappChannel as WhatsappChannel,
    type WhatsappCreateParams as WhatsappCreateParams,
  };

  export {
    Voice as Voice,
    type APIResponseOfListOfVoiceNumber as APIResponseOfListOfVoiceNumber,
    type APIResponseOfVoiceCallbackTest as APIResponseOfVoiceCallbackTest,
    type APIResponseOfVoiceNumber as APIResponseOfVoiceNumber,
    type APIResponseOfVoiceNumberCreated as APIResponseOfVoiceNumberCreated,
    type APIResponseOfVoiceSecret as APIResponseOfVoiceSecret,
    type VoiceCallbackTest as VoiceCallbackTest,
    type VoiceCallbackTestErrorInfo as VoiceCallbackTestErrorInfo,
    type VoiceCallbackTestRequestInfo as VoiceCallbackTestRequestInfo,
    type VoiceCallbackTestResponseInfo as VoiceCallbackTestResponseInfo,
    type VoiceNumber as VoiceNumber,
    type VoiceNumberCreated as VoiceNumberCreated,
    type VoiceSecret as VoiceSecret,
    type VoiceCreateParams as VoiceCreateParams,
    type VoiceRetrieveParams as VoiceRetrieveParams,
    type VoiceUpdateParams as VoiceUpdateParams,
    type VoiceListParams as VoiceListParams,
    type VoiceRotateSecretParams as VoiceRotateSecretParams,
    type VoiceTestParams as VoiceTestParams,
  };
}
