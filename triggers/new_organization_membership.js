const perform = async (z, bundle) => {
  const options = {
    url: 'https://api.calendly.com/organization_memberships',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {
      organization: bundle.authData.organization,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them
    for (let [key, obj] of results.collection.entries()) {
      let { uri, ...rest } = obj;
      let uuid = uri.split('/').pop();
      results.collection[key] = { id: uuid, ...rest };
    }

    return results.collection;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [],
    sample: {
      id: 'DFEGS3L6E6MPDAEY',
      created_at: '2021-04-30T19:51:46.619546Z',
      organization: 'https://api.calendly.com/organizations/ECBFUWRHONEDFC46',
      role: 'owner',
      updated_at: '2021-04-30T19:51:46.619546Z',
      user: {
        avatar_url:
          'https://d3v0px0pttie1i.cloudfront.net/uploads/user/avatar/11023696/53a2177a.png',
        created_at: '2021-04-30T19:51:46.417994Z',
        email: 'mike@sarasotafingerprints.com',
        name: 'Mike Mahoney',
        timezone: 'America/New_York',
        updated_at: '2023-09-04T22:41:32.126252Z',
        uri: 'https://api.calendly.com/users/GADAQRXECYLLNIGB',
        scheduling_url: 'https://calendly.com/srqfingerprints',
        slug: 'srqfingerprints',
      },
    },
    outputFields: [
      { key: 'id' },
      { key: 'created_at' },
      { key: 'organization' },
      { key: 'role' },
      { key: 'updated_at' },
      { key: 'user__avatar_url' },
      { key: 'user__created_at' },
      { key: 'user__email' },
      { key: 'user__name' },
      { key: 'user__timezone' },
      { key: 'user__updated_at' },
      { key: 'user__uri' },
      { key: 'user__scheduling_url' },
      { key: 'user__slug' },
    ],
  },
  display: {
    description:
      "Use this to list the Organization Memberships for all users belonging to an organization, use:  user to look up a user's membership in an organization organization to look up all users that belong to the organization This endpoint can also be used to retrieve your organization URI.",
    hidden: true,
    label: 'New Organization Membership',
  },
  key: 'new_organization_membership',
  noun: 'Organization Membership',
};
