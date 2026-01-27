// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Users extends APIResource {
  /**
   * Retrieves detailed information about a user invitation using the invitation
   * token. Verifies that the invitation belongs to the specified profile. This
   * endpoint is public and does not require authentication.
   *
   * @example
   * ```ts
   * const invitationDetails =
   *   await client.organizations.profiles.users.retrieveInvitationDetails(
   *     'invitation-token-example',
   *     {
   *       customerId: '550e8400-e29b-41d4-a716-446655440000',
   *       profileId: '660e8400-e29b-41d4-a716-446655440000',
   *     },
   *   );
   * ```
   */
  retrieveInvitationDetails(
    token: string,
    params: UserRetrieveInvitationDetailsParams,
    options?: RequestOptions,
  ): APIPromise<InvitationDetails> {
    const { customerId, profileId } = params;
    return this._client.get(
      path`/v3/organizations/${customerId}/profiles/${profileId}/users/invitations/${token}`,
      options,
    );
  }
}

export interface InvitationDetails {
  email?: string;

  invitationExpiresAt?: string;

  invitationSentAt?: string;

  isExpired?: boolean;

  name?: string;

  organizationId?: string;

  organizationName?: string;

  profileId?: string | null;

  profileName?: string | null;

  role?: string;

  status?: string;

  userId?: string;
}

export interface UserRetrieveInvitationDetailsParams {
  customerId: string;

  profileId: string;
}

export declare namespace Users {
  export {
    type InvitationDetails as InvitationDetails,
    type UserRetrieveInvitationDetailsParams as UserRetrieveInvitationDetailsParams,
  };
}
