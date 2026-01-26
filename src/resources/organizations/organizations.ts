// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as OrganizationsAPI from './organizations';
import * as UsersAPI from './users';
import {
  CustomerUser,
  UserDeleteParams,
  UserInviteParams,
  UserListParams,
  UserListResponse,
  UserRetrieveParams,
  UserUpdateRoleParams,
  Users,
} from './users';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Organizations extends APIResource {
  users: UsersAPI.Users = new UsersAPI.Users(this._client);

  /**
   * Retrieves all organizations that the authenticated user has access to, including
   * the sender profiles within each organization that the user can access. Returns
   * organization details with nested profiles filtered by user permissions.
   *
   * @example
   * ```ts
   * const organizations = await client.organizations.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<OrganizationListResponse> {
    return this._client.get('/v2/organizations', options);
  }

  /**
   * Retrieves all sender profiles within an organization that the authenticated user
   * has access to. Returns filtered list based on user's permissions.
   *
   * @example
   * ```ts
   * const response =
   *   await client.organizations.retrieveProfiles(
   *     '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
   *     {
   *       'x-api-key': '',
   *       'x-sender-id': '00000000-0000-0000-0000-000000000000',
   *     },
   *   );
   * ```
   */
  retrieveProfiles(
    orgID: string,
    params: OrganizationRetrieveProfilesParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationRetrieveProfilesResponse> {
    const { 'x-api-key': xAPIKey, 'x-sender-id': xSenderID } = params;
    return this._client.get(path`/v2/organizations/${orgID}/profiles`, {
      ...options,
      headers: buildHeaders([{ 'x-api-key': xAPIKey, 'x-sender-id': xSenderID }, options?.headers]),
    });
  }
}

export interface ProfileSummary {
  id?: string;

  createdAt?: string;

  description?: string | null;

  icon?: string | null;

  name?: string;

  shortName?: string | null;
}

export interface OrganizationListResponse {
  organizations?: Array<OrganizationListResponse.Organization>;
}

export namespace OrganizationListResponse {
  export interface Organization {
    id?: string;

    createdAt?: string;

    description?: string | null;

    icon?: string | null;

    name?: string;

    profiles?: Array<OrganizationsAPI.ProfileSummary>;
  }
}

export interface OrganizationRetrieveProfilesResponse {
  organizationId?: string;

  profiles?: Array<ProfileSummary>;
}

export interface OrganizationRetrieveProfilesParams {
  'x-api-key': string;

  'x-sender-id': string;
}

Organizations.Users = Users;

export declare namespace Organizations {
  export {
    type ProfileSummary as ProfileSummary,
    type OrganizationListResponse as OrganizationListResponse,
    type OrganizationRetrieveProfilesResponse as OrganizationRetrieveProfilesResponse,
    type OrganizationRetrieveProfilesParams as OrganizationRetrieveProfilesParams,
  };

  export {
    Users as Users,
    type CustomerUser as CustomerUser,
    type UserListResponse as UserListResponse,
    type UserRetrieveParams as UserRetrieveParams,
    type UserListParams as UserListParams,
    type UserDeleteParams as UserDeleteParams,
    type UserInviteParams as UserInviteParams,
    type UserUpdateRoleParams as UserUpdateRoleParams,
  };
}
