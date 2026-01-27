# Profiles

Types:

- <code><a href="./src/resources/profiles/profiles.ts">ProfileListTemplatesResponse</a></code>

Methods:

- <code title="get /v3/profiles/{profileId}/templates">client.profiles.<a href="./src/resources/profiles/profiles.ts">listTemplates</a>(profileID, { ...params }) -> ProfileListTemplatesResponse</code>
- <code title="post /v3/profiles/{profileId}/messages">client.profiles.<a href="./src/resources/profiles/profiles.ts">sendMessage</a>(profileID, { ...params }) -> void</code>

## Users

Types:

- <code><a href="./src/resources/profiles/users.ts">BaseDto</a></code>
- <code><a href="./src/resources/profiles/users.ts">CustomerUserDto</a></code>
- <code><a href="./src/resources/profiles/users.ts">InviteUserRequest</a></code>
- <code><a href="./src/resources/profiles/users.ts">InviteUserResponse</a></code>
- <code><a href="./src/resources/profiles/users.ts">UpdateUserRoleRequest</a></code>
- <code><a href="./src/resources/profiles/users.ts">UserListResponse</a></code>

Methods:

- <code title="get /v3/profiles/{profileId}/users/{userId}">client.profiles.users.<a href="./src/resources/profiles/users.ts">retrieve</a>(userID, { ...params }) -> CustomerUserDto</code>
- <code title="get /v3/profiles/{profileId}/users">client.profiles.users.<a href="./src/resources/profiles/users.ts">list</a>(profileID, { ...params }) -> UserListResponse</code>
- <code title="delete /v3/profiles/{profileId}/users/{userId}">client.profiles.users.<a href="./src/resources/profiles/users.ts">delete</a>(userID, { ...params }) -> void</code>
- <code title="post /v3/profiles/{profileId}/users/invite">client.profiles.users.<a href="./src/resources/profiles/users.ts">invite</a>(profileID, { ...params }) -> InviteUserResponse</code>
- <code title="put /v3/profiles/{profileId}/users/{userId}/role">client.profiles.users.<a href="./src/resources/profiles/users.ts">updateRole</a>(userID, { ...params }) -> void</code>

## Contacts

Types:

- <code><a href="./src/resources/profiles/contacts.ts">ContactListItemProfile</a></code>
- <code><a href="./src/resources/profiles/contacts.ts">ContactListResponse</a></code>

Methods:

- <code title="get /v3/profiles/{profileId}/contacts/{contactId}">client.profiles.contacts.<a href="./src/resources/profiles/contacts.ts">retrieve</a>(contactID, { ...params }) -> ContactListItemProfile</code>
- <code title="get /v3/profiles/{profileId}/contacts">client.profiles.contacts.<a href="./src/resources/profiles/contacts.ts">list</a>(profileID, { ...params }) -> ContactListResponse</code>

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

Types:

- <code><a href="./src/resources/organizations/profiles/users.ts">InvitationDetails</a></code>

Methods:

- <code title="get /v3/organizations/{customerId}/profiles/{profileId}/users/invitations/{token}">client.organizations.profiles.users.<a href="./src/resources/organizations/profiles/users.ts">retrieveInvitationDetails</a>(token, { ...params }) -> InvitationDetails</code>

## Users

Types:

- <code><a href="./src/resources/organizations/users.ts">UserListByCustomerResponse</a></code>

Methods:

- <code title="get /v3/organizations/{orgId}/users/{userId}">client.organizations.users.<a href="./src/resources/organizations/users.ts">retrieve</a>(userID, { ...params }) -> CustomerUserDto</code>
- <code title="get /v3/organizations/{orgId}/users">client.organizations.users.<a href="./src/resources/organizations/users.ts">list</a>(orgID, { ...params }) -> UserListResponse</code>
- <code title="delete /v3/organizations/{orgId}/users/{userId}">client.organizations.users.<a href="./src/resources/organizations/users.ts">delete</a>(userID, { ...params }) -> void</code>
- <code title="post /v2/organizations/{customerId}/users">client.organizations.users.<a href="./src/resources/organizations/users.ts">createOrInvite</a>(customerID, { ...params }) -> CustomerUserDto</code>
- <code title="delete /v2/organizations/{customerId}/users/{userId}">client.organizations.users.<a href="./src/resources/organizations/users.ts">deleteByCustomer</a>(userID, { ...params }) -> void</code>
- <code title="post /v3/organizations/{orgId}/users/invite">client.organizations.users.<a href="./src/resources/organizations/users.ts">invite</a>(orgID, { ...params }) -> InviteUserResponse</code>
- <code title="get /v2/organizations/{customerId}/users">client.organizations.users.<a href="./src/resources/organizations/users.ts">listByCustomer</a>(customerID, { ...params }) -> UserListByCustomerResponse</code>
- <code title="get /v2/organizations/{customerId}/users/{userId}">client.organizations.users.<a href="./src/resources/organizations/users.ts">retrieveByCustomer</a>(userID, { ...params }) -> CustomerUserDto</code>
- <code title="get /v3/organizations/{customerId}/users/invitations/{token}">client.organizations.users.<a href="./src/resources/organizations/users.ts">retrieveInvitationDetails</a>(token, { ...params }) -> InvitationDetails</code>
- <code title="put /v3/organizations/{orgId}/users/{userId}/role">client.organizations.users.<a href="./src/resources/organizations/users.ts">updateRole</a>(userID, { ...params }) -> void</code>
- <code title="put /v2/organizations/{customerId}/users/{userId}">client.organizations.users.<a href="./src/resources/organizations/users.ts">updateRoleByCustomer</a>(userID, { ...params }) -> CustomerUserDto</code>

# Healthcheck

Methods:

- <code title="get /healthcheck">client.healthcheck.<a href="./src/resources/healthcheck.ts">check</a>() -> void</code>

# Health

Methods:

- <code title="get /health/live">client.health.<a href="./src/resources/health.ts">checkLive</a>() -> void</code>
- <code title="get /health/ready">client.health.<a href="./src/resources/health.ts">checkReady</a>() -> void</code>

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
