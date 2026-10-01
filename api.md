# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">APIMeta</a></code>
- <code><a href="./src/resources/webhooks.ts">APIResponseWebhook</a></code>
- <code><a href="./src/resources/webhooks.ts">CallEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">CallEventPayload</a></code>
- <code><a href="./src/resources/webhooks.ts">ChannelEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ChannelEventPayload</a></code>
- <code><a href="./src/resources/webhooks.ts">ContactEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ContactEventPayload</a></code>
- <code><a href="./src/resources/webhooks.ts">ErrorDetail</a></code>
- <code><a href="./src/resources/webhooks.ts">InboundMessageEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">InboundMessageEventPayload</a></code>
- <code><a href="./src/resources/webhooks.ts">MessageEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">MessageEventPayload</a></code>
- <code><a href="./src/resources/webhooks.ts">MutationRequest</a></code>
- <code><a href="./src/resources/webhooks.ts">PaginationMeta</a></code>
- <code><a href="./src/resources/webhooks.ts">TemplateEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">TemplateEventPayload</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookEventType</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListEventTypesResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListEventsResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookRotateSecretResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookTestResponse</a></code>

Methods:

- <code title="post /v3/webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">create</a>({ ...params }) -> APIResponseWebhook</code>
- <code title="get /v3/webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks.ts">retrieve</a>(id, { ...params }) -> APIResponseWebhook</code>
- <code title="put /v3/webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks.ts">update</a>(id, { ...params }) -> APIResponseWebhook</code>
- <code title="get /v3/webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">list</a>({ ...params }) -> WebhookResponsesWebhooksPage</code>
- <code title="delete /v3/webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks.ts">delete</a>(id, { ...params }) -> void</code>
- <code title="get /v3/webhooks/event-types">client.webhooks.<a href="./src/resources/webhooks.ts">listEventTypes</a>({ ...params }) -> WebhookListEventTypesResponse</code>
- <code title="get /v3/webhooks/{id}/events">client.webhooks.<a href="./src/resources/webhooks.ts">listEvents</a>(id, { ...params }) -> WebhookListEventsResponsesWebhookEventsPage</code>
- <code title="post /v3/webhooks/{id}/rotate-secret">client.webhooks.<a href="./src/resources/webhooks.ts">rotateSecret</a>(id, { ...params }) -> WebhookRotateSecretResponse</code>
- <code title="post /v3/webhooks/{id}/test">client.webhooks.<a href="./src/resources/webhooks.ts">test</a>(id, { ...params }) -> WebhookTestResponse</code>
- <code title="patch /v3/webhooks/{id}/toggle-status">client.webhooks.<a href="./src/resources/webhooks.ts">toggleStatus</a>(id, { ...params }) -> APIResponseWebhook</code>

# Users

Types:

- <code><a href="./src/resources/users.ts">APIResponseOfUser</a></code>
- <code><a href="./src/resources/users.ts">UserResponse</a></code>
- <code><a href="./src/resources/users.ts">UserListResponse</a></code>

Methods:

- <code title="get /v3/users/{userId}">client.users.<a href="./src/resources/users.ts">retrieve</a>(userID, { ...params }) -> APIResponseOfUser</code>
- <code title="get /v3/users">client.users.<a href="./src/resources/users.ts">list</a>({ ...params }) -> UserListResponse</code>
- <code title="post /v3/users">client.users.<a href="./src/resources/users.ts">invite</a>({ ...params }) -> APIResponseOfUser</code>
- <code title="delete /v3/users/{userId}">client.users.<a href="./src/resources/users.ts">remove</a>(userID, { ...params }) -> void</code>
- <code title="patch /v3/users/{userId}">client.users.<a href="./src/resources/users.ts">updateRole</a>(userID, { ...params }) -> APIResponseOfUser</code>

# Templates

Types:

- <code><a href="./src/resources/templates.ts">APIResponseTemplate</a></code>
- <code><a href="./src/resources/templates.ts">AuthenticationConfig</a></code>
- <code><a href="./src/resources/templates.ts">Template</a></code>
- <code><a href="./src/resources/templates.ts">TemplateBody</a></code>
- <code><a href="./src/resources/templates.ts">TemplateBodyContent</a></code>
- <code><a href="./src/resources/templates.ts">TemplateButton</a></code>
- <code><a href="./src/resources/templates.ts">TemplateButtonProps</a></code>
- <code><a href="./src/resources/templates.ts">TemplateDefinition</a></code>
- <code><a href="./src/resources/templates.ts">TemplateFooter</a></code>
- <code><a href="./src/resources/templates.ts">TemplateHeader</a></code>
- <code><a href="./src/resources/templates.ts">TemplateVariable</a></code>

Methods:

- <code title="post /v3/templates">client.templates.<a href="./src/resources/templates.ts">create</a>({ ...params }) -> APIResponseTemplate</code>
- <code title="get /v3/templates/{id}">client.templates.<a href="./src/resources/templates.ts">retrieve</a>(id, { ...params }) -> APIResponseTemplate</code>
- <code title="put /v3/templates/{id}">client.templates.<a href="./src/resources/templates.ts">update</a>(id, { ...params }) -> APIResponseTemplate</code>
- <code title="get /v3/templates">client.templates.<a href="./src/resources/templates.ts">list</a>({ ...params }) -> TemplatesTemplatesPage</code>
- <code title="delete /v3/templates/{id}">client.templates.<a href="./src/resources/templates.ts">delete</a>(id, { ...params }) -> void</code>

# Profiles

Types:

- <code><a href="./src/resources/profiles/profiles.ts">APIResponseOfProfileDetail</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">BillingContactInfo</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">BrandBusinessInfo</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">BrandComplianceInfo</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">BrandContactInfo</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">BrandsBrandData</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">DestinationCountry</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">PaymentDetails</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">ProfileDetail</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">TcrBrandRelationship</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">TcrVertical</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">ProfileListResponse</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">ProfileCompleteResponse</a></code>

Methods:

- <code title="post /v3/profiles">client.profiles.<a href="./src/resources/profiles/profiles.ts">create</a>({ ...params }) -> APIResponseOfProfileDetail</code>
- <code title="get /v3/profiles/{profileId}">client.profiles.<a href="./src/resources/profiles/profiles.ts">retrieve</a>(profileID, { ...params }) -> APIResponseOfProfileDetail</code>
- <code title="patch /v3/profiles/{profileId}">client.profiles.<a href="./src/resources/profiles/profiles.ts">update</a>(profileID, { ...params }) -> APIResponseOfProfileDetail</code>
- <code title="get /v3/profiles">client.profiles.<a href="./src/resources/profiles/profiles.ts">list</a>({ ...params }) -> ProfileListResponse</code>
- <code title="delete /v3/profiles/{profileId}">client.profiles.<a href="./src/resources/profiles/profiles.ts">delete</a>(profileID, { ...params }) -> void</code>
- <code title="post /v3/profiles/{profileId}/complete">client.profiles.<a href="./src/resources/profiles/profiles.ts">complete</a>(profileID, { ...params }) -> ProfileCompleteResponse</code>

## Campaigns

Types:

- <code><a href="./src/resources/profiles/campaigns.ts">APIResponseOfBrandCampaign</a></code>
- <code><a href="./src/resources/profiles/campaigns.ts">APIResponseOfListOfBrandCampaign</a></code>
- <code><a href="./src/resources/profiles/campaigns.ts">BrandCampaign</a></code>
- <code><a href="./src/resources/profiles/campaigns.ts">CampaignData</a></code>
- <code><a href="./src/resources/profiles/campaigns.ts">CampaignUseCase</a></code>
- <code><a href="./src/resources/profiles/campaigns.ts">CampaignUseCaseData</a></code>
- <code><a href="./src/resources/profiles/campaigns.ts">MessagingUseCaseUs</a></code>

Methods:

- <code title="post /v3/profiles/{profileId}/campaigns">client.profiles.campaigns.<a href="./src/resources/profiles/campaigns.ts">create</a>(profileID, { ...params }) -> APIResponseOfBrandCampaign</code>
- <code title="put /v3/profiles/{profileId}/campaigns/{campaignId}">client.profiles.campaigns.<a href="./src/resources/profiles/campaigns.ts">update</a>(campaignID, { ...params }) -> APIResponseOfBrandCampaign</code>
- <code title="get /v3/profiles/{profileId}/campaigns">client.profiles.campaigns.<a href="./src/resources/profiles/campaigns.ts">list</a>(profileID, { ...params }) -> APIResponseOfListOfBrandCampaign</code>
- <code title="delete /v3/profiles/{profileId}/campaigns/{campaignId}">client.profiles.campaigns.<a href="./src/resources/profiles/campaigns.ts">delete</a>(campaignID, { ...params }) -> void</code>

# Numbers

Types:

- <code><a href="./src/resources/numbers.ts">NumberLookupResponse</a></code>

Methods:

- <code title="get /v3/numbers/lookup/{phoneNumber}">client.numbers.<a href="./src/resources/numbers.ts">lookup</a>(phoneNumber, { ...params }) -> NumberLookupResponse</code>

# Messages

Types:

- <code><a href="./src/resources/messages.ts">MessageRetrieveActivitiesResponse</a></code>
- <code><a href="./src/resources/messages.ts">MessageRetrieveStatusResponse</a></code>
- <code><a href="./src/resources/messages.ts">MessageSendResponse</a></code>

Methods:

- <code title="get /v3/messages/{id}/activities">client.messages.<a href="./src/resources/messages.ts">retrieveActivities</a>(id, { ...params }) -> MessageRetrieveActivitiesResponse</code>
- <code title="get /v3/messages/{id}">client.messages.<a href="./src/resources/messages.ts">retrieveStatus</a>(id, { ...params }) -> MessageRetrieveStatusResponse</code>
- <code title="post /v3/messages">client.messages.<a href="./src/resources/messages.ts">send</a>({ ...params }) -> MessageSendResponse</code>

# Contacts

Types:

- <code><a href="./src/resources/contacts.ts">APIResponseOfContact</a></code>
- <code><a href="./src/resources/contacts.ts">APIResponseOfContactMessageSummary</a></code>
- <code><a href="./src/resources/contacts.ts">ContactMessageSummary</a></code>
- <code><a href="./src/resources/contacts.ts">ContactResponse</a></code>

Methods:

- <code title="post /v3/contacts">client.contacts.<a href="./src/resources/contacts.ts">create</a>({ ...params }) -> APIResponseOfContact</code>
- <code title="get /v3/contacts/{id}">client.contacts.<a href="./src/resources/contacts.ts">retrieve</a>(id, { ...params }) -> APIResponseOfContact</code>
- <code title="patch /v3/contacts/{id}">client.contacts.<a href="./src/resources/contacts.ts">update</a>(id, { ...params }) -> APIResponseOfContact</code>
- <code title="get /v3/contacts">client.contacts.<a href="./src/resources/contacts.ts">list</a>({ ...params }) -> ContactResponsesContactsPage</code>
- <code title="delete /v3/contacts/{id}">client.contacts.<a href="./src/resources/contacts.ts">delete</a>(id, { ...params }) -> void</code>
- <code title="get /v3/contacts/{contactId}/message-summary">client.contacts.<a href="./src/resources/contacts.ts">retrieveMessageSummary</a>(contactID, { ...params }) -> APIResponseOfContactMessageSummary</code>

# Conversations

Types:

- <code><a href="./src/resources/conversations.ts">APIResponseOfConversationMessagesList</a></code>
- <code><a href="./src/resources/conversations.ts">ConversationMessagesList</a></code>

Methods:

- <code title="get /v3/conversations">client.conversations.<a href="./src/resources/conversations.ts">list</a>({ ...params }) -> ConversationMessagesListMessagesConversationsPage</code>
- <code title="get /v3/conversations/{id}">client.conversations.<a href="./src/resources/conversations.ts">listMessages</a>(id, { ...params }) -> ConversationMessagesListMessagesConversationsPage</code>

# Calls

Types:

- <code><a href="./src/resources/calls/calls.ts">APIResponseOfCall</a></code>
- <code><a href="./src/resources/calls/calls.ts">APIResponseOfCallRecordings</a></code>
- <code><a href="./src/resources/calls/calls.ts">APIResponseOfCallsList</a></code>
- <code><a href="./src/resources/calls/calls.ts">Call</a></code>
- <code><a href="./src/resources/calls/calls.ts">CallParty</a></code>
- <code><a href="./src/resources/calls/calls.ts">CallRecording</a></code>
- <code><a href="./src/resources/calls/calls.ts">CallRecordings</a></code>
- <code><a href="./src/resources/calls/calls.ts">CallTimelineEntry</a></code>
- <code><a href="./src/resources/calls/calls.ts">CallsList</a></code>

Methods:

- <code title="get /v3/calls/{id}">client.calls.<a href="./src/resources/calls/calls.ts">retrieve</a>(id, { ...params }) -> APIResponseOfCall</code>
- <code title="get /v3/calls">client.calls.<a href="./src/resources/calls/calls.ts">list</a>({ ...params }) -> CallsCallsPage</code>
- <code title="post /v3/calls/{id}/hangup">client.calls.<a href="./src/resources/calls/calls.ts">hangup</a>(id, { ...params }) -> void</code>
- <code title="get /v3/calls/{id}/recordings">client.calls.<a href="./src/resources/calls/calls.ts">listRecordings</a>(id, { ...params }) -> APIResponseOfCallRecordings</code>
- <code title="post /v3/calls/{id}/recordings">client.calls.<a href="./src/resources/calls/calls.ts">record</a>(id, { ...params }) -> void</code>

## Participants

Types:

- <code><a href="./src/resources/calls/participants.ts">APIResponseOfListOfCallParticipant</a></code>
- <code><a href="./src/resources/calls/participants.ts">CallParticipant</a></code>
- <code><a href="./src/resources/calls/participants.ts">CallParticipantTarget</a></code>

Methods:

- <code title="patch /v3/calls/{id}/participants/{participantId}">client.calls.participants.<a href="./src/resources/calls/participants.ts">update</a>(participantID, { ...params }) -> void</code>
- <code title="get /v3/calls/{id}/participants">client.calls.participants.<a href="./src/resources/calls/participants.ts">list</a>(id, { ...params }) -> APIResponseOfListOfCallParticipant</code>
- <code title="post /v3/calls/{id}/participants">client.calls.participants.<a href="./src/resources/calls/participants.ts">add</a>(id, { ...params }) -> APIResponseOfCall</code>
- <code title="delete /v3/calls/{id}/participants/{participantId}">client.calls.participants.<a href="./src/resources/calls/participants.ts">remove</a>(participantID, { ...params }) -> void</code>
- <code title="delete /v3/calls/{id}/participants">client.calls.participants.<a href="./src/resources/calls/participants.ts">removeAll</a>(id, { ...params }) -> void</code>

# Channels

## Voice

Types:

- <code><a href="./src/resources/channels/voice.ts">APIResponseOfListOfVoiceNumber</a></code>
- <code><a href="./src/resources/channels/voice.ts">APIResponseOfVoiceCallbackTest</a></code>
- <code><a href="./src/resources/channels/voice.ts">APIResponseOfVoiceNumber</a></code>
- <code><a href="./src/resources/channels/voice.ts">APIResponseOfVoiceNumberCreated</a></code>
- <code><a href="./src/resources/channels/voice.ts">APIResponseOfVoiceSecret</a></code>
- <code><a href="./src/resources/channels/voice.ts">APIResponseOfVoiceToken</a></code>
- <code><a href="./src/resources/channels/voice.ts">VoiceCallbackTest</a></code>
- <code><a href="./src/resources/channels/voice.ts">VoiceCallbackTestErrorInfo</a></code>
- <code><a href="./src/resources/channels/voice.ts">VoiceCallbackTestRequestInfo</a></code>
- <code><a href="./src/resources/channels/voice.ts">VoiceCallbackTestResponseInfo</a></code>
- <code><a href="./src/resources/channels/voice.ts">VoiceNumber</a></code>
- <code><a href="./src/resources/channels/voice.ts">VoiceNumberCreated</a></code>
- <code><a href="./src/resources/channels/voice.ts">VoiceSecret</a></code>
- <code><a href="./src/resources/channels/voice.ts">VoiceToken</a></code>

Methods:

- <code title="post /v3/channels/voice">client.channels.voice.<a href="./src/resources/channels/voice.ts">create</a>({ ...params }) -> APIResponseOfVoiceNumberCreated</code>
- <code title="get /v3/channels/voice/{number}">client.channels.voice.<a href="./src/resources/channels/voice.ts">retrieve</a>(number, { ...params }) -> APIResponseOfVoiceNumber</code>
- <code title="patch /v3/channels/voice/{number}">client.channels.voice.<a href="./src/resources/channels/voice.ts">update</a>(number, { ...params }) -> APIResponseOfVoiceNumber</code>
- <code title="get /v3/channels/voice">client.channels.voice.<a href="./src/resources/channels/voice.ts">list</a>({ ...params }) -> APIResponseOfListOfVoiceNumber</code>
- <code title="post /v3/channels/voice/tokens">client.channels.voice.<a href="./src/resources/channels/voice.ts">createToken</a>({ ...params }) -> APIResponseOfVoiceToken</code>
- <code title="post /v3/channels/voice/{number}/rotate-secret">client.channels.voice.<a href="./src/resources/channels/voice.ts">rotateSecret</a>(number, { ...params }) -> APIResponseOfVoiceSecret</code>
- <code title="post /v3/channels/voice/{number}/test">client.channels.voice.<a href="./src/resources/channels/voice.ts">test</a>(number, { ...params }) -> APIResponseOfVoiceCallbackTest</code>

# Me

Types:

- <code><a href="./src/resources/me.ts">ProfileSettings</a></code>
- <code><a href="./src/resources/me.ts">MeRetrieveResponse</a></code>

Methods:

- <code title="get /v3/me">client.me.<a href="./src/resources/me.ts">retrieve</a>({ ...params }) -> MeRetrieveResponse</code>
