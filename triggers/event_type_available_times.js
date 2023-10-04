const perform = async (z, bundle) => {
  const now = new Date();
  const nowPlusFiveMinutes = new Date(now.getTime() + 5 * 60000);
  const twohoursfromnow = new Date(now.getTime() + 120 * 60000);

  //for testing on the weekend;
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

    return results.collection;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'event_type',
        type: 'string',
        label: 'Event Type',
        helpText: 'The uri associated with the event type',
        dynamic: 'new_event_type.id.name',
        default:
          'https://api.calendly.com/event_types/f6970b02-8dad-4102-8e99-483549aa3f4c',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      id: 'https://calendly.com/srqfingerprints/sarasota-fingerprints-appointment-walk-in/2023-09-11T17:45:00Z',
      status: 'available',
      start_time: '2023-09-11T17:45:00Z',
      invitees_remaining: 1,
    },
    outputFields: [
      { key: 'id' },
      { key: 'status' },
      { key: 'start_time' },
      { key: 'invitees_remaining' },
    ],
  },
  display: {
    description:
      'Returns a list of available times for an event type within a specified date range.',
    directions: 'Date range can be no greater than 1 week (7 days).',
    hidden: false,
    label: 'New Event Type Available Times',
  },
  key: 'event_type_available_times',
  noun: 'Available Times',
};
