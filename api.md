# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">APIError</a></code>
- <code><a href="./src/resources/webhooks.ts">APIMeta</a></code>
- <code><a href="./src/resources/webhooks.ts">APIResponseWebhook</a></code>
- <code><a href="./src/resources/webhooks.ts">MutationRequest</a></code>
- <code><a href="./src/resources/webhooks.ts">PaginationMeta</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListEventTypesResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListEventsResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookRotateSecretResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookTestResponse</a></code>

Methods:

- <code title="post /v3/webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">create</a>({ ...params }) -> APIResponseWebhook</code>
- <code title="get /v3/webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks.ts">retrieve</a>(id) -> APIResponseWebhook</code>
- <code title="put /v3/webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks.ts">update</a>(id, { ...params }) -> APIResponseWebhook</code>
- <code title="get /v3/webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">list</a>({ ...params }) -> WebhookListResponse</code>
- <code title="delete /v3/webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks.ts">delete</a>(id) -> void</code>
- <code title="get /v3/webhooks/event-types">client.webhooks.<a href="./src/resources/webhooks.ts">listEventTypes</a>() -> WebhookListEventTypesResponse</code>
- <code title="get /v3/webhooks/{id}/events">client.webhooks.<a href="./src/resources/webhooks.ts">listEvents</a>(id, { ...params }) -> WebhookListEventsResponse</code>
- <code title="post /v3/webhooks/{id}/rotate-secret">client.webhooks.<a href="./src/resources/webhooks.ts">rotateSecret</a>(id, { ...params }) -> WebhookRotateSecretResponse</code>
- <code title="post /v3/webhooks/{id}/test">client.webhooks.<a href="./src/resources/webhooks.ts">test</a>(id, { ...params }) -> WebhookTestResponse</code>
- <code title="patch /v3/webhooks/{id}/toggle-status">client.webhooks.<a href="./src/resources/webhooks.ts">toggleStatus</a>(id, { ...params }) -> APIResponseWebhook</code>

# Users

Types:

- <code><a href="./src/resources/users.ts">APIResponseOfUser</a></code>
- <code><a href="./src/resources/users.ts">UserResponse</a></code>
- <code><a href="./src/resources/users.ts">UserListResponse</a></code>

Methods:

- <code title="get /v3/users/{userId}">client.users.<a href="./src/resources/users.ts">retrieve</a>(userID) -> APIResponseOfUser</code>
- <code title="get /v3/users">client.users.<a href="./src/resources/users.ts">list</a>() -> UserListResponse</code>
- <code title="post /v3/users">client.users.<a href="./src/resources/users.ts">invite</a>({ ...params }) -> APIResponseOfUser</code>
- <code title="delete /v3/users/{userId}">client.users.<a href="./src/resources/users.ts">remove</a>(userID, { ...params }) -> void</code>
- <code title="patch /v3/users/{userId}">client.users.<a href="./src/resources/users.ts">updateRole</a>(userID, { ...params }) -> APIResponseOfUser</code>

# Templates

Types:

- <code><a href="./src/resources/templates.ts">APIResponseTemplate</a></code>
- <code><a href="./src/resources/templates.ts">Template</a></code>
- <code><a href="./src/resources/templates.ts">TemplateBodyContent</a></code>
- <code><a href="./src/resources/templates.ts">TemplateDefinition</a></code>
- <code><a href="./src/resources/templates.ts">TemplateVariable</a></code>
- <code><a href="./src/resources/templates.ts">TemplateListResponse</a></code>

Methods:

- <code title="post /v3/templates">client.templates.<a href="./src/resources/templates.ts">create</a>({ ...params }) -> APIResponseTemplate</code>
- <code title="get /v3/templates/{id}">client.templates.<a href="./src/resources/templates.ts">retrieve</a>(id) -> APIResponseTemplate</code>
- <code title="put /v3/templates/{id}">client.templates.<a href="./src/resources/templates.ts">update</a>(id, { ...params }) -> APIResponseTemplate</code>
- <code title="get /v3/templates">client.templates.<a href="./src/resources/templates.ts">list</a>({ ...params }) -> TemplateListResponse</code>
- <code title="delete /v3/templates/{id}">client.templates.<a href="./src/resources/templates.ts">delete</a>(id, { ...params }) -> void</code>

# Profiles

Types:

- <code><a href="./src/resources/profiles.ts">APIResponseOfProfileDetail</a></code>
- <code><a href="./src/resources/profiles.ts">ProfileDetail</a></code>
- <code><a href="./src/resources/profiles.ts">ProfileListResponse</a></code>
- <code><a href="./src/resources/profiles.ts">ProfileCompleteResponse</a></code>

Methods:

- <code title="post /v3/profiles">client.profiles.<a href="./src/resources/profiles.ts">create</a>({ ...params }) -> APIResponseOfProfileDetail</code>
- <code title="get /v3/profiles/{profileId}">client.profiles.<a href="./src/resources/profiles.ts">retrieve</a>(profileID) -> APIResponseOfProfileDetail</code>
- <code title="patch /v3/profiles/{profileId}">client.profiles.<a href="./src/resources/profiles.ts">update</a>(profileID, { ...params }) -> APIResponseOfProfileDetail</code>
- <code title="get /v3/profiles">client.profiles.<a href="./src/resources/profiles.ts">list</a>() -> ProfileListResponse</code>
- <code title="delete /v3/profiles/{profileId}">client.profiles.<a href="./src/resources/profiles.ts">delete</a>(profileID, { ...params }) -> void</code>
- <code title="post /v3/profiles/{profileId}/complete">client.profiles.<a href="./src/resources/profiles.ts">complete</a>(profileID, { ...params }) -> unknown</code>

# Messages

Types:

- <code><a href="./src/resources/messages.ts">MessageRetrieveActivitiesResponse</a></code>
- <code><a href="./src/resources/messages.ts">MessageRetrieveStatusResponse</a></code>
- <code><a href="./src/resources/messages.ts">MessageSendResponse</a></code>

Methods:

- <code title="get /v3/messages/{id}/activities">client.messages.<a href="./src/resources/messages.ts">retrieveActivities</a>(id) -> MessageRetrieveActivitiesResponse</code>
- <code title="get /v3/messages/{id}">client.messages.<a href="./src/resources/messages.ts">retrieveStatus</a>(id) -> MessageRetrieveStatusResponse</code>
- <code title="post /v3/messages">client.messages.<a href="./src/resources/messages.ts">send</a>({ ...params }) -> MessageSendResponse</code>

# Lookup

Types:

- <code><a href="./src/resources/lookup.ts">LookupRetrievePhoneInfoResponse</a></code>

Methods:

- <code title="get /v3/lookup/number/{phoneNumber}">client.lookup.<a href="./src/resources/lookup.ts">retrievePhoneInfo</a>(phoneNumber) -> LookupRetrievePhoneInfoResponse</code>

# Contacts

Types:

- <code><a href="./src/resources/contacts.ts">APIResponseContact</a></code>
- <code><a href="./src/resources/contacts.ts">Contact</a></code>
- <code><a href="./src/resources/contacts.ts">ContactListResponse</a></code>

Methods:

- <code title="post /v3/contacts">client.contacts.<a href="./src/resources/contacts.ts">create</a>({ ...params }) -> APIResponseContact</code>
- <code title="get /v3/contacts/{id}">client.contacts.<a href="./src/resources/contacts.ts">retrieve</a>(id) -> APIResponseContact</code>
- <code title="patch /v3/contacts/{id}">client.contacts.<a href="./src/resources/contacts.ts">update</a>(id, { ...params }) -> APIResponseContact</code>
- <code title="get /v3/contacts">client.contacts.<a href="./src/resources/contacts.ts">list</a>({ ...params }) -> ContactListResponse</code>
- <code title="delete /v3/contacts/{id}">client.contacts.<a href="./src/resources/contacts.ts">delete</a>(id, { ...params }) -> void</code>

# Brands

Types:

- <code><a href="./src/resources/brands/brands.ts">APIResponseBrandWithKYC</a></code>
- <code><a href="./src/resources/brands/brands.ts">BrandData</a></code>
- <code><a href="./src/resources/brands/brands.ts">BrandWithKYC</a></code>
- <code><a href="./src/resources/brands/brands.ts">DestinationCountry</a></code>
- <code><a href="./src/resources/brands/brands.ts">TcrBrandRelationship</a></code>
- <code><a href="./src/resources/brands/brands.ts">TcrVertical</a></code>
- <code><a href="./src/resources/brands/brands.ts">BrandListResponse</a></code>

Methods:

- <code title="post /v3/brands">client.brands.<a href="./src/resources/brands/brands.ts">create</a>({ ...params }) -> APIResponseBrandWithKYC</code>
- <code title="put /v3/brands/{brandId}">client.brands.<a href="./src/resources/brands/brands.ts">update</a>(brandID, { ...params }) -> APIResponseBrandWithKYC</code>
- <code title="get /v3/brands">client.brands.<a href="./src/resources/brands/brands.ts">list</a>() -> BrandListResponse</code>
- <code title="delete /v3/brands/{brandId}">client.brands.<a href="./src/resources/brands/brands.ts">delete</a>(brandID, { ...params }) -> void</code>

## Campaigns

Types:

- <code><a href="./src/resources/brands/campaigns.ts">APIResponseTcrCampaignWithUseCases</a></code>
- <code><a href="./src/resources/brands/campaigns.ts">BaseDto</a></code>
- <code><a href="./src/resources/brands/campaigns.ts">CampaignData</a></code>
- <code><a href="./src/resources/brands/campaigns.ts">MessagingUseCaseUs</a></code>
- <code><a href="./src/resources/brands/campaigns.ts">TcrCampaignWithUseCases</a></code>
- <code><a href="./src/resources/brands/campaigns.ts">CampaignListResponse</a></code>

Methods:

- <code title="post /v3/brands/{brandId}/campaigns">client.brands.campaigns.<a href="./src/resources/brands/campaigns.ts">create</a>(brandID, { ...params }) -> APIResponseTcrCampaignWithUseCases</code>
- <code title="put /v3/brands/{brandId}/campaigns/{campaignId}">client.brands.campaigns.<a href="./src/resources/brands/campaigns.ts">update</a>(campaignID, { ...params }) -> APIResponseTcrCampaignWithUseCases</code>
- <code title="get /v3/brands/{brandId}/campaigns">client.brands.campaigns.<a href="./src/resources/brands/campaigns.ts">list</a>(brandID) -> CampaignListResponse</code>
- <code title="delete /v3/brands/{brandId}/campaigns/{campaignId}">client.brands.campaigns.<a href="./src/resources/brands/campaigns.ts">delete</a>(campaignID, { ...params }) -> void</code>

# Me

Types:

- <code><a href="./src/resources/me.ts">ProfileSettings</a></code>
- <code><a href="./src/resources/me.ts">MeRetrieveResponse</a></code>

Methods:

- <code title="get /v3/me">client.me.<a href="./src/resources/me.ts">retrieve</a>() -> MeRetrieveResponse</code>
