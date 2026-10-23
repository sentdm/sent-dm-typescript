// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TokensAPI from './tokens';
import { APIResponseOfVoiceToken, TokenCreateParams, Tokens, VoiceToken } from './tokens';
import * as CallsAPI from './calls/calls';
import {
  APIResponseOfCall,
  APIResponseOfCallRecordings,
  APIResponseOfCallsList,
  Call,
  CallHangupParams,
  CallListParams,
  CallListRecordingsParams,
  CallParty,
  CallRecordParams,
  CallRecording,
  CallRecordings,
  CallRetrieveParams,
  CallTimelineEntry,
  Calls,
  CallsCallsPage,
  CallsList,
} from './calls/calls';

export class Voice extends APIResource {
  calls: CallsAPI.Calls = new CallsAPI.Calls(this._client);
  tokens: TokensAPI.Tokens = new TokensAPI.Tokens(this._client);
}

Voice.Calls = Calls;
Voice.Tokens = Tokens;

export declare namespace Voice {
  export {
    Calls as Calls,
    type APIResponseOfCall as APIResponseOfCall,
    type APIResponseOfCallRecordings as APIResponseOfCallRecordings,
    type APIResponseOfCallsList as APIResponseOfCallsList,
    type Call as Call,
    type CallParty as CallParty,
    type CallRecording as CallRecording,
    type CallRecordings as CallRecordings,
    type CallTimelineEntry as CallTimelineEntry,
    type CallsList as CallsList,
    type CallsCallsPage as CallsCallsPage,
    type CallRetrieveParams as CallRetrieveParams,
    type CallListParams as CallListParams,
    type CallHangupParams as CallHangupParams,
    type CallListRecordingsParams as CallListRecordingsParams,
    type CallRecordParams as CallRecordParams,
  };

  export {
    Tokens as Tokens,
    type APIResponseOfVoiceToken as APIResponseOfVoiceToken,
    type VoiceToken as VoiceToken,
    type TokenCreateParams as TokenCreateParams,
  };
}
