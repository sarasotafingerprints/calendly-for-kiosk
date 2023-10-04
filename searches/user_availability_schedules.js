const perform = async (z, bundle) => {
  const options = {
    url: 'https://api.calendly.com/user_availability_schedules',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {
      user: bundle.authData.owner,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    console.log(results.collection[0].rules);
    return [results];
  });
};

module.exports = {
  display: {
    description: 'Returns the availability schedules of the given user.',
    hidden: false,
    label: 'List User Availability Schedules',
  },
  key: 'user_availability_schedules',
  noun: 'Availability Schedule',
  operation: {
    inputFields: [
      {
        key: 'user',
        label: 'User',
        type: 'string',
        dynamic: 'new_organization_membership.user__uri.user__name',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      collection: [
        {
          default: true,
          name: 'Working hours',
          rules: [
            { type: 'wday', wday: 'sunday', intervals: [] },
            {
              type: 'wday',
              wday: 'monday',
              intervals: [{ from: '09:00', to: '17:00' }],
            },
            {
              type: 'wday',
              wday: 'tuesday',
              intervals: [{ from: '09:00', to: '17:00' }],
            },
            {
              type: 'wday',
              wday: 'wednesday',
              intervals: [{ from: '09:00', to: '17:00' }],
            },
            {
              type: 'wday',
              wday: 'thursday',
              intervals: [{ from: '09:00', to: '17:00' }],
            },
            {
              type: 'wday',
              wday: 'friday',
              intervals: [{ from: '09:00', to: '17:00' }],
            },
            { type: 'wday', wday: 'saturday', intervals: [] },
          ],
          timezone: 'America/New_York',
          uri: 'https://api.calendly.com/user_availability_schedules/ca772c5d-7935-47ca-acd7-38fc21b3051e',
          user: 'https://api.calendly.com/users/GADAQRXECYLLNIGB',
        },
      ],
    },
    outputFields: [
      { key: 'collection[]default' },
      { key: 'collection[]name' },
      { key: 'collection[]rules[]type' },
      { key: 'collection[]rules[]wday' },
      { key: 'collection[]rules[]intervals[]from' },
      { key: 'collection[]rules[]intervals[]to' },
      { key: 'collection[]timezone' },
      { key: 'collection[]uri' },
      { key: 'collection[]user' },
    ],
    perform: perform,
  },
};
