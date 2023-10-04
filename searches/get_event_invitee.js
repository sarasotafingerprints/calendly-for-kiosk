const perform = async (z, bundle) => {
  const options = {
    url: `https://api.calendly.com/scheduled_events/${bundle.inputData.event_uuid}/invitees/${bundle.inputData.invitee_uuid}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
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

module.exports = {
  display: {
    description:
      'Find a booked appointment record by Event event_uuid & invitee_uuid.',
    hidden: false,
    label: 'Get Event Invitee',
  },
  key: 'get_event_invitee',
  noun: 'Invitee',
  operation: {
    inputFields: [
      {
        key: 'event_uuid',
        label: 'Event Uuid',
        type: 'string',
        helpText: "The event's unique identifier.",
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'invitee_uuid',
        label: 'Invitee Uuid',
        type: 'string',
        helpText: "The invitee's unique identifier.",
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: perform,
    sample: {
      cancel_url:
        'https://calendly.com/cancellations/2c72c06c-c4b2-4eef-aa1c-b5943f2488df',
      created_at: '2023-08-31T17:16:02.395341Z',
      email: 'mike@sarasotafingerprints.com',
      event:
        'https://api.calendly.com/scheduled_events/0fb58866-4686-42ae-af6a-023b92db7184',
      first_name: 'Michael',
      last_name: 'Mahoney',
      name: 'Michael Mahoney',
      new_invitee: null,
      no_show: null,
      old_invitee: null,
      payment: null,
      questions_and_answers: [],
      reconfirmation: null,
      reschedule_url:
        'https://calendly.com/reschedulings/2c72c06c-c4b2-4eef-aa1c-b5943f2488df',
      rescheduled: false,
      routing_form_submission: null,
      status: 'active',
      text_reminder_number: null,
      timezone: 'America/New_York',
      tracking: {
        utm_campaign: null,
        utm_source: null,
        utm_medium: null,
        utm_content: null,
        utm_term: null,
        salesforce_uuid: null,
      },
      updated_at: '2023-08-31T17:16:02.395341Z',
      uri: 'https://api.calendly.com/scheduled_events/0fb58866-4686-42ae-af6a-023b92db7184/invitees/2c72c06c-c4b2-4eef-aa1c-b5943f2488df',
    },
    outputFields: [
      { key: 'cancel_url' },
      { key: 'created_at', type: 'datetime' },
      { key: 'email' },
      { key: 'event' },
      { key: 'first_name' },
      { key: 'last_name' },
      { key: 'name' },
      { key: 'new_invitee' },
      { key: 'no_show' },
      { key: 'old_invitee' },
      { key: 'payment' },
      { key: 'reconfirmation' },
      { key: 'reschedule_url' },
      { key: 'rescheduled' },
      { key: 'routing_form_submission' },
      { key: 'status' },
      { key: 'text_reminder_number' },
      { key: 'timezone' },
      { key: 'tracking__utm_campaign' },
      { key: 'tracking__utm_source' },
      { key: 'tracking__utm_medium' },
      { key: 'tracking__utm_content' },
      { key: 'tracking__utm_term' },
      { key: 'tracking__salesforce_uuid' },
      { key: 'updated_at', type: 'datetime' },
      { key: 'uri' },
    ],
  },
};
