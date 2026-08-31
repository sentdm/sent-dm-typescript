// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ProfilesAPI from './profiles';
import * as CampaignsAPI from './campaigns';
import {
  CampaignCreateParams,
  CampaignCreateResponse,
  CampaignDeleteParams,
  CampaignListParams,
  CampaignListResponse,
  CampaignUpdateParams,
  CampaignUpdateResponse,
  Campaigns,
  MessagingUseCaseUs,
} from './campaigns';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * **Deprecated — use Sender Profiles.**
 *
 * The original profile resource, kept because it has live callers. It still works, and its replacement is `/v3/sender-profiles`, which takes the identity and the campaign in one call instead of across three.
 *
 * New integrations should not start here.
 */
export class Profiles extends APIResource {
  campaigns: CampaignsAPI.Campaigns = new CampaignsAPI.Campaigns(this._client);

  /**
   * **Deprecated.** This endpoint is replaced by `/v3/sender-profiles` and will be
   * removed in a future release. It still behaves exactly as before, so nothing
   * needs to change today — but new integrations should use `/v3/sender-profiles`,
   * which models a profile's markets, compliance, brand, campaigns and billing
   * explicitly.
   *
   * Creates a new sender profile within an organization. Profiles represent
   * different brands, departments, or use cases, each with their own messaging
   * configuration and settings. Requires admin role in the organization.
   *
   * ## WhatsApp Business Account
   *
   * Every profile owns its own WhatsApp Business Account — accounts are never shared
   * between profiles or inherited from the organization. Provide a
   * `whatsapp_business_account` object with `waba_id`, `phone_number_id`, and
   * `access_token`. Obtain these from Meta Business Manager by creating a System
   * User with `whatsapp_business_messaging` and `whatsapp_business_management`
   * permissions.
   *
   * Omit the field and the profile is created without WhatsApp, staying incomplete
   * until it has an account of its own.
   *
   * ## Brand
   *
   * Include the optional `brand` field to create the brand for this profile at the
   * same time. Cannot be used when `inherit_tcr_brand` is `true`.
   *
   * ## Payment Details
   *
   * When `billing_model` is `"profile"` or `"profile_and_organization"` you may
   * include a `payment_details` object containing the card number, expiry (MM/YY),
   * CVC, and billing ZIP code. Payment details are **never stored** on our servers
   * and are forwarded directly to the payment processor. Providing `payment_details`
   * when `billing_model` is `"organization"` is not allowed.
   *
   * @deprecated
   */
  create(params: ProfileCreateParams, options?: RequestOptions): APIPromise<ProfileCreateResponse> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post('/v3/profiles', {
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
   * **Deprecated.** This endpoint is replaced by `/v3/sender-profiles` and will be
   * removed in a future release. It still behaves exactly as before, so nothing
   * needs to change today — but new integrations should use `/v3/sender-profiles`,
   * which models a profile's markets, compliance, brand, campaigns and billing
   * explicitly.
   *
   * Retrieves detailed information about a specific sender profile within an
   * organization, including brand and KYC information if a brand has been
   * configured.
   *
   * @deprecated
   */
  retrieve(
    profileID: string,
    params: ProfileRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProfileRetrieveResponse> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/profiles/${profileID}`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * **Deprecated.** This endpoint is replaced by `/v3/sender-profiles` and will be
   * removed in a future release. It still behaves exactly as before, so nothing
   * needs to change today — but new integrations should use `/v3/sender-profiles`,
   * which models a profile's markets, compliance, brand, campaigns and billing
   * explicitly.
   *
   * Updates a profile's configuration and settings. Requires admin role in the
   * organization. Only provided fields will be updated (partial update).
   *
   * ## Brand Management
   *
   * Include the optional `brand` field to create or update the brand associated with
   * this profile. The brand holds KYC and TCR compliance data (legal business info,
   * contact details, messaging vertical). Once a brand has been submitted to TCR it
   * cannot be modified. Setting `inherit_tcr_brand: true` and providing `brand` in
   * the same request is not allowed.
   *
   * ## Payment Details
   *
   * When `billing_model` is `"profile"` or `"profile_and_organization"` you may
   * include a `payment_details` object containing the card number, expiry (MM/YY),
   * CVC, and billing ZIP code. Payment details are **never stored** on our servers
   * and are forwarded directly to the payment processor. Providing `payment_details`
   * when `billing_model` is `"organization"` is not allowed.
   *
   * ## Deprecated fields
   *
   * `sending_phone_number_profile_id` and `sending_whatsapp_number_profile_id` are
   * **accepted and ignored**. Sender borrowing is gone: a profile cannot send from
   * another profile's number, because two profiles behind one sender makes an
   * inbound reply and a delivery receipt ambiguous about whose they are.
   *
   * Sending either **changes nothing and still returns `200`** — they are kept on
   * the contract so an existing integration keeps working. Reads carry both keys too
   * and always answer `null`, which is how you can confirm the value did not take.
   *
   * Give the profile a sender of its own instead — `POST /v3/channels/sms` or
   * `POST /v3/channels/whatsapp`, sent with the `x-profile-id` header naming it.
   *
   * @deprecated
   */
  update(
    profileID: string,
    params: ProfileUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ProfileUpdateResponse> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.patch(path`/v3/profiles/${profileID}`, {
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
   * **Deprecated.** This endpoint is replaced by `/v3/sender-profiles` and will be
   * removed in a future release. It still behaves exactly as before, so nothing
   * needs to change today — but new integrations should use `/v3/sender-profiles`,
   * which models a profile's markets, compliance, brand, campaigns and billing
   * explicitly.
   *
   * Retrieves all sender profiles within an organization, including brand
   * information for each profile. Profiles represent different brands, departments,
   * or use cases within an organization, each with their own messaging
   * configuration.
   *
   * @deprecated
   */
  list(
    params: ProfileListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProfileListResponse> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get('/v3/profiles', {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * **Deprecated.** This endpoint is replaced by `/v3/sender-profiles` and will be
   * removed in a future release. It still behaves exactly as before, so nothing
   * needs to change today — but new integrations should use `/v3/sender-profiles`,
   * which models a profile's markets, compliance, brand, campaigns and billing
   * explicitly.
   *
   * Soft deletes a sender profile. The profile will be marked as deleted but data is
   * retained. Anything it still held is released first: phone numbers return to our
   * inventory and can go to whoever asks next, its own WhatsApp account is
   * deregistered, and its routing rules stop being used. Requires admin role in the
   * organization.
   *
   * @deprecated
   */
  delete(profileID: string, params: ProfileDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { 'x-profile-id': xProfileID, ...body } = params;
    return this._client.delete(path`/v3/profiles/${profileID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * **Deprecated.** This endpoint is replaced by `/v3/sender-profiles` and will be
   * removed in a future release. It still behaves exactly as before, so nothing
   * needs to change today — but new integrations should use `/v3/sender-profiles`,
   * which models a profile's markets, compliance, brand, campaigns and billing
   * explicitly.
   *
   * Final step in the profile compliance workflow. Validates all prerequisites (KYC,
   * brand, campaigns, required documents), connects the profile to the SMS and
   * WhatsApp channels, and marks it onboarded. Prerequisites are always validated
   * first: if any fail the call returns 400 naming every unmet one, and nothing is
   * started. If they pass and the profile is already onboarded, the call returns 200
   * and does nothing. Otherwise it returns 202 and calls the provided webhook URL
   * when background processing finishes.
   *
   * Callable with the organization's API key or the profile's own key. The key's
   * user must be an admin or owner of the profile, or of the organization it belongs
   * to.
   *
   * Prerequisites (all but the last are checked before the already-onboarded
   * short-circuit, matching the previous contract; the last is checked after it, so
   * a profile that is already onboarded is never rejected by it):
   *
   * - Profile must have a name, short name, and description (short name max 50
   *   characters, description max 5000)
   * - webHookUrl must be supplied on the request
   * - A KYC form submission is required
   * - A brand is required, either on the profile or inherited from the parent
   *   organization
   * - TCR applications must have at least one campaign, own or inherited
   * - Destination countries marked as main must have their required compliance
   *   documents uploaded
   * - TCR applications must state whether they inherit the organization's TCR brand
   *   and campaign
   *
   * Outcome:
   *
   * - Once the prerequisites pass and background processing succeeds, the profile's
   *   conversionFlowStatus becomes ONBOARDED and its public status reads `approved`
   * - A profile with no WhatsApp channel, or one still awaiting TCR registration or
   *   country documents, is onboarded like any other. Those are answered by the
   *   brand and campaign records, not by a status on the profile
   * - If background processing fails, the profile keeps the status it already had
   *   and the webhook reports the reason
   *
   * @deprecated
   */
  complete(
    profileID: string,
    params: ProfileCompleteParams,
    options?: RequestOptions,
  ): APIPromise<ProfileCompleteResponse> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post(path`/v3/profiles/${profileID}/complete`, {
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

export interface DestinationCountry {
  id?: string;

  isMain?: boolean;
}

export type TcrBrandRelationship =
  | 'BASIC_ACCOUNT'
  | 'MEDIUM_ACCOUNT'
  | 'LARGE_ACCOUNT'
  | 'SMALL_ACCOUNT'
  | 'KEY_ACCOUNT';

export type TcrVertical =
  | 'PROFESSIONAL'
  | 'REAL_ESTATE'
  | 'HEALTHCARE'
  | 'HUMAN_RESOURCES'
  | 'ENERGY'
  | 'ENTERTAINMENT'
  | 'RETAIL'
  | 'TRANSPORTATION'
  | 'AGRICULTURE'
  | 'INSURANCE'
  | 'POSTAL'
  | 'EDUCATION'
  | 'HOSPITALITY'
  | 'FINANCIAL'
  | 'POLITICAL'
  | 'GAMBLING'
  | 'LEGAL'
  | 'CONSTRUCTION'
  | 'NGO'
  | 'MANUFACTURING'
  | 'GOVERNMENT'
  | 'TECHNOLOGY'
  | 'COMMUNICATION';

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface ProfileCreateResponse {
  /**
   * Detailed profile response for v3 API
   */
  data?: ProfileCreateResponse.Data | null;

  /**
   * Error information
   */
  error?: ProfileCreateResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: ProfileCreateResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace ProfileCreateResponse {
  /**
   * Detailed profile response for v3 API
   */
  export interface Data {
    /**
     * Profile unique identifier
     */
    id?: string;

    /**
     * @deprecated Always false. A profile no longer shares contacts with sibling
     * profiles — it sees only what it owns. Retained so existing v3 clients reading
     * allow_contact_sharing keep deserializing; it carries no information.
     */
    allow_contact_sharing?: boolean | null;

    /**
     * Whether number changes are allowed during onboarding
     */
    allow_number_change_during_onboarding?: boolean | null;

    /**
     * @deprecated Always false. A profile no longer shares templates with sibling
     * profiles. Retained so existing v3 clients reading allow_template_sharing keep
     * deserializing; it carries no information.
     */
    allow_template_sharing?: boolean | null;

    /**
     * Billing contact info returned in profile responses
     */
    billing_contact?: Data.BillingContact | null;

    /**
     * Billing model: profile, organization, or profile_and_organization
     */
    billing_model?: string;

    /**
     * Brand response with nested contact, business, and compliance sections — mirrors
     * the request structure.
     */
    brand?: Data.Brand | null;

    /**
     * When the profile was created
     */
    created_at?: string;

    /**
     * Profile description
     */
    description?: string | null;

    /**
     * Profile email (inherited from organization)
     */
    email?: string | null;

    /**
     * Profile icon URL
     */
    icon?: string | null;

    /**
     * @deprecated Always false. A profile no longer inherits its organization's
     * contacts. Retained so existing v3 clients reading inherit_contacts keep
     * deserializing; it carries no information.
     */
    inherit_contacts?: boolean | null;

    /**
     * Whether this profile inherits TCR brand from the organization
     */
    inherit_tcr_brand?: boolean;

    /**
     * Whether this profile inherits TCR campaign from the organization
     */
    inherit_tcr_campaign?: boolean;

    /**
     * @deprecated Always false. A profile no longer inherits its organization's
     * templates. Retained so existing v3 clients reading inherit_templates keep
     * deserializing; it carries no information.
     */
    inherit_templates?: boolean | null;

    /**
     * Profile name
     */
    name?: string;

    /**
     * Parent organization ID
     */
    organization_id?: string | null;

    /**
     * Direct SMS phone number
     */
    sending_phone_number?: string | null;

    /**
     * @deprecated Deprecated. Always null. Sender borrowing is gone: a profile no
     * longer points at another profile for its SMS sender, and every profile owns the
     * sender it sends from.
     *
     * Kept on the wire, and never populated, because those are two different promises.
     * Removing the key changes the response's shape — a generated client loses the
     * property and stops compiling on the next regenerate, for a value that is now
     * null for every profile in existence. Keeping it null costs a key and breaks
     * nobody, and null is the honest answer rather than a placeholder: there is no
     * borrowing left to report.
     *
     * Nothing could populate it. Migration 260813161500 dropped the column and copied
     * each borrower its own channel-provider row; its Down() says outright that the
     * borrower-to-lender pairing is not recoverable. The only surviving trace is a
     * notes string on the copied row.
     */
    sending_phone_number_profile_id?: string | null;

    /**
     * @deprecated
     */
    sending_whatsapp_number_profile_id?: string | null;

    /**
     * Profile short name/abbreviation. 3–11 characters: letters, numbers, and spaces
     * only, with at least one letter.
     */
    short_name?: string | null;

    /**
     * Profile setup status: incomplete, pending_review, approved, rejected
     */
    status?: string;

    /**
     * When the profile was last updated
     */
    updated_at?: string | null;

    /**
     * WhatsApp Business Account ID associated with this profile. Present whether the
     * WABA is inherited from the organization or configured directly.
     */
    waba_id?: string | null;

    /**
     * Direct WhatsApp phone number
     */
    whatsapp_phone_number?: string | null;
  }

  export namespace Data {
    /**
     * Billing contact info returned in profile responses
     */
    export interface BillingContact {
      address?: string | null;

      email?: string | null;

      name?: string | null;

      phone?: string | null;
    }

    /**
     * Brand response with nested contact, business, and compliance sections — mirrors
     * the request structure.
     */
    export interface Brand {
      /**
       * Unique identifier for the brand
       */
      id?: string;

      /**
       * Business details and address information
       */
      business?: Brand.Business | null;

      /**
       * Compliance and TCR-related information
       */
      compliance?: Brand.Compliance | null;

      /**
       * Contact information for the brand
       */
      contact?: Brand.Contact | null;

      /**
       * When the brand was created
       */
      created_at?: string;

      /**
       * @deprecated Deprecated and scheduled for removal. Identifies the Campaign
       * Service Provider that registered the brand, which is Sent, so the value is the
       * same for every brand and every account. Nothing on your side can act on it and
       * there is no replacement. Stop reading it.
       */
      csp_id?: string | null;

      identity_status?: 'SELF_DECLARED' | 'UNVERIFIED' | 'VERIFIED' | 'VETTED_VERIFIED' | null;

      /**
       * Whether this brand is inherited from the parent organization
       */
      is_inherited?: boolean;

      status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | null;

      /**
       * When the brand was submitted to TCR
       */
      submitted_at?: string | null;

      /**
       * Whether this brand has been submitted to TCR
       */
      submitted_to_tcr?: boolean;

      /**
       * TCR brand ID (populated after TCR submission)
       */
      tcr_brand_id?: string | null;

      /**
       * Universal EIN from TCR
       */
      universal_ein?: string | null;

      /**
       * When the brand was last updated
       */
      updated_at?: string | null;
    }

    export namespace Brand {
      /**
       * Business details and address information
       */
      export interface Business {
        /**
         * City
         */
        city?: string | null;

        /**
         * Country code (e.g., US, CA)
         */
        country?: string | null;

        /**
         * Country where the business is registered
         */
        country_of_registration?: string | null;

        /**
         * Business entity type
         */
        entity_type?: string | null;

        /**
         * Legal business name
         */
        legal_name?: string | null;

        /**
         * Postal/ZIP code
         */
        postal_code?: string | null;

        /**
         * State/province code
         */
        state?: string | null;

        /**
         * Street address
         */
        street?: string | null;

        /**
         * Tax ID/EIN number
         */
        tax_id?: string | null;

        /**
         * Type of tax ID (e.g., us_ein, ca_bn)
         */
        tax_id_type?: string | null;

        /**
         * Business website URL
         */
        url?: string | null;
      }

      /**
       * Compliance and TCR-related information
       */
      export interface Compliance {
        brand_relationship?: ProfilesAPI.TcrBrandRelationship | null;

        /**
         * List of destination countries for messaging
         */
        destination_countries?: Array<ProfilesAPI.DestinationCountry>;

        /**
         * Whether this is a TCR (Campaign Registry) application
         */
        is_tcr_application?: boolean;

        /**
         * Additional notes about the business or use case
         */
        notes?: string | null;

        /**
         * Phone number prefix for messaging (e.g., "+1")
         */
        phone_number_prefix?: string | null;

        /**
         * @deprecated Always null. The brand's free-text primary use case is no longer
         * stored: it reached neither TCR nor any decision, and its column is dropped with
         * no backfill, because the values were prose and the typed equivalent is the
         * campaign's MessagingUseCaseUS.
         *
         * Retained so existing v3 clients reading primary_use_case keep deserializing.
         * Unlike the profile sharing flags, which can answer false truthfully, there is no
         * value to report here — the field is present and empty rather than present and
         * wrong.
         */
        primary_use_case?: string | null;

        vertical?: ProfilesAPI.TcrVertical | null;
      }

      /**
       * Contact information for the brand
       */
      export interface Contact {
        /**
         * Business/brand name
         */
        business_name?: string | null;

        /**
         * Contact email address
         */
        email?: string | null;

        /**
         * Primary contact name
         */
        name?: string;

        /**
         * Contact phone number in E.164 format
         */
        phone?: string | null;

        /**
         * Contact phone country code (e.g., "1" for US)
         */
        phone_country_code?: string | null;

        /**
         * Contact's role in the business
         */
        role?: string | null;
      }
    }
  }

  /**
   * Error information
   */
  export interface Error {
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
   * Request and response metadata
   */
  export interface Meta {
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
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface ProfileRetrieveResponse {
  /**
   * Detailed profile response for v3 API
   */
  data?: ProfileRetrieveResponse.Data | null;

  /**
   * Error information
   */
  error?: ProfileRetrieveResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: ProfileRetrieveResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace ProfileRetrieveResponse {
  /**
   * Detailed profile response for v3 API
   */
  export interface Data {
    /**
     * Profile unique identifier
     */
    id?: string;

    /**
     * @deprecated Always false. A profile no longer shares contacts with sibling
     * profiles — it sees only what it owns. Retained so existing v3 clients reading
     * allow_contact_sharing keep deserializing; it carries no information.
     */
    allow_contact_sharing?: boolean | null;

    /**
     * Whether number changes are allowed during onboarding
     */
    allow_number_change_during_onboarding?: boolean | null;

    /**
     * @deprecated Always false. A profile no longer shares templates with sibling
     * profiles. Retained so existing v3 clients reading allow_template_sharing keep
     * deserializing; it carries no information.
     */
    allow_template_sharing?: boolean | null;

    /**
     * Billing contact info returned in profile responses
     */
    billing_contact?: Data.BillingContact | null;

    /**
     * Billing model: profile, organization, or profile_and_organization
     */
    billing_model?: string;

    /**
     * Brand response with nested contact, business, and compliance sections — mirrors
     * the request structure.
     */
    brand?: Data.Brand | null;

    /**
     * When the profile was created
     */
    created_at?: string;

    /**
     * Profile description
     */
    description?: string | null;

    /**
     * Profile email (inherited from organization)
     */
    email?: string | null;

    /**
     * Profile icon URL
     */
    icon?: string | null;

    /**
     * @deprecated Always false. A profile no longer inherits its organization's
     * contacts. Retained so existing v3 clients reading inherit_contacts keep
     * deserializing; it carries no information.
     */
    inherit_contacts?: boolean | null;

    /**
     * Whether this profile inherits TCR brand from the organization
     */
    inherit_tcr_brand?: boolean;

    /**
     * Whether this profile inherits TCR campaign from the organization
     */
    inherit_tcr_campaign?: boolean;

    /**
     * @deprecated Always false. A profile no longer inherits its organization's
     * templates. Retained so existing v3 clients reading inherit_templates keep
     * deserializing; it carries no information.
     */
    inherit_templates?: boolean | null;

    /**
     * Profile name
     */
    name?: string;

    /**
     * Parent organization ID
     */
    organization_id?: string | null;

    /**
     * Direct SMS phone number
     */
    sending_phone_number?: string | null;

    /**
     * @deprecated Deprecated. Always null. Sender borrowing is gone: a profile no
     * longer points at another profile for its SMS sender, and every profile owns the
     * sender it sends from.
     *
     * Kept on the wire, and never populated, because those are two different promises.
     * Removing the key changes the response's shape — a generated client loses the
     * property and stops compiling on the next regenerate, for a value that is now
     * null for every profile in existence. Keeping it null costs a key and breaks
     * nobody, and null is the honest answer rather than a placeholder: there is no
     * borrowing left to report.
     *
     * Nothing could populate it. Migration 260813161500 dropped the column and copied
     * each borrower its own channel-provider row; its Down() says outright that the
     * borrower-to-lender pairing is not recoverable. The only surviving trace is a
     * notes string on the copied row.
     */
    sending_phone_number_profile_id?: string | null;

    /**
     * @deprecated
     */
    sending_whatsapp_number_profile_id?: string | null;

    /**
     * Profile short name/abbreviation. 3–11 characters: letters, numbers, and spaces
     * only, with at least one letter.
     */
    short_name?: string | null;

    /**
     * Profile setup status: incomplete, pending_review, approved, rejected
     */
    status?: string;

    /**
     * When the profile was last updated
     */
    updated_at?: string | null;

    /**
     * WhatsApp Business Account ID associated with this profile. Present whether the
     * WABA is inherited from the organization or configured directly.
     */
    waba_id?: string | null;

    /**
     * Direct WhatsApp phone number
     */
    whatsapp_phone_number?: string | null;
  }

  export namespace Data {
    /**
     * Billing contact info returned in profile responses
     */
    export interface BillingContact {
      address?: string | null;

      email?: string | null;

      name?: string | null;

      phone?: string | null;
    }

    /**
     * Brand response with nested contact, business, and compliance sections — mirrors
     * the request structure.
     */
    export interface Brand {
      /**
       * Unique identifier for the brand
       */
      id?: string;

      /**
       * Business details and address information
       */
      business?: Brand.Business | null;

      /**
       * Compliance and TCR-related information
       */
      compliance?: Brand.Compliance | null;

      /**
       * Contact information for the brand
       */
      contact?: Brand.Contact | null;

      /**
       * When the brand was created
       */
      created_at?: string;

      /**
       * @deprecated Deprecated and scheduled for removal. Identifies the Campaign
       * Service Provider that registered the brand, which is Sent, so the value is the
       * same for every brand and every account. Nothing on your side can act on it and
       * there is no replacement. Stop reading it.
       */
      csp_id?: string | null;

      identity_status?: 'SELF_DECLARED' | 'UNVERIFIED' | 'VERIFIED' | 'VETTED_VERIFIED' | null;

      /**
       * Whether this brand is inherited from the parent organization
       */
      is_inherited?: boolean;

      status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | null;

      /**
       * When the brand was submitted to TCR
       */
      submitted_at?: string | null;

      /**
       * Whether this brand has been submitted to TCR
       */
      submitted_to_tcr?: boolean;

      /**
       * TCR brand ID (populated after TCR submission)
       */
      tcr_brand_id?: string | null;

      /**
       * Universal EIN from TCR
       */
      universal_ein?: string | null;

      /**
       * When the brand was last updated
       */
      updated_at?: string | null;
    }

    export namespace Brand {
      /**
       * Business details and address information
       */
      export interface Business {
        /**
         * City
         */
        city?: string | null;

        /**
         * Country code (e.g., US, CA)
         */
        country?: string | null;

        /**
         * Country where the business is registered
         */
        country_of_registration?: string | null;

        /**
         * Business entity type
         */
        entity_type?: string | null;

        /**
         * Legal business name
         */
        legal_name?: string | null;

        /**
         * Postal/ZIP code
         */
        postal_code?: string | null;

        /**
         * State/province code
         */
        state?: string | null;

        /**
         * Street address
         */
        street?: string | null;

        /**
         * Tax ID/EIN number
         */
        tax_id?: string | null;

        /**
         * Type of tax ID (e.g., us_ein, ca_bn)
         */
        tax_id_type?: string | null;

        /**
         * Business website URL
         */
        url?: string | null;
      }

      /**
       * Compliance and TCR-related information
       */
      export interface Compliance {
        brand_relationship?: ProfilesAPI.TcrBrandRelationship | null;

        /**
         * List of destination countries for messaging
         */
        destination_countries?: Array<ProfilesAPI.DestinationCountry>;

        /**
         * Whether this is a TCR (Campaign Registry) application
         */
        is_tcr_application?: boolean;

        /**
         * Additional notes about the business or use case
         */
        notes?: string | null;

        /**
         * Phone number prefix for messaging (e.g., "+1")
         */
        phone_number_prefix?: string | null;

        /**
         * @deprecated Always null. The brand's free-text primary use case is no longer
         * stored: it reached neither TCR nor any decision, and its column is dropped with
         * no backfill, because the values were prose and the typed equivalent is the
         * campaign's MessagingUseCaseUS.
         *
         * Retained so existing v3 clients reading primary_use_case keep deserializing.
         * Unlike the profile sharing flags, which can answer false truthfully, there is no
         * value to report here — the field is present and empty rather than present and
         * wrong.
         */
        primary_use_case?: string | null;

        vertical?: ProfilesAPI.TcrVertical | null;
      }

      /**
       * Contact information for the brand
       */
      export interface Contact {
        /**
         * Business/brand name
         */
        business_name?: string | null;

        /**
         * Contact email address
         */
        email?: string | null;

        /**
         * Primary contact name
         */
        name?: string;

        /**
         * Contact phone number in E.164 format
         */
        phone?: string | null;

        /**
         * Contact phone country code (e.g., "1" for US)
         */
        phone_country_code?: string | null;

        /**
         * Contact's role in the business
         */
        role?: string | null;
      }
    }
  }

  /**
   * Error information
   */
  export interface Error {
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
   * Request and response metadata
   */
  export interface Meta {
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
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface ProfileUpdateResponse {
  /**
   * Detailed profile response for v3 API
   */
  data?: ProfileUpdateResponse.Data | null;

  /**
   * Error information
   */
  error?: ProfileUpdateResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: ProfileUpdateResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace ProfileUpdateResponse {
  /**
   * Detailed profile response for v3 API
   */
  export interface Data {
    /**
     * Profile unique identifier
     */
    id?: string;

    /**
     * @deprecated Always false. A profile no longer shares contacts with sibling
     * profiles — it sees only what it owns. Retained so existing v3 clients reading
     * allow_contact_sharing keep deserializing; it carries no information.
     */
    allow_contact_sharing?: boolean | null;

    /**
     * Whether number changes are allowed during onboarding
     */
    allow_number_change_during_onboarding?: boolean | null;

    /**
     * @deprecated Always false. A profile no longer shares templates with sibling
     * profiles. Retained so existing v3 clients reading allow_template_sharing keep
     * deserializing; it carries no information.
     */
    allow_template_sharing?: boolean | null;

    /**
     * Billing contact info returned in profile responses
     */
    billing_contact?: Data.BillingContact | null;

    /**
     * Billing model: profile, organization, or profile_and_organization
     */
    billing_model?: string;

    /**
     * Brand response with nested contact, business, and compliance sections — mirrors
     * the request structure.
     */
    brand?: Data.Brand | null;

    /**
     * When the profile was created
     */
    created_at?: string;

    /**
     * Profile description
     */
    description?: string | null;

    /**
     * Profile email (inherited from organization)
     */
    email?: string | null;

    /**
     * Profile icon URL
     */
    icon?: string | null;

    /**
     * @deprecated Always false. A profile no longer inherits its organization's
     * contacts. Retained so existing v3 clients reading inherit_contacts keep
     * deserializing; it carries no information.
     */
    inherit_contacts?: boolean | null;

    /**
     * Whether this profile inherits TCR brand from the organization
     */
    inherit_tcr_brand?: boolean;

    /**
     * Whether this profile inherits TCR campaign from the organization
     */
    inherit_tcr_campaign?: boolean;

    /**
     * @deprecated Always false. A profile no longer inherits its organization's
     * templates. Retained so existing v3 clients reading inherit_templates keep
     * deserializing; it carries no information.
     */
    inherit_templates?: boolean | null;

    /**
     * Profile name
     */
    name?: string;

    /**
     * Parent organization ID
     */
    organization_id?: string | null;

    /**
     * Direct SMS phone number
     */
    sending_phone_number?: string | null;

    /**
     * @deprecated Deprecated. Always null. Sender borrowing is gone: a profile no
     * longer points at another profile for its SMS sender, and every profile owns the
     * sender it sends from.
     *
     * Kept on the wire, and never populated, because those are two different promises.
     * Removing the key changes the response's shape — a generated client loses the
     * property and stops compiling on the next regenerate, for a value that is now
     * null for every profile in existence. Keeping it null costs a key and breaks
     * nobody, and null is the honest answer rather than a placeholder: there is no
     * borrowing left to report.
     *
     * Nothing could populate it. Migration 260813161500 dropped the column and copied
     * each borrower its own channel-provider row; its Down() says outright that the
     * borrower-to-lender pairing is not recoverable. The only surviving trace is a
     * notes string on the copied row.
     */
    sending_phone_number_profile_id?: string | null;

    /**
     * @deprecated
     */
    sending_whatsapp_number_profile_id?: string | null;

    /**
     * Profile short name/abbreviation. 3–11 characters: letters, numbers, and spaces
     * only, with at least one letter.
     */
    short_name?: string | null;

    /**
     * Profile setup status: incomplete, pending_review, approved, rejected
     */
    status?: string;

    /**
     * When the profile was last updated
     */
    updated_at?: string | null;

    /**
     * WhatsApp Business Account ID associated with this profile. Present whether the
     * WABA is inherited from the organization or configured directly.
     */
    waba_id?: string | null;

    /**
     * Direct WhatsApp phone number
     */
    whatsapp_phone_number?: string | null;
  }

  export namespace Data {
    /**
     * Billing contact info returned in profile responses
     */
    export interface BillingContact {
      address?: string | null;

      email?: string | null;

      name?: string | null;

      phone?: string | null;
    }

    /**
     * Brand response with nested contact, business, and compliance sections — mirrors
     * the request structure.
     */
    export interface Brand {
      /**
       * Unique identifier for the brand
       */
      id?: string;

      /**
       * Business details and address information
       */
      business?: Brand.Business | null;

      /**
       * Compliance and TCR-related information
       */
      compliance?: Brand.Compliance | null;

      /**
       * Contact information for the brand
       */
      contact?: Brand.Contact | null;

      /**
       * When the brand was created
       */
      created_at?: string;

      /**
       * @deprecated Deprecated and scheduled for removal. Identifies the Campaign
       * Service Provider that registered the brand, which is Sent, so the value is the
       * same for every brand and every account. Nothing on your side can act on it and
       * there is no replacement. Stop reading it.
       */
      csp_id?: string | null;

      identity_status?: 'SELF_DECLARED' | 'UNVERIFIED' | 'VERIFIED' | 'VETTED_VERIFIED' | null;

      /**
       * Whether this brand is inherited from the parent organization
       */
      is_inherited?: boolean;

      status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | null;

      /**
       * When the brand was submitted to TCR
       */
      submitted_at?: string | null;

      /**
       * Whether this brand has been submitted to TCR
       */
      submitted_to_tcr?: boolean;

      /**
       * TCR brand ID (populated after TCR submission)
       */
      tcr_brand_id?: string | null;

      /**
       * Universal EIN from TCR
       */
      universal_ein?: string | null;

      /**
       * When the brand was last updated
       */
      updated_at?: string | null;
    }

    export namespace Brand {
      /**
       * Business details and address information
       */
      export interface Business {
        /**
         * City
         */
        city?: string | null;

        /**
         * Country code (e.g., US, CA)
         */
        country?: string | null;

        /**
         * Country where the business is registered
         */
        country_of_registration?: string | null;

        /**
         * Business entity type
         */
        entity_type?: string | null;

        /**
         * Legal business name
         */
        legal_name?: string | null;

        /**
         * Postal/ZIP code
         */
        postal_code?: string | null;

        /**
         * State/province code
         */
        state?: string | null;

        /**
         * Street address
         */
        street?: string | null;

        /**
         * Tax ID/EIN number
         */
        tax_id?: string | null;

        /**
         * Type of tax ID (e.g., us_ein, ca_bn)
         */
        tax_id_type?: string | null;

        /**
         * Business website URL
         */
        url?: string | null;
      }

      /**
       * Compliance and TCR-related information
       */
      export interface Compliance {
        brand_relationship?: ProfilesAPI.TcrBrandRelationship | null;

        /**
         * List of destination countries for messaging
         */
        destination_countries?: Array<ProfilesAPI.DestinationCountry>;

        /**
         * Whether this is a TCR (Campaign Registry) application
         */
        is_tcr_application?: boolean;

        /**
         * Additional notes about the business or use case
         */
        notes?: string | null;

        /**
         * Phone number prefix for messaging (e.g., "+1")
         */
        phone_number_prefix?: string | null;

        /**
         * @deprecated Always null. The brand's free-text primary use case is no longer
         * stored: it reached neither TCR nor any decision, and its column is dropped with
         * no backfill, because the values were prose and the typed equivalent is the
         * campaign's MessagingUseCaseUS.
         *
         * Retained so existing v3 clients reading primary_use_case keep deserializing.
         * Unlike the profile sharing flags, which can answer false truthfully, there is no
         * value to report here — the field is present and empty rather than present and
         * wrong.
         */
        primary_use_case?: string | null;

        vertical?: ProfilesAPI.TcrVertical | null;
      }

      /**
       * Contact information for the brand
       */
      export interface Contact {
        /**
         * Business/brand name
         */
        business_name?: string | null;

        /**
         * Contact email address
         */
        email?: string | null;

        /**
         * Primary contact name
         */
        name?: string;

        /**
         * Contact phone number in E.164 format
         */
        phone?: string | null;

        /**
         * Contact phone country code (e.g., "1" for US)
         */
        phone_country_code?: string | null;

        /**
         * Contact's role in the business
         */
        role?: string | null;
      }
    }
  }

  /**
   * Error information
   */
  export interface Error {
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
   * Request and response metadata
   */
  export interface Meta {
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
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface ProfileListResponse {
  /**
   * The profiles in the organization.
   */
  data?: ProfileListResponse.Data | null;

  /**
   * Error information
   */
  error?: ProfileListResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: ProfileListResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace ProfileListResponse {
  /**
   * The profiles in the organization.
   */
  export interface Data {
    /**
     * Pagination metadata for list responses
     */
    pagination?: Data.Pagination;

    /**
     * The profiles on this page.
     */
    profiles?: Array<Data.Profile>;
  }

  export namespace Data {
    /**
     * Pagination metadata for list responses
     */
    export interface Pagination {
      /**
       * @deprecated Cursor-based pagination. Never populated — see Cursors.
       */
      cursors?: Pagination.Cursors | null;

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

    export namespace Pagination {
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
     * Detailed profile response for v3 API
     */
    export interface Profile {
      /**
       * Profile unique identifier
       */
      id?: string;

      /**
       * @deprecated Always false. A profile no longer shares contacts with sibling
       * profiles — it sees only what it owns. Retained so existing v3 clients reading
       * allow_contact_sharing keep deserializing; it carries no information.
       */
      allow_contact_sharing?: boolean | null;

      /**
       * Whether number changes are allowed during onboarding
       */
      allow_number_change_during_onboarding?: boolean | null;

      /**
       * @deprecated Always false. A profile no longer shares templates with sibling
       * profiles. Retained so existing v3 clients reading allow_template_sharing keep
       * deserializing; it carries no information.
       */
      allow_template_sharing?: boolean | null;

      /**
       * Billing contact info returned in profile responses
       */
      billing_contact?: Profile.BillingContact | null;

      /**
       * Billing model: profile, organization, or profile_and_organization
       */
      billing_model?: string;

      /**
       * Brand response with nested contact, business, and compliance sections — mirrors
       * the request structure.
       */
      brand?: Profile.Brand | null;

      /**
       * When the profile was created
       */
      created_at?: string;

      /**
       * Profile description
       */
      description?: string | null;

      /**
       * Profile email (inherited from organization)
       */
      email?: string | null;

      /**
       * Profile icon URL
       */
      icon?: string | null;

      /**
       * @deprecated Always false. A profile no longer inherits its organization's
       * contacts. Retained so existing v3 clients reading inherit_contacts keep
       * deserializing; it carries no information.
       */
      inherit_contacts?: boolean | null;

      /**
       * Whether this profile inherits TCR brand from the organization
       */
      inherit_tcr_brand?: boolean;

      /**
       * Whether this profile inherits TCR campaign from the organization
       */
      inherit_tcr_campaign?: boolean;

      /**
       * @deprecated Always false. A profile no longer inherits its organization's
       * templates. Retained so existing v3 clients reading inherit_templates keep
       * deserializing; it carries no information.
       */
      inherit_templates?: boolean | null;

      /**
       * Profile name
       */
      name?: string;

      /**
       * Parent organization ID
       */
      organization_id?: string | null;

      /**
       * Direct SMS phone number
       */
      sending_phone_number?: string | null;

      /**
       * @deprecated Deprecated. Always null. Sender borrowing is gone: a profile no
       * longer points at another profile for its SMS sender, and every profile owns the
       * sender it sends from.
       *
       * Kept on the wire, and never populated, because those are two different promises.
       * Removing the key changes the response's shape — a generated client loses the
       * property and stops compiling on the next regenerate, for a value that is now
       * null for every profile in existence. Keeping it null costs a key and breaks
       * nobody, and null is the honest answer rather than a placeholder: there is no
       * borrowing left to report.
       *
       * Nothing could populate it. Migration 260813161500 dropped the column and copied
       * each borrower its own channel-provider row; its Down() says outright that the
       * borrower-to-lender pairing is not recoverable. The only surviving trace is a
       * notes string on the copied row.
       */
      sending_phone_number_profile_id?: string | null;

      /**
       * @deprecated
       */
      sending_whatsapp_number_profile_id?: string | null;

      /**
       * Profile short name/abbreviation. 3–11 characters: letters, numbers, and spaces
       * only, with at least one letter.
       */
      short_name?: string | null;

      /**
       * Profile setup status: incomplete, pending_review, approved, rejected
       */
      status?: string;

      /**
       * When the profile was last updated
       */
      updated_at?: string | null;

      /**
       * WhatsApp Business Account ID associated with this profile. Present whether the
       * WABA is inherited from the organization or configured directly.
       */
      waba_id?: string | null;

      /**
       * Direct WhatsApp phone number
       */
      whatsapp_phone_number?: string | null;
    }

    export namespace Profile {
      /**
       * Billing contact info returned in profile responses
       */
      export interface BillingContact {
        address?: string | null;

        email?: string | null;

        name?: string | null;

        phone?: string | null;
      }

      /**
       * Brand response with nested contact, business, and compliance sections — mirrors
       * the request structure.
       */
      export interface Brand {
        /**
         * Unique identifier for the brand
         */
        id?: string;

        /**
         * Business details and address information
         */
        business?: Brand.Business | null;

        /**
         * Compliance and TCR-related information
         */
        compliance?: Brand.Compliance | null;

        /**
         * Contact information for the brand
         */
        contact?: Brand.Contact | null;

        /**
         * When the brand was created
         */
        created_at?: string;

        /**
         * @deprecated Deprecated and scheduled for removal. Identifies the Campaign
         * Service Provider that registered the brand, which is Sent, so the value is the
         * same for every brand and every account. Nothing on your side can act on it and
         * there is no replacement. Stop reading it.
         */
        csp_id?: string | null;

        identity_status?: 'SELF_DECLARED' | 'UNVERIFIED' | 'VERIFIED' | 'VETTED_VERIFIED' | null;

        /**
         * Whether this brand is inherited from the parent organization
         */
        is_inherited?: boolean;

        status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | null;

        /**
         * When the brand was submitted to TCR
         */
        submitted_at?: string | null;

        /**
         * Whether this brand has been submitted to TCR
         */
        submitted_to_tcr?: boolean;

        /**
         * TCR brand ID (populated after TCR submission)
         */
        tcr_brand_id?: string | null;

        /**
         * Universal EIN from TCR
         */
        universal_ein?: string | null;

        /**
         * When the brand was last updated
         */
        updated_at?: string | null;
      }

      export namespace Brand {
        /**
         * Business details and address information
         */
        export interface Business {
          /**
           * City
           */
          city?: string | null;

          /**
           * Country code (e.g., US, CA)
           */
          country?: string | null;

          /**
           * Country where the business is registered
           */
          country_of_registration?: string | null;

          /**
           * Business entity type
           */
          entity_type?: string | null;

          /**
           * Legal business name
           */
          legal_name?: string | null;

          /**
           * Postal/ZIP code
           */
          postal_code?: string | null;

          /**
           * State/province code
           */
          state?: string | null;

          /**
           * Street address
           */
          street?: string | null;

          /**
           * Tax ID/EIN number
           */
          tax_id?: string | null;

          /**
           * Type of tax ID (e.g., us_ein, ca_bn)
           */
          tax_id_type?: string | null;

          /**
           * Business website URL
           */
          url?: string | null;
        }

        /**
         * Compliance and TCR-related information
         */
        export interface Compliance {
          brand_relationship?: ProfilesAPI.TcrBrandRelationship | null;

          /**
           * List of destination countries for messaging
           */
          destination_countries?: Array<ProfilesAPI.DestinationCountry>;

          /**
           * Whether this is a TCR (Campaign Registry) application
           */
          is_tcr_application?: boolean;

          /**
           * Additional notes about the business or use case
           */
          notes?: string | null;

          /**
           * Phone number prefix for messaging (e.g., "+1")
           */
          phone_number_prefix?: string | null;

          /**
           * @deprecated Always null. The brand's free-text primary use case is no longer
           * stored: it reached neither TCR nor any decision, and its column is dropped with
           * no backfill, because the values were prose and the typed equivalent is the
           * campaign's MessagingUseCaseUS.
           *
           * Retained so existing v3 clients reading primary_use_case keep deserializing.
           * Unlike the profile sharing flags, which can answer false truthfully, there is no
           * value to report here — the field is present and empty rather than present and
           * wrong.
           */
          primary_use_case?: string | null;

          vertical?: ProfilesAPI.TcrVertical | null;
        }

        /**
         * Contact information for the brand
         */
        export interface Contact {
          /**
           * Business/brand name
           */
          business_name?: string | null;

          /**
           * Contact email address
           */
          email?: string | null;

          /**
           * Primary contact name
           */
          name?: string;

          /**
           * Contact phone number in E.164 format
           */
          phone?: string | null;

          /**
           * Contact phone country code (e.g., "1" for US)
           */
          phone_country_code?: string | null;

          /**
           * Contact's role in the business
           */
          role?: string | null;
        }
      }
    }
  }

  /**
   * Error information
   */
  export interface Error {
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
   * Request and response metadata
   */
  export interface Meta {
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
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface ProfileCompleteResponse {
  /**
   * Response when a profile is already in the completed state and no further action
   * is taken.
   */
  data?: ProfileCompleteResponse.Data | null;

  /**
   * Error information
   */
  error?: ProfileCompleteResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: ProfileCompleteResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace ProfileCompleteResponse {
  /**
   * Response when a profile is already in the completed state and no further action
   * is taken.
   */
  export interface Data {
    /**
     * Human-readable message describing the result.
     */
    message?: string;

    /**
     * Current process status of the profile (e.g., "completed", "submitted",
     * "in_progress").
     */
    status?: string;
  }

  /**
   * Error information
   */
  export interface Error {
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
   * Request and response metadata
   */
  export interface Meta {
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
}

export interface ProfileCreateParams {
  /**
   * @deprecated Body param: Deprecated. Accepted and ignored. Contact and template
   * sharing between sender profiles is gone — a profile sees only what it owns, and
   * the organization still sees all of its profiles' contacts and templates through
   * read-time widening. The four columns behind these flags were dropped by
   * M260720120000.
   *
   * Bound rather than dropped so the properties survive on the wire and in a
   * generated client: an SDK that assigns them keeps compiling, which is the
   * compatibility this exists for. Deliberately not refused either — a 400 would
   * break an integration that is otherwise working, and the capability they ask for
   * is gone either way. Same rule as SendingPhoneNumberProfileId.
   *
   * The read is what makes this survivable: every profile reports all four as false,
   * so a caller that checks its own write can see it did not take. Requests carrying
   * one are logged, so we can tell when nobody sends them any more and the fields
   * can go for real.
   */
  allow_contact_sharing?: boolean | null;

  /**
   * @deprecated Body param
   */
  allow_template_sharing?: boolean | null;

  /**
   * Body param: Billing contact information for a profile. Required when
   * billing_model is "profile" or "profile_and_organization".
   */
  billing_contact?: ProfileCreateParams.BillingContact | null;

  /**
   * Body param: Billing model: profile, organization, or profile_and_organization
   * (default: profile).
   *
   * - "organization": the organization's billing details are used; no profile-level
   *   billing info needed.
   * - "profile": the profile is billed independently; billing_contact is required.
   * - "profile_and_organization": the profile is billed first with the organization
   *   as fallback; billing_contact is required.
   */
  billing_model?: string | null;

  /**
   * Body param: Brand and KYC data grouped into contact, business, and compliance
   * sections
   */
  brand?: ProfileCreateParams.Brand | null;

  /**
   * Body param: Profile description (optional)
   */
  description?: string | null;

  /**
   * Body param: Profile icon URL (optional)
   */
  icon?: string | null;

  /**
   * @deprecated Body param
   */
  inherit_contacts?: boolean | null;

  /**
   * Body param: Whether this profile inherits TCR brand from organization (default:
   * false)
   */
  inherit_tcr_brand?: boolean | null;

  /**
   * Body param: Whether this profile inherits TCR campaign from organization
   * (default: false)
   */
  inherit_tcr_campaign?: boolean | null;

  /**
   * @deprecated Body param
   */
  inherit_templates?: boolean | null;

  /**
   * Body param: Profile name (required)
   */
  name?: string;

  /**
   * Body param: Payment card details for this profile (optional). Accepted when
   * billing_model is "profile" or "profile_and_organization". Not persisted on our
   * servers — forwarded to the payment processor.
   */
  payment_details?: ProfileCreateParams.PaymentDetails | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param: Profile short name/abbreviation (optional). Must be 3–11 characters,
   * contain only letters, numbers, and spaces, and include at least one letter.
   * Example: "SALES", "Mkt 2", "Support1".
   */
  short_name?: string | null;

  /**
   * Body param: Direct WhatsApp Business Account credentials for a profile. Use this
   * when the profile should have its own WhatsApp Business Account instead of
   * inheriting from the organization. Credentials must be obtained from Meta
   * Business Manager by creating a System User with whatsapp_business_messaging and
   * whatsapp_business_management scopes.
   */
  whatsapp_business_account?: ProfileCreateParams.WhatsappBusinessAccount | null;

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

export namespace ProfileCreateParams {
  /**
   * Billing contact information for a profile. Required when billing_model is
   * "profile" or "profile_and_organization".
   */
  export interface BillingContact {
    /**
     * Email address where invoices will be sent (required)
     */
    email: string;

    /**
     * Full name of the billing contact or company (required)
     */
    name: string;

    /**
     * Billing address (optional). Free-form text including street, city, state, postal
     * code, and country.
     */
    address?: string | null;

    /**
     * Phone number for the billing contact (optional)
     */
    phone?: string | null;
  }

  /**
   * Brand and KYC data grouped into contact, business, and compliance sections
   */
  export interface Brand {
    /**
     * Compliance and TCR information for brand registration
     */
    compliance: Brand.Compliance;

    /**
     * Contact information for brand KYC
     */
    contact: Brand.Contact;

    /**
     * Business details and address for brand KYC
     */
    business?: Brand.Business | null;
  }

  export namespace Brand {
    /**
     * Compliance and TCR information for brand registration
     */
    export interface Compliance {
      brandRelationship: ProfilesAPI.TcrBrandRelationship;

      vertical: ProfilesAPI.TcrVertical;

      /**
       * List of destination countries for messaging
       */
      destinationCountries?: Array<ProfilesAPI.DestinationCountry> | null;

      /**
       * Whether this is a TCR (Campaign Registry) application
       */
      isTcrApplication?: boolean | null;

      /**
       * Additional notes about the business or use case
       */
      notes?: string | null;

      /**
       * Phone number prefix for messaging (e.g., "+1")
       */
      phoneNumberPrefix?: string | null;
    }

    /**
     * Contact information for brand KYC
     */
    export interface Contact {
      /**
       * Primary contact name (required)
       */
      name: string;

      /**
       * Business/brand name
       */
      businessName?: string | null;

      /**
       * Contact email address
       */
      email?: string | null;

      /**
       * Contact phone number in E.164 format
       */
      phone?: string | null;

      /**
       * Contact phone country code (e.g., "1" for US)
       */
      phoneCountryCode?: string | null;

      /**
       * Contact's role in the business
       */
      role?: string | null;
    }

    /**
     * Business details and address for brand KYC
     */
    export interface Business {
      /**
       * City
       */
      city?: string | null;

      /**
       * Country code (e.g., US, CA)
       */
      country?: string | null;

      /**
       * Country where the business is registered
       */
      countryOfRegistration?: string | null;

      entityType?:
        | 'PRIVATE_PROFIT'
        | 'PUBLIC_PROFIT'
        | 'NON_PROFIT'
        | 'SOLE_PROPRIETOR'
        | 'GOVERNMENT'
        | null;

      /**
       * Legal business name
       */
      legalName?: string | null;

      /**
       * Postal/ZIP code
       */
      postalCode?: string | null;

      /**
       * State/province code
       */
      state?: string | null;

      /**
       * Street address
       */
      street?: string | null;

      /**
       * Tax ID/EIN number
       */
      taxId?: string | null;

      /**
       * Type of tax ID (e.g., us_ein, ca_bn)
       */
      taxIdType?: string | null;

      /**
       * Business website URL
       */
      url?: string | null;
    }
  }

  /**
   * Payment card details for this profile (optional). Accepted when billing_model is
   * "profile" or "profile_and_organization". Not persisted on our servers —
   * forwarded to the payment processor.
   */
  export interface PaymentDetails {
    /**
     * Card number (digits only, 13–19 characters)
     */
    card_number: string;

    /**
     * Card security code (3–4 digits)
     */
    cvc: string;

    /**
     * Card expiry date in MM/YY format (e.g. "09/27")
     */
    expiry: string;

    /**
     * Billing ZIP / postal code associated with the card
     */
    zip_code: string;
  }

  /**
   * Direct WhatsApp Business Account credentials for a profile. Use this when the
   * profile should have its own WhatsApp Business Account instead of inheriting from
   * the organization. Credentials must be obtained from Meta Business Manager by
   * creating a System User with whatsapp_business_messaging and
   * whatsapp_business_management scopes.
   */
  export interface WhatsappBusinessAccount {
    /**
     * System User access token with whatsapp_business_messaging and
     * whatsapp_business_management permissions. This value is stored securely and
     * never returned in API responses.
     */
    access_token: string;

    /**
     * WhatsApp Business Account ID from Meta Business Manager
     */
    waba_id: string;

    /**
     * Phone Number ID of an existing number already registered under this WABA in Meta
     * Business Manager. Optional — when omitted, a number will be provisioned from our
     * pool and registered in the WABA during the onboarding flow. When provided, the
     * number must already exist in the WABA.
     */
    phone_number_id?: string | null;
  }
}

export interface ProfileRetrieveParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface ProfileUpdateParams {
  /**
   * @deprecated Body param: Deprecated. Accepted and ignored. Contact and template
   * sharing between sender profiles is gone — a profile sees only what it owns, and
   * the organization still sees all of its profiles' contacts and templates through
   * read-time widening. The four columns behind these flags were dropped by
   * M260720120000.
   *
   * Retired the same way as SendingPhoneNumberProfileId, and for the same reason:
   * the properties stay bound so an SDK that assigns them keeps compiling, and a 400
   * would break a working integration over a capability that is gone regardless.
   * Every profile reports all four as false, so a caller that checks its own write
   * can see it did not take.
   */
  allow_contact_sharing?: boolean | null;

  /**
   * Body param: Whether number changes are allowed during onboarding (optional)
   */
  allow_number_change_during_onboarding?: boolean | null;

  /**
   * @deprecated Body param
   */
  allow_template_sharing?: boolean | null;

  /**
   * Body param: Billing contact information for a profile. Required when
   * billing_model is "profile" or "profile_and_organization".
   */
  billing_contact?: ProfileUpdateParams.BillingContact | null;

  /**
   * Body param: Billing model: profile, organization, or profile_and_organization
   * (optional).
   *
   * - "organization": the organization's billing details are used; no profile-level
   *   billing info needed.
   * - "profile": the profile is billed independently; billing_contact is required.
   * - "profile_and_organization": the profile is billed first with the organization
   *   as fallback; billing_contact is required.
   */
  billing_model?: string | null;

  /**
   * Body param: Brand and KYC data grouped into contact, business, and compliance
   * sections
   */
  brand?: ProfileUpdateParams.Brand | null;

  /**
   * Body param: Profile description (optional)
   */
  description?: string | null;

  /**
   * Body param: Profile icon URL (optional)
   */
  icon?: string | null;

  /**
   * @deprecated Body param
   */
  inherit_contacts?: boolean | null;

  /**
   * Body param: Whether this profile inherits TCR brand from organization (optional)
   */
  inherit_tcr_brand?: boolean | null;

  /**
   * Body param: Whether this profile inherits TCR campaign from organization
   * (optional)
   */
  inherit_tcr_campaign?: boolean | null;

  /**
   * @deprecated Body param
   */
  inherit_templates?: boolean | null;

  /**
   * Body param: Profile name (optional)
   */
  name?: string | null;

  /**
   * Body param: Payment card details for this profile (optional). Accepted when
   * billing_model is "profile" or "profile_and_organization". Not persisted on our
   * servers — forwarded to the payment processor.
   */
  payment_details?: ProfileUpdateParams.PaymentDetails | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param: Direct phone number for SMS sending (optional)
   */
  sending_phone_number?: string | null;

  /**
   * @deprecated Body param: Deprecated. Accepted and ignored. Sender borrowing is
   * gone: a profile cannot send from another profile's SMS number. Supplying this
   * changes nothing and the request still succeeds.
   *
   * Bound rather than dropped so the property survives on the wire and in a
   * generated client — an SDK that assigns it keeps compiling, which is the
   * compatibility this exists for. It is deliberately not refused: a 400 here would
   * break an integration that is otherwise working, and the capability it asks for
   * is gone either way.
   *
   * The trade-off, stated plainly. A caller asking for borrowing is told it
   * succeeded when nothing happened. What makes that survivable is the read:
   * sending_phone_number_profile_id comes back null on every profile, so a caller
   * that checks its own write can see it did not take. Every request that carries
   * one is logged, so we can tell when nobody is sending it any more and the field
   * can go for real.
   *
   * Give the profile a sender of its own instead: POST /v3/channels/sms with the
   * x-profile-id header naming it.
   */
  sending_phone_number_profile_id?: string | null;

  /**
   * @deprecated Body param
   */
  sending_whatsapp_number_profile_id?: string | null;

  /**
   * Body param: Profile short name/abbreviation (optional). Must be 3–11 characters,
   * contain only letters, numbers, and spaces, and include at least one letter.
   * Example: "SALES", "Mkt 2", "Support1".
   */
  short_name?: string | null;

  /**
   * Body param: Direct phone number for WhatsApp sending (optional)
   */
  whatsapp_phone_number?: string | null;

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

export namespace ProfileUpdateParams {
  /**
   * Billing contact information for a profile. Required when billing_model is
   * "profile" or "profile_and_organization".
   */
  export interface BillingContact {
    /**
     * Email address where invoices will be sent (required)
     */
    email: string;

    /**
     * Full name of the billing contact or company (required)
     */
    name: string;

    /**
     * Billing address (optional). Free-form text including street, city, state, postal
     * code, and country.
     */
    address?: string | null;

    /**
     * Phone number for the billing contact (optional)
     */
    phone?: string | null;
  }

  /**
   * Brand and KYC data grouped into contact, business, and compliance sections
   */
  export interface Brand {
    /**
     * Compliance and TCR information for brand registration
     */
    compliance: Brand.Compliance;

    /**
     * Contact information for brand KYC
     */
    contact: Brand.Contact;

    /**
     * Business details and address for brand KYC
     */
    business?: Brand.Business | null;
  }

  export namespace Brand {
    /**
     * Compliance and TCR information for brand registration
     */
    export interface Compliance {
      brandRelationship: ProfilesAPI.TcrBrandRelationship;

      vertical: ProfilesAPI.TcrVertical;

      /**
       * List of destination countries for messaging
       */
      destinationCountries?: Array<ProfilesAPI.DestinationCountry> | null;

      /**
       * Whether this is a TCR (Campaign Registry) application
       */
      isTcrApplication?: boolean | null;

      /**
       * Additional notes about the business or use case
       */
      notes?: string | null;

      /**
       * Phone number prefix for messaging (e.g., "+1")
       */
      phoneNumberPrefix?: string | null;
    }

    /**
     * Contact information for brand KYC
     */
    export interface Contact {
      /**
       * Primary contact name (required)
       */
      name: string;

      /**
       * Business/brand name
       */
      businessName?: string | null;

      /**
       * Contact email address
       */
      email?: string | null;

      /**
       * Contact phone number in E.164 format
       */
      phone?: string | null;

      /**
       * Contact phone country code (e.g., "1" for US)
       */
      phoneCountryCode?: string | null;

      /**
       * Contact's role in the business
       */
      role?: string | null;
    }

    /**
     * Business details and address for brand KYC
     */
    export interface Business {
      /**
       * City
       */
      city?: string | null;

      /**
       * Country code (e.g., US, CA)
       */
      country?: string | null;

      /**
       * Country where the business is registered
       */
      countryOfRegistration?: string | null;

      entityType?:
        | 'PRIVATE_PROFIT'
        | 'PUBLIC_PROFIT'
        | 'NON_PROFIT'
        | 'SOLE_PROPRIETOR'
        | 'GOVERNMENT'
        | null;

      /**
       * Legal business name
       */
      legalName?: string | null;

      /**
       * Postal/ZIP code
       */
      postalCode?: string | null;

      /**
       * State/province code
       */
      state?: string | null;

      /**
       * Street address
       */
      street?: string | null;

      /**
       * Tax ID/EIN number
       */
      taxId?: string | null;

      /**
       * Type of tax ID (e.g., us_ein, ca_bn)
       */
      taxIdType?: string | null;

      /**
       * Business website URL
       */
      url?: string | null;
    }
  }

  /**
   * Payment card details for this profile (optional). Accepted when billing_model is
   * "profile" or "profile_and_organization". Not persisted on our servers —
   * forwarded to the payment processor.
   */
  export interface PaymentDetails {
    /**
     * Card number (digits only, 13–19 characters)
     */
    card_number: string;

    /**
     * Card security code (3–4 digits)
     */
    cvc: string;

    /**
     * Card expiry date in MM/YY format (e.g. "09/27")
     */
    expiry: string;

    /**
     * Billing ZIP / postal code associated with the card
     */
    zip_code: string;
  }
}

export interface ProfileListParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface ProfileDeleteParams {
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

export interface ProfileCompleteParams {
  /**
   * Body param: Webhook URL to call when profile completion finishes (success or
   * failure)
   */
  webHookUrl: string;

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

Profiles.Campaigns = Campaigns;

export declare namespace Profiles {
  export {
    type DestinationCountry as DestinationCountry,
    type TcrBrandRelationship as TcrBrandRelationship,
    type TcrVertical as TcrVertical,
    type ProfileCreateResponse as ProfileCreateResponse,
    type ProfileRetrieveResponse as ProfileRetrieveResponse,
    type ProfileUpdateResponse as ProfileUpdateResponse,
    type ProfileListResponse as ProfileListResponse,
    type ProfileCompleteResponse as ProfileCompleteResponse,
    type ProfileCreateParams as ProfileCreateParams,
    type ProfileRetrieveParams as ProfileRetrieveParams,
    type ProfileUpdateParams as ProfileUpdateParams,
    type ProfileListParams as ProfileListParams,
    type ProfileDeleteParams as ProfileDeleteParams,
    type ProfileCompleteParams as ProfileCompleteParams,
  };

  export {
    Campaigns as Campaigns,
    type MessagingUseCaseUs as MessagingUseCaseUs,
    type CampaignCreateResponse as CampaignCreateResponse,
    type CampaignUpdateResponse as CampaignUpdateResponse,
    type CampaignListResponse as CampaignListResponse,
    type CampaignCreateParams as CampaignCreateParams,
    type CampaignUpdateParams as CampaignUpdateParams,
    type CampaignListParams as CampaignListParams,
    type CampaignDeleteParams as CampaignDeleteParams,
  };
}
