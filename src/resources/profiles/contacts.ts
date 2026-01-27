// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Contacts extends APIResource {
  /**
   * Retrieves a specific contact by its ID for the given profile. Returns metadata
   * about ownership and permissions. The contact must be accessible to the profile
   * (either owned or inherited).
   *
   * @example
   * ```ts
   * const contactListItemProfile =
   *   await client.profiles.contacts.retrieve(
   *     '7ba7b810-9dad-11d1-80b4-00c04fd430c8',
   *     { profileId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' },
   *   );
   * ```
   */
  retrieve(
    contactID: string,
    params: ContactRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ContactListItemProfile> {
    const { profileId } = params;
    return this._client.get(path`/v3/profiles/${profileId}/contacts/${contactID}`, options);
  }

  /**
   * Retrieves contacts for a specific profile, including inherited contacts from
   * parent organization and sibling profiles (if inheritance is enabled). The
   * isInherited flag indicates if a contact is inherited. Clients should compute
   * permissions based on isInherited and the profile's allowContactSharing setting.
   *
   * @example
   * ```ts
   * const contacts = await client.profiles.contacts.list(
   *   '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
   *   { page: 0, pageSize: 0 },
   * );
   * ```
   */
  list(
    profileID: string,
    query: ContactListParams,
    options?: RequestOptions,
  ): APIPromise<ContactListResponse> {
    return this._client.get(path`/v3/profiles/${profileID}/contacts`, { query, ...options });
  }
}

export interface ContactListItemProfile {
  id?: string;

  availableChannels?: string;

  countryCode?: string;

  customerCreatedAt?: string;

  customerUpdatedAt?: string;

  defaultChannel?: string;

  formatE164?: string;

  formatInternational?: string;

  formatNational?: string;

  formatRfc?: string;

  isInherited?: boolean;

  isPossible?: boolean;

  isValid?: boolean;

  locationDescription?: string;

  numberType?: string;

  optOut?: boolean;

  phoneNumber?: string;

  phoneTimezones?: string;

  possibleReason?: string;

  regionCode?: string;

  verified?: boolean;
}

export interface ContactListResponse {
  items?: Array<ContactListItemProfile>;

  page?: number;

  pageSize?: number;

  totalCount?: number;

  totalPages?: number;
}

export interface ContactRetrieveParams {
  /**
   * The profile ID from the route path
   */
  profileId: string;
}

export interface ContactListParams {
  /**
   * The page number (1-based indexing). Default is 1.
   */
  page: number;

  /**
   * The number of items per page. Default is 20.
   */
  pageSize: number;

  /**
   * Optional channel filter (e.g., "sms", "whatsapp")
   */
  channel?: string | null;

  /**
   * Optional search term to filter contacts by phone number
   */
  searchTerm?: string | null;
}

export declare namespace Contacts {
  export {
    type ContactListItemProfile as ContactListItemProfile,
    type ContactListResponse as ContactListResponse,
    type ContactRetrieveParams as ContactRetrieveParams,
    type ContactListParams as ContactListParams,
  };
}
