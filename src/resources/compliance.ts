// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * What a market demands, before you have it.
 *
 * Requirements vary enormously and change without notice. US `TEN_DLC` registers a brand and a campaign with The Campaign Registry and asks a substantial set of questions; an alphanumeric sender pre-registers with documents in one country and needs nothing in another.
 *
 * This is the authoritative answer for whichever market you ask about, and it is generated from the same declaration that validates the calls themselves — so it cannot drift from what is actually enforced. The response includes the request body to send, with every key that market wants already present and blank.
 *
 * What you supplied, as opposed to what is asked of you, is reported on the market under **Channels**.
 */
export class Compliance extends APIResource {
  /**
   * **Call this first.** It returns what a channel, country and sender type demand
   * before you can send there — and `setup[]`, the calls that satisfy those demands,
   * in order, each with a body you can copy and send as it stands. You never have to
   * track forty countries' rules yourself.
   *
   * ## Channel
   *
   * `channel` is `sms`, `whatsapp` or `rcs`, and **defaults to `sms`** — so a caller
   * that omits it gets exactly what this endpoint has always returned.
   *
   * `sms` is the only one answered today; the other two are `501` until their
   * requirements are declared. They are refused rather than answered with an empty
   * requirement set, because empty would say the channel demands nothing, and both
   * demand plenty — WhatsApp a business verification and a display name review, RCS
   * a carrier approval. Saying "not yet" is the true answer and the same one
   * `POST /v3/sender-profiles` gives for `channels.whatsapp`.
   *
   * `type` is an SMS sender type, and SMS is the only channel whose senders have
   * one.
   *
   * Requirements vary enormously. US `TEN_DLC` registers a brand and a campaign with
   * The Campaign Registry and asks for a substantial set of values. An alphanumeric
   * sender in one country pre-registers with supporting documents; in another it
   * needs nothing at all. This is the authoritative answer for whichever market you
   * are asking about, and it is the same declaration used to validate the calls
   * themselves — so it can never drift from what is actually enforced.
   *
   * ## `setup[]` — what to do
   *
   * **One step.** `POST /v3/channels/sms` adds the market and records everything it
   * registers with — the identity in `compliance.brand`, the programme in
   * `compliance.campaign`. There were three, in a load-bearing order, while the
   * identity and the campaign were resources of their own; they are members of this
   * call's body now, so there is nothing to sequence.
   *
   * Correct any of it afterwards with `PATCH /v3/channels/sms/{country}/{type}`,
   * which takes the same `compliance` object one key at a time.
   *
   * Each step's `body` has every key that market wants already present, with the
   * values left **blank**. Blank rather than filled with placeholders, because the
   * body is meant to be sent: a null value counts as not supplied, so posting a step
   * verbatim comes back naming every blank you left. `attachments[]` lists files to
   * send as multipart on the channel call, each under the field name given — a file
   * cannot be a JSON value, so documents are never listed in `compliance[]`.
   *
   * Every step is a call for whoever holds the key. To set a **sender profile** up
   * instead, send the same requests with the `x-profile-id` header naming it; there
   * is no separate path.
   *
   * ## `requirements[]` — what each value means
   *
   * Each entry names a key for the `compliance` array, its value type, and whether
   * it is required. `required_when` marks values needed only in certain cases —
   * evaluate it against your own payload, e.g. `brand.entity_type == PUBLIC_PROFIT`.
   * `options` lists accepted values where the market constrains them, and `label` is
   * suitable for rendering a form field.
   *
   * Values Sent supplies on your behalf are never listed: correlation ids,
   * environment flags, carrier elections, and booleans derivable from what you
   * already send.
   *
   * ## When nothing is required
   *
   * `required` is `false` and `requirements` is empty, and the single `setup` step
   * carries no `compliance` array at all. A `sender_id_pattern` may still be present
   * — many markets constrain the sender string without registering anything.
   */
  retrieveRequirements(
    params: ComplianceRetrieveRequirementsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseOfComplianceRequirements> {
    const { 'x-profile-id': xProfileID, ...query } = params ?? {};
    return this._client.get('/v3/compliance/requirements', {
      query,
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
export interface APIResponseOfComplianceRequirements {
  /**
   * Everything a market expects of a sender, for one channel, country and sender
   * type.
   */
  data?: ComplianceRequirements | null;

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
 * A file this market wants, and the multipart field to send it as.
 *
 * Separate from compliance because a file is not JSON: the channel call accepts
 * multipart, and each file is named after the key it satisfies. Listing documents
 * among the JSON entries would describe a request nobody could send.
 */
export interface ComplianceAttachmentTemplate {
  /**
   * The multipart field name to attach the file under.
   */
  field_name?: string;

  label?: string | null;

  required?: boolean;
}

/**
 * One value a market expects in a channel call's compliance map.
 */
export interface ComplianceRequirement {
  /**
   * Refinement of type where the market demands a specific shape, e.g. e164, url,
   * email, iso3166_alpha2, csv_keywords.
   */
  format?: string | null;

  /**
   * Shape of each entry, when this requirement is a list of objects rather than of
   * scalars.
   *
   * The compliance value stays null in the setup body like every other blank — a
   * body that carries a half-filled object is one the endpoint refuses, which would
   * break the promise that the published body can be sent as it stands. So the shape
   * is described here instead, and each entry the caller composes has these keys.
   */
  item_fields?: Array<ComplianceRequirement> | null;

  /**
   * Key to use in the compliance map.
   */
  key?: string;

  /**
   * Human label, suitable for a form field.
   */
  label?: string | null;

  /**
   * Most entries this value accepts, where the market caps it.
   */
  max_items?: number | null;

  /**
   * Shortest acceptable value, where the market sets one. TCR refuses a consent
   * narrative under 40 characters, and finding that out at submission time is the
   * round trip this exists to save.
   */
  min_length?: number | null;

  /**
   * Why the market asks for this.
   */
  notes?: string | null;

  /**
   * Accepted values, when the type is an enum or a constrained array.
   */
  options?: Array<string> | null;

  /**
   * Whether the market always demands this value.
   */
  required?: boolean;

  /**
   * Condition that makes this value required, when it is only required in some cases
   * — e.g. brand.entity_type == PUBLIC_PROFIT. Evaluate it against your own payload
   * to know whether to collect the field.
   */
  required_when?: string | null;

  /**
   * Value type: string, number, boolean, date, enum, object, array or document.
   */
  type?: string;
}

/**
 * Everything a market expects of a sender, for one channel, country and sender
 * type.
 */
export interface ComplianceRequirements {
  /**
   * Channel the requirements apply to — sms, whatsapp or rcs.
   *
   * Echoed so the document says which channel it describes. It always described one:
   * setup's last step is a specific channel path, and every type is an SMS sender
   * type — but a caller reading the payload had to infer that from the path to know
   * it.
   */
  channel?: string;

  /**
   * ISO 3166-1 alpha-2 country the requirements apply to.
   */
  country?: string;

  /**
   * Whether this market demands anything before a sender can be registered. When
   * false, the compliance array may be omitted entirely and the profile is ready
   * once provisioned.
   */
  required?: boolean;

  /**
   * Values to supply in compliance. Empty when the market demands nothing. Values
   * Sent supplies on your behalf are never listed, and neither are ones it derives
   * from what you send.
   */
  requirements?: Array<ComplianceRequirement>;

  /**
   * Pattern the sender's own value must match, where the market dictates one —
   * alphanumeric sender ids and short codes. Null when the value is
   * carrier-assigned.
   */
  sender_id_pattern?: string | null;

  /**
   * The calls that set this market up, in the order they have to be made, each
   * carrying a body that can be sent as it stands.
   *
   * This is the answer to "what do I actually do". Requirements describes each value
   * the market wants; this assembles those descriptions into the requests that
   * supply them, so a caller — or an agent acting for one — copies a body out and
   * sends it rather than building one from a table.
   *
   * The last step is always the channel itself, and it is where the regime's own
   * values are supplied. The one before it, where there is one, is the brand a
   * registering market files against — so it is a step of its own and the channel
   * call refuses until it exists. A market that registers with nobody has one step.
   */
  setup?: Array<ComplianceSetupStep>;

  /**
   * Sender type the requirements apply to.
   *
   * Non-nullable while sms is the only channel answered here, because it is the only
   * channel whose senders have a type — the day another one is answered, this
   * becomes nullable along with it. Not nullable in advance: nothing can emit null
   * today, and publishing a shape the API never sends is the same mistake as
   * publishing a field it does not have.
   */
  type?: string;
}

/**
 * One call to make, with a body that can be sent as it stands.
 *
 * The steps are ordered and the order is load-bearing: a channel that registers
 * with a regime is filed against a brand, so the brand call comes first and the
 * channel call refuses until it has been made. Doing them in order is the whole of
 * setting a market up.
 */
export interface ComplianceSetupStep {
  /**
   * Files to attach as multipart, when this call takes any. Absent when it does not.
   */
  attachments?: Array<ComplianceAttachmentTemplate> | null;

  /**
   * The request body, with every key this market wants already present and the
   * values left blank. Send it as it stands and the response names each blank that
   * still has to be filled.
   */
  body?: unknown;

  method?: string;

  /**
   * Path to call. Add the x-profile-id header with an organization key to make the
   * same call for one of your sender profiles — there is no separate path for that.
   */
  path?: string;

  /**
   * What this call sets up: brand or channel.
   */
  resource?: string;

  /**
   * Position in the sequence, from 1. Steps must be performed in this order.
   */
  step?: number;

  /**
   * Why this market needs this call, in one sentence.
   */
  why?: string;
}

export interface ComplianceRetrieveRequirementsParams {
  /**
   * Query param: Channel the sender is for: sms, whatsapp or rcs. Defaults to sms,
   * which is the only one answered today — the other two are 501 until their
   * requirements are declared.
   */
  channel?: string | null;

  /**
   * Query param: ISO 3166-1 alpha-2 country code, e.g. US, XK, IN
   */
  country?: string | null;

  /**
   * Query param: Sender type: LOCAL, MOBILE, TEN_DLC, TOLL_FREE, SHORT_CODE,
   * ALPHANUMERIC. 10DLC is accepted as a synonym of TEN_DLC, the same as on POST
   * /v3/sender-profiles. Applies to channel=sms, the only channel whose senders have
   * a type.
   */
  type?: string | null;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export declare namespace Compliance {
  export {
    type APIResponseOfComplianceRequirements as APIResponseOfComplianceRequirements,
    type ComplianceAttachmentTemplate as ComplianceAttachmentTemplate,
    type ComplianceRequirement as ComplianceRequirement,
    type ComplianceRequirements as ComplianceRequirements,
    type ComplianceSetupStep as ComplianceSetupStep,
    type ComplianceRetrieveRequirementsParams as ComplianceRetrieveRequirementsParams,
  };
}
