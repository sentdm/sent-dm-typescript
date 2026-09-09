// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MeAPI from './me';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * Who the current key is.
 *
 * `GET /v3/me` answers with the account the key authenticates as, which is the quickest way to tell a live key from a test one, an organization key from a sender profile's, and to confirm `x-profile-id` resolved to the profile you meant.
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
   *
   * **Sending number:** `sending_phone_number` is the account's US SMS sender. It is
   * intentionally the same value as `channels.sms.phone_number` — the two are kept
   * in step, and it is published under both names because `sending_phone_number` is
   * what this value is called on `GET /v3/profiles`. Read either. One difference:
   * `sending_phone_number` is always present, including as `null`, while
   * `channels.sms.phone_number` is omitted when there is no sender.
   *
   * `sending_phone_number_profile_id` names the account that holds that number in
   * inventory — normally this account, and a different one where a number is shared.
   * Both are `null` when the account has no US SMS sender.
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
   * @deprecated Always false. A profile no longer shares contacts with sibling
   * profiles — it sees only what it owns. Retained so existing v3 clients reading
   * allow_contact_sharing keep deserializing; it carries no information.
   */
  allow_contact_sharing?: boolean | null;

  /**
   * @deprecated Always false. A profile no longer shares templates with sibling
   * profiles. Retained so existing v3 clients reading allow_template_sharing keep
   * deserializing; it carries no information.
   */
  allow_template_sharing?: boolean | null;

  /**
   * Billing model: profile, organization, or profile_and_organization
   */
  billing_model?: string | null;

  /**
   * @deprecated Always false. A profile no longer inherits its organization's
   * contacts. Retained so existing v3 clients reading inherit_contacts keep
   * deserializing; it carries no information.
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
   * @deprecated Always false. A profile no longer inherits its organization's
   * templates. Retained so existing v3 clients reading inherit_templates keep
   * deserializing; it carries no information.
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
     * The SMS sender this account sends from in the United States, in E.164 form. Null
     * when the account has no US SMS sender.
     *
     * The same value as channels.sms.phone_number, published under both names on
     * purpose: sending_phone_number is what this value is already called on GET
     * /v3/profiles, so the same key answers the same question whichever of the two
     * endpoints you ask. Neither name is preferred over the other and neither is
     * deprecated.
     *
     * The same value, not the same presence: this key is always written, including as
     * null, whereas channels.sms.phone_number is left out entirely when there is no
     * sender.
     */
    sending_phone_number?: string | null;

    /**
     * The account that holds sending_phone_number in number inventory: normally this
     * account itself, and a different account when the number is held elsewhere. Null
     * when there is no US sender, or when the sender is not a number drawn from
     * inventory — an alphanumeric sender ID or a short code.
     */
    sending_phone_number_profile_id?: string | null;

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
