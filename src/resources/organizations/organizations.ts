// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as UsersAPI from './users';
import {
  UserCreateOrInviteParams,
  UserDeleteByCustomerParams,
  UserDeleteParams,
  UserInviteParams,
  UserListByCustomerParams,
  UserListByCustomerResponse,
  UserListParams,
  UserRetrieveByCustomerParams,
  UserRetrieveInvitationDetailsParams,
  UserRetrieveParams,
  UserUpdateRoleByCustomerParams,
  UserUpdateRoleParams,
  Users,
} from './users';
import * as ProfilesAPI from './profiles/profiles';
import { ProfileListResponse, ProfileSummary, Profiles } from './profiles/profiles';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Organizations extends APIResource {
  profiles: ProfilesAPI.Profiles = new ProfilesAPI.Profiles(this._client);
  users: UsersAPI.Users = new UsersAPI.Users(this._client);

  /**
   * Retrieves all organizations that the authenticated user has access to, including
   * the sender profiles within each organization that the user can access. Returns
   * organization details with nested profiles filtered by user permissions.
   *
   * @example
   * ```ts
   * const response =
   *   await client.organizations.listAuthenticatedUserOrganizations();
   * ```
   */
  listAuthenticatedUserOrganizations(
    options?: RequestOptions,
  ): APIPromise<OrganizationListAuthenticatedUserOrganizationsResponse> {
    return this._client.get('/v2/organizations', options);
  }
}

export interface OrganizationListAuthenticatedUserOrganizationsResponse {
  organizations?: Array<OrganizationListAuthenticatedUserOrganizationsResponse.Organization>;
}

export namespace OrganizationListAuthenticatedUserOrganizationsResponse {
  export interface Organization {
    id?: string;

    createdAt?: string;

    description?: string | null;

    icon?: string | null;

    name?: string;

    profiles?: Array<ProfilesAPI.ProfileSummary>;
  }
}

Organizations.Profiles = Profiles;
Organizations.Users = Users;

export declare namespace Organizations {
  export { type OrganizationListAuthenticatedUserOrganizationsResponse as OrganizationListAuthenticatedUserOrganizationsResponse };

  export {
    Profiles as Profiles,
    type ProfileSummary as ProfileSummary,
    type ProfileListResponse as ProfileListResponse,
  };

  export {
    Users as Users,
    type UserListByCustomerResponse as UserListByCustomerResponse,
    type UserRetrieveParams as UserRetrieveParams,
    type UserListParams as UserListParams,
    type UserDeleteParams as UserDeleteParams,
    type UserCreateOrInviteParams as UserCreateOrInviteParams,
    type UserDeleteByCustomerParams as UserDeleteByCustomerParams,
    type UserInviteParams as UserInviteParams,
    type UserListByCustomerParams as UserListByCustomerParams,
    type UserRetrieveByCustomerParams as UserRetrieveByCustomerParams,
    type UserRetrieveInvitationDetailsParams as UserRetrieveInvitationDetailsParams,
    type UserUpdateRoleParams as UserUpdateRoleParams,
    type UserUpdateRoleByCustomerParams as UserUpdateRoleByCustomerParams,
  };
}
