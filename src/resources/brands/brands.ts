// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from '../webhooks';
import * as CampaignsAPI from './campaigns';
import {
  APIResponseTcrCampaignWithUseCases,
  BaseDto,
  CampaignCreateParams,
  CampaignData,
  CampaignDeleteParams,
  CampaignListResponse,
  CampaignUpdateParams,
  Campaigns,
  MessagingUseCaseUs,
  SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseData,
  TcrCampaignWithUseCases,
} from './campaigns';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Brands extends APIResource {
  campaigns: CampaignsAPI.Campaigns = new CampaignsAPI.Campaigns(this._client);

  /**
   * Creates a new brand and associated information. This endpoint automatically sets
   * inheritTcrBrand=false when a brand is created.
   *
   * @example
   * ```ts
   * const apiResponseBrandWithKYC = await client.brands.create({
   *   brand: {
   *     brandRelationship: 'SMALL_ACCOUNT',
   *     contactName: 'John Smith',
   *     vertical: 'PROFESSIONAL',
   *   },
   * });
   * ```
   */
  create(params: BrandCreateParams, options?: RequestOptions): APIPromise<APIResponseBrandWithKYC> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/v3/brands', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Updates an existing brand and its associated information. Cannot update brands
   * that have already been submitted to TCR or inherited brands.
   *
   * @example
   * ```ts
   * const apiResponseBrandWithKYC = await client.brands.update(
   *   'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
   *   {
   *     brand: {
   *       brandRelationship: 'SMALL_ACCOUNT',
   *       contactName: 'John Smith',
   *       vertical: 'PROFESSIONAL',
   *     },
   *   },
   * );
   * ```
   */
  update(
    brandID: string,
    params: BrandUpdateParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseBrandWithKYC> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.put(path`/v3/brands/${brandID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves all brands for the authenticated customer with information in a
   * flattened structure. Includes inherited brands if inheritTcrBrand=true.
   *
   * @example
   * ```ts
   * const brands = await client.brands.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<BrandListResponse> {
    return this._client.get('/v3/brands', options);
  }

  /**
   * Delete a brand by ID. The brand must belong to the authenticated customer.
   *
   * @example
   * ```ts
   * await client.brands.delete(
   *   'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
   *   { body: {} },
   * );
   * ```
   */
  delete(brandID: string, params: BrandDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { body } = params;
    return this._client.delete(path`/v3/brands/${brandID}`, {
      body: body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': '*/*', Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseBrandWithKYC {
  /**
   * The response data (null if error)
   */
  data?: BrandWithKYC | null;

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

/**
 * Brand and KYC data
 */
export interface BrandData {
  /**
   * Brand relationship level with TCR (required for TCR)
   */
  brandRelationship: TcrBrandRelationship;

  /**
   * Primary contact name (required)
   */
  contactName: string;

  /**
   * Business vertical/industry category (required for TCR)
   */
  vertical: TcrVertical;

  /**
   * Brand name for KYC submission
   */
  brandName?: string | null;

  /**
   * Legal business name
   */
  businessLegalName?: string | null;

  /**
   * Business/brand name
   */
  businessName?: string | null;

  /**
   * Contact's role in the business
   */
  businessRole?: string | null;

  /**
   * Business website URL
   */
  businessUrl?: string | null;

  /**
   * City
   */
  city?: string | null;

  /**
   * Contact email address
   */
  contactEmail?: string | null;

  /**
   * Contact phone number in E.164 format
   */
  contactPhone?: string | null;

  /**
   * Contact phone country code (e.g., "1" for US)
   */
  contactPhoneCountryCode?: string | null;

  /**
   * Country code (e.g., US, CA)
   */
  country?: string | null;

  /**
   * Country where the business is registered
   */
  countryOfRegistration?: string | null;

  /**
   * List of destination countries for messaging
   */
  destinationCountries?: Array<DestinationCountry> | null;

  /**
   * Business entity type
   */
  entityType?: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'SOLE_PROPRIETOR' | 'GOVERNMENT' | null;

  /**
   * Expected daily messaging volume
   */
  expectedMessagingVolume?: string | null;

  /**
   * Whether this is a TCR (Campaign Registry) application
   */
  isTcrApplication?: boolean | null;

  /**
   * Additional notes about the business or use case
   */
  notes?: string | null;

  /**
   * Phone number prefix for messaging (e.g., "+1")
   */
  phoneNumberPrefix?: string | null;

  /**
   * Postal/ZIP code
   */
  postalCode?: string | null;

  /**
   * Primary messaging use case description
   */
  primaryUseCase?: string | null;

  /**
   * State/province code
   */
  state?: string | null;

  /**
   * Street address
   */
  street?: string | null;

  /**
   * Tax ID/EIN number
   */
  taxId?: string | null;

  /**
   * Type of tax ID (e.g., us_ein, ca_bn)
   */
  taxIdType?: string | null;
}

/**
 * Flattened brand response with embedded KYC information
 */
export interface BrandWithKYC {
  /**
   * Unique identifier for the brand
   */
  id?: string;

  /**
   * Brand relationship level with TCR
   */
  brandRelationship?: TcrBrandRelationship | null;

  /**
   * Legal business name
   */
  businessLegalName?: string | null;

  /**
   * Business/brand name
   */
  businessName?: string | null;

  /**
   * Contact's role in the business
   */
  businessRole?: string | null;

  /**
   * Business website URL
   */
  businessUrl?: string | null;

  /**
   * City
   */
  city?: string | null;

  /**
   * Contact email address
   */
  contactEmail?: string | null;

  /**
   * Primary contact name
   */
  contactName?: string;

  /**
   * Contact phone number
   */
  contactPhone?: string | null;

  /**
   * Contact phone country code
   */
  contactPhoneCountryCode?: string | null;

  /**
   * Country code
   */
  country?: string | null;

  /**
   * Country where the business is registered
   */
  countryOfRegistration?: string | null;

  /**
   * When the brand was created
   */
  createdAt?: string;

  /**
   * CSP (Campaign Service Provider) ID
   */
  cspId?: string | null;

  /**
   * List of destination countries for messaging
   */
  destinationCountries?: Array<DestinationCountry>;

  /**
   * Business entity type
   */
  entityType?: string | null;

  /**
   * Expected daily messaging volume
   */
  expectedMessagingVolume?: string | null;

  /**
   * TCR brand identity verification status
   */
  identityStatus?: 'SELF_DECLARED' | 'UNVERIFIED' | 'VERIFIED' | 'VETTED_VERIFIED' | null;

  /**
   * Whether this brand is inherited from parent organization
   */
  isInherited?: boolean;

  /**
   * Whether this is a TCR application
   */
  isTcrApplication?: boolean;

  /**
   * Additional notes
   */
  notes?: string | null;

  /**
   * Phone number prefix for messaging
   */
  phoneNumberPrefix?: string | null;

  /**
   * Postal/ZIP code
   */
  postalCode?: string | null;

  /**
   * Primary messaging use case description
   */
  primaryUseCase?: string | null;

  /**
   * State/province code
   */
  state?: string | null;

  /**
   * TCR brand status
   */
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | null;

  /**
   * Street address
   */
  street?: string | null;

  /**
   * When the brand was submitted to TCR
   */
  submittedAt?: string | null;

  /**
   * Whether this brand was submitted to TCR
   */
  submittedToTCR?: boolean;

  /**
   * Tax ID/EIN number
   */
  taxId?: string | null;

  /**
   * Type of tax ID
   */
  taxIdType?: string | null;

  /**
   * TCR brand ID (populated after TCR submission)
   */
  tcrBrandId?: string | null;

  /**
   * Universal EIN from TCR
   */
  universalEin?: string | null;

  /**
   * When the brand was last updated
   */
  updatedAt?: string | null;

  /**
   * Business vertical/industry category
   */
  vertical?: TcrVertical | null;
}

export interface DestinationCountry {
  id?: string;

  isMain?: boolean;
}

export type TcrBrandRelationship =
  | 'BASIC_ACCOUNT'
  | 'MEDIUM_ACCOUNT'
  | 'LARGE_ACCOUNT'
  | 'SMALL_ACCOUNT'
  | 'KEY_ACCOUNT';

export type TcrVertical =
  | 'PROFESSIONAL'
  | 'REAL_ESTATE'
  | 'HEALTHCARE'
  | 'HUMAN_RESOURCES'
  | 'ENERGY'
  | 'ENTERTAINMENT'
  | 'RETAIL'
  | 'TRANSPORTATION'
  | 'AGRICULTURE'
  | 'INSURANCE'
  | 'POSTAL'
  | 'EDUCATION'
  | 'HOSPITALITY'
  | 'FINANCIAL'
  | 'POLITICAL'
  | 'GAMBLING'
  | 'LEGAL'
  | 'CONSTRUCTION'
  | 'NGO'
  | 'MANUFACTURING'
  | 'GOVERNMENT'
  | 'TECHNOLOGY'
  | 'COMMUNICATION';

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface BrandListResponse {
  /**
   * The response data (null if error)
   */
  data?: Array<BrandWithKYC> | null;

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

export interface BrandCreateParams {
  /**
   * Body param: Brand and KYC information
   */
  brand: BrandData;

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

export interface BrandUpdateParams {
  /**
   * Body param: Brand and KYC information
   */
  brand: BrandData;

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

export interface BrandDeleteParams {
  /**
   * Request to delete a brand
   */
  body: BrandDeleteParams.Body;
}

export namespace BrandDeleteParams {
  /**
   * Request to delete a brand
   */
  export interface Body extends WebhooksAPI.MutationRequest {}
}

Brands.Campaigns = Campaigns;

export declare namespace Brands {
  export {
    type APIResponseBrandWithKYC as APIResponseBrandWithKYC,
    type BrandData as BrandData,
    type BrandWithKYC as BrandWithKYC,
    type DestinationCountry as DestinationCountry,
    type TcrBrandRelationship as TcrBrandRelationship,
    type TcrVertical as TcrVertical,
    type BrandListResponse as BrandListResponse,
    type BrandCreateParams as BrandCreateParams,
    type BrandUpdateParams as BrandUpdateParams,
    type BrandDeleteParams as BrandDeleteParams,
  };

  export {
    Campaigns as Campaigns,
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
