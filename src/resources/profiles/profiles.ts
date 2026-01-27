// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TemplatesAPI from '../templates';
import * as ContactsAPI from './contacts';
import {
  ContactListItemProfile,
  ContactListParams,
  ContactListResponse,
  ContactRetrieveParams,
  Contacts,
} from './contacts';
import * as UsersAPI from './users';
import {
  BaseDto,
  CustomerUserDto,
  InviteUserRequest,
  InviteUserResponse,
  UpdateUserRoleRequest,
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

export class Profiles extends APIResource {
  users: UsersAPI.Users = new UsersAPI.Users(this._client);
  contacts: ContactsAPI.Contacts = new ContactsAPI.Contacts(this._client);

  /**
   * Retrieves templates for a specific profile, including inherited templates from
   * sibling profiles (if inheritance is enabled). Includes metadata about ownership
   * and permissions for each template.
   *
   * @example
   * ```ts
   * const response = await client.profiles.listTemplates(
   *   '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
   *   { page: 0, pageSize: 0 },
   * );
   * ```
   */
  listTemplates(
    profileID: string,
    query: ProfileListTemplatesParams,
    options?: RequestOptions,
  ): APIPromise<ProfileListTemplatesResponse> {
    return this._client.get(path`/v3/profiles/${profileID}/templates`, { query, ...options });
  }

  /**
   * Sends a message to a specific contact using a template through a profile. The
   * message can be sent via SMS or WhatsApp depending on the contact's capabilities.
   * The profile must have access to both the contact and the template (either owned
   * or inherited).
   *
   * @example
   * ```ts
   * await client.profiles.sendMessage(
   *   '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
   *   {
   *     contactId: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
   *     templateId: '8ba7b830-9dad-11d1-80b4-00c04fd430c8',
   *   },
   * );
   * ```
   */
  sendMessage(profileID: string, body: ProfileSendMessageParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/v3/profiles/${profileID}/messages`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface ProfileListTemplatesResponse {
  items?: Array<ProfileListTemplatesResponse.Item>;

  page?: number;

  pageSize?: number;

  totalCount?: number;

  totalPages?: number;
}

export namespace ProfileListTemplatesResponse {
  export interface Item extends UsersAPI.BaseDto {
    canDelete?: boolean;

    canEdit?: boolean;

    category?: string;

    createdBy?: string | null;

    creationSource?: string;

    customerId?: string;

    /**
     * Complete definition of a message template including header, body, footer, and
     * buttons
     */
    definition?: TemplatesAPI.TemplateDefinition;

    deletedAt?: string | null;

    deletedTemplateSnapshot?: string | null;

    displayName?: string;

    isDeleted?: boolean;

    isInherited?: boolean;

    isPublished?: boolean;

    language?: string;

    ownerId?: string;

    source?: string;

    status?: string;

    updatedBy?: string | null;

    /**
     * Unified POCO for handling all possible return types from POST /message_templates
     * endpoint. Can represent either successful template creation or error responses
     * from Facebook Graph API.
     *
     * Success Response Example: { "id": "572279198452421", "status": "PENDING",
     * "category": "MARKETING" }
     *
     * Error Response Example: { "error": { "message": "Description of the error",
     * "type": "OAuthException", "code": 190 } }
     */
    whatsappResponse?: Item.WhatsappResponse | null;

    whatsappTemplateId?: string;

    whatsappTemplateName?: string;
  }

  export namespace Item {
    /**
     * Unified POCO for handling all possible return types from POST /message_templates
     * endpoint. Can represent either successful template creation or error responses
     * from Facebook Graph API.
     *
     * Success Response Example: { "id": "572279198452421", "status": "PENDING",
     * "category": "MARKETING" }
     *
     * Error Response Example: { "error": { "message": "Description of the error",
     * "type": "OAuthException", "code": 190 } }
     */
    export interface WhatsappResponse {
      id?: string | null;

      category?: string | null;

      error?: WhatsappResponse.Error | null;

      rejected_reason?: string | null;

      status?: string | null;
    }

    export namespace WhatsappResponse {
      export interface Error {
        code?: number;

        error_data?: Error.ErrorData;

        error_subcode?: number;

        error_user_msg?: string;

        error_user_title?: string;

        fbtrace_id?: string;

        is_transient?: boolean;

        message?: string;

        type?: string;
      }

      export namespace Error {
        export interface ErrorData {
          blame_field_specs?: Array<Array<string>>;
        }
      }
    }
  }
}

export interface ProfileListTemplatesParams {
  /**
   * The page number (1-indexed). Default is 1.
   */
  page: number;

  /**
   * The number of items per page. Default is 20.
   */
  pageSize: number;

  /**
   * Optional category filter
   */
  category?: string | null;

  /**
   * Optional search term to filter templates by display name
   */
  searchTerm?: string | null;

  /**
   * Optional status filter (e.g., "APPROVED", "PENDING", "DRAFT")
   */
  status?: string | null;
}

export interface ProfileSendMessageParams {
  /**
   * The unique identifier of the contact to send the message to
   */
  contactId: string;

  /**
   * The unique identifier of the template to use for the message
   */
  templateId: string;

  /**
   * Optional key-value pairs of template variables to replace in the template body.
   * For example, if your template contains "Hello {{name}}", you would provide {
   * "name": "John Doe" }
   */
  templateVariables?: { [key: string]: string } | null;
}

Profiles.Users = Users;
Profiles.Contacts = Contacts;

export declare namespace Profiles {
  export {
    type ProfileListTemplatesResponse as ProfileListTemplatesResponse,
    type ProfileListTemplatesParams as ProfileListTemplatesParams,
    type ProfileSendMessageParams as ProfileSendMessageParams,
  };

  export {
    Users as Users,
    type BaseDto as BaseDto,
    type CustomerUserDto as CustomerUserDto,
    type InviteUserRequest as InviteUserRequest,
    type InviteUserResponse as InviteUserResponse,
    type UpdateUserRoleRequest as UpdateUserRoleRequest,
    type UserListResponse as UserListResponse,
    type UserRetrieveParams as UserRetrieveParams,
    type UserListParams as UserListParams,
    type UserDeleteParams as UserDeleteParams,
    type UserInviteParams as UserInviteParams,
    type UserUpdateRoleParams as UserUpdateRoleParams,
  };

  export {
    Contacts as Contacts,
    type ContactListItemProfile as ContactListItemProfile,
    type ContactListResponse as ContactListResponse,
    type ContactRetrieveParams as ContactRetrieveParams,
    type ContactListParams as ContactListParams,
  };
}
