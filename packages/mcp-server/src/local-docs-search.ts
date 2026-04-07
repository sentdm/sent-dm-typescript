// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

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
  perLanguage?: Record<string, PerLanguageData>;
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
      "## create\n\n`client.webhooks.create(display_name?: string, endpoint_url?: string, event_types?: string[], retry_count?: number, sandbox?: boolean, timeout_seconds?: number, Idempotency-Key?: string, x-profile-id?: string): { data?: webhook_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/webhooks`\n\nCreates a new webhook endpoint for the authenticated customer.\n\n### Parameters\n\n- `display_name?: string`\n\n- `endpoint_url?: string`\n\n- `event_types?: string[]`\n\n- `retry_count?: number`\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `timeout_seconds?: number`\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseWebhook = await client.webhooks.create();\n\nconsole.log(apiResponseWebhook);\n```",
    perLanguage: {
      csharp: {
        method: 'Webhooks.Create',
        example:
          'WebhookCreateParams parameters = new();\n\nvar apiResponseWebhook = await client.Webhooks.Create(parameters);\n\nConsole.WriteLine(apiResponseWebhook);',
      },
      go: {
        method: 'client.Webhooks.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseWebhook, err := client.Webhooks.New(context.TODO(), sentdm.WebhookNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseWebhook.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/webhooks \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "display_name": "Order Notifications",\n          "endpoint_url": "https://example.com/webhooks/orders",\n          "event_types": [\n            "messages",\n            "templates"\n          ],\n          "retry_count": 3,\n          "timeout_seconds": 30\n        }\'',
      },
      java: {
        method: 'webhooks().create',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.webhooks.ApiResponseWebhook;\nimport dm.sent.models.webhooks.WebhookCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseWebhook apiResponseWebhook = client.webhooks().create();\n    }\n}',
      },
      php: {
        method: 'webhooks->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseWebhook = $client->webhooks->create(\n  displayName: 'Order Notifications',\n  endpointURL: 'https://example.com/webhooks/orders',\n  eventTypes: ['messages', 'templates'],\n  retryCount: 3,\n  sandbox: false,\n  timeoutSeconds: 30,\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseWebhook);",
      },
      python: {
        method: 'webhooks.create',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_webhook = client.webhooks.create()\nprint(api_response_webhook.data)',
      },
      ruby: {
        method: 'webhooks.create',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_webhook = sent.webhooks.create\n\nputs(api_response_webhook)',
      },
      typescript: {
        method: 'client.webhooks.create',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseWebhook = await client.webhooks.create();\n\nconsole.log(apiResponseWebhook.data);",
      },
    },
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
      "## list\n\n`client.webhooks.list(page: number, page_size: number, is_active?: boolean, search?: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/webhooks`\n\nRetrieves a paginated list of webhooks for the authenticated customer.\n\n### Parameters\n\n- `page: number`\n\n- `page_size: number`\n\n- `is_active?: boolean`\n\n- `search?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { pagination?: object; webhooks?: object[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { pagination?: { cursors?: { after?: string; before?: string; }; has_more?: boolean; page?: number; page_size?: number; total_count?: number; total_pages?: number; }; webhooks?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst webhooks = await client.webhooks.list({ page: 0, page_size: 0 });\n\nconsole.log(webhooks);\n```",
    perLanguage: {
      csharp: {
        method: 'Webhooks.List',
        example:
          'WebhookListParams parameters = new()\n{\n    Page = 0,\n    PageSize = 0,\n};\n\nvar webhooks = await client.Webhooks.List(parameters);\n\nConsole.WriteLine(webhooks);',
      },
      go: {
        method: 'client.Webhooks.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhooks, err := client.Webhooks.List(context.TODO(), sentdm.WebhookListParams{\n\t\tPage:     0,\n\t\tPageSize: 0,\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhooks.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.sent.dm/v3/webhooks \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'webhooks().list',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.webhooks.WebhookListParams;\nimport dm.sent.models.webhooks.WebhookListResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        WebhookListParams params = WebhookListParams.builder()\n            .page(0)\n            .pageSize(0)\n            .build();\n        WebhookListResponse webhooks = client.webhooks().list(params);\n    }\n}',
      },
      php: {
        method: 'webhooks->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$webhooks = $client->webhooks->list(\n  page: 0,\n  pageSize: 0,\n  isActive: true,\n  search: 'search',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($webhooks);",
      },
      python: {
        method: 'webhooks.list',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nwebhooks = client.webhooks.list(\n    page=0,\n    page_size=0,\n)\nprint(webhooks.data)',
      },
      ruby: {
        method: 'webhooks.list',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nwebhooks = sent.webhooks.list(page: 0, page_size: 0)\n\nputs(webhooks)',
      },
      typescript: {
        method: 'client.webhooks.list',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhooks = await client.webhooks.list({ page: 0, page_size: 0 });\n\nconsole.log(webhooks.data);",
      },
    },
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
      "## delete\n\n`client.webhooks.delete(id: string, x-profile-id?: string): void`\n\n**delete** `/v3/webhooks/{id}`\n\nDeletes a webhook for the authenticated customer.\n\n### Parameters\n\n- `id: string`\n\n- `x-profile-id?: string`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nawait client.webhooks.delete('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8')\n```",
    perLanguage: {
      csharp: {
        method: 'Webhooks.Delete',
        example:
          'WebhookDeleteParams parameters = new()\n{\n    ID = "d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8"\n};\n\nawait client.Webhooks.Delete(parameters);',
      },
      go: {
        method: 'client.Webhooks.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Webhooks.Delete(\n\t\tcontext.TODO(),\n\t\t"d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n\t\tsentdm.WebhookDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/webhooks/$ID \\\n    -X DELETE \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'webhooks().delete',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.webhooks.WebhookDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        client.webhooks().delete("d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8");\n    }\n}',
      },
      php: {
        method: 'webhooks->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->webhooks->delete(\n  'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'webhooks.delete',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nclient.webhooks.delete(\n    id="d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n)',
      },
      ruby: {
        method: 'webhooks.delete',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nresult = sent.webhooks.delete("d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8")\n\nputs(result)',
      },
      typescript: {
        method: 'client.webhooks.delete',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.webhooks.delete('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8');",
      },
    },
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
      "## retrieve\n\n`client.webhooks.retrieve(id: string, x-profile-id?: string): { data?: webhook_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/webhooks/{id}`\n\nRetrieves a single webhook by ID for the authenticated customer.\n\n### Parameters\n\n- `id: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseWebhook = await client.webhooks.retrieve('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8');\n\nconsole.log(apiResponseWebhook);\n```",
    perLanguage: {
      csharp: {
        method: 'Webhooks.Retrieve',
        example:
          'WebhookRetrieveParams parameters = new()\n{\n    ID = "d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8"\n};\n\nvar apiResponseWebhook = await client.Webhooks.Retrieve(parameters);\n\nConsole.WriteLine(apiResponseWebhook);',
      },
      go: {
        method: 'client.Webhooks.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseWebhook, err := client.Webhooks.Get(\n\t\tcontext.TODO(),\n\t\t"d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n\t\tsentdm.WebhookGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseWebhook.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.sent.dm/v3/webhooks/$ID \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'webhooks().retrieve',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.webhooks.ApiResponseWebhook;\nimport dm.sent.models.webhooks.WebhookRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseWebhook apiResponseWebhook = client.webhooks().retrieve("d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8");\n    }\n}',
      },
      php: {
        method: 'webhooks->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseWebhook = $client->webhooks->retrieve(\n  'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseWebhook);",
      },
      python: {
        method: 'webhooks.retrieve',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_webhook = client.webhooks.retrieve(\n    id="d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n)\nprint(api_response_webhook.data)',
      },
      ruby: {
        method: 'webhooks.retrieve',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_webhook = sent.webhooks.retrieve("d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8")\n\nputs(api_response_webhook)',
      },
      typescript: {
        method: 'client.webhooks.retrieve',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseWebhook = await client.webhooks.retrieve('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8');\n\nconsole.log(apiResponseWebhook.data);",
      },
    },
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
      "## update\n\n`client.webhooks.update(id: string, display_name?: string, endpoint_url?: string, event_types?: string[], retry_count?: number, sandbox?: boolean, timeout_seconds?: number, Idempotency-Key?: string, x-profile-id?: string): { data?: webhook_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**put** `/v3/webhooks/{id}`\n\nUpdates an existing webhook for the authenticated customer.\n\n### Parameters\n\n- `id: string`\n\n- `display_name?: string`\n\n- `endpoint_url?: string`\n\n- `event_types?: string[]`\n\n- `retry_count?: number`\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `timeout_seconds?: number`\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseWebhook = await client.webhooks.update('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8');\n\nconsole.log(apiResponseWebhook);\n```",
    perLanguage: {
      csharp: {
        method: 'Webhooks.Update',
        example:
          'WebhookUpdateParams parameters = new()\n{\n    ID = "d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8"\n};\n\nvar apiResponseWebhook = await client.Webhooks.Update(parameters);\n\nConsole.WriteLine(apiResponseWebhook);',
      },
      go: {
        method: 'client.Webhooks.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseWebhook, err := client.Webhooks.Update(\n\t\tcontext.TODO(),\n\t\t"d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n\t\tsentdm.WebhookUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseWebhook.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/webhooks/$ID \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "display_name": "Updated Order Notifications",\n          "endpoint_url": "https://example.com/webhooks/orders-v2",\n          "event_types": [\n            "messages",\n            "templates"\n          ],\n          "retry_count": 5,\n          "timeout_seconds": 60\n        }\'',
      },
      java: {
        method: 'webhooks().update',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.webhooks.ApiResponseWebhook;\nimport dm.sent.models.webhooks.WebhookUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseWebhook apiResponseWebhook = client.webhooks().update("d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8");\n    }\n}',
      },
      php: {
        method: 'webhooks->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseWebhook = $client->webhooks->update(\n  'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',\n  displayName: 'Updated Order Notifications',\n  endpointURL: 'https://example.com/webhooks/orders-v2',\n  eventTypes: ['messages', 'templates'],\n  retryCount: 5,\n  sandbox: false,\n  timeoutSeconds: 60,\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseWebhook);",
      },
      python: {
        method: 'webhooks.update',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_webhook = client.webhooks.update(\n    id="d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n)\nprint(api_response_webhook.data)',
      },
      ruby: {
        method: 'webhooks.update',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_webhook = sent.webhooks.update("d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8")\n\nputs(api_response_webhook)',
      },
      typescript: {
        method: 'client.webhooks.update',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseWebhook = await client.webhooks.update('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8');\n\nconsole.log(apiResponseWebhook.data);",
      },
    },
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
      "## list_events\n\n`client.webhooks.listEvents(id: string, page: number, page_size: number, search?: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/webhooks/{id}/events`\n\nRetrieves a paginated list of delivery events for the specified webhook.\n\n### Parameters\n\n- `id: string`\n\n- `page: number`\n\n- `page_size: number`\n\n- `search?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { events?: { id?: string; created_at?: string; delivery_attempts?: number; delivery_status?: string; error_message?: string; event_data?: object; event_type?: string; http_status_code?: number; processing_completed_at?: string; processing_started_at?: string; response_body?: string; }[]; pagination?: object; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { events?: { id?: string; created_at?: string; delivery_attempts?: number; delivery_status?: string; error_message?: string; event_data?: object; event_type?: string; http_status_code?: number; processing_completed_at?: string; processing_started_at?: string; response_body?: string; }[]; pagination?: { cursors?: { after?: string; before?: string; }; has_more?: boolean; page?: number; page_size?: number; total_count?: number; total_pages?: number; }; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst response = await client.webhooks.listEvents('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8', { page: 0, page_size: 0 });\n\nconsole.log(response);\n```",
    perLanguage: {
      csharp: {
        method: 'Webhooks.ListEvents',
        example:
          'WebhookListEventsParams parameters = new()\n{\n    ID = "d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n    Page = 0,\n    PageSize = 0,\n};\n\nvar response = await client.Webhooks.ListEvents(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Webhooks.ListEvents',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Webhooks.ListEvents(\n\t\tcontext.TODO(),\n\t\t"d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n\t\tsentdm.WebhookListEventsParams{\n\t\t\tPage:     0,\n\t\t\tPageSize: 0,\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.sent.dm/v3/webhooks/$ID/events \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'webhooks().listEvents',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.webhooks.WebhookListEventsParams;\nimport dm.sent.models.webhooks.WebhookListEventsResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        WebhookListEventsParams params = WebhookListEventsParams.builder()\n            .id("d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8")\n            .page(0)\n            .pageSize(0)\n            .build();\n        WebhookListEventsResponse response = client.webhooks().listEvents(params);\n    }\n}',
      },
      php: {
        method: 'webhooks->listEvents',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->webhooks->listEvents(\n  'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',\n  page: 0,\n  pageSize: 0,\n  search: 'search',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'webhooks.list_events',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.webhooks.list_events(\n    id="d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n    page=0,\n    page_size=0,\n)\nprint(response.data)',
      },
      ruby: {
        method: 'webhooks.list_events',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nresponse = sent.webhooks.list_events("d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8", page: 0, page_size: 0)\n\nputs(response)',
      },
      typescript: {
        method: 'client.webhooks.listEvents',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.webhooks.listEvents('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8', {\n  page: 0,\n  page_size: 0,\n});\n\nconsole.log(response.data);",
      },
    },
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
      "## list_event_types\n\n`client.webhooks.listEventTypes(x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/webhooks/event-types`\n\nRetrieves all available webhook event types that can be subscribed to.\n\n### Parameters\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { event_types?: { description?: string; display_name?: string; is_active?: boolean; name?: string; }[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { event_types?: { description?: string; display_name?: string; is_active?: boolean; name?: string; }[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst response = await client.webhooks.listEventTypes();\n\nconsole.log(response);\n```",
    perLanguage: {
      csharp: {
        method: 'Webhooks.ListEventTypes',
        example:
          'WebhookListEventTypesParams parameters = new();\n\nvar response = await client.Webhooks.ListEventTypes(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Webhooks.ListEventTypes',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Webhooks.ListEventTypes(context.TODO(), sentdm.WebhookListEventTypesParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.sent.dm/v3/webhooks/event-types \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'webhooks().listEventTypes',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.webhooks.WebhookListEventTypesParams;\nimport dm.sent.models.webhooks.WebhookListEventTypesResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        WebhookListEventTypesResponse response = client.webhooks().listEventTypes();\n    }\n}',
      },
      php: {
        method: 'webhooks->listEventTypes',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->webhooks->listEventTypes(\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'webhooks.list_event_types',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.webhooks.list_event_types()\nprint(response.data)',
      },
      ruby: {
        method: 'webhooks.list_event_types',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nresponse = sent.webhooks.list_event_types\n\nputs(response)',
      },
      typescript: {
        method: 'client.webhooks.listEventTypes',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.webhooks.listEventTypes();\n\nconsole.log(response.data);",
      },
    },
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
      "## rotate_secret\n\n`client.webhooks.rotateSecret(id: string, body: { sandbox?: boolean; }, Idempotency-Key?: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/webhooks/{id}/rotate-secret`\n\nGenerates a new signing secret for the specified webhook. The old secret is immediately invalidated.\n\n### Parameters\n\n- `id: string`\n\n- `body: { sandbox?: boolean; }`\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { signing_secret?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { signing_secret?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst response = await client.webhooks.rotateSecret('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8', { body: {} });\n\nconsole.log(response);\n```",
    perLanguage: {
      csharp: {
        method: 'Webhooks.RotateSecret',
        example:
          'WebhookRotateSecretParams parameters = new()\n{\n    ID = "d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n    Body = new() { Sandbox = false },\n};\n\nvar response = await client.Webhooks.RotateSecret(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Webhooks.RotateSecret',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Webhooks.RotateSecret(\n\t\tcontext.TODO(),\n\t\t"d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n\t\tsentdm.WebhookRotateSecretParams{\n\t\t\tBody: sentdm.WebhookRotateSecretParamsBody{\n\t\t\t\tMutationRequestParam: sentdm.MutationRequestParam{},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/webhooks/$ID/rotate-secret \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "sandbox": false\n        }\'',
      },
      java: {
        method: 'webhooks().rotateSecret',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.webhooks.WebhookRotateSecretParams;\nimport dm.sent.models.webhooks.WebhookRotateSecretResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        WebhookRotateSecretResponse response = client.webhooks().rotateSecret("d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8");\n    }\n}',
      },
      php: {
        method: 'webhooks->rotateSecret',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->webhooks->rotateSecret(\n  'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',\n  body: ['sandbox' => false],\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'webhooks.rotate_secret',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.webhooks.rotate_secret(\n    id="d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n    body={},\n)\nprint(response.data)',
      },
      ruby: {
        method: 'webhooks.rotate_secret',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nresponse = sent.webhooks.rotate_secret("d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8", body: {})\n\nputs(response)',
      },
      typescript: {
        method: 'client.webhooks.rotateSecret',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.webhooks.rotateSecret('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8', {\n  body: {},\n});\n\nconsole.log(response.data);",
      },
    },
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
      "## test\n\n`client.webhooks.test(id: string, event_type?: string, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/webhooks/{id}/test`\n\nSends a test event to the specified webhook endpoint to verify connectivity.\n\n### Parameters\n\n- `id: string`\n\n- `event_type?: string`\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { message?: string; success?: boolean; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { message?: string; success?: boolean; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst response = await client.webhooks.test('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8');\n\nconsole.log(response);\n```",
    perLanguage: {
      csharp: {
        method: 'Webhooks.Test',
        example:
          'WebhookTestParams parameters = new()\n{\n    ID = "d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8"\n};\n\nvar response = await client.Webhooks.Test(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Webhooks.Test',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Webhooks.Test(\n\t\tcontext.TODO(),\n\t\t"d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n\t\tsentdm.WebhookTestParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/webhooks/$ID/test \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "event_type": "message.sent"\n        }\'',
      },
      java: {
        method: 'webhooks().test',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.webhooks.WebhookTestParams;\nimport dm.sent.models.webhooks.WebhookTestResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        WebhookTestResponse response = client.webhooks().test("d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8");\n    }\n}',
      },
      php: {
        method: 'webhooks->test',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->webhooks->test(\n  'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',\n  eventType: 'message.sent',\n  sandbox: false,\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'webhooks.test',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.webhooks.test(\n    id="d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'webhooks.test_',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nresponse = sent.webhooks.test_("d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8")\n\nputs(response)',
      },
      typescript: {
        method: 'client.webhooks.test',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.webhooks.test('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8');\n\nconsole.log(response.data);",
      },
    },
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
      "## toggle_status\n\n`client.webhooks.toggleStatus(id: string, is_active?: boolean, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: webhook_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**patch** `/v3/webhooks/{id}/toggle-status`\n\nActivates or deactivates a webhook for the authenticated customer.\n\n### Parameters\n\n- `id: string`\n\n- `is_active?: boolean`\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; consecutive_failures?: number; created_at?: string; display_name?: string; endpoint_url?: string; event_types?: string[]; is_active?: boolean; last_delivery_attempt_at?: string; last_successful_delivery_at?: string; retry_count?: number; signing_secret?: string; timeout_seconds?: number; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseWebhook = await client.webhooks.toggleStatus('d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8');\n\nconsole.log(apiResponseWebhook);\n```",
    perLanguage: {
      csharp: {
        method: 'Webhooks.ToggleStatus',
        example:
          'WebhookToggleStatusParams parameters = new()\n{\n    ID = "d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8"\n};\n\nvar apiResponseWebhook = await client.Webhooks.ToggleStatus(parameters);\n\nConsole.WriteLine(apiResponseWebhook);',
      },
      go: {
        method: 'client.Webhooks.ToggleStatus',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseWebhook, err := client.Webhooks.ToggleStatus(\n\t\tcontext.TODO(),\n\t\t"d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n\t\tsentdm.WebhookToggleStatusParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseWebhook.Data)\n}\n',
      },
      http: {
        example:
          "curl https://api.sent.dm/v3/webhooks/$ID/toggle-status \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $SENT_DM_API_KEY\" \\\n    -d '{}'",
      },
      java: {
        method: 'webhooks().toggleStatus',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.webhooks.ApiResponseWebhook;\nimport dm.sent.models.webhooks.WebhookToggleStatusParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseWebhook apiResponseWebhook = client.webhooks().toggleStatus("d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8");\n    }\n}',
      },
      php: {
        method: 'webhooks->toggleStatus',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseWebhook = $client->webhooks->toggleStatus(\n  'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',\n  isActive: false,\n  sandbox: false,\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseWebhook);",
      },
      python: {
        method: 'webhooks.toggle_status',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_webhook = client.webhooks.toggle_status(\n    id="d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",\n)\nprint(api_response_webhook.data)',
      },
      ruby: {
        method: 'webhooks.toggle_status',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_webhook = sent.webhooks.toggle_status("d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8")\n\nputs(api_response_webhook)',
      },
      typescript: {
        method: 'client.webhooks.toggleStatus',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseWebhook = await client.webhooks.toggleStatus(\n  'd4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8',\n);\n\nconsole.log(apiResponseWebhook.data);",
      },
    },
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
      "## retrieve\n\n`client.users.retrieve(userId: string, x-profile-id?: string): { data?: user_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/users/{userId}`\n\nRetrieves detailed information about a specific user in an organization or profile. Requires developer role or higher.\n\n### Parameters\n\n- `userId: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseOfUser = await client.users.retrieve('userId');\n\nconsole.log(apiResponseOfUser);\n```",
    perLanguage: {
      csharp: {
        method: 'Users.Retrieve',
        example:
          'UserRetrieveParams parameters = new() { UserID = "userId" };\n\nvar apiResponseOfUser = await client.Users.Retrieve(parameters);\n\nConsole.WriteLine(apiResponseOfUser);',
      },
      go: {
        method: 'client.Users.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseOfUser, err := client.Users.Get(\n\t\tcontext.TODO(),\n\t\t"userId",\n\t\tsentdm.UserGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseOfUser.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.sent.dm/v3/users/$USER_ID \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'users().retrieve',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.users.ApiResponseOfUser;\nimport dm.sent.models.users.UserRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseOfUser apiResponseOfUser = client.users().retrieve("userId");\n    }\n}',
      },
      php: {
        method: 'users->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseOfUser = $client->users->retrieve(\n  'userId', xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'\n);\n\nvar_dump($apiResponseOfUser);",
      },
      python: {
        method: 'users.retrieve',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_of_user = client.users.retrieve(\n    user_id="userId",\n)\nprint(api_response_of_user.data)',
      },
      ruby: {
        method: 'users.retrieve',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_of_user = sent.users.retrieve("userId")\n\nputs(api_response_of_user)',
      },
      typescript: {
        method: 'client.users.retrieve',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseOfUser = await client.users.retrieve('userId');\n\nconsole.log(apiResponseOfUser.data);",
      },
    },
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
      "## remove\n\n`client.users.remove(userId: string, body: { sandbox?: boolean; }, x-profile-id?: string): void`\n\n**delete** `/v3/users/{userId}`\n\nRemoves a user's access to an organization or profile. Requires admin role. You cannot remove yourself or remove the last admin.\n\n### Parameters\n\n- `userId: string`\n\n- `body: { sandbox?: boolean; }`\n  Request to remove a user from an organization\n\n- `x-profile-id?: string`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nawait client.users.remove('userId', { body: {} })\n```",
    perLanguage: {
      csharp: {
        method: 'Users.Remove',
        example:
          'UserRemoveParams parameters = new()\n{\n    UserID = "userId",\n    Body = new() { Sandbox = false },\n};\n\nawait client.Users.Remove(parameters);',
      },
      go: {
        method: 'client.Users.Remove',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Users.Remove(\n\t\tcontext.TODO(),\n\t\t"userId",\n\t\tsentdm.UserRemoveParams{\n\t\t\tBody: sentdm.UserRemoveParamsBody{\n\t\t\t\tMutationRequestParam: sentdm.MutationRequestParam{},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/users/$USER_ID \\\n    -X DELETE \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'users().remove',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.users.UserRemoveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        client.users().remove("userId");\n    }\n}',
      },
      php: {
        method: 'users->remove',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->users->remove(\n  'userId',\n  body: ['sandbox' => false],\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'users.remove',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nclient.users.remove(\n    user_id="userId",\n    body={},\n)',
      },
      ruby: {
        method: 'users.remove',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nresult = sent.users.remove("userId", body: {})\n\nputs(result)',
      },
      typescript: {
        method: 'client.users.remove',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.users.remove('userId', { body: {} });",
      },
    },
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
      "## update_role\n\n`client.users.updateRole(userId: string, role?: string, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: user_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**patch** `/v3/users/{userId}`\n\nUpdates a user's role in the organization or profile. Requires admin role. You cannot change your own role or demote the last admin.\n\n### Parameters\n\n- `userId: string`\n\n- `role?: string`\n  User role: admin, billing, or developer (required)\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseOfUser = await client.users.updateRole('userId');\n\nconsole.log(apiResponseOfUser);\n```",
    perLanguage: {
      csharp: {
        method: 'Users.UpdateRole',
        example:
          'UserUpdateRoleParams parameters = new() { UserID = "userId" };\n\nvar apiResponseOfUser = await client.Users.UpdateRole(parameters);\n\nConsole.WriteLine(apiResponseOfUser);',
      },
      go: {
        method: 'client.Users.UpdateRole',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseOfUser, err := client.Users.UpdateRole(\n\t\tcontext.TODO(),\n\t\t"userId",\n\t\tsentdm.UserUpdateRoleParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseOfUser.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/users/$USER_ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "role": "billing"\n        }\'',
      },
      java: {
        method: 'users().updateRole',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.users.ApiResponseOfUser;\nimport dm.sent.models.users.UserUpdateRoleParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseOfUser apiResponseOfUser = client.users().updateRole("userId");\n    }\n}',
      },
      php: {
        method: 'users->updateRole',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseOfUser = $client->users->updateRole(\n  'userId',\n  role: 'billing',\n  sandbox: false,\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseOfUser);",
      },
      python: {
        method: 'users.update_role',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_of_user = client.users.update_role(\n    user_id="userId",\n)\nprint(api_response_of_user.data)',
      },
      ruby: {
        method: 'users.update_role',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_of_user = sent.users.update_role("userId")\n\nputs(api_response_of_user)',
      },
      typescript: {
        method: 'client.users.updateRole',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseOfUser = await client.users.updateRole('userId');\n\nconsole.log(apiResponseOfUser.data);",
      },
    },
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
      "## list\n\n`client.users.list(x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/users`\n\nRetrieves all users who have access to the organization or profile identified by the API key, including their roles and status. Shows invited users (pending acceptance) and active users. Requires developer role or higher.\n\n### Parameters\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { users?: object[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { users?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst users = await client.users.list();\n\nconsole.log(users);\n```",
    perLanguage: {
      csharp: {
        method: 'Users.List',
        example:
          'UserListParams parameters = new();\n\nvar users = await client.Users.List(parameters);\n\nConsole.WriteLine(users);',
      },
      go: {
        method: 'client.Users.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tusers, err := client.Users.List(context.TODO(), sentdm.UserListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", users.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.sent.dm/v3/users \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'users().list',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.users.UserListParams;\nimport dm.sent.models.users.UserListResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        UserListResponse users = client.users().list();\n    }\n}',
      },
      php: {
        method: 'users->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$users = $client->users->list(\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'\n);\n\nvar_dump($users);",
      },
      python: {
        method: 'users.list',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nusers = client.users.list()\nprint(users.data)',
      },
      ruby: {
        method: 'users.list',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nusers = sent.users.list\n\nputs(users)',
      },
      typescript: {
        method: 'client.users.list',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst users = await client.users.list();\n\nconsole.log(users.data);",
      },
    },
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
      "## invite\n\n`client.users.invite(email?: string, name?: string, role?: string, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: user_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/users`\n\nSends an invitation to a user to join the organization or profile with a specific role. Requires admin role. The user will receive an invitation email with a token to accept. Invitation tokens expire after 7 days.\n\n### Parameters\n\n- `email?: string`\n  User email address (required)\n\n- `name?: string`\n  User full name (required)\n\n- `role?: string`\n  User role: admin, billing, or developer (required)\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; created_at?: string; email?: string; invited_at?: string; last_login_at?: string; name?: string; role?: string; status?: string; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseOfUser = await client.users.invite();\n\nconsole.log(apiResponseOfUser);\n```",
    perLanguage: {
      csharp: {
        method: 'Users.Invite',
        example:
          'UserInviteParams parameters = new();\n\nvar apiResponseOfUser = await client.Users.Invite(parameters);\n\nConsole.WriteLine(apiResponseOfUser);',
      },
      go: {
        method: 'client.Users.Invite',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseOfUser, err := client.Users.Invite(context.TODO(), sentdm.UserInviteParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseOfUser.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/users \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "email": "newuser@example.com",\n          "name": "New User",\n          "role": "developer"\n        }\'',
      },
      java: {
        method: 'users().invite',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.users.ApiResponseOfUser;\nimport dm.sent.models.users.UserInviteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseOfUser apiResponseOfUser = client.users().invite();\n    }\n}',
      },
      php: {
        method: 'users->invite',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseOfUser = $client->users->invite(\n  email: 'newuser@example.com',\n  name: 'New User',\n  role: 'developer',\n  sandbox: false,\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseOfUser);",
      },
      python: {
        method: 'users.invite',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_of_user = client.users.invite()\nprint(api_response_of_user.data)',
      },
      ruby: {
        method: 'users.invite',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_of_user = sent.users.invite\n\nputs(api_response_of_user)',
      },
      typescript: {
        method: 'client.users.invite',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseOfUser = await client.users.invite();\n\nconsole.log(apiResponseOfUser.data);",
      },
    },
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
      'definition?: { body: { multiChannel?: template_body_content; sms?: template_body_content; whatsapp?: template_body_content; }; authenticationConfig?: { addSecurityRecommendation?: boolean; codeExpirationMinutes?: number; }; buttons?: { props: sent_dm_services_common_contracts_poc_os_template_button_props; type: string; id?: number; }[]; definitionVersion?: string; footer?: { template: string; type?: string; variables?: template_variable[]; }; header?: { template: string; type?: string; variables?: template_variable[]; }; };',
      'language?: string;',
      'sandbox?: boolean;',
      'submit_for_review?: boolean;',
      'Idempotency-Key?: string;',
      'x-profile-id?: string;',
    ],
    response:
      '{ data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }',
    markdown:
      "## create\n\n`client.templates.create(category?: string, creation_source?: string, definition?: { body: sent_dm_services_common_contracts_poc_os_template_body; authenticationConfig?: sent_dm_services_common_contracts_poc_os_authentication_config; buttons?: sent_dm_services_common_contracts_poc_os_template_button[]; definitionVersion?: string; footer?: sent_dm_services_common_contracts_poc_os_template_footer; header?: sent_dm_services_common_contracts_poc_os_template_header; }, language?: string, sandbox?: boolean, submit_for_review?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: template; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/templates`\n\nCreates a new message template with header, body, footer, and buttons. The template can be submitted for review immediately or saved as draft for later submission.\n\n### Parameters\n\n- `category?: string`\n  Template category: MARKETING, UTILITY, AUTHENTICATION (optional, auto-detected if not provided)\n\n- `creation_source?: string`\n  Source of template creation (default: from-api)\n\n- `definition?: { body: { multiChannel?: template_body_content; sms?: template_body_content; whatsapp?: template_body_content; }; authenticationConfig?: { addSecurityRecommendation?: boolean; codeExpirationMinutes?: number; }; buttons?: { props: sent_dm_services_common_contracts_poc_os_template_button_props; type: string; id?: number; }[]; definitionVersion?: string; footer?: { template: string; type?: string; variables?: template_variable[]; }; header?: { template: string; type?: string; variables?: template_variable[]; }; }`\n  Complete definition of a message template including header, body, footer, and buttons\n  - `body: { multiChannel?: { template: string; type?: string; variables?: template_variable[]; }; sms?: { template: string; type?: string; variables?: template_variable[]; }; whatsapp?: { template: string; type?: string; variables?: template_variable[]; }; }`\n    Body section of a message template with channel-specific content\n  - `authenticationConfig?: { addSecurityRecommendation?: boolean; codeExpirationMinutes?: number; }`\n    Configuration for AUTHENTICATION category templates\n  - `buttons?: { props: { activeFor: number; countryCode: string; offerCode: string; phoneNumber: string; quickReplyType: string; text: string; url: string; urlType: string; autofillText?: string; otpType?: string; packageName?: string; signatureHash?: string; }; type: string; id?: number; }[]`\n    Optional list of interactive buttons (e.g., quick replies, URLs, phone numbers)\n  - `definitionVersion?: string`\n    The version of the template definition format\n  - `footer?: { template: string; type?: string; variables?: { name: string; props: object; type: string; id?: number; }[]; }`\n    Footer section of a message template\n  - `header?: { template: string; type?: string; variables?: { name: string; props: object; type: string; id?: number; }[]; }`\n    Header section of a message template\n\n- `language?: string`\n  Template language code (e.g., en_US) (optional, auto-detected if not provided)\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `submit_for_review?: boolean`\n  Whether to submit the template for review after creation (default: false)\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseTemplate = await client.templates.create();\n\nconsole.log(apiResponseTemplate);\n```",
    perLanguage: {
      csharp: {
        method: 'Templates.Create',
        example:
          'TemplateCreateParams parameters = new();\n\nvar apiResponseTemplate = await client.Templates.Create(parameters);\n\nConsole.WriteLine(apiResponseTemplate);',
      },
      go: {
        method: 'client.Templates.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseTemplate, err := client.Templates.New(context.TODO(), sentdm.TemplateNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseTemplate.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/templates \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "category": "MARKETING",\n          "language": "en_US"\n        }\'',
      },
      java: {
        method: 'templates().create',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.templates.ApiResponseTemplate;\nimport dm.sent.models.templates.TemplateCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseTemplate apiResponseTemplate = client.templates().create();\n    }\n}',
      },
      php: {
        method: 'templates->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseTemplate = $client->templates->create(\n  category: 'MARKETING',\n  creationSource: null,\n  definition: [\n    'body' => [\n      'multiChannel' => [\n        'template' => 'Hello {{0:variable}}! Welcome to {{1:variable}}.',\n        'type' => null,\n        'variables' => [\n          [\n            'name' => 'name',\n            'props' => [\n              'mediaType' => 'x',\n              'sample' => 'John',\n              'url' => 'x',\n              'variableType' => 'text',\n              'alt' => null,\n              'regex' => null,\n              'shortURL' => null,\n            ],\n            'type' => 'variable',\n            'id' => 0,\n          ],\n          [\n            'name' => 'company',\n            'props' => [\n              'mediaType' => 'x',\n              'sample' => 'SentDM',\n              'url' => 'x',\n              'variableType' => 'text',\n              'alt' => null,\n              'regex' => null,\n              'shortURL' => null,\n            ],\n            'type' => 'variable',\n            'id' => 1,\n          ],\n        ],\n      ],\n      'sms' => [\n        'template' => 'template',\n        'type' => 'type',\n        'variables' => [\n          [\n            'name' => 'x',\n            'props' => [\n              'mediaType' => 'x',\n              'sample' => 'x',\n              'url' => 'x',\n              'variableType' => 'x',\n              'alt' => 'alt',\n              'regex' => 'regex',\n              'shortURL' => 'shortUrl',\n            ],\n            'type' => 'x',\n            'id' => 0,\n          ],\n        ],\n      ],\n      'whatsapp' => [\n        'template' => 'template',\n        'type' => 'type',\n        'variables' => [\n          [\n            'name' => 'x',\n            'props' => [\n              'mediaType' => 'x',\n              'sample' => 'x',\n              'url' => 'x',\n              'variableType' => 'x',\n              'alt' => 'alt',\n              'regex' => 'regex',\n              'shortURL' => 'shortUrl',\n            ],\n            'type' => 'x',\n            'id' => 0,\n          ],\n        ],\n      ],\n    ],\n    'authenticationConfig' => [\n      'addSecurityRecommendation' => true, 'codeExpirationMinutes' => 0\n    ],\n    'buttons' => [\n      [\n        'props' => [\n          'activeFor' => 1,\n          'countryCode' => 'x',\n          'offerCode' => 'x',\n          'phoneNumber' => 'x',\n          'quickReplyType' => 'x',\n          'text' => 'text',\n          'url' => 'x',\n          'urlType' => 'x',\n          'autofillText' => 'autofillText',\n          'otpType' => 'otpType',\n          'packageName' => 'packageName',\n          'signatureHash' => 'signatureHash',\n        ],\n        'type' => 'x',\n        'id' => 0,\n      ],\n    ],\n    'definitionVersion' => '1.0',\n    'footer' => [\n      'template' => 'template',\n      'type' => 'type',\n      'variables' => [\n        [\n          'name' => 'x',\n          'props' => [\n            'mediaType' => 'x',\n            'sample' => 'x',\n            'url' => 'x',\n            'variableType' => 'x',\n            'alt' => 'alt',\n            'regex' => 'regex',\n            'shortURL' => 'shortUrl',\n          ],\n          'type' => 'x',\n          'id' => 0,\n        ],\n      ],\n    ],\n    'header' => [\n      'template' => 'template',\n      'type' => 'type',\n      'variables' => [\n        [\n          'name' => 'x',\n          'props' => [\n            'mediaType' => 'x',\n            'sample' => 'x',\n            'url' => 'x',\n            'variableType' => 'x',\n            'alt' => 'alt',\n            'regex' => 'regex',\n            'shortURL' => 'shortUrl',\n          ],\n          'type' => 'x',\n          'id' => 0,\n        ],\n      ],\n    ],\n  ],\n  language: 'en_US',\n  sandbox: false,\n  submitForReview: false,\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseTemplate);",
      },
      python: {
        method: 'templates.create',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_template = client.templates.create()\nprint(api_response_template.data)',
      },
      ruby: {
        method: 'templates.create',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_template = sent.templates.create\n\nputs(api_response_template)',
      },
      typescript: {
        method: 'client.templates.create',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseTemplate = await client.templates.create();\n\nconsole.log(apiResponseTemplate.data);",
      },
    },
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
      "## list\n\n`client.templates.list(page: number, page_size: number, category?: string, is_welcome_playground?: boolean, search?: string, status?: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/templates`\n\nRetrieves a paginated list of message templates for the authenticated customer. Supports filtering by status, category, and search term.\n\n### Parameters\n\n- `page: number`\n  Page number (1-indexed)\n\n- `page_size: number`\n  Number of items per page\n\n- `category?: string`\n  Optional category filter: MARKETING, UTILITY, AUTHENTICATION\n\n- `is_welcome_playground?: boolean`\n  Optional filter by welcome playground flag\n\n- `search?: string`\n  Optional search term for filtering templates\n\n- `status?: string`\n  Optional status filter: APPROVED, PENDING, REJECTED\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { pagination?: object; templates?: object[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { pagination?: { cursors?: { after?: string; before?: string; }; has_more?: boolean; page?: number; page_size?: number; total_count?: number; total_pages?: number; }; templates?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst templates = await client.templates.list({ page: 0, page_size: 0 });\n\nconsole.log(templates);\n```",
    perLanguage: {
      csharp: {
        method: 'Templates.List',
        example:
          'TemplateListParams parameters = new()\n{\n    Page = 0,\n    PageSize = 0,\n};\n\nvar templates = await client.Templates.List(parameters);\n\nConsole.WriteLine(templates);',
      },
      go: {
        method: 'client.Templates.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttemplates, err := client.Templates.List(context.TODO(), sentdm.TemplateListParams{\n\t\tPage:     0,\n\t\tPageSize: 0,\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", templates.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.sent.dm/v3/templates \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'templates().list',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.templates.TemplateListParams;\nimport dm.sent.models.templates.TemplateListResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        TemplateListParams params = TemplateListParams.builder()\n            .page(0)\n            .pageSize(0)\n            .build();\n        TemplateListResponse templates = client.templates().list(params);\n    }\n}',
      },
      php: {
        method: 'templates->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$templates = $client->templates->list(\n  page: 0,\n  pageSize: 0,\n  category: 'category',\n  isWelcomePlayground: true,\n  search: 'search',\n  status: 'status',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($templates);",
      },
      python: {
        method: 'templates.list',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\ntemplates = client.templates.list(\n    page=0,\n    page_size=0,\n)\nprint(templates.data)',
      },
      ruby: {
        method: 'templates.list',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\ntemplates = sent.templates.list(page: 0, page_size: 0)\n\nputs(templates)',
      },
      typescript: {
        method: 'client.templates.list',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst templates = await client.templates.list({ page: 0, page_size: 0 });\n\nconsole.log(templates.data);",
      },
    },
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
      "## delete\n\n`client.templates.delete(id: string, delete_from_meta?: boolean, sandbox?: boolean, x-profile-id?: string): void`\n\n**delete** `/v3/templates/{id}`\n\nDeletes a template by ID. Optionally, you can also delete the template from WhatsApp/Meta by setting delete_from_meta=true.\n\n### Parameters\n\n- `id: string`\n\n- `delete_from_meta?: boolean`\n  Whether to also delete the template from WhatsApp/Meta (optional, defaults to false)\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `x-profile-id?: string`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nawait client.templates.delete('7ba7b820-9dad-11d1-80b4-00c04fd430c8')\n```",
    perLanguage: {
      csharp: {
        method: 'Templates.Delete',
        example:
          'TemplateDeleteParams parameters = new()\n{\n    ID = "7ba7b820-9dad-11d1-80b4-00c04fd430c8"\n};\n\nawait client.Templates.Delete(parameters);',
      },
      go: {
        method: 'client.Templates.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Templates.Delete(\n\t\tcontext.TODO(),\n\t\t"7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n\t\tsentdm.TemplateDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/templates/$ID \\\n    -X DELETE \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'templates().delete',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.templates.TemplateDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        client.templates().delete("7ba7b820-9dad-11d1-80b4-00c04fd430c8");\n    }\n}',
      },
      php: {
        method: 'templates->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->templates->delete(\n  '7ba7b820-9dad-11d1-80b4-00c04fd430c8',\n  deleteFromMeta: false,\n  sandbox: false,\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'templates.delete',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nclient.templates.delete(\n    id="7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n)',
      },
      ruby: {
        method: 'templates.delete',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nresult = sent.templates.delete("7ba7b820-9dad-11d1-80b4-00c04fd430c8")\n\nputs(result)',
      },
      typescript: {
        method: 'client.templates.delete',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.templates.delete('7ba7b820-9dad-11d1-80b4-00c04fd430c8');",
      },
    },
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
      "## retrieve\n\n`client.templates.retrieve(id: string, x-profile-id?: string): { data?: template; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/templates/{id}`\n\nRetrieves a specific template by its ID. Returns template details including name, category, language, status, and definition.\n\n### Parameters\n\n- `id: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseTemplate = await client.templates.retrieve('7ba7b820-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(apiResponseTemplate);\n```",
    perLanguage: {
      csharp: {
        method: 'Templates.Retrieve',
        example:
          'TemplateRetrieveParams parameters = new()\n{\n    ID = "7ba7b820-9dad-11d1-80b4-00c04fd430c8"\n};\n\nvar apiResponseTemplate = await client.Templates.Retrieve(parameters);\n\nConsole.WriteLine(apiResponseTemplate);',
      },
      go: {
        method: 'client.Templates.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseTemplate, err := client.Templates.Get(\n\t\tcontext.TODO(),\n\t\t"7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n\t\tsentdm.TemplateGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseTemplate.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.sent.dm/v3/templates/$ID \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'templates().retrieve',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.templates.ApiResponseTemplate;\nimport dm.sent.models.templates.TemplateRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseTemplate apiResponseTemplate = client.templates().retrieve("7ba7b820-9dad-11d1-80b4-00c04fd430c8");\n    }\n}',
      },
      php: {
        method: 'templates->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseTemplate = $client->templates->retrieve(\n  '7ba7b820-9dad-11d1-80b4-00c04fd430c8',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseTemplate);",
      },
      python: {
        method: 'templates.retrieve',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_template = client.templates.retrieve(\n    id="7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n)\nprint(api_response_template.data)',
      },
      ruby: {
        method: 'templates.retrieve',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_template = sent.templates.retrieve("7ba7b820-9dad-11d1-80b4-00c04fd430c8")\n\nputs(api_response_template)',
      },
      typescript: {
        method: 'client.templates.retrieve',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseTemplate = await client.templates.retrieve('7ba7b820-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(apiResponseTemplate.data);",
      },
    },
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
      'definition?: { body: { multiChannel?: template_body_content; sms?: template_body_content; whatsapp?: template_body_content; }; authenticationConfig?: { addSecurityRecommendation?: boolean; codeExpirationMinutes?: number; }; buttons?: { props: sent_dm_services_common_contracts_poc_os_template_button_props; type: string; id?: number; }[]; definitionVersion?: string; footer?: { template: string; type?: string; variables?: template_variable[]; }; header?: { template: string; type?: string; variables?: template_variable[]; }; };',
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
      "## update\n\n`client.templates.update(id: string, category?: string, definition?: { body: sent_dm_services_common_contracts_poc_os_template_body; authenticationConfig?: sent_dm_services_common_contracts_poc_os_authentication_config; buttons?: sent_dm_services_common_contracts_poc_os_template_button[]; definitionVersion?: string; footer?: sent_dm_services_common_contracts_poc_os_template_footer; header?: sent_dm_services_common_contracts_poc_os_template_header; }, language?: string, name?: string, sandbox?: boolean, submit_for_review?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: template; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**put** `/v3/templates/{id}`\n\nUpdates an existing template's name, category, language, definition, or submits it for review.\n\n### Parameters\n\n- `id: string`\n\n- `category?: string`\n  Template category: MARKETING, UTILITY, AUTHENTICATION\n\n- `definition?: { body: { multiChannel?: template_body_content; sms?: template_body_content; whatsapp?: template_body_content; }; authenticationConfig?: { addSecurityRecommendation?: boolean; codeExpirationMinutes?: number; }; buttons?: { props: sent_dm_services_common_contracts_poc_os_template_button_props; type: string; id?: number; }[]; definitionVersion?: string; footer?: { template: string; type?: string; variables?: template_variable[]; }; header?: { template: string; type?: string; variables?: template_variable[]; }; }`\n  Complete definition of a message template including header, body, footer, and buttons\n  - `body: { multiChannel?: { template: string; type?: string; variables?: template_variable[]; }; sms?: { template: string; type?: string; variables?: template_variable[]; }; whatsapp?: { template: string; type?: string; variables?: template_variable[]; }; }`\n    Body section of a message template with channel-specific content\n  - `authenticationConfig?: { addSecurityRecommendation?: boolean; codeExpirationMinutes?: number; }`\n    Configuration for AUTHENTICATION category templates\n  - `buttons?: { props: { activeFor: number; countryCode: string; offerCode: string; phoneNumber: string; quickReplyType: string; text: string; url: string; urlType: string; autofillText?: string; otpType?: string; packageName?: string; signatureHash?: string; }; type: string; id?: number; }[]`\n    Optional list of interactive buttons (e.g., quick replies, URLs, phone numbers)\n  - `definitionVersion?: string`\n    The version of the template definition format\n  - `footer?: { template: string; type?: string; variables?: { name: string; props: object; type: string; id?: number; }[]; }`\n    Footer section of a message template\n  - `header?: { template: string; type?: string; variables?: { name: string; props: object; type: string; id?: number; }[]; }`\n    Header section of a message template\n\n- `language?: string`\n  Template language code (e.g., en_US)\n\n- `name?: string`\n  Template display name\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `submit_for_review?: boolean`\n  Whether to submit the template for review after updating (default: false)\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; category?: string; channels?: string[]; created_at?: string; is_published?: boolean; language?: string; name?: string; status?: string; updated_at?: string; variables?: string[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseTemplate = await client.templates.update('7ba7b820-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(apiResponseTemplate);\n```",
    perLanguage: {
      csharp: {
        method: 'Templates.Update',
        example:
          'TemplateUpdateParams parameters = new()\n{\n    ID = "7ba7b820-9dad-11d1-80b4-00c04fd430c8"\n};\n\nvar apiResponseTemplate = await client.Templates.Update(parameters);\n\nConsole.WriteLine(apiResponseTemplate);',
      },
      go: {
        method: 'client.Templates.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseTemplate, err := client.Templates.Update(\n\t\tcontext.TODO(),\n\t\t"7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n\t\tsentdm.TemplateUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseTemplate.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/templates/$ID \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "category": "MARKETING",\n          "name": "Updated Welcome Message"\n        }\'',
      },
      java: {
        method: 'templates().update',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.templates.ApiResponseTemplate;\nimport dm.sent.models.templates.TemplateUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseTemplate apiResponseTemplate = client.templates().update("7ba7b820-9dad-11d1-80b4-00c04fd430c8");\n    }\n}',
      },
      php: {
        method: 'templates->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseTemplate = $client->templates->update(\n  '7ba7b820-9dad-11d1-80b4-00c04fd430c8',\n  category: 'MARKETING',\n  definition: [\n    'body' => [\n      'multiChannel' => [\n        'template' => 'template',\n        'type' => 'type',\n        'variables' => [\n          [\n            'name' => 'x',\n            'props' => [\n              'mediaType' => 'x',\n              'sample' => 'x',\n              'url' => 'x',\n              'variableType' => 'x',\n              'alt' => 'alt',\n              'regex' => 'regex',\n              'shortURL' => 'shortUrl',\n            ],\n            'type' => 'x',\n            'id' => 0,\n          ],\n        ],\n      ],\n      'sms' => [\n        'template' => 'template',\n        'type' => 'type',\n        'variables' => [\n          [\n            'name' => 'x',\n            'props' => [\n              'mediaType' => 'x',\n              'sample' => 'x',\n              'url' => 'x',\n              'variableType' => 'x',\n              'alt' => 'alt',\n              'regex' => 'regex',\n              'shortURL' => 'shortUrl',\n            ],\n            'type' => 'x',\n            'id' => 0,\n          ],\n        ],\n      ],\n      'whatsapp' => [\n        'template' => 'template',\n        'type' => 'type',\n        'variables' => [\n          [\n            'name' => 'x',\n            'props' => [\n              'mediaType' => 'x',\n              'sample' => 'x',\n              'url' => 'x',\n              'variableType' => 'x',\n              'alt' => 'alt',\n              'regex' => 'regex',\n              'shortURL' => 'shortUrl',\n            ],\n            'type' => 'x',\n            'id' => 0,\n          ],\n        ],\n      ],\n    ],\n    'authenticationConfig' => [\n      'addSecurityRecommendation' => true, 'codeExpirationMinutes' => 0\n    ],\n    'buttons' => [\n      [\n        'props' => [\n          'activeFor' => 1,\n          'countryCode' => 'x',\n          'offerCode' => 'x',\n          'phoneNumber' => 'x',\n          'quickReplyType' => 'x',\n          'text' => 'text',\n          'url' => 'x',\n          'urlType' => 'x',\n          'autofillText' => 'autofillText',\n          'otpType' => 'otpType',\n          'packageName' => 'packageName',\n          'signatureHash' => 'signatureHash',\n        ],\n        'type' => 'x',\n        'id' => 0,\n      ],\n    ],\n    'definitionVersion' => 'definitionVersion',\n    'footer' => [\n      'template' => 'template',\n      'type' => 'type',\n      'variables' => [\n        [\n          'name' => 'x',\n          'props' => [\n            'mediaType' => 'x',\n            'sample' => 'x',\n            'url' => 'x',\n            'variableType' => 'x',\n            'alt' => 'alt',\n            'regex' => 'regex',\n            'shortURL' => 'shortUrl',\n          ],\n          'type' => 'x',\n          'id' => 0,\n        ],\n      ],\n    ],\n    'header' => [\n      'template' => 'template',\n      'type' => 'type',\n      'variables' => [\n        [\n          'name' => 'x',\n          'props' => [\n            'mediaType' => 'x',\n            'sample' => 'x',\n            'url' => 'x',\n            'variableType' => 'x',\n            'alt' => 'alt',\n            'regex' => 'regex',\n            'shortURL' => 'shortUrl',\n          ],\n          'type' => 'x',\n          'id' => 0,\n        ],\n      ],\n    ],\n  ],\n  language: null,\n  name: 'Updated Welcome Message',\n  sandbox: false,\n  submitForReview: false,\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseTemplate);",
      },
      python: {
        method: 'templates.update',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_template = client.templates.update(\n    id="7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n)\nprint(api_response_template.data)',
      },
      ruby: {
        method: 'templates.update',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_template = sent.templates.update("7ba7b820-9dad-11d1-80b4-00c04fd430c8")\n\nputs(api_response_template)',
      },
      typescript: {
        method: 'client.templates.update',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseTemplate = await client.templates.update('7ba7b820-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(apiResponseTemplate.data);",
      },
    },
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
      "## complete\n\n`client.profiles.complete(profileId: string, webHookUrl: string, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): object`\n\n**post** `/v3/profiles/{profileId}/complete`\n\nFinal step in profile compliance workflow. Validates all prerequisites (general data, brand, campaigns), connects profile to Telnyx/WhatsApp, and sets status based on configuration. The process runs in the background and calls the provided webhook URL when finished.\n\n                Prerequisites:\n                - Profile must be completed\n                - If inheritTcrBrand=false: Profile must have existing brand\n                - If inheritTcrBrand=true: Parent must have existing brand\n                - If TCR application: Must have at least one campaign (own or inherited)\n                - If inheritTcrCampaign=false: Profile should have campaigns\n                - If inheritTcrCampaign=true: Parent must have campaigns\n\n                Status Logic:\n                - If both SMS and WhatsApp channels are missing → SUBMITTED\n                - If TCR application and not inheriting brand/campaigns → SUBMITTED\n                - If non-TCR with destination country (IsMain=true) → SUBMITTED\n                - Otherwise → COMPLETED\n\n### Parameters\n\n- `profileId: string`\n\n- `webHookUrl: string`\n  Webhook URL to call when profile completion finishes (success or failure)\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst response = await client.profiles.complete('660e8400-e29b-41d4-a716-446655440000', { webHookUrl: 'https://your-app.com/webhook/profile-complete' });\n\nconsole.log(response);\n```",
    perLanguage: {
      csharp: {
        method: 'Profiles.Complete',
        example:
          'ProfileCompleteParams parameters = new()\n{\n    ProfileID = "660e8400-e29b-41d4-a716-446655440000",\n    WebHookUrl = "https://your-app.com/webhook/profile-complete",\n};\n\nvar response = await client.Profiles.Complete(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Profiles.Complete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Profiles.Complete(\n\t\tcontext.TODO(),\n\t\t"660e8400-e29b-41d4-a716-446655440000",\n\t\tsentdm.ProfileCompleteParams{\n\t\t\tWebHookURL: "https://your-app.com/webhook/profile-complete",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/profiles/$PROFILE_ID/complete \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "webHookUrl": "https://your-app.com/webhook/profile-complete"\n        }\'',
      },
      java: {
        method: 'profiles().complete',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.profiles.ProfileCompleteParams;\nimport dm.sent.models.profiles.ProfileCompleteResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ProfileCompleteParams params = ProfileCompleteParams.builder()\n            .profileId("660e8400-e29b-41d4-a716-446655440000")\n            .webHookUrl("https://your-app.com/webhook/profile-complete")\n            .build();\n        ProfileCompleteResponse response = client.profiles().complete(params);\n    }\n}',
      },
      php: {
        method: 'profiles->complete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->profiles->complete(\n  '660e8400-e29b-41d4-a716-446655440000',\n  webHookURL: 'https://your-app.com/webhook/profile-complete',\n  sandbox: false,\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'profiles.complete',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.profiles.complete(\n    profile_id="660e8400-e29b-41d4-a716-446655440000",\n    web_hook_url="https://your-app.com/webhook/profile-complete",\n)\nprint(response)',
      },
      ruby: {
        method: 'profiles.complete',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nresponse = sent.profiles.complete(\n  "660e8400-e29b-41d4-a716-446655440000",\n  web_hook_url: "https://your-app.com/webhook/profile-complete"\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.profiles.complete',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.profiles.complete('660e8400-e29b-41d4-a716-446655440000', {\n  webHookUrl: 'https://your-app.com/webhook/profile-complete',\n});\n\nconsole.log(response);",
      },
    },
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
      "## create\n\n`client.profiles.create(allow_contact_sharing?: boolean, allow_template_sharing?: boolean, billing_contact?: { email: string; name: string; address?: string; phone?: string; }, billing_model?: string, brand?: { compliance: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_brands_brand_compliance_info; contact: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_brands_brand_contact_info; business?: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_brands_brand_business_info; }, description?: string, icon?: string, inherit_contacts?: boolean, inherit_tcr_brand?: boolean, inherit_tcr_campaign?: boolean, inherit_templates?: boolean, name?: string, payment_details?: { card_number: string; cvc: string; expiry: string; zip_code: string; }, sandbox?: boolean, short_name?: string, whatsapp_business_account?: { access_token: string; waba_id: string; phone_number_id?: string; }, Idempotency-Key?: string, x-profile-id?: string): { data?: profile_detail; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/profiles`\n\nCreates a new sender profile within an organization. Profiles represent different brands, departments, or use cases, each with their own messaging configuration and settings. Requires admin role in the organization.\n\n## WhatsApp Business Account\n\nEvery profile must be linked to a WhatsApp Business Account. There are two ways to do this:\n\n**1. Inherit from organization (default)** — Omit the `whatsapp_business_account` field. The profile will share the organization's WhatsApp Business Account, which must have been set up via WhatsApp Embedded Signup. This is the recommended path for most use cases.\n\n**2. Direct credentials** — Provide a `whatsapp_business_account` object with `waba_id`, `phone_number_id`, and `access_token`. Use this when the profile needs its own independent WhatsApp Business Account. Obtain these from Meta Business Manager by creating a System User with `whatsapp_business_messaging` and `whatsapp_business_management` permissions.\n\nIf the `whatsapp_business_account` field is omitted and the organization has no WhatsApp Business Account configured, the request will be rejected with HTTP 422.\n\n## Brand\n\nInclude the optional `brand` field to create the brand for this profile at the same time. Cannot be used when `inherit_tcr_brand` is `true`.\n\n## Payment Details\n\nWhen `billing_model` is `\"profile\"` or `\"profile_and_organization\"` you may include a `payment_details` object containing the card number, expiry (MM/YY), CVC, and billing ZIP code. Payment details are **never stored** on our servers and are forwarded directly to the payment processor. Providing `payment_details` when `billing_model` is `\"organization\"` is not allowed.\n\n### Parameters\n\n- `allow_contact_sharing?: boolean`\n  Whether contacts are shared across profiles (default: false)\n\n- `allow_template_sharing?: boolean`\n  Whether templates are shared across profiles (default: false)\n\n- `billing_contact?: { email: string; name: string; address?: string; phone?: string; }`\n  Billing contact information for a profile.\nRequired when billing_model is \"profile\" or \"profile_and_organization\".\n  - `email: string`\n    Email address where invoices will be sent (required)\n  - `name: string`\n    Full name of the billing contact or company (required)\n  - `address?: string`\n    Billing address (optional). Free-form text including street, city, state, postal code, and country.\n  - `phone?: string`\n    Phone number for the billing contact (optional)\n\n- `billing_model?: string`\n  Billing model: profile, organization, or profile_and_organization (default: profile).\n- \"organization\": the organization's billing details are used; no profile-level billing info needed.\n- \"profile\": the profile is billed independently; billing_contact is required.\n- \"profile_and_organization\": the profile is billed first with the organization as fallback; billing_contact is required.\n\n- `brand?: { compliance: { brandRelationship: tcr_brand_relationship; vertical: tcr_vertical; destinationCountries?: destination_country[]; expectedMessagingVolume?: string; isTcrApplication?: boolean; notes?: string; phoneNumberPrefix?: string; primaryUseCase?: string; }; contact: { name: string; businessName?: string; email?: string; phone?: string; phoneCountryCode?: string; role?: string; }; business?: { city?: string; country?: string; countryOfRegistration?: string; entityType?: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'SOLE_PROPRIETOR' | 'GOVERNMENT'; legalName?: string; postalCode?: string; state?: string; street?: string; taxId?: string; taxIdType?: string; url?: string; }; }`\n  Brand and KYC data grouped into contact, business, and compliance sections\n  - `compliance: { brandRelationship: 'BASIC_ACCOUNT' | 'MEDIUM_ACCOUNT' | 'LARGE_ACCOUNT' | 'SMALL_ACCOUNT' | 'KEY_ACCOUNT'; vertical: string; destinationCountries?: { id?: string; isMain?: boolean; }[]; expectedMessagingVolume?: string; isTcrApplication?: boolean; notes?: string; phoneNumberPrefix?: string; primaryUseCase?: string; }`\n    Compliance and TCR information for brand registration\n  - `contact: { name: string; businessName?: string; email?: string; phone?: string; phoneCountryCode?: string; role?: string; }`\n    Contact information for brand KYC\n  - `business?: { city?: string; country?: string; countryOfRegistration?: string; entityType?: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'SOLE_PROPRIETOR' | 'GOVERNMENT'; legalName?: string; postalCode?: string; state?: string; street?: string; taxId?: string; taxIdType?: string; url?: string; }`\n    Business details and address for brand KYC\n\n- `description?: string`\n  Profile description (optional)\n\n- `icon?: string`\n  Profile icon URL (optional)\n\n- `inherit_contacts?: boolean`\n  Whether this profile inherits contacts from organization (default: true)\n\n- `inherit_tcr_brand?: boolean`\n  Whether this profile inherits TCR brand from organization (default: true)\n\n- `inherit_tcr_campaign?: boolean`\n  Whether this profile inherits TCR campaign from organization (default: true)\n\n- `inherit_templates?: boolean`\n  Whether this profile inherits templates from organization (default: true)\n\n- `name?: string`\n  Profile name (required)\n\n- `payment_details?: { card_number: string; cvc: string; expiry: string; zip_code: string; }`\n  Payment card details for a profile.\nAccepted when billing_model is \"profile\" or \"profile_and_organization\".\nThese details are not stored on our servers and will be forwarded to the payment processor.\n  - `card_number: string`\n    Card number (digits only, 13–19 characters)\n  - `cvc: string`\n    Card security code (3–4 digits)\n  - `expiry: string`\n    Card expiry date in MM/YY format (e.g. \"09/27\")\n  - `zip_code: string`\n    Billing ZIP / postal code associated with the card\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `short_name?: string`\n  Profile short name/abbreviation (optional). Must be 3–11 characters, contain only letters, numbers,\nand spaces, and include at least one letter. Example: \"SALES\", \"Mkt 2\", \"Support1\".\n\n- `whatsapp_business_account?: { access_token: string; waba_id: string; phone_number_id?: string; }`\n  Direct WhatsApp Business Account credentials for a profile.\nUse this when the profile should have its own WhatsApp Business Account instead of inheriting from the organization.\nCredentials must be obtained from Meta Business Manager by creating a System User with\nwhatsapp_business_messaging and whatsapp_business_management scopes.\n  - `access_token: string`\n    System User access token with whatsapp_business_messaging and\nwhatsapp_business_management permissions. This value is stored securely\nand never returned in API responses.\n  - `waba_id: string`\n    WhatsApp Business Account ID from Meta Business Manager\n  - `phone_number_id?: string`\n    Phone Number ID of an existing number already registered under this WABA in Meta Business Manager.\nOptional — when omitted, a number will be provisioned from our pool and registered in the WABA\nduring the onboarding flow. When provided, the number must already exist in the WABA.\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: object; billing_model?: string; brand?: object; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: { address?: string; email?: string; name?: string; phone?: string; }; billing_model?: string; brand?: { id?: string; business?: { city?: string; country?: string; country_of_registration?: string; entity_type?: string; legal_name?: string; postal_code?: string; state?: string; street?: string; tax_id?: string; tax_id_type?: string; url?: string; }; compliance?: { brand_relationship?: tcr_brand_relationship; destination_countries?: destination_country[]; expected_messaging_volume?: string; is_tcr_application?: boolean; notes?: string; phone_number_prefix?: string; primary_use_case?: string; vertical?: tcr_vertical; }; contact?: { business_name?: string; email?: string; name?: string; phone?: string; phone_country_code?: string; role?: string; }; created_at?: string; csp_id?: string; identity_status?: 'SELF_DECLARED' | 'UNVERIFIED' | 'VERIFIED' | 'VETTED_VERIFIED'; is_inherited?: boolean; status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'; submitted_at?: string; submitted_to_tcr?: boolean; tcr_brand_id?: string; universal_ein?: string; updated_at?: string; }; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseOfProfileDetail = await client.profiles.create();\n\nconsole.log(apiResponseOfProfileDetail);\n```",
    perLanguage: {
      csharp: {
        method: 'Profiles.Create',
        example:
          'ProfileCreateParams parameters = new();\n\nvar apiResponseOfProfileDetail = await client.Profiles.Create(parameters);\n\nConsole.WriteLine(apiResponseOfProfileDetail);',
      },
      go: {
        method: 'client.Profiles.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseOfProfileDetail, err := client.Profiles.New(context.TODO(), sentdm.ProfileNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseOfProfileDetail.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/profiles \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "allow_contact_sharing": true,\n          "billing_model": "profile",\n          "description": "Sales department sender profile",\n          "icon": "https://example.com/sales-icon.png",\n          "inherit_contacts": true,\n          "inherit_templates": true,\n          "name": "Sales Team",\n          "short_name": "SALES",\n          "whatsapp_business_account": {\n            "access_token": "EAAxxxxxxxxxxxxxxx",\n            "waba_id": "123456789012345",\n            "phone_number_id": "987654321098765"\n          }\n        }\'',
      },
      java: {
        method: 'profiles().create',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.profiles.ApiResponseOfProfileDetail;\nimport dm.sent.models.profiles.ProfileCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseOfProfileDetail apiResponseOfProfileDetail = client.profiles().create();\n    }\n}',
      },
      php: {
        method: 'profiles->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseOfProfileDetail = $client->profiles->create(\n  allowContactSharing: true,\n  allowTemplateSharing: false,\n  billingContact: [\n    'email' => 'billing@acmecorp.com',\n    'name' => 'Acme Corp',\n    'address' => '123 Main Street, New York, NY 10001, US',\n    'phone' => '+12025551234',\n  ],\n  billingModel: 'profile',\n  brand: [\n    'compliance' => [\n      'brandRelationship' => TcrBrandRelationship::SMALL_ACCOUNT,\n      'vertical' => TcrVertical::PROFESSIONAL,\n      'destinationCountries' => [['id' => 'US', 'isMain' => false]],\n      'expectedMessagingVolume' => '10000',\n      'isTcrApplication' => true,\n      'notes' => null,\n      'phoneNumberPrefix' => '+1',\n      'primaryUseCase' => 'Customer notifications and appointment reminders',\n    ],\n    'contact' => [\n      'name' => 'John Smith',\n      'businessName' => 'Acme Corp',\n      'email' => 'john@acmecorp.com',\n      'phone' => '+12025551234',\n      'phoneCountryCode' => '1',\n      'role' => 'CEO',\n    ],\n    'business' => [\n      'city' => 'New York',\n      'country' => 'US',\n      'countryOfRegistration' => 'US',\n      'entityType' => 'PRIVATE_PROFIT',\n      'legalName' => 'Acme Corporation LLC',\n      'postalCode' => '10001',\n      'state' => 'NY',\n      'street' => '123 Main Street',\n      'taxID' => '12-3456789',\n      'taxIDType' => 'us_ein',\n      'url' => 'https://acmecorp.com',\n    ],\n  ],\n  description: 'Sales department sender profile',\n  icon: 'https://example.com/sales-icon.png',\n  inheritContacts: true,\n  inheritTcrBrand: false,\n  inheritTcrCampaign: false,\n  inheritTemplates: true,\n  name: 'Sales Team',\n  paymentDetails: [\n    'cardNumber' => '4111111111111111',\n    'cvc' => '123',\n    'expiry' => '09/27',\n    'zipCode' => '10001',\n  ],\n  sandbox: false,\n  shortName: 'SALES',\n  whatsappBusinessAccount: [\n    'accessToken' => 'EAAxxxxxxxxxxxxxxx',\n    'wabaID' => '123456789012345',\n    'phoneNumberID' => '987654321098765',\n  ],\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseOfProfileDetail);",
      },
      python: {
        method: 'profiles.create',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_of_profile_detail = client.profiles.create()\nprint(api_response_of_profile_detail.data)',
      },
      ruby: {
        method: 'profiles.create',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_of_profile_detail = sent.profiles.create\n\nputs(api_response_of_profile_detail)',
      },
      typescript: {
        method: 'client.profiles.create',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseOfProfileDetail = await client.profiles.create();\n\nconsole.log(apiResponseOfProfileDetail.data);",
      },
    },
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
      "## list\n\n`client.profiles.list(x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/profiles`\n\nRetrieves all sender profiles within an organization, including brand information for each profile. Profiles represent different brands, departments, or use cases within an organization, each with their own messaging configuration.\n\n### Parameters\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { profiles?: object[]; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { profiles?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: { address?: string; email?: string; name?: string; phone?: string; }; billing_model?: string; brand?: { id?: string; business?: object; compliance?: object; contact?: object; created_at?: string; csp_id?: string; identity_status?: 'SELF_DECLARED' | 'UNVERIFIED' | 'VERIFIED' | 'VETTED_VERIFIED'; is_inherited?: boolean; status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'; submitted_at?: string; submitted_to_tcr?: boolean; tcr_brand_id?: string; universal_ein?: string; updated_at?: string; }; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }[]; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst profiles = await client.profiles.list();\n\nconsole.log(profiles);\n```",
    perLanguage: {
      csharp: {
        method: 'Profiles.List',
        example:
          'ProfileListParams parameters = new();\n\nvar profiles = await client.Profiles.List(parameters);\n\nConsole.WriteLine(profiles);',
      },
      go: {
        method: 'client.Profiles.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tprofiles, err := client.Profiles.List(context.TODO(), sentdm.ProfileListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", profiles.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.sent.dm/v3/profiles \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'profiles().list',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.profiles.ProfileListParams;\nimport dm.sent.models.profiles.ProfileListResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ProfileListResponse profiles = client.profiles().list();\n    }\n}',
      },
      php: {
        method: 'profiles->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$profiles = $client->profiles->list(\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'\n);\n\nvar_dump($profiles);",
      },
      python: {
        method: 'profiles.list',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nprofiles = client.profiles.list()\nprint(profiles.data)',
      },
      ruby: {
        method: 'profiles.list',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nprofiles = sent.profiles.list\n\nputs(profiles)',
      },
      typescript: {
        method: 'client.profiles.list',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst profiles = await client.profiles.list();\n\nconsole.log(profiles.data);",
      },
    },
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
      "## delete\n\n`client.profiles.delete(profileId: string, body: { sandbox?: boolean; }, x-profile-id?: string): void`\n\n**delete** `/v3/profiles/{profileId}`\n\nSoft deletes a sender profile. The profile will be marked as deleted but data is retained. Requires admin role in the organization.\n\n### Parameters\n\n- `profileId: string`\n\n- `body: { sandbox?: boolean; }`\n  Request to delete a profile\n\n- `x-profile-id?: string`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nawait client.profiles.delete('profileId', { body: {} })\n```",
    perLanguage: {
      csharp: {
        method: 'Profiles.Delete',
        example:
          'ProfileDeleteParams parameters = new()\n{\n    ProfileID = "profileId",\n    Body = new() { Sandbox = false },\n};\n\nawait client.Profiles.Delete(parameters);',
      },
      go: {
        method: 'client.Profiles.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Profiles.Delete(\n\t\tcontext.TODO(),\n\t\t"profileId",\n\t\tsentdm.ProfileDeleteParams{\n\t\t\tBody: sentdm.ProfileDeleteParamsBody{\n\t\t\t\tMutationRequestParam: sentdm.MutationRequestParam{},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/profiles/$PROFILE_ID \\\n    -X DELETE \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'profiles().delete',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.profiles.ProfileDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        client.profiles().delete("profileId");\n    }\n}',
      },
      php: {
        method: 'profiles->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->profiles->delete(\n  'profileId',\n  body: ['sandbox' => false],\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'profiles.delete',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nclient.profiles.delete(\n    profile_id="profileId",\n    body={},\n)',
      },
      ruby: {
        method: 'profiles.delete',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nresult = sent.profiles.delete("profileId", body: {})\n\nputs(result)',
      },
      typescript: {
        method: 'client.profiles.delete',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.profiles.delete('profileId', { body: {} });",
      },
    },
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
      "## retrieve\n\n`client.profiles.retrieve(profileId: string, x-profile-id?: string): { data?: profile_detail; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/profiles/{profileId}`\n\nRetrieves detailed information about a specific sender profile within an organization, including brand and KYC information if a brand has been configured.\n\n### Parameters\n\n- `profileId: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: object; billing_model?: string; brand?: object; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: { address?: string; email?: string; name?: string; phone?: string; }; billing_model?: string; brand?: { id?: string; business?: { city?: string; country?: string; country_of_registration?: string; entity_type?: string; legal_name?: string; postal_code?: string; state?: string; street?: string; tax_id?: string; tax_id_type?: string; url?: string; }; compliance?: { brand_relationship?: tcr_brand_relationship; destination_countries?: destination_country[]; expected_messaging_volume?: string; is_tcr_application?: boolean; notes?: string; phone_number_prefix?: string; primary_use_case?: string; vertical?: tcr_vertical; }; contact?: { business_name?: string; email?: string; name?: string; phone?: string; phone_country_code?: string; role?: string; }; created_at?: string; csp_id?: string; identity_status?: 'SELF_DECLARED' | 'UNVERIFIED' | 'VERIFIED' | 'VETTED_VERIFIED'; is_inherited?: boolean; status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'; submitted_at?: string; submitted_to_tcr?: boolean; tcr_brand_id?: string; universal_ein?: string; updated_at?: string; }; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseOfProfileDetail = await client.profiles.retrieve('profileId');\n\nconsole.log(apiResponseOfProfileDetail);\n```",
    perLanguage: {
      csharp: {
        method: 'Profiles.Retrieve',
        example:
          'ProfileRetrieveParams parameters = new() { ProfileID = "profileId" };\n\nvar apiResponseOfProfileDetail = await client.Profiles.Retrieve(parameters);\n\nConsole.WriteLine(apiResponseOfProfileDetail);',
      },
      go: {
        method: 'client.Profiles.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseOfProfileDetail, err := client.Profiles.Get(\n\t\tcontext.TODO(),\n\t\t"profileId",\n\t\tsentdm.ProfileGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseOfProfileDetail.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.sent.dm/v3/profiles/$PROFILE_ID \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'profiles().retrieve',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.profiles.ApiResponseOfProfileDetail;\nimport dm.sent.models.profiles.ProfileRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseOfProfileDetail apiResponseOfProfileDetail = client.profiles().retrieve("profileId");\n    }\n}',
      },
      php: {
        method: 'profiles->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseOfProfileDetail = $client->profiles->retrieve(\n  'profileId', xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'\n);\n\nvar_dump($apiResponseOfProfileDetail);",
      },
      python: {
        method: 'profiles.retrieve',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_of_profile_detail = client.profiles.retrieve(\n    profile_id="profileId",\n)\nprint(api_response_of_profile_detail.data)',
      },
      ruby: {
        method: 'profiles.retrieve',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_of_profile_detail = sent.profiles.retrieve("profileId")\n\nputs(api_response_of_profile_detail)',
      },
      typescript: {
        method: 'client.profiles.retrieve',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseOfProfileDetail = await client.profiles.retrieve('profileId');\n\nconsole.log(apiResponseOfProfileDetail.data);",
      },
    },
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
      "## update\n\n`client.profiles.update(profileId: string, allow_contact_sharing?: boolean, allow_number_change_during_onboarding?: boolean, allow_template_sharing?: boolean, billing_contact?: { email: string; name: string; address?: string; phone?: string; }, billing_model?: string, brand?: { compliance: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_brands_brand_compliance_info; contact: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_brands_brand_contact_info; business?: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_brands_brand_business_info; }, description?: string, icon?: string, inherit_contacts?: boolean, inherit_tcr_brand?: boolean, inherit_tcr_campaign?: boolean, inherit_templates?: boolean, name?: string, payment_details?: { card_number: string; cvc: string; expiry: string; zip_code: string; }, sandbox?: boolean, sending_phone_number?: string, sending_phone_number_profile_id?: string, sending_whatsapp_number_profile_id?: string, short_name?: string, whatsapp_phone_number?: string, Idempotency-Key?: string, x-profile-id?: string): { data?: profile_detail; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**patch** `/v3/profiles/{profileId}`\n\nUpdates a profile's configuration and settings. Requires admin role in the organization. Only provided fields will be updated (partial update).\n\n## Brand Management\n\nInclude the optional `brand` field to create or update the brand associated with this profile. The brand holds KYC and TCR compliance data (legal business info, contact details, messaging vertical). Once a brand has been submitted to TCR it cannot be modified. Setting `inherit_tcr_brand: true` and providing `brand` in the same request is not allowed.\n\n## Payment Details\n\nWhen `billing_model` is `\"profile\"` or `\"profile_and_organization\"` you may include a `payment_details` object containing the card number, expiry (MM/YY), CVC, and billing ZIP code. Payment details are **never stored** on our servers and are forwarded directly to the payment processor. Providing `payment_details` when `billing_model` is `\"organization\"` is not allowed.\n\n### Parameters\n\n- `profileId: string`\n\n- `allow_contact_sharing?: boolean`\n  Whether contacts are shared across profiles (optional)\n\n- `allow_number_change_during_onboarding?: boolean`\n  Whether number changes are allowed during onboarding (optional)\n\n- `allow_template_sharing?: boolean`\n  Whether templates are shared across profiles (optional)\n\n- `billing_contact?: { email: string; name: string; address?: string; phone?: string; }`\n  Billing contact information for a profile.\nRequired when billing_model is \"profile\" or \"profile_and_organization\".\n  - `email: string`\n    Email address where invoices will be sent (required)\n  - `name: string`\n    Full name of the billing contact or company (required)\n  - `address?: string`\n    Billing address (optional). Free-form text including street, city, state, postal code, and country.\n  - `phone?: string`\n    Phone number for the billing contact (optional)\n\n- `billing_model?: string`\n  Billing model: profile, organization, or profile_and_organization (optional).\n- \"organization\": the organization's billing details are used; no profile-level billing info needed.\n- \"profile\": the profile is billed independently; billing_contact is required.\n- \"profile_and_organization\": the profile is billed first with the organization as fallback; billing_contact is required.\n\n- `brand?: { compliance: { brandRelationship: tcr_brand_relationship; vertical: tcr_vertical; destinationCountries?: destination_country[]; expectedMessagingVolume?: string; isTcrApplication?: boolean; notes?: string; phoneNumberPrefix?: string; primaryUseCase?: string; }; contact: { name: string; businessName?: string; email?: string; phone?: string; phoneCountryCode?: string; role?: string; }; business?: { city?: string; country?: string; countryOfRegistration?: string; entityType?: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'SOLE_PROPRIETOR' | 'GOVERNMENT'; legalName?: string; postalCode?: string; state?: string; street?: string; taxId?: string; taxIdType?: string; url?: string; }; }`\n  Brand and KYC data grouped into contact, business, and compliance sections\n  - `compliance: { brandRelationship: 'BASIC_ACCOUNT' | 'MEDIUM_ACCOUNT' | 'LARGE_ACCOUNT' | 'SMALL_ACCOUNT' | 'KEY_ACCOUNT'; vertical: string; destinationCountries?: { id?: string; isMain?: boolean; }[]; expectedMessagingVolume?: string; isTcrApplication?: boolean; notes?: string; phoneNumberPrefix?: string; primaryUseCase?: string; }`\n    Compliance and TCR information for brand registration\n  - `contact: { name: string; businessName?: string; email?: string; phone?: string; phoneCountryCode?: string; role?: string; }`\n    Contact information for brand KYC\n  - `business?: { city?: string; country?: string; countryOfRegistration?: string; entityType?: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'SOLE_PROPRIETOR' | 'GOVERNMENT'; legalName?: string; postalCode?: string; state?: string; street?: string; taxId?: string; taxIdType?: string; url?: string; }`\n    Business details and address for brand KYC\n\n- `description?: string`\n  Profile description (optional)\n\n- `icon?: string`\n  Profile icon URL (optional)\n\n- `inherit_contacts?: boolean`\n  Whether this profile inherits contacts from organization (optional)\n\n- `inherit_tcr_brand?: boolean`\n  Whether this profile inherits TCR brand from organization (optional)\n\n- `inherit_tcr_campaign?: boolean`\n  Whether this profile inherits TCR campaign from organization (optional)\n\n- `inherit_templates?: boolean`\n  Whether this profile inherits templates from organization (optional)\n\n- `name?: string`\n  Profile name (optional)\n\n- `payment_details?: { card_number: string; cvc: string; expiry: string; zip_code: string; }`\n  Payment card details for a profile.\nAccepted when billing_model is \"profile\" or \"profile_and_organization\".\nThese details are not stored on our servers and will be forwarded to the payment processor.\n  - `card_number: string`\n    Card number (digits only, 13–19 characters)\n  - `cvc: string`\n    Card security code (3–4 digits)\n  - `expiry: string`\n    Card expiry date in MM/YY format (e.g. \"09/27\")\n  - `zip_code: string`\n    Billing ZIP / postal code associated with the card\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `sending_phone_number?: string`\n  Direct phone number for SMS sending (optional)\n\n- `sending_phone_number_profile_id?: string`\n  Reference to another profile to use for SMS/Telnyx configuration (optional)\n\n- `sending_whatsapp_number_profile_id?: string`\n  Reference to another profile to use for WhatsApp configuration (optional)\n\n- `short_name?: string`\n  Profile short name/abbreviation (optional). Must be 3–11 characters, contain only letters, numbers,\nand spaces, and include at least one letter. Example: \"SALES\", \"Mkt 2\", \"Support1\".\n\n- `whatsapp_phone_number?: string`\n  Direct phone number for WhatsApp sending (optional)\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: object; billing_model?: string; brand?: object; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; allow_contact_sharing?: boolean; allow_number_change_during_onboarding?: boolean; allow_template_sharing?: boolean; billing_contact?: { address?: string; email?: string; name?: string; phone?: string; }; billing_model?: string; brand?: { id?: string; business?: { city?: string; country?: string; country_of_registration?: string; entity_type?: string; legal_name?: string; postal_code?: string; state?: string; street?: string; tax_id?: string; tax_id_type?: string; url?: string; }; compliance?: { brand_relationship?: tcr_brand_relationship; destination_countries?: destination_country[]; expected_messaging_volume?: string; is_tcr_application?: boolean; notes?: string; phone_number_prefix?: string; primary_use_case?: string; vertical?: tcr_vertical; }; contact?: { business_name?: string; email?: string; name?: string; phone?: string; phone_country_code?: string; role?: string; }; created_at?: string; csp_id?: string; identity_status?: 'SELF_DECLARED' | 'UNVERIFIED' | 'VERIFIED' | 'VETTED_VERIFIED'; is_inherited?: boolean; status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'; submitted_at?: string; submitted_to_tcr?: boolean; tcr_brand_id?: string; universal_ein?: string; updated_at?: string; }; created_at?: string; description?: string; email?: string; icon?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; name?: string; organization_id?: string; sending_phone_number?: string; sending_phone_number_profile_id?: string; sending_whatsapp_number_profile_id?: string; short_name?: string; status?: string; updated_at?: string; waba_id?: string; whatsapp_phone_number?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseOfProfileDetail = await client.profiles.update('profileId');\n\nconsole.log(apiResponseOfProfileDetail);\n```",
    perLanguage: {
      csharp: {
        method: 'Profiles.Update',
        example:
          'ProfileUpdateParams parameters = new() { ProfileID = "profileId" };\n\nvar apiResponseOfProfileDetail = await client.Profiles.Update(parameters);\n\nConsole.WriteLine(apiResponseOfProfileDetail);',
      },
      go: {
        method: 'client.Profiles.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseOfProfileDetail, err := client.Profiles.Update(\n\t\tcontext.TODO(),\n\t\t"profileId",\n\t\tsentdm.ProfileUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseOfProfileDetail.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/profiles/$PROFILE_ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "allow_contact_sharing": true,\n          "billing_model": "organization",\n          "description": "Updated sales department sender profile",\n          "name": "Sales Team - Updated",\n          "short_name": "SALES"\n        }\'',
      },
      java: {
        method: 'profiles().update',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.profiles.ApiResponseOfProfileDetail;\nimport dm.sent.models.profiles.ProfileUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseOfProfileDetail apiResponseOfProfileDetail = client.profiles().update("profileId");\n    }\n}',
      },
      php: {
        method: 'profiles->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseOfProfileDetail = $client->profiles->update(\n  'profileId',\n  allowContactSharing: true,\n  allowNumberChangeDuringOnboarding: null,\n  allowTemplateSharing: null,\n  billingContact: [\n    'email' => 'dev@stainless.com',\n    'name' => 'x',\n    'address' => 'address',\n    'phone' => 'phone',\n  ],\n  billingModel: 'organization',\n  brand: [\n    'compliance' => [\n      'brandRelationship' => TcrBrandRelationship::SMALL_ACCOUNT,\n      'vertical' => TcrVertical::PROFESSIONAL,\n      'destinationCountries' => [['id' => 'US', 'isMain' => false]],\n      'expectedMessagingVolume' => '10000',\n      'isTcrApplication' => true,\n      'notes' => null,\n      'phoneNumberPrefix' => '+1',\n      'primaryUseCase' => 'Customer notifications and appointment reminders',\n    ],\n    'contact' => [\n      'name' => 'John Smith',\n      'businessName' => 'Acme Corp',\n      'email' => 'john@acmecorp.com',\n      'phone' => '+12025551234',\n      'phoneCountryCode' => '1',\n      'role' => 'CEO',\n    ],\n    'business' => [\n      'city' => 'New York',\n      'country' => 'US',\n      'countryOfRegistration' => 'US',\n      'entityType' => 'PRIVATE_PROFIT',\n      'legalName' => 'Acme Corporation LLC',\n      'postalCode' => '10001',\n      'state' => 'NY',\n      'street' => '123 Main Street',\n      'taxID' => '12-3456789',\n      'taxIDType' => 'us_ein',\n      'url' => 'https://acmecorp.com',\n    ],\n  ],\n  description: 'Updated sales department sender profile',\n  icon: null,\n  inheritContacts: null,\n  inheritTcrBrand: null,\n  inheritTcrCampaign: null,\n  inheritTemplates: null,\n  name: 'Sales Team - Updated',\n  paymentDetails: [\n    'cardNumber' => '3216699102256101',\n    'cvc' => '3216',\n    'expiry' => '11/66',\n    'zipCode' => 'x',\n  ],\n  sandbox: false,\n  sendingPhoneNumber: null,\n  sendingPhoneNumberProfileID: null,\n  sendingWhatsappNumberProfileID: null,\n  shortName: 'SALES',\n  whatsappPhoneNumber: null,\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseOfProfileDetail);",
      },
      python: {
        method: 'profiles.update',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_of_profile_detail = client.profiles.update(\n    profile_id="profileId",\n)\nprint(api_response_of_profile_detail.data)',
      },
      ruby: {
        method: 'profiles.update',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_of_profile_detail = sent.profiles.update("profileId")\n\nputs(api_response_of_profile_detail)',
      },
      typescript: {
        method: 'client.profiles.update',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseOfProfileDetail = await client.profiles.update('profileId');\n\nconsole.log(apiResponseOfProfileDetail.data);",
      },
    },
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
      "## create\n\n`client.profiles.campaigns.create(profileId: string, campaign: { description: string; name: string; type: string; useCases: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_campaigns_campaign_use_case_data[]; helpKeywords?: string; helpMessage?: string; messageFlow?: string; optinKeywords?: string; optinMessage?: string; optoutKeywords?: string; optoutMessage?: string; privacyPolicyLink?: string; termsAndConditionsLink?: string; }, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: tcr_campaign_with_use_cases; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/profiles/{profileId}/campaigns`\n\nCreates a new campaign scoped under the brand of the specified profile. Each campaign must include at least one use case with sample messages.\n\n### Parameters\n\n- `profileId: string`\n\n- `campaign: { description: string; name: string; type: string; useCases: { messagingUseCaseUs: messaging_use_case_us; sampleMessages: string[]; }[]; helpKeywords?: string; helpMessage?: string; messageFlow?: string; optinKeywords?: string; optinMessage?: string; optoutKeywords?: string; optoutMessage?: string; privacyPolicyLink?: string; termsAndConditionsLink?: string; }`\n  Campaign data for create or update operation\n  - `description: string`\n    Campaign description\n  - `name: string`\n    Campaign name\n  - `type: string`\n    Campaign type (e.g., \"KYC\", \"App\")\n  - `useCases: { messagingUseCaseUs: string; sampleMessages: string[]; }[]`\n    List of use cases with sample messages\n  - `helpKeywords?: string`\n    Comma-separated keywords that trigger help message (e.g., \"HELP, INFO, SUPPORT\")\n  - `helpMessage?: string`\n    Message sent when user requests help\n  - `messageFlow?: string`\n    Description of how messages flow in the campaign\n  - `optinKeywords?: string`\n    Comma-separated keywords that trigger opt-in (e.g., \"YES, START, SUBSCRIBE\")\n  - `optinMessage?: string`\n    Message sent when user opts in\n  - `optoutKeywords?: string`\n    Comma-separated keywords that trigger opt-out (e.g., \"STOP, UNSUBSCRIBE, END\")\n  - `optoutMessage?: string`\n    Message sent when user opts out\n  - `privacyPolicyLink?: string`\n    URL to privacy policy\n  - `termsAndConditionsLink?: string`\n    URL to terms and conditions\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: object; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; createdAt?: string; updatedAt?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseOfTcrCampaignWithUseCases = await client.profiles.campaigns.create('770e8400-e29b-41d4-a716-446655440002', { campaign: {\n  description: 'Appointment reminders and account notifications',\n  name: 'Customer Notifications',\n  type: 'App',\n  useCases: [{ messagingUseCaseUs: 'ACCOUNT_NOTIFICATION', sampleMessages: ['Hi {name}, your appointment is confirmed for {date} at {time}.', 'Your order #{order_id} has been shipped. Track at {url}'] }],\n} });\n\nconsole.log(apiResponseOfTcrCampaignWithUseCases);\n```",
    perLanguage: {
      csharp: {
        method: 'Profiles.Campaigns.Create',
        example:
          'CampaignCreateParams parameters = new()\n{\n    ProfileID = "770e8400-e29b-41d4-a716-446655440002",\n    Campaign = new()\n    {\n        Description = "Appointment reminders and account notifications",\n        Name = "Customer Notifications",\n        Type = "App",\n        UseCases =\n        [\n            new()\n            {\n                MessagingUseCaseUs = MessagingUseCaseUs.AccountNotification,\n                SampleMessages =\n                [\n                    "Hi {name}, your appointment is confirmed for {date} at {time}.",\n                    "Your order #{order_id} has been shipped. Track at {url}",\n                ],\n            },\n        ],\n        HelpKeywords = "HELP, INFO, SUPPORT",\n        HelpMessage = "Reply STOP to unsubscribe or contact support@acmecorp.com",\n        MessageFlow = "User signs up on website and opts in to receive SMS notifications",\n        OptinKeywords = "YES, START, SUBSCRIBE",\n        OptinMessage = "You have opted in to Acme Corp notifications. Reply STOP to opt out.",\n        OptoutKeywords = "STOP, UNSUBSCRIBE, END",\n        OptoutMessage = "You have been unsubscribed. Reply START to opt back in.",\n        PrivacyPolicyLink = "https://acmecorp.com/privacy",\n        TermsAndConditionsLink = "https://acmecorp.com/terms",\n    },\n};\n\nvar apiResponseOfTcrCampaignWithUseCases = await client.Profiles.Campaigns.Create(parameters);\n\nConsole.WriteLine(apiResponseOfTcrCampaignWithUseCases);',
      },
      go: {
        method: 'client.Profiles.Campaigns.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseOfTcrCampaignWithUseCases, err := client.Profiles.Campaigns.New(\n\t\tcontext.TODO(),\n\t\t"770e8400-e29b-41d4-a716-446655440002",\n\t\tsentdm.ProfileCampaignNewParams{\n\t\t\tCampaign: sentdm.CampaignDataParam{\n\t\t\t\tDescription: "Appointment reminders and account notifications",\n\t\t\t\tName:        "Customer Notifications",\n\t\t\t\tType:        "App",\n\t\t\t\tUseCases: []sentdm.SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseDataParam{{\n\t\t\t\t\tMessagingUseCaseUs: sentdm.MessagingUseCaseUsAccountNotification,\n\t\t\t\t\tSampleMessages:     []string{"Hi {name}, your appointment is confirmed for {date} at {time}.", "Your order #{order_id} has been shipped. Track at {url}"},\n\t\t\t\t}},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseOfTcrCampaignWithUseCases.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/profiles/$PROFILE_ID/campaigns \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "campaign": {\n            "description": "Appointment reminders and account notifications",\n            "name": "Customer Notifications",\n            "type": "App",\n            "useCases": [\n              {\n                "messagingUseCaseUs": "ACCOUNT_NOTIFICATION",\n                "sampleMessages": [\n                  "Hi {name}, your appointment is confirmed for {date} at {time}.",\n                  "Your order #{order_id} has been shipped. Track at {url}"\n                ]\n              }\n            ],\n            "helpKeywords": "HELP, INFO, SUPPORT",\n            "helpMessage": "Reply STOP to unsubscribe or contact support@acmecorp.com",\n            "messageFlow": "User signs up on website and opts in to receive SMS notifications",\n            "optinKeywords": "YES, START, SUBSCRIBE",\n            "optinMessage": "You have opted in to Acme Corp notifications. Reply STOP to opt out.",\n            "optoutKeywords": "STOP, UNSUBSCRIBE, END",\n            "optoutMessage": "You have been unsubscribed. Reply START to opt back in.",\n            "privacyPolicyLink": "https://acmecorp.com/privacy",\n            "termsAndConditionsLink": "https://acmecorp.com/terms"\n          }\n        }\'',
      },
      java: {
        method: 'profiles().campaigns().create',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.profiles.campaigns.ApiResponseOfTcrCampaignWithUseCases;\nimport dm.sent.models.profiles.campaigns.CampaignCreateParams;\nimport dm.sent.models.profiles.campaigns.CampaignData;\nimport dm.sent.models.profiles.campaigns.MessagingUseCaseUs;\nimport dm.sent.models.profiles.campaigns.SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseData;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        CampaignCreateParams params = CampaignCreateParams.builder()\n            .profileId("770e8400-e29b-41d4-a716-446655440002")\n            .campaign(CampaignData.builder()\n                .description("Appointment reminders and account notifications")\n                .name("Customer Notifications")\n                .type("App")\n                .addUseCase(SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseData.builder()\n                    .messagingUseCaseUs(MessagingUseCaseUs.ACCOUNT_NOTIFICATION)\n                    .addSampleMessage("Hi {name}, your appointment is confirmed for {date} at {time}.")\n                    .addSampleMessage("Your order #{order_id} has been shipped. Track at {url}")\n                    .build())\n                .build())\n            .build();\n        ApiResponseOfTcrCampaignWithUseCases apiResponseOfTcrCampaignWithUseCases = client.profiles().campaigns().create(params);\n    }\n}',
      },
      php: {
        method: 'profiles->campaigns->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseOfTcrCampaignWithUseCases = $client->profiles->campaigns->create(\n  '770e8400-e29b-41d4-a716-446655440002',\n  campaign: [\n    'description' => 'Appointment reminders and account notifications',\n    'name' => 'Customer Notifications',\n    'type' => 'App',\n    'useCases' => [\n      [\n        'messagingUseCaseUs' => MessagingUseCaseUs::ACCOUNT_NOTIFICATION,\n        'sampleMessages' => [\n          'Hi {name}, your appointment is confirmed for {date} at {time}.',\n          'Your order #{order_id} has been shipped. Track at {url}',\n        ],\n      ],\n    ],\n    'helpKeywords' => 'HELP, INFO, SUPPORT',\n    'helpMessage' => 'Reply STOP to unsubscribe or contact support@acmecorp.com',\n    'messageFlow' => 'User signs up on website and opts in to receive SMS notifications',\n    'optinKeywords' => 'YES, START, SUBSCRIBE',\n    'optinMessage' => 'You have opted in to Acme Corp notifications. Reply STOP to opt out.',\n    'optoutKeywords' => 'STOP, UNSUBSCRIBE, END',\n    'optoutMessage' => 'You have been unsubscribed. Reply START to opt back in.',\n    'privacyPolicyLink' => 'https://acmecorp.com/privacy',\n    'termsAndConditionsLink' => 'https://acmecorp.com/terms',\n  ],\n  sandbox: false,\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseOfTcrCampaignWithUseCases);",
      },
      python: {
        method: 'profiles.campaigns.create',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_of_tcr_campaign_with_use_cases = client.profiles.campaigns.create(\n    profile_id="770e8400-e29b-41d4-a716-446655440002",\n    campaign={\n        "description": "Appointment reminders and account notifications",\n        "name": "Customer Notifications",\n        "type": "App",\n        "use_cases": [{\n            "messaging_use_case_us": "ACCOUNT_NOTIFICATION",\n            "sample_messages": ["Hi {name}, your appointment is confirmed for {date} at {time}.", "Your order #{order_id} has been shipped. Track at {url}"],\n        }],\n    },\n)\nprint(api_response_of_tcr_campaign_with_use_cases.data)',
      },
      ruby: {
        method: 'profiles.campaigns.create',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_of_tcr_campaign_with_use_cases = sent.profiles.campaigns.create(\n  "770e8400-e29b-41d4-a716-446655440002",\n  campaign: {\n    description: "Appointment reminders and account notifications",\n    name: "Customer Notifications",\n    type: "App",\n    useCases: [\n      {\n        messagingUseCaseUs: :ACCOUNT_NOTIFICATION,\n        sampleMessages: [\n          "Hi {name}, your appointment is confirmed for {date} at {time}.",\n          "Your order \\#{order_id} has been shipped. Track at {url}"\n        ]\n      }\n    ]\n  }\n)\n\nputs(api_response_of_tcr_campaign_with_use_cases)',
      },
      typescript: {
        method: 'client.profiles.campaigns.create',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseOfTcrCampaignWithUseCases = await client.profiles.campaigns.create(\n  '770e8400-e29b-41d4-a716-446655440002',\n  {\n    campaign: {\n      description: 'Appointment reminders and account notifications',\n      name: 'Customer Notifications',\n      type: 'App',\n      useCases: [\n        {\n          messagingUseCaseUs: 'ACCOUNT_NOTIFICATION',\n          sampleMessages: [\n            'Hi {name}, your appointment is confirmed for {date} at {time}.',\n            'Your order #{order_id} has been shipped. Track at {url}',\n          ],\n        },\n      ],\n    },\n  },\n);\n\nconsole.log(apiResponseOfTcrCampaignWithUseCases.data);",
      },
    },
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
      "## list\n\n`client.profiles.campaigns.list(profileId: string, x-profile-id?: string): { data?: tcr_campaign_with_use_cases[]; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/profiles/{profileId}/campaigns`\n\nRetrieves all campaigns linked to the profile's brand, including use cases and sample messages. Returns inherited campaigns if inherit_tcr_campaign=true.\n\n### Parameters\n\n- `profileId: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: object[]; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; createdAt?: string; updatedAt?: string; }[]`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst campaigns = await client.profiles.campaigns.list('770e8400-e29b-41d4-a716-446655440002');\n\nconsole.log(campaigns);\n```",
    perLanguage: {
      csharp: {
        method: 'Profiles.Campaigns.List',
        example:
          'CampaignListParams parameters = new()\n{\n    ProfileID = "770e8400-e29b-41d4-a716-446655440002"\n};\n\nvar campaigns = await client.Profiles.Campaigns.List(parameters);\n\nConsole.WriteLine(campaigns);',
      },
      go: {
        method: 'client.Profiles.Campaigns.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcampaigns, err := client.Profiles.Campaigns.List(\n\t\tcontext.TODO(),\n\t\t"770e8400-e29b-41d4-a716-446655440002",\n\t\tsentdm.ProfileCampaignListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", campaigns.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/profiles/$PROFILE_ID/campaigns \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'profiles().campaigns().list',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.profiles.campaigns.CampaignListParams;\nimport dm.sent.models.profiles.campaigns.CampaignListResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        CampaignListResponse campaigns = client.profiles().campaigns().list("770e8400-e29b-41d4-a716-446655440002");\n    }\n}',
      },
      php: {
        method: 'profiles->campaigns->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$campaigns = $client->profiles->campaigns->list(\n  '770e8400-e29b-41d4-a716-446655440002',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($campaigns);",
      },
      python: {
        method: 'profiles.campaigns.list',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\ncampaigns = client.profiles.campaigns.list(\n    profile_id="770e8400-e29b-41d4-a716-446655440002",\n)\nprint(campaigns.data)',
      },
      ruby: {
        method: 'profiles.campaigns.list',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\ncampaigns = sent.profiles.campaigns.list("770e8400-e29b-41d4-a716-446655440002")\n\nputs(campaigns)',
      },
      typescript: {
        method: 'client.profiles.campaigns.list',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst campaigns = await client.profiles.campaigns.list('770e8400-e29b-41d4-a716-446655440002');\n\nconsole.log(campaigns.data);",
      },
    },
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
      "## delete\n\n`client.profiles.campaigns.delete(profileId: string, campaignId: string, body: { sandbox?: boolean; }, x-profile-id?: string): void`\n\n**delete** `/v3/profiles/{profileId}/campaigns/{campaignId}`\n\nDeletes a campaign by ID from the brand of the specified profile. The profile must belong to the authenticated organization.\n\n### Parameters\n\n- `profileId: string`\n\n- `campaignId: string`\n\n- `body: { sandbox?: boolean; }`\n  Request to delete a campaign from a brand\n\n- `x-profile-id?: string`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nawait client.profiles.campaigns.delete('b2c3d4e5-f6a7-8901-bcde-f12345678901', {\n  profileId: '770e8400-e29b-41d4-a716-446655440002',\n  body: {},\n})\n```",
    perLanguage: {
      csharp: {
        method: 'Profiles.Campaigns.Delete',
        example:
          'CampaignDeleteParams parameters = new()\n{\n    ProfileID = "770e8400-e29b-41d4-a716-446655440002",\n    CampaignID = "b2c3d4e5-f6a7-8901-bcde-f12345678901",\n    Body = new() { Sandbox = false },\n};\n\nawait client.Profiles.Campaigns.Delete(parameters);',
      },
      go: {
        method: 'client.Profiles.Campaigns.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Profiles.Campaigns.Delete(\n\t\tcontext.TODO(),\n\t\t"b2c3d4e5-f6a7-8901-bcde-f12345678901",\n\t\tsentdm.ProfileCampaignDeleteParams{\n\t\t\tProfileID: "770e8400-e29b-41d4-a716-446655440002",\n\t\t\tBody: sentdm.ProfileCampaignDeleteParamsBody{\n\t\t\t\tMutationRequestParam: sentdm.MutationRequestParam{},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/profiles/$PROFILE_ID/campaigns/$CAMPAIGN_ID \\\n    -X DELETE \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'profiles().campaigns().delete',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.profiles.campaigns.CampaignDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        CampaignDeleteParams params = CampaignDeleteParams.builder()\n            .profileId("770e8400-e29b-41d4-a716-446655440002")\n            .campaignId("b2c3d4e5-f6a7-8901-bcde-f12345678901")\n            .build();\n        client.profiles().campaigns().delete(params);\n    }\n}',
      },
      php: {
        method: 'profiles->campaigns->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->profiles->campaigns->delete(\n  'b2c3d4e5-f6a7-8901-bcde-f12345678901',\n  profileID: '770e8400-e29b-41d4-a716-446655440002',\n  body: ['sandbox' => false],\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'profiles.campaigns.delete',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nclient.profiles.campaigns.delete(\n    campaign_id="b2c3d4e5-f6a7-8901-bcde-f12345678901",\n    profile_id="770e8400-e29b-41d4-a716-446655440002",\n    body={},\n)',
      },
      ruby: {
        method: 'profiles.campaigns.delete',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nresult = sent.profiles.campaigns.delete(\n  "b2c3d4e5-f6a7-8901-bcde-f12345678901",\n  profile_id: "770e8400-e29b-41d4-a716-446655440002",\n  body: {}\n)\n\nputs(result)',
      },
      typescript: {
        method: 'client.profiles.campaigns.delete',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.profiles.campaigns.delete('b2c3d4e5-f6a7-8901-bcde-f12345678901', {\n  profileId: '770e8400-e29b-41d4-a716-446655440002',\n  body: {},\n});",
      },
    },
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
      "## update\n\n`client.profiles.campaigns.update(profileId: string, campaignId: string, campaign: { description: string; name: string; type: string; useCases: sent_dm_services_endpoints_customer_ap_iv3_contracts_requests_campaigns_campaign_use_case_data[]; helpKeywords?: string; helpMessage?: string; messageFlow?: string; optinKeywords?: string; optinMessage?: string; optoutKeywords?: string; optoutMessage?: string; privacyPolicyLink?: string; termsAndConditionsLink?: string; }, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: tcr_campaign_with_use_cases; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**put** `/v3/profiles/{profileId}/campaigns/{campaignId}`\n\nUpdates an existing campaign under the brand of the specified profile. Cannot update campaigns that have already been submitted to TCR.\n\n### Parameters\n\n- `profileId: string`\n\n- `campaignId: string`\n\n- `campaign: { description: string; name: string; type: string; useCases: { messagingUseCaseUs: messaging_use_case_us; sampleMessages: string[]; }[]; helpKeywords?: string; helpMessage?: string; messageFlow?: string; optinKeywords?: string; optinMessage?: string; optoutKeywords?: string; optoutMessage?: string; privacyPolicyLink?: string; termsAndConditionsLink?: string; }`\n  Campaign data for create or update operation\n  - `description: string`\n    Campaign description\n  - `name: string`\n    Campaign name\n  - `type: string`\n    Campaign type (e.g., \"KYC\", \"App\")\n  - `useCases: { messagingUseCaseUs: string; sampleMessages: string[]; }[]`\n    List of use cases with sample messages\n  - `helpKeywords?: string`\n    Comma-separated keywords that trigger help message (e.g., \"HELP, INFO, SUPPORT\")\n  - `helpMessage?: string`\n    Message sent when user requests help\n  - `messageFlow?: string`\n    Description of how messages flow in the campaign\n  - `optinKeywords?: string`\n    Comma-separated keywords that trigger opt-in (e.g., \"YES, START, SUBSCRIBE\")\n  - `optinMessage?: string`\n    Message sent when user opts in\n  - `optoutKeywords?: string`\n    Comma-separated keywords that trigger opt-out (e.g., \"STOP, UNSUBSCRIBE, END\")\n  - `optoutMessage?: string`\n    Message sent when user opts out\n  - `privacyPolicyLink?: string`\n    URL to privacy policy\n  - `termsAndConditionsLink?: string`\n    URL to terms and conditions\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: object; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; createdAt?: string; updatedAt?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseOfTcrCampaignWithUseCases = await client.profiles.campaigns.update('b2c3d4e5-f6a7-8901-bcde-f12345678901', {\n  profileId: '770e8400-e29b-41d4-a716-446655440002',\n  campaign: {\n  description: 'Updated appointment reminders and account notifications',\n  name: 'Customer Notifications Updated',\n  type: 'App',\n  useCases: [{ messagingUseCaseUs: 'ACCOUNT_NOTIFICATION', sampleMessages: ['Hi {name}, your appointment is confirmed for {date} at {time}.', 'Your order #{order_id} has been shipped. Track at {url}'] }],\n},\n});\n\nconsole.log(apiResponseOfTcrCampaignWithUseCases);\n```",
    perLanguage: {
      csharp: {
        method: 'Profiles.Campaigns.Update',
        example:
          'CampaignUpdateParams parameters = new()\n{\n    ProfileID = "770e8400-e29b-41d4-a716-446655440002",\n    CampaignID = "b2c3d4e5-f6a7-8901-bcde-f12345678901",\n    Campaign = new()\n    {\n        Description = "Updated appointment reminders and account notifications",\n        Name = "Customer Notifications Updated",\n        Type = "App",\n        UseCases =\n        [\n            new()\n            {\n                MessagingUseCaseUs = MessagingUseCaseUs.AccountNotification,\n                SampleMessages =\n                [\n                    "Hi {name}, your appointment is confirmed for {date} at {time}.",\n                    "Your order #{order_id} has been shipped. Track at {url}",\n                ],\n            },\n        ],\n        HelpKeywords = null,\n        HelpMessage = null,\n        MessageFlow = "User signs up on website and opts in to receive SMS notifications",\n        OptinKeywords = null,\n        OptinMessage = null,\n        OptoutKeywords = null,\n        OptoutMessage = null,\n        PrivacyPolicyLink = null,\n        TermsAndConditionsLink = null,\n    },\n};\n\nvar apiResponseOfTcrCampaignWithUseCases = await client.Profiles.Campaigns.Update(parameters);\n\nConsole.WriteLine(apiResponseOfTcrCampaignWithUseCases);',
      },
      go: {
        method: 'client.Profiles.Campaigns.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseOfTcrCampaignWithUseCases, err := client.Profiles.Campaigns.Update(\n\t\tcontext.TODO(),\n\t\t"b2c3d4e5-f6a7-8901-bcde-f12345678901",\n\t\tsentdm.ProfileCampaignUpdateParams{\n\t\t\tProfileID: "770e8400-e29b-41d4-a716-446655440002",\n\t\t\tCampaign: sentdm.CampaignDataParam{\n\t\t\t\tDescription: "Updated appointment reminders and account notifications",\n\t\t\t\tName:        "Customer Notifications Updated",\n\t\t\t\tType:        "App",\n\t\t\t\tUseCases: []sentdm.SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseDataParam{{\n\t\t\t\t\tMessagingUseCaseUs: sentdm.MessagingUseCaseUsAccountNotification,\n\t\t\t\t\tSampleMessages:     []string{"Hi {name}, your appointment is confirmed for {date} at {time}.", "Your order #{order_id} has been shipped. Track at {url}"},\n\t\t\t\t}},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseOfTcrCampaignWithUseCases.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/profiles/$PROFILE_ID/campaigns/$CAMPAIGN_ID \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "campaign": {\n            "description": "Updated appointment reminders and account notifications",\n            "name": "Customer Notifications Updated",\n            "type": "App",\n            "useCases": [\n              {\n                "messagingUseCaseUs": "ACCOUNT_NOTIFICATION",\n                "sampleMessages": [\n                  "Hi {name}, your appointment is confirmed for {date} at {time}.",\n                  "Your order #{order_id} has been shipped. Track at {url}"\n                ]\n              }\n            ],\n            "helpKeywords": null,\n            "helpMessage": null,\n            "messageFlow": "User signs up on website and opts in to receive SMS notifications",\n            "optinKeywords": null,\n            "optinMessage": null,\n            "optoutKeywords": null,\n            "optoutMessage": null,\n            "privacyPolicyLink": null,\n            "termsAndConditionsLink": null\n          }\n        }\'',
      },
      java: {
        method: 'profiles().campaigns().update',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.profiles.campaigns.ApiResponseOfTcrCampaignWithUseCases;\nimport dm.sent.models.profiles.campaigns.CampaignData;\nimport dm.sent.models.profiles.campaigns.CampaignUpdateParams;\nimport dm.sent.models.profiles.campaigns.MessagingUseCaseUs;\nimport dm.sent.models.profiles.campaigns.SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseData;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        CampaignUpdateParams params = CampaignUpdateParams.builder()\n            .profileId("770e8400-e29b-41d4-a716-446655440002")\n            .campaignId("b2c3d4e5-f6a7-8901-bcde-f12345678901")\n            .campaign(CampaignData.builder()\n                .description("Updated appointment reminders and account notifications")\n                .name("Customer Notifications Updated")\n                .type("App")\n                .addUseCase(SentDmServicesEndpointsCustomerApIv3ContractsRequestsCampaignsCampaignUseCaseData.builder()\n                    .messagingUseCaseUs(MessagingUseCaseUs.ACCOUNT_NOTIFICATION)\n                    .addSampleMessage("Hi {name}, your appointment is confirmed for {date} at {time}.")\n                    .addSampleMessage("Your order #{order_id} has been shipped. Track at {url}")\n                    .build())\n                .build())\n            .build();\n        ApiResponseOfTcrCampaignWithUseCases apiResponseOfTcrCampaignWithUseCases = client.profiles().campaigns().update(params);\n    }\n}',
      },
      php: {
        method: 'profiles->campaigns->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseOfTcrCampaignWithUseCases = $client->profiles->campaigns->update(\n  'b2c3d4e5-f6a7-8901-bcde-f12345678901',\n  profileID: '770e8400-e29b-41d4-a716-446655440002',\n  campaign: [\n    'description' => 'Updated appointment reminders and account notifications',\n    'name' => 'Customer Notifications Updated',\n    'type' => 'App',\n    'useCases' => [\n      [\n        'messagingUseCaseUs' => MessagingUseCaseUs::ACCOUNT_NOTIFICATION,\n        'sampleMessages' => [\n          'Hi {name}, your appointment is confirmed for {date} at {time}.',\n          'Your order #{order_id} has been shipped. Track at {url}',\n        ],\n      ],\n    ],\n    'helpKeywords' => null,\n    'helpMessage' => null,\n    'messageFlow' => 'User signs up on website and opts in to receive SMS notifications',\n    'optinKeywords' => null,\n    'optinMessage' => null,\n    'optoutKeywords' => null,\n    'optoutMessage' => null,\n    'privacyPolicyLink' => null,\n    'termsAndConditionsLink' => null,\n  ],\n  sandbox: false,\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseOfTcrCampaignWithUseCases);",
      },
      python: {
        method: 'profiles.campaigns.update',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_of_tcr_campaign_with_use_cases = client.profiles.campaigns.update(\n    campaign_id="b2c3d4e5-f6a7-8901-bcde-f12345678901",\n    profile_id="770e8400-e29b-41d4-a716-446655440002",\n    campaign={\n        "description": "Updated appointment reminders and account notifications",\n        "name": "Customer Notifications Updated",\n        "type": "App",\n        "use_cases": [{\n            "messaging_use_case_us": "ACCOUNT_NOTIFICATION",\n            "sample_messages": ["Hi {name}, your appointment is confirmed for {date} at {time}.", "Your order #{order_id} has been shipped. Track at {url}"],\n        }],\n    },\n)\nprint(api_response_of_tcr_campaign_with_use_cases.data)',
      },
      ruby: {
        method: 'profiles.campaigns.update',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_of_tcr_campaign_with_use_cases = sent.profiles.campaigns.update(\n  "b2c3d4e5-f6a7-8901-bcde-f12345678901",\n  profile_id: "770e8400-e29b-41d4-a716-446655440002",\n  campaign: {\n    description: "Updated appointment reminders and account notifications",\n    name: "Customer Notifications Updated",\n    type: "App",\n    useCases: [\n      {\n        messagingUseCaseUs: :ACCOUNT_NOTIFICATION,\n        sampleMessages: [\n          "Hi {name}, your appointment is confirmed for {date} at {time}.",\n          "Your order \\#{order_id} has been shipped. Track at {url}"\n        ]\n      }\n    ]\n  }\n)\n\nputs(api_response_of_tcr_campaign_with_use_cases)',
      },
      typescript: {
        method: 'client.profiles.campaigns.update',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseOfTcrCampaignWithUseCases = await client.profiles.campaigns.update(\n  'b2c3d4e5-f6a7-8901-bcde-f12345678901',\n  {\n    profileId: '770e8400-e29b-41d4-a716-446655440002',\n    campaign: {\n      description: 'Updated appointment reminders and account notifications',\n      name: 'Customer Notifications Updated',\n      type: 'App',\n      useCases: [\n        {\n          messagingUseCaseUs: 'ACCOUNT_NOTIFICATION',\n          sampleMessages: [\n            'Hi {name}, your appointment is confirmed for {date} at {time}.',\n            'Your order #{order_id} has been shipped. Track at {url}',\n          ],\n        },\n      ],\n    },\n  },\n);\n\nconsole.log(apiResponseOfTcrCampaignWithUseCases.data);",
      },
    },
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
      "## lookup\n\n`client.numbers.lookup(phoneNumber: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/numbers/lookup/{phoneNumber}`\n\nRetrieves detailed information about a phone number including carrier, line type, porting status, and VoIP detection. Uses the customer's messaging provider for rich data, with fallback to the internal index.\n\n### Parameters\n\n- `phoneNumber: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { carrier_name?: string; country_code?: string; is_ported?: boolean; is_valid?: boolean; is_voip?: boolean; line_type?: string; mobile_country_code?: string; mobile_network_code?: string; phone_number?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { carrier_name?: string; country_code?: string; is_ported?: boolean; is_valid?: boolean; is_voip?: boolean; line_type?: string; mobile_country_code?: string; mobile_network_code?: string; phone_number?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst response = await client.numbers.lookup('+12025551234');\n\nconsole.log(response);\n```",
    perLanguage: {
      csharp: {
        method: 'Numbers.Lookup',
        example:
          'NumberLookupParams parameters = new() { PhoneNumber = "+12025551234" };\n\nvar response = await client.Numbers.Lookup(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Numbers.Lookup',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Numbers.Lookup(\n\t\tcontext.TODO(),\n\t\t"+12025551234",\n\t\tsentdm.NumberLookupParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/numbers/lookup/$PHONE_NUMBER \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'numbers().lookup',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.numbers.NumberLookupParams;\nimport dm.sent.models.numbers.NumberLookupResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        NumberLookupResponse response = client.numbers().lookup("+12025551234");\n    }\n}',
      },
      php: {
        method: 'numbers->lookup',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->numbers->lookup(\n  '+12025551234', xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'numbers.lookup',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.numbers.lookup(\n    phone_number="+12025551234",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'numbers.lookup',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nresponse = sent.numbers.lookup("+12025551234")\n\nputs(response)',
      },
      typescript: {
        method: 'client.numbers.lookup',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.numbers.lookup('+12025551234');\n\nconsole.log(response.data);",
      },
    },
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
      "## retrieve_activities\n\n`client.messages.retrieveActivities(id: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/messages/{id}/activities`\n\nRetrieves the activity log for a specific message. Activities track the message lifecycle including acceptance, processing, sending, delivery, and any errors.\n\n### Parameters\n\n- `id: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { activities?: { active_contact_price?: string; description?: string; price?: string; status?: string; timestamp?: string; }[]; message_id?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { activities?: { active_contact_price?: string; description?: string; price?: string; status?: string; timestamp?: string; }[]; message_id?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst response = await client.messages.retrieveActivities('8ba7b830-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(response);\n```",
    perLanguage: {
      csharp: {
        method: 'Messages.RetrieveActivities',
        example:
          'MessageRetrieveActivitiesParams parameters = new()\n{\n    ID = "8ba7b830-9dad-11d1-80b4-00c04fd430c8"\n};\n\nvar response = await client.Messages.RetrieveActivities(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Messages.GetActivities',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Messages.GetActivities(\n\t\tcontext.TODO(),\n\t\t"8ba7b830-9dad-11d1-80b4-00c04fd430c8",\n\t\tsentdm.MessageGetActivitiesParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/messages/$ID/activities \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'messages().retrieveActivities',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.messages.MessageRetrieveActivitiesParams;\nimport dm.sent.models.messages.MessageRetrieveActivitiesResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        MessageRetrieveActivitiesResponse response = client.messages().retrieveActivities("8ba7b830-9dad-11d1-80b4-00c04fd430c8");\n    }\n}',
      },
      php: {
        method: 'messages->retrieveActivities',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->messages->retrieveActivities(\n  '8ba7b830-9dad-11d1-80b4-00c04fd430c8',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'messages.retrieve_activities',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.messages.retrieve_activities(\n    id="8ba7b830-9dad-11d1-80b4-00c04fd430c8",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'messages.retrieve_activities',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nresponse = sent.messages.retrieve_activities("8ba7b830-9dad-11d1-80b4-00c04fd430c8")\n\nputs(response)',
      },
      typescript: {
        method: 'client.messages.retrieveActivities',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.messages.retrieveActivities('8ba7b830-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(response.data);",
      },
    },
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
      "## retrieve_status\n\n`client.messages.retrieveStatus(id: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/messages/{id}`\n\nRetrieves the current status and details of a message by ID. Includes delivery status, timestamps, and error information if applicable.\n\n### Parameters\n\n- `id: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; active_contact_price?: number; channel?: string; contact_id?: string; created_at?: string; customer_id?: string; events?: { description?: string; status?: string; timestamp?: string; }[]; message_body?: { buttons?: object[]; content?: string; footer?: string; header?: string; }; phone?: string; phone_international?: string; price?: number; region_code?: string; status?: string; template_category?: string; template_id?: string; template_name?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; active_contact_price?: number; channel?: string; contact_id?: string; created_at?: string; customer_id?: string; events?: { description?: string; status?: string; timestamp?: string; }[]; message_body?: { buttons?: { type?: string; value?: string; }[]; content?: string; footer?: string; header?: string; }; phone?: string; phone_international?: string; price?: number; region_code?: string; status?: string; template_category?: string; template_id?: string; template_name?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst response = await client.messages.retrieveStatus('8ba7b830-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(response);\n```",
    perLanguage: {
      csharp: {
        method: 'Messages.RetrieveStatus',
        example:
          'MessageRetrieveStatusParams parameters = new()\n{\n    ID = "8ba7b830-9dad-11d1-80b4-00c04fd430c8"\n};\n\nvar response = await client.Messages.RetrieveStatus(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Messages.GetStatus',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Messages.GetStatus(\n\t\tcontext.TODO(),\n\t\t"8ba7b830-9dad-11d1-80b4-00c04fd430c8",\n\t\tsentdm.MessageGetStatusParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.sent.dm/v3/messages/$ID \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'messages().retrieveStatus',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.messages.MessageRetrieveStatusParams;\nimport dm.sent.models.messages.MessageRetrieveStatusResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        MessageRetrieveStatusResponse response = client.messages().retrieveStatus("8ba7b830-9dad-11d1-80b4-00c04fd430c8");\n    }\n}',
      },
      php: {
        method: 'messages->retrieveStatus',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->messages->retrieveStatus(\n  '8ba7b830-9dad-11d1-80b4-00c04fd430c8',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'messages.retrieve_status',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.messages.retrieve_status(\n    id="8ba7b830-9dad-11d1-80b4-00c04fd430c8",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'messages.retrieve_status',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nresponse = sent.messages.retrieve_status("8ba7b830-9dad-11d1-80b4-00c04fd430c8")\n\nputs(response)',
      },
      typescript: {
        method: 'client.messages.retrieveStatus',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.messages.retrieveStatus('8ba7b830-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(response.data);",
      },
    },
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
      '## send\n\n`client.messages.send(channel?: string[], sandbox?: boolean, template?: { id?: string; name?: string; parameters?: object; }, to?: string[], Idempotency-Key?: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/messages`\n\nSends a message to one or more recipients using a template. Supports multi-channel broadcast — when multiple channels are specified (e.g. ["sms", "whatsapp"]), a separate message is created for each (recipient, channel) pair. Returns immediately with per-recipient message IDs for async tracking via webhooks or the GET /messages/{id} endpoint.\n\n### Parameters\n\n- `channel?: string[]`\n  Channels to broadcast on, e.g. ["whatsapp", "sms"].\nEach channel produces a separate message per recipient.\n"sent" = auto-detect, "rcs" = reserved (skipped).\nDefaults to ["sent"] (auto-detect) if omitted.\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `template?: { id?: string; name?: string; parameters?: object; }`\n  SDK-style template reference: resolve by ID or by name, with optional parameters.\n  - `id?: string`\n    Template ID (mutually exclusive with name)\n  - `name?: string`\n    Template name (mutually exclusive with id)\n  - `parameters?: object`\n    Template variable parameters for personalization\n\n- `to?: string[]`\n  List of recipient phone numbers in E.164 format (multi-recipient fan-out)\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { recipients?: { body?: string; channel?: string; message_id?: string; to?: string; }[]; status?: string; template_id?: string; template_name?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { recipients?: { body?: string; channel?: string; message_id?: string; to?: string; }[]; status?: string; template_id?: string; template_name?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from \'@sentdm/sentdm\';\n\nconst client = new Sent();\n\nconst response = await client.messages.send();\n\nconsole.log(response);\n```',
    perLanguage: {
      csharp: {
        method: 'Messages.Send',
        example:
          'MessageSendParams parameters = new();\n\nvar response = await client.Messages.Send(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Messages.Send',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Messages.Send(context.TODO(), sentdm.MessageSendParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/messages \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "channel": [\n            "sms",\n            "whatsapp"\n          ],\n          "template": {\n            "id": "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n            "name": "order_confirmation",\n            "parameters": {\n              "name": "John Doe",\n              "order_id": "12345"\n            }\n          },\n          "to": [\n            "+14155551234",\n            "+14155555678"\n          ]\n        }\'',
      },
      java: {
        method: 'messages().send',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.messages.MessageSendParams;\nimport dm.sent.models.messages.MessageSendResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        MessageSendResponse response = client.messages().send();\n    }\n}',
      },
      php: {
        method: 'messages->send',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->messages->send(\n  channel: ['sms', 'whatsapp'],\n  sandbox: false,\n  template: [\n    'id' => '7ba7b820-9dad-11d1-80b4-00c04fd430c8',\n    'name' => 'order_confirmation',\n    'parameters' => ['name' => 'John Doe', 'order_id' => '12345'],\n  ],\n  to: ['+14155551234', '+14155555678'],\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'messages.send',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.messages.send()\nprint(response.data)',
      },
      ruby: {
        method: 'messages.send_',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nresponse = sent.messages.send_\n\nputs(response)',
      },
      typescript: {
        method: 'client.messages.send',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.messages.send();\n\nconsole.log(response.data);",
      },
    },
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
      "## create\n\n`client.contacts.create(phone_number?: string, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: contact_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**post** `/v3/contacts`\n\nCreates a new contact by phone number and associates it with the authenticated customer.\n\n### Parameters\n\n- `phone_number?: string`\n  Phone number of the contact to create\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseOfContact = await client.contacts.create();\n\nconsole.log(apiResponseOfContact);\n```",
    perLanguage: {
      csharp: {
        method: 'Contacts.Create',
        example:
          'ContactCreateParams parameters = new();\n\nvar apiResponseOfContact = await client.Contacts.Create(parameters);\n\nConsole.WriteLine(apiResponseOfContact);',
      },
      go: {
        method: 'client.Contacts.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseOfContact, err := client.Contacts.New(context.TODO(), sentdm.ContactNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseOfContact.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/contacts \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "phone_number": "+1234567890"\n        }\'',
      },
      java: {
        method: 'contacts().create',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.contacts.ApiResponseOfContact;\nimport dm.sent.models.contacts.ContactCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseOfContact apiResponseOfContact = client.contacts().create();\n    }\n}',
      },
      php: {
        method: 'contacts->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseOfContact = $client->contacts->create(\n  phoneNumber: '+1234567890',\n  sandbox: false,\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseOfContact);",
      },
      python: {
        method: 'contacts.create',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_of_contact = client.contacts.create()\nprint(api_response_of_contact.data)',
      },
      ruby: {
        method: 'contacts.create',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_of_contact = sent.contacts.create\n\nputs(api_response_of_contact)',
      },
      typescript: {
        method: 'client.contacts.create',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseOfContact = await client.contacts.create();\n\nconsole.log(apiResponseOfContact.data);",
      },
    },
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
      "## list\n\n`client.contacts.list(page: number, page_size: number, channel?: string, phone?: string, search?: string, x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/contacts`\n\nRetrieves a paginated list of contacts for the authenticated customer. Supports filtering by search term, channel, or phone number.\n\n### Parameters\n\n- `page: number`\n  Page number (1-indexed)\n\n- `page_size: number`\n  Number of items per page\n\n- `channel?: string`\n  Optional channel filter (sms, whatsapp)\n\n- `phone?: string`\n  Optional phone number filter (alternative to list view)\n\n- `search?: string`\n  Optional search term for filtering contacts\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { contacts?: object[]; pagination?: object; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { contacts?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }[]; pagination?: { cursors?: { after?: string; before?: string; }; has_more?: boolean; page?: number; page_size?: number; total_count?: number; total_pages?: number; }; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst contacts = await client.contacts.list({ page: 0, page_size: 0 });\n\nconsole.log(contacts);\n```",
    perLanguage: {
      csharp: {
        method: 'Contacts.List',
        example:
          'ContactListParams parameters = new()\n{\n    Page = 0,\n    PageSize = 0,\n};\n\nvar contacts = await client.Contacts.List(parameters);\n\nConsole.WriteLine(contacts);',
      },
      go: {
        method: 'client.Contacts.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcontacts, err := client.Contacts.List(context.TODO(), sentdm.ContactListParams{\n\t\tPage:     0,\n\t\tPageSize: 0,\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", contacts.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.sent.dm/v3/contacts \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'contacts().list',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.contacts.ContactListParams;\nimport dm.sent.models.contacts.ContactListResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ContactListParams params = ContactListParams.builder()\n            .page(0)\n            .pageSize(0)\n            .build();\n        ContactListResponse contacts = client.contacts().list(params);\n    }\n}',
      },
      php: {
        method: 'contacts->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$contacts = $client->contacts->list(\n  page: 0,\n  pageSize: 0,\n  channel: 'channel',\n  phone: 'phone',\n  search: 'search',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($contacts);",
      },
      python: {
        method: 'contacts.list',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\ncontacts = client.contacts.list(\n    page=0,\n    page_size=0,\n)\nprint(contacts.data)',
      },
      ruby: {
        method: 'contacts.list',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\ncontacts = sent.contacts.list(page: 0, page_size: 0)\n\nputs(contacts)',
      },
      typescript: {
        method: 'client.contacts.list',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst contacts = await client.contacts.list({ page: 0, page_size: 0 });\n\nconsole.log(contacts.data);",
      },
    },
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
      "## delete\n\n`client.contacts.delete(id: string, body: { sandbox?: boolean; }, x-profile-id?: string): void`\n\n**delete** `/v3/contacts/{id}`\n\nDissociates a contact from the authenticated customer. Inherited contacts cannot be deleted.\n\n### Parameters\n\n- `id: string`\n\n- `body: { sandbox?: boolean; }`\n  Request to delete/dissociate a contact\n\n- `x-profile-id?: string`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nawait client.contacts.delete('6ba7b810-9dad-11d1-80b4-00c04fd430c8', { body: {} })\n```",
    perLanguage: {
      csharp: {
        method: 'Contacts.Delete',
        example:
          'ContactDeleteParams parameters = new()\n{\n    ID = "6ba7b810-9dad-11d1-80b4-00c04fd430c8",\n    Body = new() { Sandbox = false },\n};\n\nawait client.Contacts.Delete(parameters);',
      },
      go: {
        method: 'client.Contacts.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Contacts.Delete(\n\t\tcontext.TODO(),\n\t\t"6ba7b810-9dad-11d1-80b4-00c04fd430c8",\n\t\tsentdm.ContactDeleteParams{\n\t\t\tBody: sentdm.ContactDeleteParamsBody{\n\t\t\t\tMutationRequestParam: sentdm.MutationRequestParam{},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/contacts/$ID \\\n    -X DELETE \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'contacts().delete',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.contacts.ContactDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        client.contacts().delete("6ba7b810-9dad-11d1-80b4-00c04fd430c8");\n    }\n}',
      },
      php: {
        method: 'contacts->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->contacts->delete(\n  '6ba7b810-9dad-11d1-80b4-00c04fd430c8',\n  body: ['sandbox' => false],\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'contacts.delete',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nclient.contacts.delete(\n    id="6ba7b810-9dad-11d1-80b4-00c04fd430c8",\n    body={},\n)',
      },
      ruby: {
        method: 'contacts.delete',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nresult = sent.contacts.delete("6ba7b810-9dad-11d1-80b4-00c04fd430c8", body: {})\n\nputs(result)',
      },
      typescript: {
        method: 'client.contacts.delete',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.contacts.delete('6ba7b810-9dad-11d1-80b4-00c04fd430c8', { body: {} });",
      },
    },
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
      "## retrieve\n\n`client.contacts.retrieve(id: string, x-profile-id?: string): { data?: contact_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/contacts/{id}`\n\nRetrieves a specific contact by their unique identifier. Returns detailed contact information including phone formats, available channels, and opt-out status.\n\n### Parameters\n\n- `id: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseOfContact = await client.contacts.retrieve('6ba7b810-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(apiResponseOfContact);\n```",
    perLanguage: {
      csharp: {
        method: 'Contacts.Retrieve',
        example:
          'ContactRetrieveParams parameters = new()\n{\n    ID = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"\n};\n\nvar apiResponseOfContact = await client.Contacts.Retrieve(parameters);\n\nConsole.WriteLine(apiResponseOfContact);',
      },
      go: {
        method: 'client.Contacts.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseOfContact, err := client.Contacts.Get(\n\t\tcontext.TODO(),\n\t\t"6ba7b810-9dad-11d1-80b4-00c04fd430c8",\n\t\tsentdm.ContactGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseOfContact.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.sent.dm/v3/contacts/$ID \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'contacts().retrieve',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.contacts.ApiResponseOfContact;\nimport dm.sent.models.contacts.ContactRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseOfContact apiResponseOfContact = client.contacts().retrieve("6ba7b810-9dad-11d1-80b4-00c04fd430c8");\n    }\n}',
      },
      php: {
        method: 'contacts->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseOfContact = $client->contacts->retrieve(\n  '6ba7b810-9dad-11d1-80b4-00c04fd430c8',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseOfContact);",
      },
      python: {
        method: 'contacts.retrieve',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_of_contact = client.contacts.retrieve(\n    id="6ba7b810-9dad-11d1-80b4-00c04fd430c8",\n)\nprint(api_response_of_contact.data)',
      },
      ruby: {
        method: 'contacts.retrieve',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_of_contact = sent.contacts.retrieve("6ba7b810-9dad-11d1-80b4-00c04fd430c8")\n\nputs(api_response_of_contact)',
      },
      typescript: {
        method: 'client.contacts.retrieve',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseOfContact = await client.contacts.retrieve('6ba7b810-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(apiResponseOfContact.data);",
      },
    },
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
      "## update\n\n`client.contacts.update(id: string, default_channel?: string, opt_out?: boolean, sandbox?: boolean, Idempotency-Key?: string, x-profile-id?: string): { data?: contact_response; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**patch** `/v3/contacts/{id}`\n\nUpdates a contact's default channel and/or opt-out status. Inherited contacts cannot be updated.\n\n### Parameters\n\n- `id: string`\n\n- `default_channel?: string`\n  Default messaging channel: \"sms\" or \"whatsapp\"\n\n- `opt_out?: boolean`\n  Whether the contact has opted out of messaging\n\n- `sandbox?: boolean`\n  Sandbox flag - when true, the operation is simulated without side effects\nUseful for testing integrations without actual execution\n\n- `Idempotency-Key?: string`\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; available_channels?: string; country_code?: string; created_at?: string; default_channel?: string; format_e164?: string; format_international?: string; format_national?: string; format_rfc?: string; is_inherited?: boolean; opt_out?: boolean; phone_number?: string; region_code?: string; updated_at?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst apiResponseOfContact = await client.contacts.update('6ba7b810-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(apiResponseOfContact);\n```",
    perLanguage: {
      csharp: {
        method: 'Contacts.Update',
        example:
          'ContactUpdateParams parameters = new()\n{\n    ID = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"\n};\n\nvar apiResponseOfContact = await client.Contacts.Update(parameters);\n\nConsole.WriteLine(apiResponseOfContact);',
      },
      go: {
        method: 'client.Contacts.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiResponseOfContact, err := client.Contacts.Update(\n\t\tcontext.TODO(),\n\t\t"6ba7b810-9dad-11d1-80b4-00c04fd430c8",\n\t\tsentdm.ContactUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiResponseOfContact.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.sent.dm/v3/contacts/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $SENT_DM_API_KEY" \\\n    -d \'{\n          "default_channel": "whatsapp"\n        }\'',
      },
      java: {
        method: 'contacts().update',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.contacts.ApiResponseOfContact;\nimport dm.sent.models.contacts.ContactUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        ApiResponseOfContact apiResponseOfContact = client.contacts().update("6ba7b810-9dad-11d1-80b4-00c04fd430c8");\n    }\n}',
      },
      php: {
        method: 'contacts->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$apiResponseOfContact = $client->contacts->update(\n  '6ba7b810-9dad-11d1-80b4-00c04fd430c8',\n  defaultChannel: 'whatsapp',\n  optOut: false,\n  sandbox: false,\n  idempotencyKey: 'req_abc123_retry1',\n  xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nvar_dump($apiResponseOfContact);",
      },
      python: {
        method: 'contacts.update',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\napi_response_of_contact = client.contacts.update(\n    id="6ba7b810-9dad-11d1-80b4-00c04fd430c8",\n)\nprint(api_response_of_contact.data)',
      },
      ruby: {
        method: 'contacts.update',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\napi_response_of_contact = sent.contacts.update("6ba7b810-9dad-11d1-80b4-00c04fd430c8")\n\nputs(api_response_of_contact)',
      },
      typescript: {
        method: 'client.contacts.update',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiResponseOfContact = await client.contacts.update('6ba7b810-9dad-11d1-80b4-00c04fd430c8');\n\nconsole.log(apiResponseOfContact.data);",
      },
    },
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
      "## retrieve\n\n`client.me.retrieve(x-profile-id?: string): { data?: object; error?: error_detail; meta?: api_meta; success?: boolean; }`\n\n**get** `/v3/me`\n\nReturns the account associated with the provided API key. The response includes account identity, contact information, messaging channel configuration, and — depending on the account type — either a list of child profiles or the profile's own settings.\n\n**Account types:**\n- `organization` — Has child profiles. The `profiles` array is populated.\n- `user` — Standalone account with no profiles.\n- `profile` — Child of an organization. Includes `organization_id`, `short_name`, `status`, and `settings`.\n\n**Channels:**\nThe `channels` object always includes `sms`, `whatsapp`, and `rcs`. Each channel has a `configured` boolean. Configured channels expose additional details such as `phone_number`.\n\n### Parameters\n\n- `x-profile-id?: string`\n\n### Returns\n\n- `{ data?: { id?: string; channels?: { rcs?: object; sms?: object; whatsapp?: object; }; created_at?: string; description?: string; email?: string; icon?: string; name?: string; organization_id?: string; profiles?: { id?: string; created_at?: string; description?: string; icon?: string; name?: string; role?: string; settings?: profile_settings; short_name?: string; status?: string; }[]; settings?: object; short_name?: string; status?: string; type?: string; }; error?: { code?: string; details?: object; doc_url?: string; message?: string; }; meta?: { request_id?: string; timestamp?: string; version?: string; }; success?: boolean; }`\n  Standard API response envelope for all v3 endpoints\n\n  - `data?: { id?: string; channels?: { rcs?: { configured?: boolean; phone_number?: string; }; sms?: { configured?: boolean; phone_number?: string; }; whatsapp?: { business_name?: string; configured?: boolean; phone_number?: string; }; }; created_at?: string; description?: string; email?: string; icon?: string; name?: string; organization_id?: string; profiles?: { id?: string; created_at?: string; description?: string; icon?: string; name?: string; role?: string; settings?: { allow_contact_sharing?: boolean; allow_template_sharing?: boolean; billing_model?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; }; short_name?: string; status?: string; }[]; settings?: { allow_contact_sharing?: boolean; allow_template_sharing?: boolean; billing_model?: string; inherit_contacts?: boolean; inherit_tcr_brand?: boolean; inherit_tcr_campaign?: boolean; inherit_templates?: boolean; }; short_name?: string; status?: string; type?: string; }`\n  - `error?: { code?: string; details?: object; doc_url?: string; message?: string; }`\n  - `meta?: { request_id?: string; timestamp?: string; version?: string; }`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent();\n\nconst me = await client.me.retrieve();\n\nconsole.log(me);\n```",
    perLanguage: {
      csharp: {
        method: 'Me.Retrieve',
        example:
          'MeRetrieveParams parameters = new();\n\nvar me = await client.Me.Retrieve(parameters);\n\nConsole.WriteLine(me);',
      },
      go: {
        method: 'client.Me.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tme, err := client.Me.Get(context.TODO(), sentdm.MeGetParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", me.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.sent.dm/v3/me \\\n    -H "x-api-key: $SENT_DM_API_KEY"',
      },
      java: {
        method: 'me().retrieve',
        example:
          'package dm.sent.example;\n\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.models.me.MeRetrieveParams;\nimport dm.sent.models.me.MeRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        SentClient client = SentOkHttpClient.fromEnv();\n\n        MeRetrieveResponse me = client.me().retrieve();\n    }\n}',
      },
      php: {
        method: 'me->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$me = $client->me->retrieve(xProfileID: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nvar_dump($me);",
      },
      python: {
        method: 'me.retrieve',
        example:
          'import os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\nme = client.me.retrieve()\nprint(me.data)',
      },
      ruby: {
        method: 'me.retrieve',
        example:
          'require "sentdm"\n\nsent = Sentdm::Client.new(api_key: "My API Key")\n\nme = sent.me.retrieve\n\nputs(me)',
      },
      typescript: {
        method: 'client.me.retrieve',
        example:
          "import Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst me = await client.me.retrieve();\n\nconsole.log(me.data);",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Sent Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/sentdm.svg?label=pypi%20(stable))](https://pypi.org/project/sentdm/)\n\nThe Sent Python library provides convenient access to the Sent REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Sent MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40sentdm%2Fsentdm-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBzZW50ZG0vc2VudGRtLW1jcCJdLCJlbnYiOnsiU0VOVF9ETV9BUElfS0VZIjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40sentdm%2Fsentdm-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40sentdm%2Fsentdm-mcp%22%5D%2C%22env%22%3A%7B%22SENT_DM_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.sent.dm](https://docs.sent.dm). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install sentdm\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom sent_dm import Sent\n\nclient = Sent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\n\nresponse = client.messages.send(\n    channel=["sms", "whatsapp"],\n    template={\n        "id": "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n        "name": "order_confirmation",\n        "parameters": {\n            "name": "John Doe",\n            "order_id": "12345",\n        },\n    },\n    to=["+14155551234", "+14155555678"],\n)\nprint(response.data)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `SENT_DM_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncSent` instead of `Sent` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom sent_dm import AsyncSent\n\nclient = AsyncSent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  response = await client.messages.send(\n      channel=["sms", "whatsapp"],\n      template={\n          "id": "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n          "name": "order_confirmation",\n          "parameters": {\n              "name": "John Doe",\n              "order_id": "12345",\n          },\n      },\n      to=["+14155551234", "+14155555678"],\n  )\n  print(response.data)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install sentdm[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom sent_dm import DefaultAioHttpClient\nfrom sent_dm import AsyncSent\n\nasync def main() -> None:\n  async with AsyncSent(\n    api_key=os.environ.get("SENT_DM_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    response = await client.messages.send(\n        channel=["sms", "whatsapp"],\n        template={\n            "id": "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n            "name": "order_confirmation",\n            "parameters": {\n                "name": "John Doe",\n                "order_id": "12345",\n            },\n        },\n        to=["+14155551234", "+14155555678"],\n    )\n    print(response.data)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom sent_dm import Sent\n\nclient = Sent()\n\nresponse = client.messages.send(\n    template={\n        "id": "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n        "name": "order_confirmation",\n        "parameters": {\n            "name": "John Doe",\n            "order_id": "12345",\n        },\n    },\n)\nprint(response.template)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `sent_dm.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `sent_dm.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `sent_dm.APIError`.\n\n```python\nimport sent_dm\nfrom sent_dm import Sent\n\nclient = Sent()\n\ntry:\n    client.messages.send(\n        channel=["sms"],\n        template={\n            "id": "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n            "name": "order_confirmation",\n            "parameters": {\n                "name": "John Doe",\n                "order_id": "12345",\n            },\n        },\n        to=["+14155551234"],\n    )\nexcept sent_dm.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept sent_dm.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept sent_dm.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom sent_dm import Sent\n\n# Configure the default for all requests:\nclient = Sent(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).messages.send(\n    channel=["sms"],\n    template={\n        "id": "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n        "name": "order_confirmation",\n        "parameters": {\n            "name": "John Doe",\n            "order_id": "12345",\n        },\n    },\n    to=["+14155551234"],\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom sent_dm import Sent\n\n# Configure the default for all requests:\nclient = Sent(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Sent(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).messages.send(\n    channel=["sms"],\n    template={\n        "id": "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n        "name": "order_confirmation",\n        "parameters": {\n            "name": "John Doe",\n            "order_id": "12345",\n        },\n    },\n    to=["+14155551234"],\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `SENT_LOG` to `info`.\n\n```shell\n$ export SENT_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom sent_dm import Sent\n\nclient = Sent()\nresponse = client.messages.with_raw_response.send(\n    channel=["sms"],\n    template={\n        "id": "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n        "name": "order_confirmation",\n        "parameters": {\n            "name": "John Doe",\n            "order_id": "12345",\n        },\n    },\n    to=["+14155551234"],\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nmessage = response.parse()  # get the object that `messages.send()` would have returned\nprint(message.data)\n```\n\nThese methods return an [`APIResponse`](https://github.com/sentdm/sent-dm-python/tree/main/src/sent_dm/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/sentdm/sent-dm-python/tree/main/src/sent_dm/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.messages.with_streaming_response.send(\n    channel=["sms"],\n    template={\n        "id": "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n        "name": "order_confirmation",\n        "parameters": {\n            "name": "John Doe",\n            "order_id": "12345",\n        },\n    },\n    to=["+14155551234"],\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom sent_dm import Sent, DefaultHttpxClient\n\nclient = Sent(\n    # Or use the `SENT_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom sent_dm import Sent\n\nwith Sent() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/sentdm/sent-dm-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport sent_dm\nprint(sent_dm.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'go',
    content:
      '# Sent Go API Library\n\n<a href="https://pkg.go.dev/github.com/sentdm/sent-dm-go"><img src="https://pkg.go.dev/badge/github.com/sentdm/sent-dm-go.svg" alt="Go Reference"></a>\n\nThe Sent Go library provides convenient access to the [Sent REST API](https://docs.sent.dm)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Sent MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40sentdm%2Fsentdm-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBzZW50ZG0vc2VudGRtLW1jcCJdLCJlbnYiOnsiU0VOVF9ETV9BUElfS0VZIjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40sentdm%2Fsentdm-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40sentdm%2Fsentdm-mcp%22%5D%2C%22env%22%3A%7B%22SENT_DM_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/sentdm/sent-dm-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/sentdm/sent-dm-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/sentdm/sent-dm-go"\n\t"github.com/sentdm/sent-dm-go/option"\n)\n\nfunc main() {\n\tclient := sentdm.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("SENT_DM_API_KEY")\n\t)\n\tresponse, err := client.Messages.Send(context.TODO(), sentdm.MessageSendParams{\n\t\tChannel: []string{"sms", "whatsapp"},\n\t\tTemplate: sentdm.MessageSendParamsTemplate{\n\t\t\tID:   sentdm.String("7ba7b820-9dad-11d1-80b4-00c04fd430c8"),\n\t\t\tName: sentdm.String("order_confirmation"),\n\t\t\tParameters: map[string]string{\n\t\t\t\t"name":     "John Doe",\n\t\t\t\t"order_id": "12345",\n\t\t\t},\n\t\t},\n\t\tTo: []string{"+14155551234", "+14155555678"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Messages.Send(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/sentdm/sent-dm-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Messages.Send(context.TODO(), sentdm.MessageSendParams{\n\tChannel: []string{"sms"},\n\tTemplate: sentdm.MessageSendParamsTemplate{\n\t\tID:   sentdm.String("7ba7b820-9dad-11d1-80b4-00c04fd430c8"),\n\t\tName: sentdm.String("order_confirmation"),\n\t\tParameters: map[string]string{\n\t\t\t"name":     "John Doe",\n\t\t\t"order_id": "12345",\n\t\t},\n\t},\n\tTo: []string{"+14155551234"},\n})\nif err != nil {\n\tvar apierr *sentdm.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/v3/messages": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Messages.Send(\n\tctx,\n\tsentdm.MessageSendParams{\n\t\tChannel: []string{"sms"},\n\t\tTemplate: sentdm.MessageSendParamsTemplate{\n\t\t\tID:   sentdm.String("7ba7b820-9dad-11d1-80b4-00c04fd430c8"),\n\t\t\tName: sentdm.String("order_confirmation"),\n\t\t\tParameters: map[string]string{\n\t\t\t\t"name":     "John Doe",\n\t\t\t\t"order_id": "12345",\n\t\t\t},\n\t\t},\n\t\tTo: []string{"+14155551234"},\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := sentdm.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Messages.Send(\n\tcontext.TODO(),\n\tsentdm.MessageSendParams{\n\t\tChannel: []string{"sms"},\n\t\tTemplate: sentdm.MessageSendParamsTemplate{\n\t\t\tID:   sentdm.String("7ba7b820-9dad-11d1-80b4-00c04fd430c8"),\n\t\t\tName: sentdm.String("order_confirmation"),\n\t\t\tParameters: map[string]string{\n\t\t\t\t"name":     "John Doe",\n\t\t\t\t"order_id": "12345",\n\t\t\t},\n\t\t},\n\t\tTo: []string{"+14155551234"},\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nresponse, err := client.Messages.Send(\n\tcontext.TODO(),\n\tsentdm.MessageSendParams{\n\t\tChannel: []string{"sms"},\n\t\tTemplate: sentdm.MessageSendParamsTemplate{\n\t\t\tID:   sentdm.String("7ba7b820-9dad-11d1-80b4-00c04fd430c8"),\n\t\t\tName: sentdm.String("order_confirmation"),\n\t\t\tParameters: map[string]string{\n\t\t\t\t"name":     "John Doe",\n\t\t\t\t"order_id": "12345",\n\t\t\t},\n\t\t},\n\t\tTo: []string{"+14155551234"},\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", response)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/sentdm/sent-dm-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Sent TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@sentdm/sentdm.svg?label=npm%20(stable))](https://npmjs.org/package/@sentdm/sentdm) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@sentdm/sentdm)\n\nThis library provides convenient access to the Sent REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.sent.dm](https://docs.sent.dm). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Sent MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40sentdm%2Fsentdm-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBzZW50ZG0vc2VudGRtLW1jcCJdLCJlbnYiOnsiU0VOVF9ETV9BUElfS0VZIjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40sentdm%2Fsentdm-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40sentdm%2Fsentdm-mcp%22%5D%2C%22env%22%3A%7B%22SENT_DM_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @sentdm/sentdm\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.messages.send({\n  channel: ['sms', 'whatsapp'],\n  template: {\n    id: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',\n    name: 'order_confirmation',\n    parameters: { name: 'John Doe', order_id: '12345' },\n  },\n  to: ['+14155551234', '+14155555678'],\n});\n\nconsole.log(response.data);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  apiKey: process.env['SENT_DM_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Sent.MessageSendParams = {\n  channel: ['sms'],\n  template: {\n    id: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',\n    name: 'order_confirmation',\n    parameters: { name: 'John Doe', order_id: '12345' },\n  },\n  to: ['+14155551234'],\n};\nconst response: Sent.MessageSendResponse = await client.messages.send(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst response = await client.messages\n  .send({\n    channel: ['sms'],\n    template: {\n      id: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',\n      name: 'order_confirmation',\n      parameters: { name: 'John Doe', order_id: '12345' },\n    },\n    to: ['+14155551234'],\n  })\n  .catch(async (err) => {\n    if (err instanceof Sent.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Sent({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.messages.send({\n  channel: ['sms'],\n  template: {\n  id: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',\n  name: 'order_confirmation',\n  parameters: { name: 'John Doe', order_id: '12345' },\n},\n  to: ['+14155551234'],\n}, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Sent({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.messages.send({\n  channel: ['sms'],\n  template: {\n  id: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',\n  name: 'order_confirmation',\n  parameters: { name: 'John Doe', order_id: '12345' },\n},\n  to: ['+14155551234'],\n}, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Sent();\n\nconst response = await client.messages\n  .send({\n    channel: ['sms'],\n    template: {\n      id: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',\n      name: 'order_confirmation',\n      parameters: { name: 'John Doe', order_id: '12345' },\n    },\n    to: ['+14155551234'],\n  })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: response, response: raw } = await client.messages\n  .send({\n    channel: ['sms'],\n    template: {\n      id: '7ba7b820-9dad-11d1-80b4-00c04fd430c8',\n      name: 'order_confirmation',\n      parameters: { name: 'John Doe', order_id: '12345' },\n    },\n    to: ['+14155551234'],\n  })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(response.data);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `SENT_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Sent from '@sentdm/sentdm';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Sent({\n  logger: logger.child({ name: 'Sent' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.messages.send({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Sent from '@sentdm/sentdm';\nimport fetch from 'my-fetch';\n\nconst client = new Sent({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Sent from '@sentdm/sentdm';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Sent({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Sent from '@sentdm/sentdm';\n\nconst client = new Sent({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Sent from 'npm:@sentdm/sentdm';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Sent({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/sentdm/sent-dm-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
  {
    language: 'ruby',
    content:
      '# Sent Ruby API library\n\nThe Sent Ruby library provides convenient access to the Sent REST API from any Ruby 3.2.0+ application. It ships with comprehensive types & docstrings in Yard, RBS, and RBI – [see below](https://github.com/sentdm/sent-dm-ruby#Sorbet) for usage with Sorbet. The standard library\'s `net/http` is used as the HTTP transport, with connection pooling via the `connection_pool` gem.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Sent MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40sentdm%2Fsentdm-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBzZW50ZG0vc2VudGRtLW1jcCJdLCJlbnYiOnsiU0VOVF9ETV9BUElfS0VZIjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40sentdm%2Fsentdm-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40sentdm%2Fsentdm-mcp%22%5D%2C%22env%22%3A%7B%22SENT_DM_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nDocumentation for releases of this gem can be found [on RubyDoc](https://gemdocs.org/gems/sentdm).\n\nThe REST API documentation can be found on [docs.sent.dm](https://docs.sent.dm).\n\n## Installation\n\nTo use this gem, install via Bundler by adding the following to your application\'s `Gemfile`:\n\n<!-- x-release-please-start-version -->\n\n```ruby\ngem "sentdm", "~> 0.0.1"\n```\n\n<!-- x-release-please-end -->\n\n## Usage\n\n```ruby\nrequire "bundler/setup"\nrequire "sentdm"\n\nsent = Sentdm::Client.new(\n  api_key: ENV["SENT_DM_API_KEY"] # This is the default and can be omitted\n)\n\nresponse = sent.messages.send_(\n  channel: ["sms", "whatsapp"],\n  template: {\n    id: "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n    name: "order_confirmation",\n    parameters: {name: "John Doe", order_id: "12345"}\n  },\n  to: ["+14155551234", "+14155555678"]\n)\n\nputs(response.data)\n```\n\n\n\n\n\n\n\n### Handling errors\n\nWhen the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `Sentdm::Errors::APIError` will be thrown:\n\n```ruby\nbegin\n  message = sent.messages.send_(\n    channel: ["sms"],\n    template: {\n      id: "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n      name: "order_confirmation",\n      parameters: {name: "John Doe", order_id: "12345"}\n    },\n    to: ["+14155551234"]\n  )\nrescue Sentdm::Errors::APIConnectionError => e\n  puts("The server could not be reached")\n  puts(e.cause)  # an underlying Exception, likely raised within `net/http`\nrescue Sentdm::Errors::RateLimitError => e\n  puts("A 429 status code was received; we should back off a bit.")\nrescue Sentdm::Errors::APIStatusError => e\n  puts("Another non-200-range status code was received")\n  puts(e.status)\nend\n```\n\nError codes are as follows:\n\n| Cause            | Error Type                 |\n| ---------------- | -------------------------- |\n| HTTP 400         | `BadRequestError`          |\n| HTTP 401         | `AuthenticationError`      |\n| HTTP 403         | `PermissionDeniedError`    |\n| HTTP 404         | `NotFoundError`            |\n| HTTP 409         | `ConflictError`            |\n| HTTP 422         | `UnprocessableEntityError` |\n| HTTP 429         | `RateLimitError`           |\n| HTTP >= 500      | `InternalServerError`      |\n| Other HTTP error | `APIStatusError`           |\n| Timeout          | `APITimeoutError`          |\n| Network error    | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\n\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, >=500 Internal errors, and timeouts will all be retried by default.\n\nYou can use the `max_retries` option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nsent = Sentdm::Client.new(\n  max_retries: 0 # default is 2\n)\n\n# Or, configure per-request:\nsent.messages.send_(\n  channel: ["sms"],\n  template: {\n    id: "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n    name: "order_confirmation",\n    parameters: {name: "John Doe", order_id: "12345"}\n  },\n  to: ["+14155551234"],\n  request_options: {max_retries: 5}\n)\n```\n\n### Timeouts\n\nBy default, requests will time out after 60 seconds. You can use the timeout option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nsent = Sentdm::Client.new(\n  timeout: nil # default is 60\n)\n\n# Or, configure per-request:\nsent.messages.send_(\n  channel: ["sms"],\n  template: {\n    id: "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n    name: "order_confirmation",\n    parameters: {name: "John Doe", order_id: "12345"}\n  },\n  to: ["+14155551234"],\n  request_options: {timeout: 5}\n)\n```\n\nOn timeout, `Sentdm::Errors::APITimeoutError` is raised.\n\nNote that requests that time out are retried by default.\n\n## Advanced concepts\n\n### BaseModel\n\nAll parameter and response objects inherit from `Sentdm::Internal::Type::BaseModel`, which provides several conveniences, including:\n\n1. All fields, including unknown ones, are accessible with `obj[:prop]` syntax, and can be destructured with `obj => {prop: prop}` or pattern-matching syntax.\n\n2. Structural equivalence for equality; if two API calls return the same values, comparing the responses with == will return true.\n\n3. Both instances and the classes themselves can be pretty-printed.\n\n4. Helpers such as `#to_h`, `#deep_to_h`, `#to_json`, and `#to_yaml`.\n\n### Making custom or undocumented requests\n\n#### Undocumented properties\n\nYou can send undocumented parameters to any endpoint, and read undocumented response properties, like so:\n\nNote: the `extra_` parameters of the same name overrides the documented parameters.\n\n```ruby\nresponse =\n  sent.messages.send_(\n    channel: ["sms"],\n    template: {\n      id: "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n      name: "order_confirmation",\n      parameters: {name: "John Doe", order_id: "12345"}\n    },\n    to: ["+14155551234"],\n    request_options: {\n      extra_query: {my_query_parameter: value},\n      extra_body: {my_body_parameter: value},\n      extra_headers: {"my-header": value}\n    }\n  )\n\nputs(response[:my_undocumented_property])\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` under the `request_options:` parameter when making a request, as seen in the examples above.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints while retaining the benefit of auth, retries, and so on, you can make requests using `client.request`, like so:\n\n```ruby\nresponse = client.request(\n  method: :post,\n  path: \'/undocumented/endpoint\',\n  query: {"dog": "woof"},\n  headers: {"useful-header": "interesting-value"},\n  body: {"hello": "world"}\n)\n```\n\n### Concurrency & connection pooling\n\nThe `Sentdm::Client` instances are threadsafe, but are only are fork-safe when there are no in-flight HTTP requests.\n\nEach instance of `Sentdm::Client` has its own HTTP connection pool with a default size of 99. As such, we recommend instantiating the client once per application in most settings.\n\nWhen all available connections from the pool are checked out, requests wait for a new connection to become available, with queue time counting towards the request timeout.\n\nUnless otherwise specified, other classes in the SDK do not have locks protecting their underlying data structure.\n\n## Sorbet\n\nThis library provides comprehensive [RBI](https://sorbet.org/docs/rbi) definitions, and has no dependency on sorbet-runtime.\n\nYou can provide typesafe request parameters like so:\n\n```ruby\nsent.messages.send_(\n  channel: ["sms", "whatsapp"],\n  template: Sentdm::MessageSendParams::Template.new(\n    id: "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n    name: "order_confirmation",\n    parameters: {name: "John Doe", order_id: "12345"}\n  ),\n  to: ["+14155551234", "+14155555678"]\n)\n```\n\nOr, equivalently:\n\n```ruby\n# Hashes work, but are not typesafe:\nsent.messages.send_(\n  channel: ["sms", "whatsapp"],\n  template: {\n    id: "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n    name: "order_confirmation",\n    parameters: {name: "John Doe", order_id: "12345"}\n  },\n  to: ["+14155551234", "+14155555678"]\n)\n\n# You can also splat a full Params class:\nparams = Sentdm::MessageSendParams.new(\n  channel: ["sms", "whatsapp"],\n  template: Sentdm::MessageSendParams::Template.new(\n    id: "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n    name: "order_confirmation",\n    parameters: {name: "John Doe", order_id: "12345"}\n  ),\n  to: ["+14155551234", "+14155555678"]\n)\nsent.messages.send_(**params)\n```\n\n### Enums\n\nSince this library does not depend on `sorbet-runtime`, it cannot provide [`T::Enum`](https://sorbet.org/docs/tenum) instances. Instead, we provide "tagged symbols" instead, which is always a primitive at runtime:\n\n```ruby\n# :PRIVATE_PROFIT\nputs(\n  Sentdm::SentDmServicesEndpointsCustomerApIv3ContractsRequestsBrandsBrandBusinessInfo::EntityType::PRIVATE_PROFIT\n)\n\n# Revealed type: `T.all(Sentdm::SentDmServicesEndpointsCustomerApIv3ContractsRequestsBrandsBrandBusinessInfo::EntityType, Symbol)`\nT.reveal_type(\n  Sentdm::SentDmServicesEndpointsCustomerApIv3ContractsRequestsBrandsBrandBusinessInfo::EntityType::PRIVATE_PROFIT\n)\n```\n\nEnum parameters have a "relaxed" type, so you can either pass in enum constants or their literal value:\n\n```ruby\nSentdm::SentDmServicesEndpointsCustomerApIv3ContractsRequestsBrandsBrandBusinessInfo.new(\n  entity_type: Sentdm::SentDmServicesEndpointsCustomerApIv3ContractsRequestsBrandsBrandBusinessInfo::EntityType::PRIVATE_PROFIT,\n  # …\n)\n\nSentdm::SentDmServicesEndpointsCustomerApIv3ContractsRequestsBrandsBrandBusinessInfo.new(\n  entity_type: :PRIVATE_PROFIT,\n  # …\n)\n```\n\n## Versioning\n\nThis package follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. As the library is in initial development and has a major version of `0`, APIs may change at any time.\n\nThis package considers improvements to the (non-runtime) `*.rbi` and `*.rbs` type definitions to be non-breaking changes.\n\n## Requirements\n\nRuby 3.2.0 or higher.\n\n## Contributing\n\nSee [the contributing documentation](https://github.com/sentdm/sent-dm-ruby/tree/main/CONTRIBUTING.md).\n',
  },
  {
    language: 'java',
    content:
      '# Sent Java API Library\n\n<!-- x-release-please-start-version -->\n[![Maven Central](https://img.shields.io/maven-central/v/dm.sent/sent-java)](https://central.sonatype.com/artifact/dm.sent/sent-java/0.0.1)\n[![javadoc](https://javadoc.io/badge2/dm.sent/sent-java/0.0.1/javadoc.svg)](https://javadoc.io/doc/dm.sent/sent-java/0.0.1)\n<!-- x-release-please-end -->\n\nThe Sent Java SDK provides convenient access to the [Sent REST API](https://docs.sent.dm)   from applications written in Java.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Sent MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40sentdm%2Fsentdm-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBzZW50ZG0vc2VudGRtLW1jcCJdLCJlbnYiOnsiU0VOVF9ETV9BUElfS0VZIjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40sentdm%2Fsentdm-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40sentdm%2Fsentdm-mcp%22%5D%2C%22env%22%3A%7B%22SENT_DM_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n<!-- x-release-please-start-version -->\n\nThe REST API documentation can be found on [docs.sent.dm](https://docs.sent.dm). Javadocs are available on [javadoc.io](https://javadoc.io/doc/dm.sent/sent-java/0.0.1).\n\n<!-- x-release-please-end -->\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n### Gradle\n\n~~~kotlin\nimplementation("dm.sent:sent-java:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>dm.sent</groupId>\n  <artifactId>sent-java</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```java\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.core.JsonValue;\nimport dm.sent.models.messages.MessageSendParams;\nimport dm.sent.models.messages.MessageSendResponse;\n\n// Configures using the `sent.dmApiKey` and `sent.baseUrl` system properties\n// Or configures using the `SENT_DM_API_KEY` and `SENT_BASE_URL` environment variables\nSentClient client = SentOkHttpClient.fromEnv();\n\nMessageSendParams params = MessageSendParams.builder()\n    .addChannel("sms")\n    .addChannel("whatsapp")\n    .template(MessageSendParams.Template.builder()\n        .id("7ba7b820-9dad-11d1-80b4-00c04fd430c8")\n        .name("order_confirmation")\n        .parameters(MessageSendParams.Template.Parameters.builder()\n            .putAdditionalProperty("name", JsonValue.from("John Doe"))\n            .putAdditionalProperty("order_id", JsonValue.from("12345"))\n            .build())\n        .build())\n    .addTo("+14155551234")\n    .addTo("+14155555678")\n    .build();\nMessageSendResponse response = client.messages().send(params);\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```java\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\n\n// Configures using the `sent.dmApiKey` and `sent.baseUrl` system properties\n// Or configures using the `SENT_DM_API_KEY` and `SENT_BASE_URL` environment variables\nSentClient client = SentOkHttpClient.fromEnv();\n```\n\nOr manually:\n\n```java\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\n\nSentClient client = SentOkHttpClient.builder()\n    .apiKey("My API Key")\n    .build();\n```\n\nOr using a combination of the two approaches:\n\n```java\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\n\nSentClient client = SentOkHttpClient.builder()\n    // Configures using the `sent.dmApiKey` and `sent.baseUrl` system properties\n    // Or configures using the `SENT_DM_API_KEY` and `SENT_BASE_URL` environment variables\n    .fromEnv()\n    .apiKey("My API Key")\n    .build();\n```\n\nSee this table for the available options:\n\n| Setter    | System property | Environment variable | Required | Default value           |\n| --------- | --------------- | -------------------- | -------- | ----------------------- |\n| `apiKey`  | `sent.dmApiKey` | `SENT_DM_API_KEY`    | true     | -                       |\n| `baseUrl` | `sent.baseUrl`  | `SENT_BASE_URL`      | true     | `"https://api.sent.dm"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```java\nimport dm.sent.client.SentClient;\n\nSentClient clientWithOptions = client.withOptions(optionsBuilder -> {\n    optionsBuilder.baseUrl("https://example.com");\n    optionsBuilder.maxRetries(42);\n});\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Sent API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Java class.\n\nFor example, `client.messages().send(...)` should be called with an instance of `MessageSendParams`, and it     will return an instance of `MessageSendResponse`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```java\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport dm.sent.core.JsonValue;\nimport dm.sent.models.messages.MessageSendParams;\nimport dm.sent.models.messages.MessageSendResponse;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `sent.dmApiKey` and `sent.baseUrl` system properties\n// Or configures using the `SENT_DM_API_KEY` and `SENT_BASE_URL` environment variables\nSentClient client = SentOkHttpClient.fromEnv();\n\nMessageSendParams params = MessageSendParams.builder()\n    .addChannel("sms")\n    .addChannel("whatsapp")\n    .template(MessageSendParams.Template.builder()\n        .id("7ba7b820-9dad-11d1-80b4-00c04fd430c8")\n        .name("order_confirmation")\n        .parameters(MessageSendParams.Template.Parameters.builder()\n            .putAdditionalProperty("name", JsonValue.from("John Doe"))\n            .putAdditionalProperty("order_id", JsonValue.from("12345"))\n            .build())\n        .build())\n    .addTo("+14155551234")\n    .addTo("+14155555678")\n    .build();\nCompletableFuture<MessageSendResponse> response = client.async().messages().send(params);\n```\n\nOr create an asynchronous client from the beginning:\n\n```java\nimport dm.sent.client.SentClientAsync;\nimport dm.sent.client.okhttp.SentOkHttpClientAsync;\nimport dm.sent.core.JsonValue;\nimport dm.sent.models.messages.MessageSendParams;\nimport dm.sent.models.messages.MessageSendResponse;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `sent.dmApiKey` and `sent.baseUrl` system properties\n// Or configures using the `SENT_DM_API_KEY` and `SENT_BASE_URL` environment variables\nSentClientAsync client = SentOkHttpClientAsync.fromEnv();\n\nMessageSendParams params = MessageSendParams.builder()\n    .addChannel("sms")\n    .addChannel("whatsapp")\n    .template(MessageSendParams.Template.builder()\n        .id("7ba7b820-9dad-11d1-80b4-00c04fd430c8")\n        .name("order_confirmation")\n        .parameters(MessageSendParams.Template.Parameters.builder()\n            .putAdditionalProperty("name", JsonValue.from("John Doe"))\n            .putAdditionalProperty("order_id", JsonValue.from("12345"))\n            .build())\n        .build())\n    .addTo("+14155551234")\n    .addTo("+14155555678")\n    .build();\nCompletableFuture<MessageSendResponse> response = client.messages().send(params);\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods return `CompletableFuture`s.\n\n\n\n\n\n\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Java classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```java\nimport dm.sent.core.JsonValue;\nimport dm.sent.core.http.Headers;\nimport dm.sent.core.http.HttpResponseFor;\nimport dm.sent.models.messages.MessageSendParams;\nimport dm.sent.models.messages.MessageSendResponse;\n\nMessageSendParams params = MessageSendParams.builder()\n    .addChannel("sms")\n    .template(MessageSendParams.Template.builder()\n        .id("7ba7b820-9dad-11d1-80b4-00c04fd430c8")\n        .name("order_confirmation")\n        .parameters(MessageSendParams.Template.Parameters.builder()\n            .putAdditionalProperty("name", JsonValue.from("John Doe"))\n            .putAdditionalProperty("order_id", JsonValue.from("12345"))\n            .build())\n        .build())\n    .addTo("+14155551234")\n    .build();\nHttpResponseFor<MessageSendResponse> response = client.messages().withRawResponse().send(params);\n\nint statusCode = response.statusCode();\nHeaders headers = response.headers();\n```\n\nYou can still deserialize the response into an instance of a Java class if needed:\n\n```java\nimport dm.sent.models.messages.MessageSendResponse;\n\nMessageSendResponse parsedResponse = response.parse();\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`SentServiceException`](sent-java-core/src/main/kotlin/dm/sent/errors/SentServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](sent-java-core/src/main/kotlin/dm/sent/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](sent-java-core/src/main/kotlin/dm/sent/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](sent-java-core/src/main/kotlin/dm/sent/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](sent-java-core/src/main/kotlin/dm/sent/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](sent-java-core/src/main/kotlin/dm/sent/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](sent-java-core/src/main/kotlin/dm/sent/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](sent-java-core/src/main/kotlin/dm/sent/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](sent-java-core/src/main/kotlin/dm/sent/errors/UnexpectedStatusCodeException.kt) |\n\n- [`SentIoException`](sent-java-core/src/main/kotlin/dm/sent/errors/SentIoException.kt): I/O networking errors.\n\n- [`SentRetryableException`](sent-java-core/src/main/kotlin/dm/sent/errors/SentRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`SentInvalidDataException`](sent-java-core/src/main/kotlin/dm/sent/errors/SentInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`SentException`](sent-java-core/src/main/kotlin/dm/sent/errors/SentException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n\n\n## Logging\n\nThe SDK uses the standard   [OkHttp logging interceptor](https://github.com/square/okhttp/tree/master/okhttp-logging-interceptor).\n\nEnable logging by setting the `SENT_LOG` environment variable to   `info`:\n\n```sh\nexport SENT_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport SENT_LOG=debug\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `sent-java-core` is published with a     [configuration file](sent-java-core/src/main/resources/META-INF/proguard/sent-java-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`SentOkHttpClient`](sent-java-client-okhttp/src/main/kotlin/dm/sent/client/okhttp/SentOkHttpClient.kt) or     [`SentOkHttpClientAsync`](sent-java-client-okhttp/src/main/kotlin/dm/sent/client/okhttp/SentOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```java\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\n\nSentClient client = SentOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build();\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```java\nimport dm.sent.models.messages.MessageSendResponse;\n\nMessageSendResponse response = client.messages().send(RequestOptions.builder().timeout(Duration.ofSeconds(30)).build());\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport java.time.Duration;\n\nSentClient client = SentOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build();\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```java\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport java.net.InetSocketAddress;\nimport java.net.Proxy;\n\nSentClient client = SentOkHttpClient.builder()\n    .fromEnv()\n    .proxy(new Proxy(\n      Proxy.Type.HTTP, new InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build();\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```java\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\nimport java.time.Duration;\n\nSentClient client = SentOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build();\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```java\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\n\nSentClient client = SentOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build();\n```\n\n\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `sent-java-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`SentClient`](sent-java-core/src/main/kotlin/dm/sent/client/SentClient.kt), [`SentClientAsync`](sent-java-core/src/main/kotlin/dm/sent/client/SentClientAsync.kt),             [`SentClientImpl`](sent-java-core/src/main/kotlin/dm/sent/client/SentClientImpl.kt), and [`SentClientAsyncImpl`](sent-java-core/src/main/kotlin/dm/sent/client/SentClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `sent-java-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`SentOkHttpClient`](sent-java-client-okhttp/src/main/kotlin/dm/sent/client/okhttp/SentOkHttpClient.kt) and [`SentOkHttpClientAsync`](sent-java-client-okhttp/src/main/kotlin/dm/sent/client/okhttp/SentOkHttpClientAsync.kt), which             provide a way to construct [`SentClientImpl`](sent-java-core/src/main/kotlin/dm/sent/client/SentClientImpl.kt) and             [`SentClientAsyncImpl`](sent-java-core/src/main/kotlin/dm/sent/client/SentClientAsyncImpl.kt), respectively, using OkHttp\n- `sent-java`\n  - Depends on and exposes the APIs of both `sent-java-core` and `sent-java-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`sent-java` dependency](#installation) with `sent-java-core`\n2. Copy `sent-java-client-okhttp`\'s [`OkHttpClient`](sent-java-client-okhttp/src/main/kotlin/dm/sent/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`SentClientImpl`](sent-java-core/src/main/kotlin/dm/sent/client/SentClientImpl.kt) or [`SentClientAsyncImpl`](sent-java-core/src/main/kotlin/dm/sent/client/SentClientAsyncImpl.kt), similarly to        [`SentOkHttpClient`](sent-java-client-okhttp/src/main/kotlin/dm/sent/client/okhttp/SentOkHttpClient.kt) or [`SentOkHttpClientAsync`](sent-java-client-okhttp/src/main/kotlin/dm/sent/client/okhttp/SentOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`sent-java` dependency](#installation) with `sent-java-core`\n2. Write a class that implements the [`HttpClient`](sent-java-core/src/main/kotlin/dm/sent/core/http/HttpClient.kt) interface\n3. Construct [`SentClientImpl`](sent-java-core/src/main/kotlin/dm/sent/client/SentClientImpl.kt) or [`SentClientAsyncImpl`](sent-java-core/src/main/kotlin/dm/sent/client/SentClientAsyncImpl.kt), similarly to        [`SentOkHttpClient`](sent-java-client-okhttp/src/main/kotlin/dm/sent/client/okhttp/SentOkHttpClient.kt) or [`SentOkHttpClientAsync`](sent-java-client-okhttp/src/main/kotlin/dm/sent/client/okhttp/SentOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```java\nimport dm.sent.core.JsonValue;\nimport dm.sent.models.messages.MessageSendParams;\n\nMessageSendParams params = MessageSendParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build();\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set undocumented parameters on _nested_ headers, query params, or body classes, call the         `putAdditionalProperty` method on the nested class:\n\n```java\nimport dm.sent.core.JsonValue;\nimport dm.sent.models.messages.MessageSendParams;\n\nMessageSendParams params = MessageSendParams.builder()\n    .template(MessageSendParams.Template.builder()\n        .putAdditionalProperty("secretProperty", JsonValue.from("42"))\n        .build())\n    .build();\n```\n\nThese properties can be accessed on the nested built object later using the         `_additionalProperties()` method.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](sent-java-core/src/main/kotlin/dm/sent/core/Values.kt) object to its setter:\n\n```java\nimport dm.sent.core.JsonValue;\nimport dm.sent.models.messages.MessageSendParams;\n\nMessageSendParams params = MessageSendParams.builder()\n    .channel(JsonValue.from(42))\n    .template(MessageSendParams.Template.builder()\n        .id("7ba7b820-9dad-11d1-80b4-00c04fd430c8")\n        .name("order_confirmation")\n        .parameters(MessageSendParams.Template.Parameters.builder()\n            .putAdditionalProperty("name", JsonValue.from("John Doe"))\n            .putAdditionalProperty("order_id", JsonValue.from("12345"))\n            .build())\n        .build())\n    .addTo("+14155551234")\n    .addTo("+14155555678")\n    .build();\n```\n\nThe most straightforward way to create a [`JsonValue`](sent-java-core/src/main/kotlin/dm/sent/core/Values.kt) is using its       `from(...)` method:\n\n```java\nimport dm.sent.core.JsonValue;\nimport java.util.List;\nimport java.util.Map;\n\n// Create primitive JSON values\nJsonValue nullValue = JsonValue.from(null);\nJsonValue booleanValue = JsonValue.from(true);\nJsonValue numberValue = JsonValue.from(42);\nJsonValue stringValue = JsonValue.from("Hello World!");\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nJsonValue arrayValue = JsonValue.from(List.of(\n  "Hello", "World"\n));\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nJsonValue objectValue = JsonValue.from(Map.of(\n  "a", 1,\n  "b", 2\n));\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nJsonValue complexValue = JsonValue.from(Map.of(\n  "a", List.of(\n    1, 2\n  ),\n  "b", List.of(\n    3, 4\n  )\n));\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](sent-java-core/src/main/kotlin/dm/sent/core/Values.kt):\n\n```java\nimport dm.sent.core.JsonMissing;\nimport dm.sent.models.messages.MessageSendParams;\nimport dm.sent.models.webhooks.WebhookRetrieveParams;\n\nMessageSendParams params = WebhookRetrieveParams.builder()\n    .id(JsonMissing.of())\n    .build();\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```java\nimport dm.sent.core.JsonValue;\nimport java.util.Map;\n\nMap<String, JsonValue> additionalProperties = client.messages().send(params)._additionalProperties();\nJsonValue secretPropertyValue = additionalProperties.get("secretProperty");\n\nString result = secretPropertyValue.accept(new JsonValue.Visitor<>() {\n    @Override\n    public String visitNull() {\n        return "It\'s null!";\n    }\n\n    @Override\n    public String visitBoolean(boolean value) {\n        return "It\'s a boolean!";\n    }\n\n    @Override\n    public String visitNumber(Number value) {\n        return "It\'s a number!";\n    }\n\n    // Other methods include `visitMissing`, `visitString`, `visitArray`, and `visitObject`\n    // The default implementation of each unimplemented method delegates to `visitDefault`, which throws by default, but can also be overridden\n});\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```java\nimport dm.sent.core.JsonField;\nimport java.util.Optional;\n\nJsonField<Boolean> sandbox = client.messages().send(params)._sandbox();\n\nif (sandbox.isMissing()) {\n  // The property is absent from the JSON response\n} else if (sandbox.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  Optional<String> jsonString = sandbox.asString();\n\n  // Try to deserialize into a custom type\n  MyClass myObject = sandbox.asUnknown().orElseThrow().convert(MyClass.class);\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`SentInvalidDataException`](sent-java-core/src/main/kotlin/dm/sent/errors/SentInvalidDataException.kt) only if you directly access the property.\n\nIf you would prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```java\nimport dm.sent.models.messages.MessageSendResponse;\n\nMessageSendResponse response = client.messages().send(params).validate();\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```java\nimport dm.sent.models.messages.MessageSendResponse;\n\nMessageSendResponse response = client.messages().send(RequestOptions.builder().responseValidation(true).build());\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport dm.sent.client.SentClient;\nimport dm.sent.client.okhttp.SentOkHttpClient;\n\nSentClient client = SentOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build();\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nJava `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/sentdm/sent-dm-java/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'csharp',
    content:
      '# Sent C# API Library\n\nThe Sent C# SDK provides convenient access to the [Sent REST API](https://docs.sent.dm) from applications written in   C#.\n\n## Installation\n\nInstall the package from [NuGet](https://www.nuget.org/packages/Sentdm):\n\n```bash\ndotnet add package Sentdm\n```\n\n## Requirements\n\nThis library requires .NET Standard 2.0 or later.\n\n## Usage\n\nSee the [`examples`](examples) directory for complete and runnable examples.\n\n```csharp\nSentClient client = new();\n\nMessageSendParams parameters = new()\n{\n    Channel =\n    [\n        "sms", "whatsapp"\n    ],\n    Template = new()\n    {\n        ID = "7ba7b820-9dad-11d1-80b4-00c04fd430c8",\n        Name = "order_confirmation",\n        Parameters = new Dictionary<string, string>()\n        {\n            { "name", "John Doe" }, { "order_id", "12345" }\n        },\n    },\n    To =\n    [\n        "+14155551234", "+14155555678"\n    ],\n};\n\nvar response = await client.Messages.Send(parameters);\n\nConsole.WriteLine(response);\n```',
  },
  {
    language: 'php',
    content:
      "# Sent PHP API Library\n\nThe Sent PHP library provides convenient access to the Sent REST API from any PHP 8.1.0+ application.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n```\ncomposer require \"sentdm/sent-dm-php 0.0.1\"\n```\n<!-- x-release-please-end -->\n\n## Usage\n\n```php\n<?php\n\n$client = new Client(apiKey: getenv('SENT_DM_API_KEY') ?: 'My API Key');\n\n$response = $client->messages->send(\n  channel: ['sms', 'whatsapp'],\n  template: [\n    'id' => '7ba7b820-9dad-11d1-80b4-00c04fd430c8',\n    'name' => 'order_confirmation',\n    'parameters' => ['name' => 'John Doe', 'order_id' => '12345'],\n  ],\n  to: ['+14155551234', '+14155555678'],\n);\n\nvar_dump($response->data);\n```",
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
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
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
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
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
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
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
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
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

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
