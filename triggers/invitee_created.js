const perform = async (z, bundle) => {
  bundle.cleanedRequest.payload.id = bundle.cleanedRequest.payload.uri;

  if (
    bundle.inputData.event_type_uuids.includes(
      bundle.cleanedRequest.payload.scheduled_event.event_type.replace(
        /^(.*[\\\/])/,
        ''
      )
    )
  ) {
    return [bundle.cleanedRequest.payload];
  }

  return [];
};

const performUnsubscribe = async (z, bundle) => {
  const options = {
    url: `https://api.calendly.com/webhook_subscriptions/${bundle.subscribeData.id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
    body: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    return results;
  });
};

const performSubscribe = async (z, bundle) => {
  const options = {
    url: 'https://api.calendly.com/webhook_subscriptions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
    body: {
      url: bundle.targetUrl,
      events: ['invitee.created'],
      organization: bundle.authData.organization,
      user: bundle.authData.owner,
      scope: bundle.inputData.scope,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;
    results.resource.id = results.resource.uri.replace(/^(.*[\\\/])/, '');

    return results.resource;
  });
};

const performList = async (z, bundle) => {
  const scope = bundle.inputData.scope;
  const scopeValue =
    scope == 'user' ? bundle.authData.owner : bundle.authData.organization;

  let options = {
    url: 'https://api.calendly.com/scheduled_events/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {
      [scope]: scopeValue,
      count: 100,
    },
  };

  const scheduled_events = await z
    .request(options)
    .then((results) => results.json.collection);

  const invitee_results = [];

  for (let [key, obj] of scheduled_events.entries()) {
    let { uri, event_type, ...rest } = obj;
    let uuid = uri.replace(/^(.*[\\\/])/, '');
    let event_type_uuid = event_type.replace(/^(.*[\\\/])/, '');

    if (bundle.inputData.event_type_uuids.includes(event_type_uuid)) {
      continue;
    }

    options = {
      url: `https://api.calendly.com/scheduled_events/${uuid}/invitees`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bundle.authData.access_token}`,
      },
      params: {
        status: 'active',
      },
    };
    const invitees = z.request(options).then((results) => {
      for (let [key, obj] of results.json.collection.entries()) {
        let { uri, ...rest } = obj;
        let uuid = uri.replace(/^(.*[\\\/])/, '');
        results.json.collection[key].id = uuid;
      }
      return results.json.collection;
    });

    invitee_results.push(invitees);
  }

  const output = await Promise.all(invitee_results);

  return output.flat();
};

module.exports = {
  operation: {
    perform: perform,
    type: 'hook',
    performUnsubscribe: performUnsubscribe,
    performSubscribe: performSubscribe,
    canPaginate: true,
    inputFields: [
      {
        key: 'scope',
        type: 'string',
        label: 'Scope',
        helpText: 'The scope to listen for new Invitees',
        choices: ['user', 'organization'],
        required: true,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'event_type_uuids',
        type: 'string',
        label: 'Event Types',
        helpText: 'The uuids for the event to listen for new invitees',
        dynamic: 'new_event_type.id.name',
        required: true,
        list: true,
        altersDynamicFields: false,
      },
    ],
    performList: performList,
  },
  display: {
    description: 'Triggers when a new invitee is created for an event',
    hidden: false,
    label: 'Invitee Created',
  },
  key: 'invitee_created',
  noun: 'Invitee',
};
