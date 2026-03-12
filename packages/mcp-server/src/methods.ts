// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.webhooks.create',
    fullyQualifiedName: 'webhooks.create',
    httpMethod: 'post',
    httpPath: '/v3/webhooks',
  },
  {
    clientCallName: 'client.webhooks.retrieve',
    fullyQualifiedName: 'webhooks.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/webhooks/{id}',
  },
  {
    clientCallName: 'client.webhooks.update',
    fullyQualifiedName: 'webhooks.update',
    httpMethod: 'put',
    httpPath: '/v3/webhooks/{id}',
  },
  {
    clientCallName: 'client.webhooks.list',
    fullyQualifiedName: 'webhooks.list',
    httpMethod: 'get',
    httpPath: '/v3/webhooks',
  },
  {
    clientCallName: 'client.webhooks.delete',
    fullyQualifiedName: 'webhooks.delete',
    httpMethod: 'delete',
    httpPath: '/v3/webhooks/{id}',
  },
  {
    clientCallName: 'client.webhooks.listEventTypes',
    fullyQualifiedName: 'webhooks.listEventTypes',
    httpMethod: 'get',
    httpPath: '/v3/webhooks/event-types',
  },
  {
    clientCallName: 'client.webhooks.listEvents',
    fullyQualifiedName: 'webhooks.listEvents',
    httpMethod: 'get',
    httpPath: '/v3/webhooks/{id}/events',
  },
  {
    clientCallName: 'client.webhooks.rotateSecret',
    fullyQualifiedName: 'webhooks.rotateSecret',
    httpMethod: 'post',
    httpPath: '/v3/webhooks/{id}/rotate-secret',
  },
  {
    clientCallName: 'client.webhooks.test',
    fullyQualifiedName: 'webhooks.test',
    httpMethod: 'post',
    httpPath: '/v3/webhooks/{id}/test',
  },
  {
    clientCallName: 'client.webhooks.toggleStatus',
    fullyQualifiedName: 'webhooks.toggleStatus',
    httpMethod: 'patch',
    httpPath: '/v3/webhooks/{id}/toggle-status',
  },
  {
    clientCallName: 'client.users.retrieve',
    fullyQualifiedName: 'users.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/users/{userId}',
  },
  {
    clientCallName: 'client.users.list',
    fullyQualifiedName: 'users.list',
    httpMethod: 'get',
    httpPath: '/v3/users',
  },
  {
    clientCallName: 'client.users.invite',
    fullyQualifiedName: 'users.invite',
    httpMethod: 'post',
    httpPath: '/v3/users',
  },
  {
    clientCallName: 'client.users.remove',
    fullyQualifiedName: 'users.remove',
    httpMethod: 'delete',
    httpPath: '/v3/users/{userId}',
  },
  {
    clientCallName: 'client.users.updateRole',
    fullyQualifiedName: 'users.updateRole',
    httpMethod: 'patch',
    httpPath: '/v3/users/{userId}',
  },
  {
    clientCallName: 'client.templates.create',
    fullyQualifiedName: 'templates.create',
    httpMethod: 'post',
    httpPath: '/v3/templates',
  },
  {
    clientCallName: 'client.templates.retrieve',
    fullyQualifiedName: 'templates.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/templates/{id}',
  },
  {
    clientCallName: 'client.templates.update',
    fullyQualifiedName: 'templates.update',
    httpMethod: 'put',
    httpPath: '/v3/templates/{id}',
  },
  {
    clientCallName: 'client.templates.list',
    fullyQualifiedName: 'templates.list',
    httpMethod: 'get',
    httpPath: '/v3/templates',
  },
  {
    clientCallName: 'client.templates.delete',
    fullyQualifiedName: 'templates.delete',
    httpMethod: 'delete',
    httpPath: '/v3/templates/{id}',
  },
  {
    clientCallName: 'client.profiles.create',
    fullyQualifiedName: 'profiles.create',
    httpMethod: 'post',
    httpPath: '/v3/profiles',
  },
  {
    clientCallName: 'client.profiles.retrieve',
    fullyQualifiedName: 'profiles.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/profiles/{profileId}',
  },
  {
    clientCallName: 'client.profiles.update',
    fullyQualifiedName: 'profiles.update',
    httpMethod: 'patch',
    httpPath: '/v3/profiles/{profileId}',
  },
  {
    clientCallName: 'client.profiles.list',
    fullyQualifiedName: 'profiles.list',
    httpMethod: 'get',
    httpPath: '/v3/profiles',
  },
  {
    clientCallName: 'client.profiles.delete',
    fullyQualifiedName: 'profiles.delete',
    httpMethod: 'delete',
    httpPath: '/v3/profiles/{profileId}',
  },
  {
    clientCallName: 'client.profiles.complete',
    fullyQualifiedName: 'profiles.complete',
    httpMethod: 'post',
    httpPath: '/v3/profiles/{profileId}/complete',
  },
  {
    clientCallName: 'client.profiles.campaigns.create',
    fullyQualifiedName: 'profiles.campaigns.create',
    httpMethod: 'post',
    httpPath: '/v3/profiles/{profileId}/campaigns',
  },
  {
    clientCallName: 'client.profiles.campaigns.update',
    fullyQualifiedName: 'profiles.campaigns.update',
    httpMethod: 'put',
    httpPath: '/v3/profiles/{profileId}/campaigns/{campaignId}',
  },
  {
    clientCallName: 'client.profiles.campaigns.list',
    fullyQualifiedName: 'profiles.campaigns.list',
    httpMethod: 'get',
    httpPath: '/v3/profiles/{profileId}/campaigns',
  },
  {
    clientCallName: 'client.profiles.campaigns.delete',
    fullyQualifiedName: 'profiles.campaigns.delete',
    httpMethod: 'delete',
    httpPath: '/v3/profiles/{profileId}/campaigns/{campaignId}',
  },
  {
    clientCallName: 'client.numbers.lookup',
    fullyQualifiedName: 'numbers.lookup',
    httpMethod: 'get',
    httpPath: '/v3/numbers/lookup/{phoneNumber}',
  },
  {
    clientCallName: 'client.messages.retrieveActivities',
    fullyQualifiedName: 'messages.retrieveActivities',
    httpMethod: 'get',
    httpPath: '/v3/messages/{id}/activities',
  },
  {
    clientCallName: 'client.messages.retrieveStatus',
    fullyQualifiedName: 'messages.retrieveStatus',
    httpMethod: 'get',
    httpPath: '/v3/messages/{id}',
  },
  {
    clientCallName: 'client.messages.send',
    fullyQualifiedName: 'messages.send',
    httpMethod: 'post',
    httpPath: '/v3/messages',
  },
  {
    clientCallName: 'client.contacts.create',
    fullyQualifiedName: 'contacts.create',
    httpMethod: 'post',
    httpPath: '/v3/contacts',
  },
  {
    clientCallName: 'client.contacts.retrieve',
    fullyQualifiedName: 'contacts.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/contacts/{id}',
  },
  {
    clientCallName: 'client.contacts.update',
    fullyQualifiedName: 'contacts.update',
    httpMethod: 'patch',
    httpPath: '/v3/contacts/{id}',
  },
  {
    clientCallName: 'client.contacts.list',
    fullyQualifiedName: 'contacts.list',
    httpMethod: 'get',
    httpPath: '/v3/contacts',
  },
  {
    clientCallName: 'client.contacts.delete',
    fullyQualifiedName: 'contacts.delete',
    httpMethod: 'delete',
    httpPath: '/v3/contacts/{id}',
  },
  {
    clientCallName: 'client.me.retrieve',
    fullyQualifiedName: 'me.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/me',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
