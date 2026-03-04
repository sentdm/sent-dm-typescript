// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ProfilesAPI from './profiles';
import * as WebhooksAPI from './webhooks';
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
   * @example
   * ```ts
   * const apiResponseOfProfileDetail =
   *   await client.profiles.create();
   * ```
   */
  create(params: ProfileCreateParams, options?: RequestOptions): APIPromise<APIResponseOfProfileDetail> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/v3/profiles', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves detailed information about a specific sender profile within an
   * organization.
   *
   * @example
   * ```ts
   * const apiResponseOfProfileDetail =
   *   await client.profiles.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieve(profileID: string, options?: RequestOptions): APIPromise<APIResponseOfProfileDetail> {
    return this._client.get(path`/v3/profiles/${profileID}`, options);
  }

  /**
   * Updates a profile's configuration and settings. Requires admin role in the
   * organization. Only provided fields will be updated (partial update).
   *
   * @example
   * ```ts
   * const apiResponseOfProfileDetail =
   *   await client.profiles.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  update(
    profileID: string,
    params: ProfileUpdateParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfProfileDetail> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.patch(path`/v3/profiles/${profileID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves all sender profiles within an organization. Profiles represent
   * different brands, departments, or use cases within an organization, each with
   * their own messaging configuration.
   *
   * @example
   * ```ts
   * const profiles = await client.profiles.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<ProfileListResponse> {
    return this._client.get('/v3/profiles', options);
  }

  /**
   * Soft deletes a sender profile. The profile will be marked as deleted but data is
   * retained. Requires admin role in the organization.
   *
   * @example
   * ```ts
   * await client.profiles.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(profileID: string, body: ProfileDeleteParams, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v3/profiles/${profileID}`, {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': '*/*', Accept: '*/*' }, options?.headers]),
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
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post(path`/v3/profiles/${profileID}/complete`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
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
   * Profile name
   */
  name?: string;

  /**
   * Parent organization ID
   */
  organization_id?: string | null;

  /**
   * Profile configuration settings
   */
  settings?: ProfileDetail.Settings;

  /**
   * Profile short name (abbreviation)
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
}

export namespace ProfileDetail {
  /**
   * Profile configuration settings
   */
  export interface Settings {
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
     * Billing model: profile, organization, or profile_and_organization
     */
    billing_model?: string;

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
     * Direct WhatsApp phone number
     */
    whatsapp_phone_number?: string | null;
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
   * Body param: Billing model: profile, organization, or profile_and_organization
   * (default: profile)
   */
  billing_model?: string | null;

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
   * Body param: Profile short name/abbreviation (optional)
   */
  short_name?: string | null;

  /**
   * Body param: Test mode flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  test_mode?: boolean;

  /**
   * Header param: Unique key to ensure idempotent request processing. Must be 1-255
   * alphanumeric characters, hyphens, or underscores. Responses are cached for 24
   * hours per key per customer.
   */
  'Idempotency-Key'?: string;
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
   * Body param: Billing model: profile, organization, or profile_and_organization
   * (optional)
   */
  billing_model?: string | null;

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
   * Body param: Profile ID from route parameter
   */
  profile_id?: string;

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
   * Body param: Profile short name/abbreviation (optional)
   */
  short_name?: string | null;

  /**
   * Body param: Test mode flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  test_mode?: boolean;

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
}

export interface ProfileDeleteParams {
  /**
   * Profile ID from route parameter
   */
  profile_id?: string;

  /**
   * Test mode flag - when true, the operation is simulated without side effects
   * Useful for testing integrations without actual execution
   */
  test_mode?: boolean;
}

export interface ProfileCompleteParams {
  /**
   * Body param: Webhook URL to call when profile completion finishes (success or
   * failure)
   */
  webHookUrl: string;

  /**
   * Body param: Test mode flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  test_mode?: boolean;

  /**
   * Header param: Unique key to ensure idempotent request processing. Must be 1-255
   * alphanumeric characters, hyphens, or underscores. Responses are cached for 24
   * hours per key per customer.
   */
  'Idempotency-Key'?: string;
}

export declare namespace Profiles {
  export {
    type APIResponseOfProfileDetail as APIResponseOfProfileDetail,
    type ProfileDetail as ProfileDetail,
    type ProfileListResponse as ProfileListResponse,
    type ProfileCompleteResponse as ProfileCompleteResponse,
    type ProfileCreateParams as ProfileCreateParams,
    type ProfileUpdateParams as ProfileUpdateParams,
    type ProfileDeleteParams as ProfileDeleteParams,
    type ProfileCompleteParams as ProfileCompleteParams,
  };
}
