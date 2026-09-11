// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WebhooksAPI from './webhooks';
import { ConversationsPage, type ConversationsPageParams, PagePromise } from '../core/pagination';
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
   * // Automatically fetches more pages as needed.
   * for await (const conversation of client.conversations.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    params: ConversationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ConversationMessagesListMessagesConversationsPage, ConversationMessagesList.Message> {
    const { 'x-profile-id': xProfileID, ...query } = params ?? {};
    return this._client.getAPIList('/v3/conversations', ConversationsPage<ConversationMessagesList.Message>, {
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
   * // Automatically fetches more pages as needed.
   * for await (const conversation of client.conversations.listMessages(
   *   '08fab313-c9e2-502c-975e-08b0356c432e',
   * )) {
   *   // ...
   * }
   * ```
   */
  listMessages(
    id: string,
    params: ConversationListMessagesParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ConversationMessagesListMessagesConversationsPage, ConversationMessagesList.Message> {
    const { 'x-profile-id': xProfileID, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v3/conversations/${id}`,
      ConversationsPage<ConversationMessagesList.Message>,
      {
        query,
        ...options,
        headers: buildHeaders([
          { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
          options?.headers,
        ]),
      },
    );
  }
}

export type ConversationMessagesListMessagesConversationsPage =
  ConversationsPage<ConversationMessagesList.Message>;

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfConversationMessagesList {
  /**
   * A paginated list of messages — used by both conversation read endpoints.
   */
  data?: ConversationMessagesList | null;

  /**
   * Error information
   */
  error?: WebhooksAPI.ErrorDetail | null;

  /**
   * Request and response metadata
   */
  meta?: WebhooksAPI.APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

/**
 * A paginated list of messages — used by both conversation read endpoints.
 */
export interface ConversationMessagesList {
  /**
   * The messages on this page.
   */
  messages?: Array<ConversationMessagesList.Message>;

  /**
   * Pagination metadata for list responses
   */
  pagination?: WebhooksAPI.PaginationMeta;
}

export namespace ConversationMessagesList {
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
}

export interface ConversationListParams extends ConversationsPageParams {
  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface ConversationListMessagesParams extends ConversationsPageParams {
  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export declare namespace Conversations {
  export {
    type APIResponseOfConversationMessagesList as APIResponseOfConversationMessagesList,
    type ConversationMessagesList as ConversationMessagesList,
    type ConversationMessagesListMessagesConversationsPage as ConversationMessagesListMessagesConversationsPage,
    type ConversationListParams as ConversationListParams,
    type ConversationListMessagesParams as ConversationListMessagesParams,
  };
}
