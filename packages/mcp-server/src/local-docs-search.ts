// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'create',
    endpoint: '/v3/webhooks',
    httpMethod: 'post',
    summary: 'Create a webhook',
    description: 'Creates a new webhook endpoint for the authenticated customer.',
    stainlessPath: '(resource) webhooks > (method) create',
    qualified: 'client.webhooks.create',
    params: [
      'display_name?: string;',
      'endpoint_url?: string;',
      'event_types?: string[];',
      'retry_count?: number;',
      'sandbox?: boolean;',
      'timeout_seconds?: number;',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## create\n\n`client.webhooks.create(display_name?: string, endpoint_url?: string, event_types?: string[], retry_count?: number, sandbox?: boolean, timeout_seconds?: number, Idempotency-Key?: string, x-profile-id?: string): { data?: webhook_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/webhooks`\n\nCreates a new webhook endpoint for the authenticated customer.\n\n### Parameters\n\n- `display_name?: string`\n\n- `endpoint_url?: string`\n\n- `event_types?: string[]`\n\n- `retry_count?: number`\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `timeout_seconds?: number`\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseWebhook = await client.webhooks.create();\n\nconsole.log(apiResponseWebhook);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v3/webhooks/{id}',
    httpMethod: 'get',
    summary: 'Get a webhook',
    description: 'Retrieves a single webhook by ID for the authenticated customer.',
    stainlessPath: '(resource) webhooks > (method) retrieve',
    qualified: 'client.webhooks.retrieve',
    params: ['id: string;', 'x-profile-id?: string;'],
    response:
      '{ data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## retrieve\n\n`client.webhooks.retrieve(id: string, x-profile-id?: string): { data?: webhook_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/webhooks/{id}`\n\nRetrieves a single webhook by ID for the authenticated customer.\n\n### Parameters\n\n- `id: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseWebhook = await client.webhooks.retrieve('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8');\n\nconsole.log(apiResponseWebhook);\n```",
  },
  {
    name: 'update',
    endpoint: '/v3/webhooks/{id}',
    httpMethod: 'put',
    summary: 'Update a webhook',
    description: 'Updates an existing webhook for the authenticated customer.',
    stainlessPath: '(resource) webhooks > (method) update',
    qualified: 'client.webhooks.update',
    params: [
      'id: string;',
      'display_name?: string;',
      'endpoint_url?: string;',
      'event_types?: string[];',
      'retry_count?: number;',
      'sandbox?: boolean;',
      'timeout_seconds?: number;',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## update\n\n`client.webhooks.update(id: string, display_name?: string, endpoint_url?: string, event_types?: string[], retry_count?: number, sandbox?: boolean, timeout_seconds?: number, Idempotency-Key?: string, x-profile-id?: string): { data?: webhook_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**put** `/v3/webhooks/{id}`\n\nUpdates an existing webhook for the authenticated customer.\n\n### Parameters\n\n- `id: string`\n\n- `display_name?: string`\n\n- `endpoint_url?: string`\n\n- `event_types?: string[]`\n\n- `retry_count?: number`\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `timeout_seconds?: number`\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseWebhook = await client.webhooks.update('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8');\n\nconsole.log(apiResponseWebhook);\n```",
  },
  {
    name: 'list',
    endpoint: '/v3/webhooks',
    httpMethod: 'get',
    summary: 'Get webhooks list',
    description: 'Retrieves a paginated list of webhooks for the authenticated customer.',
    stainlessPath: '(resource) webhooks > (method) list',
    qualified: 'client.webhooks.list',
    params: [
      'page: number;',
      'page_size: number;',
      'is_active?: boolean;',
      'search?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { pagination?: object; webhooks?: object[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## list\n\n`client.webhooks.list(page: number, page_size: number, is_active?: boolean, search?: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/webhooks`\n\nRetrieves a paginated list of webhooks for the authenticated customer.\n\n### Parameters\n\n- `page: number`\n\n- `page_size: number`\n\n- `is_active?: boolean`\n\n- `search?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { pagination?: object; webhooks?: object[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { pagination?: { cursors?: { after?: string; before?: string; }; has_more?: boolean; page?: number; page_size?: number; total_count?: number; total_pages?: number; }; webhooks?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst webhooks = await client.webhooks.list({ page: 0, page_size: 0 });\n\nconsole.log(webhooks);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v3/webhooks/{id}',
    httpMethod: 'delete',
    summary: 'Delete a webhook',
    description: 'Deletes a webhook for the authenticated customer.',
    stainlessPath: '(resource) webhooks > (method) delete',
    qualified: 'client.webhooks.delete',
    params: ['id: string;', 'x-profile-id?: string;'],
    markdown:
      "## delete\n\n`client.webhooks.delete(id: string, x-profile-id?: string): void`\n\n**delete** `/v3/webhooks/{id}`\n\nDeletes a webhook for the authenticated customer.\n\n### Parameters\n\n- `id: string`\n\n- `x-profile-id?: string`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nawait client.webhooks.delete('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8')\n```",
  },
  {
    name: 'list_event_types',
    endpoint: '/v3/webhooks/event-types',
    httpMethod: 'get',
    summary: 'Get available webhook event types',
    description: 'Retrieves all available webhook event types that can be subscribed to.',
    stainlessPath: '(resource) webhooks > (method) list_event_types',
    qualified: 'client.webhooks.listEventTypes',
    params: ['x-profile-id?: string;'],
    response:
      '{ data?: { event_types?: { description?: string; display_name?: string; is_active?: boolean; name?: string; }[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## list_event_types\n\n`client.webhooks.listEventTypes(x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/webhooks/event-types`\n\nRetrieves all available webhook event types that can be subscribed to.\n\n### Parameters\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { event_types?: { description?: string; display_name?: string; is_active?: boolean; name?: string; }[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { event_types?: { description?: string; display_name?: string; is_active?: boolean; name?: string; }[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst response = await client.webhooks.listEventTypes();\n\nconsole.log(response);\n```",
  },
  {
    name: 'list_events',
    endpoint: '/v3/webhooks/{id}/events',
    httpMethod: 'get',
    summary: 'Get webhook events',
    description: 'Retrieves a paginated list of delivery events for the specified webhook.',
    stainlessPath: '(resource) webhooks > (method) list_events',
    qualified: 'client.webhooks.listEvents',
    params: [
      'id: string;',
      'page: number;',
      'page_size: number;',
      'search?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { events?: { id?: string; created_at?: string; delivery_attempts?: number; delivery_status?: string; error_message?: string; event_data?: object; event_type?: string; http_status_code?: number; processing_completed_at?: string; processing_started_at?: string; response_body?: string; }[]; pagination?: object; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## list_events\n\n`client.webhooks.listEvents(id: string, page: number, page_size: number, search?: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/webhooks/{id}/events`\n\nRetrieves a paginated list of delivery events for the specified webhook.\n\n### Parameters\n\n- `id: string`\n\n- `page: number`\n\n- `page_size: number`\n\n- `search?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { events?: { id?: string; created_at?: string; delivery_attempts?: number; delivery_status?: string; error_message?: string; event_data?: object; event_type?: string; http_status_code?: number; processing_completed_at?: string; processing_started_at?: string; response_body?: string; }[]; pagination?: object; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { events?: { id?: string; created_at?: string; delivery_attempts?: number; delivery_status?: string; error_message?: string; event_data?: object; event_type?: string; http_status_code?: number; processing_completed_at?: string; processing_started_at?: string; response_body?: string; }[]; pagination?: { cursors?: { after?: string; before?: string; }; has_more?: boolean; page?: number; page_size?: number; total_count?: number; total_pages?: number; }; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst response = await client.webhooks.listEvents('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8', { page: 0, page_size: 0 });\n\nconsole.log(response);\n```",
  },
  {
    name: 'rotate_secret',
    endpoint: '/v3/webhooks/{id}/rotate-secret',
    httpMethod: 'post',
    summary: 'Rotate webhook signing secret',
    description:
      'Generates a new signing secret for the specified webhook. The old secret is immediately invalidated.',
    stainlessPath: '(resource) webhooks > (method) rotate_secret',
    qualified: 'client.webhooks.rotateSecret',
    params: [
      'id: string;',
      'body: { sandbox?: boolean; };',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { signing_secret?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## rotate_secret\n\n`client.webhooks.rotateSecret(id: string, body: { sandbox?: boolean; }, Idempotency-Key?: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/webhooks/{id}/rotate-secret`\n\nGenerates a new signing secret for the specified webhook. The old secret is immediately invalidated.\n\n### Parameters\n\n- `id: string`\n\n- `body: { sandbox?: boolean; }`\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { signing_secret?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { signing_secret?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst response = await client.webhooks.rotateSecret('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8', { body: {} });\n\nconsole.log(response);\n```",
  },
  {
    name: 'test',
    endpoint: '/v3/webhooks/{id}/test',
    httpMethod: 'post',
    summary: 'Test a webhook',
    description: 'Sends a test event to the specified webhook endpoint to verify connectivity.',
    stainlessPath: '(resource) webhooks > (method) test',
    qualified: 'client.webhooks.test',
    params: [
      'id: string;',
      'event_type?: string;',
      'sandbox?: boolean;',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { message?: string; success?: boolean; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## test\n\n`client.webhooks.test(id: string, event_type?: string, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/webhooks/{id}/test`\n\nSends a test event to the specified webhook endpoint to verify connectivity.\n\n### Parameters\n\n- `id: string`\n\n- `event_type?: string`\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { message?: string; success?: boolean; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { message?: string; success?: boolean; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst response = await client.webhooks.test('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8');\n\nconsole.log(response);\n```",
  },
  {
    name: 'toggle_status',
    endpoint: '/v3/webhooks/{id}/toggle-status',
    httpMethod: 'patch',
    summary: 'Toggle webhook status',
    description: 'Activates or deactivates a webhook for the authenticated customer.',
    stainlessPath: '(resource) webhooks > (method) toggle_status',
    qualified: 'client.webhooks.toggleStatus',
    params: [
      'id: string;',
      'is_active?: boolean;',
      'sandbox?: boolean;',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## toggle_status\n\n`client.webhooks.toggleStatus(id: string, is_active?: boolean, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: webhook_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**patch** `/v3/webhooks/{id}/toggle-status`\n\nActivates or deactivates a webhook for the authenticated customer.\n\n### Parameters\n\n- `id: string`\n\n- `is_active?: boolean`\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseWebhook = await client.webhooks.toggleStatus('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8');\n\nconsole.log(apiResponseWebhook);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v3/users/{userId}',
    httpMethod: 'get',
    summary: 'Get user by ID',
    description:
      'Retrieves detailed information about a specific user in an organization or profile. Requires developer role or higher.',
    stainlessPath: '(resource) users > (method) retrieve',
    qualified: 'client.users.retrieve',
    params: ['userId: string;', 'x-profile-id?: string;'],
    response:
      '{ data?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## retrieve\n\n`client.users.retrieve(userId: string, x-profile-id?: string): { data?: user_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/users/{userId}`\n\nRetrieves detailed information about a specific user in an organization or profile. Requires developer role or higher.\n\n### Parameters\n\n- `userId: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseOfUser = await client.users.retrieve('userId');\n\nconsole.log(apiResponseOfUser);\n```",
  },
  {
    name: 'list',
    endpoint: '/v3/users',
    httpMethod: 'get',
    summary: 'List users',
    description:
      'Retrieves all users who have access to the organization or profile identified by the API key, including their roles and status. Shows invited users (pending acceptance) and active users. Requires developer role or higher.',
    stainlessPath: '(resource) users > (method) list',
    qualified: 'client.users.list',
    params: ['x-profile-id?: string;'],
    response:
      '{ data?: { users?: object[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## list\n\n`client.users.list(x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/users`\n\nRetrieves all users who have access to the organization or profile identified by the API key, including their roles and status. Shows invited users (pending acceptance) and active users. Requires developer role or higher.\n\n### Parameters\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { users?: object[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { users?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst users = await client.users.list();\n\nconsole.log(users);\n```",
  },
  {
    name: 'invite',
    endpoint: '/v3/users',
    httpMethod: 'post',
    summary: 'Invite a user',
    description:
      'Sends an invitation to a user to join the organization or profile with a specific role. Requires admin role. The user will receive an invitation email with a token to accept. Invitation tokens expire after 7 days.',
    stainlessPath: '(resource) users > (method) invite',
    qualified: 'client.users.invite',
    params: [
      'email?: string;',
      'name?: string;',
      'role?: string;',
      'sandbox?: boolean;',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## invite\n\n`client.users.invite(email?: string, name?: string, role?: string, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: user_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/users`\n\nSends an invitation to a user to join the organization or profile with a specific role. Requires admin role. The user will receive an invitation email with a token to accept. Invitation tokens expire after 7 days.\n\n### Parameters\n\n- `email?: string`\n  User email address (required)\n\n- `name?: string`\n  User full name (required)\n\n- `role?: string`\n  User role: admin, billing, or developer (required)\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseOfUser = await client.users.invite();\n\nconsole.log(apiResponseOfUser);\n```",
  },
  {
    name: 'remove',
    endpoint: '/v3/users/{userId}',
    httpMethod: 'delete',
    summary: 'Remove user',
    description:
      "Removes a user's access to an organization or profile. Requires admin role. You cannot remove yourself or remove the last admin.",
    stainlessPath: '(resource) users > (method) remove',
    qualified: 'client.users.remove',
    params: ['userId: string;', 'body: { sandbox?: boolean; };', 'x-profile-id?: string;'],
    markdown:
      "## remove\n\n`client.users.remove(userId: string, body: { sandbox?: boolean; }, x-profile-id?: string): void`\n\n**delete** `/v3/users/{userId}`\n\nRemoves a user's access to an organization or profile. Requires admin role. You cannot remove yourself or remove the last admin.\n\n### Parameters\n\n- `userId: string`\n\n- `body: { sandbox?: boolean; }`\n  Request to remove a user from an organization\n\n- `x-profile-id?: string`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nawait client.users.remove('userId', { body: {} })\n```",
  },
  {
    name: 'update_role',
    endpoint: '/v3/users/{userId}',
    httpMethod: 'patch',
    summary: 'Update user role',
    description:
      "Updates a user's role in the organization or profile. Requires admin role. You cannot change your own role or demote the last admin.",
    stainlessPath: '(resource) users > (method) update_role',
    qualified: 'client.users.updateRole',
    params: [
      'userId: string;',
      'role?: string;',
      'sandbox?: boolean;',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## update_role\n\n`client.users.updateRole(userId: string, role?: string, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: user_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**patch** `/v3/users/{userId}`\n\nUpdates a user's role in the organization or profile. Requires admin role. You cannot change your own role or demote the last admin.\n\n### Parameters\n\n- `userId: string`\n\n- `role?: string`\n  User role: admin, billing, or developer (required)\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseOfUser = await client.users.updateRole('userId');\n\nconsole.log(apiResponseOfUser);\n```",
  },
  {
    name: 'create',
    endpoint: '/v3/templates',
    httpMethod: 'post',
    summary: 'Create a new template',
    description:
      'Creates a new message template with header, body, footer, and buttons. The template can be submitted for review immediately or saved as draft for later submission.',
    stainlessPath: '(resource) templates > (method) create',
    qualified: 'client.templates.create',
    params: [
      'category?: string;',
      'creation_source?: string;',
      'definition?: { body: { multiChannel?: template_body_content; sms?: template_body_content; whatsapp?: template_body_content; }; authenticationConfig?: { addSecurityRecommendation?: boolean; codeExpirationMinutes?: number; }; buttons?: { id?: number; props?: sent_dm_services_common_contracts_poc_os_template_button_props; type?: string; }[]; definitionVersion?: string; footer?: { template?: string; type?: string; variables?: template_variable[]; }; header?: { template?: string; type?: string; variables?: template_variable[]; }; };',
      'language?: string;',
      'sandbox?: boolean;',
      'submit_for_review?: boolean;',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## create\n\n`client.templates.create(category?: string, creation_source?: string, definition?: { body: sent_dm_services_common_contracts_poc_os_template_body; authenticationConfig?: sent_dm_services_common_contracts_poc_os_authentication_config; buttons?: sent_dm_services_common_contracts_poc_os_template_button[]; definitionVersion?: string; footer?: sent_dm_services_common_contracts_poc_os_template_footer; header?: sent_dm_services_common_contracts_poc_os_template_header; }, language?: string, sandbox?: boolean, submit_for_review?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: template; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/templates`\n\nCreates a new message template with header, body, footer, and buttons. The template can be submitted for review immediately or saved as draft for later submission.\n\n### Parameters\n\n- `category?: string`\n  Template category: MARKETING, UTILITY, AUTHENTICATION (optional, auto-detected if not provided)\n\n- `creation_source?: string`\n  Source of template creation (default: from-api)\n\n- `definition?: { body: { multiChannel?: template_body_content; sms?: template_body_content; whatsapp?: template_body_content; }; authenticationConfig?: { addSecurityRecommendation?: boolean; codeExpirationMinutes?: number; }; buttons?: { id?: number; props?: sent_dm_services_common_contracts_poc_os_template_button_props; type?: string; }[]; definitionVersion?: string; footer?: { template?: string; type?: string; variables?: template_variable[]; }; header?: { template?: string; type?: string; variables?: template_variable[]; }; }`\n  Complete definition of a message template including header, body, footer, and buttons\n  - `body: { multiChannel?: { template?: string; type?: string; variables?: template_variable[]; }; sms?: { template?: string; type?: string; variables?: template_variable[]; }; whatsapp?: { template?: string; type?: string; variables?: template_variable[]; }; }`\n    Body section of a message template with channel-specific content\n  - `authenticationConfig?: { addSecurityRecommendation?: boolean; codeExpirationMinutes?: number; }`\n    Configuration for AUTHENTICATION category templates\n  - `buttons?: { id?: number; props?: { activeFor?: number; autofillText?: string; countryCode?: string; offerCode?: string; otpType?: string; packageName?: string; phoneNumber?: string; quickReplyType?: string; signatureHash?: string; text?: string; url?: string; urlType?: string; }; type?: string; }[]`\n    Optional list of interactive buttons (e.g., quick replies, URLs, phone numbers)\n  - `definitionVersion?: string`\n    The version of the template definition format\n  - `footer?: { template?: string; type?: string; variables?: { id?: number; name?: string; props?: object; type?: string; }[]; }`\n    Footer section of a message template\n  - `header?: { template?: string; type?: string; variables?: { id?: number; name?: string; props?: object; type?: string; }[]; }`\n    Header section of a message template\n\n- `language?: string`\n  Template language code (e.g., en_US) (optional, auto-detected if not provided)\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `submit_for_review?: boolean`\n  Whether to submit the template for review after creation (default: false)\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseTemplate = await client.templates.create();\n\nconsole.log(apiResponseTemplate);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v3/templates/{id}',
    httpMethod: 'get',
    summary: 'Get template by ID',
    description:
      'Retrieves a specific template by its ID. Returns template details including name, category, language, status, and definition.',
    stainlessPath: '(resource) templates > (method) retrieve',
    qualified: 'client.templates.retrieve',
    params: ['id: string;', 'x-profile-id?: string;'],
    response:
      '{ data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## retrieve\n\n`client.templates.retrieve(id: string, x-profile-id?: string): { data?: template; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/templates/{id}`\n\nRetrieves a specific template by its ID. Returns template details including name, category, language, status, and definition.\n\n### Parameters\n\n- `id: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseTemplate = await client.templates.retrieve('7ba7b820-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(apiResponseTemplate);\n```",
  },
  {
    name: 'update',
    endpoint: '/v3/templates/{id}',
    httpMethod: 'put',
    summary: 'Update a template',
    description:
      "Updates an existing template's name, category, language, definition, or submits it for review.",
    stainlessPath: '(resource) templates > (method) update',
    qualified: 'client.templates.update',
    params: [
      'id: string;',
      'category?: string;',
      'definition?: { body: { multiChannel?: template_body_content; sms?: template_body_content; whatsapp?: template_body_content; }; authenticationConfig?: { addSecurityRecommendation?: boolean; codeExpirationMinutes?: number; }; buttons?: { id?: number; props?: sent_dm_services_common_contracts_poc_os_template_button_props; type?: string; }[]; definitionVersion?: string; footer?: { template?: string; type?: string; variables?: template_variable[]; }; header?: { template?: string; type?: string; variables?: template_variable[]; }; };',
      'language?: string;',
      'name?: string;',
      'sandbox?: boolean;',
      'submit_for_review?: boolean;',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## update\n\n`client.templates.update(id: string, category?: string, definition?: { body: sent_dm_services_common_contracts_poc_os_template_body; authenticationConfig?: sent_dm_services_common_contracts_poc_os_authentication_config; buttons?: sent_dm_services_common_contracts_poc_os_template_button[]; definitionVersion?: string; footer?: sent_dm_services_common_contracts_poc_os_template_footer; header?: sent_dm_services_common_contracts_poc_os_template_header; }, language?: string, name?: string, sandbox?: boolean, submit_for_review?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: template; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**put** `/v3/templates/{id}`\n\nUpdates an existing template's name, category, language, definition, or submits it for review.\n\n### Parameters\n\n- `id: string`\n\n- `category?: string`\n  Template category: MARKETING, UTILITY, AUTHENTICATION\n\n- `definition?: { body: { multiChannel?: template_body_content; sms?: template_body_content; whatsapp?: template_body_content; }; authenticationConfig?: { addSecurityRecommendation?: boolean; codeExpirationMinutes?: number; }; buttons?: { id?: number; props?: sent_dm_services_common_contracts_poc_os_template_button_props; type?: string; }[]; definitionVersion?: string; footer?: { template?: string; type?: string; variables?: template_variable[]; }; header?: { template?: string; type?: string; variables?: template_variable[]; }; }`\n  Complete definition of a message template including header, body, footer, and buttons\n  - `body: { multiChannel?: { template?: string; type?: string; variables?: template_variable[]; }; sms?: { template?: string; type?: string; variables?: template_variable[]; }; whatsapp?: { template?: string; type?: string; variables?: template_variable[]; }; }`\n    Body section of a message template with channel-specific content\n  - `authenticationConfig?: { addSecurityRecommendation?: boolean; codeExpirationMinutes?: number; }`\n    Configuration for AUTHENTICATION category templates\n  - `buttons?: { id?: number; props?: { activeFor?: number; autofillText?: string; countryCode?: string; offerCode?: string; otpType?: string; packageName?: string; phoneNumber?: string; quickReplyType?: string; signatureHash?: string; text?: string; url?: string; urlType?: string; }; type?: string; }[]`\n    Optional list of interactive buttons (e.g., quick replies, URLs, phone numbers)\n  - `definitionVersion?: string`\n    The version of the template definition format\n  - `footer?: { template?: string; type?: string; variables?: { id?: number; name?: string; props?: object; type?: string; }[]; }`\n    Footer section of a message template\n  - `header?: { template?: string; type?: string; variables?: { id?: number; name?: string; props?: object; type?: string; }[]; }`\n    Header section of a message template\n\n- `language?: string`\n  Template language code (e.g., en_US)\n\n- `name?: string`\n  Template display name\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `submit_for_review?: boolean`\n  Whether to submit the template for review after updating (default: false)\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseTemplate = await client.templates.update('7ba7b820-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(apiResponseTemplate);\n```",
  },
  {
    name: 'list',
    endpoint: '/v3/templates',
    httpMethod: 'get',
    summary: 'Get templates list',
    description:
      'Retrieves a paginated list of message templates for the authenticated customer. Supports filtering by status, category, and search term.',
    stainlessPath: '(resource) templates > (method) list',
    qualified: 'client.templates.list',
    params: [
      'page: number;',
      'page_size: number;',
      'category?: string;',
      'is_welcome_playground?: boolean;',
      'search?: string;',
      'status?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { pagination?: object; templates?: object[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## list\n\n`client.templates.list(page: number, page_size: number, category?: string, is_welcome_playground?: boolean, search?: string, status?: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/templates`\n\nRetrieves a paginated list of message templates for the authenticated customer. Supports filtering by status, category, and search term.\n\n### Parameters\n\n- `page: number`\n  Page number (1-indexed)\n\n- `page_size: number`\n  Number of items per page\n\n- `category?: string`\n  Optional category filter: MARKETING, UTILITY, AUTHENTICATION\n\n- `is_welcome_playground?: boolean`\n  Optional filter by welcome playground flag\n\n- `search?: string`\n  Optional search term for filtering templates\n\n- `status?: string`\n  Optional status filter: APPROVED, PENDING, REJECTED\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { pagination?: object; templates?: object[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { pagination?: { cursors?: { after?: string; before?: string; }; has_more?: boolean; page?: number; page_size?: number; total_count?: number; total_pages?: number; }; templates?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst templates = await client.templates.list({ page: 0, page_size: 0 });\n\nconsole.log(templates);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v3/templates/{id}',
    httpMethod: 'delete',
    summary: 'Delete a template',
    description:
      'Deletes a template by ID. Optionally, you can also delete the template from WhatsApp/Meta by setting delete_from_meta=true.',
    stainlessPath: '(resource) templates > (method) delete',
    qualified: 'client.templates.delete',
    params: ['id: string;', 'delete_from_meta?: boolean;', 'sandbox?: boolean;', 'x-profile-id?: string;'],
    markdown:
      "## delete\n\n`client.templates.delete(id: string, delete_from_meta?: boolean, sandbox?: boolean, x-profile-id?: string): void`\n\n**delete** `/v3/templates/{id}`\n\nDeletes a template by ID. Optionally, you can also delete the template from WhatsApp/Meta by setting delete_from_meta=true.\n\n### Parameters\n\n- `id: string`\n\n- `delete_from_meta?: boolean`\n  Whether to also delete the template from WhatsApp/Meta (optional, defaults to false)\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `x-profile-id?: string`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nawait client.templates.delete('7ba7b820-9dad-11d1-80b4-00c04fd430c8')\n```",
  },
  {
    name: 'create',
    endpoint: '/v3/profiles',
    httpMethod: 'post',
    summary: 'Create a new profile',
    description:
      'Creates a new sender profile within an organization. Profiles represent different brands, departments, or use cases, each with their own messaging configuration and settings. Requires admin role in the organization.\n\n## WhatsApp Business Account\n\nEvery profile must be linked to a WhatsApp Business Account. There are two ways to do this:\n\n**1. Inherit from organization (default)** — Omit the `whatsapp_business_account` field. The profile will share the organization\'s WhatsApp Business Account, which must have been set up via WhatsApp Embedded Signup. This is the recommended path for most use cases.\n\n**2. Direct credentials** — Provide a `whatsapp_business_account` object with `waba_id`, `phone_number_id`, and `access_token`. Use this when the profile needs its own independent WhatsApp Business Account. Obtain these from Meta Business Manager by creating a System User with `whatsapp_business_messaging` and `whatsapp_business_management` permissions.\n\nIf the `whatsapp_business_account` field is omitted and the organization has no WhatsApp Business Account configured, the request will be rejected with HTTP 422.\n\n## Brand\n\nInclude the optional `brand` field to create the brand for this profile at the same time. Cannot be used when `inherit_tcr_brand` is `true`.\n\n## Payment Details\n\nWhen `billing_model` is `"profile"` or `"profile_and_organization"` you may include a `payment_details` object containing the card number, expiry (MM/YY), CVC, and billing ZIP code. Payment details are **never stored** on our servers and are forwarded directly to the payment processor. Providing `payment_details` when `billing_model` is `"organization"` is not allowed.',
    stainlessPath: '(resource) profiles > (method) create',
    qualified: 'client.profiles.create',
    params: [
      'allow_contact_sharing?: boolean;',
      'allow_template_sharing?: boolean;',
      'billing_contact?: { email: string; name: string; address?: string; phone?: string; };',
      'billing_model?: string;',
      "brand?: { compliance: { brandRelationship: tcr_brand_relationship; vertical: tcr_vertical; destinationCountries?: destination_country[]; expectedMessagingVolume?: string; isTcrApplication?: boolean; notes?: string; phoneNumberPrefix?: string; primaryUseCase?: string; }; contact: { name: string; businessName?: string; email?: string; phone?: string; phoneCountryCode?: string; role?: string; }; business?: { city?: string; country?: string; countryOfRegistration?: string; entityType?: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'SOLE_PROPRIETOR' | 'GOVERNMENT'; legalName?: string; postalCode?: string; state?: string; street?: string; taxId?: string; taxIdType?: string; url?: string; }; };",
      'description?: string;',
      'icon?: string;',
      'inherit_contacts?: boolean;',
      'inherit_tcr_brand?: boolean;',
      'inherit_tcr_campaign?: boolean;',
      'inherit_templates?: boolean;',
      'name?: string;',
      'payment_details?: { card_number: string; cvc: string; expiry: string; zip_code: string; };',
      'sandbox?: boolean;',
      'short_name?: string;',
      'whatsapp_business_account?: { access_token: string; waba_id: string; phone_number_id?: string; };',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: object; billing_model?: string; brand?: object; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## create\n\n`client.profiles.create(allow_contact_sharing?: boolean, allow_template_sharing?: boolean, billing_contact?: { email: string; name: string; address?: string; phone?: string; }, billing_model?: string, brand?: { compliance: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_brands_brand_compliance_info; contact: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_brands_brand_contact_info; business?: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_brands_brand_business_info; }, description?: string, icon?: string, inherit_contacts?: boolean, inherit_tcr_brand?: boolean, inherit_tcr_campaign?: boolean, inherit_templates?: boolean, name?: string, payment_details?: { card_number: string; cvc: string; expiry: string; zip_code: string; }, sandbox?: boolean, short_name?: string, whatsapp_business_account?: { access_token: string; waba_id: string; phone_number_id?: string; }, Idempotency-Key?: string, x-profile-id?: string): { data?: profile_detail; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/profiles`\n\nCreates a new sender profile within an organization. Profiles represent different brands, departments, or use cases, each with their own messaging configuration and settings. Requires admin role in the organization.\n\n## WhatsApp Business Account\n\nEvery profile must be linked to a WhatsApp Business Account. There are two ways to do this:\n\n**1. Inherit from organization (default)** — Omit the `whatsapp_business_account` field. The profile will share the organization's WhatsApp Business Account, which must have been set up via WhatsApp Embedded Signup. This is the recommended path for most use cases.\n\n**2. Direct credentials** — Provide a `whatsapp_business_account` object with `waba_id`, `phone_number_id`, and `access_token`. Use this when the profile needs its own independent WhatsApp Business Account. Obtain these from Meta Business Manager by creating a System User with `whatsapp_business_messaging` and `whatsapp_business_management` permissions.\n\nIf the `whatsapp_business_account` field is omitted and the organization has no WhatsApp Business Account configured, the request will be rejected with HTTP 422.\n\n## Brand\n\nInclude the optional `brand` field to create the brand for this profile at the same time. Cannot be used when `inherit_tcr_brand` is `true`.\n\n## Payment Details\n\nWhen `billing_model` is `\"profile\"` or `\"profile_and_organization\"` you may include a `payment_details` object containing the card number, expiry (MM/YY), CVC, and billing ZIP code. Payment details are **never stored** on our servers and are forwarded directly to the payment processor. Providing `payment_details` when `billing_model` is `\"organization\"` is not allowed.\n\n### Parameters\n\n- `allow_contact_sharing?: boolean`\n  Whether contacts are shared across profiles (default: false)\n\n- `allow_template_sharing?: boolean`\n  Whether templates are shared across profiles (default: false)\n\n- `billing_contact?: { email: string; name: string; address?: string; phone?: string; }`\n  Billing contact information for a profile.\nRequired when billing_model is \"profile\" or \"profile_and_organization\".\n  - `email: string`\n    Email address where invoices will be sent (required)\n  - `name: string`\n    Full name of the billing contact or company (required)\n  - `address?: string`\n    Billing address (optional). Free-form text including street, city, state, postal code, and country.\n  - `phone?: string`\n    Phone number for the billing contact (optional)\n\n- `billing_model?: string`\n  Billing model: profile, organization, or profile_and_organization (default: profile).\n- \"organization\": the organization's billing details are used; no profile-level billing info needed.\n- \"profile\": the profile is billed independently; billing_contact is required.\n- \"profile_and_organization\": the profile is billed first with the organization as fallback; billing_contact is required.\n\n- `brand?: { compliance: { brandRelationship: tcr_brand_relationship; vertical: tcr_vertical; destinationCountries?: destination_country[]; expectedMessagingVolume?: string; isTcrApplication?: boolean; notes?: string; phoneNumberPrefix?: string; primaryUseCase?: string; }; contact: { name: string; businessName?: string; email?: string; phone?: string; phoneCountryCode?: string; role?: string; }; business?: { city?: string; country?: string; countryOfRegistration?: string; entityType?: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'SOLE_PROPRIETOR' | 'GOVERNMENT'; legalName?: string; postalCode?: string; state?: string; street?: string; taxId?: string; taxIdType?: string; url?: string; }; }`\n  Brand and KYC data grouped into contact, business, and compliance sections\n  - `compliance: { brandRelationship: 'BASIC_ACCOUNT' | 'MEDIUM_ACCOUNT' | 'LARGE_ACCOUNT' | 'SMALL_ACCOUNT' | 'KEY_ACCOUNT'; vertical: string; destinationCountries?: { id?: string; isMain?: boolean; }[]; expectedMessagingVolume?: string; isTcrApplication?: boolean; notes?: string; phoneNumberPrefix?: string; primaryUseCase?: string; }`\n    Compliance and TCR information for brand registration\n  - `contact: { name: string; businessName?: string; email?: string; phone?: string; phoneCountryCode?: string; role?: string; }`\n    Contact information for brand KYC\n  - `business?: { city?: string; country?: string; countryOfRegistration?: string; entityType?: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'SOLE_PROPRIETOR' | 'GOVERNMENT'; legalName?: string; postalCode?: string; state?: string; street?: string; taxId?: string; taxIdType?: string; url?: string; }`\n    Business details and address for brand KYC\n\n- `description?: string`\n  Profile description (optional)\n\n- `icon?: string`\n  Profile icon URL (optional)\n\n- `inherit_contacts?: boolean`\n  Whether this profile inherits contacts from organization (default: true)\n\n- `inherit_tcr_brand?: boolean`\n  Whether this profile inherits TCR brand from organization (default: true)\n\n- `inherit_tcr_campaign?: boolean`\n  Whether this profile inherits TCR campaign from organization (default: true)\n\n- `inherit_templates?: boolean`\n  Whether this profile inherits templates from organization (default: true)\n\n- `name?: string`\n  Profile name (required)\n\n- `payment_details?: { card_number: string; cvc: string; expiry: string; zip_code: string; }`\n  Payment card details for a profile.\nAccepted when billing_model is \"profile\" or \"profile_and_organization\".\nThese details are not stored on our servers and will be forwarded to the payment processor.\n  - `card_number: string`\n    Card number (digits only, 13–19 characters)\n  - `cvc: string`\n    Card security code (3–4 digits)\n  - `expiry: string`\n    Card expiry date in MM/YY format (e.g. \"09/27\")\n  - `zip_code: string`\n    Billing ZIP / postal code associated with the card\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `short_name?: string`\n  Profile short name/abbreviation (optional). Must be 3–11 characters, contain only letters, numbers,\nand spaces, and include at least one letter. Example: \"SALES\", \"Mkt 2\", \"Support1\".\n\n- `whatsapp_business_account?: { access_token: string; waba_id: string; phone_number_id?: string; }`\n  Direct WhatsApp Business Account credentials for a profile.\nUse this when the profile should have its own WhatsApp Business Account instead of inheriting from the organization.\nCredentials must be obtained from Meta Business Manager by creating a System User with\nwhatsapp_business_messaging and whatsapp_business_management scopes.\n  - `access_token: string`\n    System User access token with whatsapp_business_messaging and\nwhatsapp_business_management permissions. This value is stored securely\nand never returned in API responses.\n  - `waba_id: string`\n    WhatsApp Business Account ID from Meta Business Manager\n  - `phone_number_id?: string`\n    Phone Number ID of an existing number already registered under this WABA in Meta Business Manager.\nOptional — when omitted, a number will be provisioned from our pool and registered in the WABA\nduring the onboarding flow. When provided, the number must already exist in the WABA.\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: object; billing_model?: string; brand?: object; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: { address?: string; email?: string; name?: string; phone?: string; }; billing_model?: string; brand?: { id?: string; business?: { city?: string; country?: string; country_of_registration?: string; entity_type?: string; legal_name?: string; postal_code?: string; state?: string; street?: string; tax_id?: string; tax_id_type?: string; url?: string; }; compliance?: { brand_relationship?: tcr_brand_relationship; destination_countries?: destination_country[]; expected_messaging_volume?: string; is_tcr_application?: boolean; notes?: string; phone_number_prefix?: string; primary_use_case?: string; vertical?: tcr_vertical; }; contact?: { business_name?: string; email?: string; name?: string; phone?: string; phone_country_code?: string; role?: string; }; created_at?: string; csp_id?: string; identity_status?: 'SELF_DECLARED' | 'UNVERIFIED' | 'VERIFIED' | 'VETTED_VERIFIED'; is_inherited?: boolean; status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'; submitted_at?: string; submitted_to_tcr?: boolean; tcr_brand_id?: string; universal_ein?: string; updated_at?: string; }; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseOfProfileDetail = await client.profiles.create();\n\nconsole.log(apiResponseOfProfileDetail);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v3/profiles/{profileId}',
    httpMethod: 'get',
    summary: 'Get profile by ID',
    description:
      'Retrieves detailed information about a specific sender profile within an organization, including brand and KYC information if a brand has been configured.',
    stainlessPath: '(resource) profiles > (method) retrieve',
    qualified: 'client.profiles.retrieve',
    params: ['profileId: string;', 'x-profile-id?: string;'],
    response:
      '{ data?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: object; billing_model?: string; brand?: object; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## retrieve\n\n`client.profiles.retrieve(profileId: string, x-profile-id?: string): { data?: profile_detail; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/profiles/{profileId}`\n\nRetrieves detailed information about a specific sender profile within an organization, including brand and KYC information if a brand has been configured.\n\n### Parameters\n\n- `profileId: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: object; billing_model?: string; brand?: object; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: { address?: string; email?: string; name?: string; phone?: string; }; billing_model?: string; brand?: { id?: string; business?: { city?: string; country?: string; country_of_registration?: string; entity_type?: string; legal_name?: string; postal_code?: string; state?: string; street?: string; tax_id?: string; tax_id_type?: string; url?: string; }; compliance?: { brand_relationship?: tcr_brand_relationship; destination_countries?: destination_country[]; expected_messaging_volume?: string; is_tcr_application?: boolean; notes?: string; phone_number_prefix?: string; primary_use_case?: string; vertical?: tcr_vertical; }; contact?: { business_name?: string; email?: string; name?: string; phone?: string; phone_country_code?: string; role?: string; }; created_at?: string; csp_id?: string; identity_status?: 'SELF_DECLARED' | 'UNVERIFIED' | 'VERIFIED' | 'VETTED_VERIFIED'; is_inherited?: boolean; status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'; submitted_at?: string; submitted_to_tcr?: boolean; tcr_brand_id?: string; universal_ein?: string; updated_at?: string; }; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseOfProfileDetail = await client.profiles.retrieve('profileId');\n\nconsole.log(apiResponseOfProfileDetail);\n```",
  },
  {
    name: 'update',
    endpoint: '/v3/profiles/{profileId}',
    httpMethod: 'patch',
    summary: 'Update profile settings',
    description:
      'Updates a profile\'s configuration and settings. Requires admin role in the organization. Only provided fields will be updated (partial update).\n\n## Brand Management\n\nInclude the optional `brand` field to create or update the brand associated with this profile. The brand holds KYC and TCR compliance data (legal business info, contact details, messaging vertical). Once a brand has been submitted to TCR it cannot be modified. Setting `inherit_tcr_brand: true` and providing `brand` in the same request is not allowed.\n\n## Payment Details\n\nWhen `billing_model` is `"profile"` or `"profile_and_organization"` you may include a `payment_details` object containing the card number, expiry (MM/YY), CVC, and billing ZIP code. Payment details are **never stored** on our servers and are forwarded directly to the payment processor. Providing `payment_details` when `billing_model` is `"organization"` is not allowed.',
    stainlessPath: '(resource) profiles > (method) update',
    qualified: 'client.profiles.update',
    params: [
      'profileId: string;',
      'allow_contact_sharing?: boolean;',
      'allow_number_change_during_onboarding?: boolean;',
      'allow_template_sharing?: boolean;',
      'billing_contact?: { email: string; name: string; address?: string; phone?: string; };',
      'billing_model?: string;',
      "brand?: { compliance: { brandRelationship: tcr_brand_relationship; vertical: tcr_vertical; destinationCountries?: destination_country[]; expectedMessagingVolume?: string; isTcrApplication?: boolean; notes?: string; phoneNumberPrefix?: string; primaryUseCase?: string; }; contact: { name: string; businessName?: string; email?: string; phone?: string; phoneCountryCode?: string; role?: string; }; business?: { city?: string; country?: string; countryOfRegistration?: string; entityType?: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'SOLE_PROPRIETOR' | 'GOVERNMENT'; legalName?: string; postalCode?: string; state?: string; street?: string; taxId?: string; taxIdType?: string; url?: string; }; };",
      'description?: string;',
      'icon?: string;',
      'inherit_contacts?: boolean;',
      'inherit_tcr_brand?: boolean;',
      'inherit_tcr_campaign?: boolean;',
      'inherit_templates?: boolean;',
      'name?: string;',
      'payment_details?: { card_number: string; cvc: string; expiry: string; zip_code: string; };',
      'sandbox?: boolean;',
      'sending_phone_number?: string;',
      'sending_phone_number_profile_id?: string;',
      'sending_whatsapp_number_profile_id?: string;',
      'short_name?: string;',
      'whatsapp_phone_number?: string;',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: object; billing_model?: string; brand?: object; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## update\n\n`client.profiles.update(profileId: string, allow_contact_sharing?: boolean, allow_number_change_during_onboarding?: boolean, allow_template_sharing?: boolean, billing_contact?: { email: string; name: string; address?: string; phone?: string; }, billing_model?: string, brand?: { compliance: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_brands_brand_compliance_info; contact: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_brands_brand_contact_info; business?: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_brands_brand_business_info; }, description?: string, icon?: string, inherit_contacts?: boolean, inherit_tcr_brand?: boolean, inherit_tcr_campaign?: boolean, inherit_templates?: boolean, name?: string, payment_details?: { card_number: string; cvc: string; expiry: string; zip_code: string; }, sandbox?: boolean, sending_phone_number?: string, sending_phone_number_profile_id?: string, sending_whatsapp_number_profile_id?: string, short_name?: string, whatsapp_phone_number?: string, Idempotency-Key?: string, x-profile-id?: string): { data?: profile_detail; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**patch** `/v3/profiles/{profileId}`\n\nUpdates a profile's configuration and settings. Requires admin role in the organization. Only provided fields will be updated (partial update).\n\n## Brand Management\n\nInclude the optional `brand` field to create or update the brand associated with this profile. The brand holds KYC and TCR compliance data (legal business info, contact details, messaging vertical). Once a brand has been submitted to TCR it cannot be modified. Setting `inherit_tcr_brand: true` and providing `brand` in the same request is not allowed.\n\n## Payment Details\n\nWhen `billing_model` is `\"profile\"` or `\"profile_and_organization\"` you may include a `payment_details` object containing the card number, expiry (MM/YY), CVC, and billing ZIP code. Payment details are **never stored** on our servers and are forwarded directly to the payment processor. Providing `payment_details` when `billing_model` is `\"organization\"` is not allowed.\n\n### Parameters\n\n- `profileId: string`\n\n- `allow_contact_sharing?: boolean`\n  Whether contacts are shared across profiles (optional)\n\n- `allow_number_change_during_onboarding?: boolean`\n  Whether number changes are allowed during onboarding (optional)\n\n- `allow_template_sharing?: boolean`\n  Whether templates are shared across profiles (optional)\n\n- `billing_contact?: { email: string; name: string; address?: string; phone?: string; }`\n  Billing contact information for a profile.\nRequired when billing_model is \"profile\" or \"profile_and_organization\".\n  - `email: string`\n    Email address where invoices will be sent (required)\n  - `name: string`\n    Full name of the billing contact or company (required)\n  - `address?: string`\n    Billing address (optional). Free-form text including street, city, state, postal code, and country.\n  - `phone?: string`\n    Phone number for the billing contact (optional)\n\n- `billing_model?: string`\n  Billing model: profile, organization, or profile_and_organization (optional).\n- \"organization\": the organization's billing details are used; no profile-level billing info needed.\n- \"profile\": the profile is billed independently; billing_contact is required.\n- \"profile_and_organization\": the profile is billed first with the organization as fallback; billing_contact is required.\n\n- `brand?: { compliance: { brandRelationship: tcr_brand_relationship; vertical: tcr_vertical; destinationCountries?: destination_country[]; expectedMessagingVolume?: string; isTcrApplication?: boolean; notes?: string; phoneNumberPrefix?: string; primaryUseCase?: string; }; contact: { name: string; businessName?: string; email?: string; phone?: string; phoneCountryCode?: string; role?: string; }; business?: { city?: string; country?: string; countryOfRegistration?: string; entityType?: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'SOLE_PROPRIETOR' | 'GOVERNMENT'; legalName?: string; postalCode?: string; state?: string; street?: string; taxId?: string; taxIdType?: string; url?: string; }; }`\n  Brand and KYC data grouped into contact, business, and compliance sections\n  - `compliance: { brandRelationship: 'BASIC_ACCOUNT' | 'MEDIUM_ACCOUNT' | 'LARGE_ACCOUNT' | 'SMALL_ACCOUNT' | 'KEY_ACCOUNT'; vertical: string; destinationCountries?: { id?: string; isMain?: boolean; }[]; expectedMessagingVolume?: string; isTcrApplication?: boolean; notes?: string; phoneNumberPrefix?: string; primaryUseCase?: string; }`\n    Compliance and TCR information for brand registration\n  - `contact: { name: string; businessName?: string; email?: string; phone?: string; phoneCountryCode?: string; role?: string; }`\n    Contact information for brand KYC\n  - `business?: { city?: string; country?: string; countryOfRegistration?: string; entityType?: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'SOLE_PROPRIETOR' | 'GOVERNMENT'; legalName?: string; postalCode?: string; state?: string; street?: string; taxId?: string; taxIdType?: string; url?: string; }`\n    Business details and address for brand KYC\n\n- `description?: string`\n  Profile description (optional)\n\n- `icon?: string`\n  Profile icon URL (optional)\n\n- `inherit_contacts?: boolean`\n  Whether this profile inherits contacts from organization (optional)\n\n- `inherit_tcr_brand?: boolean`\n  Whether this profile inherits TCR brand from organization (optional)\n\n- `inherit_tcr_campaign?: boolean`\n  Whether this profile inherits TCR campaign from organization (optional)\n\n- `inherit_templates?: boolean`\n  Whether this profile inherits templates from organization (optional)\n\n- `name?: string`\n  Profile name (optional)\n\n- `payment_details?: { card_number: string; cvc: string; expiry: string; zip_code: string; }`\n  Payment card details for a profile.\nAccepted when billing_model is \"profile\" or \"profile_and_organization\".\nThese details are not stored on our servers and will be forwarded to the payment processor.\n  - `card_number: string`\n    Card number (digits only, 13–19 characters)\n  - `cvc: string`\n    Card security code (3–4 digits)\n  - `expiry: string`\n    Card expiry date in MM/YY format (e.g. \"09/27\")\n  - `zip_code: string`\n    Billing ZIP / postal code associated with the card\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `sending_phone_number?: string`\n  Direct phone number for SMS sending (optional)\n\n- `sending_phone_number_profile_id?: string`\n  Reference to another profile to use for SMS/Telnyx configuration (optional)\n\n- `sending_whatsapp_number_profile_id?: string`\n  Reference to another profile to use for WhatsApp configuration (optional)\n\n- `short_name?: string`\n  Profile short name/abbreviation (optional). Must be 3–11 characters, contain only letters, numbers,\nand spaces, and include at least one letter. Example: \"SALES\", \"Mkt 2\", \"Support1\".\n\n- `whatsapp_phone_number?: string`\n  Direct phone number for WhatsApp sending (optional)\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: object; billing_model?: string; brand?: object; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: { address?: string; email?: string; name?: string; phone?: string; }; billing_model?: string; brand?: { id?: string; business?: { city?: string; country?: string; country_of_registration?: string; entity_type?: string; legal_name?: string; postal_code?: string; state?: string; street?: string; tax_id?: string; tax_id_type?: string; url?: string; }; compliance?: { brand_relationship?: tcr_brand_relationship; destination_countries?: destination_country[]; expected_messaging_volume?: string; is_tcr_application?: boolean; notes?: string; phone_number_prefix?: string; primary_use_case?: string; vertical?: tcr_vertical; }; contact?: { business_name?: string; email?: string; name?: string; phone?: string; phone_country_code?: string; role?: string; }; created_at?: string; csp_id?: string; identity_status?: 'SELF_DECLARED' | 'UNVERIFIED' | 'VERIFIED' | 'VETTED_VERIFIED'; is_inherited?: boolean; status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'; submitted_at?: string; submitted_to_tcr?: boolean; tcr_brand_id?: string; universal_ein?: string; updated_at?: string; }; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseOfProfileDetail = await client.profiles.update('profileId');\n\nconsole.log(apiResponseOfProfileDetail);\n```",
  },
  {
    name: 'list',
    endpoint: '/v3/profiles',
    httpMethod: 'get',
    summary: 'List profiles in organization',
    description:
      'Retrieves all sender profiles within an organization, including brand information for each profile. Profiles represent different brands, departments, or use cases within an organization, each with their own messaging configuration.',
    stainlessPath: '(resource) profiles > (method) list',
    qualified: 'client.profiles.list',
    params: ['x-profile-id?: string;'],
    response:
      '{ data?: { profiles?: object[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## list\n\n`client.profiles.list(x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/profiles`\n\nRetrieves all sender profiles within an organization, including brand information for each profile. Profiles represent different brands, departments, or use cases within an organization, each with their own messaging configuration.\n\n### Parameters\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { profiles?: object[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { profiles?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: { address?: string; email?: string; name?: string; phone?: string; }; billing_model?: string; brand?: { id?: string; business?: object; compliance?: object; contact?: object; created_at?: string; csp_id?: string; identity_status?: 'SELF_DECLARED' | 'UNVERIFIED' | 'VERIFIED' | 'VETTED_VERIFIED'; is_inherited?: boolean; status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'; submitted_at?: string; submitted_to_tcr?: boolean; tcr_brand_id?: string; universal_ein?: string; updated_at?: string; }; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst profiles = await client.profiles.list();\n\nconsole.log(profiles);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v3/profiles/{profileId}',
    httpMethod: 'delete',
    summary: 'Delete a profile',
    description:
      'Soft deletes a sender profile. The profile will be marked as deleted but data is retained. Requires admin role in the organization.',
    stainlessPath: '(resource) profiles > (method) delete',
    qualified: 'client.profiles.delete',
    params: ['profileId: string;', 'body: { sandbox?: boolean; };', 'x-profile-id?: string;'],
    markdown:
      "## delete\n\n`client.profiles.delete(profileId: string, body: { sandbox?: boolean; }, x-profile-id?: string): void`\n\n**delete** `/v3/profiles/{profileId}`\n\nSoft deletes a sender profile. The profile will be marked as deleted but data is retained. Requires admin role in the organization.\n\n### Parameters\n\n- `profileId: string`\n\n- `body: { sandbox?: boolean; }`\n  Request to delete a profile\n\n- `x-profile-id?: string`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nawait client.profiles.delete('profileId', { body: {} })\n```",
  },
  {
    name: 'complete',
    endpoint: '/v3/profiles/{profileId}/complete',
    httpMethod: 'post',
    summary: 'Complete profile setup',
    description:
      'Final step in profile compliance workflow. Validates all prerequisites (general data, brand, campaigns), connects profile to Telnyx/WhatsApp, and sets status based on configuration. The process runs in the background and calls the provided webhook URL when finished.\n\n                Prerequisites:\n                - Profile must be completed\n                - If inheritTcrBrand=false: Profile must have existing brand\n                - If inheritTcrBrand=true: Parent must have existing brand\n                - If TCR application: Must have at least one campaign (own or inherited)\n                - If inheritTcrCampaign=false: Profile should have campaigns\n                - If inheritTcrCampaign=true: Parent must have campaigns\n\n                Status Logic:\n                - If both SMS and WhatsApp channels are missing → SUBMITTED\n                - If TCR application and not inheriting brand/campaigns → SUBMITTED\n                - If non-TCR with destination country (IsMain=true) → SUBMITTED\n                - Otherwise → COMPLETED',
    stainlessPath: '(resource) profiles > (method) complete',
    qualified: 'client.profiles.complete',
    params: [
      'profileId: string;',
      'webHookUrl: string;',
      'sandbox?: boolean;',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response: 'object',
    markdown:
      "## complete\n\n`client.profiles.complete(profileId: string, webHookUrl: string, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): object`\n\n**post** `/v3/profiles/{profileId}/complete`\n\nFinal step in profile compliance workflow. Validates all prerequisites (general data, brand, campaigns), connects profile to Telnyx/WhatsApp, and sets status based on configuration. The process runs in the background and calls the provided webhook URL when finished.\n\n                Prerequisites:\n                - Profile must be completed\n                - If inheritTcrBrand=false: Profile must have existing brand\n                - If inheritTcrBrand=true: Parent must have existing brand\n                - If TCR application: Must have at least one campaign (own or inherited)\n                - If inheritTcrCampaign=false: Profile should have campaigns\n                - If inheritTcrCampaign=true: Parent must have campaigns\n\n                Status Logic:\n                - If both SMS and WhatsApp channels are missing → SUBMITTED\n                - If TCR application and not inheriting brand/campaigns → SUBMITTED\n                - If non-TCR with destination country (IsMain=true) → SUBMITTED\n                - Otherwise → COMPLETED\n\n### Parameters\n\n- `profileId: string`\n\n- `webHookUrl: string`\n  Webhook URL to call when profile completion finishes (success or failure)\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst response = await client.profiles.complete('660e8400-e29b-41d4-a716-446655440000', { webHookUrl: 'https://your-app.com/webhook/profile-complete' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/v3/profiles/{profileId}/campaigns',
    httpMethod: 'post',
    summary: "Create a campaign for a profile's brand",
    description:
      'Creates a new campaign scoped under the brand of the specified profile. Each campaign must include at least one use case with sample messages.',
    stainlessPath: '(resource) profiles.campaigns > (method) create',
    qualified: 'client.profiles.campaigns.create',
    params: [
      'profileId: string;',
      'campaign: { description: string; name: string; type: string; useCases: { messagingUseCaseUs: messaging_use_case_us; sampleMessages: string[]; }[]; helpKeywords?: string; helpMessage?: string; messageFlow?: string; optinKeywords?: string; optinMessage?: string; optoutKeywords?: string; optoutMessage?: string; privacyPolicyLink?: string; termsAndConditionsLink?: string; };',
      'sandbox?: boolean;',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: object; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## create\n\n`client.profiles.campaigns.create(profileId: string, campaign: { description: string; name: string; type: string; useCases: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_campaigns_campaign_use_case_data[]; helpKeywords?: string; helpMessage?: string; messageFlow?: string; optinKeywords?: string; optinMessage?: string; optoutKeywords?: string; optoutMessage?: string; privacyPolicyLink?: string; termsAndConditionsLink?: string; }, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: tcr_campaign_with_use_cases; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/profiles/{profileId}/campaigns`\n\nCreates a new campaign scoped under the brand of the specified profile. Each campaign must include at least one use case with sample messages.\n\n### Parameters\n\n- `profileId: string`\n\n- `campaign: { description: string; name: string; type: string; useCases: { messagingUseCaseUs: messaging_use_case_us; sampleMessages: string[]; }[]; helpKeywords?: string; helpMessage?: string; messageFlow?: string; optinKeywords?: string; optinMessage?: string; optoutKeywords?: string; optoutMessage?: string; privacyPolicyLink?: string; termsAndConditionsLink?: string; }`\n  Campaign data for create or update operation\n  - `description: string`\n    Campaign description\n  - `name: string`\n    Campaign name\n  - `type: string`\n    Campaign type (e.g., \"KYC\", \"App\")\n  - `useCases: { messagingUseCaseUs: string; sampleMessages: string[]; }[]`\n    List of use cases with sample messages\n  - `helpKeywords?: string`\n    Comma-separated keywords that trigger help message (e.g., \"HELP, INFO, SUPPORT\")\n  - `helpMessage?: string`\n    Message sent when user requests help\n  - `messageFlow?: string`\n    Description of how messages flow in the campaign\n  - `optinKeywords?: string`\n    Comma-separated keywords that trigger opt-in (e.g., \"YES, START, SUBSCRIBE\")\n  - `optinMessage?: string`\n    Message sent when user opts in\n  - `optoutKeywords?: string`\n    Comma-separated keywords that trigger opt-out (e.g., \"STOP, UNSUBSCRIBE, END\")\n  - `optoutMessage?: string`\n    Message sent when user opts out\n  - `privacyPolicyLink?: string`\n    URL to privacy policy\n  - `termsAndConditionsLink?: string`\n    URL to terms and conditions\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: object; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; createdAt?: string; updatedAt?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseOfTcrCampaignWithUseCases = await client.profiles.campaigns.create('770e8400-e29b-41d4-a716-446655440002', { campaign: {\n  description: 'Appointment reminders and account notifications',\n  name: 'Customer Notifications',\n  type: 'App',\n  useCases: [{ messagingUseCaseUs: 'ACCOUNT_NOTIFICATION', sampleMessages: ['Hi {name}, your appointment is confirmed for {date} at {time}.', 'Your order #{order_id} has been shipped. Track at {url}'] }],\n} });\n\nconsole.log(apiResponseOfTcrCampaignWithUseCases);\n```",
  },
  {
    name: 'update',
    endpoint: '/v3/profiles/{profileId}/campaigns/{campaignId}',
    httpMethod: 'put',
    summary: 'Update a campaign',
    description:
      'Updates an existing campaign under the brand of the specified profile. Cannot update campaigns that have already been submitted to TCR.',
    stainlessPath: '(resource) profiles.campaigns > (method) update',
    qualified: 'client.profiles.campaigns.update',
    params: [
      'profileId: string;',
      'campaignId: string;',
      'campaign: { description: string; name: string; type: string; useCases: { messagingUseCaseUs: messaging_use_case_us; sampleMessages: string[]; }[]; helpKeywords?: string; helpMessage?: string; messageFlow?: string; optinKeywords?: string; optinMessage?: string; optoutKeywords?: string; optoutMessage?: string; privacyPolicyLink?: string; termsAndConditionsLink?: string; };',
      'sandbox?: boolean;',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: object; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## update\n\n`client.profiles.campaigns.update(profileId: string, campaignId: string, campaign: { description: string; name: string; type: string; useCases: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_campaigns_campaign_use_case_data[]; helpKeywords?: string; helpMessage?: string; messageFlow?: string; optinKeywords?: string; optinMessage?: string; optoutKeywords?: string; optoutMessage?: string; privacyPolicyLink?: string; termsAndConditionsLink?: string; }, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: tcr_campaign_with_use_cases; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**put** `/v3/profiles/{profileId}/campaigns/{campaignId}`\n\nUpdates an existing campaign under the brand of the specified profile. Cannot update campaigns that have already been submitted to TCR.\n\n### Parameters\n\n- `profileId: string`\n\n- `campaignId: string`\n\n- `campaign: { description: string; name: string; type: string; useCases: { messagingUseCaseUs: messaging_use_case_us; sampleMessages: string[]; }[]; helpKeywords?: string; helpMessage?: string; messageFlow?: string; optinKeywords?: string; optinMessage?: string; optoutKeywords?: string; optoutMessage?: string; privacyPolicyLink?: string; termsAndConditionsLink?: string; }`\n  Campaign data for create or update operation\n  - `description: string`\n    Campaign description\n  - `name: string`\n    Campaign name\n  - `type: string`\n    Campaign type (e.g., \"KYC\", \"App\")\n  - `useCases: { messagingUseCaseUs: string; sampleMessages: string[]; }[]`\n    List of use cases with sample messages\n  - `helpKeywords?: string`\n    Comma-separated keywords that trigger help message (e.g., \"HELP, INFO, SUPPORT\")\n  - `helpMessage?: string`\n    Message sent when user requests help\n  - `messageFlow?: string`\n    Description of how messages flow in the campaign\n  - `optinKeywords?: string`\n    Comma-separated keywords that trigger opt-in (e.g., \"YES, START, SUBSCRIBE\")\n  - `optinMessage?: string`\n    Message sent when user opts in\n  - `optoutKeywords?: string`\n    Comma-separated keywords that trigger opt-out (e.g., \"STOP, UNSUBSCRIBE, END\")\n  - `optoutMessage?: string`\n    Message sent when user opts out\n  - `privacyPolicyLink?: string`\n    URL to privacy policy\n  - `termsAndConditionsLink?: string`\n    URL to terms and conditions\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: object; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; createdAt?: string; updatedAt?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseOfTcrCampaignWithUseCases = await client.profiles.campaigns.update('b2c3d4e5-f6a7-8901-bcde-f12345678901', {\n  profileId: '770e8400-e29b-41d4-a716-446655440002',\n  campaign: {\n  description: 'Updated appointment reminders and account notifications',\n  name: 'Customer Notifications Updated',\n  type: 'App',\n  useCases: [{ messagingUseCaseUs: 'ACCOUNT_NOTIFICATION', sampleMessages: ['Hi {name}, your appointment is confirmed for {date} at {time}.', 'Your order #{order_id} has been shipped. Track at {url}'] }],\n},\n});\n\nconsole.log(apiResponseOfTcrCampaignWithUseCases);\n```",
  },
  {
    name: 'list',
    endpoint: '/v3/profiles/{profileId}/campaigns',
    httpMethod: 'get',
    summary: "Get campaigns for a profile's brand",
    description:
      "Retrieves all campaigns linked to the profile's brand, including use cases and sample messages. Returns inherited campaigns if inherit_tcr_campaign=true.",
    stainlessPath: '(resource) profiles.campaigns > (method) list',
    qualified: 'client.profiles.campaigns.list',
    params: ['profileId: string;', 'x-profile-id?: string;'],
    response:
      '{ data?: object[]; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## list\n\n`client.profiles.campaigns.list(profileId: string, x-profile-id?: string): { data?: tcr_campaign_with_use_cases[]; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/profiles/{profileId}/campaigns`\n\nRetrieves all campaigns linked to the profile's brand, including use cases and sample messages. Returns inherited campaigns if inherit_tcr_campaign=true.\n\n### Parameters\n\n- `profileId: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: object[]; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; createdAt?: string; updatedAt?: string; }[]`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst campaigns = await client.profiles.campaigns.list('770e8400-e29b-41d4-a716-446655440002');\n\nconsole.log(campaigns);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v3/profiles/{profileId}/campaigns/{campaignId}',
    httpMethod: 'delete',
    summary: 'Delete a campaign',
    description:
      'Deletes a campaign by ID from the brand of the specified profile. The profile must belong to the authenticated organization.',
    stainlessPath: '(resource) profiles.campaigns > (method) delete',
    qualified: 'client.profiles.campaigns.delete',
    params: [
      'profileId: string;',
      'campaignId: string;',
      'body: { sandbox?: boolean; };',
      'x-profile-id?: string;',
    ],
    markdown:
      "## delete\n\n`client.profiles.campaigns.delete(profileId: string, campaignId: string, body: { sandbox?: boolean; }, x-profile-id?: string): void`\n\n**delete** `/v3/profiles/{profileId}/campaigns/{campaignId}`\n\nDeletes a campaign by ID from the brand of the specified profile. The profile must belong to the authenticated organization.\n\n### Parameters\n\n- `profileId: string`\n\n- `campaignId: string`\n\n- `body: { sandbox?: boolean; }`\n  Request to delete a campaign from a brand\n\n- `x-profile-id?: string`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nawait client.profiles.campaigns.delete('b2c3d4e5-f6a7-8901-bcde-f12345678901', {\n  profileId: '770e8400-e29b-41d4-a716-446655440002',\n  body: {},\n})\n```",
  },
  {
    name: 'lookup',
    endpoint: '/v3/numbers/lookup/{phoneNumber}',
    httpMethod: 'get',
    summary: 'Get phone number details',
    description:
      "Retrieves detailed information about a phone number including carrier, line type, porting status, and VoIP detection. Uses the customer's messaging provider for rich data, with fallback to the internal index.",
    stainlessPath: '(resource) numbers > (method) lookup',
    qualified: 'client.numbers.lookup',
    params: ['phoneNumber: string;', 'x-profile-id?: string;'],
    response:
      '{ data?: { carrier_name?: string; country_code?: string; is_ported?: boolean; is_valid?: boolean; is_voip?: boolean; line_type?: string; mobile_country_code?: string; mobile_network_code?: string; phone_number?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## lookup\n\n`client.numbers.lookup(phoneNumber: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/numbers/lookup/{phoneNumber}`\n\nRetrieves detailed information about a phone number including carrier, line type, porting status, and VoIP detection. Uses the customer's messaging provider for rich data, with fallback to the internal index.\n\n### Parameters\n\n- `phoneNumber: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { carrier_name?: string; country_code?: string; is_ported?: boolean; is_valid?: boolean; is_voip?: boolean; line_type?: string; mobile_country_code?: string; mobile_network_code?: string; phone_number?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { carrier_name?: string; country_code?: string; is_ported?: boolean; is_valid?: boolean; is_voip?: boolean; line_type?: string; mobile_country_code?: string; mobile_network_code?: string; phone_number?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst response = await client.numbers.lookup('+12025551234');\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve_activities',
    endpoint: '/v3/messages/{id}/activities',
    httpMethod: 'get',
    summary: 'Get message activities',
    description:
      'Retrieves the activity log for a specific message. Activities track the message lifecycle including acceptance, processing, sending, delivery, and any errors.',
    stainlessPath: '(resource) messages > (method) retrieve_activities',
    qualified: 'client.messages.retrieveActivities',
    params: ['id: string;', 'x-profile-id?: string;'],
    response:
      '{ data?: { activities?: { active_contact_price?: string; description?: string; price?: string; status?: string; timestamp?: string; }[]; message_id?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## retrieve_activities\n\n`client.messages.retrieveActivities(id: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/messages/{id}/activities`\n\nRetrieves the activity log for a specific message. Activities track the message lifecycle including acceptance, processing, sending, delivery, and any errors.\n\n### Parameters\n\n- `id: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { activities?: { active_contact_price?: string; description?: string; price?: string; status?: string; timestamp?: string; }[]; message_id?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { activities?: { active_contact_price?: string; description?: string; price?: string; status?: string; timestamp?: string; }[]; message_id?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst response = await client.messages.retrieveActivities('8ba7b830-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve_status',
    endpoint: '/v3/messages/{id}',
    httpMethod: 'get',
    summary: 'Get message status',
    description:
      'Retrieves the current status and details of a message by ID. Includes delivery status, timestamps, and error information if applicable.',
    stainlessPath: '(resource) messages > (method) retrieve_status',
    qualified: 'client.messages.retrieveStatus',
    params: ['id: string;', 'x-profile-id?: string;'],
    response:
      '{ data?: { id?: string; active_contact_price?: number; channel?: string; contact_id?: string; created_at?: string; customer_id?: string; events?: { description?: string; status?: string; timestamp?: string; }[]; message_body?: { buttons?: object[]; content?: string; footer?: string; header?: string; }; phone?: string; phone_international?: string; price?: number; region_code?: string; status?: string; template_category?: string; template_id?: string; template_name?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## retrieve_status\n\n`client.messages.retrieveStatus(id: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/messages/{id}`\n\nRetrieves the current status and details of a message by ID. Includes delivery status, timestamps, and error information if applicable.\n\n### Parameters\n\n- `id: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; active_contact_price?: number; channel?: string; contact_id?: string; created_at?: string; customer_id?: string; events?: { description?: string; status?: string; timestamp?: string; }[]; message_body?: { buttons?: object[]; content?: string; footer?: string; header?: string; }; phone?: string; phone_international?: string; price?: number; region_code?: string; status?: string; template_category?: string; template_id?: string; template_name?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; active_contact_price?: number; channel?: string; contact_id?: string; created_at?: string; customer_id?: string; events?: { description?: string; status?: string; timestamp?: string; }[]; message_body?: { buttons?: { type?: string; value?: string; }[]; content?: string; footer?: string; header?: string; }; phone?: string; phone_international?: string; price?: number; region_code?: string; status?: string; template_category?: string; template_id?: string; template_name?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst response = await client.messages.retrieveStatus('8ba7b830-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(response);\n```",
  },
  {
    name: 'send',
    endpoint: '/v3/messages',
    httpMethod: 'post',
    summary: 'Send a message',
    description:
      'Sends a message to one or more recipients using a template. Supports multi-channel broadcast — when multiple channels are specified (e.g. ["sms", "whatsapp"]), a separate message is created for each (recipient, channel) pair. Returns immediately with per-recipient message IDs for async tracking via webhooks or the GET /messages/{id} endpoint.',
    stainlessPath: '(resource) messages > (method) send',
    qualified: 'client.messages.send',
    params: [
      'channel?: string[];',
      'sandbox?: boolean;',
      'template?: { id?: string; name?: string; parameters?: object; };',
      'to?: string[];',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { recipients?: { body?: string; channel?: string; message_id?: string; to?: string; }[]; status?: string; template_id?: string; template_name?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      '## send\n\n`client.messages.send(channel?: string[], sandbox?: boolean, template?: { id?: string; name?: string; parameters?: object; }, to?: string[], Idempotency-Key?: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/messages`\n\nSends a message to one or more recipients using a template. Supports multi-channel broadcast — when multiple channels are specified (e.g. ["sms", "whatsapp"]), a separate message is created for each (recipient, channel) pair. Returns immediately with per-recipient message IDs for async tracking via webhooks or the GET /messages/{id} endpoint.\n\n### Parameters\n\n- `channel?: string[]`\n  Channels to broadcast on, e.g. ["whatsapp", "sms"].\nEach channel produces a separate message per recipient.\n"sent" = auto-detect, "rcs" = reserved (skipped).\nDefaults to ["sent"] (auto-detect) if omitted.\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `template?: { id?: string; name?: string; parameters?: object; }`\n  SDK-style template reference: resolve by ID or by name, with optional parameters.\n  - `id?: string`\n    Template ID (mutually exclusive with name)\n  - `name?: string`\n    Template name (mutually exclusive with id)\n  - `parameters?: object`\n    Template variable parameters for personalization\n\n- `to?: string[]`\n  List of recipient phone numbers in E.164 format (multi-recipient fan-out)\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { recipients?: { body?: string; channel?: string; message_id?: string; to?: string; }[]; status?: string; template_id?: string; template_name?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { recipients?: { body?: string; channel?: string; message_id?: string; to?: string; }[]; status?: string; template_id?: string; template_name?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from \'@sentdm/sentdm\';\n\nconst client = new SentDm();\n\nconst response = await client.messages.send();\n\nconsole.log(response);\n```',
  },
  {
    name: 'create',
    endpoint: '/v3/contacts',
    httpMethod: 'post',
    summary: 'Create a contact',
    description: 'Creates a new contact by phone number and associates it with the authenticated customer.',
    stainlessPath: '(resource) contacts > (method) create',
    qualified: 'client.contacts.create',
    params: [
      'phone_number?: string;',
      'sandbox?: boolean;',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## create\n\n`client.contacts.create(phone_number?: string, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: contact_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/contacts`\n\nCreates a new contact by phone number and associates it with the authenticated customer.\n\n### Parameters\n\n- `phone_number?: string`\n  Phone number of the contact to create\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseOfContact = await client.contacts.create();\n\nconsole.log(apiResponseOfContact);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v3/contacts/{id}',
    httpMethod: 'get',
    summary: 'Get contact by ID',
    description:
      'Retrieves a specific contact by their unique identifier. Returns detailed contact information including phone formats, available channels, and opt-out status.',
    stainlessPath: '(resource) contacts > (method) retrieve',
    qualified: 'client.contacts.retrieve',
    params: ['id: string;', 'x-profile-id?: string;'],
    response:
      '{ data?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## retrieve\n\n`client.contacts.retrieve(id: string, x-profile-id?: string): { data?: contact_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/contacts/{id}`\n\nRetrieves a specific contact by their unique identifier. Returns detailed contact information including phone formats, available channels, and opt-out status.\n\n### Parameters\n\n- `id: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseOfContact = await client.contacts.retrieve('6ba7b810-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(apiResponseOfContact);\n```",
  },
  {
    name: 'update',
    endpoint: '/v3/contacts/{id}',
    httpMethod: 'patch',
    summary: 'Update a contact',
    description:
      "Updates a contact's default channel and/or opt-out status. Inherited contacts cannot be updated.",
    stainlessPath: '(resource) contacts > (method) update',
    qualified: 'client.contacts.update',
    params: [
      'id: string;',
      'default_channel?: string;',
      'opt_out?: boolean;',
      'sandbox?: boolean;',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## update\n\n`client.contacts.update(id: string, default_channel?: string, opt_out?: boolean, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: contact_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**patch** `/v3/contacts/{id}`\n\nUpdates a contact's default channel and/or opt-out status. Inherited contacts cannot be updated.\n\n### Parameters\n\n- `id: string`\n\n- `default_channel?: string`\n  Default messaging channel: \"sms\" or \"whatsapp\"\n\n- `opt_out?: boolean`\n  Whether the contact has opted out of messaging\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst apiResponseOfContact = await client.contacts.update('6ba7b810-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(apiResponseOfContact);\n```",
  },
  {
    name: 'list',
    endpoint: '/v3/contacts',
    httpMethod: 'get',
    summary: 'Get contacts list',
    description:
      'Retrieves a paginated list of contacts for the authenticated customer. Supports filtering by search term, channel, or phone number.',
    stainlessPath: '(resource) contacts > (method) list',
    qualified: 'client.contacts.list',
    params: [
      'page: number;',
      'page_size: number;',
      'channel?: string;',
      'phone?: string;',
      'search?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { contacts?: object[]; pagination?: object; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## list\n\n`client.contacts.list(page: number, page_size: number, channel?: string, phone?: string, search?: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/contacts`\n\nRetrieves a paginated list of contacts for the authenticated customer. Supports filtering by search term, channel, or phone number.\n\n### Parameters\n\n- `page: number`\n  Page number (1-indexed)\n\n- `page_size: number`\n  Number of items per page\n\n- `channel?: string`\n  Optional channel filter (sms, whatsapp)\n\n- `phone?: string`\n  Optional phone number filter (alternative to list view)\n\n- `search?: string`\n  Optional search term for filtering contacts\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { contacts?: object[]; pagination?: object; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { contacts?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }[]; pagination?: { cursors?: { after?: string; before?: string; }; has_more?: boolean; page?: number; page_size?: number; total_count?: number; total_pages?: number; }; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst contacts = await client.contacts.list({ page: 0, page_size: 0 });\n\nconsole.log(contacts);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v3/contacts/{id}',
    httpMethod: 'delete',
    summary: 'Delete a contact',
    description:
      'Dissociates a contact from the authenticated customer. Inherited contacts cannot be deleted.',
    stainlessPath: '(resource) contacts > (method) delete',
    qualified: 'client.contacts.delete',
    params: ['id: string;', 'body: { sandbox?: boolean; };', 'x-profile-id?: string;'],
    markdown:
      "## delete\n\n`client.contacts.delete(id: string, body: { sandbox?: boolean; }, x-profile-id?: string): void`\n\n**delete** `/v3/contacts/{id}`\n\nDissociates a contact from the authenticated customer. Inherited contacts cannot be deleted.\n\n### Parameters\n\n- `id: string`\n\n- `body: { sandbox?: boolean; }`\n  Request to delete/dissociate a contact\n\n- `x-profile-id?: string`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nawait client.contacts.delete('6ba7b810-9dad-11d1-80b4-00c04fd430c8', { body: {} })\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v3/me',
    httpMethod: 'get',
    summary: 'Get authenticated account',
    description:
      "Returns the account associated with the provided API key. The response includes account identity, contact information, messaging channel configuration, and — depending on the account type — either a list of child profiles or the profile's own settings.\n\n**Account types:**\n- `organization` — Has child profiles. The `profiles` array is populated.\n- `user` — Standalone account with no profiles.\n- `profile` — Child of an organization. Includes `organization_id`, `short_name`, `status`, and `settings`.\n\n**Channels:**\nThe `channels` object always includes `sms`, `whatsapp`, and `rcs`. Each channel has a `configured` boolean. Configured channels expose additional details such as `phone_number`.",
    stainlessPath: '(resource) me > (method) retrieve',
    qualified: 'client.me.retrieve',
    params: ['x-profile-id?: string;'],
    response:
      '{ data?: { id?: string; channels?: { rcs?: object; sms?: object; whatsapp?: object; }; created_at?: string; description?: string; email?: string; icon?: string; name?: string; organization_id?: string; profiles?: { id?: string; created_at?: string; description?: string; icon?: string; name?: string; role?: string; settings?: profile_settings; short_name?: string; status?: string; }[]; settings?: object; short_name?: string; status?: string; type?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## retrieve\n\n`client.me.retrieve(x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/me`\n\nReturns the account associated with the provided API key. The response includes account identity, contact information, messaging channel configuration, and — depending on the account type — either a list of child profiles or the profile's own settings.\n\n**Account types:**\n- `organization` — Has child profiles. The `profiles` array is populated.\n- `user` — Standalone account with no profiles.\n- `profile` — Child of an organization. Includes `organization_id`, `short_name`, `status`, and `settings`.\n\n**Channels:**\nThe `channels` object always includes `sms`, `whatsapp`, and `rcs`. Each channel has a `configured` boolean. Configured channels expose additional details such as `phone_number`.\n\n### Parameters\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; channels?: { rcs?: object; sms?: object; whatsapp?: object; }; created_at?: string; description?: string; email?: string; icon?: string; name?: string; organization_id?: string; profiles?: { id?: string; created_at?: string; description?: string; icon?: string; name?: string; role?: string; settings?: profile_settings; short_name?: string; status?: string; }[]; settings?: object; short_name?: string; status?: string; type?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; channels?: { rcs?: { configured?: boolean; phone_number?: string; }; sms?: { configured?: boolean; phone_number?: string; }; whatsapp?: { business_name?: string; configured?: boolean; phone_number?: string; }; }; created_at?: string; description?: string; email?: string; icon?: string; name?: string; organization_id?: string; profiles?: { id?: string; created_at?: string; description?: string; icon?: string; name?: string; role?: string; settings?: { allow_contact_sharing?: boolean; allow_template_sharing?: boolean; billing_model?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; }; short_name?: string; status?: string; }[]; settings?: { allow_contact_sharing?: boolean; allow_template_sharing?: boolean; billing_model?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; }; short_name?: string; status?: string; type?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport SentDm from '@sentdm/sentdm';\n\nconst client = new SentDm();\n\nconst me = await client.me.retrieve();\n\nconsole.log(me);\n```",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
    boost: {
      name: 3,
      endpoint: 2,
      summary: 2,
      qualified: 2,
      content: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  // Note: Language is accepted for interface consistency with remote search, but currently has no
  // effect since this local search only supports TypeScript docs.
  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex.search(query).map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          fullResults.push({
            method: m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          this.indexProse(content, file.name);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}
