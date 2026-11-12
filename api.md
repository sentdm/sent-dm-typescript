# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">APIMeta</a></code>
- <code><a href="./src/resources/webhooks.ts">APIResponseOfWebhookEventTypesList</a></code>
- <code><a href="./src/resources/webhooks.ts">APIResponseOfWebhookEventsList</a></code>
- <code><a href="./src/resources/webhooks.ts">APIResponseOfWebhookSecret</a></code>
- <code><a href="./src/resources/webhooks.ts">APIResponseOfWebhookTest</a></code>
- <code><a href="./src/resources/webhooks.ts">APIResponseOfWebhooksList</a></code>
- <code><a href="./src/resources/webhooks.ts">APIResponseWebhook</a></code>
- <code><a href="./src/resources/webhooks.ts">CallEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">CallEventPayload</a></code>
- <code><a href="./src/resources/webhooks.ts">ChannelEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ChannelEventPayload</a></code>
- <code><a href="./src/resources/webhooks.ts">ContactEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ContactEventPayload</a></code>
- <code><a href="./src/resources/webhooks.ts">ErrorDetail</a></code>
- <code><a href="./src/resources/webhooks.ts">InboundMedia</a></code>
- <code><a href="./src/resources/webhooks.ts">InboundMessageEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">InboundMessageEventPayload</a></code>
- <code><a href="./src/resources/webhooks.ts">LinkEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">LinkEventPayload</a></code>
- <code><a href="./src/resources/webhooks.ts">MessageEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">MessageEventPayload</a></code>
- <code><a href="./src/resources/webhooks.ts">MutationRequest</a></code>
- <code><a href="./src/resources/webhooks.ts">PaginationCursors</a></code>
- <code><a href="./src/resources/webhooks.ts">PaginationMeta</a></code>
- <code><a href="./src/resources/webhooks.ts">TemplateEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">TemplateEventPayload</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookDelivery</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookEventType</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookEventTypesList</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookEventsList</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookSecret</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookSenderProfile</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookSenderProfileConfig</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookTest</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhooksList</a></code>

Methods:

- <code title="post /v3/webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">create</a>({ ...params }) -> APIResponseWebhook</code>
- <code title="get /v3/webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks.ts">retrieve</a>(id, { ...params }) -> APIResponseWebhook</code>
- <code title="put /v3/webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks.ts">update</a>(id, { ...params }) -> APIResponseWebhook</code>
- <code title="get /v3/webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">list</a>({ ...params }) -> WebhookResponsesWebhooksPage</code>
- <code title="delete /v3/webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks.ts">delete</a>(id, { ...params }) -> void</code>
- <code title="get /v3/webhooks/event-types">client.webhooks.<a href="./src/resources/webhooks.ts">listEventTypes</a>({ ...params }) -> APIResponseOfWebhookEventTypesList</code>
- <code title="get /v3/webhooks/{id}/events">client.webhooks.<a href="./src/resources/webhooks.ts">listEvents</a>(id, { ...params }) -> WebhookDeliveriesWebhookEventsPage</code>
- <code title="post /v3/webhooks/{id}/rotate-secret">client.webhooks.<a href="./src/resources/webhooks.ts">rotateSecret</a>(id, { ...params }) -> APIResponseOfWebhookSecret</code>
- <code title="post /v3/webhooks/{id}/test">client.webhooks.<a href="./src/resources/webhooks.ts">test</a>(id, { ...params }) -> APIResponseOfWebhookTest</code>
- <code title="patch /v3/webhooks/{id}/toggle-status">client.webhooks.<a href="./src/resources/webhooks.ts">toggleStatus</a>(id, { ...params }) -> APIResponseWebhook</code>

# Users

Types:

- <code><a href="./src/resources/users.ts">APIResponseOfUser</a></code>
- <code><a href="./src/resources/users.ts">APIResponseOfUsersList</a></code>
- <code><a href="./src/resources/users.ts">UserResponse</a></code>
- <code><a href="./src/resources/users.ts">UsersList</a></code>

Methods:

- <code title="get /v3/users/{userId}">client.users.<a href="./src/resources/users.ts">retrieve</a>(userID, { ...params }) -> APIResponseOfUser</code>
- <code title="get /v3/users">client.users.<a href="./src/resources/users.ts">list</a>({ ...params }) -> APIResponseOfUsersList</code>
- <code title="post /v3/users">client.users.<a href="./src/resources/users.ts">invite</a>({ ...params }) -> APIResponseOfUser</code>
- <code title="delete /v3/users/{userId}">client.users.<a href="./src/resources/users.ts">remove</a>(userID, { ...params }) -> void</code>
- <code title="patch /v3/users/{userId}">client.users.<a href="./src/resources/users.ts">updateRole</a>(userID, { ...params }) -> APIResponseOfUser</code>

# Templates

Types:

- <code><a href="./src/resources/templates.ts">APIResponseOfTemplatesList</a></code>
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
- <code><a href="./src/resources/templates.ts">TemplateHeaderLocation</a></code>
- <code><a href="./src/resources/templates.ts">TemplateMediaItem</a></code>
- <code><a href="./src/resources/templates.ts">TemplateMmsBodyContent</a></code>
- <code><a href="./src/resources/templates.ts">TemplateRef</a></code>
- <code><a href="./src/resources/templates.ts">TemplateVariable</a></code>
- <code><a href="./src/resources/templates.ts">TemplateVariableProps</a></code>
- <code><a href="./src/resources/templates.ts">TemplatesList</a></code>

Methods:

- <code title="post /v3/templates">client.templates.<a href="./src/resources/templates.ts">create</a>({ ...params }) -> APIResponseTemplate</code>
- <code title="get /v3/templates/{id}">client.templates.<a href="./src/resources/templates.ts">retrieve</a>(id, { ...params }) -> APIResponseTemplate</code>
- <code title="put /v3/templates/{id}">client.templates.<a href="./src/resources/templates.ts">update</a>(id, { ...params }) -> APIResponseTemplate</code>
- <code title="get /v3/templates">client.templates.<a href="./src/resources/templates.ts">list</a>({ ...params }) -> TemplatesTemplatesPage</code>
- <code title="delete /v3/templates/{id}">client.templates.<a href="./src/resources/templates.ts">delete</a>(id, { ...params }) -> void</code>

# Profiles

Types:

- <code><a href="./src/resources/profiles/profiles.ts">APIResponseOfProfileCompletionAccepted</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">APIResponseOfProfileCompletionResult</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">APIResponseOfProfileDetail</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">APIResponseOfProfilesList</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">BillingContact</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">BillingContactInfo</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">BrandBusiness</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">BrandBusinessInfo</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">BrandCompliance</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">BrandComplianceInfo</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">BrandContact</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">BrandContactInfo</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">BrandWithKYC</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">BrandsBrandData</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">DestinationCountry</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">EntityType</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">PaymentDetails</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">ProfileCompletionAccepted</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">ProfileCompletionResult</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">ProfileDetail</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">ProfilesList</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">TcrBrandIdentityStatus</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">TcrBrandRelationship</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">TcrBrandStatus</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">TcrCampaignStatus</a></code>
- <code><a href="./src/resources/profiles/profiles.ts">TcrVertical</a></code>

Methods:

- <code title="post /v3/profiles">client.profiles.<a href="./src/resources/profiles/profiles.ts">create</a>({ ...params }) -> APIResponseOfProfileDetail</code>
- <code title="get /v3/profiles/{profileId}">client.profiles.<a href="./src/resources/profiles/profiles.ts">retrieve</a>(profileID, { ...params }) -> APIResponseOfProfileDetail</code>
- <code title="patch /v3/profiles/{profileId}">client.profiles.<a href="./src/resources/profiles/profiles.ts">update</a>(profileID, { ...params }) -> APIResponseOfProfileDetail</code>
- <code title="get /v3/profiles">client.profiles.<a href="./src/resources/profiles/profiles.ts">list</a>({ ...params }) -> APIResponseOfProfilesList</code>
- <code title="delete /v3/profiles/{profileId}">client.profiles.<a href="./src/resources/profiles/profiles.ts">delete</a>(profileID, { ...params }) -> void</code>
- <code title="post /v3/profiles/{profileId}/complete">client.profiles.<a href="./src/resources/profiles/profiles.ts">complete</a>(profileID, { ...params }) -> APIResponseOfProfileCompletionResult</code>

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

# SenderProfiles

Types:

- <code><a href="./src/resources/sender-profiles.ts">APIResponseOfSenderProfile</a></code>
- <code><a href="./src/resources/sender-profiles.ts">APIResponseOfSenderProfilesList</a></code>
- <code><a href="./src/resources/sender-profiles.ts">SenderProfile</a></code>
- <code><a href="./src/resources/sender-profiles.ts">SenderProfileBilling</a></code>
- <code><a href="./src/resources/sender-profiles.ts">SenderProfileBillingRequest</a></code>
- <code><a href="./src/resources/sender-profiles.ts">SenderProfileChannels</a></code>
- <code><a href="./src/resources/sender-profiles.ts">SenderProfileRcs</a></code>
- <code><a href="./src/resources/sender-profiles.ts">SenderProfileSMS</a></code>
- <code><a href="./src/resources/sender-profiles.ts">SenderProfileWhatsapp</a></code>
- <code><a href="./src/resources/sender-profiles.ts">SenderProfilesList</a></code>

Methods:

- <code title="post /v3/sender-profiles">client.senderProfiles.<a href="./src/resources/sender-profiles.ts">create</a>({ ...params }) -> APIResponseOfSenderProfile</code>
- <code title="get /v3/sender-profiles/{id}">client.senderProfiles.<a href="./src/resources/sender-profiles.ts">retrieve</a>(id) -> APIResponseOfSenderProfile</code>
- <code title="patch /v3/sender-profiles/{id}">client.senderProfiles.<a href="./src/resources/sender-profiles.ts">update</a>(id, { ...params }) -> APIResponseOfSenderProfile</code>
- <code title="get /v3/sender-profiles">client.senderProfiles.<a href="./src/resources/sender-profiles.ts">list</a>({ ...params }) -> SenderProfilesSenderProfilesPage</code>
- <code title="delete /v3/sender-profiles/{id}">client.senderProfiles.<a href="./src/resources/sender-profiles.ts">delete</a>(id) -> void</code>

# Numbers

Types:

- <code><a href="./src/resources/numbers.ts">APIResponseOfNumberLookupResult</a></code>
- <code><a href="./src/resources/numbers.ts">NumberLookupResult</a></code>

Methods:

- <code title="get /v3/numbers/lookup/{phoneNumber}">client.numbers.<a href="./src/resources/numbers.ts">lookup</a>(phoneNumber, { ...params }) -> APIResponseOfNumberLookupResult</code>

# Messages

Types:

- <code><a href="./src/resources/messages.ts">APIResponseOfCancelledMessage</a></code>
- <code><a href="./src/resources/messages.ts">APIResponseOfMessage</a></code>
- <code><a href="./src/resources/messages.ts">APIResponseOfMessageActivities</a></code>
- <code><a href="./src/resources/messages.ts">CancelledMessage</a></code>
- <code><a href="./src/resources/messages.ts">Message</a></code>
- <code><a href="./src/resources/messages.ts">MessageActivities</a></code>
- <code><a href="./src/resources/messages.ts">MessageActivity</a></code>
- <code><a href="./src/resources/messages.ts">MessageBody</a></code>
- <code><a href="./src/resources/messages.ts">MessageButton</a></code>
- <code><a href="./src/resources/messages.ts">MessageChannelOptions</a></code>
- <code><a href="./src/resources/messages.ts">MessageHeaderMedia</a></code>
- <code><a href="./src/resources/messages.ts">MessageMedia</a></code>
- <code><a href="./src/resources/messages.ts">MessageRecipient</a></code>
- <code><a href="./src/resources/messages.ts">MessageSendResponse</a></code>
- <code><a href="./src/resources/messages.ts">MessageSendResult</a></code>
- <code><a href="./src/resources/messages.ts">MessageStatusEvent</a></code>

Methods:

- <code title="post /v3/messages/{id}/cancel">client.messages.<a href="./src/resources/messages.ts">cancel</a>(id, { ...params }) -> APIResponseOfCancelledMessage</code>
- <code title="post /v3/messages/{id}/resend">client.messages.<a href="./src/resources/messages.ts">resend</a>(id, { ...params }) -> MessageSendResponse</code>
- <code title="get /v3/messages/{id}/activities">client.messages.<a href="./src/resources/messages.ts">retrieveActivities</a>(id, { ...params }) -> APIResponseOfMessageActivities</code>
- <code title="get /v3/messages/{id}">client.messages.<a href="./src/resources/messages.ts">retrieveStatus</a>(id, { ...params }) -> APIResponseOfMessage</code>
- <code title="post /v3/messages">client.messages.<a href="./src/resources/messages.ts">send</a>({ ...params }) -> MessageSendResponse</code>

# Contacts

Types:

- <code><a href="./src/resources/contacts.ts">APIResponseOfContact</a></code>
- <code><a href="./src/resources/contacts.ts">APIResponseOfContactMessageSummary</a></code>
- <code><a href="./src/resources/contacts.ts">APIResponseOfContactsList</a></code>
- <code><a href="./src/resources/contacts.ts">ChannelScore</a></code>
- <code><a href="./src/resources/contacts.ts">ContactMessageSummary</a></code>
- <code><a href="./src/resources/contacts.ts">ContactResponse</a></code>
- <code><a href="./src/resources/contacts.ts">ContactsList</a></code>

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

- <code title="get /v3/conversations">client.conversations.<a href="./src/resources/conversations.ts">list</a>({ ...params }) -> MessagesConversationsPage</code>
- <code title="get /v3/conversations/{id}">client.conversations.<a href="./src/resources/conversations.ts">listMessages</a>(id, { ...params }) -> MessagesConversationsPage</code>

# Voice

## Calls

Types:

- <code><a href="./src/resources/voice/calls/calls.ts">APIResponseOfCall</a></code>
- <code><a href="./src/resources/voice/calls/calls.ts">APIResponseOfCallRecordings</a></code>
- <code><a href="./src/resources/voice/calls/calls.ts">APIResponseOfCallsList</a></code>
- <code><a href="./src/resources/voice/calls/calls.ts">Call</a></code>
- <code><a href="./src/resources/voice/calls/calls.ts">CallLeg</a></code>
- <code><a href="./src/resources/voice/calls/calls.ts">CallParty</a></code>
- <code><a href="./src/resources/voice/calls/calls.ts">CallRecording</a></code>
- <code><a href="./src/resources/voice/calls/calls.ts">CallRecordings</a></code>
- <code><a href="./src/resources/voice/calls/calls.ts">CallTimelineEntry</a></code>
- <code><a href="./src/resources/voice/calls/calls.ts">CallsList</a></code>

Methods:

- <code title="get /v3/voice/calls/{id}">client.voice.calls.<a href="./src/resources/voice/calls/calls.ts">retrieve</a>(id, { ...params }) -> APIResponseOfCall</code>
- <code title="get /v3/voice/calls">client.voice.calls.<a href="./src/resources/voice/calls/calls.ts">list</a>({ ...params }) -> CallsCallsPage</code>
- <code title="post /v3/voice/calls/{id}/hangup">client.voice.calls.<a href="./src/resources/voice/calls/calls.ts">hangup</a>(id, { ...params }) -> void</code>
- <code title="get /v3/voice/calls/{id}/recordings">client.voice.calls.<a href="./src/resources/voice/calls/calls.ts">listRecordings</a>(id, { ...params }) -> APIResponseOfCallRecordings</code>
- <code title="post /v3/voice/calls/{id}/recordings">client.voice.calls.<a href="./src/resources/voice/calls/calls.ts">record</a>(id, { ...params }) -> void</code>

### Participants

Types:

- <code><a href="./src/resources/voice/calls/participants.ts">APIResponseOfListOfCallParticipant</a></code>
- <code><a href="./src/resources/voice/calls/participants.ts">CallParticipant</a></code>
- <code><a href="./src/resources/voice/calls/participants.ts">CallParticipantTarget</a></code>

Methods:

- <code title="patch /v3/voice/calls/{id}/participants/{participantId}">client.voice.calls.participants.<a href="./src/resources/voice/calls/participants.ts">update</a>(participantID, { ...params }) -> void</code>
- <code title="get /v3/voice/calls/{id}/participants">client.voice.calls.participants.<a href="./src/resources/voice/calls/participants.ts">list</a>(id, { ...params }) -> APIResponseOfListOfCallParticipant</code>
- <code title="post /v3/voice/calls/{id}/participants">client.voice.calls.participants.<a href="./src/resources/voice/calls/participants.ts">add</a>(id, { ...params }) -> APIResponseOfCall</code>
- <code title="delete /v3/voice/calls/{id}/participants/{participantId}">client.voice.calls.participants.<a href="./src/resources/voice/calls/participants.ts">remove</a>(participantID, { ...params }) -> void</code>
- <code title="delete /v3/voice/calls/{id}/participants">client.voice.calls.participants.<a href="./src/resources/voice/calls/participants.ts">removeAll</a>(id, { ...params }) -> void</code>

## Tokens

Types:

- <code><a href="./src/resources/voice/tokens.ts">APIResponseOfVoiceToken</a></code>
- <code><a href="./src/resources/voice/tokens.ts">VoiceToken</a></code>

Methods:

- <code title="post /v3/voice/tokens">client.voice.tokens.<a href="./src/resources/voice/tokens.ts">create</a>({ ...params }) -> APIResponseOfVoiceToken</code>

## Agents

Types:

- <code><a href="./src/resources/voice/agents.ts">APIResponseOfVoiceAgent</a></code>
- <code><a href="./src/resources/voice/agents.ts">APIResponseOfVoiceAgentSecret</a></code>
- <code><a href="./src/resources/voice/agents.ts">APIResponseOfVoiceAgentsList</a></code>
- <code><a href="./src/resources/voice/agents.ts">VoiceAgent</a></code>
- <code><a href="./src/resources/voice/agents.ts">VoiceAgentAudio</a></code>
- <code><a href="./src/resources/voice/agents.ts">VoiceAgentAudioSpec</a></code>
- <code><a href="./src/resources/voice/agents.ts">VoiceAgentLimits</a></code>
- <code><a href="./src/resources/voice/agents.ts">VoiceAgentLimitsSpec</a></code>
- <code><a href="./src/resources/voice/agents.ts">VoiceAgentParty</a></code>
- <code><a href="./src/resources/voice/agents.ts">VoiceAgentPartySpec</a></code>
- <code><a href="./src/resources/voice/agents.ts">VoiceAgentSecret</a></code>
- <code><a href="./src/resources/voice/agents.ts">VoiceAgentSpeech</a></code>
- <code><a href="./src/resources/voice/agents.ts">VoiceAgentSpeechSpec</a></code>
- <code><a href="./src/resources/voice/agents.ts">VoiceAgentTranscripts</a></code>
- <code><a href="./src/resources/voice/agents.ts">VoiceAgentTranscriptsSpec</a></code>
- <code><a href="./src/resources/voice/agents.ts">VoiceAgentsList</a></code>

Methods:

- <code title="post /v3/voice/agents">client.voice.agents.<a href="./src/resources/voice/agents.ts">create</a>({ ...params }) -> APIResponseOfVoiceAgent</code>
- <code title="get /v3/voice/agents/{id}">client.voice.agents.<a href="./src/resources/voice/agents.ts">retrieve</a>(id, { ...params }) -> APIResponseOfVoiceAgent</code>
- <code title="patch /v3/voice/agents/{id}">client.voice.agents.<a href="./src/resources/voice/agents.ts">update</a>(id, { ...params }) -> APIResponseOfVoiceAgent</code>
- <code title="get /v3/voice/agents">client.voice.agents.<a href="./src/resources/voice/agents.ts">list</a>({ ...params }) -> VoiceAgentsVoiceAgentsPage</code>
- <code title="delete /v3/voice/agents/{id}">client.voice.agents.<a href="./src/resources/voice/agents.ts">delete</a>(id, { ...params }) -> void</code>
- <code title="post /v3/voice/agents/{id}/rotate-secret">client.voice.agents.<a href="./src/resources/voice/agents.ts">rotateSecret</a>(id, { ...params }) -> APIResponseOfVoiceAgentSecret</code>

## Catalogue

Types:

- <code><a href="./src/resources/voice/catalogue.ts">APIResponseOfVoiceCatalogue</a></code>
- <code><a href="./src/resources/voice/catalogue.ts">VoiceCatalogue</a></code>
- <code><a href="./src/resources/voice/catalogue.ts">VoiceCatalogueVoice</a></code>

Methods:

- <code title="get /v3/voice/voices">client.voice.catalogue.<a href="./src/resources/voice/catalogue.ts">list</a>({ ...params }) -> APIResponseOfVoiceCatalogue</code>

# Channels

Types:

- <code><a href="./src/resources/channels/channels.ts">APIResponseOfChannelsState</a></code>
- <code><a href="./src/resources/channels/channels.ts">ChannelsState</a></code>
- <code><a href="./src/resources/channels/channels.ts">MmsMarket</a></code>

Methods:

- <code title="get /v3/channels">client.channels.<a href="./src/resources/channels/channels.ts">list</a>({ ...params }) -> APIResponseOfChannelsState</code>

## SMS

Types:

- <code><a href="./src/resources/channels/sms.ts">APIResponseOfListOfSMSMarket</a></code>
- <code><a href="./src/resources/channels/sms.ts">APIResponseOfSMSMarket</a></code>
- <code><a href="./src/resources/channels/sms.ts">MarketCompliance</a></code>
- <code><a href="./src/resources/channels/sms.ts">SMSMarket</a></code>
- <code><a href="./src/resources/channels/sms.ts">SMSNumber</a></code>
- <code><a href="./src/resources/channels/sms.ts">SMSNumberRequest</a></code>
- <code><a href="./src/resources/channels/sms.ts">SuppliedCampaign</a></code>
- <code><a href="./src/resources/channels/sms.ts">SuppliedCompliance</a></code>
- <code><a href="./src/resources/channels/sms.ts">SuppliedDocument</a></code>

Methods:

- <code title="post /v3/channels/sms">client.channels.sms.<a href="./src/resources/channels/sms.ts">create</a>({ ...params }) -> APIResponseOfSMSMarket</code>
- <code title="get /v3/channels/sms/{country}/{type}">client.channels.sms.<a href="./src/resources/channels/sms.ts">retrieve</a>(type, { ...params }) -> APIResponseOfSMSMarket</code>
- <code title="patch /v3/channels/sms/{country}/{type}">client.channels.sms.<a href="./src/resources/channels/sms.ts">update</a>(type, { ...params }) -> APIResponseOfSMSMarket</code>
- <code title="get /v3/channels/sms">client.channels.sms.<a href="./src/resources/channels/sms.ts">list</a>({ ...params }) -> APIResponseOfListOfSMSMarket</code>

## Rcs

Types:

- <code><a href="./src/resources/channels/rcs.ts">APIResponseOfRcsAgent</a></code>
- <code><a href="./src/resources/channels/rcs.ts">RcsAddress</a></code>
- <code><a href="./src/resources/channels/rcs.ts">RcsAgent</a></code>

Methods:

- <code title="post /v3/channels/rcs">client.channels.rcs.<a href="./src/resources/channels/rcs.ts">create</a>({ ...params }) -> APIResponseOfRcsAgent</code>

## Whatsapp

Types:

- <code><a href="./src/resources/channels/whatsapp.ts">APIResponseOfWhatsappChannel</a></code>
- <code><a href="./src/resources/channels/whatsapp.ts">WhatsappChannel</a></code>

Methods:

- <code title="post /v3/channels/whatsapp">client.channels.whatsapp.<a href="./src/resources/channels/whatsapp.ts">create</a>({ ...params }) -> APIResponseOfWhatsappChannel</code>

## Voice

Types:

- <code><a href="./src/resources/channels/voice.ts">APIResponseOfListOfVoiceNumber</a></code>
- <code><a href="./src/resources/channels/voice.ts">APIResponseOfVoiceCallbackTest</a></code>
- <code><a href="./src/resources/channels/voice.ts">APIResponseOfVoiceNumber</a></code>
- <code><a href="./src/resources/channels/voice.ts">APIResponseOfVoiceNumberCreated</a></code>
- <code><a href="./src/resources/channels/voice.ts">APIResponseOfVoiceSecret</a></code>
- <code><a href="./src/resources/channels/voice.ts">VoiceCallbackTest</a></code>
- <code><a href="./src/resources/channels/voice.ts">VoiceCallbackTestErrorInfo</a></code>
- <code><a href="./src/resources/channels/voice.ts">VoiceCallbackTestRequestInfo</a></code>
- <code><a href="./src/resources/channels/voice.ts">VoiceCallbackTestResponseInfo</a></code>
- <code><a href="./src/resources/channels/voice.ts">VoiceNumber</a></code>
- <code><a href="./src/resources/channels/voice.ts">VoiceNumberCreated</a></code>
- <code><a href="./src/resources/channels/voice.ts">VoiceSecret</a></code>

Methods:

- <code title="post /v3/channels/voice">client.channels.voice.<a href="./src/resources/channels/voice.ts">create</a>({ ...params }) -> APIResponseOfVoiceNumberCreated</code>
- <code title="get /v3/channels/voice/{number}">client.channels.voice.<a href="./src/resources/channels/voice.ts">retrieve</a>(number, { ...params }) -> APIResponseOfVoiceNumber</code>
- <code title="patch /v3/channels/voice/{number}">client.channels.voice.<a href="./src/resources/channels/voice.ts">update</a>(number, { ...params }) -> APIResponseOfVoiceNumber</code>
- <code title="get /v3/channels/voice">client.channels.voice.<a href="./src/resources/channels/voice.ts">list</a>({ ...params }) -> APIResponseOfListOfVoiceNumber</code>
- <code title="post /v3/channels/voice/{number}/rotate-secret">client.channels.voice.<a href="./src/resources/channels/voice.ts">rotateSecret</a>(number, { ...params }) -> APIResponseOfVoiceSecret</code>
- <code title="post /v3/channels/voice/{number}/test">client.channels.voice.<a href="./src/resources/channels/voice.ts">test</a>(number, { ...params }) -> APIResponseOfVoiceCallbackTest</code>

# Compliance

Types:

- <code><a href="./src/resources/compliance.ts">APIResponseOfComplianceRequirements</a></code>
- <code><a href="./src/resources/compliance.ts">ComplianceAttachmentTemplate</a></code>
- <code><a href="./src/resources/compliance.ts">ComplianceRequirement</a></code>
- <code><a href="./src/resources/compliance.ts">ComplianceRequirements</a></code>
- <code><a href="./src/resources/compliance.ts">ComplianceSetupStep</a></code>

Methods:

- <code title="get /v3/compliance/requirements">client.compliance.<a href="./src/resources/compliance.ts">retrieveRequirements</a>({ ...params }) -> APIResponseOfComplianceRequirements</code>

# Me

Types:

- <code><a href="./src/resources/me.ts">Account</a></code>
- <code><a href="./src/resources/me.ts">AccountChannels</a></code>
- <code><a href="./src/resources/me.ts">AccountProfile</a></code>
- <code><a href="./src/resources/me.ts">AccountRcsChannel</a></code>
- <code><a href="./src/resources/me.ts">AccountSMSChannel</a></code>
- <code><a href="./src/resources/me.ts">AccountWhatsappChannel</a></code>
- <code><a href="./src/resources/me.ts">APIResponseOfAccount</a></code>
- <code><a href="./src/resources/me.ts">ProfileSettings</a></code>

Methods:

- <code title="get /v3/me">client.me.<a href="./src/resources/me.ts">retrieve</a>({ ...params }) -> APIResponseOfAccount</code>
