const perform = async (z, bundle) => {
  const now = new Date();

  const nowPlusFiveMinutes = new Date(now.getTime() + 5 * 60000);
  const twohoursfromnow = new Date(now.getTime() + 120 * 60000);

  //for testing on the weekend
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);

  const options = {
    url: 'https://api.calendly.com/event_type_available_times',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {
      end_time: tomorrow.toISOString(),
      event_type: bundle.inputData.event_type,
      start_time: nowPlusFiveMinutes.toISOString(),
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    for (let [key, obj] of results.collection.entries()) {
      let { scheduling_url, ...rest } = obj;
      results.collection[key] = { id: scheduling_url, ...rest };
    }

    return [results.collection][0];
  });
};

module.exports = {
  display: {
    description:
      'Returns the next available time for an event type within a specified date range.',
    hidden: false,
    label: 'Find Next Available Time For Event Type',
  },
  key: 'find_event_type_available_times',
  noun: 'Available Time',
  operation: {
    inputFields: [
      {
        key: 'event_type',
        label: 'Event Type',
        type: 'string',
        helpText: 'The uri associated with the event type',
        dynamic: 'new_event_type.id.name',
        required: true,
        list: false,
        altersDynamicFields: false,
        default:
          'https://api.calendly.com/event_types/f6970b02-8dad-4102-8e99-483549aa3f4c',
      },
    ],
    sample: {
      id: 'https://calendly.com/srqfingerprints/sarasota-fingerprints-appointment-walk-in/2023-09-11T18:15:00Z',
      status: 'available',
      start_time: '2023-09-11T18:15:00Z',
      invitees_remaining: 1,
    },
    outputFields: [
      { key: 'id' },
      { key: 'status' },
      { key: 'start_time' },
      { key: 'invitees_remaining' },
    ],
    perform: perform,
  },
};
