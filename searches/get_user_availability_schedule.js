const perform = async (z, bundle) => {
  const options = {
    url: `https://api.calendly.com/user_availability_schedules/${bundle.inputData.uuid}`,
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

    return [results];
  });
};

module.exports = {
  display: {
    description:
      'This will return the availability schedule of the given UUID.',
    hidden: false,
    label: 'Get User Availability Schedule',
  },
  key: 'Get_User_Availability_Schedule',
  noun: 'Availability Schedule',
  operation: {
    inputFields: [
      {
        key: 'uuid',
        label: 'Uuid',
        type: 'string',
        helpText: 'The UUID of the availability schedule.',
        dynamic: 'User_Availability_Schedules.id.name',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: perform,
    sample: {
      resource: {
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
    },
    outputFields: [
      { key: 'resource__default' },
      { key: 'resource__name' },
      { key: 'resource__rules[]type' },
      { key: 'resource__rules[]wday' },
      { key: 'resource__rules[]intervals[]from' },
      { key: 'resource__rules[]intervals[]to' },
      { key: 'resource__timezone' },
      { key: 'resource__uri' },
      { key: 'resource__user' },
    ],
  },
};
