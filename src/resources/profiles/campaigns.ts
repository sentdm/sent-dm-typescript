// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CampaignsAPI from './campaigns';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * **Deprecated — use Sender Profiles.**
 *
 * The original profile resource, kept because it has live callers. It still works, and its replacement is `/v3/sender-profiles`, which takes the identity and the campaign in one call instead of across three.
 *
 * New integrations should not start here.
 */
export class Campaigns extends APIResource {
  /**
   * **Deprecated.** This endpoint is replaced by `/v3/sender-profiles` and will be
   * removed in a future release. It still behaves exactly as before, so nothing
   * needs to change today — but new integrations should use `/v3/sender-profiles`,
   * which models a profile's markets, compliance, brand, campaigns and billing
   * explicitly.
   *
   * Creates a new campaign scoped under the brand of the specified profile. Each
   * campaign must include at least one use case with sample messages.
   *
   * @deprecated
   */
  create(
    profileID: string,
    params: CampaignCreateParams,
    options?: RequestOptions,
  ): APIPromise<CampaignCreateResponse> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post(path`/v3/profiles/${profileID}/campaigns`, {
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
   * **Deprecated.** This endpoint is replaced by `/v3/sender-profiles` and will be
   * removed in a future release. It still behaves exactly as before, so nothing
   * needs to change today — but new integrations should use `/v3/sender-profiles`,
   * which models a profile's markets, compliance, brand, campaigns and billing
   * explicitly.
   *
   * Updates an existing campaign under the brand of the specified profile. Cannot
   * update campaigns that have already been submitted to TCR.
   *
   * @deprecated
   */
  update(
    campaignID: string,
    params: CampaignUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CampaignUpdateResponse> {
    const { profileId, 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.put(path`/v3/profiles/${profileId}/campaigns/${campaignID}`, {
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
   * **Deprecated.** This endpoint is replaced by `/v3/sender-profiles` and will be
   * removed in a future release. It still behaves exactly as before, so nothing
   * needs to change today — but new integrations should use `/v3/sender-profiles`,
   * which models a profile's markets, compliance, brand, campaigns and billing
   * explicitly.
   *
   * Retrieves all campaigns linked to the profile's brand, including use cases and
   * sample messages. Returns inherited campaigns if inherit_tcr_campaign=true.
   *
   * @deprecated
   */
  list(
    profileID: string,
    params: CampaignListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CampaignListResponse> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/profiles/${profileID}/campaigns`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * **Deprecated.** This endpoint is replaced by `/v3/sender-profiles` and will be
   * removed in a future release. It still behaves exactly as before, so nothing
   * needs to change today — but new integrations should use `/v3/sender-profiles`,
   * which models a profile's markets, compliance, brand, campaigns and billing
   * explicitly.
   *
   * Deletes a campaign by ID from the brand of the specified profile. The profile
   * must belong to the authenticated organization.
   *
   * @deprecated
   */
  delete(campaignID: string, params: CampaignDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { profileId, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.delete(path`/v3/profiles/${profileId}/campaigns/${campaignID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }
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
 * Standard API response envelope for all v3 endpoints
 */
export interface CampaignCreateResponse {
  /**
   * A 10DLC campaign registered for a brand.
   */
  data?: CampaignCreateResponse.Data | null;

  /**
   * Error information
   */
  error?: CampaignCreateResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: CampaignCreateResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace CampaignCreateResponse {
  /**
   * A 10DLC campaign registered for a brand.
   */
  export interface Data {
    id?: string;

    billedDate?: string | null;

    brandId?: string | null;

    cost?: number | null;

    createdAt?: string;

    customerId?: string;

    /**
     * True once every carrier has completed its DCA election and the campaign is
     * operationally ready for traffic.
     */
    dcaElectionsComplete?: boolean | null;

    dcaElectionsCompletedAt?: string | null;

    description?: string;

    /**
     * True when the one-time campaign submission fee has already been charged.
     */
    hasSubmissionTransaction?: boolean;

    helpKeywords?: string | null;

    helpMessage?: string | null;

    messageFlow?: string | null;

    name?: string;

    optinKeywords?: string | null;

    optinMessage?: string | null;

    optoutKeywords?: string | null;

    optoutMessage?: string | null;

    privacyPolicyLink?: string | null;

    status?: 'SENT_CREATED' | 'ACTIVE' | 'EXPIRED' | null;

    submittedAt?: string | null;

    submittedToTCR?: boolean;

    /**
     * The Campaign Registry identifier, once the campaign has been accepted.
     */
    tcrCampaignId?: string | null;

    /**
     * Surfaced so customers can see why a submission did not reach the registry.
     */
    tcrSyncError?: string | null;

    termsAndConditionsLink?: string | null;

    /**
     * Campaign type (for example KYC or App).
     */
    type?: string;

    updatedAt?: string | null;

    useCases?: Array<Data.UseCase>;

    /**
     * Expected messaging volume for this campaign — customer-supplied on
     * create/update, and the input to both the TCR usecase classification (LOW_VOLUME
     * vs MIXED/specific) and the campaign fee tier. Surfaced so customers can read
     * back the value they set.
     */
    volume?: string | null;
  }

  export namespace Data {
    /**
     * Customer-facing use-case representation for the public v3 campaign contract.
     * Exists for the same reason as BrandCampaignV3Response: nesting the
     * TcrCampaignUseCase database entity in a public response means any column added
     * to that table silently becomes part of the customer-facing contract. This DTO is
     * an explicit allowlist, so a new column stays invisible until it is added here on
     * purpose. This mirrors exactly the fields the entity already serialized, so it
     * removes nothing from the current response shape. It only closes the future-leak
     * path.
     */
    export interface UseCase {
      id?: string;

      campaignId?: string;

      createdAt?: string;

      customerId?: string;

      messagingUseCaseUs?: CampaignsAPI.MessagingUseCaseUs;

      /**
       * Sample messages submitted to the registry for this use case.
       */
      sampleMessages?: Array<string>;

      updatedAt?: string | null;
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
export interface CampaignUpdateResponse {
  /**
   * A 10DLC campaign registered for a brand.
   */
  data?: CampaignUpdateResponse.Data | null;

  /**
   * Error information
   */
  error?: CampaignUpdateResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: CampaignUpdateResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace CampaignUpdateResponse {
  /**
   * A 10DLC campaign registered for a brand.
   */
  export interface Data {
    id?: string;

    billedDate?: string | null;

    brandId?: string | null;

    cost?: number | null;

    createdAt?: string;

    customerId?: string;

    /**
     * True once every carrier has completed its DCA election and the campaign is
     * operationally ready for traffic.
     */
    dcaElectionsComplete?: boolean | null;

    dcaElectionsCompletedAt?: string | null;

    description?: string;

    /**
     * True when the one-time campaign submission fee has already been charged.
     */
    hasSubmissionTransaction?: boolean;

    helpKeywords?: string | null;

    helpMessage?: string | null;

    messageFlow?: string | null;

    name?: string;

    optinKeywords?: string | null;

    optinMessage?: string | null;

    optoutKeywords?: string | null;

    optoutMessage?: string | null;

    privacyPolicyLink?: string | null;

    status?: 'SENT_CREATED' | 'ACTIVE' | 'EXPIRED' | null;

    submittedAt?: string | null;

    submittedToTCR?: boolean;

    /**
     * The Campaign Registry identifier, once the campaign has been accepted.
     */
    tcrCampaignId?: string | null;

    /**
     * Surfaced so customers can see why a submission did not reach the registry.
     */
    tcrSyncError?: string | null;

    termsAndConditionsLink?: string | null;

    /**
     * Campaign type (for example KYC or App).
     */
    type?: string;

    updatedAt?: string | null;

    useCases?: Array<Data.UseCase>;

    /**
     * Expected messaging volume for this campaign — customer-supplied on
     * create/update, and the input to both the TCR usecase classification (LOW_VOLUME
     * vs MIXED/specific) and the campaign fee tier. Surfaced so customers can read
     * back the value they set.
     */
    volume?: string | null;
  }

  export namespace Data {
    /**
     * Customer-facing use-case representation for the public v3 campaign contract.
     * Exists for the same reason as BrandCampaignV3Response: nesting the
     * TcrCampaignUseCase database entity in a public response means any column added
     * to that table silently becomes part of the customer-facing contract. This DTO is
     * an explicit allowlist, so a new column stays invisible until it is added here on
     * purpose. This mirrors exactly the fields the entity already serialized, so it
     * removes nothing from the current response shape. It only closes the future-leak
     * path.
     */
    export interface UseCase {
      id?: string;

      campaignId?: string;

      createdAt?: string;

      customerId?: string;

      messagingUseCaseUs?: CampaignsAPI.MessagingUseCaseUs;

      /**
       * Sample messages submitted to the registry for this use case.
       */
      sampleMessages?: Array<string>;

      updatedAt?: string | null;
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
export interface CampaignListResponse {
  /**
   * The response data (null if error)
   */
  data?: Array<CampaignListResponse.Data> | null;

  /**
   * Error information
   */
  error?: CampaignListResponse.Error | null;

  /**
   * Request and response metadata
   */
  meta?: CampaignListResponse.Meta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

export namespace CampaignListResponse {
  /**
   * A 10DLC campaign registered for a brand.
   */
  export interface Data {
    id?: string;

    billedDate?: string | null;

    brandId?: string | null;

    cost?: number | null;

    createdAt?: string;

    customerId?: string;

    /**
     * True once every carrier has completed its DCA election and the campaign is
     * operationally ready for traffic.
     */
    dcaElectionsComplete?: boolean | null;

    dcaElectionsCompletedAt?: string | null;

    description?: string;

    /**
     * True when the one-time campaign submission fee has already been charged.
     */
    hasSubmissionTransaction?: boolean;

    helpKeywords?: string | null;

    helpMessage?: string | null;

    messageFlow?: string | null;

    name?: string;

    optinKeywords?: string | null;

    optinMessage?: string | null;

    optoutKeywords?: string | null;

    optoutMessage?: string | null;

    privacyPolicyLink?: string | null;

    status?: 'SENT_CREATED' | 'ACTIVE' | 'EXPIRED' | null;

    submittedAt?: string | null;

    submittedToTCR?: boolean;

    /**
     * The Campaign Registry identifier, once the campaign has been accepted.
     */
    tcrCampaignId?: string | null;

    /**
     * Surfaced so customers can see why a submission did not reach the registry.
     */
    tcrSyncError?: string | null;

    termsAndConditionsLink?: string | null;

    /**
     * Campaign type (for example KYC or App).
     */
    type?: string;

    updatedAt?: string | null;

    useCases?: Array<Data.UseCase>;

    /**
     * Expected messaging volume for this campaign — customer-supplied on
     * create/update, and the input to both the TCR usecase classification (LOW_VOLUME
     * vs MIXED/specific) and the campaign fee tier. Surfaced so customers can read
     * back the value they set.
     */
    volume?: string | null;
  }

  export namespace Data {
    /**
     * Customer-facing use-case representation for the public v3 campaign contract.
     * Exists for the same reason as BrandCampaignV3Response: nesting the
     * TcrCampaignUseCase database entity in a public response means any column added
     * to that table silently becomes part of the customer-facing contract. This DTO is
     * an explicit allowlist, so a new column stays invisible until it is added here on
     * purpose. This mirrors exactly the fields the entity already serialized, so it
     * removes nothing from the current response shape. It only closes the future-leak
     * path.
     */
    export interface UseCase {
      id?: string;

      campaignId?: string;

      createdAt?: string;

      customerId?: string;

      messagingUseCaseUs?: CampaignsAPI.MessagingUseCaseUs;

      /**
       * Sample messages submitted to the registry for this use case.
       */
      sampleMessages?: Array<string>;

      updatedAt?: string | null;
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

export interface CampaignCreateParams {
  /**
   * Body param: Campaign data for create or update operation
   */
  campaign: CampaignCreateParams.Campaign;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

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

export namespace CampaignCreateParams {
  /**
   * Campaign data for create or update operation
   */
  export interface Campaign {
    /**
     * Campaign description
     */
    description: string;

    /**
     * Campaign name
     */
    name: string;

    /**
     * Campaign type (e.g., "KYC", "App").
     *
     * Still required of a caller, and consulted by nothing. It named the signup path
     * that produced the campaign, was written to a column no query filters on, no TCR
     * payload carries and no fee or status decision reads, and is now defaulted at the
     * entity instead. It stays required so that a request which was valid before is
     * still valid — dropping it would be the client-visible change, not keeping it.
     */
    type: string;

    /**
     * List of use cases with sample messages
     */
    useCases: Array<Campaign.UseCase>;

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

    /**
     * Expected messaging volume for this campaign. Numeric string (e.g. "1999",
     * "5000"). Values below 2000 bill at the low-volume tier.
     */
    volume?: string | null;
  }

  export namespace Campaign {
    /**
     * Campaign use case with sample messages
     */
    export interface UseCase {
      messagingUseCaseUs: CampaignsAPI.MessagingUseCaseUs;

      /**
       * Sample messages for this use case (1-5 messages, max 1024 characters each)
       */
      sampleMessages: Array<string>;
    }
  }
}

export interface CampaignUpdateParams {
  /**
   * Path param: Profile ID from route
   */
  profileId: string;

  /**
   * Body param: Campaign data for create or update operation
   */
  campaign: CampaignUpdateParams.Campaign;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

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

export namespace CampaignUpdateParams {
  /**
   * Campaign data for create or update operation
   */
  export interface Campaign {
    /**
     * Campaign description
     */
    description: string;

    /**
     * Campaign name
     */
    name: string;

    /**
     * Campaign type (e.g., "KYC", "App").
     *
     * Still required of a caller, and consulted by nothing. It named the signup path
     * that produced the campaign, was written to a column no query filters on, no TCR
     * payload carries and no fee or status decision reads, and is now defaulted at the
     * entity instead. It stays required so that a request which was valid before is
     * still valid — dropping it would be the client-visible change, not keeping it.
     */
    type: string;

    /**
     * List of use cases with sample messages
     */
    useCases: Array<Campaign.UseCase>;

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

    /**
     * Expected messaging volume for this campaign. Numeric string (e.g. "1999",
     * "5000"). Values below 2000 bill at the low-volume tier.
     */
    volume?: string | null;
  }

  export namespace Campaign {
    /**
     * Campaign use case with sample messages
     */
    export interface UseCase {
      messagingUseCaseUs: CampaignsAPI.MessagingUseCaseUs;

      /**
       * Sample messages for this use case (1-5 messages, max 1024 characters each)
       */
      sampleMessages: Array<string>;
    }
  }
}

export interface CampaignListParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface CampaignDeleteParams {
  /**
   * Path param: Profile ID from route parameter
   */
  profileId: string;

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

export declare namespace Campaigns {
  export {
    type MessagingUseCaseUs as MessagingUseCaseUs,
    type CampaignCreateResponse as CampaignCreateResponse,
    type CampaignUpdateResponse as CampaignUpdateResponse,
    type CampaignListResponse as CampaignListResponse,
    type CampaignCreateParams as CampaignCreateParams,
    type CampaignUpdateParams as CampaignUpdateParams,
    type CampaignListParams as CampaignListParams,
    type CampaignDeleteParams as CampaignDeleteParams,
  };
}
