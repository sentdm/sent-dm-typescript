// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { SentError } from './error';
import { FinalRequestOptions } from '../internal/request-options';
import { defaultParseResponse } from '../internal/parse';
import { type Sent } from '../client';
import { APIPromise } from './api-promise';
import { type APIResponseProps } from '../internal/parse';
import { maybeObj } from '../internal/utils/values';

export type PageRequestOptions = Pick<FinalRequestOptions, 'query' | 'headers' | 'body' | 'path' | 'method'>;

export abstract class AbstractPage<Item> implements AsyncIterable<Item> {
  #client: Sent;
  protected options: FinalRequestOptions;

  protected response: Response;
  protected body: unknown;

  constructor(client: Sent, response: Response, body: unknown, options: FinalRequestOptions) {
    this.#client = client;
    this.options = options;
    this.response = response;
    this.body = body;
  }

  abstract nextPageRequestOptions(): PageRequestOptions | null;

  abstract getPaginatedItems(): Item[];

  hasNextPage(): boolean {
    const items = this.getPaginatedItems();
    if (!items.length) return false;
    return this.nextPageRequestOptions() != null;
  }

  async getNextPage(): Promise<this> {
    const nextOptions = this.nextPageRequestOptions();
    if (!nextOptions) {
      throw new SentError(
        'No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.',
      );
    }

    return await this.#client.requestAPIList(this.constructor as any, nextOptions);
  }

  async *iterPages(): AsyncGenerator<this> {
    let page: this = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
}

/**
 * This subclass of Promise will resolve to an instantiated Page once the request completes.
 *
 * It also implements AsyncIterable to allow auto-paginating iteration on an unawaited list call, eg:
 *
 *    for await (const item of client.items.list()) {
 *      console.log(item)
 *    }
 */
export class PagePromise<
    PageClass extends AbstractPage<Item>,
    Item = ReturnType<PageClass['getPaginatedItems']>[number],
  >
  extends APIPromise<PageClass>
  implements AsyncIterable<Item>
{
  constructor(
    client: Sent,
    request: Promise<APIResponseProps>,
    Page: new (...args: ConstructorParameters<typeof AbstractPage>) => PageClass,
  ) {
    super(
      client,
      request,
      async (client, props) =>
        new Page(client, props.response, await defaultParseResponse(client, props), props.options),
    );
  }

  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
}

export interface ContactsPageResponse<Item> {
  data: ContactsPageResponse.Data<Item>;
}

export namespace ContactsPageResponse {
  export interface Data<Item> {
    contacts?: Array<Item>;

    pagination?: Data.Pagination;
  }

  export namespace Data {
    export interface Pagination {
      has_more?: boolean;
    }
  }
}

export interface ContactsPageParams {
  page?: number;

  page_size?: number;
}

export class ContactsPage<Item> extends AbstractPage<Item> implements ContactsPageResponse<Item> {
  data: ContactsPageResponse.Data<Item>;

  constructor(
    client: Sent,
    response: Response,
    body: ContactsPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.data = body.data || {};
  }

  getPaginatedItems(): Item[] {
    return this.data?.contacts ?? [];
  }

  override hasNextPage(): boolean {
    if (this.data?.pagination?.has_more === false) {
      return false;
    }

    return super.hasNextPage();
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const query = this.options.query as ContactsPageParams;
    const currentPage = query?.page ?? 1;

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        page: currentPage + 1,
      },
    };
  }
}

export interface ConversationsPageResponse<Item> {
  data: ConversationsPageResponse.Data<Item>;
}

export namespace ConversationsPageResponse {
  export interface Data<Item> {
    messages?: Array<Item>;

    pagination?: Data.Pagination;
  }

  export namespace Data {
    export interface Pagination {
      has_more?: boolean;
    }
  }
}

export interface ConversationsPageParams {
  page?: number;

  page_size?: number;
}

export class ConversationsPage<Item> extends AbstractPage<Item> implements ConversationsPageResponse<Item> {
  data: ConversationsPageResponse.Data<Item>;

  constructor(
    client: Sent,
    response: Response,
    body: ConversationsPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.data = body.data || {};
  }

  getPaginatedItems(): Item[] {
    return this.data?.messages ?? [];
  }

  override hasNextPage(): boolean {
    if (this.data?.pagination?.has_more === false) {
      return false;
    }

    return super.hasNextPage();
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const query = this.options.query as ConversationsPageParams;
    const currentPage = query?.page ?? 1;

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        page: currentPage + 1,
      },
    };
  }
}

export interface TemplatesPageResponse<Item> {
  data: TemplatesPageResponse.Data<Item>;
}

export namespace TemplatesPageResponse {
  export interface Data<Item> {
    pagination?: Data.Pagination;

    templates?: Array<Item>;
  }

  export namespace Data {
    export interface Pagination {
      has_more?: boolean;
    }
  }
}

export interface TemplatesPageParams {
  page?: number;

  page_size?: number;
}

export class TemplatesPage<Item> extends AbstractPage<Item> implements TemplatesPageResponse<Item> {
  data: TemplatesPageResponse.Data<Item>;

  constructor(
    client: Sent,
    response: Response,
    body: TemplatesPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.data = body.data || {};
  }

  getPaginatedItems(): Item[] {
    return this.data?.templates ?? [];
  }

  override hasNextPage(): boolean {
    if (this.data?.pagination?.has_more === false) {
      return false;
    }

    return super.hasNextPage();
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const query = this.options.query as TemplatesPageParams;
    const currentPage = query?.page ?? 1;

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        page: currentPage + 1,
      },
    };
  }
}

export interface WebhooksPageResponse<Item> {
  data: WebhooksPageResponse.Data<Item>;
}

export namespace WebhooksPageResponse {
  export interface Data<Item> {
    pagination?: Data.Pagination;

    webhooks?: Array<Item>;
  }

  export namespace Data {
    export interface Pagination {
      has_more?: boolean;
    }
  }
}

export interface WebhooksPageParams {
  page?: number;

  page_size?: number;
}

export class WebhooksPage<Item> extends AbstractPage<Item> implements WebhooksPageResponse<Item> {
  data: WebhooksPageResponse.Data<Item>;

  constructor(
    client: Sent,
    response: Response,
    body: WebhooksPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.data = body.data || {};
  }

  getPaginatedItems(): Item[] {
    return this.data?.webhooks ?? [];
  }

  override hasNextPage(): boolean {
    if (this.data?.pagination?.has_more === false) {
      return false;
    }

    return super.hasNextPage();
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const query = this.options.query as WebhooksPageParams;
    const currentPage = query?.page ?? 1;

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        page: currentPage + 1,
      },
    };
  }
}

export interface WebhookEventsPageResponse<Item> {
  data: WebhookEventsPageResponse.Data<Item>;
}

export namespace WebhookEventsPageResponse {
  export interface Data<Item> {
    events?: Array<Item>;

    pagination?: Data.Pagination;
  }

  export namespace Data {
    export interface Pagination {
      has_more?: boolean;
    }
  }
}

export interface WebhookEventsPageParams {
  page?: number;

  page_size?: number;
}

export class WebhookEventsPage<Item> extends AbstractPage<Item> implements WebhookEventsPageResponse<Item> {
  data: WebhookEventsPageResponse.Data<Item>;

  constructor(
    client: Sent,
    response: Response,
    body: WebhookEventsPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.data = body.data || {};
  }

  getPaginatedItems(): Item[] {
    return this.data?.events ?? [];
  }

  override hasNextPage(): boolean {
    if (this.data?.pagination?.has_more === false) {
      return false;
    }

    return super.hasNextPage();
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const query = this.options.query as WebhookEventsPageParams;
    const currentPage = query?.page ?? 1;

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        page: currentPage + 1,
      },
    };
  }
}
