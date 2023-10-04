const perform = async (z, bundle) => {
  const options = {
    url: `https://api.calendly.com/scheduled_events/${bundle.inputData.event_uuid}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return [results.resource];
  });
};

module.exports = {
  display: {
    description: 'Returns information about a specified Event.',
    hidden: false,
    label: 'Get Event',
  },
  key: 'get_event',
  noun: 'Event',
  operation: {
    inputFields: [
      {
        key: 'event_uuid',
        label: 'Event Uuid',
        type: 'string',
        helpText: "The event's unique identifier",
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: perform,
    sample: {
      calendar_event: {
        external_id: '8356208og62h0gni3stb93h6go',
        kind: 'google',
      },
      created_at: '2023-08-31T17:16:02.373493Z',
      end_time: '2023-08-31T18:15:00.000000Z',
      event_guests: [],
      event_memberships: [
        {
          user: 'https://api.calendly.com/users/GADAQRXECYLLNIGB',
          user_email: 'mike@sarasotafingerprints.com',
        },
      ],
      event_type: 'https://api.calendly.com/event_types/CFF7UMA25HO5N5UC',
      invitees_counter: { active: 1, limit: 1, total: 1 },
      location: {
        location: '3947 Clark Rd # G, Sarasota, FL 34233-2364',
        type: 'physical',
      },
      name: 'Sarasota Fingerprints Appointment',
      start_time: '2023-08-31T18:00:00.000000Z',
      status: 'active',
      updated_at: '2023-08-31T17:16:04.538274Z',
      uri: 'https://api.calendly.com/scheduled_events/0fb58866-4686-42ae-af6a-023b92db7184',
    },
    outputFields: [
      { key: 'calendar_event__external_id' },
      { key: 'calendar_event__kind' },
      { key: 'created_at', type: 'datetime' },
      { key: 'end_time', type: 'datetime' },
      { key: 'event_memberships[]user' },
      { key: 'event_memberships[]user_email' },
      { key: 'event_type' },
      { key: 'invitees_counter__active' },
      { key: 'invitees_counter__limit' },
      { key: 'invitees_counter__total' },
      { key: 'location__location' },
      { key: 'location__type' },
      { key: 'name' },
      { key: 'start_time', type: 'datetime' },
      { key: 'status' },
      { key: 'updated_at', type: 'datetime' },
      { key: 'uri' },
    ],
  },
};
