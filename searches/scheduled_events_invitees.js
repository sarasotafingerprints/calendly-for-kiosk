module.exports = {
  display: {
    description: 'Returns a list of Invitees for an event.',
    hidden: false,
    label: 'List Event Invitees',
  },
  key: 'scheduled_events_invitees',
  noun: 'invitees',
  operation: {
    inputFields: [
      {
        key: 'uuid',
        label: 'Event Uuid',
        type: 'string',
        helpText: 'Unique Identifier for the Scheduled Event',
        choices: ['s'],
        required: true,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'email',
        label: 'Email',
        type: 'string',
        helpText:
          'Indicates if the results should be filtered by email address',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'count',
        label: 'Count',
        type: 'integer',
        helpText: 'The number of rows to return\n\n>= 1\n<= 100\nDefault:\n20',
        default: '20',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'sort',
        label: 'Sort',
        type: 'string',
        default: 'created_at:asc',
        helpText:
          'Order results by the created_at field and direction specified: ascending ("asc") or descending ("desc")',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer {{bundle.authData.access_token}}',
        'X-ORGANIZATION': '{{bundle.authData.organization}}',
        'X-OWNER': '{{bundle.authData.owner}}',
      },
      params: {
        uuid: '{{bundle.inputData.uuid}}',
        count: '{{bundle.inputData.count}}',
        sort: '{{bundle.inputData.sort}}',
        email: '{{bundle.inputData.email}}',
        page_token: '',
      },
      url: 'https://api.calendly.com/scheduled_events/{{bundle.inputData.uuid}}/invitees',
    },
  },
};
