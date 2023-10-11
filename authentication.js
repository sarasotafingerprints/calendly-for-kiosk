const test = async (z, bundle) => {
  const options = {
    url: 'https://api.calendly.com/users/me',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bundle.authData.access_token}`,
      'Content-Type': 'application/json',
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

const getAccessToken = async (z, bundle) => {
  const encodedString = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`.toString('base64');

  z.console.log(encodedString);

  const options = {
    url: 'https://auth.calendly.com/oauth/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encodedString}`,
    },
    params: {},
    body: {
      code: bundle.inputData.code,
      grant_type: 'authorization_code',
      redirect_uri: bundle.inputData.redirect_uri,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;
    // You can do any parsing you need for results here before returning them

    return results;
  });
};

const refreshAccessToken = async (z, bundle) => {
  const encodedString = new Buffer(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
  ).toString('base64');

  const options = {
    url: 'https://auth.calendly.com/oauth/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encodedString}`,
    },
    params: {},
    body: {
      refresh_token: bundle.authData.refresh_token,
      grant_type: 'refresh_token',
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
  type: 'oauth2',
  test: test,
  oauth2Config: {
    authorizeUrl: {
      url: 'https://auth.calendly.com/oauth/authorize',
      params: {
        client_id: '{{process.env.CLIENT_ID}}',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
        response_type: 'code',
      },
    },
    getAccessToken: getAccessToken,
    refreshAccessToken: refreshAccessToken,
    autoRefresh: true,
  },
  connectionLabel: '{{bundle.inputData.name}}',
  fields: [
    {
      computed: true,
      key: 'organization',
      required: false,
      label: 'Organization',
      type: 'string',
    },
    { computed: true, key: 'owner', required: false, type: 'string' },
  ],
};
