const perform = async (z, bundle) => {
  const options = {
    url: 'https://eorwekcmghk59i4.m.pipedream.net',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {},
    body: {
      first_name: bundle.inputData.first_name,
      last_name: bundle.inputData.last_name,
      email: bundle.inputData.email,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  display: {
    description:
      'Creates an event invitee by posting form-data to a scheduling url',
    hidden: false,
    label: 'Create Event Invitee',
  },
  key: 'create_event_invitee',
  noun: 'Event_Invitee',
  operation: {
    inputFields: [
      {
        key: 'scheduling_url',
        label: 'Scheduling Url',
        type: 'string',
        dynamic: 'event_type_available_times.id.start_time',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'first_name',
        label: 'First Name',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'last_name',
        label: 'Last Name',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'email',
        label: 'Email',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: perform,
  },
};
