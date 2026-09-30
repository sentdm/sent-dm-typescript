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
   * Message response for v3 API — same shape as v2 with snake_case JSON conventions.
   *
   * The shape of a message that was sent immediately: it never has a scheduled_at
   * key. A message that is or was held for a later instant is a
   * ScheduledMessageResponse, and the endpoint decides which of the two to answer
   * with. From always returns this type.
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
     * components (header, header media, body, footer, buttons, MMS subject and media).
     *
     * Persisted as the messageBody jsonb column on Messages. Every write path goes
     * through MessageUtils.MessageBodyJsonOptions, which writes nulls, so the envelope
     * shape is stable regardless of channel or status. Anything that rebuilds this
     * object field by field — the four IMessageBodyStrategy implementations and
     * MessageUtils.BuildSegmentBody — has to carry every member, or that member is
     * silently dropped on whichever path forgot it.
     */
    message_body?: Message.MessageBody | null;

    phone?: string;

    phone_international?: string;

    price?: number | null;

    /**
     * A human-readable sentence for reason_code, for example "Insufficient balance".
     * Omitted whenever reason_code is.
     */
    reason?: string | null;

    /**
     * Why the message is at its current status, as a stable platform code such as
     * DELIVERY_007, BUSINESS_003 or DELIVERY_003. Present when the current status is
     * FAILED, FILTERED or BLOCKED and the lifecycle was loaded; omitted otherwise.
     * Switch on this rather than on reason: the code is stable, the wording may be
     * improved. It is the platform's classification of the outcome, never a carrier or
     * vendor code.
     */
    reason_code?: string | null;

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

      /**
       * A human-readable sentence for reason_code. Omitted whenever reason_code is.
       */
      reason?: string | null;

      /**
       * Why the message reached this status, as a stable platform code such as
       * DELIVERY_007. Present on FAILED, FILTERED and BLOCKED events; omitted on every
       * status that needs no explanation. Same wire name and vocabulary as on the
       * activities list and the webhook.
       */
      reason_code?: string | null;
    }

    /**
     * Structured message body format for database storage. Preserves channel-specific
     * components (header, header media, body, footer, buttons, MMS subject and media).
     *
     * Persisted as the messageBody jsonb column on Messages. Every write path goes
     * through MessageUtils.MessageBodyJsonOptions, which writes nulls, so the envelope
     * shape is stable regardless of channel or status. Anything that rebuilds this
     * object field by field — the four IMessageBodyStrategy implementations and
     * MessageUtils.BuildSegmentBody — has to carry every member, or that member is
     * silently dropped on whichever path forgot it.
     */
    export interface MessageBody {
      buttons?: Array<MessageBody.Button> | null;

      content?: string;

      footer?: string | null;

      header?: string | null;

      /**
       * The media asset that rode a message's header, recorded as sent.
       */
      headerMedia?: MessageBody.HeaderMedia | null;

      /**
       * MMS attachments, as the publicly fetchable URLs handed to the carrier. Null on
       * every other channel.
       *
       * Persisted rather than derived because a resend and a curfew release rebuild the
       * send from the stored row — MessageReplayCommandBuilder reads templateId and
       * templateVariables and nothing else — so media that lives only on the original
       * request would silently turn a replayed MMS into a text message.
       */
      media?: Array<MessageBody.Media> | null;

      /**
       * MMS subject line. Null on every other channel.
       */
      subject?: string | null;
    }

    export namespace MessageBody {
      export interface Button {
        postbackData?: string | null;

        text?: string | null;

        type?: string;

        value?: string;
      }

      /**
       * The media asset that rode a message's header, recorded as sent.
       */
      export interface HeaderMedia {
        /**
         * "image", "video" or "document" — taken from the header's media variable.
         */
        type?: string;

        /**
         * The https URL the caller supplied for this send. Never the template's stored
         * props.sample, which is Meta's expiring header_handle rather than what was
         * delivered.
         */
        url?: string;
      }

      /**
       * One attachment on a message, in either direction — and in both, a URL somebody
       * else hosts.
       *
       * Outbound: the customer supplied a public URL and we handed it to the carrier.
       * Inbound: the carrier hosts the file and we record where. sent.dm never holds the
       * bytes, so there is no key, no expiry bookkeeping and nothing minted per read —
       * what is stored is what is served.
       *
       * An inbound link expires on the carrier's own schedule and is unauthenticated.
       * That is the customer's to manage, and it is documented where they will see it
       * rather than only here — a recipient who needs an attachment to outlive that
       * window copies it on receipt.
       *
       * Storing a presigned URL is the specific mistake this shape still avoids:
       * M260826130000 and M260826140000 exist because RCS assets were stored as signed
       * URLs and went stale. Nothing here is signed.
       */
      export interface Media {
        /**
         * One of MmsMediaTypes when the content type is known. Advisory — a reader should
         * trust the fetched object's own Content-Type.
         */
        mediaType?: string | null;

        /**
         * Content type as the provider declared it. Null when it declared none.
         */
        mimeType?: string | null;

        /**
         * Size as the provider declared it. Never measured here — nothing downloads the
         * file.
         */
        sizeBytes?: number | null;

        /**
         * Inbound only: the SHA-256 the provider declared alongside the attachment, when
         * it declared one. Relayed to the customer so they can verify what they fetch
         * matches what the carrier said it sent. It is the only integrity signal available
         * on an attachment nobody here has read.
         */
        sourceHashSha256?: string | null;

        /**
         * Where the file lives. Outbound: the URL the customer gave us and the carrier
         * fetched. Inbound: the URL the carrier hosts it at, relayed unchanged.
         */
        url?: string | null;
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
