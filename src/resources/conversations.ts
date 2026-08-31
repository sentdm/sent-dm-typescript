// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Inbound and outbound messages, grouped by the person they are with.
 *
 * A conversation is the thread for one contact across every channel — a reply by SMS and one by WhatsApp belong to the same conversation, because they are the same person talking to you.
 *
 * Read-only. Sending is **Messages**; a reply arrives here and through your webhooks.
 */
export class Conversations extends APIResource {
  /**
   * Retrieves a paginated list of the authenticated customer's messages across all
   * conversations, ordered by created date (most recent first).
   *
   * @example
   * ```ts
   * const conversations = await client.conversations.list({
   *   page: 0,
   *   page_size: 0,
   * });
   * ```
   */
  list(params: ConversationListParams, options?: RequestOptions): APIPromise<ConversationListResponse> {
    const { 'x-profile-id': xProfileID, ...query } = params;
    return this._client.get('/v3/conversations', {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves a paginated list of the messages in a single conversation (scoped to
   * the authenticated customer), ordered by created date (most recent first).
   *
   * @example
   * ```ts
   * const response = await client.conversations.listMessages(
   *   '08fab313-c9e2-502c-975e-08b0356c432e',
   *   { page: 0, page_size: 0 },
   * );
   * ```
   */
  listMessages(
    id: string,
    params: ConversationListMessagesParams,
    options?: RequestOptions,
  ): APIPromise<ConversationListMessagesResponse> {
    const { 'x-profile-id': xProfileID, ...query } = params;
    return this._client.get(path`/v3/conversations/${id}`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface ConversationListResponse {
  /**
   * A paginated list of messages — used by both conversation read endpoints.
   */
  data?: ConversationListResponse.Data | null;

  /**
   * Error information
   */
  error?: ConversationListResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: ConversationListResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace ConversationListResponse {
  /**
   * A paginated list of messages — used by both conversation read endpoints.
   */
  export interface Data {
    /**
     * The messages on this page.
     */
    messages?: Array<Data.Message>;

    /**
     * Pagination metadata for list responses
     */
    pagination?: Data.Pagination;
  }

  export namespace Data {
    /**
     * Message response for v3 API — same shape as v2 with snake_case JSON conventions
     */
    export interface Message {
      id?: string;

      active_contact_price?: number | null;

      channel?: string;

      contact_id?: string;

      created_at?: string;

      customer_id?: string;

      direction?: string;

      events?: Array<Message.Event> | null;

      /**
       * Structured message body format for database storage. Preserves channel-specific
       * components (header, body, footer, buttons).
       */
      message_body?: Message.MessageBody | null;

      phone?: string;

      phone_international?: string;

      price?: number | null;

      region_code?: string;

      status?: string;

      template_category?: string | null;

      template_id?: string | null;

      template_name?: string | null;
    }

    export namespace Message {
      /**
       * Represents a status change event in a message's lifecycle (v3)
       */
      export interface Event {
        status: string;

        timestamp: string;

        description?: string | null;
      }

      /**
       * Structured message body format for database storage. Preserves channel-specific
       * components (header, body, footer, buttons).
       */
      export interface MessageBody {
        buttons?: Array<MessageBody.Button> | null;

        content?: string;

        footer?: string | null;

        header?: string | null;
      }

      export namespace MessageBody {
        export interface Button {
          postbackData?: string | null;

          text?: string | null;

          type?: string;

          value?: string;
        }
      }
    }

    /**
     * Pagination metadata for list responses
     */
    export interface Pagination {
      /**
       * @deprecated Cursor-based pagination. Never populated — see Cursors.
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
       * @deprecated Cursor-based pagination. Never populated — see Cursors.
       */
      export interface Cursors {
        /**
         * Cursor to fetch the next page.
         */
        after?: string | null;

        /**
         * Cursor to fetch the previous page.
         */
        before?: string | null;
      }
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

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface ConversationListMessagesResponse {
  /**
   * A paginated list of messages — used by both conversation read endpoints.
   */
  data?: ConversationListMessagesResponse.Data | null;

  /**
   * Error information
   */
  error?: ConversationListMessagesResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: ConversationListMessagesResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace ConversationListMessagesResponse {
  /**
   * A paginated list of messages — used by both conversation read endpoints.
   */
  export interface Data {
    /**
     * The messages on this page.
     */
    messages?: Array<Data.Message>;

    /**
     * Pagination metadata for list responses
     */
    pagination?: Data.Pagination;
  }

  export namespace Data {
    /**
     * Message response for v3 API — same shape as v2 with snake_case JSON conventions
     */
    export interface Message {
      id?: string;

      active_contact_price?: number | null;

      channel?: string;

      contact_id?: string;

      created_at?: string;

      customer_id?: string;

      direction?: string;

      events?: Array<Message.Event> | null;

      /**
       * Structured message body format for database storage. Preserves channel-specific
       * components (header, body, footer, buttons).
       */
      message_body?: Message.MessageBody | null;

      phone?: string;

      phone_international?: string;

      price?: number | null;

      region_code?: string;

      status?: string;

      template_category?: string | null;

      template_id?: string | null;

      template_name?: string | null;
    }

    export namespace Message {
      /**
       * Represents a status change event in a message's lifecycle (v3)
       */
      export interface Event {
        status: string;

        timestamp: string;

        description?: string | null;
      }

      /**
       * Structured message body format for database storage. Preserves channel-specific
       * components (header, body, footer, buttons).
       */
      export interface MessageBody {
        buttons?: Array<MessageBody.Button> | null;

        content?: string;

        footer?: string | null;

        header?: string | null;
      }

      export namespace MessageBody {
        export interface Button {
          postbackData?: string | null;

          text?: string | null;

          type?: string;

          value?: string;
        }
      }
    }

    /**
     * Pagination metadata for list responses
     */
    export interface Pagination {
      /**
       * @deprecated Cursor-based pagination. Never populated — see Cursors.
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
       * @deprecated Cursor-based pagination. Never populated — see Cursors.
       */
      export interface Cursors {
        /**
         * Cursor to fetch the next page.
         */
        after?: string | null;

        /**
         * Cursor to fetch the previous page.
         */
        before?: string | null;
      }
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

export interface ConversationListParams {
  /**
   * Query param
   */
  page: number;

  /**
   * Query param
   */
  page_size: number;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface ConversationListMessagesParams {
  /**
   * Query param
   */
  page: number;

  /**
   * Query param
   */
  page_size: number;

  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export declare namespace Conversations {
  export {
    type ConversationListResponse as ConversationListResponse,
    type ConversationListMessagesResponse as ConversationListMessagesResponse,
    type ConversationListParams as ConversationListParams,
    type ConversationListMessagesParams as ConversationListMessagesParams,
  };
}
