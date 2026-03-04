// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MeAPI from './me';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Retrieve account details
 */
export class Me extends APIResource {
  /**
   * Returns the account associated with the API key. For organization API keys,
   * returns the organization with its profiles. For profile API keys, returns the
   * profile with its settings.
   */
  retrieve(options?: RequestOptions): APIPromise<MeRetrieveResponse> {
    return this._client.get('/v3/me', options);
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
   * The response data (null if error)
   */
  data?: MeRetrieveResponse.Data | null;

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

export namespace MeRetrieveResponse {
  /**
   * The response data (null if error)
   */
  export interface Data {
    /**
     * Customer ID (organization or profile)
     */
    id?: string;

    /**
     * When the account was created
     */
    created_at?: string;

    /**
     * Account description
     */
    description?: string | null;

    /**
     * Account icon URL
     */
    icon?: string | null;

    /**
     * Account name
     */
    name?: string;

    /**
     * List of profiles (only for organization type)
     */
    profiles?: Array<Data.Profile> | null;

    /**
     * Profile settings (only for profile type)
     */
    settings?: MeAPI.ProfileSettings | null;

    /**
     * Profile status (only for profile type): incomplete, pending_review, approved,
     * etc.
     */
    status?: string | null;
  }

  export namespace Data {
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

export declare namespace Me {
  export { type ProfileSettings as ProfileSettings, type MeRetrieveResponse as MeRetrieveResponse };
}
