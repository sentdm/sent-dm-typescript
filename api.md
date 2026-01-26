# Templates

Types:

- <code><a href="./src/resources/templates.ts">TemplateBodyContent</a></code>
- <code><a href="./src/resources/templates.ts">TemplateDefinition</a></code>
- <code><a href="./src/resources/templates.ts">TemplateResponse</a></code>
- <code><a href="./src/resources/templates.ts">TemplateVariable</a></code>
- <code><a href="./src/resources/templates.ts">TemplateListResponse</a></code>

Methods:

- <code title="post /v2/templates">client.templates.<a href="./src/resources/templates.ts">create</a>({ ...params }) -> TemplateResponse</code>
- <code title="get /v2/templates/{id}">client.templates.<a href="./src/resources/templates.ts">retrieve</a>(id, { ...params }) -> TemplateResponse</code>
- <code title="get /v2/templates">client.templates.<a href="./src/resources/templates.ts">list</a>({ ...params }) -> TemplateListResponse</code>
- <code title="delete /v2/templates/{id}">client.templates.<a href="./src/resources/templates.ts">delete</a>(id, { ...params }) -> void</code>

# Contacts

Types:

- <code><a href="./src/resources/contacts.ts">ContactListItem</a></code>
- <code><a href="./src/resources/contacts.ts">ContactListResponse</a></code>

Methods:

- <code title="get /v2/contacts">client.contacts.<a href="./src/resources/contacts.ts">list</a>({ ...params }) -> ContactListResponse</code>
- <code title="get /v2/contacts/phone">client.contacts.<a href="./src/resources/contacts.ts">retrieveByPhone</a>({ ...params }) -> ContactListItem</code>
- <code title="get /v2/contacts/id">client.contacts.<a href="./src/resources/contacts.ts">retrieveID</a>({ ...params }) -> ContactListItem</code>

# Messages

Types:

- <code><a href="./src/resources/messages.ts">MessageRetrieveResponse</a></code>

Methods:

- <code title="get /v2/messages/{id}">client.messages.<a href="./src/resources/messages.ts">retrieve</a>(id, { ...params }) -> MessageRetrieveResponse</code>
- <code title="post /v2/messages/quick-message">client.messages.<a href="./src/resources/messages.ts">sendQuickMessage</a>({ ...params }) -> void</code>
- <code title="post /v2/messages/contact">client.messages.<a href="./src/resources/messages.ts">sendToContact</a>({ ...params }) -> void</code>
- <code title="post /v2/messages/phone">client.messages.<a href="./src/resources/messages.ts">sendToPhone</a>({ ...params }) -> void</code>

# NumberLookup

Types:

- <code><a href="./src/resources/number-lookup.ts">NumberLookupRetrieveResponse</a></code>

Methods:

- <code title="get /v2/number-lookup">client.numberLookup.<a href="./src/resources/number-lookup.ts">retrieve</a>({ ...params }) -> NumberLookupRetrieveResponse</code>

# Organizations

Types:

- <code><a href="./src/resources/organizations/organizations.ts">ProfileSummary</a></code>
- <code><a href="./src/resources/organizations/organizations.ts">OrganizationListResponse</a></code>
- <code><a href="./src/resources/organizations/organizations.ts">OrganizationRetrieveProfilesResponse</a></code>

Methods:

- <code title="get /v2/organizations">client.organizations.<a href="./src/resources/organizations/organizations.ts">list</a>() -> OrganizationListResponse</code>
- <code title="get /v2/organizations/{orgId}/profiles">client.organizations.<a href="./src/resources/organizations/organizations.ts">retrieveProfiles</a>(orgID, { ...params }) -> OrganizationRetrieveProfilesResponse</code>

## Users

Types:

- <code><a href="./src/resources/organizations/users.ts">CustomerUser</a></code>
- <code><a href="./src/resources/organizations/users.ts">UserListResponse</a></code>

Methods:

- <code title="get /v2/organizations/{customerId}/users/{userId}">client.organizations.users.<a href="./src/resources/organizations/users.ts">retrieve</a>(userID, { ...params }) -> CustomerUser</code>
- <code title="get /v2/organizations/{customerId}/users">client.organizations.users.<a href="./src/resources/organizations/users.ts">list</a>(customerID, { ...params }) -> UserListResponse</code>
- <code title="delete /v2/organizations/{customerId}/users/{userId}">client.organizations.users.<a href="./src/resources/organizations/users.ts">delete</a>(userID, { ...params }) -> void</code>
- <code title="post /v2/organizations/{customerId}/users">client.organizations.users.<a href="./src/resources/organizations/users.ts">invite</a>(customerID, { ...params }) -> CustomerUser</code>
- <code title="put /v2/organizations/{customerId}/users/{userId}">client.organizations.users.<a href="./src/resources/organizations/users.ts">updateRole</a>(userID, { ...params }) -> CustomerUser</code>
