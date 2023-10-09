const perform = async (z, bundle) => {
  let cursor;

  // if fetching a page other than the first (first page is 0),
  // get the cursor stored after fetching the previous page.
  if (bundle.meta.page > 0) {
    cursor = await z.cursor.get();

    // if the previous page was the last one and cursor is empty/null,
    // return an empty array.
    if (!cursor) {
      return [];
    }
  }

  const options = {
    url: cursor ? cursor : 'https://api.calendly.com/event_types',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {
      organization: bundle.authData.organization,
      user: bundle.authData.owner,
      sort: 'name:asc',
      count: 100,
    },
  };

  const response = await z.request(options);

  z.console.log(response.json.pagination);

  for (let [key, obj] of response.json.collection.entries()) {
    let { uri, ...rest } = obj;
    response.json.collection[key] = {
      id: uri,
      ...rest,
    };
  }
  if (response.json.pagination.next_page) {
    await z.cursor.set(response.json.pagination.next_page);
  }

  return response.json.collection;
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [],
    canPaginate: true,
    sample: {
      id: 'https://api.calendly.com/event_types/CFF7UMA25HO5N5UC',
      active: true,
      admin_managed: false,
      booking_method: 'instant',
      color: '#17e885',
      created_at: '2021-04-30T19:52:25.948551Z',
      custom_questions: [],
      deleted_at: null,
      description_html:
        '<p>Please bring a Valid <strong>Photo ID</strong>.</p><p><br></p><p>If your prints require an <strong>ORI number</strong> please also provide this at the time of your appointment as well.</p>',
      description_plain:
        'Please bring a Valid Photo ID.\n\n\nIf your prints require an ORI number please also provide this at the time of your appointment as well.',
      duration: 15,
      internal_note: null,
      kind: 'solo',
      name: 'Sarasota Fingerprints Appointment',
      pooling_type: null,
      profile: {
        name: 'Mike Mahoney',
        owner: 'https://api.calendly.com/users/GADAQRXECYLLNIGB',
        type: 'User',
      },
      scheduling_url:
        'https://calendly.com/srqfingerprints/sarasota-fingerprints-appointment',
      secret: false,
      slug: 'sarasota-fingerprints-appointment',
      type: 'StandardEventType',
      updated_at: '2023-05-18T20:53:36.708850Z',
    },
    outputFields: [{ key: 'id' }, { key: 'name' }],
  },
  display: {
    description:
      "Returns all Event Types associated with a specified User. Use:  organization to look up all Event Types that belong to the organization user to look up a user's Event Types in an organization Either organization or user are required query params when using this endpoint.",
    hidden: true,
    label: "New User's Event Types",
  },
  key: 'new_event_type',
  noun: 'Event',
};
