// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';

export class TenDlc extends APIResource {}

export interface TenDlcCampaignUseCase {
  /**
   * Sample messages. TCR sample1..sample5 for this use case. One to five, each 20 to
   * 1024 characters and carrying the brand name and an opt-out instruction. At most
   * five across the campaign, and at least two when a high-volume campaign has a
   * single use case.
   */
  sample_messages: Array<unknown>;

  /**
   * Use case. What this entry sends. MIXED and LOW_VOLUME are refused — volume
   * decides those.
   */
  use_case:
    | 'MARKETING'
    | 'ACCOUNT_NOTIFICATION'
    | 'CUSTOMER_CARE'
    | 'FRAUD_ALERT'
    | '2FA'
    | 'DELIVERY_NOTIFICATION'
    | 'SECURITY_ALERT'
    | 'M2M'
    | 'HIGHER_EDUCATION'
    | 'POLLING_VOTING'
    | 'PUBLIC_SERVICE_ANNOUNCEMENT';
}

export declare namespace TenDlc {
  export { type TenDlcCampaignUseCase as TenDlcCampaignUseCase };
}
