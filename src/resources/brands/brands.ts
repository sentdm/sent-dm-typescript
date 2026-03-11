// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BrandsAPI from './brands';
import * as CampaignsAPI from './campaigns';
import {
  APIResponseTcrCampaignWithUseCases,
  BaseDto,
  CampaignData,
  Campaigns,
  MessagingUseCaseUs,
  SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseData,
  TcrCampaignWithUseCases,
} from './campaigns';

export class Brands extends APIResource {
  campaigns: CampaignsAPI.Campaigns = new CampaignsAPI.Campaigns(this._client);
}

/**
 * Brand and KYC data grouped into contact, business, and compliance sections
 */
export interface BrandData {
  /**
   * Compliance and TCR-related information
   */
  compliance: BrandData.Compliance;

  /**
   * Contact information for the brand
   */
  contact: BrandData.Contact;

  /**
   * Business details and address information
   */
  business?: BrandData.Business | null;
}

export namespace BrandData {
  /**
   * Compliance and TCR-related information
   */
  export interface Compliance {
    /**
     * Brand relationship level with TCR (required for TCR)
     */
    brandRelationship: BrandsAPI.TcrBrandRelationship;

    /**
     * Business vertical/industry category (required for TCR)
     */
    vertical: BrandsAPI.TcrVertical;

    /**
     * List of destination countries for messaging
     */
    destinationCountries?: Array<BrandsAPI.DestinationCountry> | null;

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
     * Primary messaging use case description
     */
    primaryUseCase?: string | null;
  }

  /**
   * Contact information for the brand
   */
  export interface Contact {
    /**
     * Primary contact name (required)
     */
    name: string;

    /**
     * Business/brand name
     */
    businessName?: string | null;

    /**
     * Contact email address
     */
    email?: string | null;

    /**
     * Contact phone number in E.164 format
     */
    phone?: string | null;

    /**
     * Contact phone country code (e.g., "1" for US)
     */
    phoneCountryCode?: string | null;

    /**
     * Contact's role in the business
     */
    role?: string | null;
  }

  /**
   * Business details and address information
   */
  export interface Business {
    /**
     * City
     */
    city?: string | null;

    /**
     * Country code (e.g., US, CA)
     */
    country?: string | null;

    /**
     * Country where the business is registered
     */
    countryOfRegistration?: string | null;

    /**
     * Business entity type
     */
    entityType?: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'SOLE_PROPRIETOR' | 'GOVERNMENT' | null;

    /**
     * Legal business name
     */
    legalName?: string | null;

    /**
     * Postal/ZIP code
     */
    postalCode?: string | null;

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

    /**
     * Business website URL
     */
    url?: string | null;
  }
}

/**
 * Brand response with nested contact, business, and compliance sections — mirrors
 * the request structure.
 */
export interface BrandWithKYC {
  /**
   * Unique identifier for the brand
   */
  id?: string;

  /**
   * Business details and address information
   */
  business?: BrandWithKYC.Business | null;

  /**
   * Compliance and TCR-related information
   */
  compliance?: BrandWithKYC.Compliance | null;

  /**
   * Contact information for the brand
   */
  contact?: BrandWithKYC.Contact | null;

  /**
   * When the brand was created
   */
  created_at?: string;

  /**
   * CSP (Campaign Service Provider) ID
   */
  csp_id?: string | null;

  /**
   * TCR brand identity verification status
   */
  identity_status?: 'SELF_DECLARED' | 'UNVERIFIED' | 'VERIFIED' | 'VETTED_VERIFIED' | null;

  /**
   * Whether this brand is inherited from the parent organization
   */
  is_inherited?: boolean;

  /**
   * TCR brand status
   */
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | null;

  /**
   * When the brand was submitted to TCR
   */
  submitted_at?: string | null;

  /**
   * Whether this brand has been submitted to TCR
   */
  submitted_to_tcr?: boolean;

  /**
   * TCR brand ID (populated after TCR submission)
   */
  tcr_brand_id?: string | null;

  /**
   * Universal EIN from TCR
   */
  universal_ein?: string | null;

  /**
   * When the brand was last updated
   */
  updated_at?: string | null;
}

export namespace BrandWithKYC {
  /**
   * Business details and address information
   */
  export interface Business {
    /**
     * City
     */
    city?: string | null;

    /**
     * Country code (e.g., US, CA)
     */
    country?: string | null;

    /**
     * Country where the business is registered
     */
    country_of_registration?: string | null;

    /**
     * Business entity type
     */
    entity_type?: string | null;

    /**
     * Legal business name
     */
    legal_name?: string | null;

    /**
     * Postal/ZIP code
     */
    postal_code?: string | null;

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
    tax_id?: string | null;

    /**
     * Type of tax ID (e.g., us_ein, ca_bn)
     */
    tax_id_type?: string | null;

    /**
     * Business website URL
     */
    url?: string | null;
  }

  /**
   * Compliance and TCR-related information
   */
  export interface Compliance {
    /**
     * Brand relationship level with TCR
     */
    brand_relationship?: BrandsAPI.TcrBrandRelationship | null;

    /**
     * List of destination countries for messaging
     */
    destination_countries?: Array<BrandsAPI.DestinationCountry>;

    /**
     * Expected daily messaging volume
     */
    expected_messaging_volume?: string | null;

    /**
     * Whether this is a TCR (Campaign Registry) application
     */
    is_tcr_application?: boolean;

    /**
     * Additional notes about the business or use case
     */
    notes?: string | null;

    /**
     * Phone number prefix for messaging (e.g., "+1")
     */
    phone_number_prefix?: string | null;

    /**
     * Primary messaging use case description
     */
    primary_use_case?: string | null;

    /**
     * Business vertical/industry category
     */
    vertical?: BrandsAPI.TcrVertical | null;
  }

  /**
   * Contact information for the brand
   */
  export interface Contact {
    /**
     * Business/brand name
     */
    business_name?: string | null;

    /**
     * Contact email address
     */
    email?: string | null;

    /**
     * Primary contact name
     */
    name?: string;

    /**
     * Contact phone number in E.164 format
     */
    phone?: string | null;

    /**
     * Contact phone country code (e.g., "1" for US)
     */
    phone_country_code?: string | null;

    /**
     * Contact's role in the business
     */
    role?: string | null;
  }
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

Brands.Campaigns = Campaigns;

export declare namespace Brands {
  export {
    type BrandData as BrandData,
    type BrandWithKYC as BrandWithKYC,
    type DestinationCountry as DestinationCountry,
    type TcrBrandRelationship as TcrBrandRelationship,
    type TcrVertical as TcrVertical,
  };

  export {
    Campaigns as Campaigns,
    type APIResponseTcrCampaignWithUseCases as APIResponseTcrCampaignWithUseCases,
    type BaseDto as BaseDto,
    type CampaignData as CampaignData,
    type MessagingUseCaseUs as MessagingUseCaseUs,
    type SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseData as SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseData,
    type TcrCampaignWithUseCases as TcrCampaignWithUseCases,
  };
}
