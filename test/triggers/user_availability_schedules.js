require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Trigger - User_Availability_Schedules', () => {
  zapier.tools.env.inject();

  it('should get an array', async () => {
    const bundle = {
      authData: {
        organization: process.env.ORGANIZATION,
        owner: process.env.OWNER,
        access_token: process.env.ACCESS_TOKEN,
        refresh_token: process.env.REFRESH_TOKEN,
      },

      inputData: {},
    };

    const results = await appTester(
      App.triggers['User_Availability_Schedules'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
  });
});