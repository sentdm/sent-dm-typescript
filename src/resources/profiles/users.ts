// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';

export class Users extends APIResource {}

export interface BaseDto {
  /**
   * Unique identifier
   */
  id?: string;

  createdAt?: string;

  updatedAt?: string | null;
}

export interface CustomerUserDto extends BaseDto {
  customerId?: string;

  email?: string;

  invitationSentAt?: string | null;

  invitationToken?: string | null;

  invitationTokenExpiresAt?: string | null;

  lastLoginAt?: string | null;

  name?: string;

  role?: string;

  status?: string;
}

export declare namespace Users {
  export { type BaseDto as BaseDto, type CustomerUserDto as CustomerUserDto };
}
