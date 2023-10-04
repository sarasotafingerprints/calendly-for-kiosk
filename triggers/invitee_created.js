const perform = async (z, bundle) => {
  bundle.cleanedRequest.payload.id = bundle.cleanedRequest.payload.uri;

  return [bundle.cleanedRequest.payload];
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

    // You can do any parsing you need for results here before returning them

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
      scope: 'user',
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // store the uuid as id
    results.id = results.uri.split('/').pop();

    return results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    type: 'hook',
    performUnsubscribe: performUnsubscribe,
    performSubscribe: performSubscribe,
    canPaginate: false,
  },
  display: {
    description: 'Triggers when a new invitee is created for an event',
    hidden: false,
    label: 'Invitee Created',
  },
  key: 'invitee_created',
  noun: 'Invitee',
};
