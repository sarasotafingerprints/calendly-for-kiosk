const perform = async (z, bundle) => {
  //TODO: get event_url from event_type
  if(bundle.meta.isLoadingSample)
  {
    return {
      uuid: 'sample data'
    }
  }
  //generate callback_url
  const callbackUrl = z.generateCallbackUrl();

  const options = {
    url: process.env.PIPEDREAM_TRIGGER_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
    body: {
      first_name: bundle.inputData.first_name,
      last_name: bundle.inputData.last_name,
      email: bundle.inputData.email,
      event_url: bundle.inputData.event_url,
      callback_url: callbackUrl,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

const performResume = async (z, bundle) => {
  // this will give a final value of: {"hello": "world", "foo": "bar"}
  return  { ...bundle.outputData, ...bundle.cleanedRequest };
};

module.exports = {
  display: {
    description: 'Uses pipedream workflow to create an invitee.',
    hidden: false,
    label: 'Create Invitee',
  },
  key: 'create_invitee',
  noun: 'Invitee',
  operation: {
    inputFields: [
      {
        key: 'event_type',
        label: 'Event Type',
        type: 'string',
        dynamic: 'new_event_type.id.name',
        required: false,
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
    performResume: performResume
  },
};
