// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from '../webhooks';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, VoiceAgentsPage, type VoiceAgentsPageParams } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Phone calls from the numbers you hold, driven by your own callback URL.
 *
 * `POST /v3/channels/voice` enables a number for calls, with the callback URL Sent asks what to do with each call on it, and `POST /v3/voice/tokens` mints a short-lived token that lets a user of your app place and receive calls as that number. When a call arrives or a caller presses a key, a signed question is POSTed to the callback URL and the answer decides the call; `POST /v3/channels/voice/{number}/test` checks the URL answers the way we need before a real call reaches it, and `POST /v3/channels/voice/{number}/rotate-secret` replaces the signing secret. The call events themselves (`call.completed` and the rest) arrive through your webhooks.
 *
 * Every call is a record under `/v3/voice/calls`: read it, list its recordings once one is ready, hang it up, start or stop recording, and add, mute or remove conference participants while it is live. A leg to a phone number runs for at most what your balance affords at the destination's rate.
 *
 * **Voice agents.** `POST /v3/voice/agents` creates an agent that answers calls through the Sent Voice Gateway: `session_type` says whether Sent carries the call as text (speech recognised and spoken for the agent) or as audio, `websocket_url` is where the gateway dials the agent for each call (leave it out and the agent dials in with your API key), and `tools`, `transfer_targets`, `fallback` and `limits` say what it may do on a call. The agent's `signing_secret` is shown on create and on `POST /v3/voice/agents/{id}/rotate-secret` only. Voices and languages for text sessions come from `GET /v3/voice/voices`. A number takes calls to an agent once it is bound to it on `/v3/channels/voice`.
 */
export class Agents extends APIResource {
  /**
   * Creates an agent that answers phone calls through the Sent Voice Gateway.
   * `session_type` says whether Sent carries the call as text (the caller's speech
   * recognised for the agent, the agent's text spoken) or as audio. With
   * `websocket_url` the gateway dials your agent for each call and signs the
   * handshake with the `signing_secret` this response returns; without it, your
   * agent dials in with your API key and this agent's `id`.
   *
   * `tools`, `transfer_targets`, `fallback` and `limits` say what the agent may do
   * on a call. Voices and languages for text sessions come from
   * `GET /v3/voice/voices`. Calls reach the agent once a number is bound to it on
   * `/v3/channels/voice`.
   *
   * `signing_secret` is shown here and on `POST /v3/voice/agents/{id}/rotate-secret`
   * only; store it now. With `sandbox: true` the request is validated and the agent
   * reported with `202`; nothing is written.
   *
   * @example
   * ```ts
   * const apiResponseOfVoiceAgent =
   *   await client.voice.agents.create();
   * ```
   */
  create(params: AgentCreateParams, options?: RequestOptions): APIPromise<APIResponseOfVoiceAgent> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post('/v3/voice/agents', {
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
   * The agent as stored, without its signing secret.
   *
   * @example
   * ```ts
   * const apiResponseOfVoiceAgent =
   *   await client.voice.agents.retrieve('id');
   * ```
   */
  retrieve(
    id: string,
    params: AgentRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponseOfVoiceAgent> {
    const { 'x-profile-id': xProfileID } = params ?? {};
    return this._client.get(path`/v3/voice/agents/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Changes the fields you name and answers with the agent as stored, the same shape
   * `GET` returns.
   *
   * A key left out is left alone. A key sent as `null` clears an optional field
   * (`websocket_url` makes the agent dial in, `greeting` and `fallback` go,
   * `speech`, `audio`, `tools`, `limits` and `transcripts` return to their
   * defaults). A key sent with a value replaces that field whole: send the whole
   * `limits` object, not one of its keys. Changing `session_type` drops `speech`,
   * `audio` and `greeting` unless the body sends them, since the other type cannot
   * carry them. The result is checked like a new agent, and a body that changes
   * nothing is `400`.
   *
   * With `sandbox: true` nothing is written: the request is validated against the
   * stored agent and the agent is reported with `200` as it would read after the
   * change.
   *
   * @example
   * ```ts
   * const apiResponseOfVoiceAgent =
   *   await client.voice.agents.update('id');
   * ```
   */
  update(
    id: string,
    params: AgentUpdateParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfVoiceAgent> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.patch(path`/v3/voice/agents/${id}`, {
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
   * Your voice agents, newest first. `page` and `page_size` (1 to 100, default 20)
   * page the list. Signing secrets are never listed.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const voiceAgent of client.voice.agents.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    params: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<VoiceAgentsVoiceAgentsPage, VoiceAgent> {
    const { 'x-profile-id': xProfileID, ...query } = params ?? {};
    return this._client.getAPIList('/v3/voice/agents', VoiceAgentsPage<VoiceAgent>, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Removes the agent. Calls it already took keep their `agent_id`.
   *
   * An agent that one of your voice numbers routes to, or that another of your
   * agents lists in `transfer_targets`, is not deleted: the answer is `409` with a
   * message naming those numbers and agents. Unbind the numbers
   * (`PATCH /v3/channels/voice/{number}` with `"agent_id": null`), take the agent
   * out of the others' `transfer_targets` or delete them, and try again.
   *
   * With `sandbox: true` nothing is written: the agent is looked up and the answer
   * is the one a real delete would give.
   *
   * @example
   * ```ts
   * await client.voice.agents.delete('id');
   * ```
   */
  delete(id: string, params: AgentDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { 'x-profile-id': xProfileID, ...body } = params;
    return this._client.delete(path`/v3/voice/agents/${id}`, {
      body,
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(xProfileID != null ? { 'x-profile-id': xProfileID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Generates a new `signing_secret` for the agent and returns it. The previous
   * secret stops signing immediately, so update your agent before the next call
   * reaches it.
   *
   * With `sandbox: true` a secret is generated and returned with `202`, and nothing
   * is written.
   *
   * @example
   * ```ts
   * const apiResponseOfVoiceAgentSecret =
   *   await client.voice.agents.rotateSecret('id');
   * ```
   */
  rotateSecret(
    id: string,
    params: AgentRotateSecretParams,
    options?: RequestOptions,
  ): APIPromise<APIResponseOfVoiceAgentSecret> {
    const { 'Idempotency-Key': idempotencyKey, 'x-profile-id': xProfileID, ...body } = params;
    return this._client.post(path`/v3/voice/agents/${id}/rotate-secret`, {
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
}

export type VoiceAgentsVoiceAgentsPage = VoiceAgentsPage<VoiceAgent>;

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfVoiceAgent {
  /**
   * A voice agent as stored: what was written with every default filled in, plus the
   * signing secret the one time it is shown (on create, and on rotate). The one
   * shape every read of an agent answers with, on /v3/voice/agents and on the admin
   * API the dashboard uses, so the two cannot drift.
   */
  data?: VoiceAgent | null;

  /**
   * Error information
   */
  error?: WebhooksAPI.ErrorDetail | null;

  /**
   * Request and response metadata
   */
  meta?: WebhooksAPI.APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfVoiceAgentSecret {
  /**
   * A freshly rotated signing secret.
   */
  data?: VoiceAgentSecret | null;

  /**
   * Error information
   */
  error?: WebhooksAPI.ErrorDetail | null;

  /**
   * Request and response metadata
   */
  meta?: WebhooksAPI.APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

/**
 * Standard API response envelope for all v3 endpoints
 */
export interface APIResponseOfVoiceAgentsList {
  /**
   * A page of the account's agents. The agent itself is VoiceAgentResponse, shared
   * with the admin API.
   */
  data?: VoiceAgentsList | null;

  /**
   * Error information
   */
  error?: WebhooksAPI.ErrorDetail | null;

  /**
   * Request and response metadata
   */
  meta?: WebhooksAPI.APIMeta;

  /**
   * Indicates whether the request was successful
   */
  success?: boolean;
}

/**
 * A voice agent as stored: what was written with every default filled in, plus the
 * signing secret the one time it is shown (on create, and on rotate). The one
 * shape every read of an agent answers with, on /v3/voice/agents and on the admin
 * API the dashboard uses, so the two cannot drift.
 */
export interface VoiceAgent {
  /**
   * The agent's id, agent\_ and a UUID. It is also what the agent connects to the
   * gateway as.
   */
  id?: string;

  /**
   * Audio sessions: the sample rate in use.
   */
  audio?: VoiceAgentAudio | null;

  created_at?: string;

  fallback?: VoiceAgentParty | null;

  greeting?: string | null;

  limits?: VoiceAgentLimits;

  name?: string;

  /**
   * text or audio.
   */
  session_type?: string;

  /**
   * The whsec\_ secret the gateway signs its handshake to websocket_url with.
   * Present on create and after a rotate-secret; absent on every other read. Store
   * it now.
   */
  signing_secret?: string | null;

  /**
   * Text sessions: the speech setting, voice and language in use.
   */
  speech?: VoiceAgentSpeech | null;

  tools?: Array<string>;

  transcripts?: VoiceAgentTranscripts;

  transfer_targets?: Array<VoiceAgentParty>;

  updated_at?: string | null;

  /**
   * Where the gateway dials the agent; null when the agent dials in with your API
   * key.
   */
  websocket_url?: string | null;
}

export interface VoiceAgentAudio {
  sample_rate?: number;
}

export interface VoiceAgentAudioSpec {
  /**
   * Samples per second of the audio exchanged: 8000, 16000 or 24000. Default 16000.
   */
  sample_rate?: number | null;
}

export interface VoiceAgentLimits {
  allowed_countries?: Array<string> | null;

  max_call_seconds?: number;

  max_concurrent_calls?: number;
}

export interface VoiceAgentLimitsSpec {
  /**
   * ISO 3166-1 alpha-2 codes of the countries the agent may call or transfer to.
   * Omit it to allow every country. Stored now, applied when the agent places calls.
   */
  allowed_countries?: Array<string> | null;

  /**
   * The longest a call may last, 60 to 14,400 seconds. Default 3,600.
   */
  max_call_seconds?: number | null;

  /**
   * How many calls the agent may have going at once, from 1. Default 10.
   */
  max_concurrent_calls?: number | null;
}

export interface VoiceAgentParty {
  kind?: string;

  value?: string;
}

export interface VoiceAgentPartySpec {
  /**
   * number, user or agent.
   */
  kind?: string | null;

  /**
   * The E.164 number, the app user's identity, or the agent id (agent\_…).
   */
  value?: string | null;
}

/**
 * A freshly rotated signing secret.
 */
export interface VoiceAgentSecret {
  /**
   * The new whsec\_ secret. The previous one stopped signing the moment this was
   * returned. Shown once.
   */
  signing_secret?: string;
}

export interface VoiceAgentSpeech {
  language?: string;

  setting?: string;

  voice?: string;
}

export interface VoiceAgentSpeechSpec {
  /**
   * The language spoken and listened for, a BCP 47 tag from GET /v3/voice/voices.
   * Default en-US.
   */
  language?: string | null;

  /**
   * standard, Sent's speech. Other settings are not available yet.
   */
  setting?: string | null;

  /**
   * A voice name from GET /v3/voice/voices. Default: the catalogue's default voice.
   */
  voice?: string | null;
}

export interface VoiceAgentTranscripts {
  retention_days?: number;

  store?: boolean;
}

export interface VoiceAgentTranscriptsSpec {
  /**
   * How long a stored transcript is kept, 1 to 365 days. Default 30.
   */
  retention_days?: number | null;

  /**
   * Whether Sent keeps the call's transcript. Default false. Stored now, applied
   * when transcripts land.
   */
  store?: boolean | null;
}

/**
 * A page of the account's agents. The agent itself is VoiceAgentResponse, shared
 * with the admin API.
 */
export interface VoiceAgentsList {
  agents?: Array<VoiceAgent>;

  /**
   * Pagination metadata for list responses
   */
  pagination?: WebhooksAPI.PaginationMeta;
}

export interface AgentCreateParams {
  /**
   * Body param: Audio sessions only: the sound format.
   */
  audio?: VoiceAgentAudioSpec | null;

  /**
   * Body param: Who takes the call when the agent cannot: a phone number (kind:
   * number). Omit it and such a call hangs up.
   */
  fallback?: VoiceAgentPartySpec | null;

  /**
   * Body param: Text sessions only: what the caller hears as soon as the call is
   * answered, before the agent's first turn. 1 to 4,096 characters. Omit it and the
   * agent speaks first.
   */
  greeting?: string | null;

  /**
   * Body param
   */
  limits?: VoiceAgentLimitsSpec | null;

  /**
   * Body param: A name for your own reference, 1 to 100 characters.
   */
  name?: string | null;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param: text: Sent turns the caller's speech into text and the agent's text
   * into speech, so the agent exchanges text frames. audio: the agent receives and
   * sends the sound itself.
   */
  session_type?: string | null;

  /**
   * Body param: Text sessions only: how the caller is spoken to and listened to.
   */
  speech?: VoiceAgentSpeechSpec | null;

  /**
   * Body param: What the agent may do to the call: any of transfer, hangup,
   * send_dtmf and hold. Default ["hangup"]. transfer needs at least one
   * transfer_targets entry.
   */
  tools?: Array<string> | null;

  /**
   * Body param
   */
  transcripts?: VoiceAgentTranscriptsSpec | null;

  /**
   * Body param: Where the agent may transfer a call to, up to 20 parties: a phone
   * number (kind: number, E.164), one of your app users (kind: user, the identity)
   * or another of your agents (kind: agent, its id). The agent can only transfer to
   * a party listed here.
   */
  transfer_targets?: Array<VoiceAgentPartySpec> | null;

  /**
   * Body param: Where the gateway connects to the agent for each call: an absolute
   * wss:// URL on a public host, at most 2,048 characters. The handshake is signed
   * with the agent's signing_secret. Leave it out and the agent dials in instead,
   * connecting to the gateway with your API key.
   */
  websocket_url?: string | null;

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

export interface AgentRetrieveParams {
  /**
   * Profile UUID to scope the request to a child profile. Only organization API keys
   * can use this header. The profile must belong to the calling organization.
   */
  'x-profile-id'?: string;
}

export interface AgentUpdateParams {
  /**
   * Body param: Audio sessions: { sample_rate }; null restores the default.
   */
  audio?: VoiceAgentAudioSpec | null;

  /**
   * Body param: A new fallback party, or null for none.
   */
  fallback?: VoiceAgentPartySpec | null;

  /**
   * Body param: A new greeting, or null for none.
   */
  greeting?: string | null;

  /**
   * Body param: The whole limits object; null restores the defaults.
   */
  limits?: VoiceAgentLimitsSpec | null;

  /**
   * Body param: A new name, 1 to 100 characters.
   */
  name?: string;

  /**
   * Body param: Sandbox flag - when true, the operation is simulated without side
   * effects Useful for testing integrations without actual execution
   */
  sandbox?: boolean;

  /**
   * Body param: text or audio. Changing it drops the settings the other type cannot
   * have (speech, audio, greeting) unless the body sends them.
   */
  session_type?: string;

  /**
   * Body param: Text sessions: { setting, voice, language }, replaced whole; null
   * restores the defaults.
   */
  speech?: VoiceAgentSpeechSpec | null;

  /**
   * Body param: The whole list of tools; null restores the default.
   */
  tools?: Array<string> | null;

  /**
   * Body param: The whole transcripts object; null restores the defaults.
   */
  transcripts?: VoiceAgentTranscriptsSpec | null;

  /**
   * Body param: The whole list of parties; null clears it.
   */
  transfer_targets?: Array<VoiceAgentPartySpec> | null;

  /**
   * Body param: A new wss:// URL, or null for an agent that dials in.
   */
  websocket_url?: string | null;

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

export interface AgentListParams extends VoiceAgentsPageParams {
  /**
   * Header param: Profile UUID to scope the request to a child profile. Only
   * organization API keys can use this header. The profile must belong to the
   * calling organization.
   */
  'x-profile-id'?: string;
}

export interface AgentDeleteParams {
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

export interface AgentRotateSecretParams {
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

export declare namespace Agents {
  export {
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
}
