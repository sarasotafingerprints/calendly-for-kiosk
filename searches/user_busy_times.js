const perform = async (z, bundle) => {
  let now = new Date();
  let twoHoursFromNow = new Date(now.getTime() + 120 * 60000);
  let endTime = new Date(
    bundle.inputData.end_time
      ? bundle.inputData.end_time
      : twoHoursFromNow.getTime()
  );
  let startTime = new Date(
    bundle.inputData.start_time ? bundle.inputData.start_time : now.getTime()
  );

  const options = {
    url: 'https://api.calendly.com/user_busy_times',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {
      end_time: endTime.toISOString(),
      start_time: startTime.toISOString(),
      user: bundle.inputData.user
        ? bundle.inputData.user
        : bundle.authData.owner,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them
    let query = {
      range: {
        start: startTime.toISOString(),
        end: endTime.toISOString(),
        start_pretty: startTime.toString(),
        end_pretty: endTime.toString(),
      },
    };

    return [{ ...results, ...query }];
  });
};

module.exports = {
  display: {
    description:
      'Returns an ascending list of user internal and external scheduled events within a specified date range.',
    hidden: false,
    label: 'List User Busy Times',
  },
  key: 'user_busy_times',
  noun: 'Busy Times',
  operation: {
    inputFields: [
      {
        key: 'start_time',
        label: 'Search Range Start Time',
        type: 'datetime',
        helpText: 'Start time of the requested availability range',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'end_time',
        label: 'Search Range End Time',
        type: 'datetime',
        helpText: 'End time of the requested availability range',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'user',
        label: 'User',
        type: 'string',
        helpText: 'The uri associated with the user',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      collection: [
        {
          end_time: '2023-09-06T19:00:00.000000Z',
          start_time: '2023-09-06T18:30:00.000000Z',
          type: 'external',
        },
      ],
      range: {
        start: '2023-09-06T18:27:39.881Z',
        end: '2023-09-06T18:39:39.881Z',
      },
    },
    outputFields: [
      { key: 'collection[]end_time' },
      { key: 'collection[]start_time' },
      { key: 'collection[]type' },
      { key: 'range__start' },
      { key: 'range__end' },
    ],
    perform: perform,
  },
};
