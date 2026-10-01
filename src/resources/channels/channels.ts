// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as VoiceAPI from './voice';
import {
  APIResponseOfListOfVoiceNumber,
  APIResponseOfVoiceCallbackTest,
  APIResponseOfVoiceNumber,
  APIResponseOfVoiceNumberCreated,
  APIResponseOfVoiceSecret,
  APIResponseOfVoiceToken,
  Voice,
  VoiceCallbackTest,
  VoiceCallbackTestErrorInfo,
  VoiceCallbackTestRequestInfo,
  VoiceCallbackTestResponseInfo,
  VoiceCreateParams,
  VoiceCreateTokenParams,
  VoiceListParams,
  VoiceNumber,
  VoiceNumberCreated,
  VoiceRetrieveParams,
  VoiceRotateSecretParams,
  VoiceSecret,
  VoiceTestParams,
  VoiceToken,
  VoiceUpdateParams,
} from './voice';

export class Channels extends APIResource {
  voice: VoiceAPI.Voice = new VoiceAPI.Voice(this._client);
}

Channels.Voice = Voice;

export declare namespace Channels {
  export {
    Voice as Voice,
    type APIResponseOfListOfVoiceNumber as APIResponseOfListOfVoiceNumber,
    type APIResponseOfVoiceCallbackTest as APIResponseOfVoiceCallbackTest,
    type APIResponseOfVoiceNumber as APIResponseOfVoiceNumber,
    type APIResponseOfVoiceNumberCreated as APIResponseOfVoiceNumberCreated,
    type APIResponseOfVoiceSecret as APIResponseOfVoiceSecret,
    type APIResponseOfVoiceToken as APIResponseOfVoiceToken,
    type VoiceCallbackTest as VoiceCallbackTest,
    type VoiceCallbackTestErrorInfo as VoiceCallbackTestErrorInfo,
    type VoiceCallbackTestRequestInfo as VoiceCallbackTestRequestInfo,
    type VoiceCallbackTestResponseInfo as VoiceCallbackTestResponseInfo,
    type VoiceNumber as VoiceNumber,
    type VoiceNumberCreated as VoiceNumberCreated,
    type VoiceSecret as VoiceSecret,
    type VoiceToken as VoiceToken,
    type VoiceCreateParams as VoiceCreateParams,
    type VoiceRetrieveParams as VoiceRetrieveParams,
    type VoiceUpdateParams as VoiceUpdateParams,
    type VoiceListParams as VoiceListParams,
    type VoiceCreateTokenParams as VoiceCreateTokenParams,
    type VoiceRotateSecretParams as VoiceRotateSecretParams,
    type VoiceTestParams as VoiceTestParams,
  };
}
