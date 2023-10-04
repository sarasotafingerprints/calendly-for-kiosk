const perform = async (z, bundle) => {
  const options = {
    url: 'https://api.calendly.com/user_availability_schedules',
    method: 'GET',
    headers: {
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
    const output = [];

    for (let [key, obj] of results.collection.entries()) {
      let { uri, default: d, rules, ...rest } = obj;

      if (d) {
        let uuid = uri.split('/').pop();
        //we only care about if the rules change
        let hash = z.hash('md5', JSON.stringify(rules) + uuid);

        for (const [i, rule] of Object.entries(rules)) {
          {
            const { intervals, ...rest } = rule;

            if (intervals.length < 1) {
              intervals.push({
                from: 'null',
                to: 'null',
              });
            }

            rules[i] = { intervals, ...rest };
          }
        }
        output.push({ id: hash, default: d, rules, ...rest });
      }
    }

    return output;
  });
};

module.exports = {
  operation: {
    perform: perform,
    sample: {
      id: '2db0e839669b9930ff143722d90cd9bd',
      default: true,
      rules: [
        {
          intervals: [{ from: 'null', to: 'null' }],
          type: 'wday',
          wday: 'sunday',
        },
        {
          intervals: [{ from: '09:00', to: '17:00' }],
          type: 'wday',
          wday: 'monday',
        },
        {
          intervals: [{ from: '09:00', to: '17:00' }],
          type: 'wday',
          wday: 'tuesday',
        },
        {
          intervals: [{ from: '09:00', to: '17:00' }],
          type: 'wday',
          wday: 'wednesday',
        },
        {
          intervals: [{ from: '09:00', to: '17:00' }],
          type: 'wday',
          wday: 'thursday',
        },
        {
          intervals: [{ from: '09:00', to: '17:00' }],
          type: 'wday',
          wday: 'friday',
        },
        {
          intervals: [{ from: 'null', to: 'null' }],
          type: 'wday',
          wday: 'saturday',
        },
      ],
      name: 'Working hours',
      timezone: 'America/New_York',
      user: 'https://api.calendly.com/users/GADAQRXECYLLNIGB',
    },
    outputFields: [
      { key: 'id' },
      { key: 'default' },
      { key: 'rules[]intervals[]from', type: 'string' },
      { key: 'rules[]intervals[]to', type: 'string' },
      { key: 'rules[]type' },
      { key: 'rules[]wday' },
      { key: 'name' },
      { key: 'timezone' },
      { key: 'user' },
    ],
    canPaginate: false,
  },
  display: {
    description:
      'Returns the latest default availability schedules of the given user.',
    hidden: false,
    label: 'New Default User Availability Schedule',
  },
  key: 'User_Availability_Schedules',
  noun: 'Availability Schedule',
};
