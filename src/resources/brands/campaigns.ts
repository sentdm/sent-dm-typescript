// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CampaignsAPI from './campaigns';
import * as WebhooksAPI from '../webhooks';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Campaigns extends APIResource {
  /**
   * Creates a new campaign scoped under a specific brand. The campaign is linked to
   * the specified brand. Each campaign must include at least one use case with
   * sample messages.
   *
   * @example
   * ```ts
   * const apiResponseTcrCampaignWithUseCases =
   *   await client.brands.campaigns.create(
   *     'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
   *     {
   *       campaign: {
   *         description:
   *           'Appointment reminders and account notifications',
   *         name: 'Customer Notifications',
   *         type: 'App',
   *         useCases: [
   *           {
   *             messagingUseCaseUs: 'ACCOUNT_NOTIFICATION',
   *             sampleMessages: [
   *               'Hi {name}, your appointment is confirmed for {date} at {time}.',
   *               'Your order #{order_id} has been shipped. Track at {url}',
   *             ],
   *           },
   *         ],
   *       },
   *     },
   *   );
   * ```
   */
  create(
    brandID: string,
    params: CampaignCreateParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseTcrCampaignWithUseCases> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post(path`/v3/brands/${brandID}/campaigns`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Updates an existing campaign scoped under a specific brand. Cannot update
   * campaigns that have already been submitted to TCR.
   *
   * @example
   * ```ts
   * const apiResponseTcrCampaignWithUseCases =
   *   await client.brands.campaigns.update(
   *     'b2c3d4e5-f6a7-8901-bcde-f12345678901',
   *     {
   *       brandId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
   *       campaign: {
   *         description:
   *           'Updated appointment reminders and account notifications',
   *         name: 'Customer Notifications Updated',
   *         type: 'App',
   *         useCases: [
   *           {
   *             messagingUseCaseUs: 'ACCOUNT_NOTIFICATION',
   *             sampleMessages: [
   *               'Hi {name}, your appointment is confirmed for {date} at {time}.',
   *               'Your order #{order_id} has been shipped. Track at {url}',
   *             ],
   *           },
   *         ],
   *       },
   *     },
   *   );
   * ```
   */
  update(
    campaignID: string,
    params: CampaignUpdateParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseTcrCampaignWithUseCases> {
    const { brandId, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.put(path`/v3/brands/${brandId}/campaigns/${campaignID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves all campaigns linked to a specific brand, including their use cases
   * and sample messages.
   *
   * @example
   * ```ts
   * const campaigns = await client.brands.campaigns.list(
   *   'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
   * );
   * ```
   */
  list(brandID: string, options?: RequestOptions): APIPromise<CampaignListResponse> {
    return this._client.get(path`/v3/brands/${brandID}/campaigns`, options);
  }

  /**
   * Deletes a campaign by ID within a specific brand. The brand must belong to the
   * authenticated customer.
   *
   * @example
   * ```ts
   * await client.brands.campaigns.delete(
   *   'b2c3d4e5-f6a7-8901-bcde-f12345678901',
   *   {
   *     brandId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
   *     body: {},
   *   },
   * );
   * ```
   */
  delete(campaignID: string, params: CampaignDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { brandId, body } = params;
    return this._client.delete(path`/v3/brands/${brandId}/campaigns/${campaignID}`, {
      body: body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': '*/*', Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseTcrCampaignWithUseCases {
  /**
   * The response data (null if error)
   */
  data?: TcrCampaignWithUseCases | null;

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

export interface BaseDto {
  /**
   * Unique identifier
   */
  id?: string;

  createdAt?: string;

  updatedAt?: string | null;
}

/**
 * Campaign data for create or update operation
 */
export interface CampaignData {
  /**
   * Campaign description
   */
  description: string;

  /**
   * Campaign name
   */
  name: string;

  /**
   * Campaign type (e.g., "KYC", "App")
   */
  type: string;

  /**
   * List of use cases with sample messages
   */
  useCases: Array<SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseData>;

  /**
   * Comma-separated keywords that trigger help message (e.g., "HELP, INFO, SUPPORT")
   */
  helpKeywords?: string | null;

  /**
   * Message sent when user requests help
   */
  helpMessage?: string | null;

  /**
   * Description of how messages flow in the campaign
   */
  messageFlow?: string | null;

  /**
   * Comma-separated keywords that trigger opt-in (e.g., "YES, START, SUBSCRIBE")
   */
  optinKeywords?: string | null;

  /**
   * Message sent when user opts in
   */
  optinMessage?: string | null;

  /**
   * Comma-separated keywords that trigger opt-out (e.g., "STOP, UNSUBSCRIBE, END")
   */
  optoutKeywords?: string | null;

  /**
   * Message sent when user opts out
   */
  optoutMessage?: string | null;

  /**
   * URL to privacy policy
   */
  privacyPolicyLink?: string | null;

  /**
   * URL to terms and conditions
   */
  termsAndConditionsLink?: string | null;
}

export type MessagingUseCaseUs =
  | 'MARKETING'
  | 'ACCOUNT_NOTIFICATION'
  | 'CUSTOMER_CARE'
  | 'FRAUD_ALERT'
  | 'TWO_FA'
  | 'DELIVERY_NOTIFICATION'
  | 'SECURITY_ALERT'
  | 'M2M'
  | 'MIXED'
  | 'HIGHER_EDUCATION'
  | 'POLLING_VOTING'
  | 'PUBLIC_SERVICE_ANNOUNCEMENT'
  | 'LOW_VOLUME';

/**
 * Campaign use case with sample messages
 */
export interface SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseData {
  /**
   * US messaging use case category
   */
  messagingUseCaseUs: MessagingUseCaseUs;

  /**
   * Sample messages for this use case (1-5 messages, max 1024 characters each)
   */
  sampleMessages: Array<string>;
}

export interface TcrCampaignWithUseCases extends BaseDto {
  billedDate?: string | null;

  brandId?: string | null;

  cost?: number | null;

  cspId?: string | null;

  customerId?: string;

  description?: string;

  helpKeywords?: string | null;

  helpMessage?: string | null;

  kycSubmissionFormId?: string | null;

  messageFlow?: string | null;

  name?: string;

  optinKeywords?: string | null;

  optinMessage?: string | null;

  optoutKeywords?: string | null;

  optoutMessage?: string | null;

  privacyPolicyLink?: string | null;

  resellerId?: string | null;

  sharingStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED' | null;

  status?: 'SENT_CREATED' | 'ACTIVE' | 'EXPIRED' | null;

  submittedAt?: string | null;

  submittedToTCR?: boolean;

  tcrCampaignId?: string | null;

  tcrSyncError?: string | null;

  telnyxCampaignId?: string | null;

  termsAndConditionsLink?: string | null;

  type?: string;

  upstreamCnpId?: string | null;

  useCases?: Array<TcrCampaignWithUseCases.UseCase>;
}

export namespace TcrCampaignWithUseCases {
  export interface UseCase extends CampaignsAPI.BaseDto {
    campaignId?: string;

    customerId?: string;

    messagingUseCaseUs?: CampaignsAPI.MessagingUseCaseUs;

    sampleMessages?: Array<string>;
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface CampaignListResponse {
  /**
   * The response data (null if error)
   */
  data?: Array<TcrCampaignWithUseCases> | null;

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

export interface CampaignCreateParams {
  /**
   * Body param: Campaign data
   */
  campaign: CampaignData;

  /**
   * Body param: Test mode flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  test_mode?: boolean;

  /**
   * Header param: Unique key to ensure idempotent request processing. Must be 1-255
   * alphanumeric characters, hyphens, or underscores. Responses are cached for 24
   * hours per key per customer.
   */
  'Idempotency-Key'?: string;
}

export interface CampaignUpdateParams {
  /**
   * Path param: Brand ID from route
   */
  brandId: string;

  /**
   * Body param: Campaign data
   */
  campaign: CampaignData;

  /**
   * Body param: Test mode flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  test_mode?: boolean;

  /**
   * Header param: Unique key to ensure idempotent request processing. Must be 1-255
   * alphanumeric characters, hyphens, or underscores. Responses are cached for 24
   * hours per key per customer.
   */
  'Idempotency-Key'?: string;
}

export interface CampaignDeleteParams {
  /**
   * Path param: Brand ID from route parameter
   */
  brandId: string;

  /**
   * Body param: Request to delete a campaign from a brand
   */
  body: CampaignDeleteParams.Body;
}

export namespace CampaignDeleteParams {
  /**
   * Request to delete a campaign from a brand
   */
  export interface Body extends WebhooksAPI.MutationRequest {}
}

export declare namespace Campaigns {
  export {
    type APIResponseTcrCampaignWithUseCases as APIResponseTcrCampaignWithUseCases,
    type BaseDto as BaseDto,
    type CampaignData as CampaignData,
    type MessagingUseCaseUs as MessagingUseCaseUs,
    type SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseData as SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseData,
    type TcrCampaignWithUseCases as TcrCampaignWithUseCases,
    type CampaignListResponse as CampaignListResponse,
    type CampaignCreateParams as CampaignCreateParams,
    type CampaignUpdateParams as CampaignUpdateParams,
    type CampaignDeleteParams as CampaignDeleteParams,
  };
}
