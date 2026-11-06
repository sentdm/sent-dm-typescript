// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { RequestInit, RequestInfo, BodyInit } from './internal/builtin-types';
import type { HTTPMethod, PromiseOrValue, MergedRequestInit, FinalizedRequestInit } from './internal/types';
import { uuid4 } from './internal/utils/uuid';
import { validatePositiveInteger, isAbsoluteURL, safeJSON } from './internal/utils/values';
import { sleep } from './internal/utils/sleep';
export type { Logger, LogLevel } from './internal/utils/log';
import { castToError, isAbortError } from './internal/errors';
import type { APIResponseProps } from './internal/parse';
import { getPlatformHeaders } from './internal/detect-platform';
import * as Shims from './internal/shims';
import * as Opts from './internal/request-options';
import { stringifyQuery } from './internal/utils/query';
import { VERSION } from './version';
import * as Errors from './core/error';
import * as Pagination from './core/pagination';
import {
  AbstractPage,
  type CallsPageParams,
  CallsPageResponse,
  type ContactsPageParams,
  ContactsPageResponse,
  type ConversationsPageParams,
  ConversationsPageResponse,
  type SenderProfilesPageParams,
  SenderProfilesPageResponse,
  type TemplatesPageParams,
  TemplatesPageResponse,
  type VoiceAgentsPageParams,
  VoiceAgentsPageResponse,
  type WebhookEventsPageParams,
  WebhookEventsPageResponse,
  type WebhooksPageParams,
  WebhooksPageResponse,
} from './core/pagination';
import * as Uploads from './core/uploads';
import * as API from './resources/index';
import { APIPromise } from './core/api-promise';
import {
  APIResponseOfComplianceRequirements,
  Compliance,
  ComplianceAttachmentTemplate,
  ComplianceRequirement,
  ComplianceRequirements,
  ComplianceRetrieveRequirementsParams,
  ComplianceSetupStep,
} from './resources/compliance';
import {
  APIResponseOfContact,
  APIResponseOfContactMessageSummary,
  APIResponseOfContactsList,
  ChannelScore,
  ContactCreateParams,
  ContactDeleteParams,
  ContactListParams,
  ContactMessageSummary,
  ContactResponse,
  ContactResponsesContactsPage,
  ContactRetrieveMessageSummaryParams,
  ContactRetrieveParams,
  ContactUpdateParams,
  Contacts,
  ContactsList,
} from './resources/contacts';
import {
  APIResponseOfConversationMessagesList,
  ConversationListMessagesParams,
  ConversationListParams,
  ConversationMessagesList,
  Conversations,
} from './resources/conversations';
import {
  APIResponseOfAccount,
  Account,
  AccountChannels,
  AccountProfile,
  AccountRcsChannel,
  AccountSMSChannel,
  AccountWhatsappChannel,
  Me,
  MeRetrieveParams,
  ProfileSettings,
} from './resources/me';
import {
  APIResponseOfCancelledMessage,
  APIResponseOfMessage,
  APIResponseOfMessageActivities,
  CancelledMessage,
  Message,
  MessageActivities,
  MessageActivity,
  MessageBody,
  MessageButton,
  MessageCancelParams,
  MessageChannelOptions,
  MessageHeaderMedia,
  MessageMedia,
  MessageRecipient,
  MessageResendParams,
  MessageRetrieveActivitiesParams,
  MessageRetrieveStatusParams,
  MessageSendParams,
  MessageSendResponse,
  MessageSendResult,
  MessageStatusEvent,
  Messages,
} from './resources/messages';
import {
  APIResponseOfNumberLookupResult,
  NumberLookupParams,
  NumberLookupResult,
  Numbers,
} from './resources/numbers';
import {
  APIResponseOfSenderProfile,
  APIResponseOfSenderProfilesList,
  SenderProfile,
  SenderProfileBilling,
  SenderProfileBillingRequest,
  SenderProfileChannels,
  SenderProfileCreateParams,
  SenderProfileListParams,
  SenderProfileRcs,
  SenderProfileSMS,
  SenderProfileUpdateParams,
  SenderProfileWhatsapp,
  SenderProfiles,
  SenderProfilesList,
  SenderProfilesSenderProfilesPage,
} from './resources/sender-profiles';
import {
  APIResponseOfTemplatesList,
  APIResponseTemplate,
  AuthenticationConfig,
  Template,
  TemplateBody,
  TemplateBodyContent,
  TemplateButton,
  TemplateButtonProps,
  TemplateCreateParams,
  TemplateDefinition,
  TemplateDeleteParams,
  TemplateFooter,
  TemplateHeader,
  TemplateHeaderLocation,
  TemplateListParams,
  TemplateMediaItem,
  TemplateMmsBodyContent,
  TemplateRef,
  TemplateRetrieveParams,
  TemplateUpdateParams,
  TemplateVariable,
  TemplateVariableProps,
  Templates,
  TemplatesList,
  TemplatesTemplatesPage,
} from './resources/templates';
import {
  APIResponseOfUser,
  APIResponseOfUsersList,
  UserInviteParams,
  UserListParams,
  UserRemoveParams,
  UserResponse,
  UserRetrieveParams,
  UserUpdateRoleParams,
  Users,
  UsersList,
} from './resources/users';
import {
  APIMeta,
  APIResponseOfWebhookEventTypesList,
  APIResponseOfWebhookEventsList,
  APIResponseOfWebhookSecret,
  APIResponseOfWebhookTest,
  APIResponseOfWebhooksList,
  APIResponseWebhook,
  CallEvent,
  CallEventPayload,
  ChannelEvent,
  ChannelEventPayload,
  ContactEvent,
  ContactEventPayload,
  ErrorDetail,
  InboundMedia,
  InboundMessageEvent,
  InboundMessageEventPayload,
  LinkEvent,
  LinkEventPayload,
  MessageEvent,
  MessageEventPayload,
  MutationRequest,
  PaginationCursors,
  PaginationMeta,
  TemplateEvent,
  TemplateEventPayload,
  WebhookCreateParams,
  WebhookDeleteParams,
  WebhookDeliveriesWebhookEventsPage,
  WebhookDelivery,
  WebhookEventType,
  WebhookEventTypesList,
  WebhookEventsList,
  WebhookListEventTypesParams,
  WebhookListEventsParams,
  WebhookListParams,
  WebhookResponse,
  WebhookResponsesWebhooksPage,
  WebhookRetrieveParams,
  WebhookRotateSecretParams,
  WebhookSecret,
  WebhookSenderProfile,
  WebhookSenderProfileConfig,
  WebhookTest,
  WebhookTestParams,
  WebhookToggleStatusParams,
  WebhookUpdateParams,
  Webhooks,
  WebhooksList,
} from './resources/webhooks';
import {
  APIResponseOfChannelsState,
  ChannelListParams,
  Channels,
  ChannelsState,
  MmsMarket,
} from './resources/channels/channels';
import {
  APIResponseOfProfileCompletionAccepted,
  APIResponseOfProfileCompletionResult,
  APIResponseOfProfileDetail,
  APIResponseOfProfilesList,
  BillingContact,
  BillingContactInfo,
  BrandBusiness,
  BrandBusinessInfo,
  BrandCompliance,
  BrandComplianceInfo,
  BrandContact,
  BrandContactInfo,
  BrandWithKYC,
  BrandsBrandData,
  DestinationCountry,
  EntityType,
  PaymentDetails,
  ProfileCompleteParams,
  ProfileCompletionAccepted,
  ProfileCompletionResult,
  ProfileCreateParams,
  ProfileDeleteParams,
  ProfileDetail,
  ProfileListParams,
  ProfileRetrieveParams,
  ProfileUpdateParams,
  Profiles,
  ProfilesList,
  TcrBrandIdentityStatus,
  TcrBrandRelationship,
  TcrBrandStatus,
  TcrCampaignStatus,
  TcrVertical,
} from './resources/profiles/profiles';
import { Voice } from './resources/voice/voice';
import { type Fetch } from './internal/builtin-types';
import { HeadersLike, NullableHeaders, buildHeaders } from './internal/headers';
import { FinalRequestOptions, RequestOptions } from './internal/request-options';
import { readEnv } from './internal/utils/env';
import {
  type LogLevel,
  type Logger,
  formatRequestDetails,
  loggerFor,
  parseLogLevel,
} from './internal/utils/log';
import { isEmptyObj } from './internal/utils/values';

export interface ClientOptions {
  /**
   * Customer API key for authentication. Use `sk_live_*` keys for production and `sk_test_*` keys for sandbox/testing. Pass via the `x-api-key` header.
   */
  apiKey?: string | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['SENT_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;
  /**
   * Additional `RequestInit` options to be passed to `fetch` calls.
   * Properties will be overridden by per-request `fetchOptions`.
   */
  fetchOptions?: MergedRequestInit | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersLike | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Record<string, string | undefined> | undefined;

  /**
   * Set the log level.
   *
   * Defaults to process.env['SENT_LOG'] or 'warn' if it isn't set.
   */
  logLevel?: LogLevel | undefined;

  /**
   * Set the logger.
   *
   * Defaults to globalThis.console.
   */
  logger?: Logger | undefined;
}

/**
 * API Client for interfacing with the Sent API.
 */
export class Sent {
  apiKey: string;

  baseURL: string;
  maxRetries: number;
  timeout: number;
  logger: Logger;
  logLevel: LogLevel | undefined;
  fetchOptions: MergedRequestInit | undefined;

  private fetch: Fetch;
  #encoder: Opts.RequestEncoder;
  protected idempotencyHeader?: string;
  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Sent API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['SENT_DM_API_KEY'] ?? undefined]
   * @param {string} [opts.baseURL=process.env['SENT_BASE_URL'] ?? https://api.sent.dm] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = readEnv('SENT_BASE_URL'),
    apiKey = readEnv('SENT_DM_API_KEY'),
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.SentError(
        "The SENT_DM_API_KEY environment variable is missing or empty; either provide it, or instantiate the Sent client with an apiKey option, like new Sent({ apiKey: 'My API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `https://api.sent.dm`,
    };

    this.baseURL = options.baseURL!;
    this.timeout = options.timeout ?? Sent.DEFAULT_TIMEOUT /* 1 minute */;
    this.logger = options.logger ?? console;
    const defaultLogLevel = 'warn';
    // Set default logLevel early so that we can log a warning in parseLogLevel.
    this.logLevel = defaultLogLevel;
    this.logLevel =
      parseLogLevel(options.logLevel, 'ClientOptions.logLevel', this) ??
      parseLogLevel(readEnv('SENT_LOG'), "process.env['SENT_LOG']", this) ??
      defaultLogLevel;
    this.fetchOptions = options.fetchOptions;
    this.maxRetries = options.maxRetries ?? 2;
    this.fetch = options.fetch ?? Shims.getDefaultFetch();
    this.#encoder = Opts.FallbackEncoder;

    const customHeadersEnv = readEnv('SENT_CUSTOM_HEADERS');
    if (customHeadersEnv) {
      const parsed: Record<string, string> = {};
      for (const line of customHeadersEnv.split('\n')) {
        const colon = line.indexOf(':');
        if (colon >= 0) {
          parsed[line.substring(0, colon).trim()] = line.substring(colon + 1).trim();
        }
      }
      options.defaultHeaders = { ...parsed, ...options.defaultHeaders };
    }

    this._options = options;

    this.apiKey = apiKey;
  }

  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options: Partial<ClientOptions>): this {
    const client = new (this.constructor as any as new (props: ClientOptions) => typeof this)({
      ...this._options,
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      ...options,
    });
    return client;
  }

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== 'https://api.sent.dm';
  }

  protected defaultQuery(): Record<string, string | undefined> | undefined {
    return this._options.defaultQuery;
  }

  protected validateHeaders({ values, nulls }: NullableHeaders) {
    return;
  }

  protected async authHeaders(opts: FinalRequestOptions): Promise<NullableHeaders | undefined> {
    return buildHeaders([{ 'x-api-key': this.apiKey }]);
  }

  /**
   * Basic re-implementation of `qs.stringify` for primitive types.
   */
  protected stringifyQuery(query: object | Record<string, unknown>): string {
    return stringifyQuery(query);
  }

  private getUserAgent(): string {
    return `${this.constructor.name}/JS ${VERSION}`;
  }

  protected defaultIdempotencyKey(): string {
    return `stainless-node-retry-${uuid4()}`;
  }

  protected makeStatusError(
    status: number,
    error: Object,
    message: string | undefined,
    headers: Headers,
  ): Errors.APIError {
    return Errors.APIError.generate(status, error, message, headers);
  }

  buildURL(
    path: string,
    query: Record<string, unknown> | null | undefined,
    defaultBaseURL?: string | undefined,
  ): string {
    const baseURL = (!this.#baseURLOverridden() && defaultBaseURL) || this.baseURL;
    const url =
      isAbsoluteURL(path) ?
        new URL(path)
      : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));

    const defaultQuery = this.defaultQuery();
    const pathQuery = Object.fromEntries(url.searchParams);
    if (!isEmptyObj(defaultQuery) || !isEmptyObj(pathQuery)) {
      query = { ...pathQuery, ...defaultQuery, ...query };
    }

    if (typeof query === 'object' && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query);
    }

    return url.toString();
  }

  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  protected async prepareOptions(options: FinalRequestOptions): Promise<void> {}

  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  protected async prepareRequest(
    request: RequestInit,
    { url, options }: { url: string; options: FinalRequestOptions },
  ): Promise<void> {}

  get<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('get', path, opts);
  }

  post<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('post', path, opts);
  }

  patch<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('patch', path, opts);
  }

  put<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('put', path, opts);
  }

  delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('delete', path, opts);
  }

  private methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    opts?: PromiseOrValue<RequestOptions>,
  ): APIPromise<Rsp> {
    return this.request(
      Promise.resolve(opts).then((opts) => {
        return { method, path, ...opts };
      }),
    );
  }

  request<Rsp>(
    options: PromiseOrValue<FinalRequestOptions>,
    remainingRetries: number | null = null,
  ): APIPromise<Rsp> {
    return new APIPromise(this, this.makeRequest(options, remainingRetries, undefined));
  }

  private async makeRequest(
    optionsInput: PromiseOrValue<FinalRequestOptions>,
    retriesRemaining: number | null,
    retryOfRequestLogID: string | undefined,
  ): Promise<APIResponseProps> {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }

    await this.prepareOptions(options);

    const { req, url, timeout } = await this.buildRequest(options, {
      retryCount: maxRetries - retriesRemaining,
    });

    await this.prepareRequest(req, { url, options });

    /** Not an API request ID, just for correlating local log entries. */
    const requestLogID = 'log_' + ((Math.random() * (1 << 24)) | 0).toString(16).padStart(6, '0');
    const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
    const startTime = Date.now();

    loggerFor(this).debug(
      `[${requestLogID}] sending request`,
      formatRequestDetails({
        retryOfRequestLogID,
        method: options.method,
        url,
        options,
        headers: req.headers,
      }),
    );

    if (options.signal?.aborted) {
      throw new Errors.APIUserAbortError();
    }

    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    const headersTime = Date.now();

    if (response instanceof globalThis.Error) {
      const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
      if (options.signal?.aborted) {
        throw new Errors.APIUserAbortError();
      }
      // detect native connection timeout errors
      // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
      // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
      // others do not provide enough information to distinguish timeouts from other connection errors
      const isTimeout =
        isAbortError(response) ||
        /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
      if (retriesRemaining) {
        loggerFor(this).info(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`,
        );
        loggerFor(this).debug(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url,
            durationMs: headersTime - startTime,
            message: response.message,
          }),
        );
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
      }
      loggerFor(this).info(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - error; no more retries left`,
      );
      loggerFor(this).debug(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (error; no more retries left)`,
        formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message,
        }),
      );
      if (isTimeout) {
        throw new Errors.APIConnectionTimeoutError();
      }
      throw new Errors.APIConnectionError({ cause: response });
    }

    const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${
      response.ok ? 'succeeded' : 'failed'
    } with status ${response.status} in ${headersTime - startTime}ms`;

    if (!response.ok) {
      const shouldRetry = await this.shouldRetry(response);
      if (retriesRemaining && shouldRetry) {
        const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;

        // We don't need the body of this response.
        await Shims.CancelReadableStream(response.body);
        loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
        loggerFor(this).debug(
          `[${requestLogID}] response error (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            durationMs: headersTime - startTime,
          }),
        );
        return this.retryRequest(
          options,
          retriesRemaining,
          retryOfRequestLogID ?? requestLogID,
          response.headers,
        );
      }

      const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;

      loggerFor(this).info(`${responseInfo} - ${retryMessage}`);

      const errText = await response.text().catch((err: any) => castToError(err).message);
      const errJSON = safeJSON(errText) as any;
      const errMessage = errJSON ? undefined : errText;

      loggerFor(this).debug(
        `[${requestLogID}] response error (${retryMessage})`,
        formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          message: errMessage,
          durationMs: Date.now() - startTime,
        }),
      );

      const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
      throw err;
    }

    loggerFor(this).info(responseInfo);
    loggerFor(this).debug(
      `[${requestLogID}] response start`,
      formatRequestDetails({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        headers: response.headers,
        durationMs: headersTime - startTime,
      }),
    );

    return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
  }

  getAPIList<Item, PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>>(
    path: string,
    Page: new (...args: any[]) => PageClass,
    opts?: PromiseOrValue<RequestOptions>,
  ): Pagination.PagePromise<PageClass, Item> {
    return this.requestAPIList(
      Page,
      opts && 'then' in opts ?
        opts.then((opts) => ({ method: 'get', path, ...opts }))
      : { method: 'get', path, ...opts },
    );
  }

  requestAPIList<
    Item = unknown,
    PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>,
  >(
    Page: new (...args: ConstructorParameters<typeof Pagination.AbstractPage>) => PageClass,
    options: PromiseOrValue<FinalRequestOptions>,
  ): Pagination.PagePromise<PageClass, Item> {
    const request = this.makeRequest(options, null, undefined);
    return new Pagination.PagePromise<PageClass, Item>(this as any as Sent, request, Page);
  }

  async fetchWithTimeout(
    url: RequestInfo,
    init: RequestInit | undefined,
    ms: number,
    controller: AbortController,
  ): Promise<Response> {
    const { signal, method, ...options } = init || {};
    const abort = this._makeAbort(controller);
    if (signal) signal.addEventListener('abort', abort, { once: true });

    const timeout = setTimeout(abort, ms);

    const isReadableBody =
      ((globalThis as any).ReadableStream && options.body instanceof (globalThis as any).ReadableStream) ||
      (typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body);

    const fetchOptions: RequestInit = {
      signal: controller.signal as any,
      ...(isReadableBody ? { duplex: 'half' } : {}),
      method: 'GET',
      ...options,
    };
    if (method) {
      // Custom methods like 'patch' need to be uppercased
      // See https://github.com/nodejs/undici/issues/2294
      fetchOptions.method = method.toUpperCase();
    }

    try {
      // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
      return await this.fetch.call(undefined, url, fetchOptions);
    } finally {
      clearTimeout(timeout);
    }
  }

  private async shouldRetry(response: Response): Promise<boolean> {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');

    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;

    // Retry on request timeouts.
    if (response.status === 408) return true;

    // Retry on lock timeouts.
    if (response.status === 409) return true;

    // Retry on rate limits.
    if (response.status === 429) return true;

    // Retry internal errors.
    if (response.status >= 500) return true;

    return false;
  }

  private async retryRequest(
    options: FinalRequestOptions,
    retriesRemaining: number,
    requestLogID: string,
    responseHeaders?: Headers | undefined,
  ): Promise<APIResponseProps> {
    let timeoutMillis: number | undefined;

    // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
    const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }

    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    const retryAfterHeader = responseHeaders?.get('retry-after');
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1000;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }

    // If the API asks us to wait a certain amount of time, just do what it
    // says, but otherwise calculate a default
    if (timeoutMillis === undefined) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);

    return this.makeRequest(options, retriesRemaining - 1, requestLogID);
  }

  private calculateDefaultRetryTimeoutMillis(retriesRemaining: number, maxRetries: number): number {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8.0;

    const numRetries = maxRetries - retriesRemaining;

    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);

    // Apply some jitter, take up to at most 25 percent of the retry time.
    const jitter = 1 - Math.random() * 0.25;

    return sleepSeconds * jitter * 1000;
  }

  async buildRequest(
    inputOptions: FinalRequestOptions,
    { retryCount = 0 }: { retryCount?: number } = {},
  ): Promise<{ req: FinalizedRequestInit; url: string; timeout: number }> {
    const options = { ...inputOptions };
    const { method, path, query, defaultBaseURL } = options;

    const url = this.buildURL(path!, query as Record<string, unknown>, defaultBaseURL);
    if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = await this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });

    const req: FinalizedRequestInit = {
      method,
      headers: reqHeaders,
      ...(options.signal && { signal: options.signal }),
      ...((globalThis as any).ReadableStream &&
        body instanceof (globalThis as any).ReadableStream && { duplex: 'half' }),
      ...(body && { body }),
      ...((this.fetchOptions as any) ?? {}),
      ...((options.fetchOptions as any) ?? {}),
    };

    return { req, url, timeout: options.timeout };
  }

  private async buildHeaders({
    options,
    method,
    bodyHeaders,
    retryCount,
  }: {
    options: FinalRequestOptions;
    method: HTTPMethod;
    bodyHeaders: HeadersLike;
    retryCount: number;
  }): Promise<Headers> {
    let idempotencyHeaders: HeadersLike = {};
    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
    }

    const headers = buildHeaders([
      idempotencyHeaders,
      {
        Accept: 'application/json',
        'User-Agent': this.getUserAgent(),
        'X-Stainless-Retry-Count': String(retryCount),
        ...(options.timeout ? { 'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000)) } : {}),
        ...getPlatformHeaders(),
      },
      await this.authHeaders(options),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers,
    ]);

    this.validateHeaders(headers);

    return headers.values;
  }

  private _makeAbort(controller: AbortController) {
    // note: we can't just inline this method inside `fetchWithTimeout()` because then the closure
    //       would capture all request options, and cause a memory leak.
    return () => controller.abort();
  }

  private buildBody({ options }: { options: FinalRequestOptions }): {
    bodyHeaders: HeadersLike;
    body: BodyInit | undefined;
  } {
    const { body, headers: rawHeaders } = options;
    if (!body) {
      // A resource method always passes a `body` key when its operation defines a
      // request body, even if the caller omitted an optional body param. Keep the
      // content-type for those, and only elide it for operations with no body at
      // all (e.g. GET/DELETE).
      if (body == null && 'body' in options) {
        return this.#encoder({ body, headers: buildHeaders([rawHeaders]) });
      }
      return { bodyHeaders: undefined, body: undefined };
    }
    const headers = buildHeaders([rawHeaders]);
    if (
      // Pass raw type verbatim
      ArrayBuffer.isView(body) ||
      body instanceof ArrayBuffer ||
      body instanceof DataView ||
      (typeof body === 'string' &&
        // Preserve legacy string encoding behavior for now
        headers.values.has('content-type')) ||
      // `Blob` is superset of `File`
      ((globalThis as any).Blob && body instanceof (globalThis as any).Blob) ||
      // `FormData` -> `multipart/form-data`
      body instanceof FormData ||
      // `URLSearchParams` -> `application/x-www-form-urlencoded`
      body instanceof URLSearchParams ||
      // Send chunked stream (each chunk has own `length`)
      ((globalThis as any).ReadableStream && body instanceof (globalThis as any).ReadableStream)
    ) {
      return { bodyHeaders: undefined, body: body as BodyInit };
    } else if (
      typeof body === 'object' &&
      (Symbol.asyncIterator in body ||
        (Symbol.iterator in body && 'next' in body && typeof body.next === 'function'))
    ) {
      return { bodyHeaders: undefined, body: Shims.ReadableStreamFrom(body as AsyncIterable<Uint8Array>) };
    } else if (
      typeof body === 'object' &&
      headers.values.get('content-type') === 'application/x-www-form-urlencoded'
    ) {
      return {
        bodyHeaders: { 'content-type': 'application/x-www-form-urlencoded' },
        body: this.stringifyQuery(body),
      };
    } else {
      return this.#encoder({ body, headers });
    }
  }

  static Sent = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static SentError = Errors.SentError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;

  /**
   * Delivery reports and inbound messages, pushed to you.
   *
   * Subscribe an endpoint to the event types you care about — `GET /v3/webhooks/event-types` lists them — and we POST each one as it happens, retrying on failure. Polling `GET /v3/messages/{id}` works and does not scale.
   *
   * **Verify the signature.** Every delivery is signed with your endpoint's secret; an unverified endpoint is one anybody can post to. `rotate-secret` replaces it, `test` sends a specimen event, and `GET /v3/webhooks/{id}/events` shows what we tried to deliver and what your endpoint answered — which is the first place to look when something appears to be missing.
   */
  webhooks: API.Webhooks = new API.Webhooks(this);
  /**
   * The people who can sign in to your organization, and what each may do.
   *
   * Users are dashboard access and nothing else — they do not send, and removing one does not affect traffic. An API key is not a user: it belongs to the organization or to a sender profile, so revoking a person's access leaves your integration running.
   */
  users: API.Users = new API.Users(this);
  /**
   * Reusable message bodies with named variables.
   *
   * A template is substituted at send time from the values you pass, so the copy lives here rather than in your application. WhatsApp templates additionally need Meta's approval before they can be sent, and a template's channel status reports where that stands — an approved SMS template and an unapproved WhatsApp one are the same template in two states.
   */
  templates: API.Templates = new API.Templates(this);
  /**
   * **Deprecated — use Sender Profiles.**
   *
   * The original profile resource, kept because it has live callers. It still works, and its replacement is `/v3/sender-profiles`, which takes the identity and the campaign in one call instead of across three.
   *
   * New integrations should not start here.
   */
  profiles: API.Profiles = new API.Profiles(this);
  /**
   * Your customers, each sending as itself.
   *
   * A sender profile is a tenant of yours: it has its own API key, its own balance, and can have its own identity and senders — so your customers send under their own brand and never see Sent. Depth is one; a profile cannot create profiles.
   *
   * **Everything is inherited unless the profile owns it.** `{ "name": "…" }` alone gives you a usable profile immediately, running on your identity, your inbox and your billing. Supply a capability's fields and the profile owns that one instead.
   *
   * **A sender is the exception.** A brand and a campaign can be inherited; a number cannot. A profile either has a sender of its own or terminates through your shared routes.
   *
   * To act for a profile on any other resource, send `x-profile-id` with your organization key rather than looking for a parallel set of endpoints.
   */
  senderProfiles: API.SenderProfiles = new API.SenderProfiles(this);
  /**
   * What a phone number actually is, before you send to it.
   *
   * A lookup returns the number's country, line type and carrier, which is what decides whether it is reachable on a channel and what it costs. Worth doing on import rather than on send: a landline in a contact list is a message that can never be delivered.
   */
  numbers: API.Numbers = new API.Numbers(this);
  /**
   * Send a message and follow what happened to it.
   *
   * One endpoint sends on any channel: pass `channel: "sent"` and we pick between SMS, WhatsApp and RCS per recipient using your routing rules, or name a channel to pin it. A send is accepted asynchronously — `POST /v3/messages` returns an id, and delivery is reported through `GET /v3/messages/{id}`, its activities, or a webhook.
   *
   * **A message needs a sender.** What you can send, where, and at what cost is decided by the markets under **Channels** — so a recipient in a country you hold no sender for is refused here rather than queued.
   *
   * **A message can be resent on its id.** `POST /v3/messages/{id}/resend` puts a finished message — typically one BLOCKED for insufficient balance — back through the send pipeline. It is a new attempt, not a free retry: every policy runs again, the message is billed again, and its status webhooks fire again. A FILTERED message is never resendable.
   *
   * **A scheduled message can be called off.** `POST /v3/messages/{id}/cancel` cancels a send you scheduled with `scheduled_at`, as long as it has not been released yet. Cancelling is free, fires `message.cancelled`, and is final — a cancelled message cannot be resent.
   */
  messages: API.Messages = new API.Messages(this);
  /**
   * The people you message, and their channel identities.
   *
   * A contact holds one identity per channel — a phone number, a WhatsApp number — so routing can choose between them for the same person. Opt-out is recorded against the contact and honoured on every send, whichever channel it came through.
   *
   * `GET /v3/contacts/{id}/message-summary` is the per-contact view of what you have sent and what happened to it.
   */
  contacts: API.Contacts = new API.Contacts(this);
  /**
   * Inbound and outbound messages, grouped by the person they are with.
   *
   * A conversation is the thread for one contact across every channel — a reply by SMS and one by WhatsApp belong to the same conversation, because they are the same person talking to you.
   *
   * Read-only. Sending is **Messages**; a reply arrives here and through your webhooks.
   */
  conversations: API.Conversations = new API.Conversations(this);
  voice: API.Voice = new API.Voice(this);
  /**
   * The senders you send from, one per channel.
   *
   * **SMS is a list of markets**, each keyed by `(country, number_type)` — a customer can hold `us/10dlc` and `gb/alphanumeric` at once, so a market is addressed by the pair rather than by country alone. **WhatsApp and RCS are single**: a customer has one business account and one agent. **Voice is per number**: each number you hold can carry phone calls on its own (`POST /v3/channels/voice`), each with the callback URL Sent asks what to do with its calls, one of them is the default line for calls placed from your app, and voice tokens are minted with `POST /v3/voice/tokens`. Read your voice numbers with `GET /v3/channels/voice` and change one with `PATCH /v3/channels/voice/{number}`.
   *
   * ## Compliance lives on the market
   *
   * Adding a market records everything that market registers with, in its `compliance` object. Only **US `TEN_DLC`** registers with a regime — The Campaign Registry — and it is the only market whose compliance carries `brand` and `campaign`. Everywhere else compliance is documents, and many markets ask for none at all.
   *
   * `GET` and `PATCH` on a market return and accept the same shape, so what comes back can be sent back: an omitted key is left alone, and a key reported in `requirements` is the path into the body that clears it.
   *
   * Call `GET /v3/compliance/requirements` first — it answers what a market demands before you hold it, with a body you can fill in and post.
   */
  channels: API.Channels = new API.Channels(this);
  /**
   * What a market demands, before you have it.
   *
   * Requirements vary enormously and change without notice. US `TEN_DLC` registers a brand and a campaign with The Campaign Registry and asks a substantial set of questions; an alphanumeric sender pre-registers with documents in one country and needs nothing in another.
   *
   * This is the authoritative answer for whichever market you ask about, and it is generated from the same declaration that validates the calls themselves — so it cannot drift from what is actually enforced. The response includes the request body to send, with every key that market wants already present and blank.
   *
   * What you supplied, as opposed to what is asked of you, is reported on the market under **Channels**.
   */
  compliance: API.Compliance = new API.Compliance(this);
  /**
   * Who the current key is.
   *
   * `GET /v3/me` answers with the account the key authenticates as, which is the quickest way to tell a live key from a test one, an organization key from a sender profile's, and to confirm `x-profile-id` resolved to the profile you meant.
   */
  me: API.Me = new API.Me(this);
}

Sent.Webhooks = Webhooks;
Sent.Users = Users;
Sent.Templates = Templates;
Sent.Profiles = Profiles;
Sent.SenderProfiles = SenderProfiles;
Sent.Numbers = Numbers;
Sent.Messages = Messages;
Sent.Contacts = Contacts;
Sent.Conversations = Conversations;
Sent.Voice = Voice;
Sent.Channels = Channels;
Sent.Compliance = Compliance;
Sent.Me = Me;

export declare namespace Sent {
  export type RequestOptions = Opts.RequestOptions;

  export import ContactsPage = Pagination.ContactsPage;
  export { type ContactsPageParams as ContactsPageParams, type ContactsPageResponse as ContactsPageResponse };

  export import ConversationsPage = Pagination.ConversationsPage;
  export {
    type ConversationsPageParams as ConversationsPageParams,
    type ConversationsPageResponse as ConversationsPageResponse,
  };

  export import TemplatesPage = Pagination.TemplatesPage;
  export {
    type TemplatesPageParams as TemplatesPageParams,
    type TemplatesPageResponse as TemplatesPageResponse,
  };

  export import WebhooksPage = Pagination.WebhooksPage;
  export { type WebhooksPageParams as WebhooksPageParams, type WebhooksPageResponse as WebhooksPageResponse };

  export import WebhookEventsPage = Pagination.WebhookEventsPage;
  export {
    type WebhookEventsPageParams as WebhookEventsPageParams,
    type WebhookEventsPageResponse as WebhookEventsPageResponse,
  };

  export import CallsPage = Pagination.CallsPage;
  export { type CallsPageParams as CallsPageParams, type CallsPageResponse as CallsPageResponse };

  export import VoiceAgentsPage = Pagination.VoiceAgentsPage;
  export {
    type VoiceAgentsPageParams as VoiceAgentsPageParams,
    type VoiceAgentsPageResponse as VoiceAgentsPageResponse,
  };

  export import SenderProfilesPage = Pagination.SenderProfilesPage;
  export {
    type SenderProfilesPageParams as SenderProfilesPageParams,
    type SenderProfilesPageResponse as SenderProfilesPageResponse,
  };

  export {
    Webhooks as Webhooks,
    type APIMeta as APIMeta,
    type APIResponseOfWebhookEventTypesList as APIResponseOfWebhookEventTypesList,
    type APIResponseOfWebhookEventsList as APIResponseOfWebhookEventsList,
    type APIResponseOfWebhookSecret as APIResponseOfWebhookSecret,
    type APIResponseOfWebhookTest as APIResponseOfWebhookTest,
    type APIResponseOfWebhooksList as APIResponseOfWebhooksList,
    type APIResponseWebhook as APIResponseWebhook,
    type CallEvent as CallEvent,
    type CallEventPayload as CallEventPayload,
    type ChannelEvent as ChannelEvent,
    type ChannelEventPayload as ChannelEventPayload,
    type ContactEvent as ContactEvent,
    type ContactEventPayload as ContactEventPayload,
    type ErrorDetail as ErrorDetail,
    type InboundMedia as InboundMedia,
    type InboundMessageEvent as InboundMessageEvent,
    type InboundMessageEventPayload as InboundMessageEventPayload,
    type LinkEvent as LinkEvent,
    type LinkEventPayload as LinkEventPayload,
    type MessageEvent as MessageEvent,
    type MessageEventPayload as MessageEventPayload,
    type MutationRequest as MutationRequest,
    type PaginationCursors as PaginationCursors,
    type PaginationMeta as PaginationMeta,
    type TemplateEvent as TemplateEvent,
    type TemplateEventPayload as TemplateEventPayload,
    type WebhookDelivery as WebhookDelivery,
    type WebhookEventType as WebhookEventType,
    type WebhookEventTypesList as WebhookEventTypesList,
    type WebhookEventsList as WebhookEventsList,
    type WebhookResponse as WebhookResponse,
    type WebhookSecret as WebhookSecret,
    type WebhookSenderProfile as WebhookSenderProfile,
    type WebhookSenderProfileConfig as WebhookSenderProfileConfig,
    type WebhookTest as WebhookTest,
    type WebhooksList as WebhooksList,
    type WebhookResponsesWebhooksPage as WebhookResponsesWebhooksPage,
    type WebhookDeliveriesWebhookEventsPage as WebhookDeliveriesWebhookEventsPage,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookRetrieveParams as WebhookRetrieveParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListParams as WebhookListParams,
    type WebhookDeleteParams as WebhookDeleteParams,
    type WebhookListEventTypesParams as WebhookListEventTypesParams,
    type WebhookListEventsParams as WebhookListEventsParams,
    type WebhookRotateSecretParams as WebhookRotateSecretParams,
    type WebhookTestParams as WebhookTestParams,
    type WebhookToggleStatusParams as WebhookToggleStatusParams,
  };

  export {
    Users as Users,
    type APIResponseOfUser as APIResponseOfUser,
    type APIResponseOfUsersList as APIResponseOfUsersList,
    type UserResponse as UserResponse,
    type UsersList as UsersList,
    type UserRetrieveParams as UserRetrieveParams,
    type UserListParams as UserListParams,
    type UserInviteParams as UserInviteParams,
    type UserRemoveParams as UserRemoveParams,
    type UserUpdateRoleParams as UserUpdateRoleParams,
  };

  export {
    Templates as Templates,
    type APIResponseOfTemplatesList as APIResponseOfTemplatesList,
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
    type TemplateHeaderLocation as TemplateHeaderLocation,
    type TemplateMediaItem as TemplateMediaItem,
    type TemplateMmsBodyContent as TemplateMmsBodyContent,
    type TemplateRef as TemplateRef,
    type TemplateVariable as TemplateVariable,
    type TemplateVariableProps as TemplateVariableProps,
    type TemplatesList as TemplatesList,
    type TemplatesTemplatesPage as TemplatesTemplatesPage,
    type TemplateCreateParams as TemplateCreateParams,
    type TemplateRetrieveParams as TemplateRetrieveParams,
    type TemplateUpdateParams as TemplateUpdateParams,
    type TemplateListParams as TemplateListParams,
    type TemplateDeleteParams as TemplateDeleteParams,
  };

  export {
    Profiles as Profiles,
    type APIResponseOfProfileCompletionAccepted as APIResponseOfProfileCompletionAccepted,
    type APIResponseOfProfileCompletionResult as APIResponseOfProfileCompletionResult,
    type APIResponseOfProfileDetail as APIResponseOfProfileDetail,
    type APIResponseOfProfilesList as APIResponseOfProfilesList,
    type BillingContact as BillingContact,
    type BillingContactInfo as BillingContactInfo,
    type BrandBusiness as BrandBusiness,
    type BrandBusinessInfo as BrandBusinessInfo,
    type BrandCompliance as BrandCompliance,
    type BrandComplianceInfo as BrandComplianceInfo,
    type BrandContact as BrandContact,
    type BrandContactInfo as BrandContactInfo,
    type BrandWithKYC as BrandWithKYC,
    type BrandsBrandData as BrandsBrandData,
    type DestinationCountry as DestinationCountry,
    type EntityType as EntityType,
    type PaymentDetails as PaymentDetails,
    type ProfileCompletionAccepted as ProfileCompletionAccepted,
    type ProfileCompletionResult as ProfileCompletionResult,
    type ProfileDetail as ProfileDetail,
    type ProfilesList as ProfilesList,
    type TcrBrandIdentityStatus as TcrBrandIdentityStatus,
    type TcrBrandRelationship as TcrBrandRelationship,
    type TcrBrandStatus as TcrBrandStatus,
    type TcrCampaignStatus as TcrCampaignStatus,
    type TcrVertical as TcrVertical,
    type ProfileCreateParams as ProfileCreateParams,
    type ProfileRetrieveParams as ProfileRetrieveParams,
    type ProfileUpdateParams as ProfileUpdateParams,
    type ProfileListParams as ProfileListParams,
    type ProfileDeleteParams as ProfileDeleteParams,
    type ProfileCompleteParams as ProfileCompleteParams,
  };

  export {
    SenderProfiles as SenderProfiles,
    type APIResponseOfSenderProfile as APIResponseOfSenderProfile,
    type APIResponseOfSenderProfilesList as APIResponseOfSenderProfilesList,
    type SenderProfile as SenderProfile,
    type SenderProfileBilling as SenderProfileBilling,
    type SenderProfileBillingRequest as SenderProfileBillingRequest,
    type SenderProfileChannels as SenderProfileChannels,
    type SenderProfileRcs as SenderProfileRcs,
    type SenderProfileSMS as SenderProfileSMS,
    type SenderProfileWhatsapp as SenderProfileWhatsapp,
    type SenderProfilesList as SenderProfilesList,
    type SenderProfilesSenderProfilesPage as SenderProfilesSenderProfilesPage,
    type SenderProfileCreateParams as SenderProfileCreateParams,
    type SenderProfileUpdateParams as SenderProfileUpdateParams,
    type SenderProfileListParams as SenderProfileListParams,
  };

  export {
    Numbers as Numbers,
    type APIResponseOfNumberLookupResult as APIResponseOfNumberLookupResult,
    type NumberLookupResult as NumberLookupResult,
    type NumberLookupParams as NumberLookupParams,
  };

  export {
    Messages as Messages,
    type APIResponseOfCancelledMessage as APIResponseOfCancelledMessage,
    type APIResponseOfMessage as APIResponseOfMessage,
    type APIResponseOfMessageActivities as APIResponseOfMessageActivities,
    type CancelledMessage as CancelledMessage,
    type Message as Message,
    type MessageActivities as MessageActivities,
    type MessageActivity as MessageActivity,
    type MessageBody as MessageBody,
    type MessageButton as MessageButton,
    type MessageChannelOptions as MessageChannelOptions,
    type MessageHeaderMedia as MessageHeaderMedia,
    type MessageMedia as MessageMedia,
    type MessageRecipient as MessageRecipient,
    type MessageSendResponse as MessageSendResponse,
    type MessageSendResult as MessageSendResult,
    type MessageStatusEvent as MessageStatusEvent,
    type MessageCancelParams as MessageCancelParams,
    type MessageResendParams as MessageResendParams,
    type MessageRetrieveActivitiesParams as MessageRetrieveActivitiesParams,
    type MessageRetrieveStatusParams as MessageRetrieveStatusParams,
    type MessageSendParams as MessageSendParams,
  };

  export {
    Contacts as Contacts,
    type APIResponseOfContact as APIResponseOfContact,
    type APIResponseOfContactMessageSummary as APIResponseOfContactMessageSummary,
    type APIResponseOfContactsList as APIResponseOfContactsList,
    type ChannelScore as ChannelScore,
    type ContactMessageSummary as ContactMessageSummary,
    type ContactResponse as ContactResponse,
    type ContactsList as ContactsList,
    type ContactResponsesContactsPage as ContactResponsesContactsPage,
    type ContactCreateParams as ContactCreateParams,
    type ContactRetrieveParams as ContactRetrieveParams,
    type ContactUpdateParams as ContactUpdateParams,
    type ContactListParams as ContactListParams,
    type ContactDeleteParams as ContactDeleteParams,
    type ContactRetrieveMessageSummaryParams as ContactRetrieveMessageSummaryParams,
  };

  export {
    Conversations as Conversations,
    type APIResponseOfConversationMessagesList as APIResponseOfConversationMessagesList,
    type ConversationMessagesList as ConversationMessagesList,
    type ConversationListParams as ConversationListParams,
    type ConversationListMessagesParams as ConversationListMessagesParams,
  };

  export { Voice as Voice };

  export {
    Channels as Channels,
    type APIResponseOfChannelsState as APIResponseOfChannelsState,
    type ChannelsState as ChannelsState,
    type MmsMarket as MmsMarket,
    type ChannelListParams as ChannelListParams,
  };

  export {
    Compliance as Compliance,
    type APIResponseOfComplianceRequirements as APIResponseOfComplianceRequirements,
    type ComplianceAttachmentTemplate as ComplianceAttachmentTemplate,
    type ComplianceRequirement as ComplianceRequirement,
    type ComplianceRequirements as ComplianceRequirements,
    type ComplianceSetupStep as ComplianceSetupStep,
    type ComplianceRetrieveRequirementsParams as ComplianceRetrieveRequirementsParams,
  };

  export {
    Me as Me,
    type Account as Account,
    type AccountChannels as AccountChannels,
    type AccountProfile as AccountProfile,
    type AccountRcsChannel as AccountRcsChannel,
    type AccountSMSChannel as AccountSMSChannel,
    type AccountWhatsappChannel as AccountWhatsappChannel,
    type APIResponseOfAccount as APIResponseOfAccount,
    type ProfileSettings as ProfileSettings,
    type MeRetrieveParams as MeRetrieveParams,
  };
}
