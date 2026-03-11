// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TemplatesAPI from './templates';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage message templates with variable substitution
 */
export class Templates extends APIResource {
  /**
   * Creates a new message template with header, body, footer, and buttons. The
   * template can be submitted for review immediately or saved as draft for later
   * submission.
   *
   * @example
   * ```ts
   * const apiResponseTemplate = await client.templates.create();
   * ```
   */
  create(params: TemplateCreateParams, options?: RequestOptions): APIPromise<APIResponseTemplate> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post('/v3/templates', {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined),
          ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves a specific template by its ID. Returns template details including
   * name, category, language, status, and definition.
   *
   * @example
   * ```ts
   * const apiResponseTemplate = await client.templates.retrieve(
   *   '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
   * );
   * ```
   */
  retrieve(
    id: string,
    params: TemplateRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseTemplate> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/templates/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Updates an existing template's name, category, language, definition, or submits
   * it for review.
   *
   * @example
   * ```ts
   * const apiResponseTemplate = await client.templates.update(
   *   '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
   * );
   * ```
   */
  update(
    id: string,
    params: TemplateUpdateParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseTemplate> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.put(path`/v3/templates/${id}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined),
          ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves a paginated list of message templates for the authenticated customer.
   * Supports filtering by status, category, and search term.
   *
   * @example
   * ```ts
   * const templates = await client.templates.list({
   *   page: 0,
   *   page_size: 0,
   * });
   * ```
   */
  list(params: TemplateListParams, options?: RequestOptions): APIPromise<TemplateListResponse> {
    const { 'x-profile-id': xProfileID, ...query } = params;
    return this._client.get('/v3/templates', {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Deletes a template by ID. Optionally, you can also delete the template from
   * WhatsApp/Meta by setting delete_from_meta=true.
   *
   * @example
   * ```ts
   * await client.templates.delete(
   *   '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
   * );
   * ```
   */
  delete(id: string, params: TemplateDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { 'x-profile-id': xProfileID, ...body } = params;
    return this._client.delete(path`/v3/templates/${id}`, {
      body,
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseTemplate {
  /**
   * The response data (null if error)
   */
  data?: Template | null;

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

/**
 * Template response for v3 API
 */
export interface Template {
  /**
   * Unique template identifier
   */
  id?: string;

  /**
   * Template category: MARKETING, UTILITY, AUTHENTICATION
   */
  category?: string;

  /**
   * Supported channels: sms, whatsapp
   */
  channels?: Array<string> | null;

  /**
   * When the template was created
   */
  created_at?: string;

  /**
   * Whether the template is published and active
   */
  is_published?: boolean;

  /**
   * Template language code (e.g., en_US)
   */
  language?: string;

  /**
   * Template display name
   */
  name?: string;

  /**
   * Template status: APPROVED, PENDING, REJECTED
   */
  status?: string;

  /**
   * When the template was last updated
   */
  updated_at?: string | null;

  /**
   * Template variables for personalization
   */
  variables?: Array<string> | null;
}

export interface TemplateBodyContent {
  template?: string;

  type?: string | null;

  variables?: Array<TemplateVariable> | null;
}

/**
 * Complete definition of a message template including header, body, footer, and
 * buttons
 */
export interface TemplateDefinition {
  /**
   * Required template body with content for different channels (multi-channel,
   * SMS-specific, or WhatsApp-specific)
   */
  body: TemplateDefinition.Body;

  /**
   * Configuration specific to AUTHENTICATION category templates (optional)
   */
  authenticationConfig?: TemplateDefinition.AuthenticationConfig | null;

  /**
   * Optional list of interactive buttons (e.g., quick replies, URLs, phone numbers)
   */
  buttons?: Array<TemplateDefinition.Button> | null;

  /**
   * The version of the template definition format
   */
  definitionVersion?: string | null;

  /**
   * Optional template footer with optional variables
   */
  footer?: TemplateDefinition.Footer | null;

  /**
   * Optional template header with optional variables
   */
  header?: TemplateDefinition.Header | null;
}

export namespace TemplateDefinition {
  /**
   * Required template body with content for different channels (multi-channel,
   * SMS-specific, or WhatsApp-specific)
   */
  export interface Body {
    /**
     * Content that will be used for all channels (SMS and WhatsApp) unless
     * channel-specific content is provided
     */
    multiChannel?: TemplatesAPI.TemplateBodyContent | null;

    /**
     * SMS-specific content that overrides multi-channel content for SMS messages
     */
    sms?: TemplatesAPI.TemplateBodyContent | null;

    /**
     * WhatsApp-specific content that overrides multi-channel content for WhatsApp
     * messages
     */
    whatsapp?: TemplatesAPI.TemplateBodyContent | null;
  }

  /**
   * Configuration specific to AUTHENTICATION category templates (optional)
   */
  export interface AuthenticationConfig {
    /**
     * Whether to add the security recommendation text: "For your security, do not
     * share this code."
     */
    addSecurityRecommendation?: boolean;

    /**
     * Code expiration time in minutes (1-90). If set, adds footer: "This code expires
     * in X minutes."
     */
    codeExpirationMinutes?: number | null;
  }

  /**
   * Interactive button in a message template
   */
  export interface Button {
    /**
     * The unique identifier of the button (1-based index)
     */
    id?: number;

    /**
     * Properties specific to the button type
     */
    props?: Button.Props;

    /**
     * The type of button (e.g., QUICK_REPLY, URL, PHONE_NUMBER, VOICE_CALL, COPY_CODE)
     */
    type?: string;
  }

  export namespace Button {
    /**
     * Properties specific to the button type
     */
    export interface Props {
      activeFor?: number | null;

      autofillText?: string | null;

      countryCode?: string | null;

      offerCode?: string | null;

      otpType?: string | null;

      packageName?: string | null;

      phoneNumber?: string | null;

      quickReplyType?: string | null;

      signatureHash?: string | null;

      text?: string | null;

      url?: string | null;

      urlType?: string | null;
    }
  }

  /**
   * Optional template footer with optional variables
   */
  export interface Footer {
    /**
     * The footer template text with optional variable placeholders
     */
    template?: string;

    /**
     * The type of footer (typically "text")
     */
    type?: string | null;

    /**
     * List of variables used in the footer template
     */
    variables?: Array<TemplatesAPI.TemplateVariable> | null;
  }

  /**
   * Optional template header with optional variables
   */
  export interface Header {
    /**
     * The header template text with optional variable placeholders (e.g., "Welcome to
     * {{0:variable}}")
     */
    template?: string;

    /**
     * The type of header (e.g., "text", "image", "video", "document")
     */
    type?: string | null;

    /**
     * List of variables used in the header template
     */
    variables?: Array<TemplatesAPI.TemplateVariable> | null;
  }
}

export interface TemplateVariable {
  id?: number;

  name?: string;

  props?: TemplateVariable.Props;

  type?: string;
}

export namespace TemplateVariable {
  export interface Props {
    alt?: string | null;

    mediaType?: string | null;

    regex?: string | null;

    sample?: string | null;

    shortUrl?: string | null;

    url?: string | null;

    variableType?: string | null;
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface TemplateListResponse {
  /**
   * The response data (null if error)
   */
  data?: TemplateListResponse.Data | null;

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

export namespace TemplateListResponse {
  /**
   * The response data (null if error)
   */
  export interface Data {
    /**
     * Pagination metadata
     */
    pagination?: WebhooksAPI.PaginationMeta;

    /**
     * List of templates
     */
    templates?: Array<TemplatesAPI.Template>;
  }
}

export interface TemplateCreateParams {
  /**
   * Body param: Template category: MARKETING, UTILITY, AUTHENTICATION (optional,
   * auto-detected if not provided)
   */
  category?: string | null;

  /**
   * Body param: Source of template creation (default: from-api)
   */
  creation_source?: string | null;

  /**
   * Body param: Template definition including header, body, footer, and buttons
   */
  definition?: TemplateDefinition;

  /**
   * Body param: Template language code (e.g., en_US) (optional, auto-detected if not
   * provided)
   */
  language?: string | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param: Whether to submit the template for review after creation (default:
   * false)
   */
  submit_for_review?: boolean;

  /**
   * Header param: Unique key to ensure idempotent request processing. Must be 1-255
   * alphanumeric characters, hyphens, or underscores. Responses are cached for 24
   * hours per key per customer.
   */
  'Idempotency-Key'?: string;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface TemplateRetrieveParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface TemplateUpdateParams {
  /**
   * Body param: Template category: MARKETING, UTILITY, AUTHENTICATION
   */
  category?: string | null;

  /**
   * Body param: Template definition including header, body, footer, and buttons
   */
  definition?: TemplateDefinition | null;

  /**
   * Body param: Template language code (e.g., en_US)
   */
  language?: string | null;

  /**
   * Body param: Template display name
   */
  name?: string | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param: Whether to submit the template for review after updating (default:
   * false)
   */
  submit_for_review?: boolean;

  /**
   * Header param: Unique key to ensure idempotent request processing. Must be 1-255
   * alphanumeric characters, hyphens, or underscores. Responses are cached for 24
   * hours per key per customer.
   */
  'Idempotency-Key'?: string;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface TemplateListParams {
  /**
   * Query param: Page number (1-indexed)
   */
  page: number;

  /**
   * Query param: Number of items per page
   */
  page_size: number;

  /**
   * Query param: Optional category filter: MARKETING, UTILITY, AUTHENTICATION
   */
  category?: string | null;

  /**
   * Query param: Optional filter by welcome playground flag
   */
  is_welcome_playground?: boolean | null;

  /**
   * Query param: Optional search term for filtering templates
   */
  search?: string | null;

  /**
   * Query param: Optional status filter: APPROVED, PENDING, REJECTED
   */
  status?: string | null;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface TemplateDeleteParams {
  /**
   * Body param: Whether to also delete the template from WhatsApp/Meta (optional,
   * defaults to false)
   */
  delete_from_meta?: boolean | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export declare namespace Templates {
  export {
    type APIResponseTemplate as APIResponseTemplate,
    type Template as Template,
    type TemplateBodyContent as TemplateBodyContent,
    type TemplateDefinition as TemplateDefinition,
    type TemplateVariable as TemplateVariable,
    type TemplateListResponse as TemplateListResponse,
    type TemplateCreateParams as TemplateCreateParams,
    type TemplateRetrieveParams as TemplateRetrieveParams,
    type TemplateUpdateParams as TemplateUpdateParams,
    type TemplateListParams as TemplateListParams,
    type TemplateDeleteParams as TemplateDeleteParams,
  };
}
