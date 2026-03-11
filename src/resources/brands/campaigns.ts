// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CampaignsAPI from './campaigns';
import * as WebhooksAPI from '../webhooks';

export class Campaigns extends APIResource {}

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

export declare namespace Campaigns {
  export {
    type APIResponseTcrCampaignWithUseCases as APIResponseTcrCampaignWithUseCases,
    type BaseDto as BaseDto,
    type CampaignData as CampaignData,
    type MessagingUseCaseUs as MessagingUseCaseUs,
    type SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseData as SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseData,
    type TcrCampaignWithUseCases as TcrCampaignWithUseCases,
  };
}
