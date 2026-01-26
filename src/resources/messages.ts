// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Messages extends APIResource {
  /**
   * Retrieves comprehensive details about a specific message using the message ID.
   * Returns complete message data including delivery status, channel information,
   * template details, contact information, and pricing. The customer ID is extracted
   * from the authentication token to ensure the message belongs to the authenticated
   * customer.
   *
   * @example
   * ```ts
   * const message = await client.messages.retrieve(
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
    params: MessageRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<MessageRetrieveResponse> {
    const { 'x-api-key': xAPIKey, 'x-sender-id': xSenderID } = params;
    return this._client.get(path`/v2/messages/${id}`, {
      ...options,
      headers: buildHeaders([{ 'x-api-key': xAPIKey, 'x-sender-id': xSenderID }, options?.headers]),
    });
  }

  /**
   * Sends a message to a phone number using the default template. This endpoint is
   * rate limited to 5 messages per customer per day. The customer ID is extracted
   * from the authentication token.
   *
   * @example
   * ```ts
   * await client.messages.sendQuickMessage({
   *   customMessage: 'Hello, this is a test message!',
   *   phoneNumber: '+1234567890',
   *   'x-api-key': '',
   *   'x-sender-id': '00000000-0000-0000-0000-000000000000',
   * });
   * ```
   */
  sendQuickMessage(params: MessageSendQuickMessageParams, options?: RequestOptions): APIPromise<void> {
    const { 'x-api-key': xAPIKey, 'x-sender-id': xSenderID, ...body } = params;
    return this._client.post('/v2/messages/quick-message', {
      body,
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', 'x-api-key': xAPIKey, 'x-sender-id': xSenderID },
        options?.headers,
      ]),
    });
  }

  /**
   * Sends a message to a specific contact using a template. The message can be sent
   * via SMS or WhatsApp depending on the contact's capabilities. Optionally specify
   * a webhook URL to receive delivery status updates. The customer ID is extracted
   * from the authentication token.
   *
   * @example
   * ```ts
   * await client.messages.sendToContact({
   *   contactId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
   *   templateId: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
   *   'x-api-key': '',
   *   'x-sender-id': '00000000-0000-0000-0000-000000000000',
   * });
   * ```
   */
  sendToContact(params: MessageSendToContactParams, options?: RequestOptions): APIPromise<void> {
    const { 'x-api-key': xAPIKey, 'x-sender-id': xSenderID, ...body } = params;
    return this._client.post('/v2/messages/contact', {
      body,
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', 'x-api-key': xAPIKey, 'x-sender-id': xSenderID },
        options?.headers,
      ]),
    });
  }

  /**
   * Sends a message to a phone number using a template. The phone number doesn't
   * need to be a pre-existing contact. The message can be sent via SMS or WhatsApp.
   * Optionally specify a webhook URL to receive delivery status updates. The
   * customer ID is extracted from the authentication token.
   *
   * @example
   * ```ts
   * await client.messages.sendToPhone({
   *   phoneNumber: '+1234567890',
   *   templateId: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',
   *   'x-api-key': '',
   *   'x-sender-id': '00000000-0000-0000-0000-000000000000',
   * });
   * ```
   */
  sendToPhone(params: MessageSendToPhoneParams, options?: RequestOptions): APIPromise<void> {
    const { 'x-api-key': xAPIKey, 'x-sender-id': xSenderID, ...body } = params;
    return this._client.post('/v2/messages/phone', {
      body,
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', 'x-api-key': xAPIKey, 'x-sender-id': xSenderID },
        options?.headers,
      ]),
    });
  }
}

/**
 * Represents a sent message with comprehensive delivery and template information
 * (v2)
 */
export interface MessageRetrieveResponse {
  /**
   * The unique identifier of the message
   */
  id?: string;

  /**
   * The messaging channel used (e.g., SMS, WhatsApp)
   */
  channel?: string;

  /**
   * The unique identifier of the contact who received the message
   */
  contactId?: string;

  /**
   * The final price charged for sending this message
   */
  correctedPrice?: number | null;

  /**
   * The date and time when the message was created
   */
  createdAt?: string;

  /**
   * The unique identifier of the customer who sent the message
   */
  customerId?: string;

  /**
   * A chronological list of status change events for this message. Each event
   * includes a status and timestamp, following industry standards (Twilio, SendGrid,
   * Mailgun). Events are ordered chronologically from oldest to newest.
   */
  events?: Array<MessageRetrieveResponse.Event> | null;

  /**
   * The message body content with variables substituted
   */
  messageBody?: MessageRetrieveResponse.MessageBody | null;

  /**
   * The phone number of the recipient (E.164 format)
   */
  phoneNumber?: string;

  /**
   * The phone number in international format
   */
  phoneNumberInternational?: string;

  /**
   * The region code of the phone number (e.g., US, GB, DE)
   */
  regionCode?: string;

  /**
   * The delivery status of the message (e.g., sent, delivered, failed, read)
   */
  status?: string;

  /**
   * The category of the template (e.g., MARKETING, UTILITY, AUTHENTICATION)
   */
  templateCategory?: string;

  /**
   * The unique identifier of the template used for this message (null if no template
   * was used)
   */
  templateId?: string | null;

  /**
   * The display name of the template
   */
  templateName?: string;
}

export namespace MessageRetrieveResponse {
  /**
   * Represents a status change event in a message's lifecycle Follows industry
   * standards (Twilio, SendGrid, Mailgun pattern)
   */
  export interface Event {
    /**
     * Optional human-readable description of the event Useful for error messages or
     * additional context
     */
    description?: string | null;

    /**
     * The status of the message at this point in time Examples: "queued", "sent",
     * "delivered", "read", "failed"
     */
    status?: string;

    /**
     * When this status change occurred (ISO 8601 format)
     */
    timestamp?: string;
  }

  /**
   * The message body content with variables substituted
   */
  export interface MessageBody {
    buttons?: Array<MessageBody.Button> | null;

    content?: string;

    footer?: string | null;

    header?: string | null;
  }

  export namespace MessageBody {
    export interface Button {
      type?: string;

      value?: string;
    }
  }
}

export interface MessageRetrieveParams {
  'x-api-key': string;

  'x-sender-id': string;
}

export interface MessageSendQuickMessageParams {
  /**
   * Body param: The custom message content to include in the template
   */
  customMessage: string;

  /**
   * Body param: The phone number to send the message to, in international format
   * (e.g., +1234567890)
   */
  phoneNumber: string;

  /**
   * Header param
   */
  'x-api-key': string;

  /**
   * Header param
   */
  'x-sender-id': string;
}

export interface MessageSendToContactParams {
  /**
   * Body param: The unique identifier of the contact to send the message to
   */
  contactId: string;

  /**
   * Body param: The unique identifier of the template to use for the message
   */
  templateId: string;

  /**
   * Header param
   */
  'x-api-key': string;

  /**
   * Header param
   */
  'x-sender-id': string;

  /**
   * Body param: Optional key-value pairs of template variables to replace in the
   * template body. For example, if your template contains "Hello {{name}}", you
   * would provide { "name": "John Doe" }
   */
  templateVariables?: { [key: string]: string } | null;
}

export interface MessageSendToPhoneParams {
  /**
   * Body param: The phone number to send the message to, in international format
   * (e.g., +1234567890)
   */
  phoneNumber: string;

  /**
   * Body param: The unique identifier of the template to use for the message
   */
  templateId: string;

  /**
   * Header param
   */
  'x-api-key': string;

  /**
   * Header param
   */
  'x-sender-id': string;

  /**
   * Body param: Optional key-value pairs of template variables to replace in the
   * template body. For example, if your template contains "Hello {{name}}", you
   * would provide { "name": "John Doe" }
   */
  templateVariables?: { [key: string]: string } | null;
}

export declare namespace Messages {
  export {
    type MessageRetrieveResponse as MessageRetrieveResponse,
    type MessageRetrieveParams as MessageRetrieveParams,
    type MessageSendQuickMessageParams as MessageSendQuickMessageParams,
    type MessageSendToContactParams as MessageSendToContactParams,
    type MessageSendToPhoneParams as MessageSendToPhoneParams,
  };
}
