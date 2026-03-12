// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MeAPI from './me';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * Retrieve account details
 */
export class Me extends APIResource {
  /**
   * Returns the account associated with the provided API key. The response includes
   * account identity, contact information, messaging channel configuration, and —
   * depending on the account type — either a list of child profiles or the profile's
   * own settings.
   *
   * **Account types:**
   *
   * - `organization` — Has child profiles. The `profiles` array is populated.
   * - `user` — Standalone account with no profiles.
   * - `profile` — Child of an organization. Includes `organization_id`,
   *   `short_name`, `status`, and `settings`.
   *
   * **Channels:** The `channels` object always includes `sms`, `whatsapp`, and
   * `rcs`. Each channel has a `configured` boolean. Configured channels expose
   * additional details such as `phone_number`.
   */
  retrieve(
    params: MeRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MeRetrieveResponse> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get('/v3/me', {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * Profile configuration settings
 */
export interface ProfileSettings {
  /**
   * Whether contacts are shared across profiles in the organization
   */
  allow_contact_sharing?: boolean | null;

  /**
   * Whether templates are shared across profiles in the organization
   */
  allow_template_sharing?: boolean | null;

  /**
   * Billing model: profile, organization, or profile_and_organization
   */
  billing_model?: string | null;

  /**
   * Whether this profile inherits contacts from the organization
   */
  inherit_contacts?: boolean | null;

  /**
   * Whether this profile inherits TCR brand from the organization
   */
  inherit_tcr_brand?: boolean | null;

  /**
   * Whether this profile inherits TCR campaign from the organization
   */
  inherit_tcr_campaign?: boolean | null;

  /**
   * Whether this profile inherits templates from the organization
   */
  inherit_templates?: boolean | null;
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface MeRetrieveResponse {
  /**
   * Account response for GET /v3/me endpoint. Returns organization (with profiles),
   * user (standalone), or profile (child of an organization) data depending on the
   * API key type. Always includes messaging channel configuration.
   */
  data?: MeRetrieveResponse.Data | null;

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

export namespace MeRetrieveResponse {
  /**
   * Account response for GET /v3/me endpoint. Returns organization (with profiles),
   * user (standalone), or profile (child of an organization) data depending on the
   * API key type. Always includes messaging channel configuration.
   */
  export interface Data {
    /**
     * Customer ID (organization, account, or profile)
     */
    id?: string;

    /**
     * Messaging channel configuration. All three channels are always present. Each
     * channel has a "configured" flag; configured channels expose additional details.
     */
    channels?: Data.Channels;

    /**
     * When the account was created
     */
    created_at?: string;

    /**
     * Account description
     */
    description?: string | null;

    /**
     * Contact email address
     */
    email?: string | null;

    /**
     * Account icon URL
     */
    icon?: string | null;

    /**
     * Account name
     */
    name?: string;

    /**
     * Organization ID (only for profile type — the parent organization)
     */
    organization_id?: string | null;

    /**
     * List of profiles (populated for organization type, empty for user and profile
     * types)
     */
    profiles?: Array<Data.Profile>;

    /**
     * Profile configuration settings
     */
    settings?: MeAPI.ProfileSettings | null;

    /**
     * Short name / abbreviation (only for profile type)
     */
    short_name?: string | null;

    /**
     * Profile status (only for profile type): incomplete, pending_review, approved,
     * etc.
     */
    status?: string | null;

    /**
     * Account type: "organization" (has profiles), "user" (no profiles), or "profile"
     * (child of an organization)
     */
    type?: string;
  }

  export namespace Data {
    /**
     * Messaging channel configuration. All three channels are always present. Each
     * channel has a "configured" flag; configured channels expose additional details.
     */
    export interface Channels {
      /**
       * RCS channel configuration. When configured, includes the RCS phone number.
       */
      rcs?: Channels.Rcs;

      /**
       * SMS channel configuration. When configured, includes the sending phone number.
       */
      sms?: Channels.SMS;

      /**
       * WhatsApp Business channel configuration. When configured, includes the WhatsApp
       * phone number and business name.
       */
      whatsapp?: Channels.Whatsapp;
    }

    export namespace Channels {
      /**
       * RCS channel configuration. When configured, includes the RCS phone number.
       */
      export interface Rcs {
        /**
         * Whether RCS is configured for this account
         */
        configured?: boolean;

        /**
         * RCS-enabled phone number in E.164 format
         */
        phone_number?: string | null;
      }

      /**
       * SMS channel configuration. When configured, includes the sending phone number.
       */
      export interface SMS {
        /**
         * Whether SMS is configured for this account
         */
        configured?: boolean;

        /**
         * Sending phone number in E.164 format
         */
        phone_number?: string | null;
      }

      /**
       * WhatsApp Business channel configuration. When configured, includes the WhatsApp
       * phone number and business name.
       */
      export interface Whatsapp {
        /**
         * WhatsApp Business display name
         */
        business_name?: string | null;

        /**
         * Whether WhatsApp is configured for this account
         */
        configured?: boolean;

        /**
         * WhatsApp phone number in E.164 format
         */
        phone_number?: string | null;
      }
    }

    /**
     * Profile (sender profile) response for v3 API
     */
    export interface Profile {
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
       * Profile icon URL
       */
      icon?: string | null;

      /**
       * Profile name
       */
      name?: string;

      /**
       * User's role in this profile: admin, billing, developer (inherited from
       * organization if not explicitly set)
       */
      role?: string | null;

      /**
       * Profile configuration settings
       */
      settings?: MeAPI.ProfileSettings;

      /**
       * Profile short name (abbreviation)
       */
      short_name?: string | null;

      /**
       * Profile setup status: incomplete, pending_review, approved, rejected
       */
      status?: string | null;
    }
  }
}

export interface MeRetrieveParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export declare namespace Me {
  export {
    type ProfileSettings as ProfileSettings,
    type MeRetrieveResponse as MeRetrieveResponse,
    type MeRetrieveParams as MeRetrieveParams,
  };
}
