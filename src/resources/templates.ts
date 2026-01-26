// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TemplatesAPI from './templates';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Templates extends APIResource {
  /**
   * Creates a new message template for the authenticated customer with comprehensive
   * template definitions including headers, body, footer, and interactive buttons.
   * Supports automatic metadata generation using AI (display name, language,
   * category). Optionally submits the template for WhatsApp review. The customer ID
   * is extracted from the authentication token.
   *
   * @example
   * ```ts
   * const templateResponse = await client.templates.create({
   *   definition: { body: {} },
   *   'x-api-key': '',
   *   'x-sender-id': '00000000-0000-0000-0000-000000000000',
   * });
   * ```
   */
  create(params: TemplateCreateParams, options?: RequestOptions): APIPromise<TemplateResponse> {
    const { 'x-api-key': xAPIKey, 'x-sender-id': xSenderID, ...body } = params;
    return this._client.post('/v2/templates', {
      body,
      ...options,
      headers: buildHeaders([{ 'x-api-key': xAPIKey, 'x-sender-id': xSenderID }, options?.headers]),
    });
  }

  /**
   * Retrieves a specific message template by its unique identifier for the
   * authenticated customer with comprehensive template definitions including
   * headers, body, footer, and interactive buttons. The customer ID is extracted
   * from the authentication token.
   *
   * @example
   * ```ts
   * const templateResponse = await client.templates.retrieve(
   *   '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
   *   {
   *     'x-api-key': '',
   *     'x-sender-id': '00000000-0000-0000-0000-000000000000',
   *   },
   * );
   * ```
   */
  retrieve(
    id: string,
    params: TemplateRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<TemplateResponse> {
    const { 'x-api-key': xAPIKey, 'x-sender-id': xSenderID } = params;
    return this._client.get(path`/v2/templates/${id}`, {
      ...options,
      headers: buildHeaders([{ 'x-api-key': xAPIKey, 'x-sender-id': xSenderID }, options?.headers]),
    });
  }

  /**
   * Retrieves all message templates available for the authenticated customer with
   * comprehensive template definitions including headers, body, footer, and
   * interactive buttons. Supports advanced filtering by search term, status, and
   * category, plus pagination. The customer ID is extracted from the authentication
   * token.
   *
   * @example
   * ```ts
   * const templates = await client.templates.list({
   *   page: 0,
   *   pageSize: 0,
   *   'x-api-key': '',
   *   'x-sender-id': '00000000-0000-0000-0000-000000000000',
   * });
   * ```
   */
  list(params: TemplateListParams, options?: RequestOptions): APIPromise<TemplateListResponse> {
    const { 'x-api-key': xAPIKey, 'x-sender-id': xSenderID, ...query } = params;
    return this._client.get('/v2/templates', {
      query,
      ...options,
      headers: buildHeaders([{ 'x-api-key': xAPIKey, 'x-sender-id': xSenderID }, options?.headers]),
    });
  }

  /**
   * Deletes a specific message template by its unique identifier for the
   * authenticated customer with smart deletion strategy. Deletion behavior: - If
   * template has NO messages: Permanently deleted from database (hard delete). - If
   * template has messages: Marked as deleted but preserved for message history (soft
   * delete with snapshot). The template must exist and belong to the authenticated
   * customer to be deleted successfully. The customer ID is extracted from the
   * authentication token.
   *
   * @example
   * ```ts
   * await client.templates.delete(
   *   '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
   *   {
   *     'x-api-key': '',
   *     'x-sender-id': '00000000-0000-0000-0000-000000000000',
   *   },
   * );
   * ```
   */
  delete(id: string, params: TemplateDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { 'x-api-key': xAPIKey, 'x-sender-id': xSenderID } = params;
    return this._client.delete(path`/v2/templates/${id}`, {
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', 'x-api-key': xAPIKey, 'x-sender-id': xSenderID },
        options?.headers,
      ]),
    });
  }
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

/**
 * Represents a message template with comprehensive metadata including definition
 * structure
 */
export interface TemplateResponse {
  /**
   * The unique identifier of the template
   */
  id?: string;

  /**
   * The template category (e.g., MARKETING, UTILITY, AUTHENTICATION)
   */
  category?: string;

  /**
   * The date and time when the template was created
   */
  createdAt?: string;

  /**
   * The complete template definition including header, body, footer, and buttons
   */
  definition?: TemplateDefinition;

  /**
   * The display name of the template (auto-generated if not provided)
   */
  displayName?: string;

  /**
   * Indicates whether the template is published and available for use
   */
  isPublished?: boolean;

  /**
   * The template language code (e.g., en_US, es_ES)
   */
  language?: string;

  /**
   * The approval status of the template (e.g., APPROVED, PENDING, REJECTED, DRAFT)
   */
  status?: string;

  /**
   * The date and time when the template was last updated
   */
  updatedAt?: string | null;

  /**
   * The WhatsApp Business API template ID from Meta
   */
  whatsappTemplateId?: string;

  /**
   * The WhatsApp template name as registered with Meta
   */
  whatsappTemplateName?: string;
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

    sample?: string | null;

    shortUrl?: string | null;

    url?: string | null;

    variableType?: string | null;
  }
}

export interface TemplateListResponse {
  items?: Array<TemplateResponse>;

  page?: number;

  pageSize?: number;

  totalCount?: number;

  totalPages?: number;
}

export interface TemplateCreateParams {
  /**
   * Body param: Template definition containing header, body, footer, and buttons
   */
  definition: TemplateDefinition;

  /**
   * Header param
   */
  'x-api-key': string;

  /**
   * Header param
   */
  'x-sender-id': string;

  /**
   * Body param: The template category (e.g., MARKETING, UTILITY, AUTHENTICATION).
   * Can only be set when creating a new template. If not provided, will be
   * auto-generated using AI.
   */
  category?: string | null;

  /**
   * Body param: The template language code (e.g., en_US, es_ES). Can only be set
   * when creating a new template. If not provided, will be auto-detected using AI.
   */
  language?: string | null;

  /**
   * Body param: When false, the template will be saved as draft. When true, the
   * template will be submitted for review.
   */
  submitForReview?: boolean;
}

export interface TemplateRetrieveParams {
  'x-api-key': string;

  'x-sender-id': string;
}

export interface TemplateListParams {
  /**
   * Query param: The page number (zero-indexed). Default is 0.
   */
  page: number;

  /**
   * Query param: The number of items per page (1-1000). Default is 100.
   */
  pageSize: number;

  /**
   * Header param
   */
  'x-api-key': string;

  /**
   * Header param
   */
  'x-sender-id': string;

  /**
   * Query param: Optional filter by template category (e.g., MARKETING, UTILITY,
   * AUTHENTICATION)
   */
  category?: string | null;

  /**
   * Query param: Optional search term to filter templates by name or content
   */
  search?: string | null;

  /**
   * Query param: Optional filter by template status (e.g., APPROVED, PENDING,
   * REJECTED, DRAFT)
   */
  status?: string | null;
}

export interface TemplateDeleteParams {
  'x-api-key': string;

  'x-sender-id': string;
}

export declare namespace Templates {
  export {
    type TemplateBodyContent as TemplateBodyContent,
    type TemplateDefinition as TemplateDefinition,
    type TemplateResponse as TemplateResponse,
    type TemplateVariable as TemplateVariable,
    type TemplateListResponse as TemplateListResponse,
    type TemplateCreateParams as TemplateCreateParams,
    type TemplateRetrieveParams as TemplateRetrieveParams,
    type TemplateListParams as TemplateListParams,
    type TemplateDeleteParams as TemplateDeleteParams,
  };
}
