// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentsAPI from './agents';
import {
  APIResponseOfVoiceAgent,
  APIResponseOfVoiceAgentSecret,
  APIResponseOfVoiceAgentsList,
  AgentCreateParams,
  AgentDeleteParams,
  AgentListParams,
  AgentRetrieveParams,
  AgentRotateSecretParams,
  AgentUpdateParams,
  Agents,
  VoiceAgent,
  VoiceAgentAudio,
  VoiceAgentAudioSpec,
  VoiceAgentLimits,
  VoiceAgentLimitsSpec,
  VoiceAgentParty,
  VoiceAgentPartySpec,
  VoiceAgentSecret,
  VoiceAgentSpeech,
  VoiceAgentSpeechSpec,
  VoiceAgentTranscripts,
  VoiceAgentTranscriptsSpec,
  VoiceAgentsList,
  VoiceAgentsVoiceAgentsPage,
} from './agents';
import * as CatalogueAPI from './catalogue';
import {
  APIResponseOfVoiceCatalogue,
  Catalogue,
  CatalogueListParams,
  VoiceCatalogue,
  VoiceCatalogueVoice,
} from './catalogue';
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
  agents: AgentsAPI.Agents = new AgentsAPI.Agents(this._client);
  catalogue: CatalogueAPI.Catalogue = new CatalogueAPI.Catalogue(this._client);
}

Voice.Calls = Calls;
Voice.Tokens = Tokens;
Voice.Agents = Agents;
Voice.Catalogue = Catalogue;

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

  export {
    Agents as Agents,
    type APIResponseOfVoiceAgent as APIResponseOfVoiceAgent,
    type APIResponseOfVoiceAgentSecret as APIResponseOfVoiceAgentSecret,
    type APIResponseOfVoiceAgentsList as APIResponseOfVoiceAgentsList,
    type VoiceAgent as VoiceAgent,
    type VoiceAgentAudio as VoiceAgentAudio,
    type VoiceAgentAudioSpec as VoiceAgentAudioSpec,
    type VoiceAgentLimits as VoiceAgentLimits,
    type VoiceAgentLimitsSpec as VoiceAgentLimitsSpec,
    type VoiceAgentParty as VoiceAgentParty,
    type VoiceAgentPartySpec as VoiceAgentPartySpec,
    type VoiceAgentSecret as VoiceAgentSecret,
    type VoiceAgentSpeech as VoiceAgentSpeech,
    type VoiceAgentSpeechSpec as VoiceAgentSpeechSpec,
    type VoiceAgentTranscripts as VoiceAgentTranscripts,
    type VoiceAgentTranscriptsSpec as VoiceAgentTranscriptsSpec,
    type VoiceAgentsList as VoiceAgentsList,
    type VoiceAgentsVoiceAgentsPage as VoiceAgentsVoiceAgentsPage,
    type AgentCreateParams as AgentCreateParams,
    type AgentRetrieveParams as AgentRetrieveParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
    type AgentDeleteParams as AgentDeleteParams,
    type AgentRotateSecretParams as AgentRotateSecretParams,
  };

  export {
    Catalogue as Catalogue,
    type APIResponseOfVoiceCatalogue as APIResponseOfVoiceCatalogue,
    type VoiceCatalogue as VoiceCatalogue,
    type VoiceCatalogueVoice as VoiceCatalogueVoice,
    type CatalogueListParams as CatalogueListParams,
  };
}
