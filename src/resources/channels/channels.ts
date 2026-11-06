// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from '../webhooks';
import * as RcsAPI from './rcs';
import { APIResponseOfRcsAgent, RcCreateParams, Rcs, RcsAddress, RcsAgent } from './rcs';
import * as SMSAPI from './sms';
import {
  APIResponseOfListOfSMSMarket,
  APIResponseOfSMSMarket,
  MarketCompliance,
  SMS,
  SMSCreateParams,
  SMSListParams,
  SMSMarket,
  SMSNumber,
  SMSNumberRequest,
  SMSRetrieveParams,
  SMSUpdateParams,
} from './sms';
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

  sms?: Array<SMSAPI.SMSMarket>;

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

/**
 * One market the profile can send MMS in.
 *
 * Deliberately not SmsMarketState: an MMS market carries no compliance of its own.
 * It is the same number, carrier and registration as the SMS market on it in that
 * country — MMS files nothing separately — so a compliance block here would always
 * be null and would invite the question of what an MMS market owes. It owes what
 * the SMS market owes, reported there.
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

Channels.SMS = SMS;
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
    SMS as SMS,
    type APIResponseOfListOfSMSMarket as APIResponseOfListOfSMSMarket,
    type APIResponseOfSMSMarket as APIResponseOfSMSMarket,
    type MarketCompliance as MarketCompliance,
    type SMSMarket as SMSMarket,
    type SMSNumber as SMSNumber,
    type SMSNumberRequest as SMSNumberRequest,
    type SMSCreateParams as SMSCreateParams,
    type SMSRetrieveParams as SMSRetrieveParams,
    type SMSUpdateParams as SMSUpdateParams,
    type SMSListParams as SMSListParams,
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
