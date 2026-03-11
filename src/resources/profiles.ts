// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ProfilesAPI from './profiles';
import * as WebhooksAPI from './webhooks';
import * as BrandsAPI from './brands/brands';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage organization profiles
 */
export class Profiles extends APIResource {
  /**
   * Creates a new sender profile within an organization. Profiles represent
   * different brands, departments, or use cases, each with their own messaging
   * configuration and settings. Requires admin role in the organization.
   *
   * ## WhatsApp Business Account
   *
   * Every profile must be linked to a WhatsApp Business Account. There are two ways
   * to do this:
   *
   * **1. Inherit from organization (default)** — Omit the
   * `whatsapp_business_account` field. The profile will share the organization's
   * WhatsApp Business Account, which must have been set up via WhatsApp Embedded
   * Signup. This is the recommended path for most use cases.
   *
   * **2. Direct credentials** — Provide a `whatsapp_business_account` object with
   * `waba_id`, `phone_number_id`, and `access_token`. Use this when the profile
   * needs its own independent WhatsApp Business Account. Obtain these from Meta
   * Business Manager by creating a System User with `whatsapp_business_messaging`
   * and `whatsapp_business_management` permissions.
   *
   * If the `whatsapp_business_account` field is omitted and the organization has no
   * WhatsApp Business Account configured, the request will be rejected with
   * HTTP 422.
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
   * @example
   * ```ts
   * const apiResponseOfProfileDetail =
   *   await client.profiles.create();
   * ```
   */
  create(params: ProfileCreateParams, options?: RequestOptions): APIPromise<APIResponseOfProfileDetail> {
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
   * Retrieves detailed information about a specific sender profile within an
   * organization, including brand and KYC information if a brand has been
   * configured.
   *
   * @example
   * ```ts
   * const apiResponseOfProfileDetail =
   *   await client.profiles.retrieve('profileId');
   * ```
   */
  retrieve(
    profileID: string,
    params: ProfileRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseOfProfileDetail> {
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
   * @example
   * ```ts
   * const apiResponseOfProfileDetail =
   *   await client.profiles.update('profileId');
   * ```
   */
  update(
    profileID: string,
    params: ProfileUpdateParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfProfileDetail> {
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
   * Retrieves all sender profiles within an organization, including brand
   * information for each profile. Profiles represent different brands, departments,
   * or use cases within an organization, each with their own messaging
   * configuration.
   *
   * @example
   * ```ts
   * const profiles = await client.profiles.list();
   * ```
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
   * Soft deletes a sender profile. The profile will be marked as deleted but data is
   * retained. Requires admin role in the organization.
   *
   * @example
   * ```ts
   * await client.profiles.delete('profileId', { body: {} });
   * ```
   */
  delete(profileID: string, params: ProfileDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { body, 'x-profile-id': xProfileID } = params;
    return this._client.delete(path`/v3/profiles/${profileID}`, {
      body: body,
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Final step in profile compliance workflow. Validates all prerequisites (general
   * data, brand, campaigns), connects profile to Telnyx/WhatsApp, and sets status
   * based on configuration. The process runs in the background and calls the
   * provided webhook URL when finished.
   *
   *                 Prerequisites:
   *                 - Profile must be completed
   *                 - If inheritTcrBrand=false: Profile must have existing brand
   *                 - If inheritTcrBrand=true: Parent must have existing brand
   *                 - If TCR application: Must have at least one campaign (own or inherited)
   *                 - If inheritTcrCampaign=false: Profile should have campaigns
   *                 - If inheritTcrCampaign=true: Parent must have campaigns
   *
   *                 Status Logic:
   *                 - If both SMS and WhatsApp channels are missing → SUBMITTED
   *                 - If TCR application and not inheriting brand/campaigns → SUBMITTED
   *                 - If non-TCR with destination country (IsMain=true) → SUBMITTED
   *                 - Otherwise → COMPLETED
   *
   * @example
   * ```ts
   * const response = await client.profiles.complete(
   *   '660e8400-e29b-41d4-a716-446655440000',
   *   {
   *     webHookUrl:
   *       'https://your-app.com/webhook/profile-complete',
   *   },
   * );
   * ```
   */
  complete(profileID: string, params: ProfileCompleteParams, options?: RequestOptions): APIPromise<unknown> {
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

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfProfileDetail {
  /**
   * The response data (null if error)
   */
  data?: ProfileDetail | null;

  /**
   * Error details (null if successful)
   */
  error?: WebhooksAPI.APIError | null;

  /**
   * Metadata about the request and response
   */
  meta?: WebhooksAPI.APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

/**
 * Detailed profile response for v3 API
 */
export interface ProfileDetail {
  /**
   * Profile unique identifier
   */
  id?: string;

  /**
   * Whether contacts are shared across profiles in the organization
   */
  allow_contact_sharing?: boolean;

  /**
   * Whether number changes are allowed during onboarding
   */
  allow_number_change_during_onboarding?: boolean | null;

  /**
   * Whether templates are shared across profiles in the organization
   */
  allow_template_sharing?: boolean;

  /**
   * Billing contact for this profile. Present when billing_model is "profile" or
   * "profile_and_organization".
   */
  billing_contact?: ProfileDetail.BillingContact | null;

  /**
   * Billing model: profile, organization, or profile_and_organization
   */
  billing_model?: string;

  /**
   * Brand associated with this profile. Null if no brand has been configured yet.
   * Includes KYC information and TCR registration status.
   */
  brand?: BrandsAPI.BrandWithKYC | null;

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
   * Whether this profile inherits contacts from the organization
   */
  inherit_contacts?: boolean;

  /**
   * Whether this profile inherits TCR brand from the organization
   */
  inherit_tcr_brand?: boolean;

  /**
   * Whether this profile inherits TCR campaign from the organization
   */
  inherit_tcr_campaign?: boolean;

  /**
   * Whether this profile inherits templates from the organization
   */
  inherit_templates?: boolean;

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
   * Reference to another profile for SMS/Telnyx configuration
   */
  sending_phone_number_profile_id?: string | null;

  /**
   * Reference to another profile for WhatsApp configuration
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

export namespace ProfileDetail {
  /**
   * Billing contact for this profile. Present when billing_model is "profile" or
   * "profile_and_organization".
   */
  export interface BillingContact {
    address?: string | null;

    email?: string | null;

    name?: string | null;

    phone?: string | null;
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface ProfileListResponse {
  /**
   * The response data (null if error)
   */
  data?: ProfileListResponse.Data | null;

  /**
   * Error details (null if successful)
   */
  error?: WebhooksAPI.APIError | null;

  /**
   * Metadata about the request and response
   */
  meta?: WebhooksAPI.APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace ProfileListResponse {
  /**
   * The response data (null if error)
   */
  export interface Data {
    /**
     * List of profiles in the organization
     */
    profiles?: Array<ProfilesAPI.ProfileDetail>;
  }
}

export type ProfileCompleteResponse = unknown;

export interface ProfileCreateParams {
  /**
   * Body param: Whether contacts are shared across profiles (default: false)
   */
  allow_contact_sharing?: boolean;

  /**
   * Body param: Whether templates are shared across profiles (default: false)
   */
  allow_template_sharing?: boolean;

  /**
   * Body param: Billing contact for this profile. Required when billing_model is
   * "profile" or "profile_and_organization". Identifies who receives invoices and
   * who is responsible for payment.
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
   * Body param: Brand and KYC information for this profile (optional). When
   * provided, creates the brand associated with this profile. Cannot be set when
   * inherit_tcr_brand is true.
   */
  brand?: BrandsAPI.BrandData | null;

  /**
   * Body param: Profile description (optional)
   */
  description?: string | null;

  /**
   * Body param: Profile icon URL (optional)
   */
  icon?: string | null;

  /**
   * Body param: Whether this profile inherits contacts from organization (default:
   * true)
   */
  inherit_contacts?: boolean | null;

  /**
   * Body param: Whether this profile inherits TCR brand from organization (default:
   * true)
   */
  inherit_tcr_brand?: boolean | null;

  /**
   * Body param: Whether this profile inherits TCR campaign from organization
   * (default: true)
   */
  inherit_tcr_campaign?: boolean | null;

  /**
   * Body param: Whether this profile inherits templates from organization (default:
   * true)
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
   * Body param: Direct WhatsApp Business Account credentials for this profile. When
   * provided, the profile uses its own WhatsApp Business Account instead of
   * inheriting from the organization. When omitted, the profile inherits the
   * organization's WhatsApp Business Account (requires the organization to have
   * completed WhatsApp Embedded Signup).
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
   * Billing contact for this profile. Required when billing_model is "profile" or
   * "profile_and_organization". Identifies who receives invoices and who is
   * responsible for payment.
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
   * Direct WhatsApp Business Account credentials for this profile. When provided,
   * the profile uses its own WhatsApp Business Account instead of inheriting from
   * the organization. When omitted, the profile inherits the organization's WhatsApp
   * Business Account (requires the organization to have completed WhatsApp Embedded
   * Signup).
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
   * Body param: Whether contacts are shared across profiles (optional)
   */
  allow_contact_sharing?: boolean | null;

  /**
   * Body param: Whether number changes are allowed during onboarding (optional)
   */
  allow_number_change_during_onboarding?: boolean | null;

  /**
   * Body param: Whether templates are shared across profiles (optional)
   */
  allow_template_sharing?: boolean | null;

  /**
   * Body param: Billing contact for this profile. Required when billing_model is
   * "profile" or "profile_and_organization" and no billing contact has been
   * configured yet. Identifies who receives invoices and who is responsible for
   * payment.
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
   * Body param: Brand and KYC information for this profile (optional). When
   * provided, creates or updates the brand associated with this profile. Cannot be
   * set when inherit_tcr_brand is true. Once a brand has been submitted to TCR it
   * cannot be modified.
   */
  brand?: BrandsAPI.BrandData | null;

  /**
   * Body param: Profile description (optional)
   */
  description?: string | null;

  /**
   * Body param: Profile icon URL (optional)
   */
  icon?: string | null;

  /**
   * Body param: Whether this profile inherits contacts from organization (optional)
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
   * Body param: Whether this profile inherits templates from organization (optional)
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
   * Body param: Reference to another profile to use for SMS/Telnyx configuration
   * (optional)
   */
  sending_phone_number_profile_id?: string | null;

  /**
   * Body param: Reference to another profile to use for WhatsApp configuration
   * (optional)
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
   * Billing contact for this profile. Required when billing_model is "profile" or
   * "profile_and_organization" and no billing contact has been configured yet.
   * Identifies who receives invoices and who is responsible for payment.
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
   * Body param: Request to delete a profile
   */
  body: ProfileDeleteParams.Body;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export namespace ProfileDeleteParams {
  /**
   * Request to delete a profile
   */
  export interface Body extends WebhooksAPI.MutationRequest {}
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

export declare namespace Profiles {
  export {
    type APIResponseOfProfileDetail as APIResponseOfProfileDetail,
    type ProfileDetail as ProfileDetail,
    type ProfileListResponse as ProfileListResponse,
    type ProfileCompleteResponse as ProfileCompleteResponse,
    type ProfileCreateParams as ProfileCreateParams,
    type ProfileRetrieveParams as ProfileRetrieveParams,
    type ProfileUpdateParams as ProfileUpdateParams,
    type ProfileListParams as ProfileListParams,
    type ProfileDeleteParams as ProfileDeleteParams,
    type ProfileCompleteParams as ProfileCompleteParams,
  };
}
