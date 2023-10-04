module.exports = {
  operation: {
    perform: {
      params: {
        invitee_email: '{{bundle.inputData.invitee_email}}',
        max_start_time: '{{bundle.inputData.max_start_time}}',
        min_start_time: '{{bundle.inputData.min_start_time}}',
      },
    },
    inputFields: [
      {
        key: 'invitee_email',
        label: 'Invitee Email',
        type: 'string',
        helpText:
          'Return events that are scheduled with the invitee associated with this email address',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'max_start_time',
        label: 'Max Start Time',
        type: 'datetime',
        helpText:
          'nclude events with start times prior to this time (sample time format: "2020-01-02T03:04:05.678123Z"). This time should use the UTC timezone.\n\nExamples:\n2020-01-02T12:30:00.000000Z',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'min_start_time',
        label: 'Min Start Time',
        type: 'datetime',
        helpText:
          'Include events with start times after this time (sample time format: "2020-01-02T03:04:05.678123Z"). This time should use the UTC timezone.\n\nExamples:\n2020-01-02T12:30:00.000000Z',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
  },
  display: {
    description:
      'Returns a list of Events.  Pass organization parameter to return events for that organization (requires admin/owner privilege) Pass user parameter to return events for a specific User',
    hidden: false,
    label: 'List Events',
  },
  key: 'list_scheduled_events',
  noun: 'Event',
};
