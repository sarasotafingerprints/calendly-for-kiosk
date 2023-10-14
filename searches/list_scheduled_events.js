const perform = async (z, bundle) => {
  const scope = bundle.inputData.scope;
  const scope_value =
    scope == 'user' ? bundle.authData.owner : bundle.authData.organization;

  const options = {
    url: `${process.env.API_BASE_URL}/scheduled_events`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {
      [scope]: scope_value,
      count: 100,
    },
  };

  if (bundle.inputData.invitee_email) {
    options.params.invitee_email = bundle.inputData.invitee_email;
  }

  if (bundle.inputData.max_start_time) {
    options.params.max_start_time = bundle.inputData.max_start_time;
  }

  if (bundle.inputData.min_start_time) {
    options.params.min_start_time = bundle.inputData.min_start_time;
  }

  if (bundle.inputData.status) {
    options.params.status = bundle.inputData.status;
  }

  return await z.request(options).then((results) => results.json.collection);
};

module.exports = {
  display: {
    description:
      'Returns a list of Events.  Pass organization parameter to return events for that organization (requires admin/owner privilege) Pass user parameter to return events for a specific User',
    hidden: false,
    label: 'List Scheduled Events',
  },
  key: 'list_scheduled_events',
  noun: 'Event',
  operation: {
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
      {
        key: 'event_types',
        label: 'Event Types',
        type: 'string',
        dynamic: 'new_event_type.id.name',
        helpText: 'Optionally filter results based on the Type of event.',
        required: false,
        list: true,
        altersDynamicFields: false,
      },
      {
        key: 'scope',
        label: 'Scope',
        type: 'string',
        choices: ['user', 'organization'],
        required: true,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'status',
        label: 'Status',
        type: 'string',
        helpText: 'Active or Cancelled or both if not specifed.',
        choices: ['active', 'canceled'],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: perform,
  },
};
