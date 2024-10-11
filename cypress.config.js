const { defineConfig } = require("cypress");
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');


module.exports = defineConfig({
  e2e: {

    baseUrl: "https://www.saucedemo.com", //https://example.cypress.io
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
    configFile: 'reporter-config.json',
    chromeWebSecurity: false,
    },
  },
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config);

      // implement node event listeners here
    },
});
