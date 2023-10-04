const perform = async (z, bundle) => {
  bundle.cleanedRequest.payload.id = bundle.cleanedRequest.payload.uri;

  return [bundle.cleanedRequest.payload];
};

const performSubscribe = async (z, bundle) => {
  const options = {
    url: ' https://api.calendly.com/webhook_subscriptions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
      'X-ORGANIZATION': bundle.authData.organization,
      'X-OWNER': bundle.authData.owner,
    },
    params: {},
    body: {
      url: bundle.targetUrl,
      events: ['invitee_no_show.created'],
      organization: bundle.authData.organization,
      user: bundle.authData.owner,
      scope: 'user',
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
  operation: {
    perform: perform,
    type: 'hook',
    performUnsubscribe: {
      body: { hookUrl: '{{bundle.subscribeData.id}}' },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer {{bundle.authData.access_token}}',
        'X-ORGANIZATION': '{{bundle.authData.organization}}',
        'X-OWNER': '{{bundle.authData.owner}}',
      },
      method: 'DELETE',
      url: 'https://api.calendly.com/webhook_subscriptions/{{bundle.subscribeData}}',
    },
    performSubscribe: performSubscribe,
  },
  display: {
    description: 'Triggers when there is a no-show recorded.',
    hidden: false,
    label: 'Invitee No Show',
  },
  key: 'invitee_no_show',
  noun: 'No Show',
};
