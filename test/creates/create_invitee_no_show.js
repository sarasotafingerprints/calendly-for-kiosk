require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Create - create_invitee_no_show', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        organization: process.env.ORGANIZATION,
        owner: process.env.OWNER,
        access_token: process.env.ACCESS_TOKEN,
        refresh_token: process.env.REFRESH_TOKEN,
      },

      inputData: {},
    };

    const result = await appTester(
      App.creates['create_invitee_no_show'].operation.perform,
      bundle
    );
    result.should.not.be.an.Array();
  });
});
