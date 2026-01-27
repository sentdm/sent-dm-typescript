# Profiles

## Users

Types:

- <code><a href="./src/resources/profiles/users.ts">BaseDto</a></code>
- <code><a href="./src/resources/profiles/users.ts">CustomerUserDto</a></code>

## Contacts

# Organizations

Types:

- <code><a href="./src/resources/organizations/organizations.ts">OrganizationListAuthenticatedUserOrganizationsResponse</a></code>

Methods:

- <code title="get /v2/organizations">client.organizations.<a href="./src/resources/organizations/organizations.ts">listAuthenticatedUserOrganizations</a>() -> OrganizationListAuthenticatedUserOrganizationsResponse</code>

## Profiles

Types:

- <code><a href="./src/resources/organizations/profiles/profiles.ts">ProfileSummary</a></code>
- <code><a href="./src/resources/organizations/profiles/profiles.ts">ProfileListResponse</a></code>

Methods:

- <code title="get /v2/organizations/{orgId}/profiles">client.organizations.profiles.<a href="./src/resources/organizations/profiles/profiles.ts">list</a>(orgID) -> ProfileListResponse</code>

### Users

## Users

Types:

- <code><a href="./src/resources/organizations/users.ts">UserListByCustomerResponse</a></code>

Methods:

- <code title="post /v2/organizations/{customerId}/users">client.organizations.users.<a href="./src/resources/organizations/users.ts">createOrInvite</a>(customerID, { ...params }) -> CustomerUserDto</code>
- <code title="delete /v2/organizations/{customerId}/users/{userId}">client.organizations.users.<a href="./src/resources/organizations/users.ts">deleteByCustomer</a>(userID, { ...params }) -> void</code>
- <code title="get /v2/organizations/{customerId}/users">client.organizations.users.<a href="./src/resources/organizations/users.ts">listByCustomer</a>(customerID, { ...params }) -> UserListByCustomerResponse</code>
- <code title="get /v2/organizations/{customerId}/users/{userId}">client.organizations.users.<a href="./src/resources/organizations/users.ts">retrieveByCustomer</a>(userID, { ...params }) -> CustomerUserDto</code>
- <code title="put /v2/organizations/{customerId}/users/{userId}">client.organizations.users.<a href="./src/resources/organizations/users.ts">updateRoleByCustomer</a>(userID, { ...params }) -> CustomerUserDto</code>

# Healthcheck

# Health

# Templates

Types:

- <code><a href="./src/resources/templates.ts">TemplateBodyContent</a></code>
- <code><a href="./src/resources/templates.ts">TemplateDefinition</a></code>
- <code><a href="./src/resources/templates.ts">TemplateResponseV2</a></code>
- <code><a href="./src/resources/templates.ts">TemplateVariable</a></code>
- <code><a href="./src/resources/templates.ts">TemplateListResponse</a></code>

Methods:

- <code title="post /v2/templates">client.templates.<a href="./src/resources/templates.ts">create</a>({ ...params }) -> TemplateResponseV2</code>
- <code title="get /v2/templates/{id}">client.templates.<a href="./src/resources/templates.ts">retrieve</a>(id) -> TemplateResponseV2</code>
- <code title="get /v2/templates">client.templates.<a href="./src/resources/templates.ts">list</a>({ ...params }) -> TemplateListResponse</code>
- <code title="delete /v2/templates/{id}">client.templates.<a href="./src/resources/templates.ts">delete</a>(id) -> void</code>

# Contacts

Types:

- <code><a href="./src/resources/contacts.ts">ContactListItemV2</a></code>
- <code><a href="./src/resources/contacts.ts">ContactListResponse</a></code>

Methods:

- <code title="get /v2/contacts">client.contacts.<a href="./src/resources/contacts.ts">list</a>({ ...params }) -> ContactListResponse</code>
- <code title="get /v2/contacts/phone">client.contacts.<a href="./src/resources/contacts.ts">retrieveByPhone</a>({ ...params }) -> ContactListItemV2</code>
- <code title="get /v2/contacts/id">client.contacts.<a href="./src/resources/contacts.ts">retrieveID</a>({ ...params }) -> ContactListItemV2</code>

# Messages

Types:

- <code><a href="./src/resources/messages.ts">MessageRetrieveResponse</a></code>

Methods:

- <code title="get /v2/messages/{id}">client.messages.<a href="./src/resources/messages.ts">retrieve</a>(id) -> MessageRetrieveResponse</code>
- <code title="post /v2/messages/quick-message">client.messages.<a href="./src/resources/messages.ts">sendQuickMessage</a>({ ...params }) -> void</code>
- <code title="post /v2/messages/contact">client.messages.<a href="./src/resources/messages.ts">sendToContact</a>({ ...params }) -> void</code>
- <code title="post /v2/messages/phone">client.messages.<a href="./src/resources/messages.ts">sendToPhone</a>({ ...params }) -> void</code>

# NumberLookup

Types:

- <code><a href="./src/resources/number-lookup.ts">NumberLookupRetrieveResponse</a></code>

Methods:

- <code title="get /v2/number-lookup">client.numberLookup.<a href="./src/resources/number-lookup.ts">retrieve</a>({ ...params }) -> NumberLookupRetrieveResponse</code>
