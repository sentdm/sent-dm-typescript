// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
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
   * const template = await client.templates.create();
   * ```
   */
  create(params: TemplateCreateParams, options?: RequestOptions): APIPromise<TemplateCreateResponse> {
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
   * const template = await client.templates.retrieve(
   *   '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
   * );
   * ```
   */
  retrieve(
    id: string,
    params: TemplateRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TemplateRetrieveResponse> {
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
   * const template = await client.templates.update(
   *   '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
   * );
   * ```
   */
  update(
    id: string,
    params: TemplateUpdateParams,
    options?: RequestOptions,
  ): APIPromise<TemplateUpdateResponse> {
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
export interface TemplateCreateResponse {
  /**
   * Template response for v3 API
   */
  data?: TemplateCreateResponse.Data | null;

  /**
   * Error information
   */
  error?: TemplateCreateResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: TemplateCreateResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace TemplateCreateResponse {
  /**
   * Template response for v3 API
   */
  export interface Data {
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

  /**
   * Error information
   */
  export interface Error {
    /**
     * Machine-readable error code (e.g., "RESOURCE_001")
     */
    code?: string;

    /**
     * Additional validation error details (field-level errors)
     */
    details?: { [key: string]: Array<string> } | null;

    /**
     * URL to documentation about this error
     */
    doc_url?: string | null;

    /**
     * Human-readable error message
     */
    message?: string;
  }

  /**
   * Request and response metadata
   */
  export interface Meta {
    /**
     * Unique identifier for this request (for tracing and support)
     */
    request_id?: string;

    /**
     * Server timestamp when the response was generated
     */
    timestamp?: string;

    /**
     * API version used for this request
     */
    version?: string;
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface TemplateRetrieveResponse {
  /**
   * Template response for v3 API
   */
  data?: TemplateRetrieveResponse.Data | null;

  /**
   * Error information
   */
  error?: TemplateRetrieveResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: TemplateRetrieveResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace TemplateRetrieveResponse {
  /**
   * Template response for v3 API
   */
  export interface Data {
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

  /**
   * Error information
   */
  export interface Error {
    /**
     * Machine-readable error code (e.g., "RESOURCE_001")
     */
    code?: string;

    /**
     * Additional validation error details (field-level errors)
     */
    details?: { [key: string]: Array<string> } | null;

    /**
     * URL to documentation about this error
     */
    doc_url?: string | null;

    /**
     * Human-readable error message
     */
    message?: string;
  }

  /**
   * Request and response metadata
   */
  export interface Meta {
    /**
     * Unique identifier for this request (for tracing and support)
     */
    request_id?: string;

    /**
     * Server timestamp when the response was generated
     */
    timestamp?: string;

    /**
     * API version used for this request
     */
    version?: string;
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface TemplateUpdateResponse {
  /**
   * Template response for v3 API
   */
  data?: TemplateUpdateResponse.Data | null;

  /**
   * Error information
   */
  error?: TemplateUpdateResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: TemplateUpdateResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace TemplateUpdateResponse {
  /**
   * Template response for v3 API
   */
  export interface Data {
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

  /**
   * Error information
   */
  export interface Error {
    /**
     * Machine-readable error code (e.g., "RESOURCE_001")
     */
    code?: string;

    /**
     * Additional validation error details (field-level errors)
     */
    details?: { [key: string]: Array<string> } | null;

    /**
     * URL to documentation about this error
     */
    doc_url?: string | null;

    /**
     * Human-readable error message
     */
    message?: string;
  }

  /**
   * Request and response metadata
   */
  export interface Meta {
    /**
     * Unique identifier for this request (for tracing and support)
     */
    request_id?: string;

    /**
     * Server timestamp when the response was generated
     */
    timestamp?: string;

    /**
     * API version used for this request
     */
    version?: string;
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface TemplateListResponse {
  /**
   * Paginated list of templates
   */
  data?: TemplateListResponse.Data | null;

  /**
   * Error information
   */
  error?: TemplateListResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: TemplateListResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace TemplateListResponse {
  /**
   * Paginated list of templates
   */
  export interface Data {
    /**
     * Pagination metadata for list responses
     */
    pagination?: Data.Pagination;

    /**
     * List of templates
     */
    templates?: Array<Data.Template>;
  }

  export namespace Data {
    /**
     * Pagination metadata for list responses
     */
    export interface Pagination {
      /**
       * Cursor-based pagination pointers
       */
      cursors?: Pagination.Cursors | null;

      /**
       * Whether there are more pages after this one
       */
      has_more?: boolean;

      /**
       * Current page number (1-indexed)
       */
      page?: number;

      /**
       * Number of items per page
       */
      page_size?: number;

      /**
       * Total number of items across all pages
       */
      total_count?: number;

      /**
       * Total number of pages
       */
      total_pages?: number;
    }

    export namespace Pagination {
      /**
       * Cursor-based pagination pointers
       */
      export interface Cursors {
        /**
         * Cursor to fetch the next page
         */
        after?: string | null;

        /**
         * Cursor to fetch the previous page
         */
        before?: string | null;
      }
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
  }

  /**
   * Error information
   */
  export interface Error {
    /**
     * Machine-readable error code (e.g., "RESOURCE_001")
     */
    code?: string;

    /**
     * Additional validation error details (field-level errors)
     */
    details?: { [key: string]: Array<string> } | null;

    /**
     * URL to documentation about this error
     */
    doc_url?: string | null;

    /**
     * Human-readable error message
     */
    message?: string;
  }

  /**
   * Request and response metadata
   */
  export interface Meta {
    /**
     * Unique identifier for this request (for tracing and support)
     */
    request_id?: string;

    /**
     * Server timestamp when the response was generated
     */
    timestamp?: string;

    /**
     * API version used for this request
     */
    version?: string;
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
   * Body param: Complete definition of a message template including header, body,
   * footer, and buttons
   */
  definition?: TemplateCreateParams.Definition;

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

export namespace TemplateCreateParams {
  /**
   * Complete definition of a message template including header, body, footer, and
   * buttons
   */
  export interface Definition {
    /**
     * Body section of a message template with channel-specific content
     */
    body: Definition.Body;

    /**
     * Configuration for AUTHENTICATION category templates
     */
    authenticationConfig?: Definition.AuthenticationConfig | null;

    /**
     * Optional list of interactive buttons (e.g., quick replies, URLs, phone numbers)
     */
    buttons?: Array<Definition.Button> | null;

    /**
     * The version of the template definition format
     */
    definitionVersion?: string | null;

    /**
     * Footer section of a message template
     */
    footer?: Definition.Footer | null;

    /**
     * Header section of a message template
     */
    header?: Definition.Header | null;
  }

  export namespace Definition {
    /**
     * Body section of a message template with channel-specific content
     */
    export interface Body {
      /**
       * Content that will be used for all channels (SMS and WhatsApp) unless
       * channel-specific content is provided
       */
      multiChannel?: Body.MultiChannel | null;

      /**
       * RCS-specific content that overrides multi-channel content for RCS messages
       */
      rcs?: Body.Rcs | null;

      /**
       * SMS-specific content that overrides multi-channel content for SMS messages
       */
      sms?: Body.SMS | null;

      /**
       * WhatsApp-specific content that overrides multi-channel content for WhatsApp
       * messages
       */
      whatsapp?: Body.Whatsapp | null;
    }

    export namespace Body {
      /**
       * Content that will be used for all channels (SMS and WhatsApp) unless
       * channel-specific content is provided
       */
      export interface MultiChannel {
        template: string;

        type?: string | null;

        variables?: Array<MultiChannel.Variable> | null;
      }

      export namespace MultiChannel {
        export interface Variable {
          name: string;

          props: Variable.Props;

          type: string;

          id?: number;
        }

        export namespace Variable {
          export interface Props {
            mediaType: string;

            sample: string;

            url: string;

            variableType: string;

            alt?: string | null;

            regex?: string | null;

            shortUrl?: string | null;
          }
        }
      }

      /**
       * RCS-specific content that overrides multi-channel content for RCS messages
       */
      export interface Rcs {
        template: string;

        type?: string | null;

        variables?: Array<Rcs.Variable> | null;
      }

      export namespace Rcs {
        export interface Variable {
          name: string;

          props: Variable.Props;

          type: string;

          id?: number;
        }

        export namespace Variable {
          export interface Props {
            mediaType: string;

            sample: string;

            url: string;

            variableType: string;

            alt?: string | null;

            regex?: string | null;

            shortUrl?: string | null;
          }
        }
      }

      /**
       * SMS-specific content that overrides multi-channel content for SMS messages
       */
      export interface SMS {
        template: string;

        type?: string | null;

        variables?: Array<SMS.Variable> | null;
      }

      export namespace SMS {
        export interface Variable {
          name: string;

          props: Variable.Props;

          type: string;

          id?: number;
        }

        export namespace Variable {
          export interface Props {
            mediaType: string;

            sample: string;

            url: string;

            variableType: string;

            alt?: string | null;

            regex?: string | null;

            shortUrl?: string | null;
          }
        }
      }

      /**
       * WhatsApp-specific content that overrides multi-channel content for WhatsApp
       * messages
       */
      export interface Whatsapp {
        template: string;

        type?: string | null;

        variables?: Array<Whatsapp.Variable> | null;
      }

      export namespace Whatsapp {
        export interface Variable {
          name: string;

          props: Variable.Props;

          type: string;

          id?: number;
        }

        export namespace Variable {
          export interface Props {
            mediaType: string;

            sample: string;

            url: string;

            variableType: string;

            alt?: string | null;

            regex?: string | null;

            shortUrl?: string | null;
          }
        }
      }
    }

    /**
     * Configuration for AUTHENTICATION category templates
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
       * Properties specific to the button type
       */
      props: Button.Props;

      /**
       * The type of button (e.g., QUICK_REPLY, URL, PHONE_NUMBER, VOICE_CALL, COPY_CODE)
       */
      type: string;

      /**
       * The unique identifier of the button (1-based index)
       */
      id?: number;
    }

    export namespace Button {
      /**
       * Properties specific to the button type
       */
      export interface Props {
        activeFor: number;

        countryCode: string;

        offerCode: string;

        phoneNumber: string;

        quickReplyType: string;

        text: string;

        url: string;

        urlType: string;

        autofillText?: string | null;

        otpType?: string | null;

        packageName?: string | null;

        signatureHash?: string | null;
      }
    }

    /**
     * Footer section of a message template
     */
    export interface Footer {
      /**
       * The footer template text with optional variable placeholders
       */
      template: string;

      /**
       * The type of footer (typically "text")
       */
      type?: string | null;

      /**
       * List of variables used in the footer template
       */
      variables?: Array<Footer.Variable> | null;
    }

    export namespace Footer {
      export interface Variable {
        name: string;

        props: Variable.Props;

        type: string;

        id?: number;
      }

      export namespace Variable {
        export interface Props {
          mediaType: string;

          sample: string;

          url: string;

          variableType: string;

          alt?: string | null;

          regex?: string | null;

          shortUrl?: string | null;
        }
      }
    }

    /**
     * Header section of a message template
     */
    export interface Header {
      /**
       * The header template text with optional variable placeholders (e.g., "Welcome to
       * {{0:variable}}")
       */
      template: string;

      /**
       * The type of header (e.g., "text", "image", "video", "document")
       */
      type?: string | null;

      /**
       * List of variables used in the header template
       */
      variables?: Array<Header.Variable> | null;
    }

    export namespace Header {
      export interface Variable {
        name: string;

        props: Variable.Props;

        type: string;

        id?: number;
      }

      export namespace Variable {
        export interface Props {
          mediaType: string;

          sample: string;

          url: string;

          variableType: string;

          alt?: string | null;

          regex?: string | null;

          shortUrl?: string | null;
        }
      }
    }
  }
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
   * Body param: Complete definition of a message template including header, body,
   * footer, and buttons
   */
  definition?: TemplateUpdateParams.Definition | null;

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

export namespace TemplateUpdateParams {
  /**
   * Complete definition of a message template including header, body, footer, and
   * buttons
   */
  export interface Definition {
    /**
     * Body section of a message template with channel-specific content
     */
    body: Definition.Body;

    /**
     * Configuration for AUTHENTICATION category templates
     */
    authenticationConfig?: Definition.AuthenticationConfig | null;

    /**
     * Optional list of interactive buttons (e.g., quick replies, URLs, phone numbers)
     */
    buttons?: Array<Definition.Button> | null;

    /**
     * The version of the template definition format
     */
    definitionVersion?: string | null;

    /**
     * Footer section of a message template
     */
    footer?: Definition.Footer | null;

    /**
     * Header section of a message template
     */
    header?: Definition.Header | null;
  }

  export namespace Definition {
    /**
     * Body section of a message template with channel-specific content
     */
    export interface Body {
      /**
       * Content that will be used for all channels (SMS and WhatsApp) unless
       * channel-specific content is provided
       */
      multiChannel?: Body.MultiChannel | null;

      /**
       * RCS-specific content that overrides multi-channel content for RCS messages
       */
      rcs?: Body.Rcs | null;

      /**
       * SMS-specific content that overrides multi-channel content for SMS messages
       */
      sms?: Body.SMS | null;

      /**
       * WhatsApp-specific content that overrides multi-channel content for WhatsApp
       * messages
       */
      whatsapp?: Body.Whatsapp | null;
    }

    export namespace Body {
      /**
       * Content that will be used for all channels (SMS and WhatsApp) unless
       * channel-specific content is provided
       */
      export interface MultiChannel {
        template: string;

        type?: string | null;

        variables?: Array<MultiChannel.Variable> | null;
      }

      export namespace MultiChannel {
        export interface Variable {
          name: string;

          props: Variable.Props;

          type: string;

          id?: number;
        }

        export namespace Variable {
          export interface Props {
            mediaType: string;

            sample: string;

            url: string;

            variableType: string;

            alt?: string | null;

            regex?: string | null;

            shortUrl?: string | null;
          }
        }
      }

      /**
       * RCS-specific content that overrides multi-channel content for RCS messages
       */
      export interface Rcs {
        template: string;

        type?: string | null;

        variables?: Array<Rcs.Variable> | null;
      }

      export namespace Rcs {
        export interface Variable {
          name: string;

          props: Variable.Props;

          type: string;

          id?: number;
        }

        export namespace Variable {
          export interface Props {
            mediaType: string;

            sample: string;

            url: string;

            variableType: string;

            alt?: string | null;

            regex?: string | null;

            shortUrl?: string | null;
          }
        }
      }

      /**
       * SMS-specific content that overrides multi-channel content for SMS messages
       */
      export interface SMS {
        template: string;

        type?: string | null;

        variables?: Array<SMS.Variable> | null;
      }

      export namespace SMS {
        export interface Variable {
          name: string;

          props: Variable.Props;

          type: string;

          id?: number;
        }

        export namespace Variable {
          export interface Props {
            mediaType: string;

            sample: string;

            url: string;

            variableType: string;

            alt?: string | null;

            regex?: string | null;

            shortUrl?: string | null;
          }
        }
      }

      /**
       * WhatsApp-specific content that overrides multi-channel content for WhatsApp
       * messages
       */
      export interface Whatsapp {
        template: string;

        type?: string | null;

        variables?: Array<Whatsapp.Variable> | null;
      }

      export namespace Whatsapp {
        export interface Variable {
          name: string;

          props: Variable.Props;

          type: string;

          id?: number;
        }

        export namespace Variable {
          export interface Props {
            mediaType: string;

            sample: string;

            url: string;

            variableType: string;

            alt?: string | null;

            regex?: string | null;

            shortUrl?: string | null;
          }
        }
      }
    }

    /**
     * Configuration for AUTHENTICATION category templates
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
       * Properties specific to the button type
       */
      props: Button.Props;

      /**
       * The type of button (e.g., QUICK_REPLY, URL, PHONE_NUMBER, VOICE_CALL, COPY_CODE)
       */
      type: string;

      /**
       * The unique identifier of the button (1-based index)
       */
      id?: number;
    }

    export namespace Button {
      /**
       * Properties specific to the button type
       */
      export interface Props {
        activeFor: number;

        countryCode: string;

        offerCode: string;

        phoneNumber: string;

        quickReplyType: string;

        text: string;

        url: string;

        urlType: string;

        autofillText?: string | null;

        otpType?: string | null;

        packageName?: string | null;

        signatureHash?: string | null;
      }
    }

    /**
     * Footer section of a message template
     */
    export interface Footer {
      /**
       * The footer template text with optional variable placeholders
       */
      template: string;

      /**
       * The type of footer (typically "text")
       */
      type?: string | null;

      /**
       * List of variables used in the footer template
       */
      variables?: Array<Footer.Variable> | null;
    }

    export namespace Footer {
      export interface Variable {
        name: string;

        props: Variable.Props;

        type: string;

        id?: number;
      }

      export namespace Variable {
        export interface Props {
          mediaType: string;

          sample: string;

          url: string;

          variableType: string;

          alt?: string | null;

          regex?: string | null;

          shortUrl?: string | null;
        }
      }
    }

    /**
     * Header section of a message template
     */
    export interface Header {
      /**
       * The header template text with optional variable placeholders (e.g., "Welcome to
       * {{0:variable}}")
       */
      template: string;

      /**
       * The type of header (e.g., "text", "image", "video", "document")
       */
      type?: string | null;

      /**
       * List of variables used in the header template
       */
      variables?: Array<Header.Variable> | null;
    }

    export namespace Header {
      export interface Variable {
        name: string;

        props: Variable.Props;

        type: string;

        id?: number;
      }

      export namespace Variable {
        export interface Props {
          mediaType: string;

          sample: string;

          url: string;

          variableType: string;

          alt?: string | null;

          regex?: string | null;

          shortUrl?: string | null;
        }
      }
    }
  }
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
    type TemplateCreateResponse as TemplateCreateResponse,
    type TemplateRetrieveResponse as TemplateRetrieveResponse,
    type TemplateUpdateResponse as TemplateUpdateResponse,
    type TemplateListResponse as TemplateListResponse,
    type TemplateCreateParams as TemplateCreateParams,
    type TemplateRetrieveParams as TemplateRetrieveParams,
    type TemplateUpdateParams as TemplateUpdateParams,
    type TemplateListParams as TemplateListParams,
    type TemplateDeleteParams as TemplateDeleteParams,
  };
}
