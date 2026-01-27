// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as UsersAPI from './users';
import { InvitationDetails, UserRetrieveInvitationDetailsParams, Users } from './users';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Profiles extends APIResource {
  users: UsersAPI.Users = new UsersAPI.Users(this._client);

  /**
   * Retrieves all sender profiles within an organization that the authenticated user
   * has access to. Returns filtered list based on user's permissions.
   *
   * @example
   * ```ts
   * const profiles = await client.organizations.profiles.list(
   *   '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
   * );
   * ```
   */
  list(orgID: string, options?: RequestOptions): APIPromise<ProfileListResponse> {
    return this._client.get(path`/v2/organizations/${orgID}/profiles`, options);
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

export interface ProfileListResponse {
  organizationId?: string;

  profiles?: Array<ProfileSummary>;
}

Profiles.Users = Users;

export declare namespace Profiles {
  export { type ProfileSummary as ProfileSummary, type ProfileListResponse as ProfileListResponse };

  export {
    Users as Users,
    type InvitationDetails as InvitationDetails,
    type UserRetrieveInvitationDetailsParams as UserRetrieveInvitationDetailsParams,
  };
}
