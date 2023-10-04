const perform = async (z, bundle) => {
  return Promise.resolve()
    .then(() => {
      if (bundle.meta.page === 0) {
        // first page, no need to fetch a cursor
        return Promise.resolve();
      } else {
        return z.cursor.get(); // Promise<string | null>
      }
    })
    .then((cursor) => {
      const options = {
        url: 'https://api.calendly.com/event_types',
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
          cursor,
        },
      };

      return z.request(options);
    })
    .then((response) => {
      response.throwForStatus();
      const results = response.json;

      for (let [key, obj] of results.collection.entries()) {
        let { uri, ...rest } = obj;
        results.collection[key] = { id: uri, ...rest };
      }

      // You can do any parsing you need for results here before returning them

      // need to save the cursor and return a promise, but also need to pass the data along
      return Promise.all([
        results.collection,
        z.cursor.set({ page_token: results.pagination.next_page_token }),
      ]);
    })
    .then(([items /* null */]) => {
      return items;
    });
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
    outputFields: [
      { key: 'id' },
      { key: 'active' },
      { key: 'admin_managed' },
      { key: 'booking_method' },
      { key: 'color' },
      { key: 'created_at' },
      { key: 'deleted_at' },
      { key: 'description_html' },
      { key: 'description_plain' },
      { key: 'duration' },
      { key: 'internal_note' },
      { key: 'kind' },
      { key: 'name' },
      { key: 'pooling_type' },
      { key: 'profile__name' },
      { key: 'profile__owner' },
      { key: 'profile__type' },
      { key: 'scheduling_url' },
      { key: 'secret' },
      { key: 'slug' },
      { key: 'type' },
      { key: 'updated_at' },
    ],
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
