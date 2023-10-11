require('dotenv').config();

const authentication = require('./authentication');
const inviteeCreatedTrigger = require('./triggers/invitee_created.js');
const inviteeNoShowTrigger = require('./triggers/invitee_no_show.js');
const newEventTypeTrigger = require('./triggers/new_event_type.js');
const newOrganizationMembershipTrigger = require('./triggers/new_organization_membership.js');
const userAvailabilitySchedulesTrigger = require('./triggers/user_availability_schedules.js');
const eventTypeAvailableTimesTrigger = require('./triggers/event_type_available_times.js');
const createInviteeNoShowCreate = require('./creates/create_invitee_no_show.js');
const createInviteeCreate = require('./creates/create_invitee.js');
const getEventInviteeSearch = require('./searches/get_event_invitee.js');
const listScheduledEventsSearch = require('./searches/list_scheduled_events.js');
const scheduledEventsInviteesSearch = require('./searches/scheduled_events_invitees.js');
const getEventSearch = require('./searches/get_event.js');
const userBusyTimesSearch = require('./searches/user_busy_times.js');
const getUserAvailabilityScheduleSearch = require('./searches/get_user_availability_schedule.js');
const userAvailabilitySchedulesSearch = require('./searches/user_availability_schedules.js');
const findEventTypeAvailableTimesSearch = require('./searches/find_event_type_available_times.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  searches: {
    [getEventInviteeSearch.key]: getEventInviteeSearch,
    [listScheduledEventsSearch.key]: listScheduledEventsSearch,
    [scheduledEventsInviteesSearch.key]: scheduledEventsInviteesSearch,
    [getEventSearch.key]: getEventSearch,
    [userBusyTimesSearch.key]: userBusyTimesSearch,
    [getUserAvailabilityScheduleSearch.key]: getUserAvailabilityScheduleSearch,
    [userAvailabilitySchedulesSearch.key]: userAvailabilitySchedulesSearch,
    [findEventTypeAvailableTimesSearch.key]: findEventTypeAvailableTimesSearch,
  },
  triggers: {
    [inviteeCreatedTrigger.key]: inviteeCreatedTrigger,
    [inviteeNoShowTrigger.key]: inviteeNoShowTrigger,
    [newEventTypeTrigger.key]: newEventTypeTrigger,
    [newOrganizationMembershipTrigger.key]: newOrganizationMembershipTrigger,
    [userAvailabilitySchedulesTrigger.key]: userAvailabilitySchedulesTrigger,
    [eventTypeAvailableTimesTrigger.key]: eventTypeAvailableTimesTrigger,
  },
  creates: {
    [createInviteeNoShowCreate.key]: createInviteeNoShowCreate,
    [createInviteeCreate.key]: createInviteeCreate,
  },
  authentication: authentication,
};
