const perform = async (z, bundle) => {
  const now = new Date();

  Date.prototype.endOfNextWorkday = function () {
    var dayOfWeek = this.getDay();
    if (dayOfWeek == 5) {
      this.setTime(this.getTime() + 3 * 1000 * 60 * 60 * 24);
    } else if (dayOfWeek == 6) {
      this.setTime(this.getTime() + 2 * 1000 * 60 * 60 * 24);
    } else {
      this.setTime(this.getTime() + 1 * 1000 * 60 * 60 * 24);
    }
    this.setHours(17, 0, 0);
    return this;
  };

  const nowPlusFiveMinutes = new Date(now.getTime() + 5 * 60000);
  const endOfNextWorkday = new Date().endOfNextWorkday();

  const options = {
    url: 'https://api.calendly.com/event_type_available_times',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {
      start_time: nowPlusFiveMinutes.toISOString(),
      end_time: endOfNextWorkday.toISOString(),
      event_type: bundle.inputData.event_type,
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
        default:
          'https://api.calendly.com/event_types/f6970b02-8dad-4102-8e99-483549aa3f4c',
        required: true,
        list: false,
        altersDynamicFields: false,
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
