// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { PagePromise, TemplatesPage, type TemplatesPageParams } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Reusable message bodies with named variables.
 *
 * A template is substituted at send time from the values you pass, so the copy lives here rather than in your application. WhatsApp templates additionally need Meta's approval before they can be sent, and a template's channel status reports where that stands — an approved SMS template and an unapproved WhatsApp one are the same template in two states.
 */
export class Templates extends APIResource {
  /**
   * Creates a new message template with header, body, footer, and buttons. The
   * template can be submitted for review immediately or saved as draft for later
   * submission. There is no `name` field on create — the display name is derived
   * from the template's content and can be changed afterwards with
   * `PUT /v3/templates/{id}`.
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
   * it for review. While the template is in review (status PENDING, or any channel
   * awaiting a verdict) its definition, category and language are frozen and a
   * resubmission is refused — those requests answer 409 CONFLICT_006. The display
   * name stays editable throughout.
   *
   * `definition`, `category` and `language` are editable only from status DRAFT,
   * REJECTED or APPROVED. An edit to any of them on a template in another state
   * (PAUSED, DISABLED or REVOKED) is refused with 400 VALIDATION_001 and the detail
   * "Template (except display name) cannot be updated unless it is in draft or
   * rejected status"; `name` stays editable in every state. `submit_for_review` on a
   * PAUSED, DISABLED or REVOKED template is accepted and answers 200, but opens no
   * review and does not move the status — only the reviewer can reinstate it.
   *
   * Editing an APPROVED template is a live edit: the new content is stored
   * immediately, and sending `submit_for_review: true` re-opens review, which
   * returns the affected channels to PENDING so they stop sending until they are
   * approved again. The previously approved content is never sent during re-review.
   * Watch the per-channel `templates` webhook events rather than assuming the
   * template-level status.
   *
   * Templates provisioned by Sent (light-onboarding templates, whose names carry the
   * reserved `sent_` prefix) are read-only: every field is refused with 400
   * VALIDATION*001 and the detail "This template is read-only. Only 'submit for
   * review' is allowed.", and only `submit_for_review` is accepted. A `name`
   * starting with `sent*` is refused for the same reason — the prefix is reserved.
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
   * // Automatically fetches more pages as needed.
   * for await (const template of client.templates.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    params: TemplateListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TemplatesTemplatesPage, Template> {
    const { 'x-profile-id': xProfileID, ...query } = params ?? {};
    return this._client.getAPIList('/v3/templates', TemplatesPage<Template>, {
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

export type TemplatesTemplatesPage = TemplatesPage<Template>;

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseTemplate {
  /**
   * Template response for v3 API
   */
  data?: Template | null;

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
 * Template response for v3 API
 */
export interface Template {
  /**
   * Which customer owns this — the key's own, or the profile named in x-profile-id.
   * Says whose resource this is, which the resource's own id does not.
   */
  customer_id: string;

  /**
   * Unique template identifier
   */
  id?: string;

  /**
   * Which consent keyword this template answers, when it is one of Sent's
   * auto-replies: OPT_IN, OPT_OUT, HELP, or OTHER for a customer-defined keyword.
   * Null for an ordinary template, and omitted from the response, so its presence is
   * the answer to "is this an auto-reply".
   *
   * Deliberately not required, unlike CustomerId, even though the same "no single
   * mapper" argument applies: NJsonSchema publishes a C# required member in the
   * schema's required array, so the contract would have advertised a field this
   * response omits for every ordinary template, and a generated client could refuse
   * the common case. A compile-time guard is not worth a wrong published contract.
   * Every mapping site sets it explicitly, and TemplateResponseSchemaTests pins the
   * field as optional so it cannot be reintroduced.
   */
  auto_reply_action?: string | null;

  /**
   * Template category: MARKETING, UTILITY, AUTHENTICATION
   */
  category?: string;

  /**
   * The channels this template's definition can render on, in canonical order: sms,
   * whatsapp, rcs.
   *
   * Derived from the definition's body, mirroring each channel's send-time fallback
   * chain, so a channel is listed only when a real body would be produced for it:
   * SMS reads sms ?? multiChannel, WhatsApp reads whatsapp ?? multiChannel, and RCS
   * reads rcs ?? multiChannel ?? sms. A multiChannel body therefore reports all
   * three, and the extra SMS fallback on RCS is why an sms/whatsapp pair reports RCS
   * too.
   *
   * This says what the content can render on, not what may be sent: sending also
   * needs the template approved for that channel.
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
   * Template status: DRAFT, PENDING, APPROVED, REJECTED. A template created with
   * submit_for_review: false starts as DRAFT and stays there until it is submitted.
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
 * Body section of a message template.
 *
 * A body picks one of two authoring strategies, and mixing them is refused
 * (TemplateDefinitionValidator.HaveValidChannelConfiguration): a shared
 * multiChannel body on its own, or an explicit sms + whatsapp pair, both present.
 *
 * multiChannel together with sms or whatsapp is rejected, and so is sms or
 * whatsapp on its own — every template is expected to be deliverable on every
 * channel. rcs is the one true override: it may accompany either strategy to vary
 * the copy, but cannot stand alone.
 */
export interface TemplateBody {
  /**
   * The shared body, used for every channel. One half of the choice described above.
   */
  multiChannel?: TemplateBodyContent | null;

  /**
   * RCS-specific copy that overrides the chosen strategy for RCS only. The one true
   * override: optional on top of either strategy, but it cannot be the only body
   * present. Its length cap is the higher one described on Template.
   */
  rcs?: TemplateBodyContent | null;

  /**
   * The SMS body. It does not override multiChannel, it replaces it.
   */
  sms?: TemplateBodyContent | null;

  /**
   * The WhatsApp body. It does not override multiChannel, it replaces it.
   */
  whatsapp?: TemplateBodyContent | null;
}

export interface TemplateBodyContent {
  /**
   * The body copy, with variables written as {{index:variable}}.
   *
   * Length cap depends on which channel this body belongs to:
   * TemplateContentLimits.MaxBodyLength (1024) for multiChannel, sms and whatsapp —
   * Meta's BODY limit, which a multiChannel body may be delivered under — and
   * TemplateContentLimits.MaxRcsBodyLength (3072) for an rcs body, which never
   * reaches Meta. The maxLength advertised on this schema is the 1024 one, because
   * all four channel bodies share this single schema — an rcs body between the two
   * is accepted.
   *
   * Meta requires every variable to carry surrounding context, so a body is refused
   * unless it also satisfies all of the following (enforced by
   * TemplateDefinitionValidator): At least one letter before the first variable and
   * after the last — trailing punctuation such as "... {{1:variable}}." does not
   * count. At least (2 × variable count) + 1 words once the placeholders are
   * removed. No two variables adjacent with only whitespace between them. No leading
   * or trailing newline, no more than two consecutive line breaks, and no more than
   * four consecutive spaces.
   *
   * Example: "Hello {{0:variable}}! Welcome to {{1:variable}}. We are glad to have
   * you on board." — two variables, so at least five words are required, and the
   * copy after the final variable contains letters.
   */
  template: string;

  /**
   * The type of body content — send "text". It is dropped from the stored definition
   * when null, so a body posted without it is saved with no type key at all and the
   * template editor has nothing to render the block from.
   */
  type?: string | null;

  /**
   * The variables referenced by the body copy, one entry per {{index:variable}}
   * placeholder.
   */
  variables?: Array<TemplateVariable> | null;
}

/**
 * Interactive button in a message template
 */
export interface TemplateButton {
  /**
   * Properties specific to the button type
   */
  props: TemplateButtonProps;

  /**
   * The type of button (e.g., QUICK_REPLY, URL, PHONE_NUMBER, VOICE_CALL, COPY_CODE)
   */
  type: string;

  /**
   * The button's identifier (1-based index), unique within the template.
   *
   * Omitting it is only safe for a template holding a single button. The field is a
   * non-nullable int, so every button that leaves it out defaults to 0, and two such
   * buttons are refused by the unique-id rule ("Button IDs must be unique"). Number
   * them from 1 in the order they should appear — order matters on RCS, where only
   * the first four buttons render.
   */
  id?: number;
}

export interface TemplateButtonProps {
  activeFor: number;

  countryCode: string;

  offerCode: string;

  phoneNumber: string;

  quickReplyType: string;

  /**
   * The button's label. Required for every button type, and capped at
   * TemplateContentLimits.MaxButtonTextLength (25) characters.
   *
   * Meta accepts only static text here, so a label is refused when it contains a
   * {{...}} variable placeholder, a newline, an emoji, or WhatsApp formatting markup
   * (\*, \_, ~) — enforced by ApplyButtonLabelContentRules in
   * TemplateButtonValidator. Meta reports all four as one error: "Buttons can't have
   * any variables, newlines, emojis, or formatting characters."
   *
   * AUTHENTICATION OTP buttons are the exception: Meta auto-localizes their label
   * from the template language, and the converter drops whatever text was sent.
   */
  text: string;

  url: string;

  urlType: string;

  /**
   * Variables embedded in a dynamic URL button (only when UrlType = dynamic). Count
   * is capped by TemplateContentLimits.MaxUrlButtonVariables; the placeholder must
   * appear at the end of Url (validated in TemplateDefinitionValidator).
   */
  variables: Array<TemplateVariable>;

  autofillText?: string | null;

  otpType?: string | null;

  packageName?: string | null;

  signatureHash?: string | null;
}

/**
 * Complete definition of a message template including header, body, footer, and
 * buttons
 */
export interface TemplateDefinition {
  /**
   * Body section of a message template.
   *
   * A body picks one of two authoring strategies, and mixing them is refused
   * (TemplateDefinitionValidator.HaveValidChannelConfiguration): a shared
   * multiChannel body on its own, or an explicit sms + whatsapp pair, both present.
   *
   * multiChannel together with sms or whatsapp is rejected, and so is sms or
   * whatsapp on its own — every template is expected to be deliverable on every
   * channel. rcs is the one true override: it may accompany either strategy to vary
   * the copy, but cannot stand alone.
   */
  body: TemplateBody;

  /**
   * Configuration for AUTHENTICATION category templates
   */
  authenticationConfig?: AuthenticationConfig | null;

  /**
   * Optional list of interactive buttons (e.g., quick replies, URLs, phone numbers)
   */
  buttons?: Array<TemplateButton> | null;

  /**
   * The version of the template definition format
   */
  definitionVersion?: string | null;

  /**
   * Footer section of a message template
   */
  footer?: TemplateFooter | null;

  /**
   * Header section of a message template
   */
  header?: TemplateHeader | null;
}

/**
 * Footer section of a message template
 */
export interface TemplateFooter {
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
  variables?: Array<TemplateVariable> | null;
}

/**
 * Header section of a message template
 */
export interface TemplateHeader {
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
  variables?: Array<TemplateVariable> | null;
}

export interface TemplateVariable {
  /**
   * The variable's name, and the key callers use for it in a send request's
   * parameters object. Must start with a letter and hold only letters, digits and
   * underscores.
   */
  name: string;

  props: TemplateVariable.Props;

  /**
   * One of variable, link or media. Decides which Props fields are required.
   */
  type: string;

  /**
   * The variable's index, and the number its {{index:variable}} placeholder refers
   * to.
   *
   * Omitting it is only safe for a section holding a single variable. The field is a
   * non-nullable int, so every variable that leaves it out defaults to 0, and a
   * section with two such variables is refused by the unique-id rule ("variables
   * must have unique IDs"). Number them from 0 in the order they appear.
   */
  id?: number;
}

export namespace TemplateVariable {
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
   * Body param: Complete definition of a message template including header, body,
   * footer, and buttons
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

export interface TemplateListParams extends TemplatesPageParams {
  /**
   * Query param: Optional category filter: MARKETING, UTILITY, AUTHENTICATION
   */
  category?: string | null;

  /**
   * Query param: Accepted and ignored. It used to filter on the welcome-playground
   * marker inside a template's LOB details; that filter is gone and nothing reads
   * this value, so sending it neither narrows nor widens the result. Retained only
   * so a client still passing is_welcome_playground keeps binding instead of the
   * request shape changing under it.
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
    type AuthenticationConfig as AuthenticationConfig,
    type Template as Template,
    type TemplateBody as TemplateBody,
    type TemplateBodyContent as TemplateBodyContent,
    type TemplateButton as TemplateButton,
    type TemplateButtonProps as TemplateButtonProps,
    type TemplateDefinition as TemplateDefinition,
    type TemplateFooter as TemplateFooter,
    type TemplateHeader as TemplateHeader,
    type TemplateVariable as TemplateVariable,
    type TemplatesTemplatesPage as TemplatesTemplatesPage,
    type TemplateCreateParams as TemplateCreateParams,
    type TemplateRetrieveParams as TemplateRetrieveParams,
    type TemplateUpdateParams as TemplateUpdateParams,
    type TemplateListParams as TemplateListParams,
    type TemplateDeleteParams as TemplateDeleteParams,
  };
}
